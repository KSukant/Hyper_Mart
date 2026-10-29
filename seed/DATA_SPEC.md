# HyperMart — Data Specification (prerequisite data)

This document lists **every piece of data the website needs before screens can be built**, what each field means, which screens use it, the rules it must follow, and what is still missing from the business.

The data itself is already prepared in `src/types/index.ts` (shapes) and `src/mocks/` (values). Antigravity must **use these files as they are** and must not invent other products, prices or rules.

---

## 0. How to use these files

1. Copy `src/types/` and `src/mocks/` into the Next.js project created in Part 0 (same paths).
2. Copy `scripts/validate-mocks.ts` and run `npx tsx scripts/validate-mocks.ts` — it must print **"All checks passed"**. Run it again after any data change.
3. Screens never import from `src/mocks/` directly. They call `src/lib/api.ts`, which calls the mock API routes, which read `src/mocks/`. Later a real backend replaces the routes; screens stay the same.
4. Every value marked **DEMO** (FSSAI numbers, GSTIN, phone numbers, warehouse addresses, model numbers) is a placeholder. The real values must come from the business before launch (§9).

### File map

| File | Contains | Used by |
|---|---|---|
| `types/index.ts` | All TypeScript types | Every file |
| `mocks/geo.ts` | Cities, warehouses, pincodes, delivery slots | Header location selector, delivery dates, checkout slots |
| `mocks/catalog.ts` | Departments, categories, brands, return policies | Category pages, filters, product page, checkout |
| `mocks/products/*.ts` | 33 products (8 food, 8 fashion, 9 beauty incl. 1 mini, 8 electronics) | All shopping screens |
| `mocks/stock.ts` | Stock per product × warehouse × variant, batches | Availability, low-stock, notify-me, shelf life |
| `mocks/offers.ts` | 12 offers + 4 hero slides | Home hero, Offers page, prices |
| `mocks/rules.ts` | Delivery fees, COD rules, membership plan, payment methods, change cut-offs | Cart, checkout, product page |
| `mocks/content.ts` | Navigation, footer, strips, quick chips, fixed UI text, FAQs | Layout, home, help |
| `mocks/customers.ts` | 2 demo customers, 4 orders, 9 reviews | Account, tracking, reviews |

---

## 1. Location data

### 1.1 City
| Field | Type | Meaning | Rules |
|---|---|---|---|
| `id` | string | Short code | `cbe`, `che`, `blr`, `kochi` |
| `name` | string | Display name | Shown as "Deliver to 641004 · **Coimbatore**" |
| `state`, `stateCode` | string | For GST and address | |
| `languages` | Language[] | Options in the language switcher | First is the default |
| `launched` | boolean | City live or not | |

### 1.2 Warehouse (one per city)
| Field | Meaning | Rules / screen use |
|---|---|---|
| `id` | `wh-<city>-01` | Stock and orders reference this |
| `address` | Full address | Shown on invoices only, never as a "store" |
| `fssaiLicence` | Food licence | Shown on food product pages: "FSSAI Lic. No. …" (**DEMO**) |
| `sameDayCutoff` | "14:00" | Fresh orders before this time can be delivered today |
| `openHours` | Dispatch hours | Used for slot generation |
| `zones` | Storage areas | Warehouse portal later |
| `dailyOrderCapacity` | Max orders per day | Used to close slots during promotions |

### 1.3 Pincode area
| Field | Meaning | Rules |
|---|---|---|
| `pincode` | 6 digits | Validate `^\d{6}$` |
| `area` | Locality | Shown under the pincode in the location popover |
| `cityId`, `warehouseId` | Which warehouse serves it | `null` when not serviceable |
| `serviceable` | Delivered or not | `false` → "We don't deliver to 625001 yet" + Notify me |
| `distanceBand` | A (<8 km), B (8–15), C (15–25) | Sets delivery fee (§6.1) |
| `sameDayFresh` | Same-day fresh offered | Band C areas get next-day only |

**Included:** 21 serviceable pincodes across 4 cities + 3 not-serviceable (Madurai 625001, Salem 636001, Mysuru 570001). **Default pincode:** 641004 (Peelamedu, Coimbatore).

### 1.4 Delivery slot
6 two-hour slots from 7 AM to 9 PM. Each slot has:
- `sameDayAllowed` — only 3 PM, 5 PM and 7 PM slots can be same-day.
- `allowedHandling` — heat-sensitive items only in 7–11 AM and 5–9 PM; heavy items only 9 AM–5 PM.
- `capacityPerWarehouse` — when full, the slot shows "Full" and is disabled.

---

## 2. Catalogue data

### 2.1 Department (4)
`id`, `name`, `shortName`, `tagline`, `colorToken` (maps to DESIGN.md §2.2), `icon` (lucide name), `deliveryNote` (shown on the category tile), `sortOrder`.

### 2.2 Category (27)
Two levels: department → category → sub-category. Each category carries a **default return policy** (`returnPolicyId`), which a product can override.

