'use client';

import { create } from 'zustand';
import type {
  DeliveryTask,
  DeliveryStep,
  DeliveryException,
  ExceptionCategory,
  ExceptionResolution,
  CodSettlement,
  ReturnTask,
  PackageCondition,
  ReturnStatus,
  PartnerStatus,
  ProofOfDelivery,
} from '@/types/delivery';
import {
  MOCK_PARTNER,
  MOCK_ROUTE,
  MOCK_TASKS,
  MOCK_COD_SETTLEMENT,
  MOCK_RETURNS,
  MOCK_EXCEPTION,
  MOCK_NOTIFICATIONS,
  MOCK_URGENT_ITEMS,
} from '@/mocks/deliveryData';

// ── Toast ─────────────────────────────────────────────────────

export interface DeliveryToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// ── Store Interface ───────────────────────────────────────────

interface DeliveryState {
  // Data
  partnerStatus: PartnerStatus;
  route: typeof MOCK_ROUTE;
  tasks: DeliveryTask[];
  codSettlement: CodSettlement;
  returns: ReturnTask[];
  exception: DeliveryException;
  notifications: typeof MOCK_NOTIFICATIONS;
  urgentItems: typeof MOCK_URGENT_ITEMS;
  toasts: DeliveryToast[];

  // Task detail state
  selectedTaskId: string | null;
  taskFilter: 'all' | 'active' | 'en_route' | 'delivered' | 'failed' | 'rescheduled';
  taskSearch: string;

  // Return pagination
  currentReturnIndex: number;

  // COD actual cash (editable by partner)
  codActualCash: number;
  codSignatureDataUrl: string | null;

  // Actions — Partner
  setPartnerStatus: (status: PartnerStatus) => void;

  // Actions — Route
  startRoute: () => void;

  // Actions — Tasks
  setSelectedTaskId: (id: string | null) => void;
  setTaskFilter: (f: DeliveryState['taskFilter']) => void;
  setTaskSearch: (q: string) => void;
  advanceTaskStep: (taskId: string) => void;
  verifyOtp: (taskId: string, otp: string) => boolean;
  submitProofOfDelivery: (taskId: string, updates: Partial<ProofOfDelivery>) => void;

  // Actions — Exception
  setExceptionCategory: (category: ExceptionCategory) => void;
  setExceptionDescription: (desc: string) => void;
  addExceptionPhoto: (url: string) => void;
  resolveException: (resolution: ExceptionResolution, slot?: string) => void;

  // Actions — COD
  setCodActualCash: (amount: number) => void;
  setCodSignature: (dataUrl: string) => void;
  confirmCodHandover: () => void;

  // Actions — Returns
  setCurrentReturnIndex: (i: number) => void;
  advanceReturnStep: (returnId: string) => void;
  setReturnPackageCondition: (returnId: string, condition: PackageCondition) => void;
  addReturnPhoto: (returnId: string, url: string) => void;
  setReturnBarcode: (returnId: string, barcode: string) => void;
  setReturnReceiver: (returnId: string, receiver: string) => void;
  confirmReturnHandover: (returnId: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Toasts
  addToast: (title: string, message: string, type?: DeliveryToast['type']) => void;
  removeToast: (id: string) => void;
}

// ── Step Progression Map ──────────────────────────────────────

const STEP_ORDER: DeliveryStep[] = [
  'assigned', 'en_route', 'arrived', 'verify', 'handover', 'payment', 'proof', 'delivered',
];

function nextStep(current: DeliveryStep): DeliveryStep {
  const idx = STEP_ORDER.indexOf(current);
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : current;
}

// ── Zustand Store ─────────────────────────────────────────────

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  partnerStatus: MOCK_PARTNER.status,
  route: { ...MOCK_ROUTE },
  tasks: MOCK_TASKS,
  codSettlement: { ...MOCK_COD_SETTLEMENT },
  returns: MOCK_RETURNS,
  exception: { ...MOCK_EXCEPTION },
  notifications: MOCK_NOTIFICATIONS,
  urgentItems: MOCK_URGENT_ITEMS,
  toasts: [],
  selectedTaskId: null,
  taskFilter: 'all',
  taskSearch: '',
  currentReturnIndex: 0,
  codActualCash: MOCK_COD_SETTLEMENT.actualCash,
  codSignatureDataUrl: null,

  setPartnerStatus: (status) => set({ partnerStatus: status }),

  startRoute: () => {
    set((s) => ({ route: { ...s.route, status: 'active' } }));
    get().addToast('Route Started', 'RT-CBE-1024 is now active. Safe travels!', 'success');
  },

  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setTaskFilter: (f) => set({ taskFilter: f }),
  setTaskSearch: (q) => set({ taskSearch: q }),

  advanceTaskStep: (taskId) => {
    set((s) => ({
      tasks: s.tasks.map((t) => {
        if (t.id !== taskId) return t;
        const next = nextStep(t.stepState);
        const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        const updates: Partial<DeliveryTask> = { stepState: next };
        if (next === 'en_route') { updates.enRouteAt = now; updates.status = 'en_route'; }
        if (next === 'arrived') { updates.arrivedAt = now; }
        if (next === 'delivered') { updates.deliveredAt = now; updates.status = 'delivered'; }
        return { ...t, ...updates };
      }),
    }));
  },

