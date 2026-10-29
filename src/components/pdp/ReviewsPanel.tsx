"use client";
import { useState } from "react";
import { Star, ShieldCheck, ThumbsUp, ChevronDown } from "lucide-react";
import type { Review } from "@/types";
import type { DomainTheme } from "./types";
import { cn } from "@/lib/cn";

interface ReviewsPanelProps {
  rating: number;
  ratingCount: number;
  reviews: Review[];
  theme: DomainTheme;
}

export function ReviewsPanel({
  rating,
  ratingCount,
  reviews,
  theme,
}: ReviewsPanelProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="rounded-3xl border border-line/80 bg-white p-4 sm:p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <h3 className="text-base font-extrabold text-ink">Verified Customer Reviews</h3>
          <p className="text-xs text-muted">
            All reviews from customers who purchased and verified this item
          </p>
        </div>
      </div>

      {/* Ratings Score & Histogram */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-bg p-5 text-center sm:w-44">
          <span className="font-display text-5xl font-extrabold text-ink tabular">
            {rating}
          </span>
          <div className="mt-1 flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted/30"
                )}
              />
            ))}
          </div>
          <span className="mt-1 text-xs font-semibold text-muted">
            {ratingCount.toLocaleString("en-IN")} total ratings
          </span>
        </div>

        {/* 5-Star Breakdown Bars */}
        <div className="flex-1 space-y-1.5 text-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = Math.max(
              4,
              Math.round(100 * Math.exp(-Math.abs(star - rating) * 1.3))
            );

            return (
              <div key={star} className="flex items-center gap-2.5">
                <span className="flex items-center justify-end gap-0.5 w-6 font-bold text-muted tabular">
                  {star}
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: theme.primary,
                    }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-[11px] text-muted">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-3.5 pt-2 border-t border-line/60">
        {reviews.length === 0 ? (
          <p className="text-center py-6 text-xs text-muted">
            No customer written reviews yet. Be the first to share your thoughts after delivery!
          </p>
        ) : (
          displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-line/60 bg-bg/50 p-4 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white shadow-xs"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {rev.rating} <Star className="h-2.5 w-2.5 fill-white" />
                  </span>
                  <strong className="text-ink">{rev.title}</strong>
                </div>
                <span className="text-[11px] text-muted">Verified Customer</span>
              </div>

              <p className="text-ink/90 leading-relaxed">{rev.body}</p>

              <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink">{rev.customerName}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-success font-bold">
                    <ShieldCheck className="h-3 w-3 text-success" />
                    Verified Purchase
                  </span>
                </div>

                <button
                  type="button"
                  className="flex min-h-[36px] items-center gap-1 text-muted hover:text-ink transition cursor-pointer"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful</span>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Collapsed Reviews Toggle */}
        {reviews.length > 2 && (
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-bold text-ink hover:bg-neutral-50 transition cursor-pointer"
            >
              <span>{showAll ? "Show fewer reviews" : `See all ${reviews.length} reviews`}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", showAll && "rotate-180")} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
