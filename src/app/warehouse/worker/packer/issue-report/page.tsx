"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Boxes,
  Package,
  Barcode,
  ArrowLeftRight,
  MinusCircle,
  HelpCircle,
  Send,
  X,
  UploadCloud,
  ArrowLeft,
  Check,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function PackerIssueReportPage() {
  const [associateWith, setAssociateWith] = useState<"sku" | "order" | "task">("sku");
  const [issueType, setIssueType] = useState("Damaged Item");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("high");
  const [description, setDescription] = useState("");

  return (
    <WarehouseWorkerShell
      role="PACKER"
      workerName="Sukant K."
      pageNumber={48}
      currentStep={5}
      title="Issue Report"
    >
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Issue Report</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Report packing issues for items, packaging or orders.
          </p>
        </div>

        {/* Top Warning Banner matching page_48.png */}
        <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-xl p-4 flex items-center gap-3.5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-700 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">Report a Packing Issue</h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Log any item, packaging or labeling issue for quick resolution.
            </p>
          </div>
        </div>

        {/* 3-Column Layout matching page_48.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (5 cols): Issue Details Form */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-4 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100">
              <Boxes className="w-4 h-4 text-green-700" />
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Issue Details</h3>
            </div>

            {/* Associate With * */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Associate With *</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAssociateWith("sku")}
                  className={`p-2 rounded-xl border text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    associateWith === "sku"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                  Item (SKU)
                </button>
                <button
                  type="button"
                  onClick={() => setAssociateWith("order")}
                  className={`p-2 rounded-xl border text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    associateWith === "order"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-300" />
                  Order
                </button>
                <button
                  type="button"
                  onClick={() => setAssociateWith("task")}
                  className={`p-2 rounded-xl border text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    associateWith === "task"
                      ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-300" />
                  Task
                </button>
              </div>
            </div>

            {/* Issue Type * */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Issue Type *</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[
                  { label: "Damaged Item", icon: Package },
                  { label: "Wrong Item", icon: ArrowLeftRight },
                  { label: "Missing Item", icon: HelpCircle },
                  { label: "Short Quantity", icon: MinusCircle },
                  { label: "Barcode Issue", icon: Barcode },
                  { label: "Other", icon: AlertTriangle },
                ].map((t) => {
                  const isSelected = issueType === t.label;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setIssueType(t.label)}
                      className={`p-2 rounded-xl border flex items-center justify-between text-[11px] transition ${
                        isSelected
                          ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate">{t.label}</span>
                      {isSelected ? (
                        <span className="w-3.5 h-3.5 rounded-full bg-green-600 text-white text-[8px] flex items-center justify-center">✓</span>
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-gray-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Priority * */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Priority *</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPriority("high")}
                  className={`p-2 rounded-xl border text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    priority === "high"
                      ? "border-red-500 bg-red-50 text-red-600 ring-1 ring-red-500"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  High
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("medium")}
                  className={`p-2 rounded-xl border text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    priority === "medium"
                      ? "border-yellow-500 bg-yellow-50 text-yellow-700 ring-1 ring-yellow-500"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority("low")}
                  className={`p-2 rounded-xl border text-center text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    priority === "low"
                      ? "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Low
                </button>
              </div>
            </div>

            {/* Description * */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-700">Description *</label>
                <span className="text-[10px] text-gray-400 font-mono">{description.length} / 500</span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                placeholder="Describe the issue in detail (e.g., item is damaged, seal broken, etc.)"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
              />
            </div>

            {/* Add Evidence (Optional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700">Add Evidence (Optional)</label>
              <div className="flex items-center gap-2">
                <div className="border border-dashed border-gray-300 rounded-xl p-2.5 text-center flex-1 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <UploadCloud className="w-4 h-4 text-green-600" />
                  <span className="text-[9px] text-gray-600 font-medium mt-0.5">Drag and drop images or click to upload</span>
                  <span className="text-[8px] text-gray-400">PNG, JPG, JPEG (Max 5 MB each, up to 3 files)</span>
                </div>
                <div className="relative w-12 h-12 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                  <Image src="/warehouse/items/damaged-box.png" alt="Damaged Box" fill className="object-cover" unoptimized />
                </div>
                <div className="relative w-12 h-12 rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                  <Image src="/warehouse/items/shelf-bin.png" alt="Shelf" fill className="object-cover" unoptimized />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column (3.5 cols): Item / Order Information + Task Progress + Impact */}
          <div className="lg:col-span-3.5 space-y-4">
            {/* Item / Order Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xs flex items-center gap-3">
              <div className="relative w-20 h-24 bg-[#FFFBF0] rounded-xl flex items-center justify-center p-1 border border-amber-100 flex-shrink-0">
                <Image src="/warehouse/items/red-bottle.png" alt="Bottle" fill className="object-contain p-1" unoptimized />
              </div>
              <div className="space-y-1 text-xs text-gray-600 flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Boxes className="w-3.5 h-3.5 text-green-700" />
                  <h4 className="text-xs font-bold text-gray-900 tracking-tight">Item / Order Info</h4>
                </div>
                <p>SKU : <strong className="font-mono text-gray-900">SK-BT-014</strong></p>
                <p className="truncate">Item : <strong className="text-gray-900">Steel Water Bottle (750 ml)</strong></p>
                <p>Order ID : <strong className="font-mono text-gray-900">ORD-20261029-0841</strong></p>
                <p>Task ID : <strong className="font-mono text-gray-900">T-7841</strong></p>
                <p>Station : <strong className="font-mono text-gray-900">PK-01</strong></p>
                <p>Packaging : <strong className="text-gray-900">Medium Box</strong></p>
              </div>
            </div>

            {/* Task Progress Stepper */}
            <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs">
              <h4 className="text-xs font-bold text-gray-900 tracking-tight mb-2">Task Progress</h4>
              <div className="flex items-center justify-between px-1">
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span className="text-[9px] font-bold text-gray-800 mt-0.5">Verify</span>
                </div>
                <div className="flex-1 h-0.5 bg-green-600 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-green-600 bg-white flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                  </span>
                  <span className="text-[9px] font-bold text-green-700 mt-0.5">Pack</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[9px] text-gray-400 mt-0.5">Label</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1 -mt-3" />
                <div className="flex flex-col items-center">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                  <span className="text-[9px] text-gray-400 mt-0.5">Handoff</span>
                </div>
              </div>
            </div>

            {/* Impact Box */}
            <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-red-700">Impact</h5>
                <p className="text-[10px] text-red-600 mt-0.5 leading-relaxed">
                  This issue will be flagged for review and may affect the order's packing timeline.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (3.5 cols): Recent Issues */}
          <div className="lg:col-span-3.5 bg-white border border-gray-200 rounded-xl p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 tracking-tight">Recent Issues</h3>
              <span className="text-[10px] font-semibold text-green-700 cursor-pointer">View All →</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-gray-900 text-[11px]">ORD-20261029-0838</span>
                  <span className="px-2 py-0.2 rounded bg-yellow-50 text-yellow-700 font-bold text-[9px]">In Review</span>
                </div>
                <p className="text-gray-600 text-[10px]">SK-BG-021 &nbsp; Damaged Item</p>
                <span className="text-[9px] text-gray-400 block">Today, 02:18 PM</span>
              </div>

              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-gray-900 text-[11px]">ORD-20261029-0834</span>
                  <span className="px-2 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Resolved</span>
                </div>
                <p className="text-gray-600 text-[10px]">SK-MS-007 &nbsp; Short Quantity</p>
                <span className="text-[9px] text-gray-400 block">Today, 12:32 PM</span>
              </div>

              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-gray-900 text-[11px]">ORD-20261029-0831</span>
                  <span className="px-2 py-0.2 rounded bg-blue-50 text-blue-700 font-bold text-[9px]">In Progress</span>
                </div>
                <p className="text-gray-600 text-[10px]">SK-HP-001 &nbsp; Barcode Issue</p>
                <span className="text-[9px] text-gray-400 block">Today, 11:10 AM</span>
              </div>

              <div className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-gray-900 text-[11px]">ORD-20261029-0829</span>
                  <span className="px-2 py-0.2 rounded bg-green-50 text-green-700 font-bold text-[9px]">Resolved</span>
                </div>
                <p className="text-gray-600 text-[10px]">SK-BT-014 &nbsp; Wrong Item</p>
                <span className="text-[9px] text-gray-400 block">Today, 10:26 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
          <Link
            href="/warehouse/worker/packer/current"
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gray-500" />
            Back to Task
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDescription("")}
              className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 transition"
            >
              Clear
            </button>
            <button
              onClick={() => {
                alert("Packing issue submitted to supervisor.");
                window.location.href = "/warehouse/worker/packer/current";
              }}
              className="px-5 py-2 bg-[#033129] hover:bg-[#05463b] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Issue
            </button>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
