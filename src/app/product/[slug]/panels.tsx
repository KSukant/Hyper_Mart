"use client";
import Link from "next/link";
import { useState } from "react";
import { Leaf, CalendarClock, Ruler, Shirt, Sparkles, FlaskConical, Droplet, Cpu, Target, Plug, Home as HomeIcon, Wrench, ShieldCheck, Wallet, RefreshCw, BadgeCheck, Check, X, HelpCircle, AlertTriangle, Repeat, Package } from "lucide-react";
import type { Product, CartItem, UseCase } from "@/types";
import { Pill, Dialog, Field, inputCls, btn, toast, InfoBar, Chip } from "@/components/ui/primitives";
import { Card } from "./Card";
import { getStock, variantStock, getBrand, getProductById } from "@/lib/catalog";
import { getPrice } from "@/lib/pricing";
import { formatDate, formatINR, addDays, isoDay } from "@/lib/format";
import { useNow, useShopper } from "@/lib/hooks";
import { cn } from "@/lib/cn";

export interface Selection {
  grade?: "A" | "B" | "C"; ripeness?: "raw" | "ready_to_eat" | "very_ripe"; kg?: number; substitution?: "ask" | "skip" | "similar";
  subscription?: CartItem["subscription"]; colour?: string; size?: string; shade?: string;
}
type PanelProps = { product: Product; sel: Selection; setSel: (s: Selection) => void; part: "selectors" | "details" };
const RIPE = { raw: ["Raw", "Firm — ripens at home"], ready_to_eat: ["Ready to eat", "Just right today"], very_ripe: ["Very ripe", "Soft — for smoothies or cooking"] } as const;
const NOT_PROVIDED = "Not provided by the manufacturer";

function Option({ on, onClick, children, disabled, className }: { on?: boolean; onClick: () => void; children: React.ReactNode; disabled?: boolean; className?: string }) {
  return <button type="button" disabled={disabled} onClick={onClick} aria-pressed={on}
    className={cn("rounded-2xl p-3 text-left text-sm transition", on ? "bg-primary-tint ring-2 ring-primary" : "bg-white ring-1 ring-line hover:ring-primary/50", disabled && "opacity-40 line-through", className)}>{children}</button>;
}

