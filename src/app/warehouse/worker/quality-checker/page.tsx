"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardList,
  Layers,
  CheckCircle2,
  Clock,
  Scan,
  Keyboard,
  ShieldCheck,
  Search,
  Barcode,
  Truck,
  ChevronRight,
  Info,
  AlertTriangle,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerRoleHomePage() {
  const [quickScanTab, setQuickScanTab] = useState<"package" | "order" | "item">("package");

  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      pageNumber={50}
      currentStep={1}
      title="Role Home"
    >
      <div className="space-y-4">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Role Home</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Welcome back, Sukant K.! Here's your shift overview and assigned work.
          </p>
        </div>

        {/* 4 KPIs + Quick Scan Row matching page_50.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left 8 cols */}
          <div className="lg:col-span-8 space-y-4">
            {/* 4 KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-gray-600 block">My Assigned Tasks</span>
                  <span className="text-xl font-bold text-gray-900 leading-none">18</span>
                </div>
              </div>

              <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-gray-600 block">In Progress</span>
                  <span className="text-xl font-bold text-gray-900 leading-none">4</span>
                </div>
              </div>

              <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-gray-600 block">Completed Today</span>
                  <span className="text-xl font-bold text-gray-900 leading-none">27</span>
                </div>
              </div>

              <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-700 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-gray-600 block">Pending</span>
                  <span className="text-xl font-bold text-gray-900 leading-none">8</span>
                </div>
              </div>
            </div>

            {/* Role Banner: Quality Checker */}
            <div className="rounded-2xl bg-[#033129] text-white p-5 flex items-center justify-between overflow-hidden relative shadow-sm">
              <div className="z-10 max-w-sm space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#A3E635]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-white/80 block">You are assigned as</span>
                    <h2 className="text-2xl font-black text-white leading-tight">Quality Checker</h2>
                  </div>
                </div>
                <p className="text-xs text-white/80 pl-11">
                  Verify packed orders, ensure quality and approve for dispatch.
                </p>
              </div>

              {/* Right Illustration image */}
              <div className="relative w-72 h-32 hidden sm:block flex-shrink-0 -mr-2">
                <Image
                  src="/warehouse/items/qc-banner.png"
                  alt="Quality check checklist"
                  fill
                  className="object-cover rounded-xl"
                  unoptimized
                />
              </div>
            </div>

            {/* Quick Actions (4 cards) */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 tracking-tight mb-2.5">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link
                  href="/warehouse/worker/quality-checker/current"
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-green-600 hover:shadow-xs transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                      <Search className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-gray-900">Check Packages</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      Verify packed orders for quality
                    </p>
                  </div>
                </Link>

                <Link
                  href="/warehouse/worker/quality-checker/current"
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-green-600 hover:shadow-xs transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-gray-900">Inspect Items</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      Check item condition, quantity and labels
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => alert("Validating shipping label and SKU details.")}
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-green-600 hover:shadow-xs transition group flex flex-col justify-between text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Barcode className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-gray-900">Verify Label</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      Validate shipping label, SKU and order details
                    </p>
                  </div>
                </button>

                <Link
                  href="/warehouse/worker/quality-checker/handoff"
                  className="bg-white border border-gray-200 rounded-xl p-3 hover:border-green-600 hover:shadow-xs transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-700 flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-gray-900">Approve Dispatch</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                      Mark verified orders ready for dispatch
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right 4 cols: Quick Scan Panel matching page_50.png */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-green-700">
                  <Scan className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Quick Scan</h3>
              </div>

              {/* Tabs: Package / Order / Item */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setQuickScanTab("package")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    quickScanTab === "package"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Package
                </button>
                <button
                  onClick={() => setQuickScanTab("order")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    quickScanTab === "order"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Order
                </button>
                <button
                  onClick={() => setQuickScanTab("item")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    quickScanTab === "item"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Item
                </button>
              </div>

              {/* Scanner Box with dashed border */}
              <Link
                href="/warehouse/worker/quality-checker/scan-result"
                className="border-2 border-dashed border-green-600/60 bg-green-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-green-50/60 transition group"
              >
                <div className="w-16 h-16 rounded-xl bg-green-100/70 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
                  <Scan className="w-9 h-9 stroke-[1.8]" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mt-3">Scan Package</h4>
                <p className="text-[11px] text-gray-500 mt-1 max-w-[200px]">
                  Scan package, order or item to start quality check
                </p>
              </Link>

              {/* Divider 'or' */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-2 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  or
                </span>
              </div>

              {/* Enter Code Manually Button */}
              <button
                onClick={() => {
                  const code = prompt("Enter Package / Order / Item ID:", "PKG-2741");
                  if (code) window.location.href = "/warehouse/worker/quality-checker/scan-result";
                }}
                className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center justify-center gap-2"
              >
                <Keyboard className="w-4 h-4 text-gray-500" />
                Enter Code Manually
              </button>
            </div>
          </div>
        </div>

        {/* Bottom 3 Cards matching page_50.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Card 1: My Task Queue (Next 5) - 5 cols */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">My Task Queue (Next 5)</h3>
                <Link
                  href="/warehouse/worker/quality-checker/tasks"
                  className="text-[11px] font-semibold text-green-700 hover:text-green-800"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-2 mt-2">
                {[
                  { id: "ORD-20261029-0841", items: "8 items", station: "PK-01", priority: "High", pColor: "bg-red-50 text-red-700" },
                  { id: "ORD-20261029-0842", items: "5 items", station: "PK-02", priority: "High", pColor: "bg-red-50 text-red-700" },
                  { id: "ORD-20261029-0843", items: "3 items", station: "PK-02", priority: "Medium", pColor: "bg-yellow-50 text-yellow-700" },
                  { id: "ORD-20261029-0844", items: "4 items", station: "PK-03", priority: "Medium", pColor: "bg-yellow-50 text-yellow-700" },
                  { id: "ORD-20261029-0845", items: "6 items", station: "PK-03", priority: "Low", pColor: "bg-green-50 text-green-700" },
                ].map((task) => (
                  <Link
                    key={task.id}
                    href="/warehouse/worker/quality-checker/current"
                    className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-[11px] transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-gray-800">{task.id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                        QC
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{task.items}</span>
                      <span className="text-gray-600 font-mono text-[10px]">{task.station}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${task.pColor}`}>
                        {task.priority}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Today's Progress - 3 cols */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Today's Progress</h3>
            <div className="my-2 flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10B981"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.77)}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.11)}
                    style={{ transform: "rotate(277deg)", transformOrigin: "center" }}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F43F5E"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - 0.22)}
                    style={{ transform: "rotate(317deg)", transformOrigin: "center" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-gray-900 leading-tight">27 / 35</span>
                  <span className="text-[9px] text-gray-500 font-medium">Checks</span>
                  <span className="text-[9px] font-bold text-green-700">(77%)</span>
                </div>
              </div>

              <div className="mt-3 w-full space-y-1 text-[10px]">
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

          {/* Card 3: Announcements - 4 cols */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-500 text-xs">📢</span>
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Announcements</h3>
                </div>
                <button
                  onClick={() => alert("All QC announcements viewed.")}
                  className="text-[11px] font-semibold text-green-700 hover:text-green-800"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2 mt-2">
                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-gray-800 font-medium leading-tight">
                      New QC checklist v2.1 is now effective.
                    </p>
                    <span className="text-[9px] text-gray-400 mt-1 block">Today, 11:30 AM</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-gray-800 font-medium leading-tight">
                      Check label and package seal before approval.
                    </p>
                    <span className="text-[9px] text-gray-400 mt-1 block">Today, 10:05 AM</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-yellow-50/50 border border-yellow-100 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-gray-800 font-medium leading-tight">
                      Increased QC volume at Station PK-02.
                    </p>
                    <span className="text-[9px] text-gray-400 mt-1 block">Today, 09:20 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
