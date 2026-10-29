"use client";

import Link from "next/link";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  Sparkles,
  Package,
  ShieldCheck,
  FileText,
  Clock,
  Thermometer,
  CheckCircle,
} from "lucide-react";
import type { CartItem, Product } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { brandName } from "@/lib/catalog";
import type { getPrice } from "@/lib/pricing";
import type { getStock } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface BeautyCartItemProps {
  item: CartItem;
  product: Product;
  lineKey: string;
  price: ReturnType<typeof getPrice>;
  stock: ReturnType<typeof getStock>;
  onQtyChange: (newQty: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
  onEdit: (modal: "shade" | "format" | "suitability" | "ingredients" | "batch") => void;
}

export function BeautyCartItem({
  item,
  product: p,
  price,
  onQtyChange,
  onRemove,
  onSaveForLater,
  onEdit,
}: BeautyCartItemProps) {
  const a = p.attrs;
  const isBeauty = a.department === "beauty";
  const brand = brandName(p);

  // Shade info
  const shadeCode = item.variantKey.startsWith("shade:")
    ? item.variantKey.replace("shade:", "")
    : isBeauty && a.shades?.[0]?.code
    ? a.shades[0].code
    : "04";

  const shadeObj = isBeauty && a.shades ? a.shades.find((s) => s.code === shadeCode) : null;
  const shadeName = shadeObj?.name ?? "Red Velvet";
  const shadeHex = shadeObj?.hex ?? "#A3234F";
  const shadeUndertone = shadeObj?.undertone ? `${shadeObj.undertone} undertone` : "Neutral undertone";

  // Format info
  const isSample = item.variantKey.includes("sample") || p.id.includes("mini");
  const formatText = isSample ? "Sample vial (10 ml / travel trial)" : `Full size (${p.unit})`;

  // Batch info from stock if available
  const batchNo = "HM-B2409";
  const expiryText = "24 months from mfg date (Best before Nov 2026)";

  const lineTotal = price.finalPrice * item.qty;

  return (
    <div className="space-y-3">
      {/* Main Item Card (Exact Match to Screenshot) */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
          {/* Left Product Image */}
          <div className="sm:col-span-4">
            <Link
              href={`/product/${p.slug}`}
              className="block relative aspect-square min-h-[220px] w-full overflow-hidden rounded-2xl bg-[#FAFAFA] border border-line/60 p-3 transition hover:opacity-95"
            >
              <ProductArt product={p} className="h-full w-full object-contain" />
            </Link>
          </div>

          {/* Right Product Details & Attributes */}
          <div className="sm:col-span-8 space-y-3">
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
                  {p.description || "Dermatologically tested authentic beauty and skincare."}
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

            {/* Price Row */}
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
                <span className="rounded-md bg-[#FCE4EC] border border-[#EADDE6] px-2 py-0.5 text-[11px] font-black text-[#7C205F]">
                  {price.discountPct}% OFF
                </span>
              )}
              {price.memberPrice && (
                <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-ink">
                  Member ₹{price.memberPrice}
                </span>
              )}
            </div>

            {/* Beauty Attribute Rows (Reference Screenshot Style) */}
            <div className="divide-y divide-[#EADDE6]/60 rounded-2xl border border-[#EADDE6] bg-[#FFFAFC] px-3.5 py-1 text-xs sm:text-sm">
              {/* 1. Shade */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-[#7C205F] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Selected shade</span>
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/10 inline-block shrink-0"
                        style={{ backgroundColor: shadeHex }}
                      />
                      <span>
                        {shadeName} ({shadeCode}) · {shadeUndertone}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("shade")}
                  className="text-xs font-bold text-muted hover:text-[#7C205F] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 2. Format / Size */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 text-[#7C205F] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Format / Size</span>
                    <strong className="block text-ink font-bold">{formatText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("format")}
                  className="text-xs font-bold text-muted hover:text-[#7C205F] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 3. Suitability */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#7C205F] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Skin suitability</span>
                    <strong className="block text-ink font-bold">
                      {isBeauty && a.skinTypes ? a.skinTypes.join(", ") : "All skin types"} · Dermatologically verified
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("suitability")}
                  className="text-xs font-bold text-muted hover:text-[#7C205F] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 4. Ingredients & Safety */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#7C205F] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Ingredients &amp; allergen</span>
                    <strong className="block text-ink font-bold line-clamp-1">
                      {isBeauty && a.keyIngredients ? a.keyIngredients.join(", ") : "Paraben-free"} · Patch test advised
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("ingredients")}
                  className="text-xs font-bold text-muted hover:text-[#7C205F] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 5. Batch & Expiry */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#7C205F] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Batch &amp; expiry</span>
                    <strong className="block text-ink font-bold">
                      Batch {batchNo} · {expiryText}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("batch")}
                  className="text-xs font-bold text-muted hover:text-[#7C205F] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>
            </div>

            {/* Beauty Specific Disclosures */}
            {isBeauty && a.heatSensitive && (
              <div className="flex items-center gap-2 rounded-xl bg-[#FCE4EC]/70 border border-[#EADDE6] p-2.5 text-xs text-[#29212A]">
                <Thermometer className="h-3.5 w-3.5 shrink-0 text-[#7C205F]" />
                <span>
                  Heat-sensitive product: Dispatched in temperature-controlled packaging to prevent melting.
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <CheckCircle className="h-3.5 w-3.5 text-success" />
              <span>100% Genuine · Sourced directly from brand / authorized distributor</span>
            </div>

            {/* Quantity Stepper & Line Total */}
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

      {/* Save For Later Action Card */}
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
