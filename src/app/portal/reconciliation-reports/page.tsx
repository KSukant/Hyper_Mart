'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
  ShieldCheck,
  FileCheck,
  Clock,
  Layers,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function ReconciliationReportsPage() {
  const {
    reconciliationReports,
    selectedReportId,
    setSelectedReportId,
    approveReconciliationReport,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredReports = reconciliationReports.map((r) => ({
    ...r,
    reportNumber: r.reportNumber || r.id.toUpperCase(),
    title: r.title || r.reportName,
    category: r.category || r.source || 'Payment Gateway',
    period: r.period || r.date || 'Today',
    totalRecords: r.totalRecords ?? r.recordsCount ?? 0,
    matchedRecords: r.matchedRecords ?? r.matchedCount ?? 0,
    varianceRecords: r.varianceRecords ?? (r.amountMismatchCount + r.timingDifferenceCount),
    totalValue: r.totalValue || '₹14.2M',
    approvalStatus: r.approvalStatus || r.status || 'Review',
    sourceFiles: r.sourceFiles || ['Razorpay_settle_20261024.csv', 'SBI_Virtual_MT940.dat'],
  })).filter((r) => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      r.reportNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedReport =
    filteredReports.find((r) => r.id === selectedReportId) || filteredReports[0];

  const statusColors: Record<string, string> = {
    Approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Complete: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Pending sign-off': 'bg-amber-50 text-amber-800 border-amber-200',
    Review: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Reconciliation Reports
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Audit Grade
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Multi-gateway bank statement settlement, clearinghouse variance detection, and daily accounting sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Razorpay Gateway">Razorpay Gateway</option>
            <option value="Delivery partners">Delivery partners</option>
            <option value="Razorpay Reversal Engine">Razorpay Reversal Engine</option>
            <option value="Stripe Merchant Gateway">Stripe Merchant Gateway</option>
            <option value="HyperMart Wallet provider">HyperMart Wallet provider</option>
          </select>

          <button
            onClick={() => {
              addToast('Audit Report Exported', 'Full SOX compliance package compiled into Excel spreadsheet', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Financial Package</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="MATCHED TODAY"
          value="99.82%"
          subtext="₹14.2M gross volume verified"
          dotColor="emerald"
          badge="High Match"
        />
        <MetricCard
          label="VARIANCES"
          value="4"
          subtext="Total net delta: ₹4,820"
          dotColor="amber"
          badge="4 Variances"
        />
        <MetricCard
          label="PROVIDER FILES"
          value="12"
          subtext="All bank MT940 & gateway feeds imported"
          dotColor="blue"
          badge="12 Feeds Live"
        />
        <MetricCard
          label="AWAITING APPROVAL"
          value="2"
          subtext="Daily finance closure packages"
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
              <h2 className="text-sm font-bold text-gray-900">Reconciliation Registers</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredReports.length} financial audit cycles
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Formulas Locked & SOX-Certified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Title / Scope</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Matched</th>
                  <th className="py-3 px-4">Variances</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((r) => {
                  const isSelected = r.id === selectedReport?.id;
                  const matchRate =
                    r.totalRecords > 0 ? ((r.matchedRecords / r.totalRecords) * 100).toFixed(1) : '100.0';

                  return (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedReportId(r.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {r.reportNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{r.title}</div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {r.totalRecords.toLocaleString()} transactions
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{r.category}</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{r.period}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                        {r.matchedRecords.toLocaleString()} ({matchRate}%)
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600">
                        {r.varianceRecords} deltas
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[r.approvalStatus] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {r.approvalStatus}
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
                Selected Reconciliation Package
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedReport.reportNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedReport.approvalStatus}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-gray-900 text-sm">{selectedReport.title}</div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Audit Period:</span>
              <span className="font-mono text-gray-900 font-semibold">{selectedReport.period}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Gross Settlement Value:</span>
              <span className="font-mono font-extrabold text-emerald-800 text-sm">{selectedReport.totalValue}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Total Ingest Records:</span>
              <span className="font-mono font-bold text-gray-800">{selectedReport.totalRecords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Matched Clean:</span>
              <span className="font-mono font-bold text-emerald-700">
                {selectedReport.matchedRecords.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Unresolved Variances:</span>
              <span className="font-mono font-bold text-rose-600">
                {selectedReport.varianceRecords} items
              </span>
            </div>
          </div>

          {/* Source Feeds List */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Ingested Banking & Gateway Files
            </div>
            <div className="space-y-1">
              {(selectedReport.sourceFiles || []).map((file: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-gray-700">
                  <span className="font-mono text-[11px] truncate">{file}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: 'Formal Financial Approval & Sign-Off',
                  description: `Digitally sign and lock reconciliation report ${selectedReport.reportNumber} for ${selectedReport.period}. This creates an immutable SOX governance audit entry.`,
                  confirmLabel: 'Sign & Lock Report',
                  variant: 'primary',
                  meta: {
                    recordId: selectedReport.reportNumber,
                    amount: selectedReport.totalValue,
                    policy: 'Financial Closing SOP Clause 12',
                  },
                  onConfirm: () => {
                    approveReconciliationReport(selectedReport.id);
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign-Off & Approve Report</span>
            </button>

            <button
              onClick={() => {
                addToast('Discrepancy Drawer Opened', 'Displaying variance items for manual audit research', 'info');
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-200 transition-colors"
            >
              Filter & Research Discrepancies
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Variance Categories
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Timing Cutoff:</strong> 2 cases (00:00 midnight gateway delta) • <strong>TDR Fee Delta:</strong> 1 case (1.75% interchange rate) • <strong>Manual Reversal:</strong> 1 case.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Report Automation Cron
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Daily reconciliation packages generate automatically at <strong>06:00 AM IST</strong> immediately following bank clearinghouse file downloads.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Formula Integrity Guard
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Reconciliation formulas and aggregation totals are calculated on secure server worker nodes and cannot be overwritten via user UI inputs.
          </p>
        </div>
      </div>

      <MotionBanner text="Report filter transition, mismatch emphasis, and export confirmation animation." />
    </div>
  );
}
