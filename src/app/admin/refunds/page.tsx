import { redirect } from "next/navigation";

export default function AdminRefundsRedirect() {
  redirect("/portal/refund-processing");
}
