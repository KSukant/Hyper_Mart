import { redirect } from "next/navigation";

export default function AdminPaymentsRedirect() {
  redirect("/portal/payment-ledger");
}
