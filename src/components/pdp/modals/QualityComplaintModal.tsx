"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Camera, Copy, CheckCircle2, ShieldCheck, Banknote } from "lucide-react";
import { formatINR } from "@/lib/format";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface QualityComplaintModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  orderId: string;
  deliveryDate: string;
  actualWeightG: number;
  productImage?: string;
  onSubmitted?: () => void;
}

export function QualityComplaintModal({
  open,
  onClose,
  productName,
  orderId,
  deliveryDate,
  actualWeightG,
  productImage = "/products/food/fresh-tomatoes-1.jpg",
  onSubmitted,
}: QualityComplaintModalProps) {
  const [affectedQty, setAffectedQty] = useState<number>(120);
  const [issue, setIssue] = useState<string>("spoiled");
  const [photos, setPhotos] = useState<string[]>([productImage, productImage]);
  const [details, setDetails] = useState<string>("Some tomatoes are soft and have started to rot.");
  const [resolution, setResolution] = useState<"refund" | "replacement">("refund");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!open) return null;

  const caseId = "SR98765432";

  const handleCopyCaseId = () => {
    navigator.clipboard?.writeText(caseId);
    toast("Case ID copied to clipboard");
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast("Quality complaint submitted successfully");
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              Report damaged or unusable quantity
            </h2>
            <p className="text-xs text-muted sm:text-sm mt-0.5">Tell us what went wrong. We&apos;ll make it right.</p>
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
          {/* Product Mini Header */}
          <div className="mb-6 flex items-center gap-3.5 rounded-2xl bg-bg/60 p-3.5 border border-line">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white border border-line/60">
              <Image src={productImage} alt={productName} fill className="object-contain p-1" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-ink">{productName}</p>
              <p className="text-xs text-muted">
                Order #{orderId} &middot; Delivered {deliveryDate}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Form Controls */}
            <div className="space-y-5 lg:col-span-7">
              {/* Affected Quantity */}
              <div>
                <span className="text-xs font-bold text-ink block mb-1.5">Affected quantity</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-line bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={() => setAffectedQty((q) => Math.max(50, q - 20))}
                      className="grid h-10 w-10 place-items-center text-ink hover:bg-bg transition rounded-l-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-16 text-center text-sm font-extrabold tabular text-ink">
                      {affectedQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAffectedQty((q) => Math.min(actualWeightG, q + 20))}
                      className="grid h-10 w-10 place-items-center text-ink hover:bg-bg transition rounded-r-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-xs text-muted font-semibold">
                    g (out of {actualWeightG} g)
                  </span>
                </div>
              </div>

              {/* What's the issue? */}
              <div>
                <span className="text-xs font-bold text-ink block mb-2">What&apos;s the issue?</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    { id: "spoiled", label: "Spoiled / rotten" },
                    { id: "bruised", label: "Bruised or crushed" },
                    { id: "mold", label: "Mold" },
                    { id: "other", label: "Other issue" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border p-2.5 text-xs font-semibold cursor-pointer transition",
                        issue === item.id
                          ? "border-ink bg-bg text-ink font-bold"
                          : "border-line text-muted hover:border-line-dark"
                      )}
                    >
                      <input
                        type="radio"
                        name="issue"
                        checked={issue === item.id}
                        onChange={() => setIssue(item.id)}
                        className="accent-ink"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload photos */}
              <div>
                <span className="text-xs font-bold text-ink block mb-2">Upload photos (optional)</span>
                <div className="flex flex-wrap items-center gap-3">
                  {photos.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 w-20 overflow-hidden rounded-2xl border border-line bg-bg shadow-xs"
                    >
                      <Image src={src} alt="Defect proof" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-white hover:bg-black"
                        aria-label="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      if (photos.length < 4) setPhotos((p) => [...p, productImage]);
                      toast("Photo added (demo)");
                    }}
                    className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line text-muted hover:border-ink hover:text-ink transition bg-bg/30"
                  >
                    <Camera className="h-5 w-5" />
                    <span className="text-[10px] font-bold text-center leading-tight">Add more photos</span>
                  </button>
                </div>
              </div>

              {/* Additional details */}
              <div>
                <span className="text-xs font-bold text-ink block mb-1.5">Additional details (optional)</span>
                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describe the issue with the delivered item..."
                    className="w-full rounded-2xl border border-line bg-white p-3 text-xs text-ink outline-none focus:border-ink"
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] text-muted">
                    {details.length}/500
                  </span>
                </div>
              </div>

              {/* Preferred resolution */}
              <div>
                <span className="text-xs font-bold text-ink block mb-2">Preferred resolution</span>
                <div className="space-y-2">
                  <label
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-3 cursor-pointer transition",
                      resolution === "refund"
                        ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                        : "border-line bg-white hover:border-line-dark"
                    )}
                  >
                    <input
                      type="radio"
                      name="resolution"
                      checked={resolution === "refund"}
                      onChange={() => setResolution("refund")}
                      className="mt-0.5 accent-ink"
                    />
                    <div>
                      <span className="text-xs font-bold text-ink block">Partial refund</span>
                      <span className="text-[11px] text-muted block">
                        For the affected quantity ({affectedQty} g)
                      </span>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border p-3 cursor-pointer transition",
                      resolution === "replacement"
                        ? "border-ink bg-bg/50 ring-1 ring-ink/10"
                        : "border-line bg-white hover:border-line-dark"
                    )}
                  >
                    <input
                      type="radio"
                      name="resolution"
                      checked={resolution === "replacement"}
                      onChange={() => setResolution("replacement")}
                      className="mt-0.5 accent-ink"
                    />
                    <div>
                      <span className="text-xs font-bold text-ink block">Replacement</span>
                      <span className="text-[11px] text-muted block">Send the affected quantity again</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-ink py-3 text-sm font-extrabold text-white transition hover:bg-black"
              >
                Submit request
              </button>
            </div>

            {/* Right Column: Case Timeline & Guarantee */}
            <div className="space-y-5 lg:col-span-5">
              <div className="rounded-3xl border border-line bg-bg/40 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-line/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Case ID</span>
                    <p className="font-extrabold text-sm text-ink">{caseId}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCaseId}
                    className="grid h-8 w-8 place-items-center rounded-lg hover:bg-bg text-muted hover:text-ink"
                    aria-label="Copy case ID"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                {/* Timeline Progress */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <div className="text-xs">
                      <strong className="block font-bold text-ink">Request submitted</strong>
                      <span className="text-[10px] text-muted">12 Apr 2025, 06:18 PM</span>
                      <p className="text-muted mt-0.5">We&apos;ve received your request.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border shrink-0 mt-0.5",
                        submitted ? "border-emerald-700 bg-emerald-50 text-emerald-800" : "border-line text-muted"
                      )}
                    >
                      <span className="h-2 w-2 rounded-full bg-current" />
                    </span>
                    <div className="text-xs">
                      <strong className="block font-bold text-ink">Review in progress</strong>
                      <p className="text-muted mt-0.5">We&apos;re checking the details and photos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-line text-muted shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-muted/40" />
                    </span>
                    <div className="text-xs">
                      <strong className="block font-bold text-muted">Resolution</strong>
                      <p className="text-muted mt-0.5">We&apos;ll confirm your refund or replacement soon.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-line text-muted shrink-0 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-muted/40" />
                    </span>
                    <div className="text-xs">
                      <strong className="block font-bold text-muted">Completed</strong>
                      <p className="text-muted mt-0.5">You&apos;ll be notified here and via email.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Promise */}
              <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/80 p-4 border border-emerald-200/80">
                <Banknote className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-emerald-950">
                  <strong className="block font-bold">Our promise</strong>
                  <span>If something&apos;s not right, we&apos;ll make it right with a refund or replacement.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
