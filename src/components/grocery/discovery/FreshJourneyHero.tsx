"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Sparkles,
  ShieldCheck,
  Snowflake,
  Scale,
  MapPin,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useShopper } from "@/lib/hooks";

interface FreshJourneyHeroProps {
  onSearch: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
}

export function FreshJourneyHero({
  onSearch,
  onSelectCategory,
  searchQuery,
}: FreshJourneyHeroProps) {
  const { city, area } = useShopper();
  const prefersReduced = useReducedMotion();
  const [localInput, setLocalInput] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localInput);
  };

  const QUICK_TAGS = [
    { label: "Fresh Vegetables", id: "food-fresh-vegetables" },
    { label: "Fresh Fruits", id: "food-fresh-fruits" },
    { label: "Dairy & Milk", id: "food-dairy" },
    { label: "Staples & Atta", id: "food-staples" },
    { label: "Snacks", id: "food-snacks" },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFF9EB] via-[#F4F8EE] to-[#EAF5E5] border border-[#DFE9DC] p-6 sm:p-8 lg:p-10 shadow-sm">
      {/* Decorative subtle ambient circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C5EA42]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#075B36]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Search & Value Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Eyebrow & Live Fulfillment Pill */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#075B36] px-3 py-1 text-xs font-black tracking-wider text-[#C5EA42] uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5EA42]" />
              HyperMart Fresh Journey
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#075B36] border border-[#DFE9DC] backdrop-blur-xs">
              <MapPin className="w-3.5 h-3.5 text-[#07834B]" />
              Fulfillment in {city.name} {area ? `· ${area.area}` : ""}
            </span>
          </div>

          {/* Main Title */}
          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-[#075B36] tracking-tight leading-[1.12]"
          >
            From local farms to your kitchen —{" "}
            <span className="text-[#07834B] underline decoration-[#C5EA42] decoration-4 underline-offset-4">
              pure, graded, everyday fresh.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-[#17251D]/80 max-w-2xl font-medium leading-relaxed">
            Discover fresh harvests graded A, B, and C with transparent pricing. Chilled milk pouches, farm eggs, daily vegetables and pantry staples — quality-checked and delivered with cold-chain care.
          </p>

          {/* Integrated Grocery Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center w-full max-w-xl rounded-2xl bg-white border-2 border-[#075B36]/20 focus-within:border-[#075B36] p-1.5 shadow-sm transition-all"
          >
            <Search className="w-5 h-5 ml-3 text-[#64756A] shrink-0" />
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder="Search tomatoes, toned milk, chakki atta, eggs..."
              className="w-full px-3 py-2 text-sm text-[#17251D] placeholder:text-[#64756A]/70 bg-transparent outline-none font-medium"
            />
            {localInput && (
              <button
                type="button"
                onClick={() => {
                  setLocalInput("");
                  onSearch("");
                }}
                className="text-xs font-bold text-[#64756A] hover:text-[#17251D] px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#075B36] hover:bg-[#06472C] text-white px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-[#64756A]">Popular:</span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => onSelectCategory(tag.id)}
                className="rounded-full bg-white/90 hover:bg-[#EAF5E5] px-3 py-1 text-xs font-semibold text-[#075B36] border border-[#DFE9DC] transition cursor-pointer shadow-2xs"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Value Assurance Badges Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#DFE9DC]/80 mt-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#EAF5E5] text-[#075B36] shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-[#075B36]">100% Graded</p>
                <p className="text-[11px] text-[#64756A]">Choose Grade A, B, or C</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#EAF5E5] text-[#07834B] shrink-0">
                <Snowflake className="w-4 h-4 stroke-[2.2]" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-[#075B36]">Cold-Chain Verified</p>
                <p className="text-[11px] text-[#64756A]">Chilled transit 0°C–4°C</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#EAF5E5] text-[#075B36] shrink-0">
                <Scale className="w-4 h-4 stroke-[2.2]" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-[#075B36]">Exact Weight Billing</p>
                <p className="text-[11px] text-[#64756A]">Difference refunded instant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Sensory Grocery Composition */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-white/70 p-4 border border-[#DFE9DC] shadow-card backdrop-blur-xs flex flex-col justify-between"
          >
            {/* Visual Fresh Showcase Montage */}
            <div className="grid grid-cols-2 gap-3 h-[75%]">
              <div className="relative rounded-2xl overflow-hidden bg-[#FAFDF8] border border-[#DFE9DC]/60 group">
                <Image
                  src="/products/food/fresh-tomatoes-1.jpg"
                  alt="Fresh local tomatoes"
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 rounded-md bg-[#075B36] px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  Grade A
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-[#FAFDF8] border border-[#DFE9DC]/60 group">
                <Image
                  src="/products/food/amul-toned-milk-1l-1.jpg"
                  alt="Amul Taaza Toned Milk"
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 rounded-md bg-[#EAF5E5] px-1.5 py-0.5 text-[10px] font-bold text-[#075B36] border border-[#DFE9DC] shadow-xs">
                  Chilled 1 L
                </span>
              </div>
            </div>

            {/* Bottom Harvest Promise Bar inside the card */}
            <div className="mt-3 flex items-center justify-between rounded-xl bg-[#EAF5E5]/80 p-2.5 border border-[#DFE9DC]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#07834B] animate-pulse" />
                <span className="text-xs font-bold text-[#075B36]">
                  Morning Batch Graded & Ready
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#64756A]">
                Slots open today
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

