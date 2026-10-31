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
        label: "Service Satisfaction",
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
        label: "Avg. Delivery Time",
      },
      {
        icon: Warehouse,
        value: "14 Hubs",
        label: "Active Warehouses",
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
        label: "Audit Compliance",
      },
      {
        icon: TrendingUp,
        value: "₹250Cr+",
        label: "Annual Volume",
      },
      {
        icon: Clock,
        value: "99.99%",
        label: "Platform Uptime",
      },
    ],
  },
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

export function EcosystemStatsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const activeSlide = SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-10 w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#062A1A]/90 backdrop-blur-md border border-white/20 p-4 sm:p-5 text-white shadow-2xl space-y-3 mt-8 lg:mt-0 transition-all duration-300 hover:border-white/30"
      role="region"
      aria-label="HyperMart Ecosystem Highlights"
    >
      {/* ── Headline Message with Smooth Crossfade & Upward Slide ── */}
      <div className="min-h-[40px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeSlide.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-xs sm:text-sm font-bold text-white/95 leading-snug"
          >
            {activeSlide.message}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Slider Dash Indicators with Live Progress Animation ── */}
      <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
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
                isActive ? "w-8 bg-white/20" : "w-3.5 bg-white/40 hover:bg-white/60 cursor-pointer"
              }`}
            >
              {isActive && (
                <motion.span
                  key={`progress-${currentIndex}-${isPaused ? "paused" : "running"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? undefined : "100%" }}
                  transition={{
                    duration: AUTOPLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 left-0 bg-[#22C55E] rounded-full"
                  style={{ width: isPaused ? "100%" : undefined }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Animated Stats Row ── */}
      <div className="pt-3 border-t border-white/15">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 gap-2 text-left"
          >
            {activeSlide.stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="space-y-0.5"
                >
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Icon
                      className={`w-3.5 h-3.5 text-[#22C55E] flex-shrink-0 ${
                        stat.fillIcon ? "fill-[#22C55E]" : ""
                      }`}
                    />
                    <span className="font-mono font-black text-sm sm:text-base text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/75 block leading-tight">
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

