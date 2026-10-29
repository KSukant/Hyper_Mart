"use client";

import Link from "next/link";
import {
  FolderKanban,
  Package,
  Plus,
  ArrowRight,
  TrendingUp,
  Tag,
  CheckCircle2,
  Clock,
  Ban,
  FileEdit,
  Building,
  Sparkles,
} from "lucide-react";
import { ADMIN_PRODUCTS } from "@/mocks/adminData";

export default function CatalogueOverviewPage() {
  const kpis = [
    { title: "Total active products", value: "48,320", delta: "+12%", icon: Package, color: "text-emerald-700 bg-emerald-50" },
    { title: "Pending approvals", value: "1,284", delta: "+6%", icon: Clock, color: "text-amber-700 bg-amber-50" },
    { title: "Restricted products", value: "320", delta: "-18%", icon: Ban, color: "text-rose-700 bg-rose-50" },
    { title: "Brands onboarded", value: "1,050", delta: "+9%", icon: Building, color: "text-blue-700 bg-blue-50" },
  ];

  const domains = [
    { name: "Food & groceries", count: "12,460 products", color: "border-emerald-300 bg-emerald-50/40 text-emerald-950", href: "/admin/products?domain=food" },
    { name: "Beauty & Personal", count: "8,230 products", color: "border-pink-300 bg-pink-50/40 text-pink-950", href: "/admin/products?domain=beauty" },
    { name: "Electronics", count: "14,870 products", color: "border-blue-300 bg-blue-50/40 text-blue-950", href: "/admin/products?domain=electronics" },
    { name: "Fashion & Apparel", count: "12,760 products", color: "border-purple-300 bg-purple-50/40 text-purple-950", href: "/admin/products?domain=fashion" },
  ];

  return (
    <div className="space-y-6">
      {/* ── 1. Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Catalogue overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium">
            Manage products, brands and departmental coverage across HyperMart.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="flex h-11 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#0b4d2f] active:scale-[0.98] cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add product</span>
        </Link>
      </div>

      {/* ── 2. Top Metrics ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {kpi.title}
                </span>
                <span className={`grid h-7 w-7 place-items-center rounded-lg ${kpi.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-black text-neutral-900">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-emerald-600">{kpi.delta} vs last month</p>
            </div>
          );
        })}
      </div>

      {/* ── 3. Shop by Domain Cards ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">Explore by domain</h2>
          <Link href="/admin/products" className="text-xs font-bold text-emerald-700 hover:underline">
            View all domains →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {domains.map((dom) => (
            <Link
              key={dom.name}
              href={dom.href}
              className={`rounded-2xl border p-4 shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex items-center justify-between ${dom.color}`}
            >
              <div>
                <p className="font-display text-base font-extrabold">{dom.name}</p>
                <p className="text-xs opacity-75 font-medium mt-0.5">{dom.count}</p>
              </div>
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── 4. Two-Column Breakdown: Product Status Donut & Category Coverage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6">
        {/* Status Distribution */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-neutral-900">Product status breakdown</h3>
          <div className="space-y-3">
            {[
              { status: "Active in Storefront", pct: 78, count: "37,620", color: "bg-emerald-600" },
              { status: "Pending QA Approval", pct: 16, count: "7,680", color: "bg-amber-500" },
              { status: "Restricted / Suspended", pct: 4, count: "1,900", color: "bg-rose-500" },
              { status: "Draft", pct: 2, count: "1,120", color: "bg-neutral-300" },
            ].map((s) => (
              <div key={s.status} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-700">{s.status}</span>
                  <span className="font-bold text-neutral-900">
                    {s.count} ({s.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Coverage Grid */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
          <h3 className="font-display text-base font-bold text-neutral-900">Top category coverage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: "Fresh Produce", count: "6,430 items", domain: "Food" },
              { name: "Personal Care", count: "5,210 items", domain: "Beauty" },
              { name: "Women's Fashion", count: "6,120 items", domain: "Fashion" },
              { name: "Home Appliances", count: "4,870 items", domain: "Electronics" },
              { name: "Mobiles & Tech", count: "8,940 items", domain: "Electronics" },
              { name: "TVs & Audio", count: "5,320 items", domain: "Electronics" },
            ].map((c) => (
              <div key={c.name} className="rounded-xl border border-neutral-200/70 bg-neutral-50/60 p-3">
                <p className="text-xs font-bold text-neutral-900">{c.name}</p>
                <p className="text-[11px] text-neutral-500 font-medium">{c.count}</p>
                <span className="mt-1 inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                  {c.domain}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. Recent Catalogue Activity ── */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
        <h3 className="font-display text-base font-bold text-neutral-900">Recent catalogue updates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
                <th className="py-2.5">Time</th>
                <th className="py-2.5">Item</th>
                <th className="py-2.5">Type</th>
                <th className="py-2.5">Details</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { time: "2 hours ago", item: "HyperMart Organic Oats 1kg", type: "Product", details: "New product record published", status: "Active", by: "Priya N." },
                { time: "3 hours ago", item: "Zebronics ZB-450 Wireless", type: "Product", details: "Sent for compliance sign-off", status: "Pending", by: "Arjun K." },
                { time: "5 hours ago", item: "FreshFields Farm Direct", type: "Brand", details: "Wholesale agreement renewal", status: "Updated", by: "Meera S." },
                { time: "1 day ago", item: "Women's Summer Tops", type: "Category", details: "Category promotional launch", status: "Active", by: "Rohan M." },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50 transition">
                  <td className="py-3 text-neutral-400 font-medium">{row.time}</td>
                  <td className="py-3 font-bold text-neutral-900">{row.item}</td>
                  <td className="py-3 text-neutral-600">{row.type}</td>
                  <td className="py-3 text-neutral-500">{row.details}</td>
                  <td className="py-3">
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 font-semibold text-neutral-700">{row.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
