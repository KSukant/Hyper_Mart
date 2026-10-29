"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  Heart,
  Star,
  Clock,
  Truck,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import type { Offer, Product } from "@/types";
import { getPrice } from "@/lib/pricing";
import { brandName, getStock, getProductById } from "@/lib/catalog";
import { getDeliveryPromise } from "@/lib/delivery";
import { formatINR, formatDay } from "@/lib/format";
import { useShopper } from "@/lib/hooks";
import { useWish, useCart, lineKey } from "@/store";
import { getProductPhotoSrc } from "@/components/product/ProductArt";
import { toast } from "@/components/ui/primitives";
import { useSnapRegister } from "@/components/sections/Snap";
import { cn } from "@/lib/cn";

/* ───────────── Domain Theme Tokens ───────────── */
const DOMAIN_COLORS: Record<Product["department"], string> = {
  food: "#0E5E3A",       // food green
  fashion: "#6B2E5F",    // fashion plum
  electronics: "#1D4E89",// electronics blue
  beauty: "#9C2F55",     // beauty rose
};

const DOMAIN_LABELS: Record<Product["department"], string> = {
  food: "Food & Groceries",
  fashion: "Fashion",
  electronics: "Electronics",
  beauty: "Beauty & Personal Care",
};

interface CategoryOption {
  id: "all" | Product["department"];
  label: string;
  color: string;
}

const CATEGORY_CHIPS: CategoryOption[] = [
  { id: "all", label: "All", color: "#0B5132" },
  { id: "food", label: "Food and Groceries", color: "#0E5E3A" },
  { id: "fashion", label: "Fashion", color: "#6B2E5F" },
  { id: "electronics", label: "Electronics", color: "#1D4E89" },
  { id: "beauty", label: "Beauty and Personal Care", color: "#9C2F55" },
];

/* ───────────── Shared Countdown Helper ───────────── */
interface TimeLeftResult {
  text: string;
  urgent: boolean;
}

