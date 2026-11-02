"use client";

import React from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroHeading } from "./HeroHeading";
import { HeroCTA } from "./HeroCTA";
import { ShoppingBagDisplay } from "./ShoppingBagDisplay";

export function HomeHero() {
  return (
    <section
      id="home"
      role="region"
      aria-label="HyperMart Mega Sale Hero"
      className="snap-section relative w-full overflow-hidden h-[680px] sm:h-[700px] lg:h-[710px] xl:h-[720px] min-h-[620px] max-h-[760px] flex items-center justify-center pt-2 sm:pt-4 pb-[38px] sm:pb-[44px] select-none"
    >
      {/* ── 1. Edge-to-Edge Full-Width Background & Subtle Waves ── */}
      <HeroBackground />

      {/* ── 2. Centered Two-Column Content Container (max-w-[1600px]) ── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-full flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12 h-full">
          {/* Left Column (43% width): Compact Content Group */}
          <div className="w-full lg:w-[43%] flex flex-col justify-center text-left py-2 z-20">
            <HeroHeading />
            <HeroCTA />
          </div>

          {/* Right Column (57% width): 3D Shopping Bag Sculpture */}
          <div className="w-full lg:w-[57%] flex items-center justify-center relative h-full">
            <ShoppingBagDisplay />
          </div>
        </div>
      </div>
    </section>
  );
}
