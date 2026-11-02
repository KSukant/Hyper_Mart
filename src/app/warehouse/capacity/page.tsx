"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  MoreVertical,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function CapacityAndDeadlinesPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const orders = [
    {
      id: "HM-20261028-001",
      customer: "Rahul Mathias",
      itemsExtra: "+2",
      stage: "Picking",
      deadline: "10:30 AM",
      timeLeft: "5m",
      timeColor: "text-rose-600 font-bold",
      priority: "High",
      status: "At Risk",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "HM-20261028-002",
      customer: "Sneha Iyer",
      itemsExtra: "+1",
      stage: "Packing",
      deadline: "11:00 AM",
      timeLeft: "35m",
      timeColor: "text-amber-600 font-bold",
      priority: "Normal",
      status: "On Track",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "HM-20261028-003",
      customer: "Arun Sharma",
      itemsExtra: "+3",
      stage: "Quality Check",
      deadline: "11:30 AM",
      timeLeft: "1h 5m",
      timeColor: "text-emerald-600 font-bold",
      priority: "High",
      status: "On Track",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "HM-20261028-004",
      customer: "Kavya Nair",
      itemsExtra: "+1",
      stage: "Packing",
      deadline: "10:45 AM",
      timeLeft: "20m",
      timeColor: "text-amber-600 font-bold",
      priority: "High",
      status: "At Risk",
      statusBadge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "HM-20261028-005",
      customer: "Rohan Gupta",
      itemsExtra: "+2",
      stage: "Handover",
      deadline: "11:15 AM",
      timeLeft: "50m",
      timeColor: "text-amber-600 font-bold",
      priority: "Normal",
      status: "On Track",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "HM-20261028-006",
      customer: "Priya Verma",
      itemsExtra: "+4",
      stage: "Picking",
      deadline: "10:20 AM",
      timeLeft: "-10m",
      timeColor: "text-rose-600 font-bold",
      priority: "High",
      status: "Overdue",
      statusBadge: "bg-rose-50 text-rose-700 border-rose-200",
    },
    {
      id: "HM-20261028-007",
      customer: "Vikram Desai",
      itemsExtra: "+1",
      stage: "Quality Check",
      deadline: "12:00 PM",
      timeLeft: "1h 35m",
      timeColor: "text-emerald-600 font-bold",
      priority: "Normal",
      status: "On Track",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "HM-20261028-008",
      customer: "Meera Singh",
      itemsExtra: "+2",
      stage: "Packing",
      deadline: "11:10 AM",
      timeLeft: "45m",
      timeColor: "text-amber-600 font-bold",
      priority: "Normal",
      status: "On Track",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
    <WarehouseManagerShell pageNumber={10} title="Capacity & Deadlines" currentPath="/warehouse/capacity">
      <div className="space-y-6">
        {/* Header matching page_10.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Capacity & Deadlines
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Monitor warehouse capacity, resource utilization and order deadlines to ensure on-time fulfillment.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>Today (28 Oct 2026)</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#087A4A] hover:bg-[#06633B] rounded-xl transition shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards (Exact from page_10.png) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Orders (Today) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">1,250</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Total Orders (Today)</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-emerald-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>12% vs yesterday</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 12 Q 20 14 35 7 T 60 4" stroke="#10B981" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 2: Warehouse Capacity Used */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">92%</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Warehouse Capacity Used</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-blue-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>6% vs yesterday</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 14 Q 25 12 40 5 T 60 2" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 3: Orders Due Today */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">320</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Orders Due Today</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-amber-600">
              <ArrowDownRight className="w-3 h-3" />
              <span>8% vs yesterday</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 4 Q 25 7 40 10 T 60 14" stroke="#F59E0B" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Card 4: Orders at Risk */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-gray-900 leading-none">285</div>
              <div className="text-xs text-gray-500 font-medium mt-1">Orders at Risk</div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-purple-600">
              <ArrowUpRight className="w-3 h-3" />
              <span>25% vs yesterday</span>
              <svg className="w-16 h-4 ml-auto" viewBox="0 0 60 16" fill="none">
                <path d="M0 14 Q 20 12 40 7 T 60 3" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: Capacity Utilization Donut + Order Deadlines Clustered Columns + Resource & Zone Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Capacity Utilization Donut */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Capacity Utilization</h2>
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Used 92% */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#EF4444" strokeWidth="14" strokeDasharray="208 226" strokeDashoffset="0" />
                  {/* Available 8% */}
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3B82F6" strokeWidth="14" strokeDasharray="18 226" strokeDashoffset="-208" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-base font-black text-gray-900 leading-none">92%</span>
                  <span className="text-[9px] text-gray-400 font-semibold mt-0.5">Total Capacity</span>
                </div>
              </div>

              <div className="flex-1 space-y-1 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Used Capacity
                  </span>
                  <span className="font-bold text-gray-900">9,200 / 10,000 (92%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Available Capacity
                  </span>
                  <span className="font-bold text-gray-900">800 / 10,000 (8%)</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Picking Zones
                  </span>
                  <span className="font-bold text-gray-900">3,200 (32%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Packing Stations
                  </span>
                  <span className="font-bold text-gray-900">2,800 (28%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-sky-500" /> Storage Areas
                  </span>
                  <span className="font-bold text-gray-900">2,400 (24%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400" /> Buffer / Others
                  </span>
                  <span className="font-bold text-gray-900">800 (8%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Deadlines (Today) Clustered Bar Chart */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-gray-900">Order Deadlines (Today)</h2>
              <div className="flex items-center gap-3 text-[10px] text-gray-600 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" /> On Time
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> At Risk
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Overdue
                </span>
              </div>
            </div>

            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 360 140">
                {/* Horizontal grid lines */}
                <line x1="30" y1="20" x2="350" y2="20" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="50" x2="350" y2="50" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="80" x2="350" y2="80" stroke="#F1F5F9" strokeDasharray="2,2" />
                <line x1="30" y1="110" x2="350" y2="110" stroke="#F1F5F9" strokeDasharray="2,2" />

                {/* Y-axis labels */}
                <text x="5" y="24" fill="#94A3B8" fontSize="8">250</text>
                <text x="5" y="54" fill="#94A3B8" fontSize="8">200</text>
                <text x="5" y="84" fill="#94A3B8" fontSize="8">150</text>
                <text x="5" y="114" fill="#94A3B8" fontSize="8">100</text>
                <text x="10" y="130" fill="#94A3B8" fontSize="8">50</text>

                {/* 1. Picking: On Time 220, At Risk 80, Overdue 20 */}
                <rect x="50" y="32" width="16" height="88" fill="#087A4A" rx="2" />
                <text x="58" y="28" fill="#087A4A" fontSize="7" textAnchor="middle" fontWeight="bold">220</text>
                <rect x="70" y="80" width="16" height="40" fill="#F59E0B" rx="2" />
                <text x="78" y="76" fill="#F59E0B" fontSize="7" textAnchor="middle" fontWeight="bold">80</text>
                <rect x="90" y="108" width="16" height="12" fill="#EF4444" rx="2" />
                <text x="98" y="104" fill="#EF4444" fontSize="7" textAnchor="middle" fontWeight="bold">20</text>
                <text x="78" y="134" fill="#64748B" fontSize="8" textAnchor="middle">Picking</text>

                {/* 2. Packing: On Time 160, At Risk 90, Overdue 30 */}
                <rect x="130" y="56" width="16" height="64" fill="#087A4A" rx="2" />
                <text x="138" y="52" fill="#087A4A" fontSize="7" textAnchor="middle" fontWeight="bold">160</text>
                <rect x="150" y="76" width="16" height="44" fill="#F59E0B" rx="2" />
                <text x="158" y="72" fill="#F59E0B" fontSize="7" textAnchor="middle" fontWeight="bold">90</text>
                <rect x="170" y="104" width="16" height="16" fill="#EF4444" rx="2" />
                <text x="178" y="100" fill="#EF4444" fontSize="7" textAnchor="middle" fontWeight="bold">30</text>
                <text x="158" y="134" fill="#64748B" fontSize="8" textAnchor="middle">Packing</text>

                {/* 3. QC: On Time 150, At Risk 70, Overdue 25 */}
                <rect x="210" y="60" width="16" height="60" fill="#087A4A" rx="2" />
                <text x="218" y="56" fill="#087A4A" fontSize="7" textAnchor="middle" fontWeight="bold">150</text>
                <rect x="230" y="84" width="16" height="36" fill="#F59E0B" rx="2" />
                <text x="238" y="80" fill="#F59E0B" fontSize="7" textAnchor="middle" fontWeight="bold">70</text>
                <rect x="250" y="106" width="16" height="14" fill="#EF4444" rx="2" />
                <text x="258" y="102" fill="#EF4444" fontSize="7" textAnchor="middle" fontWeight="bold">25</text>
                <text x="238" y="134" fill="#64748B" fontSize="8" textAnchor="middle">Quality Check</text>

                {/* 4. Handover: On Time 120, At Risk 45, Overdue 10 */}
                <rect x="290" y="72" width="16" height="48" fill="#087A4A" rx="2" />
                <text x="298" y="68" fill="#087A4A" fontSize="7" textAnchor="middle" fontWeight="bold">120</text>
                <rect x="310" y="94" width="16" height="26" fill="#F59E0B" rx="2" />
                <text x="318" y="90" fill="#F59E0B" fontSize="7" textAnchor="middle" fontWeight="bold">45</text>
                <rect x="330" y="112" width="16" height="8" fill="#EF4444" rx="2" />
                <text x="338" y="108" fill="#EF4444" fontSize="7" textAnchor="middle" fontWeight="bold">10</text>
                <text x="318" y="134" fill="#64748B" fontSize="8" textAnchor="middle">Handover</text>
              </svg>
            </div>
          </div>

          {/* Resource & Zone Utilization */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2.5">Resource Utilization</h2>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Pickers</span>
                    <span className="font-bold text-gray-900">88%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Packers</span>
                    <span className="font-bold text-gray-900">82%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>QC Staff</span>
                    <span className="font-bold text-gray-900">70%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Handover Staff</span>
                    <span className="font-bold text-gray-900">65%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-600 mb-0.5">
                    <span>Supervisors</span>
                    <span className="font-bold text-gray-900">90%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
              <h2 className="text-xs font-bold text-gray-900 mb-2">Capacity by Zone</h2>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Receiving</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-emerald-700 rounded-full" style={{ width: "80%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">80%</span>
                    <span className="text-[10px] text-gray-400">800 / 1,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Storage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "90%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">90%</span>
                    <span className="text-[10px] text-gray-400">2,700 / 3,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Picking Zone A</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: "95%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">95%</span>
                    <span className="text-[10px] text-gray-400">1,900 / 2,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Picking Zone B</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "88%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">88%</span>
                    <span className="text-[10px] text-gray-400">1,750 / 2,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Packing</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "85%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">85%</span>
                    <span className="text-[10px] text-gray-400">1,700 / 2,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quality Check</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "70%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">70%</span>
                    <span className="text-[10px] text-gray-400">700 / 1,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Handover</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: "60%" }} />
                    </div>
                    <span className="font-bold text-gray-900 text-[10px]">60%</span>
                    <span className="text-[10px] text-gray-400">600 / 1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-[280px]">
            {/* Warehouse */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Warehouses</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Zone */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Zones</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Process Stage */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Stages</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Deadline Status */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAF9] border border-gray-200 rounded-xl font-medium text-gray-700 cursor-pointer">
              <span>All Statuses</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Order ID, SKU, Customer..."
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

        {/* Master Table Row: Orders by Deadline (320) + Deadline Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Orders by Deadline Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col justify-between">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Orders by Deadline
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
                    <th className="py-2.5 px-3">Process Stage</th>
                    <th className="py-2.5 px-3">Deadline Time</th>
                    <th className="py-2.5 px-3">Time Left</th>
                    <th className="py-2.5 px-3">Priority</th>
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
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {o.itemsExtra}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{o.stage}</td>
                      <td className="py-2.5 px-3 text-gray-600">{o.deadline}</td>
                      <td className={`py-2.5 px-3 ${o.timeColor}`}>{o.timeLeft}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-gray-100 text-gray-700"
                        }`}>
                          {o.priority}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${o.statusBadge}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button className="px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-2xs">
                            View
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
              <span>Showing 1-8 of 320 orders</span>
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
                    40
                  </button>
                  <button className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deadline Alerts Right Panel */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-gray-900">Deadline Alerts</h2>
              <button className="text-[11px] font-bold text-[#087A4A] hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-rose-50/60 border border-rose-100">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-rose-900 text-[11px] leading-tight">
                      20 orders overdue in Picking
                    </p>
                    <p className="text-[10px] text-rose-600 mt-0.5">SLA cutoff exceeded</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">10:20 AM</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-900 text-[11px] leading-tight">
                      45 orders at risk in Packing
                    </p>
                    <p className="text-[10px] text-amber-600 mt-0.5">Less than 30 mins remaining</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">10:30 AM</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-amber-900 text-[11px] leading-tight">
                      30 orders at risk in Quality Check
                    </p>
                    <p className="text-[10px] text-amber-600 mt-0.5">Approaching SLA threshold</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">11:15 AM</span>
              </div>

              <div className="flex items-start justify-between gap-2 p-2 rounded-xl bg-rose-50/60 border border-rose-100">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-rose-900 text-[11px] leading-tight">
                      15 orders at risk in Handover
                    </p>
                    <p className="text-[10px] text-rose-600 mt-0.5">Courier departure in 15 mins</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">11:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
