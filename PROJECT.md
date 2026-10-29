# HyperMart — Project Rules (read this before every task)

HyperMart is an online multi-department retailer in India selling **Food and Groceries, Fashion, Beauty and Personal Care, and Electronics** from one website.
This file is the single source of truth. If a prompt conflicts with this file, follow this file and say so.

---

## 1. Business model (do not change)

| Topic | Rule |
|---|---|
| Seller | **HyperMart sells every product.** There are no third-party sellers. |
| Seller display | Product pages show two separate lines: `Sold by: HyperMart` and `Brand: <brand>`. Never show the brand as the seller. |
| Fulfilment | **Central warehouses only, one per city.** No physical stores, no store pickup, no "store near you", no distance in km. |
| Location | The customer sets a **pincode**. The pincode maps to one city warehouse. Header shows `Deliver to 641004 · Coimbatore`. |
| Stock and offers | Stock, offers and delivery dates depend on the customer's city warehouse. Wording: "in your city", never "at your store". |
| Delivery | HyperMart's own delivery fleet. Delivery date comes from the warehouse (fresh items: same/next day; others: 1–4 days). |
| Payments | UPI, card, net banking, wallet, and Cash on Delivery (COD) with limits. |
| Membership | **HyperMart Rewards** members see a member price below the normal price. Non-members see "Member price ₹X — Join Rewards". |
| Offer types | City-specific offers, countdown deals (with `endsAt`), near-expiry discounts (food and beauty only), clearance (fashion). |
| Electronics services | HyperMart runs repair, refurbished sales and exchange itself. |
| Special orders | Bulk/business quotes, gift orders, outfit rental (enquiry only), subscriptions (milk, eggs, vegetables). |

## 2. Never do this

- Never show prices in `$`, `AED` or `Rs.`. Always `₹` formatted with `en-IN` (₹18,990, ₹1,24,999).
- Never mix department badges: no "True to size" on milk, no "Allergen info" on detergent or TVs. Use the badge rules in §6.
- Never add a charge at checkout that was not shown on the product page or cart.
- Never silently substitute an item. Grocery substitution default is **"Ask me first"**.
- Never treat unknown accessory compatibility as compatible. Show `Unknown`.
- Never show a "100% authentic" badge. Use specific labels: "Sourced from authorised distributor", "Seal checked".
- Never use lorem ipsum, "NN,000+", "Store name" or placeholder text in finished screens. Use mock data.
- Never use the name "LuLu" anywhere in the UI or code.
- Never push to `main`. Each part is built on its own branch (see §12).
- Never let two sections show on one screen on the five main sections — follow the one-section-per-screen rule in §10.

## 3. Tech stack

- **Next.js (latest stable, App Router)** + **TypeScript (strict)**
- **Tailwind CSS** + **shadcn/ui** components + **lucide-react** icons
- **Zustand** for client state (location/pincode, cart, membership), persisted to localStorage with try/catch
- **React Hook Form + Zod** for forms
- **Mock API**: Next.js route handlers in `src/app/api/**` that read from `src/mocks/**`. Screens fetch through `src/lib/api.ts` only, so a real backend can replace the mocks later without touching screens.
- Fonts via `next/font`: **Plus Jakarta Sans** (headings), **Inter** (body)

## 4. Folder structure

```
src/
  app/
    (store)/                 customer website
      page.tsx               1. Home
      category/              2. Category hub
        [department]/        2a. Department page (food, fashion, electronics, beauty)
      deals/                 3. Deals
      new-arrivals/          4. New Arrivals
      offers/                5. Offers
      search/
      product/[slug]/
      cart/
      checkout/
      orders/
      account/
    api/                     mock API route handlers
    layout.tsx
  components/
    ui/                      shadcn primitives
    layout/                  Header, NavBar, Footer, LocationSelector, CartButton
    sections/                SnapPage, SnapSection, SectionDots (see §10)
    product/                 ProductCard, PriceBlock, Badges, DeliveryPromise
    product/domain/          FoodPanel, FashionPanel, BeautyPanel, ElectronicsPanel
    offers/                  OfferCard, Countdown
  lib/
    api.ts                   all data access goes through here
    format.ts                formatINR, formatDate
    pricing.ts               getPrice(product, cityId, isMember)
    location.ts              getWarehouseForPincode
    badges.ts                getBadges(product) — domain rules from §6
  store/                     Zustand stores (location, cart, member)
  types/                     shared TypeScript types
  mocks/                     JSON/TS mock data
public/
  products/                  product images (placeholder until real photos are added)
```

