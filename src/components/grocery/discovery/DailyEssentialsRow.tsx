"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Check, Clock, ShoppingCart, Repeat, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { useCart, lineKey } from "@/store";
import { useShopper, useNow } from "@/lib/hooks";
import { getPrice } from "@/lib/pricing";
import { getStock } from "@/lib/catalog";
import { VegBadge } from "../shared/VegBadge";
import { StorageBadge } from "../shared/StorageBadge";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface DailyEssentialsRowProps {
  products: Product[];
}

export function DailyEssentialsRow({ products }: DailyEssentialsRowProps) {
  const { cityId, warehouseId, isMember } = useShopper();
  const now = useNow();
  const cart = useCart();

  // Filter products for daily staples (milk, eggs, atta, tomatoes)
  const essentials = products.filter((p) =>
    ["p-food-003", "p-food-006", "p-food-004", "p-food-001"].includes(p.id)
  );

  return (
    <section className="w-full flex flex-col gap-3 rounded-2xl bg-[#FFF9EB] border border-[#F4E3B5] p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F4E3B5]/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#075B36] text-[#C5EA42]">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-lg font-display font-black text-[#075B36]">
              Daily Essentials Quick-Add
            </h2>
            <p className="text-xs text-[#64756A] font-medium">
              Add everyday staples directly to your cart in 1 click or set up a repeat delivery.
            </p>
          </div>
        </div>
        <Link
          href="/account/subscriptions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075B36] hover:text-[#06472C] transition underline underline-offset-2 self-start sm:self-auto"
        >
          <Repeat className="w-3.5 h-3.5 text-[#07834B]" />
          <span>Manage repeat subscriptions</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {essentials.map((product) => {
          const priceInfo = getPrice(product, cityId, isMember, now);
          const stock = getStock(product.id, warehouseId);
          const foodAttr = product.attrs.department === "food" ? product.attrs : null;
          const k = lineKey({ productId: product.id, variantKey: "default" });
          const cartItem = cart.items.find((i) => lineKey(i) === k);
          const inCartQty = cartItem?.qty ?? 0;
          const isOutOfStock = stock.status === "out";

          const handleIncrement = () => {
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

          const handleDecrement = () => {
            const step = foodAttr?.soldByWeight ? 0.5 : 1;
            if (inCartQty <= step) {
              cart.remove(k);
            } else {
              cart.setQty(k, +(inCartQty - step).toFixed(2));
            }
          };

          return (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 border border-[#DFE9DC] hover:border-[#075B36]/40 transition shadow-2xs"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/product/${product.slug}`}
                className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAFDF8] shrink-0 border border-[#DFE9DC]/60"
              >
                <Image
                  src={product.images[0]?.src ?? "/products/food/fresh-tomatoes-1.jpg"}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {foodAttr && <VegBadge type={foodAttr.vegMark} size="sm" />}
                  {foodAttr && foodAttr.storage === "chilled" && (
                    <StorageBadge storage="chilled" size="sm" />
                  )}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className="text-xs font-extrabold text-[#17251D] hover:text-[#075B36] transition line-clamp-1 block leading-tight"
                >
                  {product.name}
                </Link>
                <p className="text-[11px] text-[#64756A] font-medium mt-0.5">
                  {product.unit}
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-[#075B36]">
                    ₹{priceInfo.finalPrice}
                  </span>
                  {product.mrp > priceInfo.finalPrice && (
                    <span className="text-[10px] text-[#64756A] line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>
              </div>

              {/* Stepper / Add button */}
              <div className="shrink-0">
                {isOutOfStock ? (
                  <span className="text-[10px] font-bold text-[#64756A] bg-neutral-100 px-2 py-1 rounded-md">
                    Out of stock
                  </span>
                ) : inCartQty > 0 ? (
                  <div className="flex items-center gap-1.5 rounded-lg bg-[#EAF5E5] px-1.5 py-1 border border-[#07834B]/40">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="grid h-5 w-5 place-items-center rounded bg-white text-[#075B36] hover:bg-[#075B36] hover:text-white transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#075B36] tabular-nums">
                      {inCartQty}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="grid h-5 w-5 place-items-center rounded bg-white text-[#075B36] hover:bg-[#075B36] hover:text-white transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#075B36] hover:bg-[#06472C] text-white px-2.5 py-1.5 text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
