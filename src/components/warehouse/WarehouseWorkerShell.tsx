"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Barcode,
  Battery,
  Wifi,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ListTodo,
  Play,
  RotateCcw,
  Sparkles,
  User,
  X,
  Volume2,
  Home,
  ClipboardList,
  Target,
  QrCode,
  ShoppingCart,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowLeftRight,
  CalendarClock,
  BarChart3,
  Bell,
} from "lucide-react";
import { useWarehouseStore } from "@/store/warehouseStore";
import { cn } from "@/lib/cn";

export interface WorkerStep {
  stepNum: number;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const DEFAULT_ROLE_STEPS: Record<string, WorkerStep[]> = {
  PICKER: [
    { stepNum: 1, label: "Home", href: "/warehouse/worker/picker", icon: Home },
    { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/picker/tasks", icon: ClipboardList, badge: 12 },
    { stepNum: 3, label: "Current Task", href: "/warehouse/worker/picker/current", icon: Target },
    { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/picker/scan-result", icon: Barcode },
    { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/picker/issue-report", icon: AlertTriangle },
    { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/picker/handoff", icon: CheckCircle2 },
  ],
  PACKER: [
    { stepNum: 1, label: "Home", href: "/warehouse/worker/packer", icon: Home },
    { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/packer/tasks", icon: ClipboardList, badge: 12 },
    { stepNum: 3, label: "Current Task", href: "/warehouse/worker/packer/current", icon: Target },
    { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/packer/scan-result", icon: Barcode },
    { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/packer/issue-report", icon: AlertTriangle },
    { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/packer/handoff", icon: CheckCircle2 },
  ],
  QUALITY_CHECKER: [
    { stepNum: 1, label: "Home", href: "/warehouse/worker/quality-checker", icon: Home },
    { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/quality-checker/tasks", icon: ClipboardList, badge: 12 },
    { stepNum: 3, label: "Current Task", href: "/warehouse/worker/quality-checker/current", icon: Target },
    { stepNum: 4, label: "Scan Result", href: "/warehouse/worker/quality-checker/scan-result", icon: Barcode },
    { stepNum: 5, label: "Report Issue", href: "/warehouse/worker/quality-checker/issue-report", icon: AlertTriangle },
    { stepNum: 6, label: "Handoff & Complete", href: "/warehouse/worker/quality-checker/handoff", icon: CheckCircle2 },
  ],
  INVENTORY_OFFICER: [
    { stepNum: 1, label: "Home", href: "/warehouse/worker/inventory-officer", icon: Home },
    { stepNum: 2, label: "My Tasks", href: "/warehouse/worker/inventory-officer/tasks", icon: ClipboardList, badge: 12 },
    { stepNum: 3, label: "Inventory", href: "/warehouse/worker/inventory-officer/current", icon: Layers },
    { stepNum: 4, label: "Stock Operations", href: "/warehouse/worker/inventory-officer/scan-result", icon: ArrowLeftRight },
    { stepNum: 5, label: "Cycle Count", href: "/warehouse/worker/inventory-officer/issue-report", icon: CalendarClock },
    { stepNum: 6, label: "Reports & Alerts", href: "/warehouse/worker/inventory-officer/issue-report-final", icon: BarChart3 },
  ],
};

export function WarehouseWorkerShell({
  roleTitle,
  role,
  workerName,
  title,
  roleBannerColor = "bg-[#06431B]",
  pageNumber,
  steps,
  currentStepIndex,
  currentStep,
  children,
  onSimulateScan,
}: {
  roleTitle?: string;
  role?: string;
  workerName?: string;
  title?: string;
  roleBannerColor?: string;
  pageNumber?: number;
  steps?: WorkerStep[];
  currentStepIndex?: number;
  currentStep?: number;
  children: React.ReactNode;
  onSimulateScan?: (barcode: string) => void;
}) {
  const normalizedRole = (role || "").toUpperCase();
  const effectiveSteps = steps || DEFAULT_ROLE_STEPS[normalizedRole] || [
    { stepNum: 1, label: "Home", href: "#", icon: Home },
    { stepNum: 2, label: "My Tasks", href: "#", icon: ClipboardList, badge: 12 },
    { stepNum: 3, label: "Current Task", href: "#", icon: Target },
    { stepNum: 4, label: "Scan Result", href: "#", icon: Barcode },
    { stepNum: 5, label: "Report Issue", href: "#", icon: AlertTriangle },
    { stepNum: 6, label: "Handoff & Complete", href: "#", icon: CheckCircle2 },
  ];
  const effectiveStepIndex = currentStepIndex !== undefined ? currentStepIndex : (currentStep ? currentStep - 1 : 0);
  const effectiveRoleTitle = roleTitle || title || (role ? role.replace(/_/g, " ") : "Worker Terminal");
  const pathname = usePathname();
  const { currentUser, activeFacility } = useWarehouseStore();
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [showRefModal, setShowRefModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanInput.trim() && onSimulateScan) {
      onSimulateScan(scanInput.trim());
      setScanInput("");
      setShowScanDialog(false);
    }
  };

  const displayName = workerName || "Sukant K.";
  const displayRoleLabel = role
    ? role
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Picker";

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0F2F5] text-[#17231E] flex font-sans select-none">
      {/* ── 1. Full-Height Dark Green Sidebar (Matches Reference 1:1) ── */}
      <aside
        className={cn(
          "bg-[#033129] text-white flex-shrink-0 transition-all duration-300 flex flex-col justify-between h-full z-40 select-none shadow-xl",
          collapsed ? "w-20" : "w-64",
          "fixed inset-y-0 left-0 lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Top Brand Banner */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/warehouse/worker/picker" className="flex items-center gap-3 truncate group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#033129] shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-5 h-5 stroke-[2.4]" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="font-display font-black text-base tracking-tight text-white block leading-none">
                  HyperMart
                </span>
                <span className="text-[10px] text-white/70 font-medium block mt-1 truncate">
                  Warehouse Workspace
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-white/70 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vertical Rail Navigation */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1.5 text-xs scrollbar-thin scrollbar-thumb-white/20">
          {effectiveSteps.map((st, idx) => {
            const isCurrent = idx === effectiveStepIndex || pathname === st.href;
            const Icon = st.icon || Home;

            return (
              <Link
                key={st.href}
                href={st.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                  isCurrent
                    ? "bg-[#087A4A] text-white shadow-xs font-bold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
                title={st.label}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors",
                      isCurrent ? "text-[#C6F04A]" : "text-white/70 group-hover:text-white"
                    )}
                  />
                  {!collapsed && <span className="truncate">{st.label}</span>}
                </div>

                {!collapsed && st.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {st.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer: Worker Profile */}
        <div className="p-3 border-t border-white/10 bg-[#022620]">
          {!collapsed ? (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 border border-white/20">
                  SK
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {displayName}
                  </p>
                  <p className="text-[10px] text-white/70 truncate leading-tight mt-0.5">
                    {displayRoleLabel}
                  </p>
                </div>
              </div>

              <Link
                href="/warehouse/dashboard"
                className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                title="Switch to Manager Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs border border-white/20">
                SK
              </div>
              <button
                onClick={() => setCollapsed(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── 2. Right Main Column: Top Bar + Scrollable Workspace ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-[#E1E8E3] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 shadow-2xs z-20">
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium truncate">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-gray-600 hover:text-black rounded-lg mr-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/warehouse/worker/picker"
              className="text-gray-400 hover:text-gray-700 flex items-center gap-1"
              title="Worker Workspace"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
            <span className="text-gray-300">›</span>
            <span className="text-gray-500">Worker Workspace</span>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-gray-800 truncate">
              {effectiveRoleTitle}
            </span>
          </div>

          {/* Right: Shift Pill, Scanner simulator, Bell, Profile Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Shift Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F7F6] border border-[#E1E8E3] text-xs font-semibold text-gray-700">
              <CalendarClock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Shift: 2nd Shift (02:00 PM – 10:00 PM)</span>
            </div>

            {/* Laser Scanner Simulator Trigger */}
            <button
              onClick={() => setShowScanDialog(true)}
              className="px-3 py-1.5 rounded-xl bg-[#C6F04A] text-[#033129] font-black text-xs flex items-center gap-1.5 hover:bg-[#b0dc38] transition shadow-xs"
            >
              <Barcode className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">SCANNER</span>
            </button>



            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center absolute 0 right-0 shadow-xs">
                3
              </span>
              <Bell className="w-4 h-4" />
            </button>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-gray-400 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
              SK
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F0F2F5]">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* ── 3. Barcode Simulator Dialog ── */}
      {showScanDialog && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#06431B] text-[#C6F04A] flex items-center justify-center font-black">
                  <Barcode className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-display font-black text-lg text-gray-900">Simulate Laser Scan</h3>
                  <p className="text-xs text-gray-500">Scan barcode, SKU, or physical bin location</p>
                </div>
              </div>
              <button
                onClick={() => setShowScanDialog(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScanSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Barcode / SKU / Bin
                </label>
                <input
                  type="text"
                  autoFocus
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder="e.g. 8901030382910, FOOD-ATTA-5KG, A-01-04"
                  className="w-full px-4 py-3 text-base font-mono font-bold bg-[#F5F7F6] border-2 border-[#06431B] rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-gray-400 uppercase">Quick Barcode Presets:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "Bin A-12-03", code: "A-12-03" },
                    { label: "Men's Running Shoes", code: "HM-SHOE-001" },
                    { label: "Casual T-Shirt", code: "HM-TSH-002" },
                    { label: "Travel Backpack", code: "HM-BAG-003" },
                    { label: "Tote T-42", code: "T-42" },
                    { label: "Carton CTN-108", code: "CTN-108" },
                  ].map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      onClick={() => {
                        if (onSimulateScan) onSimulateScan(p.code);
                        setShowScanDialog(false);
                      }}
                      className="px-2.5 py-2 text-left bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-xl font-medium text-gray-700 transition"
                    >
                      <p className="font-bold text-[11px]">{p.label}</p>
                      <p className="text-[10px] font-mono text-gray-400 truncate">{p.code}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScanDialog(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#06431B] text-[#C6F04A] font-black text-xs hover:bg-[#087A4A] transition"
                >
                  Confirm Scan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 4. Reference Inspector Modal ── */}
      {showRefModal && pageNumber && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-4 bg-[#033129] text-white flex items-center justify-between">
              <span className="font-bold text-sm">Reference Page {String(pageNumber).padStart(2, "0")}</span>
              <button onClick={() => setShowRefModal(false)} className="p-1 hover:bg-white/20 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-950 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/portal_ref/page_${String(pageNumber).padStart(2, "0")}.png`}
                alt={`Page ${pageNumber}`}
                className="max-h-[75vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
