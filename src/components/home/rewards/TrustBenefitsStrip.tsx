"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShoppingCart, Truck, RotateCcw } from "lucide-react";

interface TrustBenefitsStripProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function TrustBenefitsStrip({
  isVisible = false,
  prefersReducedMotion = false,
}: TrustBenefitsStripProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const benefits = [
    {
      id: "quality",
      icon: <ShieldCheck className="w-5 h-5 text-[#087C32] stroke-[2.5]" />,
      iconBg: "bg-[#D9F5B2] border border-[#BCE88C]",
      title: "Quality checked",
      desc: "Fresh items are graded and checked before packing.",
    },
    {
      id: "sold-by-hm",
      icon: <ShoppingCart className="w-5 h-5 text-[#92400E] stroke-[2.5]" />,
      iconBg: "bg-[#FEF08A] border border-[#FDE047]",
      title: "Sold by HyperMart",
      desc: "Every product is sold and invoiced by us. Brands you know, sourced from trusted partners.",
    },
    {
      id: "delivery-team",
      icon: <Truck className="w-5 h-5 text-[#6D28D9] stroke-[2.5]" />,
      iconBg: "bg-[#DDD6FE] border border-[#C4B5FD]",
      title: "Our own delivery team",
      desc: "Delivered by HyperMart partners, not third-party couriers.",
    },
    {
      id: "returns",
      icon: <RotateCcw className="w-5 h-5 text-[#C2410C] stroke-[2.5]" />,
      iconBg: "bg-[#FED7AA] border border-[#FDBA74]",
      title: "Clear returns and refunds",
      desc: "Every product shows its exact return rule before you buy.",
    },
  ];

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : shouldAnimate
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
      className="w-full mt-6 sm:mt-8 z-10"
    >
      <div className="rounded-3xl bg-white/95 backdrop-blur-xs border border-[#D8ECD0] p-4 sm:p-6 shadow-[0_8px_30px_rgba(8,90,46,0.08)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#EAF2E6]">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : shouldAnimate
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                duration: 0.4,
                delay: 0.45 + idx * 0.08,
                ease: "easeOut",
              }}
              whileHover={
                !prefersReducedMotion
                  ? { y: -2, transition: { duration: 0.2 } }
                  : undefined
              }
              className={`flex items-start gap-3.5 ${
                idx > 0 ? "pt-3.5 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              {/* Icon Circle */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { scale: 1 }
                    : { scale: 0.75 }
                }
                animate={
                  prefersReducedMotion
                    ? { scale: 1 }
                    : shouldAnimate
                    ? { scale: 1 }
                    : { scale: 0.75 }
                }
                transition={{
                  duration: 0.45,
                  delay: 0.35 + idx * 0.08,
                  ease: "easeOut",
                }}
                className={`grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full ${b.iconBg} shadow-xs select-none`}
              >
                {b.icon}
              </motion.div>

              {/* Text Info */}
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#102F25] leading-snug">
                  {b.title}
                </h4>
                <p className="mt-1 text-xs text-[#526359] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

