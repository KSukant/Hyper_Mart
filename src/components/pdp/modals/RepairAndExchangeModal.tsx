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
import { brandName } from "@/lib/catalog";

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
  const [locationInput, setLocationInput] = useState(
    `${pincode || "560001"}, ${cityName || "Bengaluru"}`
  );

  const getCategoryTitle = () => {
    if (p.categoryId === "elec-tv") return "Televisions";
    if (p.categoryId === "elec-appliances") return "Large Appliances";
    if (p.categoryId === "elec-mobiles" || p.categoryId === "elec-refurbished")
      return "Mobiles & Tablets";
    if (p.categoryId === "elec-audio") return "Audio & Soundbars";
    return "Laptops & Computing";
  };

  const [category, setCategory] = useState(getCategoryTitle());

  if (!open) return null;

  const a = p.attrs;
  const configLabel =
    selection.configuration ??
    (a.department === "electronics" ? a.specs[1]?.value ?? p.unit : p.unit);

  const imageSrc =
    p.images[0]?.src ?? "/products/electronics/hp-14-laptop-i5-16gb-1.jpg";

  const getBreadcrumb = () => {
    const brand = brandName(p);
    return `Electronics > ${getCategoryTitle()} > ${brand} ${p.name}`;
  };

  const getExchangeMaxVal = () => {
    if (p.categoryId === "elec-appliances") return "₹12,000";
    if (p.categoryId === "elec-tv") return "₹8,500";
    if (p.categoryId === "elec-mobiles" || p.categoryId === "elec-refurbished")
      return "₹18,000";
    if (p.categoryId === "elec-audio") return "₹2,500";
    return "₹22,000";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#085A2E]" /> Back to product
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex rounded-full bg-[#F0F8EC] border border-[#DCEDD2] px-2.5 py-0.5 text-xs font-bold text-[#085A2E]">
              HyperMart Lifecycle Care
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100 text-muted hover:text-ink cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Product Header Strip */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-xl border border-line bg-[#F8FAF7] p-1 shrink-0 overflow-hidden">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-ink sm:text-lg line-clamp-1">
                  {p.name}
                </h2>
                <p className="text-xs text-muted">
                  {configLabel} &bull;{" "}
                  <span className="text-[#085A2E] font-semibold">{getBreadcrumb()}</span>
                </p>
              </div>
            </div>

            {/* Right Promo Box */}
            <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC] p-3 text-xs max-w-md">
              <strong className="block text-[#085A2E] font-bold">
                HyperMart Authorised Services &amp; Trade-In
              </strong>
              <p className="text-[11px] text-[#14532D] mt-0.5 leading-relaxed">
                Repairs with 100% genuine parts, certified refurbished upgrades, and instant doorstep exchange valuations.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Repair, Refurbished, or Exchange
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Choose the lifecycle service best suited for your device:
            </p>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-ink">Service location</label>
              <div className="relative mt-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#085A2E]" />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter pincode or city"
                  className="w-full rounded-xl border border-line bg-bg pl-9 pr-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink">Device category</label>
              <div className="relative mt-1">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none pr-8 cursor-pointer"
                >
                  <option value="Televisions">Televisions</option>
                  <option value="Large Appliances">Large Appliances</option>
                  <option value="Laptops & Computing">Laptops &amp; Computing</option>
                  <option value="Mobiles & Tablets">Mobiles &amp; Tablets</option>
                  <option value="Audio & Soundbars">Audio &amp; Soundbars</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              </div>
            </div>
          </div>

          {/* 3 Service Options Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Card 1: Repair */}
            <div className="rounded-2xl border border-line/80 bg-white p-5 space-y-4 flex flex-col justify-between shadow-2xs hover:border-[#085A2E]/40 transition">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-[10px] font-bold text-muted border border-line">
                    1
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0F8EC] text-[#085A2E] border border-[#DCEDD2]">
                    <Wrench className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-ink">Doorstep Repair</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Certified technicians dispatched to your home with brand-original components and 90-day post-repair warranty.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-line/60 pt-3 text-xs text-ink/90">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Original manufacturer spare parts</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Free diagnostic with repair approval</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>90-day service warranty guarantee</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toast(`Repair technician request registered for ${p.name}`)}
                  className="w-full rounded-xl bg-neutral-900 hover:bg-black text-white py-2.5 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book Repair Visit</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Refurbished */}
            <div className="rounded-2xl border border-line/80 bg-white p-5 space-y-4 flex flex-col justify-between shadow-2xs hover:border-[#085A2E]/40 transition">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bg text-[10px] font-bold text-muted border border-line">
                    2
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0F8EC] text-[#085A2E] border border-[#DCEDD2]">
                    <RefreshCw className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-ink">Certified Refurbished</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Grade-A refurbished devices rigorously tested across 45 hardware checkpoints with 1-Year HyperMart warranty.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-line/60 pt-3 text-xs text-ink/90">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Up to 50% savings vs new MSRP</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>1-Year comprehensive warranty</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Clean sanitised accessories in box</span>
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toast(`Viewing refurbished ${getCategoryTitle()} catalogue`)}
                  className="w-full rounded-xl border border-line bg-white hover:bg-neutral-50 text-ink py-2 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Browse Refurbished</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Exchange */}
            <div className="rounded-2xl border-2 border-[#085A2E] bg-[#F0F8EC]/60 p-5 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#085A2E] text-[10px] font-bold text-white">
                    3
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#085A2E] text-white">
                    <Repeat className="h-5 w-5" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-[#085A2E]">Instant Exchange</h3>
                    <span className="text-[10px] font-black uppercase bg-[#085A2E] text-white px-2 py-0.5 rounded-full">
                      Up to {getExchangeMaxVal()}
                    </span>
                  </div>
                  <p className="text-xs text-[#14532D] mt-1 leading-relaxed">
                    Trade in your old {category.toLowerCase()} device at doorstep during delivery. Handover occurs after new product unboxing.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#DCEDD2] pt-3 text-xs text-neutral-800">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Instant deduction at checkout</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Free doorstep pickup &amp; data wipe verification</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#085A2E]" />
                    <span>Zero hassle — old device taken on delivery</span>
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
                  className="w-full rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white py-2.5 text-xs font-black transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Prepare Handover &amp; Exchange</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Service Availability Footer */}
          <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#085A2E] text-white shrink-0">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <div>
                  <strong className="block text-ink font-bold">
                    Services confirmed operational for {locationInput}
                  </strong>
                  <span className="text-[11px] text-muted">
                    Technician dispatch window: 10:00 AM – 7:00 PM Monday through Saturday.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted sm:border-l sm:border-line/60 sm:pl-4">
                <Truck className="h-4 w-4 text-[#085A2E] shrink-0" />
                <div>
                  <strong className="block text-ink font-semibold">
                    Free doorstep collection
                  </strong>
                  <span className="text-[11px] text-muted">
                    Zero transit damage liability once handed to technician.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
