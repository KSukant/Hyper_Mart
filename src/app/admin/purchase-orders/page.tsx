import { redirect } from "next/navigation";

export default function AdminPurchaseOrdersRedirect() {
  redirect("/portal/purchase-orders");
}
