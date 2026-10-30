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
} from 'lucide-react';
import { usePortalContextStore } from '@/store/portalContextStore';
import type { EnterprisePortal } from '@/types/security';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  permission: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const SUPPORT_NAV_GROUPS: NavGroup[] = [
  {
    title: 'CUSTOMER CARE & DESK',
    items: [
      { id: 'support-dashboard', label: 'Support Dashboard', href: '/portal/support', icon: LayoutDashboard, permission: 'support.dashboard.read' },
      { id: 'support-cases', label: 'Support Cases', href: '/portal/support', icon: LifeBuoy, badge: '28', permission: 'support.case.read' },
      { id: 'customer-care', label: 'Customer Care Live Desk', href: '/portal/customer-care', icon: Headphones, badge: '24', permission: 'support.customer_care.read' },
      { id: 'customer-360', label: 'Customer 360', href: '/portal/customers/c-101', icon: UserCheck, permission: 'support.customer360.read_limited' },
    ],
  },
  {
    title: 'CASE RESOLUTIONS',
    items: [
      { id: 'complaints', label: 'Complaints', href: '/portal/complaints', icon: FileWarning, badge: '5 at risk', badgeColor: 'bg-rose-500 text-white', permission: 'support.complaint.read' },
      { id: 'returns-refunds', label: 'Returns & Refund Support', href: '/portal/returns-refunds', icon: RotateCcw, badge: '14', permission: 'support.return_refund.read' },
      { id: 'warranty-repairs', label: 'Warranty & Repairs', href: '/portal/warranty-repair', icon: Wrench, badge: '8', permission: 'support.warranty.read' },
      { id: 'escalations', label: 'Support Escalations', href: '/portal/escalations', icon: AlertTriangle, badge: '4 critical', badgeColor: 'bg-amber-400 text-gray-950 font-bold', permission: 'support.escalation.read' },
    ],
  },
  {
    title: 'SLA & AUDIT',
    items: [
      { id: 'support-reports', label: 'Support SLA Reports', href: '/portal/team-performance', icon: Users, permission: 'support.report.read' },
      { id: 'support-audit', label: 'Support Audit History', href: '/portal/audit-history', icon: ShieldCheck, permission: 'support.audit.read' },
    ],
  },
];

const FINANCE_NAV_GROUPS: NavGroup[] = [
  {
    title: 'TRANSACTIONS & LEDGER',
    items: [
      { id: 'finance-dashboard', label: 'Finance Dashboard', href: '/portal/payment-ledger', icon: LayoutDashboard, permission: 'finance.dashboard.read' },
      { id: 'payment-ledger', label: 'Payment Ledger', href: '/portal/payment-ledger', icon: ReceiptText, permission: 'finance.payment.read' },
      { id: 'refund-processing', label: 'Refund Processing', href: '/portal/refund-processing', icon: ArrowDownLeft, badge: '12', permission: 'finance.refund.read' },
    ],
  },
  {
    title: 'SETTLEMENT & AUDIT',
    items: [
      { id: 'cod-settlement', label: 'COD Settlement', href: '/portal/cod-settlement', icon: DollarSign, badge: '2 holds', badgeColor: 'bg-rose-500 text-white', permission: 'finance.cod.read' },
      { id: 'payment-exceptions', label: 'Payment Exceptions', href: '/portal/payment-exceptions', icon: AlertOctagon, badge: '9', permission: 'finance.payment_exception.read' },
      { id: 'reconciliation', label: 'Gateway Reconciliation', href: '/portal/reconciliation-reports', icon: FileSpreadsheet, permission: 'finance.reconciliation.read' },
      { id: 'settlement-reports', label: 'Settlement Reports', href: '/portal/reconciliation-reports', icon: ClipboardList, permission: 'finance.report.read' },
    ],
  },
  {
    title: 'FINANCE GOVERNANCE',
    items: [
      { id: 'finance-audit', label: 'Finance Audit History', href: '/portal/audit-history', icon: ShieldCheck, permission: 'finance.audit.read' },
      { id: 'finance-reports', label: 'Finance Reports', href: '/portal/team-performance', icon: Users, permission: 'finance.report.read' },
    ],
  },
];

