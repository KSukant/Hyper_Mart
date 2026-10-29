"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Zap, ArrowRight, Users, Tag } from "lucide-react";
import { SnapPage, SnapSection, FooterSection, Reveal } from "@/components/sections/Snap";
import { CardRow } from "@/components/product/CardRow";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductArt } from "@/components/product/ProductArt";
import { PriceBlock, Countdown, AddToCart } from "@/components/product/parts";
import { SectionHeading, Chip, EmptyState, LinkButton, Pill } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments } from "@/mocks";
import { offersFor, getProductById, brandName } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { useNow, useShopper } from "@/lib/hooks";

function Deals() {
  const { cityId, isMember, city } = useShopper();
  const now = useNow(5000);
  const sp = useSearchParams(); const router = useRouter(); const path = usePathname();
  const d = sp.get("d");
  const deals = offersFor(cityId, now).filter((o) => o.type === "deal");
  const hero = [...deals].sort((a, b) => (a.label === "Deal of the day" ? 0 : 1) - (b.label === "Deal of the day" ? 0 : 1) || b.discountPct - a.discountPct || Date.parse(a.endsAt) - Date.parse(b.endsAt))[0];
  const rest = deals.filter((o) => o.id !== hero?.id && (!d || getProductById(o.productId)?.department === d)).sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
  const p = hero && getProductById(hero.productId)!;
  const info = p && getPrice(p, cityId, isMember, now);
  return (
    <SnapPage>
      <SnapSection id="deal-of-the-day" title="Deal of the day" inner="gap-4">
        {!hero || !p || !info ? (
          <EmptyState icon={<Tag className="h-7 w-7" />} title={`No deals in ${city.name} right now`} action={<LinkButton href="/offers">See offers <ArrowRight className="h-4 w-4" /></LinkButton>} />
        ) : (
          <Reveal>
            <div className="relative grid overflow-hidden rounded-4xl bg-primary text-white shadow-pop md:grid-cols-2">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/15" />
              <div className="relative grid place-items-center p-5 md:p-10">
                <div className="relative w-[min(60%,24svh)] tiny:w-[min(60%,17svh)] md:w-[min(78%,360px,40svh)] md:tiny:w-[min(78%,360px,40svh)]">
                  <div className="absolute inset-0 -z-0 rounded-full bg-accent/25 blur-2xl" />
                  <ProductArt product={p} className="relative aspect-square w-full rounded-[2.5rem] shadow-pop ring-8 ring-white/10" />
                  <span className="anim-tag absolute -right-4 -top-3 grid h-24 w-24 place-items-center rounded-full bg-accent text-center font-display font-extrabold leading-none text-accent-text shadow-pop"><span><span className="text-3xl">{info.discountPct}%</span><br /><span className="text-sm">OFF</span></span></span>
                </div>
              </div>
              <div className="relative flex flex-col justify-center gap-2 p-5 pt-0 sm:gap-3 md:p-10 md:pl-0">
                <Pill tone="lime" icon={<Zap className="h-3.5 w-3.5" />} className="w-fit">{hero.label}</Pill>
                <p className="hidden text-sm text-white/70 sm:block">{brandName(p)}</p>
                <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">{p.name}</h1>
                <PriceBlock info={info} size="lg" light />
                <div><p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/70 tiny:hidden">Ends in</p><Countdown endsAt={hero.endsAt} boxes /></div>
                {hero.claimedCount !== undefined && hero.stockLimit && (
                  <div className="max-w-sm"><div className="h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-accent" style={{ width: `${(hero.claimedCount / hero.stockLimit) * 100}%` }} /></div>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/80"><Users className="h-3.5 w-3.5" />{hero.claimedCount} of {hero.stockLimit} claimed{hero.perCustomerLimit ? ` · Max ${hero.perCustomerLimit} per customer` : ""}</p></div>
                )}
                {hero.conditionNote && <p className="text-sm text-accent">{hero.conditionNote}</p>}
                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="w-52"><AddToCart product={p} variant="accent" size="lg" limit={hero.perCustomerLimit} /></div>
                  <Link href={`/product/${p.slug}`} className="inline-flex h-12 items-center gap-2 rounded-xl px-4 font-semibold text-white ring-1 ring-white/40 hover:bg-white/10">View product <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </SnapSection>
      {hero && (
        <SnapSection id="ending-soon" title="Ending soon" tone="white" inner="gap-4">
          <Reveal><SectionHeading eyebrow="Grab them before they’re gone" title={<>Ending <span className="text-primary">soon</span></>} subtitle={`Deals for ${city.name}, soonest first.`} /></Reveal>
          {rest.length ? <CardRow heading={<div className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
            <Chip active={!d} onClick={() => router.replace(path, { scroll: false })}>All</Chip>
            {departments.map((x) => { const I = DEPT_ICON[x.id]; return <Chip key={x.id} active={d === x.id} icon={<I className="h-4 w-4" />} onClick={() => router.replace(`${path}?d=${x.id}`, { scroll: false })}>{x.shortName}</Chip>; })}
</div>} key={d ?? "all"} items={rest.map((o) => <ProductCard key={o.id} product={getProductById(o.productId)!} showOfferExtras />)} perView={{ base: 2, sm: 3, lg: 4, xl: 4 }} />
            : <EmptyState icon={<Tag className="h-7 w-7" />} title="No other deals here right now" action={<LinkButton href="/offers" variant="secondary">See offers</LinkButton>} />}
        </SnapSection>
      )}
      <FooterSection />
    </SnapPage>
  );
}
export default function Page() { return <Suspense><Deals /></Suspense>; }
