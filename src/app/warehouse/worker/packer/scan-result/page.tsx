"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Barcode,
  Package,
  Boxes,
  Clock,
  ArrowLeft,
  Printer,
  Minus,
  Plus,
  Play,
  XCircle,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PackerScanResultPage() {
  const [quantities, setQuantities] = useState({
    bottle: 2,
    headphones: 2,
    mouse: 0,
  });

  return (
    <WarehouseWorkerShell
      role="PACKER"
      workerName="Sukant K."
      pageNumber={47}
      currentStep={4}
      title="Scan Result"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Scan Result</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View scanned item details, verification status and packing readiness.
          </p>
        </div>

        {/* Top Banner matching page_47.png */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Item Scanned Successfully</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                The item has been verified and is ready for packing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-3.5 py-2 rounded-xl border border-green-200">
            <Barcode className="w-5 h-5 text-green-700" />
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block font-medium">Scan ID</span>
              <span className="font-mono font-bold text-xs text-gray-900">SCN-20261029-2741</span>
            </div>
          </div>
        </div>

        {/* Row 1: Item Details + Packing Progress + Order & Station (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Item Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
            <div className="relative w-24 h-28 bg-[#FFFBF0] rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
              <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain p-2" unoptimized />
            </div>
            <div className="space-y-1 text-xs flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500">Item Details</span>
                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px] flex items-center gap-1">
                  ✓ Verified
                </span>
              </div>
              <h4 className="font-mono font-bold text-gray-900 text-sm">SK-BT-014</h4>
              <p className="text-gray-600 text-[11px]">Steel Water Bottle (750 ml)</p>
              <div className="pt-1 text-[11px] space-y-0.5 text-gray-600">
                <p>Ordered Qty : <strong className="text-gray-900">3</strong></p>
                <p>Packed Qty : <strong className="text-gray-900">2</strong></p>
                <p>To Pack : <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-bold">1</span></p>
              </div>
            </div>
          </div>

          {/* Card 2: Packing Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Progress</h3>
            <div className="my-2 flex items-center justify-between">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="10" fill="none" strokeDasharray="238.7" strokeDashoffset={238.7 * (1 - 0.67)} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-gray-900 leading-tight">2 / 3</span>
                  <span className="text-[9px] text-gray-500 font-medium">Packed</span>
                  <span className="text-[9px] font-bold text-green-700">(67%)</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] flex-1 pl-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#10B981]" /> Packed</span>
                  <span className="font-bold text-gray-900">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-xs bg-[#9CA3AF]" /> To Pack</span>
                  <span className="font-bold text-gray-900">1</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold text-gray-900">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Order & Station */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Order &amp; Station</h3>
            </div>
            <div className="space-y-1 text-xs text-gray-600 pt-1">
              <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
              <p>Station : <strong className="font-mono text-gray-900">PK-01</strong></p>
              <p>Packaging : <strong className="text-gray-900">Medium Box</strong></p>
              <p>Priority : <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span></p>
              <p className="flex items-center gap-1 text-red-600 font-semibold">
                Due In : <Clock className="w-3.5 h-3.5 text-red-500" /> 15 min
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: Packing Item List (3) + Recent Scans (2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Table (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-3">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Packing Item List (3)</h3>
            </div>

            <table className="w-full text-[11px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                  <th className="pb-2">#</th>
                  <th className="pb-2">SKU / Item</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-center">Packed</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 font-bold text-gray-700">1</td>
                  <td className="py-2.5 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BT-014</span>
                      <span className="text-gray-600 text-[11px] block">Steel Water Bottle (750 ml)</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-bold text-gray-800">3</td>
                  <td className="py-2.5 text-center">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                      <button onClick={() => setQuantities({ ...quantities, bottle: Math.max(0, quantities.bottle - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center font-bold text-xs">{quantities.bottle}</span>
                      <button onClick={() => setQuantities({ ...quantities, bottle: Math.min(3, quantities.bottle + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Packed ✓</span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 font-bold text-gray-700">2</td>
                  <td className="py-2.5 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-HP-001</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Headphones</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-bold text-gray-800">2</td>
                  <td className="py-2.5 text-center">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                      <button onClick={() => setQuantities({ ...quantities, headphones: Math.max(0, quantities.headphones - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center font-bold text-xs">{quantities.headphones}</span>
                      <button onClick={() => setQuantities({ ...quantities, headphones: Math.min(2, quantities.headphones + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Packed ✓</span>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 font-bold text-gray-700">3</td>
                  <td className="py-2.5 flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-MS-007</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Mouse</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-bold text-gray-800">1</td>
                  <td className="py-2.5 text-center">
                    <div className="inline-flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                      <button onClick={() => setQuantities({ ...quantities, mouse: Math.max(0, quantities.mouse - 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center font-bold text-xs">{quantities.mouse}</span>
                      <button onClick={() => setQuantities({ ...quantities, mouse: Math.min(1, quantities.mouse + 1) })} className="w-5 h-5 bg-white rounded flex items-center justify-center text-gray-600"><Plus className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">To Pack</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Recent Scans (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Recent Scans</h3>
              </div>
              <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
            </div>

            <table className="w-full text-[10px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="pb-1.5"></th>
                  <th className="pb-1.5">Time</th>
                  <th className="pb-1.5">SKU / Item</th>
                  <th className="pb-1.5 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /></td>
                  <td className="py-2 text-gray-500">02:24 PM</td>
                  <td className="py-2 font-mono font-medium text-gray-800">SK-BT-014</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold">Success</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /></td>
                  <td className="py-2 text-gray-500">02:22 PM</td>
                  <td className="py-2 font-mono font-medium text-gray-800">SK-HP-001</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold">Success</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2"><XCircle className="w-3.5 h-3.5 text-red-500" /></td>
                  <td className="py-2 text-gray-500">02:20 PM</td>
                  <td className="py-2 font-mono font-medium text-gray-800">SK-MS-007</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold">Invalid Scan</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /></td>
                  <td className="py-2 text-gray-500">02:18 PM</td>
                  <td className="py-2 font-mono font-medium text-gray-800">SK-BG-021</td>
                  <td className="py-2 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold">Success</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/packer/current"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Task
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Ready to scan next item barcode.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Barcode className="w-3.5 h-3.5 text-gray-500" />
              Scan Next Item
            </button>
            <button
              onClick={() => alert("Change packaging modal opened.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Boxes className="w-3.5 h-3.5 text-gray-500" />
              Change Packaging
            </button>
            <button
              onClick={() => alert("Label printed.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              Print Label
            </button>
            <Link
              href="/warehouse/worker/packer/handoff"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Confirm Pack &amp; Continue
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
