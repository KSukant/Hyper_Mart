"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Package,
  Users,
  AlertTriangle,
  Target,
  TrendingUp,
  Calendar,
  Lightbulb,
  Check,
  Search,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function WorkloadForecastPage() {
  return (
    <WarehouseManagerShell
      pageTitle="Workload Forecast"
      pageDescription="Predict and plan future workload, capacity needs, and resource allocation to meet demand and deadlines."
      currentPath="/warehouse/capacity/workload-forecast"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/capacity" className="hover:text-[#087A4A]">Capacity & Deadlines</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Workload Forecast</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Workload Forecast</h1>
            <p className="text-xs text-[#5B7564]">
              Predict and plan future workload, capacity needs, and resource allocation to meet demand and deadlines.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
              <span>Oct 30, 2026 – Nov 05, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B7564]" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              Generate Forecast
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 34 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Forecasted Workload */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Layers className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Forecasted Workload</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">9,640</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +13.2% vs last 7 days
              </div>
            </div>
          </div>

          {/* Peak Workload */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Peak Workload</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">11,280</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (Nov 03)
              </div>
            </div>
          </div>

          {/* Required Resources */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Users className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Required Resources</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">142</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +10
              </div>
            </div>
          </div>

          {/* Available Resources */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <Users className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Available Resources</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">124</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* Capacity Gap */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Capacity Gap</div>
              <div className="text-2xl font-black text-[#D32F2F] mt-0.5">18</div>
              <div className="text-[11px] text-[#D32F2F] font-semibold mt-1">
                (12.7%)
              </div>
            </div>
          </div>

          {/* Projected Utilization */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <Target className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Projected Utilization</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">87.3%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +4.6 pp
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-3 border border-[#E1E8E3] shadow-xs flex flex-wrap items-center gap-3 justify-between">
          <div className="flex-1 min-w-[260px] relative">
            <Search className="w-4 h-4 text-[#7A9385] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Process, Zone, or Resource..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Processes</option>
              <option>Receiving</option>
              <option>Putaway</option>
              <option>Picking</option>
              <option>Packing</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>A – Receiving</option>
              <option>B – Storage</option>
              <option>C – Picking</option>
              <option>D – Packing</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Resource Types</option>
              <option>Pickers</option>
              <option>Packers</option>
            </select>

            <button className="p-2 rounded-xl border border-[#CBD8D0] bg-white text-[#5B7564] hover:bg-[#F2F7F4]">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Row 1: Forecast vs Capacity + Process-wise Donut + Resource Requirement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Workload Forecast vs. Capacity - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Workload Forecast vs. Capacity</h3>
            <div className="h-44 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 250 120">
                <line x1="30" y1="20" x2="250" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="24" className="text-[9px] fill-[#7A9385]">12,000</text>
                <line x1="30" y1="36" x2="250" y2="36" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="40" className="text-[9px] fill-[#7A9385]">11,000</text>
                <line x1="30" y1="52" x2="250" y2="52" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="56" className="text-[9px] fill-[#7A9385]">10,000</text>
                <line x1="30" y1="68" x2="250" y2="68" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="72" className="text-[9px] fill-[#7A9385]">9,000</text>
                <line x1="30" y1="84" x2="250" y2="84" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="88" className="text-[9px] fill-[#7A9385]">8,000</text>
                <line x1="30" y1="100" x2="250" y2="100" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="104" className="text-[9px] fill-[#7A9385]">7,000</text>

                {/* Dashed red capacity line (10,000) */}
                <line x1="30" y1="52" x2="245" y2="52" stroke="#D32F2F" strokeWidth="2" strokeDasharray="4 4" />

                {/* Green area & line */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.5"
                  points="35,110 35,78 65,72 95,68 125,54 155,30 185,42 225,50 225,110"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="35,78 65,72 95,68 125,54 155,30 185,42 225,50"
                />
                {[
                  [35, 78], [65, 72], [95, 68], [125, 54], [155, 30], [185, 42], [225, 50]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#2E7D32" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-[#7A9385] mt-2 px-6">
              <span>Oct 30</span>
              <span>Oct 31</span>
              <span>Nov 01</span>
              <span>Nov 02</span>
              <span>Nov 03</span>
              <span>Nov 04</span>
              <span>Nov 05</span>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#EDF2EE] text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-sm bg-[#A5D6A7]" /> Forecasted Workload
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#D32F2F]" /> Available Capacity
              </span>
            </div>
          </div>

          {/* Donut 2: Process-wise Forecasted Workload - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Process-wise Forecasted Workload</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Receiving 19.9% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="19.9, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Putaway 14.9% (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="14.9, 100" strokeDashoffset="-19.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Picking 29.9% (blue) */}
                  <path className="text-[#1976D2]" strokeDasharray="29.9, 100" strokeDashoffset="-34.8" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Packing 23.2% (purple) */}
                  <path className="text-[#7B1FA2]" strokeDasharray="23.2, 100" strokeDashoffset="-64.7" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Handover 12.0% (light blue) */}
                  <path className="text-[#80DEEA]" strokeDasharray="12.0, 100" strokeDashoffset="-87.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-[#033129] leading-none">9,640</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Units</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[10px] pt-2 border-t border-[#EDF2EE]">
              <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Receiving</span><span className="font-bold text-[#033129]">1,920 (19.9%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Putaway</span><span className="font-bold text-[#033129]">1,440 (14.9%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />Picking</span><span className="font-bold text-[#033129]">2,880 (29.9%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7B1FA2]" />Packing</span><span className="font-bold text-[#033129]">2,240 (23.2%)</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#80DEEA]" />Handover</span><span className="font-bold text-[#033129]">1,160 (12.0%)</span></div>
            </div>
          </div>

          {/* Chart 3: Resource Requirement Trend - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Resource Requirement Trend</h3>
            <div className="h-44 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                <line x1="20" y1="20" x2="200" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="24" className="text-[8px] fill-[#7A9385]">170</text>
                <line x1="20" y1="40" x2="200" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="44" className="text-[8px] fill-[#7A9385]">150</text>
                <line x1="20" y1="60" x2="200" y2="60" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="64" className="text-[8px] fill-[#7A9385]">130</text>
                <line x1="20" y1="80" x2="200" y2="80" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="84" className="text-[8px] fill-[#7A9385]">110</text>

                {/* Columns: Required Resources */}
                {[
                  [30, 48], [55, 52], [80, 56], [105, 68], [130, 85], [155, 78], [180, 72]
                ].map(([x, h], i) => (
                  <rect key={i} x={x - 8} y={118 - h} width="16" height={h} fill="#C8E6C9" rx="2" />
                ))}

                {/* Dark green line: Available Resources (~124, y = 70) */}
                <line x1="25" y1="70" x2="190" y2="70" stroke="#2E7D32" strokeWidth="2.5" />
                {[30, 55, 80, 105, 130, 155, 180].map((x, i) => (
                  <circle key={i} cx={x} cy="70" r="2.5" fill="#2E7D32" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[8px] text-[#7A9385] mt-1 px-4">
              <span>Oct 30</span>
              <span>Oct 31</span>
              <span>Nov 01</span>
              <span>Nov 02</span>
              <span>Nov 03</span>
              <span>Nov 04</span>
              <span>Nov 05</span>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#EDF2EE] text-[9px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-[#C8E6C9]" /> Required Resources
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-[#2E7D32]" /> Available Resources
              </span>
            </div>
          </div>
        </div>

        {/* Middle Row 2: Daily Forecast Summary Table + Zone-wise Bars + Forecast Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table: Daily Forecast Summary - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Daily Forecast Summary</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Forecasted</th>
                  <th className="py-2 px-3">Available</th>
                  <th className="py-2 px-3">Utilization</th>
                  <th className="py-2 px-3">Required</th>
                  <th className="py-2 px-3">Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { date: "Oct 30", fc: "8,520", cap: "10,000", util: "85.2%", req: 132, gap: "-" },
                  { date: "Oct 31", fc: "8,960", cap: "10,000", util: "89.6%", req: 138, gap: "-" },
                  { date: "Nov 01", fc: "9,280", cap: "10,000", util: "92.8%", req: 140, gap: "-" },
                  { date: "Nov 02", fc: "9,960", cap: "10,000", util: "99.6%", req: 149, gap: "-" },
                  { date: "Nov 03", fc: "11,280", cap: "10,000", util: "112.8%", req: 160, gap: "+18" },
                  { date: "Nov 04", fc: "10,640", cap: "10,000", util: "106.4%", req: 155, gap: "+12" },
                  { date: "Nov 05", fc: "10,080", cap: "10,000", util: "100.8%", req: 148, gap: "+8" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-1.5 px-3 font-semibold text-[#033129]">{row.date}</td>
                    <td className="py-1.5 px-3">{row.fc}</td>
                    <td className="py-1.5 px-3 text-[#5B7564]">{row.cap}</td>
                    <td className="py-1.5 px-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        row.util.startsWith("1") ? "bg-[#FFEBEE] text-[#D32F2F]" : "bg-[#E8F5E9] text-[#2E7D32]"
                      }`}>
                        {row.util}
                      </span>
                    </td>
                    <td className="py-1.5 px-3">{row.req}</td>
                    <td className="py-1.5 px-3 font-bold text-[#D32F2F]">{row.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Horizontal Bars: Zone-wise Forecasted Workload - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Zone-wise Forecasted Workload</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">A – Receiving</span>
                  <span className="font-bold text-[#033129]">2,240 (23.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "23.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">B – Storage</span>
                  <span className="font-bold text-[#033129]">1,680 (17.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "17.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">C – Picking</span>
                  <span className="font-bold text-[#033129]">2,880 (29.9%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "29.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">D – Packing</span>
                  <span className="font-bold text-[#033129]">1,920 (19.9%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "19.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">E – Dispatch</span>
                  <span className="font-bold text-[#033129]">920 (9.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "9.5%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Forecast Insights - 3 cols */}
          <div className="lg:col-span-3 bg-[#FFFDE7] rounded-2xl p-4 border border-[#FFF59D] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#F57F17] mb-2.5">
                <Lightbulb className="w-4 h-4 text-[#F57F17]" />
                <span>Forecast Insights</span>
              </div>
              <ul className="space-y-2 text-xs text-[#5D4037] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Peak workload on Nov 03 (11,280 units).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Capacity shortfall of 18 resources (12.7%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Picking and Packing account for 53.1% of total workload.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Consider temporary staff or shift extension on Nov 02 – Nov 04.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row: Workload Distribution + Resource Utilization Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Workload Distribution (Next 7 Days) - 6 cols */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Workload Distribution (Next 7 Days)</h3>
            <div className="h-36 relative mt-2 flex items-end justify-around px-2 pb-2">
              {[
                { day: "Oct 30", r: 15, p: 12, pk: 25, pa: 18, h: 10 },
                { day: "Oct 31", r: 16, p: 13, pk: 26, pa: 19, h: 10 },
                { day: "Nov 01", r: 17, p: 14, pk: 28, pa: 20, h: 11 },
                { day: "Nov 02", r: 18, p: 15, pk: 30, pa: 22, h: 12 },
                { day: "Nov 03", r: 22, p: 18, pk: 36, pa: 26, h: 14 },
                { day: "Nov 04", r: 20, p: 16, pk: 33, pa: 24, h: 13 },
                { day: "Nov 05", r: 19, p: 15, pk: 31, pa: 23, h: 12 },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-7 flex flex-col-reverse rounded-t-sm overflow-hidden" style={{ height: "100px" }}>
                    <div className="bg-[#D32F2F]" style={{ height: `${c.r}%` }} />
                    <div className="bg-[#FFA000]" style={{ height: `${c.p}%` }} />
                    <div className="bg-[#1976D2]" style={{ height: `${c.pk}%` }} />
                    <div className="bg-[#7B1FA2]" style={{ height: `${c.pa}%` }} />
                    <div className="bg-[#80DEEA]" style={{ height: `${c.h}%` }} />
                  </div>
                  <span className="text-[9px] text-[#5B7564] font-medium">{c.day}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 pt-2 border-t border-[#EDF2EE] text-[9px] text-[#5B7564]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" /> Receiving</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" /> Putaway</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" /> Picking</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7B1FA2]" /> Packing</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#80DEEA]" /> Handover</span>
            </div>
          </div>

          {/* Chart 2: Resource Utilization Forecast - 6 cols */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Resource Utilization Forecast</h3>
            <div className="h-36 relative mt-2 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 250 80">
                <line x1="25" y1="15" x2="250" y2="15" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="18" className="text-[8px] fill-[#7A9385]">100.0%</text>
                <line x1="25" y1="35" x2="250" y2="35" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="38" className="text-[8px] fill-[#7A9385]">90.0%</text>
                <line x1="25" y1="55" x2="250" y2="55" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="58" className="text-[8px] fill-[#7A9385]">80.0%</text>
                <line x1="25" y1="75" x2="250" y2="75" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="78" className="text-[8px] fill-[#7A9385]">70.0%</text>

                {/* Dashed red capacity threshold line (100%) */}
                <line x1="30" y1="15" x2="245" y2="15" stroke="#D32F2F" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Green line: Projected Utilization */}
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="35,62 65,58 95,52 125,48 155,24 185,34 225,40"
                />
                {[
                  [35, 62], [65, 58], [95, 52], [125, 48], [155, 24], [185, 34], [225, 40]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#2E7D32" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-[#7A9385] mt-1 px-8">
              <span>Oct 30</span>
              <span>Oct 31</span>
              <span>Nov 01</span>
              <span>Nov 02</span>
              <span>Nov 03</span>
              <span>Nov 04</span>
              <span>Nov 05</span>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-[#2E7D32]" /> Projected Utilization
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#D32F2F]" /> Capacity Threshold (100%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
