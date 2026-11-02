"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Calendar,
  Layers,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function ReturnReportsPage() {
  const [dateRange, setDateRange] = useState("Oct 23, 2026 – Oct 29, 2026");

  return (
    <WarehouseManagerShell
      pageTitle="Return Reports"
      pageDescription="Analyze return trends, reasons, refund/replacement performance, SLA adherence, and financial impact."
      currentPath="/warehouse/returns/reports"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/returns/inspect-approve" className="hover:text-[#087A4A]">Returns</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Return Reports</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Return Reports</h1>
            <p className="text-xs text-[#5B7564]">
              Analyze return trends, reasons, refund/replacement performance, SLA adherence, and financial impact.
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

        {/* 6 KPI Metric Cards (Page 24 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Returns */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Returns</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">426</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +12.6% vs previous 7 days
              </div>
            </div>
          </div>

          {/* Approved Returns */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Approved Returns</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">326</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (76.5%)
              </div>
            </div>
          </div>

          {/* Total Refunds */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17] font-black">
              ₹
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Refunds</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">₹2,34,312</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* Total Replacements */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Replacements</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">₹2,63,939</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1 opacity-0">.</div>
            </div>
          </div>

          {/* Rejected Returns */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Rejected Returns</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">48</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (11.3%)
              </div>
            </div>
          </div>

          {/* Avg. Resolution Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Resolution Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">1.8 Days</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -0.4 Days
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 1: Return Trend + Outcome Distribution + Top Return Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Return Trend (Last 7 Days) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-[#033129] text-xs">Return Trend (Last 7 Days)</h3>
              <div className="h-44 relative mt-3 flex items-end justify-between px-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120">
                  {/* Grid lines & scale */}
                  <line x1="20" y1="20" x2="240" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="24" className="text-[9px] fill-[#7A9385]">60</text>
                  <line x1="20" y1="40" x2="240" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="44" className="text-[9px] fill-[#7A9385]">50</text>
                  <line x1="20" y1="60" x2="240" y2="60" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="64" className="text-[9px] fill-[#7A9385]">40</text>
                  <line x1="20" y1="80" x2="240" y2="80" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="84" className="text-[9px] fill-[#7A9385]">30</text>
                  <line x1="20" y1="100" x2="240" y2="100" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="104" className="text-[9px] fill-[#7A9385]">20</text>
                  <line x1="20" y1="118" x2="240" y2="118" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="118" className="text-[9px] fill-[#7A9385]">0</text>

                  {/* Red Area & Polyline (Total Returns) */}
                  <polygon
                    fill="#FFEBEE"
                    fillOpacity="0.6"
                    points="30,118 30,100 60,88 95,90 130,80 165,72 200,68 230,58 230,118"
                  />
                  <polyline
                    fill="none"
                    stroke="#D32F2F"
                    strokeWidth="2.5"
                    points="30,100 60,88 95,90 130,80 165,72 200,68 230,58"
                  />
                  {[
                    [30, 100], [60, 88], [95, 90], [130, 80], [165, 72], [200, 68], [230, 58]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#D32F2F" />
                  ))}

                  {/* Yellow Line (Replacements) */}
                  <polyline
                    fill="none"
                    stroke="#FFA000"
                    strokeWidth="2"
                    points="30,108 60,104 95,102 130,98 165,94 200,90 230,88"
                  />

                  {/* Red/Brown line (Refunds) */}
                  <polyline
                    fill="none"
                    stroke="#B71C1C"
                    strokeWidth="2"
                    points="30,114 60,110 95,112 130,108 165,106 200,104 230,100"
                  />
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
                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" /> Total Returns
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Replacements
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#B71C1C]" /> Refunds
              </span>
            </div>
          </div>

          {/* Chart 2: Return Outcome Distribution - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Return Outcome Distribution</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#2E7D32]"
                    strokeDasharray="76.5, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#FFA000]"
                    strokeDasharray="12.2, 100"
                    strokeDashoffset="-76.5"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#D32F2F]"
                    strokeDasharray="11.3, 100"
                    strokeDashoffset="-88.7"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#033129] leading-none">426</span>
                  <span className="text-[10px] text-[#5B7564] font-semibold mt-0.5">Returns</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Approved
                </span>
                <span className="font-bold text-[#033129]">326 (76.5%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> Pending
                </span>
                <span className="font-bold text-[#033129]">52 (12.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Rejected
                </span>
                <span className="font-bold text-[#033129]">48 (11.3%)</span>
              </div>
            </div>
          </div>

          {/* Chart 3: Top Return Reasons (426) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Top Return Reasons (426)</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Damaged Item</span>
                  <span className="font-bold text-[#033129]">27.5% (117)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#D32F2F]" style={{ width: "27.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Wrong Item</span>
                  <span className="font-bold text-[#033129]">18.8% (80)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#E65100]" style={{ width: "18.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Defective</span>
                  <span className="font-bold text-[#033129]">16.4% (70)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFA000]" style={{ width: "16.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Size Issue</span>
                  <span className="font-bold text-[#033129]">12.0% (51)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFD54F]" style={{ width: "12%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Changed Mind</span>
                  <span className="font-bold text-[#033129]">9.9% (42)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#FFE082]" style={{ width: "9.9%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Not as Described</span>
                  <span className="font-bold text-[#033129]">8.5% (36)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#CFD8DC]" style={{ width: "8.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Other</span>
                  <span className="font-bold text-[#033129]">6.9% (30)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#B0BEC5]" style={{ width: "6.9%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 2: Return Performance by Zone + SLA Compliance + Financial Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table: Return Performance by Zone - 6 cols */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Return Performance by Zone</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                  <tr>
                    <th className="py-2 px-3">Zone</th>
                    <th className="py-2 px-3">Total Returns</th>
                    <th className="py-2 px-3">Approved</th>
                    <th className="py-2 px-3">Rejected</th>
                    <th className="py-2 px-3">Pending</th>
                    <th className="py-2 px-3">Approval Rate</th>
                    <th className="py-2 px-3">Avg. Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {[
                    { zone: "Aisle A", total: 82, app: 64, rej: 9, pend: 9, rate: "78.0%", tat: "1.6 Days" },
                    { zone: "Aisle B", total: 76, app: 58, rej: 8, pend: 10, rate: "76.3%", tat: "1.7 Days" },
                    { zone: "Aisle C", total: 69, app: 53, rej: 8, pend: 8, rate: "76.8%", tat: "1.9 Days" },
                    { zone: "Aisle D", total: 62, app: 47, rej: 7, pend: 8, rate: "75.8%", tat: "2.0 Days" },
                    { zone: "Aisle E", total: 58, app: 44, rej: 6, pend: 8, rate: "75.9%", tat: "1.8 Days" },
                    { zone: "Bulk Zone", total: 79, app: 60, rej: 10, pend: 9, rate: "75.9%", tat: "1.8 Days" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9FCFA]">
                      <td className="py-2 px-3 font-bold text-[#033129] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                        {row.zone}
                      </td>
                      <td className="py-2 px-3">{row.total}</td>
                      <td className="py-2 px-3 text-[#2E7D32] font-semibold">{row.app}</td>
                      <td className="py-2 px-3 text-[#D32F2F]">{row.rej}</td>
                      <td className="py-2 px-3 text-[#FFA000]">{row.pend}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                          {row.rate}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[#5B7564]">{row.tat}</td>
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
                    strokeDasharray="92.7, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#D32F2F]"
                    strokeDasharray="7.3, 100"
                    strokeDashoffset="-92.7"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-[#033129] leading-none">92.7%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">On Time</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> On Time
                </span>
                <span className="font-bold text-[#033129]">395 (92.7%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Breached
                </span>
                <span className="font-bold text-[#D32F2F]">31 (7.3%)</span>
              </div>
            </div>
          </div>

          {/* Widget 3: Financial Impact - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Financial Impact</h3>
            <div className="space-y-2.5 my-auto py-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5B7564] flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                    ₹
                  </span>
                  Total Refund Amount
                </span>
                <span className="text-sm font-black text-[#033129]">₹2,34,312</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5B7564] flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-[#F3E5F5] text-[#7B1FA2] flex items-center justify-center">
                    <Package className="w-3.5 h-3.5" />
                  </span>
                  Total Replacement Value
                </span>
                <span className="text-sm font-black text-[#033129]">₹2,63,939</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#EDF2EE]">
                <span className="text-xs text-[#5B7564] flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-lg bg-[#E3F2FD] text-[#1976D2] flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5" />
                  </span>
                  Total Return Value
                </span>
                <span className="text-base font-black text-[#033129]">₹4,98,251</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAFCFA] border border-[#EDF2EE] flex items-center justify-between text-xs mt-2">
              <span className="text-[#5B7564]">Return Cost % (of Sales)</span>
              <span className="font-black text-[#2E7D32] flex items-center gap-1">
                2.8%
                <span className="text-[10px] font-semibold text-[#2E7D32]">↓ -0.3 pp</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Return Type Split + Funnel + Rate Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Donut: Return Type Split - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Return Type Split</h3>
            <div className="flex items-center gap-4 my-auto py-2">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Refund 41.8% (green) */}
                  <path
                    className="text-[#2E7D32]"
                    strokeDasharray="41.8, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Replacement 42.7% (orange) */}
                  <path
                    className="text-[#FFA000]"
                    strokeDasharray="42.7, 100"
                    strokeDashoffset="-41.8"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Exchange 10.8% (purple) */}
                  <path
                    className="text-[#7B1FA2]"
                    strokeDasharray="10.8, 100"
                    strokeDashoffset="-84.5"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Other 4.7% (gray) */}
                  <path
                    className="text-[#90A4AE]"
                    strokeDasharray="4.7, 100"
                    strokeDashoffset="-95.3"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-[#033129] leading-none">426</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Returns</span>
                </div>
              </div>

              <div className="space-y-1 text-[11px] flex-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Refund
                  </span>
                  <span className="font-bold text-[#033129]">178 (41.8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> Replacement
                  </span>
                  <span className="font-bold text-[#033129]">182 (42.7%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#7B1FA2]" /> Exchange
                  </span>
                  <span className="font-bold text-[#033129]">46 (10.8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#5B7564]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#90A4AE]" /> Other
                  </span>
                  <span className="font-bold text-[#033129]">20 (4.7%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Funnel: Return Processing Funnel - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Return Processing Funnel</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Return Requests</span>
                  <span className="font-bold text-[#033129]">426 (100.0%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#1B5E20] overflow-hidden" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Inspected</span>
                  <span className="font-bold text-[#033129]">374 (87.8%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "87.8%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Approved</span>
                  <span className="font-bold text-[#033129]">326 (76.5%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "76.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Processed (Refund/Replace)</span>
                  <span className="font-bold text-[#033129]">300 (70.4%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "70.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Completed</span>
                  <span className="font-bold text-[#033129]">292 (68.5%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "68.5%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Chart: Return Rate Trend (vs. Orders) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#033129] text-xs">Return Rate Trend (vs. Orders)</h3>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                Avg. Return Rate: 2.8%
              </span>
            </div>

            <div className="h-28 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                {/* Grid */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="#F0F4F1" strokeWidth="1" />

                {/* Green area */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="10,80 10,48 40,46 70,44 100,43 130,42 160,40 190,42 190,80"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,48 40,46 70,44 100,43 130,42 160,40 190,42"
                />
                {[
                  [10, 48], [40, 46], [70, 44], [100, 43], [130, 42], [160, 40], [190, 42]
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
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
