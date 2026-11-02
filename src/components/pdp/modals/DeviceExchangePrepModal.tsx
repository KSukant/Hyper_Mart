"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  ArrowLeft,
  ShieldCheck,
  Check,
  AlertTriangle,
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  ChevronDown,
  ChevronUp,
  Cloud,
  ChevronRight,
  FileText,
} from "lucide-react";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/primitives";
import { getCategoryHandoverSteps, type HandoverStep } from "@/lib/electronicsData";

interface DeviceExchangePrepModalProps {
  open: boolean;
  onClose: () => void;
  onBackToExchange: () => void;
  product?: Product;
}

export function DeviceExchangePrepModal({
  open,
  onClose,
  onBackToExchange,
  product: p,
}: DeviceExchangePrepModalProps) {
  const steps: HandoverStep[] = p
    ? getCategoryHandoverSteps(p)
    : [
        {
          step: 1,
          title: "Backup all data",
          description: "Save important personal files and photos to cloud storage.",
          required: true,
          isIrreversible: true,
        },
        {
          step: 2,
          title: "Sign out of all cloud accounts",
          description: "Sign out of Apple ID, Google Account, or Microsoft accounts.",
          required: true,
        },
        {
          step: 3,
          title: "Remove SIM / storage cards",
          description: "Eject physical SIM card and memory card from slots.",
          required: true,
        },
        {
          step: 4,
          title: "Perform factory reset",
          description: "Restore default factory settings and ensure device powers on.",
          required: true,
          isIrreversible: true,
        },
        {
          step: 5,
          title: "Keep original charger ready",
          description: "Have power adapter and cable bundled for technician pickup.",
          required: true,
        },
      ];

  const [backedUp, setBackedUp] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  if (!open) return null;

  const toggleStep = (stepNum: number) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  const handleConfirm = () => {
    toast("Handover preparation confirmed. Digital privacy clearance receipt generated!");
    onClose();
  };

  const getDeviceIcon = () => {
    if (p?.categoryId === "elec-tv") return <Tv className="h-8 w-8 text-[#085A2E]" />;
    if (p?.categoryId === "elec-appliances")
      return <Refrigerator className="h-8 w-8 text-[#085A2E]" />;
    if (p?.categoryId === "elec-mobiles" || p?.categoryId === "elec-refurbished")
      return <Smartphone className="h-8 w-8 text-[#085A2E]" />;
    return <Laptop className="h-8 w-8 text-[#085A2E]" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBackToExchange}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#085A2E]" /> Back to exchange options
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex rounded-full bg-[#F0F8EC] border border-[#DCEDD2] px-2.5 py-0.5 text-xs font-bold text-[#085A2E]">
              Doorstep Handover Checklist
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
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#085A2E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                Privacy &amp; Safety
              </span>
              <span className="text-xs font-bold text-muted">
                {p?.categoryId || "Electronics"} Handover
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl mt-1">
              Prepare your device for exchange
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Complete these category-specific verification steps so your exchange discount is instantly validated at delivery.
            </p>
          </div>

          {/* Stepper Header */}
          <div className="no-scrollbar flex items-center justify-between gap-2 overflow-x-auto border-b border-line/60 pb-4 text-xs font-bold">
            {steps.map((s, idx) => {
              const isDone = completedSteps.includes(s.step);
              return (
                <div key={s.step} className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full text-xs font-black transition",
                      isDone
                        ? "bg-[#085A2E] text-white"
                        : "bg-bg text-muted border border-line"
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : s.step}
                  </span>
                  <span className={cn(isDone ? "text-ink font-bold" : "text-muted")}>
                    {s.title}
                  </span>
                  {idx < steps.length - 1 && <span className="text-line mx-1">&mdash;</span>}
                </div>
              );
            })}
          </div>

          {/* 2 Columns: Main Checklist Flow (7 cols) + Privacy & Summary (5 cols) */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Flow */}
            <div className="space-y-4 lg:col-span-7">
              {/* Step 1: Active Focus Card */}
              <div className="rounded-2xl border-2 border-[#DCEDD2] bg-white p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#085A2E] text-white text-xs font-black">
                    1
                  </span>
                  <h3 className="text-base font-extrabold text-ink">{steps[0].title}</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {steps[0].description}
                </p>

                {/* Cloud & Device Graphic */}
                <div className="rounded-xl border border-[#DCEDD2] bg-[#F0F8EC]/50 p-4 flex items-center justify-center gap-4 text-[#085A2E]">
                  {getDeviceIcon()}
                  <span className="text-xs font-bold text-[#085A2E]">&bull; &bull; &bull; &rarr;</span>
                  <Cloud className="h-10 w-10 text-[#085A2E]" />
                  <span className="text-xs font-bold text-[#085A2E]">&bull; &bull; &bull; &rarr;</span>
                  <ShieldCheck className="h-8 w-8 text-[#085A2E]" />
                </div>

                {/* Warning Callout */}
                {steps[0].isIrreversible && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 flex items-start gap-2.5 text-xs">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 font-bold">Important Notice</strong>
                      <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                        Irreversible data erasure will occur during reset. Back up your photos, contacts, and personal data beforehand.
                      </p>
                    </div>
                  </div>
                )}

                {/* Checkbox & Mark complete */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-ink cursor-pointer">
                    <input
                      type="checkbox"
                      checked={backedUp}
                      onChange={(e) => setBackedUp(e.target.checked)}
                      className="h-4 w-4 rounded-md border-line text-[#085A2E] focus:ring-[#085A2E] accent-[#085A2E]"
                    />
                    <span>I have completed this step</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setBackedUp(true);
                      toggleStep(1);
                      toast("Step 1 marked as complete");
                    }}
                    className="rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Mark as complete
                  </button>
                </div>
              </div>

              {/* Remaining Steps Collapsed Accordions */}
              <div className="space-y-2">
                {steps.slice(1).map((s) => {
                  const isOpen = openAccordion === s.step;
                  const isDone = completedSteps.includes(s.step);
                  return (
                    <div
                      key={s.step}
                      className="rounded-2xl border border-line bg-white p-3.5 transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenAccordion(isOpen ? null : s.step)}
                        className="flex w-full items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "grid h-6 w-6 place-items-center rounded-full text-xs font-bold",
                              isDone
                                ? "bg-[#085A2E] text-white"
                                : "bg-bg text-muted border border-line"
                            )}
                          >
                            {isDone ? <Check className="h-3 w-3" /> : s.step}
                          </span>
                          <div>
                            <strong className="block text-xs font-bold text-ink">
                              {s.step}. {s.title}
                            </strong>
                            <span className="text-[11px] text-muted">{s.description}</span>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-muted" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="mt-3 border-t border-line/60 pt-3 text-xs space-y-2">
                          {s.isIrreversible && (
                            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                              Warning: This action permanently removes stored files. Verify backup before proceeding.
                            </p>
                          )}
                          <p className="text-muted text-[11px]">
                            Required for delivery agent verification.
                          </p>
                          <button
                            type="button"
                            onClick={() => toggleStep(s.step)}
                            className="rounded-lg bg-[#F0F8EC] border border-[#DCEDD2] px-3 py-1.5 font-bold text-[#085A2E] hover:bg-[#DCEDD2] text-[11px] cursor-pointer"
                          >
                            {isDone ? "Mark as incomplete" : "Mark as complete"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Privacy notice & Checklist Summary */}
            <div className="space-y-4 lg:col-span-5">
              {/* Privacy Warning Box */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-1.5 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Privacy Protection Guarantee</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Our delivery specialist will verify factory reset in front of you. HyperMart does not accept devices with active passwords, biometric locks, or linked cloud accounts.
                </p>
              </div>

              {/* Preparation Checklist Summary */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-ink">Preparation Checklist</h4>
                  <span className="rounded-md bg-[#F0F8EC] text-[#085A2E] font-extrabold px-2 py-0.5 text-[10px]">
                    {completedSteps.length} of {steps.length} completed
                  </span>
                </div>

                <div className="divide-y divide-line/60 text-xs">
                  {steps.map((s) => {
                    const isDone = completedSteps.includes(s.step);
                    return (
                      <div
                        key={s.step}
                        onClick={() => toggleStep(s.step)}
                        className="flex items-center justify-between py-2 cursor-pointer hover:text-[#085A2E]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-muted font-bold">{s.step}</span>
                          <span className={cn(isDone ? "font-bold text-ink" : "text-muted")}>
                            {s.title}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-bold",
                            isDone ? "text-[#085A2E]" : "text-muted"
                          )}
                        >
                          {isDone ? (
                            <>
                              Completed <Check className="h-3 w-3 text-[#085A2E] inline" />
                            </>
                          ) : (
                            <>
                              Pending <ChevronRight className="h-3 w-3 text-muted inline" />
                            </>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Handover Receipt Preview */}
              <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/40 p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white border border-[#DCEDD2] text-[#085A2E] shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-ink">
                      Digital Handover Certificate
                    </h5>
                    <p className="text-[11px] text-muted">
                      Technician will sign off digitally on doorstep verification to finalize your instant exchange credit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col gap-2 border-t border-line bg-bg px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[11px] text-muted">
            All checklist items are verified on-site during courier handover.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-bold text-ink hover:bg-neutral-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white px-5 py-2 text-xs font-extrabold transition shadow-sm cursor-pointer"
            >
              I&apos;m ready for handover &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
