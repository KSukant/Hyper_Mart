"use client";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { ChevronRight, Search, X, ArrowRight } from "lucide-react";
import type { Department, Product } from "@/types";
import { SnapPage, SnapSection, Reveal } from "@/components/sections/Snap";
import { CardRow } from "@/components/product/CardRow";
import { ProductCard, ProductCardCompact } from "@/components/product/ProductCard";
import { ProductArt } from "@/components/product/ProductArt";
import { InfoBar, EmptyState, LinkButton, btn } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments, departmentPages } from "@/mocks";
import { productsInCity, topCategoryOf, topCategories, brandName, brandsInDepartment, getStock } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { useNow, useShopper } from "@/lib/hooks";
import { cn } from "@/lib/cn";

import { FilterSheet, SortSheet } from "@/components/product/FilterSheet";
import { AddToCart } from "@/components/product/parts";
import { formatDay, formatINR } from "@/lib/format";
import { getDeliveryPromise } from "@/lib/delivery";
import { useWish } from "@/store";
import { FashionFeatureModal, type FashionFeatureType } from "@/components/fashion/FashionFeatureModal";
import { SuitabilityModal } from "@/components/pdp/modals/SuitabilityModal";
import { CompatibilityModal } from "@/components/pdp/modals/CompatibilityModal";
import { HomeFitModal } from "@/components/pdp/modals/HomeFitModal";
import { WarrantyModal } from "@/components/pdp/modals/WarrantyModal";
import { RepairAndExchangeModal } from "@/components/pdp/modals/RepairAndExchangeModal";
import { DeviceExchangePrepModal } from "@/components/pdp/modals/DeviceExchangePrepModal";
import { CompareDevicesModal } from "@/components/pdp/modals/CompareDevicesModal";
import { getProductById } from "@/lib/catalog";

type Opt = { value: string; label: string };
type FilterDef = { key: string; label: string; options: (ps: Product[]) => Opt[]; test: (p: Product, v: string, ctx: { warehouseId: string; price: number }) => boolean };
const uniq = (xs: string[]) => [...new Set(xs.filter(Boolean))].sort().map((v) => ({ value: v, label: v }));
const brandF: FilterDef = { key: "brand", label: "Brand", options: (ps) => uniq(ps.map(brandName)), test: (p, v) => brandName(p) === v };
const availF: FilterDef = { key: "stock", label: "Availability", options: () => [{ value: "in", label: "In stock only" }], test: (p, _v, c) => ["in_stock", "low"].includes(getStock(p.id, c.warehouseId).status) };

