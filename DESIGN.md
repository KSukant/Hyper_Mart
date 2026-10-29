# HyperMart — Design System

Read this file before building any screen. `PROJECT.md` says *what* to build; this file says *how it must look and behave*.
If a screen is not covered here, follow the closest existing pattern rather than inventing a new one.

---

## 1. Brand personality

HyperMart should feel like a **fresh, trustworthy Indian family store that happens to be online**.

| We are | We are not |
|---|---|
| Fresh, warm, honest | Flashy, loud, "sale-sale-sale" |
| Clear about price, delivery and returns | Hiding charges or conditions in small print |
| Calm and spacious | Crowded like a newspaper ad |
| Helpful, plain-spoken | Clever copy that needs explaining |

Three rules every screen must pass:
1. **The price, the delivery date and the return rule are always visible together.** A customer should never have to open another page to find any of them.
2. **One primary action per section.** Only one solid green button per card or panel.
3. **Colour has meaning.** Green = act / fresh / trusted, yellow = offer / member, red = discount or problem. Never use them decoratively.

---

## 2. Colour

### 2.1 Core palette

| Token | Hex | Role | Use it for | Don't use it for |
|---|---|---|---|---|
| `primary` | `#0E5E3A` | Brand green | Primary buttons, active nav underline, links, selected chips, logo | Large background blocks except the hero and footer |
| `primary-dark` | `#0A4A2E` | Hover / pressed | Button hover, footer background | Text on light backgrounds |
| `primary-tint` | `#E7F2EC` | Light green | Selected chip background, "in your city" info bars, success panels | Body background |
| `accent` | `#F5B700` | Offer yellow | Member-price pill, offer banner highlight, "Join Rewards" button, countdown background | Text (too light), error states |
| `accent-tint` | `#FFF4D1` | Light yellow | Offer card background strip, member info panels | — |
| `accent-text` | `#7A4A00` | Dark amber | Text placed on `accent-tint` | — |
| `danger` | `#C62828` | Red | Discount % tag, "Only 3 left", errors, failed states | Buttons (except destructive actions like "Remove") |
| `danger-tint` | `#FDECEA` | Light red | Error message backgrounds | — |
| `success` | `#2E7D32` | Status green | "In stock", "Delivered", "Payment confirmed" ticks | Buttons (use `primary`) |
| `bg` | `#F6F7F5` | Page background | Behind cards and sections | Cards |
| `surface` | `#FFFFFF` | Card background | Cards, header, modals, inputs | — |
| `text` | `#17201B` | Main text | Headings, product names, prices | — |
| `muted` | `#5D6862` | Secondary text | Unit sizes, captions, helper text, struck MRP | Prices, important warnings |
| `border` | `#E2E6E3` | Lines | Card borders, dividers, input borders | — |

### 2.2 Department colours

Each department has a **soft tint** used only for its category tile, department chip and small icon backgrounds. They help customers recognise the department at a glance. **Never** use department colours for buttons or prices.

| Department | Icon / text colour | Tint background | Used on |
|---|---|---|---|
| Food and Groceries | `#0E5E3A` | `#E7F2EC` | Category tile, "Food" chip, food panel header |
| Fashion | `#6B2E5F` (plum) | `#F6EAF3` | Category tile, "Fashion" chip, fashion panel header |
| Beauty and Personal Care | `#9C2F55` (rose) | `#FCEBF1` | Category tile, "Beauty" chip, beauty panel header |
| Electronics | `#1D4E89` (blue) | `#E8F0FA` | Category tile, "Electronics" chip, electronics panel header |

### 2.3 Contrast (checked, WCAG AA needs 4.5 for text)

| Pair | Ratio |
|---|---|
| White on `primary` | 7.8 ✔ |
| `text` on `accent` | 9.3 ✔ |
| White on `danger` | 5.6 ✔ |
| `muted` on white | 5.8 ✔ |
| `accent-text` on `accent-tint` | 6.8 ✔ |
| Each department colour on its tint | 6.2 – 8.2 ✔ |

**Never put white text on `accent` yellow** (fails contrast). Yellow always carries dark text.

### 2.4 Colour proportions on a page

Roughly **70% white/background, 20% text and borders, 7% green, 3% yellow and red.** If a screen looks mostly green or yellow, it's wrong.

### 2.5 Tailwind setup

