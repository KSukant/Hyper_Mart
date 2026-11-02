"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Barcode,
  Boxes,
  Package,
  Clock,
  ArrowLeft,
  Scan,
  FileText,
  AlertTriangle,
  ArrowRight,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerScanResultPage() {
  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      pageNumber={53}
      currentStep={4}
      title="Scan Result"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Scan Result</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View the scan details and quality verification result for the package.
          </p>
        </div>

        {/* Top Banner matching page_53.png */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 tracking-tight">Package Scanned Successfully</h2>
              <p className="text-xs text-gray-600 mt-0.5">
                The package details are fetched and ready for quality check.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-green-200">
              <Barcode className="w-5 h-5 text-green-700" />
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Scan ID</span>
                <span className="font-mono font-bold text-xs text-gray-900">SCN-20261029-4417</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-green-200">
              <Boxes className="w-5 h-5 text-green-700" />
              <div>
                <span className="text-[10px] text-gray-400 block font-medium">Result</span>
                <span className="font-bold text-xs text-green-800">Ready for Quality Check</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Package / Order Details + Scan Summary + Quality Check Progress (3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Package / Order Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-4">
            <div className="relative w-24 h-24 bg-amber-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-amber-100">
              <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-1" unoptimized />
            </div>
            <div className="space-y-1 text-xs text-gray-600 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Boxes className="w-3.5 h-3.5 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Package / Order Details</h3>
              </div>
              <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
              <p>Package ID : <strong className="font-mono text-gray-900">PKG-2741</strong></p>
              <p>Items : <strong className="text-gray-900">8 Items (8 Units)</strong></p>
              <p>Check Type : <strong className="text-gray-900">Full Check</strong></p>
              <p>Station : <strong className="font-mono text-gray-900">QC-01</strong></p>
              <p>Priority : <span className="px-1.5 py-0.2 rounded bg-red-50 text-red-600 font-bold text-[10px]">High</span></p>
            </div>
          </div>

          {/* Card 2: Scan Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-1.5 mb-1">
              <Barcode className="w-3.5 h-3.5 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Scan Summary</h3>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Package Scanned</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">Yes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Order Matched</span>
                <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">Yes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Items Count Matched</span>
                <span className="font-bold text-gray-900">8 / 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Packaging Identified</span>
                <span className="font-medium text-gray-900">Medium Box</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-gray-400" /> Previous QC</span>
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium text-[10px]">Not Checked</span>
              </div>
            </div>
          </div>

          {/* Card 3: Quality Check Progress + Next Step */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Quality Check Progress</h3>
              </div>
              <div className="flex items-center justify-between px-2 pt-1 mb-4">
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span className="text-[9px] font-bold text-gray-800 mt-0.5">Scan</span>
                </div>
                <div className="flex-1 h-0.5 bg-green-600 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  </span>
                  <span className="text-[9px] font-bold text-green-700 mt-0.5">Inspect</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[9px] text-gray-400 mt-0.5">Verify Label</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[9px] text-gray-400 mt-0.5">Complete</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50/70 border border-green-200 rounded-xl p-3 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-green-900">Next: Inspect Package</h4>
                <p className="text-[10px] text-green-700 mt-0.5">Check items, packaging and labels for quality.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Items in Package (8) + Package Verification & Images + Scan History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Card 1: Items in Package (8) (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-green-700" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Items in Package (8)</h3>
              </div>
              <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All Items (8)</span>
            </div>

            <table className="w-full text-[10px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-medium">
                  <th className="pb-1">#</th>
                  <th className="pb-1">SKU / Item</th>
                  <th className="pb-1 text-center">Ordered</th>
                  <th className="pb-1 text-center">Scanned</th>
                  <th className="pb-1">Condition</th>
                  <th className="pb-1 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-1.5 font-bold">1</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[9px] block">SK-BT-014</span>
                      <span className="text-gray-500 block truncate max-w-[80px]">Steel Water Bottle</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold">3</td>
                  <td className="py-1.5 text-center font-bold">3</td>
                  <td className="py-1.5 text-green-700 font-medium">Good</td>
                  <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Pass ✓</span></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold">2</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/headphones.png" alt="Headphones" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[9px] block">SK-HP-001</span>
                      <span className="text-gray-500 block truncate max-w-[80px]">Wireless Headphones</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold">2</td>
                  <td className="py-1.5 text-center font-bold">2</td>
                  <td className="py-1.5 text-green-700 font-medium">Good</td>
                  <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Pass ✓</span></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold">3</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/mouse.png" alt="Mouse" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[9px] block">SK-MS-007</span>
                      <span className="text-gray-500 block truncate max-w-[80px]">Wireless Mouse</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-green-700 font-medium">Good</td>
                  <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Pass ✓</span></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold">4</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/backpack.png" alt="Backpack" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[9px] block">SK-BG-021</span>
                      <span className="text-gray-500 block truncate max-w-[80px]">Laptop Backpack</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-green-700 font-medium">Good</td>
                  <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Pass ✓</span></td>
                </tr>

                <tr>
                  <td className="py-1.5 font-bold">5</td>
                  <td className="py-1.5 flex items-center gap-1.5">
                    <div className="relative w-5 h-5 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src="/warehouse/items/cable.png" alt="Cable" fill className="object-contain" unoptimized />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-gray-800 text-[9px] block">SK-CB-009</span>
                      <span className="text-gray-500 block truncate max-w-[80px]">USB-C Cable (1 m)</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-center font-bold">1</td>
                  <td className="py-1.5 text-green-700 font-medium">Good</td>
                  <td className="py-1.5 text-right"><span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Pass ✓</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 2: Package Verification & Images (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-3">
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <h4 className="text-xs font-bold text-gray-900 tracking-tight">Package Verification</h4>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span> Package integrity (no damage)</span>
                  <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span> Seal condition (intact)</span>
                  <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Pass</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span> Dimensions (40 × 30 × 20 cm)</span>
                  <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Match</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><span className="text-green-600 font-bold">✓</span> Weight (4.20 kg)</span>
                  <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[10px]">Match</span>
                </div>
              </div>
            </div>

            {/* Package Images */}
            <div className="pt-2 border-t border-gray-100">
              <h5 className="text-[11px] font-bold text-gray-800 mb-1.5">Package Images</h5>
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-12 rounded-lg border border-gray-200 overflow-hidden">
                  <Image src="/warehouse/items/cardboard-box.png" alt="Box" fill className="object-contain p-0.5" unoptimized />
                </div>
                <div className="relative w-14 h-12 rounded-lg border border-gray-200 overflow-hidden">
                  <Image src="/warehouse/items/shelf-bin.png" alt="Bin" fill className="object-cover" unoptimized />
                </div>
                <div className="relative w-14 h-12 rounded-lg border border-gray-200 overflow-hidden">
                  <Image src="/warehouse/items/damaged-box.png" alt="Box" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Scan History (Recent) (3 cols) */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-green-700" />
                <h4 className="text-xs font-bold text-gray-900 tracking-tight">Scan History (Recent)</h4>
              </div>
              <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="p-1.5 rounded-lg bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="font-mono font-bold text-gray-800">SCN-4417</span>
                </div>
                <span className="font-mono text-gray-600">PKG-2741</span>
                <span className="text-gray-400">03:28 PM</span>
              </div>

              <div className="p-1.5 rounded-lg bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="font-mono font-bold text-gray-800">SCN-4416</span>
                </div>
                <span className="font-mono text-gray-600">PKG-2739</span>
                <span className="text-gray-400">03:16 PM</span>
              </div>

              <div className="p-1.5 rounded-lg bg-red-50/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-3 h-3 text-red-500" />
                  <span className="font-mono font-bold text-gray-800">SCN-4415</span>
                </div>
                <span className="text-red-600 font-bold">Invalid</span>
                <span className="text-gray-400">03:10 PM</span>
              </div>

              <div className="p-1.5 rounded-lg bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="font-mono font-bold text-gray-800">SCN-4414</span>
                </div>
                <span className="font-mono text-gray-600">PKG-2738</span>
                <span className="text-gray-400">02:57 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/warehouse/worker/quality-checker/current"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Current Task
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Retaking scan...")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <Scan className="w-3.5 h-3.5 text-gray-500" />
              Retake Scan
            </button>
            <button
              onClick={() => alert("Viewing master order document.")}
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-gray-500" />
              View Order
            </button>
            <Link
              href="/warehouse/worker/quality-checker/issue-report"
              className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Report Issue
            </Link>
            <Link
              href="/warehouse/worker/quality-checker/handoff"
              className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              Continue to Inspect
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
