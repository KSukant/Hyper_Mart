"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Shield,
  Headphones,
  CreditCard,
  Warehouse,
  Truck,
  BarChart3,
  ArrowRight,
  Lock,
} from "lucide-react";
import type { PortalConfig } from "@/config/portals";

interface PortalCardProps {
  portal: PortalConfig;
  className?: string;
}

export function PortalCard({ portal, className = "" }: PortalCardProps) {
  const isActive = portal.status === "active";

  const renderIcon = () => {
    const props = { className: "w-4 h-4 sm:w-5 sm:h-5", style: { color: portal.accentColor } };
    switch (portal.iconName) {
      case "ShoppingCart":
        return <ShoppingCart {...props} />;
      case "Shield":
        return <Shield {...props} />;
      case "Headphones":
        return <Headphones {...props} />;
      case "CreditCard":
        return <CreditCard {...props} />;
      case "Warehouse":
        return <Warehouse {...props} />;
      case "Truck":
        return <Truck {...props} />;
      case "BarChart3":
        return <BarChart3 {...props} />;
      default:
        return <ShoppingCart {...props} />;
    }
  };

  const cardContent = (
    <div
      className={`group relative h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-4 border transition-all duration-300 shadow-sm ${
        isActive
          ? "hover:shadow-xl hover:-translate-y-1.5 cursor-pointer"
          : "opacity-95 cursor-not-allowed"
      } ${className}`}
      style={{
        borderColor: isActive ? "rgba(225, 234, 227, 0.9)" : "#E5ECE6",
      }}
    >
      <div className="space-y-3">
        {/* Top Photographic Container with embedded artwork & elevated icon badge */}
        <div
          className={`relative w-full ${
            portal.row === 2 ? "h-32 sm:h-36" : "h-28 sm:h-32"
          } rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 flex items-center justify-center`}
          style={{ backgroundColor: portal.accentBg }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portal.image}
            alt={portal.name}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${
              isActive ? "group-hover:scale-105" : ""
            }`}
          />

          {/* Contrast scrim at bottom to anchor floating badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent pointer-events-none" />

          {/* Elevated Icon Badge placed at bottom-left */}
          <div
            className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md backdrop-blur-sm border transition-transform duration-300 group-hover:scale-110 z-10"
            style={{
              backgroundColor: portal.accentBg,
              borderColor: portal.accentBorder,
            }}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1">
          <h3 className="font-display text-sm sm:text-base font-bold text-[#16271E] tracking-tight group-hover:text-[#0B5132] transition-colors duration-200">
            {portal.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#637C6C] leading-snug line-clamp-2">
            {portal.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2.5 mt-auto flex items-center justify-between">
        {isActive ? (
          <div className="w-full flex justify-end">
            <span
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: portal.accentColor }}
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between pt-1 text-[10px]">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] font-bold text-[#556E5F] tracking-wide">
              Coming Soon
            </span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

