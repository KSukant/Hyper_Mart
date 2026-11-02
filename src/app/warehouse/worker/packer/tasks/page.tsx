"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Boxes,
  Layers,
  Play,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Package,
  ChevronRight,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PackerTaskQueuePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priority, setPriority] = useState("Priority");
  const [packaging, setPackaging] = useState("Packaging");
  const [station, setStation] = useState("Station");
  const [status, setStatus] = useState("Status");

  const packingTasks = [
    { id: 1, orderId: "ORD-20261029-0841", items: "8 items", packaging: "Medium Box", station: "PK-01", priority: "High", dueIn: "15 min", isDueSoon: true, status: "To Pack" },
    { id: 2, orderId: "ORD-20261029-0842", items: "5 items", packaging: "Small Box", station: "PK-02", priority: "High", dueIn: "20 min", isDueSoon: true, status: "To Pack" },
    { id: 3, orderId: "ORD-20261029-0843", items: "3 items", packaging: "Small Box", station: "PK-02", priority: "Medium", dueIn: "35 min", isDueSoon: false, status: "To Pack" },
    { id: 4, orderId: "ORD-20261029-0844", items: "4 items", packaging: "Medium Box", station: "PK-03", priority: "Medium", dueIn: "40 min", isDueSoon: false, status: "To Pack" },
    { id: 5, orderId: "ORD-20261029-0845", items: "6 items", packaging: "Large Box", station: "PK-03", priority: "Low", dueIn: "1 hr", isDueSoon: false, status: "To Pack" },
  ];

  return (
    <WarehouseWorkerShell
      role="PACKER"
      workerName="Sukant K."
      pageNumber={45}
      currentStep={2}
      title="My Task Queue"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Task Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            All your assigned packing tasks for this shift.
          </p>
        </div>

        {/* 4 KPIs matching page_45.png */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">Assigned Tasks</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">24</span>
            </div>
          </div>

          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">To Pack</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">12</span>
            </div>
          </div>

          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
              <Play className="w-4 h-4 fill-yellow-700" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">In Progress</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">6</span>
            </div>
          </div>

          <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">Completed</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">18</span>
            </div>
          </div>
        </div>

        {/* Main Row: Left Packing Task Queue + Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Task Queue (24)</h3>
              </div>
              <span className="text-[11px] font-semibold text-green-700 cursor-pointer">View All →</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID, SKU or Bin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700"
              >
                <option>Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700"
              >
                <option>Packaging</option>
                <option>Small Box</option>
                <option>Medium Box</option>
                <option>Large Box</option>
              </select>
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700"
              >
                <option>Station</option>
                <option>PK-01</option>
                <option>PK-02</option>
                <option>PK-03</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700"
              >
                <option>Status</option>
                <option>To Pack</option>
                <option>In Progress</option>
                <option>Packed</option>
              </select>
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-2">#</th>
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Items</th>
                    <th className="pb-2">Packaging</th>
                    <th className="pb-2">Station</th>
                    <th className="pb-2">Priority</th>
                    <th className="pb-2">Due In</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {packingTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="py-2.5 font-bold text-gray-700">{t.id}</td>
                      <td className="py-2.5 font-mono font-bold text-gray-900">{t.orderId}</td>
                      <td className="py-2.5 text-gray-700">{t.items}</td>
                      <td className="py-2.5 flex items-center gap-1.5">
                        <div className="relative w-5 h-5 rounded bg-amber-50 overflow-hidden flex-shrink-0">
                          <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain" unoptimized />
                        </div>
                        <span className="text-gray-800 font-medium">{t.packaging}</span>
                      </td>
                      <td className="py-2.5 font-mono text-gray-700">
                        <span className="flex items-center gap-1">📍 {t.station}</span>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            t.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : t.priority === "Medium"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`flex items-center gap-1 text-[11px] font-semibold ${
                            t.isDueSoon ? "text-red-600" : "text-gray-600"
                          }`}
                        >
                          <Clock className="w-3 h-3 text-red-500" />
                          {t.dueIn}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <Link
                          href="/warehouse/worker/packer/current"
                          className="px-3 py-1 bg-[#087A4A] hover:bg-[#065A37] text-white rounded-lg text-xs font-bold transition inline-block"
                        >
                          Start
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Packing Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Progress</h3>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.36)} />
                    <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.12)} style={{ transform: "rotate(130deg)", transformOrigin: "center" }} />
                    <circle cx="50" cy="50" r="38" stroke="#EAB308" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.24)} style={{ transform: "rotate(173deg)", transformOrigin: "center" }} />
                    <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.18)} style={{ transform: "rotate(260deg)", transformOrigin: "center" }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-gray-900 leading-tight">18 / 50</span>
                    <span className="text-[9px] text-gray-500 font-medium">Orders</span>
                    <span className="text-[9px] font-bold text-green-700">(36%)</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] flex-1 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Completed</span>
                    <span className="font-bold text-gray-900">18 (36%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#3B82F6]" /> In Progress</span>
                    <span className="font-bold text-gray-900">6 (12%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EAB308]" /> To Pack</span>
                    <span className="font-bold text-gray-900">12 (24%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#EF4444]" /> Pending</span>
                    <span className="font-bold text-gray-900">9 (18%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Next Packing Task */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Next Packing Task</h3>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="relative w-16 h-16 rounded-xl bg-amber-50 overflow-hidden flex-shrink-0">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
                </div>
                <div className="space-y-1 text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900">ORD-20261029-0841</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span>
                  </div>
                  <div className="text-[11px] text-gray-600 space-y-0.5">
                    <p className="flex items-center gap-1">📦 8 items</p>
                    <p className="flex items-center gap-1">📍 PK-01 &nbsp;|&nbsp; Medium Box</p>
                    <p className="text-red-600 font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Due in 15 min</p>
                  </div>
                </div>
              </div>

              <Link
                href="/warehouse/worker/packer/current"
                className="w-full py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs text-center"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Start Packing
              </Link>
            </div>

            {/* Card 3: Packaging Materials */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-green-700" />
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packaging Materials</h3>
                </div>
                <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                  <div className="relative w-8 h-8 mb-1">
                    <Image src="/warehouse/items/cardboard-box.png" alt="Small Box" fill className="object-contain" unoptimized />
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium truncate block w-full">Small Box</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">120</span>
                  <span className="text-[8px] text-green-700 font-semibold">In Stock</span>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                  <div className="relative w-8 h-8 mb-1">
                    <Image src="/warehouse/items/cardboard-box.png" alt="Medium Box" fill className="object-contain" unoptimized />
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium truncate block w-full">Medium Box</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">85</span>
                  <span className="text-[8px] text-green-700 font-semibold">In Stock</span>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                  <div className="relative w-8 h-8 mb-1">
                    <Image src="/warehouse/items/cardboard-box.png" alt="Large Box" fill className="object-contain" unoptimized />
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium truncate block w-full">Large Box</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">40</span>
                  <span className="text-[8px] text-green-700 font-semibold">In Stock</span>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center">
                  <div className="relative w-8 h-8 mb-1 flex items-center justify-center">
                    <span className="text-lg">🧻</span>
                  </div>
                  <span className="text-[9px] text-gray-500 font-medium truncate block w-full">Bubble Wrap</span>
                  <span className="text-xs font-bold text-gray-900 mt-0.5">12</span>
                  <span className="text-[8px] text-green-700 font-semibold">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
