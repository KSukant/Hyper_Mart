"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Trash2,
  Calendar,
  Download,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function QualityReportsPage() {
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedType, setSelectedType] = useState("All Inspection Types");

  const performanceRows = [
    { zone: "Aisle A", type: "Incoming QC", inspected: 584, passed: 535, rejected: 49, rate: "8.4%", reworked: 32, disposed: 17 },
    { zone: "Aisle B", type: "Incoming QC", inspected: 612, passed: 563, rejected: 49, rate: "8.0%", reworked: 34, disposed: 15 },
    { zone: "Aisle C", type: "Pre-Dispatch QC", inspected: 478, passed: 438, rejected: 40, rate: "8.4%", reworked: 26, disposed: 14 },
    { zone: "Aisle D", type: "Incoming QC", inspected: 526, passed: 480, rejected: 46, rate: "8.7%", reworked: 30, disposed: 16 },
    { zone: "Aisle E", type: "Pre-Dispatch QC", inspected: 459, passed: 423, rejected: 36, rate: "7.8%", reworked: 24, disposed: 12 },
    { zone: "Bulk Zone", type: "Returns QC", inspected: 1183, passed: 1078, rejected: 105, rate: "8.9%", reworked: 66, disposed: 39 },
  ];

  return (
    <WarehouseManagerShell pageNumber={20} title="Quality Reports" currentPath="/warehouse/quality/reports">
      <div className="space-y-6">
        {/* Header matching page_21.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Quality Reports
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Analyze quality performance, defect trends, rejection rates, and inspection outcomes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-2xs cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_21.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Inspections */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Inspections</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">3,842</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +11.4% vs previous 7 days
            </div>
          </div>

          {/* Card 2: Passed Items */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Passed Items</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">3,517</div>
            </div>
            <div className="text-[11px] font-medium text-gray-500 mt-2">(91.5%)</div>
          </div>

          {/* Card 3: Rejected Items */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Rejected Items</div>
              <div className="text-2xl font-black text-amber-600 leading-none mt-1">325</div>
            </div>
            <div className="text-[11px] font-medium text-gray-500 mt-2">(8.5%)</div>
          </div>

          {/* Card 4: Reworked Items */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Reworked Items</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">212</div>
            </div>
            <div className="text-[11px] font-medium text-gray-500 mt-2">(65.2% of rejections)</div>
          </div>

          {/* Card 5: Disposed Items */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Disposed Items</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">113</div>
            </div>
            <div className="text-[11px] font-medium text-gray-500 mt-2">(34.8% of rejections)</div>
          </div>
        </div>

        {/* Row 2: Trend Chart + Inspection Outcome Donut + Top Defect Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Rejection Rate Trend (Last 7 Days) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-3">
              Rejection Rate Trend (Last 7 Days)
            </h2>
            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 300 130" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rejectionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="25" y1="20" x2="290" y2="20" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="45" x2="290" y2="45" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="70" x2="290" y2="70" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="95" x2="290" y2="95" stroke="#F1F5F9" strokeDasharray="2,2" />

                <text x="5" y="24" fill="#94A3B8" fontSize="8">12%</text>
                <text x="5" y="49" fill="#94A3B8" fontSize="8">10%</text>
                <text x="10" y="74" fill="#94A3B8" fontSize="8">8%</text>
                <text x="10" y="99" fill="#94A3B8" fontSize="8">6%</text>
                <text x="10" y="118" fill="#94A3B8" fontSize="8">4%</text>

                <path
                  d="M35 105 L 75 92 L 115 98 L 155 90 L 195 82 L 235 76 L 275 62 L 275 125 L 35 125 Z"
                  fill="url(#rejectionGrad)"
                />
                <path
                  d="M35 105 L 75 92 L 115 98 L 155 90 L 195 82 L 235 76 L 275 62"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [35, 105], [75, 92], [115, 98], [155, 90], [195, 82], [235, 76], [275, 62]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#EF4444" />
                ))}
              </svg>
              <div className="flex justify-between pl-7 pr-1 text-[8px] text-gray-400 font-medium mt-1">
                <span>Oct 23</span>
                <span>Oct 24</span>
                <span>Oct 25</span>
                <span>Oct 26</span>
                <span>Oct 27</span>
                <span>Oct 28</span>
                <span>Oct 29</span>
              </div>
            </div>
          </div>

          {/* Inspection Outcome Donut */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Inspection Outcome</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Passed 91.5% = 206.8 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="207 226" strokeDashoffset="0" />
                  {/* Rejected 8.5% = 19.2 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="19 226" strokeDashoffset="-207" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-none">3,842</span>
                  <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Items</span>
                </div>
              </div>

              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Passed
                  </span>
                  <span className="font-bold text-gray-900">3,517 (91.5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Rejected
                  </span>
                  <span className="font-bold text-gray-900">325 (8.5%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Defect Reasons (325) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Top Defect Reasons (325)</h2>
            <div className="space-y-2 text-xs">
              {[
                { reason: "Material Defect", count: "28.6% (93)", bar: "28.6%", color: "bg-rose-500" },
                { reason: "Damaged Item", count: "20.3% (66)", bar: "20.3%", color: "bg-amber-500" },
                { reason: "Functional Defect", count: "14.2% (46)", bar: "14.2%", color: "bg-amber-400" },
                { reason: "Size Mismatch", count: "11.4% (37)", bar: "11.4%", color: "bg-amber-300" },
                { reason: "Quality Not Standard", count: "8.6% (28)", bar: "8.6%", color: "bg-amber-200" },
                { reason: "Other", count: "16.9% (55)", bar: "16.9%", color: "bg-slate-300" },
              ].map((d) => (
                <div key={d.reason} className="flex items-center justify-between gap-2">
                  <span className="text-gray-700 w-32 truncate">{d.reason}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: d.bar }} />
                  </div>
                  <span className="font-bold text-gray-900 text-[11px] w-20 text-right">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Quality Performance by Zone & Inspection Type + Report Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Table: 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="p-3.5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xs font-bold text-gray-900">
                Quality Performance by Zone & Inspection Type
              </h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700"
                >
                  <option>All Zones</option>
                  <option>Aisle A</option>
                  <option>Aisle B</option>
                  <option>Bulk Zone</option>
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700"
                >
                  <option>All Inspection Types</option>
                  <option>Incoming QC</option>
                  <option>Pre-Dispatch QC</option>
                  <option>Returns QC</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Zone</th>
                    <th className="py-2.5 px-3">Inspection Type</th>
                    <th className="py-2.5 px-3">Inspected</th>
                    <th className="py-2.5 px-3">Passed</th>
                    <th className="py-2.5 px-3">Rejected</th>
                    <th className="py-2.5 px-3">Rejection Rate</th>
                    <th className="py-2.5 px-3">Reworked</th>
                    <th className="py-2.5 px-3 text-right">Disposed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {performanceRows.map((p) => (
                    <tr key={p.zone} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3 flex items-center gap-1.5 font-bold text-gray-900">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> {p.zone}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{p.type}</td>
                      <td className="py-2.5 px-3 text-gray-900 font-bold">{p.inspected}</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-bold">{p.passed}</td>
                      <td className="py-2.5 px-3 text-rose-600 font-bold">{p.rejected}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {p.rate}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{p.reworked}</td>
                      <td className="py-2.5 px-3 text-right text-gray-700">{p.disposed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Report Summary: 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-3">Report Summary</h2>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Overall Rejection Rate</span>
                <span className="font-bold text-gray-900">
                  8.5% <span className="text-rose-600 font-semibold text-[11px]">↑ (+0.6 pp)</span>
                </span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Rework Rate (of Rejections)</span>
                <span className="font-bold text-gray-900">65.2%</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Disposal Rate (of Rejections)</span>
                <span className="font-bold text-gray-900">34.8%</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Quality Pass Rate</span>
                <span className="font-bold text-gray-900">
                  91.5% <span className="text-emerald-600 font-semibold text-[11px]">↑ (+0.6 pp)</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-gray-600 font-bold">Total Quality Cost (Est.)</span>
                <span className="font-bold text-gray-900">
                  ₹42,600 <span className="text-emerald-600 font-semibold text-[11px]">↓ (-11.2%)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
