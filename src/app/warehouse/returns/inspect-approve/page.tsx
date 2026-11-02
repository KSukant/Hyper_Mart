"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  CheckCircle2,
  RotateCcw,
  XCircle,
  Download,
  Eye,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function InspectAndApproveReturnsPage() {
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedReturnType, setSelectedReturnType] = useState("All Return Types");
  const [selectedResult, setSelectedResult] = useState("All Inspection Results");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeReturnId, setActiveReturnId] = useState("RT-20261029-006");

  const queue = [
    {
      id: "RT-20261029-003",
      orderId: "HM-20261024-0842",
      sku: "HM-BAG-001",
      name: "Backpack 30L",
      condition: "Damaged",
      result: "Pending",
      status: "In Process",
      assignedTo: "Ravi S.",
    },
    {
      id: "RT-20261029-004",
      orderId: "HM-20261024-0846",
      sku: "HM-SHO-021",
      name: "Running Shoes",
      condition: "Good",
      result: "Approved",
      status: "Completed",
      assignedTo: "Divya M.",
    },
    {
      id: "RT-20261029-005",
      orderId: "HM-20261025-0851",
      sku: "HM-DRK-002",
      name: "Water Bottle 1L",
      condition: "Defective",
      result: "Rework",
      status: "Pending",
      assignedTo: "Anand K.",
    },
    {
      id: "RT-20261029-006",
      orderId: "HM-20261025-0856",
      sku: "HM-ACC-017",
      name: "Bluetooth Speaker",
      condition: "Damaged",
      result: "Pending",
      status: "In Process",
      assignedTo: "Karthik P.",
    },
    {
      id: "RT-20261029-007",
      orderId: "HM-20261025-0860",
      sku: "HM-APP-008",
      name: "T-Shirt (L)",
      condition: "Good",
      result: "Approved",
      status: "Completed",
      assignedTo: "Suresh R.",
    },
    {
      id: "RT-20261029-008",
      orderId: "HM-20261025-0863",
      sku: "HM-KIT-003",
      name: "Kitchen Knife Set",
      condition: "Used",
      result: "Rejected",
      status: "Completed",
      assignedTo: "Meena K.",
    },
    {
      id: "RT-20261029-009",
      orderId: "HM-20261025-0867",
      sku: "HM-BAG-001",
      name: "Backpack 30L",
      condition: "Damaged",
      result: "Rework",
      status: "Pending",
      assignedTo: "Priya N.",
    },
    {
      id: "RT-20261029-010",
      orderId: "HM-20261025-0871",
      sku: "HM-CAP-007",
      name: "Sports Cap",
      condition: "Good",
      result: "Approved",
      status: "Completed",
      assignedTo: "Akash P.",
    },
    {
      id: "RT-20261029-011",
      orderId: "HM-20261025-0874",
      sku: "HM-BOT-010",
      name: "Water Bottle 1L",
      condition: "Defective",
      result: "Pending",
      status: "In Process",
      assignedTo: "Rahul V.",
    },
    {
      id: "RT-20261029-012",
      orderId: "HM-20261025-0876",
      sku: "HM-ACC-014",
      name: "Fast Charger",
      condition: "Good",
      result: "Approved",
      status: "Completed",
      assignedTo: "Nandhini R.",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === queue.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(queue.map((q) => q.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={22} title="Inspect & Approve" currentPath="/warehouse/returns/inspect-approve">
      <div className="space-y-6">
        {/* Header matching page_22.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Inspect & Approve
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Inspect returned items, verify condition, and approve refund, replacement, or restock.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Create Inspection</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_22.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Pending Inspections */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Pending Inspections</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">68</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ -14.0% vs yesterday
            </div>
          </div>

          {/* Card 2: Approved (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Approved (Today)</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">142</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Processed returns</div>
          </div>

          {/* Card 3: Rework */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Rework</div>
              <div className="text-2xl font-black text-amber-600 leading-none mt-1">18</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Refurbish queue</div>
          </div>

          {/* Card 4: Rejected */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Rejected</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">12</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Invalid return claims</div>
          </div>

          {/* Card 5: Ready for Processing */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Ready for Processing</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">196</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">In staging bins</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Return ID, Order ID, SKU, or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Statuses</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Return Types</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Inspection Results</span>
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

        {/* Master Table + Right Side Return Details */}
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
                        checked={selectedRows.length === queue.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </th>
                    <th className="py-2.5 px-3">Return ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">SKU</th>
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3">Condition</th>
                    <th className="py-2.5 px-3">Inspection Result</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {queue.map((q) => (
                    <tr
                      key={q.id}
                      onClick={() => setActiveReturnId(q.id)}
                      className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${
                        activeReturnId === q.id ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(q.id)}
                          onChange={() => toggleSelectRow(q.id)}
                          className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{q.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{q.orderId}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-gray-700">{q.sku}</td>
                      <td className="py-2.5 px-3 text-gray-800 font-semibold">{q.name}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.condition === "Good"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : q.condition === "Defective"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {q.condition}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.result === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : q.result === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : q.result === "Rework"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {q.result}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          q.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : q.status === "In Process"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{q.assignedTo}</td>
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
              <span>Showing 1 – 10 of 68 inspections</span>
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
                  7
                </button>
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panels: 4 cols (Return Inspection Details + Approval Actions) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-900">Return Inspection Details</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  In Process
                </span>
              </div>

              <div className="text-base font-black text-gray-900 mb-2">
                RT-20261029-006
              </div>

              <div className="space-y-1.5 text-xs text-gray-700 border-b border-gray-100 pb-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order ID:</span>
                  <span className="font-mono font-bold text-gray-900">HM-20261025-0856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Customer:</span>
                  <span className="font-bold text-gray-900">Suresh M.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Return Type:</span>
                  <span className="font-bold text-gray-900">Refund</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reason:</span>
                  <span className="font-bold text-rose-600">Damaged Item</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Requested On:</span>
                  <span className="text-gray-800">29 Oct 2026, 11:29 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SLA Due By:</span>
                  <span className="text-gray-800">31 Oct 2026, 11:29 AM</span>
                </div>
              </div>

              <div className="py-3 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-900 mb-2">Items for Inspection (1)</h3>
                <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs">
                      🔊
                    </span>
                    <div>
                      <p className="font-bold text-gray-900 text-[11px] leading-tight">Bluetooth Speaker</p>
                      <p className="text-[10px] text-gray-500 font-mono">SKU: HM-ACC-017 | Qty: 1</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    Damaged
                  </span>
                </div>
              </div>

              <div className="py-3 border-b border-gray-100">
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-1">
                  <span>Inspection Notes</span>
                  <span className="text-gray-400 font-normal text-[10px]">41/250</span>
                </div>
                <p className="p-2 bg-gray-50 rounded-xl text-xs text-gray-700 border border-gray-100">
                  Outer body cracked, not fit for resale.
                </p>
              </div>

              {/* Approval Actions */}
              <div className="pt-3 space-y-2">
                <h3 className="text-xs font-bold text-gray-900">Approval Action</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-[#087A4A] border border-emerald-300 font-bold rounded-xl text-[11px] transition">
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Refund</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold rounded-xl text-[11px] transition">
                    <RotateCcw className="w-3 h-3" />
                    <span>Approve & Replace</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold rounded-xl text-[11px] transition">
                    <RotateCcw className="w-3 h-3" />
                    <span>Send to Rework</span>
                  </button>
                  <button className="flex items-center justify-center gap-1 py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold rounded-xl text-[11px] transition">
                    <X className="w-3.5 h-3.5" />
                    <span>Reject Return</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Inspection Outcome Donut + Condition Analysis + SLA Compliance + Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Inspection Outcome Donut */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Inspection Outcome</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Approved 66.4% = 150 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="150 226" strokeDashoffset="0" />
                  {/* Rework 8.5% = 19 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="19 226" strokeDashoffset="-150" />
                  {/* Rejected 5.6% = 13 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="13 226" strokeDashoffset="-169" />
                  {/* Pending 16.0% = 36 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="36 226" strokeDashoffset="-182" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-gray-900 leading-none">426</span>
                  <span className="text-[8px] text-gray-400 font-semibold mt-0.5">Inspections</span>
                </div>
              </div>

              <div className="w-full space-y-1 text-[11px] mt-1">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Approved
                  </span>
                  <span className="font-bold text-gray-900">142 (66.4%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Rework
                  </span>
                  <span className="font-bold text-gray-900">18 (8.5%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Rejected
                  </span>
                  <span className="font-bold text-gray-900">12 (5.6%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Pending
                  </span>
                  <span className="font-bold text-gray-900">68 (16.0%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Return Condition Analysis */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Return Condition Analysis</h2>
            <div className="space-y-2 text-xs">
              {[
                { label: "Good", pct: "46.9% (200)", bar: "46.9%", color: "bg-emerald-600" },
                { label: "Damaged", pct: "23.5% (100)", bar: "23.5%", color: "bg-rose-500" },
                { label: "Defective", pct: "12.9% (55)", bar: "12.9%", color: "bg-amber-500" },
                { label: "Used", pct: "9.9% (42)", bar: "9.9%", color: "bg-purple-500" },
                { label: "Other", pct: "6.8% (29)", bar: "6.8%", color: "bg-slate-400" },
              ].map((c) => (
                <div key={c.label}>
                  <div className="flex justify-between text-gray-700 mb-0.5">
                    <span>{c.label}</span>
                    <span className="font-bold text-gray-900">{c.pct}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: c.bar }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Compliance Gauge */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-2">SLA Compliance</h2>
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-28 flex items-center justify-center my-1">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="12" strokeDasharray="212 226" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="12" strokeDasharray="14 226" strokeDashoffset="-212" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-black text-gray-900 leading-none">94.1%</span>
                  <span className="text-[8px] text-gray-400 font-semibold mt-0.5">On Time</span>
                </div>
              </div>
              <div className="w-full space-y-1 text-[11px] mt-1">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> On Time
                  </span>
                  <span className="font-bold text-gray-900">401 (94.1%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Breached
                  </span>
                  <span className="font-bold text-gray-900">25 (5.9%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Trend (Last 7 Days) */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Inspection Trend (Last 7 Days)</h2>
            <div className="h-28 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 240 80" preserveAspectRatio="none">
                <line x1="20" y1="15" x2="230" y2="15" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="20" y1="35" x2="230" y2="35" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="20" y1="55" x2="230" y2="55" stroke="#F1F5F9" strokeDasharray="2,2" />

                <text x="5" y="18" fill="#94A3B8" fontSize="7">80</text>
                <text x="5" y="38" fill="#94A3B8" fontSize="7">60</text>
                <text x="5" y="58" fill="#94A3B8" fontSize="7">40</text>
                <text x="10" y="75" fill="#94A3B8" fontSize="7">0</text>

                <path
                  d="M25 58 L 58 52 L 92 50 L 126 44 L 160 40 L 194 36 L 225 32"
                  stroke="#10B981"
                  strokeWidth="2"
                  fill="none"
                />
                {[
                  [25, 58], [58, 52], [92, 50], [126, 44], [160, 40], [194, 36], [225, 32]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#10B981" />
                ))}
              </svg>
              <div className="flex justify-between pl-5 pr-1 text-[7px] text-gray-400 font-medium mt-1">
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
      </div>
    </WarehouseManagerShell>
  );
}
