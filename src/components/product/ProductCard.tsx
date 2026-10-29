"use client";
import Link from "next/link";
import { Heart, Star, Truck } from "lucide-react";
import type { Product } from "@/types";
import { getPrice } from "@/lib/pricing";
import { brandName, getStock } from "@/lib/catalog";
import { useNow, useShopper } from "@/lib/hooks";
import { useWish } from "@/store";
import { ProductArt } from "./ProductArt";
import { PriceBlock, DeliveryLine, AddToCart } from "./parts";
import { formatDay } from "@/lib/format";
import { getDeliveryPromise } from "@/lib/delivery";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  variantKey,
  showOfferExtras,
  className,
  featured,
}: {
  product: Product;
  variantKey?: string;
  showOfferExtras?: boolean;
  className?: string;
  featured?: boolean;
}) {
  const { cityId, isMember, warehouseId, area } = useShopper();
  const now = useNow();
  const info = getPrice(product, cityId, isMember, now);
  const stock = getStock(product.id, warehouseId, variantKey);
  const wish = useWish();
  const promise = getDeliveryPromise(product, area, new Date(now));

  const fulfilmentText =
    promise.type === "today"
      ? "Delivery Today"
      : promise.type === "not_serviceable"
      ? "Not serviceable"
      : `Delivery by ${formatDay(promise.date!)}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {/* Product Image on Neutral Background — NO fake badges or overlays */}
      <Link href={`/product/${product.slug}`} className="relative block bg-white" aria-label={product.name}>
        <ProductArt
          product={product}
          className={cn(
            "w-full transition duration-300 group-hover:scale-[1.02]",
            featured
              ? "h-[clamp(150px,26svh,240px)]"
              : "h-[clamp(130px,20svh,200px)]"
          )}
        />
      </Link>

      {/* Wishlist Button */}
      <button
        type="button"
        aria-label={wish.ids.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => wish.toggle(product.id)}
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow border border-neutral-200 text-neutral-600 transition hover:scale-105 hover:text-black"
      >
        <Heart
          className={cn(
            "h-4 w-4",
            wish.ids.includes(product.id) ? "fill-danger text-danger" : "text-neutral-500"
          )}
          strokeWidth={1.75}
        />
      </button>

      {/* Card Content — strictly ONE title, ONE price, ONE rating row, ONE fulfilment chip */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {brandName(product)}
        </p>

        {/* ONE Title */}
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-ink hover:text-brand-700 transition mt-0.5"
        >
          {product.name}
        </Link>

        {/* ONE Rating Row */}
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          {product.ratingCount > 0 ? (
            <>
              <Star className="h-3 w-3 fill-amber-500 text-amber-500 shrink-0" strokeWidth={1.75} />
              <span className="font-bold text-ink">{product.rating}</span>
              <span>({product.ratingCount.toLocaleString("en-IN")})</span>
            </>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>

        {/* ONE Price Block with Discount Chip */}
        <div className="mt-2">
          <PriceBlock info={info} size="sm" />
        </div>

        {/* ONE Fulfilment Chip */}
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-700">
            <Truck className="h-3 w-3 text-brand-700 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{fulfilmentText}</span>
          </span>
        </div>

        {/* Add to Cart button */}
        <div className="mt-auto pt-3">
          <AddToCart
            product={product}
            stock={stock}
            item={variantKey ? { variantKey } : undefined}
            className="rounded-xl font-bold"
          />
        </div>
      </div>
    </article>
  );
}

/** Horizontal compact card (food on department pages). */
export function ProductCardCompact({ product }: { product: Product }) {
  const { cityId, isMember, warehouseId, area } = useShopper();
  const now = useNow();
  const info = getPrice(product, cityId, isMember, now);
  const stock = getStock(product.id, warehouseId);
  const a = product.attrs;
  const unit =
    a.department === "food" && a.soldByWeight
      ? `~ 1 kg${product.slug.includes("banana") ? " · 6–8 pcs" : product.slug.includes("tomato") ? " · 10–12 pcs" : ""}`
      : product.unit;

  const promise = getDeliveryPromise(product, area, new Date(now));
  const fulfilmentText =
    promise.type === "today"
      ? "Delivery Today"
      : promise.type === "not_serviceable"
      ? "Not serviceable"
      : `By ${formatDay(promise.date!)}`;

  return (
    <article className="flex h-full gap-3 rounded-2xl bg-white p-3 border border-neutral-200/80 shadow-xs transition hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="relative shrink-0" aria-label={product.name}>
        <ProductArt product={product} className="h-28 w-28 rounded-xl bg-white" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
          {brandName(product)}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-bold leading-5 hover:text-brand-700 transition"
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted">{unit}</p>
        <PriceBlock info={info} size="sm" />
        <span className="inline-flex items-center gap-1 self-start rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600">
          <Truck className="h-3 w-3 text-brand-700" strokeWidth={1.75} />
          {fulfilmentText}
        </span>
        <div className="mt-auto pt-1">
          <AddToCart product={product} stock={stock} size="sm" />
        </div>
      </div>
    </article>
  );
}
