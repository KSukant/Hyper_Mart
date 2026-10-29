"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ArrowUp,
} from "lucide-react";
import { site } from "@/mocks";
import { Logo } from "./Logo";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";


/* ── Structured Categorized Navigation Links ── */
const FOOTER_NAV = [
  {
    title: "Shop Departments",
    links: [
      { label: "Food & Groceries", href: "/category/food" },
      { label: "Fashion & Apparel", href: "/category/fashion" },
      { label: "Beauty & Personal Care", href: "/category/beauty" },
      { label: "Electronics & Appliances", href: "/category/electronics" },
      { label: "Deals of the Day", href: "/deals" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Special Offers", href: "/offers" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Track Your Order", href: "/orders" },
      { label: "Returns & Refunds", href: "/help/returns" },
      { label: "Delivery Information", href: "/help/delivery" },
      { label: "Help Center & FAQs", href: "/help" },
      { label: "Contact Support", href: "/help/contact" },
      { label: "Grievance Redressal", href: "/legal/grievance" },
    ],
  },
  {
    title: "HyperMart Services",
    links: [
      { label: "HyperMart Rewards", href: "/account/rewards" },
      { label: "Repair & Exchange", href: "/services/electronics" },
      { label: "Bulk & Business Orders", href: "/bulk" },
      { label: "Smart Subscriptions", href: "/account/subscriptions" },
      { label: "Member Savings", href: "/account/rewards" },
      { label: "Store Locator", href: "/help/delivery" },
    ],
  },
  {
    title: "Policies & Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Return Policy", href: "/legal/returns" },
      { label: "Grievance Officer", href: "/legal/grievance" },
      { label: "Security & Trust", href: "/legal/privacy" },
      { label: "FSSAI & Standards", href: "/legal/terms" },
    ],
  },
];


export function Footer({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (title: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("Please enter a valid email address");
      return;
    }
    setErr("");
    setSubscribed(true);
    toast("You're subscribed to HyperMart offers for your city!");
    setEmail("");
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#062416] text-emerald-100/80">
      {/* Back to top row for mobile */}
      <div className="border-b border-[#0C3B24] bg-[#031A10]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold text-emerald-200/70">
            Shopping in India · Fast local fulfillment
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-accent transition hover:text-white focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── TOP SECTION: Newsletter & Exclusive City Offers (Full Mode only) ── */}
      {!compact && (
        <div className="border-b border-[#0C3B24] bg-gradient-to-r from-[#041C11] via-[#08321F] to-[#041C11]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30 sm:grid">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white sm:text-lg">
                  Stay updated with HyperMart savings & city offers
                </h3>
                <p className="mt-0.5 text-xs text-emerald-200/70 sm:text-sm">
                  Subscribe for weekly flash sales, fresh season arrivals, and members-only deals.
                </p>
              </div>
            </div>

            <div className="w-full max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs text-accent">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  <span>Thank you! You are subscribed to city offers and weekly deals.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (err) setErr("");
                        }}
                        placeholder="Enter your email address"
                        aria-label="Email address for city offers"
                        className="h-12 sm:h-11 w-full rounded-xl border border-[#0E4A2E] bg-[#03150D] pl-10 pr-4 text-base sm:text-sm text-white placeholder-emerald-300/50 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] h-12 sm:h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-accent px-5 text-sm font-extrabold text-accent-text shadow-md transition hover:bg-white active:scale-[0.98] cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-emerald-200/60">
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-emerald-300/60" />
                      No spam. Unsubscribe anytime.
                    </span>
                    {err && <span className="font-medium text-amber-300">{err}</span>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}


      {/* ── MIDDLE SECTION 2: Main Categorized Navigation & Support Grid ── */}
      <div className={`mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 ${compact ? "py-6" : "py-8 lg:py-12"}`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-8">
          {/* Column 1: Brand & Contact Info (Always visible, spans 2 columns on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <div className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/5">
              <Logo size="md" />
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-emerald-100/80 sm:text-sm">
              {site.tagline}
            </p>

            {/* Direct Contact Channels */}
            <div className="space-y-2 pt-1 text-xs">
              <a
                href="tel:1800000000"
                className="group flex min-h-[44px] items-center gap-2.5 text-emerald-100/80 transition hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#093520] text-accent ring-1 ring-white/10 group-hover:bg-primary group-hover:text-white transition">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-emerald-300/70">Toll-Free Customer Support</span>
                  <span className="font-semibold text-emerald-50 group-hover:text-accent transition">{site.supportPhone}</span>
                </div>
              </a>

              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[44px] items-center gap-2.5 text-emerald-100/80 transition hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#093520] text-accent ring-1 ring-white/10 group-hover:bg-primary group-hover:text-white transition">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-emerald-300/70">WhatsApp Assistance</span>
                  <span className="font-semibold text-emerald-50 group-hover:text-accent transition">{site.supportWhatsApp}</span>
                </div>
              </a>

              <a
                href="mailto:help@hypermart.example"
                className="group flex min-h-[44px] items-center gap-2.5 text-emerald-100/80 transition hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#093520] text-accent ring-1 ring-white/10 group-hover:bg-primary group-hover:text-white transition">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-emerald-300/70">Email Inquiries</span>
                  <span className="font-semibold text-emerald-50 group-hover:text-accent transition">{site.supportEmail}</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 text-emerald-200/70 pt-1">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#093520] text-accent ring-1 ring-white/10">
                  <Clock className="h-4 w-4" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-emerald-300/70">Operational Hours</span>
                  <span className="text-emerald-50 font-medium">{site.supportHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Columns 2-5: Nav Columns - Accordions on mobile (<1024px), standard columns on desktop (>=1024px) */}
          <div className="grid grid-cols-1 divide-y divide-[#0C3B24] lg:col-span-4 lg:grid-cols-4 lg:gap-8 lg:divide-y-0">
            {FOOTER_NAV.map((column) => {
              const isOpen = !!openAccordions[column.title];
              return (
                <div key={column.title} className="py-3 lg:py-0">
                  {/* Mobile Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(column.title)}
                    className="flex min-h-[44px] w-full items-center justify-between text-left text-sm font-extrabold uppercase tracking-wider text-accent lg:hidden cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{column.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-accent transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Desktop Static Header */}
                  <h3 className="hidden text-xs font-extrabold uppercase tracking-wider text-accent lg:block mb-3">
                    {column.title}
                  </h3>

                  {/* Links List: Collapsible on mobile, always visible on desktop */}
                  <ul
                    className={cn(
                      "space-y-2 pt-1 text-xs lg:block",
                      isOpen ? "block" : "hidden"
                    )}
                  >
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex min-h-[36px] items-center text-emerald-100/80 transition hover:text-white hover:translate-x-0.5"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>


        {/* ── BOTTOM SUB-FOOTER: Copyright, Compliance & Legal Links ── */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[#0C3B24] pt-6 text-center text-xs text-emerald-200/60 md:flex-row md:text-left">
          <p>
            © 2026 {site.legalName}. All rights reserved. All prices include GST.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-200/70">
            <Link href="/legal/terms" className="hover:text-white transition py-1">
              Terms of Use
            </Link>
            <span>·</span>
            <Link href="/legal/privacy" className="hover:text-white transition py-1">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/legal/returns" className="hover:text-white transition py-1">
              Return Policy
            </Link>
            <span>·</span>
            <Link href="/legal/grievance" className="hover:text-white transition py-1">
              Grievance Officer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
