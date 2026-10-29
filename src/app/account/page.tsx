"use client";
import Link from "next/link";
import { useState } from "react";
import { User, Package, Crown, Repeat, MapPin, Ruler, Sparkles, Smartphone, LogOut, ArrowRight, ShieldCheck, Bell, Check, Heart } from "lucide-react";
import { TaskPage } from "@/components/layout/TaskPage";
import { btn, Field, inputCls, toast, Pill } from "@/components/ui/primitives";
import { demoCustomers, membershipPlans } from "@/mocks";
import { useAuth, useMember, useWish } from "@/store";
import { useAllOrders } from "@/lib/orders";
import { formatINR, formatDay } from "@/lib/format";
import { cn } from "@/lib/cn";

function SignIn() {
  const signIn = useAuth((s) => s.signIn); const setMember = useMember((s) => s.setMember);
  const [phone, setPhone] = useState(""); const [step, setStep] = useState<"phone" | "otp">("phone"); const [otp, setOtp] = useState(""); const [err, setErr] = useState("");
  const digits = phone.replace(/\D/g, "").slice(-10);
  const send = () => { if (!/^[6-9]\d{9}$/.test(digits)) return setErr("Enter a valid 10-digit mobile number."); setErr(""); setStep("otp"); toast("OTP sent (demo: 123456)"); };
  const verify = () => {
    if (otp !== "123456") return setErr("That code isn't right. Demo code is 123456.");
    const c = demoCustomers.find((x) => x.phone.replace(/\D/g, "").endsWith(digits)) ?? demoCustomers[0];
    signIn(c.id); setMember(c.isMember); toast(`Welcome, ${c.name.split(" ")[0]}`);
  };
  return (
    <TaskPage wide={false} crumbs={[{ label: "Home", href: "/" }, { label: "Sign in" }]}>
      <div className="grid overflow-hidden rounded-4xl bg-white shadow-pop md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-8 text-white md:flex">
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent/20" />
          <div><p className="text-xs font-bold uppercase tracking-widest text-accent">HyperMart account</p><h1 className="mt-3 text-3xl font-extrabold leading-tight">Track orders, save addresses and get <span className="text-accent">member prices.</span></h1></div>
          <ul className="space-y-2 text-sm text-white/80">{["Orders and returns in one place", "Faster checkout", "Restock alerts on WhatsApp"].map((x) => <li key={x} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" />{x}</li>)}</ul>
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">{step === "phone" ? "Sign in or sign up" : "Enter the code"}</h2>
          <p className="mb-5 text-sm text-muted">{step === "phone" ? "We’ll send a one-time code to your mobile." : `Sent to +91 ${digits.slice(0, 5)} ${digits.slice(5)}`}</p>
          {step === "phone" ? (
            <Field label="Mobile number" error={err}><div className="flex gap-2"><span className="grid place-items-center rounded-xl bg-bg px-3 text-sm font-semibold">+91</span><input inputMode="numeric" autoComplete="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="98400 00001" /></div></Field>
          ) : (
            <Field label="6-digit code" error={err}><input inputMode="numeric" autoComplete="one-time-code" maxLength={6} className={cn(inputCls, "text-center font-display text-2xl tracking-[0.5em]")} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} onKeyDown={(e) => e.key === "Enter" && verify()} /></Field>
          )}
          <button className={btn("primary", "lg", "mt-4 w-full")} onClick={step === "phone" ? send : verify}>{step === "phone" ? "Send code" : "Verify and continue"} <ArrowRight className="h-4 w-4" /></button>
          {step === "otp" && <button className="mt-3 text-sm font-semibold text-primary" onClick={() => { setStep("phone"); setOtp(""); setErr(""); }}>Change number</button>}
          <div className="mt-6 rounded-2xl bg-primary-soft p-4 text-xs text-muted"><b className="text-ink">Demo accounts:</b> {demoCustomers.map((c) => <button key={c.id} className="mr-2 font-semibold text-primary underline" onClick={() => setPhone(c.phone.replace("+91", "").trim())}>{c.name} ({c.phone})</button>)}<br />OTP is always 123456.</div>
        </div>
      </div>
    </TaskPage>
  );
}

export default function Account() {
  const { customerId, signOut } = useAuth(); const { isMember, setMember } = useMember();
  const wishCount = useWish((s) => s.ids.length);
  const orders = useAllOrders();
  const c = demoCustomers.find((x) => x.id === customerId);
  if (!c) return <SignIn />;
  const mine = orders.filter((o) => o.customerId === c.id || !o.customerId || o.customerId === "guest");
  const active = mine.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;
  const plan = membershipPlans[0];
  const tiles = [
    { href: "/orders", icon: Package, title: "My orders", text: `${mine.length} orders · ${active} active` },
    { href: "/account/wishlist", icon: Heart, title: "My Wishlist", text: wishCount > 0 ? `${wishCount} saved ${wishCount === 1 ? "item" : "items"}` : "Save items for later" },
    { href: "/account/subscriptions", icon: Repeat, title: "Subscriptions", text: "Milk, eggs and staples on repeat" },
    { href: "/account/addresses", icon: MapPin, title: "Saved addresses", text: `${c.addresses.length} saved · ${c.addresses.map((a) => a.label).join(", ")}` },
    { href: "/account/fit-profile", icon: Ruler, title: "Fit profile", text: c.fitProfile ? `${c.fitProfile.heightCm} cm · top ${c.fitProfile.usualTopSize} · waist ${c.fitProfile.usualWaist}` : "Add your sizes for better fit advice" },
    { href: "/account/beauty-routine", icon: Sparkles, title: "Beauty profile", text: c.beautyProfile ? `${c.beautyProfile.skinType} skin · ${c.beautyProfile.preferredShades.length} saved shades` : "Save your skin type and shades" },
    { href: "/account/devices", icon: Smartphone, title: "My devices", text: c.savedDevices?.length ? c.savedDevices.map((d) => d.model).join(", ") : "Save devices for compatibility checks" },
  ];
  return (
    <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "My account" }]}>
      <div className="relative mb-6 flex flex-wrap items-center gap-5 overflow-hidden rounded-4xl bg-primary p-6 text-white shadow-pop sm:p-8">
        <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-accent/15" />
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent font-display text-2xl font-extrabold text-accent-text">{c.name.split(" ").map((n) => n[0]).join("")}</span>
        <div className="flex-1"><h1 className="text-2xl font-extrabold sm:text-3xl">Hi, {c.name.split(" ")[0]}</h1><p className="text-sm text-white/75">{c.phone} · {c.email}</p></div>
        {isMember && <Pill tone="lime" icon={<Crown className="h-3.5 w-3.5" />}>Rewards member</Pill>}
        <button onClick={() => { signOut(); toast("Signed out"); }} className={btn("white", "sm", "relative")}><LogOut className="h-4 w-4" />Sign out</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {tiles.map(({ href, icon: I, title, text }) => (
            <Link key={href} href={href} className="group flex items-start gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-line/60 transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-tint text-primary transition group-hover:bg-accent group-hover:text-accent-text"><I className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block font-bold">{title}</span><span className="block text-sm text-muted">{text}</span></span>
            </Link>))}
        </div>
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-3xl bg-accent-tint p-5 ring-1 ring-accent">
            <div className="flex items-center gap-2"><Crown className="h-5 w-5 text-primary" /><h2 className="font-extrabold">HyperMart Rewards</h2></div>
            <p className="mt-1 text-sm text-muted">{isMember ? `Member${c.memberSince ? ` since ${formatDay(c.memberSince)}` : ""}` : `${formatINR(plan.priceYearly)} a year or ${formatINR(plan.priceMonthly)} a month · ${plan.trialDays}-day free trial`}</p>
            <ul className="my-3 space-y-1.5 text-sm">{plan.benefits.map((b) => <li key={b} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary shrink-0" /><span>{b}</span></li>)}</ul>
            <button className={btn(isMember ? "secondary" : "primary", "md", "w-full")} onClick={() => { setMember(!isMember); toast(isMember ? "Membership turned off (demo)" : "Welcome to Rewards!"); }}>{isMember ? "Turn off membership (demo)" : "Start free trial"}</button>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h2 className="mb-2 flex items-center gap-2 font-extrabold"><Bell className="h-4 w-4 text-primary" />Notifications</h2>
            <ul className="space-y-1.5 text-sm">{([["Order updates", true], ["Offers", c.consents.offers], ["Restock alerts", c.consents.restock], ["WhatsApp", c.consents.whatsapp]] as const).map(([l, v]) => <li key={l} className="flex justify-between"><span>{l}</span><span className={v ? "font-semibold text-primary" : "text-muted"}>{v ? "On" : "Off"}</span></li>)}</ul>
          </div>
        </aside>
      </div>
    </TaskPage>
  );
}
