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
    <div className="min-h-screen bg-[#F4F6F2] text-[#19271E] font-sans selection:bg-[#C6F04A] selection:text-[#053221] flex flex-col justify-between relative overflow-x-hidden">
      {/* ── 1. Top Unified Header (Spans across entire viewport) ── */}
      <header className="relative z-30 w-full px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between border-b border-black/5 bg-white/90 backdrop-blur-md shadow-2xs">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0B5132] flex items-center justify-center text-[#C6F04A] shadow-xs">
            <ShoppingCart className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-[#0B5132] leading-none block">
              HyperMart
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-bold text-[#55735F] tracking-wide block mt-0.5">
              Good Products. Greater Living.
            </span>
          </div>
        </div>

        {/* Center: Brand Navigation Pillars */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-[#486352]">
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
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          <Link
            href="/help"
            className="flex items-center gap-1.5 text-xs font-bold text-[#486352] hover:text-[#0B5132] transition"
          >
            <Headphones className="w-3.5 h-3.5 text-[#0B5132]" />
            <span>Need help?</span>
          </Link>
        </div>
      </header>

      {/* ── 2. Main Two-Zone Continuous Composition ── */}
      <main className="relative flex-1 w-full flex flex-col lg:flex-row items-stretch">
        {/* ── LEFT: Retail Hero Environment (~40% on Desktop) ── */}
        <section
          aria-label="HyperMart Brand Experience"
          className="relative w-full lg:w-[42%] xl:w-[40%] flex-shrink-0 flex flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-[560px] lg:min-h-[calc(100vh-76px)] z-10"
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
          <div className="relative z-10 my-auto pt-6 lg:pt-8 max-w-lg">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/25 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-xs">
              WELCOME TO HYPERMART
            </span>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] text-white leading-[1.08] tracking-tight mt-3 sm:mt-4 drop-shadow-md">
              One Platform.<br />
              Every <span className="text-[#22C55E]">Possibility.</span>
            </h1>

            <div className="w-12 h-1 rounded-full bg-[#22C55E] mt-3 sm:mt-4 mb-3 sm:mb-4" />

            <p className="text-white/95 text-xs sm:text-sm lg:text-[14px] font-normal leading-relaxed max-w-md drop-shadow-sm">
              From everyday shopping to enterprise operations, HyperMart connects customers, teams and technology for a better tomorrow.
            </p>
          </div>

          {/* Interactive Animated Glass Statistics Carousel at Bottom */}
          <EcosystemStatsCarousel />
        </section>

        {/* ── RIGHT: Unified Workspace Selection Gateway (~60% on Desktop) ── */}
        <section
          aria-label="Unified Workspace Selection"
          className="relative flex-1 bg-[#F4F6F2] p-5 sm:p-8 lg:p-10 flex flex-col justify-between z-20"
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
          <div className="w-full max-w-[1100px] mx-auto flex flex-col justify-center my-auto space-y-5">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#E5EFE7] border border-[#CBDDCE] text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0B5132]">
                CHOOSE YOUR WORKSPACE
              </span>

              {/* Headline */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight text-[#16271E] mt-1.5 leading-tight">
                Choose your workspace
              </h2>
              <p className="text-xs sm:text-sm text-[#5B7564] font-medium mt-0.5">
                Select a portal to sign in and continue your journey.
              </p>

              {/* ── 4 Primary Active Portals (Row 1) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-4 sm:mt-5">
                {row1Portals.map((portal) => (
                  <div key={portal.id}>
                    <PortalCard portal={portal} />
                  </div>
                ))}
              </div>

              {/* ── 3 Secondary Portals (Row 2, including active Operations Manager) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5">
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
