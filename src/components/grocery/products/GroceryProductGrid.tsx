"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf, PackageSearch, RotateCcw } from "lucide-react";
import type { Product } from "@/types";
import { GroceryProductCard } from "./GroceryProductCard";

interface GroceryProductGridProps {
  products: Product[];
  onResetFilters: () => void;
}

export function GroceryProductGrid({
  products,
  onResetFilters,
}: GroceryProductGridProps) {
  const prefersReduced = useReducedMotion();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-[#FFF9EB] border border-[#F4E3B5] p-12 text-center my-6">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF5E5] text-[#075B36] mb-3">
          <PackageSearch className="w-7 h-7 stroke-[2]" />
        </span>
        <h3 className="text-lg font-display font-extrabold text-[#075B36]">
          No matching fresh products found
        </h3>
        <p className="text-xs sm:text-sm text-[#64756A] max-w-md mt-1 mb-4 font-medium">
          Try relaxing your filters (e.g. choose Grade A or B, clear dietary or allergen restrictions) or explore all aisles.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#075B36] hover:bg-[#06472C] text-white px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: Math.min(idx * 0.05, 0.3),
            ease: "easeOut",
          }}
        >
          <GroceryProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}

