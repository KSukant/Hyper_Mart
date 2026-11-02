# LuLu / HyperMart Warehouse Management Platform — 60-Screen Master Reference Analysis

**Document Version:** 1.0.0  
**Source Visual Reference:** `LuLu_Warehouse_Portal_60_Exact_Order.pdf`  
**Image Assets Verified:** `d:/hypermart-web/reference_pages_60/page_01.png` through `page_60.png` (All 60 extracted, verified 100% present)  
**Execution Phase:** Phase 1 — Analysis & Architectural Blueprint (Zero code written prior to verification)

---

## Executive Summary & Visual Architecture

The LuLu / HyperMart Warehouse Management Platform is composed of **two primary interface paradigms**:
1. **Manager Operations Workspace (Pages 01–36)**:
   - Deep forest/pine green left navigation sidebar (`#033129` / `#07563F`), width: 260px (collapsible to 76px).
   - Light cool gray content background (`#F5F7F6` / `#F9F9FB`), crisp white card surfaces (`#FFFFFF`) with subtle border `#E1E8E3`.
   - Global header (height: 64px) featuring global search, warehouse facility selector (e.g. *Kochi Central DC*, *Bengaluru East FC*), date/time picker, unread notifications badge, and authenticated manager profile.
   - Dense multi-column operational tables with sorting, pagination, status pills, and contextual drawer triggers.
   - KPI metrics grids (4–6 cards per dashboard) with trend arrows and percentage deltas.
   - Interactive charts (utilization donuts, throughput area charts, SLA bar funnels).

2. **Worker Handheld / Tablet Workspaces (Pages 37–60)**:
   - Simplified deep green sidebar (`#06431B`), touch-optimized navigation targets (min 48px tap height).
   - Dedicated role workspaces for **Picker (37–42)**, **Packer (43–48)**, **Quality Checker (49–54)**, and **Inventory Officer (55–60)**.
   - Prominent barcode/RFID scanning inputs, item photograph previews (>= 800px high-fidelity), step-by-step progress steppers (`Scan Bin` → `Verify SKU` → `Confirm Qty` → `Handoff Tote`).
   - Sticky touch action bars, high-contrast pass/fail banners, and dedicated exception reporting modals.

---

## Complete 60-Screen Inventory & Specification

---

### PAGE 01 — LOGIN PORTAL
- **Filename**: `reference_pages_60/page_01.png`
- **Screen Number**: 01
- **Screen Title**: Sign In to LuLu Warehouse Management
- **User Role**: Public / Unauthenticated Staff (All Personas)
- **Main Purpose**: Authenticate employee credentials or partner badges and route to their role-specific workspace.
- **Visual Composition**:
  - Left Hero Panel: Dark branded green with LuLu Warehouse branding, high-bay automated warehouse imagery, platform mission statement.
  - Right Form Panel: Tabbed authentication card (`Employee ID` vs. `Partner Login`).
- **UI Components & Controls**:
  - Employee ID / Email input (`EMP-XXXX` or `@hypermart.com`).
  - Password input with toggleable visibility icon.
  - Quick badge barcode scanner simulator input (*"Scan physical employee ID card"*).
  - Checkbox: `Remember my station`.
  - Links: `Forgot password?`, `Contact IT helpdesk`.
  - Primary button: `Sign In to Station →` (`#087A4A`).
  - Facility selector dropdown: *Indiranagar Hub 01*, *Whitefield DC*, *Kochi Central*.
- **Data Required**: `EMPLOYEE_CREDENTIALS`, `WAREHOUSE_LOCATIONS`, `AUTH_SESSION`.
- **Navigation Destination**: Redirects based on role:
  - Manager / Supervisor -> Page 02 (`/warehouse/dashboard`)
  - Picker -> Page 37 (`/warehouse/worker/picker`)
  - Packer -> Page 43 (`/warehouse/worker/packer`)
  - Quality Checker -> Page 49 (`/warehouse/worker/quality-checker`)
  - Inventory Officer -> Page 55 (`/warehouse/worker/inventory-officer`)
- **Workflow Dependencies**: Entry gate for all subsequent operational workflows.

---

### PAGE 02 — WAREHOUSE DASHBOARD
- **Filename**: `reference_pages_60/page_02.png`
- **Screen Number**: 02
- **Screen Title**: Warehouse Command Dashboard
- **User Role**: Warehouse Manager, Operations Director, Shift Supervisor
- **Main Purpose**: At-a-glance real-time health of entire warehouse floor throughput and bottlenecks.
- **Sidebar Menu**: `Dashboard` (Active)
- **Top Bar**: Search bar, Facility Selector (`Kochi Central DC`), Date picker (`Today, Live`), Notifications (3 unread), Profile (`Arjun M. - Warehouse Manager`).
- **KPI Metrics (5 Cards)**:
  1. `Total Orders Today`: 1,482 (+14% vs avg)
  2. `Picking in Progress`: 128 orders (Zone A: 54, Zone B: 42, Cold: 32)
  3. `Packing in Progress`: 86 orders (Station utilization: 92%)
  4. `Quality Inspection Queue`: 34 packages (Avg cycle time: 2.4 min)
  5. `Ready for Courier Handover`: 215 parcels (SLA on-track: 99.1%)
