"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Check,
  Sparkles,
  Truck,
  RotateCcw,
  Gift,
  Tag,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface SampleOrFullSizeModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSelectFormat: (format: "sample" | "full", qty: number) => void;
}

export function SampleOrFullSizeModal({
  open,
  onClose,
  product: p,
  selection,
  onSelectFormat,
}: SampleOrFullSizeModalProps) {
  const [sampleQty, setSampleQty] = useState(1);
  const [fullQty, setFullQty] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<"sample" | "full">("full");

  if (!open) return null;

  const a = p.attrs;
  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

  const handleChoose = (fmt: "sample" | "full") => {
    setSelectedFormat(fmt);
    const qty = fmt === "sample" ? sampleQty : fullQty;
    onSelectFormat(fmt, qty);
    toast(
      fmt === "sample"
        ? `Sample size added to bag (${qty} unit) with ₹299 credit towards full size`
        : `Full size added to bag (${qty} unit)`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Choose sample or full size
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Same formula. Find your fit or stock up — your choice will be added to the same cart and returned to this product page.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Product Hero */}
            <div className="lg:col-span-3 space-y-3">
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
                  Shade: {selection.shade ?? "Rose 04"}
                </p>
              </div>
            </div>

            {/* Center Choice Cards (2 Cards) */}
            <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
              {/* Card 1: Sample Size (TRY FIRST) */}
              <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-xs transition hover:shadow-card">
                <div className="space-y-3">
                  <span className="inline-block rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-900 uppercase tracking-wider">
                    Try First
                  </span>

                  <div>
                    <h4 className="text-base font-extrabold text-ink">Sample size</h4>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">
                      Perfect for trying the color and feel before you commit.
                    </p>
                  </div>

                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-bg/60 border border-line/40">
                    <Image
                      src="/products/beauty/minimalist-niacinamide-serum-10ml-mini-1.jpg"
                      alt="Sample miniature"
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="text-center pt-1">
                    <span className="block text-xs text-muted">2.5 ml</span>
                    <span className="font-display text-2xl font-extrabold text-ink tabular">
                      ₹ 299
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-xs font-bold text-ink">Quantity</span>
                    <div className="flex items-center gap-1 rounded-xl border border-line bg-bg p-0.5">
                      <button
                        type="button"
                        onClick={() => setSampleQty(Math.max(1, sampleQty - 1))}
                        disabled={sampleQty <= 1}
                        className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-extrabold tabular text-ink">
                        {sampleQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSampleQty(sampleQty + 1)}
                        className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    type="button"
                    onClick={() => handleChoose("sample")}
                    className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-black shadow-sm transition"
                  >
                    Choose sample size
                  </button>

                  <div className="flex items-start gap-2 rounded-xl bg-amber-50/70 border border-amber-200/80 p-2.5 text-[11px] text-amber-950">
                    <Gift className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">₹ 299 sample credit</strong>
                      <p className="text-[10px] text-amber-900 mt-0.5">
                        Get ₹299 off your next full size purchase of this product. Credit applied automatically at checkout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Full Size (BEST VALUE) */}
              <div className="flex flex-col justify-between rounded-3xl border-2 border-[#17201B] bg-white p-5 shadow-xs transition hover:shadow-card">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-md bg-[#17201B] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      Best Value
                    </span>
                    <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-black text-rose-800">
                      20% OFF
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-ink">Full size</h4>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">
                      Your everyday bottle for home, work and travel.
                    </p>
                  </div>

                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-bg/60 border border-line/40">
                    <Image
                      src={imageSrc}
                      alt="Full size product"
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="text-center pt-1">
                    <span className="block text-xs text-muted">{p.unit}</span>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="font-display text-2xl font-extrabold text-ink tabular">
                        ₹ {p.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-semibold text-muted line-through tabular">
                        ₹ {p.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="text-xs font-bold text-ink">Quantity</span>
                    <div className="flex items-center gap-1 rounded-xl border border-line bg-bg p-0.5">
                      <button
                        type="button"
                        onClick={() => setFullQty(Math.max(1, fullQty - 1))}
                        disabled={fullQty <= 1}
                        className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-extrabold tabular text-ink">
                        {fullQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFullQty(fullQty + 1)}
                        className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    type="button"
                    onClick={() => handleChoose("full")}
                    className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-black shadow-sm transition"
                  >
                    Choose full size
                  </button>

                  <div className="flex items-start gap-2 rounded-xl bg-bg p-2.5 text-[11px] text-muted">
                    <Tag className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink font-bold">No credit needed</strong>
                      <p className="text-[10px] mt-0.5">
                        Already know you love it? Get the full size at the best value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <div className="border-b border-line/60 pb-2.5">
                  <span className="text-[10px] font-bold text-muted uppercase">Your selected shade</span>
                  <div className="flex items-center justify-between mt-1">
                    <strong className="text-xs font-extrabold text-ink">
                      {selection.shade ?? "Rose 04"}
                    </strong>
                    <button
                      type="button"
                      onClick={() => toast("Open shade selector")}
                      className="text-[11px] font-bold text-[#9C2F55] hover:underline"
                    >
                      Change shade
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-ink py-1">
                  <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Ships within 24 hours</strong>
                    <p className="text-[11px] text-muted">Delivers in 2–4 days in your city.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-ink py-1 border-t border-line/60 pt-2.5">
                  <RotateCcw className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Sealed product returns</strong>
                    <p className="text-[11px] text-muted">
                      Returns accepted within 7 days. Tamper-evident seal must remain intact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-line/80 bg-bg/50 p-4 text-xs text-muted space-y-1">
                <strong className="block text-ink font-bold">Your choice</strong>
                <p className="text-[11px] leading-relaxed">
                  Your selected option will be added to the same cart and you&apos;ll return to this product page after adding to cart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
