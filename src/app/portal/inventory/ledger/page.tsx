"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Search,
  Plus,
  Filter,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Save,
} from "lucide-react";
import { INVENTORY_MOVEMENTS, type InventoryMovement } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function StockLedgerPage() {
  const [movements, setMovements] = useState<InventoryMovement[]>(INVENTORY_MOVEMENTS);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Form states for manual adjustment drawer
  const [adjustSku, setAdjustSku] = useState("HYP-00123");
  const [adjustWarehouse, setAdjustWarehouse] = useState("Coimbatore DC");
  const [adjustType, setAdjustType] = useState<"Increase" | "Decrease">("Decrease");
  const [adjustQty, setAdjustQty] = useState(5);
  const [adjustReason, setAdjustReason] = useState("Damaged stock");
  const [adjustNote, setAdjustNote] = useState("");

  const filteredMovements = movements.filter(
    (m) =>
      m.product.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.batch.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustNote.trim()) {
      toast("Please provide an audit note explaining this inventory adjustment.");
      return;
    }

    const newEntry: InventoryMovement = {
      id: `im-${Date.now()}`,
      dateTime: "Just now",
      sku: adjustSku,
      product: "Paracetamol 500mg Tablets",
      brand: "HealthPlus",
      batch: "B250409",
      openingQty: 180,
      receivedQty: 0,
      reservedQty: 0,
      adjustedQty: adjustType === "Increase" ? adjustQty : -adjustQty,
      closingQty: adjustType === "Increase" ? 180 + adjustQty : 180 - adjustQty,
      reason: adjustReason,
      staffMember: "Priya S.",
    };

    setMovements([newEntry, ...movements]);
    setDrawerOpen(false);
    setAdjustNote("");
    toast(`Stock adjustment recorded: ${adjustType} of ${adjustQty} units (${adjustReason}).`);
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
            Audit & Adjustments
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Stock ledger
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
            Track all stock movements, adjustments and balances across warehouses.
          </p>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex h-11 items-center gap-2 rounded-xl bg-[#0E5E3A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#0b4d2f] transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Adjust stock</span>
        </button>
      </div>

      {/* ── 2. Filter Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU, product or batch..."
            className="h-10 w-full rounded-xl border border-neutral-200 pl-10 pr-3 text-xs font-medium placeholder-neutral-400 focus:outline-none focus:border-emerald-700"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select className="h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 font-semibold text-neutral-700">
            <option>All warehouses</option>
            <option>Coimbatore DC</option>
            <option>Chennai FC</option>
          </select>
          <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 font-semibold text-neutral-700">
            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
            <span>01 Apr – 30 Apr 2025</span>
          </div>
        </div>
      </div>

      {/* ── 3. Movement Ledger Table ── */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
              <tr>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-2">SKU</th>
                <th className="py-3 px-2">Product</th>
                <th className="py-3 px-2">Batch</th>
                <th className="py-3 px-2 text-right">Opening</th>
                <th className="py-3 px-2 text-right">Received</th>
                <th className="py-3 px-2 text-right">Reserved</th>
                <th className="py-3 px-2 text-right">Adjusted</th>
                <th className="py-3 px-2 text-right">Closing</th>
                <th className="py-3 px-3">Reason</th>
                <th className="py-3 px-3">Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-50 transition">
                  <td className="py-3 px-3 text-neutral-400 font-medium whitespace-nowrap">{m.dateTime}</td>
                  <td className="py-3 px-2 font-mono font-bold text-neutral-800">{m.sku}</td>
                  <td className="py-3 px-2 font-bold text-neutral-900">{m.product}</td>
                  <td className="py-3 px-2 font-mono text-[11px] text-neutral-500">{m.batch}</td>
                  <td className="py-3 px-2 text-right font-medium text-neutral-600">{m.openingQty}</td>
                  <td className="py-3 px-2 text-right font-semibold text-emerald-700">
                    {m.receivedQty > 0 ? `+${m.receivedQty}` : "0"}
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-blue-700">{m.reservedQty}</td>
                  <td className="py-3 px-2 text-right font-bold text-rose-600">
                    {m.adjustedQty !== 0 ? (m.adjustedQty > 0 ? `+${m.adjustedQty}` : m.adjustedQty) : "0"}
                  </td>
                  <td className="py-3 px-2 text-right font-black text-neutral-900">{m.closingQty}</td>
                  <td className="py-3 px-3">
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-700">
                      {m.reason}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-neutral-700 whitespace-nowrap">{m.staffMember}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. Slide-Over Adjustment Drawer (Matching PDF Page 13 right drawer) ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative z-50 w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between animate-fade-up">
            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-neutral-900">Adjust stock</h2>
                  <p className="text-xs text-neutral-500">Log audited manual inventory corrections</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">SKU or Product</label>
                <input
                  type="text"
                  value={adjustSku}
                  onChange={(e) => setAdjustSku(e.target.value)}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Warehouse</label>
                <select
                  value={adjustWarehouse}
                  onChange={(e) => setAdjustWarehouse(e.target.value)}
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-bold text-neutral-800"
                >
                  <option>Coimbatore DC</option>
                  <option>Chennai FC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Adjustment type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Decrease", "Increase"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setAdjustType(t)}
                      className={cn(
                        "h-10 rounded-xl border text-xs font-bold transition",
                        adjustType === t
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-neutral-200 bg-white text-neutral-600"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-neutral-200 px-3 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Reason code</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-xs font-bold text-neutral-800"
                >
                  <option>Damaged stock</option>
                  <option>Expired stock</option>
                  <option>Stock take variance</option>
                  <option>Customer return</option>
                  <option>Supplier return</option>
                  <option>Misplaced stock</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Audit note (Mandatory)
                </label>
                <textarea
                  required
                  rows={3}
                  value={adjustNote}
                  onChange={(e) => setAdjustNote(e.target.value)}
                  placeholder="Enter details for audit trail..."
                  className="w-full rounded-xl border border-neutral-200 p-3 text-xs text-neutral-900 focus:border-emerald-700 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#0E5E3A] text-xs font-extrabold text-white hover:bg-[#0b4d2f] shadow-sm"
                >
                  Save adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
