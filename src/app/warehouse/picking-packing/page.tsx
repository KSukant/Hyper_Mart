"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Boxes,
  ShieldCheck,
  Truck,
  Plus,
  Search,
  ChevronDown,
  Calendar,
  Filter,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Package,
  Users,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { cn } from "@/lib/cn";

export default function PickingPackingMonitorPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <WarehouseManagerShell pageNumber={6} pageTitle="Picking & Packing Monitor">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, Subtitle, Create Wave Button ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Picking & Packing Monitor
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Track real-time picking and packing progress across all orders and stations.
            </p>
          </div>

          <Link
            href="/warehouse/picking/queue"
            className="px-4 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Picking Wave</span>
          </Link>
        </div>

        {/* ── 2. Top Metrics Row: 4 Metric Cards + Order Progress Donut (Page 06) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
          {/* Card 1: Active Picking Orders */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl border border-[#DCFCE7] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <ShoppingCart className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">320</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Active Picking Orders</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EAF7EF] flex items-center justify-between text-[11px] font-bold text-[#16A34A]">
              <span>↑ 12%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 15, 30 5, 58 3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: In Packing */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#EFF6FF] to-white rounded-2xl border border-[#DBEAFE] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-2xs">
              <Package className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">180</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">In Packing</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EFF6FF] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
              <span>↑ 8%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 12 C 15 10, 30 14, 58 5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Quality Check */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl border border-[#FFEDD5] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shadow-2xs">
              <Boxes className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">45</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Quality Check</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FFF7ED] flex items-center justify-between text-[11px] font-bold text-[#EA580C]">
              <span>↑ 5%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 12, 30 15, 58 7" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Ready for Handover */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FAF5FF] to-white rounded-2xl border border-[#F3E8FF] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">25</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Ready for Handover</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FAF5FF] flex items-center justify-between text-[11px] font-bold text-[#E11D48]">
              <span>↓ 18%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 6 C 15 8, 30 13, 58 13" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 5: Order Progress (Today) Donut Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] p-4 shadow-2xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs text-gray-900">Order Progress (Today)</h4>
              <div className="relative flex items-center justify-center w-28 h-28 my-1">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="14" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="133.7 105" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="76.4 162.3" strokeDashoffset="-133.7" />
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="19.1 219.6" strokeDashoffset="-210.1" />
                  <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="14" fill="none" strokeDasharray="9.5 229.2" strokeDashoffset="-229.2" />
                </svg>
                <div className="absolute text-center">
                  <span className="font-display font-black text-sm text-gray-900 leading-none">570</span>
                  <span className="text-[9px] text-gray-400 block">Total Orders</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px] flex-1">
              {[
                { label: "Picked", val: "320 (56%)", color: "bg-[#10B981]" },
                { label: "Packed", val: "180 (32%)", color: "bg-[#3B82F6]" },
                { label: "Quality Check", val: "45 (8%)", color: "bg-[#F59E0B]" },
                { label: "Ready", val: "25 (6%)", color: "bg-[#8B5CF6]" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-2 h-2 rounded-full", s.color)} />
                    <span className="text-gray-600">{s.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Filter Category Pills (Exact to Page 06) ── */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {[
            { id: "all", label: "All Orders (320)" },
            { id: "pick", label: "Picking (320)" },
            { id: "pack", label: "Packing (180)" },
            { id: "qc", label: "Quality Check (45)" },
            { id: "handover", label: "Handover Ready (25)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl transition",
                activeTab === tab.id
                  ? "bg-[#087A4A] text-white shadow-xs font-bold"
                  : "bg-white border border-[#E1E8E3] text-gray-600 hover:text-black"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── 4. Main Workspace: Table (8 cols) + Right Analytics Column (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Table Section (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            {/* Filter controls row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-gray-100 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
                  <option>Priority</option>
                  <option>High</option>
                  <option>Normal</option>
                </select>

                <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
                  <option>Order Type</option>
                  <option>Standard</option>
                  <option>Express</option>
                </select>

                <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
                  <option>Category</option>
                  <option>Grocery</option>
                  <option>Fashion</option>
                </select>

                <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
                  <option>Assigned To</option>
                </select>

                <div className="flex items-center gap-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Date Range</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, Customer, SKU..."
                    className="pl-8 pr-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-xs w-52"
                  />
                </div>

                <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-gray-600 font-semibold">
                  <Filter className="w-3.5 h-3.5" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-3 w-6">
                      <input type="checkbox" className="rounded-sm" />
                    </th>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Stage</th>
                    <th className="pb-3">Progress</th>
                    <th className="pb-3">Assigned To</th>
                    <th className="pb-3">SLA</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: "HM-20261028-001", cust: "Rahul Mathias", loc: "Chennai", count: 3, prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", stage: "Picking", stageColor: "bg-[#EAF7EF] text-[#087A4A]", prog: 70, user: "Arjun K", sla: "1h 20m" },
                    { id: "HM-20261028-002", cust: "Sneha Iyer", loc: "Bangalore", count: 1, prio: "Normal", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", stage: "Packing", stageColor: "bg-blue-50 text-blue-600", prog: 45, user: "Priya S", sla: "2h 10m" },
                    { id: "HM-20261028-003", cust: "Arun Sharma", loc: "Hyderabad", count: 2, prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", stage: "Quality Check", stageColor: "bg-purple-50 text-purple-700", prog: 90, user: "Suresh R", sla: "45m" },
                    { id: "HM-20261028-004", cust: "Kavya Nair", loc: "Cochin", count: 1, prio: "Normal", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", stage: "Picking", stageColor: "bg-[#EAF7EF] text-[#087A4A]", prog: 30, user: "Deepak V", sla: "3h 05m" },
                    { id: "HM-20261028-005", cust: "Rohan Gupta", loc: "Delhi", count: 4, prio: "Low", prioColor: "bg-blue-50 text-blue-700 border border-blue-200", stage: "Packing", stageColor: "bg-blue-50 text-blue-600", prog: 60, user: "Manoj K", sla: "4h 20m" },
                    { id: "HM-20261028-006", cust: "Priya Verma", loc: "Pune", count: 2, prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", stage: "Ready", stageColor: "bg-rose-50 text-rose-700", prog: 100, user: "Anita S", sla: "Completed" },
                    { id: "HM-20261028-007", cust: "Arjun Lal", loc: "Mumbai", count: 1, prio: "Normal", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", stage: "Picking", stageColor: "bg-[#EAF7EF] text-[#087A4A]", prog: 50, user: "Vikram D", sla: "2h 40m" },
                    { id: "HM-20261028-008", cust: "Meera Singh", loc: "Kolkata", count: 3, prio: "Low", prioColor: "bg-blue-50 text-blue-700 border border-blue-200", stage: "Packing", stageColor: "bg-blue-50 text-blue-600", prog: 20, user: "Divya M", sla: "5h 15m" },
                    { id: "HM-20261028-009", cust: "Vikram Desai", loc: "Ahmedabad", count: 1, prio: "Normal", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", stage: "Quality Check", stageColor: "bg-purple-50 text-purple-700", prog: 80, user: "Karthik P", sla: "1h 10m" },
                    { id: "HM-20261028-010", cust: "Aishwarya Reddy", loc: "Chennai", count: 2, prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", stage: "Picking", stageColor: "bg-[#EAF7EF] text-[#087A4A]", prog: 40, user: "Neha T", sla: "2h 50m" },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5">
                        <input type="checkbox" className="rounded-sm" />
                      </td>
                      <td className="py-2.5 font-semibold text-gray-900">{row.id}</td>
                      <td className="py-2.5">
                        <p className="font-semibold text-gray-900">{row.cust}</p>
                        <p className="text-[10px] text-gray-400">{row.loc}</p>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px]">
                            📦
                          </span>
                          <span className="text-[10px] font-bold text-gray-500">+{row.count}</span>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold", row.prioColor)}>
                          {row.prio}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold", row.stageColor)}>
                          {row.stage}
                        </span>
                      </td>
                      <td className="py-2.5 w-28">
                        <div className="flex items-center gap-1.5">
                          <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#087A4A] h-full rounded-full" style={{ width: `${row.prog}%` }} />
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono w-7">{row.prog}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 font-medium text-gray-800">{row.user}</td>
                      <td className="py-2.5">
                        {row.sla === "Completed" ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-600">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>{row.sla}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/warehouse/orders/${row.id}`}
                            className="px-2 py-0.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 text-[10px] font-bold"
                          >
                            View
                          </Link>
                          <button className="text-gray-400 hover:text-gray-700">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination strip */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Showing 1-10 of 320 orders</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded-md border border-gray-200 text-gray-500">&lt;</button>
                <button className="px-2.5 py-1 rounded-md bg-[#087A4A] text-white font-bold">1</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">2</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">3</button>
                <button className="px-2 py-1 rounded-md border border-gray-200 text-gray-500">&gt;</button>
              </div>
            </div>
          </div>

          {/* Right Analytics Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Station Performance */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Station Performance</h3>
                <select className="text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2 py-1 text-gray-700">
                  <option>Today</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { name: "Picking Station", pct: 88, count: "68 / 80", color: "bg-[#10B981]" },
                  { name: "Packing Station", pct: 72, count: "58 / 80", color: "bg-[#3B82F6]" },
                  { name: "Quality Station", pct: 45, count: "45 / 80", color: "bg-[#F59E0B]" },
                  { name: "Handover Station", pct: 32, count: "32 / 80", color: "bg-[#8B5CF6]" },
                ].map((s) => (
                  <div key={s.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{s.pct}%</span>
                        <span className="text-[10px] text-gray-400">{s.count}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", s.color)} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worker Status */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Worker Status</h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-[#EAF7EF] border border-[#C5F0DA]">
                  <p className="font-display font-black text-xl text-[#087A4A]">28</p>
                  <p className="text-[10px] font-semibold text-gray-600 mt-0.5">Active Workers</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="font-display font-black text-xl text-amber-700">4</p>
                  <p className="text-[10px] font-semibold text-gray-600 mt-0.5">On Break</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                  <p className="font-display font-black text-xl text-red-600">2</p>
                  <p className="text-[10px] font-semibold text-gray-600 mt-0.5">Absent</p>
                </div>
              </div>
            </div>

            {/* Task Distribution Donut */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <h3 className="font-display font-bold text-sm text-gray-900">Task Distribution</h3>

              <div className="flex items-center justify-around gap-4 py-1">
                <div className="relative flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="14" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="105 133" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="74 164" strokeDashoffset="-105" />
                    <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="38 200" strokeDashoffset="-179" />
                    <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="14" fill="none" strokeDasharray="21 217" strokeDashoffset="-217" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="font-display font-black text-xs text-gray-900 leading-none">320</span>
                    <span className="text-[8px] text-gray-400 block">Tasks</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {[
                    { label: "Picking", val: "140 (44%)", color: "bg-[#10B981]" },
                    { label: "Packing", val: "100 (31%)", color: "bg-[#3B82F6]" },
                    { label: "Quality Check", val: "50 (16%)", color: "bg-[#F59E0B]" },
                    { label: "Handover", val: "30 (9%)", color: "bg-[#8B5CF6]" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("w-2 h-2 rounded-full", t.color)} />
                        <span className="text-gray-600">{t.label}</span>
                      </div>
                      <span className="font-bold text-gray-900">{t.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Completed Orders */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Recent Completed Orders</h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { id: "HM-20261028-095", time: "10:18 AM", items: 3, dur: "28m" },
                  { id: "HM-20261028-094", time: "10:12 AM", items: 5, dur: "42m" },
                  { id: "HM-20261028-093", time: "10:05 AM", items: 2, dur: "25m" },
                  { id: "HM-20261028-092", time: "09:58 AM", items: 4, dur: "38m" },
                  { id: "HM-20261028-091", time: "09:45 AM", items: 1, dur: "20m" },
                ].map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50">
                    <div>
                      <p className="font-semibold text-gray-900">{o.id}</p>
                      <p className="text-[10px] text-gray-400">{o.time} • {o.items} items</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 font-mono">{o.dur}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
