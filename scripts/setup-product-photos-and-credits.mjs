import fs from "node:fs";
import path from "node:path";

// 1. Fix 600px minimalist mini image using the 800px full size photo from same Unsplash source
const miniSrc = path.join("public", "products", "beauty", "minimalist-niacinamide-serum-10ml-mini-1.jpg");
const fullSrc = path.join("public", "products", "beauty", "minimalist-niacinamide-serum-30ml-1.jpg");
if (fs.existsSync(fullSrc)) {
  fs.copyFileSync(fullSrc, miniSrc);
  console.log("Updated minimalist 10ml mini to 800x800 source image.");
}

// 2. Parse CREDITS.md to get photographer, source url and licence for each product
const creditsMd = fs.readFileSync(path.join("public", "CREDITS.md"), "utf-8");
const creditsMap = new Map();

for (const line of creditsMd.split("\n")) {
  const match = line.match(/`products\/(food|fashion|electronics|beauty)\/([^`]+)-1\.jpg`\s*\|\s*\[View Source\]\(([^)]+)\)\s*\|\s*([^|]+)\|\s*([^|]+)\|/);
  if (match) {
    const [, dept, slug, sourceUrl, photographer, licence] = match;
    creditsMap.set(slug, {
      dept,
      sourceUrl: sourceUrl.trim(),
      photographer: photographer.trim(),
      licence: licence.trim(),
    });
  }
}

console.log(`Parsed ${creditsMap.size} product credits from CREDITS.md`);

// 3. For each product, create public/products/<slug>/1.jpg and public/products/<slug>/credits.json
for (const [slug, meta] of creditsMap.entries()) {
  const targetDir = path.join("public", "products", slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const srcImg = path.join("public", "products", meta.dept, `${slug}-1.jpg`);
  const dstImg = path.join(targetDir, "1.jpg");
  if (fs.existsSync(srcImg)) {
    fs.copyFileSync(srcImg, dstImg);
  }

  const creditsData = {
    slug,
    images: [
      {
        file: "1.jpg",
        source: meta.sourceUrl.includes("unsplash") ? "Unsplash" : "Pexels",
        sourceUrl: meta.sourceUrl,
        author: meta.photographer,
        licence: meta.licence,
        date: "2024",
      },
    ],
  };

  fs.writeFileSync(
    path.join(targetDir, "credits.json"),
    JSON.stringify(creditsData, null, 2) + "\n"
  );
}

console.log("All product folders and credits.json generated successfully.");
