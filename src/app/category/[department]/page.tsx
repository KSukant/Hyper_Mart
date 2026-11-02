import { notFound } from "next/navigation";
import { Suspense } from "react";
import { departments } from "@/mocks";
import { DepartmentView } from "./DepartmentView";
import { FreshJourneyView } from "@/components/grocery/FreshJourneyView";

export function generateStaticParams() { return departments.map((d) => ({ department: d.id })); }
export async function generateMetadata({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  const dept = departments.find((d) => d.id === department);
  if (department === "food") {
    return {
      title: "HyperMart Fresh Journey — Food & Groceries",
      description: "From local farms to your kitchen — pure, graded, everyday fresh.",
    };
  }
  return { title: dept?.name ?? "Category" };
}
export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<{ department: string }> }) {
  const { department } = await params;
  if (!departments.some((d) => d.id === department)) notFound();

  if (department === "food") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FFF9EB] animate-pulse" />}>
        <FreshJourneyView />
      </Suspense>
    );
  }

  return <Suspense><DepartmentView department={department as "fashion" | "electronics" | "beauty"} /></Suspense>;
}
