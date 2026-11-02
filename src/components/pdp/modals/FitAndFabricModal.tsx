"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check, ArrowLeft, Ruler, User, Sparkles, Shirt, Info, Footprints, Baby } from "lucide-react";
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
  if (!open || p.attrs.department !== "fashion") return null;
  const a = p.attrs;

  const isFreeSize =
    a.sizeSystem === "free" ||
    (a.sizes.length === 1 && a.sizes[0].toLowerCase().includes("free"));
  const isFootwear =
    a.sizeSystem === "uk_shoe" ||
    a.sizes.some((s) => s.startsWith("UK"));
  const isAge =
    a.sizeSystem === "age" ||
    a.sizes.some((s) => s.includes("Y"));
  const isWaist =
    a.sizeSystem === "waist" ||
    (a.sizes.length > 0 && /^\d{2}$/.test(a.sizes[0]));

  const [activeTab, setActiveTab] = useState<"profile" | "measurements" | "chart">("measurements");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [height, setHeight] = useState("175");
  const [chest, setChest] = useState("98");
  const [waist, setWaist] = useState("82");
  const [hip, setHip] = useState("96");
  const [footLength, setFootLength] = useState("26.5");
  const [childAge, setChildAge] = useState("5");

  const [selectedSize, setSelectedSize] = useState(
    selection.size ?? a.sizes[0] ?? "M"
  );

  const modelInfo = a.modelInfo ?? { heightCm: 183, sizeWorn: a.sizes[0] ?? "L" };
  const feel = a.feel ?? {
    softness: "Soft",
    thickness: "Medium",
    stretch: "Low",
    transparency: "Low",
    drape: "Fluid",
  };

  const toInch = (valCm: number) => (valCm / 2.54).toFixed(1);

  // Compute recommended size based on product type
  let recommended = a.sizes[0] ?? "M";

  if (isFreeSize) {
    recommended = a.sizes[0] ?? "Free size";
  } else if (isFootwear) {
    const userFootCm = unit === "cm" ? Number(footLength) || 26.5 : (Number(footLength) || 10.4) * 2.54;
    if (a.sizeChart && a.sizeChart.length > 0) {
      const match = a.sizeChart.find((row) => Number(row.footLengthCm ?? 0) >= userFootCm - 0.3) ?? a.sizeChart[a.sizeChart.length - 1];
      recommended = match.size;
    } else {
      recommended = a.sizes[2] ?? a.sizes[0];
    }
  } else if (isWaist) {
    const userWaistIn = unit === "in" ? Number(waist) || 32 : Math.round((Number(waist) || 81) / 2.54);
    const closest = a.sizes.reduce((prev, curr) => {
      const prevDiff = Math.abs(Number(prev) - userWaistIn);
      const currDiff = Math.abs(Number(curr) - userWaistIn);
      return currDiff < prevDiff ? curr : prev;
    }, a.sizes[0]);
    recommended = closest;
  } else if (isAge) {
    const ageNum = Number(childAge) || 5;
    if (ageNum <= 3) recommended = a.sizes[0] ?? "2–3 Y";
    else if (ageNum <= 5) recommended = a.sizes[1] ?? "4–5 Y";
    else if (ageNum <= 7) recommended = a.sizes[2] ?? "6–7 Y";
    else if (ageNum <= 9) recommended = a.sizes[3] ?? "8–9 Y";
    else recommended = a.sizes[4] ?? a.sizes[a.sizes.length - 1];
  } else {
    // Standard garment (alpha or numeric bust/chest)
    const userChestCm = unit === "cm" ? Number(chest) || 98 : (Number(chest) || 38) * 2.54;
    if (a.sizeChart && a.sizeChart.length > 0) {
      const match = a.sizeChart.find((row) => {
        const val = row.chest ?? row.bust;
        return typeof val === "number" && val >= userChestCm - 2;
      });
      recommended = match ? match.size : a.sizes[a.sizes.length - 1];
    } else {
      if (userChestCm < 92 && a.sizes.includes("S")) recommended = "S";
      else if (userChestCm <= 100 && a.sizes.includes("M")) recommended = "M";
      else if (userChestCm <= 108 && a.sizes.includes("L")) recommended = "L";
      else if (userChestCm <= 116 && a.sizes.includes("XL")) recommended = "XL";
      else if (a.sizes.includes("XXL")) recommended = "XXL";
      else recommended = a.sizes[0];
    }
  }

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
            <span className="hidden sm:inline text-xs text-muted">/ Product / Fit &amp; Fabric</span>
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
                <div className="mt-3 flex items-start gap-3 rounded-2xl bg-[#F0F8EC] p-3.5 border border-[#DCEDD2]">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#085A2E] text-white">
                    <Shirt className="h-5 w-5 text-[#B8F34A]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-[#14532D] sm:text-sm">{a.fabric}</h4>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#085A2E]">
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
                              dot <= metric.score ? "bg-[#085A2E]" : "bg-line"
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
                      Breathable &amp; comfortable
                    </div>
                    <div className="rounded-xl bg-bg p-2 text-[10px] font-semibold text-ink">
                      Natural daylight photo
                    </div>
                    <div className="rounded-xl bg-bg p-2 text-[10px] font-semibold text-ink">
                      Easy 7-day exchange
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Check Your Fit (7 cols) */}
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h3 className="text-xl font-extrabold text-ink">Check your fit</h3>
                <p className="text-xs text-muted">
                  {isFreeSize
                    ? "Traditional garment specifications and universal draping guide."
                    : isFootwear
                    ? "Find your exact shoe size with foot length calibration."
                    : "Find your best size with personalized recommendations."}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "profile" as const, label: "Use My Fit Profile", icon: User },
                  { id: "measurements" as const, label: isFreeSize ? "Dimensions & Fit" : "Enter measurements", icon: isFootwear ? Footprints : Ruler },
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
                          ? "border-[#085A2E] bg-[#F0F8EC] ring-2 ring-[#085A2E] text-[#14532D]"
                          : "border-line bg-white hover:border-[#085A2E]/40 text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] font-bold leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Measurements / Dimensions Mode */}
              {activeTab === "measurements" && (
                <div className="space-y-4">
                  {isFreeSize ? (
                    /* Free size saree dimensions display */
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/80 space-y-2">
                        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                          <Sparkles className="h-4 w-4 text-amber-700" />
                          <span>Universal Free Size — Traditional Draping Standard</span>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          Handcrafted sarees are designed in the universal Indian free-size tradition. The saree body is pleated and draped to fit any height from 4&apos;10&quot; to 6&apos;0&quot; gracefully, without size restrictions.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-line bg-bg p-3 text-center">
                          <span className="block text-[10px] font-bold text-muted uppercase">Saree Length</span>
                          <span className="font-display text-lg font-extrabold text-ink">5.5 m</span>
                          <span className="block text-[10px] text-muted">6.0 yards standard</span>
                        </div>
                        <div className="rounded-xl border border-line bg-bg p-3 text-center">
                          <span className="block text-[10px] font-bold text-muted uppercase">Blouse Piece</span>
                          <span className="font-display text-lg font-extrabold text-ink">0.8 m</span>
                          <span className="block text-[10px] text-muted">Unstitched fabric</span>
                        </div>
                        <div className="rounded-xl border border-line bg-bg p-3 text-center">
                          <span className="block text-[10px] font-bold text-muted uppercase">Saree Width</span>
                          <span className="font-display text-lg font-extrabold text-ink">1.2 m</span>
                          <span className="block text-[10px] text-muted">47 inches drop</span>
                        </div>
                      </div>

                      {/* Free size recommendation card */}
                      <div className="grid gap-3 rounded-2xl bg-bg p-4 sm:grid-cols-12 sm:items-center">
                        <div className="flex items-center gap-3 sm:col-span-7">
                          <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-white border border-line">
                            <Image src={imageSrc} alt="" fill className="object-contain p-0.5" />
                          </div>
                          <div className="text-[11px] text-muted space-y-0.5">
                            <p className="font-bold text-ink">Traditional Garment Profile</p>
                            <p>One size fits all body types (Bust 30&quot; to 48&quot;)</p>
                            <p>Blouse fabric can be tailored to your custom fit</p>
                          </div>
                        </div>

                        <div className="sm:col-span-5 rounded-xl bg-white p-3 text-center border border-line shadow-xs">
                          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Garment Sizing</p>
                          <p className="font-display text-xl font-extrabold text-[#085A2E]">Free size</p>
                          <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted">
                            <span className="font-bold text-[#15803D]">●●●●● Perfect Fit Guaranteed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : isFootwear ? (
                    /* Footwear foot-length measurement */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">Foot length measurement</span>
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

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted">Foot Length ({unit})</label>
                          <input
                            type="number"
                            step="0.1"
                            value={footLength}
                            onChange={(e) => setFootLength(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div className="rounded-xl border border-line bg-bg p-2.5 text-[11px] text-muted">
                          <span className="font-bold text-ink block">How to measure:</span>
                          Stand on paper, mark heel to longest toe, and measure with ruler.
                        </div>
                      </div>

                      <div className="grid gap-3 rounded-2xl bg-bg p-4 sm:grid-cols-12 sm:items-center">
                        <div className="flex items-center gap-3 sm:col-span-7">
                          <Footprints className="h-10 w-10 text-[#085A2E] shrink-0" />
                          <div className="text-[11px] text-muted space-y-0.5">
                            <p className="font-bold text-ink">Calibrated UK Footwear Sizing</p>
                            <p>Foot length measured: {footLength} {unit}</p>
                            <p>Standard athletic running shoe fit</p>
                          </div>
                        </div>

                        <div className="sm:col-span-5 rounded-xl bg-white p-3 text-center border border-line shadow-xs">
                          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Recommended shoe size</p>
                          <p className="font-display text-2xl font-extrabold text-[#085A2E]">{recommended}</p>
                          <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted">
                            <span className="font-bold text-[#15803D]">●●●●○ True to size</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard garment inputs */
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
                            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted">Chest/Bust ({unit})</label>
                          <input
                            type="number"
                            value={chest}
                            onChange={(e) => setChest(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted">Waist ({unit})</label>
                          <input
                            type="number"
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted">Hip ({unit})</label>
                          <input
                            type="number"
                            value={hip}
                            onChange={(e) => setHip(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:bg-white focus:outline-none"
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
                            <p>Height: {modelInfo.heightCm} cm · Chest/Bust: 96 cm</p>
                            <p>Wearing size: <b className="text-ink">{modelInfo.sizeWorn}</b></p>
                          </div>
                        </div>

                        <div className="sm:col-span-5 rounded-xl bg-white p-3 text-center border border-line shadow-xs">
                          <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Your recommended size</p>
                          <p className="font-display text-2xl font-extrabold text-[#085A2E]">{recommended}</p>
                          <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted">
                            <span>Confidence:</span>
                            <span className="font-bold text-[#15803D]">●●●●○ High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Profile Mode */}
              {activeTab === "profile" && (
                <div className="rounded-2xl bg-bg p-5 text-center">
                  <User className="mx-auto h-8 w-8 text-[#085A2E]" />
                  <h4 className="mt-2 text-sm font-bold text-ink">HyperMart Fit Profile Active</h4>
                  <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
                    {isFreeSize
                      ? "Free size sarees fit all body measurements gracefully without alterations needed."
                      : <>Your saved profile matches size <b className="text-[#085A2E]">{recommended}</b> for {a.fit} fit garments.</>}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedSize(recommended)}
                    className="mt-3 rounded-xl bg-[#085A2E] text-white px-4 py-1.5 text-xs font-bold hover:bg-[#064825] transition"
                  >
                    Select {recommended}
                  </button>
                </div>
              )}

              {/* Tab 3: Size Chart Mode */}
              {activeTab === "chart" && (
                <div className="overflow-x-auto rounded-2xl border border-line">
                  {isFreeSize ? (
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-bg text-muted border-b border-line">
                          <th className="py-2.5 px-3 font-bold">Size</th>
                          <th className="py-2.5 px-3 font-bold">Saree Length</th>
                          <th className="py-2.5 px-3 font-bold">Blouse Piece</th>
                          <th className="py-2.5 px-3 font-bold">Width</th>
                          <th className="py-2.5 px-3 font-bold">Fit Compatibility</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          onClick={() => setSelectedSize("Free size")}
                          className="bg-[#F0F8EC] font-bold text-[#14532D] border-b border-line/60"
                        >
                          <td className="py-2.5 px-3">Free size</td>
                          <td className="py-2.5 px-3">5.5 metres</td>
                          <td className="py-2.5 px-3">0.8 metres</td>
                          <td className="py-2.5 px-3">1.2 metres</td>
                          <td className="py-2.5 px-3 text-[#15803D]">Fits all heights &amp; body types</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : isFootwear ? (
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-bg text-muted border-b border-line">
                          <th className="py-2.5 px-3 font-bold">UK Size</th>
                          <th className="py-2.5 px-3 font-bold">Foot Length ({unit})</th>
                          <th className="py-2.5 px-3 font-bold">Fit Guidance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {a.sizeChart?.map((row) => {
                          const val = Number(row.footLengthCm ?? 0);
                          const displayVal = unit === "in" ? toInch(val) : `${val} cm`;
                          return (
                            <tr
                              key={row.size}
                              onClick={() => setSelectedSize(row.size)}
                              className={`cursor-pointer border-b border-line/60 transition ${
                                selectedSize === row.size ? "bg-[#F0F8EC] font-bold text-[#14532D]" : "hover:bg-bg/60"
                              }`}
                            >
                              <td className="py-2.5 px-3">{row.size}</td>
                              <td className="py-2.5 px-3">{displayVal}</td>
                              <td className="py-2.5 px-3 text-muted">Standard sports fit</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-bg text-muted border-b border-line">
                          <th className="py-2.5 px-3 font-bold">Size</th>
                          <th className="py-2.5 px-3 font-bold">Chest / Bust ({unit})</th>
                          <th className="py-2.5 px-3 font-bold">Length ({unit})</th>
                          <th className="py-2.5 px-3 font-bold">Waist ({unit})</th>
                        </tr>
                      </thead>
                      <tbody>
                        {a.sizeChart?.map((row) => {
                          const chestVal = row.chest ?? row.bust;
                          return (
                            <tr
                              key={row.size}
                              onClick={() => setSelectedSize(row.size)}
                              className={`cursor-pointer border-b border-line/60 transition ${
                                selectedSize === row.size ? "bg-[#F0F8EC] font-bold text-[#14532D]" : "hover:bg-bg/60"
                              }`}
                            >
                              <td className="py-2.5 px-3">{row.size}</td>
                              <td className="py-2.5 px-3">
                                {typeof chestVal === "number" && unit === "in" ? toInch(chestVal) : chestVal ?? "—"}
                              </td>
                              <td className="py-2.5 px-3">
                                {typeof row.length === "number" && unit === "in" ? toInch(row.length) : row.length ?? "—"}
                              </td>
                              <td className="py-2.5 px-3">
                                {typeof row.waist === "number" && unit === "in" ? toInch(row.waist) : row.waist ?? "—"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
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
                          ? "bg-[#085A2E] text-white border-[#085A2E] shadow-sm"
                          : "bg-white text-ink border-line hover:border-[#085A2E]"
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
            <Info className="h-4 w-4 shrink-0 text-[#085A2E]" />
            <span>Fit recommendation is personalized guidance. Easy 7-day exchange is always available.</span>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-black hover:bg-neutral-800 text-white px-6 py-2.5 font-bold text-sm shadow-md transition cursor-pointer"
            >
              Save fit and fabric selection ({selectedSize})
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
