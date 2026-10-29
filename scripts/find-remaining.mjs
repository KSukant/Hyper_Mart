async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=4&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (contact@hypermart.test)" } });
  const data = await res.json();
  if (!data.query?.pages) return [];
  const list = [];
  for (const p of Object.values(data.query.pages)) {
    const info = p.imageinfo?.[0];
    if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/jpg")) continue;
    if (info.width >= 800 && info.height >= 800) {
      list.push({ title: p.title, w: info.width, h: info.height });
    }
  }
  return list;
}

const queries = [
  "child t-shirt",
  "kids t-shirt",
  "t-shirt hanger",
  "dropper bottle essential",
  "serum bottle",
  "lotion bottle pump",
  "body lotion",
  "cologne bottle",
  "mens perfume bottle",
  "liquid soap pump dispenser bottle"
];

async function run() {
  for (const q of queries) {
    const res = await search(q);
    console.log(`\n=== "${q}" (${res.length}) ===`);
    for (const r of res) {
      console.log(`- ${r.title} (${r.w}x${r.h})`);
    }
    await new Promise(res => setTimeout(res, 600));
  }
}

run();
