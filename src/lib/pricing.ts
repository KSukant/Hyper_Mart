// DATA_SPEC.md §5.2 — single source of truth for prices.
import { offers } from "@/mocks";
import type { Offer, Product } from "@/types";

export interface PriceInfo {
  mrp: number; price: number; finalPrice: number; memberPrice?: number; discountPct: number;
  offer?: Offer; perKg: boolean; saving: number;
}

const activeOffers = (p: Product, cityId: string, now: number) =>
  offers.filter((o) => o.productId === p.id && o.cityIds.includes(cityId) && Date.parse(o.startsAt) <= now && now < Date.parse(o.endsAt));

/** Everyday unit price: per kg for sold-by-weight (grade A / chosen grade), else product.price */
function basePrice(p: Product, grade?: "A" | "B" | "C") {
  const a = p.attrs;
  if (a.department === "food" && a.soldByWeight) {
    const g = a.grades?.find((x) => x.grade === (grade ?? "A"));
    return g?.pricePerKg ?? a.pricePerKg ?? p.price;
  }
  return p.price;
}

export function getPrice(p: Product, cityId: string, isMember: boolean, now: number, grade?: "A" | "B" | "C"): PriceInfo {
  const a = p.attrs;
  const perKg = a.department === "food" && a.soldByWeight;
  const price = basePrice(p, grade);
  const ratio = p.memberPrice !== undefined ? p.memberPrice / p.price : undefined;
  const productMember = p.memberPrice !== undefined ? (perKg ? Math.round(price * ratio!) : p.memberPrice) : undefined;

  let best: { offer?: Offer; offerPrice: number; member?: number } = { offerPrice: price, member: productMember };
  for (const o of activeOffers(p, cityId, now)) {
    const offerPrice = Math.round(price * (1 - o.discountPct / 100));
    const viaOffer = o.memberExtraPct ? Math.round(offerPrice * (1 - o.memberExtraPct / 100)) : undefined;
    const member = [productMember, viaOffer].filter((x): x is number => x !== undefined);
    const m = member.length ? Math.min(...member) : undefined;
    const score = isMember ? Math.min(offerPrice, m ?? offerPrice) : offerPrice;
    const bestScore = isMember ? Math.min(best.offerPrice, best.member ?? best.offerPrice) : best.offerPrice;
    if (score < bestScore || (!best.offer && score <= bestScore)) best = { offer: o, offerPrice, member: m };
  }
  const memberPrice = best.member !== undefined && best.member < best.offerPrice ? best.member : undefined;
  const finalPrice = isMember && memberPrice !== undefined ? memberPrice : best.offerPrice;
  const mrp = perKg ? Math.max(p.mrp, price) : p.mrp;
  const discountPct = mrp > finalPrice ? Math.round(((mrp - finalPrice) / mrp) * 100) : 0;
  return { mrp, price, finalPrice, memberPrice, discountPct, offer: best.offer, perKg, saving: Math.max(0, mrp - finalPrice) };
}

/** Line total for a cart line (sold-by-weight qty is in kg). */
export const lineTotal = (unitPrice: number, qty: number) => Math.round(unitPrice * qty);
