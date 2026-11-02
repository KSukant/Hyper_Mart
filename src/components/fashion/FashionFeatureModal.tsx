"use client";

import { X, Shirt, Ruler, Palette, Bell, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type FashionFeatureType = "fabric" | "fit" | "color" | "alerts";

interface FashionFeatureModalProps {
  type: FashionFeatureType | null;
  onClose: () => void;
  onSelectRentable?: () => void;
}

export function FashionFeatureModal({
  type,
  onClose,
  onSelectRentable,
}: FashionFeatureModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#085A2E]/10 text-[#085A2E]">
              {type === "fabric" && <Shirt className="h-4 w-4" />}
              {type === "fit" && <Ruler className="h-4 w-4" />}
              {type === "color" && <Palette className="h-4 w-4" />}
              {type === "alerts" && <Bell className="h-4 w-4" />}
            </span>
            <span className="text-sm font-extrabold text-ink">
              {type === "fabric" && "Fabric & Touch Standards"}
              {type === "fit" && "Check Your Fit Guide"}
              {type === "color" && "True Colour Daylight Photography"}
              {type === "alerts" && "Restock & Size Alerts"}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-ink">
          {type === "fabric" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F0F8EC] p-4 border border-[#DCEDD2] space-y-1.5">
                <h4 className="font-extrabold text-sm text-[#14532D]">Tactile Quality You Can Trust</h4>
                <p className="text-xs text-[#085A2E] leading-relaxed">
                  Every fashion piece at HyperMart undergoes tactile lab testing to verify yarn composition, weave density, and skin-contact softness before it reaches our catalog.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-ink">The 5 HyperMart Tactile Metrics</h5>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-bg p-3 space-y-1">
                    <span className="font-extrabold text-ink block">1. Softness Rating (1–5)</span>
                    <p className="text-[11px] text-muted leading-tight">
                      Calibrated hand-feel tested across combed cotton, mulberry silk, and brushed woolens.
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 space-y-1">
                    <span className="font-extrabold text-ink block">2. Thickness &amp; GSM</span>
                    <p className="text-[11px] text-muted leading-tight">
                      Clearly graded as Light (under 140 GSM), Medium (140–220 GSM), or Heavy (220+ GSM).
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 space-y-1">
                    <span className="font-extrabold text-ink block">3. Natural Stretch</span>
                    <p className="text-[11px] text-muted leading-tight">
                      Identifies elastane blend percentages and mechanical weave give for maximum comfort.
                    </p>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 space-y-1">
                    <span className="font-extrabold text-ink block">4. Drape &amp; Structure</span>
                    <p className="text-[11px] text-muted leading-tight">
                      Specifies whether garments fall fluidly or hold crisp, formal architectural silhouettes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-900">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                <span className="text-[11px] font-semibold">
                  Zero synthetic polyester blends masked as natural cotton or silk. Verified laboratory tested.
                </span>
              </div>
            </div>
          )}

          {type === "fit" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#F0F8EC] p-4 border border-[#DCEDD2] space-y-1.5">
                <h4 className="font-extrabold text-sm text-[#14532D]">Personalized Fit Calibration</h4>
                <p className="text-xs text-[#085A2E] leading-relaxed">
                  Avoid guesswork. Every HyperMart fashion product card and detail page connects to our precision Fit Assistant tailored to its exact garment geometry.
                </p>
              </div>

              <div className="space-y-2.5">
                <h5 className="font-bold text-ink">4 Sizing Systems Supported</h5>
                <div className="space-y-2">
                  <div className="rounded-xl border border-line bg-bg p-3 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#085A2E] shrink-0 w-16">Alpha:</span>
                    <div>
                      <strong className="block text-ink font-bold">XS to 4XL (Apparel)</strong>
                      <span className="text-[11px] text-muted">Chest &amp; torso calibrated with relaxed and regular fit tolerances.</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#085A2E] shrink-0 w-16">Waist:</span>
                    <div>
                      <strong className="block text-ink font-bold">30 to 38 (Denim &amp; Trousers)</strong>
                      <span className="text-[11px] text-muted">True waist circumference in inches with inseam length specs.</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#085A2E] shrink-0 w-16">Shoe:</span>
                    <div>
                      <strong className="block text-ink font-bold">UK 6 to UK 11 (Footwear)</strong>
                      <span className="text-[11px] text-muted">Exact millimeter foot-length mapping for sports and running shoes.</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-bg p-3 flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#085A2E] shrink-0 w-16">Free Size:</span>
                    <div>
                      <strong className="block text-ink font-bold">5.5m Sarees with 0.8m Blouse</strong>
                      <span className="text-[11px] text-muted">Universal draping for all heights (4&apos;10&quot; to 6&apos;0&quot;) with unstitched blouse fabric.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-neutral-100 p-3 text-[11px] text-muted">
                Tip: Click <b>&quot;Check your fit&quot;</b> on any product page to enter your measurements in centimeters or inches.
              </div>
            </div>
          )}

          {type === "color" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-sky-50 p-4 border border-sky-200 space-y-1.5">
                <h4 className="font-extrabold text-sm text-sky-900">5500K Daylight Natural Photography</h4>
                <p className="text-xs text-sky-800 leading-relaxed">
                  No heavy filters. No saturated contrast tricks. What you see on your screen is strictly calibrated to match what you unbox in daylight.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-bold">Natural Light Studio Shots</strong>
                    <p className="text-[11px] text-muted">Every fashion item features an outdoor daylight or 5500K studio photo showcasing true fabric tones.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-bold">Texture &amp; Zari Macro Closeups</strong>
                    <p className="text-[11px] text-muted">High-resolution zoom reveals real thread luster, weave count, and authentic zari sheen.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-bold">Doorstep Inspection Allowed</strong>
                    <p className="text-[11px] text-muted">Verify colour vibrancy and hand-feel right at delivery before you accept.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === "alerts" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 space-y-1.5">
                <h4 className="font-extrabold text-sm text-amber-900">Never Miss Your Size</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  High-demand sizes sell out quickly during festival rushes. Set up an instant notification and we will alert you via WhatsApp or SMS the instant a warehouse batch arrives.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-bold">City-Specific Stock Tracking</strong>
                    <p className="text-[11px] text-muted">Alerts trigger only when inventory arrives at the fulfillment hub serving your pincode.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink font-bold">Priority 2-Hour Reservation</strong>
                    <p className="text-[11px] text-muted">Subscribers receive an exclusive 2-hour window to complete checkout before public restock.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-neutral-100 p-3 text-[11px] text-muted">
                To set an alert: Select any sold-out size on a product card or PDP and click <b>&quot;Notify me when available&quot;</b>.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-line bg-bg px-5 py-3.5 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-ink text-white px-5 py-2 text-xs font-bold hover:bg-neutral-800 transition cursor-pointer"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
}

