"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Percent,
  Plus,
  Calendar,
  TrendingUp,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function PromotionsPage() {
  const [coupons, setCoupons] = useState([
    { code: "FRESH20", offer: "20% off (Fresh Produce)", validity: "11 Apr – 13 Apr", usage: "1,842 / 5,000", status: "Active" },
    { code: "SAVE15", offer: "15% off (Aashirvaad)", validity: "01 Apr – 30 Apr", usage: "3,921 / 10,000", status: "Active" },
    { code: "ELECTRO30", offer: "Up to 30% off (Electronics)", validity: "12 Apr – 14 Apr", usage: "980 / 5,000", status: "Active" },
    { code: "WELCOME10", offer: "10% off (First order)", validity: "01 Apr – 30 Apr", usage: "4,208 / 10,000", status: "Active" },
  ]);

  const [activeTab, setActiveTab] = useState<"all" | "active" | "upcoming">("all");

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    toast(`Copied coupon code ${code} to clipboard!`);
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Promotions & Campaigns
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Offers & promotions
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Create and manage campaigns, discounts and promotional codes across HyperMart.
          </p>
        </div>

        <button
          onClick={() => toast("Promotion builder opened.")}
          className="flex h-11 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create offer</span>
        </button>
      </div>

      {/* ── 2. Top Metric Cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:gap-4">
        {[
          { title: "Active campaigns", value: "8", delta: "+2 vs last month", icon: Percent, color: "text-emerald-700 bg-emerald-50" },
          { title: "Upcoming campaigns", value: "5", delta: "Starts this week", icon: Calendar, color: "text-blue-700 bg-blue-50" },
          { title: "Offer attach rate", value: "24.8%", delta: "+4.1% vs last month", icon: TrendingUp, color: "text-purple-700 bg-purple-50" },
          { title: "Conversion rate", value: "6.3%", delta: "+1.2% vs last month", icon: Tag, color: "text-amber-700 bg-amber-50" },
          { title: "Expiring soon", value: "3", delta: "Within 7 days", icon: Clock, color: "text-rose-700 bg-rose-50" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.title} className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {k.title}
                </span>
                <span className={cn("grid h-7 w-7 place-items-center rounded-lg", k.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-black text-neutral-900">{k.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-neutral-500">{k.delta}</p>
            </div>
          );
        })}
      </div>

      {/* ── 3. Active vs Upcoming Campaigns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-neutral-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Active campaigns</span>
            </h2>
            <span className="text-xs font-semibold text-neutral-400">3 live now</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {[
              { name: "Fresh Friday", type: "Category", benefit: "20% off", dates: "11 Apr – 13 Apr", conv: "12.4% conv" },
              { name: "Aashirvaad Staples", type: "Brand", benefit: "15% off", dates: "01 Apr – 30 Apr", conv: "8.1% conv" },
              { name: "Electronics Weekend", type: "Category", benefit: "Up to 30% off", dates: "12 Apr – 14 Apr", conv: "9.7% conv" },
            ].map((c) => (
              <div key={c.name} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{c.name}</p>
                  <p className="text-[11px] text-neutral-500">{c.benefit} · {c.dates}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                    Active
                  </span>
                  <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">{c.conv}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Campaigns */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-neutral-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Upcoming campaigns</span>
            </h2>
            <span className="text-xs font-semibold text-neutral-400">Scheduled</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {[
              { name: "Summer Essentials", type: "Category", benefit: "20% off", starts: "In 3 days" },
              { name: "Beauty Bonanza", type: "Category", benefit: "Buy 2 Get 1", starts: "In 5 days" },
              { name: "Monsoon Ready", type: "Category", benefit: "Up to 25% off", starts: "In 12 days" },
            ].map((c) => (
              <div key={c.name} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{c.name}</p>
                  <p className="text-[11px] text-neutral-500">{c.benefit}</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-800 border border-blue-200">
                    Scheduled
                  </span>
                  <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">{c.starts}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Discount Rules & Coupon Codes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* Coupon Codes Table */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-neutral-900">Active coupon codes</h2>
            <span className="text-xs font-semibold text-neutral-400">Checkout vouchers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2.5">Code</th>
                  <th className="py-2.5">Offer Details</th>
                  <th className="py-2.5">Validity</th>
                  <th className="py-2.5">Redemptions</th>
                  <th className="py-2.5 text-center">Copy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {coupons.map((cpn) => (
                  <tr key={cpn.code} className="hover:bg-neutral-50 transition">
                    <td className="py-3 font-mono font-bold text-emerald-800 text-xs">
                      {cpn.code}
                    </td>
                    <td className="py-3 font-medium text-neutral-800">{cpn.offer}</td>
                    <td className="py-3 text-neutral-500">{cpn.validity}</td>
                    <td className="py-3 font-bold text-neutral-900">{cpn.usage}</td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() => copyCoupon(cpn.code)}
                        className="text-neutral-400 hover:text-emerald-700 transition"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Discount Rules */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-neutral-900">Discount rules</h2>
            <span className="text-xs font-semibold text-neutral-400">Cart rules</span>
          </div>
          <div className="space-y-2">
            {[
              { rule: "Cart Value Discount", cond: "Cart ≥ ₹999", benefit: "10% off entire cart", status: "Active" },
              { rule: "Category Discount", cond: "Electronics item in cart", benefit: "15% off electronics", status: "Active" },
              { rule: "First Order Benefit", cond: "New customer phone/email", benefit: "20% off up to ₹200", status: "Active" },
              { rule: "Bulk Purchase Saver", cond: "Buy 3 or more of same SKU", benefit: "15% wholesale discount", status: "Paused" },
            ].map((r) => (
              <div key={r.rule} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{r.rule}</p>
                  <p className="text-[11px] text-neutral-500">{r.cond} → <strong className="text-emerald-800">{r.benefit}</strong></p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                    r.status === "Active"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-neutral-200 text-neutral-600 border-neutral-300"
                  )}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