- **Central Panels & Visualizations**:
  - Order Status Distribution Donut Chart (*Received, Picking, Packing, QC, Ready, Dispatched*).
  - Active Picking Waves Progress Table (Wave ID, Zone, Total Lines, Picked %, Assigned Lead, Due Time).
  - Urgent Attention Alerts (Stockout risk in Zone C aisle 4; Temperature excursion Cold Room 2; Courier BlueDart arriving in 20 min).
  - Real-time Team Activity Stream.
- **Buttons & Controls**: `+ Create Picking Wave`, `Export Floor Report`, `View Exceptions (5)`.
- **Workflow Dependencies**: Links directly to Order Details (Page 03), Picking Monitor (Page 06), Capacity (Page 10).

---

### PAGE 03 — ORDER DETAILS
- **Filename**: `reference_pages_60/page_03.png`
- **Screen Number**: 03
- **Screen Title**: Order Fulfillment Inspector — Order #ORD-2026-9941
- **User Role**: Warehouse Manager, Shift Supervisor, Customer Care Lead
- **Main Purpose**: 360-degree traceability of a single customer order through pick, pack, QC, and dispatch.
- **Sidebar Menu**: `Orders`
- **Layout Structure**: 2-column layout (Left: Order header, items table, packaging specs; Right: Real-time progress timeline & audit events).
- **UI Components & Controls**:
  - Status Banner: `PACKED - AWAITING QC` (Amber pill).
  - Horizontal Step Progress Tracker: `Created` -> `Wave Assigned` -> `Picked (Tote T-84)` -> `Packed (Box M)` -> `QC Approved` -> `Handed to Courier`.
  - Customer & Delivery Card: Recipient, address, delivery window (15-min Express vs Standard), special temperature requirements.
  - Itemized SKU Table: SKU code, thumbnail, Product Name, Required Qty, Picked Qty, Packed Qty, Bin Location, Status.
  - Action Controls: `Print Shipping Label`, `Reprint Packing Slip`, `Reassign Wave`, `Flag Exception`.
- **Workflow Dependencies**: Created on order ingestion; locked after courier dispatch (Page 27).

---

### PAGE 04 — INVENTORY DASHBOARD
- **Filename**: `reference_pages_60/page_04.png`
- **Screen Number**: 04
- **Screen Title**: Inventory Health & Stock Balances
- **User Role**: Inventory Lead, Warehouse Manager
- **Main Purpose**: Monitor multi-facility stock pools, availability ratios, and low-stock warnings.
- **Sidebar Menu**: `Inventory > Overview` (Active)
- **KPI Metrics (5 Cards)**:
  1. `Total Physical Stock`: 148,290 units
  2. `Saleable Available`: 134,810 units (90.9%)
  3. `Reserved in Active Carts`: 8,920 units
  4. `In-Picking / Transit`: 3,140 units
  5. `Damaged / Quarantined`: 1,420 units
- **Charts & Tables**:
  - Category Stock Distribution (Grocery 42%, Fresh 18%, Electronics 15%, Fashion 14%, Beauty 11%).
  - Zone Utilization Heatmap (Zone A: 88%, Zone B: 74%, Cold Room: 94%, High-Rack: 62%).
  - Top Moving SKUs vs. Stagnant SKUs.
- **Actions**: `+ New Stock Transfer`, `Initiate Cycle Count`, `Export Inventory Ledger`.
- **Workflow Dependencies**: Informs picker routing (Page 05, 14) and stock adjustments (Page 12).

---

### PAGE 05 — STOCK MOVEMENTS AND BIN LOCATIONS
- **Filename**: `reference_pages_60/page_05.png`
- **Screen Number**: 05
- **Screen Title**: Bin Locations & Stock Movements
- **User Role**: Inventory Supervisor, Forklift / Stock Movement Operator
- **Main Purpose**: Manage internal bin-to-bin replenishments, zone rebalancing, and track putaway history.
- **Sidebar Menu**: `Inventory > Stock Movements`
- **UI Components & Controls**:
  - Interactive Warehouse Bin Grid: Aisle A1-A12, Rack Levels 1-5, Bin Slots 01-20.
  - Bin Utilization Indicator (Empty, Partial, Full, Quarantined).
  - Stock Movement Modal / Drawer: Select SKU, Source Bin (`A-04-2B`), Destination Bin (`B-02-1A`), Quantity, Movement Reason (`Replenishment`, `Damaged Isolation`, `Zone Optimization`).
  - Recent Movement Logs Table: Transfer ID, Timestamp, Operator, Source -> Dest, SKU, Quantity, Status (`Completed`, `In-Transit`).
- **Workflow Dependencies**: Pre-requisite for picking tasks; ensures pick bins remain stocked from reserve high-racks.

---

### PAGE 06 — PICKING AND PACKING MONITOR
- **Filename**: `reference_pages_60/page_06.png`
- **Screen Number**: 06
- **Screen Title**: Live Picking & Packing Operations Monitor
- **User Role**: Shift Supervisor, Fulfillment Lead
- **Main Purpose**: Real-time operational balance between pick wave throughput and packing table queues.
- **Sidebar Menu**: `Picking & Packing` (Active)
- **KPI Metrics (4 Cards)**:
  1. `Active Waves Picking`: 6 Waves (14 Pickers on floor)
  2. `Totes in Transit to Packing`: 42 Totes
  3. `Packing Tables Active`: 8/10 Stations
  4. `Hourly Unit Velocity`: 1,240 units/hr (+8% vs target)
- **Visualizations**:
  - Dual Funnel Throughput Chart (Picking Rate vs Packing Rate).
  - Station Workload Matrix (Stations P1 through P10 showing orders queued, current packer name, avg pack time).
