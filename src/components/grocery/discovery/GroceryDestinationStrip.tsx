"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Leaf, Milk, Wheat, Cookie } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DestinationItem {
  id: string;
  title: string;
  subtitle: string;
  deliveryNote: string;
  image: string;
  itemCount: number;
  highlightPill: string;
  bgTint: string;
  icon: React.ElementType;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: "food-fresh",
    title: "Fresh Fruits & Veggies",
    subtitle: "Graded A/B/C harvest from local farms",
    deliveryNote: "Chilled slots today",
    image: "/products/food/fresh-tomatoes-1.jpg",
    itemCount: 2,
    highlightPill: "Farm Direct",
    bgTint: "bg-[#EAF5E5] border-[#DFE9DC]",
    icon: Leaf,
  },
  {
    id: "food-dairy",
    title: "Dairy, Bread & Eggs",
    subtitle: "Toned milk, Namakkal eggs & natural Greek yogurt",
    deliveryNote: "0°C–4°C cold chain",
    image: "/products/food/amul-toned-milk-1l-1.jpg",
    itemCount: 3,
    highlightPill: "Daily Chilled",
    bgTint: "bg-[#FFF9EB] border-[#F4E3B5]",
    icon: Milk,
  },
  {
    id: "food-staples",
    title: "Atta, Rice & Cooking Oils",
    subtitle: "100% whole wheat chakki atta & refined oils",
    deliveryNote: "Next day delivery",
    image: "/products/food/aashirvaad-atta-5kg-1.jpg",
    itemCount: 2,
    highlightPill: "Pantry Staples",
    bgTint: "bg-[#FAF7EE] border-[#DFE9DC]",
    icon: Wheat,
  },
  {
    id: "food-snacks",
    title: "Snacks & Regional Specialities",
    subtitle: "Authentic Kerala nendran banana chips in coconut oil",
    deliveryNote: "Direct sourcing",
    image: "/products/food/kerala-banana-chips-200g-1.jpg",
    itemCount: 1,
    highlightPill: "Regional Taste",
    bgTint: "bg-[#F5F8F2] border-[#DFE9DC]",
    icon: Cookie,
  },
];

interface GroceryDestinationStripProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string | null;
}

export function GroceryDestinationStrip({
  onSelectCategory,
  activeCategory,
}: GroceryDestinationStripProps) {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#075B36] tracking-tight">
            Shop by Grocery Destination
          </h2>
          <p className="text-xs sm:text-sm text-[#64756A] font-medium mt-0.5">
            Four specialized aisles tailored with direct sourcing and slot guarantees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DESTINATIONS.map((dest) => {
          const Icon = dest.icon;
          const isActive =
            activeCategory === dest.id ||
            (dest.id === "food-fresh" &&
              (activeCategory === "food-fresh-vegetables" ||
                activeCategory === "food-fresh-fruits"));

          return (
            <button
              key={dest.id}
              type="button"
              onClick={() => onSelectCategory(dest.id)}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 cursor-pointer",
                dest.bgTint,
                isActive && "ring-2 ring-[#075B36] shadow-card bg-white"
              )}
            >
              {/* Top Row: Pill and Icon */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-extrabold text-[#075B36] border border-[#DFE9DC] shadow-2xs">
                  {dest.highlightPill}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-white text-[#075B36] shadow-2xs">
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
              </div>

              {/* Middle: Visual Preview Thumbnail + Title */}
              <div className="my-3 flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-[#DFE9DC]/70 shadow-2xs">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#17251D] group-hover:text-[#075B36] transition leading-tight">
                    {dest.title}
                  </h3>
                  <p className="text-[11px] text-[#64756A] font-medium line-clamp-1 mt-0.5">
                    {dest.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom: Note & Count & Arrow */}
              <div className="flex items-center justify-between border-t border-[#DFE9DC]/60 pt-2.5 text-xs">
                <span className="font-semibold text-[#07834B] text-[11px]">
                  {dest.deliveryNote}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#075B36] group-hover:translate-x-0.5 transition">
                  <span className="text-[11px]">{dest.itemCount} items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

