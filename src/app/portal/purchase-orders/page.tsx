"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Plus,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  Building,
  ArrowRight,
  Truck,
} from "lucide-react";
import { PURCHASE_ORDERS, type PurchaseOrder } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(PURCHASE_ORDERS);
  const [activeTab, setActiveTab] = useState("Inbound");
  const [selectedPo, setSelectedPo] = useState<PurchaseOrder>(PURCHASE_ORDERS[0]);

  const tabs = ["Draft", "Submitted", "Inbound", "Partially received", "Completed"];

  const handleReceiveStock = (po: PurchaseOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === po.id ? { ...o, receivingStatus: "Completed" } : o))
    );
    toast(`Received ${po.itemsCount} items for PO ${po.poNumber}. Inventory updated!`);
    if (selectedPo.id === po.id) {
      setSelectedPo((prev) => ({ ...prev, receivingStatus: "Completed" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Procurement & Inbound
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Purchase orders
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Plan, track and receive stock for a steady supply across fulfillment hubs.
          </p>
        </div>

        <button
          onClick={() => toast("Create PO workflow initialized.")}
          className="flex h-11 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create PO</span>
        </button>
      </div>

      {/* ── 2. Top Metrics ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
        {[
          { title: "Inbound value", value: "₹48,75,320", sub: "Across 12 POs", icon: ShoppingCart, color: "text-emerald-700 bg-emerald-50" },
          { title: "Items inbound", value: "18,420", sub: "Units arriving", icon: Package, color: "text-blue-700 bg-blue-50" },
          { title: "Expected this month", value: "₹32,10,700", sub: "Across 8 POs", icon: Clock, color: "text-purple-700 bg-purple-50" },
          { title: "Received this month", value: "₹21,08,450", sub: "Across 9 POs", icon: CheckCircle2, color: "text-amber-700 bg-amber-50" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.title} className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  {k.title}
                </span>
                <span className={cn("grid h-7 w-7 place-items-center rounded-lg", k.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-2 font-display text-2xl font-black text-neutral-900">{k.value}</p>
              <p className="mt-0.5 text-[11px] font-medium text-neutral-500">{k.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── 3. Tabs & Two-Column Main Region ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer shrink-0",
                activeTab === tab
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* Inbound PO Table */}
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-3">PO Number</th>
                    <th className="py-3 px-2">Brand</th>
                    <th className="py-3 px-2 text-right">Items</th>
                    <th className="py-3 px-2 text-right">Value (₹)</th>
                    <th className="py-3 px-3">Expected Arrival</th>
                    <th className="py-3 px-2 text-center">Status</th>
                    <th className="py-3 px-3 text-center">Receive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.map((po) => {
                    const isSelected = selectedPo.id === po.id;
                    return (
                      <tr
                        key={po.id}
                        onClick={() => setSelectedPo(po)}
                        className={cn(
                          "transition cursor-pointer",
                          isSelected ? "bg-emerald-50/60 font-medium" : "hover:bg-neutral-50"
                        )}
                      >
                        <td className="py-3 px-3 font-mono font-bold text-neutral-900">
                          {po.poNumber}
                        </td>
                        <td className="py-3 px-2 font-semibold text-neutral-700">{po.brand}</td>
                        <td className="py-3 px-2 text-right font-medium text-neutral-700">{po.itemsCount}</td>
                        <td className="py-3 px-2 text-right font-bold text-neutral-900">
                          ₹{po.value.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 text-neutral-600">{po.expectedArrival}</td>
                        <td className="py-3 px-2 text-center">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-[10px] font-bold border inline-flex items-center gap-1",
                              po.receivingStatus === "In transit" && "bg-blue-50 text-blue-800 border-blue-200",
                              po.receivingStatus === "At warehouse" && "bg-amber-50 text-amber-800 border-amber-200",
                              po.receivingStatus === "Completed" && "bg-emerald-50 text-emerald-800 border-emerald-200"
                            )}
                          >
                            <Truck className="h-3 w-3" />
                            <span>{po.receivingStatus}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          {po.receivingStatus !== "Completed" ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReceiveStock(po);
                              }}
                              className="rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 hover:bg-emerald-200 transition"
                            >
                              Receive
                            </button>
                          ) : (
                            <span className="text-emerald-700 text-xs font-bold">✓ Stored</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Receiving Timeline & Inbound Value by Brand */}
          <div className="space-y-6">
            {/* Receiving Timeline Card */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-4">
              <div>
                <h2 className="font-display text-sm font-bold text-neutral-900">
                  Receiving timeline — {selectedPo.poNumber}
                </h2>
                <p className="text-xs text-neutral-500">Brand: {selectedPo.brand} · Facility: {selectedPo.facility}</p>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                {[
                  { title: "PO created", time: "30 Oct 2024, 10:24 AM", done: true },
                  { title: "Confirmed with brand", time: "30 Oct 2024, 4:18 PM", done: true },
                  { title: "In transit", time: "02 Nov 2024, 9:12 AM", done: true },
                  { title: "At warehouse", time: "Expected 15 Nov 2024", done: selectedPo.receivingStatus === "At warehouse" || selectedPo.receivingStatus === "Completed" },
                  { title: "Receiving & quality check", time: "Dock inspection", done: selectedPo.receivingStatus === "Completed" },
                  { title: "Stock put-away completed", time: "Live in inventory", done: selectedPo.receivingStatus === "Completed" },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={cn(
                        "absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold text-white",
                        step.done ? "bg-emerald-700" : "bg-neutral-200 text-neutral-500"
                      )}
                    >
                      {step.done ? "✓" : idx + 1}
                    </span>
                    <p className="text-xs font-bold text-neutral-900">{step.title}</p>
                    <p className="text-[11px] text-neutral-400 font-medium">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inbound Value by Brand Bar Chart */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs space-y-3">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-neutral-500">
                Inbound value by brand
              </h2>
              <div className="space-y-2.5">
                {[
                  { brand: "Tide Home Care", val: "₹12,48,920", pct: 85 },
                  { brand: "Sony Electronics", val: "₹9,36,400", pct: 65 },
                  { brand: "Aashirvaad Staples", val: "₹6,21,000", pct: 45 },
                  { brand: "Lakmé Beauty", val: "₹3,92,800", pct: 30 },
                ].map((b) => (
                  <div key={b.brand} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-neutral-700">{b.brand}</span>
                      <span className="font-bold text-neutral-900">{b.val}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-700" style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
