"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Filter,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { EXCEPTION_ITEMS, type ExceptionItem } from "@/mocks/adminData";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export default function ExceptionQueuePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [ownerFilter, setOwnerFilter] = useState<string>("All");
  const [items, setItems] = useState<ExceptionItem[]>(EXCEPTION_ITEMS);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const categories = ["All", "Orders", "Inventory", "Payments", "Refunds", "Customer care"];

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
    if (severityFilter !== "All" && item.severity !== severityFilter) return false;
    if (ownerFilter !== "All" && !item.owner.includes(ownerFilter)) return false;
    return true;
  });

  const handleResolve = (id: string, title: string) => {
    setResolvedIds((prev) => [...prev, id]);
    toast(`Resolved exception: ${title}`);
  };

  const getSeverityBadge = (severity: ExceptionItem["severity"]) => {
    switch (severity) {
      case "Critical":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "High":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Medium":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* ── 1. Page Header ── */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Exception queue
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-medium">
          Prioritize and resolve operational bottlenecks and fulfillment risks that need immediate attention.
        </p>
      </div>

      {/* ── 2. Category Tabs ── */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-neutral-200 pb-2">
        {categories.map((cat) => {
          const count =
            cat === "All"
              ? items.length
              : items.filter((i) => i.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer shrink-0",
                isActive
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
              )}
            >
              <span>{cat}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-600"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 3. Filter Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-neutral-500">Status:</span>
            <select className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-bold text-neutral-800">
              <option>Open</option>
              <option>Under Investigation</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* Severity */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-neutral-500">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-bold text-neutral-800"
            >
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Owner */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-neutral-500">Owner:</span>
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs font-bold text-neutral-800"
            >
              <option>All</option>
              <option>Taylor Moore</option>
              <option>Priya Raman</option>
              <option>Daniel Lee</option>
              <option>Maria Khan</option>
              <option>Jordan Chen</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSeverityFilter("All");
              setOwnerFilter("All");
            }}
            className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 px-2 py-1"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* ── 4. Exception Cards List ── */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isResolved = resolvedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={cn(
                "group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-5 shadow-2xs transition-all duration-200",
                isResolved
                  ? "border-emerald-200 bg-emerald-50/30 opacity-70"
                  : "border-neutral-200/90 bg-white hover:border-emerald-300 hover:shadow-md"
              )}
            >
              {/* Left Item Description */}
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-100 text-neutral-700">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-sm sm:text-base font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase",
                        getSeverityBadge(item.severity)
                      )}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 max-w-xl">{item.description}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] font-semibold text-neutral-400">
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-700">
                      {item.category}
                    </span>
                    <span>Oldest: {item.age}</span>
                  </div>
                </div>
              </div>

              {/* Right Owner & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase font-bold text-neutral-400">Owner</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="grid h-5 w-5 place-items-center rounded bg-emerald-100 text-[10px] font-bold text-emerald-800">
                      {item.ownerInitials}
                    </span>
                    <span className="text-xs font-bold text-neutral-800">{item.owner}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className="flex h-10 items-center gap-1.5 rounded-xl bg-[#C6F04A] px-4 text-xs font-extrabold text-[#073922] shadow-2xs transition hover:bg-[#b5e03a] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {!isResolved && (
                    <button
                      onClick={() => handleResolve(item.id, item.title)}
                      title="Quick Mark as Resolved"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-500 hover:bg-emerald-50 hover:text-emerald-700 transition cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-xs text-neutral-500">
            No exceptions currently match the selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}
