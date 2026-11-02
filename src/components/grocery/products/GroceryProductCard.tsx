"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Heart, Star, Sparkles, Scale, Clock, ShieldCheck } from "lucide-react";
import type { Product } from "@/types";
import { useShopper, useNow } from "@/lib/hooks";
import { getPrice } from "@/lib/pricing";
import { getStock } from "@/lib/catalog";
import { getDeliveryPromise } from "@/lib/delivery";
import { useCart, lineKey, useWish } from "@/store";
import { VegBadge } from "../shared/VegBadge";
import { StorageBadge } from "../shared/StorageBadge";
import { GradeBadge } from "../shared/GradeBadge";
import { formatDay } from "@/lib/format";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export interface GroceryProductCardProps {
  product: Product;
  className?: string;
}

export function GroceryProductCard({ product, className }: GroceryProductCardProps) {
  const { cityId, warehouseId, isMember, area } = useShopper();
  const now = useNow();
  const cart = useCart();
  const wish = useWish();

  const priceInfo = getPrice(product, cityId, isMember, now);
  const stock = getStock(product.id, warehouseId);
  const foodAttr = product.attrs.department === "food" ? product.attrs : null;
  const delivery = getDeliveryPromise(product, area, new Date(now));

  const isOutOfStock = stock.status === "out";
  const isWished = wish.ids.includes(product.id);

  // Cart item key for default variant
  const k = lineKey({ productId: product.id, variantKey: "default" });
  const cartItem = cart.items.find((i) => lineKey(i) === k);
  const inCartQty = cartItem?.qty ?? 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const step = foodAttr?.soldByWeight ? 0.5 : 1;
    if (inCartQty === 0) {
      cart.add({
        productId: product.id,
        variantKey: "default",
        qty: step,
        grade: "A",
        ripeness: foodAttr?.ripenessOptions?.[0],
      });
      toast(`Added ${product.name} to cart`);
    } else {
      cart.setQty(k, +(inCartQty + step).toFixed(2));
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const step = foodAttr?.soldByWeight ? 0.5 : 1;
    if (inCartQty <= step) {
      cart.remove(k);
    } else {
      cart.setQty(k, +(inCartQty - step).toFixed(2));
    }
  };

  const handleToggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wish.toggle(product.id);
    toast(isWished ? `Removed from wishlist` : `Added to wishlist`);
  };

  const primaryGrade = foodAttr?.grades?.[0]?.grade;

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-[#DFE9DC] hover:border-[#075B36]/50 hover:shadow-card transition-all duration-300",
        className
      )}
    >
      {/* Top Media Area */}
      <div className="relative w-full aspect-square bg-[#FAFDF8] overflow-hidden">
        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <div className="flex items-center gap-1.5">
            {foodAttr && <VegBadge type={foodAttr.vegMark} size="md" />}
            {primaryGrade && <GradeBadge grade={primaryGrade} size="sm" />}
          </div>
          {foodAttr?.storage === "chilled" && (
            <StorageBadge storage="chilled" size="sm" className="shadow-2xs" />
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWish}
          className={cn(
            "absolute top-2.5 right-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 backdrop-blur-xs shadow-2xs border border-[#DFE9DC] transition hover:scale-105 cursor-pointer",
            isWished ? "text-[#C62828]" : "text-[#64756A] hover:text-[#17251D]"
          )}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("w-4 h-4 stroke-[2]", isWished && "fill-current")} />
        </button>

        {/* Image Link */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full p-4">
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain group-hover:scale-105 transition duration-500"
            />
          </div>
        </Link>

        {/* Sold By Weight Overlay Indicator */}
        {foodAttr?.soldByWeight && (
          <div className="absolute bottom-2 left-2 z-10 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-extrabold text-[#075B36] border border-[#DFE9DC] shadow-2xs flex items-center gap-1">
            <Scale className="w-2.5 h-2.5 text-[#07834B]" />
            <span>Sold by weight</span>
          </div>
        )}
      </div>

      {/* Middle Content Area */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4 gap-1.5">
        {/* Rating and Unit */}
        <div className="flex items-center justify-between text-xs text-[#64756A]">
          <span className="font-semibold">{product.unit}</span>
          <span className="inline-flex items-center gap-1 font-bold text-[#17251D]">
            <Star className="w-3.5 h-3.5 text-[#F4C52E] fill-[#F4C52E]" />
            <span>{product.rating}</span>
            <span className="text-[#64756A] text-[10px]">({product.ratingCount})</span>
          </span>
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-sm sm:text-base font-extrabold text-[#17251D] group-hover:text-[#075B36] transition leading-tight line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Highlights snippet */}
        {product.highlights?.[0] && (
          <p className="text-[11px] text-[#64756A] line-clamp-1 font-medium">
            {product.highlights[0]}
          </p>
        )}

        {/* Pricing Area */}
        <div className="mt-auto pt-2 flex flex-col gap-1 border-t border-[#DFE9DC]/60">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#075B36] tabular-nums font-display">
              ₹{priceInfo.finalPrice}
            </span>
            {product.mrp > priceInfo.finalPrice && (
              <span className="text-xs text-[#64756A] line-through tabular-nums">
                ₹{product.mrp}
              </span>
            )}
            {priceInfo.discountPct > 0 && (
              <span className="rounded-md bg-[#FFF9EB] px-1.5 py-0.5 text-[10px] font-extrabold text-[#A87900] border border-[#F4E3B5]">
                {priceInfo.discountPct}% OFF
              </span>
            )}
          </div>

          {/* Member Price Highlight */}
          {product.memberPrice && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#07834B]">
              <Sparkles className="w-3 h-3 text-[#C5EA42]" />
              <span>
                Member: <strong className="text-[#075B36]">₹{product.memberPrice}</strong>
              </span>
            </div>
          )}

          {/* Delivery Promise */}
          <div className="flex items-center gap-1 text-[11px] text-[#64756A] font-medium pt-0.5">
            <Clock className="w-3 h-3 text-[#07834B] shrink-0" />
            <span>
              {delivery.type === "today"
                ? "Slot today"
                : delivery.type === "not_serviceable"
                ? "Unavailable"
                : `Delivery by ${formatDay(delivery.date!)}`}
            </span>
          </div>
        </div>

        {/* Action Button: 1-click Add or Quantity Stepper */}
        <div className="pt-2">
          {isOutOfStock ? (
            <button
              disabled
              className="w-full rounded-xl bg-neutral-100 py-2 text-xs font-bold text-neutral-400 cursor-not-allowed text-center"
            >
              Out of stock
            </button>
          ) : inCartQty > 0 ? (
            <div className="flex items-center justify-between rounded-xl bg-[#EAF5E5] p-1 border border-[#07834B]/40">
              <button
                type="button"
                onClick={handleDecrement}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#075B36] hover:bg-[#075B36] hover:text-white transition shadow-2xs cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-black text-[#075B36] tabular-nums">
                {inCartQty} {foodAttr?.soldByWeight ? "kg" : "in cart"}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[#075B36] hover:bg-[#075B36] hover:text-white transition shadow-2xs cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleIncrement}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#075B36] hover:bg-[#06472C] text-white py-2 text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
