"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface DealsHeaderAndCountdownProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealsHeaderAndCountdown({
  isVisible = false,
  prefersReducedMotion = false,
}: DealsHeaderAndCountdownProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  // Countdown timer state initialized to reference values (06h 29m 49s)
  const [timeLeft, setTimeLeft] = useState<{ hrs: string; mins: string; secs: string }>({
    hrs: "06",
    mins: "29",
    secs: "49",
  });

  useEffect(() => {
    // 6.5 hours from current session baseline
    const targetTime = Date.now() + 6 * 3600 * 1000 + 29 * 60 * 1000 + 49 * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const totalSec = Math.floor(diff / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;

      const pad = (n: number) => String(n).padStart(2, "0");
      setTimeLeft({
        hrs: pad(h),
        mins: pad(m),
        secs: pad(s),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-start w-full lg:max-w-[280px] xl:max-w-[310px] shrink-0">
      {/* ── 1. Eyebrow Text ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 15 }
        }
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex items-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#102F25]/90 mb-1.5"
      >
        <span className="text-[#087C32] font-black text-sm mr-1.5">/</span>
        FOUR DEPARTMENTS • ONE CART
      </motion.div>

      {/* ── 2. Main Heading with Radiant Sparkles & Golden Underline ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-[50px] font-black tracking-tight leading-[1.08] text-[#102F25]">
          Deals <br />
          <span className="relative inline-block text-[#087C32]">
            ending soon
            {/* Radiant Sparkles on top-right of 'soon' */}
            <svg
              className="absolute -top-3.5 -right-6 w-7 h-7 text-[#FFD84A] pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2 L15.5 8 L21 5 L17 10 L23 12 L17 14 L21 19 L15.5 16 L14 22 L12.5 16 L7 19 L11 14 L5 12 L11 10 L7 5 L12.5 8 Z"
                fill="#FFD84A"
              />
              <path
                d="M24 2 L24.5 4 L26.5 4.5 L24.5 5 L24 7 L23.5 5 L21.5 4.5 L23.5 4 Z"
                fill="#FFE27A"
              />
            </svg>
            {/* Curved Golden Underline */}
            <motion.svg
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={
                prefersReducedMotion
                  ? { scaleX: 1 }
                  : shouldAnimate
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute -bottom-2 left-0 w-[105%] h-3 pointer-events-none"
              viewBox="0 0 160 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4 C40 9, 110 11, 158 2"
                stroke="#FFD84A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        </h2>
      </motion.div>

      {/* ── 3. Supporting Description ── */}
      <motion.p
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="text-xs sm:text-sm text-[#47554E] leading-relaxed mt-4 mb-4 sm:mb-5"
      >
        High-discount offers across fresh groceries, fashion, electronics and beauty.
      </motion.p>

      {/* ── 4. Countdown Panel ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.94 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : shouldAnimate
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.94 }
        }
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl sm:rounded-3xl bg-[#085A2E] p-3.5 sm:p-4 text-white shadow-[0_8px_24px_rgba(8,90,46,0.28)] border border-[#107038] max-w-[260px]"
      >
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white mb-2.5">
          <Clock className="w-4 h-4 text-[#FFD84A] stroke-[2.5]" />
          <span>Deals end in</span>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          {/* Hours Tile */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-white text-[#102F25] font-black text-xl sm:text-2xl rounded-xl py-1.5 text-center shadow-md">
              {timeLeft.hrs}
            </div>
            <span className="text-[10px] sm:text-xs text-[#EAF8D9]/90 font-medium tracking-wide mt-1">
              Hrs
            </span>
          </div>

          <span className="text-lg font-black text-[#FFD84A] mb-4">:</span>

          {/* Minutes Tile */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-white text-[#102F25] font-black text-xl sm:text-2xl rounded-xl py-1.5 text-center shadow-md">
              {timeLeft.mins}
            </div>
            <span className="text-[10px] sm:text-xs text-[#EAF8D9]/90 font-medium tracking-wide mt-1">
              Mins
            </span>
          </div>

          <span className="text-lg font-black text-[#FFD84A] mb-4">:</span>

          {/* Seconds Tile */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-full bg-white text-[#102F25] font-black text-xl sm:text-2xl rounded-xl py-1.5 text-center shadow-md">
              {timeLeft.secs}
            </div>
            <span className="text-[10px] sm:text-xs text-[#EAF8D9]/90 font-medium tracking-wide mt-1">
              Secs
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── 5. Shopping Trolley Illustration ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.92 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : shouldAnimate
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 25, scale: 0.92 }
        }
        transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 sm:mt-4 relative max-w-[240px] pointer-events-none select-none"
      >
        <motion.div
          animate={
            shouldAnimate
              ? { y: [0, -4, 0] }
              : { y: 0 }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <Image
            src="/deals-trolley.png"
            alt="HyperMart Deals Shopping Trolley"
            width={215}
            height={195}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

