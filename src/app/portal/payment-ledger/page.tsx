'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function PaymentLedgerPage() {
  const {
    paymentLedgerEntries,
    selectedLedgerTxnId,
    setSelectedLedgerTxnId,
    reconcileLedgerEntry,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredEntries = paymentLedgerEntries.map((e) => ({
    ...e,
    providerRef: e.providerRef || e.reconciliationRef,
    recStatus: e.recStatus || (e.isMatched ? 'Fully matched' : 'Unreconciled delta'),
  })).filter((e) => {
    const matchesMethod = methodFilter === 'All' || e.method.toLowerCase().includes(methodFilter.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      e.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.providerRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMethod && matchesStatus && matchesSearch;
  });

  const selectedTxn =
    filteredEntries.find((e) => e.id === selectedLedgerTxnId) || filteredEntries[0];

  const statusColors: Record<string, string> = {
    Captured: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    Unreconciled: 'bg-purple-50 text-purple-800 border-purple-200',
    Failed: 'bg-rose-50 text-rose-800 border-rose-200',
    Refunded: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Payment Ledger
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Live Ingest
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time transaction streaming, gateway reconciliation, and bank settlement verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Card">Cards (Credit/Debit)</option>
            <option value="COD">Cash On Delivery</option>
            <option value="NetBanking">NetBanking</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Captured">Captured</option>
            <option value="Pending">Pending</option>
            <option value="Unreconciled">Unreconciled</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            onClick={() => {
              addToast('Ledger Exported', 'Full transaction journal exported as CSV', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="GROSS PAYMENTS"
          value="₹8.42M"
          subtext="+8.1% vs yesterday • 4,218 transactions"
          dotColor="emerald"
          badge="Healthy"
          trend="+8.1%"
        />
        <MetricCard
          label="CAPTURED"
          value="98.4%"
          subtext="Direct gateway settlement verified"
          dotColor="emerald"
          badge="Auto-Settled"
        />
        <MetricCard
          label="PENDING"
          value="₹124.5K"
          subtext="24 transactions in gateway transit"
          dotColor="amber"
          badge="In Transit"
        />
        <MetricCard
          label="UNRECONCILED"
          value="7"
          subtext="Bank statement delta requiring review"
          dotColor="rose"
          badge="Needs Review"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Transaction Journal</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredEntries.length} verified records
              </p>
            </div>
            <span className="text-[11px] font-medium text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Razorpay • PineLabs • NPCI Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Order / Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((e) => {
                  const isSelected = e.id === selectedTxn?.id;

                  return (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedLedgerTxnId(e.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">{e.time}</td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {e.transactionId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{e.orderNumber}</div>
                        <div className="text-[10px] text-gray-400">{e.customerName}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-950">
                        ₹{e.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{e.method}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-700">{e.type}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[e.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-blue-700 font-bold text-[11px] hover:underline">
                          Audit →
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Record Detail (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Selected Financial Record
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedTxn.transactionId}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedTxn.status}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Gross Value:</span>
              <span className="font-mono font-extrabold text-gray-950 text-base">
                ₹{selectedTxn.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-semibold text-emerald-800">{selectedTxn.orderNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold text-gray-900">{selectedTxn.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Payment Gateway:</span>
              <span className="font-semibold text-gray-800">{selectedTxn.provider}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Method:</span>
              <span className="font-medium text-gray-800">{selectedTxn.method}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Gateway Ref:</span>
              <span className="font-mono text-gray-700">{selectedTxn.providerRef}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Reconciliation:</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {selectedTxn.recStatus}
              </span>
            </div>
          </div>

          {/* Verification Box */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Double-Entry Settlement Match
            </div>
            <p className="text-gray-700">
              UTR Ref: <span className="font-mono font-bold text-gray-900">UTR-SBI-9921448102</span>
            </p>
            <p className="text-[11px] text-gray-500">
              Matched against State Bank of India Virtual Account batch settlement.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                reconcileLedgerEntry(selectedTxn.id);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Bank Match & Settle</span>
            </button>

            <button
              onClick={() => {
                addToast('Ledger Record Shared', 'Transaction audit trail sent to finance auditors', 'info');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors"
            >
              Export Cryptographic Proof
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Payment Method Split
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">UPI (PhonePe, GPay, Paytm):</span>
              <span className="font-bold text-gray-900">58% (₹4.88M)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cards (Visa / Mastercard):</span>
              <span className="font-bold text-gray-900">24% (₹2.02M)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cash on Delivery (COD):</span>
              <span className="font-bold text-gray-900">12% (₹1.01M)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NetBanking & Wallets:</span>
              <span className="font-bold text-gray-900">6% (₹0.51M)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Gateway Health & Uptime
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Razorpay API response latency: <strong>142ms</strong> • ICICI Direct PG: <strong>99.98% uptime</strong> • Zero pending webhook retries.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Reconciliation Controls
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Automated double-entry reconciliation runs continuously on a <strong>5-minute cron</strong> comparing order ledger with bank MT940 statements.
          </p>
        </div>
      </div>

      <MotionBanner text="Matched-field connector animation, row update highlight, and reconciliation drawer." />
    </div>
  );
}
