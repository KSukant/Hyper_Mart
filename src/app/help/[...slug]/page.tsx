import { ComingSoon } from "@/components/layout/TaskPage";
const T: Record<string, string> = { contact: "Contact support", delivery: "Delivery help", invoice: "Invoices", returns: "Returns and refunds" };
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; return <ComingSoon title={T[slug[0]] ?? "Help"} />; }
