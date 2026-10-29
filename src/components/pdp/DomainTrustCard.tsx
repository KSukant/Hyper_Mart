"use client";
import { useState } from "react";
import {
  ShieldCheck,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  MapPin,
  Clock,
  Banknote,
  Cpu,
  Ruler,
  AlertCircle,
  HelpCircle,
  Snowflake,
  Weight,
  Layers,
  Palette,
  Package,
  Calendar,
  Shirt,
  Laptop,
  Home,
  FileText,
  Wrench,
} from "lucide-react";
import type { Product } from "@/types";
import type { ProductDomain, DomainTheme, PdpSelection } from "./types";
import { formatINR } from "@/lib/format";
import { LocationSelector } from "@/components/layout/LocationPanel";
import { Pill } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface DomainTrustCardProps {
  product: Product;
  domain: ProductDomain;
  theme: DomainTheme;
  selection: PdpSelection;
  stockStatus: "in_stock" | "limited" | "out";
  availableQty: number;
  cityName: string;
  pincode: string;
  areaName: string;
  charges: { delivery: number; threshold: number; freeDeliveryGap: number; coldChain: number; heavy: number };
  policy: { label: string; conditions: string[] };
  onOpenLocation: () => void;
  onOpenFreshnessModal?: () => void;
  onOpenWeighingModal?: () => void;
  onOpenShelfLifeModal?: () => void;
  onOpenSubstitutionModal?: () => void;
  onOpenSubscribeModal?: () => void;
  onOpenFitModal?: () => void;
  onOpenMatrixModal?: () => void;
  onOpenRentalModal?: () => void;
  onOpenBeautyModal?: () => void;
  onOpenSuitabilityModal?: () => void;
  onOpenCompatibilityModal?: () => void;
  onOpenHomeFitModal?: () => void;
  onOpenWarrantyModal?: () => void;
  onOpenIngredientsModal?: () => void;
  onOpenShadeModal?: () => void;
  onOpenSampleModal?: () => void;
  onOpenRoutineModal?: () => void;
  onOpenBatchExpiryModal?: () => void;
  onOpenBeautyDeliveryModal?: () => void;
  onOpenRepairModal?: () => void;
}

