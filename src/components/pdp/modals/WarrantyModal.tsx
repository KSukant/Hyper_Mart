"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ArrowLeft,
  ShieldCheck,
  Download,
  Wrench,
  AlertCircle,
  CheckCircle2,
  FileText,
  Copy,
  ChevronRight,
  Tv,
  Refrigerator,
  Laptop,
  Smartphone,
  Headphones,
  Calendar,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { formatINR } from "@/lib/format";

interface WarrantyModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export function WarrantyModal({ open, onClose, product: p }: WarrantyModalProps) {
  const [activeTab, setActiveTab] = useState<"warranty" | "fit" | "support">("warranty");

  if (!open) return null;

  const a = p.attrs;
  const warrantyMonths =
    a.department === "electronics" ? a.warranty?.months ?? 24 : 24;
  const warrantyYrs = Math.round(warrantyMonths / 12);
  const provider =
    a.department === "electronics"
      ? a.warranty?.provider ?? "Brand Authorised Service"
      : "HyperMart Authorised";

  // Serial number generation based on product ID
  const serialNumber = `HM-${p.id.toUpperCase()}-2026`;

  const copySerial = () => {
    navigator.clipboard.writeText(serialNumber);
    toast(`Serial number copied: ${serialNumber}`);
  };

  const imageSrc =
    p.images[0]?.src ?? "/products/electronics/hp-14-laptop-i5-16gb-1.jpg";

