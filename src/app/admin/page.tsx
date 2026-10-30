"use client";

import Link from "next/link";
import {
  FolderKanban,
  Package,
  CheckSquare,
  Building2,
  Percent,
  Users,
  ShieldCheck,
  Settings,
  BarChart3,
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Sparkles,
  ExternalLink,
  Plus,
  BookOpen,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/cn";

export default function AdminBusinessDashboardPage() {
  const { currentUser } = useAdminStore();

  const businessKpis = [
    {
      title: "Active Catalog SKUs",
      value: "2,840",
      delta: "+140 this month",
      positive: true,
      icon: Package,
      color: "text-emerald-700 bg-emerald-50",
      href: "/admin/products",
    },
    {
      title: "Pending QA Approvals",
      value: "12",
      delta: "4 require FSSAI check",
      positive: false,
      icon: CheckSquare,
      color: "text-amber-700 bg-amber-50",
      href: "/admin/approvals",
    },
    {
      title: "Brand Agreements",
      value: "48",
      delta: "3 renewals due",
      positive: true,
      icon: Building2,
      color: "text-blue-700 bg-blue-50",
      href: "/admin/brands",
    },
    {
      title: "Active Promotions",
      value: "09",
      delta: "2 flash sales live",
      positive: true,
      icon: Percent,
      color: "text-purple-700 bg-purple-50",
      href: "/admin/promotions",
    },
    {
      title: "Authorized Operators",
      value: "34",
      delta: "100% 2FA compliant",
      positive: true,
      icon: Users,
      color: "text-indigo-700 bg-indigo-50",
      href: "/admin/users",
    },
    {
      title: "System Audit Events",
      value: "142",
      delta: "Recorded today",
      positive: true,
      icon: ShieldCheck,
      color: "text-teal-700 bg-teal-50",
      href: "/admin/audit",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header: Title & Quick Actions ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Business Governance</span>
            <span>•</span>
            <span>Platform Configuration</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">
            Admin Business Hub
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Master configuration, catalog merchandising, policy rules, and organizational control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span>Create Product</span>
          </Link>
          <Link
            href="/admin/approvals"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E1] text-xs font-bold text-neutral-800 hover:bg-neutral-50 shadow-xs transition"
          >
            <span>Review Approvals (12)</span>
          </Link>
        </div>
      </div>

      {/* ── 2. Top Metric Cards Grid ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {businessKpis.map((kpi) => {
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
              <div className="mt-1 text-[11px] font-semibold text-neutral-500">
                <span>{kpi.delta}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── 3. Central Two-Column Grid: Catalogue Portfolio & Business Policies ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left: Catalogue Health & Department Portfolio */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-neutral-900">
                  Catalogue & Merchandising Health
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live in Storefront
                </span>
              </div>
              <p className="text-xs text-neutral-500">Master product assortment and commercial margins by department</p>
            </div>
            <Link
              href="/admin/catalogue"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Portfolio View</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                dept: "Grocery & Gourmet Food",
                skus: 1240,
                margin: "24.5%",
                compliance: "100% FSSAI",
                color: "border-emerald-200 bg-emerald-50/40",
              },
              {
                dept: "Beauty & Personal Care",
                skus: 580,
                margin: "42.0%",
                compliance: "100% Safety Cleared",
                color: "border-pink-200 bg-pink-50/30",
              },
              {
                dept: "Electronics & Appliances",
                skus: 420,
                margin: "18.2%",
                compliance: "BIS & CE Certified",
                color: "border-blue-200 bg-blue-50/30",
              },
              {
                dept: "Fashion & Lifestyle",
                skus: 600,
                margin: "48.5%",
                compliance: "Seasonal Active",
                color: "border-amber-200 bg-amber-50/30",
              },
            ].map((d) => (
              <div key={d.dept} className={cn("p-4 rounded-xl border space-y-2", d.color)}>
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-neutral-900">{d.dept}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-800">{d.margin} avg margin</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600 pt-1 border-t border-black/5">
                  <span>{d.skus.toLocaleString()} Active SKUs</span>
                  <span className="text-[10px] font-semibold text-emerald-700">{d.compliance}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-neutral-900">Merchandising Quality Assurance</span>
              <p className="text-[11px] text-neutral-500">12 new SKU submissions awaiting photo and price verification before publish.</p>
            </div>
            <Link
              href="/admin/approvals"
              className="px-3 py-1.5 rounded-lg bg-[#07563B] text-white text-xs font-bold hover:bg-[#06452F] transition flex-shrink-0"
            >
              Review Queue
            </Link>
          </div>
        </div>

        {/* Right: Business Rules & Operational Safeguards */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-700" />
              <span>Active Business Rules</span>
            </h2>
            <Link href="/admin/settings" className="text-xs font-bold text-emerald-700 hover:underline">
              Configure
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 block">Free Delivery Basket Threshold</span>
                <span className="text-[11px] text-neutral-500">Orders above ₹499 qualify for zero delivery fee.</span>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-800">₹499</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 block">Auto-Refund Policy Window</span>
                <span className="text-[11px] text-neutral-500">Instant doorstep claim authorization limit.</span>
              </div>
              <span className="font-mono font-bold text-sm text-neutral-800">5 Days</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 block">Tiered Refund Matrix</span>
                <span className="text-[11px] text-neutral-500">Tier 1 (&lt;₹500), Tier 2 (₹500-₹2k), Tier 3 (&gt;₹2k).</span>
              </div>
              <span className="font-bold text-[11px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">Enforced</span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 block">Staff 2FA Security</span>
                <span className="text-[11px] text-neutral-500">Mandatory biometric / TOTP token at login.</span>
              </div>
              <span className="font-bold text-[11px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">Required</span>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <Link
              href="/admin/users"
              className="flex items-center justify-between text-xs font-bold text-neutral-700 hover:text-emerald-800 transition py-1"
            >
              <span>Manage Role Permissions (RBAC)</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. Bottom Grid: Administrative Audit & Quick Navigation ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Admin Audit Activity */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Recent Admin Actions</h3>
            <Link href="/admin/audit" className="text-[10px] text-emerald-700 font-bold uppercase hover:underline">
              Full Log
            </Link>
          </div>
          <div className="divide-y divide-neutral-100 text-xs space-y-2">
            {[
              {
                user: "Dev K. (Super Admin)",
                action: "Approved High-Value Refund (RF-88321)",
                time: "10 mins ago",
              },
              {
                user: "Priya N. (Catalogue)",
                action: "Published 4 new SKUs in Organic Grocery",
                time: "32 mins ago",
              },
              {
                user: "Dev K. (Super Admin)",
                action: "Updated Free Delivery threshold to ₹499",
                time: "2 hours ago",
              },
            ].map((a, i) => (
              <div key={i} className="pt-2 flex justify-between items-start">
                <div>
                  <p className="font-bold text-neutral-900 leading-snug">{a.action}</p>
                  <p className="text-[10px] text-neutral-400">{a.user}</p>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Reporting Snapshot */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Commercial Performance</h3>
            <Link href="/admin/reports" className="text-[10px] text-emerald-700 font-bold uppercase hover:underline">
              BI Analytics
            </Link>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Net Revenue Today", value: "₹4,12,800", delta: "+14.2% YoY" },
              { label: "Gross Margin Rate", value: "31.8%", delta: "+1.2% vs target" },
              { label: "Customer Return Rate", value: "2.4%", delta: "-0.6% vs avg" },
            ].map((m) => (
              <div key={m.label} className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-neutral-500 block text-[11px]">{m.label}</span>
                  <span className="font-bold text-neutral-900 text-sm font-mono">{m.value}</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700">{m.delta}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Governance Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#073922] to-[#0A4F30] p-6 text-white shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-accent">
              <Sparkles className="h-3 w-3" />
              <span>Platform Control</span>
            </span>
            <h3 className="font-display text-xl font-bold leading-tight">
              HyperMart Governance & Configuration
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed pt-1">
              Business rules, brand terms, and permissions defined here govern both consumer storefront and operations execution.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-emerald-200/70">Audit Security</span>
            <span className="font-bold text-accent">SOC-2 & ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
