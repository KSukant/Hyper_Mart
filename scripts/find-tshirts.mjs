const queries = [
  "cotton t-shirt",
  "printed t-shirt",
  "white t-shirt product",
  "crewneck t-shirt"
];

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0" } });
  const data = await res.json();
  if (!data.query?.pages) return;
  for (const p of Object.values(data.query.pages)) {
    const info = p.imageinfo?.[0];
    if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/jpg")) continue;
    if (info.width >= 800 && info.height >= 800) {
      console.log(`[${q}] [${info.width}x${info.height}] ${p.title} | ${info.url}`);
    }
  }
}

async function run() {
  for (const q of queries) {
    await search(q);
    await new Promise(r => setTimeout(r, 600));
  }
}
run();
