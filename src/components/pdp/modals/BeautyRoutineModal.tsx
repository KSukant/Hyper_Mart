"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface BeautyRoutineModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
}

type RoutineStep = "overview" | "compatibility" | "added";

export function BeautyRoutineModal({
  open,
  onClose,
  product: p,
  selection,
}: BeautyRoutineModalProps) {
  const [currentStep, setCurrentStep] = useState<RoutineStep>("overview");
  const [morning, setMorning] = useState(true);
  const [evening, setEvening] = useState(true);

  if (!open) return null;

  const a = p.attrs;
  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => {
              if (currentStep === "compatibility") setCurrentStep("overview");
              else if (currentStep === "added") setCurrentStep("compatibility");
              else onClose();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>

          {/* Stepper Navigation */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setCurrentStep("overview")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                currentStep === "overview" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              1. Routine
            </button>
            <ChevronRight className="h-3 w-3 text-muted" />
            <button
              type="button"
              onClick={() => setCurrentStep("compatibility")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                currentStep === "compatibility" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              2. Compatibility
            </button>
            <ChevronRight className="h-3 w-3 text-muted" />
            <button
              type="button"
              onClick={() => setCurrentStep("added")}
              className={cn(
                "rounded-full px-3 py-1 transition",
                currentStep === "added" ? "bg-[#17201B] text-white" : "text-muted hover:text-ink"
              )}
            >
              3. Summary
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
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {/* ── View 1: My Beauty Routine Overview ── */}
          {currentStep === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  My Beauty Routine
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Build a routine that works for you. See where this product fits, how to use it, and what it pairs well with.
                </p>
              </div>

              {/* Product Step Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-xs">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-bg border border-line/60 shrink-0">
                  <Image src={imageSrc} alt={p.name} fill className="object-contain p-1.5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#9C2F55]">Step 3 of 4</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-ink">{p.name}</h3>
                  <p className="text-xs text-muted">
                    {selection.shade ? `Shade: ${selection.shade}` : "Standard edition"}
                  </p>
                  <div className="flex gap-1.5 pt-1.5">
                    <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                      Makeup
                    </span>
                    <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                      Lipstick
                    </span>
                  </div>
                </div>
              </div>

              {/* Routine Flow Diagram */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-ink">Application Order</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl bg-bg p-3 border border-line/40">
                    <span className="block text-[10px] font-bold text-muted">1</span>
                    <strong className="block text-xs font-bold text-ink mt-0.5">Cleanser</strong>
                  </div>
                  <div className="rounded-xl bg-bg p-3 border border-line/40">
                    <span className="block text-[10px] font-bold text-muted">2</span>
                    <strong className="block text-xs font-bold text-ink mt-0.5">Treatment</strong>
                  </div>
                  <div className="rounded-xl bg-[#FFF5F8] p-3 border-2 border-[#9C2F55] shadow-xs">
                    <span className="block text-[10px] font-bold text-[#9C2F55]">3</span>
                    <strong className="block text-xs font-extrabold text-[#701A3C] mt-0.5">
                      Moisturizer
                    </strong>
                    <span className="text-[9px] text-[#9C2F55] font-semibold block">(Your product)</span>
                  </div>
                  <div className="rounded-xl bg-bg p-3 border border-line/40">
                    <span className="block text-[10px] font-bold text-muted">4</span>
                    <strong className="block text-xs font-bold text-ink mt-0.5">Sunscreen</strong>
                  </div>
                </div>
              </div>

              {/* When To Use */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <h4 className="text-xs font-extrabold text-ink">When to use</h4>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setMorning(!morning)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition",
                      morning
                        ? "bg-[#17201B] text-white border-[#17201B]"
                        : "border-line bg-white text-muted hover:border-[#17201B]"
                    )}
                  >
                    <Sun className="h-4 w-4" />
                    <span>Morning</span>
                    {morning && <Check className="h-3.5 w-3.5 ml-1" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEvening(!evening)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition",
                      evening
                        ? "bg-[#17201B] text-white border-[#17201B]"
                        : "border-line bg-white text-muted hover:border-[#17201B]"
                    )}
                  >
                    <Moon className="h-4 w-4" />
                    <span>Evening</span>
                    {evening && <Check className="h-3.5 w-3.5 ml-1" />}
                  </button>
                </div>
              </div>

              {/* How To Use Guidance */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-2">
                <h4 className="text-xs font-extrabold text-ink">How to use</h4>
                <div className="flex items-start gap-2.5 text-xs text-muted">
                  <span className="font-bold text-ink shrink-0">Approved usage:</span>
                  <p className="leading-relaxed">
                    Apply directly to clean, dry lips. Can be used as part of your morning and evening skincare and makeup routine.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep("compatibility")}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-3 font-bold text-xs shadow-sm transition flex items-center gap-2"
                >
                  <span>+ Add to My Beauty Routine</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── View 2: Compatibility & Suitability ── */}
          {currentStep === "compatibility" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  Compatibility &amp; Suitability
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Know what works well together.
                </p>
              </div>

              {/* Documented Compatibility List */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-line/60 pb-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#15803D] text-white shrink-0">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                  <div>
                    <h4 className="text-xs font-extrabold text-ink">Documented compatibility</h4>
                    <p className="text-[11px] text-muted">
                      Based on ingredient information and common formulation practices.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-line/40 text-xs">
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <strong className="block text-ink font-bold">Gentle Cleanser</strong>
                      <span className="text-[11px] text-[#15803D] font-medium">Works well together</span>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <strong className="block text-ink font-bold">Hydrating Serum</strong>
                      <span className="text-[11px] text-[#15803D] font-medium">Works well together</span>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <strong className="block text-ink font-bold">Daily Moisturizer</strong>
                      <span className="text-[11px] text-[#15803D] font-medium">Works well together</span>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <strong className="block text-ink font-bold">Sunscreen</strong>
                      <span className="text-[11px] text-[#15803D] font-medium">Works well together</span>
                    </div>
                    <span className="text-muted text-sm">&rsaquo;</span>
                  </div>
                </div>
              </div>

              {/* Things To Note / Potential Conflict */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                  <h4 className="text-xs font-extrabold text-amber-950">Things to note</h4>
                </div>
                <div className="text-xs text-amber-900 space-y-1">
                  <strong className="block font-bold">Potential conflict</strong>
                  <p className="text-[11px] leading-relaxed">
                    May not be suitable to use at the same time as strong exfoliating treatments (e.g., high-strength acids or retinoids). If using, consider applying at different times of the day.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => toast("Full ingredient list available in Ingredients & Safety modal")}
                  className="text-xs font-bold text-[#9C2F55] hover:underline"
                >
                  View full ingredient list &rsaquo;
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep("added");
                    toast("Product successfully added to your beauty routine");
                  }}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-2.5 font-bold text-xs shadow-sm transition"
                >
                  Confirm &amp; Add Product
                </button>
              </div>
            </div>
          )}

          {/* ── View 3: Added to My Beauty Routine Confirmation ── */}
          {currentStep === "added" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 rounded-3xl border border-line/80 bg-white p-5 shadow-xs">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#17201B] text-white shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                    Added to My Beauty Routine
                  </h2>
                  <p className="text-xs text-muted sm:text-sm">
                    {p.name} has been added to your personalized routine.
                  </p>
                </div>
              </div>

              {/* Routine Summary List */}
              <div className="rounded-2xl border border-line bg-white p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-line/60 pb-3">
                  <h3 className="text-xs font-extrabold text-ink">
                    My Beauty Routine (4 products)
                  </h3>
                  <button
                    type="button"
                    onClick={() => toast("Routine edit mode enabled")}
                    className="text-[11px] font-bold text-[#9C2F55] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { step: 1, name: "Gentle Cleanser", timing: "Morning · Evening" },
                    { step: 2, name: "Hydrating Serum", timing: "Morning · Evening" },
                    { step: 3, name: p.name, timing: "Morning · Evening", active: true },
                    { step: 4, name: "Sunscreen", timing: "Morning only" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={cn(
                        "flex items-center justify-between rounded-xl p-3 border text-xs",
                        item.active
                          ? "bg-[#FFF5F8] border-[#9C2F55] text-ink font-bold"
                          : "bg-bg border-line/60 text-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold",
                            item.active ? "bg-[#9C2F55] text-white" : "bg-white text-muted border border-line"
                          )}
                        >
                          {item.step}
                        </span>
                        <div>
                          <strong className="block text-ink">{item.name}</strong>
                          <span className="text-[10px] text-muted">{item.timing}</span>
                        </div>
                      </div>
                      <span className="text-muted text-sm font-normal">⋮</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink hover:bg-bg transition"
                >
                  Back to product
                </button>

                <button
                  type="button"
                  onClick={() => {
                    toast("Navigating to full Beauty Routine Manager");
                    onClose();
                  }}
                  className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-6 py-2.5 font-bold text-xs shadow-sm transition"
                >
                  View My Beauty Routine
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
