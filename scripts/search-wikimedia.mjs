import fs from "node:fs";

const query = process.argv[2] || "sunflower oil";

async function searchCommons(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (contact@hypermart.test)" } });
  const data = await res.json();
  if (!data.query || !data.query.pages) {
    console.log("No results for", q);
    return;
  }
  const pages = Object.values(data.query.pages);
  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    if (info.mime !== "image/jpeg" && info.mime !== "image/jpg") continue;
    const meta = info.extmetadata || {};
    const author = (meta.Artist?.value || "Wikimedia Commons").replace(/<[^>]+>/g, "").trim();
    const license = (meta.LicenseShortName?.value || meta.License?.value || "CC BY-SA").trim();
    console.log({
      title: p.title,
      width: info.width,
      height: info.height,
      author: author.slice(0, 40),
      license,
      url: info.url,
      descUrl: info.descriptionurl,
    });
  }
}

searchCommons(query).catch(console.error);
