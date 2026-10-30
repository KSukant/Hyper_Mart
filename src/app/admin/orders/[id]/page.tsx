import { redirect } from "next/navigation";

export default async function AdminOrderDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/portal/orders/${id}`);
}
