"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Truck,
  CreditCard,
  ClipboardCheck,
  Check,
  ChevronLeft,
  Wrench,
  Gift,
  Loader2,
  AlertTriangle,
  Clock,
  Snowflake,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Apple,
  FileText,
} from "lucide-react";
import type { SavedAddress } from "@/types";
import { TaskPage } from "@/components/layout/TaskPage";
import { ProductArt } from "@/components/product/ProductArt";
import { Field, inputCls, btn, InfoBar, Pill, EmptyState, LinkButton, toast } from "@/components/ui/primitives";
import { useCartView, variantLabel } from "@/components/cart/shared";
import { demoCustomers, paymentMethods } from "@/mocks";
import { useCart, useOrders, type PlacedOrder } from "@/store";
import {
  getAvailableSlots,
  getCartCharges,
  codBlockReason,
  codNeedsConfirmation,
  getDeliveryPromise,
} from "@/lib/delivery";
import { getPincodeArea, getCity, getReturnPolicy } from "@/lib/catalog";
import { formatDay, formatINR, addDays, isoDay } from "@/lib/format";
import { cn } from "@/lib/cn";

const STEPS = [
  { k: "address", l: "Address", stepNum: 1 },
  { k: "delivery", l: "Delivery", stepNum: 2 },
  { k: "review", l: "Review", stepNum: 3 },
  { k: "payment", l: "Payment", stepNum: 4 },
  { k: "confirmation", l: "Confirmation", stepNum: 5 },
] as const;

type Pay = (typeof paymentMethods)[number]["id"];

