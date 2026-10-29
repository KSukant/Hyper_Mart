# HyperMart — customer website (frontend)

Next.js 15 + Tailwind + framer-motion. All data comes from `src/mocks` (built from `seed/`), so it runs with no backend.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production check
npm run typecheck
```

Node 18.18+ (20 recommended).

## Pages

| Route | Scroll | What's there |
|---|---|---|
| `/` | one section per screen | Hero with delivery-scooter animation, departments, deals ending soon, trending, rewards + subscriptions, footer |
| `/category` | snap | All four departments |
| `/category/food` · `fashion` · `electronics` · `beauty` | snap | Department intro (search, sub-categories, promises) → shop section (filters, product row, side panel) |
| `/deals` | snap | Deal of the day with countdown, ending soon |
| `/new-arrivals` | snap | All new items, then one screen per department |
| `/offers` | snap | Member prices, near-expiry, clearance |
| `/search?q=` | normal | Filters, sort, grid |
| `/product/[slug]` | normal | Department-specific panels (grade & weight, size chart & fit, shades & ingredients, specs & home-fit check) |
| `/cart`, `/checkout` | normal | Shipments grouped by delivery date, slots, COD rules, UPI demo |
| `/orders`, `/orders/[id]` | normal | Tracking, cancel, return/report, substitution demo |
| `/account` | normal | OTP sign-in (demo) and account hub |
| `/help` | normal | FAQ from the delivery/COD rules |

Other footer links open a "coming soon" page.

## Demo data

- Default pincode **641004 (Coimbatore)**. Try 682024 (Kochi), Chennai and Bengaluru pincodes from the location picker.
- Sign in: **+91 98400 00001** (Priya, member) or **+91 98950 00002** (Arjun). OTP is **123456**.
- UPI: any `name@bank` succeeds; `fail@upi` fails, `pending@upi` stays pending for a few seconds.
- On an order page, **Simulate next status** moves it along; **Simulate unavailable** shows the substitution choice.

## Adding real photos and the logo

Images are optional — every product has a drawn illustration until a photo exists.

1. Put product photos at `public/products/<department>/<slug>-1.jpg` (also `.webp`/`.png`), e.g. `public/products/food/fresh-tomatoes-1.jpg`. Slugs are in `src/mocks/products/*.ts`.
2. Put the logo at `public/logo/hypermart-logo.webp` (or `.png` / `.svg`).
3. Run `npm run photos` (it also runs automatically before `dev` and `build`).

## Design rules (see DESIGN.md / PROJECT.md)

- Colours are CSS variables in `src/app/globals.css`, mapped in `tailwind.config.ts`. Lime (`accent`) always takes dark text.
- Snap pages use `SnapPage` / `SnapSection` (`src/components/sections/Snap.tsx`). Each section is at least one screen tall; content is sized to fit at 1920×1080 down to 360×740. The `short:` / `tiny:` / `phone-short:` Tailwind variants handle short laptop and phone screens. Snapping turns off below 600 px height.
- Prices, delivery fees and COD rules live in `src/lib/pricing.ts` and `src/lib/delivery.ts` — screens never calculate money themselves.
