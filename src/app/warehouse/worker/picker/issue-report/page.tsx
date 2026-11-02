"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Package,
  ShoppingCart,
  Barcode,
  UploadCloud,
  X,
  Send,
  Flag,
  CheckCircle2,
  MinusCircle,
  ArrowLeftRight,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PickerIssueReportPage() {
  const [relatedTo, setRelatedTo] = useState<"task" | "order" | "sku">("task");
  const [issueType, setIssueType] = useState("Damaged Item");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("high");
  const [description, setDescription] = useState(
    "Item received is damaged (dent on body) and not fit for packing."
  );

  return (
    <WarehouseWorkerShell
      role="PICKER"
      workerName="Sukant K."
      pageNumber={42}
      currentStep={5}
      title="Issue Report"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Issue Report</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Report any issues during picking, packing, or handling to get quick resolution.
          </p>
        </div>

        {/* 2-Column Layout matching page_42.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Form: Report an Issue (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-bold text-gray-900 tracking-tight">Report an Issue</h2>
            </div>

            {/* Related To * */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700">Related To *</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRelatedTo("task")}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                    relatedTo === "task"
                      ? "border-green-600 bg-green-50/40 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] font-bold block truncate">Current Task</span>
                    <span className="text-[9px] text-gray-500 font-mono">(T-7841)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRelatedTo("order")}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                    relatedTo === "order"
                      ? "border-green-600 bg-green-50/40 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] font-bold block truncate">Order</span>
                    <span className="text-[9px] text-gray-500 font-mono truncate">(ORD-20261029-0841)</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRelatedTo("sku")}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                    relatedTo === "sku"
                      ? "border-green-600 bg-green-50/40 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Barcode className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] font-bold block truncate">Item / SKU</span>
                    <span className="text-[9px] text-gray-500 font-mono truncate">(SK-BT-014)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Issue Type * */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700">Issue Type *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: "Damaged Item", icon: Package },
                  { label: "Wrong Item", icon: ArrowLeftRight },
                  { label: "Short Quantity", icon: MinusCircle },
                  { label: "Missing Item", icon: Package },
                  { label: "Barcode Issue", icon: Barcode },
                  { label: "Other", icon: AlertTriangle },
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = issueType === type.label;
                  return (
                    <button
                      key={type.label}
                      type="button"
                      onClick={() => setIssueType(type.label)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                        isSelected
                          ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-green-700" : "text-gray-500"}`} />
                        <span className="truncate">{type.label}</span>
                      </div>
                      {isSelected && <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[9px] flex items-center justify-center">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description * */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-700">Description *</label>
                <span className="text-[10px] text-gray-400 font-mono">{description.length} / 250</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={250}
                className="w-full p-2.5 bg-gray-50 border border-green-600/40 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            {/* Add Proof (Optional) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700">Add Proof (Optional)</label>
              <div className="flex items-center gap-3">
                {/* Proof 1: Damaged carton */}
                <div className="relative w-20 h-16 rounded-xl border border-gray-200 overflow-hidden group">
                  <Image src="/warehouse/items/damaged-box.png" alt="Damaged Box" fill className="object-cover" unoptimized />
                  <button
                    onClick={() => alert("Photo removed.")}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Proof 2: Barcode label */}
                <div className="relative w-20 h-16 rounded-xl border border-gray-200 overflow-hidden group">
                  <Image src="/warehouse/items/shelf-bin.png" alt="Barcode label" fill className="object-cover" unoptimized />
                  <button
                    onClick={() => alert("Photo removed.")}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Upload box */}
                <button
                  onClick={() => alert("Attach camera photo dialog opened.")}
                  className="w-32 h-16 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-600 flex flex-col items-center justify-center text-center p-1 hover:bg-gray-50 transition"
                >
                  <UploadCloud className="w-4 h-4 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-700 mt-0.5">Add Photo</span>
                  <span className="text-[8px] text-gray-400">(JPG, PNG – Max 5 MB)</span>
                </button>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setDescription("")}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Issue reported to supervisor. Dispatching replacement unit.");
                  window.location.href = "/warehouse/worker/picker/current";
                }}
                className="px-5 py-2.5 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Issue
              </button>
            </div>
          </div>

          {/* Right Column: Task & Item Details + Priority + Recent Issues (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Task & Item Details Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
              <div className="space-y-1.5 text-xs flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <Package className="w-4 h-4 text-green-700" />
                  <h3 className="text-xs font-bold text-gray-900 tracking-tight">Task &amp; Item Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-gray-600">
                  <p>Task ID : <strong className="font-mono text-gray-900">T-7841</strong></p>
                  <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
                  <p>Item SKU : <strong className="font-mono text-gray-900">SK-BT-014</strong></p>
                  <p>Item : <strong className="text-gray-900 truncate">Steel Water Bottle (750 ml)</strong></p>
                  <p>Location (Bin) : <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-mono text-[10px]">A-12-03</span></p>
                  <p>Required Qty : <strong className="text-gray-900">3</strong></p>
                  <p>Picked Qty : <strong className="text-gray-900">1</strong></p>
                  <p>Remaining : <span className="px-1.5 py-0.2 rounded bg-pink-50 text-pink-700 font-bold text-[10px]">2</span></p>
                </div>
              </div>

              <div className="relative w-16 h-24 bg-[#FFFBF0] rounded-xl flex items-center justify-center p-1 border border-amber-100 flex-shrink-0 ml-3">
                <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain p-1" unoptimized />
              </div>
            </div>

            {/* Issue Priority */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Issue Priority</h3>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority("high")}
                  className={`p-2 rounded-xl border text-left transition ${
                    priority === "high"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" /> High
                    </span>
                    {priority === "high" && <span className="w-3.5 h-3.5 rounded-full bg-green-600 text-white text-[8px] flex items-center justify-center">✓</span>}
                  </div>
                  <span className="text-[9px] text-gray-500 block mt-0.5 leading-tight">Blocks task completion</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority("medium")}
                  className={`p-2 rounded-xl border text-left transition ${
                    priority === "medium"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                      <Flag className="w-3 h-3 text-amber-600" /> Medium
                    </span>
                    {priority === "medium" && <span className="w-3.5 h-3.5 rounded-full bg-green-600 text-white text-[8px] flex items-center justify-center">✓</span>}
                  </div>
                  <span className="text-[9px] text-gray-500 block mt-0.5 leading-tight">Can continue with caution</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPriority("low")}
                  className={`p-2 rounded-xl border text-left transition ${
                    priority === "low"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-green-700 flex items-center gap-1">
                      <Flag className="w-3 h-3 text-green-700" /> Low
                    </span>
                    {priority === "low" && <span className="w-3.5 h-3.5 rounded-full bg-green-600 text-white text-[8px] flex items-center justify-center">✓</span>}
                  </div>
                  <span className="text-[9px] text-gray-500 block mt-0.5 leading-tight">Non-critical issue</span>
                </button>
              </div>
            </div>

            {/* Recent Issues (This Shift) */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-900 tracking-tight">Recent Issues (This Shift)</h3>
                <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
              </div>

              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 font-medium">
                    <th className="pb-1.5">Issue ID</th>
                    <th className="pb-1.5">Task / Order</th>
                    <th className="pb-1.5">Type</th>
                    <th className="pb-1.5">Status</th>
                    <th className="pb-1.5 text-right">Reported At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-2 font-mono font-semibold text-gray-800">ISS-1043</td>
                    <td className="py-2 font-mono text-gray-600">T-7836</td>
                    <td className="py-2 text-gray-700 flex items-center gap-1">
                      <MinusCircle className="w-3 h-3 text-amber-600" /> Short Quantity
                    </td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 font-bold">In Review</span>
                    </td>
                    <td className="py-2 text-right text-gray-500">03:18 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono font-semibold text-gray-800">ISS-1042</td>
                    <td className="py-2 font-mono text-gray-600">T-7835</td>
                    <td className="py-2 text-gray-700 flex items-center gap-1">
                      <ArrowLeftRight className="w-3 h-3 text-red-500" /> Wrong Item
                    </td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Resolved</span>
                    </td>
                    <td className="py-2 text-right text-gray-500">02:47 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono font-semibold text-gray-800">ISS-1041</td>
                    <td className="py-2 font-mono text-gray-600">ORD-20261029-0838</td>
                    <td className="py-2 text-gray-700 flex items-center gap-1">
                      <Barcode className="w-3 h-3 text-purple-600" /> Barcode Issue
                    </td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.2 rounded bg-green-50 text-green-700 font-bold">Resolved</span>
                    </td>
                    <td className="py-2 text-right text-gray-500">02:10 PM</td>
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