```css
:root {
  --primary: 14 94 58;        /* #0E5E3A */
  --primary-dark: 10 74 46;   /* #0A4A2E */
  --primary-tint: 231 242 236;
  --accent: 245 183 0;
  --accent-tint: 255 244 209;
  --accent-text: 122 74 0;
  --danger: 198 40 40;
  --danger-tint: 253 236 234;
  --success: 46 125 50;
  --bg: 246 247 245;
  --surface: 255 255 255;
  --text: 23 32 27;
  --muted: 93 104 98;
  --border: 226 230 227;
  --food: 14 94 58;        --food-tint: 231 242 236;
  --fashion: 107 46 95;    --fashion-tint: 246 234 243;
  --beauty: 156 47 85;     --beauty-tint: 252 235 241;
  --electronics: 29 78 137; --electronics-tint: 232 240 250;
}
```
Map each to Tailwind colours as `rgb(var(--token) / <alpha-value>)` so `bg-primary/10` works.
Dark mode is **out of scope** for now.

---

## 3. Typography

- **Headings:** Plus Jakarta Sans (weights 600, 700, 800)
- **Body and UI:** Inter (weights 400, 500, 600)
- **Prices:** Inter 700 with `font-variant-numeric: tabular-nums` so digits line up.

| Style | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| Display | 48 / 56 | 32 / 40 | 800 | Home hero headline only |
| H1 | 36 / 44 | 28 / 36 | 700 | Page titles ("Shop by category") |
| H2 | 28 / 36 | 22 / 30 | 700 | Section titles ("This week's offers in Coimbatore") |
| H3 | 20 / 28 | 18 / 26 | 600 | Card titles, panel titles |
| Body L | 18 / 28 | 16 / 24 | 400 | Hero subtitle, intro text |
| Body | 16 / 24 | 15 / 22 | 400 | Default text |
| Small | 14 / 20 | 14 / 20 | 400–500 | Product unit, helper text, card info lines |
| Caption | 12 / 16 | 12 / 16 | 500 | Badges, legal notes, timestamps |
| Price L | 28 | 24 | 700 | Product page price |
| Price M | 20 | 18 | 700 | Product card price |

Rules:
- Sentence case everywhere ("Add to cart", not "Add To Cart"). Only the logo is styled differently.
- Max line length for paragraphs: 70 characters.
- Never go below 12px.

---

## 4. Layout, spacing and grid

- **Spacing scale (4px base):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- **Container:** max width 1280px, centred. Side padding: 16px mobile, 24px tablet, 32px desktop.
- **Section spacing:** 48px between page sections on desktop, 32px on mobile.
- **Card padding:** 16px (product card), 24px (panels and info cards).

| Breakpoint | Width | Product grid columns | Category tiles |
|---|---|---|---|
| Mobile | 360–639 | 2 | 2 × 2 |
| Tablet | 640–1023 | 3 | 2 × 2 |
| Laptop | 1024–1279 | 4 | 4 in a row |
| Desktop | 1280+ | 5 | 4 in a row |

- Grid gap: 12px mobile, 16px tablet, 20px desktop.
- **No horizontal page scroll at any width.** Horizontal scrolling is allowed only inside a "carousel row" with visible arrows on desktop and swipe on mobile.

---

## 5. Shape, borders, shadows, motion

| Element | Radius | Border | Shadow |
|---|---|---|---|
| Card | 12px | 1px `border` | none; on hover `0 4px 16px rgba(23,32,27,0.08)` |
| Button / input | 10px | 1px (inputs) | none |
| Chip / pill / badge | 999px (fully round) | 1px for outline chips | none |
| Modal / drawer | 16px | none | `0 12px 40px rgba(23,32,27,0.18)` |
| Product image box | 10px | none | none, background white |

Motion:
- Duration 150ms for hovers, 200–250ms for drawers and modals, `ease-out`.
- Hover on product card: lift by 2px plus shadow. No zoom on images.
- Respect `prefers-reduced-motion`: turn off carousels' auto-play and lifts.
- Hero carousel auto-advances every 6 seconds, pauses on hover and focus.

---

## 6. Iconography and imagery

- **Icons:** lucide-react only, 20px in UI, 24px in feature strips, stroke width 1.75. Icons always sit beside a text label, never alone (except cart/account in the header, which need `aria-label`).
- **Product photos:** square, product centred on pure white, no props, consistent lighting. Shown with `object-contain` inside a white box, 12px inner padding.
- **Department/hero imagery:** bright, natural photography (fresh produce, folded clothes, beauty bottles, devices) on soft backgrounds. Until real photos exist, use the placeholder SVGs in the department colour.
- **Illustrations:** simple line style, 1.75px stroke, department colour — only for empty states and the delivery strip.
- Never use stock photos with people's faces as product images.

