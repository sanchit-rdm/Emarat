import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "../public/images");

// Map the raw client uploads → clean, web-friendly slugs.
const map = {
  "4 EAST AVENUE, DLF ALAMEDA ENTRENCE.jpg": "alameda-entrance",
  "4 EAST AVENUE, DLF ALAMEDA LOUNGE.jpg": "alameda-lounge",
  "4 EAST AVENUE, DLF ALAMEDA DND.jpg": "alameda-dining",
  "4 EAST AVENUE, DLF ALAMEDA KITCHEN.jpg": "alameda-kitchen",
  "4 EAST AVENUE, DLF ALAMEDA PDR.jpg": "alameda-powder-room",
  "4 EAST AVENUE, DLF ALAMEDA BEDROOM-1.jpg": "alameda-bedroom-1",
  "4 EAST AVENUE, DLF ALAMEDA BEDROOM-2.jpg": "alameda-bedroom-2",
  "4 EAST AVENUE, DLF ALAMEDA BEDROOM-3.jpg": "alameda-bedroom-3",
  "4 EAST AVENUE, DLF ALAMEDA BEDROOM-4.jpg": "alameda-bedroom-4",
  "4 EAST AVENUE, DLF ALAMEDA BEDROOM-5.jpg": "alameda-bedroom-5",
  "4 EAST AVENUE, DLF ALAMEDA TOILER-1 1.jpg": "alameda-bathroom",
};

// Two widths so callers can pick: full-bleed (1920) and card/thumb (900).
const widths = [
  { suffix: "", w: 1920, q: 72 },
  { suffix: "-sm", w: 900, q: 70 },
];

let total = 0;
for (const [orig, slug] of Object.entries(map)) {
  const input = path.join(dir, orig);
  if (!fs.existsSync(input)) {
    console.warn("MISSING:", orig);
    continue;
  }
  for (const { suffix, w, q } of widths) {
    const out = path.join(dir, `${slug}${suffix}.webp`);
    await sharp(input)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: q, effort: 6 })
      .toFile(out);
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    total += fs.statSync(out).size;
    console.log(`${path.basename(out)}  ${kb} KB`);
  }
}
console.log(`\nTOTAL webp: ${(total / 1024 / 1024).toFixed(2)} MB`);
