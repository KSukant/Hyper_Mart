"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Lock, Tag, Check } from "lucide-react";
import { toast } from "@/components/ui/primitives";

interface FooterNewsletterBarProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function FooterNewsletterBar({
  isVisible = false,
  prefersReducedMotion = false,
}: FooterNewsletterBarProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    // Realistic API dispatch simulation
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      toast("You're subscribed to HyperMart weekly deals and city flash sales!");
      setEmail("");
    }, 600);
  };

  return (
    <div className="relative w-full bg-[#FAFEEF] overflow-hidden pt-7 sm:pt-9">
      {/* ── Background Organic Mint Wave & Glow ── */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#B8F34A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* ── Floating Decorative Leaves ── */}
      <motion.div
        animate={
          shouldAnimate
            ? { y: [0, -4, 0], rotate: [-20, -15, -20] }
            : { y: 0 }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-3 left-[2%] w-7 h-7 sm:w-9 sm:h-9 text-[#68B832] opacity-80 pointer-events-none select-none"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path
            d="M6 42C6 42 12 18 38 10C38 10 38 34 16 42C12 43.5 8 43 6 42Z"
            fill="#89D94A"
          />
          <path d="M12 36C18 28 26 20 38 10" stroke="#4F9922" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <motion.div
        animate={
          shouldAnimate
            ? { y: [0, -5, 0], rotate: [25, 32, 25] }
            : { y: 0 }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-3 right-[3%] w-8 h-8 sm:w-10 sm:h-10 text-[#68B832] opacity-75 pointer-events-none select-none"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path
            d="M8 40C8 40 14 16 38 8C38 8 36 32 18 40C14 41.5 10 41 8 40Z"
            fill="#B2F25E"
          />
          <path d="M14 34C20 26 27 18 38 8" stroke="#4F9922" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ── Main Composition Container ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Side: 3D Megaphone & Main Headline */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 max-w-2xl">
            {/* 3D Megaphone Illustration with gentle ambient bob */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85, y: 15 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : shouldAnimate
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 15 }
              }
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="shrink-0 pointer-events-none select-none"
            >
              <motion.div
                animate={shouldAnimate ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center drop-shadow-[0_8px_16px_rgba(8,124,50,0.18)]"
              >
                <Image
                  src="/footer-megaphone-clean.png"
                  alt="HyperMart Savings & City Offers Megaphone"
                  width={86}
                  height={74}
                  className="w-full h-auto object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Headline & Description */}
            <div className="flex flex-col">
              <motion.h3
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : shouldAnimate
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
                className="text-xl sm:text-2xl lg:text-[25px] font-black tracking-tight text-[#003D29] leading-tight"
              >
                Stay updated with HyperMart{" "}
                <span className="text-[#087C32]">savings & city offers</span>
              </motion.h3>

              <motion.p
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={
                  prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : shouldAnimate
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="text-xs sm:text-sm text-[#475A4E] mt-1 font-medium"
              >
                Subscribe for weekly flash sales, fresh season arrivals, and members-only deals.
              </motion.p>
            </div>
          </div>

          {/* Right Side: Newsletter Subscription Pill Input & Trust Badges */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : shouldAnimate
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
            className="w-full max-w-md flex flex-col items-center sm:items-end"
          >
            {isSubscribed ? (
              <div className="flex items-center gap-2.5 rounded-full bg-[#EAF8D9] border border-[#BCE88C] px-6 py-3 text-xs sm:text-sm font-bold text-[#087C32] shadow-xs">
                <Check className="h-4 w-4 stroke-[3] text-[#087C32]" />
                <span>Thank you! You are subscribed to city offers and weekly deals.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                {/* Pill Container for Input + Button */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                  <div className="relative w-full flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#087C32]/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email address"
                      aria-label="Email address for city offers"
                      className="h-11 sm:h-12 w-full rounded-full border border-[#CDE7BE] bg-white pl-11 pr-4 text-xs sm:text-sm text-[#102F25] placeholder-[#738B7C] outline-none transition focus:border-[#087C32] focus:ring-2 focus:ring-[#087C32]/20 shadow-xs"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={
                      !prefersReducedMotion
                        ? {
                            y: -2,
                            scale: 1.02,
                            boxShadow: "0 6px 20px rgba(184, 243, 74, 0.4)",
                            transition: { duration: 0.2 },
                          }
                        : undefined
                    }
                    whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
                    className="group flex h-11 sm:h-12 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-[#D1F33F] hover:bg-[#B8F34A] px-6 text-xs sm:text-sm font-black text-[#003D29] shadow-md transition cursor-pointer select-none"
                  >
                    <span>{loading ? "Subscribing..." : "Subscribe"}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {error && (
                  <span className="text-xs font-semibold text-rose-600 pl-4">
                    {error}
                  </span>
                )}

                {/* Trust Badges underneath input */}
                <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[11px] font-medium text-[#5F7567] pt-0.5 px-2">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-[#087C32]" />
                    No spam. Unsubscribe anytime.
                  </span>
                  <span className="text-[#C2D8BA]">|</span>
                  <span className="flex items-center gap-1.5">
                    <Tag className="h-3 w-3 text-[#087C32]" />
                    Get exclusive offers & early access.
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Signature Organic Wave Transition into Forest Green Footer (Image 1 Specification) ── */}
      <div className="relative w-full mt-6 sm:mt-8 -mb-1 overflow-hidden pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 block"
        >
          {/* Subtle Glowing Yellow Under-crest Accent */}
          <path
            d="M0 24 C280 48 560 6 880 34 C1080 50 1280 26 1440 18 L1440 60 L0 60 Z"
            fill="#F4C52E"
            opacity="0.25"
          />
          {/* Lime Green Accent Line */}
          <path
            d="M0 20 C280 44 560 2 880 30 C1080 46 1280 22 1440 14"
            stroke="#C5EA42"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Deep Forest Green Footer Background Fill */}
          <path
            d="M0 20 C280 44 560 2 880 30 C1080 46 1280 22 1440 14 L1440 60 L0 60 Z"
            fill="#002C1E"
          />
        </svg>
      </div>
    </div>
  );
}

