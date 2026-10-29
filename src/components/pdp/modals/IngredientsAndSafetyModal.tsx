"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Check,
  AlertTriangle,
  Info,
  Droplet,
  ShieldAlert,
  Building,
  ShieldCheck,
  ZoomIn,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import type { PdpSelection } from "../types";

interface IngredientsAndSafetyModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
}

export function IngredientsAndSafetyModal({
  open,
  onClose,
  product: p,
  selection,
}: IngredientsAndSafetyModalProps) {
  const [zoomLabel, setZoomLabel] = useState(false);
  const [safetySaved, setSafetySaved] = useState(false);

  if (!open) return null;

  const a = p.attrs;
  const isBeauty = a.department === "beauty";

  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";
  const labelImageSrc = p.images[1]?.src ?? imageSrc;

  const ingredientsText =
    isBeauty && a.ingredients
      ? a.ingredients
      : "Aqua (Water), Glycerin, Niacinamide, Propanediol, Squalane, Panthenol, Sodium Hyaluronate, Caprylic/Capric Triglyceride, Hydrogenated Lecithin, Carbomer, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Tetrasodium Glutamate Diacetate, Citric Acid, Sodium Hydroxide.";

  const allergensList = isBeauty && a.allergens ? a.allergens : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Product Thumbnail & Label Preview */}
            <div className="space-y-4 lg:col-span-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                <Image
                  src={imageSrc}
                  alt={p.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-ink">{p.name}</h3>
                <p className="text-xs text-muted mt-0.5">{p.unit}</p>
              </div>

              {/* Product Label Preview */}
              <div className="rounded-2xl border border-line/80 bg-bg/40 p-3 space-y-2">
                <span className="block text-[11px] font-bold text-muted">
                  Product label (back of pack)
                </span>
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-white border border-line">
                  <Image
                    src={labelImageSrc}
                    alt={`${p.name} label`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setZoomLabel(!zoomLabel);
                    toast(zoomLabel ? "Standard view" : "Label zoomed");
                  }}
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-line bg-white py-1.5 text-[11px] font-bold text-ink hover:bg-bg transition"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>{zoomLabel ? "Close zoom" : "View larger label"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Screen 3 Safety & Ingredients Details */}
            <div className="space-y-6 lg:col-span-9">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Ingredients and safety
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Know what&apos;s inside and how to use it safely.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Full Ingredient List */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-ink">Full ingredient list</h4>
                  <p className="text-xs leading-relaxed text-muted font-mono bg-bg/60 p-3 rounded-xl border border-line/40">
                    {ingredientsText}
                  </p>
                </div>

                {/* 2. Allergens */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                    <AlertTriangle className="h-4 w-4 text-amber-600" /> Allergens
                  </h4>
                  <div className="rounded-xl bg-amber-50/60 border border-amber-200/80 p-3 text-xs text-amber-950 space-y-1.5">
                    <p className="font-semibold">
                      {allergensList.length > 0
                        ? `Contains: ${allergensList.join(", ")}.`
                        : "Contains no added fragrance. May contain traces of naturally derived allergens from plant-based ingredients."}
                    </p>
                    <p className="text-[11px] text-amber-900 leading-relaxed">
                      If you have a known allergy, check the full ingredient list and your product label before use.
                    </p>
                  </div>
                </div>

                {/* 3. Patch Test */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                    <Droplet className="h-4 w-4 text-[#9C2F55]" /> Patch test
                  </h4>
                  <p className="text-xs leading-relaxed text-muted bg-[#FFF5F8] border border-[#F8CFDF] p-3 rounded-xl">
                    Before first use, apply a small amount to a discreet area of skin (e.g., inner forearm) and wait 24–48 hours. If no redness, itching or irritation occurs, proceed with normal use.
                  </p>
                </div>

                {/* 4. Who Should Avoid */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                    <ShieldAlert className="h-4 w-4 text-rose-600" /> Who should avoid
                  </h4>
                  <p className="text-xs leading-relaxed text-muted bg-rose-50/50 border border-rose-200/80 p-3 rounded-xl">
                    Avoid use if you are allergic to any of the ingredients listed. Do not use on broken, damaged or irritated skin.
                  </p>
                </div>

                {/* 5. How To Use */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-3 md:col-span-2">
                  <h4 className="text-xs font-extrabold text-ink">How to use</h4>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                    <div className="flex items-start gap-2.5 rounded-xl bg-bg p-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17201B] text-white text-[10px] font-bold">1</span>
                      <p className="text-muted text-[11px] leading-relaxed">Apply a few drops or swipe onto clean, dry skin.</p>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-bg p-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17201B] text-white text-[10px] font-bold">2</span>
                      <p className="text-muted text-[11px] leading-relaxed">Gently massage or press until fully absorbed.</p>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-bg p-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17201B] text-white text-[10px] font-bold">3</span>
                      <p className="text-muted text-[11px] leading-relaxed">Use morning and/or evening as part of routine.</p>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-bg p-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#17201B] text-white text-[10px] font-bold">4</span>
                      <p className="text-muted text-[11px] leading-relaxed">Follow with moisturizer and sunscreen during the day.</p>
                    </div>
                  </div>
                </div>

                {/* 6. Manufacturer Source */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                    <Building className="h-4 w-4 text-muted" /> Manufacturer source
                  </h4>
                  <dl className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-muted text-[11px]">Manufacturer</dt>
                      <dd className="font-bold text-ink">{p.manufacturer.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted text-[11px]">Address</dt>
                      <dd className="text-ink text-[11px] text-right">{p.manufacturer.address}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted text-[11px]">Country of origin</dt>
                      <dd className="font-bold text-ink">{p.manufacturer.countryOfOrigin}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted text-[11px]">Contact</dt>
                      <dd className="text-muted text-[11px]">support@manufacturer-example.com</dd>
                    </div>
                  </dl>
                </div>

                {/* 7. Use With Care */}
                <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold text-ink">
                    <Info className="h-4 w-4 text-muted" /> Use with care
                  </h4>
                  <p className="text-[11px] leading-relaxed text-muted">
                    Read the product label, follow the manufacturer&apos;s instructions, and stop use if irritation occurs. This information is provided for general guidance and does not replace the product label.
                  </p>
                </div>
              </div>

              {/* Bottom Footer Action matching Screen 3 */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/80 pt-4">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="h-5 w-5 text-[#15803D] shrink-0" />
                  <div>
                    <strong className="block text-ink font-semibold">Safety review saved</strong>
                    <span className="text-[11px] text-muted">
                      Reviewed on Mar 10, 2024. Your review is attached to this product.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSafetySaved(true);
                    toast("Safety review saved and attached to product");
                    onClose();
                  }}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-2.5 font-bold text-xs shadow-sm transition"
                >
                  Save safety review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
