"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, ShieldCheck, Tag } from "lucide-react";

interface WeeklyHarvestBannerProps {
  onExploreCollection: (collectionType: string) => void;
}

export function WeeklyHarvestBanner({ onExploreCollection }: WeeklyHarvestBannerProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#075B36] to-[#0A6D42] text-white p-5 sm:p-6 shadow-sm border border-[#06472C]">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-full bg-[#C5EA42]/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 self-center md:self-start rounded-full bg-[#C5EA42] px-2.5 py-0.5 text-xs font-black text-[#075B36]">
            <Tag className="w-3.5 h-3.5" />
            <span>Weekly Fresh Basket Savings</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-tight">
            Coimbatore Farm Harvest & Breakfast Restock
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
            Save up to 25% when combining farm-fresh tomatoes, robusta bananas, Amul chilled milk, and Namakkal white eggs.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-emerald-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5EA42]" />
              <span>Harvested within 24h</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#C5EA42]" />
              <span>Same-day slots open</span>
            </span>
          </div>
        </div>

        {/* Action Button & Visual Preview */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center -space-x-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
              <Image
                src="/products/food/fresh-tomatoes-1.jpg"
                alt="Tomatoes"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
              <Image
                src="/products/food/amul-toned-milk-1l-1.jpg"
                alt="Amul Milk"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
              <Image
                src="/products/food/robusta-bananas-1.jpg"
                alt="Robusta Bananas"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onExploreCollection("fresh-basket")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C5EA42] hover:bg-[#B3DC29] text-[#075B36] font-display font-black px-4 py-2.5 text-xs sm:text-sm transition shadow-sm cursor-pointer"
          >
            <span>Explore Fresh Basket</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}

