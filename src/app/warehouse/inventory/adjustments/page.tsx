"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  ArrowUp,
  ArrowDown,
  Scale,
  Search,
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function StockAdjustmentsPage() {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedReason, setSelectedReason] = useState("All Reasons");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const adjustments = [
    {
      id: "ADJ-20261029-001",
      dateTime: "29 Oct 2026, 10:45 AM",
      sku: "HM-BAG-001",
      name: "Backpack 30L",
      type: "Increase",
      qty: "+30",
      reason: "Stock Count",
      status: "Completed",
      adjustedBy: "Ravi S.",
    },
    {
      id: "ADJ-20261029-002",
      dateTime: "29 Oct 2026, 09:50 AM",
      sku: "HM-SHO-021",
      name: "Running Shoes",
      type: "Decrease",
      qty: "-12",
      reason: "Damaged",
      status: "Completed",
      adjustedBy: "Anand K.",
    },
    {
      id: "ADJ-20261028-005",
      dateTime: "28 Oct 2026, 04:10 PM",
      sku: "HM-ACC-017",
      name: "Bluetooth Speaker",
      type: "Increase",
      qty: "+10",
      reason: "Found Stock",
      status: "Completed",
      adjustedBy: "Divya M.",
    },
    {
      id: "ADJ-20261028-004",
      dateTime: "28 Oct 2026, 02:35 PM",
      sku: "HM-HOME-006",
      name: "Desk Lamp",
      type: "Decrease",
      qty: "-5",
      reason: "Quality Issue",
      status: "Completed",
      adjustedBy: "Ravi S.",
    },
    {
      id: "ADJ-20261027-003",
      dateTime: "27 Oct 2026, 11:20 AM",
      sku: "HM-KIT-003",
      name: "Kitchen Knife Set",
      type: "Decrease",
      qty: "-8",
      reason: "Expired",
      status: "Completed",
      adjustedBy: "Karthik P.",
    },
    {
      id: "ADJ-20261027-002",
      dateTime: "27 Oct 2026, 10:05 AM",
      sku: "HM-ELC-014",
      name: "Power Bank 20K",
      type: "Increase",
      qty: "+15",
      reason: "Recount Difference",
      status: "Completed",
      adjustedBy: "Divya M.",
    },
    {
      id: "ADJ-20261026-001",
      dateTime: "26 Oct 2026, 04:40 PM",
      sku: "HM-STA-009",
      name: "Notebook A5",
      type: "Decrease",
      qty: "-20",
      reason: "Damaged",
      status: "Completed",
      adjustedBy: "Anand K.",
    },
    {
      id: "ADJ-20261025-006",
      dateTime: "25 Oct 2026, 03:15 PM",
      sku: "HM-DRK-002",
      name: "Water Bottle 1L",
      type: "Increase",
      qty: "+40",
      reason: "Found Stock",
      status: "Completed",
      adjustedBy: "Ravi S.",
    },
    {
      id: "ADJ-20261025-005",
      dateTime: "25 Oct 2026, 11:05 AM",
      sku: "HM-FIT-011",
      name: "Yoga Mat",
      type: "Decrease",
      qty: "-6",
      reason: "Customer Return",
      status: "Completed",
      adjustedBy: "Karthik P.",
    },
    {
      id: "ADJ-20261025-004",
      dateTime: "25 Oct 2026, 09:30 AM",
      sku: "HM-APP-008",
      name: "T-Shirt (L)",
      type: "Increase",
      qty: "+24",
      reason: "Stock Reconciliation",
      status: "Completed",
      adjustedBy: "Divya M.",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === adjustments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(adjustments.map((a) => a.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={12} title="Adjustments" currentPath="/warehouse/inventory/adjustments">
      <div className="space-y-6">
        {/* Header matching page_12.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Adjustments
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage stock corrections for damaged, lost, found or other inventory changes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Download className="w-3.5 h-3.5 text-gray-500" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>New Adjustment</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards (Exact from page_12.png) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Adjustments */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Total Adjustments</div>
              <div className="text-3xl font-black text-gray-900 leading-none mt-1">84</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-3">
              ↑ +12.0% vs last 7 days
            </div>
          </div>

          {/* Card 2: Increased */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Increased</div>
              <div className="text-3xl font-black text-gray-900 leading-none mt-1">36</div>
            </div>
            <div className="text-[11px] font-bold text-emerald-600 mt-3">
              ↑ +20.0%
            </div>
          </div>

          {/* Card 3: Decreased */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowDown className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Decreased</div>
              <div className="text-3xl font-black text-gray-900 leading-none mt-1">42</div>
            </div>
            <div className="text-[11px] font-bold text-rose-600 mt-3">
              ↑ +5.0%
            </div>
          </div>

          {/* Card 4: Net Change */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div className="mt-3">
              <div className="text-xs text-gray-500 font-medium">Net Change</div>
              <div className="text-3xl font-black text-emerald-600 leading-none mt-1">+124</div>
            </div>
            <div className="text-[11px] font-bold text-gray-400 mt-3">
              Overall delta balance
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Adjustment ID, SKU or Item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Types</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Reasons</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Status</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>Last 7 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Adjustments Master Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === adjustments.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                    />
                  </th>
                  <th className="py-2.5 px-3">Adjustment ID</th>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Item Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Qty Change</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Adjusted By</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {adjustments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(a.id)}
                        onChange={() => toggleSelectRow(a.id)}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">{a.id}</td>
                    <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{a.dateTime}</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-gray-700">{a.sku}</td>
                    <td className="py-2.5 px-3 text-gray-800 font-semibold">{a.name}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        a.type === "Increase"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        {a.type}
                      </span>
                    </td>
                    <td className={`py-2.5 px-3 font-bold ${
                      a.qty.startsWith("+") ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {a.qty}
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{a.reason}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {a.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700">{a.adjustedBy}</td>
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

          {/* Pagination matching page_12.png */}
          <div className="p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
            <span>Showing 1 - 10 of 84 adjustments</span>
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
                9
              </button>
              <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
