"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Layers,
  MapPin,
  Barcode,
  ArrowLeft,
  Keyboard,
  AlertTriangle,
  RotateCcw,
  Check,
  Clock,
  ClipboardList,
} from "lucide-react";
import { WarehouseWorkerShell, WorkerStep } from "@/components/warehouse/WarehouseWorkerShell";

const IO_CURRENT_STEPS: WorkerStep[] = [
  { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Package },
  { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
  { stepNum: 3, label: "Current Task", href: "/warehouse/worker/inventory-officer/current", icon: Layers },
  { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/inventory-officer/scan-result", icon: Barcode },
  { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/inventory-officer/issue-report", icon: AlertTriangle },
  { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/inventory-officer/issue-report-final", icon: Check },
];

export default function InventoryOfficerCurrentTaskPage() {
  const [batches, setBatches] = useState([
    {
      num: 1,
      barcode: "8901234567890",
      sku: "SK-HP-001",
      desc: "Wireless Headphones",
      current: 120,
      update: "+10",
      newStock: 130,
      status: "Updated",
      checked: true,
    },
    {
      num: 2,
      barcode: "8901234567891",
      sku: "SK-HP-001",
      desc: "Wireless Headphones",
      current: 130,
      update: "+10",
      newStock: 140,
      status: "Updated",
      checked: true,
    },
    {
      num: 3,
      barcode: "8901234567892",
      sku: "SK-HP-001",
      desc: "Wireless Headphones",
      current: 140,
      update: "+10",
      newStock: 150,
      status: "Pending",
      checked: false,
    },
  ]);

  return (
    <WarehouseWorkerShell
      role="INVENTORY_OFFICER"
      workerName="Sukant K."
      roleTitle="Inventory Officer > Current Task"
      steps={IO_CURRENT_STEPS}
      currentStepIndex={2}
      pageNumber={58}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Current Task</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            Perform the assigned inventory operation, scan items and update stock.
          </p>
        </div>

        {/* Top Yellow Progress Banner */}
        <div className="bg-[#FFFDF0] border border-[#FEF08A] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Stock Update in Progress</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Scan items, verify details and update the stock quantity in the system.
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-700">Task Progress</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
                <span className="text-[11px] font-bold text-gray-800">Start Task</span>
              </div>
              <div className="w-8 h-0.5 bg-emerald-600" />
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-600 bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800">Scan & Update</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-[10px]">
                  ○
                </div>
                <span className="text-[11px] text-gray-400">Verify</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-[10px]">
                  ○
                </div>
                <span className="text-[11px] text-gray-400">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Task Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Task Details</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-[#FFFBF0] border border-amber-200 flex items-center justify-center flex-shrink-0 p-2 relative">
                <Image
                  src="/warehouse/items/cardboard-box.png"
                  alt="Box"
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>

              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Task ID:</span>
                  <span className="font-bold text-gray-900 font-mono">INV-4822</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Task Type:</span>
                  <span className="font-bold text-gray-900">Stock Update</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Priority:</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                    High
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Due In:</span>
                  <span className="font-bold text-gray-900">35 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Assigned Qty:</span>
                  <span className="font-bold text-gray-900">30 Units</span>
                </div>
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-gray-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] inline-flex items-center gap-1">
                    <RotateCcw className="w-2.5 h-2.5" />
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Location & Bin Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Location & Bin Information</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Warehouse:</span>
                <span className="font-bold text-gray-900">Main Warehouse</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Aisle / Rack:</span>
                <span className="font-bold text-gray-900 font-mono">B-02</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Bin Location:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold font-mono text-[11px]">
                  B-02-01
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Bin Capacity:</span>
                <span className="font-bold text-gray-900">200 Units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current Stock:</span>
                <span className="font-bold text-gray-900">120 Units</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Expected Stock:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                  150 Units
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Item Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Item Information</h3>
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
                  <span className="text-gray-500">Category:</span>
                  <span className="font-bold text-gray-900">Electronics</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">UOM:</span>
                  <span className="font-bold text-gray-900">Unit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Barcode:</span>
                  <span className="font-bold text-gray-900 font-mono">8901234567890</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Card: Item Scan & Update (Batch) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Item Scan & Update (Batch)</h3>
            </div>

            {/* Metrics Pills */}
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-bold">
                Target Qty: 30 Units
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                Scanned: 20 Units
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold">
                Remaining: 10 Units
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] font-bold text-gray-600 bg-gray-50/70 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3.5">#</th>
                  <th className="py-3 px-3.5">Scan / Barcode</th>
                  <th className="py-3 px-3.5">Item (SKU)</th>
                  <th className="py-3 px-3.5">Description</th>
                  <th className="py-3 px-3.5 text-center">Current Stock</th>
                  <th className="py-3 px-3.5 text-center">Update Qty</th>
                  <th className="py-3 px-3.5 text-center">New Stock</th>
                  <th className="py-3 px-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {batches.map((row) => (
                  <tr key={row.num} className="hover:bg-gray-50/60 transition">
                    <td className="py-3.5 px-3.5 font-bold text-gray-800">{row.num}</td>
                    <td className="py-3.5 px-3.5">
                      <div className="flex items-center gap-2">
                        {row.checked ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300" />
                        )}
                        <span className="font-mono font-bold text-gray-900">{row.barcode}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5 font-mono text-gray-700 font-bold">{row.sku}</td>
                    <td className="py-3.5 px-3.5 text-gray-800">{row.desc}</td>
                    <td className="py-3.5 px-3.5 text-center font-bold text-gray-800">
                      {row.current}
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-bold ${
                          row.status === "Updated"
                            ? "bg-emerald-50 text-emerald-700"
                            : "border border-gray-300 text-gray-700 bg-white"
                        }`}
                      >
                        {row.update}
                      </span>
                    </td>
                    <td className="py-3.5 px-3.5 text-center font-bold text-gray-900">
                      {row.newStock}
                    </td>
                    <td className="py-3.5 px-3.5 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                          row.status === "Updated"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {row.status === "Updated" ? "✓ Updated" : "⏱ Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/warehouse/worker/inventory-officer/tasks"
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Tasks
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href="/warehouse/worker/inventory-officer/scan-result"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Barcode className="w-3.5 h-3.5 text-gray-500" />
              Scan Item
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
              href="/warehouse/worker/inventory-officer/scan-result"
              className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              Update Stock
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
