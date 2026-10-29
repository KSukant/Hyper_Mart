"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Gift,
  Check,
  BadgeCheck,
  ArrowRight,
  CalendarClock,
  ShieldCheck,
  Store,
  Truck,
  RotateCcw,
  Milk,
  Sparkles,
} from "lucide-react";
import { ProductArt } from "@/components/product/ProductArt";
import { getProductById } from "@/lib/catalog";
import { membershipPlans } from "@/mocks";
import { useMember } from "@/store";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export function MemberBenefitsSection() {
  const isMember = useMember((s) => s.isMember);
  const setMember = useMember((s) => s.setMember);
  const plan = membershipPlans[0];

  const [activeSub, setActiveSub] = useState<"rewards" | "subscriptions" | "promise">("rewards");

  // Smooth scroll handler with reduced-motion check
  const handleScrollTo = (id: "rewards-card" | "subscriptions-card" | "promise-section") => {
    const el = document.getElementById(id);
    if (!el) return;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.scrollIntoView({
      behavior: isReduced ? "auto" : "smooth",
      block: "nearest",
    });

    if (id === "rewards-card") setActiveSub("rewards");
    else if (id === "subscriptions-card") setActiveSub("subscriptions");
    else if (id === "promise-section") setActiveSub("promise");
  };

  // IntersectionObserver to sync active sub-navbar tab while scrolling
  useEffect(() => {
    const ids = ["rewards-card", "subscriptions-card", "promise-section"] as const;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            if (entry.target.id === "rewards-card") setActiveSub("rewards");
            else if (entry.target.id === "subscriptions-card") setActiveSub("subscriptions");
            else if (entry.target.id === "promise-section") setActiveSub("promise");
          }
        });
      },
      { threshold: [0.35, 0.6] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const sampleProducts = [
    getProductById("p-food-003"), // Amul Taaza / Toned Milk
    getProductById("p-food-006"), // Fresh Farm Eggs
    getProductById("p-food-001"), // Tomatoes
  ].filter(Boolean);

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Quality checked",
      desc: "Fresh items are graded and checked before packing.",
    },
    {
      icon: Store,
      title: "Sold by HyperMart",
      desc: "Every product is sold and invoiced by us directly.",
    },
    {
      icon: Truck,
      title: "Trusted delivery partners",
      desc: "Delivered by verified partners.",
    },
    {
      icon: RotateCcw,
      title: "Clear returns and refunds",
      desc: "Every product shows its applicable return policy before purchase.",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-3.5 sm:gap-4.5">
      {/* ── 1. DEDICATED SECTION NAVBAR (LOCAL) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E2E6E3] bg-white p-2.5 sm:px-4 sm:py-2.5 shadow-xs">
        {/* Section Title & Icon */}
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#064E3B] text-[#A3E635]">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight text-[#064E3B] sm:text-base">
            Member Benefits
          </span>
        </div>

        {/* Local Section Navigation Links */}
        <nav
          aria-label="Member Benefits Section Navigation"
          className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5"
        >
          <button
            type="button"
            onClick={() => handleScrollTo("rewards-card")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
              activeSub === "rewards"
                ? "bg-[#064E3B] text-white shadow-xs"
                : "text-[#5D6862] hover:bg-[#F8F6ED] hover:text-[#17201B]"
            )}
          >
            Rewards
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("subscriptions-card")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
              activeSub === "subscriptions"
                ? "bg-[#064E3B] text-white shadow-xs"
                : "text-[#5D6862] hover:bg-[#F8F6ED] hover:text-[#17201B]"
            )}
          >
            Subscriptions
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("promise-section")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap",
              activeSub === "promise"
                ? "bg-[#064E3B] text-white shadow-xs"
                : "text-[#5D6862] hover:bg-[#F8F6ED] hover:text-[#17201B]"
            )}
          >
            Why HyperMart
          </button>
        </nav>

        {/* Right-aligned Primary Action: Explore Benefits */}
        <Link
          href="/account/rewards"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#064E3B] px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#043327] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#064E3B] whitespace-nowrap"
        >
          <span>Explore Benefits</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#A3E635]" />
        </Link>
      </div>

      {/* ── 2. TWO-COLUMN CARDS GRID (REWARDS & SUBSCRIPTIONS) ── */}
      <div className="grid grid-cols-1 gap-3.5 sm:gap-4.5 lg:grid-cols-2 items-stretch">
        {/* Subsection 1: Member Rewards Card */}
        <div
          id="rewards-card"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-[#064E3B] p-5 sm:p-6 lg:p-7 text-white shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 border border-[#043327]"
        >
          {/* Subtle decorative non-interfering shape in corner */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#A3E635]/10 blur-xl"
            aria-hidden="true"
          />

          <div>
            {/* Label */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A3E635] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#064E3B]">
              <Gift className="h-3.5 w-3.5" /> HyperMart Rewards
            </span>

            {/* Heading */}
            <h3 className="mt-2.5 text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white">
              Member prices on <span className="text-[#A3E635]">everyday favourites</span>
            </h3>

            {/* Price Line */}
            <p className="mt-1.5 text-xs sm:text-sm font-medium text-white/80">
              ₹{plan.priceYearly} per year, with the first {plan.trialDays} days free
            </p>

            {/* 4 Benefits in 2-column grid on desktop, 1-column on mobile */}
            <ul className="mt-3.5 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 text-white/95 sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#064E3B]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Member prices on 2,000+ products</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#064E3B]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Early access to deals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#064E3B]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Free delivery on orders above ₹199</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#064E3B]">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Free gift wrap</span>
              </li>
            </ul>
          </div>

          {/* Primary Action Button */}
          <div className="pt-5">
            {isMember ? (
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white border border-white/15">
                <BadgeCheck className="h-4 w-4 text-[#A3E635]" />
                You’re a member
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMember(true);
                  toast("You're now a member (demo)");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A3E635] px-6 py-2.5 text-sm sm:text-base font-extrabold text-[#064E3B] shadow-md transition hover:bg-[#8fd324] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#A3E635] cursor-pointer"
              >
                <span>Join Rewards</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>

        {/* Subsection 2: Subscription Card */}
        <div
          id="subscriptions-card"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F8F6ED] p-5 sm:p-6 lg:p-7 shadow-card transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 border border-[#E2E6E3]"
        >
          <div>
            {/* Label */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#064E3B]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#064E3B]">
              <CalendarClock className="h-3.5 w-3.5" /> Subscribe and save
            </span>

            {/* Heading */}
            <h3 className="mt-2.5 text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-[#064E3B]">
              Milk, eggs and veggies on your schedule
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-xs sm:text-sm text-[#5D6862] leading-relaxed">
              Pause or skip any day before 10 PM. Pay only for delivered days.
            </p>

            {/* Sample Product Thumbnails */}
            <div className="mt-3.5 flex items-center gap-3">
              {sampleProducts.map((product) => (
                <div
                  key={product!.id}
                  className="group/item relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl border border-[#E2E6E3] bg-white p-1.5 shadow-xs transition hover:scale-105 hover:border-[#064E3B]/40"
                  title={product!.name}
                >
                  <ProductArt
                    product={product!}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
              <span className="text-xs font-medium text-[#5D6862] hidden sm:inline">
                + daily essentials
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-5">
            <Link
              href="/product/amul-toned-milk-1l"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#064E3B] px-6 py-2.5 text-sm sm:text-base font-extrabold text-white shadow-md transition hover:bg-[#043327] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#064E3B]"
            >
              <Milk className="h-4 w-4" />
              <span>Start a subscription</span>
              <ArrowRight className="h-4 w-4 text-[#A3E635]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. THE HYPERMART PROMISE SECTION (FULL-WIDTH 4-ITEM GRID) ── */}
      <div
        id="promise-section"
        className="rounded-2xl sm:rounded-3xl border border-[#E2E6E3] bg-white p-4 sm:p-5 lg:p-6 shadow-xs"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[#E2E6E3]">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 lg:px-4 first:lg:pl-0 last:lg:pr-0"
              >
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#064E3B]/10 text-[#064E3B] ring-1 ring-[#064E3B]/20 shadow-xs">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17201B]">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#5D6862] leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
