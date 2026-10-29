# HyperMart Operations Hub — 25-Page Reference Analysis

This document details the comprehensive visual and operational breakdown of each of the 25 pages from `hypermart_admin_portal_25_pages.pdf`.

---

## Page 1: Sign In (`/admin/login`)
- **Title**: Sign in to HyperMart — Operations Hub
- **Purpose**: Secure enterprise staff authentication gateway with multi-step progression.
- **Visual Composition**:
  - **Left Brand Panel**: Dark Evergreen (`#06452F` / `#07563B`) background featuring HyperMart logo, bold headline *"Good food. Brighter living."*, operational tagline *"We keep everyday essentials moving, for healthier, happier communities."*, subtle brand leaf watermark pattern, and vector delivery scooter rider illustration in front of a HyperMart store.
  - **Right Form Panel**: Centered white card with a 3-step breadcrumb progress header (`1. Sign in` [Active green] → `2. Verify it's you` → `3. Access Operations Hub`).
- **Form Controls**:
  - `Company email` input with mail icon and `@hypermart.com` domain placeholder.
  - `Password` input with lock icon and toggleable password visibility eye icon.
  - Primary button: `Continue →` with lime-accent styling (`#C6F04A` / dark text).
  - Security reassurance badge: *"Your access helps keep HyperMart safe and our communities supplied. Always use your company email."*
  - Tertiary action: `Need help signing in?` linking to IT support.

---

## Page 2: Role Access Gate / Permission Denied (`/admin/access-denied`)
- **Title**: This portal is not available for your role
- **Purpose**: Clean security interceptor informing users when their assigned credentials belong to a different workspace or lack role privileges.
- **Visual Composition**:
  - Top bar shows user context: `Jordan Diaz (Operations Team)`.
  - Centered elevated white card (`max-w-lg`) featuring a centered padlock shield illustration with a storefront vector in the background.
  - Heading: *"This portal is not available for your role"*.
  - Subtitle: *"You've been redirected to your assigned workspace, where you can access the tools and information for your role."*
- **Actions**:
  - Primary button: `→ Go to my portal` (Evergreen/Lime).
  - Secondary button: `⇄ Switch portal` (White outlined with subtle border).
  - Danger/Exit button: `→ Sign out`.
  - Support note: *"Need access to a different portal? Contact your administrator or visit Help & Support."*

---

## Page 3: Operations Command Center (`/admin`)
- **Title**: Good morning, Priya — Here's what needs your attention today
- **Purpose**: Daily command dashboard for the Operations Manager (Priya).
- **Sidebar Active Item**: `Home` (Evergreen active pill).
- **Top Bar**: Search input, notification bell with unread badge, avatar badge `P` (Priya - Operations Manager), operational date dropdown (`Tue, 27 May 2025`).
- **Key Metrics (6 KPI Cards)**:
  1. `Orders today`: 1,284 (+12% vs yesterday)
  2. `Packing queue`: 186 (-18% vs yesterday)
  3. `Out for delivery`: 428 (+6% vs yesterday)
  4. `Refunds awaiting`: ₹48,620 (-32% vs yesterday)
  5. `Low stock`: 17 (-41% vs yesterday)
  6. `Customer escalations`: 08 (-27% vs yesterday)
- **Central Panels**:
  - **Fulfilment Control Tower**: Visual corridor connecting `Coimbatore DC` (Dispatching orders) across 498 km (~8 hrs transit) to `Chennai FC` (Receiving today). Connected stepper: `Paid (1,284)` → `Packing (186)` → `Out for delivery (428)` → `Delivered (670)`.
  - **Needs Attention Widget (Right Sidebar)**: Priority alert rows with severity pills: 17 SKUs low in stock, ₹48,620 refunds awaiting (12 requests), 8 customer escalations (3 tickets overdue), Delay risk on 24 orders (Chennai FC weather alert), High RTO risk on 12 orders from tier 3 pincodes.
  - **Breakdown Bars**:
    - Orders by brand (HyperMart Essentials 32%, FreshLeaf 18%, UrbanNest 12%, FitFuel 11%, GlowPlus 9%).
    - Orders by category (Grocery 28%, Home & Living 20%, Beauty 16%, Electronics 14%, Fashion 12%).

---

