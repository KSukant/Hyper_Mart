"use client";

import React from "react";
import { motion } from "framer-motion";

interface FooterDeliveryScooterProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function FooterDeliveryScooter({
  isVisible = false,
  prefersReducedMotion = false,
}: FooterDeliveryScooterProps) {
  // If reduced motion is preferred, render stationary scooter parked near store
  if (prefersReducedMotion) {
    return (
      <div
        className="absolute bottom-[2px] sm:bottom-[6px] right-24 sm:right-36 w-[84px] h-[54px] z-20 pointer-events-none select-none"
        aria-label="HyperMart Delivery Scooter (Stationary)"
      >
        <ScooterGraphic isMoving={false} />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-0 h-[64px] sm:h-[72px] overflow-hidden pointer-events-none select-none z-20">
      {/* 
        Dedicated Scooter Animation Track
        Travels smoothly from Left (-120px) to Right (calc(100% + 140px))
        Duration: 12 seconds, linear, infinite
      */}
      <div
        className="scooter-track absolute bottom-[2px] sm:bottom-[4px] left-0 w-[92px] h-[58px]"
        style={{
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        <ScooterGraphic isMoving={isVisible} />
      </div>

      <style jsx global>{`
        @keyframes scooterDelivery {
          0% {
            transform: translateX(-130px);
          }
          100% {
            transform: translateX(calc(100vw + 140px));
          }
        }

        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes riderSuspension {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1.5px);
          }
        }

        .scooter-track {
          animation: scooterDelivery 12s linear infinite;
        }

        .scooter-wheel {
          transform-box: fill-box;
          transform-origin: center;
          animation: wheelSpin 450ms linear infinite;
        }

        .rider-suspension {
          animation: riderSuspension 500ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ScooterGraphic({ isMoving }: { isMoving: boolean }) {
  return (
    <svg
      viewBox="0 0 100 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_4px_12px_rgba(184,243,74,0.35)]"
    >
      <defs>
        {/* Headlight Beam Cone Gradient */}
        <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD84A" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#B8F34A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#B8F34A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── Headlight Light Beam Cone Shooting Forward ── */}
      <polygon
        points="78,38 100,32 100,48 78,42"
        fill="url(#headlightBeam)"
      />

      {/* ── Scooter Exhaust Trail Sparkle (Subtle) ── */}
      {isMoving && (
        <g opacity="0.6">
          <circle cx="10" cy="48" r="1.5" fill="#FFD84A" />
          <circle cx="5" cy="46" r="1" fill="#B8F34A" />
          <circle cx="1" cy="45" r="0.8" fill="#B8F34A" />
        </g>
      )}

      {/* ── Scooter Body Frame & Mudguards ── */}
      <g stroke="#087C32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Footboard chassis */}
        <path d="M26 48 L56 48" stroke="#003D29" strokeWidth="3" />
        <path d="M26 48 L56 48" stroke="#B8F34A" strokeWidth="1.5" />

        {/* Rear frame rising to seat */}
        <path d="M22 48 L32 38 L42 38" stroke="#003D29" strokeWidth="2.5" />

        {/* Front steering fork */}
        <path d="M54 48 L68 24" stroke="#B8F34A" strokeWidth="2.5" />

        {/* Handlebars & Handgrip */}
        <path d="M64 22 L72 23" stroke="#FFD84A" strokeWidth="2.5" />
        <circle cx="72" cy="23" r="2" fill="#003D29" />

        {/* Front Fairing & Headlight Cowl */}
        <path
          d="M62 26 L76 34 L72 44 L60 42 Z"
          fill="#087C32"
          stroke="#B8F34A"
          strokeWidth="1.5"
        />
        {/* Headlight Lamp */}
        <circle cx="76" cy="35" r="3" fill="#FFD84A" stroke="#FFFFFF" strokeWidth="1" />
      </g>

      {/* ── Rear Wheels & Front Wheels (Rotating independently) ── */}
      {/* 1. Rear Wheel (Center: 22, 50) */}
      <g className={isMoving ? "scooter-wheel" : undefined}>
        <circle cx="22" cy="50" r="10" fill="#002C1E" stroke="#B8F34A" strokeWidth="2" />
        <circle cx="22" cy="50" r="6" fill="#087C32" stroke="#FFD84A" strokeWidth="1" />
        <circle cx="22" cy="50" r="2.5" fill="#FFD84A" />
        {/* Spokes */}
        <line x1="22" y1="40" x2="22" y2="60" stroke="#B8F34A" strokeWidth="1" />
        <line x1="12" y1="50" x2="32" y2="50" stroke="#B8F34A" strokeWidth="1" />
      </g>

      {/* 2. Front Wheel (Center: 74, 50) */}
      <g className={isMoving ? "scooter-wheel" : undefined}>
        <circle cx="74" cy="50" r="10" fill="#002C1E" stroke="#B8F34A" strokeWidth="2" />
        <circle cx="74" cy="50" r="6" fill="#087C32" stroke="#FFD84A" strokeWidth="1" />
        <circle cx="74" cy="50" r="2.5" fill="#FFD84A" />
        {/* Spokes */}
        <line x1="74" y1="40" x2="74" y2="60" stroke="#B8F34A" strokeWidth="1" />
        <line x1="64" y1="50" x2="84" y2="50" stroke="#B8F34A" strokeWidth="1" />
      </g>

      {/* ── Rider & Delivery Box Group (Subject to Suspension Bobbing) ── */}
      <g className={isMoving ? "rider-suspension" : undefined}>
        {/* ── HyperMart Insulated Delivery Box on Rear Rack ── */}
        <g transform="translate(10, 20)">
          {/* Delivery Box Base */}
          <rect
            x="0"
            y="0"
            width="22"
            height="22"
            rx="3"
            fill="#087C32"
            stroke="#B8F34A"
            strokeWidth="1.5"
          />
          {/* Reflective yellow safety band */}
          <rect x="0" y="8" width="22" height="4" fill="#FFD84A" />
          {/* HyperMart Logo Mini Cart on Box */}
          <path
            d="M5 14 L8 14 L11 18 L17 18"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="19.5" r="1" fill="#FFFFFF" />
          <circle cx="16" cy="19.5" r="1" fill="#FFFFFF" />
        </g>

        {/* ── Delivery Rider ── */}
        {/* Rider Legs & Seat */}
        <path
          d="M32 38 L42 38 L48 46 L54 46"
          stroke="#002C1E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Rider Jacket / Torso angled forward */}
        <path
          d="M38 36 L48 24 L58 26 L52 38 Z"
          fill="#087C32"
          stroke="#B8F34A"
          strokeWidth="1.2"
        />
        {/* High-visibility yellow safety sash across jacket */}
        <line x1="42" y1="34" x2="54" y2="25" stroke="#FFD84A" strokeWidth="1.8" />

        {/* Rider Arms reaching forward to handlebars */}
        <path
          d="M48 26 L62 26 L70 23"
          stroke="#002C1E"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48 26 L62 26 L70 23"
          stroke="#087C32"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Rider Helmet & Head */}
        <ellipse cx="50" cy="16" rx="6.5" ry="7" fill="#B8F34A" stroke="#003D29" strokeWidth="1.2" />
        {/* Helmet Dark Tinted Visor facing right */}
        <path
          d="M51 14 Q56 16 54 20"
          stroke="#002C1E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

