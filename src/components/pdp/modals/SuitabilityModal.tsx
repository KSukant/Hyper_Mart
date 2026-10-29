"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ArrowLeft,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Gamepad2,
  Film,
  BarChart3,
  Laptop,
  CheckCircle2,
  Info,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface SuitabilityModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
}

export function SuitabilityModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
}: SuitabilityModalProps) {
  const [useCase, setUseCase] = useState<string>(selection.useCase ?? "gaming");
  const [activeThumb, setActiveThumb] = useState(0);

  if (!open) return null;

  const imageSrc =
    p.images[activeThumb]?.src ??
    p.images[0]?.src ??
    "/products/electronics/hp-14-laptop-i5-16gb-1.jpg";

  const USE_CASES = [
    { id: "study", label: "Study", icon: GraduationCap },
    { id: "office", label: "Office work", icon: Briefcase },
    { id: "gaming", label: "Gaming", icon: Gamepad2 },
    { id: "editing", label: "Editing", icon: Film },
    { id: "pro", label: "Professional use", icon: BarChart3 },
  ];

  const getVerdict = (uc: string) => {
    switch (uc) {
      case "study":
        return {
          title: "Suitable — Highly Recommended",
          status: "Suitable",
          desc: "Excellent battery life, lightweight design, and fast multi-tab browsing make this ideal for study and online lectures.",
          pros: [
            "14\" anti-glare display reduces eye strain during long reading sessions",
            "16 GB RAM effortlessly handles 30+ browser tabs, PDFs & Zoom simultaneously",
            "512 GB fast NVMe SSD boots Windows in under 10 seconds",
            "Built-in HD webcam with noise reduction for clear online classes",
          ],
          cons: [
            "Moderate speaker volume in noisy study halls",
            "Non-backlit function keys in pitch-dark rooms",
          ],
        };
      case "office":
        return {
          title: "Suitable — Work & Office",
          status: "Suitable",
          desc: "Pre-installed MS Office, fast multitasking, and all-day battery life provide seamless productivity.",
          pros: [
            "Intel Core i5 (13th Gen) multi-core processor runs spreadsheets with zero lag",
            "Pre-activated Windows 11 Home & MS Office Lifetime license included",
            "Fast Wi-Fi 6 & Bluetooth 5.3 connectivity for wireless peripherals",
            "Ergonomic keyboard with responsive precision trackpad",
          ],
          cons: [
            "No native RJ45 ethernet port (USB-C dock required for wired networks)",
            "Dual-monitor setup requires an external multiport hub",
          ],
        };
      case "gaming":
        return {
          title: "Suitable with limits",
          status: "Suitable with limits",
          desc: "This device can handle casual and moderate gaming, but it's not ideal for the latest AAA games at high settings.",
          pros: [
            "Capable processor for popular games",
            "Integrated graphics can run many e-sports and older titles smoothly",
            "8 GB RAM is enough for casual gaming",
            "Fast storage helps with game loading times",
          ],
          cons: [
            "May struggle with the latest AAA games",
            "Not designed for high graphics settings or ray tracing",
            "Limited upgrade options",
            "May get warm during long gaming sessions",
          ],
        };
      case "editing":
        return {
          title: "Suitable for photo & light video",
          status: "Suitable with limits",
          desc: "Great for Photoshop, Lightroom and 1080p video editing. 4K timeline rendering may take longer.",
          pros: [
            "Full HD 1080p anti-glare panel with crisp sharpness",
            "Handles multi-layer Photoshop projects and Canva effortlessly",
            "Fast NVMe SSD accelerates video scrubbing and cache reads",
            "Multiport USB-C enables fast file transfers from cameras",
          ],
          cons: [
            "Color gamut is 62.5% sRGB, not recommended for print-accurate grading",
            "4K 60fps video exports will take longer without discrete GPU",
          ],
        };
      case "pro":
      default:
        return {
          title: "Suitable for modern workloads",
          status: "Suitable",
          desc: "Reliable for developers, data analysts, and managers managing cloud consoles and virtual meetings.",
          pros: [
            "10-core hybrid CPU handles Docker and local server environments well",
            "Fast memory bandwidth keeps virtual desktops fluid",
            "Hardware TPM 2.0 security chip for BitLocker disk encryption",
            "Clean professional aesthetic suitable for client presentations",
          ],
          cons: [
            "RAM is soldered on this chassis, non-expandable beyond 16 GB",
            "Integrated webcam is 720p rather than 1080p",
          ],
        };
    }
  };

  const verdict = getVerdict(useCase);

  const handleSave = () => {
    onSave({ useCase });
    toast(`Suitability preference saved: ${verdict.status}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
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

        {/* Modal Body: Left Gallery + Right Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Product Gallery */}
            <div className="space-y-4 lg:col-span-5">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#F8FAF7] border border-line/70 p-4 flex items-center justify-center">
                <div className="relative h-full w-full">
                  <Image
                    src={imageSrc}
                    alt={p.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((idx) => {
                  const thumb = p.images[idx]?.src ?? imageSrc;
                  const active = activeThumb === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveThumb(idx)}
                      className={cn(
                        "relative h-16 w-16 rounded-xl border bg-[#F8FAF7] p-1 overflow-hidden transition",
                        active
                          ? "border-[#1D4E89] ring-2 ring-[#1D4E89]/20"
                          : "border-line hover:border-[#1D4E89]/40"
                      )}
                    >
                      <Image
                        src={thumb}
                        alt={`Thumb ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Suitability Questionnaire & Results */}
            <div className="space-y-5 lg:col-span-7">
              <div>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                  What will you use it for?
                </h2>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Tell us your main use case to see if this device is a good fit for your needs.
                </p>
              </div>

              {/* 5 Use Case Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {USE_CASES.map((uc) => {
                  const Icon = uc.icon;
                  const isSelected = useCase === uc.id;
                  return (
                    <button
                      key={uc.id}
                      type="button"
                      onClick={() => setUseCase(uc.id)}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 rounded-2xl p-3 text-center transition border",
                        isSelected
                          ? "border-[#1D4E89] bg-[#EFF6FF] text-[#1D4E89] ring-2 ring-[#1D4E89]"
                          : "border-line bg-white text-muted hover:border-[#1D4E89]/40 hover:text-ink"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-bold leading-tight">{uc.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Result Card Matching Screen 2 */}
              <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-xs space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17201B] text-white shrink-0">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-ink sm:text-lg">
                      {verdict.status}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted leading-relaxed">
                      {verdict.desc}
                    </p>
                  </div>
                </div>

                {/* Why it's suitable & Limitations 2-col grid */}
                <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-line/60">
                  {/* Why it's suitable */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold text-ink">Why it&apos;s suitable</h4>
                    <ul className="space-y-2">
                      {verdict.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink/90">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D] mt-0.5" />
                          <span className="leading-tight">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold text-ink">Limitations</h4>
                    <ul className="space-y-2">
                      {verdict.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted">
                          <AlertCircle className="h-4 w-4 shrink-0 text-[#D97706] mt-0.5" />
                          <span className="leading-tight">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Higher performance banner */}
                <div className="flex flex-col gap-2 rounded-xl border border-line bg-[#F8FAF7] p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-[#1D4E89] shrink-0" />
                    <div>
                      <strong className="block text-ink font-bold">Looking for higher performance?</strong>
                      <span className="text-[11px] text-muted">Compare similar devices with dedicated graphics for a better gaming experience.</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Device comparison tool loaded")}
                    className="shrink-0 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink hover:bg-bg"
                  >
                    Compare Devices
                  </button>
                </div>

                {/* Save suitability CTA */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-extrabold transition shadow-sm"
                  >
                    Save suitability result
                  </button>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-muted">
                  <Info className="h-3.5 w-3.5 text-muted shrink-0 mt-0.5" />
                  <p>
                    This result is guidance based on typical use cases and device specifications. It is not a guarantee of performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
