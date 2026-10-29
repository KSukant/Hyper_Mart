"use client";
import { useState } from "react";
import { MapPin, LocateFixed, ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { useLocation } from "@/store";
import { getPincodeArea, getCity } from "@/lib/catalog";
import { Dialog, toast, inputCls, btn } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export function PincodeForm({ onDone, compact }: { onDone?: () => void; compact?: boolean }) {
  const { pincode, setPincode, recent } = useLocation();
  const [val, setVal] = useState(pincode);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const check = (pin = val) => {
    if (!/^\d{6}$/.test(pin)) { setMsg({ ok: false, text: "Enter a 6-digit pincode" }); return; }
    const a = getPincodeArea(pin);
    if (!a.serviceable) { setMsg({ ok: false, text: `We don't deliver to ${pin} yet.` }); return; }
    setPincode(pin); setVal(pin);
    setMsg({ ok: true, text: `Delivered from our ${getCity(a.cityId)!.name} warehouse · ${a.area}` });
    onDone?.();
  };
  return (
    <div className="space-y-3">
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); check(); }}>
        <label className="relative flex-1">
          <span className="sr-only">Pincode</span>
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
          <input value={val} onChange={(e) => setVal(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="Enter pincode" className={cn(inputCls, "pl-9")} />
        </label>
        <button className={btn("primary")}>Check</button>
      </form>
      {!compact && <button type="button" onClick={() => toast("Location detection is coming soon")} className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><LocateFixed className="h-4 w-4" />Use my location</button>}
      {msg && (
        <div className={cn("flex items-start gap-2 rounded-xl px-3 py-2 text-sm", msg.ok ? "bg-primary-tint text-primary" : "bg-danger-tint text-danger")}>
          {msg.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertTriangle className="mt-0.5 h-4 w-4" />}
          <div>{msg.text}{!msg.ok && msg.text.startsWith("We don't") && <button type="button" className="ml-2 font-semibold underline" onClick={() => toast("We'll let you know when we arrive")}>Notify me</button>}</div>
        </div>
      )}
      {!compact && recent.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">Recent:
          {recent.map((r) => <button key={r} type="button" onClick={() => check(r)} className="rounded-full bg-bg px-3 py-1 font-semibold text-ink hover:bg-primary-tint">{r}</button>)}
        </div>
      )}
      {!compact && <p className="text-xs text-muted">Try 641004 (Coimbatore), 600017 (Chennai), 560034 (Bengaluru), 682024 (Kochi).</p>}
    </div>
  );
}

export function LocationButton({ variant = "pill" }: { variant?: "pill" | "line" | "link" }) {
  const [open, setOpen] = useState(false);
  const { pincode, cityId } = useLocation();
  const city = getCity(cityId)?.name;
  return (
    <>
      {variant === "pill" ? (
        <button onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-primary-tint px-3 py-1.5 text-left transition hover:bg-accent-tint">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="leading-tight"><span className="block text-[11px] text-muted">Deliver to</span><span className="block text-sm font-bold text-ink">{pincode}<span className="hidden xl:inline"> · {city}</span></span></span>
          <ChevronDown className="h-4 w-4 text-primary" />
        </button>
      ) : variant === "link" ? (
        <button onClick={() => setOpen(true)} className="text-xs font-bold text-primary hover:underline">Change</button>
      ) : (
        <button onClick={() => setOpen(true)} className="flex w-full items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-primary" />Deliver to <b className="text-ink">{pincode} · {city}</b><ChevronDown className="h-3.5 w-3.5" />
        </button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)} title="Where should we deliver?">
        <PincodeForm onDone={() => setTimeout(() => setOpen(false), 900)} />
      </Dialog>
    </>
  );
}
