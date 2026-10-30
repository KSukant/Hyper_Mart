export type PortalStatus = "active" | "coming_soon" | "maintenance";

export interface PortalConfig {
  id: string;
  name: string;
  description: string;
  iconName: "ShoppingCart" | "Shield" | "Headphones" | "CreditCard" | "Warehouse" | "Truck" | "BarChart3";
  image: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  status: PortalStatus;
  destination: string;
  permissionRequired?: string;
  row: 1 | 2;
}

/**
 * HyperMart Unified Portal Registry.
 * Configuration-driven workspace registry driving the unified landing page gateway.
 */
export const PORTAL_REGISTRY: PortalConfig[] = [
  {
    id: "customer",
    name: "Customer Portal",
    description: "Shop, track orders, manage account and more.",
    iconName: "ShoppingCart",
    image: "/landing/card-customer.jpg",
    accentColor: "#20A065",
    accentBg: "#E8F8F0",
    accentBorder: "#C5F0DA",
    accentText: "#0B5132",
    status: "active",
    destination: "/shop",
    permissionRequired: "customer:access",
    row: 1,
  },
  {
    id: "admin",
    name: "Admin Portal",
    description: "Platform management, users, inventory and settings.",
    iconName: "Shield",
    image: "/landing/card-admin.jpg",
    accentColor: "#E59819",
    accentBg: "#FEF4E5",
    accentBorder: "#FDE1B5",
    accentText: "#B45309",
    status: "active",
    destination: "/admin/login?portal=admin",
    permissionRequired: "admin:access",
    row: 1,
  },
  {
    id: "support",
    name: "Support Portal",
    description: "Customer cases, returns, warranty and resolutions.",
    iconName: "Headphones",
    image: "/landing/card-support.jpg",
    accentColor: "#51A2E4",
    accentBg: "#EBF7FD",
    accentBorder: "#BAE4F9",
    accentText: "#0284C7",
    status: "active",
    destination: "/portal/support",
    permissionRequired: "support:agent",
    row: 1,
  },
  {
    id: "finance",
    name: "Finance Portal",
    description: "Payments, refunds, reconciliation and reports.",
    iconName: "CreditCard",
    image: "/landing/card-finance.jpg",
    accentColor: "#E85955",
    accentBg: "#FEEFEF",
    accentBorder: "#FDC8C8",
    accentText: "#DC2626",
    status: "active",
    destination: "/portal/payment-ledger",
    permissionRequired: "finance:auditor",
    row: 1,
  },
  {
    id: "warehouse",
    name: "Warehouse Manager",
    description: "Inventory, fulfilment and warehouse operations.",
    iconName: "Warehouse",
    image: "/landing/card-warehouse.jpg",
    accentColor: "#8B5CF6",
    accentBg: "#F3EFFB",
    accentBorder: "#E1D7F7",
    accentText: "#7C3AED",
    status: "coming_soon",
    destination: "/portal/inventory",
    permissionRequired: "warehouse:manager",
    row: 2,
  },
  {
    id: "delivery",
    name: "Delivery Partner",
    description: "Deliveries, routes and partner management.",
    iconName: "Truck",
    image: "/landing/card-delivery.jpg",
    accentColor: "#10B981",
    accentBg: "#E8F8F0",
    accentBorder: "#C5F0DA",
    accentText: "#059669",
    status: "coming_soon",
    destination: "/portal/dispatches",
    permissionRequired: "delivery:partner",
    row: 2,
  },
  {
    id: "operations",
    name: "Operations Manager",
    description: "End-to-end operations and business insights.",
    iconName: "BarChart3",
    image: "/landing/card-operations.jpg",
    accentColor: "#3B82F6",
    accentBg: "#EBF5FB",
    accentBorder: "#C5E3F7",
    accentText: "#2563EB",
    status: "active",
    destination: "/portal",
    permissionRequired: "operations:manager",
    row: 2,
  },
];
