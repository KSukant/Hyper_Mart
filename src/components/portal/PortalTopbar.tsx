'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  LifeBuoy,
  ReceiptText,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { usePortalContextStore } from '@/store/portalContextStore';
import type { EnterprisePortal } from '@/types/security';

export const PortalTopbar: React.FC = () => {
  const router = useRouter();
  const {
    activePortal,
    session,
    switchPortal,
    activeFacility,
    setActiveFacility,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
  } = usePortalContextStore();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const facilities = [
    'Coimbatore DC (Regional Hub)',
    'Chennai Central FC',
    'Bengaluru South DC',
    'Hyderabad Outer FC',
    'Mumbai Bhiwandi Hub',
  ];

  // Portal-scoped notification data
  const scopedNotifications = {
    support: [
      { id: 'n-s1', title: 'SLA Risk: Case #CS-9902', time: '5m ago', type: 'critical', desc: 'Damaged shipment response due in 25m' },
      { id: 'n-s2', title: 'Customer Reply: Meera K.', time: '18m ago', type: 'info', desc: 'Photo evidence uploaded for fresh produce damage' },
      { id: 'n-s3', title: 'Escalation Assigned: ESC-8812', time: '1h ago', type: 'warning', desc: 'Tier 2 supervisor approval required' },
    ],
    finance: [
      { id: 'n-f1', title: 'Refund Approval Required: ₹4,299', time: '2m ago', type: 'critical', desc: 'High-value customer return refund sign-off' },
      { id: 'n-f2', title: 'Gateway Batch Mismatch: HDFC UPI', time: '40m ago', type: 'warning', desc: '₹14,200 unreconciled in morning settlement' },
      { id: 'n-f3', title: 'COD Settlement Completed: Route 14', time: '2h ago', type: 'info', desc: '₹84,500 verified and deposited' },
    ],
    operations: [
      { id: 'n-o1', title: 'Cold-chain Temp Breach: Bay 02', time: '3m ago', type: 'critical', desc: 'Dairy cooler exceeded 4.5°C threshold' },
      { id: 'n-o2', title: 'Low Stock Alert: Farm Tomatoes', time: '22m ago', type: 'warning', desc: 'Only 7kg available, reorder threshold reached' },
      { id: 'n-o3', title: 'Picking Queue Backlog: Express Wave', time: '45m ago', type: 'info', desc: '14 orders awaiting picking in Zone A' },
    ],
  };

  const currentNotifications = scopedNotifications[activePortal] || [];

  const portalConfig: Record<EnterprisePortal, { label: string; badge: string; color: string; defaultRoute: string }> = {
    support: {
      label: 'Support Portal',
      badge: 'SUPPORT CONTEXT',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      defaultRoute: '/portal/support',
    },
    finance: {
      label: 'Finance Portal',
      badge: 'FINANCE CONTEXT',
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      defaultRoute: '/portal/payment-ledger',
    },
    operations: {
      label: 'Operations Manager Portal',
      badge: 'OPERATIONS CONTEXT',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      defaultRoute: '/portal',
    },
  };

  const currentPortalConfig = portalConfig[activePortal];

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
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchPortal = (target: EnterprisePortal) => {
    switchPortal(target);
    setIsProfileOpen(false);
    router.push(portalConfig[target].defaultRoute);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E1E8E1] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Brand & Workspace Context */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight text-[#053221]">
            HyperMart Operations
          </span>
          <span className="text-[11px] font-medium text-gray-400">/</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${currentPortalConfig.color}`}>
            {currentPortalConfig.label}
          </span>
        </div>

        {/* Facility Selector */}
        <div className="relative" ref={facilityRef}>
          <button
            onClick={() => setIsFacilityOpen(!isFacilityOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-gray-950 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all bg-gray-50/50"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="truncate max-w-[190px]">{activeFacility}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isFacilityOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                Select Operating Facility
              </div>
              {facilities.map((fac) => (
                <button
                  key={fac}
                  onClick={() => {
                    setActiveFacility(fac);
                    setIsFacilityOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 transition ${
                    activeFacility === fac ? 'text-emerald-800 font-bold bg-emerald-50/60' : 'text-gray-700'
                  }`}
                >
                  <span>{fac}</span>
                  {activeFacility === fac && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Scoped Search Bar */}
      <div className="relative flex-1 max-w-md mx-6" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activePortal} domain records...`}
            className="w-full bg-[#F3F5F3] hover:bg-[#EBEEEB] focus:bg-white text-xs pl-9 pr-8 py-2 rounded-xl border border-transparent focus:border-emerald-600 focus:outline-hidden transition-all text-gray-800 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Scoped Search Results Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
            <div className="px-3.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex items-center justify-between">
              <span>Scoped to {activePortal.toUpperCase()} domain</span>
              <span className="text-emerald-700 font-mono">{searchResults.length} results</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-500 space-y-1">
                <p className="font-semibold text-gray-700">No records found</p>
                <p className="text-[11px] text-gray-400">
                  Search is restricted to {activePortal} records. Cross-portal records are not accessible.
                </p>
              </div>
            ) : (
              searchResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsSearchFocused(false)}
                  className="block px-3.5 py-2 hover:bg-emerald-50 transition border-b border-gray-50 last:border-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 font-bold text-gray-600">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">{item.subtitle}</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Scoped Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-100 relative transition-all"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {currentNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">
                  {currentPortalConfig.label} Alerts
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentNotifications.length} Active
                </span>
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {currentNotifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-gray-50 transition text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{n.title}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active Portal & Role Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-gray-50/50"
          >
            <div className="w-7 h-7 rounded-lg bg-[#053221] text-[#C6F04A] font-black text-xs flex items-center justify-center">
              {session.roles[0].charAt(0).toUpperCase()}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-gray-900 leading-tight">{session.employeeId}</p>
              <p className="text-[10px] font-medium text-gray-500 leading-tight capitalize">
                {session.roles[0].replace('_', ' ')}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 space-y-2">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-950">Logged in as {session.employeeId}</p>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5">{session.userId}</p>
                <span className="inline-block text-[9.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1.5">
                  TLS 1.3 • AUDITED SESSION
                </span>
              </div>

              {/* Portal Context Switcher (Section 2) */}
              <div className="px-2 pt-1 pb-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-1 mb-1.5">
                  Switch Active Portal Context
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSwitchPortal('support')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      activePortal === 'support' ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LifeBuoy className="w-4 h-4 text-blue-600" />
                      <span>Support Portal</span>
                    </div>
                    {activePortal === 'support' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => handleSwitchPortal('finance')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      activePortal === 'finance' ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ReceiptText className="w-4 h-4 text-rose-600" />
                      <span>Finance Portal</span>
                    </div>
                    {activePortal === 'finance' && <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />}
                  </button>

                  <button
                    onClick={() => handleSwitchPortal('operations')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      activePortal === 'operations' ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Operations Manager</span>
                    </div>
                    {activePortal === 'operations' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="border-t border-gray-100 pt-1">
                <Link
                  href="/"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out to Gateway</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
