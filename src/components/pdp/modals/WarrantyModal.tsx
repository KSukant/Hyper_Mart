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
  Headphones,
  Sliders,
  Laptop,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface WarrantyModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

export function WarrantyModal({ open, onClose, product: p }: WarrantyModalProps) {
  const [activeTab, setActiveTab] = useState<"warranty" | "fit" | "support">("warranty");

  if (!open) return null;

  const a = p.attrs;
  const warrantyMonths = a.department === "electronics" ? a.warranty?.months ?? 24 : 24;
  const warrantyYrs = Math.round(warrantyMonths / 12);
  const provider = a.department === "electronics" ? a.warranty?.provider ?? "HP / HyperMart" : "HyperMart";

  const copySerial = () => {
    navigator.clipboard.writeText("SN4Z8X7Q1P3");
    toast("Serial number copied to clipboard: SN4Z8X7Q1P3");
  };

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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toast("Digital warranty card downloaded (PDF)")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-bg shadow-xs"
            >
              <Download className="h-3.5 w-3.5" /> Download warranty card
            </button>
            <button
              type="button"
              onClick={() => toast("Warranty service request initiated")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#17201B] hover:bg-black text-white px-3.5 py-1.5 text-xs font-bold shadow-xs"
            >
              <Wrench className="h-3.5 w-3.5" /> Request service
            </button>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink ml-1"
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
              <div className="rounded-2xl border border-line/80 bg-[#F8FAF7] p-4 text-center">
                <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-xl">
                  <Image src={imageSrc} alt={p.name} fill className="object-contain" />
                </div>
                <div className="mt-3 text-left">
                  <h3 className="text-sm font-extrabold text-ink leading-snug">{p.name}</h3>
                  <p className="text-[11px] text-muted">
                    {a.department === "electronics" ? a.specs[1]?.value ?? "16 GB RAM / 512 GB SSD" : p.unit}
                  </p>
                </div>

                <div className="mt-4 border-t border-line/60 pt-3 text-[11px] space-y-1.5 text-left text-muted">
                  <div className="flex justify-between">
                    <span>Model</span>
                    <strong className="text-ink font-bold">
                      {a.department === "electronics" ? a.model : "TL14-512"}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>SKU</span>
                    <strong className="text-ink font-bold">12345678</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Serial Number</span>
                    <button
                      type="button"
                      onClick={copySerial}
                      className="inline-flex items-center gap-1 font-bold text-ink hover:text-[#1D4E89]"
                      title="Copy serial number"
                    >
                      <span>SN4Z8X7Q1P3</span>
                      <Copy className="h-3 w-3 text-muted" />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span>Purchase Date</span>
                    <strong className="text-ink font-bold">Mar 12, 2024</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Purchase From</span>
                    <strong className="text-ink font-bold">Online Store</strong>
                  </div>
                </div>
              </div>

              {/* Sidebar Navigation Links */}
              <div className="rounded-2xl border border-line bg-white divide-y divide-line/60 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("warranty")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 text-left transition",
                    activeTab === "warranty"
                      ? "bg-[#EFF6FF] text-[#1D4E89]"
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
                    "w-full flex items-center justify-between p-3 text-left transition",
                    activeTab === "fit"
                      ? "bg-[#EFF6FF] text-[#1D4E89]"
                      : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4" />
                    <span>Fit &amp; Compatibility</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("support")}
                  className={cn(
                    "w-full flex items-center justify-between p-3 text-left transition",
                    activeTab === "support"
                      ? "bg-[#EFF6FF] text-[#1D4E89]"
                      : "text-muted hover:text-ink"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    <span>Support</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Center & Right: Warranty, Exclusions & Ownership Information (9 cols) */}
            <div className="space-y-5 lg:col-span-9">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Warranty and ownership information
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Coverage details, ownership records, and service information for your product.
                </p>
              </div>

              {/* Top Row: Warranty Summary + Coverage Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Warranty Summary Card */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3 shadow-xs">
                  <h4 className="text-xs font-extrabold text-ink">Warranty summary</h4>
                  <p className="text-[11px] text-muted">A quick overview of your coverage.</p>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5]">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-muted block uppercase">
                        Standard Warranty
                      </span>
                      <strong className="text-xl font-extrabold text-ink">
                        {warrantyYrs} Year{warrantyYrs > 1 ? "s" : ""}
                      </strong>
                      <span className="text-[10px] text-muted block">from purchase date</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 border-t border-line/60 pt-3 text-[11px] text-ink">
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#15803D]" />
                      <span>Manufacturing defects covered</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#15803D]" />
                      <span>Parts and labor included</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#15803D]" />
                      <span>Service through authorised providers</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#15803D]" />
                      <span>Proof of purchase required</span>
                    </li>
                  </ul>
                </div>

                {/* Coverage Details Card */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2 shadow-xs">
                  <h4 className="text-xs font-extrabold text-ink">Coverage details</h4>
                  <p className="text-[11px] text-muted">What&apos;s included in your warranty.</p>

                  <ul className="space-y-2.5 pt-2 text-xs text-ink/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>Repairs for manufacturing defects in materials or workmanship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>Replacement of defective parts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>Labor costs for covered repair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>Technical support for warranty-related issues</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Middle Row: Exclusions, Installation Cost, Required Accessories (3 cols) */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Exclusions */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-ink">Exclusions</h4>
                  <p className="text-[10px] text-muted">Items not covered under warranty.</p>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-muted">
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                      <span>Accidental damage (drops, spills, etc.)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                      <span>Normal wear and tear (e.g., ear pads, cables, batteries)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                      <span>Damage from unauthorised repairs or modifications</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                      <span>Cosmetic damage (scratches, dents, etc.)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <X className="h-3.5 w-3.5 text-danger shrink-0 mt-0.5" />
                      <span>Loss or theft</span>
                    </li>
                  </ul>
                </div>

                {/* Installation Cost */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">Installation cost</h4>
                    <p className="text-[10px] text-muted">Cost to setup or install, if applicable.</p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-bg text-muted border border-line">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <div>
                      <strong className="block text-sm font-extrabold text-ink">Not applicable</strong>
                      <p className="text-[10px] text-muted">This product does not require professional installation.</p>
                    </div>
                  </div>
                </div>

                {/* Required Accessories */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">Required accessories</h4>
                    <p className="text-[10px] text-muted">Items needed for proper use (sold separately unless noted).</p>
                  </div>
                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-ink">3.5 mm audio cable (optional)</span>
                      <span className="text-muted font-semibold">Not included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink font-bold">USB-C charging cable</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink">USB power adapter</span>
                      <span className="text-muted font-semibold">Not included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink font-bold">Carrying case</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Known Service Information + Ownership Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Known Service Information */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">Known service information</h4>
                    <p className="text-[11px] text-muted">Important updates about your product.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-xl border border-line bg-bg/50 p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1D4E89]" />
                        <div>
                          <strong className="block font-bold text-ink">Battery performance update</strong>
                          <span className="text-[10px] text-muted">Source: Service Bulletin &bull; Jan 15, 2024</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </div>

                    <div className="rounded-xl border border-line bg-bg/50 p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1D4E89]" />
                        <div>
                          <strong className="block font-bold text-ink">Firmware stability patch v2.4</strong>
                          <span className="text-[10px] text-muted">Source: Support Advisory &bull; Nov 02, 2023</span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </div>
                  </div>
                </div>

                {/* Ownership Information */}
                <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">Ownership information</h4>
                    <p className="text-[11px] text-muted">Details from your purchase record.</p>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs divide-y divide-line/60">
                    <div className="flex justify-between py-1">
                      <span className="text-muted">Registered Owner</span>
                      <strong className="text-ink font-bold">Alex Smith</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted">Purchase Date</span>
                      <strong className="text-ink font-bold">Mar 12, 2024</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted">Purchase From</span>
                      <strong className="text-ink font-bold">Online Store</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted">Proof of Purchase</span>
                      <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-bold">On file</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted">Warranty Status</span>
                      <strong className="text-emerald-700 font-bold">Active (Expires Mar 12, 2026)</strong>
                    </div>
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
