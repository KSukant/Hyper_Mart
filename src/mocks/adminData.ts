// Complete retail operations mock dataset for HyperMart Operations Hub (25 Pages)

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  domain: "food" | "fashion" | "electronics" | "beauty";
  packSize: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  offer?: string;
  status: "Active" | "Pending" | "Restricted" | "Draft";
  image: string;
  description: string;
  lowStockThreshold: number;
  variants: { color?: string; size?: string; sku: string; price: number; stock: number }[];
  compliance: { meetsStandards: boolean; nonHazardous: boolean; packagingComplies: boolean };
}

export const ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: "p-01",
    name: "Aashirvaad Whole Wheat Atta",
    sku: "AASH1001",
    brand: "Aashirvaad",
    category: "Food & Grocery > Staples",
    domain: "food",
    packSize: "5 kg",
    price: 279,
    compareAtPrice: 310,
    stock: 245,
    offer: "10% OFF",
    status: "Active",
    image: "/photos/atta.webp",
    description: "100% pure whole wheat grain flour with 0% maida, grounded with state-of-the-art chakki technology.",
    lowStockThreshold: 40,
    variants: [{ size: "5 kg", sku: "AASH1001-5K", price: 279, stock: 245 }, { size: "10 kg", sku: "AASH1001-10K", price: 535, stock: 120 }],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
  {
    id: "p-02",
    name: "Sony WF-C500 Earbuds",
    sku: "SONY7789",
    brand: "Sony",
    category: "Electronics > Audio",
    domain: "electronics",
    packSize: "True Wireless, Black",
    price: 4990,
    compareAtPrice: 5990,
    stock: 120,
    offer: "15% OFF",
    status: "Active",
    image: "/photos/electronics-generic.webp",
    description: "Compact true wireless Bluetooth earbuds with 20hr battery life, IPX4 splash rating and 360 Reality Audio.",
    lowStockThreshold: 20,
    variants: [{ color: "Black", sku: "SONY7789-BLK", price: 4990, stock: 80 }, { color: "White", sku: "SONY7789-WHT", price: 4990, stock: 40 }],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
  {
    id: "p-03",
    name: "Lakmé 9to5 Vitamin C Serum",
    sku: "LAKME3321",
    brand: "Lakmé",
    category: "Beauty & Personal Care > Skincare",
    domain: "beauty",
    packSize: "30 ml",
    price: 599,
    compareAtPrice: 749,
    stock: 310,
    offer: "20% OFF",
    status: "Active",
    image: "/photos/beauty-generic.webp",
    description: "Enriched with 98% pure Vitamin C complex for visible skin radiance and antioxidant protection.",
    lowStockThreshold: 30,
    variants: [{ size: "30 ml", sku: "LAKME3321-30M", price: 599, stock: 310 }],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
  {
    id: "p-04",
    name: "Tide Matic Laundry Detergent Powder",
    sku: "TIDE2200",
    brand: "Tide",
    category: "Household Care > Laundry",
    domain: "food",
    packSize: "2 kg",
    price: 349,
    compareAtPrice: 389,
    stock: 178,
    offer: "10% OFF",
    status: "Active",
    image: "/photos/detergent.webp",
    description: "Formulated specifically for front and top load washing machines with deep stain removal power.",
    lowStockThreshold: 50,
    variants: [{ size: "2 kg", sku: "TIDE2200-2K", price: 349, stock: 178 }],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
  {
    id: "p-05",
    name: "Hydro Flask 32 oz Wide Mouth Insulated Water Bottle",
    sku: "HFL-32-OLV",
    brand: "Hydro Flask",
    category: "Sports & Outdoors > Drinkware",
    domain: "electronics",
    packSize: "32 oz / 946 ml",
    price: 2499,
    compareAtPrice: 2899,
    stock: 269,
    offer: "Popular",
    status: "Active",
    image: "/photos/water-bottle.webp",
    description: "TempShield double-wall vacuum insulation keeps drinks ice cold up to 24 hours or piping hot up to 12 hours.",
    lowStockThreshold: 20,
    variants: [
      { color: "Olive", sku: "HFL-32-OLV", price: 2499, stock: 120 },
      { color: "Black", sku: "HFL-32-BLK", price: 2499, stock: 85 },
      { color: "Pacific Blue", sku: "HFL-32-BLU", price: 2499, stock: 64 },
    ],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
  {
    id: "p-06",
    name: "ZenSound Z5 Wireless Headphones",
    sku: "ZEN-Z5-PRO",
    brand: "ZenSound",
    category: "Electronics > Headphones",
    domain: "electronics",
    packSize: "Over-ear, Matte Black",
    price: 3999,
    compareAtPrice: 4999,
    stock: 50,
    offer: "Pending Launch",
    status: "Pending",
    image: "/photos/headphones.webp",
    description: "Active Noise Cancelling over-ear headphones with 40mm drivers and 35-hour playback.",
    lowStockThreshold: 15,
    variants: [{ color: "Matte Black", sku: "ZEN-Z5-BLK", price: 3999, stock: 50 }],
    compliance: { meetsStandards: true, nonHazardous: true, packagingComplies: true },
  },
];

export interface ExceptionItem {
  id: string;
  title: string;
  description: string;
  category: "Orders" | "Inventory" | "Payments" | "Refunds" | "Customer care";
  severity: "Critical" | "High" | "Medium" | "Low";
  age: string;
  owner: string;
  ownerInitials: string;
  actionText: string;
  href: string;
}

export const EXCEPTION_ITEMS: ExceptionItem[] = [
  {
    id: "ex-1",
    title: "5 orders at risk",
    description: "Orders may miss expected delivery window due to regional rain advisory.",
    category: "Orders",
    severity: "Critical",
    age: "2d 6h",
    owner: "Taylor Moore",
    ownerInitials: "TM",
    actionText: "Review orders",
    href: "/admin/orders?status=exception",
  },
  {
    id: "ex-2",
    title: "12 refunds awaiting approval",
    description: "Refunds require review and approval exceeding standard agent window.",
    category: "Refunds",
    severity: "High",
    age: "1d 4h",
    owner: "Priya Raman",
    ownerInitials: "PR",
    actionText: "Review refunds",
    href: "/admin/refunds",
  },
  {
    id: "ex-3",
    title: "7 low-stock SKUs",
    description: "Inventory has breached reorder threshold across Coimbatore & Chennai.",
    category: "Inventory",
    severity: "High",
    age: "9h 12m",
    owner: "Daniel Lee",
    ownerInitials: "DL",
    actionText: "View SKUs",
    href: "/admin/inventory/alerts",
  },
  {
    id: "ex-4",
    title: "3 payment mismatches",
    description: "Settlement amount reported by gateway does not match order total.",
    category: "Payments",
    severity: "Medium",
    age: "1d 1h",
    owner: "Maria Khan",
    ownerInitials: "MK",
    actionText: "Investigate",
    href: "/admin/payments?status=mismatch",
  },
  {
    id: "ex-5",
    title: "2 missed warehouse handoffs",
    description: "Batched crates not handed off to outbound vehicle before dispatch cut-off.",
    category: "Orders",
    severity: "Critical",
    age: "1d 18h",
    owner: "Jordan Chen",
    ownerInitials: "JC",
    actionText: "View orders",
    href: "/admin/warehouse-readiness",
  },
];

export interface BrandAgreement {
  id: string;
  name: string;
  domain: string;
  activeSkus: number;
  agreementId: string;
  agreementPeriod: string;
  nextBuyingWindow: string;
  daysRemaining: number;
  complianceStatus: "Compliant" | "Needs attention";
  stockHealth: "Healthy" | "At risk" | "Low stock";
}

export const BRAND_AGREEMENTS: BrandAgreement[] = [
  {
    id: "b-01",
    name: "Aashirvaad",
    domain: "Food & Staples",
    activeSkus: 124,
    agreementId: "HM-AG-001",
    agreementPeriod: "Jan 2024 – Dec 2025",
    nextBuyingWindow: "Apr 15, 2025",
    daysRemaining: 12,
    complianceStatus: "Compliant",
    stockHealth: "Healthy",
  },
  {
    id: "b-02",
    name: "Sony",
    domain: "Consumer Electronics",
    activeSkus: 86,
    agreementId: "HM-AG-014",
    agreementPeriod: "Feb 2024 – Jan 2026",
    nextBuyingWindow: "May 1, 2025",
    daysRemaining: 28,
    complianceStatus: "Compliant",
    stockHealth: "Healthy",
  },
  {
    id: "b-03",
    name: "Lakmé",
    domain: "Beauty & Personal Care",
    activeSkus: 64,
    agreementId: "HM-AG-022",
    agreementPeriod: "Mar 2024 – Feb 2026",
    nextBuyingWindow: "Apr 22, 2025",
    daysRemaining: 19,
    complianceStatus: "Compliant",
    stockHealth: "At risk",
  },
  {
    id: "b-04",
    name: "Tide",
    domain: "Home Care",
    activeSkus: 92,
    agreementId: "HM-AG-031",
    agreementPeriod: "Jan 2024 – Dec 2025",
    nextBuyingWindow: "May 6, 2025",
    daysRemaining: 33,
    complianceStatus: "Needs attention",
    stockHealth: "Low stock",
  },
];

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  brand: string;
  itemsCount: number;
  value: number;
  expectedArrival: string;
  receivingStatus: "In transit" | "At warehouse" | "Receiving in progress" | "Completed" | "Draft";
  facility: string;
}

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: "po-1", poNumber: "PO-2024-1187", brand: "Aashirvaad", itemsCount: 12, value: 462000, expectedArrival: "12 Nov 2024", receivingStatus: "In transit", facility: "Coimbatore DC" },
  { id: "po-2", poNumber: "PO-2024-1186", brand: "Sony", itemsCount: 8, value: 1235600, expectedArrival: "14 Nov 2024", receivingStatus: "In transit", facility: "Chennai FC" },
  { id: "po-3", poNumber: "PO-2024-1183", brand: "Tide", itemsCount: 24, value: 518400, expectedArrival: "15 Nov 2024", receivingStatus: "At warehouse", facility: "Coimbatore DC" },
  { id: "po-4", poNumber: "PO-2024-1181", brand: "Lakmé", itemsCount: 16, value: 392800, expectedArrival: "17 Nov 2024", receivingStatus: "In transit", facility: "Chennai FC" },
  { id: "po-5", poNumber: "PO-2024-1179", brand: "Aashirvaad", itemsCount: 20, value: 621000, expectedArrival: "18 Nov 2024", receivingStatus: "At warehouse", facility: "Coimbatore DC" },
  { id: "po-6", poNumber: "PO-2024-1176", brand: "Tide", itemsCount: 30, value: 745520, expectedArrival: "20 Nov 2024", receivingStatus: "In transit", facility: "Coimbatore DC" },
];

