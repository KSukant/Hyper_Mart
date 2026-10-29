"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Product } from "@/types";
import type { PdpSelection } from "../types";
import { cn } from "@/lib/cn";

interface SubstitutionPreferenceModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
}

export function SubstitutionPreferenceModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
}: SubstitutionPreferenceModalProps) {
  const [sub, setSub] = useState<"ask" | "skip" | "similar">(selection.substitution ?? "ask");
  if (!open) return null;

  const imageSrc = p.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg";

  const handleSave = () => {
    onSave({ substitution: sub });
    onClose();
  };

  const options: { id: "ask" | "skip" | "similar"; title: string; desc: string }[] = [
    {
      id: "ask",
      title: "Ask me before replacing",
      desc: "We'll show you a substitute and wait for your approval.",
    },
    {
      id: "skip",
      title: "Skip and refund",
      desc: "We won't replace this item. You'll be refunded.",
    },
    {
      id: "similar",
      title: "Allow similar substitute",
      desc: "We'll choose a similar item automatically.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
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
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Substitution preference</h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Tell us what to do if this item is unavailable.
            </p>
          </div>

          {/* 3 Radio Options */}
          <div className="space-y-2.5">
            {options.map((opt) => (
              <label
                key={opt.id}
                onClick={() => setSub(opt.id)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition",
                  sub === opt.id
                    ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                    : "border-line bg-white hover:border-line-dark"
                )}
              >
                <input
                  type="radio"
                  name="substitution"
                  checked={sub === opt.id}
                  onChange={() => setSub(opt.id)}
                  className="mt-1 h-4 w-4 accent-ink"
                />
                <div>
                  <span className="font-extrabold text-sm text-ink block">{opt.title}</span>
                  <span className="text-xs text-muted mt-0.5 block leading-relaxed">{opt.desc}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Example Substitution Card */}
          <div className="space-y-2.5">
            <span className="text-xs font-extrabold text-ink uppercase tracking-wider block">
              Example substitution
            </span>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-line p-3.5 bg-bg/30">
              {/* Original Item */}
              <div className="flex-1 rounded-xl bg-white p-2.5 border border-line/60">
                <span className="text-[10px] font-bold text-muted block mb-1.5">Original item</span>
                <div className="flex items-center gap-2">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bg">
                    <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate text-ink">{p.name}</p>
                    <p className="text-xs font-semibold text-muted">₹ 69</p>
                    <p className="text-[10px] text-muted">Qty: 1</p>
                  </div>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-muted shrink-0" />

              {/* Possible Substitute */}
              <div className="flex-1 rounded-xl bg-white p-2.5 border border-line/60">
                <span className="text-[10px] font-bold text-muted block mb-1.5">Possible substitute</span>
                <div className="flex items-center gap-2">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bg">
                    <Image src={imageSrc} alt="Organic Tomatoes" fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate text-ink">Organic Tomatoes</p>
                    <p className="text-xs font-bold text-ink">₹ 75 <span className="text-[10px] text-emerald-700 font-semibold">(+ ₹ 6)</span></p>
                    <p className="text-[10px] text-muted">Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Note Callout */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-50/80 p-3.5 border border-emerald-200/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-emerald-950">
              <strong className="block font-bold">We&apos;ll ask for your approval</strong>
              <span>
                If this item is unavailable, we&apos;ll show you a similar option like the one above including any price difference, and wait for your approval before adding it to your cart.
              </span>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-line bg-white p-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-black"
          >
            Save preference
          </button>
          <p className="text-center text-[11px] text-muted mt-2">
            This preference will be shown on the product page and in your cart.
          </p>
        </div>
      </div>
    </div>
  );
}
