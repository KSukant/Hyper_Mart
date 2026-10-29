'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function OperationalSettingsDirectPage() {
  const { addToast } = useAdminStore();
  const [deliveryThreshold, setDeliveryThreshold] = useState('499');
  const [autoRefundDays, setAutoRefundDays] = useState('5');
  const [require2FA, setRequire2FA] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Settings Saved',
      description: `Delivery threshold set to ₹${deliveryThreshold}, auto-refund window ${autoRefundDays} days.`,
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 rounded-xl bg-white border border-[#E1E8E1] text-[#6B756F] hover:text-[#07563B] hover:bg-[#F7F7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
              <span>System Configuration</span>
              <span>•</span>
              <span>Retail Operations Parameters</span>
            </div>
            <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
              Operational Settings
            </h1>
          </div>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#C6F04A]" />
          Access & Roles Matrix
        </Link>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-6 max-w-2xl text-xs">
        <div>
          <h3 className="text-base font-bold text-[#202A25]">Operational Safeguards & Thresholds</h3>
          <p className="text-[#6B756F] mt-0.5">Configure live validation parameters across all warehouse and checkout services.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-bold text-[#202A25] block">
              Free Delivery Basket Threshold (INR)
            </label>
            <input
              type="number"
              value={deliveryThreshold}
              onChange={(e) => setDeliveryThreshold(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-mono font-bold text-[#202A25] focus:outline-none focus:border-[#07563B]"
            />
            <span className="text-[11px] text-[#6B756F]">Baskets above this value qualify for free doorstep delivery.</span>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#202A25] block">
              Customer Auto-Refund Policy Window (Days)
            </label>
            <input
              type="number"
              value={autoRefundDays}
              onChange={(e) => setAutoRefundDays(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs font-mono font-bold text-[#202A25] focus:outline-none focus:border-[#07563B]"
            />
            <span className="text-[11px] text-[#6B756F]">Maximum elapsed days post-delivery eligible for one-click claim authorization.</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1]">
            <div>
              <strong className="text-[#202A25] block">Enforce 2FA For All Operations Staff</strong>
              <span className="text-[11px] text-[#6B756F]">Require biometric or TOTP authenticator token at login.</span>
            </div>
            <input
              type="checkbox"
              checked={require2FA}
              onChange={(e) => setRequire2FA(e.target.checked)}
              className="rounded border-[#E1E8E1] text-[#07563B] focus:ring-[#07563B] h-5 w-5"
            />
          </div>

          <div className="pt-3 border-t border-[#E1E8E1] flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#07563B] text-white font-bold text-xs hover:bg-[#06452F] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save Operational Rules
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
