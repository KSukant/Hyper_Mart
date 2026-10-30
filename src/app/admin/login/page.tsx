"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Truck,
  Sparkles,
} from "lucide-react";
import { useAdminStore, ADMIN_USERS } from "@/store/adminStore";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPortal = searchParams.get("portal");
  const { setCurrentUser } = useAdminStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("priya.s@hypermart.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(["4", "8", "1", "9", "2", "0"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith("@hypermart.com")) {
      setError("Please use an authorized @hypermart.com company email.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast("2FA security verification code sent to your mobile device.");
    }, 600);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const matchedUser = ADMIN_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    ) || ADMIN_USERS[0];

    setCurrentUser(matchedUser);

    setTimeout(() => {
      setLoading(false);
      setStep(3);
      toast(`Identity verified as ${matchedUser.name}. Initializing workspace...`);
      setTimeout(() => {
        if (requestedPortal === "support") {
          router.push("/portal/support");
        } else if (requestedPortal === "finance") {
          router.push("/portal/payment-ledger");
        } else if (requestedPortal === "admin") {
          router.push("/admin");
        } else if (matchedUser.role === "operations_manager") {
          router.push("/portal");
        } else if (matchedUser.role === "support_agent") {
          router.push("/portal/support");
        } else if (matchedUser.role === "warehouse_manager") {
          router.push("/portal/warehouse-readiness");
        } else if (matchedUser.role === "restricted_operator") {
          router.push("/admin/access-denied");
        } else {
          router.push("/admin");
        }
      }, 800);
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 2-Panel Elevated Authentication Container */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-[1.1fr_1fr]">
        {/* ── Left Brand & Illustration Panel ── */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#063922] via-[#08482B] to-[#042817] p-8 text-white sm:p-12">
          {/* Subtle geometric pattern overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="leaf-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M10 30c0-12 10-20 20-20 0 12-10 20-20 20z" fill="none" stroke="#fff" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
            </svg>
          </div>

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent font-black text-accent-text text-xl shadow-md">
              H
            </span>
            <div>
              <span className="font-display font-black text-xl tracking-tight text-white block leading-none">
                HyperMart
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mt-0.5 block">
                OPERATIONS HUB
              </span>
            </div>
          </div>

          {/* Headline & Mission Statement */}
          <div className="relative z-10 my-10 space-y-3">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Good food. <br />
              <span className="text-accent">Brighter living.</span>
            </h1>
            <p className="max-w-md text-sm text-emerald-100/80 leading-relaxed sm:text-base">
              We keep everyday essentials moving, for healthier, happier communities across 40+ fulfillment corridors.
            </p>
          </div>

          {/* Delivery Scene Vector Showcase */}
          <div className="relative z-10 mt-auto rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-text">
                <Truck className="h-5 w-5" />
              </span>
              <div className="text-xs">
                <p className="font-bold text-white">Coimbatore DC · Chennai FC Hubs</p>
                <p className="text-emerald-200/80">92% on-time fulfillment SLA today</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Authentication Form Panel ── */}
        <div className="flex flex-col justify-between p-8 sm:p-12 bg-white">
          {/* 3-Step Progress Breadcrumb */}
          <div className="flex items-center justify-between border-b border-neutral-100 pb-6 mb-8">
            {[
              { num: 1, label: "Sign in" },
              { num: 2, label: "Verify it's you" },
              { num: 3, label: "Access Hub" },
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full text-xs font-bold transition-all",
                      isCurrent && "bg-emerald-800 text-white ring-4 ring-emerald-100",
                      isPast && "bg-emerald-700 text-white",
                      !isCurrent && !isPast && "bg-neutral-100 text-neutral-400"
                    )}
                  >
                    {isPast ? <CheckCircle2 className="h-3.5 w-3.5" /> : s.num}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold hidden sm:inline",
                      isCurrent ? "text-neutral-900" : "text-neutral-400"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 1: Email & Password */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5 flex-1 flex flex-col justify-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Sign in to HyperMart
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Use your company email and password to continue.
                </p>
              </div>

              {error && (
                <div className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Company Email */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Company email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@hypermart.com"
                      className="h-11 w-full rounded-xl border border-neutral-200 pl-10 pr-4 text-xs font-medium text-neutral-900 placeholder-neutral-400 transition focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/15"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-xl border border-neutral-200 pl-10 pr-10 text-xs font-medium text-neutral-900 placeholder-neutral-400 transition focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C6F04A] font-extrabold text-[#073922] shadow-md transition hover:bg-[#b8e43e] active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? "Authenticating..." : "Continue"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Compliance Reassurance */}
              <div className="flex items-start gap-2.5 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200/60">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                <p className="text-[11px] text-neutral-600 leading-snug">
                  Your access helps keep HyperMart safe and our communities supplied. Always use your company email.
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: 2-Factor Authentication */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-5 flex-1 flex flex-col justify-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Two-factor verification
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Enter the 6-digit verification code sent to your registered security key.
                </p>
              </div>

              <div className="flex justify-between gap-2 my-4">
                {twoFactorCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...twoFactorCode];
                      newCode[idx] = e.target.value;
                      setTwoFactorCode(newCode);
                    }}
                    className="h-12 w-12 rounded-xl border border-neutral-300 text-center font-display text-lg font-bold text-neutral-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0E5E3A] font-extrabold text-white shadow-md transition hover:bg-[#0b4d2f] active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? "Verifying..." : "Verify & Sign In"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-center text-xs font-semibold text-neutral-500 hover:text-neutral-800"
              >
                ← Back to email
              </button>
            </form>
          )}

          {/* STEP 3: Initializing Workspace */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 animate-bounce">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-900">
                Welcome back, Priya
              </h3>
              <p className="text-xs text-neutral-500">
                Loading Operations Hub for Coimbatore DC & Chennai FC...
              </p>
            </div>
          )}

          {/* Footer Assistance */}
          <div className="pt-6 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
            <Link href="/help" className="font-semibold text-emerald-700 hover:underline">
              Need help signing in?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-xs font-semibold text-emerald-800">Loading authentication gateway...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
