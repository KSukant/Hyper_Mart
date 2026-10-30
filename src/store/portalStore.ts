'use client';

import { create } from 'zustand';
import {
  SupportCase,
  ComplaintDetail,
  ReturnRefundCase,
  WarrantyCase,
  EscalationCase,
  PaymentLedgerEntry,
  CODSettlementEntry,
  RefundProcessingEntry,
  PaymentExceptionEntry,
  ReconciliationReport,
  AuditHistoryEvent,
  TeamAgent,
  PortalNotification,
  PortalToast,
} from '@/types/portal';
import {
  INITIAL_SUPPORT_CASES,
  INITIAL_COMPLAINT_DETAIL,
  INITIAL_RETURNS_REFUNDS,
  INITIAL_WARRANTY_CASES,
  INITIAL_ESCALATIONS,
  INITIAL_PAYMENT_LEDGER,
  INITIAL_COD_SETTLEMENTS,
  INITIAL_REFUND_PROCESSING,
  INITIAL_PAYMENT_EXCEPTIONS,
  INITIAL_RECONCILIATION_REPORTS,
  INITIAL_AUDIT_EVENTS,
  INITIAL_TEAM_AGENTS,
  INITIAL_PORTAL_NOTIFICATIONS,
} from '@/mocks/portalData';

export interface ConfirmationModalState {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  meta?: {
    recordId?: string;
    amount?: string;
    policy?: string;
    destination?: string;
  };
  onConfirm: () => void;
}

interface PortalState {
  // Datasets
  supportCases: SupportCase[];
  complaintDetail: ComplaintDetail;
  returnRefundCases: ReturnRefundCase[];
  warrantyCases: WarrantyCase[];
  escalationCases: EscalationCase[];
  paymentLedgerEntries: PaymentLedgerEntry[];
  codSettlementEntries: CODSettlementEntry[];
  refundProcessingEntries: RefundProcessingEntry[];
  paymentExceptionEntries: PaymentExceptionEntry[];
  reconciliationReports: ReconciliationReport[];
  auditHistoryEvents: AuditHistoryEvent[];
  teamAgents: TeamAgent[];
  notifications: PortalNotification[];

  // Selected records
  selectedSupportCaseId: string;
  selectedReturnCaseId: string;
  selectedWarrantyCaseId: string;
  selectedEscalationId: string;
  selectedLedgerTxnId: string;
  selectedCodRouteId: string;
  selectedRefundId: string;
  selectedExceptionId: string;
  selectedReportId: string;
  selectedAuditEventId: string;
  selectedAgentId: string;

  // Global app controls
  activeFacility: string;
  currentRole: string;
  searchQuery: string;
  isSearchOpen: boolean;
  isNotificationsOpen: boolean;
  isProfileOpen: boolean;
  lightboxImage: { src: string; title: string; subtitle?: string } | null;
  confirmationModal: ConfirmationModalState | null;
  toasts: PortalToast[];

  // Setters & Actions
  setSelectedSupportCaseId: (id: string) => void;
  setSelectedReturnCaseId: (id: string) => void;
  setSelectedWarrantyCaseId: (id: string) => void;
  setSelectedEscalationId: (id: string) => void;
  setSelectedLedgerTxnId: (id: string) => void;
  setSelectedCodRouteId: (id: string) => void;
  setSelectedRefundId: (id: string) => void;
  setSelectedExceptionId: (id: string) => void;
  setSelectedReportId: (id: string) => void;
  setSelectedAuditEventId: (id: string) => void;
  setSelectedAgentId: (id: string) => void;

  setActiveFacility: (fac: string) => void;
  setCurrentRole: (role: string) => void;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsNotificationsOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  setLightboxImage: (img: { src: string; title: string; subtitle?: string } | null) => void;
  openConfirmation: (modal: ConfirmationModalState) => void;
  closeConfirmation: () => void;
  addToast: (title: string, message: string, type?: PortalToast['type']) => void;
  removeToast: (id: string) => void;

