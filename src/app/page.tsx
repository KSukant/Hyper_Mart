"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Headphones,
  ArrowRight,
  Users,
  Package,
  Star,
  Leaf,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PORTAL_REGISTRY } from "@/config/portals";
import { PortalCard } from "@/components/landing/PortalCard";

export default function UnifiedLandingPage() {
  const shouldReduceMotion = useReducedMotion();

  // Split portals by row from configuration registry
  const row1Portals = PORTAL_REGISTRY.filter((p) => p.row === 1);
  const row2Portals = PORTAL_REGISTRY.filter((p) => p.row === 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="h-screen w-full bg-[#F4F6F2] text-[#19271E] font-sans selection:bg-[#C6F04A] selection:text-[#053221] flex flex-col justify-between overflow-hidden relative">
      {/* ── 1. Top Unified Header (Compact, spans across full width) ── */}
      <header className="relative z-30 w-full px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between border-b border-black/5 bg-white/70 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none flex-shrink-0">
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0B5132] flex items-center justify-center text-[#C6F04A] shadow-2xs">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#0B5132] leading-none block">
              HyperMart
            </span>
            <span className="text-[9px] font-bold text-[#55735F] tracking-wide block mt-0.5">
              Good Products. Greater Living.
            </span>
          </div>
        </div>

        {/* Center: Brand Navigation Pillars */}
        <nav className="hidden md:flex items-center gap-3 text-xs font-semibold text-[#486352]">
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
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/help"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#486352] hover:text-[#0B5132] transition"
          >
            <Headphones className="w-3.5 h-3.5 text-[#0B5132]" />
            <span>Need help?</span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0B5132]/30 bg-white text-xs font-bold text-[#0B5132] hover:bg-[#0B5132] hover:text-white transition-all shadow-2xs"
          >
            <span>Employee login</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* ── 2. Main Two-Zone Viewport Canvas (Zero scroll, full height) ── */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col lg:flex-row items-stretch overflow-hidden">
        {/* ── LEFT: Retail Hero Environment (~40% on Desktop) ── */}
        <section
          aria-label="HyperMart Brand Experience"
          className="relative w-full lg:w-[41%] xl:w-[39%] flex-shrink-0 flex flex-col justify-between p-4 sm:p-6 lg:p-7 z-10 overflow-hidden"
        >
          {/* Background Supermarket Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/landing/hero-store.jpg')",
            }}
          >
            {/* Scrim Gradients for contrast and realistic depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />
          </div>

          {/* Hero Content Overlaid on Left */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 my-auto pt-2 max-w-sm"
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[9.5px] sm:text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-xs">
              WELCOME TO HYPERMART
            </span>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-white leading-[1.08] tracking-tight mt-2.5 drop-shadow-sm">
              One Platform.<br />
              Every <span className="text-[#22C55E]">Possibility.</span>
            </h1>

            <div className="w-10 h-1 rounded-full bg-[#22C55E] mt-2 mb-2.5" />

            <p className="text-white/90 text-xs sm:text-[12.5px] font-normal leading-relaxed max-w-sm drop-shadow-xs">
              From everyday shopping to enterprise operations, HyperMart connects customers, teams and technology for a better tomorrow.
            </p>
          </motion.div>

          {/* Glass Statistics Panel at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm rounded-2xl bg-[#062A1A]/85 backdrop-blur-md border border-white/15 p-3.5 text-white shadow-xl space-y-2 mt-auto flex-shrink-0"
          >
            <p className="text-xs font-bold text-white/95 leading-snug">
              A connected retail ecosystem for customers, teams and operations.
            </p>

            {/* Slider Dash Indicators */}
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-1 rounded-full bg-[#22C55E]" />
              <span className="w-3 h-1 rounded-full bg-white/30" />
              <span className="w-3 h-1 rounded-full bg-white/30" />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[11px] text-[#A7D1BA]">
                  <Users className="w-3 h-3 text-[#22C55E]" />
                  <span className="font-mono font-black text-sm text-white">
                    10M+
                  </span>
                </div>
                <span className="text-[9.5px] text-white/70 block leading-tight">
                  Happy Customers
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[11px] text-[#A7D1BA]">
                  <Package className="w-3 h-3 text-[#22C55E]" />
                  <span className="font-mono font-black text-sm text-white">
                    500K+
                  </span>
                </div>
                <span className="text-[9.5px] text-white/70 block leading-tight">
                  Products Delivered
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-[11px] text-[#A7D1BA]">
                  <Star className="w-3 h-3 text-[#22C55E] fill-[#22C55E]" />
                  <span className="font-mono font-black text-sm text-white">
                    98%
                  </span>
                </div>
                <span className="text-[9.5px] text-white/70 block leading-tight">
                  Service Satisfaction
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── RIGHT: Unified Workspace Selection Gateway (~60% on Desktop) ── */}
        <section
          aria-label="Unified Workspace Selection"
          className="relative flex-1 min-h-0 bg-[#F4F6F2] p-4 sm:p-5 lg:p-6 flex flex-col justify-between z-20 overflow-hidden"
        >
          {/* Organic Wave Transition SVG on Left Edge (Desktop Only) */}
          <div
            className="hidden lg:block absolute inset-y-0 -left-[80px] w-[82px] pointer-events-none overflow-visible z-20"
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
          <div className="w-full max-w-[1100px] mx-auto flex flex-col justify-between h-full space-y-2.5">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E5EFE7] border border-[#CBDDCE] text-[9.5px] font-black uppercase tracking-widest text-[#0B5132]">
                CHOOSE YOUR WORKSPACE
              </span>

              {/* Headline */}
              <h2 className="font-display text-xl sm:text-2xl lg:text-[28px] font-black tracking-tight text-[#16271E] mt-1 leading-tight">
                Choose your workspace
              </h2>
              <p className="text-[11.5px] sm:text-xs text-[#5B7564] font-medium mt-0.5">
                Select a portal to sign in and continue your journey.
              </p>

              {/* ── 4 Primary Active Portals (Row 1) ── */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 mt-3"
              >
                {row1Portals.map((portal) => (
                  <motion.div key={portal.id} variants={itemVariants}>
                    <PortalCard portal={portal} />
                  </motion.div>
                ))}
              </motion.div>

              {/* ── 3 Secondary Portals (Row 2, including active Operations Manager) ── */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-2.5"
              >
                {row2Portals.map((portal) => (
                  <motion.div key={portal.id} variants={itemVariants}>
                    <PortalCard portal={portal} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Bottom Full-Width Vision Banner ── */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl bg-white border border-[#E1EAE3] p-2.5 sm:p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto flex-shrink-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] border border-[#C5F0DA] flex items-center justify-center text-[#0B5132] shadow-2xs flex-shrink-0">
                  <Leaf className="w-4 h-4 fill-[#0B5132]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#16271E] tracking-tight">
                    People. Products. Possibilities.
                  </h4>
                  <div className="w-10 h-0.5 rounded-full bg-[#20A065] mt-0.5" />
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] font-semibold text-[#5B7564]">
                <span className="text-right leading-tight">
                  Different teams. A shared purpose. <br className="hidden sm:inline" /> A better tomorrow.
                </span>
                <Link
                  href="/shop"
                  className="w-7 h-7 rounded-full bg-[#D7F3E2] text-[#0B5132] hover:bg-[#20A065] hover:text-white transition flex items-center justify-center shadow-2xs flex-shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
