"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSnapRegister } from "@/components/sections/Snap";
import { RewardsBackground } from "./RewardsBackground";
import { RewardsPanel } from "./RewardsPanel";
import { SubscribePanel } from "./SubscribePanel";
import { TrustBenefitsStrip } from "./TrustBenefitsStrip";

export function RewardsAndSubscriptionSection() {
  useSnapRegister("rewards", "Rewards and subscriptions");

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Strict Viewport Intersection Observer (threshold: 0.1)
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
      id="rewards"
      ref={sectionRef}
      className="snap-section relative w-full overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 min-h-[520px] flex flex-col justify-center"
    >
      {/* ── Background & Ambient Lighting ── */}
      <RewardsBackground
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── Main Master Composition Container ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Region A: Two Promotional Panels Side-by-Side */}
        <div className="flex flex-col lg:flex-row items-stretch gap-5 lg:gap-6">
          {/* Left Panel: HyperMart Rewards */}
          <RewardsPanel
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />

          {/* Right Panel: Subscribe and Save */}
          <SubscribePanel
            isVisible={isVisible}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Region B: 4 Trust Benefits Badges (Image 4 Specification — Home Customer Page Only) */}
        <TrustBenefitsStrip
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}

export default RewardsAndSubscriptionSection;