- **Controls**: `Filter by Zone`, `Rebalance Workforce`, `Emergency Wave Pause`.

---

### PAGE 07 — QUALITY OVERVIEW
- **Filename**: `reference_pages_60/page_07.png`
- **Screen Number**: 07
- **Screen Title**: Quality Assurance & Inspection Overview
- **User Role**: Quality Lead, QA Inspector
- **Main Purpose**: Track inspection pass rates, defect reasons, and packaging integrity.
- **Sidebar Menu**: `Quality Control` (Active)
- **KPI Metrics (4 Cards)**:
  1. `Pass Rate Today`: 98.4% (Target: >= 98.0%)
  2. `Inspections Completed`: 412 parcels
  3. `Failed / Rejected Today`: 7 parcels
  4. `Avg Inspection Duration`: 1.8 min
- **Charts & Panels**:
  - Defect Reason Breakdown: Seal broken (42%), Barcode unreadable (28%), Crushed box (18%), Wrong item (12%).
  - Station Pass Rate Leaderboard.
  - High Defect SKU Watchlist.
- **Workflow Dependencies**: Feeds Rejected Items (Page 19) and QC Reports (Page 20).

---

### PAGE 08 — EXCEPTION MANAGEMENT
- **Filename**: `reference_pages_60/page_08.png`
- **Screen Number**: 08
- **Screen Title**: Operational Exceptions & Floor Blockers
- **User Role**: Exception Officer, Operations Manager
- **Main Purpose**: Incident command workbench for unblocking stalled orders, damaged stock, and address anomalies.
- **Sidebar Menu**: `Exceptions` (Active)
- **KPI Metrics**: Open (14), Critical Escalations (3), Breaching in <30m (2), Resolved Today (45).
- **Exception List Table**: Exception ID (`EXC-4819`), Category (`Short Pick`, `Damaged Box`, `Cold Chain Excursion`), Severity (`Critical`, `High`, `Medium`), Affected Order/SKU, Raised By, Assigned Owner, SLA Timer, Action Button (`Resolve / Triage`).
- **Workflow Dependencies**: Connects to Open Exceptions (Page 24) and Exception Reports (Page 25).

---

### PAGE 09 — COURIER HANDOVER
- **Filename**: `reference_pages_60/page_09.png`
- **Screen Number**: 09
- **Screen Title**: Outbound Courier Handover Hub
- **User Role**: Logistics Manager, Courier Dispatch Operator
- **Main Purpose**: Manage ready parcels staged in dispatch dock awaiting courier partner vehicle arrivals.
- **Sidebar Menu**: `Courier Handover` (Active)
- **KPI Metrics**: Ready for Pickup (284), Handover Batches Formed (12), Delayed Pickups (2), Completed Today (840).
- **Courier Partner Staging Rows**:
  - BlueDart Express (84 parcels, Vehicle arrived, Dock 2)
  - Delhivery Surface (120 parcels, Scheduled 16:30, Dock 4)
  - HyperMart HyperLocal Fleet (80 parcels, In-progress loading, Dock 1)
- **Actions**: `Create Handover Batch`, `Scan Courier Manifest`, `Confirm Vehicle Dispatch`.

---

### PAGE 10 — CAPACITY AND DEADLINES
- **Filename**: `reference_pages_60/page_10.png`
- **Screen Number**: 10
- **Screen Title**: Facility Capacity & Deadline Risk
- **User Role**: Operations Director, Shift Supervisor
- **Main Purpose**: Balance labor capacity against upcoming order wave commitments to prevent SLA breaches.
- **Sidebar Menu**: `Capacity & Deadlines` (Active)
- **Visuals & Charts**:
  - Labor Utilization by Department (Pickers: 94%, Packers: 88%, QC: 72%, Dispatch: 82%).
  - Deadline Risk Countdown: 28 orders due within 45 min; 64 orders due within 90 min.
  - Hourly Order Intake vs Processing Capacity Forecast Graph.
- **Workflow Dependencies**: Direct links to Resource Planning (Page 31) and Deadline Alerts (Page 32).

---

### PAGE 11 — REPORTS AND AUDIT OVERVIEW
- **Filename**: `reference_pages_60/page_11.png`
- **Screen Number**: 11
- **Screen Title**: Warehouse Analytics & System Audit Hub
- **User Role**: Warehouse General Manager, Compliance Auditor
- **Main Purpose**: Centralized launchpad for operational business intelligence, compliance reporting, and audit logs.
- **Sidebar Menu**: `Reports & Audit` (Active)
- **Report Modules**:
  1. Operational Throughput Reports (Page 34)
  2. Performance & SLA Compliance (Page 35)
  3. System Audit Log (Page 36)
  4. Scheduled Automated Exports (Daily CSV / PDF).
- **Controls**: Date Range Selector, Warehouse Selector, `Generate Custom Report`, `Download Audit Bundle`.

---

### PAGE 12 — INVENTORY ADJUSTMENTS
- **Filename**: `reference_pages_60/page_12.png`
- **Screen Number**: 12
- **Screen Title**: Stock Adjustments & Discrepancy Reconciliation
- **User Role**: Inventory Auditor, Inventory Officer
- **Main Purpose**: Authorized manual stock level corrections with mandatory reason codes and supervisory sign-offs.
- **Sidebar Menu**: `Inventory > Adjustments`
- **Table & Controls**:
  - Adjustment Records: Date, SKU, Product Name, Bin, System Qty, Physical Count, Delta (+/-), Reason Code (`Cycle Count Variance`, `Damage in Transit`, `Expired Perishable`, `Theft / Loss`), Adjusted By, Approved By.
  - Modal: `+ Create Stock Adjustment` (Requires evidence photo upload & dual-approval for variances > ₹5,000).

