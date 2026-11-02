"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowLeft, X, Minus, Plus, RefreshCw, Info, Scale, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/format";
import type { PdpSelection } from "../types";
import {
  getProducePieceCount,
  getWeightOptions,
  calculateProducePrice,
} from "@/lib/groceryDescriptions";

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

  const a = p.attrs;
  const isFood = a?.department === "food";
  const isSoldByWeight = isFood && a.soldByWeight;
  const unitLabel = isSoldByWeight ? "kg" : p.unit || "unit";

  // Calculate pricing based on current selected grade
  const pricing = calculateProducePrice(p, selection.grade, qty, 1);
  const pieceCount = getProducePieceCount(p, qty, 1);
  const weightOptions = getWeightOptions(p);
  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  const handleSave = () => {
    onSave({ kg: qty });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="weighing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-4 bg-neutral-50/70">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>
          <div className="text-center hidden sm:block">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Weighing &amp; Billing
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h2 id="weighing-modal-title" className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
              Quantity &amp; Certified Weighing
            </h2>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Weigh-scale precision and transparent pricing on all fresh produce.
            </p>
          </div>

          {/* Product Mini Row */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 p-3 bg-neutral-50/60">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white border border-neutral-200">
              <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-extrabold text-sm text-neutral-900 truncate">{p.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {selection.grade && (
                  <span className="rounded bg-neutral-200 px-1.5 py-0.2 text-[10px] font-bold text-neutral-800">
                    Grade {selection.grade}
                  </span>
                )}
                <span className="text-xs text-[#085A2E] font-bold">
                  {formatINR(pricing.pricePerKg)} / {unitLabel}
                </span>
                {isSoldByWeight && (
                  <span className="text-[11px] text-neutral-500">({formatINR(pricing.pricePer500g)} / 500g)</span>
                )}
              </div>
            </div>
          </div>

          {/* Preset Weight Options */}
          {isSoldByWeight && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-800 block">Quick Weight Selection</span>
              <div className="grid grid-cols-3 gap-2">
                {weightOptions.map((opt) => {
                  const active = qty === opt.kg;
                  return (
                    <button
                      key={opt.kg}
                      type="button"
                      onClick={() => setQty(opt.kg)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        active
                          ? "border-[#085A2E] bg-[#085A2E] text-white shadow-xs"
                          : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                      }`}
                    >
                      <span className="font-bold text-sm block">{opt.label}</span>
                      <span className={`text-[10px] line-clamp-1 mt-0.5 ${active ? "text-white/80" : "text-neutral-500"}`}>
                        {opt.countDesc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stepper Card */}
          <div className="space-y-3 rounded-2xl bg-neutral-50 p-4 border border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-neutral-900 block">Selected Quantity</span>
                <span className="text-xs text-[#085A2E] font-semibold">{pieceCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border border-neutral-300 bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQty((prev) => Math.max(0.25, +(prev - 0.25).toFixed(2)))}
                    className="grid h-10 w-10 place-items-center text-neutral-800 hover:bg-neutral-100 transition rounded-l-xl"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-14 text-center text-sm font-extrabold tabular text-neutral-900">
                    {qty} {unitLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((prev) => +(prev + 0.25).toFixed(2))}
                    className="grid h-10 w-10 place-items-center text-neutral-800 hover:bg-neutral-100 transition rounded-r-xl"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs">
              <span className="text-neutral-600">Base Unit Rate</span>
              <span className="font-semibold text-neutral-900">{formatINR(pricing.pricePerKg)} / {unitLabel}</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-neutral-200 text-sm">
              <span className="font-extrabold text-neutral-900">Estimated Total</span>
              <span className="font-black text-xl text-[#085A2E] tabular">{formatINR(pricing.estimatedTotal)}</span>
            </div>
          </div>

          {/* Sold by weight notice */}
          {isSoldByWeight && (
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50/90 p-3.5 border border-amber-200/80">
              <Scale className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-amber-900">
                <strong className="block font-bold">Sold by Certified Weight</strong>
                <span>
                  Our fulfilment staff place produce on calibrated Class-III digital scales before packing. Your final billed amount matches actual weight.
                </span>
              </div>
            </div>
          )}

          {/* Final amount: after weighing */}
          <div className="space-y-3 pt-1 border-t border-neutral-200">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
              Fair Weighing Guarantee
            </h3>
            <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/90 p-3.5 border border-emerald-200/80">
              <RefreshCw className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-emerald-900">
                <strong className="block font-bold">Automatic Adjustment &amp; Refund</strong>
                <span>
                  If actual packed weight is lower than estimated, the exact rupee difference is refunded back immediately to your payment source.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-neutral-200 bg-white p-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-xl bg-[#085A2E] py-3 text-sm font-black text-white transition hover:bg-[#064825] active:scale-98 shadow-sm"
          >
            Save quantity ({qty} {unitLabel})
          </button>
        </div>
      </div>
    </div>
  );
}
