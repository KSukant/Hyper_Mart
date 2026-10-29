import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, Hammer, ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { LinkButton } from "@/components/ui/primitives";

/** Normal-scrolling page (search, product, cart, checkout, account) — PROJECT.md §10. */
export function TaskPage({ children, crumbs, wide = true }: { children: ReactNode; crumbs?: { label: string; href?: string }[]; wide?: boolean }) {
  return (
    <>
      <div className={`mx-auto min-h-[calc(100svh-var(--header-h))] pb-16 pt-6 ${wide ? "max-w-[1360px] px-4 sm:px-6 lg:px-8" : "max-w-3xl px-4"}`}>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted sm:text-sm">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                {c.href ? <Link href={c.href} className="hover:text-primary">{c.label}</Link> : <span className="font-semibold text-ink">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {children}
      </div>
      <Footer compact />
    </>
  );
}

export function ComingSoon({ title }: { title: string }) {
  return (
    <TaskPage wide={false}>
      <div className="mt-10 flex flex-col items-center gap-4 rounded-4xl bg-white p-10 text-center shadow-card">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-accent-text"><Hammer className="h-9 w-9" /></span>
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="max-w-md text-muted">This page is being built. Everything else — shopping, cart, checkout and orders — already works.</p>
        <LinkButton href="/" size="lg">Go to Home <ArrowRight className="h-4 w-4" /></LinkButton>
      </div>
    </TaskPage>
  );
}
