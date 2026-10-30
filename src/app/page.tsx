"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Package,
  UserCheck,
  Laptop,
  Headphones,
  CreditCard,
  Calculator,
  Warehouse,
  Truck,
  BarChart3,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
  Star,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";

export default function UnifiedLandingPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#1F2D25] flex flex-col font-sans selection:bg-[#C6F04A] selection:text-[#053221]">
      {/* ── 1. Top Unified Header ── */}
      <header className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5132] flex items-center justify-center text-[#C6F04A] shadow-md">
            <ShoppingCart className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display font-black text-2xl tracking-tight text-[#0B5132] leading-none block">
              HyperMart
            </span>
            <span className="text-[10px] font-bold text-[#4B6B56] tracking-wide mt-0.5 block">
              Good Products. Greater Living.
            </span>
          </div>
        </div>

        {/* Center Pillars */}
        <nav className="hidden md:flex items-center gap-3 text-xs font-semibold text-[#4B6B56]">
          <Link href="/shop" className="hover:text-[#0B5132] transition">Shop</Link>
          <span className="text-neutral-300">•</span>
          <span className="text-[#0B5132] font-bold">Operate</span>
          <span className="text-neutral-300">•</span>
          <span className="hover:text-[#0B5132] transition">Manage</span>
          <span className="text-neutral-300">•</span>
          <span className="hover:text-[#0B5132] transition">Grow</span>
        </nav>

        {/* Right Top Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/help"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#4B6B56] hover:text-[#0B5132] transition"
          >
            <Headphones className="w-4 h-4 text-[#0B5132]" />
            <span>Need help?</span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#0B5132]/30 bg-white text-xs font-bold text-[#0B5132] hover:bg-[#0B5132] hover:text-white transition-all shadow-2xs"
          >
            <span>Employee login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ── 2. Main Workspace Selection Section ── */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 pb-10 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.95fr] gap-6 lg:gap-8 items-stretch">
          {/* ── Left Hero Panel (Supermarket Photography Card) ── */}
          <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl min-h-[480px] lg:min-h-[640px] shadow-xl border border-black/5 bg-[#083520] flex flex-col justify-end p-6 sm:p-8">
            {/* Background Supermarket Image */}
            <div
              className="absolute inset-0 bg-cover bg-left sm:bg-center"
              style={{
                backgroundImage: "url('/hero/supermarket-aisle.jpg')",
              }}
            >
              {/* Gradient Scrim for readable bottom card */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042012]/95 via-[#042012]/30 to-transparent" />
            </div>

            {/* Floating Glass Metric Card at Bottom */}
            <div className="relative z-10 rounded-2xl sm:rounded-3xl bg-[#052818]/90 backdrop-blur-md border border-white/15 p-5 sm:p-6 text-white shadow-2xl space-y-4">
              <p className="text-sm sm:text-base font-bold text-white/95 leading-snug">
                A connected retail ecosystem for customers, teams and operations.
              </p>

              {/* Slider Dash Indicators */}
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-1 rounded-full bg-[#C6F04A]" />
                <span className="w-4 h-1 rounded-full bg-white/20" />
                <span className="w-4 h-1 rounded-full bg-white/20" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Users className="w-3.5 h-3.5 text-[#C6F04A]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">10M+</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Happy Customers</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Package className="w-3.5 h-3.5 text-[#C6F04A]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">500K+</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Products Delivered</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Star className="w-3.5 h-3.5 text-[#C6F04A] fill-[#C6F04A]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">98%</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Service Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Workspace Selection Gateway ── */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE7] border border-[#CBDDCE] text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0B5132]">
                WELCOME TO HYPERMART
              </span>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#16271E] mt-3 leading-tight">
                Choose your workspace
              </h1>
              <p className="text-xs sm:text-sm text-[#5B7564] font-medium mt-1">
                Select a portal to sign in and continue your journey.
              </p>

              {/* ── 4 Available Active Portals (Row 1) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-6">
                {/* 1. Customer Portal */}
                <Link
                  href="/shop"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-5 shadow-xs hover:shadow-lg hover:border-[#10B981]/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F8F0] border border-[#C5F0DA] flex items-center justify-center text-[#10B981] shadow-2xs">
                      <div className="flex items-center justify-center -space-x-1">
                        <ShoppingCart className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#16271E] group-hover:text-[#10B981] transition">
                        Customer Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-1 leading-snug">
                        Shop, track orders, manage account and more.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

                {/* 2. Admin Portal */}
                <Link
                  href="/admin/login?portal=admin"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-5 shadow-xs hover:shadow-lg hover:border-[#F59E0B]/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FEF4E5] border border-[#FDE1B5] flex items-center justify-center text-[#F59E0B] shadow-2xs">
                      <UserCheck className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#16271E] group-hover:text-[#F59E0B] transition">
                        Admin Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-1 leading-snug">
                        Platform management, users, inventory and settings.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <span className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

                {/* 3. Support Portal */}
                <Link
                  href="/portal/support"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-5 shadow-xs hover:shadow-lg hover:border-[#38BDF8]/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EBF7FD] border border-[#BAE4F9] flex items-center justify-center text-[#0284C7] shadow-2xs">
                      <Headphones className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#16271E] group-hover:text-[#0284C7] transition">
                        Support Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-1 leading-snug">
                        Customer cases, returns, warranty and resolutions.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <span className="w-8 h-8 rounded-full bg-[#38BDF8] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>

                {/* 4. Finance Portal */}
                <Link
                  href="/portal/payment-ledger"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-5 shadow-xs hover:shadow-lg hover:border-[#F87171]/50 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[175px]"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FEEFEF] border border-[#FDC8C8] flex items-center justify-center text-[#EF4444] shadow-2xs">
                      <CreditCard className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#16271E] group-hover:text-[#EF4444] transition">
                        Finance Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-1 leading-snug">
                        Payments, refunds, reconciliation and reports.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <span className="w-8 h-8 rounded-full bg-[#F87171] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* ── 3 Coming Soon Portals (Row 2) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
                {/* 5. Warehouse Manager (Coming Soon) */}
                <div className="rounded-2xl bg-white/70 border border-[#E1EAE3] p-5 shadow-2xs flex flex-col justify-between min-h-[160px] opacity-80">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EFFB] border border-[#E1D7F7] flex items-center justify-center text-[#7C3AED]">
                      <Warehouse className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#16271E]">
                        Warehouse Manager
                      </h3>
                      <p className="text-[11px] text-[#718779] mt-0.5 leading-snug">
                        Inventory, fulfilment and warehouse operations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EDF3EF]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[10px] font-bold text-[#556E5F]">
                      Coming Soon
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 6. Delivery Partner (Coming Soon) */}
                <div className="rounded-2xl bg-white/70 border border-[#E1EAE3] p-5 shadow-2xs flex flex-col justify-between min-h-[160px] opacity-80">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] border border-[#C5F0DA] flex items-center justify-center text-[#059669]">
                      <Truck className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#16271E]">
                        Delivery Partner
                      </h3>
                      <p className="text-[11px] text-[#718779] mt-0.5 leading-snug">
                        Deliveries, routes and partner management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EDF3EF]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[10px] font-bold text-[#556E5F]">
                      Coming Soon
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 7. Operations Manager (Coming Soon) */}
                <div className="rounded-2xl bg-white/70 border border-[#E1EAE3] p-5 shadow-2xs flex flex-col justify-between min-h-[160px] opacity-80">
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF5FB] border border-[#C5E3F7] flex items-center justify-center text-[#0284C7]">
                      <BarChart3 className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#16271E]">
                        Operations Manager
                      </h3>
                      <p className="text-[11px] text-[#718779] mt-0.5 leading-snug">
                        End-to-end operations and business insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EDF3EF]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[10px] font-bold text-[#556E5F]">
                      Coming Soon
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bottom Full-Width Brand Banner ── */}
            <div className="rounded-2xl sm:rounded-3xl bg-white/90 border border-[#E1EAE3] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F8F0] border border-[#C5F0DA] flex items-center justify-center text-[#0B5132] shadow-2xs">
                  <Leaf className="w-5 h-5 fill-[#0B5132]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base sm:text-lg text-[#16271E] tracking-tight">
                    People. Products. Possibilities.
                  </h4>
                  <div className="w-12 h-1 rounded-full bg-[#10B981] mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-semibold text-[#5B7564]">
                <span className="text-right leading-snug">
                  Different teams. A shared purpose. <br className="hidden sm:inline" /> A better tomorrow.
                </span>
                <Link
                  href="/shop"
                  className="w-9 h-9 rounded-full bg-[#D7F3E2] text-[#0B5132] hover:bg-[#10B981] hover:text-white transition flex items-center justify-center shadow-xs flex-shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