const FILTERS: Record<Department, FilterDef[]> = {
  food: [
    { key: "grade", label: "Grade", options: () => ["A", "B", "C"].map((g) => ({ value: g, label: `Grade ${g}` })), test: (p, v) => p.attrs.department === "food" && !!p.attrs.grades?.some((g) => g.grade === v) },
    { key: "ripe", label: "Ripeness", options: () => [{ value: "raw", label: "Raw" }, { value: "ready_to_eat", label: "Ready to eat" }, { value: "very_ripe", label: "Very ripe" }], test: (p, v) => p.attrs.department === "food" && !!p.attrs.ripenessOptions?.includes(v as "raw") },
    { key: "storage", label: "Storage", options: () => [{ value: "ambient", label: "Ambient" }, { value: "chilled", label: "Chilled" }, { value: "frozen", label: "Frozen" }], test: (p, v) => p.attrs.department === "food" && p.attrs.storage === v },
    { key: "diet", label: "Dietary", options: () => [{ value: "veg", label: "Vegetarian" }, { value: "non_veg", label: "Non-Vegetarian" }], test: (p, v) => p.attrs.department === "food" && (v === "veg" ? p.attrs.vegMark === "veg" : p.attrs.vegMark === "nonveg") },
    { key: "allergen", label: "Free from", options: () => [{ value: "Milk", label: "No milk" }, { value: "Gluten (wheat)", label: "No gluten" }, { value: "Egg", label: "No egg" }], test: (p, v) => p.attrs.department === "food" && !p.attrs.allergens.includes(v) && !p.attrs.allergens.includes("Not provided") },
    brandF, availF,
  ],
  fashion: [
    { key: "gender", label: "Gender", options: () => [{ value: "men", label: "Men" }, { value: "women", label: "Women" }, { value: "kids", label: "Kids" }], test: (p, v) => p.attrs.department === "fashion" && p.attrs.gender === v },
    { key: "rentable", label: "Occasion Rental", options: () => [{ value: "1", label: "Available to Rent" }], test: (p, v) => p.attrs.department === "fashion" && (v === "1" ? !!p.attrs.rentable : true) },
    {
      key: "size",
      label: "Size",
      options: (ps) => {
        const rawSizes = uniq(ps.flatMap((p) => (p.attrs.department === "fashion" ? p.attrs.sizes : [])));
        return rawSizes.map((s) => {
          const count = ps.filter((p) => p.attrs.department === "fashion" && p.attrs.sizes.includes(s.value)).length;
          return { value: s.value, label: count > 0 ? `${s.label} (${count})` : s.label };
        });
      },
      test: (p, v) => p.attrs.department === "fashion" && p.attrs.sizes.includes(v),
    },
    { key: "colour", label: "Colour", options: (ps) => uniq(ps.flatMap((p) => (p.attrs.department === "fashion" ? p.attrs.colours.map((c) => c.name) : []))), test: (p, v) => p.attrs.department === "fashion" && p.attrs.colours.some((c) => c.name === v) },
    { key: "fit", label: "Fit", options: (ps) => uniq(ps.map((p) => (p.attrs.department === "fashion" ? p.attrs.fit : ""))), test: (p, v) => p.attrs.department === "fashion" && p.attrs.fit === v },
    { key: "fabric", label: "Fabric", options: (ps) => uniq(ps.map((p) => (p.attrs.department === "fashion" ? p.attrs.fabric.split(",")[0] : ""))), test: (p, v) => p.attrs.department === "fashion" && p.attrs.fabric.toLowerCase().includes(v.toLowerCase()) },
    { key: "price", label: "Price", options: () => [{ value: "lt1000", label: "Under ₹1,000" }, { value: "1000to3000", label: "₹1,000–₹3,000" }, { value: "gt3000", label: "Above ₹3,000" }], test: (_p, v, c) => (v === "lt1000" ? c.price < 1000 : v === "1000to3000" ? c.price >= 1000 && c.price <= 3000 : c.price > 3000) },
    { key: "clearance", label: "Clearance", options: () => [{ value: "yes", label: "Clearance only" }], test: (p) => p.attrs.department === "fashion" && (p.attrs.clearance === true || p.tags.includes("clearance")) },
    availF,
    { key: "rating", label: "Rating", options: () => [{ value: "4", label: "4★ & above" }, { value: "3", label: "3★ & above" }], test: (p, v) => (p.rating ?? 0) >= Number(v) },
    brandF,
  ],
  electronics: [
    { key: "type", label: "Category", options: () => topCategories("electronics").map((c) => ({ value: c.id, label: c.name })), test: (p, v) => topCategoryOf(p)?.id === v },
    brandF,
    { key: "price", label: "Price", options: () => [{ value: "lt2", label: "Under ₹2,000" }, { value: "2to20", label: "₹2,000–₹20,000" }, { value: "gt20", label: "Above ₹20,000" }], test: (_p, v, c) => (v === "lt2" ? c.price < 2000 : v === "2to20" ? c.price >= 2000 && c.price <= 20000 : c.price > 20000) },
    {
      key: "screen",
      label: "Screen / Size",
      options: (ps) => uniq(ps.flatMap((p) => p.attrs.department === "electronics" ? p.attrs.specs.filter(s => s.label.toLowerCase().includes("screen") || s.label.toLowerCase().includes("display")).map(s => s.value) : [])),
      test: (p, v) => p.attrs.department === "electronics" && p.attrs.specs.some(s => (s.label.toLowerCase().includes("screen") || s.label.toLowerCase().includes("display")) && s.value === v),
    },
    {
      key: "ram",
      label: "RAM / Memory",
      options: (ps) => uniq(ps.flatMap((p) => p.attrs.department === "electronics" ? p.attrs.specs.filter(s => s.label.toLowerCase().includes("ram") || s.label.toLowerCase().includes("memory")).map(s => s.value) : [])),
      test: (p, v) => p.attrs.department === "electronics" && p.attrs.specs.some(s => (s.label.toLowerCase().includes("ram") || s.label.toLowerCase().includes("memory")) && s.value === v),
    },
    {
      key: "storage",
      label: "Storage",
      options: (ps) => uniq(ps.flatMap((p) => p.attrs.department === "electronics" ? p.attrs.specs.filter(s => s.label.toLowerCase().includes("storage") || s.label.toLowerCase().includes("capacity") || s.label.toLowerCase().includes("ssd")).map(s => s.value) : [])),
      test: (p, v) => p.attrs.department === "electronics" && p.attrs.specs.some(s => (s.label.toLowerCase().includes("storage") || s.label.toLowerCase().includes("capacity") || s.label.toLowerCase().includes("ssd")) && s.value === v),
    },
    { key: "use", label: "Best for", options: () => ["study", "office", "gaming", "editing", "streaming", "calls"].map((u) => ({ value: u, label: u[0].toUpperCase() + u.slice(1) })), test: (p, v) => p.attrs.department === "electronics" && !!p.attrs.bestFor?.some((b) => b.useCase === v && b.verdict === "best") },
    { key: "warranty", label: "Warranty", options: () => [{ value: "12", label: "1 Year" }, { value: "24", label: "2 Years" }, { value: "36", label: "3+ Years" }], test: (p, v) => p.attrs.department === "electronics" && (v === "36" ? p.attrs.warranty.months >= 36 : p.attrs.warranty.months === Number(v)) },
    { key: "installation", label: "Installation", options: () => [{ value: "req", label: "Installation provided" }, { value: "free", label: "Free installation" }], test: (p, v) => p.attrs.department === "electronics" && !!(v === "free" ? p.attrs.installation?.required && p.attrs.installation?.fee === 0 : p.attrs.installation?.required) },
    { key: "refurbished", label: "Condition", options: () => [{ value: "refurb", label: "Certified Refurbished" }], test: (p) => p.attrs.department === "electronics" && !!p.attrs.refurbished },
    { key: "exchange", label: "Exchange", options: () => [{ value: "eligible", label: "Exchange eligible" }], test: (p) => p.attrs.department === "electronics" && !!p.attrs.exchangeEligible },
    availF,
  ],
  beauty: [
    { key: "skin", label: "Skin type", options: () => ["oily", "dry", "combination", "normal", "sensitive"].map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) })), test: (p, v) => p.attrs.department === "beauty" && !!p.attrs.skinTypes?.includes(v as "oily") },
    { key: "hair", label: "Hair type", options: () => ["straight", "wavy", "curly", "all"].map((h) => ({ value: h, label: h[0].toUpperCase() + h.slice(1) })), test: (p, v) => p.attrs.department === "beauty" && !!(p.attrs.hairTypes?.includes(v as "all") || p.attrs.hairTypes?.includes("all")) },
    { key: "shade", label: "Shades", options: () => [{ value: "y", label: "Has shades" }], test: (p) => p.attrs.department === "beauty" && !!p.attrs.shades?.length },
    brandF,
    { key: "sample", label: "Mini available", options: () => [{ value: "y", label: "Mini / sample available" }], test: (p) => p.attrs.department === "beauty" && !!p.attrs.sampleProductId },
    { key: "heat", label: "Handling", options: () => [{ value: "heat", label: "Heat-sensitive cool transport" }], test: (p) => p.attrs.department === "beauty" && !!p.attrs.heatSensitive },
    { key: "price", label: "Price", options: () => [{ value: "lt4", label: "Under ₹400" }, { value: "ge4", label: "₹400 and above" }], test: (_p, v, c) => (v === "lt4" ? c.price < 400 : c.price >= 400) },
  ],
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

