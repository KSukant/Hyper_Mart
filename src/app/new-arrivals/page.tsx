"use client";
import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { SnapPage, SnapSection, FooterSection, Reveal } from "@/components/sections/Snap";
import { CardRow } from "@/components/product/CardRow";
import { ProductCard, ProductCardCompact } from "@/components/product/ProductCard";
import { ProductArt } from "@/components/product/ProductArt";
import { SectionHeading, Chip, Pill } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments } from "@/mocks";
import { productsInCity } from "@/lib/catalog";
import { useShopper } from "@/lib/hooks";

function NewArrivals() {
  const { warehouseId, city } = useShopper();
  const sp = useSearchParams(); const router = useRouter(); const path = usePathname();
  const d = sp.get("d");
  const fresh = productsInCity(warehouseId).filter((p) => p.isNew);
  const shown = fresh.filter((p) => !d || p.department === d);
  return (
    <SnapPage>
      <SnapSection id="new-all" title="New arrivals" inner="gap-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-primary p-5 text-white sm:p-6">
            <div className="absolute -right-8 -top-10 h-48 w-48 rounded-full bg-accent/20" />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div>
                <Pill tone="lime" icon={<Sparkles className="h-3.5 w-3.5" />}>Just landed</Pill>
                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl [@media(min-height:860px)]:xl:text-5xl">New <span className="text-accent">arrivals</span></h1>
                <p className="mt-1 text-sm text-white/75 sm:text-base phone-short:hidden">Just added in {city.name} · {fresh.length} new products this week</p>
              </div>
              <div className="hidden gap-2 md:flex">{fresh.slice(0, 4).map((p) => <ProductArt key={p.id} product={p} className="h-16 w-16 rounded-2xl ring-4 ring-white/15" />)}</div>
            </div>
          </div>
        </Reveal>
        <CardRow heading={<div className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
          <Chip active={!d} onClick={() => router.replace(path, { scroll: false })}>All</Chip>
          {departments.map((x) => { const I = DEPT_ICON[x.id]; return <Chip key={x.id} active={d === x.id} icon={<I className="h-4 w-4" />} onClick={() => router.replace(`${path}?d=${x.id}`, { scroll: false })}>{x.shortName}</Chip>; })}
</div>} key={d ?? "all"} items={shown.map((p) => <ProductCard key={p.id} product={p} />)} perView={{ base: 2, sm: 3, lg: 4, xl: 5 }} />
      </SnapSection>
      {departments.filter((x) => (!d || d === x.id) && fresh.some((p) => p.department === x.id)).map((x, i) => {
        const items = fresh.filter((p) => p.department === x.id); const I = DEPT_ICON[x.id];
        return (
          <SnapSection key={x.id} id={`new-${x.id}`} title={`New in ${x.name}`} tone={i % 2 ? "bg" : "white"} inner="gap-5">
            <Reveal>
              <div className={`flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-${x.id}-tint px-4 py-3 sm:px-5 sm:py-4`}>
                <div className="flex items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-${x.id} sm:h-12 sm:w-12`}><I className="h-5 w-5 sm:h-6 sm:w-6" /></span>
                  <SectionHeading title={<>New in <span className={`text-${x.id}`}>{x.name}</span></>} subtitle={`${items.length} new ${items.length === 1 ? "product" : "products"} · ${x.deliveryNote}`} /></div>
                <Link href={`/category/${x.id}`} className="hidden items-center gap-1 font-bold text-primary hover:underline sm:inline-flex">Shop {x.shortName} <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </Reveal>
            <CardRow items={items.map((p) => (x.id === "food" ? <ProductCardCompact key={p.id} product={p} /> : <ProductCard key={p.id} product={p} featured />))} perView={x.id === "food" ? { base: 1, sm: 2, lg: 2, xl: 3 } : { base: 2, sm: 2, lg: 3, xl: 3 }} />
          </SnapSection>
        );
      })}
      <FooterSection />
    </SnapPage>
  );
}
export default function Page() { return <Suspense><NewArrivals /></Suspense>; }
