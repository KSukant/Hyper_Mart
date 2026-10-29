"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ArrowLeft,
  ShieldCheck,
  BadgeCheck,
  Star,
  FileText,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import type { PdpSelection } from "../types";

interface BeautyTrustModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
}

export function BeautyTrustModal({
  open,
  onClose,
  product: p,
  selection,
}: BeautyTrustModalProps) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const a = p.attrs;
  const isBeauty = a.department === "beauty";

  if (!open) return null;

  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>

          <div className="flex items-center gap-2 rounded-full bg-[#FFF5F8] px-3.5 py-1 text-xs font-extrabold text-[#9C2F55] border border-[#F8CFDF]">
            <BadgeCheck className="h-4 w-4 text-[#9C2F55]" />
            <span>Trust score: High · Verified by HyperMart</span>
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

        {/* Content Body with Left Image and Right Details matching Screen 2 */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Product Artwork & Title */}
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
                <h3 className="font-extrabold text-base text-ink">{p.name}</h3>
                <p className="text-xs text-muted mt-0.5">
                  {p.unit} · {selection.shade ? `Shade: ${selection.shade}` : "Standard edition"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-2xl border border-line bg-white py-2.5 text-xs font-bold text-ink hover:bg-bg transition"
              >
                Cancel
              </button>
            </div>

            {/* Right Column: Screen 2 Trust and Authenticity Cockpit */}
            <div className="space-y-6 lg:col-span-8">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Product trust and authenticity
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Clear information. Verified sources. A more confident choice.
                </p>
              </div>

              {/* 4 Verified Cards Matching Screen 2 */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    title: "Sold by HyperMart",
                    sub: "HyperMart verified",
                    desc: "This product is sold and fulfilled by HyperMart.",
                  },
                  {
                    title: "Source reviewed",
                    sub: "HyperMart verified",
                    desc: "Supplier and source documents reviewed.",
                  },
                  {
                    title: "Batch verified",
                    sub: "HyperMart verified",
                    desc: "Batch details matched with manufacturer records.",
                  },
                  {
                    title: "Seal checked",
                    sub: "HyperMart verified",
                    desc: "Product seal and packaging meet authenticity standards.",
                  },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className="flex flex-col justify-between rounded-2xl bg-[#FFF5F8] p-3.5 border border-[#F8CFDF]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#17201B] text-white shrink-0">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                        <div>
                          <h4 className="text-xs font-extrabold text-ink">{badge.title}</h4>
                          <span className="text-[10px] font-bold text-[#9C2F55]">{badge.sub}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Details Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Subcolumn: Manufacturer & Certification */}
                <div className="space-y-4">
                  {/* Manufacturer Information */}
                  <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
                      <h4 className="text-xs font-extrabold text-ink">Manufacturer information</h4>
                      <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                        From manufacturer
                      </span>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div>
                        <dt className="text-muted text-[11px]">Manufacturer</dt>
                        <dd className="font-bold text-ink">{p.manufacturer.name}</dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px]">Country of origin</dt>
                        <dd className="font-bold text-ink">{p.manufacturer.countryOfOrigin}</dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px]">Address</dt>
                        <dd className="text-ink text-[11px] leading-relaxed">{p.manufacturer.address}</dd>
                      </div>
                      <div>
                        <dt className="text-muted text-[11px]">Website</dt>
                        <dd className="text-muted text-[11px]">Not available</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Certification and compliance */}
                  <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
                      <h4 className="text-xs font-extrabold text-ink">Certification and compliance</h4>
                      <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                        From manufacturer
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-line/40">
                        <span className="text-muted">Material safety</span>
                        <span className="font-bold text-ink">BPA free (manufacturer declaration)</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-line/40">
                        <span className="text-muted">Food / Cosmetic safe</span>
                        <span className="font-bold text-ink">Complies with CDSCO / FDA standards</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-muted">Quality certification</span>
                        <span className="font-bold text-[#15803D] inline-flex items-center gap-1">
                          ISO 9001:2015 · <span className="underline cursor-pointer">View certificate</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Subcolumn: Verified purchase reviews */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <h4 className="text-xs font-extrabold text-ink">Verified purchase reviews</h4>
                      </div>
                      <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                        From customers
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl font-extrabold text-ink">{p.rating}</span>
                      <div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[11px] text-muted">
                          {p.ratingCount.toLocaleString("en-IN")} verified purchases
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 text-xs">
                      <div className="rounded-xl bg-bg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted">12 Mar 2024</span>
                        </div>
                        <p className="text-ink font-semibold">
                          &quot;Keeps lips soft for hours. Great quality and build.&quot;
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-success font-bold mt-1">
                          <Check className="h-3 w-3" /> Verified purchase
                        </span>
                      </div>

                      <div className="rounded-xl bg-bg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted">5 Feb 2024</span>
                        </div>
                        <p className="text-ink font-semibold">
                          &quot;Lightweight and smudge-proof. Very happy with it.&quot;
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-success font-bold mt-1">
                          <Check className="h-3 w-3" /> Verified purchase
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast("Showing all verified reviews")}
                      className="text-xs font-bold text-[#7C205F] hover:underline flex items-center justify-between w-full pt-1"
                    >
                      <span>See all verified purchase reviews ({p.ratingCount})</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Evidence Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-bg/50 p-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#9C2F55]" />
                  <div>
                    <strong className="block text-xs font-bold text-ink">Evidence details</strong>
                    <span className="text-[11px] text-muted">
                      View documents and checklist used to verify this product.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEvidenceOpen(!evidenceOpen);
                    toast(evidenceOpen ? "Evidence panel closed" : "Evidence verified: 3 documents on file");
                  }}
                  className="rounded-xl border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-bg transition"
                >
                  View evidence (3) &rsaquo;
                </button>
              </div>

              {/* Disclaimer & Save Trust Review Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/80 pt-4">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <AlertCircle className="h-4 w-4 shrink-0 text-muted" />
                  <div>
                    <strong className="block text-ink font-semibold">Information not available</strong>
                    <span className="text-[11px]">
                      Sustainability information is not available for this product yet.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    toast("Trust review acknowledged and saved");
                    onClose();
                  }}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-2.5 font-bold text-xs shadow-sm transition"
                >
                  Save trust review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
