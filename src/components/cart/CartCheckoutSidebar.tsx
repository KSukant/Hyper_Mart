"use client";

import Link from "next/link";
import { Lock, RotateCcw, ShieldCheck, Shield, ChevronRight } from "lucide-react";
import type { Charges } from "@/lib/delivery";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

interface CartCheckoutSidebarProps {
  charges: Charges;
  itemCount: number;
  domain?: "food" | "fashion" | "beauty" | "electronics" | "all";
  hasWeightItems?: boolean;
  hasInstallation?: boolean;
  installationFee?: number;
}

export function CartCheckoutSidebar({
  charges,
  itemCount,
  domain = "all",
  hasWeightItems = false,
  hasInstallation = false,
  installationFee = 0,
}: CartCheckoutSidebarProps) {
  // Domain-specific policy definitions
  const policies = {
    food: {
      icon: RotateCcw,
      title: "Quality Guarantee & Freshness",
      description: "Report quality issues within 24 hours for instant refund or replacement. Non-returnable once opened.",
      link: "/legal/returns",
    },
    fashion: {
      icon: RotateCcw,
      title: "Easy Returns & Exchanges",
      description: "Hassle-free returns within 7 days. Free size and colour exchanges at your doorstep.",
      link: "/legal/returns",
    },
    beauty: {
      icon: ShieldCheck,
      title: "Sealed Product Guarantee",
      description: "Returnable within 7 days if sealed and unopened. Immediate replacement for damaged items.",
      link: "/legal/returns",
    },
    electronics: {
      icon: Shield,
      title: "Electronics Warranty & Replacement",
      description: "7-day replacement for technical defects. 1-year brand warranty with authorized service.",
      link: "/legal/returns",
    },
    all: {
      icon: RotateCcw,
      title: "Easy Returns & Exchanges",
      description: "Hassle-free returns within 7 days. Tailored domain policies apply per item category.",
      link: "/legal/returns",
    },
  };

  const activePolicy = policies[domain] ?? policies.all;
  const PolicyIcon = activePolicy.icon;

  const taxInclusive = charges.taxInclusive;
  const discountTotal = charges.discount;

  return (
    <aside className="lg:col-span-5 space-y-4">
      <div className="rounded-3xl border border-line/80 bg-white p-6 shadow-xs space-y-5 lg:sticky lg:top-[calc(var(--header-h)+16px)]">
        {/* Header (Exact Match to Reference Screenshot) */}
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Checkout</h2>
          <p className="text-xs text-muted mt-0.5">
            Same simple checkout for everything in your cart.
          </p>
        </div>

        {/* 5-Step Progress Indicator (Address -> Delivery -> Review -> Payment -> Confirmation) */}
        <div className="flex items-center justify-between border-y border-line/60 py-3.5 text-xs font-semibold">
          {/* Step 1: Address (Active) */}
          <div className="flex items-center gap-1.5 font-bold text-ink">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-[10px] font-black text-white">
              1
            </span>
            <span>Address</span>
          </div>
          <span className="h-px flex-1 max-w-[20px] bg-line/80 mx-1" aria-hidden="true" />

          {/* Step 2: Delivery */}
          <div className="flex items-center gap-1 text-muted">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px] font-semibold text-muted">
              2
            </span>
            <span className="hidden sm:inline">Delivery</span>
          </div>
          <span className="h-px flex-1 max-w-[20px] bg-line/80 mx-1" aria-hidden="true" />

          {/* Step 3: Review */}
          <div className="flex items-center gap-1 text-muted">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px] font-semibold text-muted">
              3
            </span>
            <span className="hidden sm:inline">Review</span>
          </div>
          <span className="h-px flex-1 max-w-[20px] bg-line/80 mx-1" aria-hidden="true" />

          {/* Step 4: Payment */}
          <div className="flex items-center gap-1 text-muted">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px] font-semibold text-muted">
              4
            </span>
            <span className="hidden sm:inline">Payment</span>
          </div>
          <span className="h-px flex-1 max-w-[20px] bg-line/80 mx-1" aria-hidden="true" />

          {/* Step 5: Confirmation */}
          <div className="flex items-center gap-1 text-muted">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-line bg-bg text-[10px] font-semibold text-muted">
              5
            </span>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>

        {/* Order Summary Box (Matching Reference Screenshot) */}
        <div className="rounded-2xl border border-line/70 bg-bg p-4.5 space-y-3">
          <h3 className="text-sm font-extrabold text-ink">
            Order Summary ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h3>

          <dl className="space-y-2 text-xs sm:text-sm">
            {/* Product Total */}
            <div className="flex justify-between">
              <dt className="text-muted">Product total</dt>
              <dd className="tabular font-bold text-ink">
                ₹ {charges.itemsTotal.toLocaleString("en-IN")}
              </dd>
            </div>

            {/* Estimated weight adjustment for produce */}
            {hasWeightItems && (
              <div className="flex justify-between text-muted text-xs">
                <dt>Weight adjustment</dt>
                <dd className="tabular font-medium">Billed on packed wt.</dd>
              </div>
            )}

            {/* Delivery Charge */}
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="tabular font-bold text-ink">
                {charges.delivery === 0 ? (
                  <span className="text-success font-bold">Free</span>
                ) : (
                  `₹ ${charges.delivery}`
                )}
              </dd>
            </div>

            {/* Cold Chain Handling */}
            {charges.coldChain > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">Cold-chain delivery</dt>
                <dd className="tabular font-bold text-ink">₹ {charges.coldChain}</dd>
              </div>
            )}

            {/* Heavy-item handling */}
            {charges.heavy > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">Heavy-item handling</dt>
                <dd className="tabular font-bold text-ink">₹ {charges.heavy}</dd>
              </div>
            )}

            {/* Optional installation */}
            {hasInstallation && installationFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">Installation service</dt>
                <dd className="tabular font-bold text-ink">₹ {installationFee}</dd>
              </div>
            )}

            {/* Discounts */}
            {discountTotal > 0 && (
              <div className="flex justify-between text-success">
                <dt>Discount</dt>
                <dd className="tabular font-bold">
                  - ₹ {discountTotal.toLocaleString("en-IN")}
                </dd>
              </div>
            )}

            {/* Member savings */}
            {charges.memberSaving > 0 && (
              <div className="flex justify-between text-success">
                <dt>Member savings (included)</dt>
                <dd className="tabular font-bold">
                  - ₹ {charges.memberSaving.toLocaleString("en-IN")}
                </dd>
              </div>
            )}

            {/* Tax */}
            <div className="flex justify-between text-muted">
              <dt>Tax (inclusive)</dt>
              <dd className="tabular font-medium text-ink">
                ₹ {taxInclusive.toLocaleString("en-IN")}
              </dd>
            </div>

            {/* Final Total */}
            <div className="flex items-baseline justify-between border-t border-line/70 pt-3">
              <dt className="text-base font-extrabold text-ink">Total</dt>
              <dd className="font-display text-2xl font-extrabold text-ink tabular">
                ₹ {charges.total.toLocaleString("en-IN")}
              </dd>
            </div>
          </dl>
        </div>

        {/* Domain-Specific Return / Exchange / Guarantee Card */}
        <div className="rounded-2xl border border-line bg-white p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-ink">
              <PolicyIcon className="h-4 w-4 text-ink shrink-0" />
              <span>{activePolicy.title}</span>
            </div>
            <Link
              href={activePolicy.link}
              className="text-xs font-bold text-muted hover:text-ink flex items-center gap-0.5"
            >
              <span>View policy</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="text-xs text-muted leading-relaxed pl-6">
            {activePolicy.description}
          </p>
        </div>

        {/* Primary Continue to Payment Button & Security */}
        <div className="space-y-3 pt-1">
          <Link
            href="/checkout"
            className={cn(
              "w-full rounded-2xl bg-ink hover:bg-black text-white font-extrabold py-3.5 px-4 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base transition cursor-pointer text-center",
              charges.belowMinimum > 0 && "pointer-events-none opacity-40"
            )}
          >
            <span>Continue to payment</span>
            <span aria-hidden="true">&rsaquo;</span>
          </Link>

          {/* Secure Checkout Notice (Matching Reference Screenshot) */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted text-center pt-1">
            <Lock className="h-3.5 w-3.5" />
            <span>Secure checkout | Your information is safe with us.</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
