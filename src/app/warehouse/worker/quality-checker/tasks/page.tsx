"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Layers,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Play,
  ArrowLeft,
  Scan,
  AlertTriangle,
  Barcode,
  ArrowLeftRight,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerTasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [station, setStation] = useState("All");
  const [type, setType] = useState("All");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");

  const qcTasks = [
    { id: 1, orderId: "ORD-20261029-0841", items: 8, checkType: "Full Check", typeColor: "bg-purple-50 text-purple-700", station: "QC-01", priority: "High", status: "To Check", action: "Start" },
    { id: 2, orderId: "ORD-20261029-0842", items: 5, checkType: "Label Check", typeColor: "bg-yellow-50 text-yellow-700", station: "QC-02", priority: "High", status: "To Check", action: "Start" },
    { id: 3, orderId: "ORD-20261029-0843", items: 3, checkType: "Item Check", typeColor: "bg-green-50 text-green-700", station: "QC-02", priority: "Medium", status: "In Progress", action: "Resume" },
    { id: 4, orderId: "ORD-20261029-0844", items: 4, checkType: "Full Check", typeColor: "bg-purple-50 text-purple-700", station: "QC-03", priority: "Medium", status: "To Check", action: "Start" },
    { id: 5, orderId: "ORD-20261029-0845", items: 6, checkType: "Label Check", typeColor: "bg-yellow-50 text-yellow-700", station: "QC-03", priority: "Low", status: "To Check", action: "Start" },
  ];

  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      pageNumber={51}
      currentStep={2}
      title="My Task Queue"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Task Queue</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View and manage assigned quality check tasks by priority and station.
          </p>
        </div>

        {/* 4 KPIs matching page_51.png */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">Assigned Tasks</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">18</span>
            </div>
          </div>

          <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">In Progress</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">4</span>
            </div>
          </div>

          <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">Completed</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">27</span>
            </div>
          </div>

          <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-700 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-gray-600 block">Pending</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">8</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (8 cols): Filters + Table + Station Workload & Issue Summary */}
          <div className="lg:col-span-8 space-y-4">
            {/* Table Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-700" />
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Quality Check Task Queue (18)</h3>
                </div>
                <span className="text-[11px] font-semibold text-green-700 cursor-pointer">View All →</span>
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[170px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, SKU or Station..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <select value={station} onChange={(e) => setStation(e.target.value)} className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700">
                  <option>Station: All</option>
                  <option>Station: QC-01</option>
                  <option>Station: QC-02</option>
                  <option>Station: QC-03</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)} className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700">
                  <option>Type: All</option>
                  <option>Full Check</option>
                  <option>Label Check</option>
                  <option>Item Check</option>
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700">
                  <option>Priority: All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700">
                  <option>Status: All</option>
                  <option>To Check</option>
                  <option>In Progress</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStation("All");
                    setType("All");
                    setPriority("All");
                    setStatus("All");
                  }}
                  className="px-2.5 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 text-xs font-semibold"
                >
                  Clear
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                      <th className="pb-2">#</th>
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2 text-center">Items</th>
                      <th className="pb-2">Check Type</th>
                      <th className="pb-2">Station</th>
                      <th className="pb-2">Priority</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {qcTasks.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50 transition">
                        <td className="py-2.5 font-bold text-gray-700">{t.id}</td>
                        <td className="py-2.5 font-mono font-bold text-gray-900">{t.orderId}</td>
                        <td className="py-2.5 text-center font-bold text-gray-800">{t.items}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${t.typeColor}`}>
                            {t.checkType}
                          </span>
                        </td>
                        <td className="py-2.5 font-mono text-gray-700">📍 {t.station}</td>
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
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              t.status === "In Progress"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <Link
                            href="/warehouse/worker/quality-checker/current"
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 ${
                              t.action === "Start"
                                ? "bg-[#087A4A] hover:bg-[#065A37] text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            {t.action}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Station Workload + Issue Summary (2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Station Workload */}
              <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
                <h4 className="text-xs font-bold text-gray-900 tracking-tight">Station Workload</h4>
                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-gray-700">QC-01</span>
                      <span className="font-bold text-gray-900">8 / 10 (80%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#15803D] h-full rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-gray-700">QC-02</span>
                      <span className="font-bold text-gray-900">6 / 10 (60%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#15803D] h-full rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-medium mb-1">
                      <span className="text-gray-700">QC-03</span>
                      <span className="font-bold text-gray-900">4 / 10 (40%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#4ADE80] h-full rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Issue Summary (Today) */}
              <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold text-gray-900 tracking-tight">Issue Summary (Today)</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-red-500 text-xs">⚠️</span>
                    <span className="text-lg font-black text-red-600 block leading-tight mt-0.5">2</span>
                    <span className="text-[10px] text-gray-600 font-medium">Damaged</span>
                  </div>
                  <div className="p-2 rounded-xl bg-yellow-50 border border-yellow-100">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-yellow-600 mx-auto" />
                    <span className="text-lg font-black text-yellow-700 block leading-tight mt-0.5">1</span>
                    <span className="text-[10px] text-gray-600 font-medium truncate block">Wrong Item</span>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                    <Barcode className="w-3.5 h-3.5 text-purple-600 mx-auto" />
                    <span className="text-lg font-black text-purple-700 block leading-tight mt-0.5">1</span>
                    <span className="text-[10px] text-gray-600 font-medium truncate block">Label Issue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Next Task + Today's QC Progress + QC Checklist */}
          <div className="lg:col-span-4 space-y-4">
            {/* Next Task Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Next Task</h3>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="relative w-16 h-16 rounded-xl bg-amber-50 overflow-hidden flex-shrink-0">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
                </div>
                <div className="space-y-1 text-xs text-gray-600 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900">ORD-20261029-0841</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span>
                  </div>
                  <p>Items : <strong className="text-gray-900">8 Items (8 Units)</strong></p>
                  <p>Check Type : <strong className="text-gray-900">Full Check</strong></p>
                  <p>Station : <strong className="font-mono text-gray-900">QC-01</strong></p>
                </div>
              </div>

              <Link
                href="/warehouse/worker/quality-checker/current"
                className="w-full py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs text-center"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Start Quality Check
              </Link>
            </div>

            {/* Today's QC Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
              <h3 className="text-xs font-bold text-gray-900 tracking-tight mb-2">Today's QC Progress</h3>
              <div className="flex items-center justify-between">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.77)} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-gray-900 leading-tight">27 / 35</span>
                    <span className="text-[9px] text-gray-500 font-medium">Checks</span>
                    <span className="text-[9px] font-bold text-green-700">(77%)</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] flex-1 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Completed</span>
                    <span className="font-bold text-gray-900">27</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#3B82F6]" /> In Progress</span>
                    <span className="font-bold text-gray-900">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#F43F5E]" /> Pending</span>
                    <span className="font-bold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#9CA3AF]" /> Target (Today)</span>
                    <span className="font-bold text-gray-900">35</span>
                  </div>
                </div>
              </div>
            </div>

            {/* QC Checklist (Standard) */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
              <h4 className="text-xs font-bold text-gray-900 tracking-tight">QC Checklist (Standard)</h4>
              <div className="space-y-1.5 text-[11px] text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Item condition (no damage)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Quantity verification (match with order)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Correct SKU and product variant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Packaging quality (sealed &amp; intact)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span>Shipping label (correct &amp; readable)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/quality-checker"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Role Home
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Generating full shift QC report...")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              QC Report
            </button>
            <button
              onClick={() => alert("Opening standard operational QC guidelines.")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              QC Guidelines
            </button>
            <Link
              href="/warehouse/worker/quality-checker/current"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
            >
              <Scan className="w-4 h-4" />
              Scan Package
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
