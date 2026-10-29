"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Check,
  CheckCircle2,
  MapPin,
  Thermometer,
  Package,
  Calendar,
  Clock,
  Truck,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface BeautyDeliveryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  cityName: string;
  pincode: string;
  onOpenLocation?: () => void;
}

type DeliveryModalTab = "available" | "slots" | "restricted";

export function BeautyDeliveryModal({
  open,
  onClose,
  product: p,
  selection,
  cityName,
  pincode,
  onOpenLocation,
}: BeautyDeliveryModalProps) {
  const [activeTab, setActiveTab] = useState<DeliveryModalTab>("available");
  const [selectedDate, setSelectedDate] = useState("Tue Apr 29");
  const [selectedSlot, setSelectedSlot] = useState("12:00 PM – 2:00 PM");

  if (!open) return null;

  const a = p.attrs;
  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

  const DATES = [
    { day: "Tue", date: "Apr 29" },
    { day: "Wed", date: "Apr 30" },
    { day: "Thu", date: "May 1" },
    { day: "Fri", date: "May 2" },
    { day: "Sat", date: "May 3" },
  ];

  const SLOTS = [
    "8:00 AM – 10:00 AM",
    "10:00 AM – 12:00 PM",
    "12:00 PM – 2:00 PM",
    "2:00 PM – 4:00 PM",
    "6:00 PM – 8:00 PM",
    "8:00 PM – 10:00 PM",
  ];

  const handleConfirm = () => {
    toast(`Delivery conditions confirmed for ${pincode} (${selectedDate}, ${selectedSlot})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>

          {/* Conditional View Selector Pills */}
          <div className="flex items-center gap-1 rounded-full bg-bg p-1 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("available")}
              className={cn(
                "rounded-full px-2.5 py-0.5 transition",
                activeTab === "available" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              Available
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("slots")}
              className={cn(
                "rounded-full px-2.5 py-0.5 transition",
                activeTab === "slots" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              Slots
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("restricted")}
              className={cn(
                "rounded-full px-2.5 py-0.5 transition",
                activeTab === "restricted" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              Special / Out
            </button>
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
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <div>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              Delivery conditions
            </h2>
            <p className="mt-1 text-xs text-muted">
              Check delivery options and any special handling for this item.
            </p>
          </div>

          {/* Product Mini Header */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3.5">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-bg border border-line/60 shrink-0">
              <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
            </div>
            <div>
              <strong className="block text-xs font-bold text-ink">{p.name}</strong>
              <span className="text-[11px] text-muted">
                Shade: {selection.shade ?? "Rose 04"}
              </span>
            </div>
          </div>

          {/* Location Bar */}
          <div className="flex items-center justify-between rounded-2xl border border-line bg-bg/50 px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted" />
              <div>
                <span className="text-[10px] text-muted block">Selected location</span>
                <strong className="font-bold text-ink">
                  {pincode}, {cityName}
                </strong>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenLocation}
              className="text-xs font-bold text-[#9C2F55] hover:underline"
            >
              Edit
            </button>
          </div>

          {/* ── State 1: Delivery Available ── */}
          {activeTab === "available" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#15803D] text-white shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <div>
                  <strong className="block text-xs font-extrabold text-emerald-950">
                    Delivery available
                  </strong>
                  <span className="text-[11px] text-emerald-800">
                    This item can be delivered to your location.
                  </span>
                </div>
              </div>

              {/* Handling Information */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-ink">Handling information</h4>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Thermometer className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink font-bold">Protect from heat</strong>
                      <p className="text-[11px] text-muted mt-0.5">
                        Keep away from high temperatures during transit. Packed in temperature-moderated carrier bags.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-line/60">
                    <Package className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ink font-bold">Special delivery rules apply</strong>
                      <p className="text-[11px] text-muted mt-0.5">
                        This item requires careful handling due to its formulation. Deliveries may take slightly longer than usual during peak afternoon heat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── State 2: Select Date & Time Slots ── */}
          {activeTab === "slots" && (
            <div className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-ink block">Available delivery dates</span>
                <div className="grid grid-cols-5 gap-2">
                  {DATES.map((d) => {
                    const label = `${d.day} ${d.date}`;
                    const active = selectedDate === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedDate(label)}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-xl p-2 text-center transition border",
                          active
                            ? "bg-[#17201B] text-white border-[#17201B] shadow-xs"
                            : "border-line bg-white text-ink hover:bg-bg"
                        )}
                      >
                        <span className="text-[10px] font-medium opacity-80">{d.day}</span>
                        <strong className="text-xs font-extrabold">{d.date}</strong>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-ink block">Available time slots</span>
                <div className="grid grid-cols-2 gap-2">
                  {SLOTS.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "rounded-xl border py-2.5 px-3 text-xs font-bold transition text-left flex items-center justify-between",
                          active
                            ? "bg-[#FFF5F8] border-[#9C2F55] text-[#701A3C] ring-1 ring-[#9C2F55]"
                            : "border-line bg-white text-ink hover:bg-bg"
                        )}
                      >
                        <span>{slot}</span>
                        {active && <Check className="h-3.5 w-3.5 text-[#9C2F55]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Fee Box */}
              <div className="flex items-center justify-between rounded-xl border border-line bg-bg p-3 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <div>
                    <strong className="block font-bold text-ink">Delivery fee</strong>
                    <span className="text-[11px] text-muted">Standard delivery (2–4 days)</span>
                  </div>
                </div>
                <span className="font-display text-sm font-extrabold text-ink">₹ 49</span>
              </div>
            </div>
          )}

          {/* ── State 3: Special Conditions / Not Available Preview ── */}
          {activeTab === "restricted" && (
            <div className="space-y-4">
              {/* Special Condition */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                  <strong className="text-xs font-extrabold text-amber-950">
                    Available with special condition
                  </strong>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  This item can be delivered to your location with special handling due to heat sensitivity.
                </p>

                <div className="space-y-2 pt-2 border-t border-amber-200/60 text-xs">
                  <div className="flex items-start gap-2">
                    <Thermometer className="h-3.5 w-3.5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-amber-950 text-[11px]">Protect from heat</strong>
                      <p className="text-[10px] text-amber-900">Keep away from high temperatures during transit.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="h-3.5 w-3.5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-amber-950 text-[11px]">Special delivery rules apply</strong>
                      <p className="text-[10px] text-amber-900">Deliveries may take slightly longer than usual.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Not Available at Location */}
              <div className="rounded-2xl border border-line bg-bg/60 p-4 flex items-start gap-3">
                <XCircle className="h-5 w-5 text-muted shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs font-bold text-ink">
                    Not available at this location
                  </strong>
                  <p className="text-[11px] text-muted leading-relaxed mt-0.5">
                    We&apos;re unable to deliver this item to the selected location due to safety and handling restrictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-line bg-bg px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-bold shadow-sm transition"
          >
            Confirm delivery conditions
          </button>
        </div>
      </div>
    </div>
  );
}
