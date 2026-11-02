"use client";

import React from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/cn";

export interface GradeBadgeProps {
  grade: "A" | "B" | "C";
  className?: string;
  size?: "sm" | "md";
}

export function GradeBadge({ grade, className, size = "md" }: GradeBadgeProps) {
  const meta = {
    A: {
      label: "Grade A",
      desc: "Top selection, uniform size & appearance",
      color: "bg-[#075B36] text-white border-[#06472C]",
    },
    B: {
      label: "Grade B",
      desc: "Everyday quality, same taste, slight natural variation",
      color: "bg-[#C5EA42] text-[#075B36] border-[#A8D327]",
    },
    C: {
      label: "Grade C",
      desc: "Culinary & puree grade, great value savings",
      color: "bg-[#F4C52E] text-[#17251D] border-[#DEAC17]",
    },
  }[grade];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-display font-extrabold tracking-tight border shadow-2xs",
        size === "sm" ? "text-[10px]" : "text-xs",
        meta.color,
        className
      )}
      title={meta.desc}
    >
      <Award className={cn(size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} />
      <span>{meta.label}</span>
    </span>
  );
}