const OPERATIONS_NAV_GROUPS: NavGroup[] = [
  {
    title: 'OPERATIONS COMMAND',
    items: [
      { id: 'operations-dashboard', label: 'Operations Dashboard', href: '/portal', icon: LayoutDashboard, permission: 'operations.dashboard.read' },
      { id: 'orders-stream', label: 'Orders Stream', href: '/portal/orders', icon: Package, permission: 'operations.orders.read' },
      { id: 'fulfilment-control', label: 'Fulfilment Control Tower', href: '/portal/fulfilment', icon: Truck, permission: 'operations.fulfilment.read' },
    ],
  },
  {
    title: 'WAREHOUSE & INVENTORY',
    items: [
      { id: 'picking-packing', label: 'Picking & Packing Status', href: '/portal/warehouse-readiness', icon: Warehouse, permission: 'operations.warehouse_status.read' },
      { id: 'inventory', label: 'Inventory Management', href: '/portal/inventory', icon: Boxes, permission: 'operations.inventory.read' },
      { id: 'stock-alerts', label: 'Low Stock & Expiry Alerts', href: '/portal/inventory/alerts', icon: BellRing, badge: '7', badgeColor: 'bg-rose-500 text-white', permission: 'operations.low_stock.read' },
      { id: 'warehouse-exceptions', label: 'Warehouse Exceptions', href: '/portal/exceptions', icon: AlertTriangle, badge: '5 critical', badgeColor: 'bg-rose-500 text-white', permission: 'operations.exception.read' },
    ],
  },
  {
    title: 'DISPATCH & LOGISTICS',
    items: [
      { id: 'dispatch-verification', label: 'Dispatch Verification', href: '/portal/fulfilment', icon: ClipboardList, permission: 'operations.dispatch.read' },
      { id: 'delivery-operations', label: 'Delivery Operations', href: '/portal/orders', icon: Truck, permission: 'operations.delivery.read' },
      { id: 'returns-movement', label: 'Returns Movement', href: '/portal/returns', icon: RotateCcw, badge: '14', permission: 'operations.return_movement.read' },
      { id: 'staff-shifts', label: 'Staff and Shifts', href: '/portal/team-performance', icon: Users, badge: '14 active', permission: 'operations.staff.read' },
      { id: 'operations-reports', label: 'Operations Reports', href: '/portal/audit-history', icon: ShieldCheck, permission: 'operations.report.read' },
    ],
  },
];

export const PortalSidebar: React.FC = () => {
  const pathname = usePathname();
  const { activePortal, session } = usePortalContextStore();

  const getNavGroups = (): NavGroup[] => {
    switch (activePortal) {
      case 'support':
        return SUPPORT_NAV_GROUPS;
      case 'finance':
        return FINANCE_NAV_GROUPS;
      case 'operations':
      default:
        return OPERATIONS_NAV_GROUPS;
    }
  };

  const getPortalTitle = () => {
    switch (activePortal) {
      case 'support':
        return { name: 'Support Portal', badge: 'SUPPORT', role: 'Support Lead' };
      case 'finance':
        return { name: 'Finance Portal', badge: 'FINANCE', role: 'Finance Manager' };
      case 'operations':
      default:
        return { name: 'Operations Manager Portal', badge: 'OPERATIONS', role: 'Operations Manager' };
    }
  };

  const portalInfo = getPortalTitle();
  const navGroups = getNavGroups();

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
              <span className="text-[9.5px] uppercase font-black tracking-wider px-1.5 py-0.5 rounded bg-[#C6F04A]/20 text-[#C6F04A] border border-[#C6F04A]/30">
                {portalInfo.badge}
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#88B89F] tracking-wide mt-1 truncate max-w-[190px]">
              {portalInfo.name}
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

      {/* Navigation Links Scroll Area - Filtered strictly by active portal permissions */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        {navGroups.map((group) => {
          // Filter items by session permissions
          const visibleItems = group.items.filter((item) =>
            session.permissions.includes(item.permission)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1.5">
              <div className="px-3 text-[10px] font-black tracking-wider text-[#699E83] uppercase">
                {group.title}
              </div>

              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/portal' && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id + item.href}
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
          );
        })}
      </nav>

      {/* Footer Info & Security Context */}
      <div className="p-4 border-t border-[#0C412B] bg-[#04281A]/70 text-[11px] text-[#7CA891] space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#C6F04A]" />
            <span>Secure Enterprise Workspace</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">v3.4.1</span>
        </div>
        <p className="text-[10px] leading-relaxed text-[#81AB95]">
          Active Context: <strong className="text-white">{portalInfo.role}</strong>
        </p>
        <div className="flex items-center justify-between pt-1 text-[9px] text-[#5C856F] uppercase tracking-wider font-mono">
          <span>TLS 1.3 256-BIT</span>
          <span className="text-emerald-400">● PORTAL ISOLATED</span>
        </div>
      </div>
    </aside>
  );
};
