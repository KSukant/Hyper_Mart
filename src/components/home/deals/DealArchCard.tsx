"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { MasterDeal } from "./dealsData";
import { useWish, useCart } from "@/store";
import { toast } from "@/components/ui/primitives";
import { formatINR } from "@/lib/format";

interface DealArchCardProps {
  deal: MasterDeal;
  index: number;
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export function DealArchCard({
  deal,
  index,
  isVisible = false,
  prefersReducedMotion = false,
}: DealArchCardProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;

  const isWishlisted = useWish((s) => s.ids.includes(deal.productId));
  const toggleWish = useWish((s) => s.toggle);
  const addToCart = useCart((s) => s.add);

  const [heartBounced, setHeartBounced] = useState(false);

  // Responsive staggered entrance delays
  const cardDelays = [0.08, 0.16, 0.24, 0.32];
  const cardDelay = cardDelays[index % cardDelays.length];

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartBounced(true);
    setTimeout(() => setHeartBounced(false), 300);
    toggleWish(deal.productId);
    toast(
      isWishlisted
        ? `Removed from wishlist: ${deal.title}`
        : `Added to wishlist: ${deal.title}`
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: deal.productId,
      variantKey: "default",
      qty: 1,
    });
    toast(
      `Added to cart: ${deal.title} (${deal.discountText})`,
      "/cart",
      "View cart"
    );
  };

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 35, scale: 0.92 }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : shouldAnimate
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 35, scale: 0.92 }
      }
      transition={{
        duration: 0.5,
        delay: cardDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        !prefersReducedMotion
          ? {
              y: -6,
              boxShadow: "0 16px 36px rgba(184, 243, 74, 0.28)",
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className="group relative flex flex-col justify-between rounded-t-[72px] sm:rounded-t-[84px] rounded-b-3xl bg-[#FFFDF6] border-2 border-[#C8F27D] p-3 sm:p-4 shadow-[0_8px_28px_rgba(184,243,74,0.18)] transition-all overflow-hidden"
    >
      {/* ── Upper Arch Product Display Stage Area (1000–1850ms) ── */}
      <div className="relative w-full pt-1 pb-2">
        <Link href={deal.href} className="block relative w-full">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.86, y: 14 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : shouldAnimate
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.86, y: 14 }
            }
            transition={{
              duration: 0.45,
              delay: cardDelay + 0.08,
              ease: "easeOut",
            }}
            className="relative w-full aspect-[171/156] flex items-center justify-center overflow-hidden rounded-t-[60px]"
          >
            <Image
              src={deal.imageStage}
              alt={deal.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-300 ease-out group-hover:scale-105 pointer-events-none select-none"
              priority={index < 2}
            />
          </motion.div>
        </Link>

        {/* ── Interactive Wishlist Button directly overlaying the stage heart icon ── */}
        <motion.button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistClick}
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.75 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : shouldAnimate
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.75 }
          }
          transition={{
            duration: 0.3,
            delay: cardDelay + 0.12,
            ease: "easeOut",
          }}
          whileHover={!prefersReducedMotion ? { scale: 1.15 } : undefined}
          whileTap={!prefersReducedMotion ? { scale: 0.88 } : undefined}
          className="absolute top-[28%] right-[8%] sm:top-[30%] sm:right-[9%] grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-transparent hover:bg-white/40 transition-colors cursor-pointer z-20"
        >
          <motion.div
            animate={heartBounced ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isWishlisted && (
              <Heart className="h-4 w-4 fill-[#087C32] text-[#087C32]" />
            )}
          </motion.div>
        </motion.button>

        {/* Accessible Discount Indicator */}
        <span className="sr-only bg-[#B8F34A]">{deal.discountText}</span>
      </div>

      {/* ── Lower Product Information Area (1400–2100ms) ── */}
      <motion.div
        initial={
          prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 8 }
        }
        transition={{
          duration: 0.4,
          delay: cardDelay + 0.15,
          ease: "easeOut",
        }}
        className="flex flex-col justify-between flex-1 mt-1 pt-1 border-t border-[#EDF7E3]"
      >
        <div>
          {/* Category Pill & Brand Row */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="rounded-md bg-[#087C32] px-2 py-0.5 text-[10px] sm:text-xs font-bold text-white tracking-wide">
              {deal.categoryLabel}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#65736B] uppercase tracking-wider">
              {deal.brandName}
            </span>
          </div>

          {/* Product Title */}
          <Link href={deal.href}>
            <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-[#102F25] leading-snug hover:text-[#087C32] transition-colors min-h-[36px]">
              {deal.title}
            </h3>
          </Link>

          {/* Star Rating Row */}
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#65736B] font-semibold mt-1">
            <Star className="h-3.5 w-3.5 fill-[#FFD84A] text-[#FFD84A]" />
            <span className="font-bold text-[#102F25]">{deal.rating}</span>
            <span>({deal.ratingCount.toLocaleString()})</span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-base sm:text-lg font-black text-[#102F25]">
              {formatINR(deal.price)}
            </span>
            <span className="text-xs text-[#8C9B92] line-through font-medium">
              {formatINR(deal.mrp)}
            </span>
          </div>

          {/* Savings Badge */}
          <div className="mt-1">
            <span className="inline-block rounded-full bg-[#FFD84A] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black text-[#102F25]">
              Save {formatINR(deal.saveAmount)}
            </span>
          </div>
        </div>

        {/* Add to Cart CTA Button (Part 21: 1900–2500ms) */}
        <motion.button
          type="button"
          onClick={handleAddToCart}
          whileHover={
            !prefersReducedMotion
              ? {
                  y: -2,
                  scale: 1.02,
                  boxShadow: "0 6px 18px rgba(8, 124, 50, 0.32)",
                  transition: { duration: 0.2 },
                }
              : undefined
          }
          whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#087C32] py-2 sm:py-2.5 px-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#066127] transition-all cursor-pointer select-none"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to cart</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
