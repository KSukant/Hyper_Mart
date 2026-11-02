"use client";

import React from "react";
import { Snowflake, ThermometerSun, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StorageBadgeProps {
  storage: "ambient" | "chilled" | "frozen";
  size?: "sm" | "md";
  className?: string;
}

export function StorageBadge({
  storage,
  size = "md",
  className,
}: StorageBadgeProps) {
  if (storage === "chilled") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-[#EAF5E5] px-2 py-0.5 text-xs font-semibold text-[#075B36] border border-[#DFE9DC]",
          size === "sm" && "text-[10px] px-1.5 py-0.2",
          className
        )}
        title="Requires refrigeration (0°C – 4°C)"
      >
        <Snowflake className={cn("stroke-[2.2] text-[#07834B]", size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} />
        <span>Chilled</span>
      </span>
    );
  }

  if (storage === "frozen") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-[#E0F2FE] px-2 py-0.5 text-xs font-semibold text-[#0369A1] border border-[#BAE6FD]",
          size === "sm" && "text-[10px] px-1.5 py-0.2",
          className
        )}
        title="Keep frozen (-18°C)"
      >
        <ThermometerSun className={cn("stroke-[2.2] text-[#0284C7]", size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} />
        <span>Frozen</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-[#F4F7EF] px-2 py-0.5 text-xs font-medium text-[#55695D] border border-[#DFE9DC]",
        size === "sm" && "text-[10px] px-1.5 py-0.2",
        className
      )}
      title="Store at normal room temperature"
    >
      <Sun className={cn("stroke-[2.2] text-[#64756A]", size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} />
      <span>Ambient</span>
    </span>
  );
}

