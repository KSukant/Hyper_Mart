'use client';

import { create } from 'zustand';
import type { EnterprisePortal, PortalSession } from '@/types/security';
import { auditService } from '@/services/auditService';
import { supportRepository } from '@/services/supportRepository';
import { financeRepository } from '@/services/financeRepository';
import { operationsRepository } from '@/services/operationsRepository';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  tag: string;
}

const DEFAULT_SESSIONS: Record<EnterprisePortal, PortalSession> = {
  support: {
    userId: 'usr_sup_102',
    employeeId: 'EMP-042',
    portal: 'support',
    roles: ['support_lead'],
    hubIds: ['hub_coimbatore'],
    regionIds: ['region_south'],
    permissions: [
      'portal.support.access',
      'support.dashboard.read',
      'support.case.read',
      'support.case.create',
      'support.case.update',
      'support.case.add_note',
      'support.case.attach_evidence',
      'support.case.assign_team',
      'support.case.reassign',
      'support.case.priority.update',
      'support.case.close',
      'support.customer360.read_limited',
      'support.complaint.read',
      'support.return_refund.read',
      'support.warranty.read',
      'support.escalation.read',
      'support.escalation.create',
      'support.escalation.assign',
      'support.escalation.resolve',
      'support.report.read',
      'support.report.export',
      'support.audit.read',
    ],
    sessionId: 'sess_sup_456',
  },
  finance: {
    userId: 'usr_fin_104',
    employeeId: 'EMP-088',
    portal: 'finance',
    roles: ['finance_manager'],
    hubIds: ['hub_coimbatore', 'hub_chennai'],
    regionIds: ['region_south'],
    permissions: [
      'portal.finance.access',
      'finance.dashboard.read',
      'finance.payment.read',
      'finance.refund.read',
      'finance.refund.prepare',
      'finance.refund.approve_small',
      'finance.refund.approve_medium',
      'finance.cod.read',
      'finance.cod.prepare',
      'finance.payment_exception.read',
      'finance.reconciliation.read',
      'finance.settlement.approve',
      'finance.reconciliation.signoff',
      'finance.adjustment.create',
      'finance.adjustment.approve_within_limit',
      'finance.report.read',
      'finance.report.export',
      'finance.audit.read',
    ],
    sessionId: 'sess_fin_789',
  },
  operations: {
    userId: 'usr_ops_202',
    employeeId: 'EMP-091',
    portal: 'operations',
    roles: ['operations_manager'],
    hubIds: ['hub_coimbatore'],
    regionIds: ['region_south'],
    permissions: [
      'portal.operations.access',
      'operations.dashboard.read',
      'operations.orders.read',
      'operations.fulfilment.read',
      'operations.fulfilment.assign',
      'operations.warehouse_status.read',
      'operations.inventory.read',
      'operations.inventory_transfer.approve',
      'operations.stock_adjustment.approve_within_limit',
      'operations.low_stock.read',
      'operations.expiry_alert.read',
      'operations.exception.read',
      'operations.exception.assign',
      'operations.exception.resolve',
      'operations.dispatch.read',
      'operations.dispatch.verify',
      'operations.delivery.read',
      'operations.return_movement.read',
      'operations.staff.read',
      'operations.staff_shift.manage',
      'operations.report.read',
      'operations.report.export',
      'operations.audit.read',
      'operations.sla.manage',
    ],
    sessionId: 'sess_ops_123',
  },
};

interface PortalContextState {
  activePortal: EnterprisePortal;
  session: PortalSession;
  activeFacility: string;
  searchQuery: string;
  searchResults: SearchResultItem[];
  isSearching: boolean;

  // Actions
  setPortalContext: (portal: EnterprisePortal) => void;
  switchPortal: (portal: EnterprisePortal) => void;
  setActiveFacility: (facility: string) => void;
  setSearchQuery: (query: string) => void;
  performScopedSearch: (query: string) => void;
  exportAuditLogged: (format: string, recordType: string, count: number) => void;
}