---

### PAGE 13 — STOCK TAKE
- **Filename**: `reference_pages_60/page_13.png`
- **Screen Number**: 13
- **Screen Title**: Cycle Counts & Physical Stock Take
- **User Role**: Inventory Officer, Audit Supervisor
- **Main Purpose**: Schedule and record blind physical inventory counts without halting live dispatch.
- **Sidebar Menu**: `Inventory > Stock Take`
- **Features**: Count Session Selector, Assigned Aisles, Expected vs Scanned Counter, Variance Calculation, `Submit Reconciliation`.

---

### PAGE 14 — PICKING QUEUE
- **Filename**: `reference_pages_60/page_14.png`
- **Screen Number**: 14
- **Screen Title**: Master Picking Queue
- **User Role**: Shift Supervisor, Pick Lead
- **Main Purpose**: Prioritize and assign wave picking batches to floor pickers.
- **Sidebar Menu**: `Picking > Queue`
- **Table Columns**: Task ID, Order ID, Zone, Line Items Count, Units, Priority (`Express`, `High`, `Standard`), Assigned Picker, Due SLA, Status (`Unassigned`, `In-Progress`, `Completed`).
- **Actions**: `Auto-Assign Best Route`, `Batch Selected Tasks`, `Reassign Picker`.

---

### PAGE 15 — PACKING QUEUE
- **Filename**: `reference_pages_60/page_15.png`
- **Screen Number**: 15
- **Screen Title**: Master Packing Station Queue
- **User Role**: Shift Supervisor, Pack Lead
- **Main Purpose**: Route picked totes to available packing tables based on station capacity and packaging dimensions.
- **Sidebar Menu**: `Packing > Queue`
- **Features**: Station Allocation Matrix, Tote Arrival Timestamps, Box Size Recommendation, Station Rebalancing.

---

### PAGE 16 — PICK LIST
- **Filename**: `reference_pages_60/page_16.png`
- **Screen Number**: 16
- **Screen Title**: Detailed Pick List Management
- **User Role**: Picker, Pick Supervisor
- **Main Purpose**: View itemized pick lines ordered by shortest physical walking distance (S-curve pathing).
- **Sidebar Menu**: `Picking > Pick Lists`
- **Display**: Pick List ID, Bin sequence (`A-01-01` -> `A-01-04` -> `A-02-02`), SKU, Image thumbnail, Description, Quantity to Pick, Barcode to scan.

---

### PAGE 17 — PACKING LIST
- **Filename**: `reference_pages_60/page_17.png`
- **Screen Number**: 17
- **Screen Title**: Outbound Packing Manifest
- **User Role**: Packer, Packing Lead
- **Main Purpose**: Verify carton item contents against order manifest before sealing and labeling.
- **Sidebar Menu**: `Packing > Packing Lists`
- **Display**: Order ID, Target Box Size (S/M/L/Insulated Cold Bag), Items verified count, Void fill materials used, Print Label action.

---

### PAGE 18 — PICKING AND PACKING MONITOR DETAIL
- **Filename**: `reference_pages_60/page_18.png`
- **Screen Number**: 18
- **Screen Title**: Detailed Flow Telemetry — Picking & Packing
- **User Role**: Operations Manager, Engineering / Flow Lead
- **Main Purpose**: In-depth cycle time analytics per aisle and packing station to isolate mechanical and human friction points.
- **Sidebar Menu**: `Picking & Packing > Analytics`
- **Visualizations**: Heatmap of aisle traversal times, average pack seconds per box type, worker speed variance distribution.

---

### PAGE 19 — REJECTED ITEMS
- **Filename**: `reference_pages_60/page_19.png`
- **Screen Number**: 19
- **Screen Title**: Quality Rejection & Disposition Workbench
- **User Role**: Quality Lead, Returns Officer
- **Main Purpose**: Decide fate of failed inspection packages: Return to Vendor (RTV), Repackage, Rework, or Scrapped.
- **Sidebar Menu**: `Quality > Rejected Items`
- **Features**: Rejection Reason Tags, Evidence Photos, Disposition Selector, Vendor Chargeback Flag, `Authorize Scrapping`.

---

### PAGE 20 — QUALITY REPORTS
- **Filename**: `reference_pages_60/page_20.png`
- **Screen Number**: 20
- **Screen Title**: Quality Assurance Metrics & Vendor Compliance
- **User Role**: Quality Director, Procurement QA
- **Main Purpose**: Long-term trends in packaging failures, vendor inbound defect rates, and packer error frequency.
- **Sidebar Menu**: `Quality > Reports`
- **Charts**: Defect Rate Over Time, Vendor Inbound Quality Scorecards, Packer Verification Accuracy.

---

### PAGE 21 — INSPECT AND APPROVE (RETURNS)
- **Filename**: `reference_pages_60/page_21.png`
- **Screen Number**: 21
- **Screen Title**: Return Inbound Inspection & Disposition
- **User Role**: Returns Officer, Quality Inspector
- **Main Purpose**: Physically inspect customer returns at inbound dock and approve refund or replacement eligibility.
- **Sidebar Menu**: `Returns > Inspect & Approve`
- **Controls**: Barcode Scanner, Return ID Lookup, Condition Grading (`Factory Sealed`, `Open Box Like New`, `Customer Damaged`, `Fraud/Empty Box`), Photo Capture, Disposition Button (`Approve Restock`, `Reject Return`).

