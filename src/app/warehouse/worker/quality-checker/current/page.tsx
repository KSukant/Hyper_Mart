"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Package,
  Boxes,
  Camera,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Check,
  Plus,
  X,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerCurrentTaskPage() {
  const [remarks, setRemarks] = useState("");
  const [qcStatus, setQcStatus] = useState({
    itemCondition: "Pass",
    quantity: "Pass",
    sku: "Pass",
    packaging: "Pass",
    shippingLabel: "Pending",
  });

  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      pageNumber={52}
      currentStep={3}
      title="Current Task"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Current Task</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Perform quality check, verify items, packaging and labels for the assigned order.
          </p>
        </div>

        {/* Top Banner matching page_52.png */}
        <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 tracking-tight">Quality Check in Progress</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Inspect all items, packaging and labels. Mark the result and complete the check.
              </p>
            </div>
          </div>

          {/* Stepper on right */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold mr-2">Task Progress</span>
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                <span className="text-[9px] font-bold text-gray-700 mt-0.5">Inspect Items</span>
              </div>
              <div className="w-8 h-0.5 bg-green-600 mx-1 -mt-3" />
              <div className="flex flex-col items-center">
                <span className="w-5 h-5 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                </span>
                <span className="text-[9px] font-bold text-green-700 mt-0.5">Check Package</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200 mx-1 -mt-3" />
              <div className="flex flex-col items-center">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                <span className="text-[9px] text-gray-400 mt-0.5">Verify Label</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200 mx-1 -mt-3" />
              <div className="flex flex-col items-center">
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                <span className="text-[9px] text-gray-400 mt-0.5">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Order Details + Package Information + QC Checklist (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Order Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
            <div className="relative w-24 h-24 bg-amber-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
              <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
            </div>
            <div className="space-y-1 text-xs text-gray-600 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Boxes className="w-3.5 h-3.5 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Order Details</h3>
              </div>
              <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
              <p>Items : <strong className="text-gray-900">8 Items (8 Units)</strong></p>
              <p>Check Type : <strong className="text-gray-900">Full Check</strong></p>
              <p>Station : <strong className="font-mono text-gray-900">QC-01</strong></p>
              <p>Priority : <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span></p>
            </div>
          </div>

          {/* Card 2: Package Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 mb-2">
              <Package className="w-3.5 h-3.5 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Package Information</h3>
            </div>
            <p>Package ID : <strong className="font-mono text-gray-900">PKG-2741</strong></p>
            <p>Packaging : <strong className="text-gray-900">Medium Box</strong></p>
            <p>Dimensions : <strong className="text-gray-900">40 × 30 × 20 cm</strong></p>
            <p>Weight : <strong className="text-gray-900">4.20 kg</strong></p>
            <p className="flex items-center gap-2">
              Seal Status : <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Sealed</span>
            </p>
          </div>

          {/* Card 3: QC Checklist */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">QC Checklist</h3>
            </div>
            <div className="space-y-1.5 text-[11px] text-gray-700">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Item condition (no damage)</span>
                <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Quantity verification (match with order)</span>
                <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Correct SKU and product variant</span>
                <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Packaging quality (sealed &amp; intact)</span>
                <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-yellow-600" /> Shipping label (correct &amp; readable)</span>
                <span className="px-1.5 py-0.2 rounded bg-yellow-50 text-yellow-700 font-bold text-[10px]">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Items to Inspect (8) + Right Package Images & Remarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Items to Inspect (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Items to Inspect (8)</h3>
              </div>
              <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All Items (8)</span>
            </div>

            <table className="w-full text-[11px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                  <th className="pb-2">#</th>
                  <th className="pb-2">SKU / Item</th>
                  <th className="pb-2 text-center">Ordered</th>
                  <th className="pb-2 text-center">Checked</th>
                  <th className="pb-2">Condition</th>
                  <th className="pb-2 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="py-2 font-bold text-gray-700">1</td>
                  <td className="py-2 flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BT-014</span>
                      <span className="text-gray-600 text-[11px] block">Steel Water Bottle (750 ml)</span>
                    </div>
                  </td>
                  <td className="py-2 text-center font-bold">3</td>
                  <td className="py-2 text-center font-bold">3</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-medium text-[10px]">Good</span></td>
                  <td className="py-2 text-right"><span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Pass ✓</span></td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2 font-bold text-gray-700">2</td>
                  <td className="py-2 flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-HP-001</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Headphones</span>
                    </div>
                  </td>
                  <td className="py-2 text-center font-bold">2</td>
                  <td className="py-2 text-center font-bold">2</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-medium text-[10px]">Good</span></td>
                  <td className="py-2 text-right"><span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Pass ✓</span></td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2 font-bold text-gray-700">3</td>
                  <td className="py-2 flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-MS-007</span>
                      <span className="text-gray-600 text-[11px] block">Wireless Mouse</span>
                    </div>
                  </td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-medium text-[10px]">Good</span></td>
                  <td className="py-2 text-right"><span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Pass ✓</span></td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2 font-bold text-gray-700">4</td>
                  <td className="py-2 flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/backpack.png" alt="Backpack" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-BG-021</span>
                      <span className="text-gray-600 text-[11px] block">Laptop Backpack</span>
                    </div>
                  </td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-medium text-[10px]">Good</span></td>
                  <td className="py-2 text-right"><span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Pass ✓</span></td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-2 font-bold text-gray-700">5</td>
                  <td className="py-2 flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[10px] block">SK-CB-009</span>
                      <span className="text-gray-600 text-[11px] block">USB-C Cable (1 m)</span>
                    </div>
                  </td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2 text-center font-bold">1</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-medium text-[10px]">Good</span></td>
                  <td className="py-2 text-right"><span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-bold text-[10px]">Pass ✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Package Images + Remarks (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Package Images */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Package Images</h3>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden group">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[9px] flex items-center justify-center cursor-pointer">×</span>
                </div>
                <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden group">
                  <Image src="/warehouse/items/shelf-bin.png" alt="Bin" fill className="object-cover" unoptimized />
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[9px] flex items-center justify-center cursor-pointer">×</span>
                </div>
                <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden group">
                  <Image src="/warehouse/items/damaged-box.png" alt="Box" fill className="object-cover" unoptimized />
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[9px] flex items-center justify-center cursor-pointer">×</span>
                </div>
                <div
                  onClick={() => alert("Upload package image modal opened.")}
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                  <span className="text-[9px] font-bold text-gray-600 mt-0.5">Add Image</span>
                </div>
              </div>
            </div>

            {/* Inspection Remarks (Optional) */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Inspection Remarks (Optional)</h3>
                <span className="text-[10px] text-gray-400 font-mono">{remarks.length} / 300</span>
              </div>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                maxLength={300}
                placeholder="Enter any observations (e.g., minor dent on outer box, re-packed, etc.)"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/quality-checker/tasks"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Queue
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Camera activated for retake.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-gray-500" />
              Retake Image
            </button>
            <Link
              href="/warehouse/worker/quality-checker/issue-report"
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Report Issue
            </Link>
            <Link
              href="/warehouse/worker/quality-checker/scan-result"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Check className="w-4 h-4" />
              Complete Quality Check
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
