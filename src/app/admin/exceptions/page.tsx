import { redirect } from "next/navigation";

export default function AdminExceptionsRedirect() {
  redirect("/portal/exceptions");
}