## Page 4: Exception Queue (`/admin/exceptions`)
- **Title**: Exception queue — Prioritize and resolve items that need attention
- **Purpose**: Multi-department risk triage console.
- **Navigation Tabs**: `All`, `Orders`, `Inventory`, `Payments`, `Refunds`, `Customer care`.
- **Filter Toolbar**: `Status (Open)`, `Severity (All)`, `Age (All)`, `Owner (All)`, `Clear filters`, `Apply filters`.
- **Exception Items**:
  - `5 orders at risk`: Critical, age 2d 6h, Owner: Taylor Moore, Action: `Review orders →`
  - `12 refunds awaiting approval`: High, age 1d 4h, Owner: Priya Raman, Action: `Review refunds →`
  - `7 low-stock SKUs`: High, age 9h 12m, Owner: Daniel Lee, Action: `View SKUs →`
  - `3 payment mismatches`: Medium, age 1d 1h, Owner: Maria Khan, Action: `Investigate →`
  - `2 missed warehouse handoffs`: Critical, age 1d 18h, Owner: Jordan Chen, Action: `View orders →`

---

## Page 5: Catalogue Overview (`/admin/catalogue`)
- **Title**: Catalogue overview — Manage products, brands and categories across HyperMart
- **Purpose**: Strategic catalog health and portfolio monitoring.
- **Top Metrics**:
  - `Total active products`: 48,320 (+12% vs last month)
  - `Pending approvals`: 1,284 (+6% vs last month)
  - `Restricted products`: 320 (-18% vs last month)
  - `Brands onboarded`: 1,050 (+9% vs last month)
- **Shop by Domain**: Interactive domain cards: Food & groceries (12,460), Beauty (8,230), Electronics (14,870), Fashion (12,760).
- **Product Status Chart**: Donut chart breakdown: Active (78%, 37,620), Pending approval (16%, 7,680), Restricted (4%, 1,900), Draft (2%, 1,120).
- **Category Coverage**: Grid with thumbnails: Fresh Food (6,430), Personal Care (5,210), Women's Fashion (6,120), Home Appliances (4,870), Mobiles (8,940), TVs & Audio (5,320).
- **Recent Activity Feed**: Real-time log of product additions, approval submissions, brand profile updates, and category activations.

---

## Page 6: Products Table (`/admin/products`)
- **Title**: Products — Manage your product catalog, inventory, pricing and availability
- **Purpose**: Operational SKU listing, bulk actions, and catalog search.
- **Actions**: `Export`, `+ Add product`.
- **Filters**: Search input (`Search by product name, SKU or brand`), `All domains` dropdown, `All status` dropdown, `Clear filters`.
- **Table Columns**:
  - Checkbox selection
  - Product thumbnail, Title & pack size
  - SKU code
  - Brand name
  - Category breadcrumb
  - Price (₹ INR)
  - Stock quantity
  - Offer badge
  - Status indicator dot (`Active` green, `Pending` amber, `Draft` gray)
  - Actions overflow menu (`...`)

---

## Page 7: Product Create / Edit (`/admin/products/[id]`, `/admin/products/new`)
- **Title**: Edit product — Keep your product information accurate and up to date
- **Purpose**: Full-featured CMS editor for individual products.
- **Header Actions**: Breadcrumbs (`Products > Edit product`), Status toggle (`Draft` / `Live`), `Save draft`, `Publish product`.
- **Form Structure**:
  - **Left Column**: Multi-image media gallery (Hero image, thumbnails, `+ Add media`), product badges (e.g. Cold for 24 hours, BPA-free), and Variant Matrix (Color, SKU, Price, Stock, + Add variant).
  - **Center Column**: Product name, Brand selector, Category cascade, SKU input, rich description textarea (234/2000 chars).
  - **Right Column**:
    - *Availability & Fulfilment*: Delivery eligibility, return window eligibility.
    - *Product Compliance*: Compliance category, mandatory safety checklist (Safety standards, non-hazardous, packaging compliance).
    - *Pricing & Tax*: Retail price, Compare-at price, Tax category rate.
    - *Stock Summary*: Total stock (269), In stock (269), Out of stock (0), Low stock alert threshold (20 units).

---

## Page 8: Brands & Procurement (`/admin/brands`)
- **Title**: Own the assortment, clearly — Stronger brands. Smarter buys. A healthier tomorrow
- **Purpose**: Supplier and brand partnership governance.
- **Top Metrics**: Buying health (87%), On-time deliveries (92%), Agreements active (28 across 14 brands), At risk SKUs (6%).
- **Primary Actions**: `+ Add brand`, `Create purchase order`.
- **Brand Directory Table**: Brand logo & name, Active SKU count, Wholesale agreement ID & contract window, Next buying window countdown, Compliance status (`Compliant` / `Needs attention`), Stock health (`Healthy` / `At risk` / `Low stock`), Action menu.
- **Procurement Timeline Roadmap**: Milestone stepper with chronological markers (PO placed, Delivery completed, Buying window opened, Agreement review).

