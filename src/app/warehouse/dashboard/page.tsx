"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Package,
  Boxes,
  ShieldCheck,
  Truck,
  Building2,
  Calendar,
  Plus,
  ChevronDown,
  ChevronRight,
  Clock,
  Thermometer,
  ShieldAlert,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { useWarehouseStore } from "@/store/warehouseStore";
import { cn } from "@/lib/cn";

export default function WarehouseDashboardPage() {
  const { activeFacility, switchFacility, availableFacilities } = useWarehouseStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState("Today");

  return (
    <WarehouseManagerShell pageNumber={2} pageTitle="Warehouse Dashboard">
      <div className="space-y-6">
        {/* ── 1. Top Header Row: Warehouse Dashboard, Facility Selector, Live Timestamp ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Warehouse Dashboard
            </h1>

            {/* Facility Selector Pill */}
            <div className="relative">
              <select
                value={activeFacility.id}
                onChange={(e) => switchFacility(e.target.value)}
                className="appearance-none text-xs font-bold text-gray-800 bg-white border border-[#E1E8E3] rounded-xl pl-8 pr-8 py-2 cursor-pointer shadow-2xs hover:border-[#CBD8D0] focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
              >
                {availableFacilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.code} {f.name}
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Date & Time Timestamp (Matches Reference) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white px-3 py-2 rounded-xl border border-[#E1E8E3] shadow-2xs self-start sm:self-auto">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Tue, 28 Oct 2026</span>
            <span className="text-gray-300">•</span>
            <span className="font-bold text-gray-900">10:24 AM</span>
          </div>
        </div>

        {/* ── 2. Greeting & Create Picking Wave Button Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#17231E]">
              Good Morning, Manoj Kumar
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Here's what's happening at your warehouse today.
            </p>
          </div>

          <Link
            href="/warehouse/picking/queue"
            className="px-4 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Picking Wave</span>
          </Link>
        </div>

        {/* ── 3. Row of 5 KPI Cards with Sparklines (Exact 1:1 to Page 02) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 1: Total Orders */}
          <div className="bg-gradient-to-br from-[#F0FDF4] via-white to-white rounded-2xl border border-[#DCFCE7] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
                <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 tracking-tight leading-none">
                1,248
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Total Orders</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#EAF7EF] flex items-center justify-between">
              <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
                <span>↑ 12%</span>
              </span>
              <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
                <path
                  d="M2 15 C 20 18, 40 8, 60 12 C 70 14, 75 4, 78 4"
                  stroke="#16A34A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* KPI 2: Picking in Progress */}
          <div className="bg-gradient-to-br from-[#EFF6FF] via-white to-white rounded-2xl border border-[#DBEAFE] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-2xs">
                <Package className="w-5 h-5 stroke-[2.2]" />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 tracking-tight leading-none">
                842
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Picking in Progress</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#EFF6FF] flex items-center justify-between">
              <span className="text-xs font-bold text-[#2563EB] flex items-center gap-1">
                <span>↑ 8%</span>
              </span>
              <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
                <path
                  d="M2 16 C 20 14, 40 18, 55 10 C 65 6, 72 8, 78 5"
                  stroke="#2563EB"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* KPI 3: Packing in Progress */}
          <div className="bg-gradient-to-br from-[#FFF7ED] via-white to-white rounded-2xl border border-[#FFEDD5] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shadow-2xs">
                <Boxes className="w-5 h-5 stroke-[2.2]" />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 tracking-tight leading-none">
                620
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Packing in Progress</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#FFF7ED] flex items-center justify-between">
              <span className="text-xs font-bold text-[#EA580C] flex items-center gap-1">
                <span>↑ 5%</span>
              </span>
              <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
                <path
                  d="M2 14 C 20 12, 35 17, 50 14 C 65 11, 72 13, 78 7"
                  stroke="#EA580C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* KPI 4: Quality Check */}
          <div className="bg-gradient-to-br from-[#FAF5FF] via-white to-white rounded-2xl border border-[#F3E8FF] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 tracking-tight leading-none">
                310
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Quality Check</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#FAF5FF] flex items-center justify-between">
              <span className="text-xs font-bold text-[#E11D48] flex items-center gap-1">
                <span>↓ 3%</span>
              </span>
              <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
                <path
                  d="M2 8 C 20 6, 35 12, 50 10 C 65 9, 72 15, 78 16"
                  stroke="#9333EA"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* KPI 5: Ready for Handover */}
          <div className="bg-gradient-to-br from-[#FFF1F2] via-white to-white rounded-2xl border border-[#FFE4E6] p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shadow-2xs">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </span>
            </div>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 tracking-tight leading-none">
                566
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">Ready for Handover</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#FFF1F2] flex items-center justify-between">
              <span className="text-xs font-bold text-[#E11D48] flex items-center gap-1">
                <span>↑ 18%</span>
              </span>
              <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
                <path
                  d="M2 16 C 18 18, 32 10, 52 14 C 65 16, 72 8, 78 4"
                  stroke="#E11D48"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── 4. Middle Row: Order Status Overview (Donut) + Urgent Alerts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Order Status Overview Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E1E8E3] p-6 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-gray-900">
                Order Status Overview
              </h3>
              <div className="relative">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="appearance-none text-xs font-semibold text-gray-600 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg pl-3 pr-7 py-1.5 cursor-pointer focus:outline-none"
                >
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              {/* Donut Chart with Center Total */}
              <div className="relative flex items-center justify-center">
                <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="14" fill="none" />
                  {/* Picked: 35% -> strokeDasharray="83.5 155.5" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10B981"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="83.5 155.5"
                    strokeDashoffset="0"
                  />
                  {/* Packed: 25% -> strokeDasharray="59.7 179.3" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="59.7 179.3"
                    strokeDashoffset="-83.5"
                  />
                  {/* Quality Check: 12% -> strokeDasharray="28.6 210.4" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="28.6 210.4"
                    strokeDashoffset="-143.2"
                  />
                  {/* Ready for Handover: 18% -> strokeDasharray="43 196" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#FB7185"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="43 196"
                    strokeDashoffset="-171.8"
                  />
                  {/* Exceptions: 6% -> strokeDasharray="14.3 224.7" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#EF4444"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="14.3 224.7"
                    strokeDashoffset="-214.8"
                  />
                  {/* Returns: 4% -> strokeDasharray="9.5 229.5" */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#8B5CF6"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="9.5 229.5"
                    strokeDashoffset="-229.1"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-display font-black text-2xl text-gray-900 leading-none">
                    1,248
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium mt-0.5">Orders</span>
                </div>
              </div>

              {/* Status Breakdown Legend List */}
              <div className="space-y-2.5 text-xs w-full sm:w-56">
                {[
                  { label: "Picked", pct: "35%", count: 437, color: "bg-[#10B981]" },
                  { label: "Packed", pct: "25%", count: 312, color: "bg-[#3B82F6]" },
                  { label: "Quality Check", pct: "12%", count: 150, color: "bg-[#F59E0B]" },
                  { label: "Ready for Handover", pct: "18%", count: 224, color: "bg-[#FB7185]" },
                  { label: "Exceptions", pct: "6%", count: 75, color: "bg-[#EF4444]" },
                  { label: "Returns", pct: "4%", count: 50, color: "bg-[#8B5CF6]" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-gray-700 font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900 w-10 text-right">{item.pct}</span>
                      <span className="text-gray-500 w-10 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Urgent Alerts Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E3] p-6 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-gray-900">
                  Urgent Alerts
                </h3>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-black flex items-center justify-center">
                  4
                </span>
              </div>
              <Link
                href="/warehouse/exceptions"
                className="text-xs font-bold text-[#087A4A] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {/* Alert 1 */}
              <Link
                href="/warehouse/exceptions/open"
                className="flex items-center justify-between p-3 rounded-xl border border-red-100 bg-[#FFF5F5] hover:border-red-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-red-700 transition">
                    25 orders at SLA risk
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition" />
              </Link>

              {/* Alert 2 */}
              <Link
                href="/warehouse/packing/queue"
                className="flex items-center justify-between p-3 rounded-xl border border-amber-100 bg-[#FFFBEB] hover:border-amber-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-amber-800 transition">
                    Cold-chain items pending packing
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-700 transition" />
              </Link>

              {/* Alert 3 */}
              <Link
                href="/warehouse/quality/rejected"
                className="flex items-center justify-between p-3 rounded-xl border border-orange-100 bg-[#FFF7ED] hover:border-orange-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-orange-700 transition">
                    12 quality failures require review
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition" />
              </Link>

              {/* Alert 4 */}
              <Link
                href="/warehouse/courier"
                className="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-[#EFF6FF] hover:border-blue-300 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-blue-700 transition">
                    Courier ABC arriving in 45 mins
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── 5. Bottom Row: Active Picking Waves Table + Team Activity Table ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Picking Waves Table (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E1E8E3] p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-base text-gray-900">
                  Active Picking Waves
                </h3>
                <Link
                  href="/warehouse/picking/queue"
                  className="text-xs font-bold text-[#087A4A] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px]">
                      <th className="pb-3 font-semibold">Wave ID</th>
                      <th className="pb-3 font-semibold">Orders</th>
                      <th className="pb-3 font-semibold">Type</th>
                      <th className="pb-3 font-semibold">Priority</th>
                      <th className="pb-3 font-semibold">Progress</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { id: "W-1028", orders: 120, type: "Standard", priority: "High", priorityColor: "bg-red-50 text-red-600 border border-red-200", progress: 75, status: "In Progress", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                      { id: "W-1027", orders: 80, type: "Express", priority: "High", priorityColor: "bg-red-50 text-red-600 border border-red-200", progress: 60, status: "In Progress", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                      { id: "W-1026", orders: 65, type: "Standard", priority: "Normal", priorityColor: "bg-amber-50 text-amber-700 border border-amber-200", progress: 30, status: "In Progress", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                      { id: "W-1025", orders: 40, type: "Cold Chain", priority: "High", priorityColor: "bg-red-50 text-red-600 border border-red-200", progress: 90, status: "Almost Done", statusColor: "bg-blue-50 text-blue-600 border border-blue-200" },
                    ].map((wave) => (
                      <tr key={wave.id} className="hover:bg-gray-50/80 transition">
                        <td className="py-3 font-semibold text-gray-900">{wave.id}</td>
                        <td className="py-3 text-gray-600">{wave.orders}</td>
                        <td className="py-3 text-gray-600">{wave.type}</td>
                        <td className="py-3">
                          <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold", wave.priorityColor)}>
                            {wave.priority}
                          </span>
                        </td>
                        <td className="py-3 w-36">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#087A4A] h-full rounded-full"
                                style={{ width: `${wave.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-semibold text-gray-500 w-8">
                              {wave.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold", wave.statusColor)}>
                            {wave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Team Activity Table (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E3] p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-base text-gray-900">
                  Team Activity
                </h3>
                <Link
                  href="/warehouse/reports/performance"
                  className="text-xs font-bold text-[#087A4A] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px]">
                      <th className="pb-3 font-semibold">Employee</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Tasks</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: "Arjun Kumar", role: "Picker", tasks: "12 / 15", initial: "AK", color: "bg-emerald-600" },
                      { name: "Priya Sharma", role: "Packer", tasks: "8 / 10", initial: "PS", color: "bg-blue-600" },
                      { name: "Suresh R", role: "Quality Checker", tasks: "6 / 8", initial: "SR", color: "bg-purple-600" },
                      { name: "Deepak V", role: "Inventory Officer", tasks: "4 / 6", initial: "DV", color: "bg-amber-600" },
                    ].map((emp) => (
                      <tr key={emp.name} className="hover:bg-gray-50/80 transition">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={cn("w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 shadow-2xs", emp.color)}>
                              {emp.initial}
                            </div>
                            <span className="font-semibold text-gray-900">{emp.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600">{emp.role}</td>
                        <td className="py-3 font-semibold text-gray-700">{emp.tasks}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7EF] text-[#087A4A]">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
