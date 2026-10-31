'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  ClipboardList,
  ImageIcon,
  AlertTriangle,
  CreditCard,
  PackageSearch,
  UserCircle,
  Leaf,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/delivery-partner/dashboard', icon: LayoutDashboard },
  { label: 'Route planning', href: '/delivery-partner/route-planning', icon: MapPin },
  { label: 'Delivery tasks', href: '/delivery-partner/tasks', icon: ClipboardList },
  { label: 'Proof of delivery', href: '/delivery-partner/proof-of-delivery', icon: ImageIcon },
  { label: 'Exceptions', href: '/delivery-partner/exceptions', icon: AlertTriangle },
  { label: 'COD collection', href: '/delivery-partner/cod-collection', icon: CreditCard },
  { label: 'Returns and handover', href: '/delivery-partner/returns', icon: PackageSearch },
  { label: 'Profile and help', href: '/delivery-partner/profile', icon: UserCircle },
];

export function DeliveryPartnerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/delivery-partner/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[240px] min-w-[240px] h-screen bg-[#073922] flex flex-col select-none shadow-xl z-40 relative flex-shrink-0">
      {/* Brand Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#0E4A2E]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#C6F04A] flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 text-[#073922] fill-[#073922]" />
          </div>
          <div>
            <p className="font-display font-extrabold text-white text-[15px] leading-none tracking-tight">
              HyperMart
            </p>
            <p className="text-[10px] font-semibold text-[#88B89F] mt-0.5 tracking-wide">
              Delivery Partner Portal
            </p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-colors duration-150',
                active
                  ? 'bg-[#C6F04A] text-[#073922] font-bold shadow-sm'
                  : 'text-[rgba(255,255,255,0.75)] hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'w-[18px] h-[18px] shrink-0',
                  active ? 'text-[#073922]' : 'text-[rgba(255,255,255,0.6)]'
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer illustration */}
      <div className="mx-3 mb-4 rounded-2xl bg-[#052E1A] border border-[#0E4A2E] px-4 py-4 overflow-hidden relative">
        {/* Decorative scooter silhouette (SVG) */}
        <svg
          className="absolute right-2 bottom-1 w-16 h-16 opacity-20"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <circle cx="14" cy="48" r="10" stroke="#C6F04A" strokeWidth="3" />
          <circle cx="50" cy="48" r="10" stroke="#C6F04A" strokeWidth="3" />
          <path d="M14 38 L24 20 L40 20 L50 38" stroke="#C6F04A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M28 20 L28 10 L38 10" stroke="#C6F04A" strokeWidth="2" />
          <rect x="24" y="28" width="20" height="10" rx="2" stroke="#C6F04A" strokeWidth="2" />
        </svg>

        <p className="font-display font-bold text-white text-[13px] leading-snug relative z-10">
          Delivering happier tomorrows
        </p>
        {/* Lime progress bar */}
        <div className="mt-3 h-1 w-full rounded-full bg-[#0E4A2E] overflow-hidden relative z-10">
          <div className="h-full w-[58%] rounded-full bg-[#C6F04A]" />
        </div>
      </div>
    </aside>
  );
}

