import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../src");

// Property photos to cycle through (Next/Image resizes these responsively).
const imgs = [
  "/images/alameda-entrance.webp",
  "/images/alameda-lounge.webp",
  "/images/alameda-dining.webp",
  "/images/alameda-kitchen.webp",
  "/images/alameda-bedroom-1.webp",
  "/images/alameda-bedroom-2.webp",
  "/images/alameda-bedroom-3.webp",
  "/images/alameda-bathroom.webp",
  "/images/alameda-bedroom-4.webp",
  "/images/alameda-powder-room.webp",
  "/images/alameda-bedroom-5.webp",
];

// People portraits — leave their Unsplash placeholders until real photos exist.
const skip = new Set([
  path.join(root, "app", "team", "page.tsx"),
  path.join(root, "app", "directors-desk", "page.tsx"),
]);

const re = /https:\/\/images\.unsplash\.com\/[^"')\s]+/g;
let i = 0;
let files = 0;
let count = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".tsx")) process(p);
  }
}

function process(file) {
  if (skip.has(file)) return;
  const src = fs.readFileSync(file, "utf8");
  if (!re.test(src)) return;
  re.lastIndex = 0;
  let n = 0;
  const out = src.replace(re, () => {
    n++;
    count++;
    return imgs[i++ % imgs.length];
  });
  fs.writeFileSync(file, out);
  files++;
  console.log(`${path.relative(root, file)}  (${n})`);
}

walk(root);
console.log(`\nReplaced ${count} URLs across ${files} files.`);
