"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBasket, Shirt, Tv, Sparkles } from "lucide-react";
import { CATEGORY_FILTERS } from "./dealsData";

interface DealsCategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealsCategoryFilters({
  selectedCategory,
  onSelectCategory,
  isVisible = false,
  prefersReducedMotion = false,
}: DealsCategoryFiltersProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const getIcon = (id: string) => {
    switch (id) {
      case "food":
        return <ShoppingBasket className="w-3.5 h-3.5 text-[#087C32]" />;
      case "fashion":
        return <Shirt className="w-3.5 h-3.5 text-[#087C32]" />;
      case "electronics":
        return <Tv className="w-3.5 h-3.5 text-[#087C32]" />;
      case "beauty":
        return <Sparkles className="w-3.5 h-3.5 text-[#087C32]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1">
      {CATEGORY_FILTERS.map((cat, idx) => {
        const isActive = selectedCategory === cat.id;
        const icon = getIcon(cat.id);

        return (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            aria-pressed={isActive}
            initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.94 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : shouldAnimate
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 15, scale: 0.94 }
            }
            transition={{
              duration: 0.45,
              delay: 0.65 + idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              !prefersReducedMotion
                ? { y: -2, transition: { duration: 0.2 } }
                : undefined
            }
            whileTap={!prefersReducedMotion ? { scale: 0.96 } : undefined}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#087C32] select-none ${
              isActive
                ? "bg-[#103B2B] text-white shadow-sm border border-[#103B2B]"
                : "bg-white/95 text-[#102F25] border border-[#D4EAC4] hover:bg-[#F3F9EE] hover:border-[#A3E635] shadow-xs"
            }`}
          >
            {icon && (
              <span className={isActive ? "brightness-200 contrast-200 text-white" : ""}>
                {icon}
              </span>
            )}
            <span>{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

