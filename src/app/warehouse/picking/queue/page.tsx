"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Play,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Download,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function PickingQueuePage() {
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const tasks = [
    {
      id: "PK-20261029-001",
      orderId: "HM-20261029-0145",
      items: 6,
      location: "Aisle A – A1-05",
      priority: "High",
      status: "In Progress",
      assignedTo: "Ravi S.",
      dueTime: "11:30 AM",
    },
    {
      id: "PK-20261029-002",
      orderId: "HM-20261029-0146",
      items: 4,
      location: "Aisle B – B2-03",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      dueTime: "11:45 AM",
    },
    {
      id: "PK-20261029-003",
      orderId: "HM-20261029-0147",
      items: 10,
      location: "Aisle C – C3-01",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Anand K.",
      dueTime: "12:00 PM",
    },
    {
      id: "PK-20261029-004",
      orderId: "HM-20261029-0148",
      items: 3,
      location: "Aisle A – A2-04",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      dueTime: "12:15 PM",
    },
    {
      id: "PK-20261029-005",
      orderId: "HM-20261029-0149",
      items: 8,
      location: "Aisle D – D1-02",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      dueTime: "12:30 PM",
    },
    {
      id: "PK-20261029-006",
      orderId: "HM-20261029-0150",
      items: 5,
      location: "Aisle B – B3-07",
      priority: "Low",
      status: "Pending",
      assignedTo: "—",
      dueTime: "01:00 PM",
    },
    {
      id: "PK-20261029-007",
      orderId: "HM-20261029-0151",
      items: 12,
      location: "Bulk Zone – BK-01",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Divya M.",
      dueTime: "01:15 PM",
    },
    {
      id: "PK-20261029-008",
      orderId: "HM-20261029-0152",
      items: 7,
      location: "Aisle E – E2-06",
      priority: "Low",
      status: "Pending",
      assignedTo: "—",
      dueTime: "01:30 PM",
    },
    {
      id: "PK-20261029-009",
      orderId: "HM-20261029-0153",
      items: 4,
      location: "Aisle C – C1-04",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      dueTime: "01:45 PM",
    },
    {
      id: "PK-20261029-010",
      orderId: "HM-20261029-0154",
      items: 9,
      location: "Aisle D – D2-05",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      dueTime: "02:00 PM",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === tasks.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tasks.map((t) => t.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={14} title="Picking Queue" currentPath="/warehouse/picking/queue">
      <div className="space-y-6">
        {/* Header matching page_14.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Picking Queue
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage and assign order picking tasks to warehouse workers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Picking Task</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_14.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Picking Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Picking Tasks</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">320</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +12.5% vs yesterday
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-blue-600" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">In Progress</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">190</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Active picking</div>
          </div>

          {/* Card 3: Pending */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Pending</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">85</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Awaiting pickers</div>
          </div>

          {/* Card 4: High Priority */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">High Priority</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">25</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Urgent SLA cutoffs</div>
          </div>

          {/* Card 5: Completed (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Completed (Today)</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">145</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Fulfilled pick lines</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, SKU, or Item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Priorities</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Statuses</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Zones</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>Today</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Master Table + Right Side Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Table: 8 cols */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === tasks.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </th>
                    <th className="py-2.5 px-3">Task ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Pick Location</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3">Due Time</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {tasks.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(t.id)}
                          onChange={() => toggleSelectRow(t.id)}
                          className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{t.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{t.orderId}</td>
                      <td className="py-2.5 px-3 text-gray-900 font-bold">{t.items}</td>
                      <td className="py-2.5 px-3 text-gray-700">{t.location}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.priority === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : t.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
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
                      <td className="py-2.5 px-3 text-gray-600">{t.dueTime}</td>
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

            {/* Pagination footer */}
            <div className="p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span>Showing 1 – 10 of 320 tasks</span>
              <div className="flex items-center gap-1">
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
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  4
                </button>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  5
                </button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                  32
                </button>
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panels: 4 cols */}
          <div className="lg:col-span-4 space-y-5">
            {/* Queue Status */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2.5">Queue Status</h2>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>In Progress</span>
                    <span className="font-bold text-gray-900">190 (59.4%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "59.4%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Pending</span>
                    <span className="font-bold text-gray-900">85 (26.6%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "26.6%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Completed</span>
                    <span className="font-bold text-gray-900">145 (45.3%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full" style={{ width: "45.3%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Breakdown Donut */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2">Priority Breakdown</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* High 7.8% = 17.6 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="18 226" strokeDashoffset="0" />
                    {/* Medium 56.3% = 127 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="127 226" strokeDashoffset="-18" />
                    {/* Low 35.9% = 81 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="81 226" strokeDashoffset="-145" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-gray-900 leading-none">320</span>
                    <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Tasks</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> High
                    </span>
                    <span className="font-bold text-gray-900">25 (7.8%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Medium
                    </span>
                    <span className="font-bold text-gray-900">180 (56.3%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Low
                    </span>
                    <span className="font-bold text-gray-900">115 (35.9%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Workforce */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>Assigned Workforce</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  66.7% Utilization
                </span>
              </div>

              <div className="text-lg font-black text-gray-900">
                8 / 12 <span className="text-xs font-medium text-gray-500">Workers Assigned</span>
              </div>

              {/* 12 Avatar dots (8 active, 4 available) */}
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full bg-[#087A4A] text-white flex items-center justify-center text-[9px] font-bold shadow-2xs"
                    title={`Worker #${i + 1} Active`}
                  >
                    ✓
                  </div>
                ))}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i + 8}
                    className="w-5 h-5 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[9px] font-bold"
                    title={`Worker #${i + 9} Idle`}
                  >
                    ·
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
