import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = "public/images/gallery";
const THUMBS = "public/images/gallery-thumbs";
const LARGE = "public/images/gallery-large"; // compressed full-screen versions for the viewer
const OUT = "src/galleryData.json";
const exts = /\.(jpe?g|png|webp)$/i;

// Compare paths with or without %20 etc. so hand-typed entries still match
const norm = (s) => {
  try { return decodeURI(s); } catch { return s; }
};

const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];

// 1. Scan the folders: make missing thumbnails, note every image on disk
const found = new Map(); // normalised src -> fresh entry
for (const dir of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const file of fs.readdirSync(path.join(ROOT, dir.name))) {
    if (!exts.test(file)) continue;
    const base = file.replace(exts, "");
    const full = path.join(ROOT, dir.name, file);

    const thumbDir = path.join(THUMBS, dir.name);
    fs.mkdirSync(thumbDir, { recursive: true });
    const thumbFile = path.join(thumbDir, base + ".webp");
    if (!fs.existsSync(thumbFile)) {
      await sharp(full).rotate().resize({ width: 700 }).webp({ quality: 78 }).toFile(thumbFile);
    }

    const largeDir = path.join(LARGE, dir.name);
    fs.mkdirSync(largeDir, { recursive: true });
    const largeFile = path.join(largeDir, base + ".webp");
    if (!fs.existsSync(largeFile)) {
      await sharp(full)
        .rotate()
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(largeFile);
    }

    const src = encodeURI(`/images/gallery/${dir.name}/${file}`);
    found.set(norm(src), {
      cat: dir.name,
      title: base.replace(/[-_]/g, " "),
      date: fs.statSync(full).mtime.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      src,
      thumb: encodeURI(`/images/gallery-thumbs/${dir.name}/${base}.webp`),
      large: encodeURI(`/images/gallery-large/${dir.name}/${base}.webp`),
    });
  }
}

// 2. Keep every existing entry exactly as written, in the order it appears in the JSON
const out = [];
const seen = new Set();
for (const p of prev) {
  const key = norm(p.src);
  if (seen.has(key)) {
    console.log(`Duplicate entry skipped: ${p.src}`);
    continue;
  }
  seen.add(key);
  if (!found.has(key)) console.warn(`WARNING: image file not found (entry kept): ${p.src}`);
  else if (!p.large) p.large = found.get(key).large; // only adds the new field, nothing else changes
  out.push(p);
}

// 3. Append only brand-new images at the end, with new ids after the highest one
let nextId = Math.max(0, ...out.map((o) => Number(o.id) || 0)) + 1;
let added = 0;
for (const [key, fresh] of found) {
  if (seen.has(key)) continue;
  out.push({ ...fresh, id: nextId++ });
  added++;
  console.log(`Added: ${fresh.src}`);
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} photos (${added} new). Existing order and details unchanged.`);
