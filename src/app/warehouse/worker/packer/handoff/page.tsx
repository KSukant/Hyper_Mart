"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  FileText,
  Boxes,
  MapPin,
  Barcode,
  Scan,
  Printer,
  Truck,
  ArrowLeft,
  Check,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PackerCompletionHandoffPage() {
  const [dispatchTeam, setDispatchTeam] = useState("Dispatch – Team A");
  const [toteBatchId, setToteBatchId] = useState("TOTE-0147");

  return (
    <WarehouseWorkerShell
      role="PACKER"
      workerName="Sukant K."
      pageNumber={49}
      currentStep={6}
      title="Completion & Handoff"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Completion &amp; Handoff</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Complete packing, print label and hand over the order to dispatch.
          </p>
        </div>

        {/* Top Banner matching page_49.png */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Packing Completed Successfully</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                The order has been packed, labeled and is ready for handoff to dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-green-200">
              <FileText className="w-4 h-4 text-green-700" />
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Order ID</span>
                <span className="font-mono font-bold text-xs text-gray-900">ORD-20261029-0841</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-green-200">
              <Boxes className="w-4 h-4 text-green-700" />
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Package</span>
                <span className="font-bold text-xs text-gray-900">1 Medium Box</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Order Summary + Packing Details + Packing Progress (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
            <div className="relative w-24 h-24 bg-amber-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
              <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
            </div>
            <div className="space-y-1 text-xs text-gray-600 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Boxes className="w-3.5 h-3.5 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Order Summary</h3>
              </div>
              <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
              <p>Total Items : <strong className="text-gray-900">8 Items (8 Units)</strong></p>
              <p>Packaging : <strong className="text-gray-900">Medium Box</strong></p>
              <p>Station : <strong className="font-mono text-gray-900">PK-01</strong></p>
              <p>Priority : <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span></p>
            </div>
          </div>

          {/* Card 2: Packing Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Boxes className="w-3.5 h-3.5 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Details</h3>
            </div>
            <div className="space-y-2 text-xs text-gray-700 pt-1">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Items Verified</span>
                <span className="font-bold text-gray-900">8 / 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Items Packed</span>
                <span className="font-bold text-gray-900">8 / 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Label Generated</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-mono font-bold text-[10px]">LBL-2741</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Package Sealed</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">Yes</span>
              </div>
            </div>
          </div>

          {/* Card 3: Packing Progress Stepper */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Boxes className="w-3.5 h-3.5 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Progress</h3>
            </div>
            <div className="flex items-center justify-between px-2 pt-2">
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[10px] font-bold text-gray-800 mt-1">Verify</span>
              </div>
              <div className="flex-1 h-0.5 bg-green-600 mx-1 -mt-4" />
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[10px] font-bold text-gray-800 mt-1">Pack</span>
              </div>
              <div className="flex-1 h-0.5 bg-green-600 mx-1 -mt-4" />
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-[10px] font-bold text-gray-800 mt-1">Label</span>
              </div>
              <div className="flex-1 h-0.5 bg-green-600 mx-1 -mt-4" />
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                </span>
                <span className="text-[10px] font-bold text-green-700 mt-1">Handoff</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Packed Items (8) + Handoff Checklist + Handoff to Dispatch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Packed Items (8) */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-2">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packed Items (8)</h3>
            </div>

            <table className="w-full text-[10px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="pb-1">#</th>
                  <th className="pb-1">SKU / Item</th>
                  <th className="pb-1 text-center">Qty</th>
                  <th className="pb-1 text-center">Packed</th>
                  <th className="pb-1 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-1 font-bold text-gray-700">1</td>
                  <td className="py-1 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-BT-014</span>
                      <span className="text-gray-500 block truncate max-w-[100px]">Steel Water Bottle</span>
                    </div>
                  </td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-right">
                    <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Packed ✓</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-1 font-bold text-gray-700">2</td>
                  <td className="py-1 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-HP-001</span>
                      <span className="text-gray-500 block truncate max-w-[100px]">Wireless Headphones</span>
                    </div>
                  </td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-right">
                    <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Packed ✓</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-1 font-bold text-gray-700">3</td>
                  <td className="py-1 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-MS-007</span>
                      <span className="text-gray-500 block truncate max-w-[100px]">Wireless Mouse</span>
                    </div>
                  </td>
                  <td className="py-1 text-center font-bold">1</td>
                  <td className="py-1 text-center font-bold">1</td>
                  <td className="py-1 text-right">
                    <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Packed ✓</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-1 font-bold text-gray-700">4</td>
                  <td className="py-1 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/backpack.png" alt="Backpack" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-BG-021</span>
                      <span className="text-gray-500 block truncate max-w-[100px]">Laptop Backpack</span>
                    </div>
                  </td>
                  <td className="py-1 text-center font-bold">1</td>
                  <td className="py-1 text-center font-bold">1</td>
                  <td className="py-1 text-right">
                    <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Packed ✓</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-1 font-bold text-gray-700">5</td>
                  <td className="py-1 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 block text-[9px]">SK-CB-009</span>
                      <span className="text-gray-500 block truncate max-w-[100px]">USB-C Cable (1 m)</span>
                    </div>
                  </td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-center font-bold">2</td>
                  <td className="py-1 text-right">
                    <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Packed ✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 2: Handoff Checklist */}
          <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Handoff Checklist</h3>
            <div className="space-y-1.5 text-[11px] text-gray-700">
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>All items packed and verified</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Correct packaging used (Medium Box)</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Shipping label generated and attached</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Package sealed properly</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Handoff tote/batch recorded</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded-lg bg-green-50/50">
                <span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Ready for dispatch</span>
              </div>
            </div>
          </div>

          {/* Card 3: Handoff to Dispatch + Ready for Handoff */}
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-green-700" />
                <h4 className="text-xs font-bold text-gray-900 tracking-tight">Handoff to Dispatch</h4>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 block mb-0.5">Dispatch Team *</label>
                <select
                  value={dispatchTeam}
                  onChange={(e) => setDispatchTeam(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                >
                  <option>Dispatch – Team A</option>
                  <option>Dispatch – Team B</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 block mb-0.5">Handoff Tote / Batch ID *</label>
                <div className="relative">
                  <Barcode className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={toteBatchId}
                    onChange={(e) => setToteBatchId(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono font-bold"
                  />
                  <Scan className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1">
                <span className="text-gray-500">Handoff Location</span>
                <span className="font-semibold text-gray-900 flex items-center gap-1">📍 Outbound Bay – 01</span>
              </div>
            </div>

            {/* Ready for Handoff banner */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-gray-900">Ready for Handoff</h5>
                <p className="text-[10px] text-gray-600">Hand over the packed order to the dispatch team.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/packer/tasks"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Tasks
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Printing handoff dispatch barcode label...")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              Print Handoff Label
            </button>
            <button
              onClick={() => alert("Marked as completed.")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
              Mark as Completed
            </button>
            <Link
              href="/warehouse/worker/packer"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
            >
              <Truck className="w-4 h-4" />
              Confirm Handoff
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
