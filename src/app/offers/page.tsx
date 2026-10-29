"use client";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowRight, BadgePercent, Truck, Tag, Gift, AlarmClock, Shirt } from "lucide-react";
import { SnapPage, SnapSection, FooterSection, Reveal } from "@/components/sections/Snap";
import { CardRow } from "@/components/product/CardRow";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionHeading, Chip, InfoBar, Pill, btn, toast } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments } from "@/mocks";
import { offersFor, getProductById, productsInCity } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { useNow, useShopper } from "@/lib/hooks";
import { useMember } from "@/store";

function Offers() {
  const { cityId, warehouseId, city, isMember } = useShopper();
  const setMember = useMember((s) => s.setMember);
  const now = useNow();
  const sp = useSearchParams(); const router = useRouter(); const path = usePathname();
  const d = sp.get("d");
  const inDept = (pid: string) => !d || getProductById(pid)?.department === d;
  const active = offersFor(cityId, now).filter((o) => inDept(o.productId) && productsInCity(warehouseId).some((p) => p.id === o.productId));
  const memberProducts = useMemo(() => {
    const list = productsInCity(warehouseId).filter((p) => (!d || p.department === d)).map((p) => ({ p, info: getPrice(p, cityId, true, now) }))
      .filter((x) => x.info.memberPrice !== undefined && x.info.memberPrice < getPrice(x.p, cityId, false, now).finalPrice)
      .map((x) => ({ ...x, saving: getPrice(x.p, cityId, false, now).finalPrice - x.info.memberPrice! }));
    return list.sort((a, b) => (b.info.offer?.type === "member" ? 1 : 0) - (a.info.offer?.type === "member" ? 1 : 0) || b.saving - a.saving);
  }, [warehouseId, cityId, d, now]);
  const nearExpiry = active.filter((o) => o.type === "near_expiry");
  const clearance = active.filter((o) => o.type === "clearance");
  const banner = productsInCity(warehouseId).filter((p) => p.memberPrice).slice(0, 3);
  return (
    <SnapPage>
      <SnapSection id="member" title="Member prices" inner="gap-4">
        <Reveal>
          <div className="relative grid overflow-hidden rounded-4xl bg-primary text-white shadow-pop md:grid-cols-[1.3fr_1fr]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden><defs><pattern id="leaf2" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M10 40c0-16 12-28 28-28 0 16-12 28-28 28z" fill="none" stroke="#fff" strokeWidth="2" /></pattern></defs><rect width="100%" height="100%" fill="url(#leaf2)" /></svg>
            <div className="relative flex flex-col gap-2 p-4 sm:p-6 [@media(max-height:800px)]:sm:p-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent phone-short:hidden">Member prices</p>
              <h1 className="font-display text-3xl font-extrabold leading-none sm:text-4xl xl:text-5xl [@media(max-height:800px)]:xl:text-4xl">THIS <span className="text-accent">WEEK</span></h1>
              <p className="text-sm text-white/80 sm:text-base tiny:hidden">Members save on <b className="text-accent">{memberProducts.length} products</b> in {city.name}.</p>
              <div className="flex flex-wrap gap-3">
                <button className={btn("accent", "md")} onClick={() => document.getElementById("member-row")?.scrollIntoView({ behavior: "smooth", block: "nearest" })}>Shop now <ArrowRight className="h-4 w-4" /></button>
                {!isMember && <button className={btn("white", "md")} onClick={() => { setMember(true); toast("You're now a member (demo)"); }}><Gift className="h-4 w-4" />Join Rewards</button>}
              </div>
              <div className="hidden flex-wrap gap-x-6 gap-y-2 pt-1 text-xs font-semibold text-white/85 2xl:flex">
                {[[BadgePercent, "Exclusive member prices"], [Truck, "Free delivery above ₹199"], [Tag, "Top brands for less"], [Gift, "New offers every week"]].map(([I, t]) => { const Icon = I as typeof Tag; return <span key={t as string} className="flex items-center gap-2"><Icon className="h-4 w-4 text-accent" />{t as string}</span>; })}
              </div>
            </div>
            <div className="relative hidden items-center justify-center gap-3 p-4 md:flex short:p-2">
              {banner.map((p, i) => <ProductArt key={p.id} product={p} className={["h-20 w-20 translate-y-3", "h-24 w-24 -translate-y-2", "h-20 w-20 translate-y-4"][i] + " rounded-3xl shadow-pop ring-4 ring-white/20"} />)}
              <span className="anim-tag absolute right-6 top-6 rounded-2xl bg-accent px-4 py-2 text-center font-display text-lg font-extrabold leading-none text-accent-text shadow-pop">UP TO<br /><span className="text-3xl">50%</span> OFF</span>
            </div>
          </div>
        </Reveal>
        <div id="member-row"><CardRow heading={<div className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
          <Chip active={!d} onClick={() => router.replace(path, { scroll: false })}>All offers</Chip>
          {departments.map((x) => { const I = DEPT_ICON[x.id]; return <Chip key={x.id} active={d === x.id} icon={<I className="h-4 w-4" />} onClick={() => router.replace(`${path}?d=${x.id}`, { scroll: false })}>{x.name}</Chip>; })}
</div>} key={d ?? "all"} items={memberProducts.map(({ p }) => <ProductCard key={p.id} product={p} />)} perView={{ base: 2, sm: 3, lg: 4, xl: 5 }} /></div>
      </SnapSection>
      {nearExpiry.length > 0 && (
        <SnapSection id="near-expiry" title="Near-expiry savings" tone="white" inner="gap-4">
          <Reveal><SectionHeading eyebrow="Food and beauty" title={<>Near-expiry <span className="text-primary">savings</span></>} subtitle="Safe to use, short dates, big savings." right={<Pill tone="redSoft" icon={<AlarmClock className="h-3.5 w-3.5" />}>Limited time</Pill>} /></Reveal>
          <InfoBar tone="offer">Check the best-before date before you buy. Near-expiry items can’t be returned unless damaged.</InfoBar>
          <CardRow items={nearExpiry.map((o) => <ProductCard key={o.id} product={getProductById(o.productId)!} showOfferExtras />)} perView={{ base: 2, sm: 2, lg: 3, xl: 4 }} />
        </SnapSection>
      )}
      {clearance.length > 0 && (
        <SnapSection id="clearance" title="Clearance" tone="bg" inner="gap-4">
          <Reveal><SectionHeading eyebrow="Fashion" title={<>End-of-season <span className="text-primary">clearance</span></>} subtitle="Limited sizes · exchange only on clearance items." right={<Pill tone="fashion" icon={<Shirt className="h-3.5 w-3.5" />}>Up to 50% off</Pill>} /></Reveal>
          <CardRow items={clearance.map((o) => <ProductCard key={o.id} product={getProductById(o.productId)!} showOfferExtras />)} perView={{ base: 2, sm: 2, lg: 3, xl: 4 }} />
        </SnapSection>
      )}
      <FooterSection />
    </SnapPage>
  );
}
export default function Page() { return <Suspense><Offers /></Suspense>; }