/* ───────── FOOD ───────── */
export function FoodPanel({ product: p, sel, setSel, part }: PanelProps) {
  const { cityId, isMember, warehouseId } = useShopper(); const now = useNow();
  const stock = getStock(p.id, warehouseId);
  const a = p.attrs; if (a.department !== "food") return null;
  if (part === "selectors") return (
    <div className="space-y-4">
      {a.grades && (
        <div><p className="mb-2 text-sm font-bold">Quality grade</p>
          <div className="grid grid-cols-3 gap-2">{a.grades.map((g) => { const pr = getPrice(p, cityId, isMember, now, g.grade); return (
            <Option key={g.grade} on={sel.grade === g.grade} onClick={() => setSel({ ...sel, grade: g.grade })}>
              <span className="block font-bold">Grade {g.grade}</span><span className="block font-display text-base font-extrabold text-primary">{formatINR(pr.finalPrice)}/kg</span>
              <span className="mt-0.5 block text-[11px] leading-tight text-muted">{g.note}</span></Option>); })}</div></div>
      )}
      {a.ripenessOptions && (
        <div><p className="mb-2 text-sm font-bold">Ripeness</p>
          <div className="grid grid-cols-3 gap-2">{a.ripenessOptions.map((r) => <Option key={r} on={sel.ripeness === r} onClick={() => setSel({ ...sel, ripeness: r })}><span className="block font-bold">{RIPE[r][0]}</span><span className="block text-[11px] text-muted">{RIPE[r][1]}</span></Option>)}</div></div>
      )}
      {a.soldByWeight && (
        <div><p className="mb-2 text-sm font-bold">Quantity</p>
          <div className="flex flex-wrap gap-2">{a.weightOptionsKg?.map((k) => <Chip key={k} active={sel.kg === k} onClick={() => setSel({ ...sel, kg: k })}>{k < 1 ? `${k * 1000} g` : `${k} kg`}</Chip>)}</div>
          <p className="mt-2 text-sm">Estimated total <b className="text-primary">{formatINR(getPrice(p, cityId, isMember, now, sel.grade).finalPrice * (sel.kg ?? 1))}</b></p>
          <p className="text-xs text-muted">Final amount is calculated after weighing. Any difference is refunded.</p></div>
      )}
    </div>
  );
  const remain = stock.batch ? Math.max(0, Math.round((Date.parse(stock.batch.expiryDate) - now) / 864e5)) : undefined;
  return (
    <>
      <Card title="Freshness and shelf life" icon={<Leaf className="h-5 w-5" />}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-bg p-3"><p className="text-xs text-muted">Best before</p><p className="font-bold">{stock.batch ? formatDate(stock.batch.expiryDate) : "—"}</p></div>
          <div className="rounded-2xl bg-bg p-3"><p className="text-xs text-muted">Shelf life left</p><p className="font-bold">{remain !== undefined ? `${remain} days` : "—"}</p></div>
          <div className="rounded-2xl bg-bg p-3"><p className="text-xs text-muted">Storage</p><p className="font-bold capitalize">{a.storage}</p></div>
        </div>
        <p className="mt-3 text-sm text-muted">Packed after a quality check. We never send less than {a.minRemainingShelfLifeDays} days of shelf life.{a.regional && <> · <b className="text-ink">Regional speciality: {a.regional}</b></>}</p>
      </Card>
      <Card title="Ingredients, allergens and nutrition" icon={<FlaskConical className="h-5 w-5" />}>
        <p className="text-sm"><b>Ingredients: </b>{a.ingredients ?? NOT_PROVIDED}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm"><b>Allergens:</b>{a.allergens.length === 0 ? <Pill tone="green">None listed</Pill> : a.allergens.map((x) => <Pill key={x} tone={x === "Not provided" ? "grey" : "redSoft"}>{x === "Not provided" ? NOT_PROVIDED : x}</Pill>)}</div>
        {a.nutritionPer100g && <table className="mt-3 w-full max-w-sm text-sm"><tbody>{Object.entries(a.nutritionPer100g).map(([k, v]) => <tr key={k} className="border-b border-line"><td className="py-1.5 text-muted">{k}</td><td className="py-1.5 text-right font-semibold">{v}</td></tr>)}</tbody></table>}
        <p className="mt-3 text-xs text-muted">Per 100 g. HyperMart does not certify any product as allergen-free.</p>
      </Card>
      {a.substitutable && (
        <Card title="If this item is unavailable" icon={<Repeat className="h-5 w-5" />}>
          <div className="grid gap-2 sm:grid-cols-3">{([["ask", "Ask me first", "We’ll message you with options"], ["skip", "Skip and refund", "Remove it and refund"], ["similar", "Allow a similar item", "Closest match, same or lower price"]] as const).map(([v, t, d]) =>
            <Option key={v} on={sel.substitution === v} onClick={() => setSel({ ...sel, substitution: v })}><span className="block font-bold">{t}</span><span className="block text-xs text-muted">{d}</span></Option>)}</div>
        </Card>
      )}
      {a.subscribable && <SubscribeCard sel={sel} setSel={setSel} />}
    </>
  );
}

function SubscribeCard({ sel, setSel }: { sel: Selection; setSel: (s: Selection) => void }) {
  const tomorrow = isoDay(addDays(new Date(), 1));
  const sub = sel.subscription;
  return (
    <Card title="Subscribe and save" icon={<CalendarClock className="h-5 w-5" />}>
      <div className="flex flex-wrap gap-2">
        <Chip active={!sub} onClick={() => setSel({ ...sel, subscription: undefined })}>One-time</Chip>
        {(["daily", "alternate_days", "weekly"] as const).map((f) => <Chip key={f} active={sub?.frequency === f} onClick={() => setSel({ ...sel, subscription: { frequency: f, startDate: sub?.startDate ?? tomorrow } })}>{f === "alternate_days" ? "Alternate days" : f[0].toUpperCase() + f.slice(1)}</Chip>)}
      </div>
      {sub && <div className="mt-3 flex flex-wrap items-end gap-3"><Field label="Start date"><input type="date" min={tomorrow} value={sub.startDate} onChange={(e) => setSel({ ...sel, subscription: { ...sub, startDate: e.target.value } })} className={inputCls} /></Field><p className="pb-3 text-sm text-muted">Pause or skip any day before 10 PM. Billing covers delivered days only.</p></div>}
    </Card>
  );
}

