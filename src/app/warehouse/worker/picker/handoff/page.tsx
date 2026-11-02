"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Truck,
  Package,
  MapPin,
  Barcode,
  Printer,
  ArrowLeft,
  Check,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PickerCompletionHandoffPage() {
  const [handoffTo, setHandoffTo] = useState("Packing Team");
  const [handoffLocation, setHandoffLocation] = useState("Packing Station – PK-01");
  const [toteId, setToteId] = useState("TOT-PK-0587");

  return (
    <WarehouseWorkerShell
      role="PICKER"
      workerName="Sukant K."
      pageNumber={43}
      currentStep={6}
      title="Completion & Handoff"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Completion &amp; Handoff</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Finalize the task, hand over the picked items to packing, and close the order.
          </p>
        </div>

        {/* Top Row: Task Completed + Handoff Stepper matching page_43.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (6 cols): Task Completed Banner + Task Summary */}
          <div className="lg:col-span-6 space-y-4">
            {/* Green banner */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Task Completed</h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  All items have been successfully picked.
                </p>
              </div>
            </div>

            {/* Task Summary Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 mb-2">
                  <Package className="w-4 h-4 text-green-700" />
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Task Summary</h3>
                </div>

                <div className="space-y-1 text-[11px] text-gray-600">
                  <p>Task ID : <strong className="font-mono text-gray-900">T-7841</strong></p>
                  <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
                  <p>Task Type : <strong className="text-gray-900">Pick</strong></p>
                  <p>Zone / Bin : <strong className="font-mono text-gray-900">A &nbsp;/&nbsp; A-12-03</strong></p>
                  <p>Picked By : <strong className="text-gray-900">Sukant K. (Picker)</strong></p>
                  <p>Completed At : <strong className="text-gray-900">Oct 29, 2026, 02:40 PM</strong></p>
                </div>
              </div>

              {/* Donut 100% */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="10" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-gray-900 leading-tight">8 / 8</span>
                    <span className="text-[9px] text-gray-500 font-medium">Items</span>
                    <span className="text-[9px] font-bold text-green-700">(100%)</span>
                  </div>
                </div>
                <span className="mt-2 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px] flex items-center gap-1">
                  ✓ Picking Completed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Handoff to Next Process */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Handoff to Next Process</h3>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-5 px-3">
                <div className="flex flex-col items-center text-center">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 mt-1">Pick Completed</span>
                </div>
                <div className="flex-1 h-0.5 bg-green-600 mx-2 -mt-4" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-6 h-6 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                  </div>
                  <span className="text-[10px] font-bold text-green-700 mt-1">Handoff to Packing</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2 -mt-4" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[10px] font-medium text-gray-400 mt-1">Packing In Progress</span>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Handoff To *</label>
                  <div className="relative">
                    <Package className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={handoffTo}
                      onChange={(e) => setHandoffTo(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
                    >
                      <option>Packing Team</option>
                      <option>Quality Team</option>
                      <option>Supervisor Desk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Handoff Location *</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={handoffLocation}
                      onChange={(e) => setHandoffLocation(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
                    >
                      <option>Packing Station – PK-01</option>
                      <option>Packing Station – PK-02</option>
                      <option>Packing Station – PK-03</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Scan Handoff Bin / Tote *</label>
                  <div className="relative">
                    <Barcode className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={toteId}
                      onChange={(e) => setToteId(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-green-600/50 rounded-xl text-xs font-mono font-bold text-gray-800 focus:outline-none"
                    />
                    <CheckCircle2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row (3 cols): Order Item Summary + Handoff Checklist + Ready for Handoff */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Order Item Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-2">
              <Package className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Order Item Summary</h3>
            </div>

            <table className="w-full text-[10px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="pb-1">#</th>
                  <th className="pb-1">SKU / Item</th>
                  <th className="pb-1 text-center">Qty</th>
                  <th className="pb-1 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-1.5 font-bold text-gray-700">1</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-HP-001</span>
                      <span className="text-gray-500 block truncate max-w-[120px]">Wireless Headphones</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold text-gray-800">2</td>
                  <td className="py-1.5 text-right"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" /></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold text-gray-700">2</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-BT-014</span>
                      <span className="text-gray-500 block truncate max-w-[120px]">Steel Water Bottle (750 ml)</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold text-gray-800">3</td>
                  <td className="py-1.5 text-right"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" /></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold text-gray-700">3</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-MS-007</span>
                      <span className="text-gray-500 block truncate max-w-[120px]">Wireless Mouse</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold text-gray-800">1</td>
                  <td className="py-1.5 text-right"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" /></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold text-gray-700">4</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-CB-009</span>
                      <span className="text-gray-500 block truncate max-w-[120px]">USB-C Cable (1 m)</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold text-gray-800">2</td>
                  <td className="py-1.5 text-right"><CheckCircle2 className="w-3.5 h-3.5 text-green-600 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 2: Handoff Checklist */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Handoff Checklist</h3>
            <div className="space-y-2 text-[11px] text-gray-700">
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-medium">All items picked and verified (8 / 8)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-medium">No pending issues for this task</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-medium">Items placed in handoff tote/bin</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="font-medium">Handoff bin scanned (TOT-PK-0587)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Ready for Handoff */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col items-center justify-center text-center">
            <div className="relative w-28 h-20 mb-2">
              <Image src="/warehouse/items/ready-box.png" alt="Ready Box" fill className="object-contain" unoptimized />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Ready for Handoff</h4>
            <p className="text-[11px] text-gray-500 mt-1 max-w-[200px]">
              The picked items are ready and can be handed over to the packing team.
            </p>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
          <Link
            href="/warehouse/worker/picker/tasks"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Tasks
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Handoff barcode label printed for TOT-PK-0587.")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              Print Handoff Label
            </button>
            <Link
              href="/warehouse/worker/picker"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
            >
              <Truck className="w-4 h-4" />
              Confirm Handoff &amp; Complete
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
