import fs from "node:fs";
import path from "node:path";

const candidates = [
  { name: "flour-atta.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/6/64/All-Purpose_Flour_%284107895947%29.jpg" },
  { name: "boy-tshirt.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Justin._A_boy_wearing_a_T-shirt_and_jeans.jpg" },
  { name: "puma-suede.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Puma_Suede.jpg" },
  { name: "levis-jeans.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Levi%27s_501_jeans_%27small_e%27_Red_Tab_%282025-12-19%29_4.jpg" },
  { name: "hp-laptop.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/HP_Laptop_14S.jpg" },
  { name: "power-bank.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/7/75/Portable_power_bank.jpg" },
  { name: "refrigerator.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/8/88/Double_Door_Refrigerator.jpg" },
  { name: "samsung-galaxy.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Samsung_Galaxy_%28Onyx_Black%29_-_Back.jpg" },
  { name: "iphone-12.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/2/25/IPhone-12-Pro-Max%28Blue%29.jpg" },
  { name: "earbuds-case.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/4/46/MS-TW21NV%E3%81%AE%E7%94%BB%E5%83%8F_2.jpg" },
  { name: "apple-charger.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/USB_Type-C_Cable_-_iPad_USB-C_Charger_%2845640822114%29.jpg" },
  { name: "dove-shampoo.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Dove_shampoo_bottle.jpg" },
  { name: "lipstick.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Lipstick-_My_top_5%21_-_18697835891.jpg" },
  { name: "foundation.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Foundation_%28cosmetics%29.jpg" },
  { name: "sunscreen.jpg", url: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Sunbum_sunscreen_spf_30.jpg" }
];

const outDir = path.join(process.cwd(), "scratch");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function downloadAll() {
  for (const item of candidates) {
    const dest = path.join(outDir, item.name);
    console.log(`Downloading ${item.name}...`);
    try {
      const res = await fetch(item.url, { headers: { "User-Agent": "HyperMart-Audit/1.0" } });
      if (!res.ok) {
        console.error(`Failed ${item.name}: HTTP ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      console.log(`Saved ${item.name} (${buf.length} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 800));
  }
}

downloadAll();