/* ───────── FASHION ───────── */
export function FashionPanel({ product: p, sel, setSel, part, highlight }: PanelProps & { highlight?: boolean }) {
  const { warehouseId, city } = useShopper();
  const [chart, setChart] = useState(false); const [inch, setInch] = useState(false); const [rent, setRent] = useState(false);
  const a = p.attrs; if (a.department !== "fashion") return null;
  const rows = variantStock(p.id, warehouseId);
  if (part === "selectors") return (
    <div className="space-y-4">
      <div><p className="mb-2 text-sm"><b>Colour:</b> {sel.colour}</p>
        <div className="flex flex-wrap gap-2">{a.colours.map((c) => <button key={c.name} aria-label={c.name} aria-pressed={sel.colour === c.name} onClick={() => setSel({ ...sel, colour: c.name })} className={cn("h-10 w-10 rounded-full ring-offset-2 transition", sel.colour === c.name ? "ring-2 ring-primary" : "ring-1 ring-line")} style={{ background: c.hex }} />)}</div></div>
      <div className={cn("rounded-2xl p-2 transition", highlight && "bg-danger-tint ring-2 ring-danger")}>
        <div className="mb-2 flex items-center justify-between"><p className="text-sm font-bold">{highlight ? "Please select a size" : "Size"}</p><button className="text-sm font-semibold text-primary hover:underline" onClick={() => setChart(true)}><Ruler className="mr-1 inline h-4 w-4" />Size chart</button></div>
        <div className="flex flex-wrap gap-2">{a.sizes.map((s) => { const r = rows.find((x) => x.variantKey === `${s}|${sel.colour}`); const left = r?.available ?? 0; return (
          <button key={s} onClick={() => left > 0 ? setSel({ ...sel, size: s }) : toast(`We'll tell you when ${s} is back in ${city.name}`)} aria-pressed={sel.size === s}
            className={cn("relative min-w-12 rounded-xl px-3 py-2 text-sm font-bold transition", sel.size === s ? "bg-primary text-white" : left > 0 ? "bg-white ring-1 ring-line hover:ring-primary" : "bg-bg text-muted line-through")}>
            {s}{left > 0 && left <= 5 && <span className="absolute -right-1 -top-2 rounded-full bg-danger px-1.5 text-[10px] text-white">{left} left</span>}</button>); })}</div>
        {sel.size && (() => { const r = rows.find((x) => x.variantKey === `${sel.size}|${sel.colour}`); return r && r.available <= 5 ? <p className="mt-2 text-sm font-semibold text-danger">Only {r.available} left in {city.name}</p> : null; })()}
        {a.modelInfo && <p className="mt-2 text-xs text-muted">Model is {a.modelInfo.heightCm} cm and wears {a.modelInfo.sizeWorn}</p>}
        {a.specialtySizes?.includes("plus") && <p className="mt-1 text-xs font-semibold text-fashion">Available up to {a.sizes[a.sizes.length - 1]}</p>}
      </div>
      {a.rentable && <button className={btn("secondary", "md", "w-full")} onClick={() => setRent(true)}><Sparkles className="h-4 w-4" />Rent this outfit · {formatINR(a.rentable.perDay)}/day</button>}
      <Dialog open={chart} onClose={() => setChart(false)} title="Size chart" wide>
        <div className="mb-3 flex gap-2"><Chip active={!inch} onClick={() => setInch(false)}>cm</Chip><Chip active={inch} onClick={() => setInch(true)}>inches</Chip></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-bg">{Object.keys(a.sizeChart[0]).map((k) => <th key={k} className="px-3 py-2 text-left capitalize">{k.replace(/([A-Z])/g, " $1")}</th>)}</tr></thead>
          <tbody>{a.sizeChart.map((r) => <tr key={r.size} className="border-b border-line">{Object.entries(r).map(([k, v]) => <td key={k} className="px-3 py-2">{typeof v === "number" && inch && !k.endsWith("M") ? (v / 2.54).toFixed(1) : v}</td>)}</tr>)}</tbody></table></div>
        <p className="mt-3 text-xs text-muted">Chest: around the fullest part. Waist: around the natural waistline. Length: shoulder to hem.</p>
      </Dialog>
      {a.rentable && <RentDialog open={rent} onClose={() => setRent(false)} product={p} />}
    </div>
  );
  return (
    <>
      <FitCheck product={p} />
      <Card title="Fabric and feel" icon={<Shirt className="h-5 w-5" />}>
        <p className="mb-3 text-sm"><b>Fabric:</b> {a.fabric} · <b>Fit:</b> {a.fit}</p>
        <div className="grid gap-3 sm:grid-cols-2">{([["Softness", a.feel.softness, ["Crisp", "Medium", "Soft"]], ["Thickness", a.feel.thickness, ["Light", "Medium", "Heavy"]], ["Stretch", a.feel.stretch, ["None", "Low", "Medium", "High"]], ["Transparency", a.feel.transparency, ["Opaque", "Semi-sheer", "Sheer"]], ["Drape", a.feel.drape, ["Structured", "Regular", "Fluid"]]] as const).map(([l, v, scale]) => (
          <div key={l}><div className="mb-1 flex justify-between text-xs"><span className="font-semibold">{l}</span><span className="text-muted">{v}</span></div>
            <div className="flex gap-1">{scale.map((s) => <span key={s} className={cn("h-2 flex-1 rounded-full", scale.indexOf(v as never) >= scale.indexOf(s as never) ? "bg-fashion" : "bg-bg")} />)}</div></div>))}</div>
        <p className="mt-4 text-sm"><b>Care:</b> {a.care.join(" · ")}</p>
        {a.clearance && <InfoBar tone="offer" className="mt-3">Exchange only on clearance items.</InfoBar>}
      </Card>
    </>
  );
}

