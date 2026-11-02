"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Truck,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  CalendarClock,
  ChevronDown,
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Barcode,
  Menu,
  X,
  SlidersHorizontal,
  Package,
  Layers,
  BarChart3,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useWarehouseStore } from "@/store/warehouseStore";
import { cn } from "@/lib/cn";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  subItems?: NavSubItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/warehouse/dashboard",
  },
  {
    id: "orders",
    label: "Orders",
    icon: Package,
    href: "/warehouse/orders/HM-20261028-001",
  },
  {
    id: "stock-management",
    label: "Stock Management",
    icon: Boxes,
    href: "/warehouse/inventory/movements",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Layers,
    subItems: [
      { label: "Overview", href: "/warehouse/inventory" },
      { label: "Adjustments", href: "/warehouse/inventory/adjustments" },
      { label: "Stock Take", href: "/warehouse/inventory/stock-take" },
    ],
  },
  {
    id: "picking-packing",
    label: "Picking & Packing",
    icon: SlidersHorizontal,
    subItems: [
      { label: "Overview", href: "/warehouse/picking-packing" },
      { label: "Status", href: "/warehouse/picking-packing/detail" },
      { label: "Picking Queue", href: "/warehouse/picking/queue" },
      { label: "Packing Queue", href: "/warehouse/packing/queue" },
      { label: "Pick List", href: "/warehouse/picking/lists" },
      { label: "Packing List", href: "/warehouse/packing/lists" },
      { label: "Picking & Packing Monitor", href: "/warehouse/picking-packing/detail" },
    ],
  },
  {
    id: "quality",
    label: "Quality",
    icon: ShieldCheck,
    subItems: [
      { label: "Overview", href: "/warehouse/quality" },
      { label: "Rejected Items", href: "/warehouse/quality/rejected" },
      { label: "Quality Reports", href: "/warehouse/quality/reports" },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    icon: RotateCcw,
    subItems: [
      { label: "Inspect & Approve", href: "/warehouse/returns/inspect-approve" },
      { label: "Refund & Replacement", href: "/warehouse/returns/refund-replacement" },
      { label: "Return Reports", href: "/warehouse/returns/reports" },
    ],
  },
  {
    id: "exceptions",
    label: "Exceptions",
    icon: AlertTriangle,
    subItems: [
      { label: "Open Exceptions", href: "/warehouse/exceptions/open" },
      { label: "Exception Triage", href: "/warehouse/exceptions" },
      { label: "Resolved Exceptions", href: "/warehouse/exceptions/open?status=resolved" },
      { label: "Exception Reports", href: "/warehouse/exceptions/reports" },
    ],
  },
  {
    id: "courier",
    label: "Courier Handover",
    icon: Truck,
    subItems: [
      { label: "Courier Handover", href: "/warehouse/courier" },
      { label: "Handover Queue", href: "/warehouse/courier/queue" },
      { label: "Dispatched Orders", href: "/warehouse/courier/dispatched" },
      { label: "Courier Partners", href: "/warehouse/courier/partners" },
      { label: "Handover Reports", href: "/warehouse/courier/reports" },
    ],
  },
  {
    id: "capacity",
    label: "Capacity & Deadlines",
    icon: CalendarClock,
    subItems: [
      { label: "Capacity & Deadlines", href: "/warehouse/capacity" },
      { label: "Resource Planning", href: "/warehouse/capacity/resource-planning" },
      { label: "Deadline Alerts", href: "/warehouse/capacity/deadline-alerts" },
      { label: "Workload Forecast", href: "/warehouse/capacity/workload-forecast" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    subItems: [
      { label: "Operational Reports", href: "/warehouse/reports/operational" },
      { label: "Inventory Reports", href: "/warehouse/reports?type=inventory" },
      { label: "Order Reports", href: "/warehouse/reports" },
      { label: "Courier Reports", href: "/warehouse/courier/reports" },
      { label: "Performance Reports", href: "/warehouse/reports/performance" },
      { label: "Audit Logs", href: "/warehouse/reports/audit-logs" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function WarehouseManagerShell({
  children,
  pageNumber,
  pageTitle,
  pageDescription,
  title,
  currentPath,
}: {
  children: React.ReactNode;
  pageNumber?: number;
  pageTitle?: string;
  pageDescription?: string;
  title?: string;
  currentPath?: string;
}) {
  const displayTitle = pageTitle || title;
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);

  // Accordion state: automatically expand the section that matches current pathname
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const section of NAV_SECTIONS) {
      if (section.subItems?.some((sub) => sub.href === pathname || pathname?.startsWith(sub.href))) {
        initial[section.id] = true;
      }
    }
    return initial;
  });

  // Keep active section expanded when pathname changes
  useEffect(() => {
    for (const section of NAV_SECTIONS) {
      if (section.subItems?.some((sub) => sub.href === pathname || pathname?.startsWith(sub.href))) {
        setOpenSections((prev) => ({ ...prev, [section.id]: true }));
      }
    }
  }, [pathname]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const {
    activeFacility,
    currentUser,
    availableFacilities,
    availableUsers,
    switchFacility,
    switchUser,
  } = useWarehouseStore();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0F2F5] text-[#17231E] flex font-sans">
      {/* ── 1. Full-Height Dark Green Sidebar (Matches Reference 1:1) ── */}
      <aside
        className={cn(
          "bg-[#033129] text-white flex-shrink-0 transition-all duration-300 flex flex-col justify-between h-full z-40 select-none shadow-xl",
          collapsed ? "w-20" : "w-64",
          "fixed inset-y-0 left-0 lg:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Top Brand Banner inside Sidebar */}
        <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/warehouse/dashboard" className="flex items-center gap-3 truncate group">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#033129] shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShoppingCart className="w-5 h-5 stroke-[2.4]" />
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="font-display font-black text-base tracking-tight text-white block leading-none">
                  HyperMart
                </span>
                <span className="text-[10px] text-white/70 font-medium block mt-1 truncate">
                  Warehouse Management
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-white/70 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Accordion Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1 text-xs scrollbar-thin scrollbar-thumb-white/20">
          {NAV_SECTIONS.map((section) => {
            const Icon = section.icon;
            const hasSubItems = Boolean(section.subItems && section.subItems.length > 0);
            const isDirectActive = section.href ? pathname === section.href : false;
            const isChildActive = section.subItems
              ? section.subItems.some((s) => s.href === pathname || pathname?.startsWith(s.href))
              : false;
            const isSectionActive = isDirectActive || isChildActive;
            const isOpen = Boolean(openSections[section.id]);

            if (!hasSubItems && section.href) {
              // Standalone direct link (Dashboard, Orders, Stock Management, Settings)
              return (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150",
                    isDirectActive
                      ? "bg-[#087A4A] text-white shadow-xs font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                  title={section.label}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0 transition-colors",
                        isDirectActive ? "text-[#C6F04A]" : "text-white/70 group-hover:text-white"
                      )}
                    />
                    {!collapsed && <span className="truncate">{section.label}</span>}
                  </div>
                </Link>
              );
            }

            // Accordion Section with Sub-Items (Clicking toggles open/close)
            return (
              <div key={section.id} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer",
                    isSectionActive
                      ? "bg-[#087A4A] text-white shadow-xs font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                  title={section.label}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0 transition-colors",
                        isSectionActive ? "text-[#C6F04A]" : "text-white/70 group-hover:text-white"
                      )}
                    />
                    {!collapsed && <span className="truncate">{section.label}</span>}
                  </div>

                  {!collapsed && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200",
                        isOpen ? "rotate-180 text-white" : "text-white/50 group-hover:text-white/80"
                      )}
                    />
                  )}
                </button>

                {/* Sub-Pages Accordion Content - Only appears when main heading is clicked */}
                {!collapsed && isOpen && section.subItems && (
                  <div className="pl-3 pr-1 py-1 space-y-1 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    {section.subItems.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "group flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
                            isSubActive
                              ? "bg-[#087A4A] text-white font-semibold shadow-xs"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0 transition-all border",
                                isSubActive
                                  ? "border-white bg-transparent"
                                  : "border-white/60 group-hover:border-white"
                              )}
                            />
                            <span className="truncate">{subItem.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer: Profile Card matching Manoj Kumar / Warehouse Manager */}
        <div className="p-3 border-t border-white/10 bg-[#022620]">
          {!collapsed ? (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 border border-white/20">
                  MK
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-white/70 truncate leading-tight mt-0.5">
                    {currentUser.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCollapsed(true)}
                className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 text-white font-bold flex items-center justify-center text-xs border border-white/20">
                MK
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

      {/* ── 2. Right Main Column: Top Bar + Scrollable Content ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header Bar (Matching Reference Screenshots 1:1) */}
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
              href="/warehouse/dashboard"
              className="text-gray-400 hover:text-gray-700 flex items-center gap-1"
              title="Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
            </Link>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-gray-800 truncate">
              {displayTitle || "Warehouse Dashboard"}
            </span>
          </div>

          {/* Right: Search, Facility Selector, Notification Bell, Worker Switcher, User Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Search Input */}
            <div className="relative hidden md:block w-56 lg:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, items, SKUs..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F7F6] border border-[#E1E8E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087A4A] text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* Facility Selector */}
            <div className="hidden sm:block">
              <select
                value={activeFacility.id}
                onChange={(e) => switchFacility(e.target.value)}
                className="text-xs font-bold text-[#033129] bg-[#EAF7EF] border border-[#C5F0DA] rounded-xl px-2.5 py-1.5 cursor-pointer focus:outline-none"
              >
                {availableFacilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.code} • {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Bell with Badge 3 */}
            <button className="relative p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center absolute 0 right-0 shadow-xs">
                3
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>



            {/* Worker Touch Suite Quick Switcher */}
            <Link
              href="/warehouse/worker/picker"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-xl bg-[#033129] text-[#C6F04A] hover:bg-[#07563F] transition shadow-xs"
              title="Launch Worker Touch Suite"
            >
              <Barcode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Worker Touch</span>
            </Link>

            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-[#087A4A] text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
              M
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F0F2F5]">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Injected Screen Content */}
            {children}
          </div>
        </main>
      </div>

      {/* ── 3. Reference Image Inspector Modal ── */}
      {showRefModal && pageNumber && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200">
            <div className="p-4 bg-[#033129] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#C6F04A] text-[#033129] font-black text-xs flex items-center justify-center">
                  #{pageNumber}
                </span>
                <div>
                  <h3 className="font-bold text-sm">Reference Page {String(pageNumber).padStart(2, "0")}</h3>
                  <p className="text-[11px] text-white/70">Warehouse Operations Reference Spec</p>
                </div>
              </div>
              <button
                onClick={() => setShowRefModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-900 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/portal_ref/page_${String(pageNumber).padStart(2, "0")}.png`}
                alt={`Reference screen ${pageNumber}`}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg border border-gray-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
