"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GoldenOrbitProps {
  layer: "front" | "back";
}

export function GoldenOrbit({ layer }: GoldenOrbitProps) {
  const shouldReduceMotion = useReducedMotion();

  // SVG ellipse path definition centered around the shopping bag
  // The path coordinates wrap from top-left (back), down through right-foreground (front), and back up
  const pathD =
    "M 70 260 C 50 140, 280 60, 520 120 C 740 180, 780 340, 620 420 C 460 500, 160 480, 70 260";

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${
        layer === "front" ? "z-25" : "z-10"
      }`}
    >
      <svg
        viewBox="0 0 780 520"
        fill="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="orbitGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFD95A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFF1A6" stopOpacity="0.5" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {layer === "back" ? (
          /* Back Layer: Arc passing behind top-left of bag */
          <motion.path
            d="M 70 260 C 50 140, 280 60, 520 120"
            stroke="url(#orbitGlowGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#goldGlow)"
            initial={shouldReduceMotion ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              pathLength: { duration: 1.0, delay: 1.7, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 1.7 },
            }}
          />
        ) : (
          /* Front Layer: Arc passing across foreground of the podium and compartments */
          <g>
            {/* Outer soft glow stroke */}
            <motion.path
              d="M 520 120 C 740 180, 780 340, 620 420 C 460 500, 160 480, 70 260"
              stroke="#FFF1A6"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.35"
              filter="url(#goldGlow)"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{
                pathLength: { duration: 1.0, delay: 2.1, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 2.1 },
              }}
            />

            {/* Sharp inner bright gold stroke */}
            <motion.path
              d="M 520 120 C 740 180, 780 340, 620 420 C 460 500, 160 480, 70 260"
              stroke="#FFD95A"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 0.95 } : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.95 }}
              transition={{
                pathLength: { duration: 1.0, delay: 2.1, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 2.1 },
              }}
            />

            {/* Glowing Traveling Particle (5-second continuous loop) */}
            {!shouldReduceMotion && (
              <motion.circle
                r="5"
                fill="#FFFFFF"
                stroke="#FFD700"
                strokeWidth="3"
                filter="drop-shadow(0 0 8px #FFE066)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ["0%", "100%"],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 2.3 },
                  offsetDistance: {
                    duration: 5,
                    delay: 2.3,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
                style={{
                  offsetPath: `path('${pathD}')`,
                }}
              />
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
