"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Headphones,
} from "lucide-react";
import { PORTAL_REGISTRY } from "@/config/portals";
import { PortalCard } from "@/components/landing/PortalCard";
import { EcosystemStatsCarousel } from "@/components/landing/EcosystemStatsCarousel";

export default function UnifiedLandingPage() {
  // Split portals by row from configuration registry
  const row1Portals = PORTAL_REGISTRY.filter((p) => p.row === 1);
  const row2Portals = PORTAL_REGISTRY.filter((p) => p.row === 2);

  return (
    <div className="h-screen w-full bg-[#F4F6F2] text-[#19271E] font-sans selection:bg-[#C6F04A] selection:text-[#053221] flex flex-col justify-between overflow-hidden relative">
      {/* ── 1. Top Unified Header (Spans across entire viewport) ── */}
      <header className="relative z-30 w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between border-b border-black/5 bg-white/90 backdrop-blur-md shadow-2xs flex-shrink-0">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0B5132] flex items-center justify-center text-[#C6F04A] shadow-xs">
            <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#0B5132] leading-none block">
              HyperMart
            </span>
            <span className="text-[9px] sm:text-[9.5px] font-bold text-[#55735F] tracking-wide block mt-0.5">
              Good Products. Greater Living.
            </span>
          </div>
        </div>

        {/* Center: Brand Navigation Pillars */}
        <nav className="hidden lg:flex items-center gap-3.5 text-xs font-semibold text-[#486352]">
          <Link href="/shop" className="hover:text-[#0B5132] transition">
            Shop
          </Link>
          <span className="text-neutral-300">•</span>
          <span className="text-[#0B5132] font-bold">Operate</span>
          <span className="text-neutral-300">•</span>
          <span className="hover:text-[#0B5132] transition">Manage</span>
          <span className="text-neutral-300">•</span>
          <span className="hover:text-[#0B5132] transition">Grow</span>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link
            href="/help"
            className="flex items-center gap-1.5 text-xs font-bold text-[#486352] hover:text-[#0B5132] transition"
          >
            <Headphones className="w-3.5 h-3.5 text-[#0B5132]" />
            <span>Need help?</span>
          </Link>
        </div>
      </header>

      {/* ── 2. Main Two-Zone Continuous Composition (Zero Scroll, Fits 100vh) ── */}
      <main className="relative flex-1 w-full flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* ── LEFT: Retail Hero Environment (~40% on Desktop) ── */}
        <section
          aria-label="HyperMart Brand Experience"
          className="relative w-full lg:w-[40%] xl:w-[38%] flex-shrink-0 flex flex-col justify-between p-4 sm:p-6 lg:p-7 h-full z-10 overflow-hidden"
        >
          {/* Background Supermarket Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/landing/hero-store.jpg')",
            }}
          >
            {/* Scrim Gradients for contrast and realistic depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
          </div>

          {/* Hero Content Overlaid on Left */}
          <div className="relative z-10 my-auto max-w-md pt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/20 border border-white/25 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-xs">
              WELCOME TO HYPERMART
            </span>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] text-white leading-[1.08] tracking-tight mt-2 mb-2 drop-shadow-md">
              One Platform.<br />
              Every <span className="text-[#22C55E]">Possibility.</span>
            </h1>

            <div className="w-10 h-0.5 rounded-full bg-[#22C55E] my-2" />

            <p className="text-white/95 text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed max-w-sm drop-shadow-sm">
              From everyday shopping to enterprise operations, HyperMart connects customers, teams and technology for a better tomorrow.
            </p>
          </div>

          {/* Interactive Animated Glass Statistics Carousel */}
          <EcosystemStatsCarousel className="mt-auto flex-shrink-0" />
        </section>

        {/* ── RIGHT: Unified Workspace Selection Gateway (~60% on Desktop) ── */}
        <section
          aria-label="Unified Workspace Selection"
          className="relative flex-1 bg-[#F4F6F2] px-6 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8 flex flex-col justify-between h-full z-20"
        >
          {/* Organic Wave Transition SVG on Left Edge (Desktop Only) */}
          <div
            className="hidden lg:block absolute inset-y-0 -left-[90px] w-[92px] pointer-events-none overflow-visible z-20"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Soft Translucent Sage Depth Contour Layer */}
              <path
                d="M 40,0 C 85,160 95,300 70,500 C 45,700 40,840 65,1000 L 100,1000 L 100,0 Z"
                fill="#D8E5DC"
                fillOpacity="0.75"
              />
              {/* Primary Cream Workspace Wave with Subtle Ambient Drop Shadow */}
              <path
                d="M 70,0 C 110,160 120,300 95,500 C 70,700 65,840 90,1000 L 100,1000 L 100,0 Z"
                fill="#F4F6F2"
                filter="drop-shadow(-8px 0px 14px rgba(0,0,0,0.12))"
              />
            </svg>
          </div>

          {/* Workspace Content Container */}
          <div className="w-full max-w-[1140px] mx-auto flex flex-col justify-between h-full">
            <div>
              {/* Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-[#16271E] leading-tight">
                Choose your workspace
              </h2>
              <p className="text-xs sm:text-sm text-[#5B7564] font-medium mt-1">
                Select a portal to sign in and continue your journey.
              </p>
            </div>

            <div className="space-y-3.5 sm:space-y-4 my-auto">
              {/* ── 4 Primary Active Portals (Row 1) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
                {row1Portals.map((portal) => (
                  <div key={portal.id}>
                    <PortalCard portal={portal} />
                  </div>
                ))}
              </div>

              {/* ── 3 Secondary Portals (Row 2, including active Operations Manager) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {row2Portals.map((portal) => (
                  <div key={portal.id}>
                    <PortalCard portal={portal} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
