"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarClock,
  Layers,
  Package,
  CheckCircle2,
  Users,
  Calendar,
  Clock,
  Plus,
  Search,
  RefreshCw,
  Lightbulb,
  Check,
  ChevronDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function ResourcePlanningPage() {
  return (
    <WarehouseManagerShell
      pageTitle="Resource Planning"
      pageDescription="Plan and optimize warehouse capacity, resources, and workload to meet operational deadlines."
      currentPath="/warehouse/capacity/resource-planning"
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
              <span className="text-[#033129] font-bold">Resource Planning</span>
            </div>
            <h1 className="text-xl font-black text-[#033129] tracking-tight">Resource Planning</h1>
            <p className="text-xs text-[#5B7564]">
              Plan and optimize warehouse capacity, resources, and workload to meet operational deadlines.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#CBD8D0] text-[#1E3B2F] text-xs font-semibold shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#5B7564]" />
              <span>Oct 23, 2026 – Oct 29, 2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B7564]" />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#087A4A] text-white text-xs font-bold hover:bg-[#06633C] transition shadow-xs">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Plan Capacity
            </button>
          </div>
        </div>

        {/* 6 KPI Metric Cards (Page 32 exact) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {/* Total Capacity */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
              <Layers className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Total Capacity</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">10,000</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                Units / Day
              </div>
            </div>
          </div>

          {/* Planned Workload */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#E3F2FD] flex items-center justify-center text-[#1976D2]">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Planned Workload</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">8,342</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (83.4% Utilization)
              </div>
            </div>
          </div>

          {/* Available Capacity */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8E1] flex items-center justify-center text-[#F57F17]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Available Capacity</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">1,658</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (16.6%)
              </div>
            </div>
          </div>

          {/* Active Resources */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#F3E5F5] flex items-center justify-center text-[#7B1FA2]">
              <Users className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Active Resources</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">124</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +4 vs last week
              </div>
            </div>
          </div>

          {/* Tasks at Risk */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">Tasks at Risk</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">28</div>
              <div className="text-[11px] text-[#5B7564] font-medium mt-1">
                (0.3%)
              </div>
            </div>
          </div>

          {/* On-Time Completion */}
          <div className="bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-xl bg-[#EDE7F6] flex items-center justify-center text-[#5E35B1]">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-2">
              <div className="text-[11px] font-semibold text-[#5B7564]">On-Time Completion</div>
              <div className="text-2xl font-black text-[#033129] mt-0.5">98.1%</div>
              <div className="text-[11px] text-[#2E7D32] font-semibold mt-1">
                ↑ +1.7 pp
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
              placeholder="Search by Zone, Resource, or Task..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D5E0D8] text-xs focus:outline-none focus:border-[#087A4A] bg-[#FAFCFA]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Zones</option>
              <option>A - Receiving</option>
              <option>B - Storage</option>
              <option>C - Picking</option>
              <option>D - Packing</option>
              <option>E - Dispatch</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Resource Types</option>
              <option>Pickers</option>
              <option>Packers</option>
              <option>QA Staff</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>All Shifts</option>
              <option>1st Shift</option>
              <option>2nd Shift</option>
            </select>

            <select className="px-3 py-1.5 rounded-xl border border-[#D5E0D8] bg-white text-[#2B4738] font-medium focus:outline-none">
              <option>Today</option>
              <option>Tomorrow</option>
              <option>Next 7 Days</option>
            </select>

            <button className="p-2 rounded-xl border border-[#CBD8D0] bg-white text-[#5B7564] hover:bg-[#F2F7F4]">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle Row 1: Capacity vs Workload + Utilization Donut + Workload by Process */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart 1: Capacity vs Workload (Last 7 Days) - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Capacity vs Workload (Last 7 Days)</h3>
            <div className="h-44 relative mt-3 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 250 120">
                <line x1="30" y1="20" x2="250" y2="20" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="24" className="text-[9px] fill-[#7A9385]">12,000</text>
                <line x1="30" y1="38" x2="250" y2="38" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="42" className="text-[9px] fill-[#7A9385]">10,000</text>
                <line x1="30" y1="56" x2="250" y2="56" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="60" className="text-[9px] fill-[#7A9385]">8,000</text>
                <line x1="30" y1="74" x2="250" y2="74" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="78" className="text-[9px] fill-[#7A9385]">6,000</text>
                <line x1="30" y1="92" x2="250" y2="92" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="96" className="text-[9px] fill-[#7A9385]">4,000</text>
                <line x1="30" y1="110" x2="250" y2="110" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="114" className="text-[9px] fill-[#7A9385]">2,000</text>

                {/* Planned Workload Columns (green) */}
                {[
                  [45, 60], [75, 68], [105, 72], [135, 75], [165, 78], [195, 80], [225, 83]
                ].map(([x, h], i) => (
                  <rect key={i} x={x - 10} y={118 - h} width="20" height={h} fill="#A5D6A7" rx="3" />
                ))}

                {/* Total Capacity Red Line at 10,000 (y = 38) */}
                <line x1="35" y1="38" x2="235" y2="38" stroke="#D32F2F" strokeWidth="2.5" />
                {[45, 75, 105, 135, 165, 195, 225].map((x, i) => (
                  <circle key={i} cx={x} cy="38" r="3" fill="#D32F2F" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between text-[9px] text-[#7A9385] mt-2 px-6">
              <span>Oct 23</span>
              <span>Oct 24</span>
              <span>Oct 25</span>
              <span>Oct 26</span>
              <span>Oct 27</span>
              <span>Oct 28</span>
              <span>Oct 29</span>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-[#EDF2EE] text-[10px] text-[#5B7564]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-sm bg-[#A5D6A7]" /> Planned Workload
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2 rounded-full bg-[#D32F2F]" /> Total Capacity
              </span>
            </div>
          </div>

          {/* Chart 2: Capacity Utilization Donut - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Capacity Utilization</h3>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Utilized 83.4% */}
                  <path className="text-[#2E7D32]" strokeDasharray="83.4, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Available 16.6% */}
                  <path className="text-[#E0E0E0]" strokeDasharray="16.6, 100" strokeDashoffset="-83.4" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-[#033129] leading-none">83.4%</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">Utilization</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> Utilized
                </span>
                <span className="font-bold text-[#033129]">8,342 (83.4%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#E0E0E0]" /> Available
                </span>
                <span className="font-bold text-[#033129]">1,658 (16.6%)</span>
              </div>
            </div>
          </div>

          {/* Chart 3: Workload by Process - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs">
            <h3 className="font-extrabold text-[#033129] text-xs mb-3">Workload by Process</h3>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Receiving</span>
                  <span className="font-bold text-[#033129]">1,920 (23.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#1B5E20]" style={{ width: "23.0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Putaway</span>
                  <span className="font-bold text-[#033129]">1,210 (14.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "14.5%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Picking</span>
                  <span className="font-bold text-[#033129]">2,340 (28.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#4CAF50]" style={{ width: "28.0%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Packing</span>
                  <span className="font-bold text-[#033129]">1,480 (17.7%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#81C784]" style={{ width: "17.7%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Handover</span>
                  <span className="font-bold text-[#033129]">892 (10.7%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#A5D6A7]" style={{ width: "10.7%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#5B7564]">Others</span>
                  <span className="font-bold text-[#033129]">500 (6.0%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F0F4F1] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C8E6C9]" style={{ width: "6.0%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row 2: Resource Allocation Table + Zone-wise Utilization + Deadline Risk Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table 1: Resource Allocation - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Resource Allocation</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Resource Type</th>
                  <th className="py-2 px-3">Total</th>
                  <th className="py-2 px-3">Assigned</th>
                  <th className="py-2 px-3">Utilization</th>
                  <th className="py-2 px-3">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { type: "Pickers", total: 40, ass: 34, util: "85.0%", avail: 6 },
                  { type: "Packers", total: 32, ass: 26, util: "81.3%", avail: 6 },
                  { type: "QA Staff", total: 16, ass: 14, util: "87.5%", avail: 2 },
                  { type: "Handover Staff", total: 20, ass: 16, util: "80.0%", avail: 4 },
                  { type: "Material Handling", total: 12, ass: 10, util: "83.3%", avail: 2 },
                  { type: "Supervisors", total: 4, ass: 4, util: "100.0%", avail: 0 },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-2 px-3 font-semibold text-[#033129]">{row.type}</td>
                    <td className="py-2 px-3">{row.total}</td>
                    <td className="py-2 px-3">{row.ass}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                        {row.util}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-[#5B7564]">{row.avail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table 2: Zone-wise Capacity Utilization - 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] shadow-xs overflow-hidden">
            <div className="p-3 border-b border-[#E1E8E3] bg-[#F8FAF9]">
              <h3 className="font-extrabold text-[#033129] text-xs">Zone-wise Capacity Utilization</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-[#5B7564] border-b border-[#EDF2EE] font-semibold bg-[#FAFCFA]">
                <tr>
                  <th className="py-2 px-3">Zone</th>
                  <th className="py-2 px-3">Capacity</th>
                  <th className="py-2 px-3">Workload</th>
                  <th className="py-2 px-3">Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF2EE] text-[#1E3B2F]">
                {[
                  { zone: "A – Receiving", cap: "2,000", work: "1,620", util: "81.0%" },
                  { zone: "B – Storage", cap: "2,000", work: "1,698", util: "84.9%" },
                  { zone: "C – Picking", cap: "2,500", work: "2,190", util: "87.6%" },
                  { zone: "D – Packing", cap: "2,000", work: "1,682", util: "84.1%" },
                  { zone: "E – Dispatch", cap: "1,500", work: "1,152", util: "76.8%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F9FCFA]">
                    <td className="py-2 px-3 font-semibold text-[#033129]">{row.zone}</td>
                    <td className="py-2 px-3">{row.cap}</td>
                    <td className="py-2 px-3">{row.work}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                        {row.util}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Donut 3: Deadline Risk (Tasks) - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-[#033129]">Deadline Risk (Tasks)</h4>
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Overdue 17.9% (red) */}
                  <path className="text-[#D32F2F]" strokeDasharray="17.9, 100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Due Today 28.6% (yellow) */}
                  <path className="text-[#FFA000]" strokeDasharray="28.6, 100" strokeDashoffset="-17.9" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* On Track 53.6% (green) */}
                  <path className="text-[#2E7D32]" strokeDasharray="53.6, 100" strokeDashoffset="-46.5" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-[#033129] leading-none">28</span>
                  <span className="text-[9px] text-[#5B7564] font-semibold mt-0.5">At Risk</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-[#EDF2EE]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#D32F2F]" /> Overdue
                </span>
                <span className="font-bold text-[#D32F2F]">5 (17.9%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA000]" /> Due Today
                </span>
                <span className="font-bold text-[#033129]">8 (28.6%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#5B7564]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2E7D32]" /> On Track
                </span>
                <span className="font-bold text-[#033129]">15 (53.6%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Workload Forecast (Next 7 Days) + Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chart: Workload Forecast - 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-[#E1E8E3] shadow-xs flex flex-col justify-between">
            <h3 className="font-extrabold text-[#033129] text-xs">Workload Forecast (Next 7 Days)</h3>
            <div className="h-32 relative mt-2 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 250 80">
                <line x1="25" y1="15" x2="250" y2="15" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="18" className="text-[9px] fill-[#7A9385]">10,000</text>
                <line x1="25" y1="35" x2="250" y2="35" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="38" className="text-[9px] fill-[#7A9385]">9,000</text>
                <line x1="25" y1="55" x2="250" y2="55" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="58" className="text-[9px] fill-[#7A9385]">8,000</text>
                <line x1="25" y1="75" x2="250" y2="75" stroke="#F0F4F1" strokeWidth="1" />
                <text x="0" y="78" className="text-[9px] fill-[#7A9385]">7,000</text>

                {/* Dashed red capacity threshold line (10,000) */}
                <line x1="30" y1="15" x2="245" y2="15" stroke="#D32F2F" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Light green area & line */}
                <polygon
                  fill="#E8F5E9"
                  fillOpacity="0.7"
                  points="35,75 35,65 65,55 95,52 125,50 155,48 185,45 215,38 245,32 245,75"
                />
                <polyline
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2.5"
                  points="35,65 65,55 95,52 125,50 155,48 185,45 215,38 245,32"
                />
                {[
                  [35, 65], [65, 55], [95, 52], [125, 50], [155, 48], [185, 45], [215, 38], [245, 32]
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
                <span className="w-2.5 h-2 rounded-sm bg-[#A5D6A7]" /> Forecasted Workload
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-[#D32F2F]" /> Capacity (10,000)
              </span>
            </div>
          </div>

          {/* Card: Recommendations - 5 cols */}
          <div className="lg:col-span-5 bg-[#FFFDE7] rounded-2xl p-4 border border-[#FFF59D] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#F57F17] mb-2.5">
                <Lightbulb className="w-4 h-4 text-[#F57F17]" />
                <span>Recommendations</span>
              </div>
              <ul className="space-y-2 text-xs text-[#5D4037] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Capacity is sufficient for the next 7 days (avg. utilization: 84.1%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Reassign 2 pickers from Zone E to Zone C to balance workload.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Clear 5 overdue tasks by end of today to maintain SLA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2E7D32] flex-shrink-0 mt-0.5" />
                  <span>Consider +10% temporary capacity for Nov 03 – Nov 05 (forecasted peak).</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
