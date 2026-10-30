'use client';

import React, { useState } from 'react';
import {
  AlertOctagon,
  RefreshCw,
  Send,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  FileText,
  Mail,
  UserCheck,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function PaymentExceptionsPage() {
  const {
    paymentExceptionEntries,
    selectedExceptionId,
    setSelectedExceptionId,
    retryException,
    resolveException,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [typeFilter, setTypeFilter] = useState<string>('All');

  const filteredEntries = paymentExceptionEntries.map((e) => ({
    ...e,
    attempts: e.attempts ?? e.attemptsCount ?? 1,
    customerContact: e.customerContact || '98401 22910',
    originalPaymentRef: e.originalPaymentRef || `PAY-${e.orderNumber}`,
    refundRef: e.refundRef || `RF-${e.exceptionNumber}`,
    lastAttempt: e.lastAttempt || e.approvedTime || 'Today 10:04 AM',
  })).filter((e) => {
    const matchesType = typeFilter === 'All' || e.type === typeFilter;
    const matchesSearch =
      !searchQuery ||
      e.exceptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.failureCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const selectedException =
    filteredEntries.find((e) => e.id === selectedExceptionId) || filteredEntries[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Payment & Refund Exceptions
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              Gateway Recovery
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Bank reversals, invalid VPA handles, failed NACH payouts, and manual beneficiary recovery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Types</option>
            <option value="Failed refund">Failed Refund</option>
            <option value="Duplicate charge">Duplicate Charge</option>
            <option value="Payment failed">Payment Failed</option>
            <option value="COD variance">COD Variance</option>
          </select>

          <button
            onClick={() => {
              addToast('Exception Retried', 'Auto-recovery queue dispatched via backup ICICI payout rail', 'info');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Eligible Auto-Retries</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="OPEN EXCEPTIONS"
          value="16"
          subtext="3 critical with multiple failed retries"
          dotColor="rose"
          badge="High Alert"
        />
        <MetricCard
          label="FAILED REFUNDS"
          value="7"
          subtext="NPCI VPA inactive or account closed"
          dotColor="amber"
          badge="VPA Failures"
        />
        <MetricCard
          label="BANK REJECTED"
          value="5"
          subtext="Beneficiary IFSC / merged bank code"
          dotColor="purple"
          badge="Bank Rejects"
        />
        <MetricCard
          label="RESOLVED TODAY"
          value="12"
          subtext="Beneficiary details successfully updated"
          dotColor="emerald"
          badge="12 Closed"
          trend="+4 today"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Failed Banking & Payout Incidents</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredEntries.length} unresolved settlement exceptions
              </p>
            </div>
            <span className="text-[11px] font-medium text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Double-Payout Lock Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Exception ID</th>
                  <th className="py-3 px-4">Order / Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Failure Code / Reason</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Attempts</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((e) => {
                  const isSelected = e.id === selectedException?.id;

                  return (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedExceptionId(e.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-rose-50/70 border-l-4 border-l-rose-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {e.exceptionNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{e.orderNumber}</div>
                        <div className="text-[10px] text-gray-400">{e.customerName}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700">{e.type}</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-700">
                        ₹{e.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 max-w-[200px]">
                        <div className="font-mono text-[10px] font-bold text-rose-900 truncate">
                          {e.failureCode}
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">{e.failureReason}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{e.owner}</td>
                      <td className="py-3 px-4 font-mono text-center font-bold text-gray-700">
                        {e.attempts}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-rose-700 font-bold text-[11px] hover:underline">
                          Recover →
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
                Selected Payment Exception
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedException.exceptionNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              Failed (Attempt {selectedException.attempts})
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Beneficiary Customer:</span>
              <span className="font-semibold text-gray-900">{selectedException.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Contact Number:</span>
              <span className="font-mono text-gray-800">{selectedException.customerContact}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-emerald-800">{selectedException.orderNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Original Payment Ref:</span>
              <span className="font-mono text-gray-700">{selectedException.originalPaymentRef}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Refund Batch Ref:</span>
              <span className="font-mono text-gray-700">{selectedException.refundRef}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Amount Stalled:</span>
              <span className="font-mono font-extrabold text-rose-700 text-sm">
                ₹{selectedException.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Last Gateway Attempt:</span>
              <span className="font-mono text-gray-600">{selectedException.lastAttempt}</span>
            </div>
          </div>

          {/* Failure Diagnostics Box */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
              NPCI / Bank Response Telemetry
            </div>
            <div className="font-mono font-bold text-rose-950">{selectedException.failureCode}</div>
            <p className="text-rose-800 leading-snug">{selectedException.failureReason}</p>
          </div>

          {/* Recovery Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: 'Trigger Payout Retry',
                  description: `Attempt payment retry of ₹${selectedException.amount} for ${selectedException.customerName}. Duplicate-payout locks have verified single idempotency token.`,
                  confirmLabel: 'Retry Transaction',
                  variant: 'warning',
                  meta: {
                    recordId: selectedException.exceptionNumber,
                    amount: `₹${selectedException.amount}`,
                    policy: 'Automated Gateway Retry Protocol',
                  },
                  onConfirm: () => {
                    retryException(selectedException.id);
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Payout (Idempotent Safe)</span>
            </button>

            <button
              onClick={() => {
                addToast('Secure Form Sent', `SMS sent to ${selectedException.customerContact} with secure bank account update link`, 'success');
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-amber-200"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send SMS Link for Bank/VPA Update</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Mark Exception Manually Resolved',
                  description: `Confirm manual beneficiary settlement via NEFT and close exception ${selectedException.exceptionNumber}.`,
                  confirmLabel: 'Mark Resolved',
                  variant: 'primary',
                  meta: {
                    recordId: selectedException.exceptionNumber,
                    policy: 'Manual Bank Payout Audit',
                  },
                  onConfirm: () => {
                    resolveException(selectedException.id, 'Manually resolved via offline RTGS/NEFT');
                  },
                });
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors"
            >
              Mark Resolved (Offline NEFT Cleared)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            NPCI Failure Glossary
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>U17:</strong> VPA Does Not Exist • <strong>U30:</strong> Transaction Exceeds Daily Cap • <strong>U66:</strong> Beneficiary Bank Network Timeout.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Exponential Backoff Policy
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Automated retries trigger at <strong>1 hour, 6 hours, and 24 hours</strong>. If all 3 attempts fail, case moves to Customer Outreach queue.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Secure Beneficiary Portal
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Customers receive a one-time cryptographic link with OTP verification to securely enter alternate UPI VPA or bank IFSC without agent disclosure.
          </p>
        </div>
      </div>

      <MotionBanner text="Failure-code expansion animation, retry confirmation, and exception timeline reveal." />
    </div>
  );
}
