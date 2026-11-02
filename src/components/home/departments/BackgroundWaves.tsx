"use client";

import React from "react";
import { motion } from "framer-motion";

interface BackgroundWavesProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function BackgroundWaves({
  isVisible = false,
  prefersReducedMotion = false,
}: BackgroundWavesProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Base Cream & Mint Gradient Canvas (0–300ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : shouldAnimate
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#FBFCF6] via-[#F2F8EE] to-[#E7F4E7]"
      />

      {/* ── Center Soft Ambient Pale-Green Glow (100–600ms) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.5 } : { opacity: 0, scale: 0.85 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.55, scale: 1 }
            : shouldAnimate
            ? { opacity: 0.55, scale: 1 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full bg-radial from-[#D4ECC5]/50 via-[#EAF5E1]/25 to-transparent blur-3xl"
      />

      {/* ── Top-Left Ambient Wave Contour ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.4 } : { opacity: 0, x: -30, y: -20 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.5, x: 0, y: 0 }
            : shouldAnimate
            ? { opacity: 0.5, x: 0, y: 0 }
            : { opacity: 0, x: -30, y: -20 }
        }
        transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-12 -left-16 w-[480px] h-[340px]"
      >
        <svg viewBox="0 0 480 340" fill="none" className="w-full h-full opacity-60">
          <path
            d="M-40 -40 Q 180 120, 320 40 Q 420 -20, 500 60 L 500 -40 Z"
            fill="url(#topWaveGrad)"
          />
          <defs>
            <linearGradient id="topWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8ECF85" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D7EBCB" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Bottom Wave Layer 1: Mint Base Wave (24s loop) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 35 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.5, y: 0 }
            : shouldAnimate
            ? { opacity: 0.5, y: 0 }
            : { opacity: 0, y: 35 }
        }
        transition={{ duration: 1.5, delay: 0.75, ease: "easeOut" }}
        className="absolute -bottom-10 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ["-2%", "2%", "-2%"] }}
          transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-44"
        >
          <svg viewBox="0 0 1440 240" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 140 C 300 70, 620 190, 960 110 C 1200 50, 1360 130, 1440 140 L 1440 240 L 0 240 Z"
              fill="#C2E6BF"
              opacity="0.65"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Bottom Wave Layer 2: Mid-Green Reverse Wave (20s loop) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 35 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.6, y: 0 }
            : shouldAnimate
            ? { opacity: 0.6, y: 0 }
            : { opacity: 0, y: 35 }
        }
        transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
        className="absolute -bottom-6 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ["3%", "-3%", "3%"] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-36"
        >
          <svg viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 120 C 340 50, 700 160, 1040 70 C 1240 20, 1380 90, 1440 100 L 1440 200 L 0 200 Z"
              fill="#88CA83"
              opacity="0.55"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Bottom Wave Layer 3: Emerald Accent Wave (27s loop) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 35 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.4, y: 0 }
            : shouldAnimate
            ? { opacity: 0.4, y: 0 }
            : { opacity: 0, y: 35 }
        }
        transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
        className="absolute -bottom-2 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { x: ["-1.5%", "1.5%", "-1.5%"] }}
          transition={{ duration: 27, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-32"
        >
          <svg viewBox="0 0 1440 180" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 110 C 260 40, 560 140, 880 70 C 1140 10, 1340 80, 1440 90 L 1440 180 L 0 180 Z"
              fill="#429A4D"
              opacity="0.45"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

