"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  ArrowLeft,
  Printer,
  Tag,
  Save,
  Check,
  Plus,
  X,
  FileCheck,
  Truck,
  ClipboardCheck,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerHandoffPage() {
  const [handoffTeam, setHandoffTeam] = useState("Dispatch Team A");
  const [toteId, setToteId] = useState("TOTE-20261029-07");
  const [outboundLocation, setOutboundLocation] = useState("Dispatch Bay - 01");
  const [remarks, setRemarks] = useState(
    "All items verified. Packaging, seal and label are correct. Approved for dispatch."
  );

  const [evidenceImages, setEvidenceImages] = useState([
    "/warehouse/items/cardboard-box.png",
    "/warehouse/items/bubble-wrap-box.png",
    "/warehouse/items/box-label.png",
  ]);

  const removeEvidence = (idx: number) => {
    setEvidenceImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      roleTitle="Completion & Handoff"
      currentStepIndex={5}
      pageNumber={55}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Completion & Handoff</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            Complete the quality check, approve the package and handoff for dispatch.
          </p>
        </div>

        {/* Top Green Completion Banner */}
        <div className="bg-[#EAF7EF] border border-[#86EFAC] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#087A4A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">
                Quality Check Completed Successfully
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                The package has passed all quality checks and is approved for dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-gray-500 block text-[10px]">Order ID</span>
                <span className="font-bold text-gray-900 font-mono">ORD-20261029-0841</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <div>
                <span className="text-gray-500 block text-[10px]">Package ID</span>
                <span className="font-bold text-gray-900 font-mono">PKG-2741</span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-[#087A4A] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Approved for Dispatch
            </div>
          </div>
        </div>

        {/* Row 1: Order Summary, Package Details, Quality Check Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Order Summary</h3>
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
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold text-gray-900 font-mono">ORD-20261029-0841</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Package ID:</span>
                  <span className="font-bold text-gray-900 font-mono">PKG-2741</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Items:</span>
                  <span className="font-bold text-gray-900">8 Items (8 Units)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check Type:</span>
                  <span className="font-bold text-gray-900">Full Check</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Station:</span>
                  <span className="font-bold text-gray-900">QC-01</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500">Final Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    QC Passed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Package Details</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Packaging:</span>
                <span className="font-bold text-gray-900">Medium Box</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Dimensions:</span>
                <span className="font-bold text-gray-900">40 × 30 × 20 cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Weight:</span>
                <span className="font-bold text-gray-900">4.20 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Seal Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Sealed (Verified)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Package Integrity:</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  Intact
                </span>
              </div>
            </div>
          </div>

          {/* Quality Check Workflow */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Quality Check Workflow</h3>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between text-xs font-semibold px-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span className="text-[10px] text-gray-700">Scan</span>
              </div>
              <div className="flex-1 h-0.5 bg-emerald-600 mx-1" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span className="text-[10px] text-gray-700">Inspect</span>
              </div>
              <div className="flex-1 h-0.5 bg-emerald-600 mx-1" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span className="text-[10px] text-gray-700">Verify Label</span>
              </div>
              <div className="flex-1 h-0.5 bg-emerald-600 mx-1" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full border-2 border-emerald-600 bg-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800">Complete</span>
              </div>
            </div>

            {/* Completed badge */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Quality Check Completed</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  All checks are passed and the package is ready for handoff.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Item Verification, QC Completion Checklist, Package Evidence & Remarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Item Verification (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Item Verification (8 Items)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="pb-2 font-semibold">#</th>
                    <th className="pb-2 font-semibold">SKU / Item</th>
                    <th className="pb-2 font-semibold text-center">Ordered</th>
                    <th className="pb-2 font-semibold text-center">Checked</th>
                    <th className="pb-2 font-semibold text-center">Condition</th>
                    <th className="pb-2 font-semibold text-center">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      num: 1,
                      sku: "SK-BT-014",
                      name: "Steel Water Bottle (750 ml)",
                      ordered: 3,
                      checked: 3,
                      img: "/warehouse/items/red-bottle.png",
                    },
                    {
                      num: 2,
                      sku: "SK-HP-001",
                      name: "Wireless Headphones",
                      ordered: 2,
                      checked: 2,
                      img: "/warehouse/items/headphones.png",
                    },
                    {
                      num: 3,
                      sku: "SK-MS-007",
                      name: "Wireless Mouse",
                      ordered: 1,
                      checked: 1,
                      img: "/warehouse/items/mouse.png",
                    },
                    {
                      num: 4,
                      sku: "SK-BG-021",
                      name: "Laptop Backpack",
                      ordered: 1,
                      checked: 1,
                      img: "/warehouse/items/backpack.png",
                    },
                    {
                      num: 5,
                      sku: "SK-CB-009",
                      name: "USB-C Cable (1 m)",
                      ordered: 1,
                      checked: 1,
                      img: "/warehouse/items/cable.png",
                    },
                  ].map((row) => (
                    <tr key={row.num}>
                      <td className="py-2.5 font-bold text-gray-700">{row.num}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden relative flex-shrink-0">
                            <Image
                              src={row.img}
                              alt={row.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block leading-tight font-mono text-[11px]">
                              {row.sku}
                            </span>
                            <span className="text-[10px] text-gray-500 block leading-tight truncate max-w-[130px]">
                              {row.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-center font-bold text-gray-800">{row.ordered}</td>
                      <td className="py-2.5 text-center font-bold text-gray-800">{row.checked}</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Good
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Pass ✓
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="w-full py-1.5 text-center text-xs font-bold text-emerald-700 hover:text-emerald-800">
              ∨ View All Items (8)
            </button>
          </div>

          {/* QC Completion Checklist (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">QC Completion Checklist</h3>
            </div>

            <div className="space-y-2.5 text-xs font-medium text-gray-800">
              {[
                "All items inspected and in good condition",
                "Quantity matches with the order",
                "Correct SKU and product variant",
                "Packaging quality (sealed & intact)",
                "Shipping label verified (correct & readable)",
                "No open issues / discrepancies",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-md bg-[#087A4A] text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px] leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Evidence & Remarks (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Package Evidence */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Package Evidence</h3>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {evidenceImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-16 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-2xs"
                  >
                    <Image src={src} alt="Evidence" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeEvidence(i)}
                      className="w-4 h-4 rounded-full bg-black/75 text-white flex items-center justify-center absolute top-1 right-1 text-[9px]"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="h-16 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 flex flex-col items-center justify-center text-center p-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span className="text-[10px] font-bold text-emerald-800 leading-tight">
                    Add Image
                  </span>
                </button>
              </div>
            </div>

            {/* QC Remarks */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">QC Remarks (Optional)</h3>
              </div>

              <div className="relative">
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  maxLength={300}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
                />
                <span className="absolute right-2.5 bottom-1.5 text-[10px] text-gray-400 font-medium">
                  {remarks.length} / 300
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Handoff to Dispatch, Handoff Checklist, QC Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Handoff to Dispatch */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Handoff to Dispatch</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-800">
                  Handoff To <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={handoffTeam}
                    onChange={(e) => setHandoffTeam(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Dispatch Team A</option>
                    <option>Dispatch Team B</option>
                    <option>Staging Dock 3</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-800">Tote/Batch ID</label>
                <input
                  type="text"
                  value={toteId}
                  onChange={(e) => setToteId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-800">Outbound Location</label>
                <div className="relative">
                  <select
                    value={outboundLocation}
                    onChange={(e) => setOutboundLocation(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Dispatch Bay - 01</option>
                    <option>Dispatch Bay - 02</option>
                    <option>Outbound Staging</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Handoff Checklist */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">Handoff Checklist</h3>
            </div>

            <div className="space-y-2.5 text-xs font-medium text-gray-800">
              {[
                "QC completed and approved",
                "Package labeled and sealed",
                "Handoff logged to dispatch",
                "Tote/Batch updated",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-md bg-[#087A4A] text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-[11px] leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QC Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-gray-900">QC Summary</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Items Checked:</span>
                <span className="font-bold text-gray-900">8 / 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Issues Found:</span>
                <span className="font-bold text-gray-900">0</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-gray-500">Final Result:</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                  Passed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/warehouse/worker/quality-checker/current"
            className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Current Task
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              Print QC Report
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Tag className="w-3.5 h-3.5 text-gray-500" />
              Print Handoff Label
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <Save className="w-3.5 h-3.5 text-gray-500" />
              Save Report
            </button>
            <Link
              href="/warehouse/worker/inventory-officer"
              className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              Confirm Handoff & Complete
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