---

## Page 9: Offers & Promotions (`/admin/promotions`)
- **Title**: Offers & promotions — Create and manage campaigns, discounts and offers
- **Purpose**: Marketing rules engine and promotional campaign tracker.
- **Metrics**: Active campaigns (8), Upcoming (5), Offer attach rate (24.8%), Conversion rate (6.3%), Expiring soon (3).
- **Actions**: Date range selector, `+ Create offer`.
- **Content Sections**:
  - Active campaigns vs. Upcoming campaigns side-by-side cards.
  - Brand promotions and Category promotions listings.
  - Discount rules matrix (Cart value threshold, category discount, first order benefit, bulk purchase tier).
  - Coupon codes repository (`FRESH20`, `SAVE15`, `ELECTRO30`, `WELCOME10`) with validity, usage counters, and toggle status.
  - Campaign schedule calendar & 4-week conversion performance chart.

---

## Page 10: Product Approvals Queue (`/admin/approvals`)
- **Title**: Product approvals — Review new or changed product records before they go live
- **Purpose**: Merchandising QA and regulatory compliance review gate.
- **Tabs**: `Review queue (12)`, `Approved (245)`, `Changes requested (28)`.
- **Layout**: Split-pane master-detail view:
  - **Left Table**: Products awaiting sign-off with brand, category, compliance score (`4/4`, `3/4`), price, margin %, assigned reviewer, and status.
  - **Right Review Drawer**: Selected product deep inspection (ZenSound Z5):
    - Brand guideline checklist (Name/logo approved, naming conventions, image quality, brand standards).
    - Warranty mapping (Manufacturer, 1-year duration, parts & labor coverage).
    - Required regulatory documentation (FSSAI/CE/Safety data sheet uploaded).
    - Commercial margins analysis ($79 price, $56.88 cost, 28% gross margin).
    - Review notes feedback box.
    - Sticky action buttons: `Approve` (green) / `Request changes` (white outlined).

---

## Page 11: Purchase Orders (`/admin/purchase-orders`)
- **Title**: Purchase orders — Plan, track and receive stock for a steady supply
- **Purpose**: Inbound replenishment and supplier shipment verification.
- **Top Metrics**: Inbound value (₹48,75,320 across 12 POs), Items inbound (18,420 units), Expected this month (₹32,10,700), Received this month (₹21,08,450).
- **Tabs**: `Draft (4)`, `Submitted (6)`, `Inbound (5)`, `Partially received (3)`, `Completed (18)`.
- **Table**: PO number (`PO-2024-1187`), Brand logo & name, Items count, Total value (₹), Expected arrival date, Receiving status badge (`In transit`, `At warehouse`).
- **Right Panels**:
  - Receiving timeline stepper (PO created → Confirmed with brand → In transit → At warehouse → Receiving in progress → Completed).
  - Inbound value by brand bar distribution chart (*Tide*, *Sony*, *Aashirvaad*, *Lakmé*).

---

## Page 12: Inventory Overview (`/admin/inventory`)
- **Title**: Inventory overview — Live view of stock across warehouses, domains and brands
- **Purpose**: Multi-facility inventory position and stock classification console.
- **Facility Switcher**: Facility filter dropdown (e.g. `Coimbatore DC`, `Chennai FC`).
- **KPI Metrics (5 Stock States)**:
  - `Saleable stock`: 1,24,320 units (+6%)
  - `Reserved stock`: 18,642 units (+3%)
  - `Packed stock`: 12,580 units (+12%)
  - `Damaged stock`: 1,230 units (-18%)
  - `Held stock`: 3,862 units (-5%)
- **Distribution Charts**: Stock by domain donut (Grocery 42%, FMCG 24%, Fashion 12%, Home 10%, Electronics 8%), Stock by brand bars, Inventory health gauge (Healthy 76%, Watch 16%, At risk 8%).
- **Stock Details Table**: Granular breakdown of SKU, Product name, Brand, Domain, Warehouse, Saleable, Reserved, Packed, Damaged, Held, and Total.

---

