"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* ── Layer 1: Base Cream & Mint Gradient Canvas (0–300ms fade-in) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#FBFCF6] via-[#F1F8EE] to-[#E5F4E5]"
      />

      {/* Ambient Pale Yellow/Mint Radial Glow behind the shopping bag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="absolute top-1/4 right-1/4 w-[750px] h-[550px] rounded-full bg-radial from-[#FEEFAD]/35 via-[#C6F04A]/15 to-transparent blur-3xl pointer-events-none"
      />

      {/* ── Layer 2: Subtle, Smaller Top-Left Organic Decorative Arc ── */}
      {/* Significantly softer and reduced compared to old heavy dark wave */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: -20 }}
        animate={{ opacity: 0.35, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-10 -left-12 w-[340px] h-[220px]"
      >
        <svg viewBox="0 0 340 220" fill="none" className="w-full h-full opacity-60">
          <path
            d="M-20 -20 Q 140 70, 220 20 Q 280 -20, 360 40 L 360 -40 L -20 -40 Z"
            fill="url(#subtleTopArcGrad)"
          />
          <path
            d="M-30 30 Q 120 120, 260 50"
            stroke="#8ECF85"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="subtleTopArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8ECF85" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D7EBCB" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Layer 3: Bottom Dynamic Wave Layers (Reveals 200–650ms, Idle 19–25s) ── */}
      {/* Wave 1: Mint Base Wave (22s loop) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute -bottom-8 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={{ x: ["-2%", "2%", "-2%"] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-36 opacity-35"
        >
          <svg
            viewBox="0 0 1440 200"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 120 C 320 40, 680 180, 1020 90 C 1240 30, 1380 110, 1440 120 L 1440 200 L 0 200 Z"
              fill="#C2E6BF"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Wave 2: Mid-Green Wave (19s loop) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.35, ease: "easeOut" }}
        className="absolute -bottom-4 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={{ x: ["3%", "-3%", "3%"] }}
          transition={{ duration: 19, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-32 opacity-45"
        >
          <svg
            viewBox="0 0 1440 180"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 110 C 280 50, 580 150, 920 70 C 1180 20, 1360 90, 1440 100 L 1440 180 L 0 180 Z"
              fill="#88CA83"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Wave 3: Emerald Accent Wave (25s loop) */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 w-[120%] -ml-[10%]"
      >
        <motion.div
          animate={{ x: ["-1.5%", "1.5%", "-1.5%"] }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
          className="w-full h-24 opacity-30"
        >
          <svg
            viewBox="0 0 1440 140"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 80 C 260 20, 560 110, 880 50 C 1140 10, 1340 60, 1440 70 L 1440 140 L 0 140 Z"
              fill="#429A4D"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
