"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { site } from "@/mocks";

interface FooterLegalAndAppsProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function FooterLegalAndApps({
  isVisible = false,
  prefersReducedMotion = false,
}: FooterLegalAndAppsProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const socialLinks = [
    { id: "instagram", icon: <Instagram className="w-3.5 h-3.5" />, href: "https://instagram.com/hypermart", label: "Instagram" },
    { id: "facebook", icon: <Facebook className="w-3.5 h-3.5" />, href: "https://facebook.com/hypermart", label: "Facebook" },
    { id: "youtube", icon: <Youtube className="w-3.5 h-3.5" />, href: "https://youtube.com/hypermart", label: "YouTube" },
    { id: "twitter", icon: <Twitter className="w-3.5 h-3.5" />, href: "https://twitter.com/hypermart", label: "X (Twitter)" },
  ];

  return (
    <div className="relative z-10 w-full border-t border-[#0D5136] pt-6 pb-4 text-xs text-white/70">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5">
        {/* ── ROW 1: Legal Copyright & Policies Links ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-white/75 font-medium">
          <p className="text-[11px] sm:text-xs">
            © 2026 {site.legalName}. All rights reserved. All prices include GST.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs">
            <Link href="/legal/terms" className="hover:text-[#B8F34A] transition-colors py-0.5">
              Terms of Use
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/legal/privacy" className="hover:text-[#B8F34A] transition-colors py-0.5">
              Privacy Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/legal/returns" className="hover:text-[#B8F34A] transition-colors py-0.5">
              Return Policy
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/legal/grievance" className="hover:text-[#B8F34A] transition-colors py-0.5">
              Grievance Officer
            </Link>
            <span className="text-white/30">|</span>
            <Link
              href="/admin/login"
              className="text-[#FFD84A] font-bold hover:text-white transition-colors py-0.5"
            >
              Staff Portal Login
            </Link>
          </div>
        </div>

        {/* ── ROW 2: App Badges on Left, Social Icons on Right ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* App Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-white/80">Get the HyperMart App</span>
            <div className="flex items-center gap-2">
              {/* App Store Badge */}
              <a
                href="#download-ios"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Opening HyperMart iOS App on App Store...");
                }}
                className="group inline-flex items-center gap-2 rounded-lg bg-black/60 hover:bg-black/80 px-3 py-1.5 border border-white/20 transition-all hover:scale-105 active:scale-95"
                title="Download on App Store"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.64 1.36-.56.65-1.06 1.71-.93 2.74 1.01.08 2.04-.48 2.65-1.23z" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-[8px] uppercase tracking-wider text-white/60">Download on the</span>
                  <span className="block text-xs font-bold text-white tracking-wide">App Store</span>
                </div>
              </a>

              {/* Google Play Badge */}
              <a
                href="#download-android"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Opening HyperMart Android App on Google Play...");
                }}
                className="group inline-flex items-center gap-2 rounded-lg bg-black/60 hover:bg-black/80 px-3 py-1.5 border border-white/20 transition-all hover:scale-105 active:scale-95"
                title="Get it on Google Play"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.3 0 .58.09.82.25l13.68 8.5c.61.38.61 1.62 0 2l-13.68 8.5c-.24.16-.52.25-.82.25-.83 0-1.5-.67-1.5-1.5z" />
                </svg>
                <div className="text-left leading-tight">
                  <span className="block text-[8px] uppercase tracking-wider text-white/60">GET IT ON</span>
                  <span className="block text-xs font-bold text-white tracking-wide">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Follow Us & Social Icons */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white/80">Follow Us</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((s, idx) => (
                <motion.a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={
                    !prefersReducedMotion
                      ? {
                          scale: 1.12,
                          backgroundColor: "#B8F34A",
                          color: "#003D29",
                          borderColor: "#B8F34A",
                        }
                      : undefined
                  }
                  whileTap={!prefersReducedMotion ? { scale: 0.94 } : undefined}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/30 text-white/90 transition-colors cursor-pointer shadow-xs"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

