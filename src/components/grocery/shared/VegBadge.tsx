"use client";

import React from "react";
import { cn } from "@/lib/cn";

export interface VegBadgeProps {
  type: "veg" | "nonveg" | "egg";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function VegBadge({
  type,
  size = "md",
  showLabel = false,
  className,
}: VegBadgeProps) {
  const sizeClasses = {
    sm: "w-3 h-3 p-0.5",
    md: "w-4 h-4 p-0.5",
    lg: "w-5 h-5 p-1",
  };

  const dotClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  if (type === "veg") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-xs border-1.5 border-[#07834B] bg-white shadow-2xs",
            sizeClasses[size]
          )}
          title="100% Vegetarian"
          aria-label="Vegetarian"
        >
          <span className={cn("rounded-full bg-[#07834B]", dotClasses[size])} />
        </span>
        {showLabel && (
          <span className="text-[11px] font-bold text-[#075B36]">VEG</span>
        )}
      </div>
    );
  }

  if (type === "egg") {
    return (
      <div className={cn("inline-flex items-center gap-1.5", className)}>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-xs border-1.5 border-[#F4C52E] bg-white shadow-2xs",
            sizeClasses[size]
          )}
          title="Contains Egg"
          aria-label="Egg"
        >
          <span className={cn("rounded-full bg-[#F4C52E]", dotClasses[size])} />
        </span>
        {showLabel && (
          <span className="text-[11px] font-bold text-[#A87900]">EGG</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xs border-1.5 border-[#C62828] bg-white shadow-2xs",
          sizeClasses[size]
        )}
        title="Non-Vegetarian"
        aria-label="Non-Vegetarian"
      >
        <span
          className={cn(
            "w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-[#C62828]",
            size === "lg" && "border-l-[4px] border-r-[4px] border-b-[7px]"
          )}
        />
      </span>
      {showLabel && (
        <span className="text-[11px] font-bold text-[#C62828]">NON-VEG</span>
      )}
    </div>
  );
}