export const usePortalContextStore = create<PortalContextState>((set, get) => ({
  activePortal: 'operations',
  session: DEFAULT_SESSIONS.operations,
  activeFacility: 'Coimbatore DC (Regional Hub)',
  searchQuery: '',
  searchResults: [],
  isSearching: false,

  setPortalContext: (portal: EnterprisePortal) => {
    if (get().activePortal === portal) return;
    set({
      activePortal: portal,
      session: DEFAULT_SESSIONS[portal],
      searchResults: [],
      searchQuery: '',
    });
  },

  switchPortal: (portal: EnterprisePortal) => {
    const prev = get().activePortal;
    if (prev === portal) return;

    // Log the portal switch in audit trail
    auditService.logEvent({
      event: 'portal_switch',
      userId: get().session.userId,
      portal,
      sourceDomain: prev,
      reason: `Context switched from ${prev.toUpperCase()} to ${portal.toUpperCase()}`,
    });

    set({
      activePortal: portal,
      session: DEFAULT_SESSIONS[portal],
      searchResults: [],
      searchQuery: '',
    });
  },

  setActiveFacility: (facility: string) => set({ activeFacility: facility }),

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().performScopedSearch(query);
  },

  performScopedSearch: (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      set({ searchResults: [], isSearching: false });
      return;
    }

    set({ isSearching: true });
    const portal = get().activePortal;
    const results: SearchResultItem[] = [];

    if (portal === 'support') {
      // Support Search: cases, complaints, returns, warranty
      const cases = supportRepository.getCases();
      cases.forEach((c) => {
        if (
          c.caseNumber.toLowerCase().includes(q) ||
          c.customerName.toLowerCase().includes(q) ||
          c.issue.toLowerCase().includes(q) ||
          c.orderNumber.toLowerCase().includes(q)
        ) {
          results.push({
            id: c.id,
            title: `${c.caseNumber} • ${c.customerName}`,
            subtitle: `${c.product} — ${c.issue}`,
            href: '/portal/support',
            tag: `Support • ${c.priority}`,
          });
        }
      });
    } else if (portal === 'finance') {
      // Finance Search: transactions, refunds, COD, reconciliation
      const ledger = financeRepository.getLedger();
      ledger.forEach((t) => {
        if (
          t.transactionId.toLowerCase().includes(q) ||
          t.orderNumber.toLowerCase().includes(q) ||
          t.method.toLowerCase().includes(q)
        ) {
          results.push({
            id: t.id,
            title: `${t.transactionId} • ₹${t.amount}`,
            subtitle: `Order ${t.orderNumber} via ${t.method} (${t.status})`,
            href: '/portal/payment-ledger',
            tag: `Finance • ${t.status}`,
          });
        }
      });

      const refunds = financeRepository.getRefundProcessing();
      refunds.forEach((r) => {
        if (
          r.refundNumber.toLowerCase().includes(q) ||
          r.orderNumber.toLowerCase().includes(q)
        ) {
          results.push({
            id: r.id,
            title: `${r.refundNumber} • ₹${r.refundAmount}`,
            subtitle: `Order ${r.orderNumber} • ${r.reason}`,
            href: '/portal/refund-processing',
            tag: `Refund • ${r.status}`,
          });
        }
      });
    } else if (portal === 'operations') {
      // Operations Search: Orders, SKUs, inventory, exceptions
      const orders = operationsRepository.getOrders();
      orders.forEach((o) => {
        if (
          o.orderId.toLowerCase().includes(q) ||
          o.orderNumber.toLowerCase().includes(q) ||
          o.zone.toLowerCase().includes(q)
        ) {
          results.push({
            id: o.orderId,
            title: `${o.orderNumber} • ${o.zone}`,
            subtitle: `${o.fulfilmentStatus} — ${o.deliverySlot}`,
            href: '/portal/orders',
            tag: `Operations • ${o.priority}`,
          });
        }
      });

      const inventory = operationsRepository.getInventory();
      inventory.forEach((i) => {
        if (i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q)) {
          results.push({
            id: i.sku,
            title: `${i.sku} • ${i.name}`,
            subtitle: `Available: ${i.available} | Reorder: ${i.reorderPoint}`,
            href: '/portal/inventory',
            tag: `Inventory • ${i.status}`,
          });
        }
      });
    }

    set({ searchResults: results, isSearching: false });
  },

  exportAuditLogged: (format: string, recordType: string, count: number) => {
    const portal = get().activePortal;
    const session = get().session;

    auditService.logEvent({
      event: 'export',
      userId: session.userId,
      portal,
      recordId: recordType,
      reason: `Exported ${count} ${recordType} records as ${format.toUpperCase()}`,
      fieldsReturned: ['all_screen_visible_fields'],
      metadata: { format, count, portal },
    });
  },
}));
