"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  Share2,
  Printer,
  RefreshCw,
  MoreHorizontal,
  Copy,
  Clock,
  ArrowUpRight,
  Package,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Truck,
  ShoppingCart,
  MapPin,
  ExternalLink,
  Edit2,
  AlertTriangle,
  FileText,
  Boxes,
  Barcode,
  Search,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <WarehouseManagerShell pageNumber={3} pageTitle="Order Details">
      <div className="space-y-6">
        {/* ── 1. Page Header: Title, SLA Risk Badge, Action Buttons ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#17231E] tracking-tight">
                Order Details
              </h1>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                <Clock className="w-3.5 h-3.5" />
                <span>SLA Risk</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Complete order information, items, progress and activity history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-2xs transition">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 shadow-2xs transition">
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-[#087A4A] hover:bg-[#06653E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reassign Order</span>
            </button>
            <button className="p-2 rounded-xl bg-white border border-[#E1E8E3] hover:bg-gray-50 text-gray-600 shadow-2xs transition">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 2. Order Information Header Bar ── */}
        <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
          <div>
            <p className="text-[11px] font-semibold text-gray-400">Order ID</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-display font-black text-base text-gray-900 tracking-tight">
                HM-20261028-001
              </span>
              <button className="text-gray-400 hover:text-gray-700">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400">Customer</p>
            <p className="font-semibold text-sm text-gray-800 mt-0.5">Rahul Mathias</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400">Order Date</p>
            <p className="font-semibold text-sm text-gray-800 mt-0.5">Tue, 28 Oct 2026, 08:12 AM</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-gray-400">Delivery Date</p>
            <p className="font-semibold text-sm text-red-600 flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Tue, 28 Oct 2026, 02:00 PM</span>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-gray-500 font-medium">Order Priority</p>
              <p className="font-display font-black text-sm text-red-600">High</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-gray-500 font-medium">Order Type</p>
              <p className="font-display font-black text-sm text-blue-600">Standard</p>
            </div>
          </div>
        </div>

        {/* ── 3. Order Progress Stepper (Exact to Page 03) ── */}
        <div className="bg-white rounded-2xl border border-[#E1E8E3] p-6 shadow-2xs space-y-4">
          <h3 className="font-display font-bold text-sm text-gray-900">Order Progress</h3>

          <div className="relative flex items-center justify-between overflow-x-auto py-2">
            {/* Step 1: Received */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                ✓
              </span>
              <p className="font-bold text-xs text-gray-900 mt-2">Received</p>
              <p className="text-[10px] text-gray-400">08:12 AM</p>
            </div>

            <div className="flex-1 h-0.5 bg-[#10B981] -mt-6 mx-1" />

            {/* Step 2: Allocated */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                ✓
              </span>
              <p className="font-bold text-xs text-gray-900 mt-2">Allocated</p>
              <p className="text-[10px] text-gray-400">08:25 AM</p>
            </div>

            <div className="flex-1 h-0.5 bg-[#10B981] -mt-6 mx-1" />

            {/* Step 3: Picking */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-4 ring-[#D1FAE5]">
                <ShoppingCart className="w-4 h-4" />
              </span>
              <p className="font-bold text-xs text-[#087A4A] mt-2">Picking</p>
              <p className="text-[10px] text-gray-400">10:15 AM</p>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 -mt-6 mx-1" />

            {/* Step 4: Packing */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs border border-gray-200">
                <Lock className="w-3.5 h-3.5" />
              </span>
              <p className="font-medium text-xs text-gray-500 mt-2">Packing</p>
              <p className="text-[10px] text-gray-400">Pending</p>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 -mt-6 mx-1" />

            {/* Step 5: Quality Check */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs border border-gray-200">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <p className="font-medium text-xs text-gray-500 mt-2">Quality Check</p>
              <p className="text-[10px] text-gray-400">Pending</p>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 -mt-6 mx-1" />

            {/* Step 6: Ready for Handover */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs border border-gray-200">
                <Package className="w-3.5 h-3.5" />
              </span>
              <p className="font-medium text-xs text-gray-500 mt-2">Ready for Handover</p>
              <p className="text-[10px] text-gray-400">Pending</p>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 -mt-6 mx-1" />

            {/* Step 7: Dispatched */}
            <div className="flex flex-col items-center text-center relative z-10 min-w-[90px]">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-xs border border-gray-200">
                <Truck className="w-3.5 h-3.5" />
              </span>
              <p className="font-medium text-xs text-gray-500 mt-2">Dispatched</p>
              <p className="text-[10px] text-gray-400">-</p>
            </div>
          </div>
        </div>

        {/* ── 4. Main Grid: Left Items & Shipment (8 cols) + Right Info & Activity (4 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Order Items Table + Shipment Table + Special Handling */}
          <div className="lg:col-span-8 space-y-6">
            {/* Order Items (3) Table */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
              <h3 className="font-display font-bold text-sm text-gray-900">
                Order Items (3)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px]">
                      <th className="pb-3 w-8">#</th>
                      <th className="pb-3">Product</th>
                      <th className="pb-3">SKU / Barcode</th>
                      <th className="pb-3">Variant</th>
                      <th className="pb-3 text-center">Qty</th>
                      <th className="pb-3 text-center">Picked</th>
                      <th className="pb-3 text-center">Packed</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        num: 1,
                        name: "Men's Running Shoes",
                        cat: "Sportswear",
                        sku: "HM-SHOE-001",
                        variant: "Size 9 Black",
                        qty: 2,
                        picked: 2,
                        packed: 0,
                        status: "Picked",
                      },
                      {
                        num: 2,
                        name: "Casual T-Shirt",
                        cat: "Men's Fashion",
                        sku: "HM-TSH-002",
                        variant: "XL Navy",
                        qty: 3,
                        picked: 3,
                        packed: 0,
                        status: "Picked",
                      },
                      {
                        num: 3,
                        name: "Travel Backpack",
                        cat: "Bags & Luggage",
                        sku: "HM-BAG-003",
                        variant: "30L Grey",
                        qty: 1,
                        picked: 1,
                        packed: 0,
                        status: "Picked",
                      },
                    ].map((item) => (
                      <tr key={item.num} className="hover:bg-gray-50/80 transition">
                        <td className="py-3 font-semibold text-gray-500">{item.num}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600 font-bold text-xs border border-gray-200">
                              <Package className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-[10px] text-gray-400">{item.cat}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <p className="font-mono text-gray-700 font-medium">{item.sku}</p>
                          <div className="flex items-center gap-1 text-[9px] text-gray-400 font-mono mt-0.5">
                            <Barcode className="w-3 h-3 text-gray-400" />
                            <span>|||||||||||||</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-600">{item.variant}</td>
                        <td className="py-3 text-center font-bold text-gray-900">{item.qty}</td>
                        <td className="py-3 text-center font-bold text-[#10B981]">{item.picked}</td>
                        <td className="py-3 text-center font-semibold text-gray-400">{item.packed}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7EF] text-[#087A4A] border border-[#C5F0DA]">
                            <span>{item.status}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          </span>
                        </td>
                        <td className="py-3 text-right text-gray-400 hover:text-gray-700 cursor-pointer">
                          <MoreHorizontal className="w-4 h-4 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipment & Package Information Table */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
              <h3 className="font-display font-bold text-sm text-gray-900">
                Shipment & Package Information
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-[11px]">
                      <th className="pb-3">Shipment ID</th>
                      <th className="pb-3">Package ID</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Weight (kg)</th>
                      <th className="pb-3">Dimensions (cm)</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Label</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { shipId: "SHP-001", pkgId: "PKG-001", items: 2, weight: "1.5", dim: "32 x 22 x 12", status: "Pending Packing" },
                      { shipId: "SHP-002", pkgId: "PKG-002", items: 3, weight: "2.1", dim: "36 x 28 x 16", status: "Pending Packing" },
                      { shipId: "SHP-003", pkgId: "PKG-003", items: 1, weight: "1.0", dim: "28 x 20 x 10", status: "Pending Packing" },
                    ].map((row) => (
                      <tr key={row.shipId} className="hover:bg-gray-50/80 transition">
                        <td className="py-3 font-semibold text-gray-900">{row.shipId}</td>
                        <td className="py-3 font-mono text-gray-700">{row.pkgId}</td>
                        <td className="py-3 text-gray-600">{row.items}</td>
                        <td className="py-3 text-gray-600">{row.weight}</td>
                        <td className="py-3 text-gray-600">{row.dim}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-gray-400 font-medium">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Special Handling Instructions */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Special Handling Instructions
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 flex items-center gap-1.5">
                  🍷 Fragile Item
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-1.5">
                  ☂️ Keep Dry
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-1.5">
                  🚫 No Cash on Delivery
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 flex items-center gap-1.5">
                  📦 Standard Packaging
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Info + Activity Timeline + Related Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer & Delivery Information */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">
                  Customer & Delivery Information
                </h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline flex items-center gap-1">
                  <span>Edit</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Rahul Mathias</p>
                  <p className="text-gray-500 mt-0.5">+971 50 123 4567</p>
                  <p className="text-gray-500">rahul.mathias@email.com</p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Delivery Address</p>
                  <p className="font-medium text-gray-800 mt-1">Villa 12, Al Nahda 1</p>
                  <p className="text-gray-600">Dubai, UAE</p>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#087A4A] hover:underline mt-1"
                  >
                    <span>View on Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-gray-900">
                  Activity Timeline
                </h3>
                <button className="text-xs font-bold text-[#087A4A] hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {[
                  { title: "Order Received", by: "System", time: "28 Oct 2026, 08:12 AM", done: true },
                  { title: "Order Allocated", by: "Manoj Kumar", time: "28 Oct 2026, 08:25 AM", done: true },
                  { title: "Picking Started", by: "Arjun Kumar", time: "28 Oct 2026, 09:10 AM", done: true },
                  { title: "Picking Completed", by: "Arjun Kumar", time: "28 Oct 2026, 10:15 AM", done: true },
                  { title: "Packing Pending", by: "-", time: "-", done: false },
                  { title: "Quality Check Pending", by: "-", time: "-", done: false },
                  { title: "Ready for Handover", by: "-", time: "-", done: false },
                  { title: "Dispatched", by: "-", time: "-", done: false },
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] mt-0.5 flex-shrink-0 ${
                      act.done ? "bg-[#10B981] text-white" : "border-2 border-gray-300 text-transparent"
                    }`}>
                      ✓
                    </span>
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <div>
                        <p className={`font-semibold ${act.done ? "text-gray-900" : "text-gray-400"}`}>
                          {act.title}
                        </p>
                        <p className="text-[10px] text-gray-400">{act.by}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono text-right flex-shrink-0 ml-2">
                        {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Actions */}
            <div className="bg-white rounded-2xl border border-[#E1E8E3] p-5 shadow-2xs space-y-3">
              <h3 className="font-display font-bold text-sm text-gray-900">
                Related Actions
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <Search className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">View Scan History</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">View Exceptions (0)</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Add Note</span>
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-left font-bold text-gray-700 flex items-center gap-1.5 transition">
                  <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                  <span className="truncate">Reprocess Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WarehouseManagerShell>
  );
}
