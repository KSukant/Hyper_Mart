"use client";

import Link from "next/link";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  Palette,
  Ruler,
  Shirt,
  Layers,
  Tag,
  Info,
  RotateCcw,
} from "lucide-react";
import type { CartItem, Product } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { brandName } from "@/lib/catalog";
import type { getPrice } from "@/lib/pricing";
import type { getStock } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface FashionCartItemProps {
  item: CartItem;
  product: Product;
  lineKey: string;
  price: ReturnType<typeof getPrice>;
  stock: ReturnType<typeof getStock>;
  onQtyChange: (newQty: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
  onEdit: (modal: "matrix" | "size" | "fit" | "rental") => void;
}

export function FashionCartItem({
  item,
  product: p,
  price,
  onQtyChange,
  onRemove,
  onSaveForLater,
  onEdit,
}: FashionCartItemProps) {
  const a = p.attrs;
  const isFashion = a.department === "fashion";
  const brand = brandName(p);

  // Variant key is typically "Size|Colour"
  const parts = item.variantKey.split("|");
  const currentSize =
    parts[0] && parts[0] !== "default"
      ? parts[0]
      : isFashion
      ? a.sizes[1] ?? "L"
      : "L";
  const currentColour = parts[1]
    ? parts[1]
    : isFashion
    ? a.colours[0]?.name ?? "Blue"
    : "Blue";

  // Hex color for swatch dot
  const colourHex =
    isFashion && a.colours
      ? a.colours.find((c) => c.name.toLowerCase() === currentColour.toLowerCase())?.hex ?? "#4B6B94"
      : "#4B6B94";

  // Size chart description
  const sizeObj = isFashion ? a.sizeChart?.find((s) => s.size === currentSize) : null;
  const sizeDesc = sizeObj
    ? `Chest ${sizeObj.chest ?? 42} in, Length ${sizeObj.length ?? 46} in`
    : currentSize === "S"
    ? "Chest 38 in, Length 42 in"
    : currentSize === "M"
    ? "Chest 40 in, Length 44 in"
    : currentSize === "L"
    ? "Chest 42 in, Length 46 in"
    : currentSize === "XL"
    ? "Chest 44 in, Length 48 in"
    : "Chest 46 in, Length 50 in";

  const fitText = isFashion ? `${a.fit} fit · True to size` : "Regular fit";
  const fabricText = isFashion && a.fabric ? `${a.fabric}, soft and breathable` : "100% cotton, soft and breathable";

  const lineTotal = price.finalPrice * item.qty;

  return (
    <div className="space-y-3">
      {/* Main Item Card (Exact Match to Screenshot) */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
          {/* Left Product Image */}
          <div className="sm:col-span-5 lg:col-span-4">
            <Link
              href={`/product/${p.slug}`}
              className="block relative aspect-[3/4] min-h-[320px] w-full overflow-hidden rounded-2xl bg-[#FAFAFA] border border-line/60 p-2 transition hover:opacity-95"
            >
              <ProductArt product={p} className="h-full w-full object-contain" />
            </Link>
          </div>

          {/* Right Product Details & Attributes */}
          <div className="sm:col-span-7 lg:col-span-8 space-y-3">
            {/* Header: Title, Brand, Delete */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  {brand}
                </span>
                <Link
                  href={`/product/${p.slug}`}
                  className="block text-xl font-extrabold text-ink hover:text-primary transition sm:text-2xl leading-tight"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-muted mt-0.5 line-clamp-1">
                  {p.description || "A timeless kurta crafted for everyday elegance."}
                </p>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-bg hover:text-danger transition shrink-0"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Price Row (₹ 1,299  ₹ 1,699  24% OFF) */}
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="font-display text-2xl font-extrabold text-ink">
                ₹ {price.finalPrice.toLocaleString("en-IN")}
              </span>
              {p.mrp > price.finalPrice && (
                <span className="text-xs font-semibold text-muted line-through">
                  ₹ {p.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {price.discountPct > 0 && (
                <span className="rounded-md bg-[#E6FFFA] border border-[#D8E8E5] px-2 py-0.5 text-[11px] font-black text-[#0F766E]">
                  {price.discountPct}% OFF
                </span>
              )}
              {price.memberPrice && (
                <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-ink">
                  Member ₹{price.memberPrice}
                </span>
              )}
            </div>

            {/* Fashion Attribute Rows (Matching Reference Screenshot) */}
            <div className="divide-y divide-[#D8E8E5]/60 rounded-2xl border border-[#D8E8E5] bg-[#F5FBFA] px-3.5 py-1 text-xs sm:text-sm">
              {/* 1. Colour */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Palette className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Colour</span>
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/10 inline-block shrink-0"
                        style={{ backgroundColor: colourHex }}
                      />
                      <span>{currentColour}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("matrix")}
                  className="text-xs font-bold text-muted hover:text-[#0F766E] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 2. Size */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Ruler className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Size</span>
                    <strong className="block text-ink font-bold">
                      {currentSize} ({sizeDesc})
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("size")}
                  className="text-xs font-bold text-muted hover:text-[#0F766E] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 3. Fit */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Shirt className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Fit</span>
                    <strong className="block text-ink font-bold">{fitText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("fit")}
                  className="text-xs font-bold text-muted hover:text-[#0F766E] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 4. Fabric */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Fabric</span>
                    <strong className="block text-ink font-bold line-clamp-1">{fabricText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("fit")}
                  className="text-xs font-bold text-muted hover:text-[#0F766E] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 5. Item Condition */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Tag className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Item condition</span>
                    <strong className="block text-ink font-bold">New (Original brand tags)</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("fit")}
                  className="text-xs font-bold text-muted hover:text-[#0F766E] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>
            </div>

            {/* Optional Fashion Features (Rentable, Clearance, Size Guide) */}
            {isFashion && a.rentable && (
              <div className="flex items-center justify-between rounded-xl bg-[#E6FFFA]/70 border border-[#D8E8E5] p-2.5 text-xs text-[#18302F]">
                <span>
                  Rentable outfit: ₹{a.rentable.perDay}/day (Refundable deposit: ₹{a.rentable.deposit})
                </span>
                <button
                  type="button"
                  onClick={() => onEdit("rental")}
                  className="font-bold text-[#0F766E] hover:underline shrink-0"
                >
                  Rental details &rsaquo;
                </button>
              </div>
            )}

            {isFashion && a.clearance && (
              <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                <Info className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                <span>Clearance item · Size exchange only within 7 days. Non-refundable.</span>
              </div>
            )}

            {/* Quantity Stepper & Line Total (Exact Match to Screenshot) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ink">Quantity</span>
                <div className="flex items-center gap-1.5 rounded-xl border border-line bg-bg p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={item.qty <= 1}
                    onClick={() => onQtyChange(Math.max(1, item.qty - 1))}
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center text-xs font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold tabular text-ink">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={item.qty >= p.maxQtyPerOrder}
                    onClick={() => onQtyChange(item.qty + 1)}
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center text-xs font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-ink tabular">
                  ₹ {Math.round(lineTotal).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save For Later Action Card (Matching Reference Screenshot) */}
      <button
        type="button"
        onClick={onSaveForLater}
        className="flex w-full items-center justify-between rounded-2xl border border-line/80 bg-white px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-bg/40 shadow-xs cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-muted" />
          <span>Save for later</span>
        </span>
        <span className="text-muted text-base">&rsaquo;</span>
      </button>
    </div>
  );
}
