"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Wrench,
  RefreshCw,
  Repeat,
  CheckCircle2,
  MapPin,
  Truck,
  ChevronDown,
  Info,
  ShieldCheck,
  ChevronRight,
  Check,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface RepairAndExchangeModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  cityName: string;
  pincode: string;
  onOpenExchangePrep: () => void;
}

export function RepairAndExchangeModal({
  open,
  onClose,
  product: p,
  selection,
  cityName,
  pincode,
  onOpenExchangePrep,
}: RepairAndExchangeModalProps) {
  const [locationInput, setLocationInput] = useState(`${pincode || "560001"}, ${cityName || "Bengaluru"}`);
  const [category, setCategory] = useState("Laptops");

  if (!open) return null;

  const a = p.attrs;
  const configLabel =
    selection.configuration ??
    (a.department === "electronics" ? a.specs[1]?.value ?? "16 GB RAM / 512 GB SSD" : p.unit);

  const imageSrc =
    p.images[0]?.src ?? "/products/electronics/hp-14-laptop-i5-16gb-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Product Header Strip */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-xl border border-line bg-[#F8FAF7] p-1 shrink-0">
                <Image src={imageSrc} alt={p.name} fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-ink sm:text-lg">{p.name}</h2>
                <p className="text-xs text-muted">
                  {configLabel} &bull; <span className="text-[#1D4E89] font-semibold">Electronics &gt; Laptops &gt; Thin &amp; Light Laptops</span>
                </p>
              </div>
            </div>

            {/* Right Promo Box */}
            <div className="rounded-2xl border border-[#CFE0F5] bg-[#EFF6FF] p-3 text-xs max-w-md">
              <strong className="block text-ink font-bold">Get the right service for your device</strong>
              <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
                Repair, refurbished, or exchange &mdash; all from the same place. This is a support service for your product, not a marketplace.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Repair, refurbished, or exchange
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Choose the service that best fits your needs for this device.
            </p>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-ink">Your location</label>
              <div className="relative mt-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter pincode or city"
                  className="w-full rounded-xl border border-line bg-bg pl-9 pr-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink">Device category</label>
              <div className="relative mt-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                >
                  <option value="Laptops">Laptops</option>
                  <option value="Smartphones">Smartphones &amp; Tablets</option>
                  <option value="Appliances">Home Appliances &amp; TVs</option>
                  <option value="Audio">Headphones &amp; Audio</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              </div>
            </div>
          </div>

          {/* 3 Service Options Cards Matching Screen 6 */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Card 1: Repair */}
            <div className="rounded-2xl border border-line/80 bg-white p-5 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#1D4E89]/40 transition">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-[10px] font-bold text-muted border border-line">
                    1
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5]">
                    <Wrench className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-ink">Repair</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Fix your device with authorised service. Use genuine parts and trained technicians.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-line/60 pt-3 text-xs text-ink/90">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Genuine parts</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Trained technicians</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Fast turnaround</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toast("Repair enquiry logged. Service appointment bookable.")}
                  className="w-full rounded-xl bg-[#17201B] hover:bg-black text-white py-2.5 text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>Find repair</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Refurbished */}
            <div className="rounded-2xl border border-line/80 bg-white p-5 space-y-4 flex flex-col justify-between shadow-xs hover:border-[#1D4E89]/40 transition">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-[10px] font-bold text-muted border border-line">
                    2
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5]">
                    <RefreshCw className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-ink">Refurbished</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Consider a certified refurbished device as a cost-effective alternative.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-line/60 pt-3 text-xs text-ink/90">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Quality checked (40 points)</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Covered by warranty</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />
                    <span>Better for the planet</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toast("Refurbished catalogue opened for Laptops")}
                  className="w-full rounded-xl border-2 border-line bg-white hover:bg-bg text-ink py-2 text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>View refurbished options</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Exchange */}
            <div className="rounded-2xl border-2 border-[#1D4E89] bg-[#F0F6FD] p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-bold text-[#1D4E89] border border-[#1D4E89]">
                    3
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#1D4E89] text-white">
                    <Repeat className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-ink">Exchange</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Trade in your current device and get value towards a replacement.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#CFE0F5] pt-3 text-xs text-ink/90">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#1D4E89]" />
                    <span>Get exchange value estimate</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#1D4E89]" />
                    <span>Apply instantly to new device</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#1D4E89]" />
                    <span>Responsible recycling</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenExchangePrep();
                  }}
                  className="w-full rounded-xl bg-[#1D4E89] hover:bg-[#153A68] text-white py-2.5 text-xs font-black transition shadow-sm flex items-center justify-center gap-1"
                >
                  <span>Exchange this device</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Service Availability Footer */}
          <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-white shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <div>
                  <strong className="block text-ink font-bold">
                    All services are available at {locationInput}
                  </strong>
                  <span className="text-[11px] text-muted">
                    You can change your pincode above to check availability in a different area.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted sm:border-l sm:border-line/60 sm:pl-4">
                <Truck className="h-4 w-4 text-muted shrink-0" />
                <div>
                  <strong className="block text-ink font-semibold">Options include in-store, pickup and delivery</strong>
                  <span className="text-[11px] text-muted">Availability and timelines may vary by location.</span>
                </div>
              </div>
            </div>

            <div className="border-t border-line/60 pt-2 text-[11px] text-muted flex items-start gap-1.5">
              <Info className="h-3.5 w-3.5 text-muted shrink-0 mt-0.5" />
              <p>
                Select a service option to see pricing, timelines, and 3 detailed instructions for your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
