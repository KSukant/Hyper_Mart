"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Search,
  Download,
  Eye,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function StockTakePage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const stockTakes = [
    {
      id: "ST-20261029-001",
      location: "Aisle A",
      type: "Cycle Count",
      scheduledDate: "29 Oct 2026",
      startedAt: "10:05 AM",
      completedAt: "—",
      itemsCount: "520",
      variance: "—",
      status: "In Progress",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "ST-20261027-004",
      location: "Aisle B",
      type: "Full Count",
      scheduledDate: "27 Oct 2026",
      startedAt: "09:20 AM",
      completedAt: "04:35 PM",
      itemsCount: "1,248",
      variance: "0.6%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "ST-20261025-003",
      location: "Aisle C",
      type: "Cycle Count",
      scheduledDate: "25 Oct 2026",
      startedAt: "11:10 AM",
      completedAt: "03:40 PM",
      itemsCount: "638",
      variance: "1.2%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "ST-20261022-002",
      location: "Aisle D",
      type: "Full Count",
      scheduledDate: "22 Oct 2026",
      startedAt: "09:00 AM",
      completedAt: "04:50 PM",
      itemsCount: "1,580",
      variance: "0.4%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "ST-20261020-003",
      location: "Bulk Zone",
      type: "Cycle Count",
      scheduledDate: "20 Oct 2026",
      startedAt: "02:15 PM",
      completedAt: "—",
      itemsCount: "312",
      variance: "—",
      status: "In Progress",
      statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "ST-20261018-001",
      location: "Return Zone",
      type: "Spot Count",
      scheduledDate: "18 Oct 2026",
      startedAt: "10:00 AM",
      completedAt: "11:35 AM",
      itemsCount: "186",
      variance: "0.0%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "ST-20261015-002",
      location: "Aisle E",
      type: "Cycle Count",
      scheduledDate: "15 Oct 2026",
      startedAt: "09:40 AM",
      completedAt: "12:20 PM",
      itemsCount: "470",
      variance: "0.5%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "ST-20261012-001",
      location: "Aisle A",
      type: "Full Count",
      scheduledDate: "12 Oct 2026",
      startedAt: "09:00 AM",
      completedAt: "05:10 PM",
      itemsCount: "1,264",
      variance: "1.4%",
      status: "Completed",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === stockTakes.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(stockTakes.map((s) => s.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={13} title="Stock Take" currentPath="/warehouse/inventory/stock-take">
      <div className="space-y-6">
        {/* Header matching page_13.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Stock Take
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Conduct and manage physical stock counting, verification and variance reconciliation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Stock Take</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_13.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Stock Takes */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Stock Takes</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">12</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +20.0% vs last 30 days
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-blue-600" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">In Progress</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">4</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">
              Active counting
            </div>
          </div>

          {/* Card 3: Completed */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Completed</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">6</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">
              Reconciled cycles
            </div>
          </div>

          {/* Card 4: Variance */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Variance</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">0.8%</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">
              Tolerance &lt; 1.0%
            </div>
          </div>

          {/* Card 5: Next Scheduled */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Next Scheduled</div>
              <div className="text-lg font-black text-gray-900 leading-none mt-1">02 Nov 2026</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">
              Aisle F full count
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Stock Take ID, Location or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Locations</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Types</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Status</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>Last 30 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === stockTakes.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                    />
                  </th>
                  <th className="py-2.5 px-3">Stock Take ID</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Scheduled Date</th>
                  <th className="py-2.5 px-3">Started At</th>
                  <th className="py-2.5 px-3">Completed At</th>
                  <th className="py-2.5 px-3">Items Count</th>
                  <th className="py-2.5 px-3">Variance</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {stockTakes.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(s.id)}
                        onChange={() => toggleSelectRow(s.id)}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{s.id}</td>
                    <td className="py-2.5 px-3 text-gray-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>{s.location}</span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{s.type}</td>
                    <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{s.scheduledDate}</td>
                    <td className="py-2.5 px-3 text-gray-600">{s.startedAt}</td>
                    <td className="py-2.5 px-3 text-gray-600">{s.completedAt}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{s.itemsCount}</td>
                    <td className={`py-2.5 px-3 font-bold ${
                      s.variance === "—"
                        ? "text-gray-400"
                        : parseFloat(s.variance) > 1.0
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}>
                      {s.variance}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.statusBadge}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-2xs">
                        <Eye className="w-3 h-3 text-gray-500" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row: Trend + Result Summary + Top Variance by Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Stock Take Trend (Last 30 Days) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-3">Stock Take Trend (Last 30 Days)</h2>
            <div className="h-40 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 360 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="25" y1="15" x2="350" y2="15" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="38" x2="350" y2="38" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="61" x2="350" y2="61" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="84" x2="350" y2="84" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="107" x2="350" y2="107" stroke="#F1F5F9" strokeDasharray="2,2" />

                <text x="5" y="18" fill="#94A3B8" fontSize="8">10</text>
                <text x="10" y="41" fill="#94A3B8" fontSize="8">8</text>
                <text x="10" y="64" fill="#94A3B8" fontSize="8">6</text>
                <text x="10" y="87" fill="#94A3B8" fontSize="8">4</text>
                <text x="10" y="110" fill="#94A3B8" fontSize="8">2</text>
                <text x="10" y="125" fill="#94A3B8" fontSize="8">0</text>

                {/* Area and Line */}
                <path
                  d="M35 102 L 85 80 L 135 68 L 185 70 L 235 84 L 285 60 L 335 40 L 335 125 L 35 125 Z"
                  fill="url(#trendGrad)"
                />
                <path
                  d="M35 102 L 85 80 L 135 68 L 185 70 L 235 84 L 285 60 L 335 40"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [35, 102], [85, 80], [135, 68], [185, 70], [235, 84], [285, 60], [335, 40]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />
                ))}
              </svg>
              <div className="flex justify-between pl-7 pr-2 text-[9px] text-gray-400 font-medium mt-1">
                <span>01 Oct</span>
                <span>05 Oct</span>
                <span>10 Oct</span>
                <span>15 Oct</span>
                <span>20 Oct</span>
                <span>25 Oct</span>
                <span>30 Oct</span>
              </div>
            </div>
          </div>

          {/* Result Summary Donut */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Result Summary</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Completed 50% = 113 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="113 226" strokeDashoffset="0" />
                  {/* In Progress 33.3% = 75 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="75 226" strokeDashoffset="-113" />
                  {/* Planned 16.7% = 38 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="38 226" strokeDashoffset="-188" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-gray-900 leading-none">12</span>
                  <span className="text-[8px] text-gray-400 font-semibold mt-0.5">Stock Takes</span>
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs mt-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Completed
                  </span>
                  <span className="font-bold text-gray-900">6 (50.0%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> In Progress
                  </span>
                  <span className="font-bold text-gray-900">4 (33.3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Planned
                  </span>
                  <span className="font-bold text-gray-900">2 (16.7%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Variance by Location */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-3">Top Variance by Location</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-gray-400 border-b border-gray-100 font-semibold">
                  <tr>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Variance</th>
                    <th className="pb-2 text-right">Items Affected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="py-2.5 text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>Aisle E</span>
                    </td>
                    <td className="py-2.5 font-bold text-rose-600">1.4%</td>
                    <td className="py-2.5 text-right font-bold text-gray-900">18</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>Aisle C</span>
                    </td>
                    <td className="py-2.5 font-bold text-rose-600">1.2%</td>
                    <td className="py-2.5 text-right font-bold text-gray-900">14</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>Aisle B</span>
                    </td>
                    <td className="py-2.5 font-bold text-emerald-600">0.6%</td>
                    <td className="py-2.5 text-right font-bold text-gray-900">8</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span>Aisle A</span>
                    </td>
                    <td className="py-2.5 font-bold text-emerald-600">0.5%</td>
                    <td className="py-2.5 text-right font-bold text-gray-900">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
