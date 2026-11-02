"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Scale,
  ShieldCheck,
  Truck,
  Wrench,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/format";
import { brandName, productsInCity } from "@/lib/catalog";
import { useShopper } from "@/lib/hooks";
import { useCart } from "@/store";
import { toast } from "@/components/ui/primitives";
import { getCategoryVerdict } from "@/lib/electronicsData";
import { cn } from "@/lib/cn";

interface CompareDevicesModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export function CompareDevicesModal({
  open,
  onClose,
  product: baseProduct,
}: CompareDevicesModalProps) {
  const { warehouseId } = useShopper();
  const cart = useCart();

  // Find candidate products in the same department/category
  const candidates = useMemo(() => {
    const list = productsInCity(warehouseId).filter(
      (p) => p.department === "electronics" && p.id !== baseProduct.id
    );
    // Prioritize same category first
    const sameCat = list.filter((p) => p.categoryId === baseProduct.categoryId);
    return sameCat.length > 0 ? sameCat : list;
  }, [warehouseId, baseProduct]);

  const [compareId, setCompareId] = useState<string>(candidates[0]?.id ?? "");
  const [highlightDiffs, setHighlightDiffs] = useState<boolean>(true);

  if (!open) return null;

  const compareProduct = candidates.find((c) => c.id === compareId) || candidates[0];

  const handleAdd = (p: Product) => {
    cart.add({
      productId: p.id,
      variantKey: "default",
      qty: 1,
    });
    toast(`Added ${p.name} to your cart`);
  };

  // Extract specs from both
  const baseSpecs = baseProduct.attrs.department === "electronics" ? baseProduct.attrs.specs : [];
  const compSpecs = compareProduct?.attrs.department === "electronics" ? compareProduct.attrs.specs : [];

  // Union of spec labels
  const allLabels = Array.from(
    new Set([
      ...baseSpecs.map((s) => s.label),
      ...compSpecs.map((s) => s.label),
      "Warranty",
      "Installation",
      "Exchange Eligible",
    ])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#F0F8EC] text-[#085A2E]">
              <Scale className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-ink">Compare Devices</h2>
              <p className="text-[11px] text-muted">
                Side-by-side technical specification, price, and capability analysis.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHighlightDiffs((prev) => !prev)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold transition border",
                highlightDiffs
                  ? "bg-[#085A2E] text-white border-[#085A2E]"
                  : "bg-white text-muted border-line hover:text-ink"
              )}
            >
              {highlightDiffs ? "✓ Highlighting Differences" : "Show All Specs"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Top Comparison Cards Header */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 border-b border-line/70 pb-6">
            {/* Device A: Current Product */}
            <div className="rounded-2xl border-2 border-[#085A2E] bg-[#F8FAF6] p-4 flex flex-col justify-between">
              <div>
                <span className="inline-block rounded-md bg-[#085A2E] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider mb-2">
                  Currently Viewing
                </span>
                <div className="relative aspect-square w-24 sm:w-28 mx-auto overflow-hidden rounded-xl bg-white border border-line p-2 mb-3">
                  <Image
                    src={baseProduct.images[0]?.src ?? "/products/electronics/hp-14-laptop-i5-16gb-1.jpg"}
                    alt={baseProduct.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="block text-[11px] font-bold text-muted uppercase">
                  {brandName(baseProduct)}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-ink line-clamp-2 leading-tight">
                  {baseProduct.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-lg sm:text-xl font-black text-ink">
                    {formatINR(baseProduct.price)}
                  </span>
                  {baseProduct.mrp > baseProduct.price && (
                    <span className="text-xs text-muted line-through">
                      {formatINR(baseProduct.mrp)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60">
                <button
                  type="button"
                  onClick={() => handleAdd(baseProduct)}
                  className="w-full rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add Current to Cart</span>
                </button>
              </div>
            </div>

            {/* Device B: Comparison Candidate */}
            <div className="rounded-2xl border border-line bg-white p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="compare-device-select" className="block text-[10px] font-bold text-muted uppercase tracking-wider">
                    Compare Against
                  </label>
                  {candidates.length > 1 && (
                    <select
                      id="compare-device-select"
                      aria-label="Select alternative device to compare"
                      value={compareProduct?.id}
                      onChange={(e) => setCompareId(e.target.value)}
                      className="rounded-lg border border-line bg-bg px-2 py-0.5 text-xs font-bold text-ink focus:outline-none"
                    >
                      {candidates.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name.slice(0, 32)}...
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {compareProduct ? (
                  <>
                    <div className="relative aspect-square w-24 sm:w-28 mx-auto overflow-hidden rounded-xl bg-white border border-line p-2 mb-3">
                      <Image
                        src={compareProduct.images[0]?.src ?? "/products/electronics/hp-14-laptop-i5-16gb-1.jpg"}
                        alt={compareProduct.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="block text-[11px] font-bold text-muted uppercase">
                      {brandName(compareProduct)}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-ink line-clamp-2 leading-tight">
                      {compareProduct.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-lg sm:text-xl font-black text-ink">
                        {formatINR(compareProduct.price)}
                      </span>
                      {compareProduct.mrp > compareProduct.price && (
                        <span className="text-xs text-muted line-through">
                          {formatINR(compareProduct.mrp)}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center text-xs text-muted">
                    No alternative model available in this category.
                  </div>
                )}
              </div>

              {compareProduct && (
                <div className="mt-4 pt-3 border-t border-line/60 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAdd(compareProduct)}
                    className="flex-1 rounded-xl bg-white border border-[#085A2E] text-[#085A2E] hover:bg-[#F0F8EC] py-2 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    href={`/product/${compareProduct.slug}`}
                    target="_blank"
                    className="grid h-8 w-8 place-items-center rounded-xl border border-line hover:bg-bg text-muted hover:text-ink shrink-0"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Specs Comparison Table */}
          {compareProduct && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-muted">
                Specification &amp; Capability Differences
              </h4>

              <div className="overflow-hidden rounded-2xl border border-line divide-y divide-line/60 bg-white text-xs">
                {allLabels.map((label) => {
                  let valA = "—";
                  let valB = "—";

                  if (label === "Warranty") {
                    valA = `${baseProduct.attrs.department === "electronics" ? baseProduct.attrs.warranty?.months ?? 12 : 12} Months Brand Warranty`;
                    valB = `${compareProduct.attrs.department === "electronics" ? compareProduct.attrs.warranty?.months ?? 12 : 12} Months Brand Warranty`;
                  } else if (label === "Installation") {
                    valA = baseProduct.attrs.department === "electronics" && baseProduct.attrs.installation?.required
                      ? `Required (₹${baseProduct.attrs.installation.fee})`
                      : "Plug-and-play";
                    valB = compareProduct.attrs.department === "electronics" && compareProduct.attrs.installation?.required
                      ? `Required (₹${compareProduct.attrs.installation.fee})`
                      : "Plug-and-play";
                  } else if (label === "Exchange Eligible") {
                    valA = baseProduct.attrs.department === "electronics" && baseProduct.attrs.exchangeEligible ? "Yes (Instant value)" : "No";
                    valB = compareProduct.attrs.department === "electronics" && compareProduct.attrs.exchangeEligible ? "Yes (Instant value)" : "No";
                  } else {
                    const matchA = baseSpecs.find((s) => s.label.toLowerCase() === label.toLowerCase());
                    const matchB = compSpecs.find((s) => s.label.toLowerCase() === label.toLowerCase());
                    valA = matchA?.value ?? "—";
                    valB = matchB?.value ?? "—";
                  }

                  const isDifferent = valA.trim().toLowerCase() !== valB.trim().toLowerCase();
                  if (highlightDiffs && !isDifferent) return null;

                  return (
                    <div
                      key={label}
                      className={cn(
                        "grid grid-cols-12 p-3 transition",
                        isDifferent && highlightDiffs ? "bg-[#F0F8EC]/60" : "bg-white"
                      )}
                    >
                      <div className="col-span-4 sm:col-span-3 font-bold text-muted">
                        <span>{label}</span>
                        {isDifferent && highlightDiffs && (
                          <span className="ml-1.5 rounded-sm bg-[#B8F34A] text-[#002C1E] px-1 text-[9px] font-black uppercase">
                            Diff
                          </span>
                        )}
                      </div>
                      <div className="col-span-4 sm:col-span-4 font-semibold text-ink pr-3">
                        {valA}
                      </div>
                      <div className="col-span-4 sm:col-span-5 font-semibold text-ink pl-3 border-l border-line/60">
                        {valB}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

