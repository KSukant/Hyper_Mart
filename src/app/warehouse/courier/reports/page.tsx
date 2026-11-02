"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Download,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function HandoverReportsPage() {
  return (
    <WarehouseManagerShell
      pageTitle="Handover Reports"
      pageDescription="Comprehensive insights on handovers, dispatches, courier performance, SLA compliance, and service coverage."
      currentPath="/warehouse/courier/reports"
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
              <span className="text-[#033129] font-bold">Handover Reports</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Handover Reports</h1>
            <p className="text-xs text-[#5B7564]">
              Comprehensive insights on handovers, dispatches, courier performance, SLA compliance, and service coverage.
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

        {/* 6 KPI Metric Cards (Page 31 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Handovers */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Handovers</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">528</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +12.8% vs previous 7 days
              </div>
            </div>
          </div>

          {/* Total Dispatched */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Truck className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Dispatched</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">3,842</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +1.6%
              </div>
            </div>
          </div>

          {/* Delivered */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
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

          {/* Avg. Handover Time */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Avg. Handover Time</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">4.5 min</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↓ -0.8 min
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

          {/* Service Coverage */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E0F7FA] flex items-center justify-center text-[#00838F]">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Service Coverage</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">28</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                Zones
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 1: Handover & Dispatch Trend + Shipment Status + Courier Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Handover & Dispatch Trend - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-[#033129] text-xs">Handover & Dispatch Trend (Last 7 Days)</h3>
              <div className="h-44 relative mt-3 flex items-end justify-between px-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120">
                  <line x1="20" y1="20" x2="240" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="24" className="text-[9px] fill-[#7A9385]">700</text>
                  <line x1="20" y1="38" x2="240" y2="38" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="42" className="text-[9px] fill-[#7A9385]">600</text>
                  <line x1="20" y1="56" x2="240" y2="56" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="60" className="text-[9px] fill-[#7A9385]">500</text>
                  <line x1="20" y1="74" x2="240" y2="74" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="78" className="text-[9px] fill-[#7A9385]">400</text>
                  <line x1="20" y1="92" x2="240" y2="92" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="96" className="text-[9px] fill-[#7A9385]">300</text>
                  <line x1="20" y1="118" x2="240" y2="118" stroke="#F0F4F1" strokeWidth="1" />
                  <text x="0" y="118" className="text-[9px] fill-[#7A9385]">0</text>

                  {/* Yellow area/line: Handovers */}
                  <polygon
                    fill="#FFF8E1"
                    fillOpacity="0.6"
                    points="30,118 30,86 60,82 95,80 130,76 165,72 200,68 230,62 230,118"
                  />
                  <polyline
                    fill="none"
                    stroke="#FFA000"
                    strokeWidth="2.5"
                    points="30,86 60,82 95,80 130,76 165,72 200,68 230,62"
                  />
                  {[
                    [30, 86], [60, 82], [95, 80], [130, 76], [165, 72], [200, 68], [230, 62]
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.5" fill="#FFA000" />
                  ))}

                  {/* Green line: Dispatched Orders */}
                  <polyline
                    fill="none"
                    stroke="#2E7D32"
                    strokeWidth="2.5"
                    points="30,65 60,60 95,56 130,52 165,48 200,44 230,38"
                  />
                  {[
                    [30, 65], [60, 60], [95, 56], [130, 52], [165, 48], [200, 44], [230, 38]
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
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> Dispatched Orders
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Handovers
              </span>
            </div>
          </div>

          {/* Chart 2: Shipment Status Distribution - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Shipment Status Distribution</h3>
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

          {/* Chart 3: Courier-wise Handover Volume - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Courier-wise Handover Volume</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">BlueDart</span>
                  <span className="font-bold text-[#033129]">1,212 (31.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "31.5%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delivery</span>
                  <span className="font-bold text-[#033129]">936 (24.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "24.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ekart</span>
                  <span className="font-bold text-[#033129]">668 (17.4%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "17.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Shadowfax</span>
                  <span className="font-bold text-[#033129]">584 (15.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "15.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Aramex</span>
                  <span className="font-bold text-[#033129]">242 (6.3%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "6.3%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">200 (5.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#E8F5E9]" style={{ width: "5.2%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 2: SLA Trend + Transit Time Trend + Service Coverage Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* SLA Compliance Trend - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">SLA Compliance Trend</h3>
            <div className="h-32 relative mt-2 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="10,32 40,30 70,30 100,31 130,32 160,26 190,22"
                />
                {[
                  [10, 32], [40, 30], [70, 30], [100, 31], [130, 32], [160, 26], [190, 22]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#2E7D32" />
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
            <div className="text-center mt-2 text-[10px] text-[#5B7564]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> SLA Compliance %
              </span>
            </div>
          </div>

          {/* Avg. Transit Time Trend - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Avg. Transit Time Trend</h3>
            <div className="h-32 relative mt-2 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <line x1="0" y1="10" x2="200" y2="10" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#F0F4F1" strokeWidth="1" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#F0F4F1" strokeWidth="1" />

                <polyline
                  fill="none"
                  stroke="#FFA000"
                  strokeWidth="2.5"
                  points="10,22 40,28 70,32 100,34 130,36 160,40 190,38"
                />
                {[
                  [10, 22], [40, 28], [70, 32], [100, 34], [130, 36], [160, 40], [190, 38]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#FFA000" />
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
            <div className="text-center mt-2 text-[10px] text-[#5B7564]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FFA000]" /> Avg. Transit Time
              </span>
            </div>
          </div>

          {/* Service Coverage (Shipments by Zone) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Service Coverage (Shipments by Zone)</h3>
            <div className="h-32 relative mt-2 flex items-end justify-around px-2 pb-2">
              {[
                { zone: "North", val: "864", h: "86%" },
                { zone: "South", val: "712", h: "71%" },
                { zone: "East", val: "628", h: "62%" },
                { zone: "West", val: "506", h: "50%" },
                { zone: "Central", val: "482", h: "48%" },
                { zone: "Others", val: "650", h: "65%" },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-[#033129]">{c.val}</span>
                  <div className="w-6 rounded-t-sm bg-[#B71C1C]" style={{ height: c.h }} />
                  <span className="text-[9px] text-[#5B7564] font-medium">{c.zone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Top Handover Exceptions + Funnel + Courier Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Top Handover Exceptions (18) - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Top Handover Exceptions (18)</h3>
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
                  { reason: "SLA Breach (Pickup Delay)", count: 7, share: "38.9%" },
                  { reason: "Courier Unavailable", count: 4, share: "22.2%" },
                  { reason: "Address / Zone Mismatch", count: 3, share: "16.7%" },
                  { reason: "Reschedule Request", count: 2, share: "11.1%" },
                  { reason: "Others", count: 2, share: "11.1%" },
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

          {/* Handover Funnel - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Handover Funnel</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Ready for Handover</span>
                  <span className="font-bold text-[#033129]">528 (100.0%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#1B5E20] overflow-hidden" />
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Assigned to Courier</span>
                  <span className="font-bold text-[#033129]">412 (78.0%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "78%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Picked Up</span>
                  <span className="font-bold text-[#033129]">384 (72.7%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "72.7%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Dispatched</span>
                  <span className="font-bold text-[#033129]">3,842 (727.6%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Delivered</span>
                  <span className="font-bold text-[#033129]">3,769 (714.8%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Courier Performance Summary Table - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Courier Performance Summary</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Courier</th>
                  <th className="py-2 px-3">On-Time %</th>
                  <th className="py-2 px-3">SLA Breaches</th>
                  <th className="py-2 px-3">Delivery Success %</th>
                  <th className="py-2 px-3">Avg. Transit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { name: "BlueDart", onTime: "98.6%", breach: 7, succ: "99.5%", tat: "11 min" },
                  { name: "Delivery", onTime: "98.1%", breach: 6, succ: "99.4%", tat: "13 min" },
                  { name: "Ekart", onTime: "97.3%", breach: 5, succ: "99.1%", tat: "14 min" },
                  { name: "Shadowfax", onTime: "97.9%", breach: 6, succ: "99.3%", tat: "12 min" },
                  { name: "Aramex", onTime: "99.2%", breach: 1, succ: "99.6%", tat: "10 min" },
                  { name: "Others", onTime: "98.0%", breach: 1, succ: "99.5%", tat: "13 min" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-2 px-3 font-semibold text-[#1976D2]">{row.name}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                        {row.onTime}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[#D32F2F] font-bold">{row.breach}</td>
                    <td className="py-2 px-3 text-[#2E7D32] font-semibold">{row.succ}</td>
                    <td className="py-2 px-3 text-[#5B7564]">{row.tat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
