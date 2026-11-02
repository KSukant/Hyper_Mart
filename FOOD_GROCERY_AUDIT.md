# HYPERMART FRESH JOURNEY
## Food & Grocery Customer Portal Audit and Architectural Specification

**Audit Date**: November 2026  
**Project**: HyperMart Web Customer Experience  
**Concept**: HyperMart Fresh Journey — Discover. Explore. Select. Shop.  
**Auditor**: Senior UI/UX Architect & Frontend Engineering Team  

---

## 1. Executive Summary & Context

HyperMart is a multi-category modern Indian omnichannel retail application serving four key retail departments:
1. **Food & Groceries** (Fresh fruits, vegetables, dairy, staples, snacks)
2. **Fashion & Apparel** (Ethnic, western, footwear, kids)
3. **Beauty & Personal Care** (Skincare, haircare, makeup, fragrances)
4. **Electronics & Appliances** (Mobiles, laptops, TVs, large appliances)

The current Food & Grocery shopping experience was historically implemented using a generic, shared layout (`DepartmentView.tsx`) that treats groceries almost identically to electronics and fashion: a simple top search bar, category chips, and a generic 4-column card row.

### The Objective
Transform the Food & Grocery customer journey into **HyperMart Fresh Journey**, a premium, connected, sensory, and highly functional 5-stage grocery experience:
1. **Stage 1: Grocery Discovery** — Dedicated visual gateway to fresh departments, seasonal harvests, daily essentials, and curated collections.
2. **Stage 2: Category Exploration** — 2-level hierarchy covering produce, dairy, staples, snacks with rich subcategory navigation, descriptions, and item previews.
3. **Stage 3: Product Discovery** — Advanced grocery listing with multi-faceted filtering (Freshness Grade A/B/C, Ripeness, Storage, Dietary Veg/Non-Veg, Allergens, Brand, Stock), sorting, and rapid add-to-cart.
4. **Stage 4: Product Information** — Deep grocery PDP honoring shelf-life, remaining shelf-life days, weight/volume options, FSSAI compliance, nutrition per 100g, allergen tags, and cold-chain promises.
5. **Stage 5: Shopping Completion** — Smart cart & checkout tailored for groceries (sold-by-weight estimates, substitution choices, chilled slot scheduling, doorstep delivery rules).

---

## 2. Technical Stack & Architecture Baseline

| Layer | Technology | Version | Purpose / Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | 15.5.28 | Hybrid SSG/SSR with dynamic client components |
| **UI Library** | React | 19.1.10 | Concurrent features, hooks, Suspense |
| **Styling** | Tailwind CSS & PostCSS | 3.4.19 | Utility-first CSS with CSS variables in `globals.css` |
| **Icons** | Lucide React | 0.468.0 | Consistent iconography |
| **Animations** | Framer Motion & CSS keyframes | 11.18.2 | Micro-interactions, staggered entrances, scroll triggers |
| **State Management** | Zustand with `persist` | 5.0.16 | `useCart`, `useLocation`, `useMember`, `useOrders`, `useWish` |
| **Type Safety** | TypeScript | 5.7.2 | Strict domain typing (`Product`, `FoodAttrs`, `Stock`, `CartItem`) |

---

## 3. Brand Identity & Color System Audit

The existing HyperMart design system is anchored in deep forest green, fresh lime, cream, and soft mint. The **HyperMart Fresh Journey** redesign strictly adheres to this palette without introducing unauthorized colors (no purples, blues, or neon gradients).

### Color Token Mapping
| Token | Hex | Role in Fresh Journey | Target Proportion |
| :--- | :--- | :--- | :--- |
| **Forest Green (Primary)** | `#075B36` | Main brand headers, primary action buttons, active navigation pillars | ~20% |
| **Primary Hover** | `#06472C` | Button hover, active category badges | — |
| **Emerald Green** | `#07834B` | Secondary accents, in-stock badges, freshness certification tags | ~5% |
| **Mint Background** | `#EAF5E5` | Fresh section backdrops, subcategory pills, dietary callouts | ~25% |
| **Warm Cream** | `#FFF9EB` | Page body background, discovery hero ambient panels | ~30% |
| **Lime Accent** | `#C5EA42` | Flash badges, discount pills, interactive highlight rings | ~10% |
| **Golden Yellow** | `#F4C52E` | Member savings badges, seasonal specials, rating stars | ~5% |
| **Pure White** | `#FFFFFF` | Product cards, filter panels, checkout review surfaces | Card surfaces |
| **Dark Charcoal** | `#17251D` | High-contrast readable typography (headings, titles, prices) | High readability |
| **Secondary Slate** | `#64756A` | Subtitles, units, delivery estimates, metadata | Medium contrast |
| **Border Tone** | `#DFE9DC` | Subtle hairline dividers, card borders | Dividers |