## 5. Core data types (keep names stable)

**The full, authoritative types are in `seed/src/types/index.ts` and every field is explained in `seed/DATA_SPEC.md`.** The list below is only a summary.

- `Department` = `"food" | "fashion" | "beauty" | "electronics"`
- `City` { id, name, state }
- `Warehouse` { id, cityId, name, address, sameDayCutoff ("14:00") }
- `PincodeMap` { pincode, cityId, warehouseId, serviceable }
- `Product` { id, slug, name, brand, soldBy: "HyperMart", department, subcategory, images[], description, mrp, price, memberPrice?, unit ("1 kg", "500 g", "per kg", "1 pc"), rating, ratingCount, returnPolicy, attrs }
- `ReturnPolicy` { type: "returnable" | "exchange_only" | "non_returnable" | "returnable_if_sealed" | "quality_complaint_only", days? }
- `attrs` is a discriminated union by department:
  - `FoodAttrs` { grade?: "A"|"B"|"C", ripenessOptions?, soldByWeight?, pricePerKg?, bestBefore?, shelfLifeDays?, storage: "ambient"|"chilled"|"frozen", allergens?, vegMark: "veg"|"nonveg", subscribable?, substitutable? , regional? }
  - `FashionAttrs` { sizes[], colours[] (name + hex), fabric, feel { softness, thickness, stretch, transparency, drape }, fit, modelInfo?, sizeChart?, rentable?, clearance? }
  - `BeautyAttrs` { shades?[] (name, code, hex), skinTypes?, hairTypes?, ingredients?, allergens?, patchTest: boolean, sample?: productId, heatSensitive?, restricted? }
  - `ElectronicsAttrs` { specs (key/value), warrantyMonths, bestFor?, compatibleModels?, dimensionsCm?, packedDimensionsCm?, weightKg?, installation?, exchangeEligible?, refurbished? { grade: "Like new"|"Good"|"Fair", batteryHealth? }, restricted? }
- `Stock` { productId, warehouseId, variantKey?, quantity }
- `Offer` { id, productId, cityIds[], type: "deal"|"near_expiry"|"clearance"|"member", discountPct, endsAt?, label }
- `CartItem` { productId, variantKey?, qty, substitution?: "ask"|"skip"|"similar", gift? }

## 6. Badge rules (lib/badges.ts)

Show at most 3 badges on a card, chosen only from the product's own department:

| Department | Allowed badges |
|---|---|
| Food | Grade A/B/C, Best before <date>, Chilled / Frozen, Veg / Non-veg, Subscribe, Regional speciality, Near-expiry |
| Fashion | Sizes available, Fabric, Clearance, Exchange only, Rent available |
| Beauty | Shade count, Skin type, Returnable if sealed, Sample available, Heat-sensitive |
| Electronics | Warranty <n> yr, Compatible with your device (only if saved), Installation included, Exchange available, Refurbished – <grade> |

Return-policy line and delivery line are shown separately from badges on every card.

## 7. Design system

**Full rules are in `DESIGN.md` — read it before building any screen.** Summary below.

Coloured brand, clean and modern (reference: fresh grocery sites with green and yellow).

| Token | Value | Use |
|---|---|---|
| `--primary` | `#0E5E3A` | Buttons, header accents, links |
| `--primary-dark` | `#0A4A2E` | Hover |
| `--accent` | `#F5B700` | Offer banners, highlights, member badge |
| `--danger` | `#C62828` | Discount tags, errors, low stock |
| `--success` | `#2E7D32` | In stock, confirmed |
| `--bg` | `#F6F7F5` | Page background |
| `--surface` | `#FFFFFF` | Cards |
| `--text` | `#17201B` | Main text |
| `--muted` | `#5D6862` | Secondary text |
| `--border` | `#E2E6E3` | Card and input borders |

- Radius 12px on cards, 10px on buttons and inputs. Soft shadow on hover only.
- Spacing on a 4px scale. Page max width 1280px, 16px side padding on mobile.
- Must work from **360px** wide (mobile-first) up to 1440px. No horizontal scroll.
- Price block: big current price, struck-through MRP, discount % in red, member price in an accent pill.
- Product images: `next/image`, square, object-contain on white. Until real photos exist, use `/public/products/placeholder-<department>.svg`.
- Accessibility: every button has a label, colour contrast AA, visible focus ring, images have alt text.

## 8. Coding rules

