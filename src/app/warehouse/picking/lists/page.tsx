"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
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

export default function PickListPage() {
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activePickListId, setActivePickListId] = useState("PL-20261029-001");

  const pickLists = [
    {
      id: "PL-20261029-001",
      orderId: "HM-20261029-0145",
      items: 6,
      zone: "Aisle A",
      priority: "High",
      status: "In Progress",
      assignedTo: "Ravi S.",
      createdAt: "10:30 AM",
    },
    {
      id: "PL-20261029-002",
      orderId: "HM-20261029-0146",
      items: 4,
      zone: "Aisle B",
      priority: "High",
      status: "Pending",
      assignedTo: "—",
      createdAt: "10:45 AM",
    },
    {
      id: "PL-20261029-003",
      orderId: "HM-20261029-0147",
      items: 10,
      zone: "Aisle C",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Anand K.",
      createdAt: "11:00 AM",
    },
    {
      id: "PL-20261029-004",
      orderId: "HM-20261029-0148",
      items: 3,
      zone: "Aisle A",
      priority: "Medium",
      status: "Pending",
      assignedTo: "—",
      createdAt: "11:10 AM",
    },
    {
      id: "PL-20261029-005",
      orderId: "HM-20261029-0149",
      items: 8,
      zone: "Aisle D",
      priority: "High",
      status: "In Progress",
      assignedTo: "Divya M.",
      createdAt: "11:25 AM",
    },
    {
      id: "PL-20261029-006",
      orderId: "HM-20261029-0150",
      items: 5,
      zone: "Bulk Zone",
      priority: "Low",
      status: "Completed",
      assignedTo: "Karthik P.",
      createdAt: "09:50 AM",
    },
    {
      id: "PL-20261029-007",
      orderId: "HM-20261029-0151",
      items: 12,
      zone: "Aisle E",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Ravi S.",
      createdAt: "11:40 AM",
    },
    {
      id: "PL-20261029-008",
      orderId: "HM-20261029-0152",
      items: 7,
      zone: "Aisle C",
      priority: "Low",
      status: "Pending",
      assignedTo: "—",
      createdAt: "11:55 AM",
    },
    {
      id: "PL-20261029-009",
      orderId: "HM-20261029-0153",
      items: 4,
      zone: "Aisle D",
      priority: "Medium",
      status: "Completed",
      assignedTo: "Divya M.",
      createdAt: "09:30 AM",
    },
    {
      id: "PL-20261029-010",
      orderId: "HM-20261029-0154",
      items: 9,
      zone: "Aisle B",
      priority: "High",
      status: "In Progress",
      assignedTo: "Anand K.",
      createdAt: "12:05 PM",
    },
  ];

  const items = [
    { num: 1, sku: "HM-BAG-001", name: "Backpack 30L", loc: "A-01-02", qty: 1, picked: true },
    { num: 2, sku: "HM-SHO-021", name: "Running Shoes", loc: "A-02-03", qty: 1, picked: true },
    { num: 3, sku: "HM-APP-008", name: "T-Shirt (L)", loc: "A-03-01", qty: 2, picked: false },
    { num: 4, sku: "HM-ACC-017", name: "Bluetooth Speaker", loc: "A-04-02", qty: 1, picked: false },
    { num: 5, sku: "HM-DRK-002", name: "Water Bottle 1L", loc: "A-04-05", qty: 1, picked: false },
    { num: 6, sku: "HM-KIT-003", name: "Kitchen Knife Set", loc: "A-05-01", qty: 1, picked: false },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === pickLists.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(pickLists.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={16} title="Pick List" currentPath="/warehouse/picking/lists">
      <div className="space-y-6">
        {/* Header matching page_16.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Pick List
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              View and manage pick lists for order fulfillment, with item details, bin locations, and picking progress.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Generate Pick List</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_16.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Pick Lists */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Pick Lists</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">148</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-2">
              ↑ +10.4% vs yesterday
            </div>
          </div>

          {/* Card 2: Open */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Play className="w-4 h-4 fill-blue-600" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Open</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">64</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Unassigned waves</div>
          </div>

          {/* Card 3: In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">In Progress</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">38</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Active walking paths</div>
          </div>

          {/* Card 4: Completed (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Completed (Today)</div>
              <div className="text-2xl font-black text-gray-900 leading-none mt-1">42</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">Picked to tote</div>
          </div>

          {/* Card 5: Overdue */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Overdue</div>
              <div className="text-2xl font-black text-rose-600 leading-none mt-1">4</div>
            </div>
            <div className="text-[11px] font-medium text-gray-400 mt-2">SLA cutoff exceeded</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Pick List ID, Order ID, or SKU..."
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
              <span>All Priorities</span>
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

        {/* Master Table + Right Side Pick List Details & Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Table: 7 cols */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === pickLists.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </th>
                    <th className="py-2.5 px-3">Pick List ID</th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Zone</th>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Assigned To</th>
                    <th className="py-2.5 px-3">Created At</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {pickLists.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() => setActivePickListId(p.id)}
                      className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${
                        activePickListId === p.id ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(p.id)}
                          onChange={() => toggleSelectRow(p.id)}
                          className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{p.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{p.orderId}</td>
                      <td className="py-2.5 px-3 text-gray-900 font-bold">{p.items}</td>
                      <td className="py-2.5 px-3 text-gray-700">{p.zone}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.priority === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : p.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {p.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === "In Progress"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : p.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{p.assignedTo}</td>
                      <td className="py-2.5 px-3 text-gray-600">{p.createdAt}</td>
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
              <span>Showing 1 – 10 of 148 pick lists</span>
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
                  15
                </button>
                <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panels: 5 cols (Pick List Details + Items + Progress) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Pick List Details */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-900">Pick List Details</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  In Progress
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">Pick List ID</span>
                  <span className="font-bold text-gray-900">PL-20261029-001</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Order ID</span>
                  <span className="font-bold text-gray-900 font-mono text-[11px]">HM-20261029-0145</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Assigned To</span>
                  <span className="font-bold text-gray-900">Ravi S.</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Zone</span>
                  <span className="font-bold text-gray-900">Aisle A</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Items</span>
                  <span className="font-bold text-gray-900">6</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Created At</span>
                  <span className="font-bold text-gray-900">29 Oct 2026, 10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Pick List Items (6) */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2.5">Pick List Items (6)</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-gray-400 border-b border-gray-100 font-semibold">
                    <tr>
                      <th className="pb-1.5 w-6">#</th>
                      <th className="pb-1.5">SKU</th>
                      <th className="pb-1.5">Item Name</th>
                      <th className="pb-1.5">Location</th>
                      <th className="pb-1.5 text-center">Qty</th>
                      <th className="pb-1.5 text-right">Picked</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {items.map((it) => (
                      <tr key={it.num}>
                        <td className="py-2 text-gray-400">{it.num}</td>
                        <td className="py-2 font-mono text-[10px] text-gray-600">{it.sku}</td>
                        <td className="py-2 font-semibold text-gray-900">{it.name}</td>
                        <td className="py-2 text-gray-600">{it.loc}</td>
                        <td className="py-2 text-center font-bold text-gray-900">{it.qty}</td>
                        <td className="py-2 text-right">
                          {it.picked ? (
                            <span className="inline-flex w-4 h-4 rounded-full bg-emerald-600 text-white items-center justify-center text-[10px]">
                              ✓
                            </span>
                          ) : (
                            <span className="inline-flex w-4 h-4 rounded-full border border-gray-300" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Picking Progress */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-gray-900">Picking Progress</span>
                <span className="font-bold text-gray-900">2 / 6 Items (33.3%)</span>
              </div>
              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-emerald-700 rounded-full" style={{ width: "33.3%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
