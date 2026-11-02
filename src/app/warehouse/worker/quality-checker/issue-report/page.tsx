"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowLeft,
  Search,
  ChevronDown,
  Trash2,
  Save,
  Send,
  Plus,
  X,
  Check,
  CheckCircle2,
  Package,
  Layers,
  FileText,
  Wine,
  ArrowLeftRight,
  HelpCircle,
  Hash,
  MapPin,
  Clock,
  ArrowRight,
  Eye,
} from "lucide-react";
import { WarehouseWorkerShell } from "@/components/warehouse/WarehouseWorkerShell";

export default function QualityCheckerIssueReportPage() {
  const [issueFor, setIssueFor] = useState<"Order" | "Item" | "Package" | "Task">("Order");
  const [orderId, setOrderId] = useState("ORD-20261029-0841");
  const [packageId, setPackageId] = useState("PKG-2741");
  const [itemSku, setItemSku] = useState("SK-BT-014 - Steel Water Bottle (750 ml)");
  const [issueType, setIssueType] = useState<string>("Damaged Item");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [description, setDescription] = useState(
    "The water bottle has a dent on the side and scratches on the surface."
  );

  const [evidenceImages, setEvidenceImages] = useState([
    "/warehouse/items/dented-bottle.png",
    "/warehouse/items/scratch-detail.png",
    "/warehouse/items/box-label.png",
  ]);

  const removeEvidence = (idx: number) => {
    setEvidenceImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClear = () => {
    setDescription("");
  };

  return (
    <WarehouseWorkerShell
      role="QUALITY_CHECKER"
      workerName="Sukant K."
      roleTitle="Issue Report"
      currentStepIndex={4}
      pageNumber={54}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Issue Report</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            Report quality, packaging or label issues found during inspection.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Form (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Yellow Alert Banner */}
            <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-4 flex items-center gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#FEF08A] text-[#CA8A04] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Report a Quality Issue</h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  Log any issue found during the quality check for the package, item or order.
                </p>
              </div>
            </div>

            {/* Form Fields Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-5">
              {/* Issue For */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Issue For <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "Order", label: "Order", icon: Package },
                    { id: "Item", label: "Item", icon: Layers },
                    { id: "Package", label: "Package", icon: Package },
                    { id: "Task", label: "Task", icon: FileText },
                  ].map((opt) => {
                    const isSelected = issueFor === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setIssueFor(opt.id as any)}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          isSelected
                            ? "bg-emerald-50 border-emerald-600 text-emerald-800 font-bold shadow-2xs"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && "✓"}
                        </span>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order ID & Package ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-800">
                    Order ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full pl-3 pr-9 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-800">Package ID</label>
                  <input
                    type="text"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Item (Optional) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">Item (Optional)</label>
                <div className="relative">
                  <select
                    value={itemSku}
                    onChange={(e) => setItemSku(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>SK-BT-014 - Steel Water Bottle (750 ml)</option>
                    <option>SK-HP-001 - Wireless Headphones</option>
                    <option>SK-MS-007 - Wireless Mouse</option>
                    <option>SK-BG-021 - Laptop Backpack</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Issue Type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "Damaged Item", label: "Damaged Item", icon: Wine },
                    { id: "Wrong Item", label: "Wrong Item", icon: ArrowLeftRight },
                    { id: "Missing Item", label: "Missing Item", icon: HelpCircle },
                    { id: "Short Quantity", label: "Short Quantity", icon: Hash },
                    { id: "Barcode Issue", label: "Barcode Issue", icon: Hash },
                    { id: "Other", label: "Other", icon: HelpCircle },
                  ].map((t) => {
                    const isSelected = issueType === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setIssueType(t.id)}
                        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition ${
                          isSelected
                            ? "bg-emerald-50 border-emerald-600 text-emerald-800 font-bold shadow-2xs"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "High", label: "High", color: "red" },
                    { id: "Medium", label: "Medium", color: "yellow" },
                    { id: "Low", label: "Low", color: "green" },
                  ].map((p) => {
                    const isSelected = priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id as any)}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                          p.color === "red"
                            ? isSelected
                              ? "bg-rose-50 border-rose-400 text-rose-700 shadow-2xs"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            : p.color === "yellow"
                            ? isSelected
                              ? "bg-amber-50 border-amber-400 text-amber-700 shadow-2xs"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            : isSelected
                            ? "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-2xs"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            p.color === "red"
                              ? "bg-rose-600"
                              : p.color === "yellow"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Issue Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Issue Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={300}
                    className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
                  />
                  <span className="absolute right-3 bottom-2.5 text-[10px] text-gray-400 font-medium">
                    {description.length} / 300
                  </span>
                </div>
              </div>

              {/* Attach Evidence (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Attach Evidence (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {evidenceImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-24 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden group shadow-2xs"
                    >
                      <Image
                        src={src}
                        alt="Evidence"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeEvidence(i)}
                        className="w-5 h-5 rounded-full bg-black/75 text-white flex items-center justify-center absolute top-1.5 right-1.5 hover:bg-black transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Add Image Tile */}
                  <button
                    type="button"
                    className="h-24 rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 flex flex-col items-center justify-center gap-1 text-center p-2 transition cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-emerald-700" />
                    <span className="text-[11px] font-bold text-emerald-800 leading-tight">
                      Upload Image
                    </span>
                    <span className="text-[9px] text-gray-500 font-medium">
                      (JPG, PNG – Max 5 MB)
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link
                href="/warehouse/worker/quality-checker/scan-result"
                className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Scan Result
              </Link>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                  Clear
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5 text-gray-500" />
                  Save as Draft
                </button>
                <Link
                  href="/warehouse/worker/quality-checker/handoff"
                  className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Issue
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Inspector Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Order & Task Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Order & Task Details</h3>
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
                    <span className="text-gray-500">Current Status:</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                      In Inspection
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Quality Check Progress */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Quality Check Progress</h3>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center justify-between text-xs font-semibold px-2">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[11px] text-gray-800">Scan</span>
                </div>
                <div className="flex-1 h-0.5 bg-emerald-600 mx-1.5" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[11px] text-gray-800">Inspect</span>
                </div>
                <div className="flex-1 h-0.5 bg-emerald-600 mx-1.5" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-600 bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800">Report Issue</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 mx-1.5" />
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-400 flex items-center justify-center text-xs font-medium">
                    ○
                  </div>
                  <span className="text-[11px] text-gray-400">Resolve</span>
                </div>
              </div>
            </div>

            {/* Card 3: Recent Issues for This Order */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold text-gray-900">Recent Issues for This Order</h3>
                </div>
                <button className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1">
                  View All →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[11px] text-gray-500 border-b border-gray-100">
                    <tr>
                      <th className="pb-2 font-semibold">#</th>
                      <th className="pb-2 font-semibold">Issue Type</th>
                      <th className="pb-2 font-semibold">Item (SKU)</th>
                      <th className="pb-2 font-semibold">Priority</th>
                      <th className="pb-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 font-bold text-gray-700">1</td>
                      <td className="py-2.5 text-gray-900 font-semibold">Label Issue</td>
                      <td className="py-2.5 font-mono text-gray-600">SK-BG-021</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">
                          Medium
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Resolved
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-gray-700">2</td>
                      <td className="py-2.5 text-gray-900 font-semibold">Short Quantity</td>
                      <td className="py-2.5 font-mono text-gray-600">SK-HP-001</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                          High
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                          Open
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseWorkerShell>
  );
}
