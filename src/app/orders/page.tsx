"use client";
import Link from "next/link";
import { useState } from "react";
import { Package, ArrowRight } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { ProductArt } from "@/components/product/ProductArt";
import { Chip, EmptyState, LinkButton, Pill } from "@/components/ui/primitives";
import { useAllOrders, STATUS } from "@/lib/orders";
import { getProductById } from "@/lib/catalog";
import { formatDay, formatINR } from "@/lib/format";

const FILTERS = [["all", "All"], ["active", "Active"], ["delivered", "Delivered"], ["cancelled", "Cancelled"]] as const;

export default function Orders() {
  const orders = useAllOrders();
  const [f, setF] = useState<(typeof FILTERS)[number][0]>("all");
  const list = orders.filter((o) => f === "all" || (f === "active" ? !["delivered", "cancelled"].includes(o.status) : o.status === f));
  return (
    <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "My orders" }]}>
      <h1 className="mb-4 text-3xl font-extrabold">My orders</h1>
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">{FILTERS.map(([k, l]) => <Chip key={k} active={f === k} onClick={() => setF(k)}>{l}</Chip>)}</div>
      {list.length === 0 ? <EmptyState icon={<Package className="h-7 w-7" />} title="No orders here yet" action={<LinkButton href="/">Start shopping</LinkButton>} /> : (
        <ul className="space-y-3">{list.map((o) => { const [label, tone] = STATUS[o.status]; return (
          <li key={o.id}><Link href={`/orders/${o.id}`} className="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-line/60 transition hover:shadow-lift sm:p-5">
            <div className="flex -space-x-3">{o.lines.slice(0, 3).map((l) => <ProductArt key={l.productId + l.variantKey} product={getProductById(l.productId)!} className="h-14 w-14 rounded-2xl ring-4 ring-white" />)}</div>
            <div className="min-w-0 flex-1"><p className="font-bold">{o.id}</p><p className="text-sm text-muted">Placed {formatDay(o.placedAt)} · {o.lines.length} items</p></div>
            <Pill tone={tone}>{label}</Pill>
            <p className="font-display text-lg font-extrabold tabular">{formatINR(o.charges.total)}</p>
            <ArrowRight className="h-5 w-5 text-primary" />
          </Link></li>); })}</ul>
      )}
    </TaskPage>
  );
}
