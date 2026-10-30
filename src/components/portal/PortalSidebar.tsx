'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Truck,
  Warehouse,
  Boxes,
  ClipboardList,
  BellRing,
  ShoppingCart,
  Headphones,
  UserCheck,
  LifeBuoy,
  FileWarning,
  RotateCcw,
  Wrench,
  AlertTriangle,
  ReceiptText,
  DollarSign,
  ArrowDownLeft,
  AlertOctagon,
  FileSpreadsheet,
  ShieldCheck,
  Users,
  Shield,
  Layers,
  Sparkles,
  Package,
  ExternalLink,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'OPERATIONS OVERVIEW',
    items: [
      { label: 'Operations Dashboard', href: '/portal', icon: LayoutDashboard },
      { label: 'Exception Queue', href: '/portal/exceptions', icon: AlertTriangle, badge: '5 critical', badgeColor: 'bg-rose-500 text-white' },
    ],
  },
  {
    title: 'ORDERS & FULFILMENT',
    items: [
      { label: 'Orders Stream', href: '/portal/orders', icon: Package },
      { label: 'Fulfilment Control Tower', href: '/portal/fulfilment', icon: Truck },
      { label: 'Returns & Reverse Logistics', href: '/portal/returns', icon: RotateCcw, badge: '14' },
    ],
  },
  {
    title: 'INVENTORY & WAREHOUSE',
    items: [
      { label: 'Multi-Facility Inventory', href: '/portal/inventory', icon: Boxes },
      { label: 'Stock Ledger & Adjustments', href: '/portal/inventory/ledger', icon: ClipboardList },
      { label: 'Low Stock & Expiry Alerts', href: '/portal/inventory/alerts', icon: BellRing, badge: '7', badgeColor: 'bg-rose-500 text-white' },
      { label: 'Purchase Orders', href: '/portal/purchase-orders', icon: ShoppingCart },
      { label: 'Warehouse Readiness (Live)', href: '/portal/warehouse-readiness', icon: Warehouse },
    ],
  },
  {
    title: 'CUSTOMER OPERATIONS',
    items: [
      { label: 'Customer Care Live Desk', href: '/portal/customer-care', icon: Headphones, badge: '24' },
      { label: 'Customer 360 Lookup', href: '/portal/customers/c-101', icon: UserCheck },
    ],
  },
  {
    title: 'SUPPORT MANAGEMENT',
    items: [
      { label: 'Support Case Dashboard', href: '/portal/support', icon: LifeBuoy, badge: '28' },
      { label: 'Complaint Cases', href: '/portal/complaints', icon: FileWarning, badge: '5 at risk', badgeColor: 'bg-rose-500 text-white' },
      { label: 'Returns & Refunds Support', href: '/portal/returns-refunds', icon: RotateCcw, badge: '14' },
      { label: 'Warranty & Repair Support', href: '/portal/warranty-repair', icon: Wrench, badge: '8' },
      { label: 'Escalations Management', href: '/portal/escalations', icon: AlertTriangle, badge: '4 critical', badgeColor: 'bg-amber-400 text-gray-950 font-bold' },
    ],
  },
  {
    title: 'FINANCE MONITORING',
    items: [
      { label: 'Payment Ledger', href: '/portal/payment-ledger', icon: ReceiptText },
      { label: 'COD Settlement', href: '/portal/cod-settlement', icon: DollarSign, badge: '2 holds', badgeColor: 'bg-rose-500 text-white' },
      { label: 'Refund Processing', href: '/portal/refund-processing', icon: ArrowDownLeft, badge: '12' },
      { label: 'Payment Exceptions', href: '/portal/payment-exceptions', icon: AlertOctagon, badge: '9' },
      { label: 'Reconciliation Reports', href: '/portal/reconciliation-reports', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'OPERATIONAL REPORTING & GOVERNANCE',
    items: [
      { label: 'Audit History', href: '/portal/audit-history', icon: ShieldCheck },
      { label: 'Team Performance', href: '/portal/team-performance', icon: Users, badge: '14 active' },
    ],
  },
];

export const PortalSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside
      className="w-[310px] min-w-[310px] max-w-[310px] h-screen bg-[#053221] text-white flex flex-col justify-between select-none border-r border-[#0E4931] shadow-2xl z-40 relative flex-shrink-0"
      style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
    >
      {/* Brand Header */}
      <div className="pt-6 px-6 pb-5 border-b border-[#0C412B]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C6F04A] flex items-center justify-center text-[#053221] font-black text-xl shadow-md flex-shrink-0">
            <Sparkles className="w-6 h-6 fill-[#053221]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white leading-none">
                HyperMart
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C6F04A]/20 text-[#C6F04A] border border-[#C6F04A]/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#88B89F] tracking-wide mt-1">
              Operations Portal • Ops Core
            </p>
          </div>
        </div>

        {/* Workspace Quick Indicator */}
        <div className="mt-4 px-3 py-2 rounded-lg bg-[#083D28] border border-[#0F4C34] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-[#A3C4B2]">
            <Layers className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span className="font-semibold text-white">Zone 04 • South DC</span>
          </div>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Navigation Links Scroll Area */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1.5">
            <div className="px-3 text-[10px] font-black tracking-wider text-[#699E83] uppercase">
              {group.title}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/portal' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-[#C6F04A] text-[#053221] font-bold shadow-md shadow-[#C6F04A]/10 translate-x-1'
                        : 'text-[#A8CEB8] hover:text-white hover:bg-[#0B442C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-[#053221]' : 'text-[#7CA891]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight flex-shrink-0 ${
                          isActive
                            ? 'bg-[#053221] text-[#C6F04A]'
                            : item.badgeColor || 'bg-[#0C4A30] text-[#A6CDB6]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info, Portal Switcher & Security Context */}
      <div className="p-4 border-t border-[#0C412B] bg-[#04281A]/70 text-[11px] text-[#7CA891] space-y-2.5">
        <Link
          href="/admin"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#083D28] text-white hover:bg-[#0B4A31] border border-[#115538] transition font-semibold text-xs"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span>Switch to Admin Portal</span>
          </div>
          <ExternalLink className="w-3 h-3 text-[#A8CEB8]" />
        </Link>

        <div className="flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span>Secure Enterprise Workspace</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">v3.4.1</span>
        </div>
        <p className="text-[10px] leading-relaxed text-[#81AB95]">
          Role: <strong className="text-white">Operations Manager</strong> • Coimbatore DC & Chennai FC
        </p>
        <div className="flex items-center justify-between pt-1 text-[9px] text-[#5C856F] uppercase tracking-wider font-mono">
          <span>TLS 1.3 256-BIT</span>
          <span className="text-emerald-400">● AUDITED</span>
        </div>
      </div>
    </aside>
  );
};
