"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Plus,
  Settings,
  FileText,
  Search,
  ChevronDown,
  Calendar,
  Filter,
  MoreHorizontal,
  Package,
  UserCheck,
  BarChart3,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { cn } from "@/lib/cn";

export default function ExceptionManagementPage() {
  return (
    <WarehouseManagerShell pageNumber={8} pageTitle="Exception Management">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, Subtitle, Action Buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Exception Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Identify, track and resolve operational exceptions across the warehouse.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition">
              <FileText className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition">
              <Settings className="w-3.5 h-3.5" />
              <span>Exception Rules</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
              <Plus className="w-4 h-4" />
              <span>Raise Exception</span>
            </button>
          </div>
        </div>

        {/* ── 2. Top Metrics Row: 4 Metric Cards + Exception Types Donut (Page 08) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
          {/* Card 1: Open Exceptions */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FEF2F2] to-white rounded-2xl border border-[#FEE2E2] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FEE2E2] text-red-600 flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">48</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Open Exceptions</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FEF2F2] flex items-center justify-between text-[11px] font-bold text-red-600">
              <span>↑ 12%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 15, 30 5, 58 3" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl border border-[#FFEDD5] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shadow-2xs">
              <Clock className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">18</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">In Progress</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FFF7ED] flex items-center justify-between text-[11px] font-bold text-[#EA580C]">
              <span>↓ 8%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 5 C 15 8, 30 12, 58 13" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 3: Resolved (Today) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl border border-[#DCFCE7] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">210</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Resolved (Today)</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#EAF7EF] flex items-center justify-between text-[11px] font-bold text-[#16A34A]">
              <span>↑ 22%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 15, 30 6, 58 3" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 4: Escalated */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#FAF5FF] to-white rounded-2xl border border-[#F3E8FF] p-4 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
              <Users className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-2xl text-gray-900 leading-none">6</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Escalated</p>
            </div>
            <div className="mt-2 pt-2 border-t border-[#FAF5FF] flex items-center justify-between text-[11px] font-bold text-[#9333EA]">
              <span>↑ 50%</span>
              <svg className="w-14 h-3.5" viewBox="0 0 60 15" fill="none">
                <path d="M2 13 C 15 14, 30 8, 58 3" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Card 5: Exception Types Distribution Donut (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] p-4 shadow-2xs flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs text-gray-900">Exception Types Distribution</h4>
              <div className="relative flex items-center justify-center w-28 h-28 my-1">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="14" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="14" fill="none" strokeDasharray="69 169" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="14" fill="none" strokeDasharray="50 188" strokeDashoffset="-69" />
                  <circle cx="50" cy="50" r="38" stroke="#8B5CF6" strokeWidth="14" fill="none" strokeDasharray="40 198" strokeDashoffset="-119" />
                  <circle cx="50" cy="50" r="38" stroke="#EC4899" strokeWidth="14" fill="none" strokeDasharray="31 207" strokeDashoffset="-159" />
                  <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="14" fill="none" strokeDasharray="19 219" strokeDashoffset="-190" />
                  <circle cx="50" cy="50" r="38" stroke="#6B7280" strokeWidth="14" fill="none" strokeDasharray="29 209" strokeDashoffset="-209" />
                </svg>
                <div className="absolute text-center">
                  <span className="font-display font-black text-sm text-gray-900 leading-none">48</span>
                  <span className="text-[9px] text-gray-400 block">Open</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[10px] flex-1">
              {[
                { label: "Missing Item", val: "14 (29%)", color: "bg-[#10B981]" },
                { label: "Wrong Item", val: "10 (21%)", color: "bg-[#3B82F6]" },
                { label: "Damaged Item", val: "8 (17%)", color: "bg-[#8B5CF6]" },
                { label: "Quantity Mismatch", val: "6 (13%)", color: "bg-[#EC4899]" },
                { label: "Bin Mismatch", val: "4 (8%)", color: "bg-[#F59E0B]" },
                { label: "Others", val: "6 (12%)", color: "bg-gray-500" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-2 h-2 rounded-full", s.color)} />
                    <span className="text-gray-600 truncate max-w-[90px]">{s.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Filters Bar ── */}
        <div className="bg-white rounded-2xl border border-[#E1E8E3] p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Last 7 Days</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Types</option>
              <option>Missing Item</option>
              <option>Wrong Item</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1.5 text-gray-700">
              <option>All Users</option>
              <option>Arjun K</option>
              <option>Priya S</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, SKU, exception ID..."
                className="pl-8 pr-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-xs w-60"
              />
            </div>
            <button className="flex items-center gap-1 px-2.5 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-gray-600 font-semibold">
              <Filter className="w-3.5 h-3.5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* ── 4. Main Grid: Exceptions Table (8 cols) + Right Analytics Column (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Exceptions List Table (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-sm text-gray-900">Exceptions List (Last 7 Days)</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-3 w-6">
                      <input type="checkbox" className="rounded-sm" />
                    </th>
                    <th className="pb-3">Exception ID</th>
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Product / SKU</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Assigned To</th>
                    <th className="pb-3">SLA</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: "EX-20261028-001", time: "28 Oct, 09:12 AM", ord: "HM-20261028-001", type: "Missing Item", typeColor: "bg-red-50 text-red-600", prod: "Wireless Earbuds", sku: "HM-ELC-010", prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", status: "Open", statusColor: "bg-red-50 text-red-600", user: "Arjun K", sla: "1h 20m" },
                    { id: "EX-20261028-002", time: "28 Oct, 08:45 AM", ord: "HM-20261028-002", type: "Wrong Item", typeColor: "bg-amber-50 text-amber-700", prod: "Men's Running Shoes", sku: "HM-SHOE-001", prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", status: "In Progress", statusColor: "bg-blue-50 text-blue-600", user: "Priya S", sla: "45m" },
                    { id: "EX-20261028-003", time: "28 Oct, 08:20 AM", ord: "HM-20261028-003", type: "Damaged Item", typeColor: "bg-red-50 text-red-600", prod: "Backpack 30L", sku: "HM-BAG-003", prio: "Medium", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", status: "Open", statusColor: "bg-red-50 text-red-600", user: "Suresh R", sla: "2h 10m" },
                    { id: "EX-20261028-004", time: "28 Oct, 07:55 AM", ord: "HM-20261028-004", type: "Bin Mismatch", typeColor: "bg-purple-50 text-purple-700", prod: "Face Wash 100ml", sku: "HM-BEA-002", prio: "Medium", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", status: "Resolved", statusColor: "bg-[#EAF7EF] text-[#087A4A]", user: "Deepak V", sla: "-" },
                    { id: "EX-20261028-005", time: "27 Oct, 09:40 PM", ord: "HM-20261027-089", type: "Quantity Mismatch", typeColor: "bg-blue-50 text-blue-600", prod: "Rice 5kg", sku: "HM-GRO-015", prio: "High", prioColor: "bg-red-50 text-red-600 border border-red-200", status: "In Progress", statusColor: "bg-blue-50 text-blue-600", user: "Manoj K", sla: "1h 05m" },
                    { id: "EX-20261028-006", time: "27 Oct, 08:15 PM", ord: "HM-20261027-077", type: "Label Issue", typeColor: "bg-amber-50 text-amber-700", prod: "Cooking Oil 1L", sku: "HM-GRO-021", prio: "Low", prioColor: "bg-blue-50 text-blue-700 border border-blue-200", status: "Resolved", statusColor: "bg-[#EAF7EF] text-[#087A4A]", user: "Anita S", sla: "-" },
                    { id: "EX-20261027-007", time: "27 Oct, 06:30 PM", ord: "HM-20261027-065", type: "Location Error", typeColor: "bg-purple-50 text-purple-700", prod: "T-Shirt XL", sku: "HM-TSH-002", prio: "Medium", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", status: "Open", statusColor: "bg-red-50 text-red-600", user: "Vikram D", sla: "2h 25m" },
                    { id: "EX-20261027-008", time: "27 Oct, 05:12 PM", ord: "HM-20261027-051", type: "System Error", typeColor: "bg-blue-50 text-blue-600", prod: "Face Mask 50pcs", sku: "HM-BEA-009", prio: "Low", prioColor: "bg-blue-50 text-blue-700 border border-blue-200", status: "Resolved", statusColor: "bg-[#EAF7EF] text-[#087A4A]", user: "Divya M", sla: "-" },
                    { id: "EX-20261026-009", time: "26 Oct, 04:45 PM", ord: "HM-20261026-034", type: "Damaged Packaging", typeColor: "bg-red-50 text-red-600", prod: "Backpack 30L", sku: "HM-BAG-003", prio: "Medium", prioColor: "bg-amber-50 text-amber-700 border border-amber-200", status: "Open", statusColor: "bg-red-50 text-red-600", user: "Neha T", sla: "3h 10m" },
                    { id: "EX-20261026-010", time: "26 Oct, 03:20 PM", ord: "HM-20261026-018", type: "Other", typeColor: "bg-gray-100 text-gray-700", prod: "Bluetooth Speaker", sku: "HM-ELC-012", prio: "Low", prioColor: "bg-blue-50 text-blue-700 border border-blue-200", status: "In Progress", statusColor: "bg-blue-50 text-blue-600", user: "Karthik P", sla: "4h 05m" },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5">
                        <input type="checkbox" className="rounded-sm" />
                      </td>
                      <td className="py-2.5 font-semibold text-gray-900 whitespace-nowrap">{row.id}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.time}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.ord}</td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap", row.typeColor)}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <p className="font-medium text-gray-900 truncate max-w-[110px]">{row.prod}</p>
                        <p className="text-[9px] font-mono text-gray-400">{row.sku}</p>
                      </td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold", row.prioColor)}>
                          {row.prio}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap", row.statusColor)}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-gray-700 whitespace-nowrap">{row.user}</td>
                      <td className="py-2.5 whitespace-nowrap">
                        {row.sla !== "-" ? (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-600">
                            <Clock className="w-3 h-3 text-red-500" />
                            <span>{row.sla}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="px-2 py-0.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100 text-[10px] font-bold">
                            View
                          </button>
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

            {/* Pagination */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
              <span>Showing 1-10 of 48 exceptions</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded-md border border-gray-200 text-gray-500">&lt;</button>
                <button className="px-2.5 py-1 rounded-md bg-[#087A4A] text-white font-bold">1</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">2</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">3</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">4</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">5</button>
                <span>...</span>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-700">8</button>
                <button className="px-2.5 py-1 rounded-md border border-gray-200 text-gray-500">&gt;</button>
              </div>
            </div>
          </div>

          {/* Right Column: Trend + SLA Breach Alert + Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Exception Status Trend (Last 7 Days) */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Exception Status Trend</h3>
                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span>Open</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <span>In Progress</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>Resolved</span>
                  </span>
                </div>
              </div>

              {/* Line chart visualization */}
              <div className="h-32 pt-2 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Open Line (Red) */}
                  <path d="M 10 30 Q 90 20, 170 25 T 330 30 T 490 25" fill="none" stroke="#EF4444" strokeWidth="2" />
                  <circle cx="10" cy="30" r="2.5" fill="#EF4444" />
                  <circle cx="90" cy="20" r="2.5" fill="#EF4444" />
                  <circle cx="170" cy="25" r="2.5" fill="#EF4444" />
                  <circle cx="250" cy="28" r="2.5" fill="#EF4444" />
                  <circle cx="330" cy="30" r="2.5" fill="#EF4444" />
                  <circle cx="410" cy="22" r="2.5" fill="#EF4444" />
                  <circle cx="490" cy="25" r="2.5" fill="#EF4444" />

                  {/* In Progress Line (Blue) */}
                  <path d="M 10 70 Q 90 65, 170 65 T 330 60 T 490 55" fill="none" stroke="#3B82F6" strokeWidth="2" />
                  {/* Resolved Line (Green) */}
                  <path d="M 10 80 Q 90 75, 170 70 T 330 60 T 490 50" fill="none" stroke="#10B981" strokeWidth="2" />
                </svg>

                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 font-mono">
                  <span>22 Oct</span>
                  <span>23 Oct</span>
                  <span>24 Oct</span>
                  <span>25 Oct</span>
                  <span>26 Oct</span>
                  <span>27 Oct</span>
                  <span>28 Oct</span>
                </div>
              </div>
            </div>

            {/* SLA Breach Alert Card */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-xs text-gray-900 leading-tight">6 Exceptions</h4>
                    <p className="text-[10px] text-red-600 font-semibold">Breached SLA</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="space-y-2 text-xs pt-1">
                {[
                  { id: "EX-20261028-001", type: "Missing Item", time: "1h 20m" },
                  { id: "EX-20261028-005", type: "Quantity Mismatch", time: "1h 05m" },
                  { id: "EX-20261027-007", type: "Location Error", time: "2h 25m" },
                  { id: "EX-20261026-009", type: "Damaged Packaging", time: "3h 10m" },
                  { id: "EX-20261026-010", type: "System Error", time: "4h 05m" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-red-50/60 border border-red-100">
                    <div>
                      <p className="font-semibold text-gray-900">{item.id}</p>
                      <p className="text-[10px] text-gray-500">{item.type}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 font-mono">
                      <Clock className="w-3 h-3 text-red-500" />
                      <span>{item.time}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <h3 className="font-display font-bold text-sm text-gray-900">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  <span className="truncate">Raise Exception</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Bulk Update</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <UserCheck className="w-3.5 h-3.5 text-[#087A4A]" />
                  <span className="truncate">Assign to Me</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">View Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
