// Renames every file under /public/images to a URL-safe slug (no spaces,
// ampersands, parentheses, commas, or double extensions) and rewrites every
// reference to it across src/**. Spaces/special chars in these paths are the
// reason the project images 404 on Vercel's image optimizer.
import fs from "node:fs";
import path from "node:path";

const IMAGES = path.resolve("public/images");
const SRC = path.resolve("src");

function walk(dir, filter) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, filter));
    else if (!filter || filter(p)) out.push(p);
  }
  return out;
}

function slugify(basename) {
  // last real extension
  const m = basename.match(/\.(jpe?g|png|webp)$/i);
  let ext = m ? m[0].toLowerCase() : "";
  if (ext === ".jpeg") ext = ".jpg";
  let name = m ? basename.slice(0, -m[0].length) : basename;
  // strip any extra trailing image extensions (e.g. "x.jpg.jpeg")
  name = name.replace(/\.(jpe?g|png|webp)$/gi, "");
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (slug || "image") + ext;
}

// 1) Build rename map (web path -> web path), renaming on disk.
const map = new Map(); // oldWebPath -> newWebPath
for (const abs of walk(IMAGES)) {
  const dir = path.dirname(abs);
  const oldName = path.basename(abs);
  let newName = slugify(oldName);
  if (newName === oldName) continue;

  // avoid collisions within the same folder
  let candidate = newName;
  let i = 2;
  while (
    fs.existsSync(path.join(dir, candidate)) &&
    path.join(dir, candidate) !== abs
  ) {
    const dot = newName.lastIndexOf(".");
    candidate = `${newName.slice(0, dot)}-${i}${newName.slice(dot)}`;
    i++;
  }
  newName = candidate;

  fs.renameSync(abs, path.join(dir, newName));

  const rel = (p) => "/" + path.relative(path.resolve("public"), p).split(path.sep).join("/");
  map.set(rel(abs), rel(path.join(dir, newName)));
}

console.log(`Renamed ${map.size} files.\n`);

// 2) Rewrite references across src/**. Replace longest paths first so a path
//    that is a prefix of another doesn't partially match.
const olds = [...map.keys()].sort((a, b) => b.length - a.length);
let edits = 0;
for (const file of walk(SRC, (p) => /\.(ts|tsx|js|jsx)$/.test(p))) {
  let txt = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const oldPath of olds) {
    if (txt.includes(oldPath)) {
      txt = txt.split(oldPath).join(map.get(oldPath));
      changed = true;
      edits++;
    }
  }
  if (changed) fs.writeFileSync(file, txt);
}
console.log(`Updated ${edits} references in src/.`);

// 3) Print the map for the record.
for (const [a, b] of map) console.log(`${a}\n  -> ${b}`);