export function DomainTrustCard({
  product,
  domain,
  theme,
  selection,
  stockStatus,
  availableQty,
  cityName,
  pincode,
  areaName,
  charges,
  policy,
  onOpenLocation,
  onOpenFreshnessModal,
  onOpenWeighingModal,
  onOpenShelfLifeModal,
  onOpenSubstitutionModal,
  onOpenSubscribeModal,
  onOpenFitModal,
  onOpenMatrixModal,
  onOpenRentalModal,
  onOpenBeautyModal,
  onOpenSuitabilityModal,
  onOpenCompatibilityModal,
  onOpenHomeFitModal,
  onOpenWarrantyModal,
  onOpenIngredientsModal,
  onOpenShadeModal,
  onOpenSampleModal,
  onOpenRoutineModal,
  onOpenBatchExpiryModal,
  onOpenBeautyDeliveryModal,
  onOpenRepairModal,
}: DomainTrustCardProps) {
  const [policyOpen, setPolicyOpen] = useState(false);
  const a = product.attrs;

  if (domain === "electronics" || product.department === "electronics") {
    const isElec = a.department === "electronics";
    const warrantyMonths = isElec ? a.warranty?.months ?? 24 : 24;
    const warrantyYrs = Math.round(warrantyMonths / 12);
    const bestForText = selection.useCase
      ? selection.useCase[0].toUpperCase() + selection.useCase.slice(1)
      : isElec && a.bestFor?.[0]
      ? a.bestFor[0].useCase[0].toUpperCase() + a.bestFor[0].useCase.slice(1)
      : "Office work";

    return (
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-lift space-y-4">
        <div className="pb-1 border-b border-line/40">
          <h3 className="font-extrabold text-lg text-ink">Fit, Compatibility &amp; Support</h3>
          <p className="text-xs text-muted">Get the key information you need before buying.</p>
        </div>

        <div className="divide-y divide-line/60">
          {/* Row 1: Best for */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <Laptop className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Best for:</span>
                <strong className="font-bold text-ink text-sm">{bestForText}</strong>
              </div>
            </div>
            {onOpenSuitabilityModal && (
              <button
                type="button"
                onClick={onOpenSuitabilityModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 2: Compatibility */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <Cpu className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Compatibility:</span>
                <strong className="font-bold text-ink text-sm">
                  {selection.compatibilityConfirmed ? "Compatible with your device" : "Check compatibility"}
                </strong>
              </div>
            </div>
            {onOpenCompatibilityModal && (
              <button
                type="button"
                onClick={onOpenCompatibilityModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 3: Home fit */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <Home className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Home fit:</span>
                <strong className="font-bold text-ink text-sm">
                  {selection.homeFit ? "Fits your home" : "Check your home"}
                </strong>
              </div>
            </div>
            {onOpenHomeFitModal && (
              <button
                type="button"
                onClick={onOpenHomeFitModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 4: Delivery */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <Truck className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Delivery:</span>
                <strong className="font-bold text-ink text-sm">
                  {isElec && a.installation?.required ? "Installation required" : "Free delivery in your city"}
                </strong>
              </div>
            </div>
            {onOpenHomeFitModal && (
              <button
                type="button"
                onClick={onOpenHomeFitModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 5: Warranty */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <ShieldCheck className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Warranty:</span>
                <strong className="font-bold text-ink text-sm">
                  {warrantyYrs} year{warrantyYrs > 1 ? "s" : ""}
                </strong>
              </div>
            </div>
            {onOpenWarrantyModal && (
              <button
                type="button"
                onClick={onOpenWarrantyModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 6: Support */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <Wrench className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Support:</span>
                <strong className="font-bold text-ink text-sm">Repair and exchange available</strong>
              </div>
            </div>
            {onOpenRepairModal && (
              <button
                type="button"
                onClick={onOpenRepairModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 7: Ownership */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#EFF6FF] text-[#1D4E89] border border-[#CFE0F5] shrink-0">
                <FileText className="h-4 w-4 text-[#1D4E89]" />
              </span>
              <div className="text-xs">
                <span className="text-muted block text-[11px]">Ownership:</span>
                <strong className="font-bold text-ink text-sm">View details</strong>
              </div>
            </div>
            {onOpenWarrantyModal && (
              <button
                type="button"
                onClick={onOpenWarrantyModal}
                className="text-xs font-bold text-ink hover:text-[#1D4E89] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                Edit &rsaquo;
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (domain === "beauty" || product.department === "beauty") {
    return (
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-lift space-y-4">
        <div className="pb-1 border-b border-line/40">
          <h3 className="font-extrabold text-lg text-ink">Trust &amp; Suitability</h3>
          <p className="text-xs text-muted">All the essentials to shop with confidence.</p>
        </div>

        <div className="divide-y divide-line/60">
          {/* Row 1: Trust and authenticity */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <ShieldCheck className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Trust and authenticity</strong>
                <span className="text-xs text-muted">Source reviewed and authenticity checked.</span>
              </div>
            </div>
            {onOpenBeautyModal && (
              <button
                type="button"
                onClick={onOpenBeautyModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 2: Ingredients and safety */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Sparkles className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Ingredients and safety</strong>
                <span className="text-xs text-muted">Full ingredient list provided.</span>
              </div>
            </div>
            {onOpenIngredientsModal && (
              <button
                type="button"
                onClick={onOpenIngredientsModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 3: Shade and preview */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Palette className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Shade and preview</strong>
                <span className="text-xs text-muted">View all shades and try preview.</span>
              </div>
            </div>
            {onOpenShadeModal && (
              <button
                type="button"
                onClick={onOpenShadeModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 4: Sample or full size */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Package className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Sample or full size</strong>
                <span className="text-xs text-muted">Explore size options.</span>
              </div>
            </div>
            {onOpenSampleModal && (
              <button
                type="button"
                onClick={onOpenSampleModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 5: My Beauty Routine */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Layers className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">My Beauty Routine</strong>
                <span className="text-xs text-muted">Save to your routine or edit your routine.</span>
              </div>
            </div>
            {onOpenRoutineModal && (
              <button
                type="button"
                onClick={onOpenRoutineModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                Add to My Beauty Routine &rsaquo;
              </button>
            )}
          </div>

          {/* Row 6: Batch and expiry */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Calendar className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Batch and expiry</strong>
                <span className="text-xs text-muted">Check batch number and expiry date.</span>
              </div>
            </div>
            {onOpenBatchExpiryModal && (
              <button
                type="button"
                onClick={onOpenBatchExpiryModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 7: Delivery conditions */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFF5F8] text-[#9C2F55] border border-[#F8CFDF] shrink-0">
                <Truck className="h-4 w-4 text-[#9C2F55]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Delivery conditions</strong>
                <span className="text-xs text-muted">Pincode availability and delivery details.</span>
              </div>
            </div>
            {onOpenBeautyDeliveryModal && (
              <button
                type="button"
                onClick={onOpenBeautyDeliveryModal}
                className="text-xs font-bold text-ink hover:text-[#9C2F55] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (domain === "fashion") {
    return (
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-lift space-y-4">
        <div className="pb-1 border-b border-line/40">
          <h3 className="font-extrabold text-lg text-ink">Fit &amp; Fabric</h3>
          <p className="text-xs text-muted">Everything you need to know, in one place.</p>
        </div>

        <div className="divide-y divide-line/60">
          {/* Row 1: Fabric and Feel */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Layers className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Fabric and Feel</strong>
                <span className="text-xs text-muted line-clamp-1">
                  {a.department === "fashion" && a.fabric ? `${a.fabric}, soft and breathable for all-day comfort.` : "100% cotton, soft and breathable for all-day comfort."}
                </span>
              </div>
            </div>
            {onOpenFitModal && (
              <button
                type="button"
                onClick={onOpenFitModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 2: Size */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Ruler className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Size</strong>
                <span className="text-xs text-muted">
                  {selection.size ?? "L"} (Chest 42 in, Length 46 in)
                </span>
              </div>
            </div>
            {(onOpenFitModal || onOpenMatrixModal) && (
              <button
                type="button"
                onClick={onOpenFitModal ?? onOpenMatrixModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                Edit &rsaquo;
              </button>
            )}
          </div>

          {/* Row 3: Fit */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Shirt className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Fit</strong>
                <span className="text-xs text-muted">
                  {a.department === "fashion" ? `${a.fit} fit` : "Regular fit"}
                </span>
              </div>
            </div>
            {onOpenFitModal && (
              <button
                type="button"
                onClick={onOpenFitModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 4: Colour */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Palette className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Colour</strong>
                <span className="text-xs text-muted">
                  {selection.colour ?? (a.department === "fashion" ? a.colours[0]?.name : "Blue")}
                </span>
              </div>
            </div>
            {onOpenMatrixModal && (
              <button
                type="button"
                onClick={onOpenMatrixModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                Edit &rsaquo;
              </button>
            )}
          </div>

          {/* Row 5: Availability */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Package className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Availability</strong>
                <span className="text-xs text-muted">
                  {stockStatus === "in_stock" ? "In stock" : stockStatus === "limited" ? `Only ${availableQty} left` : "Out of stock"}
                </span>
              </div>
            </div>
            {onOpenMatrixModal && (
              <button
                type="button"
                onClick={onOpenMatrixModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 6: Rent this item */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <Calendar className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Rent this item</strong>
                <span className="text-xs text-muted">
                  {a.department === "fashion" && a.rentable
                    ? `Available from ₹${a.rentable.perDay * a.rentable.minDays} for ${a.rentable.minDays} days`
                    : "Available from ₹249 for 3 days"}
                </span>
              </div>
            </div>
            {onOpenRentalModal && (
              <button
                type="button"
                onClick={onOpenRentalModal}
                className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
              >
                View details &rsaquo;
              </button>
            )}
          </div>

          {/* Row 7: Easy Returns & Exchanges */}
          <div className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bg text-ink shrink-0">
                <RotateCcw className="h-4 w-4 text-[#17201B]" />
              </span>
              <div className="text-xs">
                <strong className="block font-bold text-ink text-sm">Easy Returns &amp; Exchanges</strong>
                <span className="text-xs text-muted">Hassle-free returns within 7 days.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPolicyOpen(!policyOpen)}
              className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5 shrink-0 ml-2"
            >
              View details &rsaquo;
            </button>
          </div>
        </div>

        {policyOpen && (
          <div className="rounded-2xl bg-bg p-4 text-xs text-muted space-y-1.5 border border-line">
            <p className="font-bold text-ink">{policy.label}</p>
            <ul className="space-y-1 pl-4 list-disc text-[11px]">
              {policy.conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Decision Cockpit Card ── */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-lift space-y-4">
        {/* Availability Badge */}
        <div className="flex items-center justify-between">
          {stockStatus === "in_stock" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-black text-success border border-success/30">
              <Check className="h-3.5 w-3.5" />
              In Stock in {cityName}
            </span>
          ) : stockStatus === "limited" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-800 border border-amber-200">
              <AlertCircle className="h-3.5 w-3.5" />
              Only {availableQty} left in stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700 border border-red-200">
              Currently Unavailable
            </span>
          )}

          <button
            type="button"
            onClick={onOpenLocation}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{pincode}</span>
          </button>
        </div>

        {/* Delivery Timeline & Promise */}
        <div className="space-y-2 rounded-2xl bg-bg p-3.5 text-xs text-ink/80">
          <div className="flex items-start gap-2">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-extrabold text-ink">
                {charges.delivery === 0 ? "FREE Scheduled Delivery" : `Delivery ${formatINR(charges.delivery)}`}
              </p>
              <p className="text-[11px] text-muted">
                Order within 3 hrs for delivery to {areaName} today
              </p>
            </div>
          </div>

          {charges.delivery > 0 && charges.freeDeliveryGap > 0 && (
            <p className="text-[11px] font-semibold text-success border-t border-line/60 pt-1.5">
              Add {formatINR(charges.freeDeliveryGap)} more for free delivery
            </p>
          )}

          {charges.coldChain > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-blue-800 font-medium">
              <Snowflake className="h-3.5 w-3.5 text-blue-600" />
              <span>Chilled insulated cold-chain bag included</span>
            </div>
          )}

          {charges.heavy > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-900 font-medium">
              <Weight className="h-3.5 w-3.5 text-amber-700" />
              <span>Two-person specialized heavy handling</span>
            </div>
          )}
        </div>

        {/* ── Domain-Specific Decision Cockpit Modules ── */}

        {/* Grocery: Freshness & Delivery Cockpit matching Screen 1 */}
        {(domain === "grocery_fresh" || product.department === "food") && (
          <div className="divide-y divide-line/60 pt-1">
            <div className="pb-3">
              <h3 className="font-extrabold text-sm text-ink sm:text-base">Freshness &amp; Delivery</h3>
              <p className="text-[11px] text-muted">Quality you can trust, from farm to your home.</p>
            </div>

            {/* Row 1: Grade */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">Grade {selection.grade ?? "A"}</strong>
                  <span className="text-[11px] text-muted">Carefully selected for quality.</span>
                </div>
              </div>
              {onOpenFreshnessModal && (
                <button
                  type="button"
                  onClick={onOpenFreshnessModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>

            {/* Row 2: Ripeness */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">
                    {selection.ripeness === "raw" ? "Raw" : selection.ripeness === "very_ripe" ? "Very ripe" : "Ready to eat"}
                  </strong>
                  <span className="text-[11px] text-muted">Washed and ready for consumption.</span>
                </div>
              </div>
              {onOpenFreshnessModal && (
                <button
                  type="button"
                  onClick={onOpenFreshnessModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>

            {/* Row 3: Estimated total */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <Banknote className="h-4 w-4 text-amber-700" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">Estimated total</strong>
                  <span className="text-[11px] text-muted">
                    ₹ {selection.kg ? Math.round(product.price * selection.kg) : product.price} ({selection.kg ? selection.kg * 500 : 500} g, inclusive of taxes)
                  </span>
                </div>
              </div>
              {onOpenWeighingModal && (
                <button
                  type="button"
                  onClick={onOpenWeighingModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>

            {/* Row 4: Remaining shelf life */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <Clock className="h-4 w-4 text-emerald-800" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">Remaining shelf life</strong>
                  <span className="text-[11px] text-muted">4–6 days (from delivery date)</span>
                </div>
              </div>
              {onOpenShelfLifeModal && (
                <button
                  type="button"
                  onClick={onOpenShelfLifeModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>

            {/* Row 5: Cold-chain delivery */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <Snowflake className="h-4 w-4 text-sky-700" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">Cold-chain delivery</strong>
                  <span className="text-[11px] text-muted">Keeps it fresh till it reaches you.</span>
                </div>
              </div>
              {onOpenShelfLifeModal && (
                <button
                  type="button"
                  onClick={onOpenShelfLifeModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>

            {/* Row 6: Substitution preference */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-ink shrink-0">
                  <RotateCcw className="h-4 w-4 text-ink" />
                </span>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">
                    {selection.substitution === "skip"
                      ? "Skip and refund"
                      : selection.substitution === "similar"
                      ? "Allow similar substitute"
                      : "Ask me before replacing"}
                  </strong>
                  <span className="text-[11px] text-muted">We&apos;ll confirm before any substitution.</span>
                </div>
              </div>
              {onOpenSubstitutionModal && (
                <button
                  type="button"
                  onClick={onOpenSubstitutionModal}
                  className="text-xs font-bold text-ink hover:text-primary hover:underline flex items-center gap-0.5"
                >
                  View details &rsaquo;
                </button>
              )}
            </div>
          </div>
        )}

        {/* Subscribe & Repeat Trigger (Screen 1) */}
        {(domain === "grocery_fresh" || product.department === "food") && onOpenSubscribeModal && (
          <button
            type="button"
            onClick={onOpenSubscribeModal}
            className="flex items-center justify-between w-full rounded-2xl border border-line bg-bg/50 p-3.5 text-xs font-extrabold text-ink transition hover:bg-bg"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-emerald-800" />
              <span>Subscribe and repeat</span>
            </div>
            <span className="text-muted text-sm">&rsaquo;</span>
          </button>
        )}



        {/* Heavy Home Products: Access & Clearance Cockpit */}
        {domain === "home_heavy" && onOpenHomeFitModal && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-3.5 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-amber-950 flex items-center gap-1.5">
                <Weight className="h-4 w-4 text-amber-800" />
                Delivery Access Check
              </span>
              <button
                type="button"
                onClick={onOpenHomeFitModal}
                className="font-extrabold text-amber-800 hover:underline"
              >
                Check Lift & Doors →
              </button>
            </div>
            <p className="text-[11px] text-amber-900">
              Clearance required: Min 650 mm door width. Two technicians handle unboxing.
            </p>
          </div>
        )}

        {/* Return Policy Accordion */}
        <div className="rounded-2xl border border-line/70 bg-bg p-3 text-xs">
          <button
            type="button"
            onClick={() => setPolicyOpen((prev) => !prev)}
            className="flex w-full items-center justify-between text-left font-bold text-ink"
          >
            <span className="flex items-center gap-2">
              <RotateCcw className="h-3.5 w-3.5 text-primary" />
              <span>{policy.label}</span>
            </span>
            <ChevronDown
              className={cn("h-4 w-4 text-muted transition-transform", policyOpen && "rotate-180")}
            />
          </button>
          {policyOpen && (
            <ul className="mt-2.5 space-y-1.5 text-[11px] text-muted border-t border-line/60 pt-2">
              {policy.conditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
