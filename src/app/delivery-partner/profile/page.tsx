'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Phone,
  Mail,
  Shield,
  Star,
  Clock,
  Headphones,
  Award,
  Truck,
  CheckCircle2,
  FileText,
  LogOut,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { MOCK_PARTNER } from '@/mocks/deliveryData';

export default function ProfileAndHelpPage() {
  const { partnerStatus, route, tasks } = useDeliveryStore();
  const completedCount = tasks.filter((t) => t.status === 'delivered').length;

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Partner Profile & Help Desk
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Manage your account credentials, partner badges, shifts and support escalation.
        </p>
      </div>

      {/* ── Partner Profile Hero ── */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-[#073922] text-[#C6F04A] font-black text-2xl flex items-center justify-center shrink-0 shadow-md">
          RK
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="font-display font-black text-xl text-gray-900">{MOCK_PARTNER.name}</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Verified Partner
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono">
              {MOCK_PARTNER.employeeId}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Assigned Hub: <strong>{MOCK_PARTNER.hubName}</strong> • Current Route: <strong>{route.id}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{MOCK_PARTNER.rating} Rating (1,420 deliveries)</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{MOCK_PARTNER.phone}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>

      {/* ── 2-Column Grid: Shift & Vehicle + Help Desk ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Shift & Operational Stats */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
            <Truck className="w-4 h-4 text-emerald-700" />
            <h3>Shift & Vehicle Configuration</h3>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Current Shift</span>
              <span className="font-bold text-gray-800">{route.shift} (8:00 AM – 5:00 PM)</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Vehicle Type</span>
              <span className="font-bold text-gray-800">Electric Cargo Scooter (KA-01-EQ-9921)</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Assigned Deliveries Today</span>
              <span className="font-bold text-gray-800">{route.totalStops} stops</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Completed Deliveries</span>
              <span className="font-bold text-emerald-700">{completedCount} delivered</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Deposit Bag ID</span>
              <span className="font-mono font-bold text-gray-800">BAG-1024-03-10</span>
            </div>
          </div>
        </div>

        {/* Right: Partner Support & Emergency Hotline */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
            <Headphones className="w-4 h-4 text-emerald-700" />
            <h3>Partner Support Hotline</h3>
          </div>

          <p className="text-xs text-gray-500 leading-snug">
            Need urgent assistance on route? Contact the HyperMart Operations Command or the Hub Supervisor directly.
          </p>

          <div className="space-y-2.5">
            <a
              href="tel:1800123456"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  📞
                </div>
                <div>
                  <p className="font-bold text-gray-900">Hub Operations Desk</p>
                  <p className="text-[10px] text-gray-500">Toll-free 24/7 dedicated line</p>
                </div>
              </div>
              <span className="font-bold text-emerald-800">Call Now</span>
            </a>

            <a
              href="tel:9876543200"
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  👨‍💼
                </div>
                <div>
                  <p className="font-bold text-gray-900">Manoj Verma (Hub Manager)</p>
                  <p className="text-[10px] text-gray-500">Bengaluru Hub Supervisor</p>
                </div>
              </div>
              <span className="font-bold text-blue-800">Contact</span>
            </a>

            <Link
              href="/delivery-partner/exceptions"
              className="flex items-center justify-between p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  ⚠️
                </div>
                <div>
                  <p className="font-bold text-amber-950">Report Route Exception</p>
                  <p className="text-[10px] text-amber-700">Customer, address or transit issues</p>
                </div>
              </div>
              <span className="font-bold text-amber-900">Open Form →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