---

## 4. Route-to-Component Mapping & Audit Inventory

### Page 1: Food & Grocery Department Gateway (`/category/food`)
- **Current Route**: `/category/food`
- **Current Page Title**: `Food and Groceries`
- **Current Purpose**: Displays all food products in a flat list with filter chips and a generic side banner.
- **Parent Layout**: `src/app/category/[department]/page.tsx` rendering `DepartmentView.tsx`.
- **Components Used**: `DepartmentView`, `CardRow`, `ProductCard`, `FilterSheet`, `SortSheet`, `SnapPage`, `SnapSection`.
- **Shared Components Used**: `Header`, `AddToCart`, `Pill`, `InfoBar`.
- **Existing Functionality**:
  - Filter by Grade, Ripeness, Storage, Dietary, Allergen, Brand, Stock.
  - Sort by Featured, Price Low/High, Rating, Discount.
  - Category chips for top-level categories.
- **Existing Visual & UX Problems**:
  - Treats fresh groceries like a standard apparel/electronics catalog.
  - No dedicated grocery discovery experience, no seasonal harvests, no daily essentials strip.
  - The side panel is static and uninspiring.
  - Does not showcase freshness grading (Grade A, B, C) or ripeness visually before opening products.
  - Lacks editorial feel and visual appetite appeal.
- **Proposed Redesign (Stages 1 & 2)**:
  - Create a dedicated **HyperMart Fresh Journey** hub at `/category/food`.
  - Introduce **Stage 1 (Grocery Discovery)**: Fresh Journey Hero with harvest status, quick destination pills, Fresh Picks of the day, Daily Essentials 1-click adder, and Weekly Harvest collections.
  - Introduce **Stage 2 (Category Exploration)**: Interactive 2-level category explorer (Fresh Fruits & Vegetables -> Leafy greens, root veg, exotic; Dairy & Bread -> Milk, curd, butter; Staples -> Atta, rice, oils; Snacks -> South Indian savories).
- **Action**: **REDESIGN & ELEVATE** with modular grocery components.

---

### Page 2: Product Listing & Filter Hub (`/category/food` with query params or subcategories)
- **Current Route**: `/category/food?c=food-fresh-vegetables` or with filters.
- **Current Page Title**: Subcategory Title (e.g. `Vegetables`)
- **Current Purpose**: Displays filtered products.
- **Existing Functionality**: Client-side filtering across `productsInCity(warehouseId)` with active query synchronization.
- **Existing Visual & UX Problems**:
  - Filters are hidden inside a mobile sheet or cramped sidebar.
  - Result count is small and hard to read.
  - No active filter chips showing applied criteria with one-click clear.
  - Card layout does not highlight grocery-specific attributes (sold by weight, storage condition, remaining shelf life).
- **Proposed Redesign (Stage 3: Product Discovery)**:
  - Dedicated **Fresh Product Grid** with active filter pills bar (e.g. `Grade A [x]`, `Vegetarian [x]`, `Chilled [x]`).
  - Sticky grocery filter bar with desktop filter drawers and mobile filter sheet.
  - Cards that clearly indicate: Weight/Unit (e.g. `1 kg`, `500 g`), Veg/Non-Veg symbol, Storage icon (Ambient/Chilled/Frozen), Grade selection badge, and Instant quantity selector.
- **Action**: **UPDATE & ENHANCE**.

---

