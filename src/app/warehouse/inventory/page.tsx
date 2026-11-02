"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Package,
  ShoppingCart,
  ShieldAlert,
  Truck,
  AlertTriangle,
  Building2,
  Calendar,
  ChevronDown,
  MapPin,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Map,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { useWarehouseStore } from "@/store/warehouseStore";
import { cn } from "@/lib/cn";

export default function InventoryDashboardPage() {
  const { activeFacility, switchFacility, availableFacilities } = useWarehouseStore();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <WarehouseManagerShell pageNumber={4} pageTitle="Inventory Dashboard">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, Facility Pill, Live Date ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Inventory Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Real-time stock overview, location-wise distribution and alerts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Facility Pill */}
            <div className="relative">
              <select
                value={activeFacility.id}
                onChange={(e) => switchFacility(e.target.value)}
                className="appearance-none text-xs font-bold text-gray-800 bg-white border border-[#E1E8E3] rounded-xl pl-8 pr-8 py-2 cursor-pointer shadow-2xs hover:border-[#CBD8D0] focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
              >
                {availableFacilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    WH-01 {f.name}
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white px-3 py-2 rounded-xl border border-[#E1E8E3] shadow-2xs">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Tue, 28 Oct 2026</span>
              <span className="text-gray-300">•</span>
              <span className="font-bold text-gray-900">10:24 AM</span>
            </div>
          </div>
        </div>

        {/* ── 2. Top 6 Metric KPI Cards (Matches Page 04) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* KPI 1: Total Items */}
          <div className="bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl border border-[#DCFCE7] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <Boxes className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">12,480</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">Total Items (Units)</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EAF7EF] flex items-center justify-between text-[11px] font-bold text-[#16A34A]">
              <span>↑ 8%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 12 C 15 15, 30 5, 48 3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 2: In Stock (Available) */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-white rounded-2xl border border-[#DBEAFE] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-2xs">
              <Package className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">2,320</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">In Stock (Available)</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EFF6FF] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
              <span>↑ 5%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 12 C 15 10, 30 14, 48 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 3: Reserved (Picking) */}
          <div className="bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl border border-[#FFEDD5] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shadow-2xs">
              <ShoppingCart className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">420</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">Reserved (Picking)</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FFF7ED] flex items-center justify-between text-[11px] font-bold text-[#EA580C]">
              <span>↑ 12%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 13 C 15 11, 30 14, 48 6" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 4: In Packing */}
          <div className="bg-gradient-to-br from-[#FAF5FF] to-white rounded-2xl border border-[#F3E8FF] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
              <Boxes className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">310</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">In Packing</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FAF5FF] flex items-center justify-between text-[11px] font-bold text-[#E11D48]">
              <span>↓ 3%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 6 C 15 8, 30 12, 48 13" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 5: Ready for Handover */}
          <div className="bg-gradient-to-br from-[#FFF1F2] to-white rounded-2xl border border-[#FFE4E6] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shadow-2xs">
              <Truck className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">566</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">Ready for Handover</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FFF1F2] flex items-center justify-between text-[11px] font-bold text-[#E11D48]">
              <span>↑ 18%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 13 C 15 15, 30 8, 48 4" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 6: Low Stock Items */}
          <div className="bg-gradient-to-br from-[#FEF2F2] to-white rounded-2xl border border-[#FEE2E2] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-red-600 flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">48</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1 truncate">Low Stock Items</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FEF2F2] flex items-center justify-between text-[11px] font-bold text-red-600">
              <span>↓ 22%</span>
              <svg className="w-12 h-3" viewBox="0 0 50 15" fill="none">
                <path d="M2 5 C 15 9, 30 13, 48 14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3. Middle Row: Category Bars (4 cols), Top 5 Locations (4 cols), Low Stock Alerts (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Stock by Category */}
          <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gray-900">Stock by Category</h3>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none text-xs font-semibold text-gray-600 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg pl-2.5 pr-6 py-1 cursor-pointer focus:outline-none"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Vertical Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { cat: "Grocery", val: 3450, max: 4000, color: "bg-[#10B981]" },
                { cat: "Fashion", val: 2280, max: 4000, color: "bg-[#3B82F6]" },
                { cat: "Electronics", val: 1920, max: 4000, color: "bg-[#F59E0B]" },
                { cat: "Beauty", val: 1480, max: 4000, color: "bg-[#8B5CF6]" },
                { cat: "Home", val: 980, max: 4000, color: "bg-[#EF4444]" },
                { cat: "Others", val: 370, max: 4000, color: "bg-gray-400" },
              ].map((b) => (
                <div key={b.cat} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-gray-700">{b.val.toLocaleString()}</span>
                  <div className="w-full bg-gray-100 rounded-t-lg h-36 flex items-end">
                    <div
                      className={cn("w-full rounded-t-lg transition-all duration-500", b.color)}
                      style={{ height: `${(b.val / b.max) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 truncate w-full text-center mt-1">
                    {b.cat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Stock by Location (Top 5) */}
          <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gray-900">Stock by Location (Top 5)</h3>
              <Link href="/warehouse/inventory/movements" className="text-xs font-bold text-[#087A4A] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3.5 text-xs">
              {[
                { loc: "A-01 (Receiving)", items: "2,840", util: 85, color: "bg-[#10B981]" },
                { loc: "B-02 (General)", items: "2,120", util: 68, color: "bg-[#10B981]" },
                { loc: "C-03 (Fast Moving)", items: "1,980", util: 62, color: "bg-[#10B981]" },
                { loc: "D-04 (Bulk)", items: "1,450", util: 48, color: "bg-[#10B981]" },
                { loc: "E-05 (Returns)", items: "980", util: 32, color: "bg-[#10B981]" },
              ].map((row) => (
                <div key={row.loc} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{row.loc}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{row.items}</span>
                      <span className="font-bold text-gray-800 w-8 text-right">{row.util}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", row.color)} style={{ width: `${row.util}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Low Stock Alerts */}
          <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm text-gray-900">Low Stock Alerts</h3>
              <Link href="/warehouse/inventory/adjustments" className="text-xs font-bold text-[#087A4A] hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2 text-center">Current</th>
                    <th className="pb-2 text-center">Threshold</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: "Men's Running Shoes", sku: "HM-SHOE-001", cur: 5, thr: 20 },
                    { name: "Face Wash 100ml", sku: "HM-BEA-002", cur: 8, thr: 25 },
                    { name: "Wireless Earbuds", sku: "HM-ELC-010", cur: 6, thr: 20 },
                    { name: "Backpack 30L", sku: "HM-BAG-003", cur: 4, thr: 15 },
                    { name: "Cooking Oil 1L", sku: "HM-GRO-021", cur: 10, thr: 30 },
                  ].map((p) => (
                    <tr key={p.sku} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 font-semibold text-gray-900 truncate max-w-[120px]">{p.name}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500">{p.sku}</td>
                      <td className="py-2.5 text-center font-bold text-red-600">{p.cur}</td>
                      <td className="py-2.5 text-center text-gray-500">{p.thr}</td>
                      <td className="py-2.5 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-600 border border-red-200">
                          Low
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 4. Third Row: Recent Stock Movements (6 cols), Inventory Aging Donut (3 cols), Zone Util (3 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Stock Movements Table (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Recent Stock Movements</h3>
              <Link href="/warehouse/inventory/movements" className="text-xs font-bold text-[#087A4A] hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Product</th>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2">From</th>
                    <th className="pb-2">To</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2">User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { time: "10:12 AM", type: "Inbound", prod: "Men's T-Shirt", sku: "HM-TSH-002", from: "Receiving", to: "B-02", qty: 120, user: "Arjun K", color: "bg-[#EAF7EF] text-[#087A4A]" },
                    { time: "09:48 AM", type: "Transfer", prod: "Backpack 30L", sku: "HM-BAG-003", from: "A-01", to: "C-03", qty: 50, user: "Priya S", color: "bg-blue-50 text-blue-600" },
                    { time: "09:25 AM", type: "Picked", prod: "Wireless Earbuds", sku: "HM-ELC-010", from: "B-02", to: "-", qty: 30, user: "Suresh R", color: "bg-amber-50 text-amber-700" },
                    { time: "08:50 AM", type: "Packed", prod: "Face Wash 100ml", sku: "HM-BEA-002", from: "-", to: "Packing", qty: 40, user: "Deepak V", color: "bg-purple-50 text-purple-700" },
                    { time: "08:15 AM", type: "Adjusted", prod: "Rice 5kg", sku: "HM-GRO-015", from: "D-04", to: "D-04", qty: 100, user: "Kavya N", color: "bg-gray-100 text-gray-700" },
                  ].map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 text-gray-500 font-mono text-[10px]">{m.time}</td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold", m.color)}>
                          {m.type}
                        </span>
                      </td>
                      <td className="py-2.5 font-semibold text-gray-900 truncate max-w-[100px]">{m.prod}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500">{m.sku}</td>
                      <td className="py-2.5 text-gray-600">{m.from}</td>
                      <td className="py-2.5 text-gray-600">{m.to}</td>
                      <td className="py-2.5 text-center font-bold text-gray-900">{m.qty}</td>
                      <td className="py-2.5 text-gray-600">{m.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Aging Donut (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <h3 className="font-display font-bold text-sm text-gray-900 mb-2">Inventory Aging</h3>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="12" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="107 131" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none" strokeDasharray="59.7 179.3" strokeDashoffset="-107" />
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="none" strokeDasharray="35.8 203.2" strokeDashoffset="-166.7" />
                  <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="12" fill="none" strokeDasharray="23.9 215.1" strokeDashoffset="-202.5" />
                  <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="11.9 227.1" strokeDashoffset="-226.4" />
                </svg>
                <div className="absolute text-center">
                  <span className="font-display font-black text-lg text-gray-900 leading-none">12,480</span>
                  <span className="text-[10px] text-gray-400 block">Items</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-[11px] mt-4">
                {[
                  { range: "0 - 30 days", pct: "45%", color: "bg-[#10B981]" },
                  { range: "31 - 60 days", pct: "25%", color: "bg-[#3B82F6]" },
                  { range: "61 - 90 days", pct: "15%", color: "bg-[#F59E0B]" },
                  { range: "91 - 180 days", pct: "10%", color: "bg-[#8B5CF6]" },
                  { range: "> 180 days", pct: "5%", color: "bg-[#EF4444]" },
                ].map((row) => (
                  <div key={row.range} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", row.color)} />
                      <span className="text-gray-600">{row.range}</span>
                    </div>
                    <span className="font-bold text-gray-900">{row.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Utilization by Zone (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-sm text-gray-900">Utilization by Zone</h3>
              <Link
                href="/warehouse/inventory/movements"
                className="px-2 py-1 rounded-lg bg-[#EAF7EF] text-[#087A4A] text-[10px] font-bold flex items-center gap-1 hover:bg-[#087A4A] hover:text-white transition"
              >
                <Map className="w-3 h-3" />
                <span>Warehouse Map</span>
              </Link>
            </div>

            <div className="space-y-3.5 text-xs py-2">
              {[
                { zone: "Receiving Zone", util: 85, color: "bg-[#10B981]" },
                { zone: "Storage Zone", util: 68, color: "bg-[#10B981]" },
                { zone: "Picking Zone", util: 72, color: "bg-[#10B981]" },
                { zone: "Packing Zone", util: 56, color: "bg-[#F59E0B]" },
                { zone: "Dispatch Zone", util: 40, color: "bg-[#EF4444]" },
              ].map((row) => (
                <div key={row.zone} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{row.zone}</span>
                    <span className="font-bold text-gray-900">{row.util}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", row.color)} style={{ width: `${row.util}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 5. Fourth Row: Top Moving Products (6 cols) + Stock Forecast Next 7 Days (6 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Moving Products */}
          <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Top Moving Products</h3>
              <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-2 w-6">#</th>
                    <th className="pb-2">Product</th>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2 text-right">Units Moved</th>
                    <th className="pb-2 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { num: 1, name: "Rice 5kg", sku: "HM-GRO-015", cat: "Grocery", units: "1,240", color: "#10B981" },
                    { num: 2, name: "Men's Running Shoes", sku: "HM-SHOE-001", cat: "Fashion", units: "980", color: "#3B82F6" },
                    { num: 3, name: "Wireless Earbuds", sku: "HM-ELC-010", cat: "Electronics", units: "820", color: "#F59E0B" },
                    { num: 4, name: "Face Wash 100ml", sku: "HM-BEA-002", cat: "Beauty", units: "760", color: "#8B5CF6" },
                    { num: 5, name: "Backpack 30L", sku: "HM-BAG-003", cat: "Bags & Luggage", units: "650", color: "#EF4444" },
                  ].map((p) => (
                    <tr key={p.num} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 font-semibold text-gray-500">{p.num}</td>
                      <td className="py-2.5 font-semibold text-gray-900">{p.name}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500">{p.sku}</td>
                      <td className="py-2.5 text-gray-600">{p.cat}</td>
                      <td className="py-2.5 text-right font-bold text-gray-900">{p.units}</td>
                      <td className="py-2.5 text-right">
                        <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 15" fill="none">
                          <path d="M2 12 C 15 14, 30 6, 58 3" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Forecast (Next 7 Days) */}
          <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Stock Forecast (Next 7 Days)</h3>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Inbound</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                  <span>Outbound</span>
                </span>
                <button className="font-bold text-[#087A4A] hover:underline">View All</button>
              </div>
            </div>

            {/* Line chart visualization */}
            <div className="h-44 pt-4 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                {/* Horizontal gridlines */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />

                {/* Inbound Line (Green) */}
                <path
                  d="M 10 90 Q 90 60, 170 75 T 330 50 T 490 30"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="90" r="3" fill="#10B981" />
                <circle cx="90" cy="65" r="3" fill="#10B981" />
                <circle cx="170" cy="75" r="3" fill="#10B981" />
                <circle cx="250" cy="80" r="3" fill="#10B981" />
                <circle cx="330" cy="50" r="3" fill="#10B981" />
                <circle cx="410" cy="40" r="3" fill="#10B981" />
                <circle cx="490" cy="30" r="3" fill="#10B981" />

                {/* Outbound Line (Blue) */}
                <path
                  d="M 10 110 Q 90 40, 170 85 T 330 70 T 490 85"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="110" r="3" fill="#3B82F6" />
                <circle cx="90" cy="40" r="3" fill="#3B82F6" />
                <circle cx="170" cy="85" r="3" fill="#3B82F6" />
                <circle cx="250" cy="65" r="3" fill="#3B82F6" />
                <circle cx="330" cy="70" r="3" fill="#3B82F6" />
                <circle cx="410" cy="55" r="3" fill="#3B82F6" />
                <circle cx="490" cy="85" r="3" fill="#3B82F6" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 font-mono">
                <span>28 Oct</span>
                <span>29 Oct</span>
                <span>30 Oct</span>
                <span>31 Oct</span>
                <span>01 Nov</span>
                <span>02 Nov</span>
                <span>03 Nov</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
