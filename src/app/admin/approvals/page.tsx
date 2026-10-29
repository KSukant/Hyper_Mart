"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckSquare,
  Package,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  X,
  FileCheck,
  Upload,
} from "lucide-react";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface ApprovalItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  complianceScore: string;
  price: number;
  cost: number;
  margin: number;
  reviewer: string;
  reviewerInitials: string;
  status: "Pending" | "Approved" | "Changes requested";
  hasDocs: boolean;
}

const INITIAL_APPROVALS: ApprovalItem[] = [
  { id: "app-1", sku: "10093872", name: "ZenSound Z5 Wireless Headphones", brand: "ZenSound", category: "Audio > Headphones", complianceScore: "4/4", price: 3999, cost: 2879, margin: 28, reviewer: "Jordan Diaz", reviewerInitials: "JD", status: "Pending", hasDocs: true },
  { id: "app-2", sku: "10093871", name: "HomeNest Lounger Chair", brand: "HomeNest", category: "Home > Living Room", complianceScore: "3/4", price: 6499, cost: 4939, margin: 24, reviewer: "Maria Khan", reviewerInitials: "MK", status: "Pending", hasDocs: true },
  { id: "app-3", sku: "10093870", name: "PureSip 1L Stainless Steel Bottle", brand: "PureSip", category: "Kitchen > Drinkware", complianceScore: "4/4", price: 1249, cost: 849, margin: 32, reviewer: "Arjun M.", reviewerInitials: "AM", status: "Pending", hasDocs: true },
  { id: "app-4", sku: "10093869", name: "MovePro R2 Running Shoes", brand: "MovePro", category: "Sports > Running", complianceScore: "4/4", price: 4499, cost: 3329, margin: 26, reviewer: "Taylor Moore", reviewerInitials: "TM", status: "Pending", hasDocs: true },
  { id: "app-5", sku: "10093868", name: "LumaDesk Pro LED Desk Lamp", brand: "Luma", category: "Home > Lighting", complianceScore: "2/4", price: 2499, cost: 2049, margin: 18, reviewer: "Maria Khan", reviewerInitials: "MK", status: "Changes requested", hasDocs: false },
  { id: "app-6", sku: "10093867", name: "TrailPack 30L Hiking Backpack", brand: "TerraGear", category: "Outdoor > Backpacks", complianceScore: "4/4", price: 5999, cost: 4199, margin: 30, reviewer: "Arjun M.", reviewerInitials: "AM", status: "Pending", hasDocs: true },
];