- Server Components by default; `"use client"` only for interactive parts.
- Components under ~150 lines; split otherwise. Props typed; no `any`.
- All money is stored as integer rupees; format only in UI with `formatINR`.
- All dates as ISO strings; format with `formatDate` (e.g. "12 Mar").
- Loading, empty and error states for every data-driven section.
- No new libraries without saying why.

## 9. Customer portal structure — 5 main sections

The header nav has exactly these five items, in this order (data: `mainNav` in `src/mocks/content.ts`). The location selector, search, Sign in and Cart sit on the right of the header.

| # | Section | Route | Purpose | Data |
|---|---|---|---|---|
| 1 | **Home** | `/` | Starting point: search, delivery check for your pincode, today's deal, departments, trending | `heroSlides`, `departments`, offers, products |
| 2 | **Category** | `/category` | Hub with the 4 department cards | `departments`, `categories` |
| 2a | ↳ **Department page** (sub-part) | `/category/[department]` | One page per department, same layout for all four (see below) | `departmentPages`, `categories`, products |
| 3 | **Deals** | `/deals` | Time-limited deals with countdowns only (offer type `deal`) | `offers` where `type = "deal"` |
| 4 | **New Arrivals** | `/new-arrivals` | Products with `isNew: true`, grouped by department | products |
| 5 | **Offers** | `/offers` | Longer-running savings: member prices, near-expiry, clearance, city offers | `offers` where type is `member`, `near_expiry`, `clearance` |

"Category" in the nav opens a small menu with the 4 departments; clicking "Category" itself goes to `/category`. The active nav item is underlined on the department sub-pages too.

Everything else (search results, product page, cart, checkout, orders, account) is reached from these five sections and is **not** in the main nav.

### 9.1 Department page layout (sub-part of Category)

Same structure for all four departments; content comes from `departmentPages[department]` and the data. Based on the Food and Groceries wireframe.

**Snap section A — "Department intro"** (fills one screen):
1. Breadcrumb: `Home > Category > Food and Groceries`.
2. Department hero card (department tint background, line illustration on the right): H1 title, subtitle with the customer's city, search box limited to this department + "Search" button.
3. Department switcher tabs: Food and Groceries · Fashion · Electronics · Beauty and Personal Care (current one filled `primary`, others outline).
4. Delivery strip: 3 items from `deliveryStrip` (icon + text), separated by thin dividers.
5. Sub-category tiles: one tile per top-level category of this department (icon + name), all in one row on desktop (up to 7; scrolls horizontally on mobile with arrows hidden). Clicking a tile filters section B.
6. Promise strip: 5 items from `promiseStrip` (icon + title + small text).

**Snap section B — "Shop the department"** (fills one screen):
1. Info bar (`infoBar` text) across the left area.
2. "Filter by" row with the department's filters (`filters`) as dropdown buttons; active filters show as removable chips.
3. Product row: standard product cards (DESIGN.md §7.3). Show as many as fit in one row (5 on desktop, 2 on mobile); more products are reached with left/right arrows and a "1–5 of 8" counter, plus a "View all" link to search results filtered by this department. **No vertical list inside the section.**
4. Right side panel (desktop) / below the row (mobile): the department's `sidePanel` card with its CTA, and a **"Top brands"** card showing brand names from `brands` for this department as text tiles (do **not** use real brand logo images unless licensed logo files are provided).

**Snap section C — Footer.**

Wireframe corrections: "from your store" → "delivered from our {city} warehouse"; "your store only" / "store or warehouse" chips → removed; product prices, units and best-before dates come from the data (not the wireframe numbers).

### 9.2 Sections on the other pages

| Page | Snap sections, in order |
|---|---|
| Home | 1. Hero (search, pincode check, quick chips, deal carousel) + delivery strip · 2. Shop by department (4 tiles) · 3. Deals ending soon · 4. Trending in {city} · 5. Rewards and subscriptions · 6. Footer |
| Category hub | 1. "Shop by category" with 4 department cards + trust strip · 2. Footer |
| Deals | 1. Deal of the day (largest countdown deal) · 2. Ending soon (row with arrows) · 3. Footer |
| New Arrivals | 1. Intro + department filter chips + first row · 2. One section per department that has new items (row with arrows) · last: Footer |
| Offers | 1. Member prices banner + member offers row · 2. Near-expiry (food and beauty) · 3. Clearance (fashion) · 4. Footer. Department filter chips at the top of section 1 filter all sections. |

## 10. One section per screen (scroll-snap rule)

On the five main sections and their department sub-pages, **each scroll shows exactly one section, fully, and nothing from the section above or below.**

