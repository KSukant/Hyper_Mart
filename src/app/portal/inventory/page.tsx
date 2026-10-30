"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Lock,
  Package,
  AlertTriangle,
  Ban,
  Download,
  Filter,
  Search,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function InventoryOverviewPage() {
  const { activeFacility, setActiveFacility } = useAdminStore();
  const [domainFilter, setDomainFilter] = useState("all");
  const [search, setSearch] = useState("");

  const stockRows = [
    { sku: "HMFG00123", name: "Sunlite Refined Sunflower Oil 1L", brand: "HyperMart", domain: "Grocery", warehouse: "Coimbatore DC", saleable: 1240, reserved: 120, packed: 80, damaged: 12, held: 30, total: 1482, status: "Healthy" },
    { sku: "FFRC04567", name: "FreshFields Basmati Rice 5kg", brand: "FreshFields", domain: "Grocery", warehouse: "Coimbatore DC", saleable: 980, reserved: 60, packed: 40, damaged: 5, held: 20, total: 1105, status: "Healthy" },
    { sku: "DGDN77812", name: "DailyGood Detergent Powder 2kg", brand: "DailyGood", domain: "FMCG", warehouse: "Chennai FC", saleable: 2120, reserved: 320, packed: 140, damaged: 28, held: 60, total: 2668, status: "Watch" },
    { sku: "HNWK33190", name: "HomeNest Stainless Steel Kadai 24cm", brand: "HomeNest", domain: "Home & Living", warehouse: "Chennai FC", saleable: 640, reserved: 50, packed: 30, damaged: 8, held: 12, total: 740, status: "Healthy" },
    { sku: "TPHT99210", name: "TechPro 32W LED Monitor", brand: "TechPro", domain: "Electronics", warehouse: "Coimbatore DC", saleable: 420, reserved: 90, packed: 60, damaged: 14, held: 40, total: 624, status: "At risk" },
  ];

  const filteredRows = stockRows.filter((r) => {
    if (activeFacility !== "All Facilities" && r.warehouse !== activeFacility) return false;
    if (domainFilter !== "all" && r.domain !== domainFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Supply Chain & Storage
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Inventory overview
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Live view of stock across warehouses, domains and brands.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={activeFacility}
            onChange={(e) => setActiveFacility(e.target.value as any)}
            className="h-10 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-bold text-neutral-700 shadow-2xs"
          >
            <option>Coimbatore DC</option>
            <option>Chennai FC</option>
            <option>All Facilities</option>
          </select>

          <Link
            href="/portal/inventory/ledger"
            className="flex h-10 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer"
          >
            <span>Stock Ledger</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── 2. Five Stock State Cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:gap-4">
        {[
          { title: "Saleable stock", value: "1,24,320", delta: "+6% vs last week", icon: Boxes, color: "text-emerald-700 bg-emerald-50" },
          { title: "Reserved stock", value: "18,642", delta: "+3% vs last week", icon: Lock, color: "text-blue-700 bg-blue-50" },
          { title: "Packed stock", value: "12,580", delta: "+12% vs last week", icon: Package, color: "text-purple-700 bg-purple-50" },
          { title: "Damaged stock", value: "1,230", delta: "-18% vs last week", icon: AlertTriangle, color: "text-rose-700 bg-rose-50" },
          { title: "Held stock", value: "3,862", delta: "-5% vs last week", icon: Ban, color: "text-amber-700 bg-amber-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {s.title}
                </span>
                <span className={cn("grid h-7 w-7 place-items-center rounded-lg", s.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-black text-neutral-900">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-semibold text-neutral-500">{s.delta}</p>
            </div>
          );
        })}
      </div>

      {/* ── 3. Distribution Charts & Health Gauge ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock by Domain */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Stock by domain</h3>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">1,60,634 units</span>
          </div>
          <div className="space-y-2">
            {[
              { d: "Grocery & Fresh", pct: 42 },
              { d: "FMCG Staples", pct: 24 },
              { d: "Fashion & Apparel", pct: 12 },
              { d: "Home & Living", pct: 10 },
              { d: "Electronics", pct: 8 },
              { d: "General", pct: 4 },
            ].map((d) => (
              <div key={d.d} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-700">{d.d}</span>
                  <span className="font-bold text-neutral-900">{d.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-700" style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock by Brand */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900">Stock by brand</h3>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Top brands</span>
          </div>
          <div className="space-y-2">
            {[
              { b: "HyperMart Brand", val: "28,420" },
              { b: "FreshFields", val: "18,230" },
              { b: "DailyGood", val: "16,480" },
              { b: "HomeNest", val: "12,390" },
              { b: "TechPro", val: "8,560" },
            ].map((b) => (
              <div key={b.b} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 border border-neutral-100 text-xs">
                <span className="font-semibold text-neutral-800">{b.b}</span>
                <span className="font-mono font-bold text-neutral-900">{b.val} units</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Health Gauge */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-neutral-900">Inventory health</h3>
            <p className="text-[11px] text-neutral-500">Overall risk assessment across storage locations</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2 font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Healthy (76%)
              </span>
              <span className="font-mono text-neutral-600 font-semibold">1,22,084 units</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2 font-bold text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Watch (16%)
              </span>
              <span className="font-mono text-neutral-600 font-semibold">25,047 units</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2 font-bold text-rose-800">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                At risk (8%)
              </span>
              <span className="font-mono text-neutral-600 font-semibold">13,503 units</span>
            </div>
          </div>

          <div className="h-2.5 w-full rounded-full bg-neutral-200 flex overflow-hidden">
            <div className="bg-emerald-600 h-full" style={{ width: "76%" }} />
            <div className="bg-amber-500 h-full" style={{ width: "16%" }} />
            <div className="bg-rose-500 h-full" style={{ width: "8%" }} />
          </div>
        </div>
      </div>

      {/* ── 4. Stock Details Table ── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-base font-bold text-neutral-900">Stock details</h2>
            <p className="text-xs text-neutral-500">Real-time SKU quantities by storage state.</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SKU or name..."
              className="h-9 w-60 rounded-xl border border-neutral-200 px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-emerald-700"
            />
            <button
              onClick={() => toast("Exported inventory details report to CSV.")}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-bold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 text-neutral-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-2">SKU</th>
                <th className="py-2.5 px-2">Product Name</th>
                <th className="py-2.5 px-2">Brand</th>
                <th className="py-2.5 px-2">Warehouse</th>
                <th className="py-2.5 px-2 text-right">Saleable</th>
                <th className="py-2.5 px-2 text-right">Reserved</th>
                <th className="py-2.5 px-2 text-right">Packed</th>
                <th className="py-2.5 px-2 text-right">Damaged</th>
                <th className="py-2.5 px-2 text-right">Held</th>
                <th className="py-2.5 px-2 text-right">Total</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredRows.map((r) => (
                <tr key={r.sku} className="hover:bg-neutral-50 transition">
                  <td className="py-3 px-2 font-mono font-bold text-neutral-700">{r.sku}</td>
                  <td className="py-3 px-2 font-bold text-neutral-900">{r.name}</td>
                  <td className="py-3 px-2 text-neutral-600">{r.brand}</td>
                  <td className="py-3 px-2 font-medium text-emerald-800">{r.warehouse}</td>
                  <td className="py-3 px-2 text-right font-bold text-emerald-700">{r.saleable}</td>
                  <td className="py-3 px-2 text-right text-neutral-600">{r.reserved}</td>
                  <td className="py-3 px-2 text-right text-neutral-600">{r.packed}</td>
                  <td className="py-3 px-2 text-right text-rose-600">{r.damaged}</td>
                  <td className="py-3 px-2 text-right text-amber-600">{r.held}</td>
                  <td className="py-3 px-2 text-right font-black text-neutral-900">{r.total}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                        r.status === "Healthy" && "bg-emerald-50 text-emerald-800 border-emerald-200",
                        r.status === "Watch" && "bg-amber-50 text-amber-800 border-amber-200",
                        r.status === "At risk" && "bg-rose-50 text-rose-800 border-rose-200"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
