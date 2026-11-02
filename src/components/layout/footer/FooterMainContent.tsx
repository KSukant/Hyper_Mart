"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  ShoppingBasket,
  Headphones,
  Sparkles,
  Shield,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { FooterLogo } from "./FooterLogo";
import { site } from "@/mocks";

interface FooterMainContentProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

const NAV_COLUMNS = [
  {
    id: "departments",
    title: "Shop Departments",
    icon: <ShoppingBasket className="w-3.5 h-3.5 stroke-[2.5]" />,
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
    id: "care",
    title: "Customer Care",
    icon: <Headphones className="w-3.5 h-3.5 stroke-[2.5]" />,
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
    id: "services",
    title: "HyperMart Services",
    icon: <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />,
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
    id: "legal",
    title: "Policies & Legal",
    icon: <Shield className="w-3.5 h-3.5 stroke-[2.5]" />,
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

export function FooterMainContent({
  isVisible = false,
  prefersReducedMotion = false,
}: FooterMainContentProps) {
  const shouldAnimate = isVisible && !prefersReducedMotion;
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative w-full pt-10 pb-8 sm:pt-14 sm:pb-12 text-white">
      {/* ── Ambient Radial Glow behind Right Illustration ── */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 rounded-full bg-[#B8F34A]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          {/* ── Column 1: Brand & Direct Contact (spans 3 cols on lg) ── */}
          <div className="lg:col-span-3 space-y-5">
            {/* Logo (Zero white background, vector specification matching Image 1) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : shouldAnimate
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.94 }
              }
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2"
            >
              <FooterLogo />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : shouldAnimate
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="text-xs sm:text-[13px] text-white/85 leading-relaxed max-w-xs font-medium"
            >
              Fresh food, fashion, electronics and beauty — delivered to your door.
            </motion.p>

            {/* Direct Contact Channels */}
            <div className="space-y-3 pt-1 text-xs">
              {/* Toll Free */}
              <motion.a
                href="tel:1800000000"
                whileHover={!prefersReducedMotion ? { x: 3 } : undefined}
                className="group flex items-center gap-3 text-white/90 transition hover:text-white"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#085A2E] text-[#B8F34A] border border-[#B8F34A]/30 group-hover:bg-[#B8F34A] group-hover:text-[#085A2E] transition-colors shadow-xs">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-white/60 tracking-wider">
                    Toll-Free Customer Support
                  </span>
                  <span className="font-bold text-white group-hover:text-[#B8F34A] transition-colors text-xs">
                    {site.supportPhone}
                  </span>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={!prefersReducedMotion ? { x: 3 } : undefined}
                className="group flex items-center gap-3 text-white/90 transition hover:text-white"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#085A2E] text-[#B8F34A] border border-[#B8F34A]/30 group-hover:bg-[#B8F34A] group-hover:text-[#085A2E] transition-colors shadow-xs">
                  <MessageCircle className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-white/60 tracking-wider">
                    WhatsApp Assistance
                  </span>
                  <span className="font-bold text-white group-hover:text-[#B8F34A] transition-colors text-xs">
                    {site.supportWhatsApp}
                  </span>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:help@hypermart.example"
                whileHover={!prefersReducedMotion ? { x: 3 } : undefined}
                className="group flex items-center gap-3 text-white/90 transition hover:text-white"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#085A2E] text-[#B8F34A] border border-[#B8F34A]/30 group-hover:bg-[#B8F34A] group-hover:text-[#085A2E] transition-colors shadow-xs">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-white/60 tracking-wider">
                    Email Inquiries
                  </span>
                  <span className="font-bold text-white group-hover:text-[#B8F34A] transition-colors text-xs">
                    {site.supportEmail}
                  </span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* ── Middle: 4 Categorized Navigation Columns (spans 7 cols on lg) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 lg:col-span-7">
            {NAV_COLUMNS.map((col, cIdx) => {
              const isOpen = !!openAccordions[col.id];
              return (
                <div key={col.id} className="space-y-3">
                  {/* Column Header: Lime-green Pill Badge with Icon */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1, y: 0 }
                          : shouldAnimate
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 12 }
                      }
                      transition={{ duration: 0.45, delay: 0.2 + cIdx * 0.1, ease: "easeOut" }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#B8F34A] px-3 py-1 text-xs font-black text-[#003D29] shadow-xs select-none"
                    >
                      {col.icon}
                      <span>{col.title}</span>
                    </motion.div>

                    {/* Mobile Expand Accordion Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(col.id)}
                      className="p-1 sm:hidden text-white/70 hover:text-white"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Links List with chevron arrows */}
                  <ul className={`space-y-2 text-xs sm:text-[13px] ${isOpen ? "block" : "hidden sm:block"}`}>
                    {col.links.map((link, lIdx) => (
                      <motion.li
                        key={link.label}
                        initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1, x: 0 }
                            : shouldAnimate
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -8 }
                        }
                        transition={{
                          duration: 0.35,
                          delay: 0.35 + cIdx * 0.08 + lIdx * 0.03,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={link.href}
                          className="group/link inline-flex items-center gap-1.5 text-white/80 hover:text-[#B8F34A] transition-colors py-0.5"
                        >
                          <ChevronRight className="h-3 w-3 text-white/40 group-hover/link:text-[#B8F34A] group-hover/link:translate-x-0.5 transition-all" />
                          <span>{link.label}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* ── Column 3: 3D Shopping Bag Showcase on Right (spans 2 cols on lg) ── */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center shrink-0 relative">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : shouldAnimate
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 20 }
              }
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[210px] pointer-events-none select-none"
            >
              <motion.div
                animate={shouldAnimate ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full flex items-center justify-center"
              >
                <Image
                  src="/footer-grocery-bag-clean.png"
                  alt="HyperMart Fresh Groceries & Rewards Shopping Bag"
                  width={208}
                  height={236}
                  className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

