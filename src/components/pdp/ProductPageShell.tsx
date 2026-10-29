"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ShoppingCart,
  Zap,
  MapPin,
  Check,
  Star,
  Ruler,
  AlertCircle,
  Truck,
  ShieldCheck,
  AlertTriangle,
  Snowflake,
  Sparkles,
  Cpu,
  ExternalLink,
  Info,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import type { Product, CartItem } from "@/types";
import { useNow, useShopper } from "@/lib/hooks";
import { useCart } from "@/store";
import { getProductDomain, DOMAIN_THEMES, type PdpSelection } from "./types";
import { ProductMediaGallery } from "./ProductMediaGallery";
import { DomainPanel } from "./DomainPanel";
import { MobilePurchaseBar } from "./MobilePurchaseBar";
import { StickyBuyBar } from "./StickyBuyBar";
import { SpecificationAccordion } from "./SpecificationAccordion";
import { ReviewsPanel } from "./ReviewsPanel";
import { LocationPanel } from "@/components/layout/LocationPanel";
import { ProductCard } from "@/components/product/ProductCard";
import { CardRow } from "@/components/product/CardRow";

// Modals / Drawers
import { FreshnessModal } from "./modals/FreshnessModal";
import { QuantityAndWeighingModal } from "./modals/QuantityAndWeighingModal";
import { ShelfLifeAndDeliveryModal } from "./modals/ShelfLifeAndDeliveryModal";
import { SubstitutionPreferenceModal } from "./modals/SubstitutionPreferenceModal";
import { SubscribeAndRepeatModal } from "./modals/SubscribeAndRepeatModal";
import { FitAndFabricModal } from "./modals/FitAndFabricModal";
import { AvailabilityMatrixModal } from "./modals/AvailabilityMatrixModal";
import { RentalEnquiryModal } from "./modals/RentalEnquiryModal";
import { BeautyTrustModal } from "./modals/BeautyTrustModal";
import { IngredientsAndSafetyModal } from "./modals/IngredientsAndSafetyModal";
import { ShadeAndSuitabilityModal } from "./modals/ShadeAndSuitabilityModal";
import { SampleOrFullSizeModal } from "./modals/SampleOrFullSizeModal";
import { BeautyRoutineModal } from "./modals/BeautyRoutineModal";
import { BatchAndExpiryModal } from "./modals/BatchAndExpiryModal";
import { BeautyDeliveryModal } from "./modals/BeautyDeliveryModal";
import { SuitabilityModal } from "./modals/SuitabilityModal";
import { CompatibilityModal } from "./modals/CompatibilityModal";
import { HomeFitModal } from "./modals/HomeFitModal";
import { WarrantyModal } from "./modals/WarrantyModal";
import { RepairAndExchangeModal } from "./modals/RepairAndExchangeModal";
import { DeviceExchangePrepModal } from "./modals/DeviceExchangePrepModal";

import {
  getCategory,
  topCategoryOf,
  getDepartment,
  getStock,
  getReturnPolicy,
  productsInCity,
  brandName,
  reviewsFor,
} from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface ProductPageShellProps {
  product: Product;
}

