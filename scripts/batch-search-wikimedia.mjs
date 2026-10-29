import fs from "node:fs";

const queries = [
  "men kurta",
  "kids t shirt",
  "blue jeans",
  "running shoes",
  "wheat flour",
  "refrigerator",
  "laptop computer",
  "wireless earbuds",
  "usb charger adapter",
  "power bank",
  "samsung galaxy smartphone",
  "apple iphone 12",
  "lipstick tube",
  "liquid foundation bottle",
  "cosmetic dropper serum bottle",
  "facial cleanser bottle",
  "shampoo bottle",
  "body lotion bottle",
  "perfume bottle",
  "sunscreen lotion tube",
  "greek yogurt bowl"
];

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (contact@hypermart.test)" } });
  const data = await res.json();
  if (!data.query?.pages) return [];
  const results = [];
  for (const p of Object.values(data.query.pages)) {
    const info = p.imageinfo?.[0];
    if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/jpg")) continue;
    if (info.width < 800 || info.height < 800) continue;
    const meta = info.extmetadata || {};
    const author = (meta.Artist?.value || "Wikimedia Commons").replace(/<[^>]+>/g, "").trim();
    const license = (meta.LicenseShortName?.value || meta.License?.value || "CC BY-SA").trim();
    results.push({
      title: p.title,
      width: info.width,
      height: info.height,
      author: author.slice(0, 35),
      license,
      url: info.url,
      descUrl: info.descriptionurl,
    });
  }
  return results;
}

async function run() {
  for (const q of queries) {
    const res = await search(q);
    console.log(`\n=== QUERY: "${q}" (${res.length} matches >=800px) ===`);
    for (const r of res.slice(0, 3)) {
      console.log(`- [${r.width}x${r.height}] ${r.title}`);
      console.log(`  URL: ${r.url}`);
      console.log(`  Author: ${r.author} | License: ${r.license}`);
    }
  }
}

run().catch(console.error);
