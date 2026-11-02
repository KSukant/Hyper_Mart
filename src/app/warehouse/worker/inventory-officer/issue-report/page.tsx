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
  Package,
  Layers,
  FileText,
  MapPin,
  Clock,
  Wine,
  ArrowLeftRight,
  HelpCircle,
  Hash,
  Barcode,
  Check,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import { WarehouseWorkerShell, WorkerStep } from "@/components/warehouse/WarehouseWorkerShell";

const IO_ISSUE_STEPS: WorkerStep[] = [
  { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Package },
  { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
  { stepNum: 3, label: "Current Task", href: "/warehouse/worker/inventory-officer/current", icon: Layers },
  { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/inventory-officer/scan-result", icon: Barcode },
  { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/inventory-officer/issue-report", icon: AlertTriangle },
  { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/inventory-officer/issue-report-final", icon: Check },
];

export default function InventoryOfficerIssueReportPage() {
  const [issueFor, setIssueFor] = useState<"Item" | "Stock" | "Location" | "Task">("Item");
  const [skuItem, setSkuItem] = useState("SK-HP-001 – Wireless Headphones");
  const [issueType, setIssueType] = useState<string>("Short Quantity");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [description, setDescription] = useState(
    "Scanned 20 units, but 10 units are missing in the bin (B-02-01)."
  );

  const [evidenceImages, setEvidenceImages] = useState([
    "/warehouse/items/shelf-bin.png",
    "/warehouse/items/shelf-boxes.png",
    "/warehouse/items/rugged-scanner.png",
  ]);

  const removeEvidence = (idx: number) => {
    setEvidenceImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClear = () => {
    setDescription("");
  };

  return (
    <WarehouseWorkerShell
      role="INVENTORY_OFFICER"
      workerName="Sukant K."
      roleTitle="Inventory Officer > Issue Report"
      steps={IO_ISSUE_STEPS}
      currentStepIndex={4}
      pageNumber={60}
    >
      <div className="space-y-4">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Issue Report</h1>
          <p className="text-xs text-blue-700 font-medium mt-0.5">
            Report inventory, receiving or system issues for the current task.
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
                <h2 className="text-sm font-bold text-gray-900">Report an Inventory Issue</h2>
                <p className="text-xs text-gray-600 mt-0.5">
                  Log any issue found during stock operation.
                </p>
              </div>
            </div>

            {/* Form Fields Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Issue Details</h3>
              </div>

              {/* Issue For */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Issue For <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "Item", label: "Item", icon: Package },
                    { id: "Stock", label: "Stock", icon: Layers },
                    { id: "Location", label: "Location (Bin)", icon: MapPin },
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

              {/* SKU / Item */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  SKU / Item <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={skuItem}
                    onChange={(e) => setSkuItem(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Issue Type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "Short Quantity", label: "Short Quantity", icon: Package },
                    { id: "Damaged Item", label: "Damaged Item", icon: Wine },
                    { id: "Wrong Item", label: "Wrong Item", icon: ArrowLeftRight },
                    { id: "Missing Item", label: "Missing Item", icon: HelpCircle },
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
                      <Image src={src} alt="Evidence" fill className="object-cover" />
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
                href="/warehouse/worker/inventory-officer/scan-result"
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
                  href="/warehouse/worker/inventory-officer"
                  className="px-5 py-2.5 rounded-xl bg-[#087A4A] hover:bg-[#06633b] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Issue
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Recent Issues (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Card 1: Task & Item Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-gray-900">Task & Item Details</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-[#F5F7F6] border border-gray-200 flex items-center justify-center flex-shrink-0 p-2 relative overflow-hidden">
                  <Image
                    src="/warehouse/items/headphones.png"
                    alt="Headphones"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-1.5 text-xs flex-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Task ID:</span>
                    <span className="font-bold text-gray-900 font-mono">INV-4822</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Task Type:</span>
                    <span className="font-bold text-gray-900">Stock Update</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">SKU:</span>
                    <span className="font-bold text-gray-900 font-mono">SK-HP-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Item:</span>
                    <span className="font-bold text-gray-900">Wireless Headphones</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location (Bin):</span>
                    <span className="font-bold text-gray-900 font-mono">B-02-01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expected Qty:</span>
                    <span className="font-bold text-gray-900">30 Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scanned Qty:</span>
                    <span className="font-bold text-gray-900">20 Units</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Variance:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-black font-mono text-[11px]">
                      -10 Units
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Recent Issues for this Item */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-sm font-bold text-gray-900">Recent Issues for this Item</h3>
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
                      <th className="pb-2 font-semibold text-center">Variance</th>
                      <th className="pb-2 font-semibold text-center">Status</th>
                      <th className="pb-2 font-semibold text-right">Reported On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2.5 font-bold text-gray-700">1</td>
                      <td className="py-2.5 text-gray-900 font-semibold">Short Quantity</td>
                      <td className="py-2.5 text-center font-mono font-bold text-rose-600">-10 Units</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                          Open
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-500 text-[11px]">Today, 03:20 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-gray-700">2</td>
                      <td className="py-2.5 text-gray-900 font-semibold">Damaged Item</td>
                      <td className="py-2.5 text-center font-mono font-bold text-gray-700">-2 Units</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Resolved
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-500 text-[11px]">Oct 28, 11:05 AM</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-gray-700">3</td>
                      <td className="py-2.5 text-gray-900 font-semibold">Wrong Item</td>
                      <td className="py-2.5 text-center font-mono font-bold text-gray-700">-1 Unit</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                          Resolved
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-gray-500 text-[11px]">Oct 26, 04:40 PM</td>
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
