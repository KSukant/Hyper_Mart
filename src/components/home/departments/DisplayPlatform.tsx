"use client";

import React from "react";
import { motion } from "framer-motion";

interface DisplayPlatformProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DisplayPlatform({
  isVisible = false,
  prefersReducedMotion = false,
}: DisplayPlatformProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, scale: 1, y: 0, x: "-50%" }
          : { opacity: 0, scale: 0.88, y: 35, x: "-50%" }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1, y: 0, x: "-50%" }
          : shouldAnimate
          ? { opacity: 1, scale: 1, y: 0, x: "-50%" }
          : { opacity: 0, scale: 0.88, y: 35, x: "-50%" }
      }
      transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 sm:bottom-1 lg:bottom-2 left-1/2 w-[95%] max-w-[1240px] pointer-events-none select-none z-5"
    >
      <div className="relative w-full aspect-[9.5/1]">
        <svg
          viewBox="0 0 1000 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Soft Ambient Floor Shadow */}
            <filter id="platformFloorGlow" x="-20%" y="-20%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
            </filter>

            {/* Golden Rim Intense Glow */}
            <filter id="goldRimGlow" x="-10%" y="-30%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="6" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>

            {/* Top Surface Radial Gradient */}
            <radialGradient id="topSurfaceGrad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#F7FAF2" />
              <stop offset="100%" stopColor="#E2EADE" />
            </radialGradient>

            {/* Front Bevel Rim Vertical Gradient */}
            <linearGradient id="frontRimGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EDEFEA" />
              <stop offset="50%" stopColor="#DDE6D8" />
              <stop offset="100%" stopColor="#CBD8C5" />
            </linearGradient>

            {/* Golden Base Arc Gradient */}
            <linearGradient id="goldenRimLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDE6A" stopOpacity="0.2" />
              <stop offset="15%" stopColor="#FFD85A" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FFF2A3" stopOpacity="1" />
              <stop offset="85%" stopColor="#FFD85A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFDE6A" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* ── 1. Soft Emerald/Dark Green Shadow on the Floor ── */}
          <ellipse
            cx="500"
            cy="78"
            rx="460"
            ry="24"
            fill="#075B35"
            opacity="0.22"
            filter="url(#platformFloorGlow)"
          />

          {/* ── 2. Front Bevel / Cylinder Rim (Height ~20px) ── */}
          <path
            d="M 35 48 A 465 30 0 0 0 965 48 L 965 68 A 465 30 0 0 1 35 68 Z"
            fill="url(#frontRimGrad)"
          />

          {/* ── 3. Top Platform Oval Disc ── */}
          <ellipse
            cx="500"
            cy="48"
            rx="465"
            ry="30"
            fill="url(#topSurfaceGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* ── 4. Subtle Ambient Card Color Reflections on Top Disc ── */}
          {/* Green Card reflection */}
          <ellipse cx="230" cy="52" rx="90" ry="16" fill="#84CC16" opacity="0.14" filter="blur(8px)" />
          {/* Pink Card reflection */}
          <ellipse cx="410" cy="53" rx="90" ry="16" fill="#F43F5E" opacity="0.12" filter="blur(8px)" />
          {/* Blue Card reflection */}
          <ellipse cx="590" cy="53" rx="90" ry="16" fill="#0EA5E9" opacity="0.12" filter="blur(8px)" />
          {/* Purple Card reflection */}
          <ellipse cx="770" cy="52" rx="90" ry="16" fill="#A855F7" opacity="0.14" filter="blur(8px)" />

          {/* ── 5. Golden Glowing Lower Arc Rim ── */}
          {/* Soft outer glow */}
          <path
            d="M 35 68 A 465 30 0 0 0 965 68"
            stroke="#FFE885"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#goldRimGlow)"
            opacity="0.6"
          />
          {/* Intense core golden arc */}
          <path
            d="M 35 68 A 465 30 0 0 0 965 68"
            stroke="url(#goldenRimLine)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        {/* ── 6. Traveling Golden Highlight along the bottom edge ── */}
        {!prefersReducedMotion && (
          <div className="absolute inset-x-12 bottom-1 h-3 overflow-hidden rounded-[50%] pointer-events-none">
            <motion.div
              animate={{
                x: ["-100%", "200%"],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 4.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.0,
              }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#FFE885] to-transparent blur-md"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
