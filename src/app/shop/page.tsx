"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  BadgePercent,
  Truck,
  Banknote,
  Sparkles,
  Leaf,
  RotateCcw,
  Gift,
  ShieldCheck,
  BadgeCheck,
  Check,
  CalendarClock,
  Milk,
} from "lucide-react";
import { SnapPage, SnapSection, FooterSection, Reveal } from "@/components/sections/Snap";
import { ScooterScene } from "@/components/home/ScooterScene";
import { DealsStrip } from "@/components/home/DealsStrip";
import { DepartmentSpotlightSection } from "@/components/home/DepartmentSpotlight";
import { CardRow } from "@/components/product/CardRow";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductArt } from "@/components/product/ProductArt";
import { DEPT_ICON } from "@/components/layout/Header";
import { SectionHeading, LinkButton, btn, toast, Pill } from "@/components/ui/primitives";
import { departments, homeQuickChips, membershipPlans, whyHyperMart } from "@/mocks";
import { productsInCity, offersFor, heroSlidesFor, getProductById } from "@/lib/catalog";
import { getDeliveryPromise } from "@/lib/delivery";
import { formatDay } from "@/lib/format";
import { useNow, useShopper } from "@/lib/hooks";
import { useMember } from "@/store";
import { cn } from "@/lib/cn";

const ICONS = { Leaf, BadgePercent, RotateCcw, Sparkles, BadgeCheck, Truck, Store: ShieldCheck };

