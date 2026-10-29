"use client";
import Link from "next/link";
import { create } from "zustand";
import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { X, CheckCircle2, Info, AlertTriangle, Tag } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Buttons ── */
type Variant = "primary" | "accent" | "secondary" | "ghost" | "danger" | "white";
const VARIANT: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark shadow-sm",
  accent: "bg-accent text-accent-text hover:brightness-95 shadow-sm",
  secondary: "bg-white text-primary ring-1 ring-inset ring-primary/40 hover:bg-primary-tint",
  ghost: "text-primary hover:bg-primary-tint",
  danger: "bg-white text-danger ring-1 ring-inset ring-danger/30 hover:bg-danger-tint",
  white: "bg-white text-primary hover:bg-primary-soft shadow-sm",
};
const SIZE = { sm: "h-9 px-3 text-sm rounded-lg", md: "h-11 px-4 text-[15px] rounded-xl", lg: "h-12 px-6 text-base rounded-xl" };
export const btn = (v: Variant = "primary", s: keyof typeof SIZE = "md", extra = "") =>
  cn("inline-flex items-center justify-center gap-2 font-semibold transition disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap", VARIANT[v], SIZE[s], extra);

export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof SIZE }) {
  return <button {...rest} className={btn(variant, size, className)} />;
}
export function LinkButton({ href, variant = "primary", size = "md", className, children }: { href: string; variant?: Variant; size?: keyof typeof SIZE; className?: string; children: ReactNode }) {
  return <Link href={href} className={btn(variant, size, className)}>{children}</Link>;
}

/* ── Pills & chips ── */
const TONE = {
  lime: "bg-accent text-accent-text", green: "bg-primary-tint text-primary", white: "bg-white text-ink shadow-sm",
  red: "bg-danger text-white", redSoft: "bg-danger-tint text-danger", dark: "bg-primary text-white",
  food: "bg-food-tint text-food", fashion: "bg-fashion-tint text-fashion", beauty: "bg-beauty-tint text-beauty", electronics: "bg-electronics-tint text-electronics",
  grey: "bg-bg text-muted",
};
export type Tone = keyof typeof TONE;
export function Pill({ tone = "green", children, className, icon }: { tone?: Tone; children: ReactNode; className?: string; icon?: ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none whitespace-nowrap", TONE[tone], className)}>{icon}{children}</span>;
}
export function Chip({ active, onClick, children, icon, className }: { active?: boolean; onClick?: () => void; children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={cn("inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
        active ? "bg-primary text-white shadow-sm" : "bg-white text-ink ring-1 ring-inset ring-line hover:ring-primary/50", className)}>
      {icon}{children}
    </button>
  );
}

/* ── Section heading ── */
export function SectionHeading({ eyebrow, title, subtitle, right, id, light }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; right?: ReactNode; id?: string; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && <p className={cn("mb-1 text-xs font-bold uppercase tracking-[0.18em] phone-short:hidden", light ? "text-accent" : "text-primary")}>{eyebrow}</p>}
        <h2 id={id} className={cn("text-2xl font-extrabold leading-tight sm:text-3xl short:sm:text-2xl", light ? "text-white" : "text-ink")}>{title}</h2>
        {subtitle && <p className={cn("mt-1 text-sm sm:text-base tiny:hidden", light ? "text-white/75" : "text-muted")}>{subtitle}</p>}
      </div>
      {right && <div className="flex items-center gap-2">{right}</div>}
    </div>
  );
}

/* ── Info bar ── */
export function InfoBar({ tone = "info", children, action, className }: { tone?: "info" | "offer" | "warning" | "success"; children: ReactNode; action?: ReactNode; className?: string }) {
  const t = { info: ["bg-primary-tint text-primary", Info], offer: ["bg-accent-tint text-accent-text", Tag], warning: ["bg-danger-tint text-danger", AlertTriangle], success: ["bg-primary-tint text-primary", CheckCircle2] } as const;
  const [cls, Icon] = t[tone];
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl px-4 py-3 text-sm", cls, className)} role={tone === "warning" ? "alert" : undefined}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div className="flex-1">{children}</div>
      {action}
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center shadow-card">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary-tint text-primary">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      {children && <div className="text-sm text-muted">{children}</div>}
      {action}
    </div>
  );
}

/* ── Toasts ── */
interface Toast { id: number; text: string; href?: string; linkLabel?: string }
const useToasts = create<{ list: Toast[]; push: (t: Omit<Toast, "id">) => void; drop: (id: number) => void }>((set, get) => ({
  list: [], push: (t) => { const id = Date.now() + Math.random(); set({ list: [...get().list, { ...t, id }] }); setTimeout(() => get().drop(id), 3200); },
  drop: (id) => set({ list: get().list.filter((x) => x.id !== id) }),
}));
export const toast = (text: string, href?: string, linkLabel?: string) => useToasts.getState().push({ text, href, linkLabel });
export function Toaster() {
  const list = useToasts((s) => s.list);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[80] flex flex-col items-center gap-2 px-4 md:bottom-auto md:right-6 md:top-24 md:items-end" aria-live="polite">
      {list.map((t) => (
        <div key={t.id} className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-pop animate-fade-up">
          <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden />{t.text}
          {t.href && <Link href={t.href} className="font-semibold text-accent underline-offset-2 hover:underline">{t.linkLabel ?? "View"}</Link>}
        </div>
      ))}
    </div>
  );
}

/* ── Dialog (modal) ── */
export function Dialog({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
        className={cn("max-h-[90svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-pop outline-none sm:rounded-3xl animate-fade-up", wide ? "sm:max-w-2xl" : "sm:max-w-md")}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-bg"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Form field ── */
export function Field({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-semibold text-ink">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-danger">{error}</span>}
    </label>
  );
}
export const inputCls = "h-11 w-full rounded-xl border border-line bg-white px-3 text-[15px] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