## Page 13: Stock Ledger & Adjustments (`/admin/inventory/ledger`, `/admin/inventory/adjustments`)
- **Title**: Stock ledger — Track all stock movements, adjustments and balances across warehouses
- **Purpose**: Full audit trail of stock adjustments with mandatory adjustment reason capture.
- **Table Columns**: Date & time, SKU, Product name, Brand, Batch number, Opening qty, Received (+), Reserved (-), Adjusted (+/-), Closing qty, Reason code, Staff member name.
- **Right Adjustment Drawer**:
  - SKU search and selection.
  - Warehouse & Batch picker.
  - Adjustment type toggle: `Increase` vs `Decrease`.
  - Quantity input.
  - Reason code selector (`Damaged stock`, `Expired stock`, `Stock take variance`, `Customer return`, `Supplier return`, `Misplaced stock`, `Other`).
  - Mandatory audit note textarea.
  - Action buttons: `Cancel` and `Save adjustment`.

---

## Page 14: Inventory Alerts (`/admin/inventory/alerts`)
- **Title**: Inventory alerts — Stay ahead of stockouts and expiry risks
- **Purpose**: Automated exception alerting for inventory replenishment and markdown liquidation.
- **Tabs**: `Low stock (7)`, `Near expiry (5)`.
- **Top Summary Cards**: 7 Low stock items, 5 Near expiry items, 312 Items healthy.
- **Priority Alerts Cards**:
  - High priority card: *Tide Laundry Detergent 1kg* (8 units left, reorder level 50, demand trend: +28% increasing, Main WH).
  - Medium priority card: *Aashirvaad Atta 5kg* (12 units, reorder level 40).
  - Medium priority card: *Sony WF-C500 Earbuds* (15 units).
  - Low priority card: *Lakmé 9to5 Serum* (28 units, 16 days to expiry).
- **Direct Card Actions**: `Create PO`, `Move to offer`, `Hold batch`, `Mark reviewed`.

---

## Page 15: Warehouse Readiness — Live Control Room (`/admin/warehouse-readiness`)
- **Title**: Warehouse readiness — From pick to dispatch, on time. Every day
- **Purpose**: Live facility execution console tailored for distribution center supervisors.
- **Visual Styling**: High-contrast dark operational dashboard theme (`#03170D` / `#093520`) with green/lime telemetry monitors.
- **Facility Telemetry Cards**:
  - **Coimbatore DC (Primary DC - Dry / FMCG / General)**: Packing waves (12/14, 86%), Orders ready (8,460 / 9,800), Missed handoffs (12), Scanner status (Online 46/48), Cut-off countdown (`2h 36m`), Dock capacity (18/24, 75%).
  - **Chennai FC (Regional FC - Fresh / Chilled / Ambient)**: Packing waves (8/10, 80%), Orders ready (4,320 / 5,000), Missed handoffs (28), Scanner status (Online 38/40), Cut-off countdown (`1h 12m`), Dock capacity (12/16, 75%).
- **Route & Outbound Readiness**: Route readiness gauge (92% ready, 46/50 routes), Outbound cut-off progress bar (78% on time, 17% at risk, 5% likely miss).
- **Live Fulfilment Board**: Wave ID (`W-7241` to `W-7245`), Facility, Order count, Picking/Packing progress bars, ETA to dispatch, Exception status.

---

## Page 16: Orders Management (`/admin/orders`)
- **Title**: Orders — Track and manage customer orders from checkout to delivery
- **Purpose**: Order stream operations, bulk export, and status tracking.
- **Top Metrics**: Orders today (1,248), Packing queue (320), Out for delivery (892), Exceptions (24).
- **Filters**: Date picker, Payment method dropdown, Stage filter, Delivery slot dropdown, Warehouse selector.
- **Orders Table**:
  - Order ID (`HM1003287`)
  - Customer name
  - Order value (₹)
  - Payment method tag (`UPI`, `Card`, `COD`, `NetBanking`)
  - Fulfillment stage (`Packed`, `Picking`, `Out for delivery`, `Exception`)
  - Delivery slot (`Today, 10am - 12pm`, `Today, 2pm - 4pm`)
  - Order health indicator dot (`On track` green, `Review` amber, `Exception` red)
  - Action button: `View order`

---