export default function ProductApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "changes">("pending");
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(INITIAL_APPROVALS[0]);
  const [reviewNote, setReviewNote] = useState("");

  const pendingCount = items.filter((i) => i.status === "Pending").length;
  const approvedCount = items.filter((i) => i.status === "Approved").length;
  const changesCount = items.filter((i) => i.status === "Changes requested").length;

  const filteredItems = items.filter((item) => {
    if (activeTab === "pending") return item.status === "Pending";
    if (activeTab === "approved") return item.status === "Approved";
    return item.status === "Changes requested";
  });

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Approved" } : i))
    );
    toast(`Approved ${selectedItem?.name} for live catalog publication!`);
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, status: "Approved" } : null));
    }
  };

  const handleRequestChanges = (id: string) => {
    if (!reviewNote.trim()) {
      toast("Please provide feedback notes explaining requested changes.");
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Changes requested" } : i))
    );
    toast(`Changes requested for ${selectedItem?.name}. Feedback sent.`);
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, status: "Changes requested" } : null));
    }
    setReviewNote("");
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Header ── */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Product approvals
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium">
          Review new or changed product records before they go live on HyperMart.
        </p>
      </div>

      {/* ── 2. Filter Tabs ── */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        {[
          { key: "pending", label: "Review queue", count: pendingCount },
          { key: "approved", label: "Approved", count: approvedCount },
          { key: "changes", label: "Changes requested", count: changesCount },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as typeof activeTab)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer",
              activeTab === t.key
                ? "bg-emerald-800 text-white shadow-xs"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            )}
          >
            <span>{t.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.2 text-[10px]",
                activeTab === t.key ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
              )}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── 3. Split Screen Master-Detail Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.1fr] gap-6 items-start">
        {/* Left: Approvals Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                <tr>
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-2">Brand</th>
                  <th className="py-3 px-2 text-center">Compliance</th>
                  <th className="py-3 px-2 text-right">Price</th>
                  <th className="py-3 px-2 text-right">Margin</th>
                  <th className="py-3 px-2 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredItems.map((p) => {
                  const isSelected = selectedItem?.id === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedItem(p)}
                      className={cn(
                        "transition cursor-pointer",
                        isSelected ? "bg-emerald-50/60 font-medium" : "hover:bg-neutral-50"
                      )}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-100 text-neutral-400">
                            <Package className="h-4 w-4 text-emerald-800" />
                          </span>
                          <div>
                            <p className="font-bold text-neutral-900 leading-tight">{p.name}</p>
                            <p className="text-[10px] text-neutral-400 font-mono">SKU {p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-semibold text-neutral-700">{p.brand}</td>
                      <td className="py-3 px-2 text-center">
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                          {p.complianceScore}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-neutral-900">₹{p.price}</td>
                      <td className="py-3 px-2 text-right font-bold text-emerald-700">{p.margin}%</td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                            p.status === "Approved" && "bg-emerald-50 text-emerald-800 border-emerald-200",
                            p.status === "Pending" && "bg-amber-50 text-amber-800 border-amber-200",
                            p.status === "Changes requested" && "bg-rose-50 text-rose-800 border-rose-200"
                          )}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <ChevronRight className="h-4 w-4 text-neutral-400 mx-auto" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Inspection Drawer (ZenSound Z5 inspection details as in PDF Page 10) */}
        {selectedItem ? (
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-2xs space-y-5 sticky top-20">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-emerald-800 border border-neutral-200">
                  <Package className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-neutral-900">{selectedItem.name}</h2>
                  <p className="text-xs text-neutral-400 font-mono">SKU {selectedItem.sku} · {selectedItem.brand}</p>
                </div>
              </div>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800">
                {selectedItem.status}
              </span>
            </div>

            {/* Brand Guideline Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Brand guideline validation</h3>
              <div className="space-y-1.5 text-xs">
                {[
                  "Uses approved brand name and typography logo",
                  "Follows category naming conventions",
                  "Product images meet HyperMart 1000px standards",
                  "Description aligns with brand guidelines",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty & Mapping */}
            <div className="rounded-xl bg-neutral-50 p-3.5 border border-neutral-200/60 space-y-1 text-xs">
              <p className="font-bold text-neutral-800">Warranty Mapping</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-1">
                <div>Type: <strong className="text-neutral-800">Manufacturer</strong></div>
                <div>Duration: <strong className="text-neutral-800">1 year</strong></div>
                <div>Coverage: <strong className="text-neutral-800">Parts & labour</strong></div>
                <div>Claim: <strong className="text-neutral-800">Via HyperMart</strong></div>
              </div>
            </div>

            {/* Required Documentation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <h3 className="font-bold text-neutral-900 uppercase tracking-wider">Required documents</h3>
                <span className="text-[11px] font-semibold text-emerald-700">3 of 3 received</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  "Product compliance certificate (FSSAI/CE)",
                  "Safety data sheet (SDS / RoHS)",
                  "Product images (3+ high-res angles)",
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-emerald-900">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3.5 w-3.5 text-emerald-700" />
                      <span>{doc}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700">Uploaded</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proposed Commercials */}
            <div className="rounded-xl border border-neutral-200 p-3.5 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">Price</span>
                <span className="font-display font-bold text-sm text-neutral-900">₹{selectedItem.price}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">Cost</span>
                <span className="font-display font-bold text-sm text-neutral-600">₹{selectedItem.cost}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">Gross Margin</span>
                <span className="font-display font-bold text-sm text-emerald-700">{selectedItem.margin}%</span>
              </div>
            </div>

            {/* Review Notes Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Review notes</label>
              <textarea
                rows={2}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Add audit notes or feedback for changes..."
                className="w-full rounded-xl border border-neutral-200 p-2.5 text-xs text-neutral-900 focus:border-emerald-700 focus:outline-none"
              />
            </div>

            {/* Sticky Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleApprove(selectedItem.id)}
                className="flex-1 h-11 rounded-xl bg-[#0E5E3A] font-extrabold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer text-xs"
              >
                Approve product
              </button>
              <button
                type="button"
                onClick={() => handleRequestChanges(selectedItem.id)}
                className="h-11 px-4 rounded-xl border border-neutral-200 bg-white font-bold text-neutral-700 hover:bg-neutral-50 transition cursor-pointer text-xs"
              >
                Request changes
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-400">
            Select a product from the left queue to inspect compliance documentation and review.
          </div>
        )}
      </div>
    </div>
  );
}