function FitCheck({ product: p }: { product: Product }) {
  const [h, setH] = useState(""); const [usual, setUsual] = useState(""); const [res, setRes] = useState<string | null>(null);
  const a = p.attrs; if (a.department !== "fashion") return null;
  const run = () => {
    const i = a.sizes.indexOf(usual);
    if (i < 0) { setRes("Choose your usual size to get a suggestion."); return; }
    const tall = Number(h) > 0 && a.modelInfo && Number(h) > a.modelInfo.heightCm + 8;
    const pick = a.fit === "Slim" && i < a.sizes.length - 1 ? a.sizes[i + 1] : a.sizes[i];
    setRes(`Suggested size: ${pick} · Confidence: ${a.fit === "Regular" ? "High" : "Medium"}${tall ? " · You're taller than our model, so it may sit a little shorter" : ""}. Suggestion only — not a guarantee.`);
  };
  return (
    <Card title="Check your fit" icon={<Ruler className="h-5 w-5" />}>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Field label="Your height (cm)"><input inputMode="numeric" value={h} onChange={(e) => setH(e.target.value.replace(/\D/g, ""))} className={inputCls} placeholder="e.g. 170" /></Field>
        <Field label="Usual size"><select value={usual} onChange={(e) => setUsual(e.target.value)} className={inputCls}><option value="">Select</option>{a.sizes.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <button className={btn("primary")} onClick={run}>Check</button>
      </div>
      {res && <InfoBar className="mt-3">{res}</InfoBar>}
    </Card>
  );
}

function RentDialog({ open, onClose, product: p }: { open: boolean; onClose: () => void; product: Product }) {
  const [f, setF] = useState({ size: "", from: "", to: "", phone: "" }); const [err, setErr] = useState<Record<string, string>>({});
  const a = p.attrs; if (a.department !== "fashion" || !a.rentable) return null;
  const submit = () => {
    const e: Record<string, string> = {};
    if (!f.size) e.size = "Choose a size"; if (!f.from) e.from = "Choose a start date"; if (!f.to || f.to <= f.from) e.to = "End date must be after the start";
    else if ((Date.parse(f.to) - Date.parse(f.from)) / 864e5 + 1 < a.rentable!.minDays) e.to = `Minimum ${a.rentable!.minDays} days`;
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a 10-digit mobile number";
    setErr(e); if (Object.keys(e).length) return;
    onClose(); toast("Rental enquiry sent. We'll confirm availability and price.");
  };
  return (
    <Dialog open={open} onClose={onClose} title="Rent this outfit">
      <p className="mb-4 text-sm text-muted">{formatINR(a.rentable.perDay)} a day · deposit {formatINR(a.rentable.deposit)} · minimum {a.rentable.minDays} days. Availability and price are confirmed by our team.</p>
      <div className="space-y-3">
        <Field label="Size" error={err.size}><select className={inputCls} value={f.size} onChange={(e) => setF({ ...f, size: e.target.value })}><option value="">Select</option>{a.sizes.map((s) => <option key={s}>{s}</option>)}</select></Field>
        <div className="grid grid-cols-2 gap-3"><Field label="From" error={err.from}><input type="date" className={inputCls} value={f.from} onChange={(e) => setF({ ...f, from: e.target.value })} /></Field><Field label="To" error={err.to}><input type="date" className={inputCls} value={f.to} onChange={(e) => setF({ ...f, to: e.target.value })} /></Field></div>
        <Field label="Mobile number" error={err.phone}><input inputMode="numeric" className={inputCls} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="98xxxxxxxx" /></Field>
        <button className={btn("primary", "lg", "w-full")} onClick={submit}>Send enquiry</button>
      </div>
    </Dialog>
  );
}

/* ───────── BEAUTY ───────── */
const TONES = ["#F3D4BE", "#E6B894", "#C99168", "#A8714B", "#83522F", "#5A361E"];
export function BeautyPanel({ product: p, sel, setSel, part }: PanelProps) {
  const { warehouseId, city } = useShopper();
  const [tone, setTone] = useState(2);
  const a = p.attrs; if (a.department !== "beauty") return null;
  const brand = getBrand(p.brandId)!;
  const evidenceOk = !brand.evidenceValidTill || Date.parse(brand.evidenceValidTill) >= Date.now();
  const shade = a.shades?.find((s) => s.code === sel.shade);
  const isLip = p.slug.includes("lipstick");
  if (part === "selectors") return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-beauty-tint p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-beauty"><BadgeCheck className="h-4 w-4" />HyperMart trust card</p>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          <li><span className="text-muted">Sold by:</span> <b>HyperMart</b></li><li><span className="text-muted">Brand:</span> <b>{brand.name}</b></li>
          {evidenceOk && <li className="sm:col-span-2 flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" />{brand.authorisedSource === "brand_direct" ? "Sourced directly from the brand" : "Sourced from authorised distributor"}</li>}
          <li className="sm:col-span-2 flex items-center gap-1.5"><Check className="h-4 w-4 text-primary" />Batch checked · Seal checked</li>
        </ul>
      </div>
      {a.shades && (
        <div><p className="mb-2 text-sm"><b>Shade:</b> {shade?.name} ({shade?.code})</p>
          <div className="flex flex-wrap gap-2">{a.shades.map((s) => { const st = getStock(p.id, warehouseId, `shade:${s.code}`); return (
            <button key={s.code} aria-label={`${s.name}${st.status === "out" ? " — out of stock" : ""}`} aria-pressed={sel.shade === s.code} onClick={() => setSel({ ...sel, shade: s.code })}
              className={cn("relative h-11 w-11 rounded-full ring-offset-2 transition", sel.shade === s.code ? "ring-2 ring-primary" : "ring-1 ring-line", st.status === "out" && "opacity-40")} style={{ background: s.hex }}>
              {st.status === "out" && <X className="absolute inset-0 m-auto h-5 w-5 text-white" />}</button>); })}</div>
          {shade && getStock(p.id, warehouseId, `shade:${shade.code}`).status === "out" && <p className="mt-2 text-sm font-semibold text-danger">{shade.name} is out of stock in {city.name}</p>}
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-card">
            <p className="mb-2 text-sm font-bold">See the shade on you</p>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 120 140" className="h-32 w-28 shrink-0" role="img" aria-label="Shade preview">
                <ellipse cx="60" cy="70" rx="44" ry="56" fill={TONES[tone]} />
                <ellipse cx="44" cy="62" rx="6" ry="4" fill="#2B1B12" /><ellipse cx="76" cy="62" rx="6" ry="4" fill="#2B1B12" />
                {isLip ? <path d="M42 98 q18 -10 36 0 q-18 14 -36 0z" fill={shade?.hex} /> : <><ellipse cx="36" cy="84" rx="12" ry="8" fill={shade?.hex} opacity=".55" /><ellipse cx="84" cy="84" rx="12" ry="8" fill={shade?.hex} opacity=".55" /><path d="M48 100 q12 6 24 0" stroke="#7A3B2E" strokeWidth="3" fill="none" /></>}
                <path d="M16 54 q4 -48 44 -48 q40 0 44 48 q-10 -26 -44 -26 q-34 0 -44 26z" fill="#2B1B12" />
              </svg>
              <div className="space-y-2"><p className="text-xs text-muted">Choose a face tone</p>
                <div className="flex flex-wrap gap-1.5">{TONES.map((t, i) => <button key={t} aria-label={`Face tone ${i + 1}`} onClick={() => setTone(i)} className={cn("h-7 w-7 rounded-full", tone === i ? "ring-2 ring-primary ring-offset-2" : "")} style={{ background: t }} />)}</div>
                <button className="text-xs font-semibold text-primary" onClick={() => toast("Photo preview is coming soon")}>Upload your photo — coming soon</button></div>
            </div>
            <p className="mt-2 text-[11px] text-muted">Preview only. Actual colour may vary with lighting, application and screen.</p>
          </div></div>
      )}
      {a.sampleProductId && <Link href={`/product/${getProductById(a.sampleProductId)!.slug}`} className="flex items-center gap-2 rounded-2xl bg-accent-tint p-3 text-sm font-semibold text-accent-text"><Droplet className="h-4 w-4" />Not sure? Try the {getProductById(a.sampleProductId)!.unit} mini first →</Link>}
      {a.fullSizeProductId && <Link href={`/product/${getProductById(a.fullSizeProductId)!.slug}`} className="flex items-center gap-2 rounded-2xl bg-accent-tint p-3 text-sm font-semibold text-accent-text"><Package className="h-4 w-4" />Get the full size ({getProductById(a.fullSizeProductId)!.unit}) →</Link>}
    </div>
  );
  return (
    <>
      <Card title="Ingredients and safety" icon={<FlaskConical className="h-5 w-5" />}>
        {(a.skinTypes || a.hairTypes) && <p className="mb-3 text-sm">Listed by the brand as suitable for: <b>{[...(a.skinTypes ?? []).map((s) => `${s} skin`), ...(a.hairTypes ?? []).map((h) => (h === "all" ? "all hair types" : `${h} hair`))].join(", ")}</b></p>}
        <p className="text-sm"><b>Key ingredients:</b> {a.keyIngredients.join(", ") || NOT_PROVIDED}</p>
        <details className="mt-2 text-sm"><summary className="cursor-pointer font-semibold text-primary">Full ingredient list</summary><p className="mt-1 text-muted">{a.ingredients}</p></details>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm"><b>Allergens:</b>{a.allergens.length ? a.allergens.map((x) => <Pill key={x} tone="redSoft">{x}</Pill>) : <Pill tone="green">None listed</Pill>}</div>
        {a.patchTest && <div className="mt-4 grid gap-2 sm:grid-cols-3">{["Apply a little behind your ear or inner arm", "Wait 24 hours", "No redness or itching? Safe to use"].map((s, i) => <div key={s} className="rounded-2xl bg-bg p-3 text-sm"><span className="mb-1 grid h-6 w-6 place-items-center rounded-full bg-beauty text-xs font-bold text-white">{i + 1}</span>{s}</div>)}</div>}
        {a.precautions.length > 0 && <p className="mt-3 text-sm"><b>Precautions:</b> {a.precautions.join(" · ")}</p>}
        {a.whoShouldAvoid && <p className="mt-1 text-sm"><b>Who should avoid:</b> {a.whoShouldAvoid.join(" · ")}</p>}
        {a.documentedConflicts?.map((c) => <InfoBar key={c} tone="warning" className="mt-3">{c}</InfoBar>)}
        <p className="mt-3 text-xs text-muted">HyperMart does not certify any product as allergen-free.</p>
      </Card>
      <Card title="How to use" icon={<Droplet className="h-5 w-5" />}>
        <div className="grid gap-3 sm:grid-cols-2">{[["Quantity", a.usage.quantity], ["How often", a.usage.frequency], ["Method", a.usage.method], ["Routine order", a.usage.order ?? NOT_PROVIDED]].map(([k, v]) => <div key={k} className="rounded-2xl bg-bg p-3"><p className="text-xs text-muted">{k}</p><p className="text-sm font-semibold">{v}</p></div>)}</div>
        {a.periodAfterOpeningMonths && <p className="mt-3 text-sm text-muted">Use within {a.periodAfterOpeningMonths} months of opening.{a.heatSensitive && " Delivered only in cool morning or evening slots."}</p>}
      </Card>
      {a.claims.length > 0 && <Card title="Product claims" icon={<Sparkles className="h-5 w-5" />}>
        <ul className="space-y-2">{a.claims.map((c) => <li key={c.text} className="flex items-start gap-2 text-sm">{c.verified ? <Check className="mt-0.5 h-4 w-4 text-primary" /> : <HelpCircle className="mt-0.5 h-4 w-4 text-muted" />}<span><b>{c.text}</b>{!c.verified && <span className="text-muted"> — brand claim, not independently verified</span>}</span></li>)}</ul>
      </Card>}
    </>
  );
}

