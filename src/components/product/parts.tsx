"use client";
import { useEffect, useState } from "react";
import { Clock, Truck, RotateCcw, Minus, Plus, ShoppingCart, Bell } from "lucide-react";
import type { Product, CartItem } from "@/types";
import type { PriceInfo } from "@/lib/pricing";
import { formatINR, formatCountdown, formatDay, splitCountdown } from "@/lib/format";
import { getDeliveryPromise } from "@/lib/delivery";
import { getReturnPolicy, getStock, type StockInfo } from "@/lib/catalog";
import { useShopper } from "@/lib/hooks";
import { useCart, lineKey } from "@/store";
import { toast, btn, Pill } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export function PriceBlock({ info, size = "md", light }: { info: PriceInfo; size?: "sm" | "md" | "lg"; light?: boolean }) {
  const big = { sm: "text-lg", md: "text-[22px]", lg: "text-4xl" }[size];
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className={cn("font-display font-extrabold tabular", big, light ? "text-white" : "text-ink")}>
        {formatINR(info.finalPrice)}{info.perKg && <span className={cn("text-sm font-semibold", light ? "text-white/70" : "text-muted")}>/kg</span>}
      </span>
      {info.mrp > info.finalPrice && <span className={cn("text-sm line-through tabular", light ? "text-white/60" : "text-muted")}>{formatINR(info.mrp)}</span>}
      {info.memberPrice !== undefined && info.memberPrice < info.finalPrice && (
        <span className={cn("rounded-lg px-2 py-1 text-xs font-bold", light ? "bg-accent text-accent-text" : "bg-primary-tint text-primary")}>Member {formatINR(info.memberPrice)}</span>
      )}
    </div>
  );
}

/** Live countdown (ticks every second). `onEnd` lets the parent re-price. */
export function Countdown({ endsAt, onEnd, boxes, className }: { endsAt: string; onEnd?: () => void; boxes?: boolean; className?: string }) {
  const end = Date.parse(endsAt);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => {
    const t = setInterval(() => { const l = end - Date.now(); setLeft(l); if (l <= 0) { clearInterval(t); onEnd?.(); } }, 1000);
    return () => clearInterval(t);
  }, [end, onEnd]);
  if (left <= 0) return <span className={cn("text-sm font-semibold text-muted", className)}>Offer ended</span>;
  if (boxes) {
    const { h, m, s } = splitCountdown(left);
    return (
      <div className={cn("flex items-center gap-1.5", className)} aria-label={`Ends in ${h} hours ${m} minutes`}>
        {[["h", h], ["m", m], ["s", s]].map(([k, v], i) => (
          <span key={k as string} className="flex items-center gap-1.5">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent font-display text-xl font-extrabold tabular text-accent-text">{String(v).padStart(2, "0")}</span>
            {i < 2 && <span className="font-bold text-accent">:</span>}
          </span>
        ))}
      </div>
    );
  }
  const urgent = left < 3600_000;
  return (
    <span className={cn("inline-flex items-center gap-1 text-[13px] tabular text-danger", urgent ? "font-extrabold" : "font-semibold", className)} aria-live="off">
      <Clock className="h-3.5 w-3.5" />Ends in {formatCountdown(left)}
    </span>
  );
}

export function DeliveryLine({ product, className }: { product: Product; className?: string }) {
  const { area } = useShopper();
  const p = getDeliveryPromise(product, area, new Date());
  return (
    <p className={cn("flex items-center gap-1.5 truncate text-xs text-muted sm:text-[13px]", className)}>
      <Truck className="h-3.5 w-3.5 shrink-0 text-primary" />
      {p.type === "not_serviceable" ? <span className="text-danger">Not deliverable here yet</span>
        : p.type === "today" ? <span>Delivery <b className="text-ink">today</b></span>
          : <span><span className="max-sm:hidden">Delivery by </span><span className="sm:hidden">By </span><b className="text-ink">{formatDay(p.date!)}</b></span>}
    </p>
  );
}
export function ReturnLine({ product, className }: { product: Product; className?: string }) {
  return <p className={cn("flex items-center gap-1.5 truncate text-[13px] text-muted", className)}><RotateCcw className="h-3.5 w-3.5 shrink-0 text-primary" />{getReturnPolicy(product).label}</p>;
}
export function StockNote({ info, city }: { info: StockInfo; city: string }) {
  if (info.status === "low") return <Pill tone="redSoft">Only {info.available} left in {city}</Pill>;
  if (info.status === "out") return <Pill tone="grey">{info.restockDate ? `Back by ${formatDay(info.restockDate)}` : `Out of stock in ${city}`}</Pill>;
  if (info.status === "not_stocked") return <Pill tone="grey">Not available in {city}</Pill>;
  return null;
}

