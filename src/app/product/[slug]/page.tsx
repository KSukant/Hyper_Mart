import { notFound } from "next/navigation";
import { products } from "@/mocks";
import { ProductView } from "./ProductView";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = products.find((x) => x.slug === slug);
  return { title: p?.name ?? "Product", description: p?.description };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!products.some((p) => p.slug === slug)) notFound();
  return <ProductView slug={slug} />;
}
