"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, X, UploadCloud, User, Check, Info, AlertCircle, RefreshCw } from "lucide-react";
import type { Product } from "@/types";
import type { PdpSelection } from "../types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface SeeOnMeModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onOpenFitModal?: () => void;
  onOpenAvailabilityModal?: () => void;
}

export function SeeOnMeModal({
  open,
  onClose,
  product: p,
  selection,
  onOpenFitModal,
  onOpenAvailabilityModal,
}: SeeOnMeModalProps) {
  const [mode, setMode] = useState<"neutral" | "custom">("neutral");
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const a = p.attrs;
  const isFashion = a.department === "fashion";
  const size = selection.size ?? (isFashion ? a.sizes[2] ?? a.sizes[0] ?? "L" : "L");
  const colour = selection.colour ?? (isFashion ? a.colours[0]?.name ?? "Blue" : "Blue");
  const fit = isFashion ? a.fit : "Regular fit";

  const defaultImage = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";
  const previewImage = mode === "custom" && customPhoto ? customPhoto : defaultImage;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10 MB limit.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setCustomPhoto(reader.result as string);
      setMode("custom");
      toast("Local photo preview loaded safely");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to fit checker
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
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">See on Me</h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              See how this looks on you. This preview uses the selected size and colour and does not
              change them.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Preview Artwork */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl bg-bg border border-line shadow-sm">
                <Image
                  src={previewImage}
                  alt={p.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              {mode === "custom" && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("neutral");
                    setCustomPhoto(null);
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-danger"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Remove uploaded photo
                </button>
              )}
            </div>

            {/* Right: Setup & Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-extrabold text-ink">Preview setup</h3>
                  <p className="text-xs text-muted">
                    Use your own photo or a neutral model to see how this looks.
                  </p>
                </div>

                {/* Setup Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Upload Card */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 rounded-2xl p-4 text-center border transition relative",
                      mode === "custom"
                        ? "border-black bg-bg ring-2 ring-black"
                        : "border-line bg-white hover:border-black/40"
                    )}
                  >
                    <UploadCloud className="h-5 w-5 text-ink" />
                    <span className="text-xs font-extrabold text-ink">Upload your photo</span>
                    <span className="text-[10px] text-muted">JPG or PNG, max 10 MB</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </button>

                  {/* Neutral Model Card */}
                  <button
                    type="button"
                    onClick={() => setMode("neutral")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 rounded-2xl p-4 text-center border transition relative",
                      mode === "neutral"
                        ? "border-black bg-bg ring-2 ring-black"
                        : "border-line bg-white hover:border-black/40"
                    )}
                  >
                    {mode === "neutral" && (
                      <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                    <User className="h-5 w-5 text-ink" />
                    <span className="text-xs font-extrabold text-ink">Use neutral model</span>
                    <span className="text-[10px] text-muted">See on a model like you</span>
                  </button>
                </div>

                {error && (
                  <div className="flex items-center gap-1.5 text-xs text-danger">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Variant Attributes Matrix */}
                <div className="divide-y divide-line/60 rounded-2xl border border-line bg-bg/40 p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="block font-medium text-muted">Selected size</span>
                      <strong className="block font-bold text-ink">
                        {size} (Chest 42 in, Length 46 in)
                      </strong>
                    </div>
                    {onOpenFitModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenFitModal();
                        }}
                        className="font-bold text-ink hover:underline"
                      >
                        Change size &rsaquo;
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="block font-medium text-muted">Selected colour</span>
                      <strong className="block font-bold text-ink">{colour}</strong>
                    </div>
                    {onOpenAvailabilityModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenAvailabilityModal();
                        }}
                        className="font-bold text-ink hover:underline"
                      >
                        Change colour &rsaquo;
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="block font-medium text-muted">Fit</span>
                      <strong className="block font-bold text-ink">{fit}</strong>
                    </div>
                    <span className="text-muted">&rsaquo;</span>
                  </div>

                  <div className="pt-3">
                    <span className="block font-medium text-muted">Preview status</span>
                    <div className="mt-1 flex items-center gap-1.5 font-bold text-emerald-800">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      <span>Preview ready</span>
                    </div>
                    <span className="text-[11px] text-muted block mt-0.5">
                      Showing size {size}, {colour}, {fit}
                    </span>
                  </div>
                </div>

                {/* Estimate Notice */}
                <div className="flex items-start gap-2 rounded-2xl bg-bg p-3.5 text-[11px] text-muted leading-relaxed">
                  <Info className="h-4 w-4 shrink-0 text-muted mt-0.5" />
                  <span>
                    Preview is an estimate. Actual appearance may vary by body position, lighting,
                    fabric, and screen.
                  </span>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-2xl bg-[#17201B] hover:bg-black py-3.5 text-xs font-extrabold text-white shadow-md transition"
                >
                  Return to product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
