import { SearchX, ArrowRight } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { LinkButton } from "@/components/ui/primitives";
export default function NotFound() {
  return (
    <TaskPage wide={false}>
      <div className="mt-10 flex flex-col items-center gap-4 rounded-4xl bg-primary p-10 text-center text-white shadow-pop">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-accent-text"><SearchX className="h-9 w-9" /></span>
        <p className="font-display text-6xl font-extrabold text-accent">404</p>
        <h1 className="text-2xl font-extrabold">This page took a wrong turn</h1>
        <p className="max-w-md text-white/75">The link may be old, or the page has moved. Let’s get you back to shopping.</p>
        <div className="flex flex-wrap justify-center gap-2"><LinkButton href="/" variant="accent" size="lg">Go to Home <ArrowRight className="h-4 w-4" /></LinkButton><LinkButton href="/search" variant="white" size="lg">Search products</LinkButton></div>
      </div>
    </TaskPage>
  );
}