export interface InventoryMovement {
  id: string;
  dateTime: string;
  sku: string;
  product: string;
  brand: string;
  batch: string;
  openingQty: number;
  receivedQty: number;
  reservedQty: number;
  adjustedQty: number;
  closingQty: number;
  reason: string;
  staffMember: string;
}

export const INVENTORY_MOVEMENTS: InventoryMovement[] = [
  { id: "im-1", dateTime: "30 Apr 2025 14:22", sku: "HYP-00123", product: "Paracetamol 500mg Tablets", brand: "HealthPlus", batch: "B250401", openingQty: 200, receivedQty: 0, reservedQty: -20, adjustedQty: 0, closingQty: 180, reason: "Order reserve", staffMember: "Priya Nair" },
  { id: "im-2", dateTime: "30 Apr 2025 11:10", sku: "HYP-00456", product: "Vitamin C 1000mg (30s)", brand: "NutraWell", batch: "B250317", openingQty: 150, receivedQty: 60, reservedQty: -10, adjustedQty: 0, closingQty: 200, reason: "Purchase receipt", staffMember: "Daniel Tan" },
  { id: "im-3", dateTime: "29 Apr 2025 16:03", sku: "HYP-00789", product: "Surgical Face Mask (50s)", brand: "SafeCare", batch: "B250320", openingQty: 500, receivedQty: 0, reservedQty: -50, adjustedQty: 0, closingQty: 450, reason: "Order reserve", staffMember: "Lim Wei" },
  { id: "im-4", dateTime: "28 Apr 2025 10:21", sku: "HYP-00321", product: "Hand Sanitiser 500ml", brand: "PureGuard", batch: "B250315", openingQty: 300, receivedQty: 120, reservedQty: -30, adjustedQty: 0, closingQty: 390, reason: "Purchase receipt", staffMember: "Sarah Lim" },
  { id: "im-5", dateTime: "27 Apr 2025 15:47", sku: "HYP-00987", product: "Ibuprofen 200mg (100s)", brand: "HealthPlus", batch: "B250308", openingQty: 100, receivedQty: 0, reservedQty: 0, adjustedQty: -5, closingQty: 95, reason: "Damaged stock", staffMember: "Alex Ong" },
];

