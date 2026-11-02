"use client";

import React, { useState } from "react";
import {
  Target,
  ShieldCheck,
  Clock,
  Truck,
  CheckCircle2,
  BarChart2,
  Search,
  RotateCw,
  Download,
  Calendar,
  Lightbulb,
  Check,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function PerformanceReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedProcess, setSelectedProcess] = useState("All Processes");
  const [selectedCourier, setSelectedCourier] = useState("All Couriers");
  const [selectedShift, setSelectedShift] = useState("All Shifts");

  return (
    <WarehouseManagerShell pageNumber={36} title="Performance Reports" currentPath="/warehouse/reports/performance">
      <div className="space-y-4">
        {/* Top Header matching page_36.png */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Performance Reports</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Track operational, process, and resource performance against targets and SLAs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>
            <button
              onClick={() => alert("Exporting performance report...")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => alert("Generating performance report...")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#033129] text-white rounded-lg text-xs font-semibold hover:bg-[#05463b] shadow-2xs transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* 6 KPI Cards matching page_36.png */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1 */}
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Overall Performance</span>
              <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">97.6%</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +2.4 pp vs last 7 days</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">SLA Compliance</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">98.4%</span>
              <p className="text-[10px] text-blue-700 font-semibold mt-0.5">↑ +1.2 pp</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Avg. Processing Time</span>
              <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">3.6 hrs</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↓ -0.8 hrs</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">On-Time Dispatch</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">97.9%</span>
              <p className="text-[10px] text-purple-700 font-semibold mt-0.5">↑ +1.6 pp</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">On-Time Delivery</span>
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">98.1%</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +1.9 pp</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Order Accuracy</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <BarChart2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">99.3%</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +0.3 pp</p>
            </div>
          </div>
        </div>

        {/* Filters Bar matching page_36.png */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-wrap items-center gap-2.5 shadow-2xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Zone, Process, or Courier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Zones</option>
            <option>Zone A - Receiving</option>
            <option>Zone B - Storage</option>
            <option>Zone C - Picking</option>
            <option>Zone D - Packing</option>
            <option>Zone E - Dispatch</option>
          </select>
          <select
            value={selectedProcess}
            onChange={(e) => setSelectedProcess(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Processes</option>
            <option>Receiving</option>
            <option>Putaway</option>
            <option>Picking</option>
            <option>Packing</option>
            <option>Handover</option>
          </select>
          <select
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Couriers</option>
            <option>BlueDart</option>
            <option>Delhivery</option>
            <option>Ekart</option>
            <option>Shadowfax</option>
            <option>Aramex</option>
          </select>
          <select
            value={selectedShift}
            onChange={(e) => setSelectedShift(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none"
          >
            <option>All Shifts</option>
            <option>1st Shift</option>
            <option>2nd Shift</option>
            <option>Night Shift</option>
          </select>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedZone("All Zones");
              setSelectedProcess("All Processes");
              setSelectedCourier("All Couriers");
              setSelectedShift("All Shifts");
            }}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Refresh"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Row 1 (3 cols): Performance Trend, SLA Compliance Breakdown, Process Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Performance Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Performance Trend (Last 7 Days)</h2>
            <div className="mt-3 relative h-44">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
                {[0, 28, 56, 84, 112, 140].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="315" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                {/* Overall Performance (Green) */}
                <path
                  d="M 25 55 L 73 50 L 121 44 L 169 38 L 217 34 L 265 30 L 313 28"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <polygon
                  points="25,55 73,50 121,44 169,38 217,34 265,30 313,28 313,140 25,140"
                  fill="url(#greenPerfGrad)"
                  opacity="0.15"
                />
                {/* SLA Compliance (Yellow) */}
                <path
                  d="M 25 72 L 73 68 L 121 62 L 169 56 L 217 50 L 265 46 L 313 42"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="2.5"
                />
                {/* On-Time Delivery (Red) */}
                <path
                  d="M 25 90 L 73 85 L 121 80 L 169 74 L 217 68 L 265 62 L 313 58"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                />
                {[[25,55],[73,50],[121,44],[169,38],[217,34],[265,30],[313,28]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#10B981" stroke="#fff" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="greenPerfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[10px] mt-2 pt-2 border-t border-gray-100 font-medium">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Overall Performance
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" /> SLA Compliance
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> On-Time Delivery
              </span>
            </div>
          </div>

          {/* Card 2: SLA Compliance Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">SLA Compliance Breakdown</h2>
            <div className="mt-2 flex items-center justify-center gap-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.984)}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#9CA3AF"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.016)}
                    style={{ transform: "rotate(354deg)", transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold text-gray-900">98.4%</span>
                  <span className="text-[9px] text-gray-500 font-semibold">SLA Compliance</span>
                </div>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                  <span className="text-gray-600">Within SLA</span>
                  <span className="font-bold text-gray-900 ml-auto">12,641 (98.4%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF]" />
                  <span className="text-gray-600">SLA Breach</span>
                  <span className="font-bold text-gray-900 ml-auto">205 (1.6%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Process Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Process Performance</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Process</th>
                    <th className="pb-1.5">Target</th>
                    <th className="pb-1.5">Actual</th>
                    <th className="pb-1.5">Performance</th>
                    <th className="pb-1.5 text-right">vs Last 7 Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Receiving</td>
                    <td className="py-1.5 text-gray-500">≥ 98.0%</td>
                    <td className="py-1.5 text-gray-700 font-medium">≥ 98.0%</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.9%</span></td>
                    <td className="py-1.5 text-right text-green-700 font-semibold text-[10px]">↑ +0.8 pp</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Putaway</td>
                    <td className="py-1.5 text-gray-500">≥ 98.0%</td>
                    <td className="py-1.5 text-gray-700 font-medium">≥ 98.0%</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.6%</span></td>
                    <td className="py-1.5 text-right text-green-700 font-semibold text-[10px]">↑ +1.1 pp</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Picking</td>
                    <td className="py-1.5 text-gray-500">≥ 97.0%</td>
                    <td className="py-1.5 text-gray-700 font-medium">≥ 97.0%</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.8%</span></td>
                    <td className="py-1.5 text-right text-green-700 font-semibold text-[10px]">↑ +2.0 pp</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Packing</td>
                    <td className="py-1.5 text-gray-500">≥ 98.0%</td>
                    <td className="py-1.5 text-gray-700 font-medium">≥ 98.0%</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.4%</span></td>
                    <td className="py-1.5 text-right text-green-700 font-semibold text-[10px]">↑ +1.5 pp</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Handover</td>
                    <td className="py-1.5 text-gray-500">≥ 98.0%</td>
                    <td className="py-1.5 text-gray-700 font-medium">≥ 98.0%</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">99.2%</span></td>
                    <td className="py-1.5 text-right text-green-700 font-semibold text-[10px]">↑ +0.9 pp</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 2 (3 cols): Zone-wise Performance, Courier Performance, Key KPIs (vs Target) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Zone-wise Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Zone-wise Performance</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Zone</th>
                    <th className="pb-1.5">Orders</th>
                    <th className="pb-1.5">SLA %</th>
                    <th className="pb-1.5">On-Time %</th>
                    <th className="pb-1.5">Accuracy %</th>
                    <th className="pb-1.5 text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">A - Receiving</td>
                    <td className="py-1.5 text-gray-600">2,420</td>
                    <td className="py-1.5 text-gray-700">98.8%</td>
                    <td className="py-1.5 text-gray-700">98.5%</td>
                    <td className="py-1.5 text-gray-700">99.4%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.9%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">B - Storage</td>
                    <td className="py-1.5 text-gray-600">2,386</td>
                    <td className="py-1.5 text-gray-700">98.6%</td>
                    <td className="py-1.5 text-gray-700">98.0%</td>
                    <td className="py-1.5 text-gray-700">99.2%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.6%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">C - Picking</td>
                    <td className="py-1.5 text-gray-600">3,148</td>
                    <td className="py-1.5 text-gray-700">97.9%</td>
                    <td className="py-1.5 text-gray-700">97.6%</td>
                    <td className="py-1.5 text-gray-700">99.1%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.8%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">D - Packing</td>
                    <td className="py-1.5 text-gray-600">2,654</td>
                    <td className="py-1.5 text-gray-700">98.7%</td>
                    <td className="py-1.5 text-gray-700">98.1%</td>
                    <td className="py-1.5 text-gray-700">99.3%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.7%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">E - Dispatch</td>
                    <td className="py-1.5 text-gray-600">2,238</td>
                    <td className="py-1.5 text-gray-700">98.1%</td>
                    <td className="py-1.5 text-gray-700">97.4%</td>
                    <td className="py-1.5 text-gray-700">99.0%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.1%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Courier Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Courier Performance</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Courier</th>
                    <th className="pb-1.5">Shipments</th>
                    <th className="pb-1.5">On-Time %</th>
                    <th className="pb-1.5">Delivery %</th>
                    <th className="pb-1.5 text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium text-[10px]">BlueDart</span></td>
                    <td className="py-1.5 text-gray-600">4,102</td>
                    <td className="py-1.5 text-gray-700">98.6%</td>
                    <td className="py-1.5 text-gray-700">99.5%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">99.0%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-medium text-[10px]">Delivery</span></td>
                    <td className="py-1.5 text-gray-600">3,248</td>
                    <td className="py-1.5 text-gray-700">98.1%</td>
                    <td className="py-1.5 text-gray-700">99.4%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.8%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 font-medium text-[10px]">Ekart</span></td>
                    <td className="py-1.5 text-gray-600">2,184</td>
                    <td className="py-1.5 text-gray-700">97.3%</td>
                    <td className="py-1.5 text-gray-700">99.1%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.2%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-medium text-[10px]">Shadowfax</span></td>
                    <td className="py-1.5 text-gray-600">1,836</td>
                    <td className="py-1.5 text-gray-700">97.9%</td>
                    <td className="py-1.5 text-gray-700">99.3%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.6%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium text-[10px]">Aramex</span></td>
                    <td className="py-1.5 text-gray-600">1,014</td>
                    <td className="py-1.5 text-gray-700">99.2%</td>
                    <td className="py-1.5 text-gray-700">99.6%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">99.4%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium text-[10px]">Others</span></td>
                    <td className="py-1.5 text-gray-600">462</td>
                    <td className="py-1.5 text-gray-700">98.0%</td>
                    <td className="py-1.5 text-gray-700">99.5%</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.8%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 3: Key KPIs (vs Target) */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Key KPIs (vs Target)</h2>
            <div className="mt-3 space-y-2.5">
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">SLA Compliance</span>
                  <span className="text-gray-900 font-bold">98.4% / 98.0%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "98.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">On-Time Dispatch</span>
                  <span className="text-gray-900 font-bold">97.9% / 97.0%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "97.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">On-Time Delivery</span>
                  <span className="text-gray-900 font-bold">98.1% / 97.0%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "98.1%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">Order Accuracy</span>
                  <span className="text-gray-900 font-bold">99.3% / 99.0%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#15803D] h-full rounded-full" style={{ width: "99.3%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-medium mb-1">
                  <span className="text-gray-700">Cycle Time (hrs)</span>
                  <span className="text-gray-900 font-bold">3.6 / ≤ 4.5</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4ADE80] h-full rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 (3 cols): Cycle Time Trend, Order Accuracy Trend, Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Cycle Time Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Cycle Time Trend (hrs)</h2>
            <div className="mt-3 relative h-44">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
                {[0, 28, 56, 84, 112, 140].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="315" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                {/* Red dashed line target */}
                <line x1="25" y1="30" x2="315" y2="30" stroke="#EF4444" strokeDasharray="4,4" strokeWidth="1.5" />
                {/* Green Cycle Time line */}
                <path
                  d="M 25 50 L 73 58 L 121 66 L 169 70 L 217 76 L 265 76 L 313 76"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2.5"
                />
                <polygon
                  points="25,50 73,58 121,66 169,70 217,76 265,76 313,76 313,140 25,140"
                  fill="url(#greenCycleGrad)"
                  opacity="0.12"
                />
                {[[25,50],[73,58],[121,66],[169,70],[217,76],[265,76],[313,76]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#15803D" stroke="#fff" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="greenCycleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[10px] mt-2 pt-2 border-t border-gray-100 font-medium">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> Avg. Cycle Time (hrs)
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-3 h-0.5 bg-[#EF4444] border border-dashed border-[#EF4444]" /> Target (≤ 4.5 hrs)
              </span>
            </div>
          </div>

          {/* Card 2: Order Accuracy Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Order Accuracy Trend</h2>
            <div className="mt-3 relative h-44">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
                {[0, 28, 56, 84, 112, 140].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="315" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                {/* Accuracy line */}
                <path
                  d="M 25 80 L 73 72 L 121 66 L 169 58 L 217 50 L 265 44 L 313 35"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2.5"
                />
                <polygon
                  points="25,80 73,72 121,66 169,58 217,50 265,44 313,35 313,140 25,140"
                  fill="url(#accGrad)"
                  opacity="0.15"
                />
                {[[25,80],[73,72],[121,66],[169,58],[217,50],[265,44],[313,35]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#15803D" stroke="#fff" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[10px] mt-2 pt-2 border-t border-gray-100 font-medium">
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> Order Accuracy (%)
              </span>
            </div>
          </div>

          {/* Card 3: Performance Insights */}
          <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">Performance Insights</h2>
              </div>
              <ul className="mt-3 space-y-2 text-[11px] text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>Overall performance at 97.6%</strong> (↑ +2.4 pp).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>SLA compliance at 98.4%</strong>, above target (≥ 98.0%).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>Order accuracy improved to 99.3%</strong> (↑ +0.3 pp).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Average cycle time reduced to <strong>3.6 hrs</strong> (↓ -0.8 hrs).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Dispatch and delivery performance <strong>consistently above 97%</strong>.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-yellow-200/60 flex items-center justify-between text-[10px] text-yellow-800">
              <span>Updated: Just now</span>
              <span className="font-semibold">Next sync: 15 min</span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
