"use client";
import { useState } from "react";
import {
  Sparkles,
  Ruler,
  Check,
  ShieldCheck,
  Info,
  Layers,
  Cpu,
  Tv,
  Sofa,
  Box,
  Truck,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import type { Product } from "@/types";
import type { ProductDomain, DomainTheme, PdpSelection } from "./types";
import { cn } from "@/lib/cn";

interface DomainAttributePanelProps {
  product: Product;
  domain: ProductDomain;
  theme: DomainTheme;
  selection: PdpSelection;
  onSelect: (patch: Partial<PdpSelection>) => void;
  needSize?: boolean;
  onOpenFitModal?: () => void;
  onOpenBeautyModal?: () => void;
  onOpenSuitabilityModal?: () => void;
  onOpenCompatibilityModal?: () => void;
  onOpenHomeFitModal?: () => void;
}

export function DomainAttributePanel({
  product,
  domain,
  theme,
  selection,
  onSelect,
  needSize,
  onOpenFitModal,
  onOpenBeautyModal,
  onOpenSuitabilityModal,
  onOpenCompatibilityModal,
  onOpenHomeFitModal,
}: DomainAttributePanelProps) {
  const a = product.attrs;

  return (
    <div className="space-y-5 rounded-3xl border border-line/70 bg-white p-5 shadow-sm">
      {/* ──────────────── 1. GROCERY & FRESH PRODUCE ──────────────── */}
      {domain === "grocery_fresh" && a.department === "food" && (
        <div className="space-y-4">
          {/* Quality Grade Selector */}
          {a.grades && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-ink">
                  Select Quality Grade
                </span>
                <span className="text-muted">Graded at harvest depot</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(["A", "B", "C"] as const).map((grade) => {
                  const isSel = (selection.grade ?? "A") === grade;
                  const label =
                    grade === "A" ? "Grade A (Export / Table)" : grade === "B" ? "Grade B (Daily Table)" : "Grade C (Cooking / Stew)";
                  const note =
                    grade === "A" ? "Flawless skin & size" : grade === "B" ? "Minor marks, full flavour" : "Budget-friendly for cooking";

                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => onSelect({ grade })}
                      className={cn(
                        "rounded-2xl border p-3 text-left transition-all",
                        isSel
                          ? "border-primary bg-primary-tint/70 shadow-xs ring-2 ring-primary/30"
                          : "border-line bg-bg hover:border-muted hover:bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-ink">Grade {grade}</span>
                        {isSel && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-ink/80">{label}</p>
                      <p className="text-[10px] text-muted">{note}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ripeness Selector */}
          {a.ripenessOptions && a.ripenessOptions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-ink">
                  Ripeness Stage
                </span>
                <span className="text-muted">Choose based on cooking schedule</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {a.ripenessOptions.map((opt) => {
                  const isSel = selection.ripeness === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => onSelect({ ripeness: opt })}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-xs font-bold transition-all",
                        isSel
                          ? "border-primary bg-primary text-white shadow-xs"
                          : "border-line bg-bg text-ink hover:border-primary hover:bg-primary-tint"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity / Weight Stepper Chips */}
          {a.soldByWeight && (
            <div className="space-y-2">
              <span className="block text-xs font-extrabold uppercase tracking-wider text-ink">
                Pack Weight
              </span>
              <div className="flex flex-wrap gap-2">
                {[0.5, 1, 2, 5].map((w) => {
                  const isSel = (selection.kg ?? 1) === w;
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => onSelect({ kg: w })}
                      className={cn(
                        "rounded-xl border px-4 py-2 text-xs font-bold tabular transition-all",
                        isSel
                          ? "border-primary bg-primary-tint text-primary ring-2 ring-primary/30"
                          : "border-line bg-bg text-ink hover:border-muted hover:bg-white"
                      )}
                    >
                      {w < 1 ? `${w * 1000} g` : `${w} kg`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Substitution Preference */}
          {a.substitutable && (
            <div className="space-y-2 rounded-2xl bg-primary-tint/50 p-3.5 border border-primary/20 text-xs">
              <span className="font-bold text-ink block">
                Out-of-stock substitution preference
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "similar", label: "Best Fresh Substitute" },
                  { id: "ask", label: "Call Me to Confirm" },
                  { id: "skip", label: "No Substitute (Refund)" },
                ].map((sub) => {
                  const isSel = (selection.substitution ?? "ask") === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onSelect({ substitution: sub.id as "similar" | "ask" | "skip" })}
                      className={cn(
                        "rounded-xl border p-2 text-center text-[11px] font-bold transition",
                        isSel
                          ? "border-primary bg-primary text-white"
                          : "border-line bg-white text-ink hover:border-primary"
                      )}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ──────────────── 2. PACKAGED FOOD & BEVERAGES ──────────────── */}
      {domain === "packaged_food" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-ink">
              Pack Size & Combo
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Standard Pack (Single)", value: "single", badge: "Standard" },
                { label: "Pantry Duo (Pack of 2)", value: "pack_2", badge: "Save 5%" },
                { label: "Family Value Box (Pack of 4)", value: "pack_4", badge: "Best Value" },
              ].map((pack) => {
                const isSel = (selection.packSize ?? "single") === pack.value;
                return (
                  <button
                    key={pack.value}
                    type="button"
                    onClick={() => onSelect({ packSize: pack.value })}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all",
                      isSel
                        ? "border-primary bg-primary-tint text-primary ring-2 ring-primary/30"
                        : "border-line bg-bg text-ink hover:border-muted hover:bg-white"
                    )}
                  >
                    <span>{pack.label}</span>
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-black text-primary">
                      {pack.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Authenticity & Shelf Life Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs text-muted pt-2 border-t border-line/60">
            <div>
              <span className="block font-bold text-ink">Best Before</span>
              <span>9 Months from manufacturing</span>
            </div>
            <div>
              <span className="block font-bold text-ink">Storage Guidance</span>
              <span>Store in a cool, dry place away from sunlight</span>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────── 3. FASHION & APPAREL ──────────────── */}
      {domain === "fashion" && a.department === "fashion" && (
        <div className="space-y-4">
          {/* Colour Swatches */}
          {a.colours && a.colours.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-ink">
                  Colour:{" "}
                  <strong className="text-primary font-black">{selection.colour ?? a.colours[0].name}</strong>
                </span>
                <span className="text-muted">{a.colours.length} shades available</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {a.colours.map((col) => {
                  const isSel = (selection.colour ?? a.colours[0].name) === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => onSelect({ colour: col.name })}
                      title={col.name}
                      aria-label={`Select colour ${col.name}`}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                        isSel
                          ? "border-primary bg-primary-tint text-primary ring-2 ring-primary/30"
                          : "border-line bg-white text-ink hover:border-muted"
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector with Stock Hints */}
          {a.sizes && a.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-ink">
                  Select Size
                </span>
                {onOpenFitModal && (
                  <button
                    type="button"
                    onClick={onOpenFitModal}
                    className="flex items-center gap-1 font-bold text-primary hover:underline"
                  >
                    <Ruler className="h-3.5 w-3.5" />
                    <span>Size Guide & Fit Meter</span>
                  </button>
                )}
              </div>

              {needSize && (
                <p className="flex items-center gap-1.5 text-xs font-bold text-danger animate-pulse">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  Please select a size before adding to cart
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {a.sizes.map((sz: string) => {
                  const isSel = selection.size === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => onSelect({ size: sz })}
                      className={cn(
                        "flex min-w-[52px] flex-col items-center justify-center rounded-2xl border py-2.5 px-3 text-xs font-black transition-all",
                        isSel
                          ? "border-primary bg-primary text-white shadow-xs"
                          : needSize
                          ? "border-red-400 bg-red-50/30 text-ink hover:border-primary"
                          : "border-line bg-bg text-ink hover:border-primary hover:bg-primary-tint"
                      )}
                    >
                      <span className="text-sm">{sz}</span>
                      <span className={cn("text-[9px] font-normal", isSel ? "text-white/80" : "text-muted")}>
                        Standard
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-muted pt-1">
                <span>Model is 6′1″ (185 cm) wearing size L</span>
                <span>•</span>
                <span>Regular comfortable fit</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ──────────────── 4. BEAUTY & PERSONAL CARE ──────────────── */}
      {domain === "beauty" && a.department === "beauty" && (
        <div className="space-y-4">
          {/* Shades Selector */}
          {a.shades && a.shades.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-ink">
                  Shade:{" "}
                  <strong className="text-primary font-black">
                    {a.shades?.find((s) => s.code === (selection.shade ?? a.shades?.[0]?.code))?.name ?? "Standard"}
                  </strong>
                </span>
                {onOpenBeautyModal && (
                  <button
                    type="button"
                    onClick={onOpenBeautyModal}
                    className="flex items-center gap-1 font-bold text-primary hover:underline"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Authenticity & Batch Guide</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {a.shades?.map((shade) => {
                  const isSel = (selection.shade ?? a.shades?.[0]?.code) === shade.code;
                  return (
                    <button
                      key={shade.code}
                      type="button"
                      onClick={() => onSelect({ shade: shade.code })}
                      title={`${shade.name} (${shade.code})`}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all",
                        isSel
                          ? "border-primary bg-primary-tint text-primary ring-2 ring-primary/30"
                          : "border-line bg-white text-ink hover:border-muted"
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-black/20 shadow-xs"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span>{shade.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skin Type & Routine Step Highlights */}
          <div className="rounded-2xl bg-primary-tint/50 p-3.5 border border-primary/20 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-ink">
              <span>Routine Step: Finish & Glamour</span>
              <span className="text-[11px] font-normal text-muted">All Skin Types</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Formulated with nourishing Vitamin E and ultra-fine pigments for 14-hour crease-free matte wear.
            </p>
          </div>
        </div>
      )}

      {/* ──────────────── 5. ELECTRONICS & APPLIANCES ──────────────── */}
      {domain === "electronics" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold uppercase tracking-wider text-ink">
                Hardware Configuration
              </span>
              {onOpenSuitabilityModal && (
                <button
                  type="button"
                  onClick={onOpenSuitabilityModal}
                  className="flex items-center gap-1 font-bold text-primary hover:underline"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Suitability Advisor</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: "16GB RAM + 512GB SSD", note: "Recommended for Office, Multi-tasking & Study", id: "512" },
                { label: "16GB RAM + 1TB NVMe SSD", note: "Ideal for Creative Work & Heavy Files (+₹4,990)", id: "1024" },
              ].map((cfg) => {
                const isSel = (selection.configuration ?? "512") === cfg.id;
                return (
                  <button
                    key={cfg.id}
                    type="button"
                    onClick={() => onSelect({ configuration: cfg.id })}
                    className={cn(
                      "rounded-2xl border p-3 text-left transition-all",
                      isSel
                        ? "border-primary bg-primary-tint/70 ring-2 ring-primary/30"
                        : "border-line bg-bg hover:border-muted hover:bg-white"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-ink">{cfg.label}</span>
                      {isSel && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="mt-1 text-[11px] text-muted">{cfg.note}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Compatibility Link */}
          {onOpenCompatibilityModal && (
            <div className="flex items-center justify-between rounded-xl bg-primary-tint/60 border border-primary/20 p-3 text-xs">
              <span className="font-semibold text-ink">
                Checking compatibility with your monitor, mouse or dock?
              </span>
              <button
                type="button"
                onClick={onOpenCompatibilityModal}
                className="shrink-0 rounded-lg bg-primary px-3 py-1 font-bold text-white hover:bg-primary-dark transition"
              >
                Check
              </button>
            </div>
          )}
        </div>
      )}

      {/* ──────────────── 6. HOME, LIFESTYLE & HEAVY PRODUCTS ──────────────── */}
      {domain === "home_heavy" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-ink">
              Dimensions & Space Requirements
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-line bg-bg p-2.5">
                <span className="text-muted block text-[10px]">Width</span>
                <strong className="text-ink text-sm">585 mm</strong>
              </div>
              <div className="rounded-xl border border-line bg-bg p-2.5">
                <span className="text-muted block text-[10px]">Height</span>
                <strong className="text-ink text-sm">1,475 mm</strong>
              </div>
              <div className="rounded-xl border border-line bg-bg p-2.5">
                <span className="text-muted block text-[10px]">Depth</span>
                <strong className="text-ink text-sm">669 mm</strong>
              </div>
            </div>
          </div>

          {/* Room & Doorway Fit Trigger */}
          {onOpenHomeFitModal && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-3.5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-amber-800" />
                  Heavy Delivery Access Check
                </span>
                <button
                  type="button"
                  onClick={onOpenHomeFitModal}
                  className="rounded-lg bg-amber-800 px-3 py-1 text-white font-extrabold hover:bg-amber-900 transition"
                >
                  Verify Access →
                </button>
              </div>
              <p className="text-[11px] text-amber-900/80">
                Will this fit through your main door, staircase and elevator? Check real-time clearance.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
