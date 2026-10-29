# HyperMart Operations Hub — 25-Page Route Map

This document establishes the official Next.js App Router mapping for all 25 screens of the HyperMart Operations Hub.

---

## Complete Route Directory

| Page # | Route Path | Component Name | Layout Shell | Description |
|:---:|:---|:---|:---|:---|
| **1** | `/admin/login` | `AdminLoginPage` | Auth Minimalist Shell | Multi-step company login gateway |
| **2** | `/admin/access-denied` | `AccessDeniedPage` | Main Admin Shell | Role permission gate & portal switcher |
| **3** | `/admin` | `OperationsDashboardPage` | Main Admin Shell | Command dashboard & fulfillment tower |
| **4** | `/admin/exceptions` | `ExceptionQueuePage` | Main Admin Shell | Multi-department exception resolution queue |
| **5** | `/admin/catalogue` | `CatalogueOverviewPage` | Main Admin Shell | High-level catalog portfolio & domain health |
| **6** | `/admin/products` | `ProductListPage` | Main Admin Shell | Master SKU listing, search, and bulk actions |
| **7** | `/admin/products/[id]`<br>`/admin/products/new` | `ProductEditorPage` | Main Admin Shell | Comprehensive PDP editor & variant matrix |
| **8** | `/admin/brands` | `BrandsProcurementPage` | Main Admin Shell | Brand agreements and procurement timeline |
| **9** | `/admin/promotions` | `PromotionsPage` | Main Admin Shell | Campaign manager, discount rules & promo codes |
| **10** | `/admin/approvals` | `ProductApprovalsPage` | Main Admin Shell | Product QA approval queue with compliance drawer |
| **11** | `/admin/purchase-orders`<br>`/admin/purchase-orders/[id]` | `PurchaseOrdersPage` | Main Admin Shell | Supplier PO tracking, receiving & inbound timeline |
| **12** | `/admin/inventory` | `InventoryOverviewPage` | Main Admin Shell | Multi-warehouse stock states (saleable, reserved, damaged) |
| **13** | `/admin/inventory/ledger`<br>`/admin/inventory/adjustments` | `StockLedgerPage` | Main Admin Shell | Complete movement audit log & stock adjustment drawer |
| **14** | `/admin/inventory/alerts` | `InventoryAlertsPage` | Main Admin Shell | Critical stockout alerts & expiry risk workbench |
| **15** | `/admin/warehouse-readiness` | `WarehouseReadinessPage` | Dark Control Room Shell | Live facility telemetry (Coimbatore DC / Chennai FC) |
| **16** | `/admin/orders` | `OrdersListPage` | Main Admin Shell | Customer order stream, filters & stage tracker |
| **17** | `/admin/orders/[id]` | `OrderDetailPage` | Main Admin Shell | 360-degree order inspection, timeline & notes |
| **18** | `/admin/fulfilment` | `FulfilmentControlTowerPage` | Main Admin Shell | Hub logistics, slot capacity & vehicle handoff alerts |
| **19** | `/admin/returns` | `ReturnsExceptionsPage` | Main Admin Shell | Reverse logistics, evidence photos & return drawer |
| **20** | `/admin/customer-care` | `CustomerCarePage` | 3-Column Desk Shell | Live agent support desk, chat stream & order context |
| **21** | `/admin/customers/[id]` | `CustomerProfilePage` | Main Admin Shell | Customer 360 profile, order history & risk rating |
| **22** | `/admin/refunds` | `RefundApprovalsPage` | Main Admin Shell | Tiered refund approval console (<₹500, ₹500–₹2k, >₹2k) |
| **23** | `/admin/payments` | `PaymentsReconciliationPage` | Main Admin Shell | Settlement ledger, UTR matching & COD reconciliation |
| **24** | `/admin/reports` | `ReportsAnalyticsPage` | Main Admin Shell | Enterprise BI dashboard, domain sales & SLA trends |
| **25** | `/admin/settings`<br>`/admin/users`<br>`/admin/audit` | `GovernanceSettingsPage` | Main Admin Shell | User management, RBAC matrix, audit log & policies |

---

## Navigation Hierarchy & Sidebar Structure

The persistent sidebar in the Main Admin Shell organizes the 25 pages into 6 clear operational clusters:

```text
HyperMart Operations Hub
│
├── OPERATIONS
│   ├── Home (Dashboard)           -> /admin
│   ├── Fulfilment Control Tower   -> /admin/fulfilment
│   ├── Warehouse Readiness (Live) -> /admin/warehouse-readiness
│   └── Exception Queue            -> /admin/exceptions
│
├── MERCHANDISING & CATALOGUE
│   ├── Overview                   -> /admin/catalogue
│   ├── Products & SKUs            -> /admin/products
│   ├── Product Approvals          -> /admin/approvals
│   ├── Brands & Procurement       -> /admin/brands
│   └── Offers & Promotions        -> /admin/promotions
│
├── SUPPLY CHAIN & INVENTORY
│   ├── Inventory Overview         -> /admin/inventory
│   ├── Stock Ledger & Adjustments -> /admin/inventory/ledger
│   ├── Low Stock & Expiry Alerts  -> /admin/inventory/alerts
│   └── Purchase Orders            -> /admin/purchase-orders
│
├── ORDERS & CUSTOMERS
│   ├── All Orders                 -> /admin/orders
│   ├── Returns & Exceptions       -> /admin/returns
│   ├── Customer Care (Live)       -> /admin/customer-care
│   └── Refund Approvals           -> /admin/refunds
│
├── FINANCE & ANALYTICS
│   ├── Payments & Reconciliation  -> /admin/payments
│   └── Reports & BI Analytics     -> /admin/reports
│
└── GOVERNANCE & SYSTEM
    ├── Users & Access (RBAC)      -> /admin/users
    ├── Audit Log                  -> /admin/audit
    └── Settings & Rules           -> /admin/settings
```

---

## Protection of Existing Customer Storefront

All customer-facing routes remain untouched and isolated:
- Customer Storefront Homepage: `/`
- Departments & Categories: `/category`, `/category/[department]`, `/fashion/clearance`
- Product PDPs: `/product/[slug]`
- Cart & Checkout: `/cart`, `/checkout`
- Customer Account & Orders: `/account`, `/orders`, `/orders/[id]`
- Customer Support & Static Content: `/help`, `/legal`, `/services`