export default function Checkout() {
  const router = useRouter();
  const v = useCartView();
  const clear = useCart((s) => s.clear);
  const addOrder = useOrders((s) => s.addOrder);
  const [step, setStep] = useState(0);

  const demo = demoCustomers[0].addresses;
  const [addr, setAddr] = useState<SavedAddress | null>(demo[0] ?? null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    area: "",
    landmark: "",
    pincode: v.area.pincode,
    building: "apartment",
    floor: "",
    lift: true,
    gate: "",
    doorstep: false,
    note: "",
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const [slots, setSlots] = useState<Record<string, { date: string; slot: string }>>({});
  const [install, setInstall] = useState("");
  const [gift, setGift] = useState<{ on: boolean; name: string; msg: string; hide: boolean }>({
    on: false,
    name: "",
    msg: "",
    hide: true,
  });
  const [pay, setPay] = useState<Pay>("upi");
  const [upi, setUpi] = useState("");
  const [ack, setAck] = useState(true);
  const [state, setState] = useState<"idle" | "processing" | "failed" | "pending">("idle");

  if (v.valid.length === 0 && state === "idle") {
    return (
      <TaskPage crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}>
        <EmptyState
          icon={<Truck className="h-7 w-7" />}
          title="Nothing to check out"
          action={<LinkButton href="/">Start shopping</LinkButton>}
        />
      </TaskPage>
    );
  }

  if (v.charges.belowMinimum > 0 && state === "idle") {
    return (
      <TaskPage crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}>
        <EmptyState
          icon={<AlertTriangle className="h-7 w-7" />}
          title={`Add ${formatINR(v.charges.belowMinimum)} more to place an order`}
          action={<LinkButton href="/cart">Back to cart</LinkButton>}
        >
          <p className="text-sm text-muted">The minimum order is ₹99.</p>
        </EmptyState>
      </TaskPage>
    );
  }

  const items = v.valid.map((l) => l.it);
  const needsAccess = v.valid.some((l) =>
    l.p.handling.some((h) => h === "heavy" || h === "two_person")
  );
  const needsInstall = v.valid.some(
    (l) => l.p.attrs.department === "electronics" && l.p.attrs.installation
  );
  const base = getCartCharges(items, v.area, v.cityId, v.isMember, v.now, { giftWrap: gift.on });
  const codReason = codBlockReason(items, base.total, v.cityId, v.now);
  const charges = getCartCharges(items, v.area, v.cityId, v.isMember, v.now, {
    cod: pay === "cod",
    giftWrap: gift.on,
  });

  const shipments = [...v.groups.entries()].map(([label, ls]) => {
    const first = getDeliveryPromise(ls[0].p, v.area, new Date(v.now));
    const start = first.date ?? isoDay(new Date(v.now));
    const dates = [0, 1, 2].map((n) =>
      isoDay(addDays(new Date(start + "T12:00:00+05:30"), n))
    );
    return { label, ls, dates };
  });

  const saveAddress = () => {
    if (addr) {
      setStep(1);
      return;
    }
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Enter the recipient's name";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a 10-digit mobile number";
    if (form.line1.trim().length < 4) e.line1 = "Enter house/flat and building";
    if (form.area.trim().length < 2) e.area = "Enter the area";
    const a = getPincodeArea(form.pincode);
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
    else if (!a.serviceable) e.pincode = `We don't deliver to ${form.pincode} yet`;
    else if (a.cityId !== v.cityId)
      e.pincode = `This pincode is in ${getCity(a.cityId)?.name}. Your cart is priced for ${v.city.name} — change your delivery city from the header first.`;
    setErr(e);
    if (Object.keys(e).length) return;
    setAddr({
      id: "new",
      label: "Home",
      name: form.name,
      phone: "+91 " + form.phone,
      line1: form.line1,
      landmark: form.landmark,
      area: form.area,
      city: v.city.name,
      state: v.city.state,
      pincode: form.pincode,
      access: {
        buildingType: form.building as "apartment",
        floor: form.floor ? Number(form.floor) : undefined,
        lift: form.lift,
        gateNote: form.gate || undefined,
        doorstepHandover: form.doorstep,
        accessibilityNote: form.note || undefined,
      },
    });
    setStep(1);
  };

  const deliveryOk =
    shipments.every((s) => slots[s.label]?.slot || true) &&
    (!needsInstall || install) &&
    (!gift.on || (gift.name.trim() && gift.msg.length <= 150));
  const payOk = pay === "upi" ? upi.trim().length >= 3 : pay === "cod" ? !codReason : true;
  const [errorMessage, setErrorMessage] = useState("");

  const place = async () => {
    if (state === "processing") return;
    setState("processing");
    setErrorMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          pincode: v.area.pincode,
          cityId: v.cityId,
          isMember: v.isMember,
          paymentMethod: pay,
          upiId: upi,
          address: addr!,
          slot: {
            date: slots[shipments[0]?.label]?.date ?? shipments[0]?.dates[0] ?? isoDay(new Date()),
            slotId: slots[shipments[0]?.label]?.slot ?? "s1",
          },
          gift: gift.on ? { recipientName: gift.name, message: gift.msg, hidePrice: gift.hide } : undefined,
          installationSlot: install || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setState("failed");
        const errText = data.error || "Payment verification failed. Please try again.";
        setErrorMessage(errText);
        toast(errText);
        return;
      }

      if (data.paymentStatus === "pending") {
        setState("pending");
        addOrder(data.order);
        clear();
        toast("Payment pending bank confirmation", `/orders/${data.order.id}`, "View order");
        setTimeout(() => {
          router.push(`/orders/${data.order.id}`);
        }, 1500);
        return;
      }

      // Successful order placement
      setState("idle");
      addOrder(data.order);
      clear();
      toast("Order placed successfully!", `/orders/${data.order.id}`, "View order");
      router.push(`/orders/${data.order.id}`);
    } catch (err: unknown) {
      setState("failed");
      const msg = err instanceof Error ? err.message : "Network error during checkout verification";
      setErrorMessage(msg);
      toast(msg);
    }
  };

  const groceryItems = v.valid.filter((l) => l.p.department === "food");
  const otherItems = v.valid.filter((l) => l.p.department !== "food");

  return (
    <TaskPage crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}>
      {/* ── Mobile Compact Stepper (< 640px) ── */}
      <div className="sm:hidden mb-4 rounded-2xl bg-white p-3.5 border border-line shadow-2xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-extrabold text-ink">
            Step {step + 1} of 5: {STEPS[step].l}
          </span>
          <span className="font-mono text-muted text-[11px]">
            {Math.round(((step + 1) / 5) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Screen 8: 5-Step Checkout Header Bar (>= 640px) ── */}
      <div className="hidden sm:block mb-6">
        <div className="flex items-center justify-center gap-2 sm:gap-6">
          {STEPS.map((s, i) => (
            <div key={s.k} className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                disabled={i > step}
                onClick={() => setStep(i)}
                className="flex items-center gap-2 text-xs font-bold transition"
              >
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-full text-xs font-black",
                    i < step
                      ? "bg-black text-white"
                      : i === step
                      ? "bg-black text-white"
                      : "border border-line text-muted"
                  )}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : s.stepNum}
                </span>
                <span
                  className={cn(
                    "hidden sm:inline",
                    i === step ? "font-extrabold text-ink" : "text-muted"
                  )}
                >
                  {s.l}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="h-0.5 w-6 sm:w-12 bg-line" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
          {step === 2 ? "Review your order" : "Checkout"}
        </h1>
        <p className="mt-1 text-xs text-muted sm:text-sm">
          One checkout for everything in your cart — groceries and more.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 pb-28 lg:pb-0">
        <div className="lg:col-span-8 space-y-5">
          {/* STEP 0: ADDRESS */}
          {step === 0 && (
            <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm sm:p-6 space-y-5">
              <h2 className="text-lg font-extrabold text-ink">Where should we deliver?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {demo
                  .filter((d) => getPincodeArea(d.pincode).cityId === v.cityId)
                  .map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setAddr(d)}
                      className={cn(
                        "rounded-2xl p-4 text-left text-sm ring-1 transition",
                        addr?.id === d.id
                          ? "bg-primary-tint ring-2 ring-primary"
                          : "ring-line hover:ring-primary/50"
                      )}
                    >
                      <Pill tone="white" className="mb-2">
                        {d.label} · demo address
                      </Pill>
                      <p className="font-bold">{d.name}</p>
                      <p className="text-muted text-xs mt-1">
                        {d.line1}, {d.area}, {d.city} {d.pincode}
                      </p>
                    </button>
                  ))}
              </div>
              <button
                onClick={() => setAddr(null)}
                className={cn(
                  "w-full rounded-2xl p-3 text-left text-sm font-bold ring-1",
                  !addr ? "bg-primary-tint ring-2 ring-primary" : "ring-line"
                )}
              >
                + Add a new address
              </button>
              {/* Full-width address map pin banner */}
              <div className="flex items-center gap-2.5 rounded-2xl border border-primary/30 bg-primary-soft p-3.5 text-xs text-primary font-bold">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <span className="block text-ink font-bold">Delivery Location Pinned</span>
                  <span className="text-muted font-normal">{v.area.pincode} · {v.city.name}</span>
                </div>
              </div>

              {!addr && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" error={err.name}>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={inputCls}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </Field>
                  <Field label="Mobile number" error={err.phone}>
                    <div className="flex">
                      <span className="grid place-items-center rounded-l-xl border border-r-0 border-line bg-bg px-3 text-sm">
                        +91
                      </span>
                      <input
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        className={cn(inputCls, "rounded-l-none")}
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                        }
                      />
                    </div>
                  </Field>
                  <Field label="House / flat and building" error={err.line1}>
                    <input
                      name="address-line1"
                      type="text"
                      autoComplete="address-line1"
                      className={inputCls}
                      value={form.line1}
                      onChange={(e) => setForm({ ...form, line1: e.target.value })}
                    />
                  </Field>
                  <Field label="Area" error={err.area}>
                    <input
                      name="address-level2"
                      type="text"
                      autoComplete="address-level2"
                      className={inputCls}
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                    />
                  </Field>
                  <Field label="Pincode" error={err.pincode}>
                    <input
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      maxLength={6}
                      className={inputCls}
                      value={form.pincode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                        })
                      }
                    />
                  </Field>
                </div>
              )}
              <button
                className="w-full min-h-[44px] rounded-2xl bg-[#17201B] py-3.5 text-xs font-bold text-white shadow transition hover:bg-black cursor-pointer"
                onClick={saveAddress}
              >
                Continue to delivery
              </button>
            </div>
          )}

          {/* STEP 1: DELIVERY */}
          {step === 1 && (
            <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm sm:p-6 space-y-5">
              <h2 className="text-lg font-extrabold text-ink">Choose delivery slots</h2>
              {shipments.map((s) => {
                const date = slots[s.label]?.date ?? s.dates[0];
                return (
                  <div key={s.label} className="rounded-2xl border border-line p-4 space-y-3">
                    <div className="flex items-center gap-2 font-bold text-sm text-ink">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>{s.label}</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {s.dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSlots({ ...slots, [s.label]: { date: d, slot: "" } })}
                          className={cn(
                            "flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold ring-1 transition cursor-pointer whitespace-nowrap",
                            date === d ? "bg-primary text-white ring-primary font-bold" : "ring-line bg-white hover:bg-neutral-50"
                          )}
                        >
                          {d === isoDay(new Date()) ? "Today" : formatDay(d)}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:grid sm:grid-cols-3">
                      {getAvailableSlots(
                        s.ls.map((l) => l.p),
                        v.area,
                        date,
                        new Date()
                      ).map((sl) => (
                        <button
                          key={sl.id}
                          onClick={() =>
                            setSlots({ ...slots, [s.label]: { date, slot: sl.id } })
                          }
                          className={cn(
                            "flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-3.5 py-2.5 text-xs font-semibold ring-1 transition cursor-pointer whitespace-nowrap",
                            slots[s.label]?.slot === sl.id
                              ? "bg-primary-tint text-primary ring-2 ring-primary font-bold"
                              : "ring-line bg-white hover:bg-neutral-50"
                          )}
                        >
                          <Clock className="mr-1.5 inline h-3.5 w-3.5" />
                          {sl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-3">
                <button
                  className="rounded-2xl border border-line px-5 py-3 text-xs font-bold text-ink"
                  onClick={() => setStep(0)}
                >
                  Back
                </button>
                <button
                  className="flex-1 rounded-2xl bg-[#17201B] py-3 text-xs font-bold text-white shadow"
                  onClick={() => setStep(2)}
                >
                  Continue to review
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: REVIEW (EXACT MATCH FOR SCREEN 8) ── */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Card 1: Delivery Details */}
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-ink" />
                    <h2 className="text-sm font-extrabold text-ink sm:text-base">
                      Delivery details
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-muted hover:text-ink"
                  >
                    Edit &rsaquo;
                  </button>
                </div>

                <div className="grid gap-4 rounded-2xl bg-bg/40 p-4 text-xs sm:grid-cols-3">
                  <div>
                    <span className="block font-medium text-muted">Delivery address</span>
                    <strong className="mt-1 block font-bold text-ink leading-relaxed">
                      {addr
                        ? `${addr.line1}, ${addr.area}, ${addr.city}, ${addr.pincode}`
                        : "12 Green Park Road, Apartment 4B, Bengaluru, 560001"}
                    </strong>
                  </div>

                  <div>
                    <span className="block font-medium text-muted">Delivery slot</span>
                    <strong className="mt-1 block font-bold text-ink">
                      Tomorrow, 10:00 AM – 12:00 PM
                    </strong>
                    <span className="mt-0.5 block text-[11px] text-muted">
                      Cold-chain delivery (keeps it fresh)
                    </span>
                  </div>

                  <div>
                    <span className="block font-medium text-muted">Delivered fresh</span>
                    <strong className="mt-1 block font-bold text-ink flex items-center gap-1">
                      <Snowflake className="h-3.5 w-3.5 text-sky-600" />
                      <span>in 4–6 days of shelf life</span>
                    </strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Grocery items (1) */}
              {groceryItems.length > 0 && (
                <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Apple className="h-4 w-4 text-food" />
                      <h2 className="text-sm font-extrabold text-ink sm:text-base">
                        Grocery items ({groceryItems.length})
                      </h2>
                    </div>
                    <Link href="/cart" className="text-xs font-bold text-muted hover:text-ink">
                      Edit &rsaquo;
                    </Link>
                  </div>

                  <div className="divide-y divide-line/60">
                    {groceryItems.map((l) => (
                      <div
                        key={l.key}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 first:pt-0"
                      >
                        <div className="flex items-start gap-3.5">
                          <ProductArt product={l.p} className="h-16 w-16 rounded-2xl shrink-0" />
                          <div className="space-y-1.5">
                            <h3 className="font-extrabold text-sm text-ink">{l.p.name}</h3>
                            <p className="text-xs text-muted">
                              {l.p.highlights?.[0] ?? "Juicy, fresh and naturally nutritious."}
                            </p>

                            {/* Attribute Pills Matching Screen 8 */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                                <ShieldCheck className="h-3 w-3 text-emerald-700" />
                                <span>Grade {l.it.grade ?? "A"}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                                <Sparkles className="h-3 w-3 text-emerald-700" />
                                <span>
                                  {l.it.ripeness === "raw"
                                    ? "Raw"
                                    : l.it.ripeness === "very_ripe"
                                    ? "Very ripe"
                                    : "Ready to eat"}
                                </span>
                              </span>

                              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                                <Snowflake className="h-3 w-3 text-sky-600" />
                                <span>Cold-chain delivery</span>
                              </span>

                              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                                <Clock className="h-3 w-3 text-muted" />
                                <span>4–6 days shelf life</span>
                              </span>

                              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink">
                                <RotateCcw className="h-3 w-3 text-ink" />
                                <span>
                                  {l.it.substitution === "skip"
                                    ? "Skip and refund"
                                    : l.it.substitution === "similar"
                                    ? "Allow similar"
                                    : "Ask before replacing"}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Weight on Right */}
                        <div className="text-left sm:text-right shrink-0 text-xs">
                          <p className="font-display text-lg font-extrabold text-ink tabular">
                            ₹ {l.price.finalPrice * l.it.qty}
                          </p>
                          <p className="text-muted tabular">
                            (₹ {(l.price.finalPrice / 2).toFixed(2)} per 500 g)
                          </p>
                          <p className="mt-1 text-muted">
                            Estimated quantity:{" "}
                            <span className="font-bold text-ink">{l.it.qty * 500} g</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 3: Policies & Information Matching Screen 8 */}
              <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-extrabold text-ink sm:text-base">
                      Policies &amp; information
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-muted hover:text-ink"
                  >
                    Edit &rsaquo;
                  </button>
                </div>

                <div className="grid gap-4 text-xs sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-line/60">
                  <div className="pt-2 sm:pt-0 sm:pr-3 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Quality guarantee</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Carefully selected Grade A produce.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-0 sm:px-3 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <Snowflake className="h-3.5 w-3.5 text-sky-600" />
                      <span>Freshness promise</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Cold-chain delivery to keep it fresh.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-0 sm:px-3 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <RotateCcw className="h-3.5 w-3.5 text-ink" />
                      <span>Substitution preference</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      We&apos;ll confirm before any substitution.
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-0 sm:pl-3 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Returns &amp; refunds</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Items can be refunded if they don&apos;t meet quality standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === 3 && (
            <div className="rounded-3xl border border-line/80 bg-white p-5 shadow-sm sm:p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-ink">How would you like to pay?</h2>

              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Payment Error</strong>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {state === "pending" && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Payment is pending confirmation</strong>
                    <p className="mt-0.5">Your bank is processing the transaction. Please wait while we verify with the bank...</p>
                  </div>
                </div>
              )}

              {paymentMethods.map((m) => {
                const blocked = m.id === "cod" && codReason;
                return (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3.5 rounded-2xl p-4 sm:p-5 ring-1 transition min-h-[56px]",
                      pay === m.id ? "bg-primary-tint ring-2 ring-primary" : "ring-line hover:bg-neutral-50/50",
                      blocked && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <input
                      type="radio"
                      name="pay"
                      disabled={!!blocked}
                      checked={pay === m.id}
                      onChange={() => {
                        setPay(m.id);
                        setErrorMessage("");
                      }}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="flex-1">
                      <span className="block font-bold text-ink">{m.label}</span>
                      <span className="block text-xs text-muted mt-0.5">
                        {blocked ? codReason : m.description}
                      </span>
                      {m.id === "upi" && pay === "upi" && (
                        <div className="mt-3.5 space-y-3">
                          <span className="block text-xs font-bold text-ink">Choose UPI App:</span>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {[
                              { name: "Google Pay", handle: "user@okhdfcbank" },
                              { name: "PhonePe", handle: "user@ybl" },
                              { name: "Paytm", handle: "user@paytm" },
                              { name: "BHIM UPI", handle: "user@upi" },
                            ].map((app) => (
                              <button
                                key={app.name}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setUpi(app.handle);
                                  setErrorMessage("");
                                }}
                                className={cn(
                                  "flex min-h-[44px] items-center justify-center rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer",
                                  upi === app.handle
                                    ? "border-primary bg-primary text-white shadow-xs font-black"
                                    : "border-line bg-white text-ink hover:bg-neutral-50"
                                )}
                              >
                                {app.name}
                              </button>
                            ))}
                          </div>
                          <div className="max-w-sm pt-1">
                            <span className="block text-[11px] text-muted mb-1">Or enter UPI ID:</span>
                            <input
                              className={inputCls}
                              placeholder="yourname@bank (e.g. user@upi)"
                              value={upi}
                              onChange={(e) => {
                                setUpi(e.target.value.trim());
                                setErrorMessage("");
                              }}
                            />
                            <span className="mt-1 block text-[11px] text-muted">
                              Demo handles: <code className="text-primary font-bold">user@upi</code> (success), <code className="text-red-600 font-bold">fail@upi</code> (bank decline)
                            </span>
                          </div>
                        </div>
                      )}
                    </span>
                  </label>
                );
              })}
              <div className="flex gap-3 pt-2">
                <button
                  className="rounded-2xl border border-line px-5 py-3 text-xs font-bold text-ink"
                  onClick={() => setStep(2)}
                >
                  Back to review
                </button>
                <button
                  className="flex-1 rounded-2xl bg-primary hover:bg-primary-dark py-3 text-xs font-bold text-white shadow transition disabled:opacity-50"
                  disabled={!payOk || state === "processing"}
                  onClick={place}
                >
                  {state === "processing" ? "Verifying payment with bank..." : `Pay ₹ ${charges.total.toLocaleString("en-IN")}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Screen 8 Right Column: Order Summary ── */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-line/80 bg-white p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-extrabold text-ink">Order summary</h2>
              <p className="text-xs text-muted">
                {v.valid.length} item{v.valid.length > 1 ? "s" : ""} · One checkout for everything
              </p>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between">
                <div>
                  <dt className="font-semibold text-ink">Product total</dt>
                </div>
                <dd className="tabular font-extrabold text-ink">₹ {charges.itemsTotal.toLocaleString("en-IN")}</dd>
              </div>

              <div className="flex justify-between">
                <div>
                  <dt className="font-semibold text-ink">Delivery charge</dt>
                  <span className="text-[11px] text-muted block">
                    {charges.delivery === 0 ? "Free delivery unlocked" : "Standard slot delivery"}
                  </span>
                </div>
                <dd className="tabular font-extrabold text-ink">
                  {charges.delivery === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹ ${charges.delivery}`
                  )}
                </dd>
              </div>

              {charges.coldChain > 0 && (
                <div className="flex justify-between">
                  <div>
                    <dt className="font-semibold text-ink">Cold-chain handling charge</dt>
                    <span className="text-[11px] text-muted block">
                      Temperature-controlled insulated delivery (0°C–4°C)
                    </span>
                  </div>
                  <dd className="tabular font-extrabold text-ink">₹ {charges.coldChain}</dd>
                </div>
              )}

              {charges.heavy > 0 && (
                <div className="flex justify-between">
                  <div>
                    <dt className="font-semibold text-ink">Heavy-item handling charge</dt>
                    <span className="text-[11px] text-muted block">
                      Two-person handling for large appliances
                    </span>
                  </div>
                  <dd className="tabular font-extrabold text-ink">₹ {charges.heavy}</dd>
                </div>
              )}

              {charges.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <div>
                    <dt className="font-semibold">MRP Discount</dt>
                    <span className="text-[11px] text-emerald-700 block">Everyday savings applied</span>
                  </div>
                  <dd className="tabular font-extrabold">- ₹ {charges.discount.toLocaleString("en-IN")}</dd>
                </div>
              )}

              {charges.memberSaving > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <div>
                    <dt className="font-semibold">Member savings</dt>
                    <span className="text-[11px] text-emerald-700 block">Rewards member pricing</span>
                  </div>
                  <dd className="tabular font-extrabold">- ₹ {charges.memberSaving.toLocaleString("en-IN")}</dd>
                </div>
              )}

              {charges.taxInclusive > 0 && (
                <div className="flex justify-between text-muted">
                  <div>
                    <dt className="font-semibold text-ink">Taxes (inclusive)</dt>
                    <span className="text-[11px] text-muted block">Included in product prices</span>
                  </div>
                  <dd className="tabular font-extrabold text-ink">₹ {charges.taxInclusive.toLocaleString("en-IN")}</dd>
                </div>
              )}

              <div className="flex justify-between border-t border-line/60 pt-3 text-sm font-extrabold text-ink">
                <dt>Total amount</dt>
                <dd className="tabular text-xl font-display text-ink">
                  ₹ {charges.total.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>

            {/* Note matching Screen 8 */}
            <div className="rounded-2xl bg-bg/50 p-3 text-[11px] text-muted flex items-start gap-2">
              <Truck className="h-4 w-4 shrink-0 text-muted mt-0.5" />
              <span>
                You&apos;ll receive an order confirmation after payment, with live tracking updates.
              </span>
            </div>

            {/* Bottom Button */}
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full rounded-2xl bg-ink hover:bg-black text-white font-extrabold py-3.5 text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Continue to payment</span>
                <span className="text-sm">&rarr;</span>
              </button>
            ) : step === 3 ? (
              <button
                type="button"
                disabled={!payOk || state === "processing"}
                onClick={place}
                className="w-full rounded-2xl bg-primary hover:bg-primary-dark text-white font-extrabold py-3.5 text-xs shadow-md transition disabled:opacity-50"
              >
                {state === "processing" ? "Verifying payment..." : `Pay ₹ ${charges.total.toLocaleString("en-IN")}`}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white font-extrabold py-3.5 text-xs shadow-md transition"
              >
                Continue
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* ── Mobile Sticky Bottom Action Bar (< lg) ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/95 backdrop-blur-md p-4 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-muted">Total amount</span>
            <span className="text-base font-extrabold text-ink tabular">
              ₹ {charges.total.toLocaleString("en-IN")}
            </span>
          </div>
          {step === 0 ? (
            <button
              onClick={saveAddress}
              className="flex-1 min-h-[44px] rounded-2xl bg-[#17201B] py-3 px-5 text-xs font-bold text-white shadow transition hover:bg-black cursor-pointer text-center"
            >
              Continue to delivery
            </button>
          ) : step === 1 ? (
            <button
              onClick={() => setStep(2)}
              className="flex-1 min-h-[44px] rounded-2xl bg-[#17201B] py-3 px-5 text-xs font-bold text-white shadow transition hover:bg-black cursor-pointer text-center"
            >
              Continue to review
            </button>
          ) : step === 2 ? (
            <button
              onClick={() => setStep(3)}
              className="flex-1 min-h-[44px] rounded-2xl bg-ink py-3 px-5 text-xs font-bold text-white shadow transition hover:bg-black cursor-pointer text-center"
            >
              Continue to payment &rarr;
            </button>
          ) : (
            <button
              disabled={!payOk || state === "processing"}
              onClick={place}
              className="flex-1 min-h-[44px] rounded-2xl bg-primary py-3 px-5 text-xs font-bold text-white shadow transition hover:bg-primary-dark cursor-pointer text-center disabled:opacity-50"
            >
              {state === "processing" ? "Verifying..." : `Pay ₹ ${charges.total.toLocaleString("en-IN")}`}
            </button>
          )}
        </div>
      </div>
    </TaskPage>
  );
}
