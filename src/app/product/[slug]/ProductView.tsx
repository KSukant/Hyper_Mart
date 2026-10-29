"use client";
import { getProduct } from "@/lib/catalog";
import { ProductPageShell } from "@/components/pdp/ProductPageShell";
import { notFound } from "next/navigation";

import { Suspense } from "react";

export function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg animate-pulse" />}>
      <ProductPageShell product={product} />
    </Suspense>
  );
}