### Page 3: Grocery Product Detail Page (`/product/[slug]`)
- **Current Route**: `/product/[slug]` (e.g. `/product/fresh-tomatoes`, `/product/amul-toned-milk-1l`)
- **Current Page Title**: Product Name (e.g. `Fresh Tomatoes | HyperMart`)
- **Current Purpose**: Full product specification, images, price, and purchase actions.
- **Parent Layout**: `src/app/product/[slug]/page.tsx` rendering `ProductPageShell.tsx`.
- **Components Used**: `ProductMediaGallery`, `ProductIdentity`, `ProductPriceCard`, `DomainAttributePanel`, `SpecificationAccordion`, `MobilePurchaseBar`.
- **Existing Functionality**:
  - Image gallery with angles and zoom.
  - Price display with MRP, selling price, and member price.
  - Domain modals for in-cart adjustments (`FreshnessModal`, `QuantityAndWeighingModal`, `ShelfLifeAndDeliveryModal`, `SubstitutionPreferenceModal`).
  - Specifications table and reviews.
- **Existing Visual & UX Problems**:
  - Grocery-specific attributes (Nutrition per 100g, FSSAI licence, Shelf life days, Storage zone, Ingredients, Allergen list) are buried in generic text accordions.
  - Sold-by-weight estimated pricing explanation is text-heavy rather than visual.
  - Ripeness and Grade selection are not integrated directly into the primary purchase selector.
- **Proposed Redesign (Stage 4: Product Information)**:
  - Dedicated **Fresh Journey Grocery PDP Profile**:
    - **Freshness & Grade Selector**: Interactive Grade A (Premium), Grade B (Everyday), Grade C (Culinary/Puree) selector with price difference.
    - **Ripeness Selector**: Raw (ripen at home), Ready to eat, Very ripe.
    - **Freshness & Shelf-Life Meter**: Visual shelf-life indicator showing harvest/pack date and guaranteed minimum shelf-life.
    - **Nutritional Fact Table**: Structured FSSAI-compliant table per 100g.
    - **Allergen & Dietary Badges**: Green veg dot, lactose/gluten tags, storage condition callout.
    - **Cold-Chain Assurance Card**: "Delivered chilled in insulated crate from Coimbatore hub".
    - **Complementary Grocery Basket**: "Frequently cooked together" recipes/combinations.
- **Action**: **ENHANCE & OPTIMIZE** with grocery-first presentation.

---

### Page 4: Grocery Shopping Cart (`/cart`)
- **Current Route**: `/cart`
- **Current Page Title**: `Your Cart`
- **Current Purpose**: Item review, quantity adjustment, weight estimates, delivery calculations.
- **Components Used**: `CartPageContent`, `FoodCartItem`, `CartCheckoutSidebar`, `FreshnessModal`, `SubstitutionPreferenceModal`.
- **Existing Functionality**:
  - Supports `FoodCartItem` with grade and ripeness tags.
  - Shows sold-by-weight note ("Estimated price, final billed at packing").
  - Substitution preference selector ("Ask me first", "Pick best alternative", "Do not substitute").
  - Free delivery threshold tracker (₹499 regular / ₹199 member).
- **Existing Visual & UX Problems**:
  - Grocery items can get visually mixed with bulky items without clear cold-chain separation.
  - No quick summary of chilled vs ambient items.
- **Proposed Redesign (Stage 5: Shopping Completion - Cart)**:
  - Add **Fresh Cold-Chain Delivery Indicator** showing temperature-controlled transport verification.
  - Streamline quantity stepper with precise step increments (0.25 kg for loose produce, 1 unit for packaged goods).
  - Prominent substitution preference badge directly on the cart card.
- **Action**: **RETAIN & REFINE**.

---

### Page 5: Grocery Checkout & Delivery Scheduling (`/checkout`)
- **Current Route**: `/checkout`
- **Current Page Title**: `Checkout`
- **Current Purpose**: 5-step checkout (Address -> Delivery Slots -> Review -> Payment -> Confirmation).
- **Components Used**: `useCartView`, `getAvailableSlots`, `getCartCharges`, `demoCustomers`.
- **Existing Functionality**:
  - Time-slot selection (e.g. 7 AM – 9 AM, 10 AM – 12 PM).
  - Cold-chain handling fee calculation when applicable.
  - COD qualification check.
- **Existing Visual & UX Problems**:
  - Slot selection does not visually distinguish "Fresh Morning Dispatch" from standard courier slots.
- **Proposed Redesign (Stage 5: Shopping Completion - Checkout)**:
  - Highlight grocery morning slots ("Early Morning Fresh Drop: 7 AM – 9 AM").
  - Ensure zero layout shifts and instant payment method selection.
- **Action**: **RETAIN & POLISH**.

---

## 5. Architectural Deliverable: 5-Stage Fresh Journey Component Architecture

