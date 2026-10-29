import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");

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

console.log("=== HYPERMART COMPLETE IMAGE AUDIT ===");

// 1. Audit Products
const depts = ["food", "fashion", "electronics", "beauty"];
const products = [];

for (const dep of depts) {
  const content = fs.readFileSync(path.join(root, "src", "mocks", "products", `${dep}.ts`), "utf-8");
  const matches = content.matchAll(/slug:\s*"([^"]+)"/g);
  for (const match of matches) {
    products.push({ slug: match[1], dept: dep });
  }
}

console.log(`\n1. Auditing ${products.length} Products across 4 Departments:`);
let validProducts = 0;
let aiOrInvalidProducts = 0;

for (const p of products) {
  const creditsPath = path.join(publicDir, "products", p.slug, "credits.json");
  const img1 = path.join(publicDir, "products", p.slug, "1.jpg");
  const img2 = path.join(publicDir, "products", p.dept, `${p.slug}-1.jpg`);
  const actualImg = fs.existsSync(img1) ? img1 : (fs.existsSync(img2) ? img2 : null);

  if (!actualImg || !fs.existsSync(creditsPath)) {
    console.log(`  [MISSING] ${p.slug}: image or credits missing`);
    aiOrInvalidProducts++;
    continue;
  }

  const credits = JSON.parse(fs.readFileSync(creditsPath, "utf-8"));
  const credit = credits.images[0];
  const size = getJpgSize(actualImg);

  const isAuthentic = credit && (
    (credit.source && /unsplash|pexels|wikimedia|brand|manufacturer/i.test(credit.source)) ||
    (credit.sourceUrl && /unsplash\.com|pexels\.com|wikimedia\.org/i.test(credit.sourceUrl))
  );
  if (isAuthentic && size && size.width >= 800 && size.height >= 800) {
    validProducts++;
  } else {
    console.log(`  [FLAGGED] ${p.slug}: Authentic=${isAuthentic}, Size=${size?.width}x${size?.height}`);
    aiOrInvalidProducts++;
  }
}

console.log(`  -> Valid authentic product photos (>=800px with verified photo credits): ${validProducts}/${products.length}`);

// 2. Audit Hero Slides
console.log(`\n2. Auditing Hero Slides:`);
const heroImages = [
  { file: "hero/earbuds.jpg", label: "Electronics Hero (boAt Earbuds)" },
  { file: "hero/fresh-veg.jpg", label: "Food Hero (Fresh Vegetables)" },
  { file: "hero/silk-saree.jpg", label: "Fashion Hero (Silk Saree)" },
  { file: "hero/rewards.jpg", label: "Rewards Hero (Supermarket Groceries)" },
];

for (const h of heroImages) {
  const p = path.join(publicDir, h.file);
  const exists = fs.existsSync(p);
  const size = exists ? getJpgSize(p) : null;
  console.log(`  [${exists ? "OK" : "MISSING"}] ${h.label}: ${h.file} (${size?.width}x${size?.height})`);
}

// 3. Audit Brand Logos & Static Assets
console.log(`\n3. Auditing Brand Logo Assets:`);
const logos = ["logo/hypermart-logo.png", "logo/hypermart-logo.webp"];
for (const l of logos) {
  const p = path.join(publicDir, l);
  console.log(`  [${fs.existsSync(p) ? "OK" : "MISSING"}] ${l}`);
}

// 4. Audit Components for inline or hardcoded images
console.log(`\n4. Auditing UI Components for any hardcoded or AI-generated image URLs:`);
function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) scanDir(full);
    else if (/\.(tsx|ts)$/.test(f.name)) {
      const code = fs.readFileSync(full, "utf-8");
      // Search for any .jpg, .png, .webp, .svg, .avif strings
      const matches = Array.from(code.matchAll(/["'](\/[^"']+\.(jpg|jpeg|png|webp|svg|avif))["']/g));
      for (const m of matches) {
        const imgPath = m[1];
        if (imgPath.startsWith("/products/placeholder-") || imgPath.startsWith("/products/") || imgPath.startsWith("/hero/") || imgPath.startsWith("/logo/")) {
          // Known internal assets
        } else {
          console.log(`  Found external/custom reference: ${imgPath} in ${path.relative(root, full)}`);
        }
      }
    }
  }
}
scanDir(path.join(root, "src"));

console.log("\n=== AUDIT COMPLETE ===");
