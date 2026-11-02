"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface DepartmentHeadingProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DepartmentHeading({
  isVisible = false,
  prefersReducedMotion = false,
}: DepartmentHeadingProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div className="relative z-20 flex flex-col items-center text-center max-w-[820px] mx-auto px-4 select-none">
      {/* ── 1. Eyebrow Badge & Flanking Lines (150–650ms after entry) ── */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 15 }
        }
        transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        className="flex items-center justify-center gap-3"
      >
        <span className="hidden sm:inline-block w-8 sm:w-12 h-[2px] rounded-full bg-[#8ECF85]/60" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E1] border border-[#C5E8B6] shadow-2xs">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#087A3D] text-white">
            <ShoppingCart className="h-3 w-3" />
          </span>
          <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#075B35]">
            FOUR DEPARTMENTS · ONE CART
          </span>
        </div>

        <span className="hidden sm:inline-block w-8 sm:w-12 h-[2px] rounded-full bg-[#8ECF85]/60" />
      </motion.div>

      {/* ── 2. Main Heading ── */}
      <motion.h2
        initial={
          prefersReducedMotion
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(6px)" }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : shouldAnimate
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(6px)" }
        }
        transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#102D22]"
      >
        Shop by{" "}
        <span className="text-[#087A3D] relative inline-block">
          Department
        </span>
      </motion.h2>

      {/* ── 3. Supporting Text & Animated Underline (650–1,350ms) ── */}
      <div className="relative mt-2 flex flex-col items-center">
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : shouldAnimate
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 15 }
          }
          transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
          className="text-sm sm:text-base font-medium text-[#4A5E54] max-w-[560px]"
        >
          Mix groceries, fashion, electronics and beauty in one order.
        </motion.p>

        {/* Short Green Underline drawing from left to right (850–1,350ms) */}
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={
            prefersReducedMotion
              ? { scaleX: 1 }
              : shouldAnimate
              ? { scaleX: 1 }
              : { scaleX: 0 }
          }
          transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="mt-2 h-[3.5px] w-24 sm:w-32 rounded-full bg-gradient-to-r from-[#087A3D] via-[#48A63A] to-[#8ECF85]"
        />
      </div>
    </div>
  );
}

