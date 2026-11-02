"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gift, Check, ArrowRight, BadgeCheck } from "lucide-react";
import { useMember } from "@/store";
import { toast } from "@/components/ui/primitives";

interface RewardsPanelProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function RewardsPanel({
  isVisible = false,
  prefersReducedMotion = false,
}: RewardsPanelProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;
  const isMember = useMember((s) => s.isMember);
  const setMember = useMember((s) => s.setMember);

  const benefitsCol1 = [
    "Member prices on 2,000+ products",
    "Free delivery on orders above ₹199",
  ];
  const benefitsCol2 = [
    "Early access to deals",
    "Free gift wrap",
  ];

  const handleJoinRewards = () => {
    setMember(true);
    toast("Welcome to HyperMart Rewards! First 30 days are free.");
  };

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : shouldAnimate
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 30 }
      }
      transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 w-full overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#0B5C35] via-[#064729] to-[#04341B] p-6 sm:p-7 lg:p-8 text-white shadow-[0_16px_40px_rgba(4,51,25,0.3)] border border-[#0F753C]/50 flex flex-col justify-between"
    >
      {/* ── Background Translucent Radial Highlight ── */}
      <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[#B8F34A]/12 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-[#087C32]/25 blur-xl pointer-events-none" />

      {/* ── Main Layout: Text Content on Left, 3D Art on Right ── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 h-full">
        {/* Left Column Content */}
        <div className="flex-1 w-full max-w-full sm:max-w-[340px] lg:max-w-[370px] flex flex-col items-start justify-between">
          <div>
            {/* 5.2 Rewards Label Pill (250–700ms) */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.94 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scale: 1 }
                  : shouldAnimate
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.94 }
              }
              transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#B8F34A] px-3.5 py-1 text-xs font-black text-[#085A2E] shadow-sm mb-3.5 select-none"
            >
              <Gift className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>HyperMart Rewards</span>
            </motion.div>

            {/* 5.3 Rewards Heading (350–1050ms) */}
            <motion.h2
              initial={
                prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : shouldAnimate
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 22 }
              }
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl lg:text-[33px] font-black tracking-tight leading-[1.14] text-white"
            >
              Member prices on <br />
              <span className="text-[#B8F34A]">everyday favourites</span>
            </motion.h2>

            {/* 5.4 Annual Membership Price Ribbon (600–1100ms) */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : shouldAnimate
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.45, delay: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-xs sm:text-[13px] font-semibold text-white/95 border border-white/10 mt-3.5 mb-4 select-none shadow-xs"
            >
              <span className="rounded-md bg-[#FFD84A] px-2 py-0.5 font-black text-[#102F25] text-xs">
                ₹299
              </span>
              <span>a year • First 30 days free</span>
            </motion.div>

            {/* 5.5 Membership Benefits List (750–1450ms, 2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5 w-full text-xs sm:text-[13px] text-white/95 font-medium mb-6">
              <div className="flex flex-col gap-2.5">
                {benefitsCol1.map((b, idx) => (
                  <motion.div
                    key={b}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : shouldAnimate
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.75 + idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#B8F34A]/25">
                      <Check className="h-3 w-3 text-[#B8F34A] stroke-[3]" />
                    </span>
                    <span>{b}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                {benefitsCol2.map((b, idx) => (
                  <motion.div
                    key={b}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : shouldAnimate
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.95 + idx * 0.1,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#B8F34A]/25">
                      <Check className="h-3 w-3 text-[#B8F34A] stroke-[3]" />
                    </span>
                    <span>{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 5.7 Join Rewards Button (1350–1850ms) */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 15, scale: 0.96 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : shouldAnimate
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 15, scale: 0.96 }
            }
            transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
            className="w-full sm:w-auto"
          >
            {isMember ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white border border-white/20 select-none shadow-sm">
                <BadgeCheck className="h-4 w-4 text-[#B8F34A]" />
                You’re a Rewards Member
              </span>
            ) : (
              <motion.button
                type="button"
                onClick={handleJoinRewards}
                whileHover={
                  !prefersReducedMotion
                    ? {
                        y: -3,
                        scale: 1.02,
                        boxShadow: "0 8px 24px rgba(184, 243, 74, 0.38)",
                        transition: { duration: 0.2 },
                      }
                    : undefined
                }
                whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#B8F34A] px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-[#085A2E] shadow-md hover:bg-[#A8EB38] transition-all cursor-pointer select-none"
              >
                <span>Join Rewards</span>
                <motion.span
                  whileHover={
                    !prefersReducedMotion
                      ? { x: 4, transition: { duration: 0.2 } }
                      : undefined
                  }
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* 5.6 Rewards Gift & Membership Illustration (950–1750ms + 6s Float) */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 25, scale: 0.92 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : shouldAnimate
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 25, scale: 0.92 }
          }
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[210px] sm:max-w-[230px] lg:max-w-[245px] shrink-0 self-center lg:self-center pointer-events-none select-none"
        >
          <motion.div
            animate={
              shouldAnimate
                ? { y: [0, -4, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full flex items-center justify-center"
          >
            <Image
              src="/rewards-art-clean.png"
              alt="HyperMart Rewards 3D Membership and Gift Showcase"
              width={241}
              height={344}
              className="w-full h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.38)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
