"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FooterNewsletterBar } from "./footer/FooterNewsletterBar";
import { FooterMainContent } from "./footer/FooterMainContent";
import { FooterLegalAndApps } from "./footer/FooterLegalAndApps";
import { FooterCitySkyline } from "./footer/FooterCitySkyline";
import { FooterDeliveryScooter } from "./footer/FooterDeliveryScooter";

export function Footer({ compact = false }: { compact?: boolean }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  // If compact mode is requested (e.g. non-home subpages / task pages),
  // render a lightweight minimal copyright bar without the creative 3D showcase and scooter.
  if (compact) {
    return (
      <footer className="w-full border-t border-[#E1E8E3] bg-[#FAFDF8] py-5 text-xs text-[#55695D]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 HyperMart Retail Pvt. Ltd. (demo). All rights reserved. All prices include GST.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <Link href="/legal/terms" className="hover:text-[#087C32] transition">
              Terms of Use
            </Link>
            <span>·</span>
            <Link href="/legal/privacy" className="hover:text-[#087C32] transition">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/legal/returns" className="hover:text-[#087C32] transition">
              Return Policy
            </Link>
            <span>·</span>
            <Link href="/legal/grievance" className="hover:text-[#087C32] transition">
              Grievance Officer
            </Link>
            <span>·</span>
            <Link href="/admin/login" className="font-bold text-[#087C32] hover:underline transition">
              Staff Portal Login
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Intersection Observer for Footer Entrance & Scooter Animation
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // When footer is completely scrolled out of viewport, pause animations to save resources
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#002C1E] text-white overflow-hidden"
    >
      {/* ── REGION A: Upper Promotional Scene / Newsletter Bar ── */}
      {!compact && (
        <FooterNewsletterBar
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* ── REGION B: Main Dark-Green Footer Navigation & 3D Showcase ── */}
      <FooterMainContent
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── REGION C: Legal Policies & App Download Strip ── */}
      <FooterLegalAndApps
        isVisible={isVisible}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* ── REGION C: Signature Illustrated City Skyline & Continuous Road ── */}
      <div className="relative w-full mt-2">
        <FooterCitySkyline
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* ── CRITICAL FEATURE: Animated Delivery Scooter Travelling Left to Right ── */}
        <FooterDeliveryScooter
          isVisible={isVisible}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* ── Bottom Glowing Wave Accents (Image 1 Specification) ── */}
      <div className="relative w-full h-5 sm:h-7 -mt-2 overflow-hidden pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle Golden-Yellow Accent */}
          <path
            d="M0 16 C360 8 720 22 1080 12 C1260 6 1380 18 1440 14"
            stroke="#FFD84A"
            strokeWidth="1.2"
            opacity="0.3"
          />
          {/* Fresh Lime-Green Wave */}
          <path
            d="M0 12 C340 4 680 18 1020 10 C1240 6 1360 14 1440 10 L1440 28 L0 28 Z"
            fill="url(#footer-wave-grad)"
            opacity="0.65"
          />
          <defs>
            <linearGradient id="footer-wave-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2E7E24" />
              <stop offset="50%" stopColor="#5CA630" />
              <stop offset="100%" stopColor="#2E7E24" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
}

export default Footer;
