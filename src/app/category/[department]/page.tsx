import { notFound } from "next/navigation";
import { Suspense } from "react";
import { departments } from "@/mocks";
import { DepartmentView } from "./DepartmentView";

export function generateStaticParams() { return departments.map((d) => ({ department: d.id })); }
export async function generateMetadata({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  return { title: departments.find((d) => d.id === department)?.name ?? "Category" };
}
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  if (!departments.some((d) => d.id === department)) notFound();
  return <Suspense><DepartmentView department={department as "food" | "fashion" | "electronics" | "beauty"} /></Suspense>;
}
