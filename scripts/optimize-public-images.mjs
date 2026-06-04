// One-off optimizer for the heavy /public/images set.
//  - Resizes everything to a max width of 2200px (keeps aspect ratio).
//  - JPG/JPEG: re-encoded with mozjpeg, quality 82, in place (if smaller).
//  - PNG: converted to JPEG (flattened on white); original .png deleted.
//  - WEBP: left as-is (already tiny).
// Prints a per-format before/after summary and the png->jpg renames so the
// code references can be updated.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public/images");
const MAX_W = 2200;
const renames = [];
let before = 0;
let after = 0;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

async function run() {
  for (const file of walk(ROOT)) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const origSize = fs.statSync(file).size;
    before += origSize;

    try {
      // Read to a Buffer first — passing a path makes libvips open the file
      // itself, which intermittently fails on Windows ("UNKNOWN open").
      const input = fs.readFileSync(file);
      const meta = await sharp(input, { failOn: "none" }).metadata();
      let pipeline = sharp(input, { failOn: "none" }).rotate();
      if (meta.width && meta.width > MAX_W) {
        pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
      }

      if (ext === ".png") {
        const outPath = file.slice(0, -ext.length) + ".jpg";
        const buf = await pipeline
          .flatten({ background: "#ffffff" })
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
        fs.writeFileSync(outPath, buf);
        if (outPath !== file) fs.unlinkSync(file);
        after += buf.length;
        renames.push([path.relative(ROOT, file), path.relative(ROOT, outPath)]);
      } else {
        const buf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
        // Only overwrite when meaningfully smaller — leaves already-optimized
        // files (incl. the freshly converted png->jpg) untouched.
        if (buf.length < origSize * 0.95) {
          fs.writeFileSync(file, buf);
          after += buf.length;
        } else {
          after += origSize;
        }
      }
    } catch (err) {
      console.error("SKIP", file, err.message);
      after += origSize;
    }
  }

  console.log("\n--- Renames (png -> jpg) ---");
  for (const [a, b] of renames) console.log(`${a}  ->  ${b}`);
  console.log(
    `\nBefore: ${(before / 1048576).toFixed(1)} MB   After: ${(after / 1048576).toFixed(1)} MB   Saved: ${((1 - after / before) * 100).toFixed(0)}%`
  );
}

run();