/** Add to cart → quantity stepper. Weight products step by 0.5 kg. */
export function AddToCart({ product, item, stock, limit, className, label = "Add to cart", size = "md", variant = "primary", disabled, tabIndex }: {
  product: Product; item?: Partial<CartItem>; stock?: StockInfo; limit?: number; className?: string; label?: string; size?: "sm" | "md" | "lg"; variant?: "primary" | "accent";
  disabled?: boolean; tabIndex?: number;
}) {
  const { warehouseId, city } = useShopper();
  const { items, add, setQty } = useCart();
  const a = product.attrs;
  const byWeight = a.department === "food" && a.soldByWeight;
  const step = byWeight ? 0.5 : 1;
  const variantKey = item?.variantKey ?? "default";
  const full: CartItem = {
    productId: product.id, variantKey, qty: item?.qty ?? (byWeight ? 1 : 1),
    ...(a.department === "food" && a.substitutable ? { substitution: "ask" as const } : {}),
    ...(byWeight ? { grade: "A" as const } : {}), ...item,
  };
  const key = lineKey(full);
  const inCart = items.find((i) => lineKey(i) === key);
  const st = stock ?? getStock(product.id, warehouseId, variantKey === "default" ? undefined : variantKey);
  const max = Math.min(product.maxQtyPerOrder, limit ?? Infinity, st.available || Infinity);
  if (disabled)
    return <button disabled tabIndex={tabIndex} className={cn("flex h-11 w-full items-center justify-center rounded-xl bg-line/50 text-sm font-bold text-muted cursor-not-allowed", className)}>Ended</button>;
  if (st.status === "out" || st.status === "not_stocked")
    return <button tabIndex={tabIndex} className={btn("secondary", size, cn("w-full", className))} onClick={() => toast(`We'll tell you when it's back in ${city.name}`)}><Bell className="h-4 w-4" />Notify me</button>;
  if (inCart)
    return (
      <div className={cn("flex min-h-[40px] h-11 w-full items-center justify-between rounded-xl bg-primary-tint px-1", size === "sm" && "min-h-[40px] h-10 sm:h-9", className)}>
        <button tabIndex={tabIndex} aria-label="Decrease quantity" className="grid min-h-[40px] min-w-[40px] h-10 w-10 sm:h-9 sm:w-9 place-items-center rounded-lg text-primary hover:bg-white" onClick={() => setQty(key, +(inCart.qty - step).toFixed(2))}><Minus className="h-4 w-4" /></button>
        <span className="text-sm font-bold text-primary tabular">{inCart.qty}{byWeight ? " kg" : ""}</span>
        <button tabIndex={tabIndex} aria-label="Increase quantity" disabled={inCart.qty + step > max} className="grid min-h-[40px] min-w-[40px] h-10 w-10 sm:h-9 sm:w-9 place-items-center rounded-lg text-primary hover:bg-white disabled:opacity-30" onClick={() => setQty(key, +(inCart.qty + step).toFixed(2))}><Plus className="h-4 w-4" /></button>
      </div>
    );
  return (
    <button tabIndex={tabIndex} className={btn(variant, size, cn("w-full min-h-[40px] sm:min-h-0", className))} onClick={() => { add(full); toast("Added to cart", "/cart", "View cart"); }}>
      <ShoppingCart className="h-4 w-4" />{label}
    </button>
  );
}
