"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Filter, Layers, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CategoryOption {
  id: string;
  name: string;
  parentId: string | null;
  count?: number;
}

interface CategoryExplorerProps {
  categories: CategoryOption[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  totalProductsCount: number;
}

export function CategoryExplorer({
  categories,
  selectedCategoryId,
  onSelectCategory,
  totalProductsCount,
}: CategoryExplorerProps) {
  // Top-level categories
  const topCategories = categories.filter((c) => c.parentId === null);

  // Determine current active top category
  let activeTopId: string | null = null;
  if (selectedCategoryId) {
    const current = categories.find((c) => c.id === selectedCategoryId);
    if (current) {
      activeTopId = current.parentId ?? current.id;
    }
  }

  // Subcategories of currently selected top category
  const subcategories = activeTopId
    ? categories.filter((c) => c.parentId === activeTopId)
    : [];

  const selectedCategoryObj = categories.find((c) => c.id === selectedCategoryId);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64756A] font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#075B36] transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#DFE9DC]" />
        <Link
          href="/category"
          className="hover:text-[#075B36] transition"
        >
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#DFE9DC]" />
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={cn(
            "hover:text-[#075B36] transition font-semibold cursor-pointer",
            !selectedCategoryId ? "text-[#075B36] font-bold" : "text-[#64756A]"
          )}
        >
          Food & Groceries
        </button>
        {selectedCategoryObj && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#DFE9DC]" />
            <span className="text-[#075B36] font-bold">
              {selectedCategoryObj.name}
            </span>
          </>
        )}
      </nav>

      {/* Primary Category Level Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={cn(
            "rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5",
            selectedCategoryId === null
              ? "bg-[#075B36] text-white shadow-xs"
              : "bg-white text-[#17251D] border border-[#DFE9DC] hover:border-[#075B36]/50"
          )}
        >
          <span>All Groceries</span>
          <span
            className={cn(
              "rounded-full px-1.5 py-0.2 text-[10px] font-extrabold",
              selectedCategoryId === null ? "bg-[#C5EA42] text-[#075B36]" : "bg-[#FAF7EE] text-[#64756A]"
            )}
          >
            {totalProductsCount}
          </span>
        </button>

        {topCategories.map((cat) => {
          const isSelected = activeTopId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5",
                isSelected
                  ? "bg-[#075B36] text-white shadow-xs"
                  : "bg-white text-[#17251D] border border-[#DFE9DC] hover:border-[#075B36]/50"
              )}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Subcategory Level (Level 2) — renders if active top category has children */}
      {subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 px-3 rounded-xl bg-[#EAF5E5]/60 border border-[#DFE9DC]">
          <span className="text-xs font-extrabold text-[#075B36] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Aisle:</span>
          </span>

          <button
            type="button"
            onClick={() => onSelectCategory(activeTopId)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer whitespace-nowrap",
              selectedCategoryId === activeTopId
                ? "bg-[#07834B] text-white shadow-2xs font-bold"
                : "bg-white text-[#075B36] hover:bg-white/80 border border-[#DFE9DC]"
            )}
          >
            All in {categories.find((c) => c.id === activeTopId)?.name}
          </button>

          {subcategories.map((sub) => {
            const isSubSelected = selectedCategoryId === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectCategory(sub.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer whitespace-nowrap",
                  isSubSelected
                    ? "bg-[#07834B] text-white shadow-2xs font-bold"
                    : "bg-white text-[#075B36] hover:bg-white/80 border border-[#DFE9DC]"
                )}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

