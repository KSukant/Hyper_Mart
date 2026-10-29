"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Apple,
  Shirt,
  Tv,
  ShoppingBag,
  ArrowRight,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { departments } from "@/mocks";
import { productsInCity } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { formatINR } from "@/lib/format";
import { useShopper, useNow } from "@/lib/hooks";
import { PHOTOS } from "@/lib/photo-manifest";
import { useSnapRegister } from "@/components/sections/Snap";
import { LinkButton } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { Department, Product, DepartmentInfo } from "@/types";

/* ───────────── Department Icons & Domain Tokens ───────────── */
const DEPT_ICONS: Record<Department, typeof Apple> = {
  food: Apple,
  fashion: Shirt,
  electronics: Tv,
  beauty: ShoppingBag,
};

const DOMAIN_COLORS: Record<Department, string> = {
  food: "#0E5E3A",       // food green
  fashion: "#6B2E5F",    // fashion plum
  electronics: "#1D4E89",// electronics blue
  beauty: "#9C2F55",     // beauty rose
};

/* ───────────── Sub-categories per Department ───────────── */
const DEPT_SUBCATS: Record<Department, { label: string; href: string }[]> = {
  food: [
    { label: "Fresh produce", href: "/category/food?c=food-fresh" },
    { label: "Dairy & eggs", href: "/category/food?c=food-dairy" },
    { label: "Staples & oil", href: "/category/food?c=food-staples" },
  ],
  fashion: [
    { label: "Men", href: "/category/fashion?c=fashion-men" },
    { label: "Women", href: "/category/fashion?c=fashion-women" },
    { label: "Kids", href: "/category/fashion?c=fashion-kids" },
  ],
  electronics: [
    { label: "Mobiles", href: "/category/electronics?c=elec-mobiles" },
    { label: "Appliances", href: "/category/electronics?c=elec-appliances" },
    { label: "Laptops", href: "/category/electronics?c=elec-laptops" },
  ],
  beauty: [
    { label: "Skincare", href: "/category/beauty?c=beauty-skin" },
    { label: "Haircare", href: "/category/beauty?c=beauty-hair" },
    { label: "Makeup", href: "/category/beauty?c=beauty-makeup" },
  ],
};

/* ───────────── Excluded Non-Catalogue Images ───────────── */
// Skip lifestyle shots, swatches on skin, gloved hands, denim patches, dark TV screens
const EXCLUDED_SLUGS = new Set([
  "maybelline-fit-me-foundation",          // swatch on skin
  "samsung-32-hd-smart-tv",                // dark screen photo
  "levis-511-slim-jeans",                  // denim fabric patch
  "minimalist-niacinamide-serum-10ml-mini", // gloved hand with vial
]);

export interface SpotlightProductItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  unit: string;
  price: number;
  mrp?: number;
  discountPct?: number;
  rating?: number;
  ratingCount?: number;
}

/* ───────────── Single Desktop/Tablet Department Card ───────────── */
interface DepartmentCardProps {
  dept: DepartmentInfo;
  staggerIndex: number;
  globalPaused: boolean;
  prefersReducedMotion: boolean;
  isSectionVisible: boolean;
  isTabHidden: boolean;
}

