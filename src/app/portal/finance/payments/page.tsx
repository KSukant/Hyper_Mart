import { redirect } from "next/navigation";

export default function FinancePaymentsRedirect() {
  redirect("/portal/payment-ledger");
}

