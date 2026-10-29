// Demo customers and orders for account, tracking and returns screens. All personal data is fictional.
import type { Customer, Order, Review } from "@/types";

const now = new Date();
const daysAgo = (n: number, h = 10) => { const d = new Date(now); d.setDate(d.getDate() - n); d.setHours(h, 0, 0, 0); return d.toISOString(); };
const dateOnly = (n: number) => { const d = new Date(now); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

export const demoCustomers: Customer[] = [
  {
    id: "cu-001", name: "Priya Raman", phone: "+91 98400 00001", email: "priya.demo@example.com", language: "en", isMember: true, memberSince: "2026-03-14",
    defaultAddressId: "ad-001",
    addresses: [
      { id: "ad-001", label: "Home", name: "Priya Raman", phone: "+91 98400 00001", line1: "Flat 804, Tower B, Green Meadows", line2: "Avinashi Road", landmark: "Opposite Fun Mall", area: "Peelamedu", city: "Coimbatore", state: "Tamil Nadu", pincode: "641004",
        access: { buildingType: "gated_community", floor: 8, lift: true, gateNote: "Enter through Gate 2; security will call the flat" } },
      { id: "ad-002", label: "Work", name: "Priya Raman", phone: "+91 98400 00001", line1: "3rd Floor, Tidel Park", area: "Peelamedu", city: "Coimbatore", state: "Tamil Nadu", pincode: "641004",
        access: { buildingType: "office", floor: 3, lift: true, gateNote: "Leave at reception desk" } },
    ],
    fitProfile: { heightCm: 162, usualTopSize: "M", usualWaist: 30, preferredFit: "Regular" },
    beautyProfile: { skinType: "combination", hairType: "wavy", preferredShades: ["Natural Beige 220", "Rosy Sunday MP2"] },
    savedDevices: [ { model: "iPhone 12", addedOn: "2026-05-02" } ],
    consents: { orderUpdates: true, offers: true, restock: true, whatsapp: true }, codRefusals: 0,
  },
  {
    id: "cu-002", name: "Arjun Menon", phone: "+91 98950 00002", email: "arjun.demo@example.com", language: "ml", isMember: false,
    defaultAddressId: "ad-003",
    addresses: [
      { id: "ad-003", label: "Home", name: "Arjun Menon", phone: "+91 98950 00002", line1: "House 21, Chakkaraparambu Road", landmark: "Near Edappally Church", area: "Edappally", city: "Kochi", state: "Kerala", pincode: "682024",
        access: { buildingType: "independent_house", doorstepHandover: true, accessibilityNote: "Elderly parent at home — please hand over at the door" } },
    ],
    consents: { orderUpdates: true, offers: false, restock: true, whatsapp: true }, codRefusals: 1,
  },
];

export const demoOrders: Order[] = [
  {
    id: "OD72845193",
    customerId: "cu-001",
    placedAt: "2025-03-12T10:24:00+05:30",
    cityId: "cbe",
    warehouseId: "wh-cbe-01",
    addressId: "ad-001",
    status: "out_for_delivery",
    lines: [
      {
        productId: "p-elec-003",
        variantKey: "16 GB RAM / 512 GB SSD",
        qty: 1,
        unitPrice: 54990,
        returnPolicyId: "rp-electronics",
        returnPolicyVersion: 1,
        serialNo: "SN4Z8X7Q1P3",
        lineStatus: "out_for_delivery",
      },
    ],
    charges: { itemsTotal: 54990, delivery: 0, coldChain: 0, heavy: 0, cod: 0, discount: 0, total: 54990 },
    payment: { method: "upi", status: "paid", reference: "UPI-INV72845193" },
    slot: { date: "2025-03-13", slotId: "s-14" },
    timeline: [
      { status: "placed", at: "2025-03-12T10:24:00+05:30" },
      { status: "confirmed", at: "2025-03-12T10:25:00+05:30" },
      { status: "packed", at: "2025-03-12T18:40:00+05:30" },
      { status: "out_for_delivery", at: "2025-03-13T09:10:00+05:30" },
    ],
  },
  {
    id: "OD12897654",
    customerId: "cu-001",
    placedAt: "2025-04-24T10:14:00+05:30",
    cityId: "cbe",
    warehouseId: "wh-cbe-01",
    addressId: "ad-001",
    status: "confirmed",
    lines: [
      {
        productId: "p-fash-001",
        variantKey: "L|Blue",
        qty: 1,
        unitPrice: 1299,
        returnPolicyId: "rp-fashion",
        returnPolicyVersion: 1,
        lineStatus: "confirmed",
      },
    ],
    charges: { itemsTotal: 1299, delivery: 40, coldChain: 0, heavy: 0, cod: 0, discount: 105, total: 1234 },
    payment: { method: "upi", status: "paid", reference: "UPI-DEMO-772911" },
    slot: { date: "2025-04-25", slotId: "s-09" },
    timeline: [
      { status: "placed", at: "2025-04-24T10:14:00+05:30" },
      { status: "confirmed", at: "2025-04-24T10:15:00+05:30" },
    ],
  },
  {
    id: "OD12345678",
    customerId: "cu-001",
    placedAt: "2025-04-12T10:24:00+05:30",
    cityId: "cbe",
    warehouseId: "wh-cbe-01",
    addressId: "ad-001",
    status: "delivered",
    lines: [
      {
        productId: "p-food-001",
        variantKey: "default",
        qty: 1,
        unitPrice: 69,
        grade: "A",
        ripeness: "ready_to_eat",
        substitution: "ask",
        actualWeight: "520 g",
        shelfLife: "4–6 days",
        batchNo: "TM250412A",
        returnPolicyId: "rp-fresh",
        returnPolicyVersion: 1,
        lineStatus: "delivered",
      },
    ],
    charges: { itemsTotal: 69, delivery: 40, coldChain: 20, heavy: 0, cod: 0, discount: 11, total: 118 },
    payment: { method: "upi", status: "paid", reference: "UPI-DEMO-991823" },
    slot: { date: "2025-04-12", slotId: "s-17" },
    timeline: [
      { status: "placed", at: "2025-04-12T10:24:00+05:30" },
      { status: "confirmed", at: "2025-04-12T10:25:00+05:30" },
      { status: "picking", at: "2025-04-12T11:00:00+05:30" },
      { status: "packed", at: "2025-04-12T11:30:00+05:30" },
      { status: "out_for_delivery", at: "2025-04-12T13:15:00+05:30" },
      { status: "delivered", at: "2025-04-12T16:42:00+05:30" },
    ],
  },
  {
    id: "HM-2026-10-000123", customerId: "cu-001", placedAt: daysAgo(0, 9), cityId: "cbe", warehouseId: "wh-cbe-01", addressId: "ad-001", status: "out_for_delivery",
    lines: [
      { productId: "p-food-001", variantKey: "default", qty: 1, unitPrice: 36, returnPolicyId: "rp-fresh", returnPolicyVersion: 1, batchNo: "B23411", lineStatus: "out_for_delivery" },
      { productId: "p-food-003", variantKey: "default", qty: 2, unitPrice: 54, returnPolicyId: "rp-perishable", returnPolicyVersion: 1, batchNo: "B55102", lineStatus: "out_for_delivery" },
      { productId: "p-food-007", variantKey: "default", qty: 1, unitPrice: 89, returnPolicyId: "rp-perishable", returnPolicyVersion: 1, batchNo: "B11873", lineStatus: "out_for_delivery" },
    ],
    charges: { itemsTotal: 233, delivery: 0, coldChain: 15, heavy: 0, cod: 0, discount: 0, total: 248 },
    payment: { method: "upi", status: "paid", reference: "UPI-DEMO-882731" },
    slot: { date: dateOnly(0), slotId: "s-17" },
    timeline: [ { status: "placed", at: daysAgo(0, 9) }, { status: "confirmed", at: daysAgo(0, 9) }, { status: "picking", at: daysAgo(0, 13) }, { status: "packed", at: daysAgo(0, 15), note: "Cold pack added" }, { status: "out_for_delivery", at: daysAgo(0, 17) } ],
  },
  {
    id: "HM-2026-10-000098", customerId: "cu-001", placedAt: daysAgo(4), cityId: "cbe", warehouseId: "wh-cbe-01", addressId: "ad-001", status: "delivered",
    lines: [
      { productId: "p-fash-001", variantKey: "M|Ivory", qty: 1, unitPrice: 1199, returnPolicyId: "rp-fashion", returnPolicyVersion: 1, lineStatus: "delivered" },
      { productId: "p-beau-001", variantKey: "shade:MP2", qty: 1, unitPrice: 529, returnPolicyId: "rp-beauty-sealed", returnPolicyVersion: 1, batchNo: "BT40021", lineStatus: "delivered" },
    ],
    charges: { itemsTotal: 1728, delivery: 0, coldChain: 0, heavy: 0, cod: 0, discount: 0, total: 1728 },
    payment: { method: "card", status: "paid", reference: "CARD-DEMO-551920" },
    slot: { date: dateOnly(-2), slotId: "s-19" },
    timeline: [ { status: "placed", at: daysAgo(4) }, { status: "confirmed", at: daysAgo(4) }, { status: "packed", at: daysAgo(3) }, { status: "out_for_delivery", at: daysAgo(2, 18) }, { status: "delivered", at: daysAgo(2, 19) } ],
  },
  {
    id: "HM-2026-10-000071", customerId: "cu-001", placedAt: daysAgo(9), cityId: "cbe", warehouseId: "wh-cbe-01", addressId: "ad-001", status: "delivered",
    lines: [ { productId: "p-elec-002", variantKey: "default", qty: 1, unitPrice: 26490, returnPolicyId: "rp-large-appliance", returnPolicyVersion: 1, serialNo: "LG-DEMO-7781230", lineStatus: "delivered" } ],
    charges: { itemsTotal: 26490, delivery: 0, coldChain: 0, heavy: 0, cod: 0, discount: 0, total: 26490 },
    payment: { method: "upi", status: "paid", reference: "UPI-DEMO-300141" },
    slot: { date: dateOnly(-6), slotId: "s-09" },
    timeline: [ { status: "placed", at: daysAgo(9) }, { status: "confirmed", at: daysAgo(9) }, { status: "packed", at: daysAgo(8) }, { status: "out_for_delivery", at: daysAgo(6, 9) }, { status: "delivered", at: daysAgo(6, 11), note: "Installed by technician Ravi K." } ],
  },
  {
    id: "HM-2026-10-000140", customerId: "cu-002", placedAt: daysAgo(1), cityId: "kochi", warehouseId: "wh-kochi-01", addressId: "ad-003", status: "confirmed",
    lines: [
      { productId: "p-food-008", variantKey: "default", qty: 2, unitPrice: 105, returnPolicyId: "rp-packaged-food", returnPolicyVersion: 1, lineStatus: "confirmed" },
      { productId: "p-food-005", variantKey: "default", qty: 1, unitPrice: 769, returnPolicyId: "rp-packaged-food", returnPolicyVersion: 1, lineStatus: "confirmed" },
    ],
    charges: { itemsTotal: 979, delivery: 0, coldChain: 0, heavy: 99, cod: 25, discount: 0, total: 1103 },
    payment: { method: "cod", status: "cod_due" },
    slot: { date: dateOnly(1), slotId: "s-09" },
    timeline: [ { status: "placed", at: daysAgo(1) }, { status: "confirmed", at: daysAgo(1), note: "COD confirmed on WhatsApp" } ],
  },
];

export const reviews: Review[] = [
  { id: "rv-1", productId: "p-food-001", customerName: "Lakshmi S.", rating: 5, title: "Exactly the ripeness I picked", body: "Chose 'raw' and they lasted the whole week.", date: daysAgo(3), verifiedPurchase: true, tags: ["Fresh", "Grade as described"] },
  { id: "rv-2", productId: "p-food-001", customerName: "Karthik R.", rating: 3, title: "Two were soft", body: "Reported two soft tomatoes with a photo and got ₹8 back the same day.", date: daysAgo(10), verifiedPurchase: true, tags: ["Partial refund"] },
  { id: "rv-3", productId: "p-fash-001", customerName: "Vignesh P.", rating: 4, title: "Good fabric, slightly long", body: "Soft cotton. Runs a little long for my height (170 cm).", date: daysAgo(6), verifiedPurchase: true, tags: ["True to size", "Fabric: soft"] },
  { id: "rv-4", productId: "p-fash-003", customerName: "Rahul D.", rating: 5, title: "Perfect fit", body: "Same size as my old 511s.", date: daysAgo(15), verifiedPurchase: true, tags: ["True to size"] },
  { id: "rv-5", productId: "p-beau-001", customerName: "Priya R.", rating: 4, title: "Shade matched the preview", body: "Rosy Sunday looks the same as the natural-light swatch.", date: daysAgo(1), verifiedPurchase: true, tags: ["Shade matched"] },
  { id: "rv-6", productId: "p-beau-003", customerName: "Ananya K.", rating: 5, title: "Tried the mini first", body: "Bought the 10 ml mini, then the full size. No irritation after a patch test.", date: daysAgo(20), verifiedPurchase: true, tags: ["Suited me"] },
  { id: "rv-7", productId: "p-elec-002", customerName: "Priya R.", rating: 5, title: "Smooth delivery and install", body: "Two-person delivery to the 8th floor and installed the same day.", date: daysAgo(5), verifiedPurchase: true, tags: ["Installation on time"] },
  { id: "rv-8", productId: "p-elec-003", customerName: "Sanjay M.", rating: 4, title: "Great for college", body: "Fast for coding and classes. Not for heavy games, as the page said.", date: daysAgo(12), verifiedPurchase: true, tags: ["Matches 'Best for'"] },
  { id: "rv-9", productId: "p-elec-008", customerName: "Divya N.", rating: 4, title: "Grade was accurate", body: "Light marks on the frame as described; battery showed 87%.", date: daysAgo(8), verifiedPurchase: true, tags: ["Condition as described"] },
];