function computeTimeLeft(endsAtIso?: string, currentMs?: number | null): TimeLeftResult | null {
  if (!endsAtIso) return null;
  const end = Date.parse(endsAtIso);
  if (isNaN(end)) return null;

  const now = currentMs ?? Date.now();
  const diff = end - now;
  if (diff <= 0) {
    return { text: "Deal ended", urgent: true };
  }

  const totalSec = Math.floor(diff / 1000);
  const totalHours = Math.floor(totalSec / 3600);
  const days = Math.floor(totalHours / 24);

  // Over 24h: "1d 7h left"
  if (days >= 1) {
    const remHours = totalHours % 24;
    return { text: `${days}d ${remHours}h left`, urgent: false };
  }

  // Under 24h: "HH:MM:SS left", red under 1h
  const remMinutes = Math.floor((totalSec % 3600) / 60);
  const remSeconds = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(totalHours)}:${pad(remMinutes)}:${pad(remSeconds)} left`;
  const urgent = totalHours < 1;

  return { text: timeStr, urgent };
}

/* ───────────── Deal Card Component ───────────── */
interface DealCardProps {
  offer: Offer;
  product: Product;
  nowMs: number | null;
  eager?: boolean;
}

function DealCard({ offer, product, nowMs, eager = false }: DealCardProps) {
  const { cityId, isMember, warehouseId, area } = useShopper();
  const wish = useWish();
  const { items, add, setQty } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const priceNow = nowMs ?? Date.now();
  const priceInfo = getPrice(product, cityId, isMember, priceNow);
  const stock = getStock(product.id, warehouseId);
  const deliveryPromise = getDeliveryPromise(product, area, new Date(priceNow));
  const timeLeft = computeTimeLeft(offer.endsAt, nowMs);

  const isWished = wish.ids.includes(product.id);
  const domainColor = DOMAIN_COLORS[product.department] || "#0B5132";
  const domainLabel = DOMAIN_LABELS[product.department] || product.department;

  // Real verified product photography only
  const photoSrc = getProductPhotoSrc(product, 0);

  // Computed discount badge: e.g. "-20%"
  const discountPct =
    priceInfo.mrp > priceInfo.finalPrice
      ? Math.round(((priceInfo.mrp - priceInfo.finalPrice) / priceInfo.mrp) * 100)
      : 0;

  // Savings: e.g. "Save ₹569"
  const savings = priceInfo.mrp > priceInfo.finalPrice ? priceInfo.mrp - priceInfo.finalPrice : 0;

  // Real inventory & claimed limits
  const isSoldOut =
    stock.status === "out" ||
    stock.status === "not_stocked" ||
    (stock.available !== undefined && stock.available <= 0);
  const isLowStock = stock.status === "low" && stock.available !== undefined && stock.available > 0;
  const hasRealClaimed =
    offer.claimedCount !== undefined && offer.stockLimit !== undefined && offer.stockLimit > 0;
  const claimedPct = hasRealClaimed
    ? Math.min(100, Math.round((offer.claimedCount! / offer.stockLimit!) * 100))
    : 0;

  // Fulfilment text
  const fulfilmentText =
    deliveryPromise.type === "today"
      ? "Store · Today"
      : deliveryPromise.date
      ? `Warehouse · by ${formatDay(deliveryPromise.date)}`
      : "Warehouse · Standard";

  // Cart key & status
  const cartFull = {
    productId: product.id,
    variantKey: "default",
    qty: 1,
  };
  const key = lineKey(cartFull);
  const inCart = items.find((i) => lineKey(i) === key);
  const maxQty = Math.min(
    product.maxQtyPerOrder,
    offer.perCustomerLimit ?? Infinity,
    stock.available || Infinity
  );

  return (
    <div className="deal-card-wrapper shrink-0 snap-start w-[76vw] max-w-[300px] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-3*1.5rem)/4)]">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card border border-line/70 transition duration-200 hover:-translate-y-1 hover:shadow-hover hover:border-primary/30">
        {/* 1. 3px domain accent line */}
        <div className="h-[3px] w-full shrink-0" style={{ backgroundColor: domainColor }} />

        {/* 2. Image Area: Generous 4:3 ratio, neutral #F6F6F3 studio background, centered contain */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#F6F6F3]">
          <Link
            href={`/product/${product.slug}`}
            className="block h-full w-full"
            aria-label={`View ${product.name}`}
          >
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={product.images[0]?.alt || product.name}
                fill
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 33vw, 290px"
                priority={eager}
                className="object-contain p-3.5 sm:p-4 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#EAEAE6] p-3 text-center text-xs font-semibold text-muted">
                Photo coming soon
              </div>
            )}
          </Link>

          {/* Discount Badge top-left */}
          {discountPct > 0 && (
            <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-md bg-accent px-2 py-0.5 text-[11px] font-black text-accent-text shadow-xs">
              -{discountPct}%
            </span>
          )}

          {/* Wishlist Heart Button top-right */}
          <button
            type="button"
            aria-label={
              isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              wish.toggle(product.id);
            }}
            className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/95 backdrop-blur-xs shadow-xs border border-black/5 text-ink/70 hover:text-danger hover:scale-105 transition focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWished ? "fill-danger text-danger" : "text-ink/70"
              )}
              strokeWidth={1.75}
            />
          </button>
        </div>

        {/* 3. Card Body: Structured hierarchy with reserved heights for clean baseline alignment */}
        <div className="flex flex-1 flex-col justify-between p-3.5 bg-white">
          <div className="flex flex-col">
            {/* Category Label + Brand Row */}
            <div className="flex items-center justify-between gap-1 text-[11px]">
              <span
                className="font-extrabold uppercase tracking-wider truncate"
                style={{ color: domainColor }}
              >
                {domainLabel}
              </span>
              <span className="font-bold uppercase tracking-wider text-muted truncate">
                {brandName(product)}
              </span>
            </div>

            {/* Product Name (2-line clamp with fixed height) */}
            <Link
              href={`/product/${product.slug}`}
              className="mt-1 focus-visible:outline-2 focus-visible:outline-primary rounded-xs"
            >
              <h3 className="h-9 line-clamp-2 text-xs sm:text-sm font-bold leading-[18px] text-ink transition-colors group-hover:text-primary">
                {product.name}
              </h3>
            </Link>

            {/* Rating and Reviews Row */}
            <div className="mt-0.5 flex h-4 items-center gap-1.5 text-[11px] text-muted">
              {product.ratingCount > 0 ? (
                <>
                  <Star
                    className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="font-bold text-ink">{product.rating}</span>
                  <span>({product.ratingCount.toLocaleString("en-IN")})</span>
                </>
              ) : null}
            </div>

            {/* Price Row: Selling Price, Strikethrough MRP, and Savings Chip */}
            <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
              <span className="font-display text-base sm:text-lg font-extrabold text-ink tabular">
                {formatINR(priceInfo.finalPrice)}
              </span>
              {savings > 0 && (
                <span className="text-[11px] text-muted line-through tabular">
                  {formatINR(priceInfo.mrp)}
                </span>
              )}
              {savings > 0 && (
                <span className="rounded bg-emerald-50 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 tabular">
                  Save {formatINR(savings)}
                </span>
              )}
            </div>

            {/* Countdown Timer & Stock Urgency Row */}
            <div className="mt-1 flex h-4 items-center justify-between text-[11px]">
              {timeLeft ? (
                <div
                  className={cn(
                    "flex items-center gap-1 font-semibold tabular",
                    timeLeft.urgent ? "text-danger font-extrabold" : "text-muted"
                  )}
                >
                  <Clock className="h-3 w-3 shrink-0" />
                  <span>{timeLeft.text}</span>
                </div>
              ) : (
                <div />
              )}
              {isLowStock ? (
                <span className="font-bold text-danger text-[11px]">
                  Only {stock.available} left
                </span>
              ) : null}
            </div>

            {/* Claimed progress bar (when real claimed inventory limit is specified) */}
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
              {hasRealClaimed ? (
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${claimedPct}%`, backgroundColor: domainColor }}
                />
              ) : null}
            </div>

            {/* Fulfilment & Member Price Row */}
            <div className="mt-1 flex h-4 items-center justify-between text-[10px] text-muted">
              <span className="inline-flex items-center gap-1 truncate">
                <Truck className="h-3 w-3 text-primary shrink-0" strokeWidth={1.75} />
                <span className="truncate">{fulfilmentText}</span>
              </span>
              {priceInfo.memberPrice !== undefined && priceInfo.memberPrice < priceInfo.finalPrice && (
                <span className="font-semibold text-primary shrink-0">
                  Member {formatINR(priceInfo.memberPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart CTA / Quantity Stepper */}
          <div className="mt-2.5 w-full min-h-[38px] sm:min-h-[40px]">
            {isSoldOut ? (
              <button
                disabled
                className="flex min-h-[38px] sm:min-h-[40px] w-full items-center justify-center rounded-xl bg-neutral-100 text-xs font-bold text-muted cursor-not-allowed"
              >
                Sold out
              </button>
            ) : inCart ? (
              <div
                className="flex min-h-[38px] sm:min-h-[40px] w-full items-center justify-between rounded-xl px-2.5 border"
                style={{
                  backgroundColor: `${domainColor}12`,
                  borderColor: `${domainColor}35`,
                }}
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newQty = inCart.qty - 1;
                    if (newQty <= 0) {
                      setQty(key, 0);
                    } else {
                      setQty(key, newQty);
                    }
                  }}
                  className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 hover:bg-white text-ink transition shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs font-bold tabular" style={{ color: domainColor }}>
                  {justAdded ? "✓ Added" : `${inCart.qty} in cart`}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={inCart.qty >= maxQty}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQty(key, inCart.qty + 1);
                  }}
                  className="grid h-7 w-7 place-items-center rounded-lg bg-white/90 hover:bg-white text-ink transition shadow-2xs disabled:opacity-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  add(cartFull);
                  setJustAdded(true);
                  setTimeout(() => setJustAdded(false), 1200);
                  toast("Added to cart", "/cart", "View cart");
                }}
                className="flex min-h-[38px] sm:min-h-[40px] w-full items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-extrabold text-white transition hover:opacity-90 active:scale-[0.98] shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                style={{ backgroundColor: domainColor }}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Main Deals Strip Component ───────────── */
