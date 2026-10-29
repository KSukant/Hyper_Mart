import { ComingSoon } from "@/components/layout/TaskPage";
const T: Record<string, string> = { rewards: "HyperMart Rewards", subscriptions: "My subscriptions", "beauty-routine": "My beauty routine", orders: "Buy again", addresses: "Saved addresses", "fit-profile": "Fit profile", devices: "My devices" };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ComingSoon title={T[slug] ?? "My account"} />; }
