"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Info } from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface EditSizeModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  currentSize: string;
  currentColour: string;
  onConfirm: (newSize: string) => void;
}

export function EditSizeModal({
  open,
  onClose,
  product: p,
  currentSize = "L",
  currentColour = "Blue",
  onConfirm,
}: EditSizeModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("XL");

  if (!open) return null;

  const a = p.attrs;
  const isFashion = a.department === "fashion";
  const availableSizes = isFashion ? a.sizes : ["S", "M", "L", "XL", "XXL"];

  const handleConfirm = () => {
    onConfirm(selectedSize);
    toast(`Size updated to ${selectedSize}`);
    onClose();
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-ink">Edit Size</h2>
            <p className="text-xs text-muted mt-0.5">Review your changes before confirming.</p>
          </div>
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
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Previous vs New Value */}
          <div className="flex items-center justify-between rounded-2xl bg-bg/50 p-4 border border-line">
            <div>
              <span className="block text-[11px] font-bold text-muted uppercase tracking-wider">
                Previous value
              </span>
              <strong className="text-2xl font-extrabold text-muted line-through">
                {currentSize}
              </strong>
            </div>

            <ArrowRight className="h-5 w-5 text-muted" />

            <div className="text-right">
              <span className="block text-[11px] font-bold text-muted uppercase tracking-wider">
                New value
              </span>
              <strong className="text-2xl font-extrabold text-ink">{selectedSize}</strong>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-xs font-bold text-ink block mb-2">Choose new size</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    "min-w-12 rounded-xl px-4 py-2 text-xs font-extrabold border transition",
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "bg-white text-ink border-line hover:border-black"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Mini Product Card */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-line/60 bg-white p-3.5 shadow-xs">
            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-xl bg-bg border border-line">
              <Image src={imageSrc} alt="" fill className="object-contain p-0.5" />
            </div>
            <div className="text-xs">
              <strong className="font-bold text-ink block">{p.name}</strong>
              <span className="text-[11px] text-muted block mt-0.5">
                {currentColour} | {isFashion ? a.fit : "Regular fit"}
              </span>
            </div>
          </div>

          {/* Price Difference & Delivery Effect */}
          <div className="space-y-3 rounded-2xl bg-bg/40 p-4 text-xs border border-line/60">
            <div className="flex items-center justify-between">
              <div>
                <strong className="font-bold text-ink block">Price difference</strong>
                <span className="text-[11px] text-muted">No change in price</span>
              </div>
              <span className="font-extrabold text-sm text-ink tabular">₹ 0</span>
            </div>

            <div className="border-t border-line/60 pt-2.5">
              <strong className="font-bold text-ink block">Delivery effect</strong>
              <span className="text-[11px] text-muted">
                Will still be delivered on Thu, 25 Apr, 9 AM – 1 PM
              </span>
            </div>
          </div>

          {/* Countdown / Information Notice */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-bg p-3.5 text-[11px] text-muted leading-relaxed">
            <Info className="h-4 w-4 shrink-0 text-muted mt-0.5" />
            <span>
              Editing closes when preparation starts. You can still make changes to other details
              before then.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full rounded-2xl bg-[#17201B] hover:bg-black py-3.5 text-xs font-extrabold text-white shadow-md transition"
            >
              Confirm change
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border border-line bg-white hover:bg-bg py-3 text-xs font-bold text-ink transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
