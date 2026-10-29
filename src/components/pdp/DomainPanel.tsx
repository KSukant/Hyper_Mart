"use client";
import { ChevronRight, ExternalLink } from "lucide-react";
import type { Product } from "@/types";
import type { StockInfo } from "@/lib/catalog";
import type { PdpSelection } from "./types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

interface DomainPanelProps {
  product: Product;
  domain: "food" | "fashion" | "electronics" | "beauty";
  selection: PdpSelection;
  qty: number;
  stock: StockInfo;
  availableQty: number;
  policy: { label: string; conditions: string[] };
  // Modal openers
  onOpenFreshness?: () => void;
  onOpenWeighing?: () => void;
  onOpenShelfLife?: () => void;
  onOpenSubstitution?: () => void;
  onOpenSubscribe?: () => void;
  onOpenFit?: () => void;
  onOpenMatrix?: () => void;
  onOpenRental?: () => void;
  onOpenSuitability?: () => void;
  onOpenCompatibility?: () => void;
  onOpenHomeFit?: () => void;
  onOpenWarranty?: () => void;
  onOpenRepair?: () => void;
  onOpenOwnership?: () => void;
  onOpenBeautyTrust?: () => void;
  onOpenIngredients?: () => void;
  onOpenShade?: () => void;
  onOpenSample?: () => void;
  onOpenRoutine?: () => void;
  onOpenBatchExpiry?: () => void;
  onOpenBeautyDelivery?: () => void;
  isAccordion?: boolean;
}