---

### PAGE 22 — REFUND AND REPLACEMENT
- **Filename**: `reference_pages_60/page_22.png`
- **Screen Number**: 22
- **Screen Title**: Warehouse Return Disposition Outcomes
- **User Role**: Returns Officer, Operations-Finance Liaison
- **Main Purpose**: Track approved warehouse return handoffs to Finance for refund triggering or replacement order generation.
- **Sidebar Menu**: `Returns > Refund & Replacement`
- **Note**: Maintains strict portal boundary—warehouse records physical return receipt; sends API signal to Finance Portal for monetary disbursement.

---

### PAGE 23 — RETURN REPORTS
- **Filename**: `reference_pages_60/page_23.png`
- **Screen Number**: 23
- **Screen Title**: Reverse Logistics Analytics
- **User Role**: Operations Director, Merchandising Lead
- **Main Purpose**: Root-cause analysis of return rates by product category, courier damage, and customer claims.
- **Sidebar Menu**: `Returns > Reports`

---

### PAGE 24 — OPEN EXCEPTIONS
- **Filename**: `reference_pages_60/page_24.png`
- **Screen Number**: 24
- **Screen Title**: Active Exception Triage Board
- **User Role**: Exception Officer, Triage Supervisor
- **Main Purpose**: Kanban-style active exception management sorted by SLA urgency.
- **Sidebar Menu**: `Exceptions > Open Cases`

---

### PAGE 25 — EXCEPTION REPORTS
- **Filename**: `reference_pages_60/page_25.png`
- **Screen Number**: 25
- **Screen Title**: Operational Bottleneck & Incident Analytics
- **User Role**: Operations Director, Continuous Improvement Lead
- **Main Purpose**: Historical analysis of recurring operational exceptions to improve bin layout and training.
- **Sidebar Menu**: `Exceptions > Reports`

---

### PAGE 26 — HANDOVER QUEUE
- **Filename**: `reference_pages_60/page_26.png`
- **Screen Number**: 26
- **Screen Title**: Courier Handover Staging Batches
- **User Role**: Courier Dispatch Lead, Handover Operator
- **Main Purpose**: Assemble individual packed cartons into roll-cages and courier pallet batches.
- **Sidebar Menu**: `Courier > Handover Queue`

---

### PAGE 27 — DISPATCHED ORDERS
- **Filename**: `reference_pages_60/page_27.png`
- **Screen Number**: 27
- **Screen Title**: Dispatched Shipments & Transit Tracking
- **User Role**: Logistics Lead, Customer Service Liaison
- **Main Purpose**: Track outbound consignments handed to third-party couriers with live AWB tracking links.
- **Sidebar Menu**: `Courier > Dispatched Orders`

---

### PAGE 28 — COURIER PARTNERS
- **Filename**: `reference_pages_60/page_28.png`
- **Screen Number**: 28
- **Screen Title**: Logistics Partners & SLA Configuration
- **User Role**: Logistics Manager, Operations Director
- **Main Purpose**: Manage partner integrations (BlueDart, Delhivery, Shadowfax, Dunzo, HyperMart Fleet), cutoff times, and fleet capacities.
- **Sidebar Menu**: `Courier > Partners`

---

### PAGE 29 — COURIER PERFORMANCE
- **Filename**: `reference_pages_60/page_29.png`
- **Screen Number**: 29
- **Screen Title**: Carrier SLA Scorecards & On-Time Delivery
- **User Role**: Logistics Director, Supply Chain VP
- **Main Purpose**: Compare carrier on-time delivery rates, transit damage frequency, and first-attempt delivery success.
- **Sidebar Menu**: `Courier > Performance`

---

### PAGE 30 — HANDOVER REPORTS
- **Filename**: `reference_pages_60/page_30.png`
- **Screen Number**: 30
- **Screen Title**: Outbound Dock Handover Audit Reports
- **User Role**: Logistics Auditor, Dispatch Manager
- **Main Purpose**: Verification of manifest counts, signed driver receipts, and transit SLA compliance.
- **Sidebar Menu**: `Courier > Reports`

---

### PAGE 31 — RESOURCE PLANNING
- **Filename**: `reference_pages_60/page_31.png`
- **Screen Number**: 31
- **Screen Title**: Floor Labor & Station Resource Planning
- **User Role**: Shift Supervisor, Workforce Planner
- **Main Purpose**: Assign shift headcount across picking aisles, packing tables, QC lanes, and loading docks.
- **Sidebar Menu**: `Capacity > Resource Planning`

---

### PAGE 32 — DEADLINE ALERTS
- **Filename**: `reference_pages_60/page_32.png`
- **Screen Number**: 32
- **Screen Title**: Order Cutoff & SLA Breach Alarms
- **User Role**: Shift Supervisor, Expeditor
- **Main Purpose**: Real-time alarm board highlighting orders within 15, 30, and 60 minutes of truck departure cutoffs.
- **Sidebar Menu**: `Capacity > Deadline Alerts`

---

