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
import { HomeHero } from "@/components/home/hero/HomeHero";
import { DealsStrip } from "@/components/home/DealsStrip";
import { ShopByDepartment } from "@/components/home/departments/ShopByDepartment";
import { RewardsAndSubscriptionSection } from "@/components/home/rewards/RewardsAndSubscriptionSection";
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
      {/* S1 — 3D Shopping Bag Hero (#home) */}
      <HomeHero />

      {/* S2 — 3D Department Showcase (#departments) */}
      <ShopByDepartment />

      {/* S3 — Deals ending soon (#deals) */}
      {deals.length > 0 && <DealsStrip deals={deals} />}

      {/* S4 — Rewards, Subscribe & Save and Trust Benefits (#rewards) */}
      <RewardsAndSubscriptionSection />

      {/* S6 — Footer (#footer) */}
      <FooterSection />
    </SnapPage>
  );
}
