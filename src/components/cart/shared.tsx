"use client";
import Link from "next/link";
import { Truck, AlertTriangle, BadgePercent } from "lucide-react";
import type { CartItem, Product } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { btn } from "@/components/ui/primitives";
import { useCart, lineKey, useMember } from "@/store";
import { getProductById, getStock } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { getCartCharges, getDeliveryPromise } from "@/lib/delivery";
import { formatINR, formatDay } from "@/lib/format";
import { useNow, useShopper } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export function useCartView() {
  const { items } = useCart();
  const { warehouseId, cityId, isMember, area, city } = useShopper();
  const now = useNow();
  const lines = items.map((it) => {
    const p = getProductById(it.productId);
    if (!p) return null;
    const st = getStock(p.id, warehouseId, it.variantKey === "default" ? undefined : it.variantKey);
    const ok = st.status === "in_stock" || st.status === "low";
    return { it, p, st, ok, key: lineKey(it), price: getPrice(p, cityId, isMember, now, it.grade) };
  }).filter((l): l is NonNullable<typeof l> => l !== null);
  const valid = lines.filter((l) => l.ok);
  const charges = getCartCharges(valid.map((l) => l.it), area, cityId, isMember, now);
  const groups = new Map<string, typeof valid>();
  for (const l of valid) {
    const d = getDeliveryPromise(l.p, area, new Date(now));
    const label = l.p.department === "food" ? `Fresh and chilled · ${d.type === "today" ? "today" : formatDay(d.date!)}` : `Arrives by ${formatDay(d.date!)}`;
    groups.set(label, [...(groups.get(label) ?? []), l]);
  }
  return { lines, valid, charges, groups, city, area, cityId, isMember, now };
}

export function variantLabel(it: CartItem, p: Product) {
  const parts: string[] = [];
  if (it.variantKey.startsWith("shade:")) { const a = p.attrs; if (a.department === "beauty") parts.push(`Shade ${a.shades?.find((s) => `shade:${s.code}` === it.variantKey)?.name}`); }
  else if (it.variantKey.includes("|")) { const [s, c] = it.variantKey.split("|"); parts.push(`Size ${s}`, c); }
  if (it.grade) parts.push(`Grade ${it.grade}`);
  if (it.ripeness) parts.push(it.ripeness.replace(/_/g, " "));
  return parts.join(" · ");
}

export function Summary({ charges, isMember, cta, extra }: { charges: ReturnType<typeof getCartCharges>; isMember: boolean; cta?: React.ReactNode; extra?: React.ReactNode }) {
  const setMember = useMember((s) => s.setMember);
  const pct = Math.min(100, Math.round((charges.itemsTotal / charges.threshold) * 100));
  return (
    <div className="space-y-4 rounded-3xl bg-white p-5 shadow-lift ring-1 ring-line/60 lg:sticky lg:top-[calc(var(--header-h)+16px)]">
      <h2 className="text-lg font-extrabold">Order summary</h2>
      {charges.freeDeliveryGap > 0 ? (
        <div className="rounded-2xl bg-accent-tint p-3 text-sm text-accent-text"><p>Add <b>{formatINR(charges.freeDeliveryGap)}</b> more for free delivery</p><div className="mt-2 h-2 rounded-full bg-white"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div></div>
      ) : <p className="flex items-center gap-2 rounded-2xl bg-primary-tint p-3 text-sm font-semibold text-primary"><Truck className="h-4 w-4" />You’ve unlocked free delivery</p>}
      <dl className="space-y-2 text-sm">
        <Row k="Items total" v={formatINR(charges.itemsTotal)} />
        {charges.mrpTotal > charges.itemsTotal && <Row k="You save" v={`− ${formatINR(charges.mrpTotal - charges.itemsTotal)}`} green />}
        {isMember && charges.memberSaving > 0 && <Row k="Member savings (included)" v={formatINR(charges.memberSaving)} green />}
        <Row k="Delivery" v={charges.delivery === 0 ? "Free" : formatINR(charges.delivery)} />
        {charges.coldChain > 0 && <Row k="Cold-chain handling" v={formatINR(charges.coldChain)} />}
        {charges.heavy > 0 && <Row k="Heavy-item handling" v={formatINR(charges.heavy)} />}
        {charges.installation > 0 && <Row k="Installation service" v={formatINR(charges.installation)} />}
        {charges.twoPersonWaived && <Row k="Two-person delivery" v="Free" green />}
        {charges.cod > 0 && <Row k="Cash on delivery fee" v={formatINR(charges.cod)} />}
        {charges.giftWrap > 0 && <Row k="Gift wrap" v={formatINR(charges.giftWrap)} />}
        {charges.taxInclusive > 0 && <Row k="Tax (inclusive)" v={formatINR(charges.taxInclusive)} />}
        {extra}
      </dl>
      <div className="flex items-end justify-between border-t border-line pt-3"><span className="font-bold">Total</span><span className="font-display text-2xl font-extrabold tabular">{formatINR(charges.total)}</span></div>
      <p className="text-xs text-muted">Prices include GST.{charges.cod === 0 && " Cash on delivery adds ₹25 if chosen at checkout."}</p>
      {!isMember && <button onClick={() => setMember(true)} className="flex w-full items-center gap-2 rounded-2xl bg-primary-soft p-3 text-left text-sm text-primary"><BadgePercent className="h-5 w-5 shrink-0" /><span>Members pay less and get free delivery above ₹199. <b>Join Rewards</b></span></button>}
      {charges.belowMinimum > 0 && <p className="flex items-center gap-2 text-sm font-semibold text-danger"><AlertTriangle className="h-4 w-4" />Add {formatINR(charges.belowMinimum)} more to place an order</p>}
      {cta}
    </div>
  );
}
function Row({ k, v, green }: { k: string; v: string; green?: boolean }) { return <div className="flex justify-between"><dt className="text-muted">{k}</dt><dd className={cn("font-semibold tabular", green && "text-primary")}>{v}</dd></div>; }

export function SavedList({ onMove }: { onMove?: (k: string) => void }) {
  const { saved, moveToCart } = useCart();
  return (
    <section className="mt-6 rounded-3xl bg-white p-5 shadow-card">
      <h2 className="mb-3 font-extrabold">Saved for later ({saved.length})</h2>
      <ul className="grid gap-3 sm:grid-cols-2">{saved.map((it) => { const p = getProductById(it.productId)!; const k = lineKey(it); return (
        <li key={k} className="flex items-center gap-3 rounded-2xl bg-bg p-3"><ProductArt product={p} className="h-14 w-14 rounded-xl" /><span className="flex-1 text-sm font-semibold">{p.name}</span><button className={btn("secondary", "sm")} onClick={() => (onMove ?? moveToCart)(k)}>Move to cart</button></li>); })}</ul>
    </section>
  );
}