### PAGE 33 — WORKLOAD FORECAST
- **Filename**: `reference_pages_60/page_33.png`
- **Screen Number**: 33
- **Screen Title**: Predictive Inflow & Demand Forecasting
- **User Role**: Operations Director, Capacity Planner
- **Main Purpose**: Machine learning / historical hourly volume projection for staffing morning and evening peak waves.
- **Sidebar Menu**: `Capacity > Workload Forecast`

---

### PAGE 34 — OPERATIONAL REPORTS
- **Filename**: `reference_pages_60/page_34.png`
- **Screen Number**: 34
- **Screen Title**: End-to-End Warehouse Operational Metrics
- **User Role**: General Manager, Supply Chain Director
- **Main Purpose**: Consolidated operational KPIs: order cycle time, units per hour, picking accuracy, dock-to-stock time.
- **Sidebar Menu**: `Reports > Operational`

---

### PAGE 35 — PERFORMANCE REPORTS
- **Filename**: `reference_pages_60/page_35.png`
- **Screen Number**: 35
- **Screen Title**: Workforce & Department Productivity Benchmarks
- **User Role**: HR Operations, Operations Manager
- **Main Purpose**: Employee productivity scorecards, team leaderboards, and accuracy recognition.
- **Sidebar Menu**: `Reports > Performance`

---

### PAGE 36 — AUDIT LOGS
- **Filename**: `reference_pages_60/page_36.png`
- **Screen Number**: 36
- **Screen Title**: Immutable Enterprise System Audit Trail
- **User Role**: Compliance Auditor, Security Officer
- **Main Purpose**: Cryptographically verifiable timestamped audit events of every scan, override, adjustment, and dispatch.
- **Sidebar Menu**: `Reports > Audit Logs`
- **Display**: Event Timestamp, User ID, Role, Terminal IP/Barcode Scanner ID, Action Category, Before/After Delta, Status (`Success`, `Overridden`, `Failed`).

---

### PAGE 37 — WORKER ROLE HOME: PICKER
- **Filename**: `reference_pages_60/page_37.png`
- **Screen Number**: 37
- **Screen Title**: Picker Workspace — Home Terminal
- **User Role**: Warehouse Picker (e.g. *Kiran P.*)
- **Main Purpose**: Fast-action handheld terminal home for the assigned floor picker.
- **Sidebar/Header**: Simplified green rail (`#06431B`), active shift indicator (*Shift A: 06:00 - 14:00*), battery/WiFi telemetry.
- **KPI Metrics**: Assigned Tasks (8), Picked Today (142 items), Accuracy (100%), Speed (48s/pick).
- **Controls**: Large `Start Next Pick Task` Button, `Scan Location / Tote Barcode` Area, Active Announcements.

---

### PAGE 38 — PICKER: MY TASK QUEUE
- **Filename**: `reference_pages_60/page_38.png`
- **Screen Number**: 38
- **Screen Title**: Picker Task Queue
- **User Role**: Warehouse Picker
- **Main Purpose**: Sequential list of assigned pick waves with priority indicators, zone codes, and item counts.
- **Controls**: One-tap `Start Pick`, Filter by Zone (Ambient vs Cold), View estimated walking path.

---

### PAGE 39 — PICKER: CURRENT TASK
- **Filename**: `reference_pages_60/page_39.png`
- **Screen Number**: 39
- **Screen Title**: Active Item Pick Instruction
- **User Role**: Warehouse Picker
- **Main Purpose**: Guide the worker to the exact physical bin, display clear product photograph, required quantity, and scan input.
- **Display**: Target Bin Banner (`A-04-B2`), High-res product photograph, SKU, Description, Quantity required (`Pick 3 of 3`), Scan verification prompt.
- **Controls**: `Confirm Pick`, `Report Shortage / Damage`, `Change Bin Override`.

---

### PAGE 40 — PICKER: SCAN RESULT
- **Filename**: `reference_pages_60/page_40.png`
- **Screen Number**: 40
- **Screen Title**: Barcode Scan Verification & Feedback
- **User Role**: Warehouse Picker
- **Main Purpose**: Visual and acoustic feedback confirming item match or warning of wrong item scanned.
- **Feedback States**:
  - Green Success Banner: *SKU Matched — Place in Tote T-42*.
  - Red Error Banner: *Wrong Item Scanned — Expected SKU-4412, Scanned SKU-8821*.

---

### PAGE 41 — PICKER: ISSUE REPORT
- **Filename**: `reference_pages_60/page_41.png`
- **Screen Number**: 41
- **Screen Title**: Picker In-Aisle Issue Logging
- **User Role**: Warehouse Picker
- **Main Purpose**: Rapidly report issues without leaving the aisle: Bin Empty, Damaged Item, Expired Batch, Wrong Barcode.
- **Controls**: Large touch buttons for issue categories, photo capture, supervisor summon trigger.

---

### PAGE 42 — PICKER: COMPLETION AND HANDOFF
- **Filename**: `reference_pages_60/page_42.png`
- **Screen Number**: 42
- **Screen Title**: Wave Pick Complete & Tote Handoff
- **User Role**: Warehouse Picker
- **Main Purpose**: Confirm all lines in wave are picked, scan physical tote barcode, and designate destination packing table.
- **Controls**: Summary of items collected, Scan Handoff Staging Station, `Confirm & Close Tote`.

---

