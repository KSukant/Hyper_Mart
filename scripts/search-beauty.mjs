const queries = [
  "essential oil dropper bottle",
  "dropper bottle",
  "cosmetics bottle",
  "makeup foundation",
  "skincare bottle",
  "face lotion bottle",
  "lipstick tube",
  "perfume bottle"
];

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "HyperMartPhotoAudit/1.0 (audit@hypermart.test)" } });
    const text = await res.text();
    if (!text.startsWith("{")) return;
    const data = JSON.parse(text);
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
  } catch (err) {
    console.error(`Error on ${q}:`, err.message);
  }
}

async function run() {
  for (const q of queries) {
    await search(q);
    await new Promise(r => setTimeout(r, 1200));
  }
}

run();
