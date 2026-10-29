import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "HyperMart Operations Hub",
    template: "%s | HyperMart Operations Hub",
  },
  description: "Enterprise Operations Command, Inventory, Fulfillment and Governance Portal",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