### PAGE 43 — WORKER ROLE HOME: PACKER
- **Filename**: `reference_pages_60/page_43.png`
- **Screen Number**: 43
- **Screen Title**: Packer Workspace — Home Terminal
- **User Role**: Warehouse Packer (e.g. *Meera S.*)
- **Main Purpose**: Table-mounted touchscreen terminal for parcel packing, carton sizing, and shipping label printing.
- **KPI Metrics**: Packed Today (94), Station Utilization (96%), Avg Pack Time (78s), Repack Rate (0.5%).
- **Controls**: `Scan Incoming Tote`, `Select Packaging Mode`, Station Inventory (Boxes, Tape, Bubble Wrap).

---

### PAGE 44 — PACKER: MY TASK QUEUE
- **Filename**: `reference_pages_60/page_44.png`
- **Screen Number**: 44
- **Screen Title**: Packer Order Queue
- **User Role**: Warehouse Packer
- **Main Purpose**: Prioritized list of picked totes waiting at packing station P-04.

---

### PAGE 45 — PACKER: CURRENT TASK
- **Filename**: `reference_pages_60/page_45.png`
- **Screen Number**: 45
- **Screen Title**: Order Verification & Packaging Selection
- **User Role**: Warehouse Packer
- **Main Purpose**: Verify each item from tote into box, recommend optimal carton size, log protective dunnage materials.
- **Controls**: Item Checklist, Box Size Selector (`Box M: 30x20x15cm`), `Print Thermal Shipping Label`.

---

### PAGE 46 — PACKER: SCAN RESULT
- **Filename**: `reference_pages_60/page_46.png`
- **Screen Number**: 46
- **Screen Title**: Item Verification & Scan Status
- **User Role**: Warehouse Packer
- **Main Purpose**: Visual checklist updating as each item is scanned into the shipping carton.

---

### PAGE 47 — PACKER: ISSUE REPORT
- **Filename**: `reference_pages_60/page_47.png`
- **Screen Number**: 47
- **Screen Title**: Packing Station Exception Logging
- **User Role**: Warehouse Packer
- **Main Purpose**: Report packing-stage defects: Missing item in tote, Leaking container, Broken seal, Oversized item needing split shipment.

---

### PAGE 48 — PACKER: COMPLETION AND HANDOFF
- **Filename**: `reference_pages_60/page_48.png`
- **Screen Number**: 48
- **Screen Title**: Parcel Sealed & Handoff to QC
- **User Role**: Warehouse Packer
- **Main Purpose**: Confirm shipping label attached, box sealed, and place parcel onto QC conveyor/staging cart.

---

### PAGE 49 — WORKER ROLE HOME: QUALITY CHECKER
- **Filename**: `reference_pages_60/page_49.png`
- **Screen Number**: 49
- **Screen Title**: Quality Inspection — Home Terminal
- **User Role**: Quality Checker (e.g. *Anita R.*)
- **Main Purpose**: QC station terminal for visual inspection, label verification, and dispatch authorization.
- **KPI Metrics**: Inspected (184), Approved (181), Rejected (3), Pass Rate (98.4%).
- **Controls**: `Scan Next Package Barcode`, QC Guidelines Quick Reference.

---

### PAGE 50 — QUALITY CHECKER: MY TASK QUEUE
- **Filename**: `reference_pages_60/page_50.png`
- **Screen Number**: 50
- **Screen Title**: QC Inspection Station Queue
- **User Role**: Quality Checker
- **Main Purpose**: Staged parcels waiting for quality sign-off.

---

### PAGE 51 — QUALITY CHECKER: CURRENT TASK
- **Filename**: `reference_pages_60/page_51.png`
- **Screen Number**: 51
- **Screen Title**: Package Quality Inspection Checklist
- **User Role**: Quality Checker
- **Main Purpose**: Step-by-step verification: Carton integrity, Barcode readability, Correct weight compliance (+/- 50g tolerance), Security tape intact.
- **Controls**: Interactive Checklist Toggle, Weight Scale Reading, Photo Capture.

---

### PAGE 52 — QUALITY CHECKER: SCAN RESULT
- **Filename**: `reference_pages_60/page_52.png`
- **Screen Number**: 52
- **Screen Title**: Package Barcode & Manifest Verification
- **User Role**: Quality Checker
- **Main Purpose**: Validates that physical parcel matches the electronic order manifest and courier partner route code.

---

### PAGE 53 — QUALITY CHECKER: ISSUE REPORT
- **Filename**: `reference_pages_60/page_53.png`
- **Screen Number**: 53
- **Screen Title**: QC Defect & Rejection Logging
- **User Role**: Quality Checker
- **Main Purpose**: Flag parcel rejection, attach defect photo evidence, and re-route package back to packing or rework.

---

### PAGE 54 — QUALITY CHECKER: COMPLETION AND HANDOFF
- **Filename**: `reference_pages_60/page_54.png`
- **Screen Number**: 54
- **Screen Title**: QC Approval & Dispatch Release
- **User Role**: Quality Checker
- **Main Purpose**: Greenlight verified parcel for outbound courier cage loading; triggers system status to `READY_FOR_HANDOVER`.

---

### PAGE 55 — INVENTORY OFFICER: ROLE HOME
- **Filename**: `reference_pages_60/page_55.png`
- **Screen Number**: 55
- **Screen Title**: Inventory Officer — Floor Terminal
- **User Role**: Inventory Officer (e.g. *Suresh K.*)
- **Main Purpose**: Mobile terminal for warehouse putaway, pallet receiving, and in-aisle stock auditing.
- **KPI Metrics**: SKUs Audited (42), Discrepancies Logged (2), Inbound Pallets Received (8).
- **Controls**: `Receive Goods`, `Issue Stock`, `Start Bin Audit`, `Scan SKU`.

