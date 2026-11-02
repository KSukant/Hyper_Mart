"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Layers,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
  Zap,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
  CheckSquare,
  Square,
  BarChart3,
  BookOpen,
  ShoppingCart,
  Plus,
  Home,
  Clock,
  ArrowLeftRight,
  Bell,
  FileCheck,
} from "lucide-react";
import { WarehouseWorkerShell, WorkerStep } from "@/components/warehouse/WarehouseWorkerShell";

const INVENTORY_OFFICER_HOME_STEPS: WorkerStep[] = [
  { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Home },
  { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
  { stepNum: 3, label: "Inventory", href: "/warehouse/inventory", icon: Layers },
  { stepNum: 4, label: "Stock Operations", href: "/warehouse/inventory/movements", icon: ArrowLeftRight },
  { stepNum: 5, label: "Cycle Count", href: "/warehouse/inventory/stock-take", icon: FileCheck },
  { stepNum: 6, label: "Reports", href: "/warehouse/reports/operational", icon: BarChart3 },
  { stepNum: 7, label: "Alerts & Replenishment", href: "/warehouse/capacity/deadline-alerts", icon: Bell },
];

export default function InventoryOfficerHomePage() {
  return (
    <WarehouseWorkerShell
      role="INVENTORY_OFFICER"
      workerName="Sukant K."
      roleTitle="Inventory Officer – Role Home"
      steps={INVENTORY_OFFICER_HOME_STEPS}
      currentStepIndex={0}
      pageNumber={56}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Inventory Officer Workspace
          </h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            Manage inventory, stock updates, cycle counts and replenishment activities.
          </p>
        </div>

        {/* Banner Card */}
        <div className="relative rounded-2xl bg-[#FFF8E6] border border-[#FDE68A] overflow-hidden flex flex-col md:flex-row items-stretch justify-between shadow-2xs">
          <div className="p-6 md:p-8 flex items-center gap-4 z-10 max-w-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0 text-amber-600 shadow-2xs">
              <Package className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                Inventory Officer
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
                Maintain accurate inventory, ensure stock availability and handle replenishment.
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-96 h-36 md:h-auto min-h-[120px] flex-shrink-0">
            <Image
              src="/warehouse/items/inv-banner.png"
              alt="Inventory Racks"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* 5 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Total SKUs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Total SKUs
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                12,846
              </span>
            </div>
          </div>

          {/* 2. In Stock */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                In Stock
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                11,972
              </span>
            </div>
          </div>

          {/* 3. Low Stock */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Low Stock
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                542
              </span>
            </div>
          </div>

          {/* 4. Out of Stock */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Out of Stock
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                87
              </span>
            </div>
          </div>

          {/* 5. Replenishment Due */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-500 block leading-tight">
                Replenishment Due
              </span>
              <span className="text-2xl font-black text-gray-900 block leading-tight mt-0.5">
                36
              </span>
            </div>
          </div>
        </div>

        {/* Middle Row: Quick Actions, Inventory Health, Today's Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Quick Actions (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5">
              <Link
                href="/warehouse/worker/inventory-officer/current"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 transition text-center group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 text-emerald-700 flex items-center justify-center mb-1.5 transition">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-900 leading-tight">Update</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">Stock</span>
              </Link>

              <Link
                href="/warehouse/worker/inventory-officer/tasks"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 transition text-center group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-100 group-hover:bg-amber-200 text-amber-700 flex items-center justify-center mb-1.5 transition">
                  <ArrowDownToLine className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-900 leading-tight">Receive</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">Goods</span>
              </Link>

              <Link
                href="/warehouse/worker/inventory-officer/tasks"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-rose-50/70 hover:bg-rose-100/70 border border-rose-200 transition text-center group"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-100 group-hover:bg-rose-200 text-rose-700 flex items-center justify-center mb-1.5 transition">
                  <ArrowUpFromLine className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-900 leading-tight">Issue</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">Stock</span>
              </Link>

              <Link
                href="/warehouse/worker/inventory-officer/tasks"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200 transition text-center group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-100 group-hover:bg-purple-200 text-purple-700 flex items-center justify-center mb-1.5 transition">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-gray-900 leading-tight">Cycle</span>
                <span className="text-xs font-bold text-gray-900 leading-tight">Count</span>
              </Link>
            </div>
          </div>

          {/* Inventory Health Donut (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Inventory Health</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* SVG Donut */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#E5E7EB"
                    strokeWidth="13"
                  />
                  {/* In Stock 93.2% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#087A4A"
                    strokeWidth="13"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.932)}
                  />
                  {/* Low Stock 4.2% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#FBBF24"
                    strokeWidth="13"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.042)}
                    className="rotate-[335deg] origin-center"
                  />
                  {/* Out of stock 0.7% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#DC2626"
                    strokeWidth="13"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.01)}
                    className="rotate-[350deg] origin-center"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-none">93.2%</span>
                  <span className="text-[9px] font-bold text-gray-500 leading-tight mt-1">
                    Stock
                    <br />
                    Availability
                  </span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 text-xs flex-1 w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#087A4A]" />
                    <span className="text-gray-600 font-medium">In Stock</span>
                  </div>
                  <span className="font-bold text-gray-900">11,972 (93.2%)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#FBBF24]" />
                    <span className="text-gray-600 font-medium">Low Stock</span>
                  </div>
                  <span className="font-bold text-gray-900">542 (4.2%)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                    <span className="text-gray-600 font-medium">Out of Stock</span>
                  </div>
                  <span className="font-bold text-gray-900">87 (0.7%)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-gray-300" />
                    <span className="text-gray-600 font-medium">Blocked / Hold</span>
                  </div>
                  <span className="font-bold text-gray-900">249 (1.9%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Activities (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Today's Activities</h3>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: "Stock Receipts", count: 5, checked: true },
                { label: "Stock Issues (Pick/Pack)", count: 18, checked: true },
                { label: "Stock Adjustments", count: 2, checked: false },
                { label: "Cycle Count Tasks", count: 6, checked: false },
                { label: "Replenishment Orders", count: 3, checked: false },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {act.checked ? (
                      <div className="w-4 h-4 rounded-md bg-[#087A4A] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-md border border-gray-300 bg-white" />
                    )}
                    <span className="font-medium text-gray-700 text-[11px]">{act.label}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    {act.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: My Task Queue, Stock Movement, Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* My Task Queue (12) (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">My Task Queue (12)</h3>
              </div>
              <Link
                href="/warehouse/worker/inventory-officer/tasks"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="pb-2 font-semibold">#</th>
                    <th className="pb-2 font-semibold">Task</th>
                    <th className="pb-2 font-semibold">SKU / Item</th>
                    <th className="pb-2 font-semibold">Priority</th>
                    <th className="pb-2 font-semibold">Due In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[11px]">
                  {[
                    { num: 1, task: "Receive Goods", sku: "SK-HP-001", prio: "High", due: "30 min", color: "red" },
                    { num: 2, task: "Stock Update", sku: "SK-BT-014", prio: "High", due: "45 min", color: "red" },
                    { num: 3, task: "Cycle Count", sku: "Aisle A-03", prio: "Medium", due: "1 hr", color: "amber" },
                    { num: 4, task: "Replenish Stock", sku: "SK-MS-007", prio: "Medium", due: "2 hr", color: "amber" },
                    { num: 5, task: "Stock Adjustment", sku: "SK-BG-021", prio: "Low", due: "3 hr", color: "green" },
                  ].map((t) => (
                    <tr key={t.num}>
                      <td className="py-2 font-bold text-gray-700">{t.num}</td>
                      <td className="py-2 font-semibold text-gray-900">{t.task}</td>
                      <td className="py-2 font-mono text-gray-600">{t.sku}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            t.color === "red"
                              ? "bg-rose-50 text-rose-700"
                              : t.color === "amber"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {t.prio}
                        </span>
                      </td>
                      <td className="py-2 text-gray-500 font-medium">{t.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stock Movement (Today) (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Stock Movement (Today)</h3>
            </div>

            {/* Vertical Bar Chart */}
            <div className="pt-2 h-44 flex items-end justify-between gap-4 px-2">
              {/* Y Axis markings */}
              <div className="h-full flex flex-col justify-between text-[10px] text-gray-400 font-mono pr-2 border-r border-gray-100">
                <span>1,500</span>
                <span>1,200</span>
                <span>900</span>
                <span>600</span>
                <span>300</span>
                <span>0</span>
              </div>

              {/* Bar 1: Received 1,248 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold text-gray-800">1,248</span>
                <div
                  className="w-full max-w-[42px] rounded-t-lg bg-[#087A4A] transition-all"
                  style={{ height: "83%" }}
                />
                <span className="text-[10px] font-semibold text-gray-600 mt-1">Received</span>
              </div>

              {/* Bar 2: Issued 1,036 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold text-gray-800">1,036</span>
                <div
                  className="w-full max-w-[42px] rounded-t-lg bg-[#F59E0B] transition-all"
                  style={{ height: "69%" }}
                />
                <span className="text-[10px] font-semibold text-gray-600 mt-1">Issued</span>
              </div>

              {/* Bar 3: Adjusted 87 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold text-gray-800">87</span>
                <div
                  className="w-full max-w-[42px] rounded-t-lg bg-[#DC2626] transition-all"
                  style={{ height: "6%" }}
                />
                <span className="text-[10px] font-semibold text-gray-600 mt-1">Adjusted</span>
              </div>

              {/* Bar 4: Replenished 542 */}
              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold text-gray-800">542</span>
                <div
                  className="w-full max-w-[42px] rounded-t-lg bg-[#A855F7] transition-all"
                  style={{ height: "36%" }}
                />
                <span className="text-[10px] font-semibold text-gray-600 mt-1">Replenished</span>
              </div>
            </div>
          </div>

          {/* Inventory Alerts (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Inventory Alerts</h3>
              </div>
              <Link
                href="/warehouse/capacity/deadline-alerts"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-rose-50/60 border border-rose-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-[11px]">
                    SK-EL-102 – Out of stock
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">10 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-[11px]">
                    SK-BT-014 – Below reorder level (12 left)
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">18 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-[11px]">
                    SK-MS-007 – Low stock (15 left)
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">25 min ago</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-[11px]">
                    Cycle count due – Aisle B-02
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 whitespace-nowrap">40 min ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/warehouse/reports/operational"
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs"
          >
            <BarChart3 className="w-4 h-4 text-gray-500" />
            Inventory Report
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href="/warehouse/inventory/movements"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-gray-500" />
              Stock Ledger
            </Link>
            <Link
              href="/warehouse/capacity/workload-forecast"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-gray-500" />
              Reorder List
            </Link>
            <Link
              href="/warehouse/worker/inventory-officer/tasks"
              className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Create Inventory Task
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
