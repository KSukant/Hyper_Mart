"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GoldenOrbit } from "./GoldenOrbit";
import { SaleTag } from "./SaleTag";

export function ShoppingBagDisplay() {
  const shouldReduceMotion = useReducedMotion();

  const compartments = [
    { id: 1, title: "Food & Groceries", href: "/category/food", left: "10%", width: "19%", delay: 0.2 },
    { id: 2, title: "Electronics & Home", href: "/category/electronics", left: "30%", width: "19%", delay: 0.28 },
    { id: 3, title: "Fashion & Apparel", href: "/category/fashion", left: "50%", width: "19%", delay: 0.36 },
    { id: 4, title: "Beauty & Personal Care", href: "/category/beauty", left: "70%", width: "19%", delay: 0.44 },
  ];

  return (
    <div className="relative w-full max-w-[740px] xl:max-w-[820px] 2xl:max-w-[860px] max-h-[560px] aspect-[1.4/1] mx-auto flex items-center justify-center select-none">
      {/* ── 1. Golden Orbit: Back Layer (wraps behind the bag) ── */}
      <GoldenOrbit layer="back" />

      {/* ── 2. Decorative Floating Leaves (2.3–3.2s entrance, 6–8s idle) ── */}
      {/* Leaf 1: Top-Left (6s idle) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.85, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 15 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.85, scale: 1, y: 0 }
            : {
                opacity: 0.85,
                scale: 1,
                y: [0, -10, 0],
                rotate: [-6, 6, -6],
              }
        }
        transition={{
          opacity: { duration: 0.6, delay: 0.35 },
          scale: { duration: 0.6, delay: 0.35 },
          y: { duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
          rotate: { duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
        }}
        className="absolute top-8 left-10 w-9 h-9 sm:w-11 sm:h-11 z-5 pointer-events-none"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-md">
          <path
            d="M8 40 C 12 24, 28 10, 42 6 C 40 22, 26 38, 8 40 Z"
            fill="#52A145"
          />
          <path
            d="M12 36 C 22 26, 30 18, 40 8"
            stroke="#C6F04A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Leaf 2: Top-Right (7s idle) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.9, scale: 1, x: 0 } : { opacity: 0, scale: 0.7, x: -10 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.9, scale: 1, x: 0 }
            : {
                opacity: 0.9,
                scale: 1,
                x: [0, 8, 0],
                rotate: [4, -4, 4],
              }
        }
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          scale: { duration: 0.6, delay: 0.4 },
          x: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
          rotate: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
        }}
        className="absolute top-12 right-6 sm:right-10 w-8 h-8 sm:w-10 sm:h-10 z-5 pointer-events-none"
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-md">
          <path
            d="M40 40 C 36 24, 20 10, 6 6 C 8 22, 22 38, 40 40 Z"
            fill="#3B8A32"
          />
          <path
            d="M36 36 C 26 26, 18 18, 8 8"
            stroke="#9EE841"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Leaf 3: Mid-Left Floating (8s idle) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0.75, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
        animate={
          shouldReduceMotion
            ? { opacity: 0.75, scale: 1, y: 0 }
            : {
                opacity: 0.75,
                scale: 1,
                y: [0, -8, 0],
              }
        }
        transition={{
          opacity: { duration: 0.6, delay: 0.45 },
          scale: { duration: 0.6, delay: 0.45 },
          y: { duration: 8, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
        }}
        className="absolute top-1/2 -left-2 w-7 h-7 sm:w-8 sm:h-8 z-5 pointer-events-none"
      >
        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-sm">
          <path
            d="M6 30 C 10 18, 22 8, 32 4 C 30 16, 20 28, 6 30 Z"
            fill="#65B650"
          />
        </svg>
      </motion.div>

      {/* ── 3. Main 3D Shopping Bag Assembly ── */}
      {/* Outer Wrapper: Dedicated entrance animation (scale, opacity, y, rotate) to prevent transform conflict */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 1, scale: 1, y: 0, rotate: 0 }
            : { opacity: 0, scale: 0.88, y: 35, rotate: -1.5 }
        }
        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full h-full flex items-center justify-center z-15"
      >
        {/* Middle Wrapper: Dedicated idle floating animation (y float) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [0, -7, 0] }
          }
          transition={{
            duration: 5.5,
            delay: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Hanging 70% OFF Tag (attached to bag handle) */}
          <SaleTag />

          {/* The 3D Sculptural Bag & Lit Podium Canvas */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Reactive Bag Shadow underneath podium (scales subtly with float) */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? { opacity: 0.25, scale: 1 }
                  : {
                      opacity: [0.25, 0.16, 0.25],
                      scale: [1, 0.94, 1],
                    }
              }
              transition={{
                duration: 5.5,
                delay: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[72%] h-12 rounded-[50%] bg-[#06431B] blur-xl pointer-events-none z-5"
            />

            <div className="relative w-full h-full z-10">
              <Image
                src="/hero-bag-feathered-hd.png"
                alt="HyperMart 3D Shopping Bag with 4 Illuminated Collections"
                fill
                priority
                className="object-contain object-center drop-shadow-[0_20px_45px_rgba(6,67,27,0.18)]"
                sizes="(max-width: 1024px) 95vw, 840px"
              />

              {/* ── 4. Four Integrated Compartments: Staggered Light Reveal & Interactive Links ── */}
              {/* Reveals sequentially at 900ms, 1050ms, 1200ms, 1350ms without duplicate imagery */}
              <div className="absolute top-[28%] bottom-[20%] left-[10%] right-[10%] z-25 flex pointer-events-auto">
                {compartments.map((comp) => (
                  <Link
                    key={comp.id}
                    href={comp.href}
                    title={`Shop ${comp.title}`}
                    className="relative flex-1 h-full rounded-2xl group cursor-pointer transition-all duration-300 overflow-hidden"
                  >
                    {/* Staggered Entrance Light Glow Reveal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 10 }}
                      animate={{
                        opacity: [0, 0.6, 0.12],
                        scale: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: comp.delay,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/30 via-white/10 to-transparent pointer-events-none"
                    />

                    {/* Compartment Hover Ambient Glow */}
                    <div className="absolute inset-0 rounded-2xl transition-all duration-200 group-hover:bg-white/12 group-hover:shadow-[inset_0_0_24px_rgba(198,240,74,0.35)] pointer-events-none" />

                    <span className="sr-only">{comp.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── 5. Golden Orbit: Front Layer (crosses over the foreground of the podium) ── */}
      <GoldenOrbit layer="front" />
    </div>
  );
}
