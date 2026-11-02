"use client";

import React from "react";
import { X, RotateCcw } from "lucide-react";

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface ActiveFilterPillsProps {
  activeFilters: ActiveFilter[];
  onRemove: (key: string, value: string) => void;
  onClearAll: () => void;
}

export function ActiveFilterPills({
  activeFilters,
  onRemove,
  onClearAll,
}: ActiveFilterPillsProps) {
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs font-bold text-[#64756A]">Active filters:</span>

      {activeFilters.map((f) => (
        <span
          key={`${f.key}-${f.value}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5E5] px-3 py-1 text-xs font-bold text-[#075B36] border border-[#DFE9DC] shadow-2xs"
        >
          <span>{f.label}</span>
          <button
            type="button"
            onClick={() => onRemove(f.key, f.value)}
            className="grid h-3.5 w-3.5 place-items-center rounded-full hover:bg-[#075B36] hover:text-white transition cursor-pointer"
            aria-label={`Remove filter ${f.label}`}
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-[#C62828] hover:bg-[#FDECEA] transition cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear all</span>
      </button>
    </div>
  );
}

