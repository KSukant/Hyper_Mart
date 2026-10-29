"use client";
import { useState } from "react";
import { ChevronDown, ShieldCheck, Check, Info, FileText, Factory, RotateCcw } from "lucide-react";
import type { Product } from "@/types";
import type { ProductDomain, DomainTheme } from "./types";
import { getBrand } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface SpecificationAccordionProps {
  product: Product;
  domain: ProductDomain;
  theme: DomainTheme;
  fssaiNumber?: string;
}

export function SpecificationAccordion({
  product,
  domain,
  theme,
  fssaiNumber,
}: SpecificationAccordionProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    highlights: true,
    specs: true,
    compliance: false,
  });

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const a = product.attrs;
  const brand = getBrand(product.brandId);

  return (
    <div className="space-y-4">
      {/* 1. Highlights & Description */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-3">
        <button
          type="button"
          onClick={() => toggle("highlights")}
          className="flex w-full items-center justify-between text-left text-sm font-extrabold text-ink"
        >
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" style={{ color: theme.primary }} />
            <span>Product Highlights & Key Benefits</span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", openSections.highlights && "rotate-180")}
          />
        </button>

        {openSections.highlights && (
          <div className="space-y-3 pt-2 text-xs">
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="grid h-4 w-4 place-items-center rounded-full shrink-0 mt-0.5"
                    style={{ backgroundColor: theme.tint, color: theme.primary }}
                  >
                    <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                  </span>
                  <span className="text-ink/90 font-medium">{h}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted leading-relaxed pt-2 border-t border-line/60">
              {product.description}
            </p>
          </div>
        )}
      </div>

      {/* 2. Domain-Specific Specifications Table */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-3">
        <button
          type="button"
          onClick={() => toggle("specs")}
          className="flex w-full items-center justify-between text-left text-sm font-extrabold text-ink"
        >
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4" style={{ color: theme.primary }} />
            <span>Technical Specifications & Attributes</span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", openSections.specs && "rotate-180")}
          />
        </button>

        {openSections.specs && (
          <div className="pt-2">
            <dl className="divide-y divide-line/60 text-xs">
              {/* Common specs */}
              <div className="grid grid-cols-3 py-2">
                <dt className="text-muted font-medium">Brand</dt>
                <dd className="col-span-2 font-bold text-ink">{brand?.name ?? product.brandId}</dd>
              </div>

              <div className="grid grid-cols-3 py-2">
                <dt className="text-muted font-medium">Unit / Net Quantity</dt>
                <dd className="col-span-2 font-semibold text-ink">{product.unit}</dd>
              </div>

              {/* ── 1. FOOD & GROCERIES SPECIFICATIONS ── */}
              {a.department === "food" && (
                <>
                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Dietary Preference</dt>
                    <dd className="col-span-2 font-semibold text-emerald-800 capitalize flex items-center gap-1.5">
                      <span className={cn(
                        "inline-block h-2.5 w-2.5 rounded-full",
                        a.vegMark === "veg" ? "bg-emerald-600" : a.vegMark === "egg" ? "bg-amber-600" : "bg-rose-600"
                      )} />
                      {a.vegMark === "veg" ? "100% Vegetarian (Green Dot)" : a.vegMark === "egg" ? "Contains Egg" : "Non-Vegetarian"}
                    </dd>
                  </div>

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Storage & Transit</dt>
                    <dd className="col-span-2 font-semibold text-ink">
                      {a.storage === "chilled"
                        ? "Chilled storage (0°C to 4°C) · Temperature-monitored cold chain"
                        : a.storage === "frozen"
                        ? "Deep freeze (-18°C) · Insulated cold-chain transit"
                        : "Ambient room temperature · Cool & dry warehouse"}
                    </dd>
                  </div>

                  {a.soldByWeight && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Pricing Basis</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        Sold by weight (₹{a.pricePerKg ?? product.price}/kg) · Calibrated electronic scale at fulfilment centre
                      </dd>
                    </div>
                  )}

                  {a.grades && a.grades.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Quality Grades</dt>
                      <dd className="col-span-2 text-ink">
                        <ul className="space-y-1">
                          {a.grades.map((g) => (
                            <li key={g.grade} className="text-[11px]">
                              <strong className="font-bold text-ink">Grade {g.grade} (₹{g.pricePerKg}/kg):</strong>{" "}
                              <span className="text-muted">{g.note}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}

                  {a.ripenessOptions && a.ripenessOptions.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Ripeness Stages</dt>
                      <dd className="col-span-2 font-semibold text-ink capitalize">
                        {a.ripenessOptions.map((r) => r.replace("_", " ")).join(", ")}
                      </dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Freshness Guarantee</dt>
                    <dd className="col-span-2 font-semibold text-ink">
                      Guaranteed minimum {a.minRemainingShelfLifeDays} days shelf life on delivery (total shelf life: {a.shelfLifeDays} days)
                    </dd>
                  </div>

                  {a.ingredients && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Ingredients</dt>
                      <dd className="col-span-2 text-ink">{a.ingredients}</dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Declared Allergens</dt>
                    <dd className="col-span-2 text-ink">
                      {a.allergens && a.allergens.length > 0 && !a.allergens.includes("Not provided") ? (
                        <span className="font-bold text-amber-800">Contains {a.allergens.join(", ")}</span>
                      ) : (
                        <span className="text-muted">No declared allergens</span>
                      )}
                    </dd>
                  </div>

                  {a.nutritionPer100g && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Nutrition per 100 g</dt>
                      <dd className="col-span-2">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {Object.entries(a.nutritionPer100g).map(([k, v]) => (
                            <div key={k} className="rounded-lg bg-neutral-50 p-2 border border-neutral-100">
                              <span className="block text-[10px] text-muted">{k}</span>
                              <strong className="text-xs font-bold text-ink">{v}</strong>
                            </div>
                          ))}
                        </div>
                      </dd>
                    </div>
                  )}

                  {a.regional && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Regional Speciality</dt>
                      <dd className="col-span-2 font-semibold text-brand-700">{a.regional}</dd>
                    </div>
                  )}

                  {a.fssaiOnPack && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">FSSAI Licence (Brand)</dt>
                      <dd className="col-span-2 font-mono text-ink font-semibold">{a.fssaiOnPack}</dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Quality Returns</dt>
                    <dd className="col-span-2 text-ink">
                      Perishable Quality Complaint Window: Report within 6 hours of delivery with photo for instant replacement or refund.
                    </dd>
                  </div>
                </>
              )}

              {/* ── 2. FASHION & APPAREL SPECIFICATIONS ── */}
              {a.department === "fashion" && (
                <>
                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Gender & Category</dt>
                    <dd className="col-span-2 font-semibold text-ink capitalize">{a.gender} Apparel</dd>
                  </div>

                  {a.fabric && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Fabric Composition</dt>
                      <dd className="col-span-2 font-semibold text-ink">{a.fabric}</dd>
                    </div>
                  )}

                  {a.feel && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Fabric Hand-Feel</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        {a.feel.softness} softness · {a.feel.stretch} stretch · {a.feel.thickness} thickness · {a.feel.drape} drape
                      </dd>
                    </div>
                  )}

                  {a.fit && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Fit Silhouette</dt>
                      <dd className="col-span-2 font-semibold text-ink">{a.fit} Fit</dd>
                    </div>
                  )}

                  {a.colours && a.colours.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Available Colours</dt>
                      <dd className="col-span-2 text-ink flex flex-wrap gap-2">
                        {a.colours.map((c) => (
                          <span key={c.name} className="inline-flex items-center gap-1 text-xs">
                            <span className="h-3 w-3 rounded-full border border-black/15" style={{ backgroundColor: c.hex }} />
                            {c.name}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {a.sizes && a.sizes.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Available Sizes</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        {a.sizes.join(", ")} ({a.sizeSystem === "waist" ? "Waist in inches" : a.sizeSystem === "uk_shoe" ? "UK Shoe Sizes" : a.sizeSystem === "age" ? "Child Age in Years" : "Standard Alpha"})
                      </dd>
                    </div>
                  )}

                  {a.modelInfo && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Model Sizing Reference</dt>
                      <dd className="col-span-2 text-ink">
                        Model is {Math.floor(a.modelInfo.heightCm / 30.48)}′{Math.round((a.modelInfo.heightCm % 30.48) / 2.54)}″ ({a.modelInfo.heightCm} cm) wearing size {a.modelInfo.sizeWorn}
                      </dd>
                    </div>
                  )}

                  {a.care && a.care.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Garment Care</dt>
                      <dd className="col-span-2 font-semibold text-ink">{a.care.join(" · ")}</dd>
                    </div>
                  )}

                  {a.clearance && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Clearance Restriction</dt>
                      <dd className="col-span-2 font-bold text-amber-800">
                        Clearance Item: Exchange within 48 hours only. Item is non-refundable.
                      </dd>
                    </div>
                  )}

                  {a.rentable && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Rental Programme</dt>
                      <dd className="col-span-2 text-ink">
                        Available to rent at ₹{a.rentable.perDay}/day (deposit ₹{a.rentable.deposit}, min {a.rentable.minDays} days)
                      </dd>
                    </div>
                  )}
                </>
              )}

              {/* ── 3. BEAUTY & PERSONAL CARE SPECIFICATIONS ── */}
              {a.department === "beauty" && (
                <>
                  {a.skinTypes && a.skinTypes.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Skin Type Suitability</dt>
                      <dd className="col-span-2 font-semibold text-ink capitalize">
                        {a.skinTypes.join(", ")}
                      </dd>
                    </div>
                  )}

                  {a.hairTypes && a.hairTypes.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Hair Type Suitability</dt>
                      <dd className="col-span-2 font-semibold text-ink capitalize">
                        {a.hairTypes.join(", ")}
                      </dd>
                    </div>
                  )}

                  {a.keyIngredients && a.keyIngredients.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Active & Key Ingredients</dt>
                      <dd className="col-span-2 font-semibold text-ink">{a.keyIngredients.join(", ")}</dd>
                    </div>
                  )}

                  {a.ingredients && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Full INCI Ingredients</dt>
                      <dd className="col-span-2 text-muted leading-relaxed font-mono text-[11px]">
                        {a.ingredients}
                      </dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Allergen Information</dt>
                    <dd className="col-span-2 text-ink">
                      {a.allergens && a.allergens.length > 0 ? (
                        <span className="font-semibold text-amber-800">{a.allergens.join(", ")}</span>
                      ) : (
                        <span className="text-muted">Formulated without declared fragrance allergens</span>
                      )}
                    </dd>
                  </div>

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Patch-Test Guidance</dt>
                    <dd className="col-span-2 text-ink">
                      {a.patchTest ? (
                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2 text-[11px] text-amber-900">
                          <strong>Recommended:</strong> Apply 1–2 drops to inner forearm or behind ear 24 hours prior to full application. Discontinue if redness, itching or irritation occurs.
                        </div>
                      ) : (
                        <span>Standard topical application. Follow on-pack instructions.</span>
                      )}
                    </dd>
                  </div>

                  {a.usage && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Usage & Routine</dt>
                      <dd className="col-span-2 space-y-1 text-ink">
                        <p><strong className="font-bold">Quantity:</strong> {a.usage.quantity} · <strong className="font-bold">Frequency:</strong> {a.usage.frequency}</p>
                        {a.usage.order && <p><strong className="font-bold">Routine step:</strong> {a.usage.order}</p>}
                        <p className="text-muted">{a.usage.method}</p>
                      </dd>
                    </div>
                  )}

                  {a.precautions && a.precautions.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Precautions</dt>
                      <dd className="col-span-2 text-ink">{a.precautions.join(" · ")}</dd>
                    </div>
                  )}

                  {a.documentedConflicts && a.documentedConflicts.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Documented Conflicts</dt>
                      <dd className="col-span-2 text-amber-900 font-medium">{a.documentedConflicts.join(" · ")}</dd>
                    </div>
                  )}

                  {a.periodAfterOpeningMonths && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Period After Opening (PAO)</dt>
                      <dd className="col-span-2 font-semibold text-ink">{a.periodAfterOpeningMonths} Months</dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Transit & Temperature</dt>
                    <dd className="col-span-2 text-ink">
                      {a.heatSensitive
                        ? "Heat-sensitive formulation: Handled with temperature-controlled transit packaging. Store below 25°C."
                        : "Ambient retail packaging. Store in a cool, dry place away from direct sunlight."}
                    </dd>
                  </div>

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Hygiene Return Rule</dt>
                    <dd className="col-span-2 text-ink">
                      Non-returnable once outer hygiene/tamper-evident seal is broken. Returns accepted only for transit damage reported within 24 hours.
                    </dd>
                  </div>
                </>
              )}

              {/* ── 4. ELECTRONICS & APPLIANCES SPECIFICATIONS ── */}
              {a.department === "electronics" && (
                <>
                  {a.model && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Model Number</dt>
                      <dd className="col-span-2 font-mono font-bold text-ink">{a.model}</dd>
                    </div>
                  )}

                  {/* Render all technical specifications */}
                  {a.specs && a.specs.length > 0 && (
                    <>
                      {a.specs.map((spec) => (
                        <div key={spec.label} className="grid grid-cols-3 py-2">
                          <dt className="text-muted font-medium">{spec.label}</dt>
                          <dd className="col-span-2 font-semibold text-ink">{spec.value}</dd>
                        </div>
                      ))}
                    </>
                  )}

                  {a.productDimensionsCm && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Product Dimensions</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        {a.productDimensionsCm.w} cm (W) × {a.productDimensionsCm.h} cm (H) × {a.productDimensionsCm.d} cm (D)
                      </dd>
                    </div>
                  )}

                  {a.clearanceCm && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Ventilation Clearance</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        Sides: {a.clearanceCm.sides} cm · Back: {a.clearanceCm.back} cm · Top: {a.clearanceCm.top} cm
                      </dd>
                    </div>
                  )}

                  {a.siteRequirements && a.siteRequirements.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Installation & Site Needs</dt>
                      <dd className="col-span-2 text-ink">
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                          {a.siteRequirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}

                  {a.installation && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Installation & Demo</dt>
                      <dd className="col-span-2 font-semibold text-ink">
                        {a.installation.fee === 0
                          ? "Free Installation by Certified Technician"
                          : `Installation available for ₹${a.installation.fee}`}
                        {" — "}
                        <span className="font-normal text-muted">{a.installation.note}</span>
                      </dd>
                    </div>
                  )}

                  {a.warranty && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Warranty Terms</dt>
                      <dd className="col-span-2 space-y-1 text-ink">
                        <p className="font-bold">
                          {a.warranty.months} Months {a.warranty.provider} Warranty
                        </p>
                        <p className="text-[11px] text-muted">Coverage: {a.warranty.coverage}</p>
                        {a.warranty.exclusions && a.warranty.exclusions.length > 0 && (
                          <p className="text-[10px] text-muted">Excludes: {a.warranty.exclusions.join(", ")}</p>
                        )}
                      </dd>
                    </div>
                  )}

                  {a.compatibleModels && a.compatibleModels.length > 0 && (
                    <div className="grid grid-cols-3 py-2">
                      <dt className="text-muted font-medium">Verified Compatibility</dt>
                      <dd className="col-span-2 text-ink flex flex-wrap gap-1.5">
                        {a.compatibleModels.map((cm) => (
                          <span
                            key={cm.model}
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium border",
                              cm.status === "compatible"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : cm.status === "not_compatible"
                                ? "bg-rose-50 border-rose-200 text-rose-800"
                                : "bg-neutral-50 border-neutral-200 text-neutral-700"
                            )}
                          >
                            {cm.model}: {cm.status === "compatible" ? "✓ Compatible" : cm.status === "not_compatible" ? "✕ Not Compatible" : "? Untested"}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  {a.refurbished && (
                    <div className="grid grid-cols-3 py-2 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                      <dt className="text-blue-950 font-bold">Refurbished Certification</dt>
                      <dd className="col-span-2 space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-blue-700 text-white font-bold px-2 py-0.5 text-[11px]">
                            Grade {a.refurbished.grade}
                          </span>
                          {a.refurbished.batteryHealthPct && (
                            <span className="font-bold text-blue-900">
                              {a.refurbished.batteryHealthPct}% Battery Health
                            </span>
                          )}
                          <span className="text-muted">
                            · {a.refurbished.refurbWarrantyMonths}-Month Renewed Warranty
                          </span>
                        </div>
                        <p className="text-[11px] text-muted">
                          Passed 40-Point Diagnostic Check: {a.refurbished.testedChecks.slice(0, 5).join(", ")}...
                        </p>
                      </dd>
                    </div>
                  )}

                  <div className="grid grid-cols-3 py-2">
                    <dt className="text-muted font-medium">Serial Tracking</dt>
                    <dd className="col-span-2 text-ink">
                      {a.serialTracked
                        ? "Serial-tracked unit — Unique IMEI / Serial recorded on GST tax invoice for seamless brand warranty claims"
                        : "Standard GST invoice provided for warranty validation"}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        )}
      </div>

      {/* 3. Manufacturer, Compliance & Legal */}
      <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-3">
        <button
          type="button"
          onClick={() => toggle("compliance")}
          className="flex w-full items-center justify-between text-left text-sm font-extrabold text-ink"
        >
          <span className="flex items-center gap-2">
            <Factory className="h-4 w-4" style={{ color: theme.primary }} />
            <span>Manufacturer, Packer & Customer Care</span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted transition-transform", openSections.compliance && "rotate-180")}
          />
        </button>

        {openSections.compliance && (
          <div className="pt-2 text-xs">
            <dl className="grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-muted">Manufacturer / Packer</dt>
                <dd className="font-bold text-ink">{product.manufacturer.name}</dd>
              </div>
              <div>
                <dt className="text-muted">Country of Origin</dt>
                <dd className="font-semibold text-ink">{product.manufacturer.countryOfOrigin}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted">Registered Address</dt>
                <dd className="text-ink/80">{product.manufacturer.address}</dd>
              </div>
              {brand?.customerCare && (
                <div>
                  <dt className="text-muted">Brand Customer Care</dt>
                  <dd className="font-semibold text-ink">{brand.customerCare}</dd>
                </div>
              )}
              {fssaiNumber && (
                <div>
                  <dt className="text-muted">HyperMart Regional Fulfilment FSSAI</dt>
                  <dd className="font-mono text-ink font-semibold">{fssaiNumber}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