export interface DealsStripProps {
  deals: Offer[];
  mode?: "continuous" | "stepped";
  className?: string;
}

export function DealsStrip({ deals, className }: DealsStripProps) {
  useSnapRegister("deals", "Deals ending soon");

  const [selectedCategory, setSelectedCategory] = useState<"all" | Product["department"]>("all");
  const [nowMs, setNowMs] = useState<number | null>(null);

  // Carousel scroll and navigation state
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Visibility and accessibility
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Shared 1-second countdown ticker
  useEffect(() => {
    setNowMs(Date.now());
    const ticker = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // 2. Prefers reduced motion check
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // 3. Tab visibility listener
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // 4. Section IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: [0, 0.25, 0.5] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 5. Filter deals by active category
  const validDeals = useMemo(() => {
    return deals
      .map((o) => ({ offer: o, product: getProductById(o.productId) }))
      .filter((item): item is { offer: Offer; product: Product } => Boolean(item.product));
  }, [deals]);

  const filteredDeals = useMemo(() => {
    if (selectedCategory === "all") return validDeals;
    return validDeals.filter(({ product }) => product.department === selectedCategory);
  }, [validDeals, selectedCategory]);

  // 6. Update prev/next scrollability bounds
  const updateScrollBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 6);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    updateScrollBounds();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollBounds, { passive: true });
    window.addEventListener("resize", updateScrollBounds);
    return () => {
      el.removeEventListener("scroll", updateScrollBounds);
      window.removeEventListener("resize", updateScrollBounds);
    };
  }, [filteredDeals.length, updateScrollBounds]);

  // 7. Step scroll handler (Prev / Next by one card)
  const handleScrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;

    // Pause autoplay for 6 seconds on interaction
    setIsInteracting(true);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 6000);

    const firstCard = el.querySelector(".deal-card-wrapper") as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth : 280;
    const gap = window.innerWidth >= 1024 ? 24 : window.innerWidth >= 768 ? 20 : 16;
    const scrollAmount = cardWidth + gap;

    el.scrollBy({
      left: direction * scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // 8. Category change handler (resets scroll to start)
  const handleCategoryChange = (catId: "all" | Product["department"]) => {
    if (catId === selectedCategory) return;
    setSelectedCategory(catId);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  // 9. Restrained, gentle periodic auto-advance (every 5 seconds, pauses on hover, focus, reduced-motion, etc.)
  useEffect(() => {
    if (
      prefersReducedMotion ||
      isPaused ||
      isHovered ||
      isInteracting ||
      !isSectionVisible ||
      !isTabVisible ||
      filteredDeals.length <= 4
    ) {
      return;
    }

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollLeft + clientWidth >= scrollWidth - 12) {
        // Reached end, loop back smoothly to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstCard = el.querySelector(".deal-card-wrapper") as HTMLElement | null;
        const cardWidth = firstCard ? firstCard.offsetWidth : 280;
        const gap = window.innerWidth >= 1024 ? 24 : window.innerWidth >= 768 ? 20 : 16;
        el.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [
    prefersReducedMotion,
    isPaused,
    isHovered,
    isInteracting,
    isSectionVisible,
    isTabVisible,
    filteredDeals.length,
  ]);

  if (filteredDeals.length === 0) return null;

  return (
    <section
      id="deals"
      ref={sectionRef}
      role="region"
      aria-label="Deals ending soon"
      className={cn(
        "snap-section relative w-full flex flex-col justify-center overflow-hidden bg-bg my-8 lg:my-0 lg:min-h-[var(--section-h,calc(100svh-var(--header-h,72px)))]",
        className
      )}
      style={{
        paddingTop: "clamp(16px, 2.5vh, 36px)",
        paddingBottom: "clamp(16px, 2.5vh, 36px)",
      }}
    >
      {/* 1. Header Row & Category Filters inside standard 1280px content container */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-text sm:text-xs">
              HURRY — LIMITED STOCK
            </p>
            <h2 className="mt-0.5 font-display text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
              Deals <span className="text-primary">ending soon</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              High-discount offers across fresh groceries, fashion, electronics and beauty.
            </p>
          </div>

          {/* Controls: "See all deals →", Pause/Play, Prev, Next */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <Link
              href="/deals"
              className="text-xs sm:text-sm font-bold text-primary transition hover:underline py-1.5 mr-1 sm:mr-2"
            >
              See all deals →
            </Link>

            {!prefersReducedMotion && filteredDeals.length > 4 && (
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-pressed={isPaused}
                aria-label={isPaused ? "Play deals carousel" : "Pause deals carousel"}
                className={cn(
                  "grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line/80 transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
                  isPaused && "bg-primary text-white ring-primary"
                )}
              >
                {isPaused ? (
                  <Play className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <Pause className="h-3.5 w-3.5 fill-current" />
                )}
              </button>
            )}

            {/* Prev Arrow */}
            <button
              type="button"
              aria-label="Previous deal"
              disabled={!canScrollPrev}
              onClick={() => handleScrollByCard(-1)}
              className={cn(
                "grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line/80 transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
                !canScrollPrev &&
                  "opacity-35 cursor-not-allowed hover:bg-white hover:text-ink ring-line/40"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              aria-label="Next deal"
              disabled={!canScrollNext}
              onClick={() => handleScrollByCard(1)}
              className={cn(
                "grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-line/80 transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-primary cursor-pointer",
                !canScrollNext &&
                  "opacity-35 cursor-not-allowed hover:bg-white hover:text-ink ring-line/40"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="no-scrollbar mt-3 sm:mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORY_CHIPS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition border cursor-pointer focus-visible:outline-2 focus-visible:outline-primary min-h-[36px]",
                  isActive
                    ? "text-white shadow-xs"
                    : "bg-white text-ink/80 border-line hover:border-ink/30 hover:bg-neutral-50"
                )}
                style={
                  isActive
                    ? { backgroundColor: cat.color, borderColor: cat.color }
                    : undefined
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Responsive Carousel Track inside 1280px Container */}
      <div
        className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 mt-3 sm:mt-4"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onTouchStart={() => {
          setIsInteracting(true);
          if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
        }}
        onTouchEnd={() => {
          interactionTimerRef.current = setTimeout(() => {
            setIsInteracting(false);
          }, 6000);
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth py-1.5"
        >
          {filteredDeals.map(({ offer, product }, idx) => (
            <DealCard
              key={`deal-${offer.id}-${product.id}`}
              offer={offer}
              product={product}
              nowMs={nowMs}
              eager={idx < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
