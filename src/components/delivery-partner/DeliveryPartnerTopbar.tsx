'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, LogOut, CheckCircle2, User } from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { cn } from '@/lib/cn';
import type { PartnerStatus } from '@/types/delivery';
import { MOCK_PARTNER } from '@/mocks/deliveryData';

const STATUS_LABELS: Record<PartnerStatus, string> = {
  online: 'Online',
  offline: 'Offline',
  on_break: 'On break',
};
const STATUS_COLORS: Record<PartnerStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  on_break: 'bg-amber-400',
};

export function DeliveryPartnerTopbar() {
  const { partnerStatus, setPartnerStatus, notifications, markAllNotificationsRead } = useDeliveryStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setIsStatusOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between shrink-0 z-30 shadow-sm">
      {/* Left spacer */}
      <div />

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setIsNotifOpen((v) => !v); if (!isNotifOpen) markAllNotificationsRead(); }}
            className="relative w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">Notifications</p>
                <span className="text-xs text-gray-400">{notifications.length} alerts</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={cn('px-4 py-3', !n.read && 'bg-emerald-50/50')}>
                    <p className="text-xs font-bold text-gray-900">{n.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.body}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Online/Offline Status */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => setIsStatusOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition text-xs font-semibold text-gray-700"
          >
            <span className={cn('w-2 h-2 rounded-full', STATUS_COLORS[partnerStatus])} />
            {STATUS_LABELS[partnerStatus]}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isStatusOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
              {(Object.keys(STATUS_LABELS) as PartnerStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setPartnerStatus(s); setIsStatusOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', STATUS_COLORS[s])} />
                    {STATUS_LABELS[s]}
                  </div>
                  {partnerStatus === s && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50/50 transition"
          >
            <div className="w-7 h-7 rounded-full bg-[#073922] flex items-center justify-center text-[#C6F04A] font-bold text-xs">
              RK
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-gray-900 leading-tight">{MOCK_PARTNER.name}</p>
              <p className="text-[10px] text-gray-500 leading-tight">Delivery Partner</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 space-y-1">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">{MOCK_PARTNER.name}</p>
                <p className="text-[10px] text-gray-500 font-mono">{MOCK_PARTNER.id}</p>
              </div>
              <Link
                href="/delivery-partner/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium hover:bg-gray-50 transition text-gray-700"
              >
                <User className="w-3.5 h-3.5" />
                Profile & Help
              </Link>
              <div className="border-t border-gray-100 pt-1">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

