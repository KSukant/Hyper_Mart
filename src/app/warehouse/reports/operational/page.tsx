"use client";

import React, { useState } from "react";
import {
  Package,
  Boxes,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  RotateCw,
  Download,
  Calendar,
  Lightbulb,
  Check,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function OperationalReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedProcess, setSelectedProcess] = useState("All Processes");
  const [selectedCourier, setSelectedCourier] = useState("All Couriers");
  const [selectedShift, setSelectedShift] = useState("All Shifts");

  return (
    <WarehouseManagerShell pageNumber={35} title="Operational Reports" currentPath="/warehouse/reports/operational">
      <div className="space-y-4">
        {/* Top Header Row matching page_35.png */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Operational Reports</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Comprehensive operational insights across orders, processing, fulfillment, and warehouse performance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>
            <button
              onClick={() => alert("Exporting operational report...")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50"
            >
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => alert("Report generated successfully.")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#033129] text-white rounded-lg text-xs font-semibold hover:bg-[#05463b] shadow-2xs transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* 6 KPI Cards matching page_35.png */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1 */}
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Total Orders</span>
              <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">12,846</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↑ +11.8% vs previous 7 days</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Processed Orders</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <Boxes className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">12,210</span>
              <p className="text-[10px] text-blue-700 font-semibold mt-0.5">(95.1%)</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Dispatched Orders</span>
              <div className="w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">11,984</span>
              <p className="text-[10px] text-yellow-700 font-semibold mt-0.5">(93.3%)</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Delivered Orders</span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">11,685</span>
              <p className="text-[10px] text-purple-700 font-semibold mt-0.5">(91.0%)</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Exceptions</span>
              <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">142</span>
              <p className="text-[10px] text-red-600 font-semibold mt-0.5">(1.1%)</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-600">Avg. Cycle Time</span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">3.6 hrs</span>
              <p className="text-[10px] text-green-700 font-semibold mt-0.5">↓ -0.8 hrs</p>
            </div>
          </div>
        </div>

        {/* Filters Bar matching page_35.png */}
        <div className="bg-white border border-gray-200 rounded-xl p-2.5 flex flex-wrap items-center gap-2.5 shadow-2xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, SKU, or Zone..."
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

        {/* Row 1 (3 cols): Order Flow Trend, Order Status Distribution, Process Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Order Flow Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Order Flow Trend (Last 7 Days)</h2>
            <div className="mt-3 relative h-44">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
                {/* Y-axis guidelines */}
                {[0, 28, 56, 84, 112, 140].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="315" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                {/* Orders Received (Green line) */}
                <path
                  d="M 25 110 L 73 95 L 121 82 L 169 70 L 217 62 L 265 50 L 313 40"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
                <polygon
                  points="25,110 73,95 121,82 169,70 217,62 265,50 313,40 313,140 25,140"
                  fill="url(#greenGrad)"
                  opacity="0.15"
                />
                {/* Processed (Yellow line) */}
                <path
                  d="M 25 118 L 73 105 L 121 92 L 169 82 L 217 74 L 265 62 L 313 54"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="2.5"
                />
                {/* Dispatched (Red line) */}
                <path
                  d="M 25 125 L 73 112 L 121 100 L 169 90 L 217 84 L 265 72 L 313 65"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                />
                {/* Dots on points */}
                {[[25,110],[73,95],[121,82],[169,70],[217,62],[265,50],[313,40]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#10B981" stroke="#fff" strokeWidth="1" />
                ))}
                <defs>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Orders Received
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" /> Processed
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Dispatched
              </span>
            </div>
          </div>

          {/* Card 2: Order Status Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Order Status Distribution</h2>
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
                    strokeDashoffset={238.7 * (1 - 0.91)}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.023)}
                    style={{ transform: "rotate(327deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.018)}
                    style={{ transform: "rotate(335deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#EF4444"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.011)}
                    style={{ transform: "rotate(342deg)", transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold text-gray-900">12,846</span>
                  <span className="text-[10px] text-gray-500">Orders</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                  <span className="text-gray-600">Delivered</span>
                  <span className="font-bold text-gray-900 ml-auto">11,685 (91.0%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
                  <span className="text-gray-600">In Transit</span>
                  <span className="font-bold text-gray-900 ml-auto">299 (2.3%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
                  <span className="text-gray-600">Processing</span>
                  <span className="font-bold text-gray-900 ml-auto">226 (1.8%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]" />
                  <span className="text-gray-600">Exceptions</span>
                  <span className="font-bold text-gray-900 ml-auto">142 (1.1%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF]" />
                  <span className="text-gray-600">Pending</span>
                  <span className="font-bold text-gray-900 ml-auto">494 (3.8%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Process Performance (SLA & TAT) */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Process Performance (SLA & TAT)</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Process</th>
                    <th className="pb-1.5">Volume</th>
                    <th className="pb-1.5">SLA Target</th>
                    <th className="pb-1.5">SLA Met</th>
                    <th className="pb-1.5 text-right">Avg. TAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Receiving</td>
                    <td className="py-1.5 text-gray-600">2,620</td>
                    <td className="py-1.5 text-gray-500">≤ 2.0 hrs</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.9%</span></td>
                    <td className="py-1.5 text-right text-gray-800">1.4 hrs</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Putaway</td>
                    <td className="py-1.5 text-gray-600">2,598</td>
                    <td className="py-1.5 text-gray-500">≤ 2.0 hrs</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.6%</span></td>
                    <td className="py-1.5 text-right text-gray-800">1.6 hrs</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Picking</td>
                    <td className="py-1.5 text-gray-600">12,210</td>
                    <td className="py-1.5 text-gray-500">≤ 2.5 hrs</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.8%</span></td>
                    <td className="py-1.5 text-right text-gray-800">2.1 hrs</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Packing</td>
                    <td className="py-1.5 text-gray-600">12,144</td>
                    <td className="py-1.5 text-gray-500">≤ 2.0 hrs</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.1%</span></td>
                    <td className="py-1.5 text-right text-gray-800">1.7 hrs</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">Handover</td>
                    <td className="py-1.5 text-gray-600">11,984</td>
                    <td className="py-1.5 text-gray-500">≤ 1.5 hrs</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">99.2%</span></td>
                    <td className="py-1.5 text-right text-gray-800">1.2 hrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 2 (3 cols): Zone-wise Order Performance, Exception Breakdown, Top Exception SKUs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Zone-wise Order Performance */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Zone-wise Order Performance</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Zone</th>
                    <th className="pb-1.5">Orders</th>
                    <th className="pb-1.5">Processed</th>
                    <th className="pb-1.5">Dispatched</th>
                    <th className="pb-1.5">Delivered</th>
                    <th className="pb-1.5 text-right">Success %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">A - Receiving</td>
                    <td className="py-1.5 text-gray-600">2,420</td>
                    <td className="py-1.5 text-gray-600">2,398</td>
                    <td className="py-1.5 text-gray-600">2,372</td>
                    <td className="py-1.5 text-gray-600">2,312</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">95.5%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">B - Storage</td>
                    <td className="py-1.5 text-gray-600">2,386</td>
                    <td className="py-1.5 text-gray-600">2,347</td>
                    <td className="py-1.5 text-gray-600">2,315</td>
                    <td className="py-1.5 text-gray-600">2,268</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">95.1%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">C - Picking</td>
                    <td className="py-1.5 text-gray-600">3,148</td>
                    <td className="py-1.5 text-gray-600">3,102</td>
                    <td className="py-1.5 text-gray-600">3,071</td>
                    <td className="py-1.5 text-gray-600">2,988</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">94.9%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">D - Packing</td>
                    <td className="py-1.5 text-gray-600">2,654</td>
                    <td className="py-1.5 text-gray-600">2,606</td>
                    <td className="py-1.5 text-gray-600">2,581</td>
                    <td className="py-1.5 text-gray-600">2,529</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">95.3%</span></td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-medium text-gray-800">E - Dispatch</td>
                    <td className="py-1.5 text-gray-600">2,238</td>
                    <td className="py-1.5 text-gray-600">2,211</td>
                    <td className="py-1.5 text-gray-600">2,185</td>
                    <td className="py-1.5 text-gray-600">2,088</td>
                    <td className="py-1.5 text-right"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">93.3%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Exception Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Exception Breakdown (142)</h2>
            <div className="mt-2 flex items-center justify-center gap-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#EF4444"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.268)}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F97316"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.197)}
                    style={{ transform: "rotate(96deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.155)}
                    style={{ transform: "rotate(167deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#A855F7"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.127)}
                    style={{ transform: "rotate(223deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#9CA3AF"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.254)}
                    style={{ transform: "rotate(269deg)", transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold text-gray-900">142</span>
                  <span className="text-[10px] text-gray-500">Exceptions</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]" />
                  <span className="text-gray-600">Address Issue</span>
                  <span className="font-bold text-gray-900 ml-auto">38 (26.8%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#F97316]" />
                  <span className="text-gray-600">Item Mismatch</span>
                  <span className="font-bold text-gray-900 ml-auto">28 (19.7%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
                  <span className="text-gray-600">Damage</span>
                  <span className="font-bold text-gray-900 ml-auto">22 (15.5%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#A855F7]" />
                  <span className="text-gray-600">SLA Breach</span>
                  <span className="font-bold text-gray-900 ml-auto">18 (12.7%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#9CA3AF]" />
                  <span className="text-gray-600">Others</span>
                  <span className="font-bold text-gray-900 ml-auto">36 (25.4%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Top Exception SKUs */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Top Exception SKUs</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">SKU</th>
                    <th className="pb-1.5">Item Name</th>
                    <th className="pb-1.5">Exceptions</th>
                    <th className="pb-1.5 text-right">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-2 font-mono text-gray-700 text-[10px]">HM-SKU-4183</td>
                    <td className="py-2 font-medium text-gray-800">Wireless Earbuds</td>
                    <td className="py-2 text-red-600 font-bold">12</td>
                    <td className="py-2 text-right text-gray-600">8.5%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-gray-700 text-[10px]">HM-SKU-2761</td>
                    <td className="py-2 font-medium text-gray-800">Smart Watch</td>
                    <td className="py-2 text-red-600 font-bold">10</td>
                    <td className="py-2 text-right text-gray-600">7.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-gray-700 text-[10px]">HM-SKU-9930</td>
                    <td className="py-2 font-medium text-gray-800">Phone Charger</td>
                    <td className="py-2 text-red-600 font-bold">9</td>
                    <td className="py-2 text-right text-gray-600">6.3%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-gray-700 text-[10px]">HM-SKU-5542</td>
                    <td className="py-2 font-medium text-gray-800">Bluetooth Speaker</td>
                    <td className="py-2 text-red-600 font-bold">8</td>
                    <td className="py-2 text-right text-gray-600">5.6%</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-gray-700 text-[10px]">HM-SKU-7710</td>
                    <td className="py-2 font-medium text-gray-800">Power Bank</td>
                    <td className="py-2 text-red-600 font-bold">7</td>
                    <td className="py-2 text-right text-gray-600">4.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Row 3 (3 cols): Courier-wise Fulfillment, Operational Metrics Trend, Key Operational Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Card 1: Courier-wise Fulfillment */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Courier-wise Fulfillment</h2>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-1.5">Courier Partner</th>
                    <th className="pb-1.5">Orders</th>
                    <th className="pb-1.5">Dispatched</th>
                    <th className="pb-1.5">Delivered</th>
                    <th className="pb-1.5">Success %</th>
                    <th className="pb-1.5 text-right">Avg. Transit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium text-[10px]">BlueDart</span></td>
                    <td className="py-1.5 text-gray-600">4,102</td>
                    <td className="py-1.5 text-gray-600">4,086</td>
                    <td className="py-1.5 text-gray-600">4,042</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">98.5%</span></td>
                    <td className="py-1.5 text-right text-gray-700">11 min</td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-medium text-[10px]">Delhivery</span></td>
                    <td className="py-1.5 text-gray-600">3,248</td>
                    <td className="py-1.5 text-gray-600">3,210</td>
                    <td className="py-1.5 text-gray-600">3,135</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.7%</span></td>
                    <td className="py-1.5 text-right text-gray-700">13 min</td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 font-medium text-[10px]">Ekart</span></td>
                    <td className="py-1.5 text-gray-600">2,184</td>
                    <td className="py-1.5 text-gray-600">2,162</td>
                    <td className="py-1.5 text-gray-600">2,105</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.4%</span></td>
                    <td className="py-1.5 text-right text-gray-700">14 min</td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-medium text-[10px]">Shadowfax</span></td>
                    <td className="py-1.5 text-gray-600">1,836</td>
                    <td className="py-1.5 text-gray-600">1,812</td>
                    <td className="py-1.5 text-gray-600">1,760</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">97.1%</span></td>
                    <td className="py-1.5 text-right text-gray-700">12 min</td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-medium text-[10px]">Aramex</span></td>
                    <td className="py-1.5 text-gray-600">1,014</td>
                    <td className="py-1.5 text-gray-600">996</td>
                    <td className="py-1.5 text-gray-600">962</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">96.6%</span></td>
                    <td className="py-1.5 text-right text-gray-700">10 min</td>
                  </tr>
                  <tr>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium text-[10px]">Others</span></td>
                    <td className="py-1.5 text-gray-600">462</td>
                    <td className="py-1.5 text-gray-600">461</td>
                    <td className="py-1.5 text-gray-600">438</td>
                    <td className="py-1.5"><span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">95.0%</span></td>
                    <td className="py-1.5 text-right text-gray-700">13 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Operational Metrics Trend */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">Operational Metrics Trend</h2>
            <div className="mt-3 relative h-44">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
                {/* Guidelines */}
                {[0, 28, 56, 84, 112, 140].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="315" y2={y} stroke="#F3F4F6" strokeDasharray="2,2" strokeWidth="1" />
                ))}
                {/* Bars for throughput */}
                {[
                  { x: 30, h: 65 },
                  { x: 74, h: 72 },
                  { x: 118, h: 78 },
                  { x: 162, h: 86 },
                  { x: 206, h: 92 },
                  { x: 250, h: 100 },
                  { x: 294, h: 110 },
                ].map((bar, i) => (
                  <rect
                    key={i}
                    x={bar.x}
                    y={140 - bar.h}
                    width="16"
                    height={bar.h}
                    rx="3"
                    fill="#DCFCE7"
                  />
                ))}
                {/* Success rate line */}
                <path
                  d="M 38 65 L 82 58 L 126 50 L 170 45 L 214 42 L 258 38 L 302 32"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2.5"
                />
                {[[38,65],[82,58],[126,50],[170,45],[214,42],[258,38],[302,32]].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#15803D" stroke="#fff" strokeWidth="1" />
                ))}
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
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DCFCE7]" /> Throughput (Orders)
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" /> Success Rate (%)
              </span>
            </div>
          </div>

          {/* Card 3: Key Operational Insights */}
          <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-700">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">Key Operational Insights</h2>
              </div>
              <ul className="mt-3 space-y-2 text-[11px] text-gray-700 leading-relaxed font-medium">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>91.0% orders delivered</strong> (↑ +2.2 pp vs last week).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>Exceptions at 1.1%</strong> (↓ -0.4 pp).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>Packing and Handover</strong> met SLA &gt; 98%.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span><strong>Zone C (Picking)</strong> has highest volume (24.5%).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-700 font-bold">✓</span>
                  <span>Overall avg. cycle time improved to <strong>3.6 hrs</strong> (↓ -0.8 hrs).</span>
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
