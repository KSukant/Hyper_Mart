import { cn } from "@/lib/cn";

export function Card({ title, icon, children, className }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-3xl bg-white p-5 shadow-card ring-1 ring-line/50 sm:p-6", className)}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold">{icon && <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-tint text-primary">{icon}</span>}{title}</h2>
      {children}
    </section>
  );
}

