"use client";
import { ShoppingCart, Zap } from "lucide-react";
import type { PdpSelection } from "./types";
import { formatINR } from "@/lib/format";

interface MobilePurchaseBarProps {
  price: number;
  selection: PdpSelection;
  ctaLabel?: string;
  isOutOfStock: boolean;
  onAddToCart: (buyNow?: boolean) => void;
}

export function MobilePurchaseBar({
  price,
  selection,
  ctaLabel = "Add to Cart",
  isOutOfStock,
  onAddToCart,
}: MobilePurchaseBarProps) {
  if (isOutOfStock) return null;

  // Selected variant summary snippet
  const summarySnippet = [
    selection.size && `Size ${selection.size}`,
    selection.colour,
    selection.shade,
    selection.grade && `Grade ${selection.grade}`,
    selection.kg && `${selection.kg} kg`,
    selection.configuration,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        {/* Left: Price & Variant pill */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-lg font-black text-ink tabular">
              {formatINR(price)}
            </span>
          </div>
          {summarySnippet && (
            <p className="truncate text-[11px] font-semibold text-muted">
              {summarySnippet}
            </p>
          )}
        </div>

        {/* Right: Actions in Brand-700 */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onAddToCart(false)}
            className="flex items-center gap-1.5 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition active:scale-98"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
            <span>{ctaLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(true)}
            className="rounded-xl border-2 border-brand-700 bg-white px-3 py-2 text-xs font-bold text-brand-700 transition hover:bg-brand-50 active:scale-98"
            aria-label="Buy Now"
          >
            <Zap className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
