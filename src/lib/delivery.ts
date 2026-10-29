// DATA_SPEC.md §6.1 delivery dates, slots and charges.
import { deliveryRules, deliverySlots, codRules, warehouses } from "@/mocks";
import type { Product, PincodeArea, CartItem, DeliverySlot } from "@/types";
import { addDays, isoDay } from "./format";
import { getProductById } from "./catalog";
import { getPrice } from "./pricing";

export interface DeliveryPromise { type: "today" | "date" | "not_serviceable"; date?: string; orderWithinMs?: number }

const cutoffMs = (warehouseId: string | null, now: Date) => {
  const wh = warehouses.find((w) => w.id === warehouseId);
  const [h, m] = (wh?.sameDayCutoff ?? "14:00").split(":").map(Number);
  const c = new Date(now); c.setHours(h, m, 0, 0);
  return c.getTime() - now.getTime();
};

/** Days after today the product can arrive. */
export function leadDays(p: Product, area: PincodeArea, now: Date) {
  if (p.department === "food") return area.sameDayFresh && cutoffMs(area.warehouseId, now) > 0 ? 0 : 1;
  let d = deliveryRules.leadDaysByDepartment[p.department];
  if (p.handling.includes("two_person")) d = 3;
  // fashion & electronics don't deliver on Sunday
  if (p.department === "fashion" || p.department === "electronics") {
    const day = addDays(now, d);
    if (day.getDay() === 0) d += 1;
  }
  return d;
}

export function getDeliveryPromise(p: Product, area: PincodeArea, now: Date): DeliveryPromise {
  if (!area.serviceable) return { type: "not_serviceable" };
  const d = leadDays(p, area, now);
  if (d === 0) return { type: "today", date: isoDay(now), orderWithinMs: cutoffMs(area.warehouseId, now) };
  return { type: "date", date: isoDay(addDays(now, d)) };
}

type Handling = DeliverySlot["allowedHandling"][number];
const handlingOf = (p: Product): Handling[] => {
  const h: Handling[] = [];
  if (p.handling.includes("chilled") || p.handling.includes("frozen")) h.push("chilled");
  if (p.handling.includes("heavy") || p.handling.includes("two_person")) h.push("heavy");
  if (p.handling.includes("heat_sensitive")) h.push("heat_sensitive");
  return h.length ? h : ["standard"];
};

/** Slots usable for a set of products on a given date. */
export function getAvailableSlots(items: Product[], area: PincodeArea, date: string, now: Date) {
  const sameDay = date === isoDay(now);
  const need = new Set(items.flatMap(handlingOf));
  return deliverySlots.map((s) => {
    const okHandling = [...need].every((h) => s.allowedHandling.includes(h));
    const [sh] = s.from.split(":").map(Number);
    const okTime = !sameDay || (s.sameDayAllowed && area.sameDayFresh && cutoffMs(area.warehouseId, now) > 0 && now.getHours() < sh - 1);
    return { ...s, available: okHandling && okTime, reason: !okHandling ? "Not suitable for these items" : !okTime ? "Not available today" : undefined };
  });
}

export interface Charges {
  itemsTotal: number; mrpTotal: number; discount: number; memberSaving: number; delivery: number; coldChain: number; heavy: number;
  twoPerson: number; twoPersonWaived: boolean; cod: number; giftWrap: number; installation: number; taxInclusive: number;
  total: number; freeDeliveryGap: number; threshold: number; belowMinimum: number;
}

export function getCartCharges(
  items: CartItem[], area: PincodeArea, cityId: string, isMember: boolean, now: number,
  opts: { cod?: boolean; giftWrap?: boolean; installation?: boolean } = {},
): Charges {
  let itemsTotal = 0, mrpTotal = 0, nonMemberTotal = 0, cold = false, heavy = 0, twoPerson = 0, taxInclusive = 0, installationFee = 0;
  for (const it of items) {
    const p = getProductById(it.productId); if (!p) continue;
    const pr = getPrice(p, cityId, isMember, now, it.grade);
    const nm = getPrice(p, cityId, false, now, it.grade);
    const linePrice = Math.round(pr.finalPrice * it.qty);
    itemsTotal += linePrice;
    nonMemberTotal += Math.round(nm.finalPrice * it.qty);
    mrpTotal += Math.round(pr.mrp * it.qty);
    const gstRate = p.gstRatePct ?? 0;
    if (gstRate > 0) {
      taxInclusive += Math.round(linePrice * (gstRate / (100 + gstRate)));
    }
    if (p.handling.includes("chilled") || p.handling.includes("frozen")) cold = true;
    if (p.handling.includes("two_person")) twoPerson += 1;
    else if (p.handling.includes("heavy")) heavy += Math.ceil(it.qty);
    if (opts.installation && p.attrs.department === "electronics" && p.attrs.installation?.fee) {
      installationFee += p.attrs.installation.fee * it.qty;
    }
  }
  const threshold = isMember ? deliveryRules.memberFreeDeliveryThreshold : deliveryRules.freeDeliveryThreshold;
  const delivery = items.length === 0 || itemsTotal >= threshold ? 0 : deliveryRules.baseFeeByBand[area.distanceBand];
  const coldChain = cold ? deliveryRules.coldChainFee : 0;
  const heavyFee = heavy * deliveryRules.heavyItemFee;
  const cod = opts.cod ? codRules.fee : 0;
  const giftWrap = opts.giftWrap ? (isMember ? 0 : 30) : 0;
  const total = itemsTotal + delivery + coldChain + heavyFee + cod + giftWrap + installationFee;
  return {
    itemsTotal, mrpTotal, discount: Math.max(0, mrpTotal - itemsTotal), memberSaving: Math.max(0, nonMemberTotal - itemsTotal),
    delivery, coldChain, heavy: heavyFee, twoPerson: 0, twoPersonWaived: twoPerson > 0, cod, giftWrap, installation: installationFee,
    taxInclusive, total, freeDeliveryGap: Math.max(0, threshold - itemsTotal), threshold,
    belowMinimum: Math.max(0, deliveryRules.smallOrderMinimum - itemsTotal),
  };
}

/** Why COD can't be used for this cart, or null if it can. */
export function codBlockReason(items: CartItem[], total: number, cityId: string, now: number): string | null {
  if (!codRules.enabled) return "Cash on delivery is not available right now.";
  const blocked = items.map((i) => getProductById(i.productId)!).filter((p) => p && (!p.codAllowed || codRules.blockedProductIds.includes(p.id)));
  if (blocked.length) return `Prepaid only: ${blocked.map((p) => p.name).join(", ")}`;
  const costly = items.map((i) => getProductById(i.productId)!).find((p) => getPrice(p, cityId, false, now).finalPrice > codRules.prepaidOnlyAbovePerItem);
  if (costly) return `Prepaid only for items above ₹${codRules.prepaidOnlyAbovePerItem.toLocaleString("en-IN")}`;
  if (total > codRules.maxOrderValue) return `Cash on delivery is available up to ₹${codRules.maxOrderValue.toLocaleString("en-IN")}`;
  return null;
}
export const codNeedsConfirmation = (total: number) => total > codRules.confirmationAbove;
