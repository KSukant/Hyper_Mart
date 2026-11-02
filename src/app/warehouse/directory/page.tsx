"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  LayoutDashboard,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Send,
  CalendarClock,
  FileSpreadsheet,
  ArrowRight,
  ExternalLink,
  Barcode,
  Search,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { WarehouseManagerShell } from "@/components/warehouse/WarehouseManagerShell";
import { useWarehouseStore } from "@/store/warehouseStore";
import { cn } from "@/lib/cn";

interface ScreenMeta {
  pageNumber: number;
  title: string;
  role: string;
  category: string;
  href: string;
  badge?: string;
  description: string;
}

const ALL_60_SCREENS: ScreenMeta[] = [
  // ── 1. Manager Overview (01 - 03)
  { pageNumber: 1, title: "Login Portal", role: "All Staff", category: "Auth", href: "/warehouse/login", description: "Secure credential authentication & badge scanning gateway." },
  { pageNumber: 2, title: "Warehouse Dashboard", role: "Warehouse Manager", category: "Overview", href: "/warehouse/dashboard", description: "At-a-glance throughput, active waves, urgency alerts, team telemetry." },
  { pageNumber: 3, title: "Order Details (360°)", role: "Supervisor", category: "Orders", href: "/warehouse/orders/ord-9941", description: "Full order lifecycle: pick, pack, QC, and carrier dispatch." },

  // ── 2. Inventory & Stock (04 - 05, 12 - 13)
  { pageNumber: 4, title: "Inventory Dashboard", role: "Inventory Lead", category: "Inventory", href: "/warehouse/inventory", description: "Multi-pool stock availability, zone heatmaps, fast-moving SKUs." },
  { pageNumber: 5, title: "Stock Movements & Bins", role: "Forklift Operator", category: "Inventory", href: "/warehouse/inventory/movements", description: "Interactive bin grid, replenishment transfers, putaway logs." },
  { pageNumber: 12, title: "Inventory Adjustments", role: "Inventory Auditor", category: "Inventory", href: "/warehouse/inventory/adjustments", description: "Reason-coded quantity corrections with dual-approval workflow." },
  { pageNumber: 13, title: "Stock Take & Cycle Counts", role: "Inventory Officer", category: "Inventory", href: "/warehouse/inventory/stock-take", description: "Blind physical cycle counts and variance reconciliation." },

  // ── 3. Picking & Packing (06, 14 - 18)
  { pageNumber: 6, title: "Picking & Packing Monitor", role: "Shift Supervisor", category: "Picking & Packing", href: "/warehouse/picking-packing", description: "Live dual-funnel throughput velocity across picking and packing." },
  { pageNumber: 14, title: "Picking Queue", role: "Pick Supervisor", category: "Picking & Packing", href: "/warehouse/picking/queue", description: "Prioritized wave pick assignment sorted by shortest walking path." },
  { pageNumber: 15, title: "Packing Queue", role: "Pack Supervisor", category: "Picking & Packing", href: "/warehouse/packing/queue", description: "Station queue allocation and box size recommendations." },
  { pageNumber: 16, title: "Pick List Manifest", role: "Picker", category: "Picking & Packing", href: "/warehouse/picking/lists", description: "Itemized picking lines arranged in S-curve aisle sequence." },
  { pageNumber: 17, title: "Packing List Manifest", role: "Packer", category: "Picking & Packing", href: "/warehouse/packing/lists", description: "Outbound carton item verification and protective dunnage checklist." },
  { pageNumber: 18, title: "Pick & Pack Flow Telemetry", role: "Operations Lead", category: "Picking & Packing", href: "/warehouse/picking-packing/detail", description: "Cycle time heatmaps and station throughput diagnostics." },

  // ── 4. Quality Control (07, 19 - 20)
  { pageNumber: 7, title: "Quality Overview", role: "Quality Lead", category: "Quality", href: "/warehouse/quality", description: "Pass rate trends, defect breakdown, and station accuracy leaderboard." },
  { pageNumber: 19, title: "Rejected Items Workbench", role: "Quality Lead", category: "Quality", href: "/warehouse/quality/rejected", description: "Failed package disposition: RTV, Repack, Rework, or Authorized Scrap." },
  { pageNumber: 20, title: "Quality Reports", role: "Quality Director", category: "Quality", href: "/warehouse/quality/reports", description: "Longitudinal defect rate analytics and vendor inbound compliance." },

  // ── 5. Reverse Logistics (21 - 23)
  { pageNumber: 21, title: "Inspect & Approve Returns", role: "Returns Officer", category: "Returns", href: "/warehouse/returns/inspect-approve", description: "Return dock physical inspection, condition grading, photo capture." },
  { pageNumber: 22, title: "Refund & Replacement", role: "Returns Officer", category: "Returns", href: "/warehouse/returns/refund-replacement", description: "Warehouse return handoff signaling Finance for refund triggering." },
  { pageNumber: 23, title: "Return Reports", role: "Operations Director", category: "Returns", href: "/warehouse/returns/reports", description: "Reverse logistics root-cause reports by category and damage type." },

  // ── 6. Exceptions (08, 24 - 25)
  { pageNumber: 8, title: "Exception Management", role: "Exception Officer", category: "Exceptions", href: "/warehouse/exceptions", description: "Master floor exception triage board and incident assignment." },
  { pageNumber: 24, title: "Open Exceptions Board", role: "Exception Officer", category: "Exceptions", href: "/warehouse/exceptions/open", description: "Active exception tickets sorted by SLA countdown urgency." },
  { pageNumber: 25, title: "Exception Reports", role: "Continuous Improvement", category: "Exceptions", href: "/warehouse/exceptions/reports", description: "Historical incident analysis to eliminate recurring bottlenecks." },

  // ── 7. Courier & Dispatch (09, 26 - 30)
  { pageNumber: 9, title: "Courier Handover Hub", role: "Logistics Manager", category: "Courier", href: "/warehouse/courier", description: "Ready parcels staged at dock doors awaiting courier trucks." },
  { pageNumber: 26, title: "Handover Queue", role: "Courier Operator", category: "Courier", href: "/warehouse/courier/queue", description: "Assembly of packed cartons into courier cages and pallet batches." },
  { pageNumber: 27, title: "Dispatched Orders", role: "Logistics Lead", category: "Courier", href: "/warehouse/courier/dispatched", description: "Consignments in transit with third-party carrier tracking events." },
  { pageNumber: 28, title: "Courier Partners", role: "Logistics Manager", category: "Courier", href: "/warehouse/courier/partners", description: "Carrier partner profiles, pickup cutoffs, vehicle capacity allotments." },
  { pageNumber: 29, title: "Courier Performance", role: "Logistics Director", category: "Courier", href: "/warehouse/courier/performance", description: "Carrier on-time delivery scorecards and transit damage rates." },
  { pageNumber: 30, title: "Handover Reports", role: "Dispatch Auditor", category: "Courier", href: "/warehouse/courier/reports", description: "Signed driver manifests, count reconciliations, and SLA compliance." },

  // ── 8. Capacity & Planning (10, 31 - 33)
  { pageNumber: 10, title: "Capacity & Deadlines", role: "Operations Director", category: "Capacity", href: "/warehouse/capacity", description: "Department labor utilization and order cutoff countdowns." },
  { pageNumber: 31, title: "Resource Planning", role: "Workforce Planner", category: "Capacity", href: "/warehouse/capacity/resource-planning", description: "Floor headcount scheduling across picking, packing, QC, and dock doors." },
  { pageNumber: 32, title: "Deadline Alerts Console", role: "Expeditor", category: "Capacity", href: "/warehouse/capacity/deadline-alerts", description: "High-priority alarm console for orders nearing truck departures." },
  { pageNumber: 33, title: "Workload Forecast", role: "Capacity Planner", category: "Capacity", href: "/warehouse/capacity/workload-forecast", description: "Hourly intake projections for staffing morning and evening peak waves." },

  // ── 9. Reports & Governance (11, 34 - 36)
  { pageNumber: 11, title: "Analytics & Audit Hub", role: "Compliance Auditor", category: "Reports", href: "/warehouse/reports", description: "Centralized launchpad for reporting, exports, and audit trails." },
  { pageNumber: 34, title: "Operational Reports", role: "General Manager", category: "Reports", href: "/warehouse/reports/operational", description: "End-to-end warehouse metrics: units/hr, cycle times, dock-to-stock." },
  { pageNumber: 35, title: "Performance Reports", role: "HR / Ops Lead", category: "Reports", href: "/warehouse/reports/performance", description: "Employee productivity scorecards, picking accuracy leaderboards." },
  { pageNumber: 36, title: "System Audit Logs", role: "Security Auditor", category: "Reports", href: "/warehouse/reports/audit-logs", description: "Immutable cryptographic system audit trail of every barcode scan." },

  // ── 10. Worker: Picker (37 - 42)
  { pageNumber: 37, title: "Picker: Role Home", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker", description: "Handheld terminal home, active shift badge, quick pick launcher." },
  { pageNumber: 38, title: "Picker: My Task Queue", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker/tasks", description: "Sequential wave pick queue with zone codes and walking path estimates." },
  { pageNumber: 39, title: "Picker: Current Task", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker/current", description: "In-aisle guidance banner, product photo, quantity, scan validation." },
  { pageNumber: 40, title: "Picker: Scan Result", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker/scan-result", description: "Visual and acoustic scan feedback confirming SKU or warning error." },
  { pageNumber: 41, title: "Picker: Issue Report", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker/issue-report", description: "In-aisle exception logging: Empty Bin, Damaged Product, Expired Batch." },
  { pageNumber: 42, title: "Picker: Completion & Handoff", role: "Picker", category: "Worker Suites", href: "/warehouse/worker/picker/handoff", description: "Wave complete checklist, tote barcode scan, destination packing table." },

  // ── 11. Worker: Packer (43 - 48)
  { pageNumber: 43, title: "Packer: Role Home", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer", description: "Station touchscreen home, packing throughput metrics, box supplies." },
  { pageNumber: 44, title: "Packer: My Task Queue", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer/tasks", description: "Totes waiting at packing table sorted by departure urgency." },
  { pageNumber: 45, title: "Packer: Current Task", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer/current", description: "Item verification, carton size recommendation, label printing." },
  { pageNumber: 46, title: "Packer: Scan Result", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer/scan-result", description: "Visual checklist updating as each item is scanned into shipping box." },
  { pageNumber: 47, title: "Packer: Issue Report", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer/issue-report", description: "Packing exception logging: Missing item from tote, Leaking container." },
  { pageNumber: 48, title: "Packer: Completion & Handoff", role: "Packer", category: "Worker Suites", href: "/warehouse/worker/packer/handoff", description: "Parcel sealed, shipping label attached, handoff to QC conveyor." },

  // ── 12. Worker: QC (49 - 54)
  { pageNumber: 49, title: "QC: Role Home", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker", description: "QC station terminal home, inspection accuracy score, scan trigger." },
  { pageNumber: 50, title: "QC: My Task Queue", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker/tasks", description: "Staged parcels awaiting quality inspection before release." },
  { pageNumber: 51, title: "QC: Current Task", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker/current", description: "Inspection checklist: Carton integrity, Barcode readability, Scale weight." },
  { pageNumber: 52, title: "QC: Scan Result", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker/scan-result", description: "Manifest match verification validating physical parcel against courier." },
  { pageNumber: 53, title: "QC: Issue Report", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker/issue-report", description: "Parcel rejection logging with photo evidence and rework rerouting." },
  { pageNumber: 54, title: "QC: Completion & Handoff", role: "Quality Checker", category: "Worker Suites", href: "/warehouse/worker/quality-checker/handoff", description: "Greenlights verified parcel for outbound courier cage loading." },

  // ── 13. Worker: Inventory Officer (55 - 60)
  { pageNumber: 55, title: "Inventory Officer: Role Home", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer", description: "Mobile terminal for pallet putaway, dock receiving, in-aisle counts." },
  { pageNumber: 56, title: "Inventory Officer: Task Queue", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer/tasks", description: "Cycle count assignments, replenishment move orders, receiving tasks." },
  { pageNumber: 57, title: "Inventory Officer: Current Task", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer/current", description: "Physical bin scan, counted units input, live discrepancy calculation." },
  { pageNumber: 58, title: "Inventory Officer: Scan Result", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer/scan-result", description: "Master SKU verification confirming barcode, batch number, expiry date." },
  { pageNumber: 59, title: "Inventory Officer: Issue Report", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer/issue-report", description: "In-aisle discrepancy logging: Damaged pallet, water damage, pest evidence." },
  { pageNumber: 60, title: "Final Inventory Workflow Screen", role: "Inventory Officer", category: "Worker Suites", href: "/warehouse/worker/inventory-officer/issue-report-final", description: "Formal discrepancy submission concluding the 60-screen reference workflow." },
];

export default function WarehousePlatformHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Overview",
    "Inventory",
    "Picking & Packing",
    "Quality",
    "Returns",
    "Exceptions",
    "Courier",
    "Capacity",
    "Reports",
    "Worker Suites",
  ];

  const filtered = ALL_60_SCREENS.filter((s) => {
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === "" ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.pageNumber).includes(searchQuery.trim());
    return matchesCat && matchesQuery;
  });

  return (
    <WarehouseManagerShell
      pageTitle="HyperMart WMS — Complete 60-Screen Operational Platform"
      pageDescription="Direct access to all 60 production screens recreated in exact sequential order"
    >
      {/* ── 1. Hero Gateway Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#033129] via-[#07563F] to-[#0B5132] text-white p-6 sm:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-[#C6F04A]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ALL 60 REFERENCE SCREENS FULLY IMPLEMENTED & LINKED</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight">
            HyperMart Warehouse Management Platform
          </h2>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
            A unified enterprise warehouse system with shared operational data, working barcode scanning, multi-stage order pipelines, cycle counts, quality inspections, and mobile worker touch suites.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/warehouse/dashboard"
              className="px-5 py-2.5 rounded-xl bg-[#C6F04A] text-[#033129] font-black text-xs sm:text-sm hover:bg-white transition flex items-center gap-2 shadow-sm"
            >
              <span>Launch Manager Dashboard (Screen 02)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/warehouse/worker/picker"
              className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Barcode className="w-4 h-4" />
              <span>Launch Worker Touch Suites (Screens 37–60)</span>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Silhouette */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Boxes className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* ── 2. Strict Boundary Notice: Warehouse vs Finance Portal ── */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold flex-shrink-0">
            <Lock className="w-4 h-4" />
          </span>
          <div>
            <p className="font-black">Strict Separation Enforced: Warehouse vs. Finance Portal</p>
            <p className="text-amber-800 text-[11px]">
              Warehouse manages physical inventory & dispatches (`/warehouse/*`). Finance manages monetary refunds, COD reconciliation & the double-entry ledger (`/portal/payment-ledger`).
            </p>
          </div>
        </div>
        <Link
          href="/portal/payment-ledger"
          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition"
        >
          <span>Open Finance Portal</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* ── 3. Filters & Category Navigation Bar ── */}
      <div className="bg-white rounded-2xl border border-[#E1E8E3] p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-[#033129] text-[#C6F04A] shadow-xs"
                    : "bg-[#F5F7F6] text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search screen #, title, or role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087A4A]"
            />
          </div>
        </div>
      </div>

      {/* ── 4. 60-Screen Grid Directory with Reference Previews ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <Link
            key={s.pageNumber}
            href={s.href}
            className="group bg-white rounded-2xl border border-[#E1E8E3] overflow-hidden hover:shadow-lg hover:border-[#087A4A] transition-all flex flex-col justify-between"
          >
            {/* Top Preview Image Container */}
            <div className="relative h-36 bg-gray-100 overflow-hidden border-b border-gray-100 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/portal_ref/page_${String(s.pageNumber).padStart(2, "0")}.png`}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#033129] text-[#C6F04A] text-[10px] font-black shadow-xs">
                PAGE {String(s.pageNumber).padStart(2, "0")}
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[10px] font-bold text-gray-700 shadow-xs">
                {s.role}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#087A4A] uppercase tracking-wider block">
                  {s.category}
                </span>
                <h3 className="font-display font-bold text-sm text-[#17231E] group-hover:text-[#087A4A] transition line-clamp-1">
                  {s.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                  {s.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#087A4A]">
                <span>Open Screen →</span>
                <span className="w-6 h-6 rounded-full bg-[#EAF7EF] group-hover:bg-[#087A4A] group-hover:text-white transition flex items-center justify-center text-[10px]">
                  ✓
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </WarehouseManagerShell>
  );
}