/* ───────── ELECTRONICS ───────── */
const USE: UseCase[] = ["study", "office", "gaming", "editing", "streaming", "calls", "photography"];
export function ElectronicsPanel({ product: p }: { product: Product }) {
  const [use, setUse] = useState<UseCase | null>(null); const [model, setModel] = useState("");
  const [fit, setFit] = useState({ door: "", passage: "", w: "", h: "", d: "" }); const [fitRes, setFitRes] = useState<{ tone: "success" | "warning" | "info"; text: string } | null>(null);
  const a = p.attrs; if (a.department !== "electronics") return null;
  const verdict = use && a.bestFor?.find((b) => b.useCase === use);
  const compat = a.compatibleModels?.find((c) => c.model === model);
  const checkFit = () => {
    const narrow = Math.min(p.packedDimensionsCm.l, p.packedDimensionsCm.w); const door = Number(fit.door), pass = Number(fit.passage || fit.door);
    if (!door) { setFitRes({ tone: "info", text: "Enter at least the door width." }); return; }
    if (narrow > door || narrow > pass) { setFitRes({ tone: "warning", text: `Does not fit — the box is ${narrow} cm on its narrow side but your narrowest opening is ${Math.min(door, pass)} cm.` }); return; }
    const d = a.productDimensionsCm, c = a.clearanceCm;
    if (d && fit.w && fit.h && fit.d) {
      const need = { w: d.w + 2 * (c?.sides ?? 0), h: d.h + (c?.top ?? 0), d: d.d + (c?.back ?? 0) };
      if (Number(fit.w) < d.w || Number(fit.h) < d.h || Number(fit.d) < d.d) { setFitRes({ tone: "warning", text: "Does not fit the space you measured." }); return; }
      if (Number(fit.w) < need.w || Number(fit.h) < need.h || Number(fit.d) < need.d) { setFitRes({ tone: "info", text: `Fits with a clearance warning — the brand recommends ${need.w} × ${need.h} × ${need.d} cm including airflow space.` }); return; }
      setFitRes({ tone: "success", text: "Fits your home, including the recommended clearance." }); return;
    }
    setFitRes({ tone: "success", text: `Fits through your doors (box ${narrow} cm on its narrow side). Add the space size to check the final spot.` });
  };
  return (
    <>
      <Card title="Specifications" icon={<Cpu className="h-5 w-5" />}>
        <dl className="grid gap-x-6 sm:grid-cols-2">{a.specs.map((s) => <div key={s.label} className="flex justify-between gap-3 border-b border-line py-2 text-sm"><dt className="text-muted">{s.label}</dt><dd className="text-right font-semibold">{s.value}</dd></div>)}</dl>
        <p className="mt-2 text-xs text-muted">Model {a.model}</p>
      </Card>
      {a.refurbished && <Card title="Refurbished condition" icon={<RefreshCw className="h-5 w-5" />}>
        <div className="mb-3 flex flex-wrap gap-2"><Pill tone="dark">Grade: {a.refurbished.grade}</Pill>{a.refurbished.batteryHealthPct && <Pill tone="lime">Battery health {a.refurbished.batteryHealthPct}%</Pill>}<Pill tone="green">{a.refurbished.refurbWarrantyMonths}-month HyperMart Renewed warranty</Pill></div>
        <ul className="grid gap-1.5 sm:grid-cols-2">{a.refurbished.testedChecks.map((t) => <li key={t} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{t}</li>)}</ul>
      </Card>}
      {a.bestFor && <Card title="What will you use it for?" icon={<Target className="h-5 w-5" />}>
        <div className="flex flex-wrap gap-2">{USE.map((u) => <Chip key={u} active={use === u} onClick={() => setUse(u)}>{u[0].toUpperCase() + u.slice(1)}</Chip>)}</div>
        {use && (verdict ? <InfoBar tone={verdict.verdict === "best" ? "success" : verdict.verdict === "limited" ? "offer" : "warning"} className="mt-3"><b>{verdict.verdict === "best" ? "Best for" : verdict.verdict === "limited" ? "Suitable with limits" : "Not recommended"}</b> — {verdict.reason}</InfoBar>
          : <InfoBar className="mt-3"><b>Unknown</b> — we don’t have a verified answer for this use. Ask an advisor.</InfoBar>)}
      </Card>}
      {a.compatibleModels && <Card title="Check compatibility" icon={<Plug className="h-5 w-5" />}>
        <select value={model} onChange={(e) => setModel(e.target.value)} className={cn(inputCls, "max-w-sm")} aria-label="Your device"><option value="">Select your device</option>{a.compatibleModels.map((c) => <option key={c.model}>{c.model}</option>)}</select>
        {compat && <InfoBar tone={compat.status === "compatible" ? "success" : compat.status === "not_compatible" ? "warning" : "info"} className="mt-3">{compat.status === "compatible" ? <><b>Compatible</b> with {compat.model}</> : compat.status === "not_compatible" ? <><b>Not compatible</b> with {compat.model}</> : <><b>Unknown</b> — we don’t have confirmed compatibility for this model yet.</>}</InfoBar>}
      </Card>}
      {a.productDimensionsCm && <Card title="Will this fit your home?" icon={<HomeIcon className="h-5 w-5" />}>
        <div className="grid gap-3 sm:grid-cols-5">{([["door", "Door width"], ["passage", "Narrowest passage"], ["w", "Space width"], ["h", "Space height"], ["d", "Space depth"]] as const).map(([k, l]) => <Field key={k} label={`${l} (cm)`}><input inputMode="numeric" className={inputCls} value={fit[k]} onChange={(e) => setFit({ ...fit, [k]: e.target.value.replace(/\D/g, "") })} /></Field>)}</div>
        <button className={btn("primary", "md", "mt-3")} onClick={checkFit}>Check fit</button>
        {fitRes && <InfoBar tone={fitRes.tone} className="mt-3">{fitRes.text}</InfoBar>}
        <p className="mt-3 text-xs text-muted">Product {a.productDimensionsCm.w} × {a.productDimensionsCm.h} × {a.productDimensionsCm.d} cm · box {p.packedDimensionsCm.l} × {p.packedDimensionsCm.w} × {p.packedDimensionsCm.h} cm{a.siteRequirements && ` · ${a.siteRequirements.join(" · ")}`}</p>
      </Card>}
      <div className="grid gap-5 md:grid-cols-2">
        <Card title="Warranty" icon={<ShieldCheck className="h-5 w-5" />}>
          <p className="text-sm"><b>{a.warranty.months >= 12 ? `${a.warranty.months / 12} year` : `${a.warranty.months} months`}</b> by {a.warranty.provider} · {a.warranty.coverage}</p>
          <p className="mt-1 text-xs text-muted">Not covered: {a.warranty.exclusions.join(", ")}</p>
          <p className="mt-2 text-xs text-muted">Your digital warranty card appears in your account after delivery.</p>
        </Card>
        {a.installation && <Card title="Installation" icon={<Wrench className="h-5 w-5" />}><p className="text-sm"><b>{a.installation.fee === 0 ? "Free" : formatINR(a.installation.fee)}</b> · {a.installation.note}</p><p className="mt-1 text-xs text-muted">Book a slot at checkout.</p></Card>}
        {a.exchangeEligible && <Card title="Exchange your old device" icon={<RefreshCw className="h-5 w-5" />}><p className="text-sm text-muted">See a value range in a minute. Our team checks it at pickup and you approve the final amount.</p><Link href="/services/exchange" className={btn("secondary", "sm", "mt-3")}>Check exchange value</Link></Card>}
      </div>
      {a.ownershipCosts && <Card title="Total ownership information" icon={<Wallet className="h-5 w-5" />}>
        <table className="w-full text-sm"><thead><tr className="text-left text-xs text-muted"><th className="py-1">Item</th><th>Price</th><th className="hidden sm:table-cell">Source</th></tr></thead>
          <tbody>{a.ownershipCosts.map((c) => <tr key={c.item} className="border-t border-line"><td className="py-2">{c.item}</td><td className="font-semibold">{c.price === null ? "Not published" : c.price === 0 ? "Included" : formatINR(c.price)}</td><td className="hidden text-xs text-muted sm:table-cell">{c.source} · {formatDate(c.asOf)}</td></tr>)}</tbody></table>
      </Card>}
      {p.handling.includes("restricted_battery") && <InfoBar><AlertTriangle className="mr-1 inline h-4 w-4" />Contains a lithium battery — handled and transported under special rules.</InfoBar>}
    </>
  );
}
