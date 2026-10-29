import type { Product, Department } from "@/types";
import { allProducts, brandName, getCategory, isStockedIn, getStock } from "./catalog";

export type SortKey = "relevance" | "price_asc" | "price_desc" | "rating" | "new";

export function searchProducts(q: string, warehouseId: string, opts: { department?: Department | ""; } = {}) {
  const query = q.trim().toLowerCase().replace(/\s+/g, " ");
  const scored: { p: Product; score: number }[] = [];
  for (const p of allProducts()) {
    if (opts.department && p.department !== opts.department) continue;
    let score = query ? 0 : 1;
    if (query) {
      const name = p.name.toLowerCase();
      if (name.startsWith(query)) score = 100;
      else if (name.includes(query)) score = 80;
      else if (brandName(p).toLowerCase().includes(query)) score = 60;
      else if (p.tags.some((t) => t.toLowerCase().includes(query)) || getCategory(p.categoryId)?.name.toLowerCase().includes(query)) score = 40;
      else if (query.split(" ").every((w) => (name + " " + p.tags.join(" ")).includes(w))) score = 20;
    }
    if (score > 0) scored.push({ p, score });
  }
  const inCity = scored.filter((s) => isStockedIn(s.p, warehouseId));
  const elsewhere = scored.filter((s) => !isStockedIn(s.p, warehouseId)).map((s) => s.p);
  inCity.sort((a, b) => {
    const oa = getStock(a.p.id, warehouseId).status === "out" ? 1 : 0, ob = getStock(b.p.id, warehouseId).status === "out" ? 1 : 0;
    return oa - ob || b.score - a.score || b.p.ratingCount - a.p.ratingCount;
  });
  return { results: inCity.map((s) => s.p), elsewhere };
}