export function DepartmentCard({
  dept,
  staggerIndex,
  globalPaused,
  prefersReducedMotion,
  isSectionVisible,
  isTabHidden,
}: DepartmentCardProps) {
  const { cityId, warehouseId, isMember } = useShopper();
  const now = useNow();

  const domainColor = DOMAIN_COLORS[dept.id] || "#0B5132";
  const Icon = DEPT_ICONS[dept.id] || ShoppingBag;

  // Real items in warehouse
  const allDeptProducts = useMemo(() => {
    return productsInCity(warehouseId).filter((p) => p.department === dept.id);
  }, [warehouseId, dept.id]);

  // Qualifying products: exact catalogue photos on clean light background (up to 6)
  const spotlightItems = useMemo<SpotlightProductItem[]>(() => {
    const list: SpotlightProductItem[] = [];
    for (const p of allDeptProducts) {
      if (EXCLUDED_SLUGS.has(p.slug)) continue;

      const src = p.images[0]?.src;
      if (!src || !PHOTOS.has(src)) continue;

      const priceInfo = getPrice(p, cityId, isMember, now);
      const discountPct =
        priceInfo.mrp > priceInfo.finalPrice
          ? Math.round(((priceInfo.mrp - priceInfo.finalPrice) / priceInfo.mrp) * 100)
          : undefined;

      list.push({
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: src,
        unit: p.unit,
        price: priceInfo.finalPrice,
        mrp: priceInfo.mrp > priceInfo.finalPrice ? priceInfo.mrp : undefined,
        discountPct,
        rating: p.ratingCount > 0 ? p.rating : undefined,
        ratingCount: p.ratingCount,
      });

      if (list.length >= 6) break;
    }
    return list;
  }, [allDeptProducts, cityId, isMember, now, warehouseId]);

  const [index, setIndex] = useState(0);

  // Hover & focus state with 300ms resume delay
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const hoverResumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerEnter = () => {
    if (hoverResumeTimerRef.current) clearTimeout(hoverResumeTimerRef.current);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (hoverResumeTimerRef.current) clearTimeout(hoverResumeTimerRef.current);
    hoverResumeTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  const isPaused =
    isHovered ||
    isFocused ||
    globalPaused ||
    isTabHidden ||
    !isSectionVisible;

  // Staggered rotation: Card i starts i * 750ms later, then runs on a 3000ms loop
  const isFirstRun = useRef(true);
  const initialDelay = staggerIndex * 750 + 3000;
  const remainingMsRef = useRef(initialDelay);
  const startTimestampRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const dur = isFirstRun.current ? staggerIndex * 750 + 3000 : 3000;
    isFirstRun.current = false;
    remainingMsRef.current = dur;
  }, [index, staggerIndex]);

  useEffect(() => {
    if (prefersReducedMotion || spotlightItems.length <= 1) return;

    if (isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (startTimestampRef.current !== null) {
        const elapsed = Date.now() - startTimestampRef.current;
        remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
        startTimestampRef.current = null;
      }
      return;
    }

    startTimestampRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % spotlightItems.length);
    }, remainingMsRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (startTimestampRef.current !== null) {
        const elapsed = Date.now() - startTimestampRef.current;
        remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
        startTimestampRef.current = null;
      }
    };
  }, [index, isPaused, prefersReducedMotion, spotlightItems.length]);

  const currentItem = spotlightItems[index] || spotlightItems[0];
  const nextItem = spotlightItems[(index + 1) % Math.max(spotlightItems.length, 1)];

  const handlePrev = () => {
    setIndex((i) => (i - 1 + spotlightItems.length) % spotlightItems.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % spotlightItems.length);
  };

  const subcats = DEPT_SUBCATS[dept.id] || [];

  return (
    <div
      data-domain={dept.id}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-line/80 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Preload next image to eliminate blank frames */}
      {nextItem?.image && (
        <div className="hidden" aria-hidden="true">
          <Image src={nextItem.image} alt="" width={300} height={225} priority={false} />
        </div>
      )}

      {/* 3px domain accent top line */}
      <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: domainColor }} />

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        {/* 1. Department Heading & Concise Description */}
        <div>
          {/* Top row: Icon badge + Count pill */}
          <div className="flex items-center justify-between">
            <span
              className="grid h-8 w-8 place-items-center rounded-xl"
              style={{ backgroundColor: `${domainColor}14`, color: domainColor }}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-bold text-neutral-600">
              {allDeptProducts.length} items
            </span>
          </div>

          {/* Department Name - Clean, prominent, full card width */}
          <Link
            href={`/category/${dept.id}`}
            className="block mt-2 font-display text-base xl:text-lg font-extrabold text-ink transition-colors group-hover:text-primary leading-tight"
          >
            {dept.name}
          </Link>

          <p className="mt-1 text-xs text-muted line-clamp-1 leading-relaxed">
            {dept.tagline}
          </p>

          {/* Subcategory Quick Links */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-hidden flex-nowrap">
            {subcats.map((sc) => (
              <Link
                key={sc.label}
                href={sc.href}
                className="shrink-0 whitespace-nowrap rounded-full border border-line/80 px-2.5 py-0.5 text-[10px] font-semibold text-ink/70 transition hover:border-ink/40 hover:text-ink hover:bg-neutral-50"
              >
                {sc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Generous Product Image Tile (Clean, Prominent, 4:3 ratio, #F6F6F3) */}
        <div className="my-3.5 relative w-full aspect-[4/3] rounded-2xl bg-[#F6F6F3] overflow-hidden flex items-center justify-center p-3">
          {currentItem && (
            <Link
              href={`/product/${currentItem.slug}`}
              className="relative h-full w-full block focus-visible:outline-2 focus-visible:outline-primary"
              aria-label={`${currentItem.name} — ${formatINR(currentItem.price)}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${dept.id}-${currentItem.id}`}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={staggerIndex === 0 && index === 0}
                    className="object-contain p-2 transition duration-300 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>
            </Link>
          )}

          {/* Previous / Next Manual Navigation on Hover */}
          {spotlightItems.length > 1 && (
            <div className="absolute inset-x-2 bottom-2 flex justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity pointer-events-auto">
              <button
                type="button"
                aria-label={`Previous ${dept.name} product`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePrev();
                }}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-ink shadow-sm hover:bg-primary hover:text-white transition cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label={`Next ${dept.name} product`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNext();
                }}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-ink shadow-sm hover:bg-primary hover:text-white transition cursor-pointer"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 3. Featured Product Name and Price Row */}
        <div className="mb-3 space-y-1">
          {currentItem ? (
            <>
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  href={`/product/${currentItem.slug}`}
                  className="truncate text-xs font-bold text-ink hover:text-primary transition"
                  title={currentItem.name}
                >
                  {currentItem.name}
                </Link>
                <span className="text-[11px] text-muted shrink-0 tabular">
                  {currentItem.unit}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-display text-base font-extrabold text-ink tabular">
                  {formatINR(currentItem.price)}
                </span>
                {currentItem.mrp && currentItem.mrp > currentItem.price && (
                  <span className="text-xs text-muted line-through tabular">
                    {formatINR(currentItem.mrp)}
                  </span>
                )}
                {currentItem.discountPct && (
                  <span className="rounded bg-accent/20 text-accent-text px-1.5 py-0.5 text-[10px] font-extrabold tabular">
                    -{currentItem.discountPct}%
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="h-10" />
          )}
        </div>

        {/* 4. One Clear Department Exploration Button */}
        <Link
          href={`/category/${dept.id}`}
          className="flex w-full h-11 items-center justify-center gap-1.5 rounded-xl border-2 px-3 text-xs xl:text-[13px] font-extrabold transition focus-visible:outline-2 focus-visible:outline-primary cursor-pointer shadow-2xs whitespace-nowrap"
          style={{
            borderColor: domainColor,
            color: domainColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = domainColor;
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = domainColor;
          }}
        >
          <span>Explore {dept.shortName}</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
        </Link>
      </div>
    </div>
  );
}

/* ───────────── Compact Mobile Department Tile (below 1024px) ───────────── */
export function DepartmentCompactTile({
  dept,
  staggerIndex,
  globalPaused,
  prefersReducedMotion,
  isSectionVisible,
  isTabHidden,
}: DepartmentCardProps) {
  const { cityId, warehouseId, isMember } = useShopper();
  const now = useNow();

  const domainColor = DOMAIN_COLORS[dept.id] || "#0B5132";
  const Icon = DEPT_ICONS[dept.id] || ShoppingBag;

  const allDeptProducts = useMemo(() => {
    return productsInCity(warehouseId).filter((p) => p.department === dept.id);
  }, [warehouseId, dept.id]);

  const spotlightItems = useMemo<SpotlightProductItem[]>(() => {
    const list: SpotlightProductItem[] = [];
    for (const p of allDeptProducts) {
      if (EXCLUDED_SLUGS.has(p.slug)) continue;
      const src = p.images[0]?.src;
      if (!src || !PHOTOS.has(src)) continue;
      const priceInfo = getPrice(p, cityId, isMember, now);
      list.push({
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: src,
        unit: p.unit,
        price: priceInfo.finalPrice,
      });
      if (list.length >= 6) break;
    }
    return list;
  }, [allDeptProducts, cityId, isMember, now, warehouseId]);

  const [index, setIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const isPaused =
    isTouching ||
    globalPaused ||
    isTabHidden ||
    !isSectionVisible;

  useEffect(() => {
    if (prefersReducedMotion || spotlightItems.length <= 1 || isPaused) return;
    const dur = 3000;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % spotlightItems.length);
    }, dur);
    return () => clearTimeout(timer);
  }, [index, isPaused, prefersReducedMotion, spotlightItems.length]);

  const currentItem = spotlightItems[index] || spotlightItems[0];

  return (
    <Link
      href={`/category/${dept.id}`}
      data-domain={dept.id}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-line/80 shadow-xs p-3 transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-primary min-h-[220px]"
    >
      {/* 3px domain top accent line */}
      <div className="absolute top-0 inset-x-0 h-[3px]" style={{ backgroundColor: domainColor }} />

      {/* Top Header: Icon chip + N items */}
      <div className="flex items-center justify-between pt-1">
        <span
          className="grid h-7 w-7 place-items-center rounded-lg"
          style={{ backgroundColor: `${domainColor}14`, color: domainColor }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
          {allDeptProducts.length} items
        </span>
      </div>

      {/* Department Name */}
      <h3 className="font-display font-extrabold text-xs sm:text-sm text-ink mt-1.5 h-8 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
        {dept.name}
      </h3>

      {/* Rotating generous product image tile with 3s fade (4:3 ratio, clean #F6F6F3) */}
      <div className="relative my-2 aspect-[4/3] w-full rounded-xl bg-[#F6F6F3] p-2 overflow-hidden flex items-center justify-center">
        {currentItem ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${dept.id}-${currentItem.id}`}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative h-full w-full"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-1"
              />
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>

      {/* One clean line with current product name and price */}
      {currentItem && (
        <p className="truncate text-[11px] font-medium text-neutral-600 leading-tight">
          <span className="text-ink font-semibold">{currentItem.name}</span> ·{" "}
          <strong className="text-primary font-bold">{formatINR(currentItem.price)}</strong>
        </p>
      )}
    </Link>
  );
}

/* ───────────── Main Department Spotlight Section ───────────── */
export function DepartmentSpotlightSection() {
  useSnapRegister("departments", "Shop by department");

  const [globalPaused, setGlobalPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 0.75] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="departments"
      ref={sectionRef}
      role="region"
      aria-label="Shop by department"
      className="snap-section relative w-full flex flex-col justify-center overflow-hidden bg-white my-8 lg:my-0 lg:min-h-[var(--section-h,calc(100svh-var(--header-h,72px)))]"
      style={{
        paddingTop: "clamp(24px, 4vh, 48px)",
        paddingBottom: "clamp(24px, 4vh, 48px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-text sm:text-xs">
              FOUR DEPARTMENTS · ONE CART
            </p>
            <h2 className="mt-0.5 font-display text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
              Shop by <span className="text-primary">department</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              Mix groceries, fashion, electronics and beauty in one order.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setGlobalPaused((p) => !p)}
                aria-pressed={globalPaused}
                aria-label={globalPaused ? "Play all spotlights" : "Pause all spotlights"}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line/80 transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
                  globalPaused && "bg-primary text-white ring-primary"
                )}
              >
                {globalPaused ? (
                  <Play className="h-4 w-4 fill-current" />
                ) : (
                  <Pause className="h-4 w-4 fill-current" />
                )}
              </button>
            )}

            <LinkButton href="/category" variant="secondary" size="md">
              All categories <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        {/* Mobile Layout (below 1024px): 2x2 grid of compact tiles with large images */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
          {departments.map((d, i) => (
            <DepartmentCompactTile
              key={`mob-${d.id}`}
              dept={d}
              staggerIndex={i}
              globalPaused={globalPaused}
              prefersReducedMotion={prefersReducedMotion}
              isSectionVisible={isSectionVisible}
              isTabHidden={isTabHidden}
            />
          ))}
        </div>

        {/* Sub-category chips row under 2x2 grid (Mobile only) */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar lg:hidden pb-1">
          {departments.flatMap((d) => DEPT_SUBCATS[d.id] || []).map((sc) => (
            <Link
              key={sc.label}
              href={sc.href}
              className="shrink-0 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink/80 transition hover:border-primary hover:text-primary min-h-[36px] flex items-center"
            >
              {sc.label}
            </Link>
          ))}
        </div>

        {/* Desktop Cards Grid (>= 1024px): 4 identical balanced cards with large images */}
        <div className="mt-5 sm:mt-6 hidden lg:grid lg:grid-cols-4 items-stretch gap-6">
          {departments.map((d, i) => (
            <DepartmentCard
              key={d.id}
              dept={d}
              staggerIndex={i}
              globalPaused={globalPaused}
              prefersReducedMotion={prefersReducedMotion}
              isSectionVisible={isSectionVisible}
              isTabHidden={isTabHidden}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
