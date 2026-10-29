"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Minus, Plus, RefreshCw, Info } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/format";
import type { PdpSelection } from "../types";

interface QuantityAndWeighingModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
  unitPrice: number;
}

export function QuantityAndWeighingModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  unitPrice,
}: QuantityAndWeighingModalProps) {
  const [qty, setQty] = useState<number>(selection.kg ?? 1);
  if (!open) return null;

  const isSoldByWeight = p.attrs.department === "food" && p.attrs.soldByWeight;
  const unitLabel = isSoldByWeight ? "kg" : p.unit || "unit";
  const pricePerUnit = p.attrs.department === "food" && p.attrs.pricePerKg ? p.attrs.pricePerKg : unitPrice;
  const estimatedTotal = Math.round(pricePerUnit * qty);
  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  const handleSave = () => {
    onSave({ kg: qty });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Quantity and weighing</h2>
          </div>

          {/* Product Mini Row */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-line p-3 bg-bg/50">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white border border-line/60">
              <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-ink">{p.name}</p>
              <p className="text-xs text-muted font-medium">₹ {pricePerUnit} / {unitLabel}</p>
            </div>
          </div>

          {/* Stepper Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">Quantity</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border border-line bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(0.5, +(prev - 0.5).toFixed(1)))}
                    className="grid h-10 w-10 place-items-center text-ink hover:bg-bg transition rounded-l-xl"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-extrabold tabular text-ink">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((prev) => +(prev + 0.5).toFixed(1))}
                    className="grid h-10 w-10 place-items-center text-ink hover:bg-bg transition rounded-r-xl"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs font-bold text-muted">{unitLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-line/60 text-xs">
              <span className="text-muted">Price per unit</span>
              <span className="font-semibold text-ink">₹ {pricePerUnit} / {unitLabel}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-ink">Estimated total</span>
              <span className="font-extrabold text-lg text-ink tabular">{formatINR(estimatedTotal)}</span>
            </div>
          </div>

          {/* Sold by weight notice */}
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50/80 p-3.5 border border-amber-200/60">
            <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-900">
              <strong className="block font-bold">This item is sold by weight</strong>
              <span>The final amount may vary slightly based on the actual weight at the time of packing.</span>
            </div>
          </div>

          {/* Final amount: after weighing */}
          <div className="space-y-3 pt-2 border-t border-line">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted">Final amount: after weighing</h3>
            <p className="text-xs text-muted">You will be charged based on the actual weight of the item.</p>

            <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/80 p-3.5 border border-emerald-200/60">
              <RefreshCw className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-emerald-900">
                <strong className="block font-bold">Difference refunded</strong>
                <span>If the final amount is lower, the difference will be automatically refunded to your original payment method.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-line bg-white p-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-black"
          >
            Save quantity
          </button>
        </div>
      </div>
    </div>
  );
}
