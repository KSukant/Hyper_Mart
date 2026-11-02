"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoldenOrbitProps {
  layer: "back" | "front";
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function GoldenOrbit({
  layer,
  isVisible = false,
  prefersReducedMotion = false,
}: GoldenOrbitProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  // SVG 3D Ellipse path wrapping the 4 department panels and platform
  // Back segment passes behind panels (z-4)
  // Front segment swoops across foreground of the platform (z-25)
  const backPath = "M 70 360 C 40 200, 270 115, 512 115 C 750 115, 960 200, 965 330";
  const frontPath = "M 965 330 C 970 430, 770 495, 512 495 C 260 495, 90 450, 70 360";
  const fullPath = `${backPath} ${frontPath.replace("M 965 330", "")}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${
        layer === "front" ? "z-25" : "z-4"
      }`}
    >
      <svg
        viewBox="0 0 1024 560"
        fill="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="goldOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FFD85A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFE066" stopOpacity="0.75" />
          </linearGradient>

          <filter id="goldOrbitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {layer === "back" ? (
          /* ── Back Arc: Wrapping behind panels ── */
          <g>
            {/* Outer soft glow */}
            <motion.path
              d={backPath}
              stroke="#FFE885"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#goldOrbitGlow)"
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 0.3 }
                  : shouldAnimate
                  ? { pathLength: 1, opacity: 0.3 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 1.0, delay: 0.35, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 0.35 },
              }}
            />
            {/* Sharp golden stroke */}
            <motion.path
              d={backPath}
              stroke="url(#goldOrbitGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 0.85 }
                  : shouldAnimate
                  ? { pathLength: 1, opacity: 0.85 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 1.0, delay: 0.35, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 0.35 },
              }}
            />
          </g>
        ) : (
          /* ── Front Arc: Swooping in front of platform ── */
          <g>
            {/* Outer soft glow */}
            <motion.path
              d={frontPath}
              stroke="#FFE885"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#goldOrbitGlow)"
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.35 } : { pathLength: 0, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 0.35 }
                  : shouldAnimate
                  ? { pathLength: 1, opacity: 0.35 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 1.0, delay: 0.45, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 0.45 },
              }}
            />
            {/* Sharp golden stroke */}
            <motion.path
              d={frontPath}
              stroke="url(#goldOrbitGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1, opacity: 0.95 } : { pathLength: 0, opacity: 0 }}
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 0.95 }
                  : shouldAnimate
                  ? { pathLength: 1, opacity: 0.95 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 1.0, delay: 0.45, ease: "easeInOut" },
                opacity: { duration: 0.4, delay: 0.45 },
              }}
            />

            {/* Glowing Traveling Particle (starts after orbit appears) */}
            {!prefersReducedMotion && (
              <motion.circle
                r="6"
                fill="#FFFFFF"
                stroke="#FFD700"
                strokeWidth="3"
                filter="drop-shadow(0 0 10px #FFE066)"
                initial={{ opacity: 0 }}
                animate={
                  shouldAnimate
                    ? {
                        opacity: [0, 1, 1, 0],
                        offsetDistance: ["0%", "100%"],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  opacity: { duration: 0.4, delay: 0.8 },
                  offsetDistance: {
                    duration: 6,
                    ease: "linear",
                    repeat: Infinity,
                    delay: 0.8,
                  },
                }}
                style={{
                  offsetPath: `path("${fullPath}")`,
                }}
              />
            )}
          </g>
        )}
      </svg>
    </div>
  );
}

