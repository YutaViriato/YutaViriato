import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pub = join(here, "..", "public");
const icon = readFileSync(join(here, "icon-source.svg"));
const og = readFileSync(join(here, "og-source.svg"));

const jobs = [
  { src: icon, size: 192, out: "icon-192.png" },
  { src: icon, size: 512, out: "icon-512.png" },
  { src: icon, size: 180, out: "apple-touch-icon.png" },
  { src: icon, size: 32, out: "favicon-32.png" },
];

for (const j of jobs) {
  await sharp(j.src, { density: 384 })
    .resize(j.size, j.size)
    .png()
    .toFile(join(pub, j.out));
  console.log("wrote", j.out, `${j.size}x${j.size}`);
}

await sharp(og, { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile(join(pub, "og.png"));
console.log("wrote og.png 1200x630");
