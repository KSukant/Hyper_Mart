"use client";

import { useState } from "react";
import {
  X,
  ArrowLeft,
  Check,
  AlertTriangle,
  Cloud,
  Laptop,
  Smartphone,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface DeviceExchangePrepModalProps {
  open: boolean;
  onClose: () => void;
  onBackToExchange: () => void;
}

export function DeviceExchangePrepModal({
  open,
  onClose,
  onBackToExchange,
}: DeviceExchangePrepModalProps) {
  const [backedUp, setBackedUp] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  if (!open) return null;

  const STEPS = [
    { num: 1, title: "Backup data", desc: "Save your important files, photos, contacts and other data to the cloud or another device." },
    { num: 2, title: "Remove accounts", desc: "Sign out of all accounts (email, cloud, app stores, etc.)." },
    { num: 3, title: "Remove SIM", desc: "Take out your physical or eSIM profile from the device." },
    { num: 4, title: "Remove memory card", desc: "Remove any memory card (e.g. microSD or external storage)." },
    { num: 5, title: "Factory reset", desc: "Reset the device to original factory settings." },
    { num: 6, title: "Confirm handover", desc: "Review and confirm that your device is ready for exchange." },
  ];

  const toggleStep = (num: number) => {
    if (completedSteps.includes(num)) {
      setCompletedSteps(completedSteps.filter((s) => s !== num));
    } else {
      setCompletedSteps([...completedSteps, num]);
    }
  };

  const handleConfirm = () => {
    toast("Handover preparation confirmed. Privacy receipt generated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onBackToExchange}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to exchange
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Prepare your device for exchange
            </h1>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Follow these steps to protect your privacy and get your device ready.
            </p>
          </div>

          {/* Stepper Header (1 to 6) */}
          <div className="no-scrollbar flex items-center justify-between gap-2 overflow-x-auto border-b border-line/60 pb-4 text-xs font-bold">
            {STEPS.map((step, idx) => {
              const isDone = completedSteps.includes(step.num);
              return (
                <div key={step.num} className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full text-xs font-black transition",
                      isDone
                        ? "bg-[#17201B] text-white"
                        : "bg-bg text-muted border border-line"
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : step.num}
                  </span>
                  <span className={cn(isDone ? "text-ink font-bold" : "text-muted")}>
                    {step.title}
                  </span>
                  {idx < STEPS.length - 1 && <span className="text-line mx-1">&mdash;</span>}
                </div>
              );
            })}
          </div>

          {/* 2 Columns: Main Checklist Flow (7 cols) + Privacy & Summary (5 cols) */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Flow */}
            <div className="space-y-4 lg:col-span-7">
              {/* Step 1: Backup Data Box Matching Screen 7 */}
              <div className="rounded-2xl border-2 border-line/80 bg-white p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#17201B] text-white text-xs font-black">
                    1
                  </span>
                  <h3 className="text-base font-extrabold text-ink">Backup data</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Save your important files, photos, contacts and other data to the cloud or another device.
                </p>

                {/* Cloud & Device Graphic */}
                <div className="rounded-xl border border-line/60 bg-[#F8FAF7] p-4 flex items-center justify-center gap-4 text-[#1D4E89]">
                  <Laptop className="h-10 w-10 text-muted" />
                  <span className="text-xs font-bold text-muted">&bull; &bull; &bull; &rarr;</span>
                  <Cloud className="h-10 w-10 text-[#1D4E89]" />
                  <span className="text-xs font-bold text-muted">&bull; &bull; &bull; &rarr;</span>
                  <Smartphone className="h-8 w-8 text-muted" />
                </div>

                {/* Good to know Callout */}
                <div className="rounded-xl border border-line bg-bg p-3.5 flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Good to know</strong>
                    <p className="text-[11px] text-muted mt-0.5 leading-relaxed">
                      After the factory reset, all data on this device will be permanently erased and cannot be recovered.
                    </p>
                  </div>
                </div>

                {/* Checkbox & Mark complete */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-ink cursor-pointer">
                    <input
                      type="checkbox"
                      checked={backedUp}
                      onChange={(e) => setBackedUp(e.target.checked)}
                      className="h-4 w-4 rounded-md border-line text-[#1D4E89] focus:ring-[#1D4E89]"
                    />
                    <span>I have backed up my data</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setBackedUp(true);
                      toggleStep(1);
                      toast("Step 1 marked as complete");
                    }}
                    className="rounded-xl bg-[#17201B] hover:bg-black text-white px-4 py-2 text-xs font-bold transition shadow-xs"
                  >
                    Mark as complete
                  </button>
                </div>
              </div>

              {/* Steps 2 to 6 Collapsed Accordions */}
              <div className="space-y-2">
                {STEPS.slice(1).map((s) => {
                  const isOpen = openAccordion === s.num;
                  const isDone = completedSteps.includes(s.num);
                  return (
                    <div
                      key={s.num}
                      className="rounded-2xl border border-line bg-white p-3.5 transition"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenAccordion(isOpen ? null : s.num)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "grid h-6 w-6 place-items-center rounded-full text-xs font-bold",
                              isDone
                                ? "bg-[#17201B] text-white"
                                : "bg-bg text-muted border border-line"
                            )}
                          >
                            {isDone ? <Check className="h-3 w-3" /> : s.num}
                          </span>
                          <div>
                            <strong className="block text-xs font-bold text-ink">
                              {s.num}. {s.title}
                            </strong>
                            <span className="text-[11px] text-muted">{s.desc}</span>
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
                          <p className="text-muted text-[11px]">
                            Make sure this step is completed before delivery pickup.
                          </p>
                          <button
                            type="button"
                            onClick={() => toggleStep(s.num)}
                            className="rounded-lg bg-bg px-3 py-1.5 font-bold text-ink hover:bg-line/40 text-[11px]"
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
              <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 space-y-1.5 text-xs text-[#92400E]">
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="h-4 w-4 text-[#D97706]" />
                  <span>Your privacy matters</span>
                </div>
                <p className="text-[11px] text-[#78350F] leading-relaxed">
                  Make sure you remove all personal data, accounts and cards before handing over your device. A factory reset helps prevent unauthorized access to your information.
                </p>
              </div>

              {/* Preparation Checklist Summary */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-ink">Preparation checklist</h4>
                  <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-muted">
                    {completedSteps.length} of 6 completed
                  </span>
                </div>

                <div className="divide-y divide-line/60 text-xs">
                  {STEPS.map((s) => {
                    const isDone = completedSteps.includes(s.num);
                    return (
                      <div
                        key={s.num}
                        onClick={() => toggleStep(s.num)}
                        className="flex items-center justify-between py-2 cursor-pointer hover:text-[#1D4E89]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-muted font-bold">{s.num}</span>
                          <span className={cn(isDone ? "font-bold text-ink" : "text-muted")}>
                            {s.title}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-bold",
                            isDone ? "text-success" : "text-muted"
                          )}
                        >
                          {isDone ? (
                            <>
                              Completed <Check className="h-3 w-3 text-success inline" />
                            </>
                          ) : (
                            <>
                              Not started <ChevronRight className="h-3 w-3 text-muted inline" />
                            </>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Handover Receipt Preview */}
              <div className="rounded-2xl border border-line/80 bg-white p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg text-muted border border-line">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <strong className="block text-xs font-bold text-ink">
                      Privacy handover receipt (preview)
                    </strong>
                    <p className="text-[10px] text-muted mt-0.5 leading-snug">
                      This receipt confirms that you have completed the privacy preparation steps for this device.
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-[#1D4E89]">
                      Status: {completedSteps.length === 6 ? "Ready to generate" : "Will be generated after completion"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Handover CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-black transition shadow-sm"
                >
                  Confirm handover preparation
                </button>
                <p className="mt-2 text-center text-[10px] text-muted leading-relaxed">
                  By confirming, you declare that you have completed all the steps and the device is ready for exchange, free of your personal data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
