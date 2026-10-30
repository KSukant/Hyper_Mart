"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Headphones,
  ArrowRight,
  Lock,
  Users,
  Package,
  Star,
  Leaf,
} from "lucide-react";

export default function UnifiedLandingPage() {
  return (
    <div className="min-h-screen bg-[#F2F5F2] text-[#19271E] font-sans selection:bg-[#C6F04A] selection:text-[#053221] flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Organic Wave Accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft curving sage green background element on top/left */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[#E3EDE5]/60 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#E8EFE8]/50 blur-3xl" />
      </div>

      {/* ── 1. Top Unified Header ── */}
      <header className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-8 pt-4 pb-3 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0B5132] flex items-center justify-center text-[#C6F04A] shadow-xs">
            <ShoppingCart className="w-5 h-5 stroke-[2.4]" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight text-[#0B5132] leading-none block">
              HyperMart
            </span>
            <span className="text-[9.5px] font-bold text-[#55735F] tracking-wide block mt-0.5">
              Good Products. Greater Living.
            </span>
          </div>
        </div>

        {/* Center Pillars */}
        <nav className="hidden md:flex items-center gap-3 text-xs font-semibold text-[#486352]">
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
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#486352] hover:text-[#0B5132] transition"
          >
            <Headphones className="w-3.5 h-3.5 text-[#0B5132]" />
            <span>Need help?</span>
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0B5132]/30 bg-white text-xs font-bold text-[#0B5132] hover:bg-[#0B5132] hover:text-white transition-all shadow-2xs"
          >
            <span>Employee login</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ── 2. Main Workspace Selection Section ── */}
      <main className="relative z-10 flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 py-2 sm:py-3 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-6 lg:gap-8 items-stretch">
          {/* ── Left Hero Panel (Supermarket Photography Card) ── */}
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] min-h-[460px] lg:min-h-[580px] shadow-xl border border-black/5 bg-[#083520] flex flex-col justify-end p-5 sm:p-7">
            {/* Background Supermarket Image */}
            <div
              className="absolute inset-0 bg-cover bg-left sm:bg-center"
              style={{
                backgroundImage: "url('/landing/hero-store.jpg')",
              }}
            >
              {/* Subtle top/bottom gradient scrim for visual contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042012]/95 via-[#042012]/20 to-transparent" />
            </div>

            {/* Floating Glass Metric Card at Bottom */}
            <div className="relative z-10 rounded-2xl sm:rounded-3xl bg-[#062A1A]/85 backdrop-blur-md border border-white/15 p-5 text-white shadow-2xl space-y-3.5">
              <p className="text-sm font-bold text-white/95 leading-snug">
                A connected retail ecosystem for customers, teams and operations.
              </p>

              {/* Slider Dash Indicators */}
              <div className="flex items-center gap-1.5">
                <span className="w-7 h-1 rounded-full bg-[#22C55E]" />
                <span className="w-3.5 h-1 rounded-full bg-white/30" />
                <span className="w-3.5 h-1 rounded-full bg-white/30" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-left">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Users className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">10M+</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Happy Customers</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Package className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">500K+</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Products Delivered</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#A7D1BA]">
                    <Star className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]" />
                    <span className="font-mono font-black text-sm sm:text-base text-white">98%</span>
                  </div>
                  <span className="text-[10px] text-white/70 block leading-tight">Service Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Workspace Selection Gateway ── */}
          <div className="flex flex-col justify-between space-y-4 sm:space-y-5">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#E5EFE7] border border-[#CBDDCE] text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0B5132]">
                WELCOME TO HYPERMART
              </span>

              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#16271E] mt-2 leading-tight">
                Choose your workspace
              </h1>
              <p className="text-xs sm:text-sm text-[#5B7564] font-medium mt-0.5">
                Select a portal to sign in and continue your journey.
              </p>

              {/* ── 4 Available Active Portals (Row 1) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-4 sm:mt-5">
                {/* 1. Customer Portal */}
                <Link
                  href="/shop"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-4 shadow-xs hover:shadow-lg hover:border-[#20A065]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[165px]"
                >
                  <div className="space-y-2.5">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#E8F8F0] border border-[#C5F0DA]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-customer.jpg"
                        alt="Customer Portal"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#16271E] group-hover:text-[#20A065] transition">
                        Customer Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-0.5 leading-snug">
                        Shop, track orders, manage account and more.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <span className="w-7 h-7 rounded-full bg-[#20A065] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                {/* 2. Admin Portal */}
                <Link
                  href="/admin/login?portal=admin"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-4 shadow-xs hover:shadow-lg hover:border-[#E59819]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[165px]"
                >
                  <div className="space-y-2.5">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#FEF4E5] border border-[#FDE1B5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-admin.jpg"
                        alt="Admin Portal"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#16271E] group-hover:text-[#E59819] transition">
                        Admin Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-0.5 leading-snug">
                        Platform management, users, inventory and settings.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <span className="w-7 h-7 rounded-full bg-[#E59819] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                {/* 3. Support Portal */}
                <Link
                  href="/portal/support"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-4 shadow-xs hover:shadow-lg hover:border-[#51A2E4]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[165px]"
                >
                  <div className="space-y-2.5">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#EBF7FD] border border-[#BAE4F9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-support.jpg"
                        alt="Support Portal"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#16271E] group-hover:text-[#51A2E4] transition">
                        Support Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-0.5 leading-snug">
                        Customer cases, returns, warranty and resolutions.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <span className="w-7 h-7 rounded-full bg-[#51A2E4] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                {/* 4. Finance Portal */}
                <Link
                  href="/portal/payment-ledger"
                  className="group rounded-2xl bg-white border border-[#E1EAE3] p-4 shadow-xs hover:shadow-lg hover:border-[#E85955]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[165px]"
                >
                  <div className="space-y-2.5">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#FEEFEF] border border-[#FDC8C8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-finance.jpg"
                        alt="Finance Portal"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-[#16271E] group-hover:text-[#E85955] transition">
                        Finance Portal
                      </h3>
                      <p className="text-[11px] text-[#637C6C] mt-0.5 leading-snug">
                        Payments, refunds, reconciliation and reports.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <span className="w-7 h-7 rounded-full bg-[#E85955] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>

              {/* ── 3 Coming Soon Portals (Row 2) ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5">
                {/* 5. Warehouse Manager (Coming Soon) */}
                <div className="rounded-2xl bg-white/75 border border-[#E1EAE3] p-4 shadow-2xs flex flex-col justify-between min-h-[155px]">
                  <div className="space-y-2">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#F3EFFB] border border-[#E1D7F7]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-warehouse.jpg"
                        alt="Warehouse Manager"
                        className="w-full h-full object-cover object-center"
                      />
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

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#EDF3EF] text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] font-bold text-[#556E5F]">
                      Coming Soon
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 6. Delivery Partner (Coming Soon) */}
                <div className="rounded-2xl bg-white/75 border border-[#E1EAE3] p-4 shadow-2xs flex flex-col justify-between min-h-[155px]">
                  <div className="space-y-2">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#E8F8F0] border border-[#C5F0DA]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-delivery.jpg"
                        alt="Delivery Partner"
                        className="w-full h-full object-cover object-center"
                      />
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

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#EDF3EF] text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] font-bold text-[#556E5F]">
                      Coming Soon
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF0EC] text-[#556E5F] flex items-center justify-center">
                      <Lock className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 7. Operations Manager (Coming Soon) */}
                <div className="rounded-2xl bg-white/75 border border-[#E1EAE3] p-4 shadow-2xs flex flex-col justify-between min-h-[155px]">
                  <div className="space-y-2">
                    <div className="relative w-full h-14 rounded-xl overflow-hidden bg-[#EBF5FB] border border-[#C5E3F7]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/landing/card-operations.jpg"
                        alt="Operations Manager"
                        className="w-full h-full object-cover object-center"
                      />
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

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#EDF3EF] text-[10px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EBF0EC] font-bold text-[#556E5F]">
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
            <div className="rounded-2xl sm:rounded-3xl bg-white/95 border border-[#E1EAE3] p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#E8F8F0] border border-[#C5F0DA] flex items-center justify-center text-[#0B5132] shadow-2xs">
                  <Leaf className="w-5 h-5 fill-[#0B5132]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-base sm:text-lg text-[#16271E] tracking-tight">
                    People. Products. Possibilities.
                  </h4>
                  <div className="w-12 h-1 rounded-full bg-[#20A065] mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-semibold text-[#5B7564]">
                <span className="text-right leading-tight">
                  Different teams. A shared purpose. <br className="hidden sm:inline" /> A better tomorrow.
                </span>
                <Link
                  href="/shop"
                  className="w-8 h-8 rounded-full bg-[#D7F3E2] text-[#0B5132] hover:bg-[#20A065] hover:text-white transition flex items-center justify-center shadow-xs flex-shrink-0"
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