export interface InventoryAlert {
  id: string;
  sku: string;
  productName: string;
  brand: string;
  packSize: string;
  priority: "High" | "Medium" | "Low";
  currentStock: number;
  reorderLevel: number;
  daysRemaining?: number;
  demandTrend: "Increasing" | "Stable" | "Declining";
  trendPercentage: string;
  warehouse: string;
  aisle: string;
}

export const INVENTORY_ALERTS: InventoryAlert[] = [
  { id: "al-1", sku: "TIDE-1KG", productName: "Tide Laundry Detergent", brand: "Tide", packSize: "1 kg", priority: "High", currentStock: 8, reorderLevel: 50, demandTrend: "Increasing", trendPercentage: "+28% (last 4 weeks)", warehouse: "Main WH", aisle: "Aisle A3" },
  { id: "al-2", sku: "AASH-5KG", productName: "Aashirvaad Atta", brand: "Aashirvaad", packSize: "5 kg", priority: "Medium", currentStock: 12, reorderLevel: 40, demandTrend: "Stable", trendPercentage: "+5% (last 4 weeks)", warehouse: "West WH", aisle: "Aisle B1" },
  { id: "al-3", sku: "SONY-C500", productName: "Sony WF-C500 Earbuds", brand: "Sony", packSize: "1 unit", priority: "Medium", currentStock: 15, reorderLevel: 50, demandTrend: "Stable", trendPercentage: "+8% (last 4 weeks)", warehouse: "Main WH", aisle: "Aisle C2" },
  { id: "al-4", sku: "LAKME-SERUM", productName: "Lakmé 9to5 Serum", brand: "Lakmé", packSize: "30 ml", priority: "Low", currentStock: 28, reorderLevel: 30, daysRemaining: 16, demandTrend: "Increasing", trendPercentage: "+22% (last 4 weeks)", warehouse: "East WH", aisle: "Aisle D4" },
];

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  value: number;
  paymentMethod: "UPI" | "Card" | "COD" | "NetBanking";
  paymentUtr?: string;
  stage: "Packed" | "Picking" | "Out for delivery" | "Delivered" | "Exception";
  deliverySlot: string;
  date: string;
  warehouse: string;
  health: "On track" | "Review" | "Exception";
  itemsCount: number;
  items: { name: string; brand: string; qty: number; price: number; image?: string }[];
  timeline: { title: string; time: string; completed: boolean }[];
  notes: { id: string; author: string; time: string; content: string }[];
}

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "ord-88219",
    orderNumber: "HM-88219",
    customerName: "Meera K.",
    customerEmail: "meera.k@gmail.com",
    customerPhone: "+91 98765 43210",
    address: "B-302, Lake View Apartments, 28th Main Road, HSR Layout, Bengaluru 560102",
    value: 1246,
    paymentMethod: "UPI",
    paymentUtr: "UPI394820192",
    stage: "Out for delivery",
    deliverySlot: "Today, 4:00 PM – 6:00 PM",
    date: "12 Apr 2025, 10:24 AM",
    warehouse: "Bengaluru Hub",
    health: "On track",
    itemsCount: 8,
    items: [
      { name: "Tomato (Organically Grown)", brand: "FreshFields", qty: 2, price: 60 },
      { name: "Robusta Banana (1kg)", brand: "Nature's Pick", qty: 2, price: 40 },
      { name: "Amul Taaza Toned Milk (1 L)", brand: "Amul", qty: 1, price: 68 },
      { name: "Aashirvaad Atta (5 kg)", brand: "Aashirvaad", qty: 1, price: 245 },
      { name: "Fortune Sunflower Oil (1 L)", brand: "Fortune", qty: 1, price: 178 },
    ],
    timeline: [
      { title: "Paid", time: "12 Apr, 10:24 AM", completed: true },
      { title: "Picking", time: "12 Apr, 11:05 AM", completed: true },
      { title: "Packed", time: "12 Apr, 12:10 PM", completed: true },
      { title: "Out for delivery", time: "12 Apr, 2:35 PM", completed: true },
    ],
    notes: [
      { id: "n-1", author: "Anita S.", time: "12 Apr 2025, 12:15 PM", content: "Packed extra tissue pack as a goodwill gesture." },
      { id: "n-2", author: "Rohit K.", time: "12 Apr 2025, 11:02 AM", content: "Customer requested to ring bell twice." },
    ],
  },
  {
    id: "ord-1003287",
    orderNumber: "HM1003287",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@gmail.com",
    customerPhone: "+91 98765 43210",
    address: "A-502, Maple Apartments, Hitech City, Hyderabad 500081",
    value: 1299,
    paymentMethod: "UPI",
    stage: "Packed",
    deliverySlot: "Today, 10am – 12pm",
    date: "Today, 08:30 AM",
    warehouse: "Coimbatore DC",
    health: "On track",
    itemsCount: 5,
    items: [{ name: "Aashirvaad Atta 5kg", brand: "Aashirvaad", qty: 1, price: 279 }],
    timeline: [{ title: "Paid", time: "Today, 08:30 AM", completed: true }, { title: "Packed", time: "Today, 09:15 AM", completed: true }],
    notes: [],
  },
  {
    id: "ord-1003286",
    orderNumber: "HM1003286",
    customerName: "Rohan Mehta",
    customerEmail: "rohan.m@gmail.com",
    customerPhone: "+91 98765 11223",
    address: "Flat 12, Palm Grove, Mumbai",
    value: 2456,
    paymentMethod: "Card",
    stage: "Picking",
    deliverySlot: "Today, 12pm – 2pm",
    date: "Today, 09:12 AM",
    warehouse: "Chennai FC",
    health: "Review",
    itemsCount: 4,
    items: [{ name: "Sony WF-C500 Earbuds", brand: "Sony", qty: 1, price: 4990 }],
    timeline: [{ title: "Paid", time: "Today, 09:12 AM", completed: true }, { title: "Picking", time: "Today, 10:00 AM", completed: true }],
    notes: [],
  },
  {
    id: "ord-1003284",
    orderNumber: "HM1003284",
    customerName: "Karan Singh",
    customerEmail: "karan.s@gmail.com",
    customerPhone: "+91 98765 99887",
    address: "Plot 45, Jubilee Hills, Hyderabad",
    value: 3120,
    paymentMethod: "NetBanking",
    stage: "Exception",
    deliverySlot: "Today, 4pm – 6pm",
    date: "Today, 07:15 AM",
    warehouse: "Coimbatore DC",
    health: "Exception",
    itemsCount: 6,
    items: [{ name: "Lakmé Serum 30ml", brand: "Lakmé", qty: 2, price: 1198 }],
    timeline: [{ title: "Paid", time: "Today, 07:15 AM", completed: true }],
    notes: [{ id: "n-3", author: "Maria K.", time: "Today, 09:40 AM", content: "Payment mismatch flagged between NetBanking gateway and cart balance." }],
  },
];

