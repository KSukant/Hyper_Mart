// HyperMart shared types. Keep names stable — every app and screen depends on them.
// All money is integer rupees (₹). All dates/times are ISO 8601 strings in IST (+05:30).

/* ───────────── Basic ───────────── */
export type ID = string;
export type ISODate = string; // "2026-10-28" or "2026-10-28T14:00:00+05:30"
export type Rupees = number; // integer rupees, never paise, never decimals

export type Department = "food" | "fashion" | "beauty" | "electronics";
export type Language = "en" | "ta" | "hi" | "ml" | "kn";

/* ───────────── Location ───────────── */
export interface City {
  id: ID; // "cbe"
  name: string; // "Coimbatore"
  state: string; // "Tamil Nadu"
  stateCode: string; // "TN"
  languages: Language[]; // shown in the language switcher for this city
  launched: boolean;
}

export interface Warehouse {
  id: ID; // "wh-cbe-01"
  cityId: ID;
  name: string; // "HyperMart Coimbatore Fulfilment Centre"
  address: Address;
  fssaiLicence: string; // DEMO value; real number must come from the business
  sameDayCutoff: string; // "14:00" — fresh orders before this time can come today
  openHours: { from: string; to: string }; // dispatch hours
  zones: StorageZone[];
  dailyOrderCapacity: number;
}

export type StorageZone = "ambient" | "chilled" | "frozen" | "fashion" | "beauty_secure" | "electronics" | "heavy" | "restricted";

export interface PincodeArea {
  pincode: string; // 6 digits
  area: string; // "Peelamedu"
  cityId: ID | null; // null when not serviceable
  warehouseId: ID | null;
  serviceable: boolean;
  distanceBand: "A" | "B" | "C"; // A = within 8 km of warehouse, B = 8–15 km, C = 15–25 km
  sameDayFresh: boolean; // whether fresh same-day delivery is offered here
}

