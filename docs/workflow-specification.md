# HyperMart Operations Hub — Operational Workflows & Retail Logic

This document specifies the business rules, state transitions, validation logic, and interconnected workflows across the 25 pages of the HyperMart Operations Hub.

---

## 1. Authentication, Sessions & RBAC Matrix

### Personas & Roles
1. **Super Admin (Dev K.)**: Full unrestricted access across all modules, settings, user provisioning, and high-value refund approvals (>₹2,000).
2. **Operations Manager (Priya S.)**: High-level command dashboard, fulfillment control tower, exception triage, and mid-tier refund approvals (₹500 – ₹2,000).
3. **Warehouse Manager (Arjun M.)**: Inventory overview, stock ledger adjustments, purchase order receiving, and warehouse readiness floor dispatch.
4. **Catalogue Editor (Priya N.)**: Product creation, editing, category mapping, brand agreements, and promotional campaigns.
5. **Support Agent (Riya A.)**: Customer care live desk, ticket resolution, order inspection, and low-tier refund auto-approvals (<₹500).
6. **Restricted Operator (Jordan Diaz)**: When accessing unauthorized sections, triggers Page 2 (`/admin/access-denied`) with clear redirection paths.

---

## 2. Merchandising & Product Lifecycle Workflow

```text
[Draft Product Created] (Page 7)
       │
       ▼
[Compliance & Document Upload] (Page 7)
  - FSSAI / CE certificate
  - Safety data sheet
  - 3+ Product photos
       │
       ▼
[Submitted to Approval Queue] (Page 10)
       │
   ┌───┴────────────────────────┐
   ▼                            ▼
[Changes Requested]         [Approved]
  (Feedback note sent)        (Moves to Active Catalog)
                                │
                                ▼
                    [Live in Storefront & POS] (Page 6)
```

1. **Product Creation/Edit (`/admin/products/[id]`)**:
   - Captures title, domain (Food, Fashion, Beauty, Electronics), SKU, brand, retail price (INR), compare-at price, low-stock threshold, variants, and regulatory compliance checks.
2. **Approval Gate (`/admin/approvals`)**:
   - Merchandising QA inspects uploaded documentation, brand naming compliance, and commercial margins.
   - 1-click `Approve` publishes the item; `Request changes` requires an audit feedback note.

---

## 3. Replenishment & Inbound PO Workflow

```text
[Low-Stock Alert Triggered] (Page 14)
       │
       ▼
[Create Purchase Order] (Page 11)
  - Select approved brand agreement (Page 8)
  - Assign line items, quantities, and wholesale cost
       │
       ▼
[Inbound Shipment Tracked] (Page 11)
  - PO Status: Confirmed -> In transit -> At warehouse
       │
       ▼
[Stock Receiving Verification] (Page 11 & 12)
  - Verify received vs expected quantities
  - Inventory updated automatically: Saleable Stock (+)
  - Stock Ledger entry generated with PO reference (Page 13)
```

---

## 4. Warehouse Execution & Real-Time Wave Management

1. **Coimbatore DC (Primary DC)** & **Chennai FC (Regional FC)** (`/admin/warehouse-readiness`):
   - Orders grouped into packing waves (`W-7241` to `W-7245`).
   - RF scanner status tracked in real time.
   - Cut-off countdown clocks dynamically reflect delivery slot deadlines.
2. **Stock Movements & Manual Adjustments (`/admin/inventory/adjustments`)**:
   - Stock classified into 5 discrete pools: **Saleable**, **Reserved**, **Packed**, **Damaged**, and **Held**.
   - Any manual quantity adjustment requires:
     - Mandatory reason code (e.g. *Damaged*, *Expired*, *Stock take variance*).
     - Mandatory audit note.
     - Automatically logs timestamp and operator ID to the immutable audit trail.

---

## 5. Order Fulfillment & Reverse Logistics Workflow

```text
[Order Placed] (HM-88219)
       │
       ▼
[Picking & Packing] -> [Out for Delivery] (Page 16 & 17)
       │
   ┌───┴────────────────────────────────────────┐
   ▼                                            ▼
[Delivered Successfully]               [Delivery Exception] (Page 19)
                                         - Customer not available
                                         - Doorstep photo evidence logged
                                                │
                                                ▼
                                       [Action Triage]
                                         - Reschedule delivery
                                         - Replace damaged item
                                         - Escalate to Refund (Page 22)
```

---

## 6. Tiered Refund Governance Matrix (`/admin/refunds`)

To balance customer satisfaction with financial loss prevention, refund approvals follow strict authorization tiers:
- **Tier 1 (Under ₹500)**: Frontline Support agents can approve instantly with doorstep evidence photo verification.
- **Tier 2 (₹500 to ₹2,000)**: Requires review and sign-off by an Operations Admin/Manager.
- **Tier 3 (Above ₹2,000)**: Requires executive sign-off from a Super Admin.

Decisions immediately update the payment records ledger (`/admin/payments`) and append to customer order notes.

---

## 7. Financial Settlement & Reconciliation Workflow (`/admin/payments`)

1. **UPI & Card Settlements**:
   - Gateway settlement reports matched against HyperMart order IDs and bank UTRs.
   - Status marked as `Matched` or `Exception` (e.g. amount mismatch, late settlement).
2. **COD Cash Collections**:
   - Delivery fleet cash handoffs verified against delivered order totals.
3. **Daily Net Balance**:
   - Reconciles `(UPI Settlements + COD Collections) - Refund Payouts` into the daily finance summary.