function ProductCardMobile({ product }: { product: Product }) {
  const { cityId, isMember, warehouseId, area } = useShopper();
  const now = useNow();
  const info = getPrice(product, cityId, isMember, now);
  const stock = getStock(product.id, warehouseId);
  const wish = useWish();
  const promise = getDeliveryPromise(product, area, new Date(now));

  const fulfilmentText =
    promise.type === "today"
      ? "Today"
      : promise.type === "not_serviceable"
      ? "Unavailable"
      : `By ${formatDay(promise.date!)}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
      {/* 1:1 Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square w-full overflow-hidden bg-[#F6F6F3]">
        <ProductArt product={product} className="h-full w-full object-contain p-2" />
        {info.discountPct > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-extrabold text-accent-text">
            -{info.discountPct}%
          </span>
        )}
      </Link>

      <button
        type="button"
        aria-label={wish.ids.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={() => wish.toggle(product.id)}
        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-xs border border-neutral-200 text-neutral-600"
      >
        <Icons.Heart
          className={cn("h-3.5 w-3.5", wish.ids.includes(product.id) ? "fill-danger text-danger" : "text-neutral-500")}
          strokeWidth={1.75}
        />
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted truncate">
          {brandName(product)}
        </p>

        {/* 2-line title */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-0.5 line-clamp-2 h-8 text-xs font-bold leading-4 text-ink hover:text-primary transition"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-muted h-4">
          {product.ratingCount > 0 ? (
            <>
              <Icons.Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" strokeWidth={1.5} />
              <span className="font-bold text-ink">{product.rating}</span>
              <span className="text-[10px]">({product.ratingCount})</span>
            </>
          ) : (
            <span className="text-[10px]">New</span>
          )}
        </div>

        {/* Price Block */}
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-extrabold text-ink tabular">{formatINR(info.finalPrice)}</span>
          {info.discountPct > 0 && (
            <span className="text-[10px] text-muted line-through tabular">{formatINR(info.mrp)}</span>
          )}
        </div>

        {/* Fulfilment Chip */}
        <div className="mt-1">
          <span className="inline-flex items-center gap-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-700">
            <Icons.Truck className="h-2.5 w-2.5 text-primary shrink-0" strokeWidth={1.75} />
            <span className="truncate">{fulfilmentText}</span>
          </span>
        </div>

        {/* 40px+ Add Button */}
        <div className="mt-2 pt-1">
          <AddToCart product={product} stock={stock} size="sm" className="min-h-[40px] text-xs font-bold" />
        </div>
      </div>
    </article>
  );
}

export function DepartmentView({ department }: { department: Department }) {
  const dept = departments.find((d) => d.id === department)!;
  const page = departmentPages[department];
  const { warehouseId, cityId, isMember, city } = useShopper();
  const now = useNow();
  const router = useRouter(); const path = usePathname(); const sp = useSearchParams();
  const [q, setQ] = useState("");
  const [rot, setRot] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [fashionModal, setFashionModal] = useState<FashionFeatureType | null>(null);
  const [elecModal, setElecModal] = useState<"suitability" | "compatibility" | "homeFit" | "warranty" | "repair" | "exchangePrep" | "compare" | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => { const t = setInterval(() => setRot((r) => (r + 1) % page.deliveryStrip.length), 4000); return () => clearInterval(t); }, [page.deliveryStrip.length]);
  const Icon = DEPT_ICON[department];
  const cats = topCategories(department);
  const selCat = sp.get("c");
  const all = useMemo(() => productsInCity(warehouseId).filter((p) => p.department === department), [warehouseId, department]);
  const defs = FILTERS[department];
  const active = defs.filter((f) => sp.get(f.key));
  const setParam = (k: string, v: string | null) => {
    const n = new URLSearchParams(sp.toString()); if (v) n.set(k, v); else n.delete(k);
    router.replace(`${path}${n.toString() ? "?" + n : ""}`, { scroll: false });
  };
  const sortParam = sp.get("sort") ?? "featured";

  const contextualForOptions = useMemo(() => {
    return all.filter((p) => {
      if (selCat && topCategoryOf(p)?.id !== selCat) return false;
      const g = sp.get("gender");
      if (g && p.attrs.department === "fashion" && p.attrs.gender !== g) return false;
      return true;
    });
  }, [all, selCat, sp]);

  const filterGroups = useMemo(() => {
    const ps = contextualForOptions.length > 0 ? contextualForOptions : all;
    return defs.map((f) => ({
      key: f.key,
      label: f.label,
      options: f.options(ps),
    }));
  }, [defs, all, contextualForOptions]);

  const activeFiltersMap = useMemo(() => {
    const map: Record<string, string> = {};
    defs.forEach((f) => {
      const v = sp.get(f.key);
      if (v) map[f.key] = v;
    });
    return map;
  }, [defs, sp]);

  const handleApplyFilters = (newFilters: Record<string, string>) => {
    const n = new URLSearchParams(sp.toString());
    defs.forEach((f) => {
      if (newFilters[f.key]) {
        n.set(f.key, newFilters[f.key]);
      } else {
        n.delete(f.key);
      }
    });
    router.replace(`${path}${n.toString() ? "?" + n : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const filtered = all.filter(
      (p) =>
        (!selCat || topCategoryOf(p)?.id === selCat) &&
        active.every((f) =>
          f.test(p, sp.get(f.key)!, {
            warehouseId,
            price: getPrice(p, cityId, isMember, now).finalPrice,
          })
        )
    );

    return filtered.sort((a, b) => {
      const aOut = getStock(a.id, warehouseId).status === "out" ? 1 : 0;
      const bOut = getStock(b.id, warehouseId).status === "out" ? 1 : 0;
      if (aOut !== bOut) return aOut - bOut;

      const pA = getPrice(a, cityId, isMember, now);
      const pB = getPrice(b, cityId, isMember, now);

      if (sortParam === "price_asc") return pA.finalPrice - pB.finalPrice;
      if (sortParam === "price_desc") return pB.finalPrice - pA.finalPrice;
      if (sortParam === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortParam === "discount") return pB.discountPct - pA.discountPct;
      return 0;
    });
  }, [all, selCat, active, sp, warehouseId, cityId, isMember, now, sortParam]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 400);
  };

  const brands = brandsInDepartment(department).slice(0, 6);
  const SideIcon = department === "food" ? Icons.CalendarClock : department === "fashion" ? Icons.Shirt : department === "electronics" ? Icons.RefreshCw : Icons.Droplet;
  const DI = (name: string) => (Icons as unknown as Record<string, typeof Icons.Leaf>)[name] ?? Icons.Check;

  return (
    <SnapPage dataDomain={department}>
      {/* Section A — intro */}
      <SnapSection id="intro" title={dept.name} inner="gap-3 sm:gap-4 max-w-[1280px] px-4 sm:px-6 mx-auto">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted sm:text-sm">
          <Link href="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3.5 w-3.5" /><Link href="/category" className="hover:text-primary">Category</Link><ChevronRight className="h-3.5 w-3.5" /><span className="font-semibold text-ink">{dept.name}</span>
        </nav>
        <Reveal>
          <div className={`relative overflow-hidden rounded-4xl bg-${department}-tint p-5 sm:p-8`}>
            <div className="relative z-10 max-w-xl space-y-3">
              <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">{page.title}</h1>
              <p className="text-sm text-ink/75 sm:text-base">{page.subtitle.replace("{city}", city.name)}</p>
              <form className="relative flex gap-2" onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(q)}&department=${department}`); }}>
                <div className="relative flex-1">
                  <span className="sr-only">{page.searchPlaceholder}</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    value={q}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={page.searchPlaceholder}
                    className="h-12 w-full rounded-2xl bg-white pl-11 pr-9 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary/25"
                  />
                  {q && (
                    <button
                      type="button"
                      onClick={() => setQ("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid h-5 w-5 place-items-center rounded-full hover:bg-neutral-100 text-muted cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {/* Fashion Suggestions Popup */}
                  {department === "fashion" && isSearchFocused && (
                    <div className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-2xl border border-line/80 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                      <span className="block px-2.5 py-1 text-[10px] font-bold text-muted uppercase tracking-wider">
                        Popular Fashion Searches
                      </span>
                      <div className="flex flex-col">
                        {[
                          "Men's cotton kurta",
                          "Kanchipuram silk saree",
                          "Wedding rental outfits",
                          "Levi's 511 slim jeans",
                          "Allen Solly formal shirt",
                          "Biba cotton kurta set",
                          "Puma running shoes",
                        ]
                          .filter((term) => !q || term.toLowerCase().includes(q.toLowerCase()))
                          .slice(0, 5)
                          .map((term) => (
                            <button
                              key={term}
                              type="button"
                              onMouseDown={() => {
                                setQ(term);
                                router.push(`/search?q=${encodeURIComponent(term)}&department=fashion`);
                              }}
                              className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-ink hover:bg-neutral-50 text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <Search className="h-3 w-3 text-muted" />
                                <span>{term}</span>
                              </span>
                              <ChevronRight className="h-3 w-3 text-muted" />
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Electronics Suggestions Popup */}
                  {department === "electronics" && isSearchFocused && (
                    <div className="absolute left-0 right-0 top-full z-30 mt-1.5 overflow-hidden rounded-2xl border border-[#DCEDD2] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                      <span className="block px-2.5 py-1 text-[10px] font-bold text-[#085A2E] uppercase tracking-wider">
                        Popular Electronics Searches
                      </span>
                      <div className="flex flex-col">
                        {[
                          "43 inch 4K Smart TV",
                          "HP 14 laptop 16GB RAM",
                          "Double door frost-free refrigerator",
                          "5G smartphone with AMOLED display",
                          "boAt noise cancelling earbuds",
                          "Certified refurbished smartphones",
                        ]
                          .filter((term) => !q || term.toLowerCase().includes(q.toLowerCase()))
                          .slice(0, 5)
                          .map((term) => (
                            <button
                              key={term}
                              type="button"
                              onMouseDown={() => {
                                setQ(term);
                                router.push(`/search?q=${encodeURIComponent(term)}&department=electronics`);
                              }}
                              className="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-ink hover:bg-[#F0F8EC] text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <Search className="h-3 w-3 text-[#085A2E]" />
                                <span>{term}</span>
                              </span>
                              <ChevronRight className="h-3 w-3 text-muted" />
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <button className={btn("primary", "lg")}>Search</button>
              </form>
            </div>
            <div className="pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-[42%] items-center justify-end gap-3 pr-10 md:flex">
              {all.slice(0, 3).map((p, i) => <ProductArt key={p.id} product={p} className={cn("aspect-square rounded-3xl shadow-lift ring-4 ring-white", ["w-[30%] translate-y-6", "w-[36%] -translate-y-4", "w-[30%] translate-y-8"][i])} />)}
            </div>
            <Icon className={`pointer-events-none absolute -bottom-6 right-[38%] hidden h-40 w-40 text-${department} opacity-[0.06] lg:block`} />
          </div>
        </Reveal>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {departments.map((d) => { const I = DEPT_ICON[d.id]; return (
            <Link key={d.id} href={`/category/${d.id}`} className={cn("inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition", d.id === department ? "bg-primary text-white" : "bg-white ring-1 ring-line hover:ring-primary/50")}><I className="h-4 w-4" />{d.name}</Link>); })}
        </div>
        <div className="hidden grid-cols-3 divide-x divide-line rounded-2xl bg-white py-3 shadow-card sm:grid">
          {page.deliveryStrip.map((s) => { const I = DI(s.icon); return <p key={s.text} className="flex items-center justify-center gap-2 px-3 text-sm font-semibold"><I className={`h-5 w-5 text-${department}`} />{s.text}</p>; })}
        </div>
        <p className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold shadow-card sm:hidden">{(() => { const s = page.deliveryStrip[rot]; const I = DI(s.icon); return <><I className="h-4 w-4 text-primary" />{s.text}</>; })()}</p>
        <div className="no-scrollbar flex gap-3 overflow-x-auto sm:grid sm:auto-cols-fr sm:grid-flow-col">
          {cats.map((c) => {
            const I = DI(c.icon ?? "Tag");
            const on = selCat === c.id;
            const sample = all.find((p) => topCategoryOf(p)?.id === c.id);
            const count = all.filter((p) => topCategoryOf(p)?.id === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setParam("c", on ? null : c.id);
                  if (!on) setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50);
                }}
                className={cn(
                  "flex w-[108px] shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-white p-3 text-center shadow-card transition hover:-translate-y-0.5 sm:w-auto cursor-pointer",
                  on ? `ring-2 ring-${department} shadow-md` : "ring-1 ring-line/60"
                )}
              >
                {sample ? <ProductArt product={sample} className="hidden h-[clamp(40px,8svh,72px)] w-[clamp(40px,8svh,72px)] rounded-xl sm:block" /> : null}
                <I className={cn(`h-7 w-7 text-${department}`, sample && "sm:hidden")} />
                <span className="text-xs font-bold leading-tight sm:text-sm">{c.name}</span>
                {count > 0 && <span className="text-[10px] text-muted font-medium">{count} items</span>}
              </button>
            );
          })}
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto lg:grid lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-line lg:rounded-2xl lg:bg-white lg:py-3 lg:shadow-card">
          {page.promiseStrip.map((s) => {
            const I = DI(s.icon);
            const isClickable = department === "fashion" || department === "electronics";
            const handleClick = () => {
              if (department === "fashion") {
                if (s.title === "Rent for occasions") {
                  setParam("rentable", "1");
                  setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50);
                } else if (s.title === "Check your fit") {
                  setFashionModal("fit");
                } else if (s.title === "Fabric and feel") {
                  setFashionModal("fabric");
                } else if (s.title === "True colour photos") {
                  setFashionModal("color");
                } else if (s.title === "Size alerts") {
                  setFashionModal("alerts");
                }
              } else if (department === "electronics") {
                const rep = all[0] || getProductById("p-elec-001");
                setSelectedProductForModal(rep || null);
                if (s.title === "Right device for you") {
                  setElecModal("suitability");
                } else if (s.title === "Compatibility check") {
                  setElecModal("compatibility");
                } else if (s.title === "Will it fit?") {
                  setElecModal("homeFit");
                } else if (s.title === "Digital warranty") {
                  setElecModal("warranty");
                } else if (s.title === "Repair and refurbished") {
                  setElecModal("repair");
                }
              }
            };

            return (
              <button
                key={s.title}
                type="button"
                onClick={handleClick}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-card lg:rounded-none lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none text-left transition",
                  isClickable && "hover:bg-primary/5 active:scale-98 cursor-pointer"
                )}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-${department}-tint text-${department}`}>
                  <I className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block whitespace-nowrap text-xs font-bold sm:text-sm text-ink">{s.title}</span>
                  <span className="hidden text-xs text-muted lg:block">{s.text}</span>
                </span>
              </button>
            );
          })}
        </div>
      </SnapSection>

      {/* Section B — shop */}
      <SnapSection id="shop" title={`Shop ${dept.name}`} tone="white" inner="gap-3 max-w-[1280px] px-4 sm:px-6 mx-auto">
        {/* Mobile Sticky Filter & Sort Bar (< 1024px) */}
        <div className="sticky top-14 z-20 -mx-4 px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-line/70 lg:hidden flex items-center justify-between gap-3 shadow-2xs">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-extrabold text-ink shadow-2xs active:bg-neutral-50"
          >
            <Icons.SlidersHorizontal className="h-4 w-4 text-primary" />
            <span>Filter</span>
            {active.length > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-white font-extrabold">
                {active.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsSortOpen(true)}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-extrabold text-ink shadow-2xs active:bg-neutral-50"
          >
            <Icons.ArrowUpDown className="h-4 w-4 text-primary" />
            <span className="truncate">
              {SORT_OPTIONS.find((s) => s.value === sortParam)?.label || "Sort"}
            </span>
          </button>
        </div>

        {/* Mobile Active Filter Chips */}
        {(active.length > 0 || selCat) && (
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto py-1 lg:hidden">
            {selCat && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                Category: {cats.find((c) => c.id === selCat)?.name}
                <button
                  type="button"
                  onClick={() => setParam("c", null)}
                  aria-label="Remove category filter"
                  className="grid h-4 w-4 place-items-center rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {active.map((f) => (
              <span
                key={f.key}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary"
              >
                {f.label}: {sp.get(f.key)}
                <button
                  type="button"
                  onClick={() => setParam(f.key, null)}
                  aria-label={`Remove ${f.label} filter`}
                  className="grid h-4 w-4 place-items-center rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => router.replace(path, { scroll: false })}
              className="text-xs font-bold text-danger hover:underline whitespace-nowrap pl-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Mobile 2-Column Product Grid (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-muted font-semibold">
            <span>{list.length} products found</span>
            {selCat && <span>in {cats.find((c) => c.id === selCat)?.name}</span>}
          </div>

          {list.length === 0 ? (
            <EmptyState
              icon={<Icons.SearchX className="h-7 w-7" />}
              title={`No products match these filters in ${city.name}`}
              action={
                <button
                  className={btn("secondary")}
                  onClick={() => router.replace(path, { scroll: false })}
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {list.slice(0, visibleCount).map((p) => (
                  <ProductCardMobile key={p.id} product={p} />
                ))}
              </div>

              {/* Skeleton Loaders while loading more */}
              {isLoadingMore && (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2].map((i) => (
                    <div
                      key={`skel-${i}`}
                      className="animate-pulse rounded-2xl bg-white border border-line/70 p-3 flex flex-col gap-2"
                    >
                      <div className="aspect-square w-full rounded-xl bg-neutral-200/70" />
                      <div className="h-3 w-1/3 rounded bg-neutral-200/70" />
                      <div className="h-4 w-full rounded bg-neutral-200/70" />
                      <div className="h-4 w-2/3 rounded bg-neutral-200/70" />
                      <div className="h-10 w-full rounded-xl bg-neutral-200/70 mt-auto" />
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {visibleCount < list.length && (
                <div className="flex justify-center pt-2 pb-6">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="flex min-h-[44px] w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-white border border-line text-sm font-bold text-ink shadow-xs hover:bg-neutral-50 active:scale-[0.98] transition cursor-pointer"
                  >
                    {isLoadingMore ? "Loading products..." : `Load more (${list.length - visibleCount} remaining)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Desktop Layout (>= 1024px) — EXACT EXISTING DESKTOP EXPERIENCE */}
        <div className="hidden lg:grid min-h-0 gap-4 lg:grid-cols-[1fr_300px]">
          <div className="flex min-w-0 flex-col gap-3">
            <InfoBar tone="info" className="[@media(max-height:760px)]:hidden">{page.infoBar}</InfoBar>
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
              <span className="shrink-0 text-sm font-bold">Sort & Filter:</span>
              <label className="relative shrink-0">
                <span className="sr-only">Sort by</span>
                <select
                  value={sortParam}
                  onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}
                  className={cn(
                    "h-10 appearance-none rounded-full pl-4 pr-9 text-sm font-semibold outline-none transition",
                    sortParam !== "featured" ? "bg-primary text-white" : "bg-white ring-1 ring-line hover:ring-primary/50"
                  )}
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <Icons.ChevronDown className={cn("pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2", sortParam !== "featured" ? "text-white" : "text-muted")} />
              </label>

              {defs.map((f) => (
                <label key={f.key} className="relative shrink-0">
                  <span className="sr-only">{f.label}</span>
                  <select value={sp.get(f.key) ?? ""} onChange={(e) => setParam(f.key, e.target.value || null)}
                    className={cn("h-10 appearance-none rounded-full pl-4 pr-9 text-sm font-semibold outline-none transition", sp.get(f.key) ? "bg-primary text-white" : "bg-white ring-1 ring-line hover:ring-primary/50")}>
                    <option value="">{f.label}</option>
                    {f.options(contextualForOptions.length > 0 ? contextualForOptions : all).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <Icons.ChevronDown className={cn("pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2", sp.get(f.key) ? "text-white" : "text-muted")} />
                </label>
              ))}
              {(active.length > 0 || selCat || sortParam !== "featured") && (
                <button onClick={() => router.replace(path, { scroll: false })} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline cursor-pointer">
                  <X className="h-4 w-4" />Clear all
                </button>
              )}
            </div>

            {/* Desktop Active Removable Filter Pills */}
            {(active.length > 0 || selCat) && (
              <div className="flex flex-wrap items-center gap-2 py-1">
                <span className="text-xs font-bold text-muted">Active filters:</span>
                {selCat && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Category: {cats.find((c) => c.id === selCat)?.name}
                    <button
                      type="button"
                      onClick={() => setParam("c", null)}
                      aria-label="Remove category filter"
                      className="grid h-4 w-4 place-items-center rounded-full hover:bg-primary/20 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {active.map((f) => {
                  const val = sp.get(f.key);
                  const opt = f.options(contextualForOptions.length > 0 ? contextualForOptions : all).find((o) => o.value === val);
                  return (
                    <span
                      key={f.key}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {f.label}: {opt?.label ?? val}
                      <button
                        type="button"
                        onClick={() => setParam(f.key, null)}
                        aria-label={`Remove ${f.label} filter`}
                        className="grid h-4 w-4 place-items-center rounded-full hover:bg-primary/20 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
                <button
                  type="button"
                  onClick={() => router.replace(path, { scroll: false })}
                  className="text-xs font-bold text-danger hover:underline whitespace-nowrap pl-2 cursor-pointer"
                >
                  Clear all ({active.length + (selCat ? 1 : 0)})
                </button>
              </div>
            )}
            {list.length === 0 ? (
              <EmptyState icon={<Icons.SearchX className="h-7 w-7" />} title={`No products match these filters in ${city.name}`} action={<button className={btn("secondary")} onClick={() => router.replace(path, { scroll: false })}>Clear filters</button>} />
            ) : department === "food" ? (
              <CardRow key={sp.toString()} heading={<p className="text-sm font-semibold text-muted">{list.length} products{selCat ? ` in ${cats.find((c) => c.id === selCat)?.name}` : ""}</p>}
                items={list.map((p) => <ProductCardCompact key={p.id} product={p} />)} perView={{ base: 1, sm: 2, lg: 2, xl: 3 }} />
            ) : (
              <CardRow key={sp.toString()} heading={<p className="text-sm font-semibold text-muted">{list.length} products{selCat ? ` in ${cats.find((c) => c.id === selCat)?.name}` : ""}</p>}
                items={list.map((p) => <ProductCard key={p.id} product={p} />)} perView={{ base: 2, sm: 3, lg: 3, xl: 4 }} />
            )}
          </div>
          <aside className="hidden gap-3 lg:flex lg:flex-col">
            <div className="flex w-[280px] shrink-0 flex-col gap-2 rounded-3xl bg-primary p-5 text-white lg:w-auto">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-text"><SideIcon className="h-5 w-5" /></span>
              <h3 className="text-lg font-extrabold leading-tight">{page.sidePanel.title}</h3>
              <p className="text-sm text-white/75">{page.sidePanel.text}</p>
              <LinkButton href={page.sidePanel.cta.href} variant="accent" className="mt-1">{page.sidePanel.cta.label}</LinkButton>
            </div>
            <div className="w-[280px] shrink-0 rounded-3xl bg-bg p-4 lg:w-auto">
              <div className="mb-3 flex items-center justify-between"><h3 className="font-extrabold">Top brands</h3><Link href={`/search?department=${department}`} className="flex items-center gap-1 text-sm font-semibold text-primary">See all<ArrowRight className="h-4 w-4" /></Link></div>
              <div className="grid grid-cols-2 gap-2">{brands.map((b) => <Link key={b.id} href={`/search?q=${encodeURIComponent(b.name)}`} className="grid h-12 place-items-center rounded-xl bg-white px-2 text-center font-display text-sm font-extrabold text-ink ring-1 ring-line/60 hover:ring-primary/50">{b.name}</Link>)}</div>
            </div>
          </aside>
        </div>

        {/* Filter and Sort Sheets for mobile */}
        <FilterSheet
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          groups={filterGroups}
          activeFilters={activeFiltersMap}
          onApply={handleApplyFilters}
          onClear={() => {
            const n = new URLSearchParams();
            if (selCat) n.set("c", selCat);
            router.replace(`${path}${n.toString() ? "?" + n : ""}`, { scroll: false });
          }}
        />

        <SortSheet
          open={isSortOpen}
          onClose={() => setIsSortOpen(false)}
          options={SORT_OPTIONS}
          currentSort={sortParam}
          onSelectSort={(val) => setParam("sort", val === "featured" ? null : val)}
        />
      </SnapSection>

      {/* Feature Modals for Fashion */}
      {department === "fashion" && (
        <FashionFeatureModal
          type={fashionModal}
          onClose={() => setFashionModal(null)}
          onSelectRentable={() => {
            setFashionModal(null);
            setParam("rentable", "1");
            setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 50);
          }}
        />
      )}

      {/* Feature Modals for Electronics */}
      {department === "electronics" && (selectedProductForModal || all[0]) && (
        <>
          <SuitabilityModal
            open={elecModal === "suitability"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
            onOpenCompare={() => setElecModal("compare")}
          />

          <CompatibilityModal
            open={elecModal === "compatibility"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
            selection={{}}
            onSave={() => setElecModal(null)}
          />

          <HomeFitModal
            open={elecModal === "homeFit"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
            selection={{}}
            onSave={() => setElecModal(null)}
          />

          <WarrantyModal
            open={elecModal === "warranty"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
          />

          <RepairAndExchangeModal
            open={elecModal === "repair"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
            selection={{}}
            cityName={city.name}
            pincode={warehouseId || "560001"}
            onOpenExchangePrep={() => setElecModal("exchangePrep")}
          />

          <DeviceExchangePrepModal
            open={elecModal === "exchangePrep"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
            onBackToExchange={() => setElecModal("repair")}
          />

          <CompareDevicesModal
            open={elecModal === "compare"}
            onClose={() => setElecModal(null)}
            product={selectedProductForModal || all[0]}
          />
        </>
      )}

      {/* Floating Compare Devices Action for Electronics */}
      {department === "electronics" && all.length > 1 && (
        <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
          <button
            type="button"
            onClick={() => {
              setSelectedProductForModal(all[0]);
              setElecModal("compare");
            }}
            className="flex items-center gap-2 rounded-full bg-[#085A2E] text-white px-4 py-2.5 font-extrabold text-xs shadow-lg hover:bg-[#064825] transition active:scale-95 cursor-pointer border border-[#DCEDD2]"
          >
            <Icons.Sliders className="h-4 w-4 text-[#B8F34A]" />
            <span>Compare Devices ({all.length})</span>
          </button>
        </div>
      )}
    </SnapPage>
  );
}