**How it must work**
- The page is a vertical scroll-snap container: `scroll-snap-type: y mandatory` on the scrolling element (the `<html>` element, or one `SnapPage` wrapper — pick one and use it everywhere).
- Each section is a `SnapSection` with `scroll-snap-align: start`, `scroll-snap-stop: always`, and height **exactly `calc(100svh − var(--header-h))`** (`--header-h` = full fixed header height: 72px desktop, 112px mobile, **plus 36px when the top message bar is shown**). Use `svh` (not `dvh`) so the mobile address bar showing/hiding doesn't make sections jump. Use `scroll-padding-top: var(--header-h)` so sections start right under the fixed header.
- One wheel scroll, swipe, `Page Down`, `Space` or arrow key moves to the next whole section. Scrolling must never stop halfway between two sections.
- Content inside a section must **fit inside it** at every supported size. If content doesn't fit, redesign it: fewer items per row, a carousel with arrows, tabs, "View all" links. **Never** put a vertical scrollbar inside a section and never let content spill into the next one.
- Content is vertically centred in the section when it is shorter than the screen; the section keeps its full height.
- The footer is the last section. It may be shorter than the screen and snaps to the bottom (`scroll-snap-align: end`).
- **Section dots:** a small vertical dot navigator on the right edge (desktop only), one dot per section, current one filled `primary`, each with an `aria-label` ("Go to Deals ending soon"). Hidden on mobile.
- Changing filters or carousel pages inside a section must not move the page scroll position.
- Links to a section (`/#trending`) jump straight to that section.

**Sizes it must fit (test every page at these):** 1920 × 1080, 1440 × 900, 1366 × 768, 1280 × 720, 1024 × 768, 768 × 1024, 390 × 844, 360 × 740.

**When the rule is switched off**
- Screens shorter than 600px in height (e.g. phones in landscape): turn off snapping (`scroll-snap-type: none`) and let sections grow to fit their content (`min-height` instead of `height`).
- `prefers-reduced-motion: reduce`: keep snapping but no smooth-scroll animation.
- Pages that are tasks, not browsing — **search results, product page, cart, checkout, orders, account, help** — use normal scrolling. Long forms and long lists must never be cut off.

**Accessibility**
- Each section is a `<section>` with an `aria-labelledby` heading.
- Keyboard focus moving into a section scrolls it fully into view.
- Snapping must never trap the user: the last section scrolls to the footer, and the browser's find (Ctrl+F) still works.

### 10.1 Making section A of department pages fit on phones
At widths under 768px: the hero shrinks to title + search (no illustration); department tabs become one swipeable row; the delivery strip becomes a single line that rotates its 3 messages every 4 s (pausable); sub-category tiles become one swipeable row of 88px tiles; the promise strip becomes a swipeable row of compact chips.

### 10.2 Empty sections
If a section has no items for the customer's city (e.g. no near-expiry offers in Bengaluru), **leave the section out completely** — never show an empty full-screen section. Section dots update to match.

## 11. Decisions for areas not designed yet

| Area | Decision for now |
|---|---|
| Language | UI text in **English only** in this phase. The language switcher shows the city's languages but other languages say "Coming soon". All strings come from `copy` in `content.ts` so translation can be added later. |
| Sign in | Mock phone-OTP sign-in: enter one of the demo customers' phone numbers, OTP is always `123456` (shown on screen as a demo hint). Signed-in state in a Zustand store. No real SMS. |
| Footer and legal links | Pages that don't exist yet (help, policies, services) show a simple "Coming soon" page with the HyperMart layout — never a 404. |
| Hero and banner images | `/public/hero/*.jpg` are not supplied yet. Show the slide's background colour with the department placeholder illustration until real images are added. |
| Brand logos | Text tiles only (no third-party logo images) unless licensed logo files are added to `public/brands/`. |
| Product page, search, cart, checkout, orders, account | Layouts are given in each part's prompt. Data for them is already in `seed/`. |
| Staff portals (warehouse, delivery app, CMS, support, finance) | Later parts, after the customer website. |
| Payments | Mock only: every payment method succeeds after 2 seconds, except UPI ID `fail@upi`, which fails (to test the failed-payment screen). |

## 12. Workflow for every part

1. Create branch `part-<n>-<short-name>` from the latest completed branch. Never commit to `main`.
2. Build only what the part prompt asks for.
3. Run `npm run lint` and `npm run build` — both must pass.
4. Open the pages at 360px, 768px and 1280px widths and check they look right.
5. Commit with message `Part <n>: <summary>` and push the branch.
6. Report: what was built, files changed, anything not done, and screenshots.