---

## 7. Components

### 7.1 Buttons

| Variant | Look | Use |
|---|---|---|
| Primary | `primary` fill, white text, 600 weight | Add to cart, Checkout, Place order, Shop now |
| Secondary | White fill, `primary` 1px border, `primary` text | View details, See all, Change |
| Accent | `accent` fill, `text` colour text | Join Rewards, See deals (offer areas only) |
| Ghost / link | No border, `primary` text, underline on hover | "View all offers →" |
| Destructive | White fill, `danger` text | Remove from cart |

Sizes: Large 48px tall (hero, checkout), Medium 40px (default), Small 32px (inside cards, chips). Minimum touch target 44 × 44px on mobile. Disabled: 40% opacity, no hover.

### 7.2 Header (all customer pages)

Desktop, one row, 72px tall, white with bottom border:
`[Logo] [Home  Category ▾  Deals  New Arrivals  Offers] [Deliver to 641004 · Coimbatore ▾] [Search……] [EN ▾] [Sign in / Account] [Cart (2)]`

The five nav items are fixed (PROJECT.md §9). "Category ▾" opens a small menu with the 4 departments, each with its department icon and colour.

- Logo: "HyperMart" wordmark, Plus Jakarta Sans 800, `primary`, with a small cart/leaf mark.
- Active nav item: `text` colour, 600 weight, 3px `primary` underline. Others: `muted`, hover to `text`.
- **Location selector** (replaces the wireframe's "Store: name, 3.2 km"): pin icon + two lines — small caption "Deliver to", bold "641004 · Coimbatore". Clicking opens a popover: pincode input, "Use my location", recent pincodes, and the result ("Delivered from Coimbatore warehouse" or "Not serviceable yet — notify me").
- Cart: icon with a round `primary` count badge (white number); hidden when 0.

Mobile (<1024px), two rows:
- Row 1: menu icon, logo, account, cart.
- Row 2: full-width search with the location line underneath ("Deliver to 641004 · Coimbatore ›").
- Nav moves into the menu drawer.

Optional thin top bar (36px, `primary` background, white Caption text) for one site-wide message, e.g. "Free delivery on orders above ₹499 in your city". Only one message at a time.

### 7.3 Product card

```
┌──────────────────────────┐
│ [Badge]           [-20%] │  ← top-left: one status badge; top-right: red discount tag
│        product image      │
│                      [♡] │
├──────────────────────────┤
│ Brand (Caption, muted)    │
│ Product name (2 lines max)│
│ 1 kg · ★ 4.5 (120)        │
│ ₹149  ~~₹179~~            │  ← Price M, MRP struck in muted
│ [Member ₹129]             │  ← accent pill, only if memberPrice
│ 🚚 Delivery by 28 Oct     │  ← delivery line
│ ↺ 7-day return            │  ← return line
│ [Grade A] [Best before…]  │  ← max 2 department badges (PROJECT.md §6)
│ [   Add to cart        ]  │  ← primary, full width
└──────────────────────────┘
```

- After "Add to cart" is pressed, the button becomes a quantity stepper `[–  1  +]` in the same space.
- Out of stock in the customer's city: image at 60% opacity, grey "Out of stock in Coimbatore" label, button becomes Secondary "Notify me".
- Low stock (≤5): red Small text "Only 3 left in your city" above the button.
- Sold by weight: price shows "₹40 / kg" and the button opens a weight picker.

### 7.4 Price block

| Part | Style |
|---|---|
| Current price | Price M/L, `text`, 700 |
| MRP | Small, `muted`, strikethrough, prefixed "MRP" on the product page |
| Discount | Caption, white on `danger`, pill: "20% off" |
| Member price | Pill, `accent` background, `text` colour: "Member ₹129". Non-members see it the same way plus a "Join Rewards" link on the product page only |
| Tax note | Caption, `muted`: "Inclusive of all taxes" (product page only) |

### 7.5 Badges and chips

- **Status badge** (on image, top-left): white background, `text` colour, Caption 600, e.g. "Near-expiry", "Clearance", "Member deal", "Refurbished".
- **Discount tag** (on image, top-right): `danger` fill, white text, "40% off".
- **Department badge** (below price): tint background of the product's department + department colour text, Caption, with a 14px icon. E.g. food "Grade A" = green tint; electronics "1-yr warranty" = blue tint.
- **Filter chips:** outline by default (`border`, `text`); selected = `primary` fill, white text. Height 36px.
- **Quick chips on home** (Fresh, Offers, Buy again, New arrivals): outline chips with an icon.

### 7.6 Countdown

Small inline row with a clock icon: "Ends in 02:14:36" in `danger` text, `tabular-nums`. For deals ending in under 1 hour show "Ends in 42 min" in bold. When it reaches zero, the card shows "Offer ended" and the price goes back to normal without a page reload.

### 7.7 Delivery promise line

Always one line with a truck icon, in `muted` Small, bold date:
- "Delivery **today** · order within 2 h 15 m" (fresh, before cut-off)
- "Delivery by **Tue, 28 Oct**"
- "Not deliverable to 625001 yet" (in `danger`)

### 7.8 Inputs and forms

- Height 44px, white, 1px `border`, radius 10px, 12px horizontal padding.
- Focus: 2px `primary` ring. Error: `danger` border + `danger` Small message below, starting with what to do ("Enter a 6-digit pincode").
- Labels always above inputs, never placeholder-only.
- Pincode input: numeric keyboard on mobile, max 6 digits.

### 7.9 Info bars

Full-width rounded bar (12px radius, 12px 16px padding) with an icon:
- Info (`primary-tint`, `primary` text): "Delivering to 641004 · Coimbatore. Prices and offers are for your city."
- Offer (`accent-tint`, `accent-text`): "Members save ₹40 on this order."
- Warning (`danger-tint`, `danger` text): "2 items in your cart are not available in Kochi."

### 7.10 Footer

`primary-dark` background, white text, 4 link columns (Shop, Help, About, Policies), newsletter input with an `accent` "Subscribe" button, payment-method icons, and "© HyperMart. Prices include GST."

---

## 8. Page layouts

**Which sections each page has, and in what order, is defined in PROJECT.md §9 and §10. This chapter describes how each section looks.** Every section listed here must fit one screen exactly (PROJECT.md §10).

### 8.0 Snap section frame (applies to every section below)
- Full width, height `calc(100svh − var(--header-h))`, content inside the 1280px container.
- Vertical padding 32px desktop / 20px mobile; content block vertically centred.
- Alternate section backgrounds `bg` and `surface` so the change between sections is clear.
- Section heading (H2) top-left, optional "View all →" link top-right.
- Rows of cards use a carousel with round arrow buttons (40px, white, border, `primary` icon) on desktop and swipe on mobile, plus a "1–5 of 8" counter. Never wrap into a second row if it would break the one-screen fit.
- Right-edge section dots: 8px dots, 12px apart, `border` colour, current one `primary` and 10px.

### 8.1 Home (6 sections)
1. **Hero** — two columns on desktop, stacked on mobile.
   - Left card (white): Display headline "Fresh food, fashion, electronics and beauty", Body L "Delivered to your door across Coimbatore, Chennai, Bengaluru and Kochi.", big search bar with mic icon, pincode input + "Use my location", an info bar showing the delivery result ("Fresh items today, others by 29 Oct"), quick chips (Fresh, Offers, Buy again, New arrivals), Primary Large "Shop now".
   - Right card: hero carousel (`heroSlides`) on the slide's background token, real product image, eyebrow pill, H1 headline, member-price pill, Accent button, 4 dots.
   - Bottom of the same section: **delivery strip** (4 columns: Fresh delivery today or tomorrow · Everything else 1–4 days · Cash on delivery · Join Rewards).
2. **Shop by department** — 4 tinted department tiles in one row (2 × 2 on mobile).
3. **Deals ending soon** — countdown deal cards, carousel row, "See all deals →" to `/deals`.
4. **Trending in {city}** — product cards, carousel row, filters as chips (All / Food / Fashion / Electronics / Beauty).
5. **Rewards and subscriptions** — two cards side by side: Rewards (`accent-tint`, benefits list, "Join Rewards") and Subscribe and save (`primary-tint`, milk/eggs/vegetables, "Start a subscription"). Below them, the "Why HyperMart" 4 small cards.
6. **Footer.**
- Removed from the wireframe: "Pick up at store", "Your store: Store name, 3.2 km", "Store delivery / Warehouse delivery / Pickup at store".

### 8.2 Category hub (2 sections)
1. H1 "Shop by category", subtitle "Four departments. One cart. Delivered to your door." · 4 department cards on their tints: line illustration, H3 name, Small tagline, two info lines (delivery note from `departments`, real item count from data) and a Secondary "Explore category →" button linking to `/category/[department]` · trust strip at the bottom (Secure payments · Track every shipment · Clear return rules).
2. Footer.

### 8.3 Department page — sub-part of Category (3 sections)
Layout is defined in PROJECT.md §9.1. Visual details:
- **Hero card:** department tint background, 16px radius, height about 30% of the section; H1 in `text`; line illustration on the right in the department colour, 1.75px stroke; search input 48px tall with a Primary "Search" button.
- **Department tabs:** pill buttons 40px tall; current = `primary` fill + white text; others = white with `border`.
- **Delivery strip:** white card, 3 equal columns separated by 1px dividers, 24px icons in the department colour.
- **Sub-category tiles:** white cards, 12px radius, 1px border, icon 48px in the department colour above the name (H3 small, 600). Hover: department tint background. Selected (filter applied): 2px department-colour border.
- **Promise strip:** white card, 5 columns, icon + bold title + muted small text; on mobile a horizontal swipe row.
- **Product card in this section:** horizontal compact variant (image left 120px, details right) as in the wireframe, showing name, unit ("~ 1 kg, approx. 5–7 pcs"), price ("₹48 per kg"), up to 2 department badges, best-before date (food), and a full-width Primary "Add to cart".
- **Side panel:** subscription/department card on `bg` with a round icon, H3, Small text and Primary button; "Top brands" card with 2 × 3 text tiles (brand name in Plus Jakarta Sans 700, `text` colour) and "See all →".

### 8.4 Deals (3 sections)
1. **Deal of the day:** large two-column card on `primary` (image left, details right): yellow "Deal of the day" pill, product name (H1 white), price block in white with member pill, large countdown (H2, `accent`), stock bar ("38 of 200 claimed"), Accent "Add to cart".
2. **Ending soon:** carousel of deal cards sorted by `endsAt`; deals under 1 hour show a red bold "Ends in 42 min".
3. Footer.

### 8.5 New Arrivals (2–6 sections)
1. H1 "New arrivals", subtitle "Just added in {city}", department chips, and the first carousel row (all departments).
2. One section per department with new items: department-tint heading strip + carousel row of new products with a small "New" status badge.
3. Footer.

### 8.6 Offers (4 sections)
1. Member banner on `accent-tint` ("Member prices this week", Primary "Shop now", cart illustration) + department chips + member offers row.
2. **Near-expiry** (food and beauty): each card shows "Best before 30 Oct" and "Non-returnable" clearly.
3. **Clearance** (fashion): cards show remaining sizes and "Exchange only".
4. Footer.
- Offer card = product card + status badge, stock line "Only 10 left in your city", one department line, delivery line. Countdown only on deals.
- Footer note (Caption, muted): "Offers apply to your city only."
- Wireframe corrections: "Rs." → "₹"; "at your store" → "in your city"; "Store – Today / Pickup – 2 hrs" → delivery date.

---

## 9. States every screen needs

| State | Pattern |
|---|---|
| Loading | Skeleton blocks in `border` colour with a soft shimmer, same size as the final content. No spinners for whole pages. |
| Empty | Line illustration + one sentence + one action ("No offers in Kochi right now. Browse all products →") |
| Error | Info bar in danger style + "Try again" button. Never show raw error text. |
| Not serviceable | Info bar: "We don't deliver to 625001 yet." + "Notify me when you arrive" + "Try another pincode". |
| Success | Toast bottom-centre on mobile, top-right on desktop, 3 seconds, `text` background with white text and a green tick: "Added to cart · View cart". |

---

## 10. Writing style (microcopy)

- Address the customer as "you". Short sentences.
- Prices: "₹1,24,999". Weights: "500 g", "1 kg", "1 L". Dates: "Tue, 28 Oct". Times: "2:30 PM".
- Buttons start with a verb: "Add to cart", "Check delivery", "Join Rewards".
- Delivery and return wording is always specific: "7-day return", "Returnable if sealed", "Exchange only", "Quality complaint within 24 h" — never just "Easy returns".
- Location wording: "in your city" / "in Coimbatore" — never "at your store".

---

## 11. Accessibility checklist

- Text contrast ≥ 4.5:1 (all tokens above pass).
- Every interactive element reachable by keyboard with a visible 2px `primary` focus ring (offset 2px).
- Icons-only buttons have `aria-label`.
- Carousels: pause button, arrow buttons with labels, `aria-live="polite"` for slide changes.
- Countdown timers are not announced every second (`aria-live="off"`); the end time is in a hidden label.
- Images have meaningful alt text ("Fresh tomatoes, 1 kg"), decorative ones have `alt=""`.
- Forms: labels linked to inputs, errors linked with `aria-describedby`.
