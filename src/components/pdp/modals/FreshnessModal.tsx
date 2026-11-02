"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowLeft, X, ShieldCheck, Info, Scale, Check, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import type { PdpSelection } from "../types";
import {
  getProducePieceCount,
  getWeightOptions,
  calculateProducePrice,
  getRipenessDetails,
  getGradeDetails,
} from "@/lib/groceryDescriptions";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

interface FreshnessModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
  unitPrice: number;
}

export function FreshnessModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  unitPrice,
}: FreshnessModalProps) {
  const a = p.attrs;
  const isFood = a?.department === "food";
  const hasGrades = isFood && a.grades && a.grades.length > 0;
  const hasRipeness = isFood && a.ripenessOptions && a.ripenessOptions.length > 0;
  const isSoldByWeight = isFood && a.soldByWeight;

  // Local state initialized from selection
  const [grade, setGrade] = useState<"A" | "B" | "C">(
    (selection.grade as "A" | "B" | "C") ?? (hasGrades ? a.grades![0].grade : "A")
  );
  const [ripeness, setRipeness] = useState<"raw" | "ready_to_eat" | "very_ripe">(
    selection.ripeness ?? (hasRipeness ? (a.ripenessOptions![1] ?? a.ripenessOptions![0]) : "ready_to_eat")
  );
  const [estKg, setEstKg] = useState<number>(selection.kg ?? 1);
  const [sub, setSub] = useState<"ask" | "skip" | "similar">(selection.substitution ?? "similar");

  // Dynamic pricing calculation
  const pricing = useMemo(() => {
    return calculateProducePrice(p, hasGrades ? grade : undefined, estKg, 1);
  }, [p, hasGrades, grade, estKg]);

  const weightOptions = useMemo(() => getWeightOptions(p), [p]);
  const pieceCount = useMemo(() => getProducePieceCount(p, estKg, 1), [p, estKg]);

  if (!open) return null;

  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  const handleSave = () => {
    onSave({
      ...(hasGrades ? { grade } : {}),
      ...(hasRipeness ? { ripeness } : {}),
      ...(isSoldByWeight ? { kg: estKg } : {}),
      substitution: sub,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="freshness-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl border border-neutral-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-4 sm:px-8 bg-neutral-50/70">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 transition sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>
          <div className="text-center hidden sm:block">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Quality &amp; Freshness Standards
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 transition"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> HyperMart Fresh Journey
              </span>
            </div>
            <h2 id="freshness-modal-title" className="text-xl font-extrabold text-neutral-900 sm:text-2xl mt-1.5">
              Freshness &amp; Quality Preferences
            </h2>
            <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
              Customise your quality grade, ripeness and quantity. We prepare and weigh each order fresh at our city fulfilment depot.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Left Column: Product Photo, Quality Promise & Pricing Breakdown */}
            <div className="space-y-4 lg:col-span-5">
              <div className="relative aspect-square max-h-60 sm:max-h-72 w-full overflow-hidden rounded-2xl bg-neutral-50 p-4 border border-neutral-200 flex items-center justify-center">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-4" priority />
              </div>

              {/* Price & Weight Breakdown Card */}
              <div className="rounded-2xl bg-[#F6FAF3] p-4 border border-[#DCEDD2] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#1B4D20] flex items-center gap-1.5">
                    <Scale className="h-3.5 w-3.5" /> Price &amp; Weight Calculation
                  </span>
                  {pricing.gradeDiscountPct > 0 && (
                    <span className="rounded-full bg-[#E5F5D8] border border-[#BFDFAB] px-2 py-0.5 text-[10px] font-extrabold text-[#23662A]">
                      {pricing.gradeDiscountPct}% Grade Savings
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-1 border-t border-[#DFEED6] text-xs">
                  {isSoldByWeight && (
                    <>
                      <div className="flex items-center justify-between text-neutral-700">
                        <span>Price per kilogram</span>
                        <span className="font-bold text-neutral-900 tabular">{formatINR(pricing.pricePerKg)} / kg</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-600">
                        <span>Price per 500 g</span>
                        <span className="font-semibold text-neutral-800 tabular">{formatINR(pricing.pricePer500g)}</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-700">
                        <span>Selected quantity</span>
                        <span className="font-bold text-neutral-900">
                          {estKg >= 1 ? `${estKg} kg` : `${estKg * 1000} g`} ({pieceCount})
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-[#DFEED6] text-sm">
                    <span className="font-extrabold text-[#173D1C]">Estimated Total</span>
                    <span className="font-black text-lg text-[#105623] tabular">{formatINR(pricing.estimatedTotal)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#446A49] leading-relaxed pt-1">
                  * Final billed amount is determined by actual certified scale weight during packing. Difference is instantly refunded.
                </p>
              </div>

              {/* Quality Promise */}
              <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#085A2E] text-white">
                    <ShieldCheck className="h-4 w-4 text-[#B8F34A]" />
                  </div>
                  <div className="text-xs">
                    <strong className="block font-bold text-neutral-900 text-sm">HyperMart Fresh Promise</strong>
                    <p className="mt-1 text-neutral-600 leading-relaxed">
                      Every order is graded before packing. If you are not satisfied with taste or freshness, we offer instant replacement or refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Grade, Ripeness, Quantity, Substitution */}
            <div className="space-y-6 lg:col-span-7">
              {/* 1. Quality Grade (ONLY render if product has grades) */}
              {hasGrades && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-neutral-900">Quality Grade</span>
                    <span className="text-[11px] text-neutral-500">Graded at arrival depot</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Choose the appearance standard. Grade B and C offer identical taste with extra savings.
                  </p>

                  <div className={cn("grid gap-2.5", a.grades!.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
                    {a.grades!.map((g) => {
                      const details = getGradeDetails(p, g.grade);
                      const isSelected = grade === g.grade;
                      return (
                        <button
                          key={g.grade}
                          type="button"
                          onClick={() => setGrade(g.grade)}
                          className={cn(
                            "flex flex-col p-3 rounded-2xl border text-left transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085A2E]",
                            isSelected
                              ? "border-[#085A2E] bg-[#F1F9EE] ring-2 ring-[#085A2E] shadow-xs"
                              : "border-neutral-200 bg-white hover:border-neutral-400"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-sm text-neutral-900">Grade {g.grade}</span>
                            {isSelected && (
                              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#085A2E] text-white">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#14532D] tabular">{formatINR(g.pricePerKg)} / kg</span>
                          <span className="text-[11px] font-semibold text-neutral-700 mt-1">{details.badge}</span>
                          <span className="text-[10px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">{g.note}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Ripeness Selection (ONLY render if product supports ripeness) */}
              {hasRipeness && (
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-neutral-900">Ripeness &amp; Usage</span>
                    <span className="text-[11px] text-neutral-500">Pick for your schedule</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Select readiness based on when you plan to consume or cook.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {a.ripenessOptions!.map((r) => {
                      const details = getRipenessDetails(p, r);
                      const isSelected = ripeness === r;
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRipeness(r)}
                          className={cn(
                            "flex flex-col p-3 rounded-2xl border text-left transition relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085A2E]",
                            isSelected
                              ? "border-[#085A2E] bg-[#F1F9EE] ring-2 ring-[#085A2E] shadow-xs"
                              : "border-neutral-200 bg-white hover:border-neutral-400"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-xs text-neutral-900">{details.title}</span>
                            {isSelected && (
                              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#085A2E] text-white">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-bold text-[#1A4C22]">{details.badge}</span>
                          <span className="text-[10px] text-neutral-500 mt-1 leading-snug line-clamp-2">
                            {details.usage}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Estimated Quantity & Product-Specific Description */}
              {isSoldByWeight && (
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-neutral-900">Estimated Pack Weight</span>
                    <span className="text-[11px] text-neutral-500">Includes piece count</span>
                  </div>
                  <p className="text-xs text-neutral-600">
                    Product-specific piece count helps you choose the right amount for your household.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {weightOptions.map((opt) => {
                      const isSelected = estKg === opt.kg;
                      return (
                        <button
                          key={opt.kg}
                          type="button"
                          onClick={() => setEstKg(opt.kg)}
                          className={cn(
                            "flex flex-col p-2.5 rounded-xl border text-left transition focus-visible:outline-none",
                            isSelected
                              ? "border-[#085A2E] bg-[#085A2E] text-white shadow-xs"
                              : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
                          )}
                        >
                          <span className="font-extrabold text-sm">{opt.label}</span>
                          <span
                            className={cn(
                              "text-[10px] mt-0.5 line-clamp-1 font-medium",
                              isSelected ? "text-white/90" : "text-neutral-500"
                            )}
                          >
                            {opt.countDesc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Substitution Preference */}
              {(a as any).substitutable && (
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <span className="font-extrabold text-sm text-neutral-900 block">Substitution Preference</span>
                  <span className="text-xs text-neutral-600 block">
                    If this specific grade or ripeness is unavailable when packing:
                  </span>
                  <div className="space-y-2">
                    {[
                      {
                        id: "similar" as const,
                        title: "Substitute with closest match",
                        desc: "Pack nearest quality grade or ripeness. Difference credited to your wallet.",
                      },
                      {
                        id: "ask" as const,
                        title: "Contact me before substituting",
                        desc: "Our packer will call or message your phone for confirmation.",
                      },
                      {
                        id: "skip" as const,
                        title: "Do not substitute",
                        desc: "Remove this item and instantly refund the amount.",
                      },
                    ].map((s) => (
                      <label
                        key={s.id}
                        onClick={() => setSub(s.id)}
                        className={cn(
                          "flex items-start gap-2.5 rounded-xl border p-2.5 cursor-pointer transition",
                          sub === s.id
                            ? "border-[#085A2E] bg-[#F1F9EE] ring-1 ring-[#085A2E]/30"
                            : "border-neutral-200 bg-white hover:border-neutral-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="sub_pref"
                          checked={sub === s.id}
                          onChange={() => setSub(s.id)}
                          className="mt-0.5 accent-[#085A2E]"
                        />
                        <div className="text-xs">
                          <strong className="block font-bold text-neutral-900">{s.title}</strong>
                          <span className="text-[11px] text-neutral-600">{s.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Footer Bar with Selection Summary & Save CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-neutral-200 bg-white px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold text-neutral-900">Current Selection:</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 font-bold text-neutral-800 text-[11px]">
              {[
                hasGrades ? `Grade ${grade}` : null,
                hasRipeness ? ripeness.replace("_", " ") : null,
                isSoldByWeight ? `${estKg >= 1 ? `${estKg} kg` : `${estKg * 1000} g`} (${pieceCount})` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
              {" · "}
              <strong className="text-[#085A2E] font-black">{formatINR(pricing.estimatedTotal)}</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#085A2E] px-7 py-2.5 text-xs font-black text-white transition hover:bg-[#064825] active:scale-98 shadow-sm shrink-0"
          >
            Save selection
          </button>
        </div>
      </div>
    </div>
  );
}
