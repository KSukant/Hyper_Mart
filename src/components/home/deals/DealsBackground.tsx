"use client";

import React from "react";
import { motion } from "framer-motion";

interface DealsBackgroundProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealsBackground({
  isVisible = false,
  prefersReducedMotion = false,
}: DealsBackgroundProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Base Cream & Mint Background Canvas (0–400ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : shouldAnimate
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#FAFBF5] via-[#F4F9EE] to-[#E9F5E6]"
      />

      {/* ── Soft Ambient Lime & Pale Green Glow (100–650ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.6 } : { opacity: 0, scale: 0.9 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.6, scale: 1 }
            : shouldAnimate
            ? { opacity: 0.6, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] rounded-full bg-radial from-[#DDF5C8]/55 via-[#EBF7DC]/30 to-transparent blur-3xl"
      />

      {/* ── Bottom Organic Green Wave Accents ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-44 sm:h-52 w-full overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle Background Layer Wave */}
          <path
            d="M0,130 C220,70 420,180 720,130 C1020,80 1260,160 1440,110 L1440,220 L0,220 Z"
            fill="url(#wave-grad-1)"
            opacity="0.45"
          />
          {/* Main Foreground Wave */}
          <path
            d="M0,155 C240,110 460,200 740,155 C1040,105 1250,175 1440,140 L1440,220 L0,220 Z"
            fill="url(#wave-grad-2)"
            opacity="0.75"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7CCB52" />
              <stop offset="45%" stopColor="#9DE062" />
              <stop offset="100%" stopColor="#6EBF46" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#55A82E" />
              <stop offset="50%" stopColor="#78C644" />
              <stop offset="100%" stopColor="#52A12C" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

