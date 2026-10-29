"use client";

import Link from "next/link";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  Award,
  Sparkles,
  Scale,
  RotateCcw,
  Snowflake,
  CalendarClock,
  Info,
} from "lucide-react";
import type { CartItem, Product } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { brandName } from "@/lib/catalog";
import type { getPrice } from "@/lib/pricing";
import type { getStock } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface FoodCartItemProps {
  item: CartItem;
  product: Product;
  lineKey: string;
  price: ReturnType<typeof getPrice>;
  stock: ReturnType<typeof getStock>;
  onQtyChange: (newQty: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
  onEdit: (modal: "freshness" | "weighing" | "shelfLife" | "substitution" | "subscribe") => void;
}

export function FoodCartItem({
  item,
  product: p,
  price,
  onQtyChange,
  onRemove,
  onSaveForLater,
  onEdit,
}: FoodCartItemProps) {
  const a = p.attrs;
  const isFood = a.department === "food";
  const brand = brandName(p);
  const byWeight = isFood && a.soldByWeight;

  const currentGrade = item.grade ?? (isFood && a.grades?.[0]?.grade) ?? "A";
  const currentRipeness = item.ripeness ?? "ready_to_eat";
  const ripenessLabel =
    currentRipeness === "ready_to_eat"
      ? "Ready to eat (Firm & ripe)"
      : currentRipeness === "raw"
      ? "Raw (Needs 2-3 days to ripen)"
      : "Very ripe (Sweet & aromatic)";

  const weightText = byWeight
    ? item.qty >= 1
      ? `${item.qty} kg (approx. ${Math.round(item.qty * 6)}-${Math.round(item.qty * 8)} pcs)`
      : `${Math.round(item.qty * 1000)} g (approx. 3-4 pcs)`
    : `${item.qty} x ${p.unit}`;

  const subPreference = item.substitution ?? "similar";
  const subText =
    subPreference === "ask"
      ? "Ask me first before replacing"
      : subPreference === "skip"
      ? "Skip and refund if unavailable"
      : "Allow similar quality substitute";

  const storageText =
    isFood && (a.storage === "chilled" || a.storage === "frozen")
      ? "Chilled (2°C to 4°C) · Cold-chain delivery (₹15 included)"
      : "Ambient dry storage · Farm fresh check under 6 hrs";

  const lineTotal = price.finalPrice * item.qty;

  return (
    <div className="space-y-3">
      {/* Main Item Card */}
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
                  {p.description || "Farm-fresh daily groceries graded and checked before dispatch."}
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
                {byWeight && <span className="text-sm font-medium text-muted"> / kg</span>}
              </span>
              {p.mrp > price.finalPrice && (
                <span className="text-xs font-semibold text-muted line-through">
                  ₹ {p.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {price.discountPct > 0 && (
                <span className="rounded-md bg-[#E7F3DF] border border-[#DFE7D8] px-2 py-0.5 text-[11px] font-black text-[#2E7032]">
                  {price.discountPct}% OFF
                </span>
              )}
              {price.memberPrice && (
                <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-ink">
                  Member ₹{price.memberPrice}
                </span>
              )}
            </div>

            {/* Food Attribute Box (Reference Screenshot Style) */}
            <div className="divide-y divide-[#DFE7D8]/60 rounded-2xl border border-[#DFE7D8] bg-[#F8FAF5] px-3.5 py-1 text-xs sm:text-sm">
              {/* 1. Quality Grade */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Award className="h-4 w-4 text-[#2E7032] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Quality grade</span>
                    <strong className="block text-ink font-bold">
                      Grade {currentGrade} {isFood && a.grades && `(Checked standard)`}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("freshness")}
                  className="text-xs font-bold text-muted hover:text-[#2E7032] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 2. Ripeness */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-[#2E7032] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Ripeness stage</span>
                    <strong className="block text-ink font-bold">{ripenessLabel}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("freshness")}
                  className="text-xs font-bold text-muted hover:text-[#2E7032] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 3. Weight / Quantity */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Scale className="h-4 w-4 text-[#2E7032] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Estimated weight</span>
                    <strong className="block text-ink font-bold">{weightText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("weighing")}
                  className="text-xs font-bold text-muted hover:text-[#2E7032] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 4. Substitution Preference */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="h-4 w-4 text-[#2E7032] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Substitution preference</span>
                    <strong className="block text-ink font-bold">{subText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("substitution")}
                  className="text-xs font-bold text-muted hover:text-[#2E7032] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 5. Storage & Cold-Chain */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Snowflake className="h-4 w-4 text-[#2E7032] shrink-0" />
                  <div>
                    <span className="block text-[11px] text-muted">Storage &amp; handling</span>
                    <strong className="block text-ink font-bold line-clamp-1">{storageText}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("shelfLife")}
                  className="text-xs font-bold text-muted hover:text-[#2E7032] hover:underline"
                >
                  Edit &rsaquo;
                </button>
              </div>
            </div>

            {/* Grocery Specific Disclosures */}
            {byWeight && (
              <div className="flex items-center gap-2 rounded-xl bg-amber-50/70 border border-amber-200/60 p-2.5 text-xs text-amber-900">
                <Info className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                <span>
                  Weight-based produce: Final packed weight and line total may vary by up to ±10% at dispatch.
                </span>
              </div>
            )}

            {isFood && a.subscribable && (
              <div className="flex items-center justify-between rounded-xl bg-[#E7F3DF]/60 border border-[#DFE7D8] px-3 py-2 text-xs">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-[#2E7032]" />
                  <span className="font-semibold text-ink">
                    Subscribe and repeat eligible (5% extra savings)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("subscribe")}
                  className="font-bold text-[#2E7032] hover:underline"
                >
                  {item.subscription ? "Edit schedule &rsaquo;" : "Set schedule &rsaquo;"}
                </button>
              </div>
            )}

            {/* Quantity Stepper & Line Total */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ink">Quantity</span>
                <div className="flex items-center gap-1.5 rounded-xl border border-line bg-bg p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={byWeight ? item.qty <= 0.25 : item.qty <= 1}
                    onClick={() =>
                      onQtyChange(byWeight ? Math.max(0.25, +(item.qty - 0.25).toFixed(2)) : Math.max(1, item.qty - 1))
                    }
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center text-xs font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold tabular text-ink">
                    {byWeight ? `${item.qty} kg` : item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={item.qty >= p.maxQtyPerOrder}
                    onClick={() =>
                      onQtyChange(byWeight ? +(item.qty + 0.25).toFixed(2) : item.qty + 1)
                    }
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
