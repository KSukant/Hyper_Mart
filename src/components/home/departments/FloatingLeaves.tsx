"use client";

import React from "react";
import { motion } from "framer-motion";

interface FloatingLeavesProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function FloatingLeaves({
  isVisible = false,
  prefersReducedMotion = false,
}: FloatingLeavesProps) {
  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-15 overflow-hidden">
      {/* ── Leaf 1: Top-Left (7s loop, angled downward, 1.6s entrance) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={
          isVisible
            ? {
                opacity: 0.9,
                scale: 1,
                y: [0, -12, 0],
                rotate: [-4, 6, -4],
              }
            : { opacity: 0, scale: 0.6, y: 20 }
        }
        transition={{
          opacity: { duration: 0.9, delay: 1.6 },
          scale: { duration: 0.9, delay: 1.6 },
          y: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 2.5 },
          rotate: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 2.5 },
        }}
        className="absolute top-12 left-6 sm:left-14 lg:left-24 w-10 h-10 sm:w-14 sm:h-14"
      >
        <svg viewBox="0 0 54 54" fill="none" className="w-full h-full drop-shadow-md">
          <path
            d="M8 44 C 14 26, 32 10, 48 6 C 46 24, 30 42, 8 44 Z"
            fill="url(#leafGrad1)"
          />
          <path
            d="M12 40 C 24 28, 34 18, 46 8"
            stroke="#BCEB42"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A9C39" />
              <stop offset="100%" stopColor="#256B1E" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Leaf 2: Top-Right (8s loop, angled upward, 1.8s entrance) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, x: -15 }}
        animate={
          isVisible
            ? {
                opacity: 0.92,
                scale: 1,
                x: [0, 8, 0],
                y: [0, -10, 0],
                rotate: [4, -6, 4],
              }
            : { opacity: 0, scale: 0.6, x: -15 }
        }
        transition={{
          opacity: { duration: 0.9, delay: 1.8 },
          scale: { duration: 0.9, delay: 1.8 },
          x: { duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2.7 },
          y: { duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2.7 },
          rotate: { duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2.7 },
        }}
        className="absolute top-20 right-6 sm:right-12 lg:right-20 w-11 h-11 sm:w-15 sm:h-15"
      >
        <svg viewBox="0 0 54 54" fill="none" className="w-full h-full drop-shadow-md">
          <path
            d="M46 46 C 40 28, 24 12, 6 8 C 8 26, 24 42, 46 46 Z"
            fill="url(#leafGrad2)"
          />
          <path
            d="M42 42 C 30 30, 20 20, 8 10"
            stroke="#BCEB42"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5BB044" />
              <stop offset="100%" stopColor="#2F7B22" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* ── Leaf 3: Bottom-Left (9s loop, subtle ambient drift, 2.0s entrance) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          isVisible
            ? {
                opacity: 0.75,
                scale: 1,
                y: [0, 8, 0],
                rotate: [-3, 3, -3],
              }
            : { opacity: 0, scale: 0.6 }
        }
        transition={{
          opacity: { duration: 0.9, delay: 2.0 },
          scale: { duration: 0.9, delay: 2.0 },
          y: { duration: 9, ease: "easeInOut", repeat: Infinity, delay: 2.9 },
          rotate: { duration: 9, ease: "easeInOut", repeat: Infinity, delay: 2.9 },
        }}
        className="absolute bottom-16 left-4 sm:left-12 w-8 h-8 sm:w-11 sm:h-11"
      >
        <svg viewBox="0 0 44 44" fill="none" className="w-full h-full drop-shadow-sm opacity-80">
          <path
            d="M6 38 C 12 22, 26 10, 40 6 C 38 22, 24 36, 6 38 Z"
            fill="#3F8C33"
          />
        </svg>
      </motion.div>
    </div>
  );
}

