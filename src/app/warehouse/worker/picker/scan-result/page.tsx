"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Scan,
  RefreshCw,
  Minus,
  Plus,
  Check,
  Package,
  Layers,
  Barcode,
  Info,
  XCircle,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PickerScanResultPage() {
  const [pickQty, setPickQty] = useState(1);

  return (
    <WarehouseWorkerShell
      role="PICKER"
      workerName="Sukant K."
      pageNumber={41}
      currentStep={4}
      title="Scan Result"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Scan Result</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Item scan verification and pick confirmation for the current task.
          </p>
        </div>

        {/* Top Scan Successful Banner matching page_41.png */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
            <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Scan Successful</h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Item matched and verified. Proceed to pick the required quantity.
            </p>
          </div>
        </div>

        {/* Main Content: Left Details + Right Task Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Matched Item Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-36 h-40 bg-[#FFFBF0] rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
                <Image src="/warehouse/items/red-bottle.png" alt="Matched Item" fill className="object-contain p-2" unoptimized />
              </div>
              <div className="space-y-2 text-xs flex-1">
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px] inline-flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  Matched Item
                </span>
                <h3 className="text-xl font-black text-gray-900 font-mono tracking-tight">SK-BT-014</h3>
                <p className="text-sm font-medium text-gray-600">Steel Water Bottle (750 ml)</p>
                <div className="pt-2 text-xs space-y-1 text-gray-600 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-gray-500">Order ID</span>
                    <span className="font-mono font-bold text-gray-900">: &nbsp; ORD-20261029-0841</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-gray-500">Task ID</span>
                    <span className="font-mono font-bold text-gray-900">: &nbsp; T-7841</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-24 text-gray-500">Location (Bin)</span>
                    <span className="font-mono font-bold text-gray-900">: &nbsp; <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px]">A-12-03</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Metrics below card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-600">Required Qty</span>
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-gray-900">3</div>
              </div>

              <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-600">Picked Qty</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-gray-900">1</div>
              </div>

              <div className="bg-[#FEFCE8] border border-[#FEF9C3] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-600">Remaining</span>
                  <Layers className="w-4 h-4 text-amber-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-gray-900">2</div>
              </div>

              <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray-600">Scan Count</span>
                  <Barcode className="w-4 h-4 text-purple-600" />
                </div>
                <div className="mt-2 text-2xl font-black text-gray-900">1 / 3</div>
              </div>
            </div>

            {/* Yellow notice banner */}
            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-3 flex items-center gap-2.5 text-xs text-gray-800">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Pick <strong>2 more units</strong> of this item from bin <strong className="font-mono text-gray-900">A-12-03</strong>.</span>
            </div>

            {/* Bottom Actions Row: Rescan + Change Bin + Stepper + Confirm Pick */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Ready to rescan barcode.")}
                  className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
                >
                  <Scan className="w-3.5 h-3.5 text-gray-500" />
                  Rescan
                </button>
                <button
                  onClick={() => alert("Change bin requested.")}
                  className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                  Change Bin
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper [- 1 +] */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setPickQty(Math.max(1, pickQty - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-gray-900">{pickQty}</span>
                  <button
                    onClick={() => setPickQty(Math.min(3, pickQty + 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href="/warehouse/worker/picker/handoff"
                  className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                >
                  <Check className="w-4 h-4" />
                  Confirm Pick
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Task Progress - T-7841 */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-green-700" />
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Task Progress – T-7841</h3>
                </div>
                <span className="text-xs font-bold text-gray-900">3 / 8 Items</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mt-2">
                <div className="bg-[#15803D] h-full rounded-full" style={{ width: "37.5%" }} />
              </div>
              <div className="text-right mt-1">
                <span className="text-[10px] font-bold text-green-700">37.5%</span>
              </div>
            </div>

            {/* Items in This Task */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <h3 className="text-xs font-bold text-gray-900 tracking-tight mb-2.5">Items in This Task</h3>
              <div className="space-y-2">
                {/* Item 1: Active Red Bottle */}
                <div className="p-2.5 rounded-xl border border-green-500 bg-green-50/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Red Bottle" fill className="object-contain p-0.5" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BT-014</span>
                      <span className="text-gray-600 text-[11px] block">Steel Water Bottle (750 ml)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">3</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">1 / 3</span>
                  </div>
                </div>

                {/* Item 2: Headphones */}
                <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain p-0.5" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-HP-001</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Headphones</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">2</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium text-[10px]">0 / 2</span>
                  </div>
                </div>

                {/* Item 3: Mouse */}
                <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain p-0.5" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-MS-007</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Mouse</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">1</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium text-[10px]">0 / 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Scans */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Recent Scans</h3>
                <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
              </div>
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-medium">
                    <th className="pb-1.5">Time</th>
                    <th className="pb-1.5">SKU</th>
                    <th className="pb-1.5">Result</th>
                    <th className="pb-1.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-1.5 text-gray-500">02:18 PM</td>
                    <td className="py-1.5 font-mono text-gray-800">SK-BT-014</td>
                    <td className="py-1.5 text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" /> Matched
                    </td>
                    <td className="py-1.5 text-right">
                      <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Picked (1)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">02:16 PM</td>
                    <td className="py-1.5 font-mono text-gray-800">SK-XX-902</td>
                    <td className="py-1.5 text-red-600 font-semibold flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-red-500" /> Not Found
                    </td>
                    <td className="py-1.5 text-right text-gray-400">—</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-gray-500">02:15 PM</td>
                    <td className="py-1.5 font-mono text-gray-800">SK-BT-014</td>
                    <td className="py-1.5 text-green-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" /> Matched
                    </td>
                    <td className="py-1.5 text-right text-gray-400">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
