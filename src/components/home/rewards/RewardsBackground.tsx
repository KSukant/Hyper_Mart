"use client";

import React from "react";
import { motion } from "framer-motion";

interface RewardsBackgroundProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function RewardsBackground({
  isVisible = false,
  prefersReducedMotion = false,
}: RewardsBackgroundProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Base Cream & Mint Background Canvas (0–350ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : shouldAnimate
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#FAFBF5] via-[#F4F9EE] to-[#E9F5E6]"
      />

      {/* ── Soft Ambient Lime & Pale Green Glow (100–600ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0, scale: 0.9 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.5, scale: 1 }
            : shouldAnimate
            ? { opacity: 0.5, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[650px] rounded-full bg-radial from-[#DDF5C8]/50 via-[#EBF7DC]/25 to-transparent blur-3xl"
      />

      {/* ── Floating Decorative Leaves ── */}
      {/* 1. Top-Left Leaf */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.85, y: 0 } : { opacity: 0, y: -15, rotate: -30 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.85, y: 0 }
            : shouldAnimate
            ? {
                opacity: 0.85,
                y: [0, -6, 0],
                rotate: [-25, -20, -25],
              }
            : { opacity: 0, y: -15, rotate: -30 }
        }
        transition={
          shouldAnimate
            ? {
                opacity: { duration: 0.6, delay: 0.3 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }
            : { duration: 0.6, delay: 0.3 }
        }
        className="absolute top-4 left-[2%] w-10 h-10 sm:w-12 sm:h-12 text-[#68B832] opacity-80"
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <path
            d="M6 42C6 42 12 18 38 10C38 10 38 34 16 42C12 43.5 8 43 6 42Z"
            fill="url(#leaf-grad-1)"
          />
          <path d="M12 36C18 28 26 20 38 10" stroke="#4F9922" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-1" x1="6" y1="42" x2="38" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5EA82E" />
              <stop offset="1" stopColor="#89D94A" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 2. Top-Center Leaf (between the two panels) */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -12, rotate: 15 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.8, y: 0 }
            : shouldAnimate
            ? {
                opacity: 0.8,
                y: [0, -5, 0],
                rotate: [15, 22, 15],
              }
            : { opacity: 0, y: -12, rotate: 15 }
        }
        transition={
          shouldAnimate
            ? {
                opacity: { duration: 0.6, delay: 0.4 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }
            : { duration: 0.6, delay: 0.4 }
        }
        className="absolute top-3 left-[48%] -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 text-[#68B832] opacity-75"
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <path
            d="M8 40C8 40 14 16 38 8C38 8 36 32 18 40C14 41.5 10 41 8 40Z"
            fill="url(#leaf-grad-2)"
          />
          <path d="M14 34C20 26 27 18 38 8" stroke="#4F9922" strokeWidth="1.2" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-2" x1="8" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6DBF42" />
              <stop offset="1" stopColor="#B2F25E" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 3. Top-Right Leaves */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.85, y: 0 } : { opacity: 0, y: -15, rotate: 35 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.85, y: 0 }
            : shouldAnimate
            ? {
                opacity: 0.85,
                y: [0, -7, 0],
                rotate: [35, 42, 35],
              }
            : { opacity: 0, y: -15, rotate: 35 }
        }
        transition={
          shouldAnimate
            ? {
                opacity: { duration: 0.6, delay: 0.45 },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
                rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }
            : { duration: 0.6, delay: 0.45 }
        }
        className="absolute top-4 right-[2%] w-10 h-10 sm:w-11 sm:h-11 text-[#68B832] opacity-80"
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <path
            d="M6 42C6 42 12 18 38 10C38 10 38 34 16 42C12 43.5 8 43 6 42Z"
            fill="url(#leaf-grad-3)"
          />
          <path d="M12 36C18 28 26 20 38 10" stroke="#4F9922" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-3" x1="6" y1="42" x2="38" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5EA82E" />
              <stop offset="1" stopColor="#9DE052" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 4. Bottom-Left Leaf */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.75, y: 0 } : { opacity: 0, y: 15, rotate: -40 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.75, y: 0 }
            : shouldAnimate
            ? {
                opacity: 0.75,
                y: [0, -5, 0],
                rotate: [-40, -32, -40],
              }
            : { opacity: 0, y: 15, rotate: -40 }
        }
        transition={
          shouldAnimate
            ? {
                opacity: { duration: 0.6, delay: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }
            : { duration: 0.6, delay: 0.5 }
        }
        className="absolute bottom-28 left-[1%] w-8 h-8 sm:w-10 sm:h-10 text-[#68B832] opacity-75"
      >
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          <path
            d="M8 40C8 40 14 16 38 8C38 8 36 32 18 40C14 41.5 10 41 8 40Z"
            fill="url(#leaf-grad-4)"
          />
          <path d="M14 34C20 26 27 18 38 8" stroke="#4F9922" strokeWidth="1.2" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-4" x1="8" y1="40" x2="38" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6DBF42" />
              <stop offset="1" stopColor="#B2F25E" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Bottom Organic Green & Gold Wave Accents ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 35 }
        }
        transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 w-full overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle Golden-Yellow Accent Wave */}
          <path
            d="M0,115 C260,70 520,140 760,105 C1000,70 1220,135 1440,95 L1440,160 L0,160 Z"
            fill="#FFD84A"
            opacity="0.35"
          />
          {/* Primary Fresh Green Wave */}
          <path
            d="M0,95 C240,55 480,145 740,105 C1000,65 1240,135 1440,90 L1440,160 L0,160 Z"
            fill="url(#wave-grad-rewards)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="wave-grad-rewards" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5EA832" />
              <stop offset="50%" stopColor="#82CF44" />
              <stop offset="100%" stopColor="#54992C" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
