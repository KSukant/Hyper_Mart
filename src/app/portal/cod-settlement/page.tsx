'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Truck,
  Download,
  ShieldAlert,
  Clock,
  Building2,
  FileText,
  UserCheck,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function CODSettlementPage() {
  const {
    codSettlementEntries,
    selectedCodRouteId,
    setSelectedCodRouteId,
    approveCodSettlement,
    holdCodSettlement,
    setLightboxImage,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredEntries = codSettlementEntries.map((e) => ({
    ...e,
    route: e.route || e.routeCode,
    depositSlipRef: e.depositSlipRef || `SLIP-${e.id.toUpperCase()}`,
    handoverEvidenceUrl: e.handoverEvidenceUrl || '',
    notes: e.notes || e.approvalLevel,
  })).filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      e.courierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.depositSlipRef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedEntry =
    filteredEntries.find((e) => e.id === selectedCodRouteId) || filteredEntries[0];

  const statusColors: Record<string, string> = {
    Settled: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Ready: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Pending handover': 'bg-amber-50 text-amber-800 border-amber-200',
    Variance: 'bg-amber-50 text-amber-800 border-amber-200',
    'Variance hold': 'bg-rose-50 text-rose-800 border-rose-200',
    Hold: 'bg-rose-50 text-rose-800 border-rose-200',
    'Receipt missing': 'bg-purple-50 text-purple-800 border-purple-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              COD Settlement
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Cash Vault Audit
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Doorstep cash collection verification, courier shift reconciliation, and bank deposit matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Settled">Settled</option>
            <option value="Approved">Approved</option>
            <option value="Pending handover">Pending Handover</option>
            <option value="Variance hold">Variance Hold</option>
            <option value="Receipt missing">Receipt Missing</option>
          </select>

          <button
            onClick={() => {
              addToast('Cash Settlement Exported', 'COD reconciliation manifest exported for treasury', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Vault Manifest</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="COD COLLECTED TODAY"
          value="₹482.5K"
          subtext="12 routes deposited to bank vault"
          dotColor="emerald"
          badge="12 Routes"
          trend="+14%"
        />
        <MetricCard
          label="AWAITING SETTLEMENT"
          value="₹112.4K"
          subtext="5 couriers currently returning to DC"
          dotColor="amber"
          badge="On Road"
        />
        <MetricCard
          label="VARIANCE CASES"
          value="3"
          subtext="-₹2,450 net delta under review"
          dotColor="rose"
          badge="Audit Hold"
        />
        <MetricCard
          label="MISSING RECEIPTS"
          value="2"
          subtext="Bank CDM deposit slips pending upload"
          dotColor="purple"
          badge="Action Needed"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Courier Shift Cash Reconciliation</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredEntries.length} active delivery runs
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Coimbatore Vault CCTV Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Courier / Route</th>
                  <th className="py-3 px-4">Shift</th>
                  <th className="py-3 px-4">Orders</th>
                  <th className="py-3 px-4">Expected Cash</th>
                  <th className="py-3 px-4">Collected Cash</th>
                  <th className="py-3 px-4">Variance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEntries.map((e) => {
                  const isSelected = e.id === selectedEntry?.id;

                  return (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedCodRouteId(e.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{e.courierName}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{e.route}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-[11px]">{e.shift}</td>
                      <td className="py-3 px-4 font-bold text-gray-700">{e.ordersCount} pkgs</td>
                      <td className="py-3 px-4 font-mono font-semibold text-gray-800">
                        ₹{e.expectedAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-950">
                        ₹{e.collectedAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {e.variance === 0 ? (
                          <span className="text-emerald-700 font-bold">₹0 (Matched)</span>
                        ) : e.variance < 0 ? (
                          <span className="text-rose-600 font-bold">
                            -₹{Math.abs(e.variance).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-blue-600 font-bold">
                            +₹{e.variance.toLocaleString()}
                          </span>
                        )}
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
                        <span className="text-emerald-700 font-bold text-[11px] hover:underline">
                          Verify →
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
                Selected Courier Settlement
              </span>
              <h3 className="text-base font-extrabold text-gray-950 mt-0.5">
                {selectedEntry.courierName}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedEntry.status}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Route Assigned:</span>
              <span className="font-semibold text-gray-900">{selectedEntry.route}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Delivered Orders:</span>
              <span className="font-bold text-gray-800">{selectedEntry.ordersCount} orders</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Expected Total:</span>
              <span className="font-mono font-bold text-gray-800">₹{selectedEntry.expectedAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Handed Cash:</span>
              <span className="font-mono font-extrabold text-gray-950 text-sm">
                ₹{selectedEntry.collectedAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Net Variance:</span>
              <span
                className={`font-mono font-bold text-sm ${
                  selectedEntry.variance === 0
                    ? 'text-emerald-700'
                    : 'text-rose-600'
                }`}
              >
                ₹{selectedEntry.variance.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Deposit Slip:</span>
              <span className="font-mono text-emerald-800 font-semibold">{selectedEntry.depositSlipRef}</span>
            </div>
          </div>

          {/* Evidence Check Box */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Cash Vault Handover Receipt
              </span>
              <button
                onClick={() => {
                  setLightboxImage({
                    src: selectedEntry.handoverEvidenceUrl,
                    title: `CDM Deposit Slip • ${selectedEntry.depositSlipRef}`,
                    subtitle: `Courier: ${selectedEntry.courierName} • Cash ₹${selectedEntry.collectedAmount}`,
                  });
                }}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                Inspect Slip →
              </button>
            </div>
            <p className="text-gray-700 leading-snug">
              <strong>Audit Note:</strong> {selectedEntry.notes}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: 'Approve COD Cash Settlement',
                  description: `Confirm receipt of ₹${selectedEntry.collectedAmount.toLocaleString()} deposited by ${selectedEntry.courierName} and close route shift ledger.`,
                  confirmLabel: 'Approve & Close Shift',
                  variant: 'primary',
                  meta: {
                    recordId: selectedEntry.depositSlipRef,
                    amount: `₹${selectedEntry.collectedAmount.toLocaleString()}`,
                    policy: 'Physical Cash Vault Audit Cleared',
                    destination: 'HDFC Current Operating Account',
                  },
                  onConfirm: () => {
                    approveCodSettlement(selectedEntry.id);
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Cash Settlement</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Place Settlement on Variance Hold',
                  description: `Put courier ${selectedEntry.courierName} on variance hold pending supervisor cash audit and discrepancy explanation.`,
                  confirmLabel: 'Put on Hold',
                  variant: 'warning',
                  meta: {
                    recordId: selectedEntry.depositSlipRef,
                    amount: `₹${selectedEntry.variance}`,
                    policy: 'Cash Discrepancy Policy Clause 7',
                  },
                  onConfirm: () => {
                    holdCodSettlement(selectedEntry.id, 'Discrepancy under physical cash count audit');
                  },
                });
              }}
              className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs transition-colors"
            >
              Put on Variance Hold
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Variance Tolerances
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Automatic sign-off allowed for change rounding deltas under <strong>₹50</strong>. Any discrepancy &gt; ₹500 requires written courier statement and supervisor sign-off.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Smart Cash Deposit Machines (CDM)
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Couriers deposit collections into on-site <strong>HDFC Bank CDMs</strong> at Coimbatore DC. Instant API confirmation generates cryptographic deposit receipt.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Vault Handover Controls
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Shift handovers undergo continuous dual-custody verification with biometric sign-in and dual surveillance timestamps.
          </p>
        </div>
      </div>

      <MotionBanner text="Variance highlight animation, receipt request state, and settlement confirmation drawer." />
    </div>
  );
}