export function DomainPanel({
  product,
  domain,
  selection,
  qty,
  stock,
  availableQty,
  policy,
  onOpenFreshness,
  onOpenWeighing,
  onOpenShelfLife,
  onOpenSubstitution,
  onOpenSubscribe,
  onOpenFit,
  onOpenMatrix,
  onOpenRental,
  onOpenSuitability,
  onOpenCompatibility,
  onOpenHomeFit,
  onOpenWarranty,
  onOpenRepair,
  onOpenOwnership,
  onOpenBeautyTrust,
  onOpenIngredients,
  onOpenShade,
  onOpenSample,
  onOpenRoutine,
  onOpenBatchExpiry,
  onOpenBeautyDelivery,
  isAccordion = false,
}: DomainPanelProps) {
  const a = product.attrs;

  // Domain Panel Title
  const panelTitles: Record<typeof domain, string> = {
    food: "Freshness & Delivery",
    fashion: "Fit & Fabric",
    electronics: "Fit, Compatibility & Support",
    beauty: "Trust & Suitability",
  };

  // Build rows per domain
  interface RowDef {
    label: string;
    value: string;
    onClick?: () => void;
    isLink?: boolean;
  }

  const rows: RowDef[] = [];

  if (domain === "food" && a.department === "food") {
    // 1. Grade
    rows.push({
      label: "Grade",
      value: selection.grade
        ? `Grade ${selection.grade} · ${selection.grade === "A" ? "Export table quality" : selection.grade === "B" ? "Daily table quality" : "Cooking stew quality"}`
        : a.grades
        ? `Grade ${a.grades[0]?.grade ?? "A"}`
        : "Not provided",
      onClick: onOpenFreshness,
    });

    // 2. Ripeness
    rows.push({
      label: "Ripeness",
      value: selection.ripeness
        ? selection.ripeness === "ready_to_eat"
          ? "Ready to eat (Peak sweetness)"
          : selection.ripeness === "very_ripe"
          ? "Very ripe (Best for immediate use)"
          : "Raw (Ripens in 2–3 days)"
        : a.ripenessOptions?.[0]
        ? a.ripenessOptions[0].replace("_", " ")
        : "Not provided",
      onClick: onOpenFreshness,
    });

    // 3. Estimated total
    const estimatedGrams = a.soldByWeight
      ? (selection.kg ?? 1) * 1000 * qty
      : qty * 500;
    rows.push({
      label: "Estimated total",
      value: `~ ${estimatedGrams} g (${qty} item${qty > 1 ? "s" : ""})`,
      onClick: onOpenWeighing,
    });

    // 4. Remaining shelf life
    rows.push({
      label: "Remaining shelf life",
      value: a.minRemainingShelfLifeDays
        ? `At least ${a.minRemainingShelfLifeDays} days guaranteed`
        : a.shelfLifeDays
        ? `${a.shelfLifeDays} days total shelf life`
        : "Not provided",
      onClick: onOpenShelfLife,
    });

    // 5. Cold-chain delivery
    rows.push({
      label: "Cold-chain delivery",
      value:
        a.storage === "chilled"
          ? "0°C to 4°C active chilled transit"
          : a.storage === "frozen"
          ? "-18°C frozen insulated transit"
          : "Ambient temperature monitored",
      onClick: onOpenShelfLife,
    });

    // 6. Substitution preference
    rows.push({
      label: "Substitution preference",
      value:
        selection.substitution === "ask"
          ? "Call before substituting"
          : selection.substitution === "similar"
          ? "Auto-substitute best grade match"
          : "Refund item if unavailable",
      onClick: onOpenSubstitution,
    });

    // 7. Subscribe and repeat (Link)
    rows.push({
      label: "Subscribe & save",
      value: "Subscribe and repeat — save 5% on scheduled deliveries",
      onClick: onOpenSubscribe,
      isLink: true,
    });
  } else if (domain === "fashion" && a.department === "fashion") {
    // 1. Fabric and feel
    rows.push({
      label: "Fabric and feel",
      value: a.fabric
        ? `${a.fabric} · ${a.feel?.softness ?? "Soft"}, ${a.feel?.stretch ?? "Low"} stretch`
        : "Not provided",
      onClick: onOpenFit,
    });

    // 2. Size and fit (shows measurements of selected size, NO Colour row)
    const currentSize = selection.size ?? a.sizes[0] ?? "L";
    const chartRow = a.sizeChart?.find((r) => r.size === currentSize);
    let sizeMeasurementStr = `Size ${currentSize}`;
    if (chartRow) {
      if (chartRow.chest && chartRow.length) {
        sizeMeasurementStr = `Size ${currentSize}: Chest ${chartRow.chest} cm · Length ${chartRow.length} cm`;
      } else if (chartRow.waist && chartRow.hip) {
        sizeMeasurementStr = `Size ${currentSize}: Waist ${chartRow.waist} cm · Hip ${chartRow.hip} cm`;
      } else if (chartRow.sareeLengthM) {
        sizeMeasurementStr = `Saree ${chartRow.sareeLengthM} m · Blouse ${chartRow.blousePieceM} m`;
      }
    }
    rows.push({
      label: "Size and fit",
      value: sizeMeasurementStr,
      onClick: onOpenFit,
    });

    // 3. Fit
    rows.push({
      label: "Fit",
      value: a.fit ? `${a.fit} fit` : "Not provided",
      onClick: onOpenFit,
    });

    // 4. Availability
    rows.push({
      label: "Availability",
      value:
        stock.status === "in_stock"
          ? "In stock in Coimbatore fulfilment center"
          : stock.status === "low"
          ? `Only ${availableQty} units left in stock`
          : "Currently out of stock",
      onClick: onOpenMatrix,
    });

    // 5. Rent this item (show only if rentable or not provided)
    rows.push({
      label: "Rent this item",
      value: a.rentable
        ? `₹ ${a.rentable.perDay}/day · ₹ ${a.rentable.deposit} deposit (min ${a.rentable.minDays} days)`
        : "Not available for rental",
      onClick: a.rentable ? onOpenRental : undefined,
    });

    // 6. Returns and exchanges
    rows.push({
      label: "Returns and exchanges",
      value: policy.label
        ? `${policy.label} · ${policy.conditions?.[0] ?? "Original tags required"}`
        : "Not provided",
      onClick: onOpenFit,
    });
  } else if (domain === "electronics" && a.department === "electronics") {
    // 1. Best for
    rows.push({
      label: "Best for",
      value:
        a.bestFor?.map((b) => b.useCase[0].toUpperCase() + b.useCase.slice(1)).join(", ") ||
        "Productivity, office & study",
      onClick: onOpenSuitability,
    });

    // 2. Compatibility
    rows.push({
      label: "Compatibility",
      value: a.compatibleModels?.length
        ? `${a.compatibleModels.length} verified compatible systems`
        : "Standard universal compatibility",
      onClick: onOpenCompatibility,
    });

    // 3. Home fit
    rows.push({
      label: "Home fit",
      value: a.productDimensionsCm
        ? `${a.productDimensionsCm.w} × ${a.productDimensionsCm.h} × ${a.productDimensionsCm.d} cm`
        : "Standard footprint",
      onClick: onOpenHomeFit,
    });

    // 4. Delivery and installation
    rows.push({
      label: "Delivery and installation",
      value: a.installation?.required
        ? `Installation available (₹ ${a.installation.fee})`
        : "Standard plug-and-play delivery",
      onClick: onOpenRepair,
    });

    // 5. Warranty
    rows.push({
      label: "Warranty",
      value: a.warranty
        ? `${a.warranty.months} months ${a.warranty.provider} warranty`
        : "Not provided",
      onClick: onOpenWarranty,
    });

    // 6. Support
    rows.push({
      label: "Support",
      value: "HyperMart direct support & authorized brand service",
      onClick: onOpenRepair,
    });

    // 7. Ownership
    rows.push({
      label: "Ownership",
      value: a.serialTracked
        ? "Serial-tracked unit · GST invoice provided"
        : "Brand warranty & invoice provided",
      onClick: onOpenOwnership,
    });
  } else if (domain === "beauty" && a.department === "beauty") {
    // 1. Trust and authenticity
    rows.push({
      label: "Trust and authenticity",
      value: "100% genuine · Direct brand procurement with verified batch",
      onClick: onOpenBeautyTrust,
    });

    // 2. Ingredients and safety
    rows.push({
      label: "Ingredients and safety",
      value: a.keyIngredients?.length
        ? a.keyIngredients.slice(0, 3).join(", ")
        : a.ingredients
        ? a.ingredients.slice(0, 50) + "..."
        : "Not provided",
      onClick: onOpenIngredients,
    });

    // 3. Shade and preview
    rows.push({
      label: "Shade and preview",
      value: a.shades?.length
        ? `${a.shades.length} shades available · Undertone guide`
        : "Single universal shade",
      onClick: onOpenShade,
    });

    // 4. Sample or full size
    rows.push({
      label: "Sample or full size",
      value: a.sampleProductId
        ? "Mini trial size available"
        : a.fullSizeProductId
        ? "Full retail size bottle available"
        : "Full retail size pack",
      onClick: onOpenSample,
    });

    // 5. My Beauty Routine
    rows.push({
      label: "My Beauty Routine",
      value: a.usage
        ? `${a.usage.frequency} · Step: ${a.usage.order ?? "Daily skincare"}`
        : "Not provided",
      onClick: onOpenRoutine,
    });

    // 6. Batch and expiry
    rows.push({
      label: "Batch and expiry",
      value: stock.batch
        ? `Batch ${stock.batch.batchNo} · Exp ${formatDate(stock.batch.expiryDate)}`
        : a.periodAfterOpeningMonths
        ? `Use within ${a.periodAfterOpeningMonths} months of opening`
        : "Not provided",
      onClick: onOpenBatchExpiry,
    });

    // 7. Delivery conditions
    rows.push({
      label: "Delivery conditions",
      value: a.heatSensitive
        ? "Temperature-controlled cold-chain transit"
        : "Ambient sealed retail dispatch",
      onClick: onOpenBeautyDelivery,
    });
  }

  const content = (
    <div className="space-y-1">
      {rows.map((row, idx) => (
        <button
          key={idx}
          type="button"
          onClick={row.onClick}
          className="group w-full py-2.5 px-3 text-left transition hover:bg-neutral-50 rounded-xl flex items-start justify-between gap-3 border-b border-neutral-100 last:border-b-0"
        >
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted">
              {row.label}
            </span>
            <span className="block text-xs font-semibold text-ink truncate mt-0.5">
              {row.value}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 pt-0.5 text-brand-700 font-bold text-xs group-hover:underline">
            <span>View details</span>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </div>
        </button>
      ))}
    </div>
  );

  if (isAccordion) {
    return (
      <details className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
        <summary className="flex cursor-pointer items-center justify-between p-4 font-bold text-ink hover:bg-neutral-50 list-none">
          <div className="flex items-center gap-2">
            <div className="h-3 w-1 rounded-full bg-brand-700" />
            <span className="text-sm font-extrabold">{panelTitles[domain]}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted transition-transform duration-200 group-open:rotate-90" />
        </summary>
        <div className="p-4 pt-1 border-t border-neutral-100">{content}</div>
      </details>
    );
  }

  return (
    <aside
      aria-label={panelTitles[domain]}
      className="relative rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden flex flex-col"
    >
      {/* Domain Panel Top Accent Line */}
      <div className="h-1.5 w-full bg-brand-700 shrink-0" />

      {/* Header */}
      <div className="p-4 pb-2 border-b border-neutral-100 shrink-0">
        <h2 className="text-sm font-extrabold text-ink tracking-tight">
          {panelTitles[domain]}
        </h2>
      </div>

      {/* Scrollable list of rows */}
      <div className="p-2 overflow-y-auto">{content}</div>
    </aside>
  );
}
