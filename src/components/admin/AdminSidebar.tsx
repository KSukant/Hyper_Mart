"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  Warehouse,
  AlertTriangle,
  FolderKanban,
  Package,
  CheckSquare,
  Building2,
  Percent,
  Boxes,
  ClipboardList,
  BellRing,
  ShoppingCart,
  RotateCcw,
  Headphones,
  Receipt,
  CircleDollarSign,
  BarChart3,
  Users,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: "Operations",
    items: [
      { label: "Home", href: "/admin", icon: LayoutDashboard },
      { label: "Fulfilment Tower", href: "/admin/fulfilment", icon: Truck },
      { label: "Warehouse Readiness", href: "/admin/warehouse-readiness", icon: Warehouse },
      { label: "Exception Queue", href: "/admin/exceptions", icon: AlertTriangle, badge: 5, badgeColor: "bg-danger text-white" },
    ],
  },
  {
    groupTitle: "Merchandising",
    items: [
      { label: "Catalogue Overview", href: "/admin/catalogue", icon: FolderKanban },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Product Approvals", href: "/admin/approvals", icon: CheckSquare, badge: 12, badgeColor: "bg-amber-500 text-white" },
      { label: "Brands & Procurement", href: "/admin/brands", icon: Building2 },
      { label: "Offers & Promotions", href: "/admin/promotions", icon: Percent },
    ],
  },
  {
    groupTitle: "Inventory & Supply",
    items: [
      { label: "Inventory Overview", href: "/admin/inventory", icon: Boxes },
      { label: "Stock Ledger", href: "/admin/inventory/ledger", icon: ClipboardList },
      { label: "Inventory Alerts", href: "/admin/inventory/alerts", icon: BellRing, badge: 7, badgeColor: "bg-danger text-white" },
      { label: "Purchase Orders", href: "/admin/purchase-orders", icon: ShoppingCart },
    ],
  },
  {
    groupTitle: "Orders & Support",
    items: [
      { label: "Orders", href: "/admin/orders", icon: Package },
      { label: "Returns & Exceptions", href: "/admin/returns", icon: RotateCcw },
      { label: "Customer Care", href: "/admin/customer-care", icon: Headphones, badge: 24, badgeColor: "bg-primary text-white" },
      { label: "Refund Approvals", href: "/admin/refunds", icon: Receipt, badge: 12, badgeColor: "bg-amber-600 text-white" },
    ],
  },
  {
    groupTitle: "Finance & Insights",
    items: [
      { label: "Payments & Reconciliation", href: "/admin/payments", icon: CircleDollarSign },
      { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    groupTitle: "Governance",
    items: [
      { label: "Users & Access", href: "/admin/users", icon: Users },
      { label: "Audit Log", href: "/admin/audit", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, currentUser } = useAdminStore();

  const isRouteActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[#0E4A2E] bg-[#073922] text-white transition-all duration-200 select-none shadow-xl",
        sidebarCollapsed ? "w-[76px]" : "w-[248px]"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#0C4A2C] px-4">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-text font-black text-lg">
              H
            </span>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-tight text-white text-base leading-none">
                HyperMart
              </span>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-accent/90 mt-0.5">
                Operations Hub
              </span>
            </div>
          </div>
        ) : (
          <span className="mx-auto grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-text font-black text-xl">
            H
          </span>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-md bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer",
            sidebarCollapsed && "mx-auto mt-2"
          )}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links Scroll Container */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            {!sidebarCollapsed && (
              <p className="px-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300/60">
                {group.groupTitle}
              </p>
            )}

            {group.items.map((item) => {
              const active = isRouteActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors duration-150 cursor-pointer",
                    active
                      ? "bg-[#C6F04A] text-[#073922] font-bold shadow-sm"
                      : "text-emerald-100/80 hover:bg-white/10 hover:text-white",
                    sidebarCollapsed && "justify-center px-0 py-2.5"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-150",
                      active ? "text-[#073922]" : "text-emerald-300/80 group-hover:text-white",
                      !sidebarCollapsed && "group-hover:scale-105"
                    )}
                  />

                  {!sidebarCollapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={cn(
                        "ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none shadow-xs",
                        item.badgeColor || "bg-accent text-accent-text"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {sidebarCollapsed && item.badge && (
                    <span className="absolute right-1 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-[#073922]" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Storefront Link Indicator */}
        <div className="pt-2 border-t border-[#0C4A2C]/60">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-emerald-300/70 hover:bg-white/10 hover:text-white transition cursor-pointer",
              sidebarCollapsed && "justify-center px-0"
            )}
            title={sidebarCollapsed ? "View Consumer Storefront" : undefined}
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>View Storefront</span>}
          </Link>
        </div>
      </div>

      {/* User Footer Profile & Portal State */}
      <div className="shrink-0 border-t border-[#0C4A2C] bg-[#052818] p-3">
        {!sidebarCollapsed ? (
          <div className="flex items-center justify-between gap-2">
            <Link href="/admin/users" className="flex items-center gap-2.5 overflow-hidden hover:opacity-90 transition">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-text text-xs shadow-xs">
                {currentUser.avatarText}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="truncate text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </span>
                <span className="truncate text-[10px] text-emerald-300/70 font-medium">
                  {currentUser.roleLabel}
                </span>
              </div>
            </Link>

            <Link
              href="/admin/login"
              title="Sign Out"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-emerald-200/80 transition hover:bg-danger/20 hover:text-danger cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-bold text-accent-text text-xs">
              {currentUser.avatarText}
            </span>
            <Link
              href="/admin/login"
              title="Sign Out"
              className="grid h-7 w-7 place-items-center rounded-md text-emerald-200/80 hover:text-danger"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
