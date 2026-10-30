"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { PortalConfig } from "@/config/portals";

interface PortalCardProps {
  portal: PortalConfig;
  className?: string;
}

export function PortalCard({ portal, className = "" }: PortalCardProps) {
  const isActive = portal.status === "active";

  const cardContent = (
    <div
      className={`group relative h-full flex flex-col justify-between rounded-2xl bg-white p-3 border transition-all duration-300 shadow-2xs ${
        isActive
          ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          : "opacity-95 cursor-not-allowed"
      } ${className}`}
      style={{
        borderColor: isActive ? "rgba(225, 234, 227, 0.9)" : "#E5ECE6",
      }}
    >
      <div className="space-y-2">
        {/* Top Photographic Container with embedded artwork & colored icon badge */}
        <div
          className="relative w-full h-[76px] sm:h-[84px] rounded-xl overflow-hidden border border-black/5 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: portal.accentBg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portal.image}
            alt={portal.name}
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
              isActive ? "group-hover:scale-105" : ""
            }`}
          />
        </div>

        {/* Text Details */}
        <div className="space-y-0.5">
          <h3 className="font-display text-xs sm:text-[13px] font-bold text-[#16271E] tracking-tight group-hover:text-[#0B5132] transition-colors duration-200 leading-snug">
            {portal.name}
          </h3>
          <p className="text-[10px] sm:text-[10.5px] text-[#637C6C] leading-snug line-clamp-2">
            {portal.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 mt-auto flex items-center justify-between">
        {isActive ? (
          <div className="w-full flex justify-end">
            <span
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white shadow-2xs transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: portal.accentColor }}
            >
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between text-[9.5px]">
            <span className="px-2 py-0.5 rounded-full bg-[#EBF0EC] font-bold text-[#556E5F] tracking-wide">
              Coming Soon
            </span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
              <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (isActive) {
    return (
      <Link href={portal.destination} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
