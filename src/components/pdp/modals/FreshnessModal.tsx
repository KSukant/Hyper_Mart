"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, ShieldCheck, Info } from "lucide-react";
import type { Product } from "@/types";
import type { PdpSelection } from "../types";
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
  const [grade, setGrade] = useState<"A" | "B" | "C">(selection.grade ?? "A");
  const [ripeness, setRipeness] = useState<"raw" | "ready_to_eat" | "very_ripe">(
    selection.ripeness ?? "ready_to_eat"
  );
  const [estQty, setEstQty] = useState<string>(
    selection.kg ? `${selection.kg} kg` : "500 g"
  );
  const [sub, setSub] = useState<"ask" | "skip" | "similar">(selection.substitution ?? "similar");

  if (!open) return null;

  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  const handleSave = () => {
    const parsedKg = estQty.includes("1 kg") ? 1 : estQty.includes("2 kg") ? 2 : 0.5;
    onSave({
      grade,
      ripeness,
      kg: parsedKg,
      substitution: sub,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Freshness and Quality</h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Choose the quality, ripeness and delivery preferences that work for you.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Product Photo & Quality Promise */}
            <div className="space-y-4 lg:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg p-4 border border-line/60 flex items-center justify-center">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-4" />
              </div>

              <div className="rounded-2xl bg-[#E7F3DF]/70 p-4 border border-[#DFE7D8]">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2E7032] text-white">
                    <ShieldCheck className="h-4 w-4 text-[#8BC34A]" />
                  </div>
                  <div className="text-xs">
                    <strong className="block font-bold text-[#202820] text-sm">Our quality promise</strong>
                    <p className="mt-1 text-[#657064] leading-relaxed">
                      We carefully select and pack every order. If you&apos;re not satisfied with the freshness or quality, we&apos;ll make it right.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Grade, Ripeness, Quantity, Substitution */}
            <div className="space-y-6 lg:col-span-8">
              {/* Quality Grade */}
              <div>
                <span className="font-extrabold text-sm text-ink block">Quality Grade</span>
                <span className="text-xs text-muted block mb-2.5">
                  Choose the appearance standard that suits your needs.
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: "A",
                      title: "Grade A",
                      tag: "Best appearance",
                      desc: "Visually appealing, minimal blemishes. Ideal for most uses.",
                    },
                    {
                      id: "B",
                      title: "Grade B",
                      tag: "Good value",
                      desc: "May have minor blemishes or irregular shape. Same great taste.",
                    },
                    {
                      id: "C",
                      title: "Grade C",
                      tag: "Budget-friendly",
                      desc: "Visible blemishes or irregular shape. Perfect for cooking, smoothies or immediate use.",
                    },
                  ].map((g) => (
                    <label
                      key={g.id}
                      onClick={() => setGrade(g.id as typeof grade)}
                      className={cn(
                        "flex flex-col p-3 rounded-2xl border cursor-pointer transition text-left",
                        grade === g.id
                          ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                          : "border-line bg-white hover:border-line-dark"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="grade"
                          checked={grade === g.id}
                          onChange={() => setGrade(g.id as typeof grade)}
                          className="accent-ink"
                        />
                        <span className="font-extrabold text-xs text-ink">{g.title}</span>
                      </div>
                      <span className="text-[11px] font-bold text-ink/80">{g.tag}</span>
                      <span className="text-[10px] text-muted mt-1 leading-snug">{g.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ripeness / Preparation */}
              <div>
                <span className="font-extrabold text-sm text-ink block">Ripeness / Preparation</span>
                <span className="text-xs text-muted block mb-2.5">
                  Select how ripe or prepared you&apos;d like your produce.
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      id: "raw",
                      title: "Raw",
                      tag: "Firm and unripe",
                      desc: "Longer shelf life. Ripen at home.",
                    },
                    {
                      id: "ready_to_eat",
                      title: "Ready to eat",
                      tag: "Just right",
                      desc: "Optimal freshness and flavor. Ready to enjoy.",
                    },
                    {
                      id: "very_ripe",
                      title: "Very ripe",
                      tag: "Soft and sweet",
                      desc: "Best for immediate use, smoothies or baking.",
                    },
                  ].map((r) => (
                    <label
                      key={r.id}
                      onClick={() => setRipeness(r.id as typeof ripeness)}
                      className={cn(
                        "flex flex-col p-3 rounded-2xl border cursor-pointer transition text-left",
                        ripeness === r.id
                          ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                          : "border-line bg-white hover:border-line-dark"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="ripeness"
                          checked={ripeness === r.id}
                          onChange={() => setRipeness(r.id as typeof ripeness)}
                          className="accent-ink"
                        />
                        <span className="font-extrabold text-xs text-ink">{r.title}</span>
                      </div>
                      <span className="text-[11px] font-bold text-ink/80">{r.tag}</span>
                      <span className="text-[10px] text-muted mt-1 leading-snug">{r.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Estimated Quantity */}
              <div>
                <span className="font-extrabold text-sm text-ink block">Estimated Quantity</span>
                <span className="text-xs text-muted block mb-2">
                  Choose the approximate quantity you need.
                </span>
                <select
                  value={estQty}
                  onChange={(e) => setEstQty(e.target.value)}
                  className="h-10.5 w-full rounded-xl border border-line bg-white px-3 text-xs font-bold text-ink outline-none focus:border-ink"
                >
                  <option value="500 g">500 g (3–4 tomatoes / items)</option>
                  <option value="1 kg">1 kg (6–8 tomatoes / items)</option>
                  <option value="2 kg">2 kg (family pack)</option>
                </select>
              </div>

              {/* If your selection isn't available */}
              <div className="pt-2 border-t border-line">
                <span className="font-extrabold text-sm text-ink block">If your selection isn&apos;t available</span>
                <span className="text-xs text-muted block mb-2.5">
                  Tell us what to do if we can&apos;t fulfill your exact preference.
                </span>
                <div className="space-y-2">
                  {[
                    {
                      id: "similar",
                      title: "Substitute with closest match",
                      desc: "We'll choose the nearest quality and ripeness.",
                    },
                    {
                      id: "ask",
                      title: "Contact me first",
                      desc: "We'll reach out for your approval.",
                    },
                    {
                      id: "skip",
                      title: "Don't substitute",
                      desc: "Remove this item from my order.",
                    },
                  ].map((s) => (
                    <label
                      key={s.id}
                      onClick={() => setSub(s.id as typeof sub)}
                      className={cn(
                        "flex items-start gap-2.5 rounded-xl border p-2.5 cursor-pointer transition",
                        sub === s.id
                          ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                          : "border-line bg-white hover:border-line-dark"
                      )}
                    >
                      <input
                        type="radio"
                        name="sub_pref"
                        checked={sub === s.id}
                        onChange={() => setSub(s.id as typeof sub)}
                        className="mt-0.5 accent-ink"
                      />
                      <div className="text-xs">
                        <strong className="block font-bold text-ink">{s.title}</strong>
                        <span className="text-[11px] text-muted">{s.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line bg-white px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Info className="h-4 w-4 shrink-0 text-muted" />
            <span>Saving your selection will update the Freshness &amp; Delivery summary on the product page.</span>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-ink px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-black shrink-0"
          >
            Save selection
          </button>
        </div>
      </div>
    </div>
  );
}