  verifyOtp: (taskId, enteredOtp) => {
    const task = get().tasks.find((t) => t.id === taskId);
    if (!task) return false;
    const valid = task.otp === enteredOtp.trim();
    if (valid) {
      set((s) => ({
        tasks: s.tasks.map((t) =>
          t.id === taskId ? { ...t, otpVerified: true } : t
        ),
      }));
      get().addToast('OTP Verified', 'Customer identity confirmed successfully.', 'success');
    } else {
      get().addToast('OTP Invalid', 'The OTP you entered is incorrect. Please try again.', 'error');
    }
    return valid;
  },

  submitProofOfDelivery: (taskId, updates) => {
    set((s) => ({
      tasks: s.tasks.map((t) => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          proofOfDelivery: { ...t.proofOfDelivery!, ...updates, submitted: true },
          status: 'delivered',
          stepState: 'delivered',
          deliveredAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
      }),
      route: { ...s.route, completedStops: s.route.completedStops + 1 },
    }));
    get().addToast('Proof Submitted', 'Delivery confirmed. Order marked as delivered.', 'success');
  },

  setExceptionCategory: (category) => {
    set((s) => ({ exception: { ...s.exception, category } }));
  },

  setExceptionDescription: (desc) => {
    set((s) => ({ exception: { ...s.exception, description: desc } }));
  },

  addExceptionPhoto: (url) => {
    set((s) => ({ exception: { ...s.exception, photos: [...s.exception.photos, url] } }));
  },

  resolveException: (resolution, slot) => {
    set((s) => ({
      exception: {
        ...s.exception,
        resolution,
        rescheduledSlot: slot,
        status: 'pending',
      },
    }));
    const msgs: Record<ExceptionResolution, string> = {
      reschedule: 'Reschedule request submitted to operations.',
      contact_support: 'Support team has been notified.',
      return: 'Package marked for return to hub.',
    };
    get().addToast('Exception Reported', msgs[resolution], 'info');
  },

  setCodActualCash: (amount) => set({ codActualCash: amount }),
  setCodSignature: (dataUrl) => set({ codSignatureDataUrl: dataUrl }),

  confirmCodHandover: () => {
    const { codActualCash, codSettlement } = get();
    const variance = codActualCash - codSettlement.expectedCash;
    set((s) => ({
      codSettlement: {
        ...s.codSettlement,
        actualCash: codActualCash,
        variance,
        status: 'closed',
        confirmedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      },
    }));
    get().addToast('Handover Confirmed', `Cash of ₹${codActualCash.toLocaleString('en-IN')} handed over successfully.`, 'success');
  },

  setCurrentReturnIndex: (i) => set({ currentReturnIndex: i }),

  advanceReturnStep: (returnId) => {
    const RETURN_STEPS: ReturnStatus[] = [
      'assigned', 'en_route', 'arrived', 'received', 'proof', 'handed_over',
    ];
    set((s) => ({
      returns: s.returns.map((r) => {
        if (r.id !== returnId) return r;
        const idx = RETURN_STEPS.indexOf(r.status);
        const next = idx < RETURN_STEPS.length - 1 ? RETURN_STEPS[idx + 1] : r.status;
        return { ...r, status: next };
      }),
    }));
  },

  setReturnPackageCondition: (returnId, condition) => {
    set((s) => ({
      returns: s.returns.map((r) => r.id === returnId ? { ...r, packageCondition: condition } : r),
    }));
  },

  addReturnPhoto: (returnId, url) => {
    set((s) => ({
      returns: s.returns.map((r) => r.id === returnId ? { ...r, photos: [...r.photos, url] } : r),
    }));
  },

  setReturnBarcode: (returnId, barcode) => {
    set((s) => ({
      returns: s.returns.map((r) => r.id === returnId ? { ...r, returnLabelBarcode: barcode } : r),
    }));
  },

  setReturnReceiver: (returnId, receiver) => {
    set((s) => ({
      returns: s.returns.map((r) => r.id === returnId ? { ...r, warehouseReceiver: receiver } : r),
    }));
  },

  confirmReturnHandover: (returnId) => {
    const handoverId = `WH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9000 + 1000)}`;
    set((s) => ({
      returns: s.returns.map((r) =>
        r.id === returnId
          ? { ...r, status: 'handed_over', handoverId, completedAt: new Date().toLocaleTimeString() }
          : r
      ),
    }));
    get().addToast('Handover Complete', `Return ${returnId} confirmed at warehouse. ID: ${handoverId}`, 'success');
  },

  markNotificationRead: (id) => {
    set((s) => ({
      notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
    }));
  },

  markAllNotificationsRead: () => {
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  },

  addToast: (title, message, type = 'info') => {
    const id = `toast-${Date.now()}`;
    set((s) => ({ toasts: [...s.toasts, { id, title, message, type }] }));
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
}));

