"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { DepartmentShowcaseItem } from "./types";

interface DepartmentPanelProps {
  dept: DepartmentShowcaseItem;
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DepartmentPanel({
  dept,
  isVisible = false,
  prefersReducedMotion = false,
}: DepartmentPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, scale: 1, y: 0, rotate: dept.tilt }
          : { opacity: 0, scale: 0.84, y: 45, rotate: dept.startTilt }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1, y: 0, rotate: dept.tilt }
          : shouldAnimate
          ? { opacity: 1, scale: 1, y: 0, rotate: dept.tilt }
          : { opacity: 0, scale: 0.84, y: 45, rotate: dept.startTilt }
      }
      transition={{
        opacity: { duration: 0.55, delay: dept.entranceDelay, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.55, delay: dept.entranceDelay, ease: [0.16, 1, 0.3, 1] },
        rotate: { duration: 0.55, delay: dept.entranceDelay, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.55, delay: dept.entranceDelay, ease: [0.16, 1, 0.3, 1] },
      }}
      className="relative z-10 flex-1 min-w-[210px] sm:min-w-[240px] max-w-[310px] aspect-[1/1.42] select-none group"
    >
      <Link
        href={dept.href}
        aria-label={`Shop ${dept.name}`}
        className="relative block w-full h-full rounded-[28px] sm:rounded-[34px] transition-all duration-300 ease-out drop-shadow-[0_12px_28px_rgba(7,91,53,0.12)] hover:drop-shadow-[0_20px_40px_rgba(7,91,53,0.22)] hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Master 3D Department Artwork Panel */}
        <div className="relative w-full h-full overflow-hidden rounded-[28px] sm:rounded-[34px]">
          <Image
            src={dept.panelImage}
            alt={dept.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 310px"
            className="object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
        </div>
      </Link>
    </motion.div>
  );
}
