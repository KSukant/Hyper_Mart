"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Layers,
  Barcode,
  ArrowLeft,
  ScanLine,
  Keyboard,
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Target,
  Hourglass,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { WarehouseWorkerShell, WorkerStep } from "@/components/warehouse/WarehouseWorkerShell";

const IO_SCAN_STEPS: WorkerStep[] = [
  { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Package },
  { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
  { stepNum: 3, label: "Current Task", href: "/warehouse/worker/inventory-officer/current", icon: Layers },
  { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/inventory-officer/scan-result", icon: Barcode },
  { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/inventory-officer/issue-report", icon: AlertTriangle },
  { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/inventory-officer/issue-report-final", icon: Check },
];

export default function InventoryOfficerScanResultPage() {
  return (
    <WarehouseWorkerShell
      role="INVENTORY_OFFICER"
      workerName="Sukant K."
      roleTitle="Inventory Officer > Scan Result"
      steps={IO_SCAN_STEPS}
      currentStepIndex={3}
      pageNumber={59}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Scan Result</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            View scan verification results and item validation details.
          </p>
        </div>

        {/* Top Green Banner */}
        <div className="bg-[#EAF7EF] border border-[#86EFAC] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#087A4A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Item Scanned Successfully</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                The item has been verified and is eligible for stock update.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <Barcode className="w-5 h-5 text-emerald-800" />
              <div>
                <span className="text-gray-500 block text-[10px]">Scan ID</span>
                <span className="font-bold text-gray-900 font-mono">SCN-20261029-5587</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-800" />
              <div>
                <span className="text-gray-500 block text-[10px]">Result</span>
                <span className="font-bold text-[#087A4A] text-xs">Valid Item</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Scanned Item Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Scanned Item Details</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#F5F7F6] border border-gray-200 flex items-center justify-center flex-shrink-0 p-2 relative overflow-hidden">
                <Image
                  src="/warehouse/items/headphones.png"
                  alt="Headphones"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">SKU:</span>
                  <span className="font-bold text-gray-900 font-mono">SK-HP-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Item:</span>
                  <span className="font-bold text-gray-900">Wireless Headphones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Barcode:</span>
                  <span className="font-bold text-gray-900 font-mono">8901234567890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-bold text-gray-900">Electronics</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">UOM:</span>
                  <span className="font-bold text-gray-900">Unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Verification Result */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Verification Result</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>Item found in master data</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Yes
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>Bin location match (B-02-01)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Yes
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>UOM match (Unit)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Yes
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>Item status (Active)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Yes
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>Batch / Serial (Not required)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold text-[10px]">
                  -
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Stock Update Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Stock Update Preview</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current Stock:</span>
                <span className="font-bold text-gray-900">120 Units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Scan Quantity:</span>
                <span className="font-bold text-emerald-700">+10 Units</span>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                <span className="font-bold text-emerald-950">Updated Stock:</span>
                <span className="text-base font-black text-emerald-800">130 Units</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 2 Cards (Scan History & Task Progress) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Card 1: Scan History (This Task) (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Scan History (This Task)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] font-bold text-gray-600 bg-gray-50/70 border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Scan ID</th>
                    <th className="py-2.5 px-3">Barcode</th>
                    <th className="py-2.5 px-3 text-center">Quantity</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {[
                    { num: 1, id: "SCN-20261029-5585", barcode: "8901234567890", qty: "10 Units", time: "03:12 PM" },
                    { num: 2, id: "SCN-20261029-5586", barcode: "8901234567890", qty: "10 Units", time: "03:16 PM" },
                    { num: 3, id: "SCN-20261029-5587", barcode: "8901234567890", qty: "10 Units", time: "03:20 PM" },
                  ].map((row) => (
                    <tr key={row.num} className="hover:bg-gray-50/60 transition">
                      <td className="py-2.5 px-3 font-bold text-gray-800">{row.num}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-gray-900">{row.id}</td>
                      <td className="py-2.5 px-3 font-mono text-gray-700">{row.barcode}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-gray-900">{row.qty}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          ✓ Updated
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-gray-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Task Progress (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Task Progress</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-800">Target Quantity: 30 Units</span>
                <span className="font-bold text-emerald-700">20 / 30 Units (67%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-[#087A4A] rounded-full" style={{ width: "67%" }} />
              </div>
            </div>

            {/* 3 Metric Mini Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium block">Scanned</span>
                <span className="text-sm font-black text-gray-900">20 Units</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-center">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1">
                  <Hourglass className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium block">Remaining</span>
                <span className="text-sm font-black text-gray-900">10 Units</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-center">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-1">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-gray-500 font-medium block">Progress</span>
                <span className="text-sm font-black text-gray-900">67%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/warehouse/worker/inventory-officer/current"
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Current Task
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href="/warehouse/worker/inventory-officer/scan-result"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <ScanLine className="w-3.5 h-3.5 text-gray-500" />
              Rescan Item
            </Link>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Keyboard className="w-3.5 h-3.5 text-gray-500" />
              Manual Entry
            </button>
            <Link
              href="/warehouse/worker/inventory-officer/issue-report"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-gray-500" />
              Report Issue
            </Link>
            <Link
              href="/warehouse/worker/inventory-officer/issue-report"
              className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
            >
              <span>Continue to Update</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
