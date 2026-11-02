"use client";

import React from "react";
import { motion } from "framer-motion";

interface FooterCitySkylineProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function FooterCitySkyline({
  isVisible = false,
  prefersReducedMotion = false,
}: FooterCitySkylineProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div className="relative w-full h-[84px] sm:h-[96px] overflow-hidden pointer-events-none select-none z-10">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cityGlow" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B8F34A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#087C32" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lightBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFD84A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD84A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Street Lamps Glow Cones ── */}
        <polygon points="120,48 108,88 132,88" fill="url(#lightBeam)" />
        <polygon points="380,48 368,88 392,88" fill="url(#lightBeam)" />
        <polygon points="720,48 708,88 732,88" fill="url(#lightBeam)" />
        <polygon points="1050,48 1038,88 1062,88" fill="url(#lightBeam)" />

        {/* ── Street Lamp Posts ── */}
        <g stroke="#FFD84A" strokeWidth="1.2" opacity="0.85">
          {/* Lamp 1 */}
          <path d="M120 88 L120 48 M120 48 Q120 44 116 44 L114 44" />
          <circle cx="114" cy="46" r="2.5" fill="#FFD84A" />
          {/* Lamp 2 */}
          <path d="M380 88 L380 48 M380 48 Q380 44 384 44 L386 44" />
          <circle cx="386" cy="46" r="2.5" fill="#FFD84A" />
          {/* Lamp 3 */}
          <path d="M720 88 L720 48 M720 48 Q720 44 716 44 L714 44" />
          <circle cx="714" cy="46" r="2.5" fill="#FFD84A" />
          {/* Lamp 4 */}
          <path d="M1050 88 L1050 48 M1050 48 Q1050 44 1054 44 L1056 44" />
          <circle cx="1056" cy="46" r="2.5" fill="#FFD84A" />
        </g>

        {/* ── Illustrated Buildings (Stroke Line Art) ── */}
        <g stroke="#B8F34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
          {/* Building Cluster 1 (Left: Tall modern tower with antenna) */}
          <path d="M25 88 L25 32 L65 32 L65 88" />
          <line x1="45" y1="32" x2="45" y2="20" stroke="#FFD84A" strokeWidth="1.5" />
          <circle cx="45" cy="19" r="1.5" fill="#FFD84A" />
          {/* Windows Cluster 1 */}
          <rect x="33" y="38" width="6" height="5" rx="1" fill="#FFD84A" fillOpacity="0.4" stroke="none" />
          <rect x="51" y="38" width="6" height="5" rx="1" fill="#FFD84A" fillOpacity="0.4" stroke="none" />
          <rect x="33" y="48" width="6" height="5" rx="1" fill="#B8F34A" fillOpacity="0.3" stroke="none" />
          <rect x="51" y="48" width="6" height="5" rx="1" fill="#B8F34A" fillOpacity="0.3" stroke="none" />
          <rect x="33" y="58" width="6" height="5" rx="1" fill="#FFD84A" fillOpacity="0.4" stroke="none" />
          <rect x="51" y="58" width="6" height="5" rx="1" fill="#B8F34A" fillOpacity="0.3" stroke="none" />

          {/* Building 2: Stepped apartment */}
          <path d="M65 88 L65 42 L95 42 L95 88" />
          <line x1="72" y1="50" x2="88" y2="50" />
          <line x1="72" y1="60" x2="88" y2="60" />
          <line x1="72" y1="70" x2="88" y2="70" />

          {/* Small Gabled House 1 */}
          <path d="M140 88 L140 62 L160 48 L180 62 L180 88 Z" fill="url(#cityGlow)" />
          <rect x="154" y="68" width="12" height="20" stroke="#B8F34A" strokeWidth="1.2" />

          {/* Building Cluster 2 (Mid-Left Commercial) */}
          <path d="M240 88 L240 38 L290 38 L290 88" />
          <path d="M250 46 L280 46 M250 54 L280 54 M250 62 L280 62 M250 70 L280 70" strokeWidth="1" strokeDasharray="3 3" />

          {/* Center Highrise (Slanted Roof) */}
          <path d="M410 88 L410 26 L460 38 L460 88" />
          <line x1="435" y1="26" x2="435" y2="14" stroke="#FFD84A" strokeWidth="1.2" />
          <circle cx="435" cy="13" r="1.5" fill="#FFD84A" />
          <rect x="420" y="44" width="7" height="6" rx="1" fill="#FFD84A" fillOpacity="0.4" stroke="none" />
          <rect x="442" y="44" width="7" height="6" rx="1" fill="#B8F34A" fillOpacity="0.3" stroke="none" />
          <rect x="420" y="56" width="7" height="6" rx="1" fill="#B8F34A" fillOpacity="0.3" stroke="none" />
          <rect x="442" y="56" width="7" height="6" rx="1" fill="#FFD84A" fillOpacity="0.4" stroke="none" />

          {/* Mid-Right Block */}
          <path d="M520 88 L520 48 L565 48 L565 88" />
          <path d="M532 56 H553 M532 66 H553 M532 76 H553" strokeWidth="1" />

          {/* Arched Building */}
          <path d="M600 88 L600 52 Q625 36 650 52 L650 88" />
          <circle cx="625" cy="56" r="6" stroke="#FFD84A" strokeWidth="1.2" fill="#FFD84A" fillOpacity="0.2" />

          {/* Clock Tower / Landmark */}
          <path d="M780 88 L780 30 L805 18 L830 30 L830 88" />
          <circle cx="805" cy="38" r="6" stroke="#FFD84A" strokeWidth="1.4" fill="#FFD84A" fillOpacity="0.25" />
          <line x1="805" y1="35" x2="805" y2="38" stroke="#FFD84A" strokeWidth="1.2" />
          <line x1="805" y1="38" x2="808" y2="38" stroke="#FFD84A" strokeWidth="1.2" />

          {/* Warehouse / Fulfillment Center */}
          <path d="M890 88 L890 54 L960 54 L960 88" />
          <rect x="910" y="66" width="30" height="22" stroke="#B8F34A" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* HyperMart Signature Storefront on Right */}
          <g transform="translate(1180, 24)">
            {/* Store roof / awning */}
            <path d="M0 64 L10 40 L120 40 L130 64 Z" fill="url(#cityGlow)" stroke="#B8F34A" strokeWidth="1.5" />
            {/* Awning stripes */}
            <path d="M20 40 L15 64 M40 40 L38 64 M60 40 L60 64 M80 40 L82 64 M100 40 L105 64" stroke="#FFD84A" strokeWidth="1.2" />
            {/* Storefront walls */}
            <path d="M8 64 L8 88 M122 64 L122 88" stroke="#B8F34A" strokeWidth="1.5" />
            {/* Store Sign Banner */}
            <rect x="25" y="24" width="80" height="14" rx="3" fill="#087C32" stroke="#B8F34A" strokeWidth="1.2" />
            <text x="65" y="34" fill="#B8F34A" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
              HYPERMART
            </text>
            {/* Glass Entrance Doors */}
            <rect x="45" y="64" width="40" height="24" stroke="#B8F34A" strokeWidth="1.2" />
            <line x1="65" y1="64" x2="65" y2="88" stroke="#B8F34A" strokeWidth="1.2" />
            {/* Window Displays */}
            <rect x="16" y="68" width="22" height="16" stroke="#FFD84A" strokeWidth="1" fill="#FFD84A" fillOpacity="0.2" />
            <rect x="92" y="68" width="22" height="16" stroke="#FFD84A" strokeWidth="1" fill="#FFD84A" fillOpacity="0.2" />
          </g>

          {/* Far Right Suburban Houses */}
          <path d="M1340 88 L1340 64 L1365 50 L1390 64 L1390 88" />
          <path d="M1400 88 L1400 58 L1430 58 L1430 88" />
        </g>

        {/* ── Trees along the road (Green Canopy & Brown Trunk) ── */}
        <g stroke="#8ED954" strokeWidth="1.2">
          {/* Tree 1 */}
          <circle cx="105" cy="74" r="8" fill="#8ED954" fillOpacity="0.3" />
          <line x1="105" y1="82" x2="105" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 2 */}
          <circle cx="210" cy="72" r="10" fill="#8ED954" fillOpacity="0.35" />
          <line x1="210" y1="82" x2="210" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 3 (Pine) */}
          <polygon points="340,60 330,76 350,76" fill="#8ED954" fillOpacity="0.3" />
          <polygon points="340,68 326,84 354,84" fill="#8ED954" fillOpacity="0.35" />
          <line x1="340" y1="84" x2="340" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 4 */}
          <circle cx="490" cy="74" r="9" fill="#8ED954" fillOpacity="0.3" />
          <line x1="490" y1="83" x2="490" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 5 */}
          <circle cx="750" cy="72" r="10" fill="#8ED954" fillOpacity="0.35" />
          <line x1="750" y1="82" x2="750" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 6 */}
          <circle cx="865" cy="75" r="8" fill="#8ED954" fillOpacity="0.3" />
          <line x1="865" y1="83" x2="865" y2="88" stroke="#5EA832" strokeWidth="1.5" />
          {/* Tree 7 */}
          <circle cx="1140" cy="70" r="11" fill="#8ED954" fillOpacity="0.35" />
          <line x1="1140" y1="81" x2="1140" y2="88" stroke="#5EA832" strokeWidth="1.5" />
        </g>

        {/* ── Illustrated Delivery Road (Image 2 Specification: Glowing Lime Wavy Road) ── */}
        {/* Road line glow accent */}
        <path
          d="M0 90 C280 84 560 93 880 86 C1120 82 1320 89 1440 91"
          stroke="#B8F34A"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* Center luminous road core */}
        <path
          d="M0 90 C280 84 560 93 880 86 C1120 82 1320 89 1440 91"
          stroke="#C5EA42"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="1"
        />
        {/* Subtle Bottom Asphalt Fill */}
        <path
          d="M0 90 C280 84 560 93 880 86 C1120 82 1320 89 1440 91 L1440 100 L0 100 Z"
          fill="#002418"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

