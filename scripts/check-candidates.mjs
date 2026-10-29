import fs from "node:fs";

async function getMediaWikiInfo(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1200&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (audit@hypermart.test)" } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const info = page?.imageinfo?.[0];
  if (!info) return null;
  const meta = info.extmetadata || {};
  return {
    title,
    thumburl: info.thumburl,
    originalUrl: info.url,
    width: info.width,
    height: info.height,
    thumbwidth: info.thumbwidth,
    thumbheight: info.thumbheight,
    author: (meta.Artist?.value || "Wikimedia Commons").replace(/<[^>]+>/g, "").trim().slice(0, 40),
    license: (meta.LicenseShortName?.value || meta.License?.value || "CC BY-SA").trim(),
    sourceUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(title)}`
  };
}

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (audit@hypermart.test)" } });
  const data = await res.json();
  if (!data.query?.pages) return [];
  const list = [];
  for (const p of Object.values(data.query.pages)) {
    const info = p.imageinfo?.[0];
    if (!info || (info.mime !== "image/jpeg" && info.mime !== "image/jpg")) continue;
    if (info.width >= 800 && info.height >= 800) {
      list.push(p.title);
    }
  }
  return list;
}

const titlesToTest = [
  "File:Puma Suede.jpg",
  "File:HP Laptop 14S.jpg",
  "File:Dove shampoo bottle.jpg",
  "File:Sunbum sunscreen spf 30.jpg",
  "File:IPhone-12-Pro-Max(Blue).jpg",
  "File:Samsung Galaxy (Onyx Black) - Back.jpg",
  "File:Portable power bank.jpg",
  "File:Double Door Refrigerator.jpg",
  "File:Kurta traditional front sandalwood buttons.jpg",
  "File:Kerala banana chips Upperi varuthath.jpg",
  "File:All-Purpose Flour (4107895947).jpg",
  "File:ActiveSound wireless earbuds by Hykker (POJM200483).jpg",
  "File:USB Type-C Cable - iPad USB-C Charger (45640822114).jpg",
  "File:Lipstick- My top 5! - 18697835891.jpg",
  "File:Foundation (cosmetics).jpg",
  "File:Levi's 501 jeans 'small e' Red Tab (2025-12-19) 4.jpg"
];

async function run() {
  console.log("Checking candidate titles on Wikimedia Commons...");
  for (const t of titlesToTest) {
    const info = await getMediaWikiInfo(t);
    if (info) {
      console.log(`[OK] ${info.title} | ${info.thumbwidth}x${info.thumbheight} (orig ${info.width}x${info.height}) | ${info.author} | ${info.license}`);
      console.log(`     Thumb: ${info.thumburl}`);
    } else {
      console.log(`[FAIL] ${t}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}

run();