export function ProductPageShell({ product }: ProductPageShellProps) {
  const router = useRouter();
  const { cityId, warehouseId, city, area, isMember } = useShopper();
  const now = useNow();
  const addToCartAction = useCart((s) => s.add);

  // Domain determination for data-domain="food|fashion|electronics|beauty"
  const domainKey =
    product.department === "food"
      ? "food"
      : product.department === "fashion"
      ? "fashion"
      : product.department === "electronics"
      ? "electronics"
      : "beauty";

  const domain = getProductDomain(product);
  const theme = DOMAIN_THEMES[domain];
  const a = product.attrs;

  // Domain selection state
  const [selection, setSelection] = useState<PdpSelection>(() => ({
    grade: a.department === "food" && a.grades ? "A" : undefined,
    ripeness:
      a.department === "food"
        ? a.ripenessOptions?.[1] ?? a.ripenessOptions?.[0]
        : undefined,
    kg: a.department === "food" && a.soldByWeight ? 1 : undefined,
    substitution: a.department === "food" && a.substitutable ? "ask" : undefined,
    colour:
      a.department === "fashion" && a.colours
        ? a.colours.find((c) => c.name === "Blue")?.name ?? a.colours[0]?.name
        : undefined,
    size:
      a.department === "fashion" && a.sizes
        ? a.sizes.includes("L")
          ? "L"
          : a.sizes[0]
        : undefined,
    shade: a.department === "beauty" && a.shades ? a.shades[0]?.code : undefined,
    configuration:
      domainKey === "electronics" ? "16 GB / 512 GB" : undefined,
    packSize: domain === "packaged_food" ? "single" : undefined,
  }));

  const [qty, setQty] = useState(1);
  const [needSize, setNeedSize] = useState(false);

  // Modals state
  const [locationOpen, setLocationOpen] = useState(false);
  const [freshnessOpen, setFreshnessOpen] = useState(false);
  const [weighingOpen, setWeighingOpen] = useState(false);
  const [shelfLifeOpen, setShelfLifeOpen] = useState(false);
  const [substitutionOpen, setSubstitutionOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [fitOpen, setFitOpen] = useState(false);
  const [matrixOpen, setMatrixOpen] = useState(false);
  const [rentalOpen, setRentalOpen] = useState(false);
  const [beautyTrustOpen, setBeautyTrustOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [shadeModalOpen, setShadeModalOpen] = useState(false);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [routineModalOpen, setRoutineModalOpen] = useState(false);
  const [batchExpiryOpen, setBatchExpiryOpen] = useState(false);
  const [beautyDeliveryOpen, setBeautyDeliveryOpen] = useState(false);
  const [suitabilityOpen, setSuitabilityOpen] = useState(false);
  const [compatibilityOpen, setCompatibilityOpen] = useState(false);
  const [homeFitOpen, setHomeFitOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [exchangePrepOpen, setExchangePrepOpen] = useState(false);

  // Price & Stock Calculation
  const priceInfo = getPrice(product, cityId, isMember, now, selection.grade);
  const activeColour = selection.colour ?? (a.department === "fashion" ? a.colours?.[0]?.name : undefined);
  const variantKey =
    domainKey === "fashion"
      ? selection.size
        ? `${selection.size}|${activeColour}`
        : undefined
      : domainKey === "beauty" && selection.shade
      ? `shade:${selection.shade}`
      : undefined;

  const stock = getStock(product.id, warehouseId, variantKey);
  const anyStock = getStock(product.id, warehouseId);
  const isOutOfStock = anyStock.status === "not_stocked" || stock.status === "out" || (stock.available !== undefined && stock.available <= 0);
  const availableQty = stock.available ?? 10;
  const maxQty = Math.min(product.maxQtyPerOrder, Math.max(1, availableQty));

  const policy = getReturnPolicy(product);
  const dept = getDepartment(product.department)!;
  const topCat = topCategoryOf(product);
  const currentCat = getCategory(product.categoryId);

  const units = a.department === "food" && a.soldByWeight ? selection.kg ?? 1 : qty;
  const cartItem: CartItem = {
    productId: product.id,
    variantKey: variantKey ?? "default",
    qty: units,
    ...(selection.grade ? { grade: selection.grade } : {}),
    ...(selection.ripeness ? { ripeness: selection.ripeness } : {}),
    ...(selection.substitution ? { substitution: selection.substitution } : {}),
    ...(selection.subscription ? { subscription: selection.subscription } : {}),
  };

  const colourHex =
    a.department === "fashion"
      ? a.colours?.find((c) => c.name === selection.colour)?.hex
      : a.department === "beauty"
      ? a.shades?.find((s) => s.code === selection.shade)?.hex
      : undefined;

  const handleSelect = (patch: Partial<PdpSelection>) => {
    setSelection((prev) => ({ ...prev, ...patch }));
    if (patch.size) setNeedSize(false);
  };

  const handleAddToCart = (buyNow?: boolean) => {
    if (domainKey === "fashion" && !selection.size) {
      setNeedSize(true);
      return;
    }

    addToCartAction(cartItem);
    toast("Added to cart", "/cart", "View cart");
    if (buyNow) {
      router.push("/cart");
    }
  };

  // Similar products in same category
  const similarProducts = productsInCity(warehouseId)
    .filter((x) => x.id !== product.id && x.department === product.department)
    .slice(0, 4);

  // Real sales rank check for honest "Bestseller" badge
  const hasRealSalesRank = Boolean((product as any).salesRank && (product as any).salesRank <= 10);

  return (
    <div data-domain={domainKey} className="min-h-screen bg-bg text-ink pb-24">
      {/* ──────────────── BREADCRUMB NAVIGATION ──────────────── */}
      <nav aria-label="Breadcrumb" className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-[1280px] items-center gap-1.5 overflow-x-auto no-scrollbar px-4 sm:px-6 py-2.5 sm:py-3 text-xs text-muted whitespace-nowrap">
          <Link href="/" className="hover:text-brand-700 transition">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.75} />
          <Link
            href={`/category/${dept.id}`}
            className="hover:text-brand-700 whitespace-nowrap transition"
          >
            {dept.name}
          </Link>
          {topCat && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.75} />
              <Link
                href={`/category/${dept.id}?c=${topCat.id}`}
                className="hover:text-brand-700 whitespace-nowrap transition"
              >
                {topCat.name}
              </Link>
            </>
          )}
          {currentCat && currentCat.id !== topCat?.id && (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.75} />
              <span className="whitespace-nowrap">{currentCat.name}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3 shrink-0" strokeWidth={1.75} />
          <span className="font-bold text-ink truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </nav>

      {/* ──────────────── MAIN 4-COLUMN PRODUCT SHOWCASE ──────────────── */}
      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 py-6 pb-28 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 pdp-grid gap-6 items-start">
          {/* Columns 1 & 2: Gallery (76px Rail + Main Image) — STICKY ON DESKTOP */}
          <div className="pdp-gallery-col">
            <ProductMediaGallery
              product={product}
              colourHex={colourHex}
              isNew={product.isNew}
            />
          </div>

          {/* Column 3: Buy Box (Scrolls normally, strict hierarchy, NO duplicates) */}
          <section
            aria-label="Product options and purchase"
            className="min-w-0 space-y-4 rounded-2xl bg-white p-6 border border-neutral-200/80 shadow-xs"
          >
            {/* 1. Brand Row with conditional Bestseller badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">
                {brandName(product)}
              </span>
              {hasRealSalesRank && (
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                  Bestseller
                </span>
              )}
            </div>

            {/* 2. Title (H1, rendered ONCE) */}
            <h1 className="text-2xl font-black text-ink sm:text-3xl tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* 3. Rating row (rendered ONCE, honest data, linking to reviews) */}
            <div>
              {product.ratingCount > 0 ? (
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="inline-flex items-center gap-1 rounded bg-brand-50 px-1.5 py-0.5 font-bold text-brand-700">
                    <Star className="h-3 w-3 fill-brand-700 text-brand-700" strokeWidth={1.75} />
                    {product.rating}
                  </span>
                  <span>·</span>
                  <a
                    href="#reviews"
                    className="font-medium text-brand-700 hover:underline"
                  >
                    {product.ratingCount.toLocaleString("en-IN")} ratings
                  </a>
                </div>
              ) : (
                <p className="text-xs text-muted">No reviews yet</p>
              )}
            </div>

            {/* 4. Price block (rendered ONCE, with single discount chip in brand-50/brand-900) */}
            <div className="space-y-2 pt-1 border-t border-neutral-100">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-3xl font-black text-ink tabular sm:text-4xl">
                  ₹ {priceInfo.finalPrice.toLocaleString("en-IN")}
                </span>
                {product.mrp > priceInfo.finalPrice && (
                  <span className="text-sm font-semibold text-muted line-through">
                    ₹ {product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
                {priceInfo.discountPct > 0 && (
                  <span className="rounded bg-brand-50 border border-brand-100 px-2 py-0.5 text-xs font-black text-brand-900">
                    {priceInfo.discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Weight-based grocery pricing & estimated total */}
              {a.department === "food" && a.soldByWeight && (
                <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>
                      Unit Price: ₹ {priceInfo.finalPrice}/kg
                    </span>
                    <span className="text-muted font-medium">
                      (₹ {(priceInfo.finalPrice / 2).toFixed(2)} per 500 g)
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-emerald-200/60 font-black text-emerald-900">
                    <span>
                      Estimated Total: ₹ {Math.round(priceInfo.finalPrice * (selection.kg ?? 1) * qty).toLocaleString("en-IN")}
                    </span>
                    <span className="font-semibold text-emerald-800 text-[11px]">
                      for {(selection.kg ?? 1) * qty < 1 ? `${(selection.kg ?? 1) * qty * 1000} g` : `${(selection.kg ?? 1) * qty} kg`}
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-700 leading-tight">
                    Weight-based produce: Billed on actual scale weight packed at fulfilment center.
                  </p>
                </div>
              )}
              <p className="text-xs text-muted">Inclusive of all taxes</p>
            </div>

            {/* 5. Domain Selectors (Section D) */}
            <div className="space-y-4 pt-2 border-t border-neutral-100">
              {/* ── 1. FOOD & GROCERIES SELECTORS ── */}
              {domainKey === "food" && a.department === "food" && (
                <div className="space-y-3.5">
                  {/* Quality Grade */}
                  {a.grades && a.grades.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">Quality Grade</span>
                        <span className="text-muted">Graded at harvest depot</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {a.grades.map((g) => {
                          const active = (selection.grade ?? "A") === g.grade;
                          return (
                            <button
                              key={g.grade}
                              type="button"
                              onClick={() => handleSelect({ grade: g.grade })}
                              className={cn(
                                "rounded-xl border p-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "border-brand-700 bg-brand-50 ring-2 ring-brand-700"
                                  : "border-neutral-200 bg-white hover:border-neutral-400"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-ink">Grade {g.grade}</span>
                                {active && <Check className="h-3.5 w-3.5 text-brand-700" />}
                              </div>
                              <span className="block text-xs font-bold text-brand-900 mt-0.5">
                                ₹ {g.pricePerKg}/kg
                              </span>
                              <span className="block text-[10px] text-muted line-clamp-1 mt-0.5">
                                {g.note}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Ripeness */}
                  {a.ripenessOptions && a.ripenessOptions.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">Ripeness Stage</span>
                        <span className="text-muted">Choose based on cooking schedule</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {a.ripenessOptions.map((r) => {
                          const active = (selection.ripeness ?? a.ripenessOptions![0]) === r;
                          const label =
                            r === "raw"
                              ? "Raw (Ripens in 2–3 days)"
                              : r === "ready_to_eat"
                              ? "Ready to eat (Peak ripeness)"
                              : "Very ripe (Sweet / Cooking)";
                          return (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleSelect({ ripeness: r })}
                              className={cn(
                                "rounded-xl px-3 py-1.5 text-xs font-bold transition border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "border-brand-700 bg-brand-50 text-brand-900 ring-2 ring-brand-700"
                                  : "border-neutral-200 bg-white text-ink hover:border-neutral-400"
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Weight Pack Options */}
                  {a.soldByWeight && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">Select Pack Weight</span>
                        <span className="text-muted font-medium">
                          Total weight: ~{" "}
                          <strong className="text-ink">
                            {(selection.kg ?? 1) * 1000 * qty} g
                          </strong>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(a.weightOptionsKg ?? [0.25, 0.5, 1, 2]).map((w) => {
                          const active = (selection.kg ?? 1) === w;
                          const label = w < 1 ? `${w * 1000} g` : `${w} kg`;
                          return (
                            <button
                              key={w}
                              type="button"
                              onClick={() => handleSelect({ kg: w })}
                              className={cn(
                                "rounded-xl px-3.5 py-1.5 text-xs font-bold transition border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "bg-brand-700 text-white border-brand-700 shadow-xs"
                                  : "bg-white text-ink border-neutral-200 hover:border-neutral-400"
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Out of stock substitution preference */}
                  {a.substitutable && (
                    <div className="space-y-1.5 rounded-xl bg-neutral-50 p-3 border border-neutral-200/80 text-xs">
                      <span className="font-bold text-ink block">
                        Substitution Preference (if item unavailable)
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {[
                          { id: "similar", label: "Best Match" },
                          { id: "ask", label: "Call to Confirm" },
                          { id: "skip", label: "No Substitute" },
                        ].map((sub) => {
                          const active = (selection.substitution ?? "ask") === sub.id;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleSelect({ substitution: sub.id as "similar" | "ask" | "skip" })}
                              className={cn(
                                "rounded-lg border py-1.5 px-2 text-center text-[11px] font-bold transition",
                                active
                                  ? "border-brand-700 bg-brand-700 text-white"
                                  : "border-neutral-200 bg-white text-ink hover:border-neutral-400"
                              )}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Freshness, Cold-Chain & Guarantee Notice */}
                  <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-200 space-y-1 text-xs">
                    {a.storage === "chilled" && (
                      <p className="flex items-center gap-1.5 text-blue-900 font-semibold text-[11px]">
                        <Snowflake className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                        Chilled Cold-Chain (0°C–4°C) · Temperature-monitored refrigerated van
                      </p>
                    )}
                    {a.minRemainingShelfLifeDays && (
                      <p className="flex items-center gap-1.5 text-emerald-900 font-semibold text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                        Freshness Guarantee: At least {a.minRemainingShelfLifeDays} days shelf life guaranteed on arrival
                      </p>
                    )}
                    <p className="text-[10px] text-muted">
                      6-Hour Perishable Guarantee: Photo quality complaints refunded or replaced instantly.
                    </p>
                  </div>
                </div>
              )}

              {/* ── 2. FASHION & APPAREL SELECTORS ── */}
              {domainKey === "fashion" && a.department === "fashion" && (
                <div className="space-y-3.5">
                  {/* Colours with Names and Hex Swatches */}
                  {a.colours && a.colours.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">
                          Colour:{" "}
                          <span className="font-extrabold text-brand-700">
                            {selection.colour ?? a.colours[0]?.name}
                          </span>
                        </span>
                        <span className="text-muted">{a.colours.length} shades available</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {a.colours.map((c) => {
                          const active = (selection.colour ?? a.colours[0]?.name) === c.name;
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => handleSelect({ colour: c.name })}
                              title={c.name}
                              className={cn(
                                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "border-brand-700 bg-brand-50 text-brand-900 ring-2 ring-brand-700"
                                  : "border-neutral-200 bg-white text-ink hover:border-neutral-400"
                              )}
                            >
                              <span
                                className="h-3.5 w-3.5 rounded-full shadow-inner border border-black/10 shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span>{c.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size chips with per-variant stock feedback */}
                  {a.sizes && a.sizes.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">
                          Size:{" "}
                          <span className="font-extrabold text-brand-700">
                            {selection.size ?? "Select size"}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setFitOpen(true)}
                          className="inline-flex items-center gap-1 font-bold text-brand-700 hover:underline"
                        >
                          <Ruler className="h-3.5 w-3.5" strokeWidth={1.75} />
                          <span>Size guide & chart</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {a.sizes.map((s) => {
                          const active = selection.size === s;
                          const currentCol = selection.colour ?? a.colours?.[0]?.name ?? "";
                          const szStock = getStock(product.id, warehouseId, `${s}|${currentCol}`);
                          const isSizeOut = szStock.status === "out" || (szStock.available !== undefined && szStock.available <= 0);
                          const isSizeLow = szStock.status === "low";

                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => handleSelect({ size: s })}
                              className={cn(
                                "min-w-12 h-11 rounded-xl px-2.5 text-xs font-extrabold transition border flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "bg-brand-700 text-white border-brand-700 shadow-xs"
                                  : isSizeOut
                                  ? "bg-neutral-100 text-neutral-400 border-dashed border-neutral-300"
                                  : "bg-white text-ink border-neutral-200 hover:border-neutral-400"
                              )}
                            >
                              <span className={cn(isSizeOut && "line-through")}>{s}</span>
                              <span className={cn("text-[8px] font-normal", active ? "text-white/80" : isSizeOut ? "text-rose-600 font-bold" : isSizeLow ? "text-amber-700 font-bold" : "text-muted")}>
                                {isSizeOut ? "Out" : isSizeLow ? `Left: ${szStock.available}` : "In Stock"}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {needSize && !selection.size && (
                        <p className="text-xs font-bold text-danger flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Please select a size to continue
                        </p>
                      )}

                      {/* Selected Size measurement preview & SKU */}
                      {selection.size && (
                        <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-200 text-xs space-y-1">
                          <div className="flex items-center justify-between text-muted text-[11px]">
                            <span>
                              SKU: <strong className="font-mono text-ink">{product.id.toUpperCase()}-{(selection.colour ?? a.colours[0]?.name).slice(0, 3).toUpperCase()}-{selection.size}</strong>
                            </span>
                            <span className="font-semibold text-brand-700">{a.fit} fit</span>
                          </div>
                          {(() => {
                            const chartRow = a.sizeChart?.find((r) => r.size === selection.size);
                            if (!chartRow) return null;
                            const measurements = [];
                            if (chartRow.chest) measurements.push(`Chest: ${chartRow.chest} cm`);
                            if (chartRow.bust) measurements.push(`Bust: ${chartRow.bust} cm`);
                            if (chartRow.waist) measurements.push(`Waist: ${chartRow.waist} cm`);
                            if (chartRow.length) measurements.push(`Length: ${chartRow.length} cm`);
                            if (chartRow.shoulder) measurements.push(`Shoulder: ${chartRow.shoulder} cm`);
                            if (chartRow.footLengthCm) measurements.push(`Foot length: ${chartRow.footLengthCm} cm`);
                            return measurements.length > 0 ? (
                              <p className="text-[11px] text-ink font-medium">
                                Measurements for size {selection.size}: {measurements.join(" · ")}
                              </p>
                            ) : null;
                          })()}
                          {a.modelInfo && (
                            <p className="text-[10px] text-muted">
                              Model is {Math.floor(a.modelInfo.heightCm / 30.48)}′{Math.round((a.modelInfo.heightCm % 30.48) / 2.54)}″ ({a.modelInfo.heightCm} cm) wearing size {a.modelInfo.sizeWorn}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Fabric composition & Care summary */}
                      <div className="text-[11px] text-muted space-y-0.5 pt-1">
                        <p><strong className="text-ink">Fabric:</strong> {a.fabric} ({a.feel?.softness} feel, {a.feel?.stretch} stretch)</p>
                        {a.care && a.care.length > 0 && (
                          <p><strong className="text-ink">Care:</strong> {a.care.slice(0, 2).join(" · ")}</p>
                        )}
                      </div>

                      {/* Clearance Alert if applicable */}
                      {a.clearance && (
                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                          <span>Clearance Item: Exchange within 48h only. Item is non-refundable.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ── 3. BEAUTY & PERSONAL CARE SELECTORS ── */}
              {domainKey === "beauty" && a.department === "beauty" && (
                <div className="space-y-3.5">
                  {/* Shade Swatches with Names & Stock Status */}
                  {a.shades && a.shades.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink">
                          Shade:{" "}
                          <span className="font-extrabold text-brand-700">
                            {a.shades.find((s) => s.code === (selection.shade ?? a.shades![0]?.code))?.name ?? a.shades[0]?.name}
                          </span>
                        </span>
                        <span className="text-muted">{a.shades.length} shades available</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {a.shades.map((s) => {
                          const active = (selection.shade ?? a.shades![0]?.code) === s.code;
                          const shStock = getStock(product.id, warehouseId, `shade:${s.code}`);
                          const isShadeOut = shStock.status === "out" || (shStock.available !== undefined && shStock.available <= 0);

                          return (
                            <button
                              key={s.code}
                              type="button"
                              onClick={() => handleSelect({ shade: s.code })}
                              title={`${s.name} (${s.code})${isShadeOut ? " - Out of stock" : ""}`}
                              className={cn(
                                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "border-brand-700 bg-brand-50 text-brand-900 ring-2 ring-brand-700"
                                  : isShadeOut
                                  ? "border-neutral-200 bg-neutral-100 text-neutral-400 opacity-60"
                                  : "border-neutral-200 bg-white text-ink hover:border-neutral-400"
                              )}
                            >
                              <span
                                className="h-3.5 w-3.5 rounded-full shadow-inner border border-black/10 shrink-0"
                                style={{ backgroundColor: s.hex }}
                              />
                              <span className={cn(isShadeOut && "line-through")}>{s.name}</span>
                              {isShadeOut && <span className="text-[9px] text-rose-600 font-bold">(Out)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Size / Volume Variants Link (Trial mini or Full size) */}
                  {(a.sampleProductId || a.fullSizeProductId) && (
                    <div className="rounded-xl bg-purple-50/70 border border-purple-200/80 p-2.5 text-xs text-purple-950 flex items-center justify-between">
                      <span>
                        Net Quantity: <strong className="font-bold text-ink">{product.unit}</strong>
                      </span>
                      {a.sampleProductId && (
                        <Link
                          href={`/product/${a.sampleProductId === "p-beau-009" ? "minimalist-niacinamide-serum-10ml-mini" : a.sampleProductId}`}
                          className="font-bold text-brand-700 hover:underline flex items-center gap-1"
                        >
                          <span>Try 10 ml Mini (₹229)</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      )}
                      {a.fullSizeProductId && (
                        <Link
                          href="/product/minimalist-niacinamide-serum-30ml"
                          className="font-bold text-brand-700 hover:underline flex items-center gap-1"
                        >
                          <span>Full 30 ml Bottle (₹569)</span>
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Key Ingredients & Declared Allergens Callout */}
                  <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-200 text-xs space-y-1">
                    {a.keyIngredients && a.keyIngredients.length > 0 && (
                      <p><strong className="text-ink">Key Actives:</strong> {a.keyIngredients.join(", ")}</p>
                    )}
                    <p className="text-[11px] text-muted">
                      <strong className="text-ink font-semibold">Allergens:</strong>{" "}
                      {a.allergens && a.allergens.length > 0 && !a.allergens.includes("Not provided")
                        ? a.allergens.join(", ")
                        : "Formulated without declared fragrance allergens"}
                    </p>
                    {a.patchTest && (
                      <p className="text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded-lg border border-amber-200 leading-tight">
                        <strong>Patch-Test Guidance:</strong> Apply 1–2 drops behind ear 24h prior to use. Discontinue if redness occurs.
                      </p>
                    )}
                    {a.usage && (
                      <p className="text-[11px] text-muted">
                        <strong className="text-ink font-semibold">Usage:</strong> {a.usage.frequency} {a.usage.order ? `· Step: ${a.usage.order}` : ""}
                      </p>
                    )}
                  </div>

                  {/* Sealed Product Hygiene Return Notice */}
                  <div className="rounded-xl bg-neutral-50 p-2 border border-neutral-200 text-[10px] text-muted flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-700 shrink-0" />
                    <span>Sealed Product Hygiene Policy: Non-returnable once tamper-evident safety seal is broken.</span>
                  </div>
                </div>
              )}

              {/* ── 4. ELECTRONICS & APPLIANCES SELECTORS ── */}
              {domainKey === "electronics" && a.department === "electronics" && (
                <div className="space-y-3.5">
                  {/* Model Number */}
                  {a.model && (
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>Model: <strong className="font-mono text-ink">{a.model}</strong></span>
                      <span className="font-semibold text-brand-700">{brandName(product)}</span>
                    </div>
                  )}

                  {/* Hardware Configuration (ONLY rendered for laptops or configurable products) */}
                  {(product.categoryId === "elec-laptops" || product.id.includes("laptop")) && (
                    <div className="space-y-1.5">
                      <span className="block text-xs font-bold text-ink">Hardware Configuration</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "16 GB / 512 GB",
                          "8 GB / 256 GB",
                          "32 GB / 1 TB",
                        ].map((cfg) => {
                          const active = (selection.configuration ?? "16 GB / 512 GB") === cfg;
                          return (
                            <button
                              key={cfg}
                              type="button"
                              onClick={() => handleSelect({ configuration: cfg })}
                              className={cn(
                                "rounded-xl px-3.5 py-2 text-xs font-bold transition border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                                active
                                  ? "bg-brand-700 text-white border-brand-700 shadow-xs"
                                  : "bg-white text-ink border-neutral-200 hover:border-neutral-400"
                              )}
                            >
                              {cfg}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Refurbished Condition & Battery Health (ONLY for refurbished devices) */}
                  {a.refurbished && (
                    <div className="rounded-xl bg-blue-50/80 border border-blue-200 p-3 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-blue-950 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-blue-700" />
                          Certified Refurbished — Grade {a.refurbished.grade}
                        </span>
                        {a.refurbished.batteryHealthPct && (
                          <span className="rounded-full bg-blue-700 px-2.5 py-0.5 text-[11px] font-black text-white">
                            {a.refurbished.batteryHealthPct}% Battery Health
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-blue-900 leading-tight">
                        Passed 40-Point Diagnostic Inspection · Includes {a.refurbished.refurbWarrantyMonths}-Month HyperMart Renewed Warranty.
                      </p>
                    </div>
                  )}

                  {/* Large Appliance Home Fit & Dimensions */}
                  {a.productDimensionsCm && (
                    <div className="rounded-xl bg-neutral-50 p-3 border border-neutral-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">Product Dimensions</span>
                        <button
                          type="button"
                          onClick={() => setHomeFitOpen(true)}
                          className="font-bold text-brand-700 hover:underline"
                        >
                          Verify Home Fit →
                        </button>
                      </div>
                      <p className="font-semibold text-ink">
                        {a.productDimensionsCm.w} cm (W) × {a.productDimensionsCm.h} cm (H) × {a.productDimensionsCm.d} cm (D)
                      </p>
                      <p className="text-[11px] text-muted">
                        Passage check: Requires at least {a.clearanceCm ? a.productDimensionsCm.w + a.clearanceCm.sides : 70} cm clear doorway & stairway width for delivery.
                      </p>
                    </div>
                  )}

                  {/* Installation & Warranty badge */}
                  <div className="rounded-xl bg-neutral-50 p-2.5 border border-neutral-200 space-y-1 text-xs">
                    {a.installation && (
                      <p className="font-bold text-ink flex items-center gap-1.5">
                        <Truck className="h-3.5 w-3.5 text-brand-700" />
                        {a.installation.fee === 0 ? "Free Installation & Demo by Certified Technician" : `Installation Available for ₹${a.installation.fee}`}
                      </p>
                    )}
                    {a.warranty && (
                      <p className="text-[11px] text-muted flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-700" />
                        {a.warranty.months} Months {a.warranty.provider} Warranty ({a.warranty.coverage})
                      </p>
                    )}
                    {a.compatibleModels && a.compatibleModels.length > 0 && (
                      <div className="pt-1 flex items-center justify-between text-[11px]">
                        <span className="text-muted">
                          {a.compatibleModels.filter((m) => m.status === "compatible").length} verified compatible models
                        </span>
                        <button
                          type="button"
                          onClick={() => setCompatibilityOpen(true)}
                          className="font-bold text-brand-700 hover:underline"
                        >
                          Check compatibility
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 6. Quantity Stepper */}
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-xs font-bold text-ink block mb-1.5">Quantity</span>
              <div className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-black tabular text-ink">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(maxQty, qty + 1))}
                  disabled={qty >= maxQty}
                  className="h-7 w-7 text-sm font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* 7. Stock Line (DIRECTLY under quantity control, left-aligned) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span
                className={cn(
                  "h-2 w-2 rounded-full inline-block shrink-0",
                  isOutOfStock ? "bg-danger" : "bg-emerald-600"
                )}
              />
              <span>
                {anyStock.status === "not_stocked"
                  ? `Not stocked in ${city.name} fulfilment centre`
                  : isOutOfStock
                  ? stock.restockDate
                    ? `Out of Stock · Restock expected ${stock.restockDate}`
                    : "Out of Stock in this warehouse"
                  : stock.status === "low"
                  ? `Only ${availableQty} left in stock · Order soon`
                  : "In Stock in " + city.name}
              </span>
              <span className="text-muted">·</span>
              <span className="text-muted">{isOutOfStock ? "Check back soon" : "Ships within 24 hours"}</span>
            </div>

            {/* 8. Deliver to Pincode (on EVERY domain) */}
            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50/50 p-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-700 shrink-0" strokeWidth={1.75} />
                <span className="text-muted">
                  Deliver to:{" "}
                  <strong className="text-ink font-bold">
                    {area.pincode} ({city.name})
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLocationOpen(true)}
                className="font-bold text-brand-700 hover:underline"
              >
                Check
              </button>
            </div>

            {/* 9. Delivery Result */}
            <div className="flex items-center gap-2 text-xs text-muted">
              <Truck className="h-4 w-4 text-brand-700 shrink-0" strokeWidth={1.75} />
              <span>
                Delivery by tomorrow · Free on orders over ₹499
              </span>
            </div>

            {/* 10. Add to Cart (Brand-700 fill) & 11. Buy now (Brand-700 outline) */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                disabled={isOutOfStock}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3.5 px-6 text-sm font-bold text-white shadow-xs transition hover:opacity-95 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
                <span>
                  {anyStock.status === "not_stocked"
                    ? `Unavailable in ${city.name}`
                    : isOutOfStock
                    ? "Out of Stock"
                    : domainKey === "fashion" && !selection.size
                    ? "Select a Size"
                    : "Add to Cart"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                disabled={isOutOfStock}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-700 bg-white py-3.5 px-6 text-sm font-bold text-brand-700 transition hover:bg-brand-50 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="h-4 w-4" strokeWidth={1.75} />
                <span>{isOutOfStock ? "Out of Stock" : "Buy Now"}</span>
              </button>
            </div>

            {/* 12. Short Policy Line */}
            <p className="text-[11px] text-muted text-center leading-relaxed">
              {policy.label} · {policy.conditions?.[0] ?? "Original condition required"}
            </p>

            {/* BELOW 1180px: The Domain Panel moves UNDER the buy box as an accordion */}
            <div className="pdp-accordion-col pt-4 border-t border-neutral-100">
              <DomainPanel
                product={product}
                domain={domainKey}
                selection={selection}
                qty={qty}
                stock={stock}
                availableQty={availableQty}
                policy={policy}
                isAccordion={true}
                onOpenFreshness={() => setFreshnessOpen(true)}
                onOpenWeighing={() => setWeighingOpen(true)}
                onOpenShelfLife={() => setShelfLifeOpen(true)}
                onOpenSubstitution={() => setSubstitutionOpen(true)}
                onOpenSubscribe={() => setSubscribeOpen(true)}
                onOpenFit={() => setFitOpen(true)}
                onOpenMatrix={() => setMatrixOpen(true)}
                onOpenRental={() => setRentalOpen(true)}
                onOpenSuitability={() => setSuitabilityOpen(true)}
                onOpenCompatibility={() => setCompatibilityOpen(true)}
                onOpenHomeFit={() => setHomeFitOpen(true)}
                onOpenWarranty={() => setWarrantyOpen(true)}
                onOpenRepair={() => setRepairOpen(true)}
                onOpenOwnership={() => setExchangePrepOpen(true)}
                onOpenBeautyTrust={() => setBeautyTrustOpen(true)}
                onOpenIngredients={() => setIngredientsOpen(true)}
                onOpenShade={() => setShadeModalOpen(true)}
                onOpenSample={() => setSampleModalOpen(true)}
                onOpenRoutine={() => setRoutineModalOpen(true)}
                onOpenBatchExpiry={() => setBatchExpiryOpen(true)}
                onOpenBeautyDelivery={() => setBeautyDeliveryOpen(true)}
              />
            </div>
          </section>

          {/* Column 4: Domain Panel (Sticky on >= 1180px, Title never sits under header) */}
          <div className="pdp-panel-col">
            <DomainPanel
              product={product}
              domain={domainKey}
              selection={selection}
              qty={qty}
              stock={stock}
              availableQty={availableQty}
              policy={policy}
              isAccordion={false}
              onOpenFreshness={() => setFreshnessOpen(true)}
              onOpenWeighing={() => setWeighingOpen(true)}
              onOpenShelfLife={() => setShelfLifeOpen(true)}
              onOpenSubstitution={() => setSubstitutionOpen(true)}
              onOpenSubscribe={() => setSubscribeOpen(true)}
              onOpenFit={() => setFitOpen(true)}
              onOpenMatrix={() => setMatrixOpen(true)}
              onOpenRental={() => setRentalOpen(true)}
              onOpenSuitability={() => setSuitabilityOpen(true)}
              onOpenCompatibility={() => setCompatibilityOpen(true)}
              onOpenHomeFit={() => setHomeFitOpen(true)}
              onOpenWarranty={() => setWarrantyOpen(true)}
              onOpenRepair={() => setRepairOpen(true)}
              onOpenOwnership={() => setExchangePrepOpen(true)}
              onOpenBeautyTrust={() => setBeautyTrustOpen(true)}
              onOpenIngredients={() => setIngredientsOpen(true)}
              onOpenShade={() => setShadeModalOpen(true)}
              onOpenSample={() => setSampleModalOpen(true)}
              onOpenRoutine={() => setRoutineModalOpen(true)}
              onOpenBatchExpiry={() => setBatchExpiryOpen(true)}
              onOpenBeautyDelivery={() => setBeautyDeliveryOpen(true)}
            />
          </div>
        </div>

        {/* ──────────────── BOTTOM SECTIONS: SPECS & REVIEWS ──────────────── */}
        <div className="mt-12 space-y-10">
          {/* Specifications */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-black text-ink mb-4">Specifications & Details</h2>
            <SpecificationAccordion product={product} domain={domain} theme={theme} />
          </div>

          {/* Reviews */}
          <div id="reviews" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs">
            <h2 className="text-xl font-black text-ink mb-4">Customer Ratings & Reviews</h2>
            <ReviewsPanel
              rating={product.rating}
              ratingCount={product.ratingCount}
              reviews={reviewsFor(product.id)}
              theme={theme}
            />
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-ink">Similar in {dept.name}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar (< 1024px) */}
      <StickyBuyBar
        price={priceInfo.finalPrice}
        mrp={product.mrp}
        domainColor={
          domainKey === "food"
            ? "#0E5E3A"
            : domainKey === "fashion"
            ? "#6B2E5F"
            : domainKey === "electronics"
            ? "#1D4E89"
            : "#9C2F55"
        }
        selection={selection}
        isOutOfStock={isOutOfStock}
        onAddToCart={handleAddToCart}
      />

      {/* ──────────────── MODAL DRAWERS ──────────────── */}
      <LocationPanel open={locationOpen} onClose={() => setLocationOpen(false)} />
      <FreshnessModal
        open={freshnessOpen}
        onClose={() => setFreshnessOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
        unitPrice={priceInfo.finalPrice}
      />
      <QuantityAndWeighingModal
        open={weighingOpen}
        onClose={() => setWeighingOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
        unitPrice={priceInfo.finalPrice}
      />
      <ShelfLifeAndDeliveryModal
        open={shelfLifeOpen}
        onClose={() => setShelfLifeOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <SubstitutionPreferenceModal
        open={substitutionOpen}
        onClose={() => setSubstitutionOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <SubscribeAndRepeatModal
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
        unitPrice={priceInfo.finalPrice}
      />
      <FitAndFabricModal
        open={fitOpen}
        onClose={() => setFitOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <AvailabilityMatrixModal
        open={matrixOpen}
        onClose={() => setMatrixOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <RentalEnquiryModal
        open={rentalOpen}
        onClose={() => setRentalOpen(false)}
        product={product}
        size={selection.size}
        colour={selection.colour}
      />
      <BeautyTrustModal
        open={beautyTrustOpen}
        onClose={() => setBeautyTrustOpen(false)}
        product={product}
        selection={selection}
      />
      <IngredientsAndSafetyModal
        open={ingredientsOpen}
        onClose={() => setIngredientsOpen(false)}
        product={product}
        selection={selection}
      />
      <ShadeAndSuitabilityModal
        open={shadeModalOpen}
        onClose={() => setShadeModalOpen(false)}
        product={product}
        selection={selection}
        onSelectShade={(shadeCode) => handleSelect({ shade: shadeCode })}
      />
      <SampleOrFullSizeModal
        open={sampleModalOpen}
        onClose={() => setSampleModalOpen(false)}
        product={product}
        selection={selection}
        onSelectFormat={(_format, _qty) => {
          handleAddToCart();
        }}
      />
      <BeautyRoutineModal
        open={routineModalOpen}
        onClose={() => setRoutineModalOpen(false)}
        product={product}
        selection={selection}
      />
      <BatchAndExpiryModal
        open={batchExpiryOpen}
        onClose={() => setBatchExpiryOpen(false)}
        product={product}
        selection={selection}
      />
      <BeautyDeliveryModal
        open={beautyDeliveryOpen}
        onClose={() => setBeautyDeliveryOpen(false)}
        product={product}
        selection={selection}
        cityName={city.name}
        pincode={area.pincode}
      />
      <SuitabilityModal
        open={suitabilityOpen}
        onClose={() => setSuitabilityOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <CompatibilityModal
        open={compatibilityOpen}
        onClose={() => setCompatibilityOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <HomeFitModal
        open={homeFitOpen}
        onClose={() => setHomeFitOpen(false)}
        product={product}
        selection={selection}
        onSave={handleSelect}
      />
      <WarrantyModal
        open={warrantyOpen}
        onClose={() => setWarrantyOpen(false)}
        product={product}
      />
      <RepairAndExchangeModal
        open={repairOpen}
        onClose={() => setRepairOpen(false)}
        product={product}
        selection={selection}
        cityName={city.name}
        pincode={area.pincode}
        onOpenExchangePrep={() => {
          setRepairOpen(false);
          setExchangePrepOpen(true);
        }}
      />
      <DeviceExchangePrepModal
        open={exchangePrepOpen}
        onClose={() => setExchangePrepOpen(false)}
        onBackToExchange={() => {
          setExchangePrepOpen(false);
          setRepairOpen(true);
        }}
      />
    </div>
  );
}
