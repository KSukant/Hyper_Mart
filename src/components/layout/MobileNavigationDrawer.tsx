"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronDown,
  Home,
  Layers,
  Flame,
  Zap,
  Tag,
  MapPin,
  User,
  HelpCircle,
  Briefcase,
  ShieldCheck,
  PhoneCall,
  Globe,
} from "lucide-react";
import { Logo } from "./Logo";
import { MAIN_DOMAINS } from "./CategoryMegaMenu";
import { useAuth, useLocation } from "@/store";
import { getCity } from "@/lib/catalog";
import { demoCustomers } from "@/mocks/customers";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/primitives";

interface MobileNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  onOpenLocation: () => void;
}

export function MobileNavigationDrawer({ open, onClose, onOpenLocation }: MobileNavigationDrawerProps) {
  const pathname = usePathname();
  const { customerId, signIn } = useAuth();
  const { pincode, cityId } = useLocation();
  const city = getCity(cityId)?.name ?? "Coimbatore";
  const customer = demoCustomers.find((c) => c.id === customerId);

  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  // Close when pathname changes
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Escape key and lock body scroll when open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="relative flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl animate-slide-right">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-muted hover:bg-bg hover:text-ink transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Greeting / Sign in Quick Bar */}
        <div className="border-b border-line bg-primary-tint/40 px-5 py-3">
          {customerId && customer ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                  {customer.name[0]}
                </div>
                <div>
                  <span className="block text-xs font-bold text-ink">{customer.name}</span>
                  <span className="block text-[11px] text-muted">{customer.phone}</span>
                </div>
              </div>
              <Link
                href="/account"
                className="text-xs font-extrabold text-primary hover:underline"
              >
                Profile →
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-extrabold text-ink">Welcome to HyperMart</span>
                <span className="block text-[11px] text-muted">Sign in for member savings</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  signIn("cu-001");
                  toast("Signed in as Priya Raman (Demo)");
                }}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition"
              >
                Sign in
              </button>
            </div>
          )}
        </div>

        {/* Location Selector Bar */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenLocation();
          }}
          className="flex w-full items-center justify-between border-b border-line px-5 py-2.5 text-left text-xs bg-primary-tint/40 hover:bg-primary-tint transition"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>
              Deliver to <strong className="text-ink">{pincode} · {city}</strong>
            </span>
          </div>
          <span className="text-[11px] font-bold text-primary">Change</span>
        </button>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
              pathname === "/" ? "bg-primary-tint text-primary" : "text-ink/80 hover:bg-bg"
            )}
          >
            <Home className="h-4 w-4 text-primary" />
            <span>Home</span>
          </Link>

          {/* Categories Accordion */}
          <div className="rounded-2xl border border-line/70 overflow-hidden my-1">
            <button
              type="button"
              onClick={() => setCategoriesExpanded((v) => !v)}
              className="flex w-full items-center justify-between bg-bg px-3.5 py-2.5 text-left text-sm font-bold text-ink"
            >
              <span className="flex items-center gap-2.5">
                <Layers className="h-4 w-4 text-primary" />
                <span>Shop by Category</span>
              </span>
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", categoriesExpanded && "rotate-180")}
              />
            </button>

            {categoriesExpanded && (
              <div className="divide-y divide-line/40 bg-white">
                {MAIN_DOMAINS.map((dom) => {
                  const Icon = dom.icon;
                  const isActive = pathname === dom.href;
                  const deptColors: Record<string, { bg: string; text: string; tint: string }> = {
                    food: { bg: "bg-[#2E7032]", text: "text-[#2E7032]", tint: "bg-[#E7F3DF]" },
                    fashion: { bg: "bg-[#0F766E]", text: "text-[#0F766E]", tint: "bg-[#E6FFFA]" },
                    beauty: { bg: "bg-[#7C205F]", text: "text-[#7C205F]", tint: "bg-[#FCE4EC]" },
                    electronics: { bg: "bg-[#1E3A8A]", text: "text-[#1E3A8A]", tint: "bg-[#EAF0FE]" },
                  };
                  const colors = deptColors[dom.id] || { bg: "bg-primary", text: "text-primary", tint: "bg-primary-tint" };

                  return (
                    <Link
                      key={dom.id}
                      href={dom.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-3 text-left font-bold transition",
                        isActive
                          ? "bg-primary-tint text-primary"
                          : "text-ink/90 hover:bg-primary-tint/50 hover:text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid h-8 w-8 place-items-center rounded-lg transition",
                            isActive
                              ? `${colors.bg} text-white shadow-xs`
                              : `${colors.tint} ${colors.text}`
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-bold">{dom.name}</span>
                      </div>
                      <span className="text-xs text-muted">→</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/deals"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
              pathname.startsWith("/deals") ? "bg-primary-tint text-primary" : "text-ink/80 hover:bg-bg"
            )}
          >
            <Flame className="h-4 w-4 text-accent" />
            <span>Flash Deals & Offers</span>
          </Link>

          <Link
            href="/new-arrivals"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
              pathname.startsWith("/new-arrivals") ? "bg-primary-tint text-primary" : "text-ink/80 hover:bg-bg"
            )}
          >
            <Zap className="h-4 w-4 text-primary" />
            <span>New Arrivals</span>
          </Link>

          <Link
            href="/offers"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
              pathname.startsWith("/offers") ? "bg-primary-tint text-primary" : "text-ink/80 hover:bg-bg"
            )}
          >
            <Tag className="h-4 w-4 text-accent" />
            <span>Coupons & Rewards</span>
          </Link>

          <div className="border-t border-line my-2 pt-2 space-y-1">
            <Link
              href="/orders"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-ink/80 hover:bg-bg"
            >
              <ShieldCheck className="h-4 w-4 text-muted" />
              <span>My Orders & Returns</span>
            </Link>

            <Link
              href="/bulk"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-ink/80 hover:bg-bg"
            >
              <Briefcase className="h-4 w-4 text-muted" />
              <span>Bulk & Corporate Orders</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-ink/80 hover:bg-bg"
            >
              <PhoneCall className="h-4 w-4 text-muted" />
              <span>Customer Care: 1800-425-5858</span>
            </Link>
          </div>
        </div>

        {/* Footer Language & App links */}
        <div className="border-t border-line bg-bg px-5 py-3 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1.5 font-bold text-ink">
            <Globe className="h-3.5 w-3.5 text-primary" />
            <span>English (IN)</span>
          </div>
          <span className="font-mono text-[11px]">HyperMart v2.6.4</span>
        </div>
      </aside>
    </div>
  );
}
