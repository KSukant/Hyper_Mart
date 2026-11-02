"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSnapRegister } from "@/components/sections/Snap";
import { BackgroundWaves } from "./BackgroundWaves";
import { FloatingLeaves } from "./FloatingLeaves";
import { DepartmentHeading } from "./DepartmentHeading";
import { DisplayPlatform } from "./DisplayPlatform";
import { GoldenOrbit } from "./GoldenOrbit";
import { DepartmentPanel } from "./DepartmentPanel";
import { SHOWCASE_DEPARTMENTS } from "./types";

export function ShopByDepartment() {
  useSnapRegister("departments", "Shop by department");

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to trigger animation when visible (10% threshold for smooth entrance)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isVisible) return;

    // Trigger immediately if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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
      id="departments"
      ref={sectionRef}
      role="region"
      aria-label="Shop by Department"
      className="snap-section relative w-full overflow-hidden min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[820px] flex flex-col justify-between py-8 sm:py-10 lg:py-12 select-none"
    >
      {/* ── 1. Layered Background Environment & Animated Waves ── */}
      <BackgroundWaves isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />

      {/* ── 2. Floating Leaves (Top-Left, Top-Right, Bottom-Left) ── */}
      <FloatingLeaves isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />

      {/* ── 3. Centered Section Heading (Eyebrow, Title & Underline) ── */}
      <div className="relative z-20 w-full pt-2">
        <DepartmentHeading isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />
      </div>

      {/* ── 4. Main 3D Department Showcase & Platform Stage ── */}
      <div className="relative z-10 w-full max-w-[1380px] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-2 flex items-center justify-center">
        <div className="relative w-full flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px]">
          {/* 4a. Golden Orbit: Back Layer (passes behind panels) */}
          <GoldenOrbit layer="back" isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />

          {/* 4b. Desktop Showcase: Four Connected 3D Panels (Desktop >= 1024px) */}
          <div className="hidden lg:flex w-full items-center justify-center gap-3 sm:gap-4 xl:gap-6 relative z-10 max-w-[1280px]">
            {SHOWCASE_DEPARTMENTS.map((dept) => (
              <DepartmentPanel
                key={dept.id}
                dept={dept}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          {/* 4c. Mobile / Tablet Layout: 2x2 Responsive Grid (< 1024px) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[640px] lg:hidden relative z-10 px-2">
            {SHOWCASE_DEPARTMENTS.map((dept) => (
              <DepartmentPanel
                key={`mob-${dept.id}`}
                dept={dept}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          {/* 4d. Shared Illuminated 3D Display Platform */}
          <DisplayPlatform isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />

          {/* 4e. Golden Orbit: Front Layer & Traveling Particle (passes in front of platform) */}
          <GoldenOrbit layer="front" isVisible={isVisible} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}

