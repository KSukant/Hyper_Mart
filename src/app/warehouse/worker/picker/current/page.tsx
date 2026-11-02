"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ExternalLink,
  Clock,
  AlertTriangle,
  Scan,
  Keyboard,
  MapPin,
  Pause,
  RefreshCw,
  Check,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PickerCurrentTaskPage() {
  const [scanTab, setScanTab] = useState<"barcode" | "sku" | "bin">("barcode");

  return (
    <WarehouseWorkerShell
      role="PICKER"
      workerName="Sukant K."
      pageNumber={40}
      currentStep={3}
      title="Current Task"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Current Task</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Execute the assigned task by scanning items, picking the required quantity, and confirming.
          </p>
        </div>

        {/* Top Task Header Card matching page_40.png */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <Package className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">Picking Task</span>
                <span className="text-base font-black text-gray-900 font-mono flex items-center gap-1">
                  ORD-20261029-0841
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                </span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                <span>Task ID: <strong className="font-mono text-gray-700">T-7841</strong></span>
                <span>Zone: <strong className="text-gray-700">A</strong></span>
                <span>Bin: <strong className="font-mono text-gray-700">A-12-03</strong></span>
              </div>
            </div>
          </div>

          {/* Progress bar in middle */}
          <div className="flex-1 max-w-xs space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900 font-bold">3 / 8 Items (37.5%)</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#15803D] h-full rounded-full transition-all" style={{ width: "37.5%" }} />
            </div>
          </div>

          {/* Badges on right */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <span className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              High Priority
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Due in 25 min
            </span>
          </div>
        </div>

        {/* Middle Row: Scan Item (left) + Pick List (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Scan Item Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-green-700">
                  <Scan className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Scan Item</h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setScanTab("barcode")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    scanTab === "barcode"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Scan className="w-3.5 h-3.5" />
                  Scan Barcode
                </button>
                <button
                  onClick={() => setScanTab("sku")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    scanTab === "sku"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  Enter SKU
                </button>
                <button
                  onClick={() => setScanTab("bin")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                    scanTab === "bin"
                      ? "bg-[#033129] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Scan Bin
                </button>
              </div>

              {/* Scan box */}
              <Link
                href="/warehouse/worker/picker/scan-result"
                className="border-2 border-dashed border-green-600/60 bg-green-50/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-green-50/50 transition group"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
                  <Scan className="w-9 h-9 stroke-[1.8]" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mt-3">Scan Item Barcode</h4>
                <p className="text-[11px] text-gray-500 mt-1 max-w-[220px]">
                  Point the scanner at the item barcode to pick and confirm.
                </p>
              </Link>
            </div>
          </div>

          {/* Pick List (8 Items) (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-green-700">
                <Package className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Pick List (8 Items)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                    <th className="pb-2">#</th>
                    <th className="pb-2">SKU / Item</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Req. Qty</th>
                    <th className="pb-2">Picked</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* Row 1: Headphones */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2.5 font-bold text-gray-700">1</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                          <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain p-0.5" unoptimized />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-gray-800 block text-[10px]">SK-HP-001</span>
                          <span className="text-gray-600 block text-[11px]">Wireless Headphones</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 font-mono text-blue-700 font-medium">A-12-03</td>
                    <td className="py-2.5 font-bold text-gray-800">2</td>
                    <td className="py-2.5 font-bold text-gray-800">2</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px] inline-flex items-center gap-1">
                        ✓ Completed
                      </span>
                    </td>
                  </tr>

                  {/* Row 2: Red Bottle */}
                  <tr className="bg-green-50/40 hover:bg-green-50/70 transition">
                    <td className="py-2.5 font-bold text-gray-700">2</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                          <Image src="/warehouse/items/red-bottle.png" alt="Water Bottle" fill className="object-contain p-0.5" unoptimized />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-gray-800 block text-[10px]">SK-BT-014</span>
                          <span className="text-gray-600 block text-[11px]">Steel Water Bottle (750 ml)</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 font-mono text-blue-700 font-medium">A-12-03</td>
                    <td className="py-2.5 font-bold text-gray-800">3</td>
                    <td className="py-2.5 font-bold text-gray-800">1</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] inline-flex items-center gap-1">
                        In Progress
                      </span>
                    </td>
                  </tr>

                  {/* Row 3: Mouse */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2.5 font-bold text-gray-700">3</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                          <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain p-0.5" unoptimized />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-gray-800 block text-[10px]">SK-MS-007</span>
                          <span className="text-gray-600 block text-[11px]">Wireless Mouse</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 font-mono text-blue-700 font-medium">A-12-04</td>
                    <td className="py-2.5 font-bold text-gray-800">1</td>
                    <td className="py-2.5 text-gray-400">0</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium text-[10px]">
                        Pending
                      </span>
                    </td>
                  </tr>

                  {/* Row 4: Cable */}
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-2.5 font-bold text-gray-700">4</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                          <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain p-0.5" unoptimized />
                        </div>
                        <div>
                          <span className="font-mono font-bold text-gray-800 block text-[10px]">SK-CB-009</span>
                          <span className="text-gray-600 block text-[11px]">USB-C Cable (1 m)</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 font-mono text-blue-700 font-medium">A-12-04</td>
                    <td className="py-2.5 font-bold text-gray-800">2</td>
                    <td className="py-2.5 text-gray-400">0</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium text-[10px]">
                        Pending
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Row: Current Item + Pick Progress + Task Actions (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Current Item */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
            <div className="relative w-24 h-28 bg-[#FFFBF0] rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
              <Image src="/warehouse/items/red-bottle.png" alt="Current Item" fill className="object-contain p-2" unoptimized />
            </div>
            <div className="space-y-1 text-xs">
              <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">Current Item</span>
              <h4 className="font-mono font-bold text-gray-900 text-sm">SK-BT-014</h4>
              <p className="text-gray-600 text-[11px]">Steel Water Bottle (750 ml)</p>
              <div className="pt-1 text-[11px] space-y-0.5 text-gray-600">
                <p>Location : <strong className="font-mono text-gray-900">A-12-03</strong></p>
                <p>Required : <strong className="text-gray-900">3</strong></p>
                <p>Picked : <strong className="text-gray-900">1</strong></p>
                <p>Remaining : <span className="px-1.5 py-0.2 rounded bg-pink-50 text-pink-700 font-bold">2</span></p>
              </div>
            </div>
          </div>

          {/* Card 2: Pick Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Pick Progress</h3>
            <div className="my-2 flex items-center justify-between">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="10" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.25)} />
                  <circle cx="50" cy="50" r="38" stroke="#3B82F6" strokeWidth="10" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.125)} style={{ transform: "rotate(90deg)", transformOrigin: "center" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-gray-900 leading-tight">3 / 8</span>
                  <span className="text-[9px] text-gray-500 font-medium">Items</span>
                  <span className="text-[9px] font-bold text-green-700">(37.5%)</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] flex-1 pl-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Completed</span>
                  <span className="font-bold text-gray-900">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#3B82F6]" /> In Progress</span>
                  <span className="font-bold text-gray-900">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#9CA3AF]" /> Pending</span>
                  <span className="font-bold text-gray-900">6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Task Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Task Actions</h3>
            <div className="space-y-2.5 my-auto pt-2">
              <button
                onClick={() => alert("Task paused. State persisted.")}
                className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition flex items-center justify-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                Pause Task
              </button>
              <button
                onClick={() => alert("Change bin requested. Directing to supervisor.")}
                className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Bin
              </button>
              <Link
                href="/warehouse/worker/picker/scan-result"
                className="w-full py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs text-center"
              >
                <Check className="w-4 h-4" />
                Confirm &amp; Next Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
