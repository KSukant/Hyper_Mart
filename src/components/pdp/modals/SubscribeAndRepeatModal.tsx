"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Minus, Plus, Calendar, RefreshCw, Pause, FastForward, Play, XCircle, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatINR, formatDay, addDays, isoDay } from "@/lib/format";
import type { PdpSelection } from "../types";
import { cn } from "@/lib/cn";

interface SubscribeAndRepeatModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
  unitPrice: number;
}

export function SubscribeAndRepeatModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  unitPrice,
}: SubscribeAndRepeatModalProps) {
  const [freq, setFreq] = useState<"weekly" | "daily" | "custom">("weekly");
  const [qty, setQty] = useState<number>(selection.kg ?? 1);
  const [day, setDay] = useState<string>("Monday");
  const [agreed, setAgreed] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!open) return null;

  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";
  const pricePerDelivery = Math.round(unitPrice * qty);
  const nextDate = formatDay(isoDay(addDays(new Date(), 4)));

  const handleConfirm = () => {
    onSave({
      subscription: {
        frequency: freq === "daily" ? "daily" : "weekly",
        days: [day],
        startDate: isoDay(addDays(new Date(), 4)),
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Product Snippet */}
            <div className="space-y-4 lg:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg p-4 border border-line/60 flex items-center justify-center">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-4" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-ink">{p.name}</h3>
                <p className="text-xs text-muted font-medium mt-0.5">{p.unit || "500 g"}</p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-extrabold text-lg text-ink">₹ {unitPrice}</span>
                  <span className="text-xs text-muted">(₹ {(unitPrice / 2).toFixed(2)} per 250 g)</span>
                </div>
              </div>

              <div className="rounded-2xl bg-bg/70 p-3.5 border border-line/60 text-xs text-muted leading-relaxed">
                <p className="font-bold text-ink mb-1">Optional convenience</p>
                You&apos;re setting up a subscription for this product. You can always buy it once from the product page instead.
              </div>
            </div>

            {/* Right Column: Subscription Controls */}
            <div className="space-y-5 lg:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Subscribe and repeat</h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Get fresh items delivered automatically, on your schedule. You can change or cancel anytime.
                  </p>
                </div>
                <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Optional
                </span>
              </div>

              {/* Delivery Frequency Cards */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-ink block">Delivery frequency</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "weekly", label: "Weekly", sub: "Most popular" },
                    { id: "daily", label: "Daily", sub: "Fresh every morning" },
                    { id: "custom", label: "Custom", sub: "Choose your schedule" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFreq(item.id as typeof freq)}
                      className={cn(
                        "flex flex-col items-start p-3.5 rounded-2xl border text-left transition",
                        freq === item.id
                          ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                          : "border-line bg-white hover:border-line-dark"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-extrabold text-ink">{item.label}</span>
                        <span
                          className={cn(
                            "h-4 w-4 rounded-full border grid place-items-center",
                            freq === item.id ? "border-ink bg-ink" : "border-line"
                          )}
                        >
                          {freq === item.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted font-medium mt-1">{item.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity per delivery & Day */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-ink block mb-1.5">Quantity per delivery</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-line bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="grid h-9 w-9 place-items-center text-ink hover:bg-bg transition rounded-l-xl"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-10 text-center text-sm font-extrabold text-ink tabular">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="grid h-9 w-9 place-items-center text-ink hover:bg-bg transition rounded-r-xl"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-muted font-semibold">Total weight: {qty * 500} g</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-ink block mb-1.5">Delivery day</span>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="h-10 w-full rounded-xl border border-line bg-white px-3 text-xs font-bold text-ink outline-none focus:border-ink"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Next delivery date callout */}
              <div className="flex items-center gap-3 rounded-2xl bg-bg/50 p-3 border border-line/60 text-xs">
                <Calendar className="h-4 w-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-ink">Next delivery date: {nextDate}</span>
                  <p className="text-muted text-[11px]">We&apos;ll deliver on your selected day, subject to availability.</p>
                </div>
              </div>

              {/* Recurring terms checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-line text-ink accent-ink"
                />
                <span className="leading-relaxed">
                  I understand this is a recurring order. You&apos;ll automatically receive this item at the selected frequency until you pause or cancel. You can manage, skip, pause or cancel anytime from your account.
                </span>
              </label>

              {/* Price summary cards */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-line">
                <div className="rounded-2xl border border-line p-3 bg-bg/30">
                  <span className="text-[11px] text-muted font-medium block">Price per delivery</span>
                  <span className="text-base font-extrabold text-ink tabular">{formatINR(pricePerDelivery)}</span>
                  <span className="text-[10px] text-muted block mt-0.5">{qty * 500} g, inclusive of taxes</span>
                </div>

                <div className="rounded-2xl border border-line p-3 bg-bg/30">
                  <span className="text-[11px] text-muted font-medium block">Price frequency</span>
                  <span className="text-base font-extrabold text-ink capitalize">{freq}</span>
                  <span className="text-[10px] text-muted block mt-0.5">Charged {formatINR(pricePerDelivery)} per delivery</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                disabled={!agreed}
                onClick={handleConfirm}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RefreshCw className="h-4 w-4" /> Confirm subscription
              </button>

              {/* Manage anytime controls */}
              <div className="rounded-2xl border border-line p-3 bg-white text-xs">
                <p className="font-bold text-muted mb-2 text-[11px] uppercase tracking-wider">
                  Manage anytime from your account:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusMsg("Subscription paused (demo)")}
                    className="flex items-center gap-1.5 rounded-lg border border-line p-2 text-ink hover:bg-bg font-semibold text-[11px]"
                  >
                    <Pause className="h-3.5 w-3.5 text-amber-700" />
                    <span>Pause</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusMsg("Next delivery skipped (demo)")}
                    className="flex items-center gap-1.5 rounded-lg border border-line p-2 text-ink hover:bg-bg font-semibold text-[11px]"
                  >
                    <FastForward className="h-3.5 w-3.5 text-blue-700" />
                    <span>Skip next</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusMsg("Deliveries resumed (demo)")}
                    className="flex items-center gap-1.5 rounded-lg border border-line p-2 text-ink hover:bg-bg font-semibold text-[11px]"
                  >
                    <Play className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Resume</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusMsg("Subscription cancelled (demo)")}
                    className="flex items-center gap-1.5 rounded-lg border border-line p-2 text-danger hover:bg-danger-tint font-semibold text-[11px]"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
                {statusMsg && (
                  <p className="mt-2 text-center text-xs font-bold text-emerald-700">{statusMsg}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
