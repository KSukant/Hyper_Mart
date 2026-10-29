"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "operations_manager" | "warehouse_manager" | "catalogue_editor" | "support_agent" | "restricted_operator";
  roleLabel: string;
  avatarText: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
  allowedPortals: string[];
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: "critical" | "high" | "medium" | "info";
  href: string;
  read: boolean;
}

export interface OperationalSettings {
  freeDeliveryThreshold: number;
  autoRefundWindowDays: number;
  returnWindowDays: number;
  autoApproveDeliveredRefunds: boolean;
  requireApprovalHighValueRefunds: boolean;
  highValueThreshold: number;
}

export interface AdminToast {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
}

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-01",
    name: "Priya S.",
    email: "priya.s@hypermart.com",
    role: "operations_manager",
    roleLabel: "Operations Manager",
    avatarText: "P",
    twoFactorEnabled: true,
    lastLogin: "Today, 10:24 AM",
    allowedPortals: ["operations", "catalog", "inventory", "orders", "reports"],
  },
  {
    id: "usr-02",
    name: "Dev K.",
    email: "dev.k@hypermart.com",
    role: "super_admin",
    roleLabel: "Super Admin",
    avatarText: "DK",
    twoFactorEnabled: true,
    lastLogin: "Today, 12:41 PM",
    allowedPortals: ["operations", "catalog", "inventory", "orders", "finance", "governance", "reports"],
  },
  {
    id: "usr-03",
    name: "Arjun M.",
    email: "arjun.m@hypermart.com",
    role: "warehouse_manager",
    roleLabel: "Warehouse Manager",
    avatarText: "AM",
    twoFactorEnabled: true,
    lastLogin: "Today, 08:17 AM",
    allowedPortals: ["operations", "inventory", "orders"],
  },
  {
    id: "usr-04",
    name: "Riya A.",
    email: "riya.a@hypermart.com",
    role: "support_agent",
    roleLabel: "Support Agent",
    avatarText: "RA",
    twoFactorEnabled: false,
    lastLogin: "Yesterday, 19:06 PM",
    allowedPortals: ["orders", "support", "refunds"],
  },
  {
    id: "usr-05",
    name: "Jordan Diaz",
    email: "jordan.d@hypermart.com",
    role: "restricted_operator",
    roleLabel: "Operations Team",
    avatarText: "JD",
    twoFactorEnabled: false,
    lastLogin: "Today, 07:45 AM",
    allowedPortals: ["assigned_workspace_only"],
  },
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-1",
    title: "5 orders at delivery risk",
    message: "Orders may miss expected 2-hour window in Chennai FC.",
    timestamp: "10 mins ago",
    severity: "critical",
    href: "/admin/exceptions",
    read: false,
  },
  {
    id: "notif-2",
    title: "High-value refund awaiting sign-off",
    message: "Refund #RF-99012 for ₹2,499 requires Super Admin approval.",
    timestamp: "24 mins ago",
    severity: "high",
    href: "/admin/refunds",
    read: false,
  },
  {
    id: "notif-3",
    title: "Stock Alert: Tide Laundry Detergent 1kg",
    message: "Only 8 units remaining at Main WH. Reorder level: 50.",
    timestamp: "1 hour ago",
    severity: "high",
    href: "/admin/inventory/alerts",
    read: false,
  },
  {
    id: "notif-4",
    title: "ZenSound Z5 SKU submitted for review",
    message: "New audio product awaiting regulatory and brand QA.",
    timestamp: "3 hours ago",
    severity: "info",
    href: "/admin/approvals",
    read: true,
  },
];

interface AdminState {
  currentUser: AdminUser;
  activeFacility: "Coimbatore DC" | "Chennai FC" | "All Facilities";
  currentFacility: "Coimbatore DC" | "Chennai FC" | "All Facilities";
  currentRole: string;
  sidebarCollapsed: boolean;
  notifications: AdminNotification[];
  settings: OperationalSettings;
  searchOpen: boolean;
  toasts: AdminToast[];

  // Actions
  setCurrentUser: (user: AdminUser) => void;
  setActiveFacility: (facility: "Coimbatore DC" | "Chennai FC" | "All Facilities") => void;
  setFacility: (facility: "Coimbatore DC" | "Chennai FC" | "All Facilities") => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateSettings: (settings: Partial<OperationalSettings>) => void;
  setSearchOpen: (open: boolean) => void;
  addToast: (toast: Omit<AdminToast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      currentUser: ADMIN_USERS[0], // Default: Priya S.
      activeFacility: "Coimbatore DC",
      currentFacility: "Coimbatore DC",
      currentRole: "operations_manager",
      sidebarCollapsed: false,
      notifications: INITIAL_NOTIFICATIONS,
      settings: {
        freeDeliveryThreshold: 499,
        autoRefundWindowDays: 5,
        returnWindowDays: 7,
        autoApproveDeliveredRefunds: true,
        requireApprovalHighValueRefunds: true,
        highValueThreshold: 5000,
      },
      searchOpen: false,
      toasts: [],

      setCurrentUser: (user) => set({ currentUser: user, currentRole: user.role }),
      setActiveFacility: (facility) => set({ activeFacility: facility, currentFacility: facility }),
      setFacility: (facility) => set({ activeFacility: facility, currentFacility: facility }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setSearchOpen: (open) => set({ searchOpen: open }),
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }));
        // Auto-remove after 4 seconds
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, 4000);
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "hypermart-admin-store",
    }
  )
);
