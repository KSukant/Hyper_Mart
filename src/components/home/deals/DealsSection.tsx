"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSnapRegister } from "@/components/sections/Snap";
import { DealsBackground } from "./DealsBackground";
import { DealsHeaderAndCountdown } from "./DealsHeaderAndCountdown";
import { DealsCategoryFilters } from "./DealsCategoryFilters";
import { DealsArchShowcase } from "./DealsArchShowcase";
import { DealsServiceStrip } from "./DealsServiceStrip";
import { MASTER_DEALS } from "./dealsData";

export function DealsSection() {
  useSnapRegister("deals", "Deals ending soon");

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Strict Viewport Intersection Observer (threshold 0.1)
  // Ensures animations trigger smoothly as soon as the section enters the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isVisible) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      id="deals"
      ref={sectionRef}
      className="snap-section relative w-full overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 min-h-[640px] flex flex-col justify-between"
    >
      {/* ── Background & Ambient Lighting ── */}
      <DealsBackground
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── Main Master Composition Container ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 xl:gap-10">
          {/* Left Column: Heading, Description, Countdown Box, Shopping Trolley */}
          <DealsHeaderAndCountdown
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Right Column: Category Filter Row + 4 Arch-Shaped Product Showcases */}
          <div className="flex-1 w-full flex flex-col gap-4 sm:gap-5">
            {/* Top Category Filter Bar */}
            <div className="flex justify-start lg:justify-end w-full">
              <DealsCategoryFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>

            {/* 4 Arch Product Showcases */}
            <DealsArchShowcase
              deals={MASTER_DEALS}
              selectedCategory={selectedCategory}
              isVisible={isVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>

        {/* ── Bottom Service-Benefit Strip ── */}
        <DealsServiceStrip
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

