"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  ShoppingCart,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { BRAND_AGREEMENTS, type BrandAgreement } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function BrandsProcurementPage() {
  const [brands, setBrands] = useState<BrandAgreement[]>(BRAND_AGREEMENTS);
  const [search, setSearch] = useState("");

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.agreementId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Brands & Procurement
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Own the assortment, clearly
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Stronger brands. Smarter buys. A healthier tomorrow.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toast("Brand onboarding form opened.")}
            className="flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add brand</span>
          </button>
          <Link
            href="/admin/purchase-orders"
            className="flex h-10 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Create purchase order</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Top Metric Cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {[
          { title: "Buying health", value: "87%", delta: "+6% on track vs plan", icon: TrendingUp, color: "text-emerald-700 bg-emerald-50" },
          { title: "On-time deliveries", value: "92%", delta: "+4% last 30 days", icon: Clock, color: "text-blue-700 bg-blue-50" },
          { title: "Agreements active", value: "28", delta: "Across 14 brands", icon: ShieldCheck, color: "text-purple-700 bg-purple-50" },
          { title: "At risk SKUs", value: "6%", delta: "-2% may need attention", icon: AlertTriangle, color: "text-rose-700 bg-rose-50" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.title} className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
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

      {/* ── 3. Brand Directory Table ── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-neutral-900">Brand directory</h2>
            <p className="text-xs text-neutral-500">Manage brand assortments, wholesale agreements and buying timelines.</p>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands or agreements..."
            className="h-9 w-64 rounded-xl border border-neutral-200 px-3 text-xs font-medium placeholder-neutral-400 focus:outline-none focus:border-emerald-700"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-2">Brand</th>
                <th className="py-3 px-2 text-right">Active SKUs</th>
                <th className="py-3 px-3">Wholesale Agreement</th>
                <th className="py-3 px-3">Next Buying Window</th>
                <th className="py-3 px-2">Compliance</th>
                <th className="py-3 px-2">Stock Health</th>
                <th className="py-3 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredBrands.map((b) => (
                <tr key={b.id} className="hover:bg-neutral-50 transition">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-100 border border-neutral-200 font-black text-xs text-emerald-900">
                        {b.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-bold text-neutral-900">{b.name}</p>
                        <p className="text-[11px] text-neutral-500">{b.domain}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-neutral-800">{b.activeSkus}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-xs font-bold text-neutral-900">{b.agreementId}</span>
                    <p className="text-[11px] text-neutral-400">{b.agreementPeriod}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-neutral-800">{b.nextBuyingWindow}</p>
                    <p className="text-[11px] text-emerald-700 font-bold">In {b.daysRemaining} days</p>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                        b.complianceStatus === "Compliant"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      )}
                    >
                      {b.complianceStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                        b.stockHealth === "Healthy" && "bg-emerald-50 text-emerald-800 border-emerald-200",
                        b.stockHealth === "At risk" && "bg-amber-50 text-amber-800 border-amber-200",
                        b.stockHealth === "Low stock" && "bg-rose-50 text-rose-800 border-rose-200"
                      )}
                    >
                      {b.stockHealth}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <Link
                      href={`/admin/products?brand=${b.name}`}
                      className="font-bold text-emerald-700 hover:underline text-xs"
                    >
                      View SKUs
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. Procurement Timeline Roadmap ── */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-neutral-900">Procurement timeline</h2>
            <p className="text-xs text-neutral-500">Key buying, delivery and review milestones across brands.</p>
          </div>
          <span className="text-xs font-semibold text-neutral-400">Next 3 months</span>
        </div>

        <div className="relative pt-6 pb-2 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] border-t-2 border-emerald-200 relative">
            {[
              { date: "Mar 25", label: "PO placed Tide", status: "Completed" },
              { date: "Apr 5", label: "Delivery complete Aashirvaad", status: "Completed" },
              { date: "Apr 15", label: "Buying window Aashirvaad", status: "Upcoming" },
              { date: "Apr 22", label: "Buying window Lakmé", status: "Planned" },
              { date: "May 1", label: "Buying window Sony", status: "Planned" },
              { date: "May 6", label: "Buying window Tide", status: "Planned" },
              { date: "May 20", label: "Agreement review All brands", status: "Planned" },
            ].map((m, idx) => (
              <div key={idx} className="flex flex-col items-center -mt-3.5 relative">
                <span
                  className={cn(
                    "h-6 w-6 rounded-full border-2 grid place-items-center text-xs font-bold transition",
                    m.status === "Completed" && "bg-emerald-700 border-emerald-700 text-white",
                    m.status === "Upcoming" && "bg-accent border-accent text-accent-text ring-4 ring-emerald-100",
                    m.status === "Planned" && "bg-white border-neutral-300 text-neutral-400"
                  )}
                >
                  {m.status === "Completed" ? "✓" : idx + 1}
                </span>
                <span className="mt-2 text-xs font-bold text-neutral-900">{m.date}</span>
                <span className="text-[10px] text-neutral-500 text-center max-w-[90px] leading-tight mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
