"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check, ArrowLeft, Ruler, User, Sparkles, Shirt, Info, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/lib/format";
import type { PdpSelection } from "../types";

interface FitAndFabricModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
  onOpenSeeOnMe?: () => void;
}

export function FitAndFabricModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  onOpenSeeOnMe,
}: FitAndFabricModalProps) {
  const a = p.attrs;
  const isFashion = a.department === "fashion";

  const [activeTab, setActiveTab] = useState<"profile" | "measurements" | "chart">("measurements");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [height, setHeight] = useState("175");
  const [chest, setChest] = useState("98");
  const [waist, setWaist] = useState("82");
  const [hip, setHip] = useState("96");
  const [selectedSize, setSelectedSize] = useState(selection.size ?? (isFashion ? a.sizes[1] ?? "M" : "M"));

  if (!open || !isFashion) return null;

  const modelInfo = a.modelInfo ?? { heightCm: 183, sizeWorn: "L" };
  const feel = a.feel ?? {
    softness: "Soft",
    thickness: "Medium",
    stretch: "Low",
    transparency: "Low",
    drape: "Fluid",
  };

  const toInch = (valCm: number) => (valCm / 2.54).toFixed(1);

  // Compute recommended size based on chest measurement
  const userChestCm = unit === "cm" ? Number(chest) || 98 : (Number(chest) || 38) * 2.54;
  let recommended = a.sizes[1] ?? "M";
  if (userChestCm < 92 && a.sizes.includes("S")) recommended = "S";
  else if (userChestCm <= 100 && a.sizes.includes("M")) recommended = "M";
  else if (userChestCm <= 108 && a.sizes.includes("L")) recommended = "L";
  else if (userChestCm <= 116 && a.sizes.includes("XL")) recommended = "XL";
  else if (a.sizes.includes("XXL")) recommended = "XXL";

  const handleSave = () => {
    onSave({ size: selectedSize });
    onClose();
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to product
            </button>
            <span className="hidden sm:inline text-xs text-muted">/ Product / Fit & Fabric</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="font-bold text-ink">{p.name}</span>
              <span className="text-muted">Colour: {selection.colour ?? a.colours[0]?.name}</span>
              <span className="font-bold text-primary">{formatINR(p.price)}</span>
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
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Product Photo & Fabric & Feel (5 cols) */}
            <div className="space-y-6 lg:col-span-5">
              <div className="relative flex aspect-3/4 max-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl bg-bg p-2 border border-line/60">
                <Image
                  src={imageSrc}
                  alt={p.name}
                  width={240}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-ink">Fabric and Feel</h3>
                <p className="text-xs text-muted">Know the fabric, so you can wear it with confidence.</p>

                {/* Fabric highlight box */}
                <div className="mt-3 flex items-start gap-3 rounded-2xl bg-[#F9EBF4] p-3.5 border border-[#F0D1E6]">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#6B1D4F] text-white">
                    <Shirt className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#4A0E35] sm:text-sm">{a.fabric}</h4>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#6B1D4F]">
                      Natural premium woven material crafted for breathability, smooth skin contact, and all-day ease.
                    </p>
                  </div>
                </div>

                {/* 5-Dot Scales */}
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Softness", value: feel.softness ?? "Soft", score: 4 },
                    { label: "Thickness", value: feel.thickness ?? "Medium", score: 3 },
                    { label: "Stretch", value: feel.stretch ?? "Low", score: 1 },
                    { label: "Transparency", value: feel.transparency ?? "Low", score: 1 },
                    { label: "Drape", value: feel.drape ?? "Fluid", score: 4 },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between text-xs">
                      <span className="w-24 font-bold text-ink">{metric.label}</span>
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <span
                            key={dot}
                            className={`h-2.5 w-2.5 rounded-full ${
                              dot <= metric.score ? "bg-[#6B1D4F]" : "bg-line"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="w-20 text-right text-xs font-semibold text-muted">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* What to expect chips */}
                <div className="mt-5">
                  <h4 className="text-xs font-extrabold text-ink uppercase tracking-wider">What to expect</h4>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-bg p-2 text-[10px] font-semibold text-ink">
                      Breathable & comfortable
                    </div>
                    <div className="rounded-xl bg-bg p-2 text-[10px] font-semibold text-ink">
                      Looks best in natural light
                    </div>
                    <div className="rounded-xl bg-bg p-2 text-[10px] font-semibold text-ink">
                      Gets softer with wash
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Check Your Fit (7 cols) */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h3 className="text-xl font-extrabold text-ink">Check your fit</h3>
                <p className="text-xs text-muted">Find your best size with personalized recommendations.</p>
              </div>

              {/* Mode Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "profile" as const, label: "Use My Fit Profile", icon: User },
                  { id: "measurements" as const, label: "Enter measurements", icon: Ruler },
                  { id: "chart" as const, label: "Use size chart", icon: Shirt },
                ].map((t) => {
                  const Icon = t.icon;
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl p-3 text-center transition border ${
                        active
                          ? "border-[#6B1D4F] bg-[#FAF0F6] ring-2 ring-[#6B1D4F] text-[#4A0E35]"
                          : "border-line bg-white hover:border-[#6B1D4F]/40 text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] font-bold leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Measurements Mode */}
              {activeTab === "measurements" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ink">Your body measurements</span>
                    <div className="flex items-center gap-1 rounded-lg bg-bg p-0.5 border border-line">
                      <button
                        type="button"
                        onClick={() => setUnit("cm")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition ${
                          unit === "cm" ? "bg-white text-ink shadow-xs" : "text-muted hover:text-ink"
                        }`}
                      >
                        CM
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit("in")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition ${
                          unit === "in" ? "bg-white text-ink shadow-xs" : "text-muted hover:text-ink"
                        }`}
                      >
                        IN
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-muted">Height ({unit})</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#6B1D4F] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted">Chest ({unit})</label>
                      <input
                        type="number"
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#6B1D4F] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted">Waist ({unit})</label>
                      <input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#6B1D4F] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-muted">Hip ({unit})</label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#6B1D4F] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="grid gap-3 rounded-2xl bg-bg p-4 sm:grid-cols-12 sm:items-center">
                    <div className="flex items-center gap-3 sm:col-span-7">
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-white border border-line">
                        <Image src={imageSrc} alt="" fill className="object-contain p-0.5" />
                      </div>
                      <div className="text-[11px] text-muted space-y-0.5">
                        <p className="font-bold text-ink">Model measurements</p>
                        <p>Height: {modelInfo.heightCm} cm · Chest: 96 cm</p>
                        <p>Wearing size: <b className="text-ink">{modelInfo.sizeWorn}</b></p>
                      </div>
                    </div>

                    <div className="sm:col-span-5 rounded-xl bg-white p-3 text-center border border-line shadow-xs">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Your recommended size</p>
                      <p className="font-display text-2xl font-extrabold text-[#6B1D4F]">{recommended}</p>
                      <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted">
                        <span>Confidence:</span>
                        <span className="font-bold text-[#15803D]">●●●●○ High</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Profile Mode */}
              {activeTab === "profile" && (
                <div className="rounded-2xl bg-bg p-5 text-center">
                  <User className="mx-auto h-8 w-8 text-[#6B1D4F]" />
                  <h4 className="mt-2 text-sm font-bold text-ink">HyperMart Fit Profile Active</h4>
                  <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
                    Your saved measurements match size <b className="text-[#6B1D4F]">{recommended}</b> for {a.fit} fit garments.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedSize(recommended)}
                    className="mt-3 rounded-xl bg-[#6B1D4F] text-white px-4 py-1.5 text-xs font-bold"
                  >
                    Select {recommended}
                  </button>
                </div>
              )}

              {/* Tab 3: Size Chart Mode */}
              {activeTab === "chart" && (
                <div className="overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-bg text-muted border-b border-line">
                        <th className="py-2.5 px-3 font-bold">Size</th>
                        <th className="py-2.5 px-3 font-bold">Chest ({unit})</th>
                        <th className="py-2.5 px-3 font-bold">Length ({unit})</th>
                        <th className="py-2.5 px-3 font-bold">Shoulder ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.sizeChart?.map((row) => (
                        <tr
                          key={row.size}
                          onClick={() => setSelectedSize(row.size)}
                          className={`cursor-pointer border-b border-line/60 transition ${
                            selectedSize === row.size ? "bg-[#FAF0F6] font-bold text-[#4A0E35]" : "hover:bg-bg/60"
                          }`}
                        >
                          <td className="py-2.5 px-3">{row.size}</td>
                          <td className="py-2.5 px-3">
                            {typeof row.chest === "number" && unit === "in" ? toInch(row.chest) : row.chest}
                          </td>
                          <td className="py-2.5 px-3">
                            {typeof row.length === "number" && unit === "in" ? toInch(row.length) : row.length}
                          </td>
                          <td className="py-2.5 px-3">
                            {typeof row.shoulder === "number" && unit === "in" ? toInch(row.shoulder) : row.shoulder ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Select Size Buttons */}
              <div>
                <p className="text-xs font-bold text-ink mb-2">Select your size to apply to cart:</p>
                <div className="flex flex-wrap gap-2">
                  {a.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-12 rounded-xl px-4 py-2 text-xs font-extrabold transition border ${
                        selectedSize === s
                          ? "bg-[#6B1D4F] text-white border-[#6B1D4F] shadow-sm"
                          : "bg-white text-ink border-line hover:border-[#6B1D4F]"
                      }`}
                    >
                      {s}
                      {s === recommended && (
                        <span className="ml-1 text-[9px] opacity-80">(Recommended)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-line bg-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Info className="h-4 w-4 shrink-0 text-[#6B1D4F]" />
            <span>Fit recommendation is personalized guidance. Easy 7-day exchange is always available.</span>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-black hover:bg-neutral-800 text-white px-6 py-2.5 font-bold text-sm shadow-md transition"
            >
              Save fit and fabric selection
            </button>
            {onOpenSeeOnMe && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSeeOnMe();
                }}
                className="text-xs font-bold text-muted hover:text-ink underline transition cursor-pointer"
              >
                See on Me
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
