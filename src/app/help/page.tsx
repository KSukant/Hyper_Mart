import Link from "next/link";
import { Truck, RotateCcw, FileText, Phone, Wallet, Snowflake } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { deliveryRules, codRules } from "@/mocks";
import { formatINR } from "@/lib/format";
export const metadata = { title: "Help" };
export default function Help() {
  const faqs = [
    ["How much is delivery?", `Delivery is free above ${formatINR(deliveryRules.freeDeliveryThreshold)} (${formatINR(deliveryRules.memberFreeDeliveryThreshold)} for Rewards members). Chilled and frozen items add a ${formatINR(deliveryRules.coldChainFee)} cold-chain fee.`],
    ["Can I pay cash on delivery?", `Yes, for orders up to ${formatINR(codRules.maxOrderValue)} with a ${formatINR(codRules.fee)} fee. Orders above ${formatINR(codRules.confirmationAbove)} are confirmed on WhatsApp first.`],
    ["What if an item is out of stock?", "For groceries we ask you first by default. You can choose to skip and refund, or allow a similar item, for each line in your cart."],
    ["Where do you deliver from?", "From our city warehouses, with our own delivery team. Delivery dates depend on your pincode."],
  ];
  const cards = [[Truck, "Delivery", "/help/delivery"], [RotateCcw, "Returns", "/help/returns"], [FileText, "Invoices", "/help/invoice"], [Phone, "Contact us", "/help/contact"]] as const;
  return (
    <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "Help" }]}>
      <div className="mb-6 rounded-4xl bg-primary p-8 text-white shadow-pop"><h1 className="text-3xl font-extrabold">How can we <span className="text-accent">help?</span></h1><p className="text-white/75">Answers about delivery, payment and returns.</p></div>
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">{cards.map(([I, t, h]) => <Link key={h} href={h} className="flex flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center font-bold shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-text"><I className="h-5 w-5" /></span>{t}</Link>)}</div>
      <h2 className="mb-3 text-xl font-extrabold">Common questions</h2>
      <div className="space-y-3">{faqs.map(([q, a], i) => <details key={q} className="group rounded-2xl bg-white p-5 shadow-card" open={i === 0}><summary className="flex cursor-pointer items-center gap-3 font-bold">{i === 0 ? <Truck className="h-4 w-4 text-primary" /> : i === 1 ? <Wallet className="h-4 w-4 text-primary" /> : i === 2 ? <RotateCcw className="h-4 w-4 text-primary" /> : <Snowflake className="h-4 w-4 text-primary" />}{q}</summary><p className="mt-2 text-sm text-muted">{a}</p></details>)}</div>
    </TaskPage>
  );
}
