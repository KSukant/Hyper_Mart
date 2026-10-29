"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState, LinkButton, btn } from "@/components/ui/primitives";
import { useWish } from "@/store";
import { getProductById } from "@/lib/catalog";

export default function WishlistPage() {
  const { ids, toggle } = useWish();
  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  return (
    <TaskPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "My account", href: "/account" },
        { label: "Wishlist" },
      ]}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl text-ink">My Wishlist</h1>
          <p className="mt-1 text-sm text-muted">
            {products.length === 1
              ? "1 saved product"
              : `${products.length} saved products across all departments`}
          </p>
        </div>

        {products.length > 0 && (
          <button
            type="button"
            onClick={() => ids.forEach((id) => toggle(id))}
            className={btn("ghost", "sm", "text-muted hover:text-danger")}
          >
            <Trash2 className="h-4 w-4" />
            Clear wishlist
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-7 w-7 text-primary" />}
          title="Your wishlist is empty"
          action={<LinkButton href="/">Start exploring products</LinkButton>}
        >
          <p className="text-sm text-muted">
            Tap the heart icon on any product across Fresh Food, Fashion, Beauty, or Electronics to save it here for later.
          </p>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {products.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </TaskPage>
  );
}