## Page 17: Order Detail View (`/admin/orders/[id]`)
- **Title**: Order HM-88219 — Out for delivery
- **Purpose**: Single order 360-degree inspection and intervention screen.
- **Header Actions**: Breadcrumb back link, Status pill `Out for delivery`, `Contact customer`, `Hold order`, `Start refund`.
- **Top Metadata Grid (6 Cards)**:
  - Customer: Meera K. (`meera.k@gmail.com`, `+91 98765 43210`)
  - Items count: 8 items
  - Final price: `₹1,246.00` (*Locked — price cannot be changed*)
  - Delivery address: B-302, Lake View Apartments, HSR Layout, Bengaluru 560102
  - Delivery slot: 12 Apr 2025, 4:00 PM – 6:00 PM
  - Payment method: UPI (`meera.k@okaxis`)
- **Core Panels**:
  - **Order Timeline Stepper**: Visual breadcrumb: Paid (12 Apr, 10:24 AM) → Picking (11:05 AM) → Packed (12:10 PM) → Out for delivery (2:35 PM).
  - **Items in Order Table**: Line items with product photo thumbnail, Brand, Qty, Line price (*Tomato, Banana, Amul Milk, Atta, Sunflower Oil*).
  - **Internal Notes Feed**: Chronological agent note stream with timestamp and author (`+ Add note` modal).
  - **Refund / Return History**: Linked returns and payment adjustments widget.

---

## Page 18: Fulfilment Control Tower (`/admin/fulfilment`)
- **Title**: Fulfilment control tower — From orders to customers, in full and on time
- **Purpose**: Regional supply chain logistics and carrier performance monitor.
- **Top Pipeline Tracker**: Orders received (12,480) → Picked & packed (11,230) → Route assigned (10,540) → Delivered (9,920); SLA: 92% on time.
- **Hub Capacity Monitor**: Coimbatore DC vs Chennai FC dock & labor utilization gauges.
- **Delivery Slot Capacity**: Hourly fulfillment slot utilization bars (08:00–12:00, 12:00–16:00, 16:00–20:00, 20:00–24:00).
- **Route Readiness & Missed Handoffs**: Critical alert list for vehicle delays and missed scans with route reassignment triggers.
- **Recent Fulfilment Events Stream**: Real-time event log with timestamps and van IDs.

---

## Page 19: Returns & Exceptions (`/admin/returns`)
- **Title**: Returns & exceptions — Manage failed deliveries, returns and post-delivery issues in one place
- **Purpose**: Reverse logistics processing and return case resolution.
- **Category Filter Tabs**: `Failed delivery (12)`, `Wrong item (8)`, `Damaged item (14)`, `Return pickup (9)`, `COD issue (6)`, `Cold-chain/heavy item (5)`.
- **Returns Table**: Order #, Customer, Reason, Evidence photos thumbnail, Next action, Owner, SLA timer, Status (`Open`, `Action needed`, `Escalated`).
- **Right Case Inspection Drawer**:
  - Case #HM784321 details (Customer Priya Sharma, Bengaluru).
  - Product: Fresh Essentials Box (6 items, ₹1,240).
  - Failure reason: Customer not available at address.
  - Doorstep photo evidence inspection.
  - Action Buttons: `Replace item`, `Reschedule delivery`, `Refund`, `Contact customer`.

---

## Page 20: Customer Care Live Desk (`/admin/customer-care`)
- **Title**: Customer care — Resolve faster. Make every customer feel at home
- **Purpose**: High-velocity agent customer support and ticket resolution console.
- **Layout**: 3-column synchronized workspace:
  - **Left Ticket Queue**: Filter tabs (`Open 24`, `Pending 6`, `Resolved`), ticket search, customer cards with urgency badges (`High`, `Medium`, `Low`) and SLA countdown timers.
  - **Center Omnichannel Chat**: Active conversation thread with Priya Singh regarding Order `#HM12457890`. Full chat bubble stream, response editor, canned macros dropdown, internal notes toggle, and `Send & close` button.
  - **Right Customer & Order Context**: Order details, live delivery tracker, refund eligibility assessment, and customer historical summary (12 orders, 4.8 avg rating, Loyal customer status).

---

## Page 21: Customer 360 Profile (`/admin/customers/[id]`)
- **Title**: Customer profile — Priya Sharma (`CUS-104832`)
- **Purpose**: Unified customer intelligence and lifetime relationship record.
- **Header Summary**: Name, Member since date, Customer tags (`Regular shopper`, `Prefers home delivery`, `Responsive`), Risk level (`Low`).
- **Core Statistics**: Total orders (24), Total spent (₹18,760), Avg order value (₹782).
- **Profile Tabs**: `Overview`, `Orders`, `Addresses`, `Refunds`, `Complaints`, `Wishlist & Buy again`, `Support notes`, `Risk & activity`.
- **Content Panes**:
  - Saved addresses directory (Home default, Office).
  - Full order history table with status tags and 1-click re-order.
  - Refund logs and formal complaint tickets with resolution outcomes.
  - Chronological customer activity audit timeline.

