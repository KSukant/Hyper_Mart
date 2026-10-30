"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BellRing,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  Plus,
  Tag,
  ShieldAlert,
} from "lucide-react";
import { INVENTORY_ALERTS, type InventoryAlert } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function InventoryAlertsPage() {
  const [activeTab, setActiveTab] = useState<"low_stock" | "near_expiry">("low_stock");
  const [alerts, setAlerts] = useState<InventoryAlert[]>(INVENTORY_ALERTS);

  const handleAction = (alertId: string, actionName: string) => {
    toast(`Executed "${actionName}" for item.`);
  };

  const getPriorityBadge = (priority: InventoryAlert["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Stockout Prevention & Markdowns
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Inventory alerts
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Stay ahead of stockouts and expiry risks. Take action to keep shelves healthy and sales strong.
          </p>
        </div>

        <button
          onClick={() => toast("Exported inventory alerts to CSV.")}
          className="flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition cursor-pointer self-start sm:self-auto"
        >
          <Download className="h-4 w-4" />
          <span>Export alerts</span>
        </button>
      </div>

      {/* ── 2. Top Summary KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-2xs flex items-center gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-600 text-white font-bold text-lg">
            7
          </span>
          <div>
            <p className="text-xs font-bold text-neutral-900">Low stock items</p>
            <p className="text-[11px] text-rose-700 font-medium">Need replenishment soon</p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs flex items-center gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-600 text-white font-bold text-lg">
            5
          </span>
          <div>
            <p className="text-xs font-bold text-neutral-900">Near expiry items</p>
            <p className="text-[11px] text-amber-700 font-medium">Consider markdown or transfer</p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs flex items-center gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-700 text-white font-bold text-lg">
            312
          </span>
          <div>
            <p className="text-xs font-bold text-neutral-900">Items healthy</p>
            <p className="text-[11px] text-emerald-700 font-medium">Stock levels are well balanced</p>
          </div>
        </div>
      </div>

      {/* ── 3. Tabs (Low stock vs Near expiry) ── */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab("low_stock")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer",
            activeTab === "low_stock"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
          )}
        >
          <span>Low stock</span>
          <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.2 text-[10px]">7</span>
        </button>

        <button
          onClick={() => setActiveTab("near_expiry")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer",
            activeTab === "near_expiry"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
          )}
        >
          <span>Near expiry</span>
          <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px]">5</span>
        </button>
      </div>

      {/* ── 4. Priority Alerts Cards List ── */}
      <div className="space-y-4">
        {alerts.map((al) => (
          <div
            key={al.id}
            className="rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-2xs space-y-4 hover:border-emerald-300 transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Product and Stock State */}
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-neutral-100 border border-neutral-200">
                  <BellRing className="h-6 w-6 text-emerald-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase border",
                        getPriorityBadge(al.priority)
                      )}
                    >
                      {al.priority} priority
                    </span>
                    <h3 className="font-display text-base font-bold text-neutral-900">{al.productName}</h3>
                    <span className="text-xs text-neutral-400 font-medium">({al.packSize})</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    SKU: <strong className="text-neutral-800 font-mono">{al.sku}</strong> · {al.warehouse} ({al.aisle})
                  </p>
                </div>
              </div>

              {/* Quantities & Trend */}
              <div className="grid grid-cols-3 gap-6 text-center text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 font-semibold block uppercase">Current Stock</span>
                  <span className="font-display font-black text-xl text-rose-600">{al.currentStock} units</span>
                  <span className="text-[10px] text-neutral-400 block">Reorder: {al.reorderLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-semibold block uppercase">Demand Trend</span>
                  <span className="font-bold text-neutral-800 text-sm block mt-0.5">{al.demandTrend}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{al.trendPercentage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-semibold block uppercase">Days to Empty</span>
                  <span className="font-bold text-neutral-900 text-sm block mt-0.5">
                    {al.daysRemaining ? `${al.daysRemaining} days` : "3–5 days"}
                  </span>
                  <span className="text-[10px] text-neutral-400">Run-out estimate</span>
                </div>
              </div>

              {/* 4 Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0">
                <Link
                  href="/portal/purchase-orders"
                  className="rounded-xl bg-[#0E5E3A] px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-[#0b4d2f] transition"
                >
                  Create PO
                </Link>
                <button
                  onClick={() => handleAction(al.id, "Move to Offer")}
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Move to offer
                </button>
                <button
                  onClick={() => handleAction(al.id, "Hold Batch")}
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Hold batch
                </button>
                <button
                  onClick={() => handleAction(al.id, "Mark Reviewed")}
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-800 transition"
                >
                  Mark reviewed
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
