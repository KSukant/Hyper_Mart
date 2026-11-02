"use client";

import React, { useState } from "react";
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FilterState {
  grade?: string;
  ripeness?: string;
  storage?: string;
  diet?: string;
  allergen?: string;
  stock?: string;
  brand?: string;
}

interface GroceryFilterBarProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string | undefined) => void;
  sort: string;
  onChangeSort: (sort: string) => void;
  totalProducts: number;
  availableBrands: string[];
}

export function GroceryFilterBar({
  filters,
  onChangeFilter,
  sort,
  onChangeSort,
  totalProducts,
  availableBrands,
}: GroceryFilterBarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "discount", label: "Biggest Discount" },
  ];

  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-between gap-3 py-2 border-y border-[#DFE9DC] bg-[#FAFDF8]">
        {/* Left: Quick Filter Toggles & Filter Drawer Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Filter Drawer Toggle */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer",
              activeCount > 0
                ? "bg-[#075B36] text-white border-[#06472C]"
                : "bg-white text-[#17251D] border-[#DFE9DC] hover:border-[#075B36]/60"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>All Filters</span>
            {activeCount > 0 && (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#C5EA42] text-[10px] font-black text-[#075B36]">
                {activeCount}
              </span>
            )}
          </button>

          {/* Quick toggle: Grade A */}
          <button
            type="button"
            onClick={() =>
              onChangeFilter("grade", filters.grade === "A" ? undefined : "A")
            }
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer",
              filters.grade === "A"
                ? "bg-[#075B36] text-white border-[#06472C]"
                : "bg-white text-[#17251D] border-[#DFE9DC] hover:border-[#075B36]/50"
            )}
          >
            Grade A Fresh
          </button>

          {/* Quick toggle: Vegetarian Only */}
          <button
            type="button"
            onClick={() =>
              onChangeFilter("diet", filters.diet === "veg" ? undefined : "veg")
            }
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer",
              filters.diet === "veg"
                ? "bg-[#07834B] text-white border-[#06472C]"
                : "bg-white text-[#17251D] border-[#DFE9DC] hover:border-[#075B36]/50"
            )}
          >
            100% Veg
          </button>

          {/* Quick toggle: Chilled Cold-Chain */}
          <button
            type="button"
            onClick={() =>
              onChangeFilter(
                "storage",
                filters.storage === "chilled" ? undefined : "chilled"
              )
            }
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer",
              filters.storage === "chilled"
                ? "bg-[#EAF5E5] text-[#075B36] border-[#07834B] font-extrabold"
                : "bg-white text-[#17251D] border-[#DFE9DC] hover:border-[#075B36]/50"
            )}
          >
            Chilled Only
          </button>

          {/* Quick toggle: In Stock */}
          <button
            type="button"
            onClick={() =>
              onChangeFilter("stock", filters.stock === "in" ? undefined : "in")
            }
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-bold transition border cursor-pointer hidden sm:inline-flex",
              filters.stock === "in"
                ? "bg-[#075B36] text-white border-[#06472C]"
                : "bg-white text-[#17251D] border-[#DFE9DC] hover:border-[#075B36]/50"
            )}
          >
            In Stock
          </button>
        </div>

        {/* Right: Result Count & Sort Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#64756A] font-semibold hidden md:inline">
            <strong className="text-[#17251D]">{totalProducts}</strong> products
          </span>

          <div className="relative inline-flex items-center">
            <span className="text-xs font-bold text-[#64756A] mr-1.5 hidden sm:inline">
              Sort:
            </span>
            <select
              value={sort}
              onChange={(e) => onChangeSort(e.target.value)}
              className="appearance-none rounded-xl bg-white border border-[#DFE9DC] px-3 py-1.5 pr-8 text-xs font-bold text-[#17251D] focus:border-[#075B36] outline-none cursor-pointer shadow-2xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-[#64756A] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Drawer Overlay for Comprehensive Multi-Faceted Filters */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity"
        >
          <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#DFE9DC] p-4 bg-[#FFF9EB]">
              <div>
                <h3 className="text-base font-display font-extrabold text-[#075B36]">
                  Filter Groceries
                </h3>
                <p className="text-xs text-[#64756A]">
                  Select grades, ripeness, storage conditions & dietary needs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100 text-[#17251D] cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 text-xs">
              {/* Freshness Grade */}
              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                  Freshness Grade
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "A", lbl: "Grade A", desc: "Top uniform" },
                    { val: "B", lbl: "Grade B", desc: "Everyday" },
                    { val: "C", lbl: "Grade C", desc: "Culinary" },
                  ].map((g) => (
                    <button
                      key={g.val}
                      type="button"
                      onClick={() =>
                        onChangeFilter(
                          "grade",
                          filters.grade === g.val ? undefined : g.val
                        )
                      }
                      className={cn(
                        "rounded-xl p-2.5 text-center border transition cursor-pointer flex flex-col items-center",
                        filters.grade === g.val
                          ? "bg-[#075B36] text-white border-[#06472C]"
                          : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D] hover:border-[#075B36]/50"
                      )}
                    >
                      <span className="font-bold">{g.lbl}</span>
                      <span className="text-[10px] opacity-80">{g.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ripeness Options */}
              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                  Ripeness (Fruits & Veggies)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "raw", lbl: "Raw (Ripen at home)" },
                    { val: "ready_to_eat", lbl: "Ready to Eat" },
                    { val: "very_ripe", lbl: "Very Ripe (Today)" },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() =>
                        onChangeFilter(
                          "ripeness",
                          filters.ripeness === r.val ? undefined : r.val
                        )
                      }
                      className={cn(
                        "rounded-xl p-2.5 text-center border transition cursor-pointer text-xs font-semibold",
                        filters.ripeness === r.val
                          ? "bg-[#075B36] text-white border-[#06472C]"
                          : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D] hover:border-[#075B36]/50"
                      )}
                    >
                      {r.lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Condition */}
              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                  Storage Condition
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: "ambient", lbl: "Ambient" },
                    { val: "chilled", lbl: "Chilled (0°C–4°C)" },
                    { val: "frozen", lbl: "Frozen" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() =>
                        onChangeFilter(
                          "storage",
                          filters.storage === s.val ? undefined : s.val
                        )
                      }
                      className={cn(
                        "rounded-xl p-2.5 text-center border transition cursor-pointer text-xs font-semibold",
                        filters.storage === s.val
                          ? "bg-[#075B36] text-white border-[#06472C]"
                          : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D] hover:border-[#075B36]/50"
                      )}
                    >
                      {s.lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary */}
              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                  Dietary Preference
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onChangeFilter(
                        "diet",
                        filters.diet === "veg" ? undefined : "veg"
                      )
                    }
                    className={cn(
                      "rounded-xl p-2.5 text-center border transition cursor-pointer text-xs font-semibold",
                      filters.diet === "veg"
                        ? "bg-[#07834B] text-white border-[#06472C]"
                        : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D]"
                    )}
                  >
                    100% Vegetarian
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onChangeFilter(
                        "diet",
                        filters.diet === "egg" ? undefined : "egg"
                      )
                    }
                    className={cn(
                      "rounded-xl p-2.5 text-center border transition cursor-pointer text-xs font-semibold",
                      filters.diet === "egg"
                        ? "bg-[#F4C52E] text-[#17251D] border-[#DEAC17] font-bold"
                        : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D]"
                    )}
                  >
                    Contains Egg
                  </button>
                </div>
              </div>

              {/* Free From / Allergens */}
              <div className="flex flex-col gap-2">
                <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                  Free From
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Milk", "Gluten (wheat)", "Egg"].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() =>
                        onChangeFilter(
                          "allergen",
                          filters.allergen === a ? undefined : a
                        )
                      }
                      className={cn(
                        "rounded-xl px-3 py-1.5 border transition cursor-pointer text-xs font-semibold",
                        filters.allergen === a
                          ? "bg-[#075B36] text-white border-[#06472C]"
                          : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D]"
                      )}
                    >
                      No {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {availableBrands.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-extrabold text-[#075B36] uppercase tracking-wider text-[11px]">
                    Brand
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableBrands.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() =>
                          onChangeFilter(
                            "brand",
                            filters.brand === b ? undefined : b
                          )
                        }
                        className={cn(
                          "rounded-xl px-3 py-1.5 border transition cursor-pointer text-xs font-semibold",
                          filters.brand === b
                            ? "bg-[#075B36] text-white border-[#06472C]"
                            : "bg-[#FAFDF8] border-[#DFE9DC] text-[#17251D]"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-[#DFE9DC] p-4 bg-[#FAFDF8] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onChangeFilter("grade", undefined);
                  onChangeFilter("ripeness", undefined);
                  onChangeFilter("storage", undefined);
                  onChangeFilter("diet", undefined);
                  onChangeFilter("allergen", undefined);
                  onChangeFilter("stock", undefined);
                  onChangeFilter("brand", undefined);
                }}
                className="text-xs font-bold text-[#C62828] hover:underline cursor-pointer"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-xl bg-[#075B36] hover:bg-[#06472C] text-white px-5 py-2 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

