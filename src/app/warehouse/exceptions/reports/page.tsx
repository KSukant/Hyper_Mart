"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Download,
  Calendar,
  Layers,
  TrendingUp,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function ExceptionReportsPage() {
  return (
    <WarehouseManagerShell
      pageTitle="Exception Reports"
      pageDescription="Analyze exception trends, resolution performance, SLA compliance, and operational impact."
      currentPath="/warehouse/exceptions/reports"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/exceptions" className="hover:text-[#087A4A]">Exceptions</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Exception Reports</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Exception Reports</h1>
            <p className="text-xs text-[#5B7564]">
              Analyze exception trends, resolution performance, SLA compliance, and operational impact.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B7564]" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 26 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Exceptions */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Exceptions</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">426</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +8.7% vs previous 7 days
              </div>
            </div>
          </div>

          {/* Resolved Exceptions */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Resolved Exceptions</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">294</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (69.0%)
              </div>
            </div>
          </div>

          {/* Avg. Resolution Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Resolution Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">1.6 Hours</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -0.5 Hours
              </div>
            </div>
          </div>

          {/* SLA Compliance */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">SLA Compliance</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">92.9%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +2.4 pp
              </div>
            </div>
          </div>

          {/* Breached SLA */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Breached SLA</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">21</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (4.9%)
              </div>
            </div>
          </div>

          {/* Open Exceptions */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Layers className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Open Exceptions</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">132</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (31.0%)
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 1: Exception Trend + Outcome Distribution + Type Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Exception Trend (Last 7 Days) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-[#033129] text-xs">Exception Trend (Last 7 Days)</h3>
              <div className="h-44 relative mt-3 flex items-end justify-between px-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120">
                  <line x1="20" y1="20" x2="240" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="24" className="text-[9px] fill-[#7A9385]">120</text>
                  <line x1="20" y1="40" x2="240" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="44" className="text-[9px] fill-[#7A9385]">100</text>
                  <line x1="20" y1="60" x2="240" y2="60" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="64" className="text-[9px] fill-[#7A9385]">80</text>
                  <line x1="20" y1="80" x2="240" y2="80" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="84" className="text-[9px] fill-[#7A9385]">60</text>
                  <line x1="20" y1="100" x2="240" y2="100" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="104" className="text-[9px] fill-[#7A9385]">40</text>
                  <line x1="20" y1="118" x2="240" y2="118" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="118" className="text-[9px] fill-[#7A9385]">0</text>

                  {/* Red Area (Total Exceptions) */}
                  <polygon
                    fill="#FFEBEE"
                    fillOpacity="0.5"
                    points="30,118 30,80 60,70 95,68 130,60 165,55 200,48 230,42 230,118"
                  />
                  <polyline
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="2.5"
                    points="30,80 60,70 95,68 130,60 165,55 200,48 230,42"
                  />
                  {[
                    [30, 80], [60, 70], [95, 68], [130, 60], [165, 55], [200, 48], [230, 42]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#D32F2F" />
                  ))}

                  {/* Green line (Resolved) */}
                  <polyline
                    fill="none"
                    stroke="#2E7D32"
                    strokeWidth="2"
                    points="30,95 60,88 95,85 130,78 165,72 200,68 230,62"
                  />
                  {[
                    [30, 95], [60, 88], [95, 85], [130, 78], [165, 72], [200, 68], [230, 62]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#2E7D32" />
                  ))}

                  {/* Yellow line (Open) */}
                  <polyline
                    fill="none"
                    stroke="#FFA000"
                    strokeWidth="2"
                    points="30,105 60,102 95,103 130,100 165,98 200,97 230,95"
                  />
                  {[
                    [30, 105], [60, 102], [95, 103], [130, 100], [165, 98], [200, 97], [230, 95]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#FFA000" />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between text-[9px] text-[#7A9385] mt-2 px-3">
                <span>Oct 23</span>
                <span>Oct 24</span>
                <span>Oct 25</span>
                <span>Oct 26</span>
                <span>Oct 27</span>
                <span>Oct 28</span>
                <span>Oct 29</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2 border-t border-[#EDF2EE] text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" /> Total Exceptions
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> Resolved
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Open
              </span>
            </div>
          </div>

          {/* Chart 2: Exception Outcome Distribution - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Exception Outcome Distribution</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Resolved 69.0% (green) */}
                  <path
                    className="text-[#2E7D32]"
                    strokeDasharray="69, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Open 31.0% (yellow) */}
                  <path
                    className="text-[#FFA000]"
                    strokeDasharray="31, 100"
                    strokeDashoffset="-69"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#033129] leading-none">426</span>
                  <span className="text-[10px] text-[#5B7564] font-semibold mt-0.5">Exceptions</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Resolved
                </span>
                <span className="font-bold text-[#033129]">294 (69.0%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> Open
                </span>
                <span className="font-bold text-[#033129]">132 (31.0%)</span>
              </div>
            </div>
          </div>

          {/* Chart 3: Exception Type Breakdown - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Exception Type Breakdown</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Picking</span>
                  <span className="font-bold text-[#033129]">24.4% (104)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#D32F2F]" style={{ width: "24.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Packing</span>
                  <span className="font-bold text-[#033129]">18.8% (80)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#E65100]" style={{ width: "18.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Quality</span>
                  <span className="font-bold text-[#033129]">15.0% (64)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFA000]" style={{ width: "15.0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Inventory</span>
                  <span className="font-bold text-[#033129]">12.9% (55)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFD54F]" style={{ width: "12.9%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Returns</span>
                  <span className="font-bold text-[#033129]">10.6% (45)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFE082]" style={{ width: "10.6%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Order</span>
                  <span className="font-bold text-[#033129]">7.5% (32)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#CFD8DC]" style={{ width: "7.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Courier</span>
                  <span className="font-bold text-[#033129]">5.6% (24)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#B0BEC5]" style={{ width: "5.6%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Other</span>
                  <span className="font-bold text-[#033129]">5.2% (22)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#90A4AE]" style={{ width: "5.2%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 2: Performance by Zone + SLA Compliance + Resolution Time */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table: Exception Performance by Zone - 6 cols */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Exception Performance by Zone</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                  <tr>
                    <th className="py-2 px-3">Zone</th>
                    <th className="py-2 px-3">Total</th>
                    <th className="py-2 px-3">Resolved</th>
                    <th className="py-2 px-3">Open</th>
                    <th className="py-2 px-3">Resolution Rate</th>
                    <th className="py-2 px-3">Avg. TAT</th>
                    <th className="py-2 px-3">SLA Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {[
                    { zone: "Aisle A", total: 82, res: 58, open: 24, rate: "70.7%", tat: "1.5 Hours", sla: "93.9%" },
                    { zone: "Aisle B", total: 76, res: 54, open: 22, rate: "71.1%", tat: "1.6 Hours", sla: "92.1%" },
                    { zone: "Aisle C", total: 69, res: 47, open: 22, rate: "68.1%", tat: "1.7 Hours", sla: "91.3%" },
                    { zone: "Aisle D", total: 62, res: 43, open: 19, rate: "69.4%", tat: "1.8 Hours", sla: "92.0%" },
                    { zone: "Aisle E", total: 58, res: 40, open: 18, rate: "69.0%", tat: "1.6 Hours", sla: "93.3%" },
                    { zone: "QC Zone", total: 79, res: 52, open: 27, rate: "65.8%", tat: "1.9 Hours", sla: "91.5%" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9FCFA]">
                      <td className="py-2 px-3 font-bold text-[#033129] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                        {row.zone}
                      </td>
                      <td className="py-2 px-3">{row.total}</td>
                      <td className="py-2 px-3 text-[#2E7D32] font-semibold">{row.res}</td>
                      <td className="py-2 px-3 text-[#FFA000]">{row.open}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                          {row.rate}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[#5B7564]">{row.tat}</td>
                      <td className="py-2 px-3 font-semibold text-[#033129]">{row.sla}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Widget 2: SLA Compliance - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">SLA Compliance</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#2E7D32]"
                    strokeDasharray="92.9, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#D32F2F]"
                    strokeDasharray="7.1, 100"
                    strokeDashoffset="-92.9"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-[#033129] leading-none">92.9%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Within SLA</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Within SLA
                </span>
                <span className="font-bold text-[#033129]">396 (92.9%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Breached
                </span>
                <span className="font-bold text-[#D32F2F]">21 (4.9%)</span>
              </div>
            </div>
          </div>

          {/* Widget 3: Resolution Time Distribution - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Resolution Time Distribution</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">≤ 30 min</span>
                  <span className="font-bold text-[#033129]">76 (17.8%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "17.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">31 – 60 min</span>
                  <span className="font-bold text-[#033129]">124 (29.1%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "29.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">1 – 2 hrs</span>
                  <span className="font-bold text-[#033129]">148 (34.7%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "34.7%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">2 – 4 hrs</span>
                  <span className="font-bold text-[#033129]">62 (14.6%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "14.6%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">&gt; 4 hrs</span>
                  <span className="font-bold text-[#033129]">16 (3.8%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#E8F5E9]" style={{ width: "3.8%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Top Exception Reasons + Funnel + Resolution Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table: Top Exception Reasons (426) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Top Exception Reasons (426)</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Reason</th>
                  <th className="py-2 px-3">Count</th>
                  <th className="py-2 px-3">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { reason: "Item not found", count: 78, share: "18.3%" },
                  { reason: "Wrong item packed", count: 56, share: "13.1%" },
                  { reason: "Item failed QC", count: 52, share: "12.2%" },
                  { reason: "Stock variance", count: 48, share: "11.3%" },
                  { reason: "Order mismatch (Qty)", count: 40, share: "9.4%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-2 px-3">{row.reason}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FFEBEE] text-[#D32F2F]">
                        {row.count}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[#5B7564]">{row.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Funnel: Resolution Funnel - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Resolution Funnel</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Total Exceptions</span>
                  <span className="font-bold text-[#033129]">426 (100.0%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#1B5E20] overflow-hidden" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Triage & Assigned</span>
                  <span className="font-bold text-[#033129]">394 (92.5%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "92.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">In Progress</span>
                  <span className="font-bold text-[#033129]">344 (80.8%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "80.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Resolved</span>
                  <span className="font-bold text-[#033129]">294 (69.0%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "69.0%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Chart: Resolution Trend & SLA Compliance - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Resolution Trend & SLA Compliance</h3>
            <div className="h-28 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                <line x1="0" y1="20" x2="200" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="#F0F4F1" strokeWidth="1" />

                {/* Yellow line (SLA Compliance ~95%) */}
                <polyline
                  fill="none"
                  stroke="#FFA000"
                  strokeWidth="2.5"
                  points="10,32 40,30 70,28 100,26 130,24 160,22 190,22"
                />
                {[
                  [10, 32], [40, 30], [70, 28], [100, 26], [130, 24], [160, 22], [190, 22]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#FFA000" />
                ))}

                {/* Green line (Resolution Rate ~90%) */}
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,48 40,46 70,44 100,42 130,38 160,36 190,32"
                />
                {[
                  [10, 48], [40, 46], [70, 44], [100, 42], [130, 38], [160, 36], [190, 32]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#2E7D32" />
                ))}
              </svg>
            </div>

            <div className="flex justify-between text-[9px] text-[#7A9385] mt-1 px-1">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>

            <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> Resolution Rate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> SLA Compliance
              </span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
