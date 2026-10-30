"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Package,
  Truck,
  RotateCcw,
  AlertTriangle,
  Headphones,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Building,
  TrendingUp,
  CloudRain,
  ShieldAlert,
  Calendar,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { usePortalStore } from "@/store/portalStore";
import { cn } from "@/lib/cn";

export default function OperationsDashboardPage() {
  const { currentUser } = useAdminStore();
  const { activeFacility } = usePortalStore();

  const kpis = [
    {
      title: "Orders today",
      value: "1,284",
      delta: "+12%",
      positive: true,
      icon: ShoppingCart,
      color: "text-emerald-700 bg-emerald-50",
      href: "/portal/orders",
    },
    {
      title: "Packing queue",
      value: "186",
      delta: "-18%",
      positive: true,
      icon: Package,
      color: "text-amber-700 bg-amber-50",
      href: "/portal/warehouse-readiness",
    },
    {
      title: "Out for delivery",
      value: "428",
      delta: "+6%",
      positive: true,
      icon: Truck,
      color: "text-blue-700 bg-blue-50",
      href: "/portal/fulfilment",
    },
    {
      title: "Refunds awaiting",
      value: "₹48,620",
      delta: "-32%",
      positive: true,
      icon: RotateCcw,
      color: "text-purple-700 bg-purple-50",
      href: "/portal/refund-processing",
    },
    {
      title: "Low stock",
      value: "17",
      delta: "-41%",
      positive: true,
      icon: AlertTriangle,
      color: "text-rose-700 bg-rose-50",
      href: "/portal/inventory/alerts",
    },
    {
      title: "Customer escalations",
      value: "08",
      delta: "-27%",
      positive: true,
      icon: Headphones,
      color: "text-indigo-700 bg-indigo-50",
      href: "/portal/customer-care",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header: Greeting & Context ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Operations Command Dashboard
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Live operational monitoring and execution across {activeFacility || "Coimbatore DC & Chennai FC"}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-emerald-700" />
            <span>Live Regional Shift</span>
          </div>
        </div>
      </div>

      {/* ── 2. Top KPI Cards Grid (6 Metric Cards) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.title}
              href={kpi.href}
              className="group rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {kpi.title}
                </span>
                <span className={cn("grid h-7 w-7 place-items-center rounded-lg text-xs", kpi.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-black tracking-tight text-neutral-900">
                {kpi.value}
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                {kpi.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500" />
                )}
                <span>{kpi.delta} vs. yesterday</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── 3. Central Two-Column Layout: Fulfilment Control Tower & Needs Attention ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left: Fulfilment Control Tower */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-neutral-900">
                  Fulfilment Control Tower
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  On track
                </span>
              </div>
              <p className="text-xs text-neutral-500">Live view of regional fulfillment flow</p>
            </div>
            <Link
              href="/portal/fulfilment"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Full Tower</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Regional Transit Corridor */}
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-800 shadow-2xs border border-neutral-200">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Coimbatore DC</p>
                  <p className="text-[11px] text-neutral-500">Dispatching primary waves</p>
                </div>
              </div>

              {/* Transit Corridor Connecting Line */}
              <div className="flex-1 px-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                  IN TRANSIT · ~8 hrs · 498 km
                </span>
                <div className="relative mt-2 h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-2/3 rounded-full bg-emerald-600 animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-800 shadow-2xs border border-neutral-200">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900">Chennai FC</p>
                  <p className="text-[11px] text-neutral-500">Receiving hub stock today</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Order State Progression */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { stage: "Paid", count: "1,284", icon: CheckCircle2, active: true },
              { stage: "Packing", count: "186", icon: Package, active: true },
              { stage: "Out for delivery", count: "428", icon: Truck, active: true },
              { stage: "Delivered", count: "670", icon: CheckCircle2, active: false },
            ].map((step) => (
              <div
                key={step.stage}
                className={cn(
                  "flex flex-col items-center rounded-xl p-3 text-center border transition",
                  step.active
                    ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                    : "border-neutral-100 bg-neutral-50 text-neutral-400"
                )}
              >
                <step.icon className={cn("h-4 w-4 mb-1", step.active ? "text-emerald-700" : "text-neutral-400")} />
                <span className="text-[11px] font-semibold">{step.stage}</span>
                <span className="font-display font-extrabold text-lg text-neutral-900">{step.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Needs Attention Panel */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-neutral-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Needs attention</span>
            </h2>
            <Link href="/portal/exceptions" className="text-xs font-bold text-emerald-700 hover:underline">
              View all
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 space-y-1">
            {[
              {
                title: "17 SKUs low in stock",
                desc: "Across Home, Beauty and Grocery departments",
                severity: "High",
                href: "/portal/inventory/alerts",
                color: "text-amber-500",
              },
              {
                title: "₹48,620 in refunds awaiting",
                desc: "12 requests pending manager approval",
                severity: "High",
                href: "/portal/refund-processing",
                color: "text-amber-500",
              },
              {
                title: "8 customer escalations",
                desc: "Response overdue for 3 active tickets",
                severity: "Medium",
                href: "/portal/customer-care",
                color: "text-blue-500",
              },
              {
                title: "Delay risk on 24 orders",
                desc: "Chennai FC — regional weather advisory",
                severity: "Critical",
                href: "/portal/exceptions",
                color: "text-rose-500",
              },
              {
                title: "High RTO risk flagged",
                desc: "12 high-value orders from Tier 3 pincodes",
                severity: "Medium",
                href: "/portal/orders",
                color: "text-purple-500",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between py-2.5 hover:bg-neutral-50 px-2 rounded-xl transition cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={cn("h-4 w-4 shrink-0 mt-0.5", item.color)} />
                  <div>
                    <p className="text-xs font-bold text-neutral-900 group-hover:text-emerald-800 transition">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-neutral-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Lower Section: Orders by Brand & Orders by Category ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Orders by Brand */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Orders by brand</h3>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Top brands today</span>
          </div>
          <div className="space-y-2">
            {[
              { brand: "HyperMart Essentials", pct: 32 },
              { brand: "FreshLeaf", pct: 18 },
              { brand: "UrbanNest", pct: 12 },
              { brand: "FitFuel", pct: 11 },
              { brand: "GlowPlus", pct: 9 },
            ].map((b) => (
              <div key={b.brand} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-700">{b.brand}</span>
                  <span className="font-bold text-neutral-900">{b.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-700" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Category */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Orders by category</h3>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Share of orders</span>
          </div>
          <div className="space-y-2">
            {[
              { cat: "Grocery & Fresh", pct: 28 },
              { cat: "Home & Living", pct: 20 },
              { cat: "Beauty & Personal Care", pct: 16 },
              { cat: "Electronics", pct: 14 },
              { cat: "Fashion", pct: 12 },
            ].map((c) => (
              <div key={c.cat} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-700">{c.cat}</span>
                  <span className="font-bold text-neutral-900">{c.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#1D4E89]" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Purpose Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#063922] to-[#0A4F30] p-6 text-white shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-accent">
              <TrendingUp className="h-3 w-3" />
              <span>Operational Excellence</span>
            </span>
            <h3 className="font-display text-xl font-bold leading-tight">
              Keep orders moving. <br />
              Keep customers happy.
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed pt-1">
              Real-time dispatch telemetry enables Coimbatore DC and Chennai FC to resolve bottlenecks before they impact SLA.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-emerald-200/70">Next Dispatch Wave</span>
            <span className="font-bold text-accent">W-7241 at 14:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