```
src/components/grocery/
├── layout/
│   ├── GroceryHeaderBar.tsx        # Fresh Journey sub-navigation, harvest indicator, delivery area
│   ├── GroceryBreadcrumbs.tsx      # Clean hierarchical breadcrumb trail
│   └── FreshJourneyShell.tsx       # Standard container with mint/cream background rhythm
├── discovery/
│   ├── FreshJourneyHero.tsx        # Stage 1: Headline, search, daily harvest counter, visual composition
│   ├── GroceryDestinationStrip.tsx # Stage 1: Visual category tiles (Produce, Dairy, Staples, Snacks)
│   ├── FreshPicksSection.tsx       # Stage 1: Seasonal harvest highlights & trending groceries
│   ├── DailyEssentialsRow.tsx      # Stage 1: 1-click quick add for milk, atta, eggs, tomatoes
│   └── WeeklyHarvestBanner.tsx     # Stage 1: Curated recipe/pantry savings bundle
├── categories/
│   ├── CategoryExplorer.tsx        # Stage 2: 2-level category & subcategory browser
│   ├── SubcategoryChips.tsx        # Stage 2: Subcategory filtering pills with count
│   └── CategoryBannerCard.tsx      # Stage 2: Visual category introduction
├── products/
│   ├── GroceryProductGrid.tsx      # Stage 3: Responsive product listing with stagger animations
│   ├── GroceryProductCard.tsx      # Stage 3: Dedicated grocery card with Veg mark, unit, grade, add-to-cart
│   ├── GroceryFilterBar.tsx        # Stage 3: Sticky filter bar (Grade, Storage, Diet, Ripeness, Brand)
│   ├── ActiveFilterPills.tsx       # Stage 3: Removable active filter badges with reset
│   └── GrocerySortDropdown.tsx     # Stage 3: Sort by Price, Rating, Newest, Discount
├── pdp/
│   ├── FreshnessGradeSelector.tsx  # Stage 4: Interactive Grade A/B/C selector with pricing
│   ├── RipenessSelector.tsx        # Stage 4: Visual ripeness indicator
│   ├── ShelfLifeIndicator.tsx      # Stage 4: Guaranteed freshness days remaining meter
│   ├── NutritionTable.tsx          # Stage 4: Clean tabular nutrition facts per 100g
│   └── GroceryPairings.tsx         # Stage 4: Frequently paired ingredients & pantry companions
└── shared/
    ├── VegBadge.tsx                # Standard Green/Brown FSSAI vegetarian/non-vegetarian mark
    └── StorageBadge.tsx            # Ambient / Chilled / Frozen temperature indicator
```

---

## 6. Functional Preservation & Data Integrity

1. **Catalog Integrity**: All products queried via `productsInCity(warehouseId)` from `src/lib/catalog.ts`. No hardcoded dummy arrays.
2. **Pricing & Membership**: Uses `getPrice(product, cityId, isMember, now)` from `src/lib/pricing.ts` to compute exact everyday, discounted, and member prices.
3. **Cart Synchronization**: Operates directly with Zustand `useCart` store (`items`, `add`, `setQty`, `remove`, `update`, `lineKey`).
4. **Sold-by-Weight**: Respects `p.attrs.soldByWeight`, `pricePerKg`, and `weightOptionsKg`.
5. **Freshness Grades**: Binds directly to `p.attrs.grades` with dynamic price modifications.
6. **Delivery Commitments**: Computed via `getDeliveryPromise(product, area, now)`.

---

## 7. Motion & Animation Timing Budget

| Interaction | Duration | Easing | Trigger |
| :--- | :--- | :--- | :--- |
| Category Chip Tap | 200ms | `ease-out` | User click |
| Filter Drawer Reveal | 260ms | `cubic-bezier(0.16, 1, 0.3, 1)` | User click |
| Product Card Entrance | 360ms | `ease-out` | Viewport entrance (15% threshold via IntersectionObserver) |
| Add to Cart Counter | 180ms | `ease-in-out` | Quantity change |
| Freshness Grade Switch | 220ms | `ease-out` | User selection |
| Sticky Filter Bar Stick | 160ms | `linear` | Scroll position |

---

## 8. Audit Conclusion & Readiness
The project structure is thoroughly understood. All existing routes, mocks, stores, and components have been mapped. We are now ready to commence Phase 2 implementation.