  // Operational updates
  assignSupportCase: (id: string, newOwner: string) => void;
  escalateSupportCase: (id: string) => void;
  resolveSupportCase: (id: string) => void;
  updateComplaintResolution: (option: string) => void;
  updateReturnStatus: (id: string, status: ReturnRefundCase['status']) => void;
  scheduleReturnPickup: (id: string) => void;
  updateWarrantyStatus: (id: string, status: WarrantyCase['status']) => void;
  rescheduleWarrantyVisit: (id: string, newDate: string) => void;
  resolveEscalation: (id: string, note?: string) => void;
  reassignEscalation: (id: string, newOwner: string) => void;
  reconcileLedgerEntry: (id: string) => void;
  approveCodSettlement: (id: string) => void;
  holdCodSettlement: (id: string, reason: string) => void;
  approveRefund: (id: string) => void;
  retryRefund: (id: string) => void;
  retryException: (id: string) => void;
  resolveException: (id: string, note?: string) => void;
  approveReconciliationReport: (id: string) => void;
  flagAuditEvent: (id: string, reason: string) => void;
  rebalanceAgentWorkload: (fromAgentId: string, toAgentId: string, count: number) => void;
  setAgentStatus: (agentId: string, status: TeamAgent['status']) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

export const usePortalStore = create<PortalState>((set, get) => ({
  // Data
  supportCases: INITIAL_SUPPORT_CASES,
  complaintDetail: INITIAL_COMPLAINT_DETAIL,
  returnRefundCases: INITIAL_RETURNS_REFUNDS,
  warrantyCases: INITIAL_WARRANTY_CASES,
  escalationCases: INITIAL_ESCALATIONS,
  paymentLedgerEntries: INITIAL_PAYMENT_LEDGER,
  codSettlementEntries: INITIAL_COD_SETTLEMENTS,
  refundProcessingEntries: INITIAL_REFUND_PROCESSING,
  paymentExceptionEntries: INITIAL_PAYMENT_EXCEPTIONS,
  reconciliationReports: INITIAL_RECONCILIATION_REPORTS,
  auditHistoryEvents: INITIAL_AUDIT_EVENTS,
  teamAgents: INITIAL_TEAM_AGENTS,
  notifications: INITIAL_PORTAL_NOTIFICATIONS,

  // Selected records defaults
  selectedSupportCaseId: 'sc-1',
  selectedReturnCaseId: 'ret-1',
  selectedWarrantyCaseId: 'wr-1',
  selectedEscalationId: 'es-1',
  selectedLedgerTxnId: 'pl-1',
  selectedCodRouteId: 'cod-1',
  selectedRefundId: 'ref-1',
  selectedExceptionId: 'pex-1',
  selectedReportId: 'rec-1',
  selectedAuditEventId: 'aud-1',
  selectedAgentId: 'ag-1',

  // Global state
  activeFacility: 'Coimbatore DC (Regional Hub)',
  currentRole: 'Operations Lead (Full Access)',
  searchQuery: '',
  isSearchOpen: false,
  isNotificationsOpen: false,
  isProfileOpen: false,
  lightboxImage: null,
  confirmationModal: null,
  toasts: [],

  // Setters
  setSelectedSupportCaseId: (id) => set({ selectedSupportCaseId: id }),
  setSelectedReturnCaseId: (id) => set({ selectedReturnCaseId: id }),
  setSelectedWarrantyCaseId: (id) => set({ selectedWarrantyCaseId: id }),
  setSelectedEscalationId: (id) => set({ selectedEscalationId: id }),
  setSelectedLedgerTxnId: (id) => set({ selectedLedgerTxnId: id }),
  setSelectedCodRouteId: (id) => set({ selectedCodRouteId: id }),
  setSelectedRefundId: (id) => set({ selectedRefundId: id }),
  setSelectedExceptionId: (id) => set({ selectedExceptionId: id }),
  setSelectedReportId: (id) => set({ selectedReportId: id }),
  setSelectedAuditEventId: (id) => set({ selectedAuditEventId: id }),
  setSelectedAgentId: (id) => set({ selectedAgentId: id }),

  setActiveFacility: (fac) => set({ activeFacility: fac }),
  setCurrentRole: (role) => set({ currentRole: role }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  setIsNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
  setIsProfileOpen: (open) => set({ isProfileOpen: open }),
  setLightboxImage: (img) => set({ lightboxImage: img }),
  openConfirmation: (modal) => set({ confirmationModal: modal }),
  closeConfirmation: () => set({ confirmationModal: null }),

  addToast: (title, message, type = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    const newToast: PortalToast = { id, title, message, type, timestamp: 'Just now' };
    set((state) => ({ toasts: [newToast, ...state.toasts.slice(0, 4)] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4500);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  // Operational Actions
  assignSupportCase: (id, newOwner) => {
    set((state) => ({
      supportCases: state.supportCases.map((c) =>
        c.id === id ? { ...c, owner: newOwner, nextAction: `Assigned to ${newOwner}` } : c
      ),
    }));
    get().addToast('Case Reassigned', `Case updated and assigned to ${newOwner}`, 'success');
  },

  escalateSupportCase: (id) => {
    set((state) => ({
      supportCases: state.supportCases.map((c) =>
        c.id === id ? { ...c, sla: 'Escalated', priority: 'Critical' } : c
      ),
    }));
    get().addToast('Case Escalated', 'Case flagged as Critical and routed to tier-2 escalations queue', 'warning');
  },

  resolveSupportCase: (id) => {
    set((state) => ({
      supportCases: state.supportCases.map((c) =>
        c.id === id ? { ...c, sla: 'On track', nextAction: 'Resolved • Customer notified' } : c
      ),
    }));
    get().addToast('Case Resolved', 'Case marked resolved. SLA clock stopped.', 'success');
  },

  updateComplaintResolution: (option) => {
    set((state) => ({
      complaintDetail: {
        ...state.complaintDetail,
        policyResult: `Approved: ${option}`,
        lastAction: `Resolution chosen: ${option} • Ready for execution`,
      },
    }));
    get().addToast('Resolution Selected', `Applied resolution: ${option}`, 'success');
  },

  updateReturnStatus: (id, status) => {
    set((state) => ({
      returnRefundCases: state.returnRefundCases.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
    get().addToast('Return Status Updated', `Return set to ${status}`, 'info');
  },

  scheduleReturnPickup: (id) => {
    set((state) => ({
      returnRefundCases: state.returnRefundCases.map((c) =>
        c.id === id ? { ...c, status: 'Pickup scheduled', pickupDate: 'Tomorrow, 10:00 AM - 02:00 PM' } : c
      ),
    }));
    get().addToast('Pickup Scheduled', 'Courier partner notified for doorstep reverse pickup', 'success');
  },

  updateWarrantyStatus: (id, status) => {
    set((state) => ({
      warrantyCases: state.warrantyCases.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
    get().addToast('Warranty Updated', `Case status changed to ${status}`, 'info');
  },

  rescheduleWarrantyVisit: (id, newDate) => {
    set((state) => ({
      warrantyCases: state.warrantyCases.map((c) =>
        c.id === id ? { ...c, visitSchedule: newDate, status: 'Visit scheduled' } : c
      ),
    }));
    get().addToast('Technician Rescheduled', `Visit confirmed for ${newDate}`, 'success');
  },

  resolveEscalation: (id, note) => {
    set((state) => ({
      escalationCases: state.escalationCases.map((c) =>
        c.id === id ? { ...c, currentDecision: note || 'Resolved by lead', slaRemaining: 'Resolved' } : c
      ),
    }));
    get().addToast('Escalation Resolved', 'Incident resolved and logged into governance audit', 'success');
  },

  reassignEscalation: (id, newOwner) => {
    set((state) => ({
      escalationCases: state.escalationCases.map((c) =>
        c.id === id ? { ...c, owner: newOwner } : c
      ),
    }));
    get().addToast('Escalation Reassigned', `Assigned to ${newOwner}`, 'info');
  },

  reconcileLedgerEntry: (id) => {
    set((state) => ({
      paymentLedgerEntries: state.paymentLedgerEntries.map((e) =>
        e.id === id ? { ...e, status: 'Captured', recStatus: 'Fully matched' } : e
      ),
    }));
    get().addToast('Reconciliation Complete', 'Transaction matched with bank settlement statement', 'success');
  },

  approveCodSettlement: (id) => {
    set((state) => ({
      codSettlementEntries: state.codSettlementEntries.map((s) =>
        s.id === id ? { ...s, status: 'Settled', notes: 'Settlement verified & approved by finance' } : s
      ),
    }));
    get().addToast('Settlement Approved', 'COD cash receipt matched and marked Settled', 'success');
  },

  holdCodSettlement: (id, reason) => {
    set((state) => ({
      codSettlementEntries: state.codSettlementEntries.map((s) =>
        s.id === id ? { ...s, status: 'Variance hold', notes: reason } : s
      ),
    }));
    get().addToast('Settlement Put On Hold', `Reason: ${reason}`, 'warning');
  },

  approveRefund: (id) => {
    set((state) => ({
      refundProcessingEntries: state.refundProcessingEntries.map((r) =>
        r.id === id ? { ...r, status: 'Processing', approvalLevel: 'Approved (Dual check complete)' } : r
      ),
    }));
    get().addToast('Refund Dispatched', 'Refund request transmitted to payment gateway queue', 'success');
  },

  retryRefund: (id) => {
    set((state) => ({
      refundProcessingEntries: state.refundProcessingEntries.map((r) =>
        r.id === id ? { ...r, status: 'Processing' } : r
      ),
    }));
    get().addToast('Refund Retried', 'Retrying gateway dispatch with fresh idempotency key', 'info');
  },

  retryException: (id) => {
    set((state) => ({
      paymentExceptionEntries: state.paymentExceptionEntries.map((e) =>
        e.id === id ? { ...e, attempts: (e.attempts || e.attemptsCount || 1) + 1, resolutionStatus: 'Retry in progress' } : e
      ),
    }));
    get().addToast('Exception Retried', 'Automated retry triggered with updated beneficiary account', 'info');
  },

  resolveException: (id, note) => {
    set((state) => ({
      paymentExceptionEntries: state.paymentExceptionEntries.map((e) =>
        e.id === id ? { ...e, resolutionStatus: note || 'Resolved manually' } : e
      ),
    }));
    get().addToast('Exception Closed', 'Exception marked resolved and recorded in audit ledger', 'success');
  },

  approveReconciliationReport: (id) => {
    set((state) => ({
      reconciliationReports: state.reconciliationReports.map((r) =>
        r.id === id ? { ...r, approvalStatus: 'Approved', status: 'Approved' } : r
      ),
    }));
    get().addToast('Report Approved', 'Daily financial reconciliation report formally signed off', 'success');
  },

  flagAuditEvent: (id, reason) => {
    set((state) => ({
      auditHistoryEvents: state.auditHistoryEvents.map((a) =>
        a.id === id ? { ...a, flagged: true, reason: `${a.reason} [FLAGGED: ${reason}]` } : a
      ),
    }));
    get().addToast('Event Flagged', 'Security audit event flagged for compliance review', 'warning');
  },

  rebalanceAgentWorkload: (fromAgentId, toAgentId, count) => {
    set((state) => {
      const fromAgent = state.teamAgents.find((a) => a.id === fromAgentId);
      const toAgent = state.teamAgents.find((a) => a.id === toAgentId);
      if (!fromAgent || !toAgent) return state;

      return {
        teamAgents: state.teamAgents.map((a) => {
          if (a.id === fromAgentId) {
            const currentCases = a.cases ?? a.casesCount ?? 4;
            return { ...a, cases: Math.max(0, currentCases - count), casesCount: Math.max(0, currentCases - count) };
          }
          if (a.id === toAgentId) {
            const currentCases = a.cases ?? a.casesCount ?? 4;
            return { ...a, cases: currentCases + count, casesCount: currentCases + count };
          }
          return a;
        }),
      };
    });
    get().addToast('Workload Rebalanced', `Reassigned ${count} cases between agents`, 'success');
  },

  setAgentStatus: (agentId, status) => {
    set((state) => ({
      teamAgents: state.teamAgents.map((a) =>
        a.id === agentId ? { ...a, status } : a
      ),
    }));
    get().addToast('Agent Status Changed', `Status updated to ${status}`, 'info');
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },
}));
