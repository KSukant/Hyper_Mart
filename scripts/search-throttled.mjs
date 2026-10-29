const queries = [
  "Puma shoes",
  "Puma sneaker",
  "men blue jeans",
  "Levi jeans",
  "face serum bottle",
  "liquid foundation makeup",
  "cleanser pump bottle",
  "body lotion bottle",
  "perfume bottle",
  "sunscreen tube"
];

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "HyperMartPhotoAudit/1.0 (https://hypermart.test; audit@hypermart.test)" } });
    const text = await res.text();
    if (!text.startsWith("{")) {
      console.log(`[${q}] non-json response: ${text.slice(0, 80)}`);
      return;
    }
    const data = JSON.parse(text);
    if (!data.query?.pages) {
      console.log(`[${q}] no pages found`);
      return;
    }
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
    await new Promise(r => setTimeout(r, 1500));
  }
}

run();
