const queries = {
  // Food
  "atta": ["atta flour", "wheat flour", "flour in bowl", "chakki atta"],
  "yogurt": ["greek yogurt", "plain yogurt bowl", "curd in bowl"],
  
  // Fashion
  "kids-tshirt": ["kid wearing t shirt", "child t shirt", "boy wearing t shirt", "kids clothing t-shirt"],
  "jeans": ["blue jeans denim", "men blue jeans", "folded blue jeans", "denim trousers"],
  "running-shoes": ["running shoes sneaker", "puma shoes", "athletic running shoe", "sneaker trainer"],
  
  // Electronics
  "refrigerator": ["refrigerator double door", "fridge open", "kitchen refrigerator", "modern refrigerator"],
  "laptop": ["hp laptop", "laptop computer desk", "laptop modern silver"],
  "earbuds": ["wireless earbuds case", "tws earbuds", "bluetooth earbuds"],
  "apple-charger": ["apple 20w usb c", "usb c charger plug", "usb c power adapter wall"],
  "power-bank": ["power bank portable", "usb power bank", "portable charger battery"],
  
  // Beauty
  "lipstick": ["red lipstick cosmetic", "lipstick tube open", "matte lipstick makeup"],
  "foundation": ["liquid foundation makeup", "foundation bottle cosmetic", "cosmetic foundation"],
  "serum": ["serum dropper bottle", "essential oil dropper bottle", "cosmetic dropper bottle"],
  "cleanser": ["facial cleanser bottle", "pump bottle cosmetic", "skin cleanser soap"],
  "body-lotion": ["body lotion bottle", "moisturizing lotion bottle", "lotion pump bottle"],
  "perfume": ["perfume spray bottle", "cologne bottle glass", "fragrance bottle"],
  "sunscreen": ["sunscreen tube", "sunscreen bottle", "sun cream tube", "suntan lotion"]
};

async function search(q) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (audit@hypermart.com)" } });
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
  for (const [key, qList] of Object.entries(queries)) {
    console.log(`\n=================== [${key.toUpperCase()}] ===================`);
    let found = false;
    for (const q of qList) {
      const res = await search(q);
      if (res.length > 0) {
        console.log(`Match for "${q}":`);
        for (const r of res.slice(0, 2)) {
          console.log(`  - [${r.width}x${r.height}] ${r.title}`);
          console.log(`    URL: ${r.url}`);
          console.log(`    Author: ${r.author} | License: ${r.license}`);
        }
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`  No >=800px matches found across queries: ${qList.join(", ")}`);
    }
  }
}

run().catch(console.error);