| Department | Categories |
|---|---|
| Food | Fresh fruits and vegetables (Vegetables, Fruits) · Dairy, bread and eggs · Atta, rice, oil and dals · Snacks and regional specialities |
| Fashion | Men (Ethnic wear, Shirts and jeans) · Women (Sarees, Kurtas and sets) · Kids · Footwear · Winter wear |
| Beauty | Makeup · Skincare · Haircare · Bath and body · Fragrances |
| Electronics | Televisions · Large appliances · Laptops · Mobiles · Refurbished · Accessories · Audio |

### 2.3 Brand (28)
| Field | Meaning | Screen use |
|---|---|---|
| `name` | Brand name | "Brand: Lakmé" line on product page and card |
| `authorisedSource` | `brand_direct`, `authorised_distributor`, `own_sourcing` | Beauty/electronics trust card: "Sourced from authorised distributor" |
| `evidenceValidTill` | Authorisation expiry | If past today, **hide** the sourcing line (don't show a false claim) |
| `customerCare` | Brand helpline | Electronics warranty section |

### 2.4 Return policy (9) — shown before purchase and saved on every order line
| ID | Type | Label shown | Used for |
|---|---|---|---|
| `rp-fresh` | quality_complaint_only | Quality complaint within 24 h | Fruits, vegetables |
| `rp-perishable` | quality_complaint_only | Quality complaint within 24 h | Milk, eggs, yogurt |
| `rp-packaged-food` | non_returnable | Non-returnable | Atta, oil, snacks |
| `rp-fashion` | returnable | 7-day return | Most clothing and shoes |
| `rp-fashion-exchange` | exchange_only | Exchange only, 7 days | Silk sarees |
| `rp-beauty-sealed` | returnable_if_sealed | Returnable if sealed | All beauty |
| `rp-electronics` | replacement_only | 7-day replacement | Laptops, phones, accessories, audio |
| `rp-large-appliance` | replacement_only | 10-day replacement | TVs, refrigerators |
| `rp-refurbished` | returnable | 7-day return | Refurbished devices |

Each has `conditions[]` (bullet list for product page and checkout), `evidenceRequired`, `refundMethod` and `version`.

---

## 3. Product data (every field)

### 3.1 Common fields (all departments)
| Field | Type | Meaning | Rules | Shown on |
|---|---|---|---|---|
| `id` | string | `p-<dept>-<nnn>` | Unique | — |
| `slug` | string | URL part | Lowercase, hyphens, unique | `/product/<slug>` |
| `name` | string | Full product name | Max ~70 chars, no brand duplication issues | Card (2 lines max), product page H1 |
| `brandId` | ID | Link to Brand | Must exist | "Brand: X" |
| `soldBy` | "HyperMart" | Seller of record | Always "HyperMart" | "Sold by: HyperMart" |
| `department` | Department | | Must match category and attrs | Badges, panels, colours |
| `categoryId` | ID | | Must exist in same department | Breadcrumb, filters |
| `description` | string | 1–2 sentences | Plain language | Product page |
| `highlights` | string[] | 3–5 bullets | Short, factual; brand claims say "(brand claim)" | Product page top |
| `images` | ProductImage[] | Photos with `kind` and `alt` | First is `main`; see §8 for file list | Card, gallery |
| `unit` | string | "1 kg", "500 g", "per kg", "1 pc" | Use these formats | Card under name |
| `mrp` | rupees | Maximum retail price | ≥ price | Struck-through |
| `price` | rupees | Everyday price | Integer | Main price |
| `memberPrice` | rupees? | Rewards price | < price | Yellow pill |
| `gstRatePct`, `hsn` | number, string | Tax data | | Invoice only |
| `rating`, `ratingCount` | number | Verified-purchase rating | 0–5, one decimal | Card, product page |
| `returnPolicyId` | ID | | Must exist | Return line everywhere |
| `manufacturer` | {name, address, countryOfOrigin} | Legal label info | Required | "Manufacturer details" section |
| `weightKg`, `packedDimensionsCm` | number, {l,w,h} | Shipping size | Required | Delivery fee, heavy-item rules |
| `handling` | HandlingTag[] | Special handling | See §3.6 | Delivery notes, slot limits, fees |
| `codAllowed` | boolean | COD possible | Must match COD rules | Checkout payment options |
| `maxQtyPerOrder` | number | Limit | | Quantity stepper max |
| `tags` | string[] | Search keywords incl. Tamil/Malayalam words | | Search |
| `isNew` | boolean? | Recently added | 8 products are flagged | New Arrivals page, "New" badge |
| `attrs` | union | Department-specific data | See below | Department panels |

### 3.2 Food fields (`FoodAttrs`)
| Field | Meaning | Screen |
|---|---|---|
| `vegMark` | veg / nonveg / egg | Green/brown square mark beside the name (Indian standard) |
| `storage` | ambient / chilled / frozen | "Chilled delivery" badge, ₹15 cold-chain fee |
| `soldByWeight`, `pricePerKg`, `weightOptionsKg` | Loose items | Weight picker (0.25 / 0.5 / 1 / 2 kg), "₹40 / kg", "final amount after weighing" note |
| `grades[]` | A/B/C with price per kg and note | Freshness card: grade selector with prices (B = 10% off, C = 25% off) |
| `ripenessOptions` | raw / ready_to_eat / very_ripe | Ripeness selector |
| `shelfLifeDays`, `minRemainingShelfLifeDays` | Total life and the minimum we will ship | "Best before 30 Oct · 4 days left" from the batch in Stock |
| `ingredients`, `allergens`, `nutritionPer100g` | Label data | "Ingredients and allergens" section; `["Not provided"]` shows "Not provided by the manufacturer" |
| `fssaiOnPack` | Brand licence from label (**DEMO**) | Label section |
| `substitutable` | Can be substituted | Shows the substitution choice in cart |
| `subscribable` | Daily/weekly subscription possible | "Subscribe and save" button |
| `regional` | e.g. "Kerala" | "Regional speciality" badge and filter |

### 3.3 Fashion fields (`FashionAttrs`)
| Field | Meaning | Screen |
|---|---|---|
| `gender` | men / women / kids / unisex | Filters |
| `sizes`, `sizeSystem` | Size labels and system (alpha, waist, UK shoe, age, free) | Size selector; stock per size from Stock |
| `colours[]` | Name + hex | Colour swatches; name is the standard colour name |
| `fabric` | Composition | "Fabric and feel" card |
| `feel` | softness, thickness, stretch, transparency, drape | Five rows with simple scales |
| `fit` | Slim / Regular / Relaxed / Oversized | Fit guidance |
| `care` | Care steps | Care section |
| `modelInfo` | Model height and size worn | "Model is 183 cm and wears L" |
| `sizeChart[]` | Measurements in cm per size | Size chart table (show cm and inches) |
| `specialtySizes` | plus / petite / maternity / kids | Specialty-size filters |
| `rentable` | per day, deposit, min days | "Rent this outfit" enquiry |
| `clearance` | boolean | Clearance badge; clearance offers exchange-only |

### 3.4 Beauty fields (`BeautyAttrs`)
| Field | Meaning | Screen |
|---|---|---|
| `shades[]` | name, code, hex, undertone | Shade swatches; shade preview uses hex |
| `skinTypes`, `hairTypes` | Brand-stated suitability | "Listed by the brand as suitable for …" + filters |
| `ingredients`, `keyIngredients` | Full INCI list and highlights | "Ingredients and safety" |
| `allergens`, `mayContain` | Known allergens | Warning chips; cart warning |
| `patchTest` | Needs patch test | Three-step patch-test guide |
| `usage` | quantity, frequency, method, order | "How to use" |
| `precautions`, `whoShouldAvoid` | Safety text | Safety section |
| `documentedConflicts` | Manufacturer-stated only | Routine warning in cart |
| `claims[]` | text + verified | Unverified claims are labelled "Brand claim, not independently verified" |
| `sampleProductId` / `fullSizeProductId` | Mini ↔ full-size link | "Try the 10 ml mini" / "Get the full size" |
| `heatSensitive` | Melts in heat | Cool-slot-only delivery note |
| `periodAfterOpeningMonths` | PAO | "Use within 12 months of opening" |

### 3.5 Electronics fields (`ElectronicsAttrs`)
| Field | Meaning | Screen |
|---|---|---|
| `model` | Model number (**DEMO** — confirm) | Specs, warranty, compatibility |
| `specs[]` | Label/value rows | Specifications table |
| `warranty` | months, provider, coverage, exclusions | Warranty section and digital warranty card |
| `bestFor[]` | use case + verdict + reason | "What will you use it for?" result: Best for / Suitable with limits / Not recommended |
| `compatibleModels[]` | model + status | Compatibility checker; `unknown` is never shown as compatible |
| `productDimensionsCm`, `clearanceCm`, `siteRequirements` | Appliance size and needs | "Will this fit your home?" check |
| `installation` | required, fee, note | Installation booking |
| `exchangeEligible` | Accepts exchange | "Exchange your old device" |
| `refurbished` | grade, battery health, tested checks, warranty | Refurbished condition card |
| `serialTracked` | Serial captured at packing | Warranty and damage claims |
| `ownershipCosts[]` | item, price or null, source, date | "Total ownership information"; `null` shows "Not published" |

### 3.6 Handling tags
| Tag | Effect |
|---|---|
| `chilled`, `frozen` | Cold-chain fee once per order; separate shipment; "Keep chilled" delivery note |
| `fragile`, `glass` | Protective packing checklist |
| `liquid`, `leak_prone` | Leak-proof bag at packing |
| `heat_sensitive` | Cool slots only; not delivered to band C |
| `heavy` | ₹99 heavy-item fee; 9 AM–5 PM slots |
| `two_person` | Two-person delivery (free for large appliances); asks floor and lift details |
| `restricted_flammable`, `restricted_battery` | Special storage and transport note; quantity limits |
| `high_value` | OTP at handover; photo at dispatch |

### 3.7 Products included (33)
| Department | Products |
|---|---|
| Food (8) | Fresh Tomatoes · Robusta Bananas · Amul Taaza Toned Milk 1 L · Aashirvaad Atta 5 kg · Fortune Sunflower Oil 5 L · Farm Fresh Eggs 12 · Epigamia Greek Yogurt 400 g · Kerala Banana Chips 200 g |
| Fashion (8) | Manyavar Cotton Kurta · Kanchipuram Silk Saree (rentable) · Levi's 511 Jeans · Allen Solly Formal Shirt · Biba Kurta Set (to 4XL) · Puma Running Shoes · Kids' Cotton T-Shirt · Roadster Puffer Jacket (clearance) |
| Beauty (9) | Lakmé 9to5 Lipstick (6 shades) · Maybelline Fit Me Foundation (8 shades) · Minimalist Niacinamide 30 ml + 10 ml mini · Cetaphil Cleanser · Dove Shampoo · Nivea Body Lotion · Bella Vita Perfume (flammable) · Lakmé Sun Expert SPF 50 (heat-sensitive) |
| Electronics (8) | Samsung 32" Smart TV · LG 260 L Refrigerator · HP 14 Laptop i5 · boAt Airdopes 141 · Apple 20 W Charger · Xiaomi Power Bank · Samsung Galaxy M35 5G · Refurbished iPhone 12 |

Each product is chosen to show at least one special UI case (sold by weight, grades, subscription, near-expiry, regional, rental, plus sizes, clearance, shades, sample, restricted, heat-sensitive, installation, two-person, workload fit, compatibility, exchange, refurbished).

---

## 4. Stock data

| Field | Meaning | Rules |
|---|---|---|
| `productId`, `warehouseId` | Which product in which city | No row = **not stocked in that city** |
| `variantKey` | `default`, `M|Navy` (size\|colour), `shade:MR1` | Use the helpers in `stock.ts` |
| `available` | Saleable units | 0 → out of stock; 1–5 → "Only n left in {city}" |
| `reserved` | In open orders | Not shown to customers |
| `batch` | batchNo, mfgDate, expiryDate | Food and beauty only; product page shows expiry of the batch that will ship |
| `restockDate` | Expected back | "Back in stock by 2 Nov" |

Built-in test cases: yogurt low stock in Coimbatore with near-expiry batch; oil out of stock in Chennai; kurta M/Maroon low and XL/Navy out; Biba 4XL out in Bengaluru (size request); lipstick Burgundy Lust out in Coimbatore; refurbished iPhone not stocked in Coimbatore; silk saree not stocked in Kochi; laptop out in Chennai.

---

## 5. Offers and pricing

### 5.1 Offer fields
| Field | Meaning | Rules |
|---|---|---|
| `type` | deal / near_expiry / clearance / member | Near-expiry only food and beauty; clearance only fashion |
| `label` | Badge text | "Deal of the day", "Near-expiry", "Clearance", "Member deal" |
| `cityIds` | Where it applies | City-specific offers |
| `discountPct` | Off the everyday price | |
| `memberExtraPct` | Extra off for members | |
| `startsAt`, `endsAt` | Validity | Countdown shown only for `deal` |
| `stockLimit`, `perCustomerLimit` | Caps | Quantity stepper max |
| `conditionNote` | Extra condition | Shown on offer card |

### 5.2 Price calculation (one function: `lib/pricing.ts`)
```
active offers = offers for this product, this city, startsAt ≤ now < endsAt
best offer    = the one giving the lowest final price (offers never stack)
offerPrice    = round(price × (1 − discountPct/100))
memberPrice   = min(product.memberPrice, round(offerPrice × (1 − memberExtraPct/100)))
discount %    = round((mrp − shownPrice) / mrp × 100)   ← shown on red tag
sold by weight: non-member price per kg = grade pricePerKg (A/B/C)
                member price per kg     = round(grade pricePerKg × product.memberPrice / product.price)
                                          (A ₹40 → ₹36, B ₹36 → ₹32, C ₹30 → ₹27 for tomatoes)
                line price = price per kg × chosen kg, rounded to the rupee
cold-chain fee: charged only when an item's handling includes "chilled" or "frozen" — never just because it is food
```

### 5.3 Hero slides (4)
eyebrow, title, subtitle, CTA, image, background token, cities. Slide 3 shows only in Coimbatore, Chennai, Bengaluru.

---

## 6. Business rules

### 6.1 Delivery fees and dates (`rules.ts`)
| Rule | Value |
|---|---|
| Free delivery | Items total ≥ ₹499 (members ≥ ₹199) |
| Delivery fee by band | A ₹30 · B ₹40 · C ₹60 |
| Cold-chain fee | ₹15 once per order with chilled/frozen items |
| Heavy item | ₹99 per heavy item (not two-person) |
| Two-person delivery | ₹299, **free** for large appliances |
| Minimum order | ₹99 |
| Lead days | Food 0 (same day before cut-off, else next day) · Beauty 1 · Fashion 2 · Electronics 2 · Large appliances 3 |
| Sunday | Food and beauty deliver; fashion and electronics move to Monday |

### 6.2 COD
Enabled · ₹25 fee · max order ₹10,000 · WhatsApp/OTP confirmation above ₹2,000 · prepaid-only for items above ₹15,000 and for: silk saree, refrigerator, laptop, phone, refurbished iPhone · prepaid-only after 2 refused COD orders (explain why, give support link).

### 6.3 Membership
HyperMart Rewards: ₹299/year (₹25/month), 30-day free trial, member prices, free delivery above ₹199, early deals, free gift wrap.

### 6.4 Payment methods
UPI, card, net banking, wallet, COD (with description text).

### 6.5 Order changes
Editable until **packed** · substitution reply window 30 min (no reply → remove and refund) · subscription changes until 10 PM the day before · complaint windows: fresh/perishable 24 h, packaged food 48 h, large-appliance transit damage 48 h.

---

## 7. Content and customer data

- **`mainNav`** — the 5 main sections (Home, Category with 4 department children, Deals, New Arrivals, Offers).
- **`departmentPages`** — per-department content for the Category sub-pages: title, subtitle, search placeholder, delivery strip, promise strip, info bar, filter list and side panel.
- **Footer (4 columns), top bar message, quick chips, delivery strip, trust strip, "Why HyperMart" cards** — in `content.ts`.
- **`copy`** — every fixed customer-facing sentence (location, stock, delivery, member, substitution, disclaimers, empty and error states). Use these; don't write new wording.
- **12 FAQs** across delivery, payment, returns, freshness, membership, electronics services and account.
- **2 demo customers:**
  - Priya (Coimbatore, member, gated community, fit and beauty profile, saved iPhone 12)
  - Arjun (Kochi, non-member, Malayalam, doorstep handover note, 1 COD refusal)
- **4 demo orders:** out for delivery today (chilled), delivered fashion + beauty, delivered refrigerator with serial and installation, confirmed COD order with heavy item.
- **9 verified-purchase reviews** with tags (Fresh, True to size, Shade matched, Installation on time, Condition as described).

---

## 8. Image assets needed

Until real photos exist, show `/public/products/placeholder-<department>.svg` (created in Part 0). Real photos go at these exact paths. Product photos: **1200 × 1200 px, product centred on pure white, JPG under 200 KB.** Natural-light swatches: same size, daylight, no filters.

| File | Product | View |
|---|---|---|
| `public/products/food/fresh-tomatoes-1.jpg` | Fresh Tomatoes | main |
| `public/products/food/fresh-tomatoes-2.jpg` | Fresh Tomatoes | detail |
| `public/products/food/fresh-tomatoes-3.jpg` | Fresh Tomatoes | scale |
| `public/products/food/robusta-bananas-1.jpg` | Robusta Bananas | main |
| `public/products/food/robusta-bananas-2.jpg` | Robusta Bananas | detail |
| `public/products/food/robusta-bananas-3.jpg` | Robusta Bananas | scale |
| `public/products/food/amul-toned-milk-1l-1.jpg` | Amul Taaza Toned Milk | main |
| `public/products/food/amul-toned-milk-1l-2.jpg` | Amul Taaza Toned Milk | label |
| `public/products/food/aashirvaad-atta-5kg-1.jpg` | Aashirvaad Shudh Chakki Atta | main |
| `public/products/food/aashirvaad-atta-5kg-2.jpg` | Aashirvaad Shudh Chakki Atta | label |
| `public/products/food/fortune-sunflower-oil-5l-1.jpg` | Fortune Sunlite Refined Sunflower Oil | main |
| `public/products/food/fortune-sunflower-oil-5l-2.jpg` | Fortune Sunlite Refined Sunflower Oil | label |
| `public/products/food/farm-fresh-eggs-12-1.jpg` | Farm Fresh White Eggs | main |
| `public/products/food/farm-fresh-eggs-12-2.jpg` | Farm Fresh White Eggs | detail |
| `public/products/food/epigamia-greek-yogurt-400g-1.jpg` | Epigamia Greek Yogurt Natural | main |
| `public/products/food/epigamia-greek-yogurt-400g-2.jpg` | Epigamia Greek Yogurt Natural | label |
| `public/products/food/kerala-banana-chips-200g-1.jpg` | Kerala Banana Chips (Coconut Oil) | main |
| `public/products/food/kerala-banana-chips-200g-2.jpg` | Kerala Banana Chips (Coconut Oil) | label |
| `public/products/fashion/manyavar-mens-cotton-kurta-1.jpg` | Men's Cotton Kurta | main |
| `public/products/fashion/manyavar-mens-cotton-kurta-2.jpg` | Men's Cotton Kurta | angle |
| `public/products/fashion/manyavar-mens-cotton-kurta-3.jpg` | Men's Cotton Kurta | detail |
| `public/products/fashion/manyavar-mens-cotton-kurta-4.jpg` | Men's Cotton Kurta | natural light |
| `public/products/fashion/kanchipuram-silk-saree-1.jpg` | Kanchipuram Pure Silk Saree with Zari Border | main |
| `public/products/fashion/kanchipuram-silk-saree-2.jpg` | Kanchipuram Pure Silk Saree with Zari Border | angle |
| `public/products/fashion/kanchipuram-silk-saree-3.jpg` | Kanchipuram Pure Silk Saree with Zari Border | detail |
| `public/products/fashion/kanchipuram-silk-saree-4.jpg` | Kanchipuram Pure Silk Saree with Zari Border | natural light |
| `public/products/fashion/levis-511-slim-jeans-1.jpg` | Levi's 511 Slim Fit Jeans | main |
| `public/products/fashion/levis-511-slim-jeans-2.jpg` | Levi's 511 Slim Fit Jeans | angle |
| `public/products/fashion/levis-511-slim-jeans-3.jpg` | Levi's 511 Slim Fit Jeans | detail |
| `public/products/fashion/levis-511-slim-jeans-4.jpg` | Levi's 511 Slim Fit Jeans | natural light |
| `public/products/fashion/allen-solly-formal-shirt-1.jpg` | Allen Solly Men's Formal Shirt | main |
| `public/products/fashion/allen-solly-formal-shirt-2.jpg` | Allen Solly Men's Formal Shirt | angle |
| `public/products/fashion/allen-solly-formal-shirt-3.jpg` | Allen Solly Men's Formal Shirt | detail |
| `public/products/fashion/allen-solly-formal-shirt-4.jpg` | Allen Solly Men's Formal Shirt | natural light |
| `public/products/fashion/biba-cotton-kurta-set-1.jpg` | Biba Printed Cotton Kurta Set | main |
| `public/products/fashion/biba-cotton-kurta-set-2.jpg` | Biba Printed Cotton Kurta Set | angle |
| `public/products/fashion/biba-cotton-kurta-set-3.jpg` | Biba Printed Cotton Kurta Set | detail |
| `public/products/fashion/biba-cotton-kurta-set-4.jpg` | Biba Printed Cotton Kurta Set | natural light |
| `public/products/fashion/puma-running-shoes-1.jpg` | Puma Men's Running Shoes | main |
| `public/products/fashion/puma-running-shoes-2.jpg` | Puma Men's Running Shoes | angle |
| `public/products/fashion/puma-running-shoes-3.jpg` | Puma Men's Running Shoes | detail |
| `public/products/fashion/puma-running-shoes-4.jpg` | Puma Men's Running Shoes | natural light |
| `public/products/fashion/kids-cotton-tshirt-1.jpg` | Kids' Printed Cotton T-Shirt | main |
| `public/products/fashion/kids-cotton-tshirt-2.jpg` | Kids' Printed Cotton T-Shirt | angle |
| `public/products/fashion/kids-cotton-tshirt-3.jpg` | Kids' Printed Cotton T-Shirt | detail |
| `public/products/fashion/kids-cotton-tshirt-4.jpg` | Kids' Printed Cotton T-Shirt | natural light |
| `public/products/fashion/roadster-winter-jacket-1.jpg` | Roadster Men's Puffer Jacket | main |
| `public/products/fashion/roadster-winter-jacket-2.jpg` | Roadster Men's Puffer Jacket | angle |
| `public/products/fashion/roadster-winter-jacket-3.jpg` | Roadster Men's Puffer Jacket | detail |
| `public/products/fashion/roadster-winter-jacket-4.jpg` | Roadster Men's Puffer Jacket | natural light |
| `public/products/beauty/lakme-9to5-matte-lipstick-1.jpg` | Lakmé 9to5 Primer + Matte Lipstick | main |
| `public/products/beauty/lakme-9to5-matte-lipstick-2.jpg` | Lakmé 9to5 Primer + Matte Lipstick | label |
| `public/products/beauty/lakme-9to5-matte-lipstick-3.jpg` | Lakmé 9to5 Primer + Matte Lipstick | detail |
| `public/products/beauty/lakme-9to5-matte-lipstick-swatch.jpg` | Lakmé 9to5 Primer + Matte Lipstick | natural light |
| `public/products/beauty/maybelline-fit-me-foundation-1.jpg` | Maybelline Fit Me Matte + Poreless Foundation | main |
| `public/products/beauty/maybelline-fit-me-foundation-2.jpg` | Maybelline Fit Me Matte + Poreless Foundation | label |
| `public/products/beauty/maybelline-fit-me-foundation-3.jpg` | Maybelline Fit Me Matte + Poreless Foundation | detail |
| `public/products/beauty/maybelline-fit-me-foundation-swatch.jpg` | Maybelline Fit Me Matte + Poreless Foundation | natural light |
| `public/products/beauty/minimalist-niacinamide-serum-30ml-1.jpg` | Minimalist 10% Niacinamide Face Serum | main |
| `public/products/beauty/minimalist-niacinamide-serum-30ml-2.jpg` | Minimalist 10% Niacinamide Face Serum | label |
| `public/products/beauty/minimalist-niacinamide-serum-30ml-3.jpg` | Minimalist 10% Niacinamide Face Serum | detail |
| `public/products/beauty/minimalist-niacinamide-serum-10ml-mini-1.jpg` | Minimalist 10% Niacinamide Serum — Mini | main |
| `public/products/beauty/minimalist-niacinamide-serum-10ml-mini-2.jpg` | Minimalist 10% Niacinamide Serum — Mini | label |
| `public/products/beauty/minimalist-niacinamide-serum-10ml-mini-3.jpg` | Minimalist 10% Niacinamide Serum — Mini | detail |
| `public/products/beauty/cetaphil-gentle-cleanser-125ml-1.jpg` | Cetaphil Gentle Skin Cleanser | main |
| `public/products/beauty/cetaphil-gentle-cleanser-125ml-2.jpg` | Cetaphil Gentle Skin Cleanser | label |
| `public/products/beauty/cetaphil-gentle-cleanser-125ml-3.jpg` | Cetaphil Gentle Skin Cleanser | detail |
| `public/products/beauty/dove-hair-fall-rescue-shampoo-340ml-1.jpg` | Dove Hair Fall Rescue Shampoo | main |
| `public/products/beauty/dove-hair-fall-rescue-shampoo-340ml-2.jpg` | Dove Hair Fall Rescue Shampoo | label |
| `public/products/beauty/dove-hair-fall-rescue-shampoo-340ml-3.jpg` | Dove Hair Fall Rescue Shampoo | detail |
| `public/products/beauty/nivea-body-lotion-400ml-1.jpg` | Nivea Nourishing Body Milk Lotion | main |
| `public/products/beauty/nivea-body-lotion-400ml-2.jpg` | Nivea Nourishing Body Milk Lotion | label |
| `public/products/beauty/nivea-body-lotion-400ml-3.jpg` | Nivea Nourishing Body Milk Lotion | detail |
| `public/products/beauty/bella-vita-perfume-100ml-1.jpg` | Bella Vita Organic Eau de Parfum — CEO Man | main |
| `public/products/beauty/bella-vita-perfume-100ml-2.jpg` | Bella Vita Organic Eau de Parfum — CEO Man | label |
| `public/products/beauty/bella-vita-perfume-100ml-3.jpg` | Bella Vita Organic Eau de Parfum — CEO Man | detail |
| `public/products/beauty/lakme-sun-expert-spf50-100ml-1.jpg` | Lakmé Sun Expert SPF 50 PA+++ Gel Sunscreen | main |
| `public/products/beauty/lakme-sun-expert-spf50-100ml-2.jpg` | Lakmé Sun Expert SPF 50 PA+++ Gel Sunscreen | label |
| `public/products/beauty/lakme-sun-expert-spf50-100ml-3.jpg` | Lakmé Sun Expert SPF 50 PA+++ Gel Sunscreen | detail |
| `public/products/electronics/samsung-32-hd-smart-tv-1.jpg` | Samsung 80 cm (32") HD Ready Smart LED TV | main |
| `public/products/electronics/samsung-32-hd-smart-tv-2.jpg` | Samsung 80 cm (32") HD Ready Smart LED TV | angle |
| `public/products/electronics/samsung-32-hd-smart-tv-3.jpg` | Samsung 80 cm (32") HD Ready Smart LED TV | detail |
| `public/products/electronics/samsung-32-hd-smart-tv-4.jpg` | Samsung 80 cm (32") HD Ready Smart LED TV | scale |
| `public/products/electronics/lg-260l-frost-free-refrigerator-1.jpg` | LG 260 L 3 Star Frost-Free Double Door Refrigerator | main |
| `public/products/electronics/lg-260l-frost-free-refrigerator-2.jpg` | LG 260 L 3 Star Frost-Free Double Door Refrigerator | angle |
| `public/products/electronics/lg-260l-frost-free-refrigerator-3.jpg` | LG 260 L 3 Star Frost-Free Double Door Refrigerator | detail |
| `public/products/electronics/lg-260l-frost-free-refrigerator-4.jpg` | LG 260 L 3 Star Frost-Free Double Door Refrigerator | scale |
| `public/products/electronics/hp-14-laptop-i5-16gb-1.jpg` | HP 14 Laptop, Intel Core i5 (13th Gen), 16 GB, 512 GB SSD | main |
| `public/products/electronics/hp-14-laptop-i5-16gb-2.jpg` | HP 14 Laptop, Intel Core i5 (13th Gen), 16 GB, 512 GB SSD | angle |
| `public/products/electronics/hp-14-laptop-i5-16gb-3.jpg` | HP 14 Laptop, Intel Core i5 (13th Gen), 16 GB, 512 GB SSD | detail |
| `public/products/electronics/hp-14-laptop-i5-16gb-4.jpg` | HP 14 Laptop, Intel Core i5 (13th Gen), 16 GB, 512 GB SSD | scale |
| `public/products/electronics/boat-airdopes-141-1.jpg` | boAt Airdopes 141 True Wireless Earbuds | main |
| `public/products/electronics/boat-airdopes-141-2.jpg` | boAt Airdopes 141 True Wireless Earbuds | angle |
| `public/products/electronics/boat-airdopes-141-3.jpg` | boAt Airdopes 141 True Wireless Earbuds | detail |
| `public/products/electronics/boat-airdopes-141-4.jpg` | boAt Airdopes 141 True Wireless Earbuds | scale |
| `public/products/electronics/apple-20w-usb-c-charger-1.jpg` | Apple 20 W USB-C Power Adapter | main |
| `public/products/electronics/apple-20w-usb-c-charger-2.jpg` | Apple 20 W USB-C Power Adapter | angle |
| `public/products/electronics/apple-20w-usb-c-charger-3.jpg` | Apple 20 W USB-C Power Adapter | detail |
| `public/products/electronics/apple-20w-usb-c-charger-4.jpg` | Apple 20 W USB-C Power Adapter | scale |
| `public/products/electronics/mi-10000mah-power-bank-1.jpg` | Xiaomi 10000 mAh 22.5 W Power Bank | main |
| `public/products/electronics/mi-10000mah-power-bank-2.jpg` | Xiaomi 10000 mAh 22.5 W Power Bank | angle |
| `public/products/electronics/mi-10000mah-power-bank-3.jpg` | Xiaomi 10000 mAh 22.5 W Power Bank | detail |
| `public/products/electronics/mi-10000mah-power-bank-4.jpg` | Xiaomi 10000 mAh 22.5 W Power Bank | scale |
| `public/products/electronics/samsung-galaxy-m35-5g-1.jpg` | Samsung Galaxy M35 5G (8 GB, 128 GB) | main |
| `public/products/electronics/samsung-galaxy-m35-5g-2.jpg` | Samsung Galaxy M35 5G (8 GB, 128 GB) | angle |
| `public/products/electronics/samsung-galaxy-m35-5g-3.jpg` | Samsung Galaxy M35 5G (8 GB, 128 GB) | detail |
| `public/products/electronics/samsung-galaxy-m35-5g-4.jpg` | Samsung Galaxy M35 5G (8 GB, 128 GB) | scale |
| `public/products/electronics/refurbished-iphone-12-64gb-1.jpg` | Refurbished Apple iPhone 12 (64 GB) — Good | main |
| `public/products/electronics/refurbished-iphone-12-64gb-2.jpg` | Refurbished Apple iPhone 12 (64 GB) — Good | angle |
| `public/products/electronics/refurbished-iphone-12-64gb-3.jpg` | Refurbished Apple iPhone 12 (64 GB) — Good | detail |
| `public/products/electronics/refurbished-iphone-12-64gb-4.jpg` | Refurbished Apple iPhone 12 (64 GB) — Good | scale |
| `public/hero/earbuds.jpg` | Hero: boAt Airdopes 141 at ₹1,169 | 1600 × 900, product on soft background |
| `public/hero/fresh-veg.jpg` | Hero: Vegetables graded A, B or C — you choose | 1600 × 900, product on soft background |
| `public/hero/silk-saree.jpg` | Hero: Kanchipuram silk — buy or rent | 1600 × 900, product on soft background |
| `public/hero/rewards.jpg` | Hero: Member prices on 2,000+ products | 1600 × 900, product on soft background |

Also needed: `public/logo/hypermart-logo.svg` (wordmark), `public/logo/hypermart-mark.svg` (icon), `public/icons/veg.svg`, `public/icons/nonveg.svg`, `public/icons/egg.svg`, `public/payments/*.svg` (UPI, Visa, Mastercard, RuPay), `public/og-image.jpg` (1200 × 630).

---

## 9. Data the business must still provide before launch

| Item | Where it's used | Status |
|---|---|---|
| Legal company name, GSTIN per state, registered address | Invoices, footer | DEMO |
| FSSAI licence per warehouse | Food pages, invoices | DEMO |
| Real warehouse addresses and cut-off times | Delivery dates, invoices | DEMO |
| Serviceable pincode list per city with distance bands | Location check | Sample of 21 |
| Delivery fees, free-delivery thresholds, COD limits | Cart, checkout | Proposed values |
| Membership price and benefits | Rewards | Proposed |
| Exact model numbers and specs for electronics | Product pages | Approximate |
| Exact ingredient (INCI) lists from labels | Beauty and food pages | Simplified |
| Brand authorisation documents and expiry dates | Trust card | Sample dates |
| Grievance officer name and contact (required for Indian e-commerce) | Footer, legal page | Missing |
| Support phone, WhatsApp, email | Header, help | DEMO |
| Product photos | Everywhere | Missing |
| Translations for Tamil, Malayalam, Kannada, Hindi | Language switcher | Missing |
