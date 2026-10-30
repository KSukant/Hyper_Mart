'use client';

import React, { useState } from 'react';
import {
  ArrowDownLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Download,
  CreditCard,
  Building2,
  FileCheck,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function RefundProcessingPage() {
  const {
    refundProcessingEntries,
    selectedRefundId,
    setSelectedRefundId,
    approveRefund,
    retryRefund,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredEntries = refundProcessingEntries.map((r) => ({
    ...r,
    productName: r.productName || 'Matte Lipstick • Shade #04',
    finalRefundAmount: r.finalRefundAmount ?? r.refundAmount,
    destination: r.destination || r.destinationMasked || 'UPI • Verified VPA',
    expectedProcessingTime: r.expectedProcessingTime || 'Instant (2-4 hrs)',
    policyApplied: r.policyApplied || 'Hygiene seal exception',
    breakdown: r.breakdown || {
      deliveryCharge: r.deliveryCharge || 0,
      couponDiscount: r.discount || 0,
      taxRefund: r.tax || 0,
      restockingFee: 0,
    },
  })).filter((r) => {
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      r.refundNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedRefund =
    filteredEntries.find((r) => r.id === selectedRefundId) || filteredEntries[0];

  const statusColors: Record<string, string> = {
    'Awaiting approval': 'bg-amber-50 text-amber-800 border-amber-200',
    Approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Processing: 'bg-blue-50 text-blue-800 border-blue-200',
    Completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Failed: 'bg-rose-50 text-rose-800 border-rose-200',
    'Manager review': 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Refund Processing Engine
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Gateway Dispatch
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Automated refund breakdown calculation, duplicate idempotency checks, and banking gateway batch dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Awaiting approval">Awaiting Approval</option>
            <option value="Approved">Approved</option>
            <option value="Processing">Processing</option>
            <option value="Manager review">Manager Review</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            onClick={() => {
              addToast('Batch Dispatched', 'Approved refunds compiled into Razorpay banking NACH batch', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Dispatch Pending Batch</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="AWAITING APPROVAL"
          value="14"
          subtext="₹28,450 ready for authorization"
          dotColor="amber"
          badge="14 Cases"
        />
        <MetricCard
          label="APPROVED TODAY"
          value="₹112,800"
          subtext="48 refunds successfully disbursed"
          dotColor="emerald"
          badge="48 Today"
          trend="+18%"
        />
        <MetricCard
          label="PROCESSING"
          value="6"
          subtext="In banking gateway transmission"
          dotColor="blue"
          badge="In Gateway"
        />
        <MetricCard
          label="FAILED"
          value="2"
          subtext="Bank account validation errors"
          dotColor="rose"
          badge="Needs Attention"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Refund Disbursement Queue</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredEntries.length} authorized refund orders
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Idempotency Engine Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Refund ID</th>
                  <th className="py-3 px-4">Order / Customer</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Original</th>
                  <th className="py-3 px-4">Refund Amount</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((r) => {
                  const isSelected = r.id === selectedRefund?.id;

                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedRefundId(r.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {r.refundNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{r.orderNumber}</div>
                        <div className="text-[10px] text-gray-400">{r.customerName}</div>
                      </td>
                      <td className="py-3 px-4 max-w-[160px] truncate text-gray-700 font-medium">
                        {r.productName}
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-[11px] truncate max-w-[120px]">{r.reason}</td>
                      <td className="py-3 px-4 font-mono text-gray-400 line-through">
                        ₹{r.originalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                        ₹{r.finalRefundAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{r.destination}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[r.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-emerald-700 font-bold text-[11px] hover:underline">
                          Process →
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
                Selected Refund Voucher
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedRefund.refundNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedRefund.status}
            </span>
          </div>

          {/* Refund Calculation Engine Box */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Itemized Financial Breakdown
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Gross Item Subtotal:</span>
              <span className="font-mono font-semibold text-gray-800">
                ₹{selectedRefund.originalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge Refund:</span>
              <span className="font-mono text-gray-700">+₹{selectedRefund.breakdown?.deliveryCharge || 0}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>Promotion / Coupon Clawback:</span>
              <span className="font-mono">-₹{selectedRefund.breakdown?.couponDiscount || 0}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes (GST 18% credited):</span>
              <span className="font-mono text-emerald-700">+₹{selectedRefund.breakdown?.taxRefund || 0}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Restocking Fee:</span>
              <span className="font-mono text-gray-500">-₹{selectedRefund.breakdown?.restockingFee || 0}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between font-extrabold text-sm text-gray-950">
              <span>Final Credited Amount:</span>
              <span className="font-mono text-emerald-700">
                ₹{selectedRefund.finalRefundAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Beneficiary:</span>
              <span className="font-semibold text-gray-900">{selectedRefund.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Destination:</span>
              <span className="font-semibold text-gray-800">{selectedRefund.destination}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Payment Gateway:</span>
              <span className="font-semibold text-gray-800">{selectedRefund.provider}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Expected Arrival:</span>
              <span className="font-mono text-emerald-700 font-bold">{selectedRefund.expectedProcessingTime}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Dual Authorization:</span>
              <span className="font-medium text-emerald-800">{selectedRefund.approvalLevel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Idempotency Guard:</span>
              <span className="font-mono text-xs text-gray-500">Verified Unique Hash</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: 'Authorize Gateway Refund Dispatch',
                  description: `Authorize payout of ₹${selectedRefund.finalRefundAmount.toLocaleString()} to ${selectedRefund.customerName} via ${selectedRefund.destination}.`,
                  confirmLabel: 'Authorize & Transfer',
                  variant: 'primary',
                  meta: {
                    recordId: selectedRefund.refundNumber,
                    amount: `₹${selectedRefund.finalRefundAmount.toLocaleString()}`,
                    destination: selectedRefund.destination,
                    policy: selectedRefund.policyApplied,
                  },
                  onConfirm: () => {
                    approveRefund(selectedRefund.id);
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Authorize Refund Disbursement</span>
            </button>

            {selectedRefund.status === 'Failed' && (
              <button
                onClick={() => {
                  retryRefund(selectedRefund.id);
                }}
                className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Failed Gateway Transaction</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Dual Approval Safeguard
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Refunds greater than <strong>₹2,000</strong> require dual authorization by both Support Team Lead and Finance Accounts Manager before batch release.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Instant UPI Reversal SLA
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>98.4%</strong> of UPI refunds settle to the customer account within 120 seconds via NPCI Auto-Reversal gateway rails.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Duplicate Protection
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Cryptographic SHA-256 hash generated per order refund prevents accidental duplicate submissions from agent clicks or network retries.
          </p>
        </div>
      </div>

      <MotionBanner text="Calculation row reveal animation, approval stepper, and success state." />
    </div>
  );
}
