"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Calendar,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function ReportsAndAuditPage() {
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [dailyReportToggle, setDailyReportToggle] = useState(true);
  const [weeklyReportToggle, setWeeklyReportToggle] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const auditLogs = [
    {
      id: 1,
      timestamp: "28 Oct 2026, 10:20 AM",
      user: "Manoj Kumar",
      role: "Warehouse Manager",
      action: "Updated order status",
      actionBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      module: "Orders",
      details: "Order HM-20261028-001 → Packed",
      ip: "192.168.1.24",
    },
    {
      id: 2,
      timestamp: "28 Oct 2026, 10:15 AM",
      user: "Priya S",
      role: "QC Associate",
      action: "Completed inspection",
      actionBadge: "bg-blue-50 text-blue-700 border-blue-200",
      module: "Quality",
      details: "Order HM-20261028-003 → QC Passed",
      ip: "192.168.1.31",
    },
    {
      id: 3,
      timestamp: "28 Oct 2026, 09:58 AM",
      user: "Arjun K",
      role: "Picker",
      action: "Pick list assigned",
      actionBadge: "bg-sky-50 text-sky-700 border-sky-200",
      module: "Picking",
      details: "Wave WV-20261028-014 → Arjun K",
      ip: "192.168.1.29",
    },
    {
      id: 4,
      timestamp: "28 Oct 2026, 09:45 AM",
      user: "Deepak V",
      role: "Inventory Associate",
      action: "Stock movement",
      actionBadge: "bg-amber-50 text-amber-700 border-amber-200",
      module: "Inventory",
      details: "SKU HM-BAG-003 → 📦 BIN A-02 to B-05 (Qty: 20)",
      ip: "192.168.1.18",
    },
    {
      id: 5,
      timestamp: "28 Oct 2026, 09:30 AM",
      user: "Anita S",
      role: "Handover Executive",
      action: "Handover to courier",
      actionBadge: "bg-purple-50 text-purple-700 border-purple-200",
      module: "Courier Handover",
      details: "Order HM-20261028-002 → Blue Dart (AWB: BD987654321)",
      ip: "192.168.1.27",
    },
    {
      id: 6,
      timestamp: "28 Oct 2026, 09:12 AM",
      user: "Vikram D",
      role: "Exceptions Lead",
      action: "Raised exception",
      actionBadge: "bg-rose-50 text-rose-700 border-rose-200",
      module: "Exceptions",
      details: "Order HM-20261028-005 → Damaged Packaging",
      ip: "192.168.1.33",
    },
    {
      id: 7,
      timestamp: "28 Oct 2026, 08:50 AM",
      user: "Neha T",
      role: "Returns Executive",
      action: "Created return",
      actionBadge: "bg-amber-50 text-amber-700 border-amber-200",
      module: "Returns",
      details: "Return RT-20261028-001 → Reason: Wrong Item",
      ip: "192.168.1.36",
    },
    {
      id: 8,
      timestamp: "28 Oct 2026, 08:40 AM",
      user: "Meera Singh",
      role: "Warehouse Manager",
      action: "Generated report",
      actionBadge: "bg-purple-50 text-purple-700 border-purple-200",
      module: "Reports",
      details: "Operational Report (Last 7 Days)",
      ip: "192.168.1.24",
    },
  ];

  return (
    <WarehouseManagerShell pageNumber={11} title="Reports & Audit" currentPath="/warehouse/reports">
      <div className="space-y-6">
        {/* Header matching page_11.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#033129] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Reports & Audit
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Generate operational reports, analyze performance and monitor system audit activities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Schedule Report</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export Data</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards (Exact from page_11.png) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Orders Processed */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">1,250</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Orders Processed</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>12% vs last 7 days</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 12 Q 25 14 40 7 T 60 4" stroke="#10B981" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 2: On-Time Fulfillment */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">98.6%</div>
              <div className="text-xs text-gray-500 font-medium mt-1">On-Time Fulfillment</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-blue-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>1.9% vs last 7 days</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 14 Q 25 12 40 6 T 60 3" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 3: Return Rate */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">0.42%</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Return Rate</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-amber-600">
              <ArrowDownRight className="w-3 h-3" />
              <span>0.18% vs last 7 days</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 4 Q 25 7 40 10 T 60 14" stroke="#F59E0B" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 4: Inventory Accuracy */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">99.3%</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Inventory Accuracy</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-purple-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>0.6% vs last 7 days</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 12 Q 25 10 40 5 T 60 2" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Trend Chart + Donut + Progress Bars + Generate Report Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Trend Chart (Order Processing Trend Last 7 Days) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-3">
              Order Processing Trend (Last 7 Days)
            </h2>
            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 320 140" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="30" y1="20" x2="310" y2="20" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="50" x2="310" y2="50" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="80" x2="310" y2="80" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="110" x2="310" y2="110" stroke="#F1F5F9" strokeDasharray="2,2" />

                <text x="5" y="24" fill="#94A3B8" fontSize="8">1,600</text>
                <text x="5" y="54" fill="#94A3B8" fontSize="8">1,200</text>
                <text x="10" y="84" fill="#94A3B8" fontSize="8">800</text>
                <text x="10" y="114" fill="#94A3B8" fontSize="8">400</text>
                <text x="15" y="135" fill="#94A3B8" fontSize="8">0</text>

                {/* Area under curve */}
                <path
                  d="M40 75 L 85 70 L 130 68 L 175 66 L 220 62 L 265 60 L 305 50 L 305 130 L 40 130 Z"
                  fill="url(#orderGrad)"
                />
                {/* Curve line */}
                <path
                  d="M40 75 L 85 70 L 130 68 L 175 66 L 220 62 L 265 60 L 305 50"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [40, 75], [85, 70], [130, 68], [175, 66], [220, 62], [265, 60], [305, 50]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />
                ))}
              </svg>
              <div className="flex justify-between pl-8 pr-2 text-[9px] text-gray-400 font-medium mt-1">
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

          {/* Operations by Process Donut */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Operations by Process</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Picking 34% = 76.8 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="77 226" strokeDashoffset="0" />
                  {/* Packing 28% = 63.2 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="63 226" strokeDashoffset="-77" />
                  {/* QC 16% = 36 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="36 226" strokeDashoffset="-140" />
                  {/* Handover 12% = 27 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="27 226" strokeDashoffset="-176" />
                  {/* Returns 6% = 13.5 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EC4899" strokeWidth="14" strokeDasharray="14 226" strokeDashoffset="-203" />
                  {/* Exceptions 4% = 9 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#94A3B8" strokeWidth="14" strokeDasharray="9 226" strokeDashoffset="-217" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-gray-900 leading-none">1,250</span>
                  <span className="text-[8px] text-gray-400 font-semibold mt-0.5">Total Orders</span>
                </div>
              </div>

              <div className="w-full space-y-1 text-[11px] mt-1">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Picking
                  </span>
                  <span className="font-bold text-gray-900">34% (425)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Packing
                  </span>
                  <span className="font-bold text-gray-900">28% (350)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Quality Check
                  </span>
                  <span className="font-bold text-gray-900">16% (200)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Handover
                  </span>
                  <span className="font-bold text-gray-900">12% (150)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-pink-500" /> Returns
                  </span>
                  <span className="font-bold text-gray-900">6% (75)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> Exceptions
                  </span>
                  <span className="font-bold text-gray-900">4% (50)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fulfillment Performance Progress Bars */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Fulfillment Performance</h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span className="truncate">Order Processing</span>
                  <span className="font-bold text-gray-900 ml-1">98.6%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full" style={{ width: "98.6%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span className="truncate">Picking</span>
                  <span className="font-bold text-gray-900 ml-1">97.8%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "97.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span className="truncate">Packing</span>
                  <span className="font-bold text-gray-900 ml-1">98.9%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "98.9%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span className="truncate">Quality Check</span>
                  <span className="font-bold text-gray-900 ml-1">99.1%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "99.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-0.5">
                  <span className="truncate">Courier Handover</span>
                  <span className="font-bold text-gray-900 ml-1">97.5%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "97.5%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Generate Report Form */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#087A4A]" />
                <span>Generate Report</span>
              </h2>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">Report Type *</label>
                  <select className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs bg-white text-gray-800">
                    <option>Operational Report</option>
                    <option>Quality Report</option>
                    <option>Audit Log Report</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">Date Range *</label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs bg-white text-gray-800 cursor-pointer">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>Last 7 Days</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">Warehouse</label>
                  <select className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs bg-white text-gray-800">
                    <option>All Warehouses</option>
                    <option>FC-01 Chennai</option>
                    <option>FC-02 Bangalore</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">Format</label>
                  <div className="flex items-center gap-4 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={selectedFormat === "PDF"}
                        onChange={() => setSelectedFormat("PDF")}
                        className="text-[#087A4A] focus:ring-[#087A4A]"
                      />
                      <span className="font-bold text-gray-800">PDF</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={selectedFormat === "Excel"}
                        onChange={() => setSelectedFormat("Excel")}
                        className="text-[#087A4A] focus:ring-[#087A4A]"
                      />
                      <span>Excel</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        checked={selectedFormat === "CSV"}
                        onChange={() => setSelectedFormat("CSV")}
                        className="text-[#087A4A] focus:ring-[#087A4A]"
                      />
                      <span>CSV</span>
                    </label>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 bg-[#087A4A] hover:bg-[#06633B] text-white font-bold rounded-xl text-xs transition shadow-xs">
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>

            {/* Scheduled Reports */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-xs font-bold text-gray-900">Scheduled Reports</h2>
                <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-[11px] leading-tight">Daily Operations Report</p>
                      <p className="text-[10px] text-gray-400">Every day at 08:00 AM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDailyReportToggle(!dailyReportToggle)}
                    className={`w-7 h-4 rounded-full transition-colors p-0.5 ${
                      dailyReportToggle ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      dailyReportToggle ? "translate-x-3" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900 text-[11px] leading-tight">Weekly Performance Report</p>
                      <p className="text-[10px] text-gray-400">Every Monday at 09:00 AM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setWeeklyReportToggle(!weeklyReportToggle)}
                    className={`w-7 h-4 rounded-full transition-colors p-0.5 ${
                      weeklyReportToggle ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      weeklyReportToggle ? "translate-x-3" : ""
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-[280px]">
            {/* Date Range */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Last 7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Report Category */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Warehouse */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Warehouses</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Process Stage */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Stages</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Report Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Audit Log (Recent Activities) Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">
              Audit Log (Recent Activities)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Module</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-gray-400">{log.id}</td>
                    <td className="py-2.5 px-3 text-gray-700 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{log.user}</td>
                    <td className="py-2.5 px-3 text-gray-600">{log.role}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${log.actionBadge}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{log.module}</td>
                    <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{log.details}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[11px] text-gray-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
            <span>Showing 1-8 of 256 audit logs</span>
            <div className="flex items-center gap-2">
              <span>Rows per page</span>
              <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <div className="flex items-center gap-1 ml-2">
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 rounded-lg bg-[#087A4A] text-white font-bold text-xs flex items-center justify-center">
                  1
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  2
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  3
                </button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  26
                </button>
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