export interface Address {
  line1: string;
  line2?: string;
  landmark?: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

/* ───────────── Catalogue ───────────── */
export interface DepartmentInfo {
  id: Department;
  name: string; // "Food and Groceries"
  shortName: string; // "Food"
  tagline: string; // "Fresh, staples, dairy and more"
  colorToken: string; // css token name: "food"
  icon: string; // lucide icon name
  deliveryNote: string; // shown on category tile
  sortOrder: number;
}

export interface Category {
  id: ID; // "food-fresh-vegetables"
  department: Department;
  parentId: ID | null; // null for top-level within a department
  name: string;
  slug: string;
  icon?: string;
  returnPolicyId: ID; // default return policy for this category
  sortOrder: number;
}

export interface Brand {
  id: ID;
  name: string;
  departments: Department[];
  authorisedSource: "brand_direct" | "authorised_distributor" | "own_sourcing";
  evidenceValidTill?: ISODate; // brand / distributor authorisation expiry (beauty and electronics)
  customerCare?: string;
}

export interface ReturnPolicy {
  id: ID;
  type: "returnable" | "exchange_only" | "non_returnable" | "returnable_if_sealed" | "quality_complaint_only" | "replacement_only";
  windowDays: number; // 0 for non-returnable; quality complaints use windowHours
  windowHours?: number;
  label: string; // exact customer-facing text: "7-day return"
  conditions: string[]; // bullet list shown on product page and checkout
  evidenceRequired: ("photo" | "unboxing_video" | "serial_photo" | "none")[];
  refundMethod: "original_payment" | "original_payment_or_store_credit" | "replacement";
  version: number; // stored on every order line at checkout
}

export interface ProductImage {
  src: string; // "/products/food/tomato-1.jpg"
  alt: string;
  kind: "main" | "angle" | "detail" | "label" | "scale" | "natural_light" | "lifestyle";
}

export interface Product {
  id: ID;
  slug: string;
  name: string;
  brandId: ID;
  soldBy: "HyperMart"; // always
  department: Department;
  categoryId: ID;
  description: string;
  highlights: string[]; // 3–5 short bullet points
  images: ProductImage[];
  unit: string; // "1 kg", "500 g", "1 L", "1 pc", "per kg"
  mrp: Rupees;
  price: Rupees; // everyday selling price before offers
  memberPrice?: Rupees; // HyperMart Rewards price
  gstRatePct: 0 | 5 | 12 | 18 | 28;
  hsn: string;
  rating: number; // 0–5, one decimal
  ratingCount: number;
  returnPolicyId: ID;
  manufacturer: { name: string; address: string; countryOfOrigin: string };
  weightKg: number; // shipping weight
  packedDimensionsCm: { l: number; w: number; h: number };
  handling: HandlingTag[];
  codAllowed: boolean;
  maxQtyPerOrder: number;
  tags: string[]; // search keywords
  isNew?: boolean;
  attrs: FoodAttrs | FashionAttrs | BeautyAttrs | ElectronicsAttrs;
}

export type HandlingTag = "chilled" | "frozen" | "fragile" | "liquid" | "leak_prone" | "glass" | "heat_sensitive" | "heavy" | "two_person" | "restricted_flammable" | "restricted_battery" | "high_value";

/* ── Department attributes (discriminated by `department`) ── */
export interface FoodAttrs {
  department: "food";
  vegMark: "veg" | "nonveg" | "egg";
  storage: "ambient" | "chilled" | "frozen";
  soldByWeight: boolean;
  pricePerKg?: Rupees; // only when soldByWeight
  weightOptionsKg?: number[]; // e.g. [0.25, 0.5, 1, 2]
  grades?: { grade: "A" | "B" | "C"; pricePerKg: Rupees; note: string }[];
  ripenessOptions?: ("raw" | "ready_to_eat" | "very_ripe")[];
  shelfLifeDays: number; // total shelf life
  minRemainingShelfLifeDays: number; // never ship with less than this
  ingredients?: string;
  allergens: string[]; // [] when none; ["Not provided"] when unknown
  nutritionPer100g?: Record<string, string>;
  fssaiOnPack?: string; // brand's FSSAI number from label (demo)
  substitutable: boolean;
  subscribable: boolean;
  regional?: string; // "Kerala"
}

export interface FashionAttrs {
  department: "fashion";
  gender: "men" | "women" | "kids" | "unisex";
  sizes: string[]; // "S","M","L" — stock per size/colour is in the Stock table
  sizeSystem: "alpha" | "waist" | "uk_shoe" | "age" | "free";
  colours: { name: string; hex: string }[];
  fabric: string; // "100% cotton"
  feel: { softness: "Soft" | "Medium" | "Crisp"; thickness: "Light" | "Medium" | "Heavy"; stretch: "None" | "Low" | "Medium" | "High"; transparency: "Opaque" | "Semi-sheer" | "Sheer"; drape: "Structured" | "Regular" | "Fluid" };
  fit: "Slim" | "Regular" | "Relaxed" | "Oversized";
  care: string[];
  modelInfo?: { heightCm: number; sizeWorn: string };
  sizeChart: { size: string; [measurementCm: string]: string | number }[];
  specialtySizes?: ("plus" | "petite" | "maternity" | "kids")[];
  rentable?: { perDay: Rupees; deposit: Rupees; minDays: number };
  clearance?: boolean;
}

export interface BeautyAttrs {
  department: "beauty";
  shades?: { name: string; code: string; hex: string; undertone?: "warm" | "cool" | "neutral" }[];
  skinTypes?: ("oily" | "dry" | "combination" | "normal" | "sensitive")[];
  hairTypes?: ("straight" | "wavy" | "curly" | "coily" | "all")[];
  ingredients: string; // full INCI list or "Not provided by the manufacturer"
  keyIngredients: string[];
  allergens: string[];
  mayContain?: string[];
  patchTest: boolean;
  usage: { quantity: string; frequency: string; method: string; order?: string };
  precautions: string[];
  whoShouldAvoid?: string[];
  documentedConflicts?: string[]; // manufacturer-stated only
  claims: { text: string; verified: boolean }[];
  sampleProductId?: ID;
  fullSizeProductId?: ID; // for sample products
  heatSensitive: boolean;
  batchTracked: true;
  periodAfterOpeningMonths?: number;
}

export interface ElectronicsAttrs {
  department: "electronics";
  model: string;
  specs: { label: string; value: string }[];
  warranty: { months: number; provider: string; coverage: string; exclusions: string[] };
  bestFor?: { useCase: UseCase; verdict: "best" | "limited" | "not_recommended"; reason: string }[];
  compatibleModels?: { model: string; status: "compatible" | "not_compatible" | "unknown" }[];
  productDimensionsCm?: { w: number; h: number; d: number };
  clearanceCm?: { sides: number; back: number; top: number };
  siteRequirements?: string[];
  installation?: { required: boolean; fee: Rupees; note: string };
  exchangeEligible?: boolean;
  refurbished?: { grade: "Like new" | "Good" | "Fair"; batteryHealthPct?: number; testedChecks: string[]; refurbWarrantyMonths: number };
  serialTracked: boolean;
  ownershipCosts?: { item: string; price: Rupees | null; source: string; asOf: ISODate }[];
}

export type UseCase = "study" | "office" | "gaming" | "editing" | "streaming" | "calls" | "photography";

export interface Stock {
  productId: ID;
  warehouseId: ID;
  variantKey: string; // "default", "M|Navy", "shade:Crimson Touch"
  available: number; // saleable units
  reserved: number;
  batch?: { batchNo: string; mfgDate: ISODate; expiryDate: ISODate }; // food & beauty
  restockDate?: ISODate; // shown when available = 0
}

/* ───────────── Offers and pricing ───────────── */
export interface Offer {
  id: ID;
  productId: ID;
  cityIds: ID[]; // which cities see it
  type: "deal" | "near_expiry" | "clearance" | "member";
  label: string; // badge text: "Deal of the day", "Near-expiry", "Clearance", "Member deal"
  discountPct: number; // off `price`
  memberExtraPct?: number; // extra for members
  startsAt: ISODate;
  endsAt: ISODate;
  stockLimit?: number;
  claimedCount?: number; // units already sold under this offer — for the "38 of 200 claimed" bar on deals
  perCustomerLimit?: number;
  conditionNote?: string; // "Best before 30 Oct" / "Exchange only"
}

export interface HeroSlide {
  id: ID;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  background: "primary" | "accent-tint" | "primary-tint";
  cityIds: ID[] | "all";
}

/* ───────────── Rules ───────────── */
export interface DeliveryRules {
  freeDeliveryThreshold: Rupees;
  memberFreeDeliveryThreshold: Rupees;
  baseFeeByBand: Record<"A" | "B" | "C", Rupees>;
  coldChainFee: Rupees; // once per order if any chilled/frozen item
  heavyItemFee: Rupees; // per heavy item
  twoPersonFee: Rupees; // per two-person item
  smallOrderMinimum: Rupees; // below this, order cannot be placed
  leadDaysByDepartment: Record<Department, number>; // days after order (0 = same day)
  maxDistanceForHeatSensitiveBand: "A" | "B" | "C";
}

export interface DeliverySlot {
  id: ID;
  label: string; // "7 AM – 9 AM"
  from: string; // "07:00"
  to: string; // "09:00"
  sameDayAllowed: boolean;
  allowedHandling: ("standard" | "chilled" | "heavy" | "heat_sensitive")[];
  capacityPerWarehouse: number;
}

export interface CodRules {
  enabled: boolean;
  fee: Rupees;
  maxOrderValue: Rupees;
  confirmationAbove: Rupees; // WhatsApp/OTP confirmation needed above this
  blockedProductIds: ID[];
  prepaidOnlyAbovePerItem: Rupees;
  maxRefusalsBeforePrepaidOnly: number;
}

export interface MembershipPlan {
  id: ID;
  name: string;
  priceYearly: Rupees;
  priceMonthly: Rupees;
  benefits: string[];
  trialDays: number;
}

export interface PaymentMethod {
  id: "upi" | "card" | "netbanking" | "wallet" | "cod";
  label: string;
  description: string;
  enabled: boolean;
}

/* ───────────── Customer side ───────────── */
export interface Customer {
  id: ID;
  name: string;
  phone: string; // "+91 98xxxxxx01" — demo only
  email: string;
  language: Language;
  isMember: boolean;
  memberSince?: ISODate;
  addresses: SavedAddress[];
  defaultAddressId: ID;
  fitProfile?: { heightCm: number; usualTopSize: string; usualWaist: number; preferredFit: FashionAttrs["fit"] };
  beautyProfile?: { skinType: string; hairType: string; preferredShades: string[] };
  savedDevices?: { model: string; addedOn: ISODate }[];
  consents: { orderUpdates: true; offers: boolean; restock: boolean; whatsapp: boolean };
  codRefusals: number;
}

export interface SavedAddress extends Address {
  id: ID;
  label: "Home" | "Work" | "Other";
  name: string;
  phone: string;
  access?: {
    buildingType: "independent_house" | "apartment" | "gated_community" | "office";
    floor?: number;
    lift?: boolean;
    gateNote?: string;
    doorstepHandover?: boolean;
    accessibilityNote?: string;
  };
}

export interface CartItem {
  productId: ID;
  variantKey: string;
  qty: number; // for soldByWeight items, qty is in kg (0.25 steps)
  substitution?: "ask" | "skip" | "similar";
  grade?: "A" | "B" | "C";
  ripeness?: "raw" | "ready_to_eat" | "very_ripe";
  subscription?: { frequency: "daily" | "alternate_days" | "weekly"; days?: string[]; startDate: ISODate };
  gift?: { recipientName: string; message: string; hidePrice: boolean };
}

export type OrderStatus = "placed" | "confirmed" | "picking" | "packed" | "out_for_delivery" | "delivered" | "cancelled" | "partially_delivered";

export interface Order {
  id: ID; // "HM-2026-10-000123"
  customerId: ID;
  placedAt: ISODate;
  cityId: ID;
  warehouseId: ID;
  addressId: ID;
  status: OrderStatus;
  lines: {
    productId: ID;
    variantKey: string;
    qty: number;
    unitPrice: Rupees;
    returnPolicyId: ID;
    returnPolicyVersion: number;
    batchNo?: string;
    serialNo?: string;
    lineStatus: OrderStatus | "returned" | "refunded" | "substituted";
  }[];
  charges: { itemsTotal: Rupees; delivery: Rupees; coldChain: Rupees; heavy: Rupees; cod: Rupees; discount: Rupees; total: Rupees };
  payment: { method: PaymentMethod["id"]; status: "pending" | "paid" | "failed" | "cod_due" | "cod_collected" | "refunded" | "partially_refunded"; reference?: string };
  slot: { date: ISODate; slotId: ID };
  timeline: { status: OrderStatus; at: ISODate; note?: string }[];
}

export interface Review {
  id: ID;
  productId: ID;
  customerName: string; // first name + initial
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: ISODate;
  verifiedPurchase: true; // only verified buyers can review
  tags?: string[]; // "True to size", "Shade matched", "Fresh"
}

export interface Faq {
  id: ID;
  topic: "delivery" | "payment" | "returns" | "membership" | "freshness" | "electronics_services" | "account";
  question: string;
  answer: string;
}
