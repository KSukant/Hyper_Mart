"use client";
import Link from "next/link";
import { useState } from "react";
import { Star, ShieldCheck, Heart, Share2, Check, Copy } from "lucide-react";
import type { Product } from "@/types";
import { brandName } from "@/lib/catalog";
import { useWish } from "@/store";
import { toast } from "@/components/ui/primitives";
import type { DomainTheme } from "./types";
import { cn } from "@/lib/cn";

interface ProductIdentityProps {
  product: Product;
  theme: DomainTheme;
}

export function ProductIdentity({ product, theme }: ProductIdentityProps) {
  const brand = brandName(product);
  const { ids, toggle } = useWish();
  const isWishlisted = ids.includes(product.id);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast("Product link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const a = product.attrs;

  return (
    <div className="space-y-2.5">
      {/* Brand & Sold by Row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Link
            href={`/search?q=${encodeURIComponent(brand)}`}
            className="font-extrabold hover:underline transition"
            style={{ color: theme.primary }}
          >
            {brand}
          </Link>
          <span className="text-muted">•</span>
          <span className="inline-flex items-center gap-1 font-semibold text-success">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Sold by HyperMart
          </span>
        </div>

        {/* Wishlist & Share action icons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              toggle(product.id);
              toast(isWishlisted ? "Removed from wishlist" : "Saved to wishlist");
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border transition",
              isWishlisted
                ? "border-pink-300 bg-pink-50 text-pink-600 shadow-xs"
                : "border-line bg-white text-muted hover:border-pink-300 hover:text-pink-600"
            )}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-pink-600")} />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="grid h-8 w-8 place-items-center rounded-full border border-line bg-white text-muted transition hover:border-primary hover:text-primary"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="flex items-start gap-2.5 text-2xl font-extrabold text-ink sm:text-3xl leading-tight">
        {a.department === "food" && <VegMark kind={a.vegMark} />}
        <span>{product.name}</span>
      </h1>

      {/* Ratings, Review Count & SKU */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <a
          href="#reviews"
          className="inline-flex items-center gap-1.5 transition hover:underline"
        >
          <span
            className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold text-white shadow-xs"
            style={{ backgroundColor: theme.primary }}
          >
            {product.rating}
            <Star className="h-3 w-3 fill-white" />
          </span>
          <span className="font-semibold text-ink">
            {product.ratingCount.toLocaleString("en-IN")} ratings
          </span>
        </a>

        <span>•</span>
        <span className="font-medium">{product.unit}</span>

        <span>•</span>
        <span className="font-mono text-[11px] text-muted">SKU: {product.id.toUpperCase()}</span>
      </div>
    </div>
  );
}

function VegMark({ kind }: { kind: "veg" | "nonveg" | "egg" }) {
  const c = kind === "veg" ? "#2E7D32" : kind === "egg" ? "#C77700" : "#8B3A1E";
  return (
    <span
      title={kind === "veg" ? "Vegetarian" : kind === "egg" ? "Contains egg" : "Non-vegetarian"}
      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-[3px] border-2 bg-white"
      style={{ borderColor: c }}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
    </span>
  );
}
