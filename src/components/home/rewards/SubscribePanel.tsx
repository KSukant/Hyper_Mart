"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Repeat, Milk, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/primitives";

interface SubscribePanelProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function SubscribePanel({
  isVisible = false,
  prefersReducedMotion = false,
}: SubscribePanelProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const thumbnails = [
    {
      id: "milk",
      name: "Milk",
      src: "/sub-thumb-milk.png",
      href: "/product/amul-toned-milk-1l",
      bgTint: "bg-[#E0F2FE] border-[#BAE6FD]",
    },
    {
      id: "eggs",
      name: "Eggs",
      src: "/sub-thumb-eggs.png",
      href: "/category/food",
      bgTint: "bg-[#FEF3C7] border-[#FDE68A]",
    },
    {
      id: "tomatoes",
      name: "Fresh Tomatoes",
      src: "/sub-thumb-tomatoes.png",
      href: "/product/fresh-tomatoes",
      bgTint: "bg-[#FCE7F3] border-[#FBCFE8]",
    },
    {
      id: "lettuce",
      name: "Fresh Lettuce",
      src: "/sub-thumb-lettuce.png",
      href: "/category/food",
      bgTint: "bg-[#DCFCE7] border-[#BBF7D0]",
    },
  ];

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
      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 w-full overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#FAF8E4] via-[#F6F9E8] to-[#EAF5E5] p-6 sm:p-7 lg:p-8 text-[#102F25] shadow-[0_14px_38px_rgba(8,90,46,0.08)] border border-[#D4EAC4] flex flex-col justify-between"
    >
      {/* ── Background Subtle Ambient Wave Accent ── */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#B8F34A]/25 blur-2xl pointer-events-none" />

      {/* ── Main Layout: Text & Thumbnails on Left, 3D Art on Right ── */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 h-full">
        {/* Left Column Content */}
        <div className="flex-1 w-full max-w-full sm:max-w-[340px] lg:max-w-[370px] flex flex-col items-start justify-between">
          <div>
            {/* 6.2 Subscription Label Pill (300–750ms) */}
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
              transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#087C32] px-3.5 py-1 text-xs font-black text-white shadow-sm mb-3.5 select-none"
            >
              <Repeat className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Subscribe and Save</span>
            </motion.div>

            {/* 6.3 Subscription Heading (450–1150ms) with hand-drawn yellow underline */}
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
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl lg:text-[33px] font-black tracking-tight leading-[1.14] text-[#102F25]"
            >
              Milk, eggs and veggies <br />
              <span className="relative inline-block text-[#087C32]">
                on your schedule
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2.5 text-[#FFD84A] pointer-events-none"
                  viewBox="0 0 160 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 5C45 2 115 2 158 6"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* 6.4 Supporting Text (650–1100ms) */}
            <motion.p
              initial={
                prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : shouldAnimate
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              transition={{ duration: 0.45, delay: 0.65, ease: "easeOut" }}
              className="text-xs sm:text-[13px] text-[#475A4E] leading-relaxed mt-3.5 mb-4"
            >
              Pause or skip any day before 10 PM. <br />
              Pay only for delivered days.
            </motion.p>

            {/* 6.5 Product Image Thumbnails (850–1450ms, 120ms Stagger) */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-6">
              {thumbnails.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 18, scale: 0.88 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0, scale: 1 }
                      : shouldAnimate
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 18, scale: 0.88 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.85 + idx * 0.12,
                    ease: "easeOut",
                  }}
                  whileHover={
                    !prefersReducedMotion
                      ? {
                          y: -3,
                          scale: 1.08,
                          boxShadow: "0 8px 18px rgba(8, 90, 46, 0.18)",
                          transition: { duration: 0.2 },
                        }
                      : undefined
                  }
                  className="group/thumb"
                >
                  <Link
                    href={t.href}
                    className={`block relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden p-1 shadow-xs border ${t.bgTint} transition-shadow`}
                    title={`Subscribe to ${t.name}`}
                  >
                    <Image
                      src={t.src}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover rounded-xl group-hover/thumb:scale-105 transition-transform"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 6.7 Start a Subscription Button (1450–1950ms) */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : shouldAnimate
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/product/amul-toned-milk-1l"
              onClick={() => {
                toast("Opening Daily Milk Subscription setup...");
              }}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#102F25] px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#085A2E] hover:shadow-[0_6px_20px_rgba(8,90,46,0.3)] transition-all cursor-pointer select-none"
            >
              <Milk className="h-4 w-4 text-[#B8F34A]" />
              <span>Start a subscription</span>
              <motion.span
                whileHover={
                  !prefersReducedMotion
                    ? { x: 4, transition: { duration: 0.2 } }
                    : undefined
                }
              >
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* 6.6 Grocery Subscription 3D Art (1050–1850ms + Ambient Idle) */}
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
          className="relative w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[235px] shrink-0 self-center lg:self-center pointer-events-none select-none"
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
              src="/subscription-art-final.png"
              alt="HyperMart Recurring Grocery Delivery Subscription Box and Calendar"
              width={190}
              height={307}
              className="w-full h-auto object-contain drop-shadow-[0_14px_28px_rgba(8,90,46,0.15)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
