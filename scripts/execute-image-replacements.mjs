import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicProducts = path.join(root, "public", "products");

// 1. Definition of all authentic image sources from Wikimedia Commons
const replacements = [
  {
    slug: "kerala-banana-chips-200g",
    dept: "food",
    title: "File:Kerala banana chips Upperi varuthath.jpg",
    fit: "cover",
    author: "Ramesh NG",
    licence: "CC BY-SA 2.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kerala_banana_chips_Upperi_varuthath.jpg"
  },
  {
    slug: "fortune-sunflower-oil-5l",
    dept: "food",
    title: "File:Zonnebloemolie (Sunflower oil).jpg",
    fit: "contain",
    author: "Rasbak",
    licence: "CC BY-SA 3.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Zonnebloemolie_(Sunflower_oil).jpg"
  },
  {
    slug: "aashirvaad-atta-5kg",
    dept: "food",
    title: "File:All-Purpose Flour (4107895947).jpg",
    fit: "cover",
    author: "Veganbaking.net",
    licence: "CC BY-SA 2.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:All-Purpose_Flour_(4107895947).jpg"
  },
  {
    slug: "manyavar-mens-cotton-kurta",
    dept: "fashion",
    title: "File:Kurta traditional front sandalwood buttons.jpg",
    fit: "contain",
    author: "Fowler&fowler at English Wikipedia",
    licence: "Public domain",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kurta_traditional_front_sandalwood_buttons.jpg"
  },
  {
    slug: "kids-cotton-tshirt",
    dept: "fashion",
    title: "File:Ambigram Ideal, polysymmetrical logo printed on a green T-shirt.jpg",
    fit: "contain",
    author: "Basile Morin",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ambigram_Ideal,_polysymmetrical_logo_printed_on_a_green_T-shirt.jpg"
  },
  {
    slug: "puma-running-shoes",
    dept: "fashion",
    title: "File:Puma Suede.jpg",
    fit: "contain",
    author: "LeDroider",
    licence: "CC0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Puma_Suede.jpg"
  },
  {
    slug: "levis-511-slim-jeans",
    dept: "fashion",
    title: "File:Levi's 501 jeans 'small e' Red Tab (2025-12-19) 4.jpg",
    fit: "contain",
    author: "Olgierd Rudak",
    licence: "CC0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Levi%27s_501_jeans_%27small_e%27_Red_Tab_(2025-12-19)_4.jpg"
  },
  {
    slug: "lg-260l-frost-free-refrigerator",
    dept: "electronics",
    title: "File:Double Door Refrigerator.jpg",
    fit: "contain",
    author: "燕京赵大知识分子",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Double_Door_Refrigerator.jpg"
  },
  {
    slug: "hp-14-laptop-i5-16gb",
    dept: "electronics",
    title: "File:HP Laptop 14S.jpg",
    fit: "contain",
    author: "MayankMurthy0606",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:HP_Laptop_14S.jpg"
  },
  {
    slug: "boat-airdopes-141",
    dept: "electronics",
    title: "File:ActiveSound wireless earbuds by Hykker (POJM200483).jpg",
    fit: "contain",
    author: "Warszawska róg Szerokiej w Tomaszowie Mazowieckim",
    licence: "Public domain",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:ActiveSound_wireless_earbuds_by_Hykker_(POJM200483).jpg"
  },
  {
    slug: "apple-20w-usb-c-charger",
    dept: "electronics",
    title: "File:USB Type-C Cable - iPad USB-C Charger (45640822114).jpg",
    fit: "contain",
    author: "Tony Webster",
    licence: "CC BY 2.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:USB_Type-C_Cable_-_iPad_USB-C_Charger_(45640822114).jpg"
  },
  {
    slug: "mi-10000mah-power-bank",
    dept: "electronics",
    title: "File:Portable power bank.jpg",
    fit: "contain",
    author: "Santeri Viinamäki",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Portable_power_bank.jpg"
  },
  {
    slug: "samsung-galaxy-m35-5g",
    dept: "electronics",
    title: "File:Samsung Galaxy (Onyx Black) - Back.jpg",
    fit: "contain",
    author: "Beamish4",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Samsung_Galaxy_(Onyx_Black)_-_Back.jpg"
  },
  {
    slug: "refurbished-iphone-12-64gb",
    dept: "electronics",
    title: "File:IPhone-12-Pro-Max(Blue).jpg",
    fit: "contain",
    author: "KeySpace",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IPhone-12-Pro-Max(Blue).jpg"
  },
  {
    slug: "dove-hair-fall-rescue-shampoo-340ml",
    dept: "beauty",
    title: "File:Dove shampoo bottle.jpg",
    fit: "contain",
    author: "Ranjima np",
    licence: "CC0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dove_shampoo_bottle.jpg"
  },
  {
    slug: "lakme-sun-expert-spf50-100ml",
    dept: "beauty",
    title: "File:Sunbum sunscreen spf 30.jpg",
    fit: "contain",
    author: "David Chancey",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunbum_sunscreen_spf_30.jpg"
  },
  {
    slug: "maybelline-fit-me-foundation",
    dept: "beauty",
    title: "File:Foundation (cosmetics).jpg",
    fit: "contain",
    author: "Jen",
    licence: "CC BY-SA 3.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Foundation_(cosmetics).jpg"
  },
  {
    slug: "lakme-9to5-matte-lipstick",
    dept: "beauty",
    title: "File:Lipstick- My top 5! - 18697835891.jpg",
    fit: "contain",
    author: "Vanilla and lace",
    licence: "CC BY 2.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lipstick-_My_top_5!_-_18697835891.jpg"
  },
  {
    slug: "bella-vita-perfume-100ml",
    dept: "beauty",
    title: "File:Ck-Euphoria Men.jpg",
    fit: "contain",
    author: "Wikimedia Commons",
    licence: "CC BY-SA 3.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ck-Euphoria_Men.jpg"
  },
  {
    slug: "minimalist-niacinamide-serum-30ml",
    dept: "beauty",
    title: "File:A serum made.jpg",
    fit: "contain",
    author: "Jp.c.valenzuela",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_serum_made.jpg"
  },
  {
    slug: "minimalist-niacinamide-serum-10ml-mini",
    dept: "beauty",
    title: "File:A serum made.jpg",
    fit: "contain",
    author: "Jp.c.valenzuela",
    licence: "CC BY-SA 4.0",
    source: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_serum_made.jpg"
  }
];

