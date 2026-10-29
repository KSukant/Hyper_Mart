"use client";
import { ShoppingCart, Zap, Bell, Check } from "lucide-react";
import type { DomainTheme } from "./types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface PurchaseActionsProps {
  qty: number;
  maxQty: number;
  onQtyChange: (q: number) => void;
  onAddToCart: (buyNow?: boolean) => void;
  isOutOfStock: boolean;
  ctaLabel?: string;
  theme: DomainTheme;
  cityName: string;
}

export function PurchaseActions({
  qty,
  maxQty,
  onQtyChange,
  onAddToCart,
  isOutOfStock,
  ctaLabel = "Add to Cart",
  theme,
  cityName,
}: PurchaseActionsProps) {
  if (isOutOfStock) {
    return (
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => toast(`We'll notify you as soon as fresh stock arrives in ${cityName}`)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-line bg-white py-3.5 text-sm font-extrabold text-ink transition hover:bg-bg"
        >
          <Bell className="h-4 w-4 text-amber-600" />
          <span>Notify Me When In Stock</span>
        </button>
        <p className="text-center text-xs text-muted">
          Restocking daily from our regional fulfilment hub
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      {/* Quantity Stepper */}
      <div className="flex items-center justify-between rounded-2xl border border-line bg-bg p-1.5">
        <span className="pl-3 text-xs font-bold text-muted uppercase tracking-wider">
          Quantity
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid h-8 w-8 place-items-center rounded-xl font-bold text-ink hover:bg-white disabled:opacity-30 transition"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-extrabold tabular text-ink">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => onQtyChange(Math.min(maxQty, qty + 1))}
            disabled={qty >= maxQty}
            aria-label="Increase quantity"
            className="grid h-8 w-8 place-items-center rounded-xl font-bold text-ink hover:bg-white disabled:opacity-30 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onAddToCart(false)}
          className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-black text-white shadow-md transition hover:opacity-95 active:scale-98"
          style={{ backgroundColor: theme.primary }}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{ctaLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => onAddToCart(true)}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 py-3.5 text-xs font-black transition active:scale-98"
          style={{
            borderColor: theme.primary,
            color: theme.primary,
            backgroundColor: theme.tint,
          }}
        >
          <Zap className="h-4 w-4" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
