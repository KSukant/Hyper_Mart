"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function HeroHeading() {
  return (
    <div className="flex flex-col z-20">
      {/* ── 1. Weekly Mega Sale Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.03, filter: "brightness(1.04)" }}
        transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] shadow-xs cursor-pointer w-fit mb-7 transition-all"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -6, 0] }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          className="w-5 h-5 rounded-full bg-[#F59E0B] text-white flex items-center justify-center flex-shrink-0 shadow-2xs"
        >
          <Zap className="w-3 h-3 fill-white stroke-[2.5]" />
        </motion.div>
        <span className="text-xs sm:text-sm font-black text-[#1E3B2B] tracking-tight">
          Weekly Mega Sale
        </span>
      </motion.div>

      {/* ── 2. Main Heading: "Shop More, Save More" ── */}
      <div className="relative mb-5">
        <motion.h1
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: 0.16,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display font-black text-[clamp(2.4rem,3.8vw,4rem)] text-[#0C4E28] tracking-tight leading-[1.08]"
        >
          Shop More,
          <br />
          <span className="relative inline-block text-[#087A4A]">
            Save More
            {/* Dynamic Brush Green Underline */}
            <motion.svg
              viewBox="0 0 280 24"
              fill="none"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ originX: 0 }}
              className="absolute -bottom-3 left-0 w-full h-4 sm:h-5 text-[#8BE422] pointer-events-none"
            >
              <path
                d="M4 14 C 60 4, 180 4, 276 16 C 210 12, 100 10, 8 20 Z"
                fill="currentColor"
              />
            </motion.svg>
          </span>
        </motion.h1>
      </div>

      {/* ── 3. Supporting Copy ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
        className="text-[#2C4837] font-medium text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-[480px] mb-7"
      >
        All your daily needs, lifestyle, and personal care in one place with great deals.
      </motion.p>
    </div>
  );
}
