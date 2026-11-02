"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MasterDeal } from "./dealsData";
import { DealArchCard } from "./DealArchCard";

interface DealsArchShowcaseProps {
  deals: MasterDeal[];
  selectedCategory: string;
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealsArchShowcase({
  deals,
  selectedCategory,
  isVisible = false,
  prefersReducedMotion = false,
}: DealsArchShowcaseProps) {
  const filteredDeals =
    selectedCategory === "all"
      ? deals
      : deals.filter((d) => d.department === selectedCategory);

  return (
    <div className="w-full">
      <AnimatePresence mode="popLayout">
        {filteredDeals.length > 0 ? (
          <motion.div
            key={`deals-grid-${selectedCategory}`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`grid gap-3.5 sm:gap-4 lg:gap-5 ${
              filteredDeals.length === 1
                ? "grid-cols-1 max-w-[280px]"
                : filteredDeals.length === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-[580px]"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {filteredDeals.map((deal, idx) => (
              <DealArchCard
                key={deal.id}
                deal={deal}
                index={idx}
                isVisible={isVisible}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 border border-[#D4EAC4] text-[#65736B] text-sm">
            <p>No active deals in this category right now.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

