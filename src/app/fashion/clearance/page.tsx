"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Heart,
  ChevronDown,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/primitives";

interface ClearanceItem {
  id: string;
  name: string;
  category: string;
  slug: string;
  discountPct: number;
  price: number;
  mrp: number;
  sizes: string[];
  image: string;
}

const CLEARANCE_ITEMS: ClearanceItem[] = [
  {
    id: "p-fash-001",
    name: "Men's Cotton Kurta",
    category: "Kurtas",
    slug: "manyavar-mens-cotton-kurta",
    discountPct: 50,
    price: 1299,
    mrp: 2599,
    sizes: ["S", "M", "L", "XL"],
    image: "/products/fashion/manyavar-mens-cotton-kurta-1.jpg",
  },
  {
    id: "p-fash-004",
    name: "Men's Linen Shirt",
    category: "Shirts",
    slug: "allen-solly-formal-shirt",
    discountPct: 50,
    price: 1199,
    mrp: 2399,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/products/fashion/allen-solly-formal-shirt-1.jpg",
  },
  {
    id: "p-fash-003",
    name: "Men's Chino Trousers",
    category: "Trousers",
    slug: "levis-511-slim-jeans",
    discountPct: 50,
    price: 999,
    mrp: 1999,
    sizes: ["30", "32", "34", "36"],
    image: "/products/fashion/levis-511-slim-jeans-1.jpg",
  },
  {
    id: "p-fash-008",
    name: "Men's Nehru Jacket",
    category: "Jackets",
    slug: "roadster-winter-jacket",
    discountPct: 50,
    price: 1499,
    mrp: 2999,
    sizes: ["S", "M", "L", "XL"],
    image: "/products/fashion/roadster-winter-jacket-1.jpg",
  },
  {
    id: "p-fash-008-2",
    name: "Roadster Men's Puffer Jacket",
    category: "Jackets",
    slug: "roadster-winter-jacket",
    discountPct: 40,
    price: 2399,
    mrp: 3999,
    sizes: ["M", "L", "XL"],
    image: "/products/fashion/roadster-winter-jacket-1.jpg",
  },
  {
    id: "p-fash-005",
    name: "Biba Printed Kurta Set",
    category: "Ethnic Sets",
    slug: "biba-cotton-kurta-set",
    discountPct: 50,
    price: 1749,
    mrp: 3499,
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/products/fashion/biba-cotton-kurta-set-1.jpg",
  },
  {
    id: "p-fash-006",
    name: "Puma Running Shoes",
    category: "Footwear",
    slug: "puma-running-shoes",
    discountPct: 40,
    price: 2999,
    mrp: 4999,
    sizes: ["UK 7", "UK 8", "UK 9"],
    image: "/products/fashion/puma-running-shoes-1.jpg",
  },
  {
    id: "p-fash-007",
    name: "Kids' Printed T-Shirt",
    category: "Kids",
    slug: "kids-cotton-tshirt",
    discountPct: 40,
    price: 299,
    mrp: 499,
    sizes: ["4–5 Y", "6–7 Y", "8–9 Y"],
    image: "/products/fashion/kids-cotton-tshirt-1.jpg",
  },
];

const CATEGORIES = ["All", "Kurtas", "Shirts", "Trousers", "Jackets", "Ethnic Sets", "More ▾"];

function FashionClearanceContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Recommended");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    let items = CLEARANCE_ITEMS;
    if (selectedCategory !== "All" && !selectedCategory.includes("More")) {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (sortOption === "Price: Low to High") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortOption === "Highest Discount") {
      items = [...items].sort((a, b) => b.discountPct - a.discountPct);
    }
    return items;
  }, [selectedCategory, sortOption]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = !prev[id];
      toast(next ? "Saved to wishlist" : "Removed from wishlist");
      return { ...prev, [id]: next };
    });
  };

  return (
    <TaskPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Fashion", href: "/category/fashion" },
        { label: "Clearance" },
      ]}
    >
      <div data-domain="fashion" className="space-y-6">
        {/* ── Screen 6 Header Row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-ink sm:text-4xl">
              Fashion clearance
            </h1>
            <p className="text-xs text-muted sm:text-sm mt-1">
              Timeless styles. Limited stock. Big savings.
            </p>
          </div>

          {/* Top Right Countdown Badge Card */}
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-2.5 shadow-xs">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-xs text-muted font-bold">
                <Clock className="h-3.5 w-3.5 text-rose-600" />
                <span>Ends 30 Apr 2025</span>
              </div>
              <span className="font-display text-base font-extrabold text-ink sm:text-lg">
                Up to 60% OFF
              </span>
            </div>
          </div>
        </div>

        {/* ── Filter Chips & Sort Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
          {/* Subcategory Chips */}
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition",
                    active
                      ? "bg-primary text-white shadow-xs"
                      : "border border-line bg-white text-ink hover:border-primary/50"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
            <label htmlFor="sort-select" className="sr-only">
              Sort by
            </label>
            <div className="flex items-center gap-1 text-xs font-bold text-ink">
              <span className="text-muted font-normal">Sort by:</span>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-4 font-bold outline-none"
              >
                <option value="Recommended">Recommended</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Highest Discount">Highest Discount</option>
              </select>
              <ChevronDown className="pointer-events-none h-3 w-3 text-muted -ml-3" />
            </div>
          </div>
        </div>

        {/* ── Products Grid Matching Screen 6 ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-xs transition hover:shadow-card"
            >
              {/* Image & Badges */}
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-bg border border-line/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2 transition duration-300 group-hover:scale-105"
                />

                {/* Discount Badge */}
                <span className="absolute left-2.5 top-2.5 rounded-md bg-primary px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                  {item.discountPct}% OFF
                </span>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(item.id);
                  }}
                  className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-muted shadow-xs transition hover:text-rose-600 hover:scale-110"
                  aria-label="Save to wishlist"
                >
                  <Heart
                    className={cn(
                      "h-3.5 w-3.5",
                      wishlist[item.id] ? "fill-rose-600 text-rose-600" : ""
                    )}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-3 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}?clearance=true`}
                    className="line-clamp-1 font-bold text-xs text-ink hover:text-primary transition"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display text-sm font-extrabold text-ink tabular">
                      ₹ {item.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] font-semibold text-muted line-through tabular">
                      ₹ {item.mrp.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Size Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.sizes.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line bg-bg/80 px-1.5 py-0.5 text-[10px] font-bold text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <Link
                  href={`/product/${item.slug}?clearance=true`}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-bg/40 py-2 text-[11px] font-bold text-ink transition hover:bg-primary hover:text-white"
                >
                  <span>Shop clearance</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Screen 6 Bottom Shopping Experience & Trust Footer ── */}
        <div className="mt-8 rounded-3xl border border-line/80 bg-white p-5 shadow-xs sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Left: Cart Info */}
            <div className="flex items-center gap-3.5 max-w-lg">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-bg border border-line text-ink shrink-0">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <strong className="block text-xs font-bold text-ink sm:text-sm">
                  Same great shopping experience
                </strong>
                <p className="text-[11px] text-muted leading-relaxed sm:text-xs">
                  Clearance items are part of our main store. They use the same product page, cart, checkout, payment and order flow.
                </p>
              </div>
            </div>

            {/* Right: Guarantees */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-ink sm:gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>Reliable Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-amber-600" />
                <span>Easy Returns &amp; Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TaskPage>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg animate-pulse" />}>
      <FashionClearanceContent />
    </Suspense>
  );
}
