"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  Maximize2,
  RefreshCw,
  Search,
  Eye,
  ChevronDown,
  User,
  AlertTriangle,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function PickingPackingMonitorPage() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedOperation, setSelectedOperation] = useState("All Operations");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedZone, setSelectedZone] = useState("All Zones");

  const activeTasks = [
    {
      id: "PK-20261029-001",
      orderId: "HM-20261029-0145",
      type: "Picking",
      items: 6,
      zone: "Aisle A",
      priority: "High",
      status: "In Progress",
      assignedTo: "Ravi S.",
      elapsed: "05:24",
    },
    {
      id: "PP-20261029-002",
      orderId: "HM-20261029-0146",
      type: "Packing",
      items: 4,
      zone: "Station P2",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      elapsed: "02:10",
    },
    {
      id: "PK-20261029-003",
      orderId: "HM-20261029-0147",
      type: "Picking",
      items: 10,
      zone: "Aisle C",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Anand K.",
      elapsed: "06:18",
    },
    {
      id: "PP-20261029-004",
      orderId: "HM-20261029-0148",
      type: "Packing",
      items: 3,
      zone: "Station P3",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Divya M.",
      elapsed: "04:37",
    },
    {
      id: "PK-20261029-005",
      orderId: "HM-20261029-0149",
      type: "Picking",
      items: 8,
      zone: "Aisle D",
      priority: "High",
      status: "In Progress",
      assignedTo: "Karthik P.",
      elapsed: "07:02",
    },
  ];

  return (
    <WarehouseManagerShell pageNumber={18} title="Picking & Packing Monitor" currentPath="/warehouse/picking-packing/detail">
      <div className="space-y-6">
        {/* Header matching page_18.png / page_19.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Picking & Packing Monitor
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Real-time overview of picking and packing operations, task flow, and productivity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
              <span>Auto Refresh (30s)</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`w-7 h-4 rounded-full transition-colors p-0.5 ${
                  autoRefresh ? "bg-emerald-600" : "bg-gray-300"
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  autoRefresh ? "translate-x-3" : ""
                }`} />
              </button>
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 shadow-2xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_18.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Tasks</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">510</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +12.3% vs yesterday
            </div>
          </div>

          {/* Card 2: Picking Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Picking Tasks</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">320</div>
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-2">
              In Progress: 190 | Pending: 85 | Completed: 45
            </div>
          </div>

          {/* Card 3: Packing Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Packing Tasks</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">190</div>
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-2">
              In Progress: 72 | Pending: 46 | Completed: 72
            </div>
          </div>

          {/* Card 4: Overall Completion */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Overall Completion</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">45.9%</div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: "45.9%" }} />
            </div>
          </div>

          {/* Card 5: Avg. Cycle Time */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Avg. Cycle Time</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">7.4 min</div>
            </div>
            <div className="text-[11px] font-bold text-rose-600 mt-2">
              ↓ -18.6% vs yesterday
            </div>
          </div>
        </div>

        {/* Middle Row: Operation Flow + Live Progress + Task Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Operation Flow */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-3">Operation Flow</h2>
            <div className="flex items-center justify-between gap-1 pt-1">
              <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center flex-1">
                <ShoppingCart className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[10px] text-gray-500 font-medium">Orders</span>
                <span className="text-sm font-black text-gray-900">510</span>
              </div>
              <span className="text-gray-300 font-bold">→</span>

              <div className="flex flex-col items-center p-2 rounded-xl bg-blue-50/70 border border-blue-100 text-center flex-1">
                <FileText className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-[10px] text-gray-500 font-medium">Pick Queue</span>
                <span className="text-sm font-black text-gray-900">320</span>
              </div>
              <span className="text-gray-300 font-bold">→</span>

              <div className="flex flex-col items-center p-2 rounded-xl bg-amber-50/70 border border-amber-100 text-center flex-1">
                <Package className="w-5 h-5 text-amber-600 mb-1" />
                <span className="text-[10px] text-gray-500 font-medium">Pack Queue</span>
                <span className="text-sm font-black text-gray-900">190</span>
              </div>
              <span className="text-gray-300 font-bold">→</span>

              <div className="flex flex-col items-center p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center flex-1">
                <Truck className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-[10px] text-gray-500 font-medium">Ready to Dispatch</span>
                <span className="text-sm font-black text-gray-900">234</span>
              </div>
            </div>
          </div>

          {/* Live Progress */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Live Progress</h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Picking</span>
                  <span className="font-bold text-gray-900">190 / 320 (59.4%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "59.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Packing</span>
                  <span className="font-bold text-gray-900">72 / 190 (37.9%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "37.9%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Task Status Distribution Donut */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Task Status Distribution</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Completed 45.9% = 104 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="104 226" strokeDashoffset="0" />
                  {/* In Progress 51.4% (normalized) = 84 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="84 226" strokeDashoffset="-104" />
                  {/* Pending 16.7% = 38 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="38 226" strokeDashoffset="-188" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-none">510</span>
                  <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Tasks</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Completed
                  </span>
                  <span className="font-bold text-gray-900">234 (45.9%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> In Progress
                  </span>
                  <span className="font-bold text-gray-900">262 (51.4%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Pending
                  </span>
                  <span className="font-bold text-gray-900">85 (16.7%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Active Tasks (Real-Time) + Throughput (Last 8 Hours) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Active Tasks Table: 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="p-3.5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xs font-bold text-gray-900">Active Tasks (Real-Time)</h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedOperation}
                  onChange={(e) => setSelectedOperation(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700"
                >
                  <option>All Operations</option>
                  <option>Picking</option>
                  <option>Packing</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700"
                >
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700"
                >
                  <option>All Zones</option>
                  <option>Aisle A</option>
                  <option>Aisle C</option>
                  <option>Aisle D</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2 px-3">Task ID</th>
                    <th className="py-2 px-3">Order ID</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Items</th>
                    <th className="py-2 px-3">Zone</th>
                    <th className="py-2 px-3">Priority</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Assigned To</th>
                    <th className="py-2 px-3">Elapsed</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {activeTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-gray-900">{t.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{t.orderId}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.type === "Picking" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{t.items}</td>
                      <td className="py-2.5 px-3 text-gray-700">{t.zone}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.priority === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{t.assignedTo}</td>
                      <td className="py-2.5 px-3 font-mono text-gray-600">{t.elapsed}</td>
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

          {/* Throughput Line Chart: 4 cols */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-gray-900">Throughput (Last 8 Hours)</h2>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Picked
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Packed
                </span>
              </div>
            </div>

            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 300 130" preserveAspectRatio="none">
                <line x1="25" y1="20" x2="290" y2="20" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="45" x2="290" y2="45" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="70" x2="290" y2="70" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="25" y1="95" x2="290" y2="95" stroke="#F1F5F9" strokeDasharray="2,2" />

                <text x="5" y="24" fill="#94A3B8" fontSize="8">100</text>
                <text x="10" y="49" fill="#94A3B8" fontSize="8">80</text>
                <text x="10" y="74" fill="#94A3B8" fontSize="8">60</text>
                <text x="10" y="99" fill="#94A3B8" fontSize="8">40</text>
                <text x="10" y="120" fill="#94A3B8" fontSize="8">20</text>

                {/* Picked Green Line */}
                <path
                  d="M35 95 L 70 85 L 105 78 L 145 70 L 180 62 L 215 55 L 250 50 L 285 40"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [35, 95], [70, 85], [105, 78], [145, 70], [180, 62], [215, 55], [250, 50], [285, 40]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#10B981" />
                ))}

                {/* Packed Amber Line */}
                <path
                  d="M35 110 L 70 102 L 105 98 L 145 92 L 180 84 L 215 78 L 250 72 L 285 65"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [35, 110], [70, 102], [105, 98], [145, 92], [180, 84], [215, 78], [250, 72], [285, 65]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#F59E0B" />
                ))}
              </svg>
              <div className="flex justify-between pl-7 pr-1 text-[8px] text-gray-400 font-medium mt-1">
                <span>8 AM</span>
                <span>9 AM</span>
                <span>10 AM</span>
                <span>11 AM</span>
                <span>12 PM</span>
                <span>1 PM</span>
                <span>2 PM</span>
                <span>3 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Zone Performance + Worker Activity + Alerts & Exceptions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Zone Performance */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5">Zone Performance</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-1">
                <span>Zone</span>
                <span>Picking (Tasks)</span>
                <span>Packing (Tasks)</span>
                <span className="text-right">Completion</span>
              </div>
              {[
                { zone: "Aisle A", pick: 58, pack: 36, rate: "62.8%" },
                { zone: "Aisle B", pick: 52, pack: 28, rate: "59.3%" },
                { zone: "Aisle C", pick: 66, pack: 40, rate: "52.9%" },
                { zone: "Aisle D", pick: 48, pack: 32, rate: "63.2%" },
                { zone: "Bulk Zone", pick: 96, pack: 54, rate: "57.6%" },
              ].map((z) => (
                <div key={z.zone} className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5 font-bold text-gray-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> {z.zone}
                  </span>
                  <span className="text-gray-600">{z.pick}</span>
                  <span className="text-gray-600">{z.pack}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: z.rate }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">{z.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Worker Activity (Top 5) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5">Worker Activity (Top 5)</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold border-b border-gray-100 pb-1">
                <span>Worker</span>
                <span>Tasks</span>
                <span>Completed</span>
                <span className="text-right">Completion Rate</span>
              </div>
              {[
                { name: "Ravi S.", tasks: 58, comp: 44, rate: "75.9%" },
                { name: "Anand K.", tasks: 52, comp: 36, rate: "69.2%" },
                { name: "Divya M.", tasks: 46, comp: 30, rate: "65.2%" },
                { name: "Karthik P.", tasks: 44, comp: 28, rate: "63.6%" },
                { name: "Suresh R.", tasks: 40, comp: 24, rate: "60.0%" },
              ].map((w) => (
                <div key={w.name} className="flex items-center justify-between py-1">
                  <span className="flex items-center gap-1.5 font-bold text-gray-800">
                    <User className="w-3.5 h-3.5 text-gray-400" /> {w.name}
                  </span>
                  <span className="text-gray-600">{w.tasks}</span>
                  <span className="text-gray-600">{w.comp}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: w.rate }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">{w.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Exceptions (4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-bold text-gray-900 flex items-center gap-1 text-rose-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Alerts & Exceptions (4)</span>
              </h2>
              <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                      Order HM-20261029-0158 delayed (Picking)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">5 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                      Item out of stock: HM-BAG-021 (Aisle C)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">12 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                      Packing station P3 overloaded (92% utilization)
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">18 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                      SLA risk: 4 orders due in next 30 mins
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">25 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
