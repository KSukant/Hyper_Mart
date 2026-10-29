"use client";
import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, SearchX, X } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { ProductCard } from "@/components/product/ProductCard";
import { Chip, EmptyState, LinkButton, Dialog, btn } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments } from "@/mocks";
import { searchProducts, type SortKey } from "@/lib/search";
import { brandName, getStock } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { useNow, useShopper } from "@/lib/hooks";
import type { Department, Product } from "@/types";
import { cn } from "@/lib/cn";

const SORTS: { v: SortKey; l: string }[] = [{ v: "relevance", l: "Relevance" }, { v: "price_asc", l: "Price: low to high" }, { v: "price_desc", l: "Price: high to low" }, { v: "rating", l: "Top rated" }, { v: "new", l: "Newest" }];
const PRICES = [{ v: "lt500", l: "Under ₹500", t: (x: number) => x < 500 }, { v: "500to5k", l: "₹500 – ₹5,000", t: (x: number) => x >= 500 && x <= 5000 }, { v: "gt5k", l: "Above ₹5,000", t: (x: number) => x > 5000 }];

function SearchView() {
  const sp = useSearchParams(); const router = useRouter();
  const { warehouseId, cityId, isMember, city } = useShopper();
  const now = useNow();
  const q = sp.get("q") ?? ""; const dept = (sp.get("department") ?? "") as Department | "";
  const sort = (sp.get("sort") ?? "relevance") as SortKey; const brand = sp.get("brand"); const price = sp.get("price");
  const inStock = sp.get("stock") === "1"; const memberOnly = sp.get("member") === "1";
  const [shown, setShown] = useState(20); const [sheet, setSheet] = useState(false);
  const set = (k: string, v: string | null) => { const n = new URLSearchParams(sp.toString()); if (v) n.set(k, v); else n.delete(k); router.replace(`/search?${n}`, { scroll: false }); };
  const tooShort = q.trim().length === 1;
  const { results, elsewhere } = useMemo(() => searchProducts(tooShort ? "" : q, warehouseId, { department: dept }), [q, warehouseId, dept, tooShort]);
  const priceOf = (p: Product) => getPrice(p, cityId, isMember, now);
  let list = results.filter((p) => (!brand || brandName(p) === brand) && (!price || PRICES.find((x) => x.v === price)!.t(priceOf(p).finalPrice))
    && (!inStock || getStock(p.id, warehouseId).status !== "out") && (!memberOnly || priceOf(p).memberPrice !== undefined));
  if (sort === "price_asc") list = [...list].sort((a, b) => priceOf(a).finalPrice - priceOf(b).finalPrice);
  if (sort === "price_desc") list = [...list].sort((a, b) => priceOf(b).finalPrice - priceOf(a).finalPrice);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  if (sort === "new") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  const brands = [...new Set(results.map(brandName))].sort();

  const filters = (
    <div className="space-y-6">
      <div><h3 className="mb-2 text-sm font-bold">Brand</h3><div className="flex flex-wrap gap-2">{brands.map((b) => <Chip key={b} active={brand === b} onClick={() => set("brand", brand === b ? null : b)} className="h-8 px-3 text-xs">{b}</Chip>)}</div></div>
      <div><h3 className="mb-2 text-sm font-bold">Price</h3><div className="space-y-1">{PRICES.map((x) => <label key={x.v} className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="price" checked={price === x.v} onChange={() => set("price", x.v)} className="accent-primary" />{x.l}</label>)}{price && <button className="text-xs font-semibold text-primary" onClick={() => set("price", null)}>Clear price</button>}</div></div>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={inStock} onChange={(e) => set("stock", e.target.checked ? "1" : null)} className="h-4 w-4 accent-primary" />In stock only</label>
      <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={memberOnly} onChange={(e) => set("member", e.target.checked ? "1" : null)} className="h-4 w-4 accent-primary" />Member prices only</label>
    </div>
  );

  return (
    <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{q ? <>{list.length} results for “<span className="text-primary">{q}</span>”</> : `All products in ${city.name}`}</h1>
          {tooShort && <p className="text-sm text-muted">Type at least 2 letters to search.</p>}
          {q && !tooShort && <p className="text-sm text-muted">in {city.name}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button className={btn("secondary", "md", "lg:hidden")} onClick={() => setSheet(true)}><SlidersHorizontal className="h-4 w-4" />Filters</button>
          <label className="relative"><span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => set("sort", e.target.value === "relevance" ? null : e.target.value)} className="h-11 rounded-xl bg-white px-4 text-sm font-semibold ring-1 ring-line">{SORTS.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}</select></label>
        </div>
      </div>
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        <Chip active={!dept} onClick={() => set("department", null)}>All</Chip>
        {departments.map((d) => { const I = DEPT_ICON[d.id]; return <Chip key={d.id} active={dept === d.id} icon={<I className="h-4 w-4" />} onClick={() => set("department", d.id)}>{d.shortName}</Chip>; })}
        {(brand || price || inStock || memberOnly) && <button className="inline-flex shrink-0 items-center gap-1 px-2 text-sm font-semibold text-primary" onClick={() => router.replace(`/search?${new URLSearchParams({ ...(q ? { q } : {}), ...(dept ? { department: dept } : {}) })}`, { scroll: false })}><X className="h-4 w-4" />Clear filters</button>}
      </div>
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="hidden self-start rounded-3xl bg-white p-5 shadow-card lg:sticky lg:top-[calc(var(--header-h)+16px)] lg:block">{filters}</aside>
        <div>
          {list.length === 0 ? (
            <EmptyState icon={<SearchX className="h-7 w-7" />} title={q ? `No results for “${q}” in ${city.name}` : "Nothing matches these filters"}
              action={<div className="flex flex-wrap justify-center gap-2">{departments.map((d) => <LinkButton key={d.id} href={`/category/${d.id}`} variant="secondary" size="sm">{d.shortName}</LinkButton>)}<LinkButton href="/offers" size="sm">Offers</LinkButton></div>}>
              {elsewhere.length > 0 && <p className="mb-2">Available in other cities: {elsewhere.map((p) => p.name).join(", ")}</p>}
            </EmptyState>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">{list.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}</div>
              {shown < list.length && <div className="mt-6 text-center"><button className={btn("secondary", "lg")} onClick={() => setShown((s) => s + 20)}>Load more</button></div>}
            </>
          )}
        </div>
      </div>
      <Dialog open={sheet} onClose={() => setSheet(false)} title="Filters">{filters}<button className={cn(btn("primary", "lg"), "mt-6 w-full")} onClick={() => setSheet(false)}>Show {list.length} results</button></Dialog>
    </TaskPage>
  );
}
export default function Page() { return <Suspense><SearchView /></Suspense>; }
