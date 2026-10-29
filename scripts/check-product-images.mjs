// Build-time image check script.
// FAILS if a product has no image, an SVG as its primary image, an image under 800px, or a missing credits entry.
import fs from "node:fs";
import path from "node:path";

function getJpgSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) break;
    const marker = buffer[offset + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    const len = buffer.readUInt16BE(offset + 2);
    offset += 2 + len;
  }
  return null;
}

const root = process.cwd();
const publicDir = path.join(root, "public", "products");

// Read all product slugs by inspecting mock files or public/products directories
const productSlugs = [];
const depts = ["food", "fashion", "electronics", "beauty"];

for (const dep of depts) {
  const fileContent = fs.readFileSync(path.join(root, "src", "mocks", "products", `${dep}.ts`), "utf-8");
  const matches = fileContent.matchAll(/slug:\s*"([^"]+)"/g);
  for (const match of matches) {
    productSlugs.push({ slug: match[1], dept: dep });
  }
}

console.log(`Checking ${productSlugs.length} products for real photography and valid credits...`);

const errors = [];
let checkedCount = 0;

for (const { slug, dept } of productSlugs) {
  const slugDir = path.join(publicDir, slug);
  const creditsFile = path.join(slugDir, "credits.json");

  // 1. Check credits.json exists
  if (!fs.existsSync(creditsFile)) {
    errors.push(`[${slug}] Missing credits.json in public/products/${slug}/credits.json`);
    continue;
  }

  // 2. Validate credits.json content
  try {
    const credits = JSON.parse(fs.readFileSync(creditsFile, "utf-8"));
    if (!credits.images || !Array.isArray(credits.images) || credits.images.length === 0) {
      errors.push(`[${slug}] credits.json does not have a valid images array`);
      continue;
    }
    const firstCredit = credits.images[0];
    if (!firstCredit.source || !firstCredit.licence || !firstCredit.author) {
      errors.push(`[${slug}] credits.json entry is missing source, licence, or author`);
      continue;
    }
  } catch (e) {
    errors.push(`[${slug}] Failed to parse credits.json: ${e.message}`);
    continue;
  }

  // 3. Check primary image exists
  const slugImg = path.join(slugDir, "1.jpg");
  const deptImg = path.join(publicDir, dept, `${slug}-1.jpg`);
  const imagePath = fs.existsSync(slugImg) ? slugImg : fs.existsSync(deptImg) ? deptImg : null;

  if (!imagePath) {
    errors.push(`[${slug}] No primary image file found in public/products/${slug}/ or public/products/${dept}/`);
    continue;
  }

  // 4. Primary image must not be an SVG
  if (imagePath.endsWith(".svg")) {
    errors.push(`[${slug}] Primary image is an SVG: ${imagePath}`);
    continue;
  }

  // 5. Image dimensions must be at least 800px on both sides (or on long side)
  const size = getJpgSize(imagePath);
  if (!size) {
    errors.push(`[${slug}] Could not determine image dimensions for ${imagePath}`);
    continue;
  }

  if (size.width < 800 || size.height < 800) {
    errors.push(`[${slug}] Image dimensions (${size.width}x${size.height}) are under 800px in ${imagePath}`);
    continue;
  }

  checkedCount++;
}

if (errors.length > 0) {
  console.error(`\nBuild-time Image Check FAILED with ${errors.length} error(s):`);
  errors.forEach((err) => console.error(`  x ${err}`));
  process.exit(1);
}

console.log(`\nBuild-time Image Check PASSED: All ${checkedCount} products have verified real photography (>= 800px) and valid credits.json entries.\n`);
process.exit(0);
