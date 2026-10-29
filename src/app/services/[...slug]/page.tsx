import { ComingSoon } from "@/components/layout/TaskPage";
const T: Record<string, string> = { electronics: "Installation and repairs", exchange: "Exchange your old device" };
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; return <ComingSoon title={T[slug[0]] ?? "Services"} />; }
