"use client";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingCart, X, Trash2, ArrowRight, Truck, Sparkles } from "lucide-react";
import { useCart, lineKey } from "@/store";
import { useShopper, useNow } from "@/lib/hooks";
import { getProductById } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { formatINR } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { cn } from "@/lib/cn";

interface MiniCartDrawerProps {
  open: boolean;
  onClose: () => void;
}

import { FREE_DELIVERY_THRESHOLD, MEMBER_FREE_DELIVERY_THRESHOLD } from "@/config/site";

export function MiniCartDrawer({ open, onClose }: MiniCartDrawerProps) {
  const { items, setQty, remove } = useCart();
  const { cityId, isMember } = useShopper();
  const now = useNow();

  // Escape key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Calculate items and prices
  let subtotal = 0;
  const hydratedItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      const priceInfo = getPrice(product, cityId, isMember, now, item.grade);
      const lineTotal = priceInfo.finalPrice * item.qty;
      subtotal += lineTotal;
      return {
        item,
        product,
        priceInfo,
        lineTotal,
        key: lineKey(item),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const threshold = isMember ? MEMBER_FREE_DELIVERY_THRESHOLD : FREE_DELIVERY_THRESHOLD;
  const freeDeliveryGap = Math.max(0, threshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Mini Cart">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-tint text-primary">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-ink">
                  Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
                </h2>
                <p className="text-xs text-muted">All fresh & authentic items from HyperMart</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="rounded-full p-2 text-muted hover:bg-bg hover:text-ink transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          {hydratedItems.length > 0 && (
            <div className="border-b border-line/60 bg-primary-tint/60 px-5 py-3 text-xs">
              <div className="flex items-center justify-between font-bold text-primary">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  {freeDeliveryGap > 0 ? (
                    `Add ${formatINR(freeDeliveryGap)} more for FREE Delivery`
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-accent shrink-0 inline" />
                      <span>You unlocked FREE Delivery!</span>
                    </>
                  )}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {hydratedItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary-tint text-primary">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <h3 className="text-base font-extrabold text-ink">Your cart is empty</h3>
                <p className="text-xs text-muted max-w-xs">
                  Discover daily fresh vegetables, fashion essentials, skincare, and high-performance electronics.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                    }}
                    className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white transition hover:bg-primary-dark"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              hydratedItems.map((entry) => {
                if (!entry) return null;
                const { item, product, priceInfo, lineTotal, key } = entry;

                return (
                  <div
                    key={key}
                    className="flex gap-3.5 rounded-2xl border border-line p-3 transition hover:border-primary/40 hover:bg-primary-tint/20"
                  >
                    <ProductArt product={product} className="h-16 w-16 shrink-0 rounded-xl" />

                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-ink line-clamp-1">{product.name}</h4>
                        {/* Domain-specific variant or grade pill */}
                        <div className="mt-0.5 flex flex-wrap gap-1 text-[11px] text-muted">
                          {item.grade && (
                            <span className="font-semibold text-primary">Grade {item.grade}</span>
                          )}
                          {item.ripeness && (
                            <span>• {item.ripeness}</span>
                          )}
                          {item.variantKey && item.variantKey !== "default" && (
                            <span>• {item.variantKey.replace("|", " · ")}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Price */}
                        <div>
                          <span className="text-xs font-extrabold text-ink tabular">
                            {formatINR(lineTotal)}
                          </span>
                          {item.qty > 1 && (
                            <span className="ml-1 text-[10px] text-muted">
                              ({formatINR(priceInfo.finalPrice)} ea)
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper & Delete */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center rounded-lg border border-line bg-bg">
                            <button
                              type="button"
                              onClick={() => setQty(key, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-6 w-6 place-items-center rounded-l-md font-bold text-ink hover:bg-white"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-xs font-extrabold tabular">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(key, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-6 w-6 place-items-center rounded-r-md font-bold text-ink hover:bg-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(key)}
                            aria-label="Remove item"
                            className="p-1 text-muted hover:text-red-600 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {hydratedItems.length > 0 && (
            <div className="border-t border-line bg-bg p-5 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink tabular">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-success">
                    {freeDeliveryGap === 0 ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line/60 pt-2 text-sm font-extrabold text-ink">
                  <span>Estimated Total</span>
                  <span className="text-base text-primary tabular">{formatINR(subtotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-xl border border-line bg-white py-2.5 text-xs font-extrabold text-ink shadow-xs transition hover:bg-bg hover:border-primary"
                >
                  View Full Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-primary-dark"
                >
                  <span>Checkout</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <span>100% Satisfaction Guarantee · Easy return policy</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export function CartButton({ onClick, className }: { onClick: () => void; className?: string }) {
  const count = useCart((s) => s.items.reduce((acc, it) => acc + (it.qty >= 1 ? Math.floor(it.qty) : 1), 0));

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Shopping cart with ${count} items`}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-ink transition hover:bg-primary-tint hover:text-primary",
        className
      )}
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5 text-ink/90" />
        {count > 0 && (
          <span className="absolute -right-2 -top-2 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-accent px-1 text-[10px] font-black text-ink shadow-xs">
            {count}
          </span>
        )}
      </div>
      <span className="hidden xl:inline text-xs font-extrabold">Cart</span>
    </button>
  );
}
