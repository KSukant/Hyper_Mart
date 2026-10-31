"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Package,
  Star,
  Truck,
  Warehouse,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  LucideIcon,
} from "lucide-react";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  fillIcon?: boolean;
}

interface SlideData {
  id: number;
  message: string;
  stats: [StatItem, StatItem, StatItem];
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    message: "A connected retail ecosystem for customers, teams and operations.",
    stats: [
      {
        icon: Users,
        value: "10M+",
        label: "Happy Customers",
      },
      {
        icon: Package,
        value: "500K+",
        label: "Products Delivered",
      },
      {
        icon: Star,
        value: "98%",
        label: "Satisfaction",
        fillIcon: true,
      },
    ],
  },
  {
    id: 1,
    message: "Real-time dispatch, route planning and multi-hub fulfilment.",
    stats: [
      {
        icon: Truck,
        value: "25 min",
        label: "Avg. Delivery",
      },
      {
        icon: Warehouse,
        value: "14 Hubs",
        label: "Active Hubs",
      },
      {
        icon: Zap,
        value: "99.4%",
        label: "On-Time SLA",
      },
    ],
  },
  {
    id: 2,
    message: "Enterprise-grade governance, unified ledger and analytics.",
    stats: [
      {
        icon: ShieldCheck,
        value: "100%",
        label: "Compliance",
      },
      {
        icon: TrendingUp,
        value: "₹250Cr+",
        label: "Annual Volume",
      },
      {
        icon: Clock,
        value: "99.99%",
        label: "Uptime SLA",
      },
    ],
  },
];

const AUTOPLAY_INTERVAL = 3800; // 3.8s continuous rotation

interface EcosystemStatsCarouselProps {
  className?: string;
}

export function EcosystemStatsCarousel({ className = "" }: EcosystemStatsCarouselProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <div
      className={`relative z-10 w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0A3821]/95 via-[#062817]/95 to-[#031B0F]/95 backdrop-blur-xl border-t border-white/25 border-x border-white/15 border-b border-black/40 p-3.5 sm:p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)_inset] space-y-2.5 transition-all duration-300 hover:border-white/30 overflow-hidden ${className}`}
      role="region"
      aria-label="HyperMart Ecosystem Highlights"
    >
      {/* ── Soft Ambient Backlight Glow ── */}
      <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#22C55E]/15 rounded-full blur-2xl pointer-events-none" />

      {/* ── Top Live Pulse Status Bar ── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-[9px] text-[#A7D1BA]">
            Live Ecosystem Pulse
          </span>
        </div>

        <div className="px-2 py-0.5 rounded-full bg-black/25 border border-white/10 text-[9.5px] font-mono text-white/70 tracking-wider">
          <span className="text-[#4ADE80] font-bold">0{currentIndex + 1}</span>
          <span className="text-white/30 mx-1">/</span>
          <span>0{SLIDES.length}</span>
        </div>
      </div>

      {/* ── Headline Message with Smooth Crossfade & Upward Slide ── */}
      <div className="relative z-10 min-h-[32px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeSlide.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-display text-[12.5px] sm:text-[13.5px] font-bold text-white/95 leading-snug tracking-tight drop-shadow-xs"
          >
            {activeSlide.message}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Slider Dash Indicators with Live Progress Animation ── */}
      <div className="relative z-10 flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Show slide ${index + 1}: ${slide.message}`}
              className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] ${
                isActive ? "w-8 bg-black/40 border border-white/20" : "w-3.5 bg-white/25 hover:bg-white/45 cursor-pointer"
              }`}
            >
              {isActive && (
                <motion.span
                  key={`progress-${currentIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#22C55E] to-[#4ADE80] rounded-full shadow-[0_0_8px_#4ADE80]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Subtle Frosted Divider ── */}
      <div className="relative z-10 h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent pt-0.5" />

      {/* ── Animated Stats Micro-Cards ── */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-2"
          >
            {activeSlide.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: idx * 0.05,
                    ease: "easeOut",
                  }}
                  className="rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 p-2 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#4ADE80] flex-shrink-0">
                      <Icon
                        className={`w-3 h-3 ${
                          stat.fillIcon ? "fill-[#4ADE80]" : ""
                        }`}
                      />
                    </div>
                    <motion.span
                      key={`val-${stat.value}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: "backOut" }}
                      className="font-mono font-black text-xs sm:text-[13px] text-white tracking-tight truncate"
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  <span className="text-[9.5px] text-white/70 block leading-tight font-medium mt-1 truncate">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
