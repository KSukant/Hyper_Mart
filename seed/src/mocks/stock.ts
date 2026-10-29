// Mock data for development only.
// Stock is generated deterministically (same numbers every run) and then specific overrides are applied
// so that every UI state can be seen: in stock, low stock (≤5), out of stock with restock date, and
// "not stocked in this city" (no Stock row at all).
import type { Stock, Product } from "@/types";
import { products } from "./products";
import { warehouses } from "./geo";

/** Variant key format — use these helpers everywhere:
 *  - plain products:         "default"
 *  - fashion size + colour:  "M|Navy"
 *  - beauty shade:           "shade:MR1"                                          */
export const variantKey = {
  default: () => "default",
  fashion: (size: string, colour: string) => `${size}|${colour}`,
  shade: (code: string) => `shade:${code}`,
};

export function variantKeysFor(p: Product): string[] {
  const a = p.attrs;
  if (a.department === "fashion") return a.sizes.flatMap((s) => a.colours.map((c) => variantKey.fashion(s, c.name)));
  if (a.department === "beauty" && a.shades?.length) return a.shades.map((s) => variantKey.shade(s.code));
  return [variantKey.default()];
}

// Small deterministic pseudo-random number from a string
const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

const today = new Date();
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };

function batchFor(p: Product, wh: string): Stock["batch"] | undefined {
  const a = p.attrs;
  if (a.department === "food") {
    const remaining = Math.max(a.minRemainingShelfLifeDays, Math.round(a.shelfLifeDays * 0.7));
    return { batchNo: `B${hash(p.id + wh) % 90000 + 10000}`, mfgDate: addDays(-(a.shelfLifeDays - remaining)), expiryDate: addDays(remaining) };
  }
  if (a.department === "beauty") {
    return { batchNo: `BT${hash(p.id + wh) % 90000 + 10000}`, mfgDate: addDays(-120), expiryDate: addDays(600) };
  }
  return undefined;
}

// Products deliberately NOT stocked in a city (shows "Not available in your city")
const notStocked: Record<string, string[]> = {
  "wh-kochi-01": ["p-fash-002"], // silk saree not stocked in Kochi
  "wh-cbe-01": ["p-elec-008"], // refurbished iPhone not in Coimbatore
};

// Explicit overrides: [productId, warehouseId, variantKey, available, restockInDays?]
const overrides: [string, string, string, number, number?][] = [
  ["p-food-007", "wh-cbe-01", "default", 4], // low stock → "Only 4 left in your city"
  ["p-food-005", "wh-che-01", "default", 0, 2], // out of stock, restock in 2 days
  ["p-fash-001", "wh-cbe-01", "M|Maroon", 2],
  ["p-fash-001", "wh-cbe-01", "XL|Navy", 0, 5],
  ["p-fash-005", "wh-blr-01", "4XL|Indigo", 0, 10], // drives "Notify me when this size is available"
  ["p-fash-008", "wh-cbe-01", "M|Olive", 1], // clearance — only 1 left
  ["p-beau-001", "wh-cbe-01", "shade:MR4", 0, 7],
  ["p-beau-002", "wh-blr-01", "shade:355", 3],
  ["p-elec-002", "wh-kochi-01", "default", 2],
  ["p-elec-003", "wh-che-01", "default", 0, 4],
];

const base: Stock[] = [];
for (const p of products) {
  for (const w of warehouses) {
    if (notStocked[w.id]?.includes(p.id)) continue;
    for (const vk of variantKeysFor(p)) {
      const h = hash(p.id + w.id + vk);
      const available = p.department === "electronics" ? 6 + (h % 20) : 10 + (h % 60);
      base.push({ productId: p.id, warehouseId: w.id, variantKey: vk, available, reserved: h % 3, batch: batchFor(p, w.id) });
    }
  }
}

for (const [productId, warehouseId, vk, available, restock] of overrides) {
  const row = base.find((s) => s.productId === productId && s.warehouseId === warehouseId && s.variantKey === vk);
  if (row) { row.available = available; row.reserved = 0; if (restock !== undefined) row.restockDate = addDays(restock); }
}

// Near-expiry batch for the yogurt offer in Coimbatore and Chennai (best before in 4 days)
for (const wh of ["wh-cbe-01", "wh-che-01"]) {
  const row = base.find((s) => s.productId === "p-food-007" && s.warehouseId === wh);
  if (row?.batch) row.batch.expiryDate = addDays(4);
}

export const stock: Stock[] = base;

export const LOW_STOCK_THRESHOLD = 5;
