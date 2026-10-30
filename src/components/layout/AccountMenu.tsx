"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  Sparkles,
  HelpCircle,
  LogOut,
  LogIn,
  ChevronDown,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { useAuth, useWish, useOrders } from "@/store";
import { demoCustomers } from "@/mocks/customers";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export function AccountMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { customerId, signIn, signOut } = useAuth();
  const wishCount = useWish((s) => s.ids.length);
  const localOrders = useOrders((s) => s.orders);
  const menuRef = useRef<HTMLDivElement>(null);

  const customer = demoCustomers.find((c) => c.id === customerId) ?? demoCustomers[0];
  const isSignedIn = !!customerId;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={isSignedIn ? `Account menu for ${customer.name}` : "Sign in or Account"}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold text-ink/90 transition hover:bg-primary-tint hover:text-primary"
      >
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary-tint text-primary ring-1 ring-primary/20">
          <User className="h-4 w-4" />
        </div>
        <div className="hidden text-left xl:block">
          <span className="block text-[10px] font-medium text-muted uppercase tracking-wider">
            {isSignedIn ? "Hello," : "Welcome"}
          </span>
          <span className="block text-xs font-extrabold text-ink truncate max-w-[100px]">
            {isSignedIn ? customer.name.split(" ")[0] : "Sign in"}
          </span>
        </div>
        <ChevronDown className="hidden h-3 w-3 text-muted xl:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-2xl border border-line bg-white shadow-pop animate-fade-down">
          {isSignedIn ? (
            /* Signed-In View */
            <div className="p-3">
              {/* User Identity Header */}
              <div className="rounded-xl bg-gradient-to-br from-primary-tint to-[#F8FAFC] p-3 border border-primary/20">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-black text-white text-sm">
                    {customer.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-black text-ink">{customer.name}</p>
                    <p className="truncate text-[11px] text-muted">{customer.phone}</p>
                    {customer.isMember && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-black text-accent-text">
                        <ShieldCheck className="h-3 w-3" />
                        HyperMart Rewards Member
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="mt-2 space-y-0.5 text-xs">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <User className="h-4 w-4 text-primary" />
                  <span>My Profile & Preferences</span>
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <span className="flex items-center gap-2.5">
                    <Package className="h-4 w-4 text-primary" />
                    <span>My Orders</span>
                  </span>
                  <span className="rounded-full bg-primary-tint px-2 py-0.5 text-[10px] font-bold text-primary">
                    {localOrders.length > 0 ? localOrders.length : 1} active
                  </span>
                </Link>

                <Link
                  href="/account/addresses"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Saved Addresses</span>
                </Link>

                <Link
                  href="/account/wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Wishlist</span>
                  </span>
                  {wishCount > 0 && (
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                      {wishCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/account/rewards"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>Member Savings & Points</span>
                </Link>

                <Link
                  href="/help"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-ink/80 transition hover:bg-bg hover:text-primary"
                >
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span>Help & Support</span>
                </Link>

                <div className="my-1 border-t border-line/60" />

                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 font-bold text-[#07563B] bg-[#EAF5E9] hover:bg-[#C6F04A]/30 transition"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#07563B]" />
                    <span>Operations Hub (Staff)</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#07563B] text-white">
                    Portal
                  </span>
                </Link>
              </div>

              {/* Sign Out Button */}
              <div className="mt-2 border-t border-line pt-2">
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                    toast("Signed out successfully");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            /* Signed-Out View */
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-ink">Welcome to HyperMart</h4>
                <p className="text-xs text-muted">
                  Sign in to track orders, manage saved addresses & access exclusive member discounts.
                </p>
              </div>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => {
                    signIn("cu-001");
                    setOpen(false);
                    toast("Signed in as Priya Raman (Demo)");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-primary-dark"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign in with Mobile / Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    signIn("cu-001");
                    setOpen(false);
                    toast("Account created! Welcome to HyperMart.");
                  }}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-line bg-bg py-2 text-xs font-bold text-ink transition hover:bg-primary-tint hover:text-primary"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Create new account</span>
                </button>
              </div>

              <div className="border-t border-line pt-2 space-y-1 text-xs">
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium text-ink/80 hover:bg-bg"
                >
                  <Package className="h-3.5 w-3.5 text-muted" />
                  <span>Track recent shipment</span>
                </Link>
                <Link
                  href="/help"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium text-ink/80 hover:bg-bg"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-muted" />
                  <span>24/7 Customer Care</span>
                </Link>

                <div className="my-1 border-t border-line/60" />

                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 font-bold text-[#07563B] bg-[#EAF5E9] hover:bg-[#C6F04A]/30 transition"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#07563B]" />
                    <span>Staff Login (Operations)</span>
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#07563B] text-white">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
