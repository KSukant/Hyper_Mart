"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Info,
  Scale,
  Sparkles,
  Film,
  Activity,
  Gamepad2,
  Tv,
  Users,
  GraduationCap,
  Briefcase,
  Terminal,
  Cpu,
  Camera,
  Share2,
  Smartphone,
  User,
  Zap,
  Package,
  Headphones,
  PhoneCall,
  Music,
  Award,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";
import { CATEGORY_USE_CASES, getCategoryVerdict } from "@/lib/electronicsData";
import { CompareDevicesModal } from "./CompareDevicesModal";

interface SuitabilityModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection?: PdpSelection;
  onSave?: (updated: Partial<PdpSelection>) => void;
  onOpenCompare?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Film,
  Activity,
  Gamepad2,
  Tv,
  Users,
  GraduationCap,
  Briefcase,
  Terminal,
  Cpu,
  Camera,
  Share2,
  Smartphone,
  User,
  Zap,
  Package,
  Headphones,
  PhoneCall,
  Music,
  Award,
  CheckCircle2,
};

export function SuitabilityModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  onOpenCompare,
}: SuitabilityModalProps) {
  // Category-specific questionnaire use cases
  const availableUseCases = useMemo(() => {
    return CATEGORY_USE_CASES[p.categoryId] || CATEGORY_USE_CASES.default;
  }, [p.categoryId]);

  const [useCase, setUseCase] = useState<string>(
    selection?.useCase ?? availableUseCases[0]?.id ?? "everyday"
  );
  const [activeThumb, setActiveThumb] = useState(0);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  if (!open) return null;

  const imageSrc =
    p.images[activeThumb]?.src ??
    p.images[0]?.src ??
    "/products/electronics/hp-14-laptop-i5-16gb-1.jpg";

  const verdict = getCategoryVerdict(p, useCase);

  const handleSave = () => {
    onSave?.({ useCase });
    toast(`Suitability preference saved: ${verdict.title}`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Top Navbar */}
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to product
            </button>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#F0F8EC] border border-[#DCEDD2] px-2.5 py-0.5 text-[11px] font-black text-[#085A2E]">
                Right Device for You
              </span>
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                Is this the right device for you?
              </h2>
              <p className="mt-1 text-xs text-muted sm:text-sm">
                Select your primary workload or intended usage to assess real-world performance, capabilities and hardware limits.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Product Thumbnail & Specs (4 cols) */}
              <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-[#F8FAF6] p-4 text-center">
                <div className="relative mx-auto aspect-square w-36 overflow-hidden rounded-xl bg-white border border-line p-2">
                  <Image src={imageSrc} alt={p.name} fill className="object-contain p-1" />
                </div>

                <div className="text-left space-y-1">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-muted">
                    Selected Model
                  </span>
                  <h3 className="text-sm font-extrabold text-ink leading-snug">{p.name}</h3>
                  <p className="text-xs font-bold text-[#085A2E]">
                    {p.attrs.department === "electronics" ? p.attrs.model : p.unit}
                  </p>
                </div>

                {/* Thumbnail strip */}
                {p.images.length > 1 && (
                  <div className="flex justify-center gap-2 pt-2 border-t border-line/60">
                    {p.images.slice(0, 4).map((img, i) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveThumb(i)}
                        className={cn(
                          "relative h-10 w-10 overflow-hidden rounded-lg border bg-white p-0.5 transition",
                          activeThumb === i
                            ? "border-[#085A2E] ring-2 ring-[#085A2E]/20"
                            : "border-line opacity-70 hover:opacity-100"
                        )}
                      >
                        <Image src={img.src} alt="" fill className="object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Key Spec Highlights */}
                {p.attrs.department === "electronics" && p.attrs.specs && (
                  <div className="text-left rounded-xl border border-line/60 bg-white p-3 space-y-1 text-xs">
                    <strong className="block text-[11px] font-black uppercase tracking-wider text-muted mb-1">
                      Verified Specifications
                    </strong>
                    {p.attrs.specs.slice(0, 3).map((s) => (
                      <div key={s.label} className="flex justify-between text-[11px]">
                        <span className="text-muted">{s.label}</span>
                        <span className="font-bold text-ink">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Category-Specific Use-Case Questionnaire & Assessment (8 cols) */}
              <div className="space-y-5 lg:col-span-8 rounded-2xl border border-line/80 bg-white p-5 shadow-xs">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-muted">
                    1. Select your primary purpose
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {availableUseCases.map((uc) => {
                      const IconComponent = ICON_MAP[uc.iconName] || CheckCircle2;
                      const isSelected = useCase === uc.id;
                      return (
                        <button
                          key={uc.id}
                          type="button"
                          onClick={() => setUseCase(uc.id)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer",
                            isSelected
                              ? "bg-[#085A2E] text-white border-[#085A2E] shadow-xs"
                              : "bg-white text-ink border-line hover:border-[#085A2E]/40 hover:bg-[#F0F8EC]/30"
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{uc.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Verdict Card */}
                <div
                  className={cn(
                    "rounded-2xl border p-4 space-y-3",
                    verdict.status === "Suitable"
                      ? "bg-[#F0F8EC] border-[#DCEDD2] text-[#14532D]"
                      : verdict.status === "Suitable with limits"
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#085A2E]" />
                      <span className="font-extrabold text-sm sm:text-base">
                        {verdict.title}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider shrink-0",
                        verdict.status === "Suitable"
                          ? "bg-[#085A2E] text-white"
                          : verdict.status === "Suitable with limits"
                          ? "bg-amber-600 text-white"
                          : "bg-rose-600 text-white"
                      )}
                    >
                      {verdict.status}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed">{verdict.desc}</p>
                </div>

                {/* Pros and Cons / Capabilities & Limits */}
                <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-line/60">
                  {/* Capabilities / Pros */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                      Why It&apos;s Capable
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {verdict.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-ink">
                          <CheckCircle2 className="h-4 w-4 text-[#085A2E] shrink-0 mt-0.5" />
                          <span className="leading-tight">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations / Cons */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-700">
                      Known Limitations
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {verdict.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted">
                          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Compare Devices Shortcut */}
                <div className="flex flex-col gap-2 rounded-2xl border border-line bg-[#F8FAF6] p-3.5 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white border border-line text-[#085A2E]">
                      <Scale className="h-4 w-4" />
                    </span>
                    <div>
                      <strong className="block text-ink font-bold">Need a second opinion?</strong>
                      <span className="text-[11px] text-muted">
                        Compare specs, display technology, and benchmarks with similar devices.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenCompare) {
                        onClose();
                        onOpenCompare();
                      } else {
                        setCompareModalOpen(true);
                      }
                    }}
                    className="shrink-0 rounded-xl bg-white border border-[#085A2E] text-[#085A2E] hover:bg-[#F0F8EC] px-3.5 py-1.5 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Scale className="h-3.5 w-3.5" />
                    <span>Compare Devices</span>
                  </button>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full rounded-2xl bg-[#085A2E] hover:bg-[#064825] text-white py-3.5 text-xs font-extrabold transition shadow-md cursor-pointer"
                  >
                    Save suitability result &amp; continue
                  </button>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-muted">
                  <Info className="h-3.5 w-3.5 text-muted shrink-0 mt-0.5" />
                  <p>
                    Guidance is calibrated against official hardware specifications and benchmark testing standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Devices Sub-Modal */}
      {compareModalOpen && (
        <CompareDevicesModal
          open={compareModalOpen}
          onClose={() => setCompareModalOpen(false)}
          product={p}
        />
      )}
    </>
  );
}
