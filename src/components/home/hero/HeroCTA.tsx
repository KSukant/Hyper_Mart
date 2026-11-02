"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
      className="z-20 w-fit"
    >
      <Link
        href="/category"
        className="group inline-flex items-center gap-3 px-7 py-3.5 sm:py-4 rounded-full bg-[#087A4A] text-white font-black text-base sm:text-lg shadow-lg hover:bg-[#06643C] hover:shadow-[0_14px_28px_-6px_rgba(8,122,74,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer select-none"
      >
        <span>Explore Collections</span>
        <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-200" />
      </Link>
    </motion.div>
  );
}
