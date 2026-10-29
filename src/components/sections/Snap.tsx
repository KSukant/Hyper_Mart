"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { useActiveSection } from "@/lib/active-section";
import { cn } from "@/lib/cn";

export const SECTION_DEFS = [
  { id: "home", label: "Home" },
  { id: "departments", label: "Departments" },
  { id: "deals", label: "Deals" },
  { id: "rewards", label: "Member Benefits" },
  { id: "footer", label: "Footer" },
] as const;

interface Reg {
  id: string;
  title: string;
}

const Ctx = createContext<{ register: (r: Reg) => void; active: string } | null>(null);

export function useSnapRegister(id: string, title: string) {
  const ctx = useContext(Ctx);
  useEffect(() => {
    ctx?.register({ id, title });
  }, [id, title, ctx]);
}

export function SectionDots() {
  const activeId = useActiveSection((s) => s.activeId);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: id === "footer" ? "end" : "start",
    });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Homepage sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3.5 lg:flex"
    >
      {SECTION_DEFS.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <div key={id} className="group relative flex items-center justify-center">
            {/* Tooltip on hover/focus */}
            <span
              role="tooltip"
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-xs font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-within:opacity-100 -translate-x-1 group-hover:translate-x-0 group-focus-within:translate-x-0"
            >
              {label}
            </span>

            {/* Dot Button */}
            <button
              type="button"
              aria-label={`Go to ${label} section`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => handleDotClick(id)}
              className={cn(
                "relative rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 cursor-pointer",
                isActive
                  ? "h-7 w-2.5 bg-primary shadow-sm"
                  : "h-2.5 w-2.5 bg-ink/25 hover:h-3.5 hover:w-2.5 hover:bg-primary/60"
              )}
            />
          </div>
        );
      })}
    </nav>
  );
}

export function SnapPage({ children, dataDomain }: { children: ReactNode; dataDomain?: string }) {
  const activeId = useActiveSection((s) => s.activeId);
  const setActiveId = useActiveSection((s) => s.setActiveId);

  // Track active section with IntersectionObserver (threshold: 0.6)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: [0.55, 0.6, 0.7],
      }
    );

    SECTION_DEFS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveId]);

  // Keyboard navigation: PageUp/PageDown and ArrowUp/ArrowDown when focus is not in an input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isEditable = (document.activeElement as HTMLElement)?.isContentEditable;
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        activeTag === "select" ||
        isEditable
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const currentIdx = SECTION_DEFS.findIndex((s) => s.id === activeId);
        const nextIdx = Math.min(SECTION_DEFS.length - 1, currentIdx + 1);
        const target = SECTION_DEFS[nextIdx];
        if (target && target.id !== activeId) {
          e.preventDefault();
          document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", `#${target.id}`);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        const currentIdx = SECTION_DEFS.findIndex((s) => s.id === activeId);
        const prevIdx = Math.max(0, currentIdx - 1);
        const target = SECTION_DEFS[prevIdx];
        if (target && target.id !== activeId) {
          e.preventDefault();
          document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", `#${target.id}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId]);

  return (
    <Ctx.Provider value={{ register: () => {}, active: activeId }}>
      <div data-domain={dataDomain} className="relative w-full">
        {children}
        <SectionDots />
      </div>
    </Ctx.Provider>
  );
}

const TONES = {
  bg: "bg-bg",
  white: "bg-white",
  green: "bg-primary text-white",
  tint: "bg-primary-soft",
  dark: "bg-primary-dark text-white",
};

export function SnapSection({
  id,
  title,
  tone = "bg",
  children,
  className,
  inner = "",
}: {
  id: string;
  title: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <section
      id={id}
      aria-label={title}
      className={cn("snap-section relative w-full", TONES[tone], className)}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1280px] flex-col justify-center px-4 sm:px-6 lg:px-8 my-auto",
          inner
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <section id="footer" aria-label="Footer" className="snap-section-end relative w-full">
      <Footer />
    </section>
  );
}

/**
 * Fades content up the first time it scrolls into view:
 * Section entrance: opacity 0 to 1 and translateY 16px to 0 over 400ms, once.
 * Content is fully visible without JavaScript (SSR fallback).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