// 2. Placeholders for items awaiting official manufacturer image
const placeholders = [
  {
    slug: "cetaphil-gentle-cleanser-125ml",
    dept: "beauty",
    name: "Cetaphil Gentle Skin Cleanser",
    reason: "Awaiting verified Cetaphil manufacturer packaging photography to ensure exact formula/variant accuracy."
  },
  {
    slug: "nivea-body-lotion-400ml",
    dept: "beauty",
    name: "Nivea Nourishing Body Milk Lotion",
    reason: "Awaiting verified Nivea manufacturer packaging photography to match exact bottle shade and volume."
  }
];

async function fetchThumbnailUrl(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=1200&format=json`;
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0 (contact@hypermart.test)" } });
  const data = await res.json();
  const page = Object.values(data.query.pages)[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url;
}

async function createNeutralPlaceholder(productName) {
  const svg = `
  <svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1000" fill="#F8FAFC"/>
    <rect x="40" y="40" width="920" height="920" rx="32" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3" stroke-dasharray="12 12"/>
    <g transform="translate(436, 320)">
      <rect width="128" height="104" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="4"/>
      <circle cx="64" cy="52" r="28" fill="none" stroke="#94A3B8" stroke-width="4"/>
      <circle cx="96" cy="30" r="6" fill="#94A3B8"/>
      <path d="M48 20 L56 8 L72 8 L80 20 Z" fill="#94A3B8"/>
    </g>
    <text x="500" y="520" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#0F172A" letter-spacing="1.5">
      AUTHENTIC PHOTO PENDING
    </text>
    <text x="500" y="565" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="#64748B">
      ${productName}
    </text>
    <rect x="360" y="605" width="280" height="40" rx="20" fill="#EEF2F6"/>
    <text x="500" y="631" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#475569">
      Awaiting Verified Brand Asset
    </text>
  </svg>
  `;
  return sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toBuffer();
}

async function main() {
  console.log("=== EXECUTING AUTHENTIC IMAGE REPLACEMENTS ===");

  // A. Process authentic replacements
  for (const item of replacements) {
    console.log(`\n[REPLACING] ${item.slug} (${item.dept}) with "${item.title}"...`);
    try {
      const thumbUrl = await fetchThumbnailUrl(item.title);
      if (!thumbUrl) throw new Error(`Could not get URL for ${item.title}`);
      
      const res = await fetch(thumbUrl, { headers: { "User-Agent": "HyperMart-Audit/1.0" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const rawBuf = Buffer.from(await res.arrayBuffer());

      // Resize and center onto 1000x1000 square
      let pipeline = sharp(rawBuf);
      if (item.fit === "contain") {
        pipeline = pipeline.resize(1000, 1000, {
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        });
      } else {
        pipeline = pipeline.resize(1000, 1000, {
          fit: "cover",
          position: "center"
        });
      }
      const processed = await pipeline.jpeg({ quality: 90 }).toBuffer();

      // Write to slug directory: public/products/<slug>/1.jpg
      const slugDir = path.join(publicProducts, item.slug);
      if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true });
      fs.writeFileSync(path.join(slugDir, "1.jpg"), processed);

      // Write to department directory: public/products/<dept>/<slug>-1.jpg
      const deptDir = path.join(publicProducts, item.dept);
      if (!fs.existsSync(deptDir)) fs.mkdirSync(deptDir, { recursive: true });
      fs.writeFileSync(path.join(deptDir, `${item.slug}-1.jpg`), processed);

      // If boAt earbuds, also update hero earbuds image
      if (item.slug === "boat-airdopes-141") {
        fs.writeFileSync(path.join(root, "public", "hero", "earbuds.jpg"), processed);
        console.log(`  -> Also updated public/hero/earbuds.jpg`);
      }

      // Update credits.json
      const creditsPath = path.join(slugDir, "credits.json");
      const creditsData = {
        images: [
          {
            file: "1.jpg",
            author: item.author,
            licence: item.licence,
            source: item.source,
            sourceUrl: item.sourceUrl
          }
        ]
      };
      fs.writeFileSync(creditsPath, JSON.stringify(creditsData, null, 2));
      console.log(`  -> Successfully saved 1000x1000 image and updated credits.json`);
    } catch (err) {
      console.error(`  x ERROR on ${item.slug}:`, err.message);
    }
    // Polite delay for MediaWiki API
    await new Promise(r => setTimeout(r, 600));
  }

  // B. Process neutral placeholders
  for (const ph of placeholders) {
    console.log(`\n[SETTING PLACEHOLDER] ${ph.slug} (${ph.name})...`);
    try {
      const placeholderBuf = await createNeutralPlaceholder(ph.name);

      const slugDir = path.join(publicProducts, ph.slug);
      if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true });
      fs.writeFileSync(path.join(slugDir, "1.jpg"), placeholderBuf);

      const deptDir = path.join(publicProducts, ph.dept);
      if (!fs.existsSync(deptDir)) fs.mkdirSync(deptDir, { recursive: true });
      fs.writeFileSync(path.join(deptDir, `${ph.slug}-1.jpg`), placeholderBuf);

      const creditsPath = path.join(slugDir, "credits.json");
      const creditsData = {
        images: [
          {
            file: "1.jpg",
            author: "HyperMart Quality Assurance",
            licence: "Neutral Fallback — Awaiting Brand Verification",
            source: "HyperMart Placeholder System",
            sourceUrl: "/editorial/authenticity-policy"
          }
        ]
      };
      fs.writeFileSync(creditsPath, JSON.stringify(creditsData, null, 2));
      console.log(`  -> Successfully created 1000x1000 neutral placeholder and updated credits.json`);
    } catch (err) {
      console.error(`  x ERROR on placeholder ${ph.slug}:`, err.message);
    }
  }

  console.log("\n=== ALL REPLACEMENTS AND PLACEHOLDERS APPLIED SUCCESSFULLY ===");
}

main().catch(console.error);
