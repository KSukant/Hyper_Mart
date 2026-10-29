"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Clock, Calendar, Barcode, Thermometer, Snowflake, Truck, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatDay, addDays, isoDay } from "@/lib/format";
import type { PdpSelection } from "../types";
import { cn } from "@/lib/cn";

interface ShelfLifeAndDeliveryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
}

export function ShelfLifeAndDeliveryModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
}: ShelfLifeAndDeliveryModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>(selection.deliveryDate ?? "tomorrow");
  const [selectedSlot, setSelectedSlot] = useState<string>(selection.timeSlot ?? "8 AM - 12 PM");
  if (!open) return null;

  const a = p.attrs;
  const isFood = a.department === "food";
  const shelfLife = isFood ? a.shelfLifeDays : 6;
  const minShelfLife = isFood ? a.minRemainingShelfLifeDays : 4;
  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  // Dynamic dates
  const today = new Date();
  const dateOptions = [
    { id: "tomorrow", label: `Sat ${today.getDate() + 1}`, sub: "Tomorrow" },
    { id: "day2", label: `Sun ${today.getDate() + 2}`, sub: "Sun" },
    { id: "day3", label: `Mon ${today.getDate() + 3}`, sub: "Mon" },
    { id: "day4", label: `Tue ${today.getDate() + 4}`, sub: "Tue" },
  ];

  const timeSlots = ["8 AM – 12 PM", "12 PM – 4 PM", "4 PM – 8 PM"];

  const handleConfirm = () => {
    onSave({
      deliveryDate: selectedDate,
      timeSlot: selectedSlot,
      coldChainFee: 50,
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
            {/* Left Column: Product Showcase */}
            <div className="space-y-4 lg:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg p-4 border border-line/60 flex items-center justify-center">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-ink">{p.name}</h3>
                <p className="text-xs text-muted font-medium mt-0.5">{p.unit || "500 g"}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200/60">
                    Chilled
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200/60">
                    Perishable
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Conditions, Shelf Life & Slots */}
            <div className="space-y-5 lg:col-span-8">
              <div>
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                  Shelf life and delivery conditions
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Know the freshness, storage requirements, and delivery details for this product.
                </p>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-line p-3.5 bg-bg/40">
                  <div className="flex items-center gap-1.5 text-muted text-xs font-semibold">
                    <Clock className="h-4 w-4 text-emerald-700" />
                    <span>Remaining shelf life</span>
                  </div>
                  <p className="mt-2 font-extrabold text-sm text-ink">{minShelfLife}-{shelfLife} days</p>
                  <p className="text-[11px] text-muted">from delivery date</p>
                </div>

                <div className="rounded-2xl border border-line p-3.5 bg-bg/40">
                  <div className="flex items-center gap-1.5 text-muted text-xs font-semibold">
                    <Calendar className="h-4 w-4 text-emerald-700" />
                    <span>Best-before date</span>
                  </div>
                  <p className="mt-2 font-extrabold text-sm text-ink">
                    {formatDay(isoDay(addDays(today, shelfLife)))}
                  </p>
                  <p className="text-[11px] text-muted">DD MMM YYYY</p>
                </div>

                <div className="rounded-2xl border border-line p-3.5 bg-bg/40">
                  <div className="flex items-center gap-1.5 text-muted text-xs font-semibold">
                    <Barcode className="h-4 w-4 text-emerald-700" />
                    <span>Actual batch</span>
                  </div>
                  <p className="mt-2 font-extrabold text-sm text-ink">TM250412A</p>
                  <p className="text-[11px] text-muted">Packed today morning</p>
                </div>
              </div>

              {/* Storage & Cold-Chain Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-2xl border border-line p-3.5 bg-white">
                  <div className="flex items-start gap-2.5">
                    <Thermometer className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block font-bold text-ink">Storage guidance</strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        Keep refrigerated at 2–8°C. Do not freeze. Keep in original packaging until use.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-line p-3.5 bg-white">
                  <div className="flex items-start gap-2.5">
                    <Snowflake className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="block font-bold text-ink">Cold-chain requirement</strong>
                      <p className="text-muted mt-0.5 leading-relaxed">
                        Delivered in temperature-controlled packaging (2–8°C) to maintain freshness and quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe Delivery Window */}
              <div className="rounded-2xl border border-line p-3.5 bg-bg/30">
                <div className="flex items-start gap-2.5">
                  <Truck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block font-bold text-ink">Safe delivery window</strong>
                    <p className="text-muted mt-0.5">
                      To ensure product quality, delivery is available within 24 hours of order confirmation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time Slot Selection */}
              <div className="space-y-3 pt-2 border-t border-line">
                <div>
                  <span className="block text-xs font-bold text-ink mb-1.5">Select delivery date</span>
                  <div className="flex flex-wrap gap-2">
                    {dateOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedDate(opt.id)}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-xl px-4 py-2 border text-xs font-extrabold transition",
                          selectedDate === opt.id
                            ? "bg-ink text-white border-ink shadow-xs"
                            : "bg-white text-ink border-line hover:border-ink/40"
                        )}
                      >
                        <span>{opt.label}</span>
                        <span className="text-[10px] font-semibold opacity-80">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold text-ink mb-1.5">Select time slot</span>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "rounded-xl px-4 py-2 border text-xs font-bold transition",
                          selectedSlot === slot
                            ? "bg-ink text-white border-ink shadow-xs"
                            : "bg-white text-ink border-line hover:border-ink/40"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cold-chain handling charge */}
              <div className="flex items-center justify-between rounded-2xl bg-[#E7F3DF]/60 p-3.5 border border-[#DFE7D8]">
                <div className="flex items-center gap-2.5">
                  <Snowflake className="h-4 w-4 text-[#2E7032]" />
                  <div className="text-xs">
                    <span className="font-bold text-[#202820] block">Cold-chain handling charge</span>
                    <span className="text-muted">A nominal charge is applied to maintain temperature-controlled delivery.</span>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-[#202820]">₹ 50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-line bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-black"
          >
            Confirm delivery conditions
          </button>
        </div>
      </div>
    </div>
  );
}
