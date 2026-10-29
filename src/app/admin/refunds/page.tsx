'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  ShieldCheck,
  User,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Download,
  AlertCircle,
} from 'lucide-react';
import { REFUND_CLAIMS, RefundClaim } from '@/mocks/adminData';
import { useAdminStore } from '@/store/adminStore';

export default function RefundApprovalsPage() {
  const { addToast, currentRole } = useAdminStore();
  const [claims, setClaims] = useState<RefundClaim[]>(REFUND_CLAIMS);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeClaim, setActiveClaim] = useState<RefundClaim | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [declineReason, setDeclineReason] = useState('');

  const filteredClaims = claims.filter((c) => {
    if (selectedTier !== 'all' && c.approvalTier.toLowerCase() !== selectedTier.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.orderNumber.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q) ||
        c.complaintId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'Approved' } : c))
    );
    addToast({
      title: 'Refund Approved',
      description: `Refund for ${claimId} approved. Payment gateway reverse transfer initiated.`,
      type: 'success',
    });
    setActiveClaim(null);
  };

  const handleDecline = (claimId: string) => {
    if (!declineReason.trim()) {
      addToast({
        title: 'Mandatory Reason Required',
        description: 'Please specify the decline rationale for compliance audit.',
        type: 'warning',
      });
      return;
    }
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: 'Declined' } : c))
    );
    addToast({
      title: 'Refund Declined',
      description: `Claim ${claimId} rejected. Customer notification dispatched.`,
      type: 'info',
    });
    setActiveClaim(null);
    setDeclineReason('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Financial Safeguards</span>
            <span>•</span>
            <span>Tiered Authorization Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Refund Approvals Queue
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Authorize doorstep claims, damaged packaging reimbursements, and UPI reversions according to financial governance limits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/payments"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#C6F04A]" />
            Payments & UTR Reconciliation
          </Link>
        </div>
      </div>

      {/* Tiered Policy Limits Notice Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#E1E8E1] shadow-xs text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#07563B] uppercase text-[11px]">Tier 1: Frontline Support</span>
            <span className="font-mono font-bold text-xs text-[#202A25]">&lt; ₹500</span>
          </div>
          <p className="text-[#6B756F]">Instant authority for leaking staples, spoiled fresh produce and missing items.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E1E8E1] shadow-xs text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#F2B544] uppercase text-[11px]">Tier 2: Operations Admin</span>
            <span className="font-mono font-bold text-xs text-[#202A25]">₹500 – ₹2,000</span>
          </div>
          <p className="text-[#6B756F]">Requires warehouse manager verification and doorstep photo validation.</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E1E8E1] shadow-xs text-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-[#E86B62] uppercase text-[11px]">Tier 3: Super Admin</span>
            <span className="font-mono font-bold text-xs text-[#202A25]">&gt; ₹2,000</span>
          </div>
          <p className="text-[#6B756F]">High-value electronics and luxury care claims requiring executive audit trail.</p>
        </div>
      </div>

      {/* Tier Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E1E8E1]">
        {[
          { id: 'all', label: 'All Pending Claims' },
          { id: 'support', label: 'Tier 1 (&lt; ₹500)' },
          { id: 'admin', label: 'Tier 2 (₹500–₹2k)' },
          { id: 'super admin', label: 'Tier 3 (&gt; ₹2k)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTier(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTier === tab.id
                ? 'bg-[#07563B] text-white shadow-xs'
                : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756F]" />
          <input
            type="text"
            placeholder="Search order ID, complaint ID, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:bg-white focus:outline-none focus:border-[#07563B]"
          />
        </div>
        <span className="text-xs text-[#6B756F]">{filteredClaims.length} claims in queue</span>
      </div>

      {/* Master Refund Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-3 px-4 font-semibold">Complaint ID</th>
                <th className="py-3 px-4 font-semibold">Order / Customer</th>
                <th className="py-3 px-4 font-semibold">Reason Category</th>
                <th className="py-3 px-4 font-semibold">Claim Amount</th>
                <th className="py-3 px-4 font-semibold">Policy Eligibility</th>
                <th className="py-3 px-4 font-semibold">Required Tier</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-[#EAF5E9]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#07563B] font-mono">
                    {claim.complaintId}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#202A25]">{claim.customerName}</div>
                    <div className="text-[11px] text-[#6B756F] font-mono">{claim.orderNumber} • {claim.customerCity}</div>
                  </td>

                  <td className="py-3.5 px-4 text-[#202A25]">
                    {claim.reason}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-sm text-[#07563B]">
                    ₹{claim.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        claim.policyEligibility === 'Eligible'
                          ? 'bg-[#EAF5E9] text-[#07563B]'
                          : claim.policyEligibility === 'Needs review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {claim.policyEligibility}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#202A25]">{claim.approvalTier}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        claim.status === 'Approved'
                          ? 'bg-[#EAF5E9] text-[#07563B]'
                          : claim.status === 'Declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveClaim(claim)}
                      className="px-3 py-1.5 rounded-lg bg-[#07563B] text-white hover:bg-[#06452F] font-bold text-xs transition-colors shadow-xs"
                    >
                      Review & Authorize
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Review Drawer */}
      {activeClaim && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveClaim(null)}
          />
          <div className="relative w-full max-w-lg bg-white border-l border-[#E1E8E1] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-6 border-b border-[#E1E8E1] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#07563B]">
                  Refund Authorization Panel
                </span>
                <h2 className="text-xl font-bold text-[#202A25] mt-0.5 font-mono">
                  {activeClaim.complaintId}
                </h2>
                <p className="text-xs text-[#6B756F]">Linked to Order #{activeClaim.orderNumber}</p>
              </div>
              <button
                onClick={() => setActiveClaim(null)}
                className="p-2 rounded-xl text-[#6B756F] hover:bg-[#F7F7F0] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              <div className="p-4 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Customer:</span>
                  <strong className="text-[#202A25]">{activeClaim.customerName} ({activeClaim.customerCity})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Reason:</span>
                  <span className="text-[#202A25] font-semibold">{activeClaim.reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Required Signoff:</span>
                  <strong className="text-[#07563B]">{activeClaim.approvalTier} Tier</strong>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E1E8E1]">
                  <span className="text-[#6B756F]">Refund Amount:</span>
                  <strong className="text-base font-black text-[#07563B] font-mono">
                    ₹{activeClaim.amount.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Policy Validation Checklist */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#202A25] uppercase tracking-wider text-[11px]">
                  Automated Policy Eligibility Audit
                </h4>
                <div className="p-3.5 rounded-xl border border-[#E1E8E1] bg-white space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#07563B] font-semibold">
                    <span>Order delivered within last 7 days</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between text-[#07563B] font-semibold">
                    <span>Doorstep damage / leakage verified</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between text-[#07563B] font-semibold">
                    <span>Customer fraud score &lt; 5%</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Reviewer Note */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#202A25] text-xs">Reviewer Audit Remarks</label>
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Optional note recorded into audit trail upon decision..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs focus:bg-white focus:outline-none focus:border-[#07563B]"
                />
              </div>

              {/* Decline Reason Input (if declining) */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#E86B62] text-xs">Decline Reason (Mandatory if declining)</label>
                <input
                  type="text"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="Reason for claim decline (e.g. item consumed beyond window)..."
                  className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs focus:bg-white focus:outline-none focus:border-[#E86B62]"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#E1E8E1] bg-[#F7F7F0] flex items-center justify-between gap-3">
              <button
                onClick={() => handleDecline(activeClaim.id)}
                className="flex-1 py-2.5 rounded-xl bg-white border border-[#E86B62]/40 text-[#E86B62] font-bold text-xs hover:bg-rose-50 transition-colors"
              >
                Decline Claim
              </button>
              <button
                onClick={() => handleApprove(activeClaim.id)}
                className="flex-1 py-2.5 rounded-xl bg-[#07563B] text-white font-bold text-xs hover:bg-[#06452F] transition-colors shadow-xs"
              >
                Authorize & Disburse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