export interface RefundClaim {
  id: string;
  orderNumber: string;
  customerName: string;
  customerCity: string;
  reason: string;
  amount: number;
  complaintId: string;
  policyEligibility: "Eligible" | "Needs review" | "Not eligible";
  approvalTier: "Support" | "Admin" | "Super admin";
  status: "Pending" | "Approved" | "Declined";
  date: string;
}

export const REFUND_CLAIMS: RefundClaim[] = [
  { id: "rf-1", orderNumber: "HM784321", customerName: "Priya Sharma", customerCity: "Bengaluru", reason: "Item not working", amount: 349, complaintId: "CP-44321", policyEligibility: "Eligible", approvalTier: "Support", status: "Pending", date: "12 Mar 2025" },
  { id: "rf-2", orderNumber: "HM784122", customerName: "Rahul Mehta", customerCity: "Mumbai", reason: "Wrong item delivered", amount: 1299, complaintId: "CP-44322", policyEligibility: "Eligible", approvalTier: "Admin", status: "Pending", date: "11 Mar 2025" },
  { id: "rf-3", orderNumber: "HM783991", customerName: "Ananya Iyer", customerCity: "Chennai", reason: "Damaged on arrival", amount: 2499, complaintId: "CP-44323", policyEligibility: "Eligible", approvalTier: "Super admin", status: "Pending", date: "10 Mar 2025" },
  { id: "rf-4", orderNumber: "HM783776", customerName: "Vikram Singh", customerCity: "Delhi", reason: "Received used item", amount: 899, complaintId: "CP-44324", policyEligibility: "Needs review", approvalTier: "Admin", status: "Pending", date: "09 Mar 2025" },
  { id: "rf-5", orderNumber: "HM783665", customerName: "Neha Kapoor", customerCity: "Pune", reason: "Item missing accessories", amount: 459, complaintId: "CP-44325", policyEligibility: "Eligible", approvalTier: "Support", status: "Pending", date: "08 Mar 2025" },
  { id: "rf-6", orderNumber: "HM783501", customerName: "Arjun Nair", customerCity: "Kochi", reason: "Changed my mind", amount: 1799, complaintId: "CP-44326", policyEligibility: "Not eligible", approvalTier: "Admin", status: "Pending", date: "07 Mar 2025" },
];

