"use client";
import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, PackageSearch, RotateCcw } from "lucide-react";
import { SnapPage, SnapSection, FooterSection, Reveal } from "@/components/sections/Snap";
import { SectionHeading, Pill } from "@/components/ui/primitives";
import { ProductArt } from "@/components/product/ProductArt";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments, trustStrip } from "@/mocks";
import { productsInCity, topCategories } from "@/lib/catalog";
import { useShopper } from "@/lib/hooks";

const TRUST = { ShieldCheck, PackageSearch, RotateCcw } as Record<string, typeof Truck>;

export default function CategoryHub() {
  const { warehouseId, city } = useShopper();
  return (
    <SnapPage>
      <SnapSection id="all-categories" title="Shop by category" inner="gap-5">
        <Reveal><SectionHeading eyebrow={`Delivered across ${city.name}`} title={<>Shop by <span className="text-primary">category</span></>} subtitle="Four departments. One cart. Delivered to your door." /></Reveal>
        <div className="grid min-h-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {departments.map((d, i) => {
            const items = productsInCity(warehouseId).filter((p) => p.department === d.id);
            const Icon = DEPT_ICON[d.id];
            return (
              <Reveal key={d.id} delay={i * 0.07}>
                <Link href={`/category/${d.id}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line/60 transition hover:-translate-y-1 hover:shadow-lift">
                  <div className={`relative grid h-[clamp(72px,13svh,150px)] lg:h-[clamp(96px,26svh,260px)] place-items-center bg-${d.id}-tint`}>
                    <div className="grid aspect-[4/1] h-[62%] grid-cols-4 gap-2 lg:aspect-square lg:h-[84%] lg:grid-cols-2 lg:grid-rows-2">
                      {items.slice(0, 4).map((p) => <ProductArt key={p.id} product={p} className="h-full min-h-0 w-full rounded-2xl ring-2 ring-white transition duration-500 group-hover:scale-[1.04]" />)}
                    </div>
                    <span className={`absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-2xl bg-white text-${d.id} shadow-sm`}><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-1.5 sm:p-4">
                    <h3 className="text-base font-extrabold leading-tight sm:text-lg">{d.name}</h3>
                    <p className="line-clamp-2 text-xs text-muted sm:text-sm">{d.tagline}</p>
                    <p className="hidden flex-wrap gap-1 lg:flex">{topCategories(d.id).slice(0, 3).map((c) => <Pill key={c.id} tone={d.id}>{c.name}</Pill>)}</p>
                    <p className="hidden items-center gap-1.5 text-xs font-semibold text-primary sm:text-sm md:flex"><Truck className="h-4 w-4" />{d.deliveryNote}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <Pill tone="green">{items.length} items</Pill>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white transition sm:h-9 sm:w-9 group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="hidden grid-cols-3 gap-2 rounded-3xl bg-primary-tint p-3 sm:grid sm:p-4">
          {trustStrip.map((t) => { const I = TRUST[t.icon] ?? ShieldCheck; return (
            <div key={t.title} className="flex items-center justify-center gap-2 text-center text-xs font-bold sm:text-sm"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-text"><I className="h-4 w-4" /></span>{t.title}</div>); })}
        </div>
      </SnapSection>
      <FooterSection />
    </SnapPage>
  );
}
