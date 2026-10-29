"use client";

import { ShoppingCart, Zap } from "lucide-react";
import { formatINR } from "@/lib/format";
import type { PdpSelection } from "./types";
import { cn } from "@/lib/cn";

interface StickyBuyBarProps {
  price: number;
  mrp?: number;
  domainColor?: string;
  selection?: PdpSelection;
  isOutOfStock: boolean;
  onAddToCart: (buyNow?: boolean) => void;
  className?: string;
}

export function StickyBuyBar({
  price,
  mrp,
  domainColor = "#0E5E3A",
  selection,
  isOutOfStock,
  onAddToCart,
  className,
}: StickyBuyBarProps) {
  if (isOutOfStock) {
    return (
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md lg:hidden",
          className
        )}
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 12px))",
        }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="font-display text-lg font-black text-ink tabular">
              {formatINR(price)}
            </span>
            <p className="text-xs font-bold text-danger">Out of stock in your area</p>
          </div>
          <button
            type="button"
            disabled
            className="flex min-h-[44px] items-center justify-center rounded-xl bg-neutral-200 px-5 text-sm font-bold text-neutral-500 cursor-not-allowed"
          >
            Out of Stock
          </button>
        </div>
      </div>
    );
  }

  const discountPct = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md lg:hidden",
        className
      )}
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 12px))",
      }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        {/* Left: Price and Discount */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-display text-xl font-black text-ink tabular">
              {formatINR(price)}
            </span>
            {mrp && mrp > price && (
              <span className="text-xs text-muted line-through tabular">
                {formatINR(mrp)}
              </span>
            )}
            {discountPct > 0 && (
              <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-black text-accent-text">
                -{discountPct}%
              </span>
            )}
          </div>
          <p className="truncate text-[11px] text-muted">Inclusive of all taxes</p>
        </div>

        {/* Right: Add to cart & Buy now */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onAddToCart(false)}
            className="flex min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition active:scale-98 cursor-pointer"
            style={{ backgroundColor: domainColor }}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            <span>Add to cart</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(true)}
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl border-2 px-3 py-2 text-xs sm:text-sm font-bold transition hover:bg-neutral-50 active:scale-98 cursor-pointer"
            style={{
              borderColor: domainColor,
              color: domainColor,
            }}
            aria-label="Buy Now"
          >
            <Zap className="h-4 w-4" strokeWidth={2} />
            <span>Buy now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
