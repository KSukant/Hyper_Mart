"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, ArrowLeftRight, LogOut, Store, HelpCircle } from "lucide-react";
import { useAdminStore, ADMIN_USERS } from "@/store/adminStore";

export default function AccessDeniedPage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAdminStore();

  const handleSwitchToManager = () => {
    // Switch to Priya S. (Operations Manager) to unlock the portal
    setCurrentUser(ADMIN_USERS[0]);
    router.push("/admin");
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
      {/* Centered Elevated Role Barrier Card */}
      <div className="w-full max-w-md rounded-3xl border border-neutral-200/80 bg-white p-8 text-center shadow-xl">
        {/* Padlock & Storefront Illustration */}
        <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-50 ring-8 ring-emerald-50/50" />
          <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-800 text-white shadow-lg">
            <ShieldAlert className="h-9 w-9 text-accent" />
          </div>
          <div className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800 ring-2 ring-white">
            <Store className="h-4 w-4" />
          </div>
        </div>

        {/* Heading & Context */}
        <h1 className="font-display text-2xl font-extrabold text-neutral-900 tracking-tight">
          This portal is not available for your role
        </h1>
        <p className="mt-2.5 text-xs text-neutral-500 leading-relaxed">
          You&apos;ve been redirected to your assigned workspace, where you can access the tools and information for your role ({currentUser.roleLabel}).
        </p>

        {/* Action Buttons Stack */}
        <div className="mt-8 space-y-3">
          <Link
            href="/admin"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C6F04A] font-extrabold text-[#073922] shadow-sm transition hover:bg-[#b5e03a] active:scale-[0.99] cursor-pointer"
          >
            <span>Go to my portal</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={handleSwitchToManager}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white font-bold text-neutral-700 transition hover:bg-neutral-50 active:scale-[0.99] cursor-pointer"
          >
            <ArrowLeftRight className="h-4 w-4 text-neutral-500" />
            <span>Switch to Manager Role (Demo)</span>
          </button>

          <Link
            href="/admin/login"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl font-bold text-neutral-500 transition hover:text-danger hover:bg-danger/5 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Link>
        </div>

        {/* Help Note */}
        <div className="mt-8 border-t border-neutral-100 pt-4 text-[11px] text-neutral-500 flex items-center justify-center gap-1">
          <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
          <span>Need access to a different portal? Contact your administrator or visit</span>
          <Link href="/help" className="font-semibold text-emerald-700 hover:underline">
            Help & Support
          </Link>
        </div>
      </div>
    </div>
  );
}
