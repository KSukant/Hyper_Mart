"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Gift } from "lucide-react";

interface DealsServiceStripProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealsServiceStrip({
  isVisible = false,
  prefersReducedMotion = false,
}: DealsServiceStripProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const items = [
    { icon: <Truck className="h-4 w-4 text-[#087C32]" />, label: "Fast Delivery" },
    { icon: <ShieldCheck className="h-4 w-4 text-[#087C32]" />, label: "Secure Payment" },
    { icon: <Gift className="h-4 w-4 text-[#087C32]" />, label: "Exclusive Offers" },
  ];

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : shouldAnimate
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 12 }
      }
      transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      className="flex justify-center w-full mt-8 sm:mt-10 z-10"
    >
      <div className="inline-flex items-center gap-4 sm:gap-8 rounded-full bg-white/95 px-5 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#102F25] shadow-md border border-[#D4EAC4] backdrop-blur-xs select-none">
        {items.map((item, idx) => (
          <React.Fragment key={item.label}>
            <div className="flex items-center gap-2">
              <span className="grid place-items-center">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {idx < items.length - 1 && (
              <div className="h-3.5 w-px bg-[#D4EAC4]" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}

