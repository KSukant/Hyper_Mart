"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Sparkles, Shield, Package, Calendar, Info, CheckCircle2 } from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface RentalEnquiryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  size?: string;
  colour?: string;
}

export function RentalEnquiryModal({
  open,
  onClose,
  product: p,
  size = "L",
  colour = "Blue",
}: RentalEnquiryModalProps) {
  const a = p.attrs;
  const isFashion = a.department === "fashion";

  const [selectedSize, setSelectedSize] = useState(size);
  const [selectedColour, setSelectedColour] = useState(colour);
  const [startDate, setStartDate] = useState("2025-04-12");
  const [returnDate, setReturnDate] = useState("2025-04-19");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const rentalFee = 249;
  const refundableDeposit = 1000;
  const total = rentalFee + refundableDeposit;

  const handleSubmit = () => {
    setSubmitted(true);
    toast("Rental enquiry submitted! Our team will contact you within 2 hours.");
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Media (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 shrink-0">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="relative h-12 w-10 overflow-hidden rounded-lg bg-bg border border-line"
                    >
                      <Image
                        src={p.images[i]?.src ?? imageSrc}
                        alt=""
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  ))}
                </div>
                <div className="relative aspect-3/4 flex-1 overflow-hidden rounded-2xl bg-bg border border-line shadow-xs">
                  <Image src={imageSrc} alt={p.name} fill className="object-contain p-2" />
                </div>
              </div>
              <div>
                <strong className="block text-sm font-extrabold text-ink">{p.name}</strong>
                <p className="text-[11px] text-muted">
                  {p.highlights?.[0] ?? "A timeless kurta crafted for everyday elegance."}
                </p>
              </div>
            </div>

            {/* Middle: Rental Enquiry Form (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Rental enquiry</h2>
                <p className="mt-1 text-xs text-muted">
                  Check availability and get a rental quote for this item.
                </p>
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-muted mb-1">
                    Selected size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none"
                  >
                    {(isFashion ? a.sizes : ["S", "M", "L", "XL", "XXL"]).map((s) => (
                      <option key={s} value={s}>
                        {s} (Chest 42 in, Length 46 in)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted mb-1">
                    Selected colour
                  </label>
                  <select
                    value={selectedColour}
                    onChange={(e) => setSelectedColour(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none"
                  >
                    {(isFashion && a.colours ? a.colours.map((c) => c.name) : ["Blue", "Black", "Ivory"]).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-1.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      Start date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      Return date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-muted block text-right font-medium">
                  7 days rental
                </span>
              </div>

              {/* Pricing Breakdown */}
              <div className="rounded-2xl border border-line bg-bg/50 p-4 text-xs space-y-2">
                <div className="flex justify-between text-muted">
                  <span>Rental price (7 days) ⓘ</span>
                  <span className="font-bold text-ink">₹ {rentalFee}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Refundable deposit ⓘ</span>
                  <span className="font-bold text-ink">₹ {refundableDeposit.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-line/60 pt-2 font-extrabold text-sm text-ink">
                  <span>Total (pay now)</span>
                  <span className="font-display text-base">₹ {total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Cleaning terms</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Professional cleaning is included in the rental price. Please return the item
                      without self-washing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Damage terms</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Normal wear and tear is accepted. Significant stains, tears or damage may
                      incur additional charges, deducted from the deposit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Package className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Return condition</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Please return the item in good condition with all original components (if
                      any). Failure to return may result in deposit deduction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              {submitted ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs text-emerald-900 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Enquiry submitted! We will email your rental quote shortly.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-2xl bg-[#17201B] hover:bg-black py-3.5 text-xs font-extrabold text-white shadow-md transition"
                >
                  Request rental quote
                </button>
              )}
            </div>

            {/* Right: How It Works Timeline (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-line bg-white p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-ink">How it works</h3>

              <div className="relative pl-6 space-y-5 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    1
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Get a quote</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Select your dates and submit a rental enquiry.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    2
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Accept quote</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      We&apos;ll confirm availability and send you a quote to accept.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    3
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Pay deposit</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Pay the rental amount (if applicable) and refundable deposit.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    4
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Rental order</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Your rental order is confirmed.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    5
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Dispatch tracking</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      We&apos;ll ship the item and share tracking details.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    6
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Return tracking</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Send the item back using the provided labels. We&apos;ll track the return and
                      process your deposit refund.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
