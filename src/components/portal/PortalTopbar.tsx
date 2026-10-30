'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Building2,
  ChevronDown,
  User,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  LogOut,
  ExternalLink,
  X,
  CreditCard,
  RefreshCw,
} from 'lucide-react';
import { usePortalStore } from '@/store/portalStore';
import Link from 'next/link';

export const PortalTopbar: React.FC = () => {
  const {
    activeFacility,
    setActiveFacility,
    currentRole,
    setCurrentRole,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    addToast,
  } = usePortalStore();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const facilities = [
    'Coimbatore DC (Regional Hub)',
    'Chennai Central FC',
    'Bengaluru South DC',
    'Hyderabad Outer FC',
    'Mumbai Bhiwandi Hub',
  ];

  const roles = [
    'Operations Lead (Full Access)',
    'Support Agent (Tier 1)',
    'Support Manager (Tier 2)',
    'Finance Analyst',
    'Finance Manager (Dual Approver)',
    'Governance Auditor (Read Only)',
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (facilityRef.current && !facilityRef.current.contains(e.target as Node)) {
        setIsFacilityOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-[#E1E8E1] px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Brand & Workspace Context */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight text-[#053221]">
            HyperMart Operations
          </span>
          <span className="text-[11px] font-medium text-gray-400">/</span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Enterprise Portal
          </span>
        </div>

        {/* Facility Selector */}
        <div className="relative" ref={facilityRef}>
          <button
            onClick={() => setIsFacilityOpen(!isFacilityOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{activeFacility}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isFacilityOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Select Operating Facility
              </div>
              {facilities.map((fac) => (
                <button
                  key={fac}
                  onClick={() => {
                    setActiveFacility(fac);
                    setIsFacilityOpen(false);
                    addToast('Facility Switched', `Active scope shifted to ${fac}`, 'info');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                    fac === activeFacility ? 'font-bold text-emerald-800 bg-emerald-50/50' : 'text-gray-700'
                  }`}
                >
                  <span>{fac}</span>
                  {fac === activeFacility && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8 relative">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-gray-50 text-xs transition-all ${
            isSearchFocused
              ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Case ID, Order ID, Customer, SKU, Payment ID, Refund ID, Serial..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 text-xs"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="text-[10px] bg-white border border-gray-200 text-gray-400 font-mono px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls: Portal switcher, Notifications, Help, Profile */}
      <div className="flex items-center gap-3">
        {/* Storefront Link */}
        <Link
          href="/"
          target="_blank"
          className="text-xs font-medium text-gray-600 hover:text-emerald-700 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          title="Open Customer Storefront in new tab"
        >
          <span>Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </Link>

        {/* Notifications Icon & Popover */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Priority Notifications</h4>
                  <p className="text-[10px] text-gray-500">Real-time alerts & SLA escalations</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-semibold text-emerald-700 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {notifications.map((n) => {
                  const isDanger = n.type === 'danger' || n.severity === 'critical';
                  const isWarning = n.type === 'warning' || n.severity === 'high';
                  const timestamp = n.timestamp || n.time || 'Recently';

                  return (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isDanger
                            ? 'bg-rose-100 text-rose-600'
                            : isWarning
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isDanger ? (
                          <ShieldAlert className="w-3.5 h-3.5" />
                        ) : isWarning ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">{n.title}</span>
                          <span className="text-[10px] text-gray-400">{timestamp}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 pt-2 border-t border-gray-100 text-center">
                <Link
                  href="/portal/audit-history"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-[11px] font-semibold text-emerald-800 hover:underline"
                >
                  View full security & audit stream →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <Link
          href="/portal/support"
          className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          title="Operations Help & Guidelines"
        >
          <HelpCircle className="w-4 h-4" />
        </Link>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-gray-200" />

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#053221] text-[#C6F04A] font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/30">
              PN
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-gray-900 leading-tight">Priya Nair</div>
              <div className="text-[10px] text-gray-500 leading-none">Ops Lead • Coimbatore</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl py-3 z-50">
              <div className="px-4 pb-3 border-b border-gray-100">
                <div className="font-bold text-sm text-gray-900">Priya Nair</div>
                <div className="text-xs text-gray-500">priya.nair@hypermart.internal</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    Active • Shift A (09:00 - 18:00)
                  </span>
                </div>
              </div>

              {/* Role Simulation Switcher */}
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Active Operational Role
                </div>
                <div className="space-y-1">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setCurrentRole(r);
                        addToast('Role Updated', `Simulating access privileges as: ${r}`, 'info');
                      }}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                        r === currentRole
                          ? 'bg-emerald-50 text-emerald-900 font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2 space-y-1 text-xs text-gray-700">
                <div className="flex justify-between py-1 text-[11px]">
                  <span className="text-gray-400">Regional DC</span>
                  <span className="font-semibold text-gray-800">Zone 04 South</span>
                </div>
                <div className="flex justify-between py-1 text-[11px]">
                  <span className="text-gray-400">Security Clearance</span>
                  <span className="font-semibold text-emerald-700">Level 4 (Finance Dual)</span>
                </div>
              </div>

              <div className="px-4 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    addToast('Shift Active', 'Shift logging maintained in session', 'info');
                  }}
                  className="w-full flex items-center gap-2 text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out / End Shift</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
