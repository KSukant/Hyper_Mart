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
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function PackingQueuePage() {
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedStation, setSelectedStation] = useState("All Packing Stations");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const tasks = [
    {
      id: "PP-20261029-001",
      orderId: "HM-20261029-0145",
      items: 6,
      station: "Station P1",
      priority: "High",
      status: "In Progress",
      assignedTo: "Ravi S.",
      dueTime: "11:30 AM",
    },
    {
      id: "PP-20261029-002",
      orderId: "HM-20261029-0146",
      items: 4,
      station: "Station P2",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      dueTime: "11:45 AM",
    },
    {
      id: "PP-20261029-003",
      orderId: "HM-20261029-0147",
      items: 10,
      station: "Station P1",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Anand K.",
      dueTime: "12:00 PM",
    },
    {
      id: "PP-20261029-004",
      orderId: "HM-20261029-0148",
      items: 3,
      station: "Station P3",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      dueTime: "12:15 PM",
    },
    {
      id: "PP-20261029-005",
      orderId: "HM-20261029-0149",
      items: 8,
      station: "Station P2",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      dueTime: "12:30 PM",
    },
    {
      id: "PP-20261029-006",
      orderId: "HM-20261029-0150",
      items: 5,
      station: "Station P4",
      priority: "Low",
      status: "In Progress",
      assignedTo: "Divya M.",
      dueTime: "01:00 PM",
    },
    {
      id: "PP-20261029-007",
      orderId: "HM-20261029-0151",
      items: 12,
      station: "Station P1",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      dueTime: "01:15 PM",
    },
    {
      id: "PP-20261029-008",
      orderId: "HM-20261029-0152",
      items: 7,
      station: "Station P3",
      priority: "Low",
      status: "In Progress",
      assignedTo: "Karthik P.",
      dueTime: "01:30 PM",
    },
    {
      id: "PP-20261029-009",
      orderId: "HM-20261029-0153",
      items: 4,
      station: "Station P4",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      dueTime: "01:45 PM",
    },
    {
      id: "PP-20261029-010",
      orderId: "HM-20261029-0154",
      items: 9,
      station: "Station P2",
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
    <WarehouseManagerShell pageNumber={15} title="Packing Queue" currentPath="/warehouse/packing/queue">
      <div className="space-y-6">
        {/* Header matching page_15.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Packing Queue
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage and assign order packing tasks, track progress, and ensure on-time dispatch.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Packing Task</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_15.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Packing Tasks */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Packing Tasks</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">190</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +14.5% vs yesterday
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-blue-600" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">In Progress</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">72</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Active packing</div>
          </div>

          {/* Card 3: Pending */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Pending</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">46</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Awaiting station</div>
          </div>

          {/* Card 4: High Priority */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">High Priority</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">18</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Cutoff &lt; 45m</div>
          </div>

          {/* Card 5: Completed (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Completed (Today)</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">72</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Sealed & staged</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Task ID, Order ID, or SKU..."
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
              <span>All Packing Stations</span>
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
                    <th className="py-2.5 px-3">Packing Station</th>
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
                      <td className="py-2.5 px-3 text-gray-700 font-medium">{t.station}</td>
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
              <span>Showing 1 – 10 of 190 tasks</span>
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
                  19
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
                    <span className="font-bold text-gray-900">72 (37.9%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "37.9%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Pending</span>
                    <span className="font-bold text-gray-900">46 (24.2%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "24.2%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Completed</span>
                    <span className="font-bold text-gray-900">72 (37.9%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full" style={{ width: "37.9%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Packaging Summary (Today) Donut */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2">Packaging Summary (Today)</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* High 9.5% = 21.5 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="21 226" strokeDashoffset="0" />
                    {/* Medium 49.5% = 112 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="112 226" strokeDashoffset="-21" />
                    {/* Low 41.1% = 93 */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="93 226" strokeDashoffset="-133" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-base font-black text-gray-900 leading-none">190</span>
                    <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Tasks</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> High
                    </span>
                    <span className="font-bold text-gray-900">18 (9.5%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Medium
                    </span>
                    <span className="font-bold text-gray-900">94 (49.5%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Low
                    </span>
                    <span className="font-bold text-gray-900">78 (41.1%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Packing Station Utilization */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-gray-900">Packing Station Utilization</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  Overall 82.0%
                </span>
              </div>

              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-gray-400 border-b border-gray-100 font-semibold">
                    <tr>
                      <th className="pb-1.5">Station</th>
                      <th className="pb-1.5">Capacity</th>
                      <th className="pb-1.5">In Use</th>
                      <th className="pb-1.5 text-right">Utilization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr>
                      <td className="py-1.5 flex items-center gap-1.5 text-gray-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Station P1
                      </td>
                      <td className="py-1.5 text-gray-600">40</td>
                      <td className="py-1.5 text-gray-900 font-bold">34</td>
                      <td className="py-1.5 text-right font-bold text-emerald-600">85.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 flex items-center gap-1.5 text-gray-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Station P2
                      </td>
                      <td className="py-1.5 text-gray-600">40</td>
                      <td className="py-1.5 text-gray-900 font-bold">33</td>
                      <td className="py-1.5 text-right font-bold text-emerald-600">82.5%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 flex items-center gap-1.5 text-gray-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Station P3
                      </td>
                      <td className="py-1.5 text-gray-600">30</td>
                      <td className="py-1.5 text-gray-900 font-bold">24</td>
                      <td className="py-1.5 text-right font-bold text-emerald-600">80.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 flex items-center gap-1.5 text-gray-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Station P4
                      </td>
                      <td className="py-1.5 text-gray-600">30</td>
                      <td className="py-1.5 text-gray-900 font-bold">24</td>
                      <td className="py-1.5 text-right font-bold text-emerald-600">80.0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