---

## Page 22: Refund Approvals with Policy Context (`/admin/refunds`)
- **Title**: Resolve and refund with context — Review customer requests, check policy eligibility and take action
- **Purpose**: Tiered policy governance for customer refund claims.
- **Top Policy Authorization Banners**:
  1. `Under ₹500`: **Support can approve** (Instant resolution by frontline agents).
  2. `₹500 – ₹2,000`: **Admin review required** (Requires operations admin sign-off).
  3. `Over ₹2,000`: **Super admin approval** (High-value claims requiring executive sign-off).
- **Approval Queue Table**: Order #, Customer, Reason, Claim amount (₹), Linked complaint, Photo evidence thumbnails, Policy eligibility badge (`Eligible`, `Needs review`, `Not eligible`), Approval tier required, Status (`Pending`), Action buttons (`Review`, `Approve`, `Decline`).

---

## Page 23: Payments & Reconciliation (`/admin/payments`)
- **Title**: Payments & reconciliation — Track payments, settlements, refunds and reconciliation status
- **Purpose**: Daily financial reconciliation between payment gateways, COD cash collections, and orders.
- **Top Financial KPIs**:
  - `UPI settlements`: ₹24,78,320 (1,842 txns)
  - `COD collections`: ₹8,41,650 (1,120 orders)
  - `Failed payment matches`: 247 (*Needs attention*)
  - `Refund payouts`: ₹3,12,480 (186 refunds)
  - `Reconciliation exceptions`: 56
  - `Daily finance summary`: ₹33,19,970 net inflow
- **Trend Visualizations**: Daily collection trend bar chart (UPI vs COD), and finance summary ledger.
- **Payment Records Table**: Date & time, Order ID, Payment ID / UTR, Method (`UPI`, `COD`, `Card`, `Refund`), Amount, Gateway status, Reconciliation match status (`Matched`, `Not matched`, `Exception`), Audit remarks.

---

## Page 24: Reports & Analytics (`/admin/reports`)
- **Title**: See the system, not just the numbers — Real insights across every part of HyperMart
- **Purpose**: Executive BI analytics and macro trend evaluation.
- **Top KPIs**: Total Sales (₹12,48,930), Total Orders (8,492), Gross Margin (28.4%), Active Products (3,782).
- **Analytical Visualizations**:
  - Sales by domain donut chart (Grocery 38%, Fashion 22%, Electronics 15%, Home & Living 13%, Beauty 8%, Sports 4%).
  - Sales by brand horizontal bar chart (*Tata*, *Nestlé*, *Himalaya*, *Samsung*, *boAt*, *Puma*).
  - Product performance revenue rankings (*Aashirvaad Atta*, *Samsung Charger*, *Dove Body Wash*, *boAt Airdopes*, *Milton Water Bottle*).
  - Offer attach rate and inventory turnover velocity (5.6x).
  - Fulfilment SLA donut (93% on time, 6% late, 1% yet to deliver).
  - 4-month trend lines for refund rates (2.8%) and customer complaints (1.1%).

---

## Page 25: Access, Accountability & Governance (`/admin/users`, `/admin/settings`)
- **Title**: Access, accountability and control — Manage who can do what, keep operations secure and see a complete audit trail
- **Purpose**: Enterprise security, RBAC permissions, audit logging, and operational rule configuration.
- **Navigation Tabs**: `Users`, `Roles`, `Permissions`, `Audit log`, `Settings`.
- **Users Directory**: User name & email, Assigned role (`Super admin`, `Catalogue editor`, `Warehouse manager`, `Support agent`), Account status, Last login time, 2FA status badge (`On` / `Off`).
- **Permission Matrix**: Granular module rights mapped against roles:
  - *View orders*, *Manage catalogue*, *Manage inventory*, *Manage orders*, *Customer support*, *View reports*, *Manage users*, *Access settings*.
- **Recent Audit Events**: Immutable operational event stream (Actor, Event, Timestamp, Specific change payload).
- **Global Operational Settings**:
  - Free delivery threshold (`₹499` standard).
  - Auto-refund window (`5 days`), Return window (`7 days`).
  - Auto-approve refunds for delivered orders toggle.
  - Require approval for high-value refunds (`≥ ₹5,000`).
