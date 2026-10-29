const queries = [
  "wheat flour",
  "flour in bowl",
  "boy t-shirt",
  "children t-shirt",
  "folded t-shirt",
  "pair of blue jeans",
  "blue jeans",
  "running shoe",
  "sneakers",
  "lipstick open",
  "liquid foundation",
  "cosmetics dropper",
  "essential oil bottle",
  "body lotion",
  "perfume bottle glass",
  "shampoo",
  "sunscreen"
];

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0" } });
  const data = await res.json();
  if (!data.query?.pages) return;
  for (const p of Object.values(data.query.pages)) {
    const info = p.imageinfo?.[0];
    if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/jpg")) continue;
    if (info.width < 800 || info.height < 800) continue;
    const meta = info.extmetadata || {};
    const author = (meta.Artist?.value || "Wikimedia Commons").replace(/<[^>]+>/g, "").trim();
    const license = (meta.LicenseShortName?.value || meta.License?.value || "CC BY-SA").trim();
    console.log(`[${q}] [${info.width}x${info.height}] ${p.title} | ${info.url} | ${author} | ${license}`);
  }
}

async function run() {
  for (const q of queries) {
    await search(q);
  }
}

run().catch(console.error);
