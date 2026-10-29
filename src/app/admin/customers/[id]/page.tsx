'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Award,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function CustomerProfilePage() {
  const params = useParams();
  const { addToast } = useAdminStore();
  const customerId = (params.id as string) || 'CUS-104832';

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'refunds' | 'activity'>('orders');
  const [accountStatus, setAccountStatus] = useState<'Active' | 'Suspended'>('Active');

  const handleToggleStatus = () => {
    const nextStatus = accountStatus === 'Active' ? 'Suspended' : 'Active';
    setAccountStatus(nextStatus);
    addToast({
      title: `Customer Account ${nextStatus}`,
      description: `Customer ${customerId} is now marked as ${nextStatus}.`,
      type: nextStatus === 'Suspended' ? 'warning' : 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/customer-care"
            className="p-2 rounded-xl bg-white border border-[#E1E8E1] text-[#6B756F] hover:text-[#07563B] hover:bg-[#F7F7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#6B756F]">{customerId}</span>
              <span className="text-xs text-[#E1E8E1]">•</span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  accountStatus === 'Active'
                    ? 'bg-[#EAF5E9] text-[#07563B] border border-[#C6F04A]'
                    : 'bg-rose-50 text-[#E86B62] border border-rose-200'
                }`}
              >
                {accountStatus}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-0.5">
              Priya Sharma
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/customer-care"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] shadow-xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#07563B]" />
            Open Care Desk
          </Link>
          <button
            onClick={handleToggleStatus}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors ${
              accountStatus === 'Active'
                ? 'bg-white border border-[#E86B62]/30 text-[#E86B62] hover:bg-rose-50'
                : 'bg-[#EAF5E9] border border-[#C6F04A] text-[#07563B]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {accountStatus === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
          </button>
        </div>
      </div>

      {/* Profile Overview & Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Customer Identity Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#07563B] text-white flex items-center justify-center font-bold text-lg">
              PS
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#07563B]">
                <Award className="w-3.5 h-3.5" /> Gold Member
              </div>
              <div className="text-xs text-[#6B756F]">Joined Jan 14, 2024</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs pt-2 border-t border-[#E1E8E1]">
            <div className="flex items-center gap-2 text-[#202A25]">
              <Phone className="w-3.5 h-3.5 text-[#07563B]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-[#202A25]">
              <Mail className="w-3.5 h-3.5 text-[#07563B]" />
              <span>priya.sharma@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-[#202A25]">
              <MapPin className="w-3.5 h-3.5 text-[#07563B]" />
              <span>Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Lifetime Spend */}
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Lifetime Spend
          </span>
          <div className="text-3xl font-black text-[#07563B] mt-1">₹28,490</div>
          <p className="text-xs text-[#6B756F] mt-1">Average basket size: <strong>₹1,187</strong> across 24 orders</p>
        </div>

        {/* Loyalty Wallet */}
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Loyalty Wallet & Credits
          </span>
          <div className="text-3xl font-black text-[#202A25] mt-1">₹320.00</div>
          <p className="text-xs text-[#07563B] font-semibold mt-1">3,200 HyperPoints available</p>
        </div>

        {/* Trust & Risk Score */}
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Risk & Fraud Profile
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-black text-[#07563B]">98 / 100</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#EAF5E9] text-[#07563B]">
              Trusted
            </span>
          </div>
          <p className="text-xs text-[#6B756F] mt-1">0 chargebacks, 1 doorstep return claim</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E1E8E1] pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-[#07563B] text-white shadow-xs'
              : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
          }`}
        >
          Order History (24)
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'addresses'
              ? 'bg-[#07563B] text-white shadow-xs'
              : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
          }`}
        >
          Saved Addresses (3)
        </button>
        <button
          onClick={() => setActiveTab('refunds')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'refunds'
              ? 'bg-[#07563B] text-white shadow-xs'
              : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
          }`}
        >
          Refunds & Claims (1)
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'activity'
              ? 'bg-[#07563B] text-white shadow-xs'
              : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
          }`}
        >
          Audit & Care Timeline
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E1E8E1] flex justify-between items-center text-xs">
            <span className="font-bold text-[#202A25]">Recent Customer Orders</span>
            <span className="text-[#6B756F]">Showing last 5 completed purchases</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-2.5 px-4 font-semibold">Order ID</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Items Summary</th>
                <th className="py-2.5 px-4 font-semibold">Total (INR)</th>
                <th className="py-2.5 px-4 font-semibold">Payment</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              <tr className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-bold text-[#07563B] font-mono">HM784321</td>
                <td className="py-3 px-4 text-[#6B756F]">Today, 10:24 AM</td>
                <td className="py-3 px-4 text-[#202A25]">Tide Matic 2kg, Amul Milk 1L, Atta 5kg</td>
                <td className="py-3 px-4 font-bold text-[#07563B]">₹349</td>
                <td className="py-3 px-4">UPI (Instant)</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                    Delivered
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href="/admin/orders/ord-88219"
                    className="text-[#07563B] hover:underline font-semibold"
                  >
                    Inspect
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-bold text-[#07563B] font-mono">HM761102</td>
                <td className="py-3 px-4 text-[#6B756F]">Apr 22, 2025</td>
                <td className="py-3 px-4 text-[#202A25]">Aashirvaad Atta 10kg, Fortune Oil</td>
                <td className="py-3 px-4 font-bold text-[#07563B]">₹1,240</td>
                <td className="py-3 px-4">Credit Card</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                    Delivered
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href="/admin/orders/ord-88219"
                    className="text-[#07563B] hover:underline font-semibold"
                  >
                    Inspect
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#07563B] shadow-xs space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#07563B] uppercase text-[11px]">Primary Residence</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EAF5E9] text-[#07563B]">
                Default
              </span>
            </div>
            <p className="font-bold text-sm text-[#202A25]">B-302, Lake View Apartments</p>
            <p className="text-[#6B756F]">28th Main Road, Sector 1, HSR Layout, Bengaluru 560102</p>
            <p className="text-[#6B756F] pt-2 border-t border-[#E1E8E1]">Contact: +91 98765 43210</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-2 text-xs">
            <span className="font-bold text-[#6B756F] uppercase text-[11px] block">Work / Office</span>
            <p className="font-bold text-sm text-[#202A25]">Tech Park 4, 3rd Floor</p>
            <p className="text-[#6B756F]">Koramangala Ring Road, Bengaluru 560095</p>
            <p className="text-[#6B756F] pt-2 border-t border-[#E1E8E1]">Gate security passcode enabled</p>
          </div>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-[#202A25]">Refund Claims History</span>
            <Link href="/admin/refunds" className="text-[#07563B] hover:underline font-semibold">
              Refund Operations Queue
            </Link>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] flex justify-between items-center">
            <div>
              <div className="font-bold text-[#202A25]">Claim #CP-44321 • Order #HM784321</div>
              <p className="text-[#6B756F] mt-0.5">Leaked milk pouch compensation (₹349)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              Pending Tier-1 Approval
            </span>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-[#202A25]">Customer Lifecycle & Care Audit</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#07563B] mt-1" />
              <div>
                <strong className="text-[#202A25] block">Customer Service Ticket Opened</strong>
                <span className="text-[#6B756F]">Priya Sharma reported milk leakage via In-App Chat • Today 10:35 AM</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#07563B] mt-1" />
              <div>
                <strong className="text-[#202A25] block">Delivered Order HM784321</strong>
                <span className="text-[#6B756F]">Driver Ramesh Kumar verified doorstep handoff • Today 10:24 AM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
