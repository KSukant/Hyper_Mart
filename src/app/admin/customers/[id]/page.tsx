import { redirect } from "next/navigation";

export default async function AdminCustomerDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/portal/customers/${id}`);
}
