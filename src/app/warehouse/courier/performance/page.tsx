"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function CourierPerformancePage() {
  return (
    <WarehouseManagerShell
      pageTitle="Courier Performance"
      pageDescription="Evaluate courier partner performance, SLAs, delivery success, and operational efficiency."
      currentPath="/warehouse/courier/performance"
    >
      <div className="space-y-4">
        {/* Breadcrumb & Header Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B7564] mb-1">
              <Link href="/warehouse/dashboard" className="hover:text-[#087A4A]">Home</Link>
              <span>›</span>
              <Link href="/warehouse/courier" className="hover:text-[#087A4A]">Courier Handover</Link>
              <span>›</span>
              <span className="text-[#033129] font-bold">Courier Performance</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Courier Performance</h1>
            <p className="text-xs text-[#5B7564]">
              Evaluate courier partner performance, SLAs, delivery success, and operational efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B7564]" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold hover:bg-[#F2F7F4] transition shadow-xs">
              <Download className="w-3.5 h-3.5 text-[#5B7564]" />
              Export
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 30 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Shipments */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Shipments</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">3,842</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +11.6% vs previous 7 days
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Delivered</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">3,769</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (98.1%)
              </div>
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">On-Time Delivery</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">98.1%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +1.9 pp
              </div>
            </div>
          </div>

          {/* Avg. Transit Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Transit Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">12 min</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -3 min
              </div>
            </div>
          </div>

          {/* SLA Breaches */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">SLA Breaches</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">18</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (0.5%)
              </div>
            </div>
          </div>

          {/* Delivery Success */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Delivery Success</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">99.5%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +0.7 pp
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 1: Delivery Performance Trend + Outcome Distribution + SLA by Courier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Delivery Performance Trend - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-[#033129] text-xs">Delivery Performance Trend (Last 7 Days)</h3>
              <div className="h-44 relative mt-3 flex items-end justify-between px-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120">
                  <line x1="20" y1="20" x2="240" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="24" className="text-[9px] fill-[#7A9385]">100%</text>
                  <line x1="20" y1="45" x2="240" y2="45" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="49" className="text-[9px] fill-[#7A9385]">99%</text>
                  <line x1="20" y1="70" x2="240" y2="70" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="74" className="text-[9px] fill-[#7A9385]">98%</text>
                  <line x1="20" y1="95" x2="240" y2="95" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="99" className="text-[9px] fill-[#7A9385]">97%</text>
                  <line x1="20" y1="118" x2="240" y2="118" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="118" className="text-[9px] fill-[#7A9385]">95%</text>

                  {/* Yellow line (Delivery Success) */}
                  <polyline
                    fill="none"
                    stroke="#FFA000"
                    strokeWidth="2.5"
                    points="30,55 60,50 95,48 130,46 165,42 200,38 230,35"
                  />
                  {[
                    [30, 55], [60, 50], [95, 48], [130, 46], [165, 42], [200, 38], [230, 35]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#FFA000" />
                  ))}

                  {/* Green line (On-Time Delivery) */}
                  <polyline
                    fill="none"
                    stroke="#2E7D32"
                    strokeWidth="2.5"
                    points="30,80 60,75 95,72 130,70 165,68 200,60 230,55"
                  />
                  {[
                    [30, 80], [60, 75], [95, 72], [130, 70], [165, 68], [200, 60], [230, 55]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#2E7D32" />
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
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#EDF2EE] text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> On-Time Delivery
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Delivery Success
              </span>
            </div>
          </div>

          {/* Chart 2: Shipment Outcome Distribution - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Shipment Outcome Distribution</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Delivered 98.1% */}
                  <path className="text-[#2E7D32]" strokeDasharray="98.1, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* In Transit 1.2% */}
                  <path className="text-[#FFA000]" strokeDasharray="1.2, 100" strokeDashoffset="-98.1" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Exceptions 0.5% */}
                  <path className="text-[#D32F2F]" strokeDasharray="0.7, 100" strokeDashoffset="-99.3" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#033129] leading-none">3,842</span>
                  <span className="text-[10px] text-[#5B7564] font-semibold mt-0.5">Shipments</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Delivered
                </span>
                <span className="font-bold text-[#033129]">3,769 (98.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> In Transit
                </span>
                <span className="font-bold text-[#033129]">48 (1.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Exceptions
                </span>
                <span className="font-bold text-[#D32F2F]">18 (0.5%)</span>
              </div>
            </div>
          </div>

          {/* Chart 3: SLA Compliance by Courier - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">SLA Compliance by Courier</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Aramex</span>
                  <span className="font-bold text-[#033129]">99.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "99.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">BlueDart</span>
                  <span className="font-bold text-[#033129]">98.6%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "98.6%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delivery</span>
                  <span className="font-bold text-[#033129]">98.1%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "98.1%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ekart</span>
                  <span className="font-bold text-[#033129]">97.3%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "97.3%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Shadowfax</span>
                  <span className="font-bold text-[#033129]">97.9%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#A5D6A7]" style={{ width: "97.9%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">98.0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "98.0%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 2: Courier Performance Summary Table + Avg Transit Time Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table: Courier Performance Summary - 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Courier Performance Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                  <tr>
                    <th className="py-2 px-3">Courier Partner</th>
                    <th className="py-2 px-3">Shipments</th>
                    <th className="py-2 px-3">Delivered</th>
                    <th className="py-2 px-3">On-Time %</th>
                    <th className="py-2 px-3">Avg. Transit</th>
                    <th className="py-2 px-3">SLA Breaches</th>
                    <th className="py-2 px-3">Success %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                  {[
                    { name: "BlueDart", ship: 1212, del: 1185, onTime: "98.6%", tat: "11 min", breach: 7, succ: "99.5%" },
                    { name: "Delivery", ship: 936, del: 918, onTime: "98.1%", tat: "13 min", breach: 6, succ: "99.4%" },
                    { name: "Ekart", ship: 668, del: 649, onTime: "97.3%", tat: "14 min", breach: 5, succ: "99.1%" },
                    { name: "Shadowfax", ship: 584, del: 567, onTime: "97.9%", tat: "12 min", breach: 6, succ: "99.3%" },
                    { name: "Aramex", ship: 242, del: 238, onTime: "99.2%", tat: "10 min", breach: 1, succ: "99.6%" },
                    { name: "Others", ship: 200, del: 196, onTime: "98.0%", tat: "13 min", breach: 1, succ: "99.5%" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9FCFA]">
                      <td className="py-2 px-3 font-semibold text-[#1976D2]">{row.name}</td>
                      <td className="py-2 px-3">{row.ship.toLocaleString()}</td>
                      <td className="py-2 px-3">{row.del.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                          {row.onTime}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[#5B7564]">{row.tat}</td>
                      <td className="py-2 px-3 text-[#D32F2F] font-bold">{row.breach}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                          {row.succ}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart: Avg. Transit Time by Courier - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Avg. Transit Time by Courier</h3>
            <div className="h-44 relative mt-2 flex items-end justify-between px-2 pt-4">
              <div className="flex items-end justify-around w-full h-full pb-6">
                {[
                  { name: "BlueDart", val: "11 min", h: "68%" },
                  { name: "Delivery", val: "13 min", h: "81%" },
                  { name: "Ekart", val: "14 min", h: "88%" },
                  { name: "Shadowfax", val: "12 min", h: "75%" },
                  { name: "Aramex", val: "10 min", h: "62%" },
                  { name: "Others", val: "13 min", h: "81%" },
                ].map((col, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 w-11">
                    <span className="text-[10px] font-bold text-[#033129]">{col.val}</span>
                    <div className="w-7 rounded-t-md bg-[#FFA000]" style={{ height: col.h }} />
                    <span className="text-[9px] text-[#5B7564] font-medium truncate w-full text-center mt-1">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Exception Breakdown + Service Area Performance + Performance Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Donut 1: Exception Breakdown (18) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Exception Breakdown (18)</h4>
            <div className="flex items-center gap-3 my-auto py-2">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Delayed Delivery 38.9% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="38.9, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Pickup Missed 22.2% (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="22.2, 100" strokeDashoffset="-38.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Address Issue 16.7% (blue) */}
                  <path className="text-[#1976D2]" strokeDasharray="16.7, 100" strokeDashoffset="-61.1" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Reschedule 11.1% (purple) */}
                  <path className="text-[#7B1FA2]" strokeDasharray="11.1, 100" strokeDashoffset="-77.8" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Others 11.1% (gray) */}
                  <path className="text-[#90A4AE]" strokeDasharray="11.1, 100" strokeDashoffset="-88.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-[#033129] leading-none">18</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Exceptions</span>
                </div>
              </div>

              <div className="space-y-1 text-[10px] flex-1">
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#D32F2F]" />Delayed Delivery</span><span className="font-bold text-[#033129]">7 (38.9%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#FFA000]" />Pickup Missed</span><span className="font-bold text-[#033129]">4 (22.2%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1976D2]" />Address Issue</span><span className="font-bold text-[#033129]">3 (16.7%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#7B1FA2]" />Reschedule Request</span><span className="font-bold text-[#033129]">2 (11.1%)</span></div>
                <div className="flex justify-between"><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#90A4AE]" />Others</span><span className="font-bold text-[#033129]">2 (11.1%)</span></div>
              </div>
            </div>
          </div>

          {/* Table 2: Service Area Performance - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Service Area Performance</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Service Area</th>
                  <th className="py-2 px-3">Shipments</th>
                  <th className="py-2 px-3">On-Time %</th>
                  <th className="py-2 px-3">Success %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { area: "All Zones", ship: 3842, onTime: "98.1%", succ: "99.5%" },
                  { area: "Chennai", ship: 1256, onTime: "98.7%", succ: "99.6%" },
                  { area: "Coimbatore", ship: 724, onTime: "98.0%", succ: "99.4%" },
                  { area: "Madurai", ship: 512, onTime: "97.8%", succ: "99.3%" },
                  { area: "Trichy", ship: 438, onTime: "98.2%", succ: "99.5%" },
                  { area: "Others", ship: 912, onTime: "97.9%", succ: "99.4%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-2 px-3 font-semibold text-[#033129]">{row.area}</td>
                    <td className="py-2 px-3">{row.ship.toLocaleString()}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                        {row.onTime}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-[#2E7D32]">{row.succ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart 3: Performance Trend & SLA Breaches - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Performance Trend & SLA Breaches</h3>
            <div className="h-32 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80">
                <line x1="0" y1="20" x2="200" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="40" x2="200" y2="40" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="60" x2="200" y2="60" stroke="#F0F4F1" strokeWidth="1" />

                {/* Bottom pink columns for SLA Breaches */}
                {[
                  [15, 10], [45, 8], [75, 7], [105, 8], [135, 6], [165, 5], [190, 4]
                ].map(([x, h], i) => (
                  <rect key={i} x={x - 6} y={80 - h} width="12" height={h} fill="#FFCDD2" rx="2" />
                ))}

                {/* Green line: On-Time Delivery % */}
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="15,48 45,45 75,44 105,42 135,40 165,38 190,35"
                />
                {[
                  [15, 48], [45, 45], [75, 44], [105, 42], [135, 40], [165, 38], [190, 35]
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
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> On-Time Delivery %
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-sm bg-[#FFCDD2]" /> SLA Breaches
              </span>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
