"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
  Home,
  Sun,
  Thermometer,
  AlertTriangle,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import type { PdpSelection } from "../types";

interface BatchAndExpiryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
}

export function BatchAndExpiryModal({
  open,
  onClose,
  product: p,
  selection,
}: BatchAndExpiryModalProps) {
  if (!open) return null;

  const a = p.attrs;
  const isBeauty = a.department === "beauty";
  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

  const handleSave = () => {
    toast("Batch, expiry & handling records attached to product");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
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
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Product Artwork */}
            <div className="space-y-4 lg:col-span-4">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                <Image
                  src={imageSrc}
                  alt={p.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-ink">{p.name}</h3>
                <p className="text-xs text-muted mt-0.5">
                  {p.unit} · {selection.shade ? `Shade: ${selection.shade}` : "Standard edition"}
                </p>
              </div>
            </div>

            {/* Right Column: Screen 7 Batch, Expiry & Handling Grid */}
            <div className="space-y-6 lg:col-span-8">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Batch, expiry, seal, and handling
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Key product information for your safety and confidence.
                </p>
              </div>

              {/* 8 Information Cards Grid */}
              <div className="grid gap-3.5 sm:grid-cols-2 text-xs">
                {/* 1. Expiry */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <Calendar className="h-4 w-4 text-[#17201B]" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Expiry</span>
                    <strong className="font-extrabold text-ink text-sm">30 Jun 2027</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      From date of manufacture.
                    </span>
                  </div>
                </div>

                {/* 2. Remaining shelf life */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <Clock className="h-4 w-4 text-[#17201B]" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Remaining shelf life</span>
                    <strong className="font-extrabold text-ink text-sm">23 months</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      Based on today&apos;s date.
                    </span>
                  </div>
                </div>

                {/* 3. Batch number */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <FileText className="h-4 w-4 text-[#17201B]" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Batch number</span>
                    <strong className="font-mono font-bold text-ink text-sm">RB04A7K</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      Actual batch supplied.
                    </span>
                  </div>
                </div>

                {/* 4. Seal checked */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <ShieldCheck className="h-4 w-4 text-[#15803D]" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Seal checked</span>
                    <strong className="font-extrabold text-[#15803D] text-sm">Yes</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      Product received in original sealed packaging.
                    </span>
                  </div>
                </div>

                {/* 5. Storage instructions */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <Home className="h-4 w-4 text-[#17201B]" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Storage instructions</span>
                    <strong className="font-extrabold text-ink">Store in a cool, dry place</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      Keep away from direct sunlight. Close cap tightly after use.
                    </span>
                  </div>
                </div>

                {/* 6. Protect from heat */}
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink shrink-0">
                    <Sun className="h-4 w-4 text-amber-600" />
                  </span>
                  <div>
                    <span className="text-[11px] text-muted block">Protect from heat</span>
                    <strong className="font-extrabold text-ink">Yes</strong>
                    <span className="text-[10px] text-muted block mt-0.5">
                      Do not expose to high temperatures (e.g. in a car or direct sunlight).
                    </span>
                  </div>
                </div>

                {/* 7. Heat-sensitive product */}
                <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/60 p-4 sm:col-span-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-rose-700 border border-rose-200 shrink-0">
                    <Thermometer className="h-4 w-4 text-rose-700" />
                  </span>
                  <div>
                    <strong className="font-extrabold text-rose-950 block">Heat-sensitive product</strong>
                    <p className="text-[11px] text-rose-900 mt-0.5 leading-relaxed">
                      High temperatures may affect the texture, performance, and safety of this product. Fulfilled with insulated packaging from your local warehouse.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Save Record Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/80 pt-4">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FileText className="h-4 w-4 text-muted shrink-0" />
                  <div>
                    <strong className="block text-ink font-semibold">Information saved to your order</strong>
                    <span className="text-[11px]">
                      Batch, expiry, seal and handling data are attached to your order record for reference, support, and in case of a return or product query.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-2.5 font-bold text-xs shadow-sm transition"
                >
                  Save product information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
