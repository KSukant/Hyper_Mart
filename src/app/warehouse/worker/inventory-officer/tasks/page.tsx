"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  User,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Search,
  ChevronDown,
  List,
  LayoutGrid,
  Play,
  ChevronLeft,
  ChevronRight,
  Home,
  ClipboardList,
  Target,
  Barcode,
  Check,
} from "lucide-react";
import { WarehouseWorkerShell, WorkerStep } from "@/components/warehouse/WarehouseWorkerShell";

const IO_TASK_STEPS: WorkerStep[] = [
  { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Home },
  { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
  { stepNum: 3, label: "Current Task", href: "/warehouse/worker/inventory-officer/current", icon: Target },
  { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/inventory-officer/scan-result", icon: Barcode },
  { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/inventory-officer/issue-report", icon: AlertTriangle },
  { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/inventory-officer/issue-report-final", icon: CheckCircle2 },
];

export default function InventoryOfficerTaskQueuePage() {
  const [search, setSearch] = useState("");
  const [taskTypeFilter, setTaskTypeFilter] = useState("All Types");
  const [binFilter, setBinFilter] = useState("All Bins");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const tasks = [
    {
      num: 1,
      id: "INV-4821",
      type: "Receive Goods",
      sku: "SK-BT-014 – Steel Water Bottle",
      bin: "A-01-03",
      qty: 50,
      prio: "High",
      prioColor: "red",
      due: "20 min",
      status: "In Progress",
      action: "Continue",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 2,
      id: "INV-4822",
      type: "Stock Update",
      sku: "SK-HP-001 – Headphones",
      bin: "B-02-01",
      qty: 30,
      prio: "High",
      prioColor: "red",
      due: "35 min",
      status: "Assigned",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 3,
      id: "INV-4823",
      type: "Cycle Count",
      sku: "Multiple Items (12)",
      bin: "Aisle A",
      qty: "-",
      prio: "Medium",
      prioColor: "amber",
      due: "1 hr",
      status: "Pending",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 4,
      id: "INV-4824",
      type: "Replenishment",
      sku: "SK-MS-007 – Wireless Mouse",
      bin: "C-01-02",
      qty: 40,
      prio: "Medium",
      prioColor: "amber",
      due: "2 hr",
      status: "Pending",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 5,
      id: "INV-4825",
      type: "Stock Adjustment",
      sku: "SK-BG-021 – Laptop Backpack",
      bin: "B-04-02",
      qty: "-",
      prio: "Low",
      prioColor: "green",
      due: "3 hr",
      status: "Assigned",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 6,
      id: "INV-4826",
      type: "Receive Goods",
      sku: "SK-CB-009 – USB-C Cable",
      bin: "A-03-01",
      qty: 100,
      prio: "Medium",
      prioColor: "amber",
      due: "4 hr",
      status: "In Progress",
      action: "Continue",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 7,
      id: "INV-4827",
      type: "Cycle Count",
      sku: "Aisle B (All Items)",
      bin: "Aisle B",
      qty: "-",
      prio: "Low",
      prioColor: "green",
      due: "5 hr",
      status: "Assigned",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
    {
      num: 8,
      id: "INV-4828",
      type: "Replenishment",
      sku: "SK-EL-102 – Power Bank",
      bin: "C-02-03",
      qty: 25,
      prio: "High",
      prioColor: "red",
      due: "6 hr",
      status: "Pending",
      action: "Start",
      actionHref: "/warehouse/worker/inventory-officer/current",
    },
  ];

  return (
    <WarehouseWorkerShell
      role="INVENTORY_OFFICER"
      workerName="Sukant K."
      roleTitle="Inventory Officer > My Task Queue"
      steps={IO_TASK_STEPS}
      currentStepIndex={1}
      pageNumber={57}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Task Queue</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            View and manage assigned inventory tasks.
          </p>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Total Tasks */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Total Tasks
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                24
              </span>
            </div>
          </div>

          {/* 2. Assigned */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Assigned
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                12
              </span>
            </div>
          </div>

          {/* 3. In Progress */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                In Progress
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                5
              </span>
            </div>
          </div>

          {/* 4. Pending */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Pending
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                4
              </span>
            </div>
          </div>

          {/* 5. Completed */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Completed
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                3
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <input
              type="text"
              placeholder="Search by Task ID, SKU or Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-9 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="relative">
              <select
                value={taskTypeFilter}
                onChange={(e) => setTaskTypeFilter(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All Types</option>
                <option>Receive Goods</option>
                <option>Stock Update</option>
                <option>Cycle Count</option>
                <option>Replenishment</option>
                <option>Stock Adjustment</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={binFilter}
                onChange={(e) => setBinFilter(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All Bins</option>
                <option>A-01-03</option>
                <option>B-02-01</option>
                <option>C-01-02</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-2 rounded-xl border border-gray-300 font-semibold text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Pending</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* List / Grid toggles */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden p-0.5 bg-gray-50">
              <button className="p-1.5 rounded-lg bg-white text-emerald-700 shadow-2xs">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700">
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-bold text-gray-600 bg-gray-50/70 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3.5">#</th>
                  <th className="py-3 px-3.5">Task ID</th>
                  <th className="py-3 px-3.5">Task Type</th>
                  <th className="py-3 px-3.5">SKU / Item</th>
                  <th className="py-3 px-3.5">Location (Bin)</th>
                  <th className="py-3 px-3.5 text-center">Qty</th>
                  <th className="py-3 px-3.5">Priority</th>
                  <th className="py-3 px-3.5">Due In</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {tasks.map((row) => (
                  <tr key={row.num} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-3.5 font-bold text-gray-800">{row.num}</td>
                    <td className="py-3.5 px-3.5 font-mono font-bold text-gray-900">{row.id}</td>
                    <td className="py-3.5 px-3.5 text-gray-900 font-semibold">{row.type}</td>
                    <td className="py-3.5 px-3.5 text-gray-800 font-medium">{row.sku}</td>
                    <td className="py-3.5 px-3.5 font-mono text-gray-700">{row.bin}</td>
                    <td className="py-3.5 px-3.5 text-center font-bold text-gray-900">{row.qty}</td>
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          row.prioColor === "red"
                            ? "bg-rose-50 text-rose-700"
                            : row.prioColor === "amber"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {row.prio}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-gray-600 font-medium">{row.due}</td>
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                          row.status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : row.status === "Assigned"
                            ? "bg-blue-50 text-blue-800"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {row.status === "In Progress" && <RotateCcw className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      <Link
                        href={row.actionHref}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs transition shadow-2xs"
                      >
                        <span>▷</span>
                        <span>{row.action}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="p-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <div>
              Showing <span className="font-bold text-gray-900">1 – 8</span> of{" "}
              <span className="font-bold text-gray-900">24</span> tasks
            </div>

            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#087A4A] text-white font-bold flex items-center justify-center shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center">
                3
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
