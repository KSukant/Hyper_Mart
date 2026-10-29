"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

/** One row of cards with arrows + "1–5 of 8" counter on the heading line. Never wraps to a second row. */
export function CardRow({ heading, items, perView = { base: 2, sm: 3, lg: 4, xl: 5 }, gap = 16, className, minCard = 0 }: {
  heading?: ReactNode; items: ReactNode[]; perView?: { base: number; sm: number; lg: number; xl: number }; gap?: number; className?: string; minCard?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState(perView.xl);
  const [start, setStart] = useState(0);
  useEffect(() => {
    const calc = () => { const w = window.innerWidth; setView(w >= 1280 ? perView.xl : w >= 1024 ? perView.lg : w >= 640 ? perView.sm : perView.base); };
    calc(); window.addEventListener("resize", calc); return () => window.removeEventListener("resize", calc);
  }, [perView.base, perView.sm, perView.lg, perView.xl]);
  const onScroll = () => { const el = ref.current; if (!el) return; const cardW = el.scrollWidth / Math.max(items.length, 1); setStart(Math.round(el.scrollLeft / cardW)); };
  const scroll = (dir: 1 | -1) => { const el = ref.current; if (!el) return; el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" }); };
  const many = items.length > view;
  const cardWidth = `calc((100% - ${(view - 1) * gap}px) / ${view})`;
  const controls = many && (
    <div className={cn("items-center gap-2", heading ? "hidden sm:flex" : "flex")}>
      <span className="hidden text-xs font-semibold text-muted tabular sm:inline">{start + 1}–{Math.min(start + view, items.length)} of {items.length}</span>
      <button aria-label="Previous" onClick={() => scroll(-1)} disabled={start === 0} className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line transition hover:bg-primary hover:text-white disabled:opacity-35"><ChevronLeft className="h-5 w-5" /></button>
      <button aria-label="Next" onClick={() => scroll(1)} disabled={start + view >= items.length} className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-sm ring-1 ring-line transition hover:bg-primary hover:text-white disabled:opacity-35"><ChevronRight className="h-5 w-5" /></button>
    </div>
  );
  return (
    <div className={cn("min-w-0", className)}>
      {(heading || controls) && <div className="mb-3 flex items-end justify-between gap-4"><div className="min-w-0 flex-1">{heading}</div>{controls}</div>}
      <div ref={ref} onScroll={onScroll} className={cn("no-scrollbar flex snap-x snap-mandatory overflow-x-auto py-1", !many && "justify-center")} style={{ gap }}>
        {items.map((it, i) => (
          <div key={i} className="shrink-0 snap-start" style={{ width: cardWidth, minWidth: minCard || undefined }}>{it}</div>
        ))}
      </div>
    </div>
  );
}