export default function HomePage() {
  const { cityId, warehouseId, city, area, isMember } = useShopper();
  const now = useNow();
  const slides = heroSlidesFor(cityId);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const deals = offersFor(cityId, now)
    .filter((o) => o.type === "deal")
    .sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));

  const food = getProductById("p-food-001")!,
    gadget = getProductById("p-fash-001")!;
  const fresh = getDeliveryPromise(food, area, new Date(now));
  const other = getDeliveryPromise(gadget, area, new Date(now));
  const plan = membershipPlans[0];
  const setMember = useMember((s) => s.setMember);

  return (
    <SnapPage>
      {/* S1 — Hero (#home) */}
      <SnapSection id="home" title="Welcome" tone="bg" inner="gap-3 sm:gap-4">
        <div className="grid min-h-0 flex-1 overflow-hidden rounded-4xl bg-primary shadow-pop lg:grid-cols-[1.05fr_1fr]">
          <div className="relative flex flex-col justify-center gap-3 p-5 sm:gap-4 sm:p-8 lg:p-10">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
              <defs>
                <pattern id="leaf" width="64" height="64" patternUnits="userSpaceOnUse">
                  <path d="M10 40c0-16 12-28 28-28 0 16-12 28-28 28zM10 40l16-16" fill="none" stroke="#fff" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#leaf)" />
            </svg>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                {slides[slide]?.eyebrow ?? "Fresh every day"} · {city.name}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(28px,7vw,32px)] font-extrabold leading-[1.1] text-white sm:text-5xl xl:text-[56px] line-clamp-3">
                Fresh food, fashion, electronics <span className="text-accent">and beauty.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hidden max-w-lg text-sm text-white/80 sm:block sm:text-base">
                Delivered to your door by our own team across Coimbatore, Chennai, Bengaluru and Kochi.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col sm:flex-row w-full gap-2.5 sm:gap-3">
              <LinkButton href="/category" variant="accent" size="lg" className="w-full sm:w-auto justify-center">
                Shop now <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/deals" variant="white" size="lg" className="w-full sm:w-auto justify-center">
                Today’s deals
              </LinkButton>
            </Reveal>
            <Reveal delay={0.2} className="grid grid-cols-2 gap-2.5 pt-2 md:grid-cols-4">
              {[
                [BadgePercent, "Member prices"],
                [Truck, "Delivered by our team"],
                [Banknote, "Cash on delivery"],
                [Sparkles, "New offers weekly"],
              ].map(([Icon, t]) => {
                const I = Icon as typeof Truck;
                return (
                  <div key={t as string} className="flex items-center gap-2 text-xs font-semibold leading-tight text-white/90">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full ring-2 ring-accent/70">
                      <I className="h-4 w-4 text-accent" />
                    </span>
                    {t as string}
                  </div>
                );
              })}
            </Reveal>
          </div>
          <div className="relative w-full aspect-[16/10] min-h-0 p-2 sm:p-3 lg:aspect-auto lg:h-auto lg:p-4">
            <ScooterScene caption={fresh.type === "today" ? `Fresh delivery today in ${city.name}` : `Delivering to ${area.area || city.name}`} />
          </div>
        </div>

        {/* Delivery promise & quick category navigation */}
        <div className="flex flex-col gap-3 rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-4 shadow-card ring-1 ring-line/60 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-tint text-primary">
              <Truck className="h-5 w-5" />
            </span>
            <p className="text-xs leading-snug text-muted sm:text-sm">
              Delivering to <strong className="text-ink">{area.pincode} · {area.area || city.name}</strong> — fresh items{" "}
              <strong className="text-primary">{fresh.type === "today" ? "today" : formatDay(fresh.date!)}</strong>, others by{" "}
              <strong className="text-ink">{other.date ? formatDay(other.date) : "tomorrow"}</strong>.
            </p>
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            {homeQuickChips.map((c) => {
              const I = ({ Leaf, BadgePercent, RotateCcw, Sparkles } as Record<string, typeof Leaf>)[c.icon] ?? Leaf;
              return (
                <Link
                  key={c.label}
                  href={c.href === "/search?sort=new" ? "/new-arrivals" : c.href}
                  className="inline-flex h-8 sm:h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-3.5 text-xs sm:text-sm font-semibold text-primary ring-1 ring-primary/15 transition hover:bg-primary-tint"
                >
                  <I className="h-4 w-4" />
                  {c.label}
                </Link>
              );
            })}
            <span className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-muted pl-3 border-l border-line 2xl:flex whitespace-nowrap">
              <Check className="h-4 w-4 text-primary" />
              Free delivery above ₹499 · members above ₹199
            </span>
          </div>
        </div>
      </SnapSection>

      {/* S2 — Departments (#departments) */}
      <DepartmentSpotlightSection />

      {/* S3 — Deals ending soon (#deals) */}
      {deals.length > 0 && <DealsStrip deals={deals} />}

      {/* S4 — Rewards & subscriptions (#rewards) */}
      <SnapSection id="rewards" title="Rewards and subscriptions" tone="white" inner="gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-4xl bg-primary p-6 text-white shadow-pop sm:p-8">
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/20" />
              <Pill tone="lime" icon={<Gift className="h-3.5 w-3.5" />}>
                HyperMart Rewards
              </Pill>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Member prices on <span className="text-accent">everyday favourites</span>
              </h2>
              <p className="text-sm text-white/80">
                ₹{plan.priceYearly} a year · first {plan.trialDays} days free
              </p>
              <ul className="hidden gap-1.5 text-sm sm:grid sm:grid-cols-2">
                {plan.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                {isMember ? (
                  <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 font-bold">
                    <BadgeCheck className="h-5 w-5 text-accent" />
                    You’re a member
                  </span>
                ) : (
                  <button
                    className={btn("accent", "lg")}
                    onClick={() => {
                      setMember(true);
                      toast("You're now a member (demo)");
                    }}
                  >
                    Join Rewards <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col gap-3 rounded-4xl bg-accent-tint p-6 sm:p-8">
              <Pill tone="dark" icon={<CalendarClock className="h-3.5 w-3.5" />}>
                Subscribe and save
              </Pill>
              <h2 className="text-2xl font-extrabold text-accent-text sm:text-3xl">
                Milk, eggs and veggies on your schedule
              </h2>
              <p className="text-sm text-accent-text/80">Pause or skip any day before 10 PM. Pay only for delivered days.</p>
              <div className="hidden gap-3 sm:flex">
                {["p-food-003", "p-food-006", "p-food-001"].map((id) => (
                  <ProductArt
                    key={id}
                    product={getProductById(id)!}
                    className="h-[clamp(56px,11svh,96px)] w-[clamp(56px,11svh,96px)] rounded-2xl ring-4 ring-white"
                  />
                ))}
              </div>
              <div className="mt-auto pt-2">
                <LinkButton href="/product/amul-toned-milk-1l" size="lg">
                  <Milk className="h-4 w-4" />
                  Start a subscription
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
        {/* Promise strip: 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 gap-2.5 rounded-3xl bg-primary-tint p-3 sm:p-4 lg:grid-cols-4 lg:gap-3">
          {whyHyperMart.map((w) => {
            const I = (ICONS as Record<string, typeof Leaf>)[w.icon] ?? BadgeCheck;
            return (
              <div key={w.title} className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-text">
                  <I className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{w.title}</p>
                  <p className="line-clamp-2 text-xs text-muted">{w.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SnapSection>

      {/* S6 — Footer (#footer) */}
      <FooterSection />
    </SnapPage>
  );
}
