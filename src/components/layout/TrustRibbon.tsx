"use client";
import { BadgeCheck, Store, Truck, RotateCcw, ShieldCheck, Sparkles, Leaf, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ProductDomain } from "@/components/pdp/types";

export interface TrustPoint {
  id: string;
  icon: typeof BadgeCheck;
  title: string;
  subtitle: string;
  tag: string;
}

export const HYPERMART_TRUST_POINTS: TrustPoint[] = [
  {
    id: "quality",
    icon: BadgeCheck,
    title: "Quality checked",
    subtitle: "Fresh items are graded and checked before packing.",
    tag: "Grade-tested",
  },
  {
    id: "sold-by",
    icon: Store,
    title: "Sold by HyperMart",
    subtitle: "Every product is sold and invoiced by us directly.",
    tag: "100% Authentic",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Trusted delivery partners",
    subtitle: "Delivered by verified partners, not unknown third-party couriers.",
    tag: "Slot-tracked",
  },
  {
    id: "returns",
    icon: RotateCcw,
    title: "Clear returns and refunds",
    subtitle: "Every product shows its exact return rule before you buy.",
    tag: "Zero-surprise",
  },
];

interface TrustRibbonProps {
  className?: string;
  variant?: "floating" | "banner" | "compact";
  domain?: ProductDomain | "grocery";
}

/**
 * TrustRibbon: Flowing, continuous branded ribbon replacing repeated box cards.
 * Features:
 * - One soft continuous gradient shape (pale green to warm cream)
 * - 4 connected trust nodes along a thin connecting visual path
 * - Alternating vertical rhythm and slightly overlapping circular icon badges
 * - Integrated "Why shop with HyperMart" leaf badge
 * - Domain-aware accent compatibility
 */
export function TrustRibbon({
  className,
  variant = "banner",
  domain = "grocery_fresh",
}: TrustRibbonProps) {
  return (
    <section
      aria-label="HyperMart Trust & Quality Promises"
      className={cn(
        "relative w-full overflow-hidden transition-all duration-300",
        variant === "banner" &&
          "border-y border-line bg-gradient-to-r from-[#EFF6FF] via-[#FFFFFF] to-[#E0F7FA]",
        variant === "floating" &&
          "rounded-3xl border border-line bg-gradient-to-r from-[#EFF6FF] via-[#FFFFFF] to-[#E0F7FA] shadow-sm",
        variant === "compact" && "border-b border-line bg-[#F8FAFC] py-2",
        className
      )}
    >
      {/* Soft organic wavy background SVG */}
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 96"
          fill="none"
        >
          <path
            d="M0 32C240 54 480 16 720 38C960 60 1200 24 1440 42V96H0V32Z"
            fill="url(#trust-flow-grad)"
          />
          <defs>
            <linearGradient id="trust-flow-grad" x1="0" y1="0" x2="1440" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="0.5" stopColor="#2563EB" stopOpacity="0.08" />
              <stop offset="1" stopColor="#EFF6FF" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1360px] px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Continuous Connecting Line Behind Nodes (Desktop) */}
        <div
          className="pointer-events-none absolute left-36 right-12 top-1/2 hidden -translate-y-1/2 lg:block"
          aria-hidden="true"
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Integrated Branded Label on Left */}
          <div className="flex items-center gap-2 shrink-0 pr-4 lg:border-r lg:border-line">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div className="leading-tight">
              <span className="block text-[10px] font-black uppercase tracking-wider text-primary">
                The HyperMart Promise
              </span>
              <span className="block text-xs font-bold text-ink/70">
                Why shop with us
              </span>
            </div>
          </div>

          {/* 4 Connected Trust Points with Alternating Rhythm */}
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
            {HYPERMART_TRUST_POINTS.map((pt, idx) => {
              const Icon = pt.icon;
              const isShifted = idx % 2 === 1;

              return (
                <div
                  key={pt.id}
                  className={cn(
                    "group relative flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200",
                    "hover:bg-white/85 hover:shadow-xs",
                    isShifted ? "lg:translate-y-0.5" : "lg:-translate-y-0.5"
                  )}
                >
                  {/* Subtle hairline vertical divider */}
                  {idx > 0 && (
                    <div
                      className="pointer-events-none absolute -left-1 top-2 bottom-2 hidden w-[1px] bg-gradient-to-b from-transparent via-line to-transparent lg:block"
                      aria-hidden="true"
                    />
                  )}

                  {/* Circular Icon Badge */}
                  <div className="relative shrink-0">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-xs ring-2 ring-primary/15 transition-transform duration-200 group-hover:scale-110 group-hover:ring-primary/35">
                      <Icon className="h-5 w-5 stroke-[2.2]" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-secondary text-white shadow-xs">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  </div>

                  {/* Text Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[13px] font-bold text-ink transition-colors group-hover:text-primary">
                        {pt.title}
                      </h4>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {pt.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustNode({ point }: { point: TrustPoint }) {
  const Icon = point.icon;
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-primary/20">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-bold text-ink">{point.title}</p>
        <p className="text-xs text-muted">{point.subtitle}</p>
      </div>
    </div>
  );
}
