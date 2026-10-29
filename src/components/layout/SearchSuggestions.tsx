"use client";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, History, Sparkles, AlertCircle } from "lucide-react";
import type { Product, Brand, Category } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { formatINR } from "@/lib/format";
import { departments } from "@/mocks";
import { cn } from "@/lib/cn";

interface SearchSuggestionsProps {
  query: string;
  searchResults: Product[];
  matchingBrands: Brand[];
  recentSearches: string[];
  trendingSearches: string[];
  highlightIdx: number;
  cityId: string;
  isMember: boolean;
  onSelectQuery: (q: string) => void;
  onSelectProduct: (product: Product) => void;
  onClearRecent: () => void;
}

export function SearchSuggestions({
  query,
  searchResults,
  matchingBrands,
  recentSearches,
  trendingSearches,
  highlightIdx,
  onSelectQuery,
  onSelectProduct,
  onClearRecent,
}: SearchSuggestionsProps) {
  const isTyping = query.trim().length >= 2;

  if (!isTyping) {
    return (
      <div className="p-4 space-y-4">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted">
              <span className="flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 text-emerald-700" />
                Recent searches
              </span>
              <button
                type="button"
                onClick={onClearRecent}
                className="text-[11px] font-semibold text-muted hover:text-red-600 transition"
              >
                Clear
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onMouseDown={() => onSelectQuery(term)}
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-ink transition hover:border-primary hover:bg-primary-tint hover:text-primary"
                >
                  <span>{term}</span>
                  <ArrowUpRight className="h-3 w-3 text-muted" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Trending on HyperMart
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {trendingSearches.map((item) => (
              <button
                key={item}
                type="button"
                onMouseDown={() => onSelectQuery(item)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-ink transition hover:bg-primary-tint hover:text-primary"
              >
                <span>{item}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Top Department Shortcuts */}
        <div className="border-t border-line/70 pt-3">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
            Browse Top Departments
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {departments.map((d) => (
              <Link
                key={d.id}
                href={`/category/${d.id}`}
                className="rounded-lg bg-bg px-2.5 py-1 text-xs font-semibold text-ink transition hover:bg-primary-tint hover:text-primary"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Brand Suggestions */}
      {matchingBrands.length > 0 && (
        <div className="border-b border-line bg-primary-tint/50 px-4 py-2 text-xs flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="font-semibold text-muted">Matching Brands:</span>
          <div className="flex flex-wrap gap-1.5">
            {matchingBrands.map((b) => (
              <button
                key={b.id}
                type="button"
                onMouseDown={() => onSelectQuery(b.name)}
                className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-primary shadow-xs border border-primary/20 hover:bg-primary-tint"
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Results */}
      {searchResults.length > 0 ? (
        <div className="py-1">
          <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
            Products
          </div>
          {searchResults.map((product, idx) => {
            const isHighlighted = highlightIdx === idx;
            return (
              <button
                key={product.id}
                type="button"
                onMouseDown={() => onSelectProduct(product)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition",
                  isHighlighted ? "bg-primary-tint font-medium" : "hover:bg-bg"
                )}
              >
                <ProductArt product={product} className="h-11 w-11 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                  <span className="text-[11px] text-muted">{product.unit}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="block font-extrabold text-ink tabular">
                    {formatINR(product.price)}
                  </span>
                </div>
              </button>
            );
          })}

          <button
            type="button"
            onMouseDown={() => onSelectQuery(query)}
            className="flex w-full items-center justify-between border-t border-line px-4 py-3 text-xs font-bold text-primary hover:bg-primary-tint"
          >
            <span>View all matching results for “{query}” →</span>
            <span className="text-muted font-normal text-[11px]">Press Enter</span>
          </button>
        </div>
      ) : (
        /* No Results State */
        <div className="p-6 text-center space-y-3">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-amber-50 text-amber-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">No exact matches for “{query}”</p>
            <p className="mt-0.5 text-xs text-muted">
              Check your spelling or explore one of our popular departments below
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {departments.map((d) => (
              <Link
                key={d.id}
                href={`/category/${d.id}`}
                className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:bg-primary-tint hover:text-primary"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
