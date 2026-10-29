"use client";
import { Sparkles } from "lucide-react";
import type { PriceInfo } from "@/lib/pricing";
import { formatINR } from "@/lib/format";
import { Countdown } from "@/components/product/parts";
import { useMember } from "@/store";
import { toast } from "@/components/ui/primitives";
import type { DomainTheme } from "./types";
import { cn } from "@/lib/cn";

interface ProductPriceCardProps {
  info: PriceInfo;
  theme: DomainTheme;
}

export function ProductPriceCard({ info, theme }: ProductPriceCardProps) {
  const { isMember, setMember } = useMember();
  const offer = info.offer;

  return (
    <div className="rounded-3xl border border-line/70 bg-white p-5 shadow-sm space-y-3">
      {/* Primary Price Row */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-3xl font-extrabold text-ink tabular sm:text-4xl">
          {formatINR(info.finalPrice)}
        </span>

        {info.discountPct > 0 && (
          <>
            <span className="text-base text-muted line-through tabular">
              {formatINR(info.mrp)}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-black shadow-xs"
              style={{
                backgroundColor: theme.tint,
                color: theme.primary,
              }}
            >
              {info.discountPct}% OFF
            </span>
          </>
        )}

        {info.perKg && (
          <span className="text-xs font-semibold text-muted">
            ({formatINR(info.finalPrice)} / kg)
          </span>
        )}
      </div>

      <p className="text-xs text-muted">
        Inclusive of all applicable taxes · No hidden packing charges
      </p>

      {/* Member Price Callout */}
      {!isMember && info.memberPrice !== undefined && (
        <div className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary-tint/70 p-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div>
              <span className="font-extrabold text-ink">
                Member Price {formatINR(info.memberPrice)}
              </span>
              <span className="block text-[11px] text-primary/90 font-medium">
                Save an extra {formatINR(info.finalPrice - info.memberPrice)} with HyperMart Rewards
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setMember(true);
              toast("Joined HyperMart Rewards (Demo)");
            }}
            className="shrink-0 rounded-xl bg-primary px-3 py-1.5 font-extrabold text-white transition hover:bg-primary-dark"
          >
            Join Rewards
          </button>
        </div>
      )}

      {/* Deal Countdown / Offer Strip */}
      {offer && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-amber-50/90 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900">
          <span className="font-black text-amber-950 uppercase tracking-wider">
            {offer.label}
          </span>
          {offer.type === "deal" && (
            <div className="font-mono font-bold text-amber-950 bg-amber-200/60 px-2 py-0.5 rounded-md">
              <Countdown endsAt={offer.endsAt} />
            </div>
          )}
          {offer.conditionNote && (
            <span className="text-amber-800">• {offer.conditionNote}</span>
          )}
        </div>
      )}
    </div>
  );
}
