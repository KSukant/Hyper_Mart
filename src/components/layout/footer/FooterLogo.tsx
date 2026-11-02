"use client";

import React from "react";
import Link from "next/link";

export function FooterLogo() {
  return (
    <Link
      href="/shop"
      aria-label="HyperMart Home"
      className="inline-flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98] select-none"
    >
      {/* ── Vector Shopping Cart with Fresh Leaves (Image 1 Specification) ── */}
      <div className="relative w-11 h-11 shrink-0">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(184,243,74,0.35)]"
        >
          {/* Leaves Sprouting from Cart */}
          <path
            d="M26 18C26 18 29 8 38 6C38 6 39 15 32 18C29 19.5 27 18.5 26 18Z"
            fill="#B8F34A"
          />
          <path
            d="M30 15C33 11 36 8 38 6"
            stroke="#085A2E"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M23 20C23 20 20 12 15 13C15 13 15 20 20 21C21.5 21.2 22.5 20.5 23 20Z"
            fill="#7CD33B"
          />

          {/* Cart Handle */}
          <path
            d="M6 14H11L14.5 28H33L37 17H16"
            stroke="#B8F34A"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Front Slant Accent Line */}
          <path
            d="M17 22H31"
            stroke="#B8F34A"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Left Wheel */}
          <circle cx="18" cy="34" r="3" fill="#B8F34A" />
          <circle cx="18" cy="34" r="1.2" fill="#002C1E" />

          {/* Right Wheel */}
          <circle cx="30" cy="34" r="3" fill="#B8F34A" />
          <circle cx="30" cy="34" r="1.2" fill="#002C1E" />
        </svg>
      </div>

      {/* ── Brand Typography: White 'Hyper' + Yellow 'Mart' + Smile Underline ── */}
      <div className="flex flex-col">
        <div className="flex items-baseline leading-none font-sans font-black tracking-tight text-[26px] sm:text-[28px]">
          <span className="text-white drop-shadow-xs">Hyper</span>
          <span className="text-[#F4C52E] drop-shadow-xs ml-0.5">Mart</span>
        </div>

        {/* Golden-Yellow Curved Underline Smile beneath 'Mart' */}
        <div className="self-end w-14 -mt-0.5 pr-0.5">
          <svg viewBox="0 0 60 8" fill="none" className="w-full h-2">
            <path
              d="M2 2C18 7 42 7 58 2"
              stroke="#F4C52E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

