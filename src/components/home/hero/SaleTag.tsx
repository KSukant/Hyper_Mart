"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function SaleTag() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      className="absolute top-2 right-12 sm:right-20 z-30 pointer-events-auto"
      style={{ transformOrigin: "top center" }}
    >
      {/* Idle Swinging Motion */}
      <motion.div
        animate={shouldReduceMotion ? { rotate: 0 } : { rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
        whileHover={{ filter: "brightness(1.12)" }}
        style={{ transformOrigin: "top center" }}
        className="flex flex-col items-center transition-all cursor-pointer"
      >
        {/* Golden Hanging String */}
        <div className="w-0.5 h-7 sm:h-9 bg-gradient-to-b from-[#FFE875] to-[#D4A017] shadow-xs" />

        {/* Eyelet Ring */}
        <div className="w-3 h-3 rounded-full border-2 border-[#FFE875] bg-[#06431B] -mt-1 z-10" />

        {/* Tag Body */}
        <div className="px-3.5 py-2 rounded-2xl bg-gradient-to-br from-[#087A4A] to-[#044322] border-2 border-[#C6F04A] text-white text-center shadow-xl -mt-1.5 min-w-[90px]">
          <span className="text-[9px] font-black tracking-widest text-[#C6F04A] uppercase block leading-tight">
            UP TO
          </span>
          <span className="text-base sm:text-lg font-black tracking-tight block leading-none my-0.5">
            70% OFF
          </span>
          <span className="text-[8px] font-bold text-white/80 uppercase tracking-wider block leading-tight">
            MEGA DEALS
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
