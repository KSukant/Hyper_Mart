# HyperMart Operations Hub — Component Placement & Layout Specifications

This document defines the physical layout metrics, alignment grids, component positioning rules, and spatial hierarchies for the HyperMart Operations Hub.

---

## 1. Reference Viewport & Global Dimensions

The base desktop reference layout is calibrated for **1440 × 900 pixels** (expanding cleanly to 1920 × 1080 and adapting to 1280 × 800 / tablet):

- **Sidebar Width (Expanded)**: `248px` (fixed on left)
- **Sidebar Width (Collapsed)**: `76px`
- **Top Navigation Bar Height**: `64px` (sticky at top)
- **Main Viewport Area**: `calc(100vw - 248px)` width × `calc(100vh - 64px)` height
- **Main Page Content Max Width**: `1600px` (centered within the content viewport)
- **Page Horizontal Padding**: `28px` to `32px` (mobile/tablet: `16px` to `20px`)
- **Page Vertical Padding**: `24px` to `28px`
- **Card Corner Radius**: `14px` (Large cards: `16px`, Small elements: `8px`–`10px`)
- **Standard Button & Input Height**: `40px` to `44px` (Touch friendly)
- **Standard Table Row Height**: `52px` to `58px` (Dense tables: `44px` to `48px`)
- **Right Slide-over Drawer Width**: `480px` to `520px` (desktop), `100vw` (mobile)

---

## 2. Shell Layout & Grid Structure

```text
┌─────────────────┬────────────────────────────────────────────────────────┐
│  SIDEBAR        │  TOP NAVIGATION BAR (64px)                             │
│  (248px)        │  [Breadcrumb / Context]      [Search] [Facility] [User]│
│                 ├────────────────────────────────────────────────────────┤
│  • Logo         │  MAIN CONTENT VIEWPORT                                 │
│  • Nav Groups   │  ┌──────────────────────────────────────────────────┐  │
│  • Badge Counts │  │  Page Header: Title + Description + Actions Bar  │  │
│  • Collapse     │  ├──────────────────────────────────────────────────┤  │
│  • User Profile │  │  KPI Cards Grid (12-16px gap)                    │  │
│  • Sign Out     │  ├────────────────────────┬─────────────────────────┤  │
│                 │  │  Primary Workspace     │  Secondary / Attention  │  │
│                 │  │  (Tables, Charts,      │  Panel (Split Grids)    │  │
│                 │  │   Control Towers)      │                         │  │
│                 │  └────────────────────────┴─────────────────────────┘  │
└─────────────────┴────────────────────────────────────────────────────────┘
```

---

## 3. Top-Bar Component Placement

- **Left Section (`flex items-center gap-3`)**:
  - Sidebar collapse/expand toggle button (`h-9 w-9`, rounded-lg).
  - Breadcrumbs navigator (`Home / Merchandising / Products`).
  - Active page contextual badge or live operational status pill.
- **Center Section (`max-w-md w-full`)**:
  - Global Search Bar: Pill-shaped (`h-10 rounded-full bg-neutral-100 pl-10 pr-4`), with leading search magnifying icon and trailing shortcut badge (`⌘K`).
- **Right Section (`flex items-center gap-3 ml-auto`)**:
  - Operational Facility Selector: Dropdown button (`Coimbatore DC`, `Chennai FC`, `All Facilities`).
  - System Alert Notifications: Bell icon button with red unread counter badge.
  - User Identity & Role: Circular avatar with status dot, display name, and role tag with drop-down carets.

---

## 4. KPI Card Grid Rules

KPI metrics appear in rows of 4 to 6 cards:
- **Desktop (>= 1280px)**: `grid-cols-4` or `grid-cols-6` with `gap-3.5` to `gap-4`.
- **Laptop (1024px – 1279px)**: `grid-cols-3` or `grid-cols-4`.
- **Tablet (768px – 1023px)**: `grid-cols-2`.
- **Card Anatomy**:
  1. Top Row: Metric label (`text-xs font-semibold text-neutral-500 uppercase tracking-wider`) + Category icon (`h-5 w-5 text-emerald-700`).
  2. Middle Value: Prominent numerical figure (`text-2xl font-bold font-display text-neutral-900 tracking-tight`).
  3. Bottom Trend: Pill badge with upward/downward arrow and delta (`text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full`) + context string (`vs yesterday`).

---

## 5. Table & Filter Toolbar Standards

- **Filter Row**: Placed directly above data tables.
  - Left: Search input field (`max-w-xs`), category/domain filters, status dropdowns.
  - Right: `Clear filters` text button, `Export CSV` button, and primary `+ Add` action button.
- **Table Container**:
  - White surface with `rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs`.
  - Sticky table header (`bg-neutral-50/90 backdrop-blur text-[11px] font-bold text-neutral-500 uppercase tracking-wider`).
  - Rows: `hover:bg-emerald-50/40 transition-colors border-b border-neutral-100`.
  - Column alignment: Text left-aligned; Numeric/Currency right-aligned; Status dots center/left.
- **Pagination Footer**:
  - Record range string: *"Showing 1-10 of 245 records"*.
  - Rows per page selector: `[10 / 25 / 50]`.
  - Pagination buttons: Previous (`<`), page numbers, Next (`>`).

---

## 6. Slide-Over Drawers & Modal Windows

- **Right Drawer Placement**:
  - Fixed on the right viewport edge: `top-0 right-0 h-full w-[480px] sm:w-[520px] bg-white z-50 shadow-2xl`.
  - Backdrop: `fixed inset-0 bg-black/30 backdrop-blur-xs z-40`.
  - Header: Record title, close `✕` button, status badge.
  - Body: Scrollable inspection panes with tabbed navigation where required.
  - Sticky Footer: Primary and secondary action buttons (`Approve`, `Request Changes`, `Save Adjustment`).
- **Confirmation Modals**:
  - Centered: `fixed inset-0 grid place-items-center z-50 p-4`.
  - Maximum width: `max-w-md` (`440px`).
  - White elevated card with clean title, warning icon, explanatory text, and explicit Cancel/Confirm button pair.