export interface PaymentRecord {
  id: string;
  dateTime: string;
  orderNumber: string;
  paymentUtr: string;
  method: "UPI" | "COD" | "Card" | "Refund";
  amount: number;
  status: "Success" | "Collected" | "Failed" | "Processed";
  reconciliationStatus: "Matched" | "Not matched" | "Exception";
  remarks: string;
}

export const PAYMENT_RECORDS: PaymentRecord[] = [
  { id: "pay-1", dateTime: "Apr 30, 2025 14:22", orderNumber: "ORD728391", paymentUtr: "UPI394820192", method: "UPI", amount: 1249, status: "Success", reconciliationStatus: "Matched", remarks: "Instant UPI settlement" },
  { id: "pay-2", dateTime: "Apr 30, 2025 12:11", orderNumber: "ORD728390", paymentUtr: "COD728390", method: "COD", amount: 2390, status: "Collected", reconciliationStatus: "Matched", remarks: "Cash verified by van agent" },
  { id: "pay-3", dateTime: "Apr 30, 2025 11:03", orderNumber: "ORD728389", paymentUtr: "PAY98347201", method: "Card", amount: 849, status: "Failed", reconciliationStatus: "Not matched", remarks: "Bank card declined by gateway" },
  { id: "pay-4", dateTime: "Apr 30, 2025 09:41", orderNumber: "ORD728388", paymentUtr: "REF728388", method: "Refund", amount: 1199, status: "Processed", reconciliationStatus: "Matched", remarks: "Refund credited to customer" },
  { id: "pay-5", dateTime: "Apr 29, 2025 21:16", orderNumber: "ORD728387", paymentUtr: "UPI394817221", method: "UPI", amount: 2760, status: "Success", reconciliationStatus: "Exception", remarks: "Amount mismatch detected" },
];

export interface AuditEvent {
  id: string;
  time: string;
  user: string;
  event: string;
  details: string;
}

export const AUDIT_EVENTS: AuditEvent[] = [
  { id: "aud-1", time: "Today, 12:41", user: "Dev K.", event: "Updated settings", details: "Changed delivery threshold to ₹499" },
  { id: "aud-2", time: "Today, 11:02", user: "Priya S.", event: "Updated product", details: "Edited details for HM-10234 (Atta 5kg)" },
  { id: "aud-3", time: "Today, 09:18", user: "Arjun M.", event: "Granted access", details: "Gave Warehouse manager role to Riya A." },
  { id: "aud-4", time: "Yesterday, 18:27", user: "Riya A.", event: "Login", details: "Successful login from Mumbai terminal" },
  { id: "aud-5", time: "Yesterday, 16:11", user: "Dev K.", event: "Updated refund rule", details: "Set auto-refund window to 5 days" },
];