  // Dynamic installation status
  const requiresInstall =
    p.categoryId === "elec-tv" || p.categoryId === "elec-appliances";

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
            <button
              type="button"
              onClick={() => toast("Digital warranty card PDF downloaded")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-neutral-50 shadow-2xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[#085A2E]" /> Download Warranty Card
            </button>
            <button
              type="button"
              onClick={() => toast("Warranty service request initiated")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white px-3.5 py-1.5 text-xs font-bold shadow-xs cursor-pointer"
            >
              <Wrench className="h-3.5 w-3.5" /> Book Brand Service
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100 text-muted hover:text-ink ml-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Product Thumbnail, Details & Sidebar Tabs (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/40 p-4 text-center">
                <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-xl border border-line bg-white p-2">
                  <Image src={imageSrc} alt={p.name} fill className="object-contain p-2" />
                </div>
                <div className="mt-3 text-left">
                  <h3 className="text-sm font-extrabold text-ink leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-[#085A2E] font-bold mt-0.5">
                    {p.categoryId || "Electronics"}
                  </p>
                </div>

                <div className="mt-4 border-t border-line/60 pt-3 text-[11px] space-y-1.5 text-left text-muted">
                  <div className="flex justify-between">
                    <span>Model SKU</span>
                    <strong className="text-ink font-bold">
                      {a.department === "electronics" ? a.model : p.id}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Serial Code</span>
                    <button
                      type="button"
                      onClick={copySerial}
                      className="inline-flex items-center gap-1 font-bold text-[#085A2E] hover:underline cursor-pointer"
                      title="Copy serial code"
                    >
                      <span className="font-mono text-[10px]">{serialNumber}</span>
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage Type</span>
                    <strong className="text-ink font-bold">Comprehensive Brand</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Provider</span>
                    <strong className="text-ink font-bold">{provider}</strong>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation Links */}
              <div className="rounded-2xl border border-line bg-white divide-y divide-line/60 text-xs font-bold shadow-2xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("warranty")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 text-left transition cursor-pointer",
                    activeTab === "warranty"
                      ? "bg-[#F0F8EC] text-[#085A2E]"
                      : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Warranty &amp; Ownership</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("fit")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 text-left transition cursor-pointer",
                    activeTab === "fit"
                      ? "bg-[#F0F8EC] text-[#085A2E]"
                      : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Included In Box</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("support")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 text-left transition cursor-pointer",
                    activeTab === "support"
                      ? "bg-[#F0F8EC] text-[#085A2E]"
                      : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    <span>Authorised Support</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Center & Right: Warranty, Exclusions & Ownership Information (9 cols) */}
            <div className="space-y-5 lg:col-span-9">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#085A2E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                    Official Guarantee
                  </span>
                  <span className="text-xs font-bold text-muted">Digital Certificate</span>
                </div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl mt-1">
                  Warranty &amp; Service Protection
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  100% genuine brand warranty sourced directly from official manufacturers.
                </p>
              </div>

              {/* Top Row: Warranty Summary + Coverage Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Warranty Summary Card */}
                <div className="rounded-2xl border border-[#DCEDD2] bg-white p-4 space-y-3 shadow-2xs">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                    Warranty Summary
                  </h4>
                  <p className="text-[11px] text-muted">Coverage duration and service model.</p>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0F8EC] text-[#085A2E] border border-[#DCEDD2]">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-muted block uppercase">
                        Brand Manufacturer Warranty
                      </span>
                      <strong className="text-xl font-extrabold text-[#085A2E]">
                        {warrantyYrs} Year{warrantyYrs > 1 ? "s" : ""} ({warrantyMonths} Months)
                      </strong>
                      <span className="text-[10px] text-muted block">
                        Activates automatically upon delivery
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 border-t border-line/60 pt-3 text-[11px] text-ink">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#085A2E]" />
                      <span>100% Genuine brand parts replacement</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#085A2E]" />
                      <span>Free technician doorstep visit for TVs &amp; Appliances</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#085A2E]" />
                      <span>Zero paper invoice required — digital GST bill on file</span>
                    </li>
                  </ul>
                </div>

                {/* Coverage Details Card */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2 shadow-2xs">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                    What&apos;s Covered
                  </h4>
                  <p className="text-[11px] text-muted">Authorised repair and component terms.</p>

                  <ul className="space-y-2.5 pt-2 text-xs text-ink/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0 mt-0.5" />
                      <span>Motherboard, display panel, compressor or motor defects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0 mt-0.5" />
                      <span>Factory workmanship failures and assembly issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0 mt-0.5" />
                      <span>Labour costs fully waived at authorised brand centres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0 mt-0.5" />
                      <span>HyperMart 10-day replacement support if unrepairable</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Middle Row: Exclusions, Installation & In-Box Equipment */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Exclusions */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-800">
                    Exclusions
                  </h4>
                  <p className="text-[10px] text-muted">Standard industry non-covered items.</p>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-muted">
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>Physical screen cracks, drops or water immersion</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>Unauthorised third-party repair tampering</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>Voltage surge damage without stabiliser</span>
                    </li>
                  </ul>
                </div>

                {/* Installation Cost */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                      Installation &amp; Demo
                    </h4>
                    <p className="text-[10px] text-muted">HyperMart certified setup.</p>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F0F8EC] text-[#085A2E] border border-[#DCEDD2]">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <div>
                      <strong className="block text-sm font-extrabold text-ink">
                        {requiresInstall ? "Free Brand Setup" : "Plug & Play Ready"}
                      </strong>
                      <p className="text-[10px] text-muted">
                        {requiresInstall
                          ? "Technician brings wall mount or stand and unboxes"
                          : "Self-setup in under 2 minutes with included guide"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Extended Protection Add-on */}
                <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/60 p-4 space-y-2 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                      HyperMart Care+
                    </h4>
                    <p className="text-[10px] text-neutral-600">
                      Add 1 extra year of comprehensive protection.
                    </p>
                    <div className="mt-2">
                      <span className="text-xs font-extrabold text-ink">₹899</span>
                      <span className="text-[10px] text-muted"> / additional year</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("HyperMart Care+ 1-Year Extended Warranty added")}
                    className="w-full rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white py-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Add Extended Warranty
                  </button>
                </div>
              </div>

              {/* Bottom Row: Ownership Lifecycle & Digital Guarantee */}
              <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#085A2E] text-white shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">
                      Automatic Warranty Registration
                    </h4>
                    <p className="text-[11px] text-muted">
                      Your warranty activates digitally on the day of delivery. No paper coupons or registration queues required.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast("Digital certificate PDF sent to registered email")}
                  className="rounded-xl border border-[#085A2E] bg-white text-[#085A2E] px-4 py-2 text-xs font-bold hover:bg-[#F0F8EC] transition shrink-0 cursor-pointer"
                >
                  Email Warranty Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
