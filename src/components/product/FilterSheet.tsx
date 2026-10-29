"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
  groups: FilterGroup[];
  activeFilters: Record<string, string>;
  onApply: (filters: Record<string, string>) => void;
  onClear: () => void;
}

export function FilterSheet({
  open,
  onClose,
  groups,
  activeFilters,
  onApply,
  onClear,
}: FilterSheetProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>(groups[0]?.key || "");
  const [draftFilters, setDraftFilters] = useState<Record<string, string>>(activeFilters);

  useEffect(() => {
    setDraftFilters(activeFilters);
  }, [activeFilters, open]);

  useEffect(() => {
    if (groups.length > 0 && (!selectedGroup || !groups.some((g) => g.key === selectedGroup))) {
      setSelectedGroup(groups[0].key);
    }
  }, [groups, selectedGroup]);

  const handleSelectOption = (groupKey: string, val: string) => {
    setDraftFilters((prev) => {
      const next = { ...prev };
      if (next[groupKey] === val) {
        delete next[groupKey];
      } else {
        next[groupKey] = val;
      }
      return next;
    });
  };

  const currentGroup = groups.find((g) => g.key === selectedGroup) || groups[0];
  const activeCount = Object.keys(draftFilters).length;

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Filters"
      description={`${activeCount} active filter${activeCount === 1 ? "" : "s"}`}
      maxHeight="max-h-[90dvh]"
    >
      <div className="flex h-[55vh] max-h-[500px] border-t border-b border-line/70 -mx-4">
        {/* Left column: Categories / Groups */}
        <div className="w-1/3 border-r border-line/70 bg-neutral-50 overflow-y-auto">
          {groups.map((group) => {
            const isSelected = selectedGroup === group.key;
            const hasActiveVal = !!draftFilters[group.key];
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setSelectedGroup(group.key)}
                className={cn(
                  "flex w-full min-h-[48px] items-center justify-between px-3 py-3 text-left text-xs font-bold transition",
                  isSelected
                    ? "bg-white text-primary border-l-3 border-primary shadow-xs"
                    : "text-ink/80 hover:bg-neutral-100/70"
                )}
              >
                <span className="truncate">{group.label}</span>
                {hasActiveVal && (
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right column: Options */}
        <div className="flex-1 overflow-y-auto p-3">
          {currentGroup ? (
            <div className="space-y-1.5">
              {currentGroup.options.map((opt) => {
                const isChecked = draftFilters[currentGroup.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectOption(currentGroup.key, opt.value)}
                    className={cn(
                      "flex w-full min-h-[44px] items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition",
                      isChecked
                        ? "bg-primary-tint/60 text-primary font-bold"
                        : "text-ink hover:bg-neutral-50"
                    )}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-md border transition",
                        isChecked
                          ? "border-primary bg-primary text-white"
                          : "border-neutral-300 bg-white"
                      )}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              Select a filter
            </div>
          )}
        </div>
      </div>

      {/* Action buttons pinned at bottom */}
      <div className="flex items-center gap-3 pt-3">
        <button
          type="button"
          onClick={() => {
            setDraftFilters({});
            onClear();
            onClose();
          }}
          className="flex-1 min-h-[44px] rounded-xl border border-line bg-white text-sm font-bold text-ink hover:bg-neutral-50 transition cursor-pointer"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={() => {
            onApply(draftFilters);
            onClose();
          }}
          className="flex-1 min-h-[44px] rounded-xl bg-primary text-sm font-extrabold text-white shadow-md hover:bg-primary-dark transition cursor-pointer"
        >
          Apply ({activeCount})
        </button>
      </div>
    </BottomSheet>
  );
}

interface SortOption {
  value: string;
  label: string;
}

interface SortSheetProps {
  open: boolean;
  onClose: () => void;
  options: SortOption[];
  currentSort: string;
  onSelectSort: (val: string) => void;
}

export function SortSheet({
  open,
  onClose,
  options,
  currentSort,
  onSelectSort,
}: SortSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Sort by" maxHeight="max-h-[60dvh]">
      <div className="space-y-1 pb-4">
        {options.map((opt) => {
          const isSelected = currentSort === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelectSort(opt.value);
                onClose();
              }}
              className={cn(
                "flex w-full min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition cursor-pointer",
                isSelected
                  ? "bg-primary-tint/70 text-primary font-bold"
                  : "text-ink hover:bg-neutral-50"
              )}
            >
              <span>{opt.label}</span>
              <span
                className={cn(
                  "grid h-5 w-5 place-items-center rounded-full border transition",
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-neutral-300 bg-white"
                )}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}
