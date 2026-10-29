import type { ProductImage, Department } from "@/types";

/** Builds the image list for a product. Real photos go in /public/products/<department>/<slug>-<n>.jpg.
 *  Until they exist, the UI falls back to /products/placeholder-<department>.svg (see lib/images.ts). */
export const imgs = (department: Department, slug: string, name: string, kinds: ProductImage["kind"][] = ["main", "angle", "detail"]): ProductImage[] =>
  kinds.map((kind, i) => ({
    src: `/products/${department}/${slug}-${i + 1}.jpg`,
    alt: i === 0 ? name : `${name} — ${kind.replace("_", " ")} view`,
    kind,
  }));
