"use client";
import Image from "next/image";
import type { Product } from "@/types";
import { PHOTOS } from "@/lib/photo-manifest";
import { cn } from "@/lib/cn";

export function getProductPhotoSrc(product: Product, index: number = 0): string | null {
  // Check slug-based directory: /products/<slug>/<index+1>.jpg
  const slugPath = `/products/${product.slug}/${index + 1}.jpg`;
  if (PHOTOS.has(slugPath)) return slugPath;

  // Check department-based directory: /products/<department>/<slug>-<index+1>.jpg
  const deptPath = `/products/${product.department}/${product.slug}-${index + 1}.jpg`;
  if (PHOTOS.has(deptPath)) return deptPath;

  // Check product.images[index].src
  const explicit = product.images?.[index]?.src;
  if (explicit && PHOTOS.has(explicit)) return explicit;

  // Fallback to first image if requesting index > 0 and no alternate exists
  if (index > 0) {
    return getProductPhotoSrc(product, 0);
  }

  return null;
}

/**
 * ProductArt renders ONLY verified real photographs on a clean neutral background.
 * If no real photo exists, it displays a neutral grey "Photo coming soon" tile.
 * No illustrated, vector, cartoon, 3D-render or AI-generated SVGs are rendered.
 */
export function ProductArt({
  product,
  colour,
  className = "",
  index = 0,
  fit = "contain",
  priority = false,
}: {
  product: Product;
  colour?: string;
  className?: string;
  index?: number;
  fit?: "contain" | "cover";
  priority?: boolean;
}) {
  const photoSrc = getProductPhotoSrc(product, index);
  const altText = index === 0 ? product.name : `${product.name} — view ${index + 1}`;

  return (
    <div className={cn("relative overflow-hidden bg-white flex items-center justify-center", className)}>
      {photoSrc ? (
        <Image
          src={photoSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          priority={priority}
          className={cn(
            "transition duration-300",
            fit === "contain" ? "object-contain p-2" : "object-cover"
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-100 p-2 text-center text-xs font-semibold text-neutral-400">
          Photo coming soon
        </div>
      )}
    </div>
  );
}
