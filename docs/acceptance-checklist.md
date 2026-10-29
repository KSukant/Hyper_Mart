# HyperMart Operations Hub — 25-Page Acceptance Checklist

This checklist defines the rigorous verification criteria for each of the 25 pages of the HyperMart Operations Hub.

---

## 25-Page Route & Visual Verification Matrix

| # | Route | Screen Name | Visual Layout Integrity | Interactive Controls & Data Operations | Status |
|:---:|:---|:---|:---|:---|:---:|
| **1** | `/admin/login` | Sign In | Split-panel layout, brand illustrations, 3-step progress header | Email/pass validation, password visibility toggle, login redirect | [ ] |
| **2** | `/admin/access-denied` | Access Denied | Centered permission shield card, role badges | Role portal redirection, switch portal, sign out | [ ] |
| **3** | `/admin` | Operations Dashboard | 6 KPI cards, Coimbatore-Chennai control tower, attention list | Timeframe dropdown, notification bell, live stage click-throughs | [ ] |
| **4** | `/admin/exceptions` | Exception Queue | Multi-tab triage bar, severity tag visual system | Status/Severity filters, ownership assignment, review action buttons | [ ] |
| **5** | `/admin/catalogue` | Catalogue Overview | 4 Domain cards, product status donut, category grid | Domain selection navigation, real-time activity stream | [ ] |
| **6** | `/admin/products` | Products Table | Master SKU table with brand/category/price/stock | Multi-row select, domain filters, status toggle, Add Product | [ ] |
| **7** | `/admin/products/[id]` | Product Editor | Multi-column layout, media gallery, compliance checklist | Variant matrix CRUD, stock thresholds, Save draft / Publish | [ ] |
| **8** | `/admin/brands` | Brands & Procurement | Brand health KPIs, procurement milestone timeline | Add brand modal, buying window countdowns, agreement links | [ ] |
| **9** | `/admin/promotions` | Offers & Promotions | Active vs upcoming campaigns, coupon codes repository | Promo code create/toggle, discount rule engine, date validation | [ ] |
| **10** | `/admin/approvals` | Product Approvals | Split-screen review queue with compliance inspection drawer | 1-click Approve, Request changes with feedback note, doc checks | [ ] |
| **11** | `/admin/purchase-orders` | Purchase Orders | Inbound KPIs, receiving timeline stepper, PO data table | Status tabs, receiving workflow, inbound value by brand chart | [ ] |
| **12** | `/admin/inventory` | Inventory Overview | 5 stock state cards (saleable, reserved, damaged, etc.) | Warehouse selector, inventory health gauge, stock details table | [ ] |
| **13** | `/admin/inventory/ledger` | Stock Ledger | Detailed movement audit table, reason codes | Stock adjustment slide-over drawer, quantity delta validation | [ ] |
| **14** | `/admin/inventory/alerts` | Inventory Alerts | Low stock & Near expiry tabs, prioritized risk cards | 1-click Create PO, Move to offer, Hold batch, Mark reviewed | [ ] |
| **15** | `/admin/warehouse-readiness` | Warehouse Readiness | High-contrast dark telemetry theme, dual facility meters | Live wave board progress, cut-off countdowns, scanner status | [ ] |
| **16** | `/admin/orders` | Orders Management | Orders KPI strip, stage badges, payment method pills | Stage filters, delivery slot dropdown, View order drawer/page | [ ] |
| **17** | `/admin/orders/[id]` | Order Detail View | 6 info cards, locked price indicator, order timeline | Item inspection, add internal note, hold order, start refund | [ ] |
| **18** | `/admin/fulfilment` | Fulfilment Tower | Flow pipeline, delivery slot capacity hourly heatbars | Hub comparison gauges, vehicle delay alerts, route reassignment | [ ] |
| **19** | `/admin/returns` | Returns & Exceptions | Reverse logistics filter tabs, failure reason breakdown | Case drawer inspection, doorstep evidence photos, return actions | [ ] |
| **20** | `/admin/customer-care` | Customer Care | 3-column synchronized support desk | Ticket queue, live chat stream, macro replies, customer history | [ ] |
| **21** | `/admin/customers/[id]` | Customer Profile | Unified 360 customer profile, order history, tags | Saved addresses, refund logs, complaint tickets, activity log | [ ] |
| **22** | `/admin/refunds` | Refund Approvals | 3-tier authorization banners (<₹500, ₹500–₹2k, >₹2k) | Policy eligibility check, evidence photos, Approve/Decline | [ ] |
| **23** | `/admin/payments` | Payments & Reconciliation | Financial KPIs, daily collection trend charts | UTR reconciliation table, match/mismatch status, export report | [ ] |
| **24** | `/admin/reports` | Reports & Analytics | Macro BI dashboard, domain sales donut, brand bar charts | Product rankings, SLA performance, 4-month refund trend line | [ ] |
| **25** | `/admin/settings` | Governance & Settings | Users table, RBAC permission matrix, audit event stream | 2FA badges, permission toggles, delivery threshold settings | [ ] |

---

## Technical & Architectural Acceptance Tests

- [ ] **Storefront Protection**: Navigating to `/`, `/category/food`, `/fashion/clearance`, `/cart`, and `/checkout` works without disruption.
- [ ] **Typecheck**: `npm run typecheck` passes with 0 errors across the entire repository.
- [ ] **Production Build**: `next build` generates all static and dynamic routes cleanly.
- [ ] **Performance**: Fast page transitions (<240ms) with zero layout shifting.
- [ ] **Keyboard & A11y**: All dialogs trap focus, all drawers dismiss on `Escape`, all interactive controls have accessible names.
- [ ] **Reduced Motion**: Respects `prefers-reduced-motion` across all components.
