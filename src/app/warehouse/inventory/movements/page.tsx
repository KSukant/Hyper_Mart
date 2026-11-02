"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Plus,
  Search,
  ChevronDown,
  Calendar,
  Eye,
  MoreHorizontal,
  Download,
  Printer,
  BarChart3,
  FileText,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { cn } from "@/lib/cn";

export default function StockMovementsPage() {
  const [activeTab, setActiveTab] = useState<"bin" | "zone" | "adj" | "bulk">("bin");
  const [selectedZone, setSelectedZone] = useState("B-02");
  const [selectedBin, setSelectedBin] = useState("B-05");

  return (
    <WarehouseManagerShell pageNumber={5} pageTitle="Stock Movements & Bin Locations">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, Subtitle, Action Buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
          <div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
              Stock Movements & Bin Locations
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Track, initiate and manage internal stock movements between bins or zones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
              <Plus className="w-4 h-4" />
              <span>New Stock Movement</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition">
              <Package className="w-3.5 h-3.5" />
              <span>Bin Update</span>
            </button>
          </div>
        </div>

        {/* ── 2. Top 4 Metric KPI Cards (Matches Page 05) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Total Movements */}
          <div className="bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl border border-[#DCFCE7] p-4.5 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shadow-2xs">
              <Boxes className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 leading-none">1,248</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Total Movements</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#EAF7EF] flex items-center justify-between text-xs font-bold text-[#16A34A]">
              <span>↑ 12%</span>
              <svg className="w-20 h-4" viewBox="0 0 80 15" fill="none">
                <path d="M2 12 C 20 15, 40 4, 78 4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 2: Bin to Bin Transfer */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-white rounded-2xl border border-[#DBEAFE] p-4.5 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-2xs">
              <Package className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 leading-none">842</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Bin to Bin Transfer</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#EFF6FF] flex items-center justify-between text-xs font-bold text-[#2563EB]">
              <span>↑ 8%</span>
              <svg className="w-20 h-4" viewBox="0 0 80 15" fill="none">
                <path d="M2 13 C 20 11, 40 14, 78 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 3: Zone Transfer */}
          <div className="bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl border border-[#FFEDD5] p-4.5 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shadow-2xs">
              <Layers className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 leading-none">310</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Zone Transfer</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#FFF7ED] flex items-center justify-between text-xs font-bold text-[#EA580C]">
              <span>↑ 5%</span>
              <svg className="w-20 h-4" viewBox="0 0 80 15" fill="none">
                <path d="M2 13 C 20 13, 40 14, 78 7" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* KPI 4: Adjustments */}
          <div className="bg-gradient-to-br from-[#FAF5FF] to-white rounded-2xl border border-[#F3E8FF] p-4.5 shadow-2xs flex flex-col justify-between">
            <span className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shadow-2xs">
              <FileText className="w-4 h-4" />
            </span>
            <div className="mt-3">
              <p className="font-display font-black text-3xl text-gray-900 leading-none">96</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Adjustments</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#FAF5FF] flex items-center justify-between text-xs font-bold text-[#E11D48]">
              <span>↓ 6%</span>
              <svg className="w-20 h-4" viewBox="0 0 80 15" fill="none">
                <path d="M2 5 C 20 8, 40 12, 78 13" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── 3. Middle Row: Initiate Form (4 cols), Warehouse Bin Map (5 cols), Bin Details (3 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Initiate Stock Movement (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-sm text-gray-900">Initiate Stock Movement</h3>

            {/* Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#F5F7F6] rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setActiveTab("bin")}
                className={cn("py-1.5 rounded-lg transition", activeTab === "bin" ? "bg-[#087A4A] text-white shadow-xs" : "text-gray-600 hover:text-black")}
              >
                Bin to Bin
              </button>
              <button
                onClick={() => setActiveTab("zone")}
                className={cn("py-1.5 rounded-lg transition", activeTab === "zone" ? "bg-[#087A4A] text-white shadow-xs" : "text-gray-600 hover:text-black")}
              >
                Zone Transfer
              </button>
              <button
                onClick={() => setActiveTab("adj")}
                className={cn("py-1.5 rounded-lg transition", activeTab === "adj" ? "bg-[#087A4A] text-white shadow-xs" : "text-gray-600 hover:text-black")}
              >
                Adjustment
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={cn("py-1.5 rounded-lg transition", activeTab === "bulk" ? "bg-[#087A4A] text-white shadow-xs" : "text-gray-600 hover:text-black")}
              >
                Bulk Update
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Product *</label>
                  <input
                    type="text"
                    placeholder="Search product, SKU or scan..."
                    className="w-full px-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#087A4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">SKU</label>
                  <input
                    type="text"
                    placeholder="Auto-filled"
                    readOnly
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Current Bin / Location *</label>
                  <select className="w-full px-2.5 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-gray-700">
                    <option>Select source bin</option>
                    <option>A-01-01</option>
                    <option>B-05</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Destination Bin / Location *</label>
                  <select className="w-full px-2.5 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-gray-700">
                    <option>Select destination bin</option>
                    <option>B-02</option>
                    <option>C-03</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    Quantity * <span className="text-[10px] text-gray-400 font-normal">Available: -</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    className="w-full px-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#087A4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Reference No.</label>
                  <input
                    type="text"
                    placeholder="Auto-generated"
                    readOnly
                    className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Reason *</label>
                <select className="w-full px-2.5 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl text-gray-700">
                  <option>Select reason</option>
                  <option>Replenishment</option>
                  <option>Damaged Isolation</option>
                  <option>Space Optimization</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Remarks (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Enter remarks..."
                  className="w-full px-3 py-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#087A4A]"
                />
              </div>

              <button className="w-full py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
                <span>Submit Movement</span>
              </button>
            </div>
          </div>

          {/* Center Map: Warehouse Bin Map (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-gray-900">Warehouse Bin Map</h3>
              <select className="text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1 text-gray-700">
                <option>WH-01 Chennai FC</option>
              </select>
            </div>

            {/* Map Legend */}
            <div className="flex items-center gap-3 text-[10px] text-gray-500 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#D1FAE5] border border-[#A7F3D0]" />
                <span>Occupied</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-gray-100 border border-gray-200" />
                <span>Available</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FEE2E2] border border-[#FECACA]" />
                <span>Low Stock</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FEF3C7] border border-[#FDE68A]" />
                <span>Restricted</span>
              </span>
            </div>

            {/* Zone Selector + Bin Matrix */}
            <div className="flex gap-3">
              {/* Left Zone Column */}
              <div className="w-24 space-y-1.5 text-[10px] font-bold">
                {[
                  { code: "A-01", name: "Receiving" },
                  { code: "B-02", name: "Storage", active: true },
                  { code: "C-03", name: "Fast Moving" },
                  { code: "D-04", name: "Bulk" },
                  { code: "E-05", name: "Returns" },
                ].map((z) => (
                  <button
                    key={z.code}
                    onClick={() => setSelectedZone(z.code)}
                    className={cn(
                      "w-full text-left p-2 rounded-xl transition",
                      z.active ? "bg-[#EAF7EF] text-[#087A4A] border border-[#C5F0DA]" : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    <p className="font-black">{z.code}</p>
                    <p className="text-[9px] font-medium truncate">{z.name}</p>
                  </button>
                ))}
              </div>

              {/* Bins Grid (5x4) */}
              <div className="flex-1 grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold">
                {[
                  { id: "B-01", qty: 120, status: "ok" },
                  { id: "B-02", qty: 85, status: "ok" },
                  { id: "B-03", qty: 0, status: "low" },
                  { id: "B-04", qty: 240, status: "ok" },
                  { id: "B-05", qty: 56, status: "restr", selected: true },

                  { id: "B-06", qty: 310, status: "ok" },
                  { id: "B-07", qty: 180, status: "ok" },
                  { id: "B-08", qty: 95, status: "ok" },
                  { id: "B-09", qty: 205, status: "ok" },
                  { id: "B-10", qty: 0, status: "low" },

                  { id: "B-11", qty: 415, status: "ok" },
                  { id: "B-12", qty: 90, status: "ok" },
                  { id: "B-13", qty: 60, status: "restr" },
                  { id: "B-14", qty: 320, status: "ok" },
                  { id: "B-15", qty: 110, status: "ok" },

                  { id: "B-16", qty: 75, status: "ok" },
                  { id: "B-17", qty: 0, status: "low" },
                  { id: "B-18", qty: 260, status: "ok" },
                  { id: "B-19", qty: 140, status: "ok" },
                  { id: "B-20", qty: 300, status: "ok" },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBin(b.id)}
                    className={cn(
                      "p-2 rounded-xl border flex flex-col justify-center items-center transition cursor-pointer",
                      b.selected
                        ? "ring-2 ring-[#087A4A] bg-[#FEF3C7] border-[#FDE68A]"
                        : b.status === "low"
                        ? "bg-[#FEE2E2] border-[#FECACA] text-red-700"
                        : b.status === "restr"
                        ? "bg-[#FEF3C7] border-[#FDE68A] text-amber-800"
                        : "bg-[#EAF7EF] border-[#C5F0DA] text-[#087A4A]"
                    )}
                  >
                    <span className="font-black">{b.id}</span>
                    <span className="text-[9px] font-normal">{b.qty}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Bin Details (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg text-gray-900">{selectedBin}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                  Low Stock
                </span>
              </div>
              <button className="text-xs font-bold text-[#087A4A] hover:underline">View History</button>
            </div>

            {/* Bin Rack Photo */}
            <div className="w-full h-28 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/landing/portal-warehouse.jpg"
                alt="Warehouse Rack"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Spec metadata */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-gray-500">
                <span>Zone</span>
                <span className="font-semibold text-gray-800">B-02 Storage</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Type</span>
                <span className="font-semibold text-gray-800">Standard</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Capacity</span>
                <span className="font-semibold text-gray-800">500 units</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Current Stock</span>
                <span className="font-bold text-red-600">56 units (11%)</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Product Count</span>
                <span className="font-semibold text-gray-800">3</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Restricted</span>
                <span className="font-semibold text-gray-800">No</span>
              </div>
            </div>

            {/* Products in Bin */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-800">Products in Bin</span>
                <button className="text-[10px] font-bold text-[#087A4A] hover:underline">View All</button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: "Men's Running Shoes", sku: "HM-SHOE-001", qty: 30 },
                  { name: "Wireless Earbuds", sku: "HM-ELC-010", qty: 20 },
                  { name: "Backpack 30L", sku: "HM-BAG-003", qty: 6 },
                ].map((item) => (
                  <div key={item.sku} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 truncate max-w-[140px]">{item.name}</p>
                      <p className="text-[10px] font-mono text-gray-400">{item.sku}</p>
                    </div>
                    <span className="font-bold text-gray-900">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Bottom Row: Recent Stock Movements Table (8 cols) + Summary & Quick Actions (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Stock Movements (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-display font-bold text-sm text-gray-900">Recent Stock Movements</h3>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select className="bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1 text-gray-700">
                  <option>All Movements</option>
                  <option>Bin to Bin</option>
                  <option>Zone Transfer</option>
                </select>

                <div className="flex items-center gap-1.5 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2.5 py-1 text-gray-700">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>28 Oct 2026 - 03 Nov 2026</span>
                </div>

                <div className="relative">
                  <Search className="w-3 h-3 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by product, SKU, bin..."
                    className="pl-7 pr-2.5 py-1 bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg text-xs"
                  />
                </div>

                <button className="text-xs font-bold text-[#087A4A] hover:underline">View All</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[10px]">
                    <th className="pb-2 w-6">#</th>
                    <th className="pb-2">Date & Time</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Product</th>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2">From</th>
                    <th className="pb-2">To</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2">User</th>
                    <th className="pb-2">Reason</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { num: 1, dt: "03 Nov 2026, 10:12 AM", type: "Bin to Bin", typeColor: "bg-blue-50 text-blue-600", prod: "Men's T-Shirt", sku: "HM-TSH-002", from: "A-01", to: "B-02", qty: 120, user: "Arjun K", reason: "Replenishment", status: "Completed", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                    { num: 2, dt: "03 Nov 2026, 09:48 AM", type: "Zone Transfer", typeColor: "bg-purple-50 text-purple-600", prod: "Backpack 30L", sku: "HM-BAG-003", from: "C-03", to: "D-04", qty: 50, user: "Priya S", reason: "Fast Moving", status: "Completed", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                    { num: 3, dt: "03 Nov 2026, 09:25 AM", type: "Adjustment", typeColor: "bg-amber-50 text-amber-700", prod: "Wireless Earbuds", sku: "HM-ELC-010", from: "B-02", to: "-", qty: 30, user: "Suresh R", reason: "Damage", status: "Approved", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                    { num: 4, dt: "03 Nov 2026, 08:50 AM", type: "Bin to Bin", typeColor: "bg-blue-50 text-blue-600", prod: "Face Wash 100ml", sku: "HM-BEA-002", from: "-", to: "Packing", qty: 40, user: "Deepak V", reason: "Order Allocation", status: "Completed", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                    { num: 5, dt: "03 Nov 2026, 08:15 AM", type: "Zone Transfer", typeColor: "bg-purple-50 text-purple-600", prod: "Rice 5kg", sku: "HM-GRO-015", from: "D-04", to: "D-04", qty: 100, user: "Kavya N", reason: "Replenishment", status: "Completed", statusColor: "bg-[#EAF7EF] text-[#087A4A]" },
                    { num: 6, dt: "02 Nov 2026, 06:20 PM", type: "Bin to Bin", typeColor: "bg-blue-50 text-blue-600", prod: "Cooking Oil 1L", sku: "HM-GRO-021", from: "B-10", to: "B-12", qty: 60, user: "Manoj K", reason: "Space Optimization", status: "In Progress", statusColor: "bg-blue-50 text-blue-600" },
                    { num: 7, dt: "02 Nov 2026, 05:42 PM", type: "Adjustment", typeColor: "bg-amber-50 text-amber-700", prod: "Face Mask 50pcs", sku: "HM-BEA-009", from: "E-05", to: "-", qty: 25, user: "Arjun K", reason: "Expiry", status: "Pending", statusColor: "bg-amber-50 text-amber-700" },
                  ].map((row) => (
                    <tr key={row.num} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 font-semibold text-gray-500">{row.num}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500 whitespace-nowrap">{row.dt}</td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap", row.typeColor)}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-2.5 font-semibold text-gray-900 truncate max-w-[100px]">{row.prod}</td>
                      <td className="py-2.5 font-mono text-[10px] text-gray-500">{row.sku}</td>
                      <td className="py-2.5 text-gray-600">{row.from}</td>
                      <td className="py-2.5 text-gray-600">{row.to}</td>
                      <td className="py-2.5 text-center font-bold text-gray-900">{row.qty}</td>
                      <td className="py-2.5 text-gray-600">{row.user}</td>
                      <td className="py-2.5 text-gray-600">{row.reason}</td>
                      <td className="py-2.5">
                        <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold", row.statusColor)}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-400 hover:text-gray-700 cursor-pointer">
                        <MoreHorizontal className="w-4 h-4 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Movement Summary + Quick Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Movement Summary */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">Movement Summary</h3>
                <select className="text-xs font-semibold bg-[#F5F7F6] border border-[#E1E8E3] rounded-lg px-2 py-1 text-gray-700">
                  <option>Today</option>
                  <option>This Week</option>
                </select>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { label: "Bin to Bin", val: 620, pct: "↑ 10%", color: "text-[#16A34A]" },
                  { label: "Zone Transfer", val: 310, pct: "↑ 6%", color: "text-[#16A34A]" },
                  { label: "Adjustments", val: 96, pct: "↓ 3%", color: "text-[#E11D48]" },
                  { label: "Replenishment", val: 420, pct: "↑ 12%", color: "text-[#16A34A]" },
                  { label: "Order Allocation", val: 280, pct: "↑ 8%", color: "text-[#16A34A]" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">{s.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{s.val}</span>
                      <span className={cn("text-[11px] font-bold w-12 text-right", s.color)}>{s.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <h3 className="font-display font-bold text-sm text-gray-900">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Export Movements</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <Printer className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Print Bin Labels</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <BarChart3 className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">View Bin Utilization</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