---

### PAGE 56 — INVENTORY OFFICER: MY TASK QUEUE
- **Filename**: `reference_pages_60/page_56.png`
- **Screen Number**: 56
- **Screen Title**: Inventory Task Assignments
- **User Role**: Inventory Officer
- **Main Purpose**: Scheduled cycle counts, replenishment move tasks, and dock receiving orders.

---

### PAGE 57 — INVENTORY OFFICER: CURRENT TASK
- **Filename**: `reference_pages_60/page_57.png`
- **Screen Number**: 57
- **Screen Title**: In-Aisle Stock Count / Adjustment Execution
- **User Role**: Inventory Officer
- **Main Purpose**: Conduct physical scan of target bin, enter actual counted units, and calculate live discrepancy variance.

---

### PAGE 58 — INVENTORY OFFICER: SCAN RESULT
- **Filename**: `reference_pages_60/page_58.png`
- **Screen Number**: 58
- **Screen Title**: SKU & Bin Verification Match
- **User Role**: Inventory Officer
- **Main Purpose**: Instant confirmation of product identity, batch number, manufacturing date, and expiry date.

---

### PAGE 59 — INVENTORY OFFICER: ISSUE REPORT
- **Filename**: `reference_pages_60/page_59.png`
- **Screen Number**: 59
- **Screen Title**: Inventory Discrepancy & Damage Logging
- **User Role**: Inventory Officer
- **Main Purpose**: Log damaged pallet, water damage in aisle, pest evidence, or missing master carton.

---

### PAGE 60 — FINAL INVENTORY WORKFLOW SCREEN
- **Filename**: `reference_pages_60/page_60.png`
- **Screen Number**: 60
- **Screen Title**: Inventory Issue Submission & Supervisor Escalation
- **User Role**: Inventory Officer
- **Main Purpose**: Formal submission of discrepancy report with variance value calculation, photo attachments, and immediate supervisor alert; concludes the 60-screen operational workflow sequence.

---

## Design System Extracted from the 60 Screens

### 1. Palette & Surfaces
- **Manager Sidebar Primary**: `#033129` (Deep Pine Forest Green)
- **Worker Sidebar Primary**: `#06431B` (Dense Evergreen)
- **Primary Action Green**: `#087A4A`
- **Active Pill / Accent Highlight**: `#C6F04A` (Lime-tinted active pill)
- **Content Background**: `#F5F7F6` / `#F9F9FB`
- **Card Surfaces**: `#FFFFFF` with border `1px solid #E1E8E3`
- **Status Badges**:
  - `Success / Completed`: `#EAF7EF` bg, `#087A4A` text
  - `Warning / In-Progress`: `#FEF3C7` bg, `#D97706` text
  - `Critical / SLA Breach`: `#FEE2E2` bg, `#DC2626` text
  - `Information / Staged`: `#EFF6FF` bg, `#2563EB` text

### 2. Typography & Layout Specifications
- **Font Family**: Inter, Plus Jakarta Sans, system fallback
- **Desktop Sidebar Width**: 260px (collapsible to 76px)
- **Worker Sidebar Width**: 240px (optimized for 10" tablet and mobile breakpoints)
- **Header Height**: 64px sticky
- **Card Border Radius**: 16px (`rounded-2xl`) for manager cards; 20px (`rounded-3xl`) for worker touchcards
- **Worker Touch Targets**: Minimum 48px height, 16px font size, high-contrast labels

---

## Role-to-Page Access Matrix

| Role | Permitted Pages | Primary Landing |
| :--- | :--- | :--- |
| **Warehouse Manager / Director** | Pages 01–36 (Full access to manager workspace & reports) | Page 02 (`/warehouse/dashboard`) |
| **Shift Supervisor / Lead** | Pages 02–10, 14–18, 24, 26, 31, 32 | Page 02 (`/warehouse/dashboard`) |
| **Warehouse Picker** | Pages 01, 37–42 (Dedicated picker suite) | Page 37 (`/warehouse/worker/picker`) |
| **Warehouse Packer** | Pages 01, 43–48 (Dedicated packer suite) | Page 43 (`/warehouse/worker/packer`) |
| **Quality Checker** | Pages 01, 49–54 (Dedicated QC suite) | Page 49 (`/warehouse/worker/quality-checker`) |
| **Inventory Officer** | Pages 01, 04, 05, 12, 13, 55–60 | Page 55 (`/warehouse/worker/inventory-officer`) |
| **Returns Officer** | Pages 01, 21–23 | Page 21 (`/warehouse/returns/inspect-approve`) |
| **Courier Handover Operator** | Pages 01, 09, 26–30 | Page 09 (`/warehouse/courier`) |

---

## Mandatory Workspace Separation: Warehouse vs. Finance Portal

In accordance with strict system boundaries:
1. **Warehouse Portal (`/warehouse/*`)**:
   - Manages physical order picking, packing, QC, stock movements, and courier handoffs.
   - Operates on physical on-hand and reserved unit inventory balances.
   - Physical return receipt triggers an electronic message to Finance; does not independently process bank credits.
2. **Finance Portal (`/portal/payment-ledger`, `/portal/cod-settlement`, etc.)**:
   - Retains its existing distinct financial design, ledger columns, and refund approval thresholds.
   - Remains completely decoupled from warehouse floor navigation.
   - Handled via the top-level portal switcher.

