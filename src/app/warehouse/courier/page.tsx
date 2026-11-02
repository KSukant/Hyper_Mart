"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  FileText,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function CourierHandoverPage() {
  const [selectedPartner, setSelectedPartner] = useState("All Partners");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const orders = [
    {
      id: "HM-20261028-001",
      customer: "Rahul Mathias",
      itemsThumb: ["/products/groceries.png", "/products/fashion.png"],
      itemsExtra: "+2",
      packages: 2,
      partner: "Delhivery",
      awb: "DEL123456789",
      time: "28 Oct, 09:15 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-002",
      customer: "Sneha Iyer",
      itemsThumb: ["/products/home.png"],
      itemsExtra: "+1",
      packages: 1,
      partner: "Blue Dart",
      awb: "BD987654321",
      time: "28 Oct, 09:20 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-003",
      customer: "Arun Sharma",
      itemsThumb: ["/products/beauty.png", "/products/electronics.png"],
      itemsExtra: "+3",
      packages: 3,
      partner: "Ekart",
      awb: "EK245678901",
      time: "28 Oct, 09:35 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-004",
      customer: "Kavya Nair",
      itemsThumb: ["/products/fashion.png"],
      itemsExtra: "+1",
      packages: 1,
      partner: "DTDC",
      awb: "DTDC4567890",
      time: "28 Oct, 09:40 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-005",
      customer: "Rohan Gupta",
      itemsThumb: ["/products/groceries.png", "/products/home.png"],
      itemsExtra: "+2",
      packages: 2,
      partner: "Delhivery",
      awb: "DEL567890123",
      time: "28 Oct, 10:05 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-006",
      customer: "Priya Verma",
      itemsThumb: ["/products/beauty.png"],
      itemsExtra: "+1",
      packages: 1,
      partner: "Blue Dart",
      awb: "BD112233445",
      time: "28 Oct, 10:10 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-007",
      customer: "Vikram Desai",
      itemsThumb: ["/products/electronics.png", "/products/fashion.png"],
      itemsExtra: "+4",
      packages: 4,
      partner: "Ekart",
      awb: "EK998877665",
      time: "28 Oct, 10:25 AM",
      status: "Ready",
    },
    {
      id: "HM-20261028-008",
      customer: "Meera Singh",
      itemsThumb: ["/products/home.png"],
      itemsExtra: "+1",
      packages: 1,
      partner: "DTDC",
      awb: "DTDC7788990",
      time: "28 Oct, 10:40 AM",
      status: "Ready",
    },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.map((o) => o.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <WarehouseManagerShell pageNumber={9} title="Courier Handover" currentPath="/warehouse/courier">
      <div className="space-y-6">
        {/* Header matching page_09.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#033129] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Courier Handover
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage courier handover, track pickups and monitor dispatch status.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Schedule Pickup</span>
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Handover to Courier</span>
            </button>
          </div>
        </div>

        {/* 5 KPI Cards (Exact from page_09.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Ready for Handover */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">280</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Ready for Handover</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>12%</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 12 Q 15 14 30 8 T 60 4" stroke="#10B981" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 2: Handover Completed */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">210</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Handover Completed</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-blue-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>8%</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 14 Q 20 12 40 6 T 60 2" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 3: Awaiting Pickup */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">45</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Awaiting Pickup</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-amber-600">
              <ArrowDownRight className="w-3 h-3" />
              <span>10%</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 4 Q 20 6 40 10 T 60 14" stroke="#F59E0B" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 4: Delayed Pickup */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">12</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Delayed Pickup</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-purple-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>33%</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 14 Q 20 10 40 6 T 60 3" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 5: Pickup Issues */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">6</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Pickup Issues</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-rose-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>20%</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 12 Q 25 8 40 4 T 60 2" stroke="#EF4444" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: 3 Analytics Cards (Line Chart, Donut, Horizontal Bars) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* 1. Handover Trends (Last 7 Days) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-gray-900">Handover Trends (Last 7 Days)</h2>
              <div className="flex items-center gap-3 text-[10px] text-gray-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Handover Completed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Picked Up
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Delayed
                </span>
              </div>
            </div>

            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 400 140" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                <line x1="30" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="50" x2="390" y2="50" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="110" x2="390" y2="110" stroke="#F1F5F9" strokeDasharray="2,2" />

                {/* Y-axis labels */}
                <text x="5" y="24" fill="#94A3B8" fontSize="9">200</text>
                <text x="5" y="54" fill="#94A3B8" fontSize="9">150</text>
                <text x="5" y="84" fill="#94A3B8" fontSize="9">100</text>
                <text x="10" y="114" fill="#94A3B8" fontSize="9">50</text>
                <text x="15" y="135" fill="#94A3B8" fontSize="9">0</text>

                {/* Green Line: Handover Completed */}
                <path
                  d="M40 85 L 95 80 L 150 78 L 205 70 L 260 65 L 315 70 L 375 60"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  fill="none"
                />
                {[
                  [40, 85], [95, 80], [150, 78], [205, 70], [260, 65], [315, 70], [375, 60]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />
                ))}

                {/* Blue Line: Picked Up */}
                <path
                  d="M40 95 L 95 90 L 150 88 L 205 82 L 260 85 L 315 80 L 375 75"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  fill="none"
                />
                {[
                  [40, 95], [95, 90], [150, 88], [205, 82], [260, 85], [315, 80], [375, 75]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2.5" fill="#3B82F6" />
                ))}

                {/* Red Line: Delayed */}
                <path
                  d="M40 120 L 95 118 L 150 119 L 205 120 L 260 118 L 315 122 L 375 120"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  fill="none"
                />
                {[
                  [40, 120], [95, 118], [150, 119], [205, 120], [260, 118], [315, 122], [375, 120]
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2" fill="#EF4444" />
                ))}
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between pl-8 pr-2 text-[9px] text-gray-400 font-medium mt-1">
                <span>22 Oct</span>
                <span>23 Oct</span>
                <span>24 Oct</span>
                <span>25 Oct</span>
                <span>26 Oct</span>
                <span>27 Oct</span>
                <span>28 Oct</span>
              </div>
            </div>
          </div>

          {/* 2. Courier Partner Distribution (Today) Donut */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">
              Courier Partner Distribution (Today)
            </h2>
            <div className="flex items-center gap-4">
              {/* Donut Chart */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Delhivery 38% = 119.38 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#10B981" strokeWidth="14" strokeDasharray="86 226" strokeDashoffset="0" />
                  {/* Blue Dart 29% = 65.6 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="65 226" strokeDashoffset="-86" />
                  {/* Ekart 19% = 43 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#F59E0B" strokeWidth="14" strokeDasharray="43 226" strokeDashoffset="-151" />
                  {/* DTDC 10% = 22.6 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeDasharray="22 226" strokeDashoffset="-194" />
                  {/* Others 4% = 9 */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#94A3B8" strokeWidth="14" strokeDasharray="10 226" strokeDashoffset="-216" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-none">210</span>
                  <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Total Handover</span>
                </div>
              </div>

              {/* Legend with exact numbers from page_09.png */}
              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Delhivery
                  </span>
                  <span className="font-bold text-gray-900">80 (38%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Blue Dart
                  </span>
                  <span className="font-bold text-gray-900">60 (29%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Ekart
                  </span>
                  <span className="font-bold text-gray-900">40 (19%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-purple-500" /> DTDC
                  </span>
                  <span className="font-bold text-gray-900">20 (10%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" /> Others
                  </span>
                  <span className="font-bold text-gray-900">10 (6%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Pickup Status Horizontal Progress Bars */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Pickup Status</h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>Picked Up</span>
                  <span className="font-bold text-gray-900">210 / 280 (75%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full" style={{ width: "75%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>Awaiting Pickup</span>
                  <span className="font-bold text-gray-900">45 / 280 (16%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "16%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>Delayed</span>
                  <span className="font-bold text-gray-900">12 / 280 (4%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>Issues</span>
                  <span className="font-bold text-gray-900">6 / 280 (2%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "2%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-[280px]">
            {/* Date Range */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Today</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Courier Partner */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Partners</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Handover Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Status</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Order Type */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Types</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, AWB, Courier, ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>More Filters</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        {/* Master Row: Table on Left (8 cols) + Right Detail Panels (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Table: Orders Ready for Handover (280) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Orders Ready for Handover (280)
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF9] text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === orders.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                      />
                    </th>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Package(s)</th>
                    <th className="py-2.5 px-3">Courier Partner</th>
                    <th className="py-2.5 px-3">AWB No.</th>
                    <th className="py-2.5 px-3">Handover Time</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(o.id)}
                          onChange={() => toggleSelectRow(o.id)}
                          className="rounded border-gray-300 text-[#087A4A] focus:ring-[#087A4A]"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{o.id}</td>
                      <td className="py-2.5 px-3 text-gray-700">{o.customer}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold">
                            📦
                          </span>
                          <span className="text-[10px] font-bold text-gray-500">{o.itemsExtra}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{o.packages}</td>
                      <td className="py-2.5 px-3 text-gray-700">{o.partner}</td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">{o.awb}</td>
                      <td className="py-2.5 px-3 text-gray-600">{o.time}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-lg transition shadow-2xs">
                            Handover
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span>Showing 1-8 of 280 orders</span>
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white text-gray-700">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <div className="flex items-center gap-1 ml-2">
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
                  <span className="text-gray-400 px-1">...</span>
                  <button className="w-6 h-6 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-xs flex items-center justify-center">
                    28
                  </button>
                  <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Today's Courier Pickups + Recent Handover Activity */}
          <div className="lg:col-span-4 space-y-5">
            {/* Card 1: Today's Courier Pickups */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-900">Today&apos;s Courier Pickups</h2>
                <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-gray-400 border-b border-gray-100 font-semibold">
                    <tr>
                      <th className="pb-2">Partner</th>
                      <th className="pb-2">Scheduled Time</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr>
                      <td className="py-2 font-bold text-gray-900">Delhivery</td>
                      <td className="py-2 text-gray-600">10:00 AM</td>
                      <td className="py-2 text-emerald-600 font-bold">Completed</td>
                      <td className="py-2 text-right font-bold text-gray-900">80</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-gray-900">Blue Dart</td>
                      <td className="py-2 text-gray-600">11:30 AM</td>
                      <td className="py-2 text-blue-600 font-bold">In Progress</td>
                      <td className="py-2 text-right font-bold text-gray-900">60</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-gray-900">Ekart</td>
                      <td className="py-2 text-gray-600">02:00 PM</td>
                      <td className="py-2 text-amber-600 font-bold">Scheduled</td>
                      <td className="py-2 text-right font-bold text-gray-900">40</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-gray-900">DTDC</td>
                      <td className="py-2 text-gray-600">04:00 PM</td>
                      <td className="py-2 text-amber-500 font-bold">Pending</td>
                      <td className="py-2 text-right font-bold text-gray-900">20</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-gray-900">Others</td>
                      <td className="py-2 text-gray-600">06:00 PM</td>
                      <td className="py-2 text-amber-500 font-bold">Pending</td>
                      <td className="py-2 text-right font-bold text-gray-900">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 2: Recent Handover Activity */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-gray-900">Recent Handover Activity</h2>
                <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                        Order HM-20261028-001 handed over to Delhivery
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">AWB: DEL123456789</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">10:15 AM</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                        Order HM-20261028-002 handed over to Blue Dart
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">AWB: BD987654321</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">10:12 AM</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                        Pickup in progress by Ekart
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5">40 orders</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">09:55 AM</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                        Delay in pickup by DTDC
                      </p>
                      <p className="text-[10px] text-rose-500 font-medium mt-0.5">Reason: Vehicle delayed</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">09:30 AM</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-[11px] leading-tight">
                        Pickup issue reported
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">Order HM-20261027-098</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">09:20 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
