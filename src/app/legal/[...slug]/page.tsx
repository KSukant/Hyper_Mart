import { ComingSoon } from "@/components/layout/TaskPage";
const T: Record<string, string> = { grievance: "Grievance officer", privacy: "Privacy policy", returns: "Return policy", terms: "Terms of use" };
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) { const { slug } = await params; return <ComingSoon title={T[slug[0]] ?? "Legal"} />; }
