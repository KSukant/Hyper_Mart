'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Calendar,
  MapPin,
  Check,
  ChevronRight,
  ShieldCheck,
  Download,
  Filter,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function ReturnsRefundsPage() {
  const {
    returnRefundCases,
    selectedReturnCaseId,
    setSelectedReturnCaseId,
    updateReturnStatus,
    scheduleReturnPickup,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Requested', 'Pickup scheduled', 'Received', 'Inspection', 'Completed'];

  const allMappedCases = returnRefundCases.map((c) => ({
    ...c,
    pickupAddress: c.pickupAddress || '142 Avinashi Road, Coimbatore',
    courierPartner: c.courierPartner || 'BlueDart Air Express',
    pickupDate: c.pickupDate || c.pickupScheduled || 'Tomorrow 10:00 AM',
    checklist: c.checklist || [
      'Original barcode tag attached',
      'Factory packaging sealed',
      'No physical customer tampering',
      'Correct SKU verified',
    ],
  }));

  const filteredCases = allMappedCases.filter((c) => {
    const matchesTab =
      activeTab === 'All' ||
      c.status === activeTab ||
      (activeTab === 'Requested' && c.status === 'Pending') ||
      (activeTab === 'Pickup scheduled' && (c.status === 'Processing' || c.status === 'Pending')) ||
      (activeTab === 'Received' && c.status === 'Inspection');
    const matchesSearch =
      !searchQuery ||
      c.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const selectedCase =
    filteredCases.find((c) => c.id === selectedReturnCaseId) || filteredCases[0] || allMappedCases[0];

  const statusColors: Record<string, string> = {
    Requested: 'bg-blue-50 text-blue-700 border-blue-200',
    Pending: 'bg-blue-50 text-blue-700 border-blue-200',
    'Pickup scheduled': 'bg-amber-50 text-amber-700 border-amber-200',
    Processing: 'bg-amber-50 text-amber-700 border-amber-200',
    Received: 'bg-purple-50 text-purple-700 border-purple-200',
    Inspection: 'bg-rose-50 text-rose-700 border-rose-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Exchange: 'bg-teal-50 text-teal-700 border-teal-200',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Returns and Refunds Support
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Reverse Ops
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Reverse logistics tracking, quality inspection checklist, and policy eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              addToast('Logistics Roster Synced', 'Reverse pickup manifest shared with courier partner', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Pickup Manifest</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="RETURN REQUESTS"
          value="94"
          subtext="+6 requested in last 2 hours"
          dotColor="emerald"
          badge="Active"
        />
        <MetricCard
          label="REFUND PENDING"
          value="₹44,200"
          subtext="18 cases awaiting QC clearance"
          dotColor="amber"
          badge="18 Cases"
        />
        <MetricCard
          label="WAREHOUSE INSPECTION"
          value="12"
          subtext="4 high-value electronics on deck"
          dotColor="rose"
          badge="Coimbatore QC"
        />
        <MetricCard
          label="APPROVED TODAY"
          value="41"
          subtext="98.2% policy compliance verified"
          dotColor="emerald"
          badge="Completed"
          trend="+14 today"
        />
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#053221] text-[#C6F04A] shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main 2-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Returns Operational Queue</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredCases.length} return authorizations
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Courier Webhooks Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Return ID</th>
                  <th className="py-3 px-4">Product / Customer</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Refund Amount</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      <div className="font-semibold text-sm">No return authorizations in this queue</div>
                      <div className="text-xs text-gray-400 mt-1">Select another status tab to inspect other active returns</div>
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => {
                  const isSelected = c.id === selectedCase?.id;

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedReturnCaseId(c.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {c.returnNumber}
                      </td>
                      <td className="py-3 px-4 max-w-[200px]">
                        <div className="font-semibold text-gray-800 truncate">{c.productName}</div>
                        <div className="text-[10px] text-gray-400">{c.customerName}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{c.reason}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-gray-700">{c.condition}</span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                        ₹{c.refundAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-500">{c.owner}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[c.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-emerald-700 font-bold text-[11px] hover:underline">
                          View →
                        </span>
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Return Details Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Selected Return Authorisation
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedCase.returnNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedCase.status}
            </span>
          </div>

          {/* Product & Eligibility */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-gray-900 text-sm">{selectedCase.productName}</div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold text-gray-900">{selectedCase.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Pickup Address:</span>
              <span className="font-medium text-gray-800 text-right">{selectedCase.pickupAddress}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Courier Partner:</span>
              <span className="font-semibold text-emerald-800">{selectedCase.courierPartner}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Scheduled Slot:</span>
              <span className="font-mono text-gray-800">{selectedCase.pickupDate}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Eligible Refund:</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                ₹{selectedCase.refundAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Category Quality Checklist */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Inbound Quality Inspection Checklist
            </div>
            <div className="space-y-1.5 text-xs">
              {(selectedCase.checklist || []).map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                scheduleReturnPickup(selectedCase.id);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Truck className="w-4 h-4" />
              <span>Schedule / Reschedule Courier Pickup</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Approve Return & Quality Inspection',
                  description: `Pass quality inspection for ${selectedCase.returnNumber}. This will authorize refund dispatch of ₹${selectedCase.refundAmount}.`,
                  confirmLabel: 'Authorize Refund',
                  variant: 'primary',
                  meta: {
                    recordId: selectedCase.returnNumber,
                    amount: `₹${selectedCase.refundAmount}`,
                    policy: 'Return Verification Passed',
                    destination: 'Customer Bank Account',
                  },
                  onConfirm: () => {
                    updateReturnStatus(selectedCase.id, 'Completed');
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Approve Return & Credit Refund</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Reject Return Authorization',
                  description: `Reject return ${selectedCase.returnNumber} due to failure of quality inspection checklist.`,
                  confirmLabel: 'Reject Return',
                  variant: 'danger',
                  meta: {
                    recordId: selectedCase.returnNumber,
                    policy: 'Condition Mismatch - Damage caused after delivery',
                  },
                  onConfirm: () => {
                    addToast('Return Rejected', 'Notice sent to customer explaining QC failure', 'warning');
                  },
                });
              }}
              className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs transition-colors"
            >
              Reject Return Authorization
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Reverse Logistics SLA
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Average doorstep reverse pickup turnaround: <strong>18.4 hours</strong> across Coimbatore & Tirupur delivery zones.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            QC Fraud & Swap Detection
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>3.4%</strong> discrepancy rate flagged this month. Barcode scanning mandatory before hub acceptance.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Instant Credit Rules
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Orders under ₹500 for Platinum/Gold tier members receive <strong>Instant UPI Credit</strong> at doorstep hand-over scan.
          </p>
        </div>
      </div>

      <MotionBanner text="Checklist reveal with smooth checkmark animation, evidence zoom, and pickup timeline progression." />
    </div>
  );
}
