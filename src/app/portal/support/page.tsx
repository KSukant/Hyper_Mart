'use client';

import React, { useState } from 'react';
import {
  Filter,
  Download,
  RefreshCw,
  Search,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ShieldAlert,
  Send,
  MoreVertical,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';
import Link from 'next/link';

export default function SupportDashboardPage() {
  const {
    supportCases,
    selectedSupportCaseId,
    setSelectedSupportCaseId,
    assignSupportCase,
    escalateSupportCase,
    resolveSupportCase,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Filter cases
  const filteredCases = supportCases.filter((c) => {
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    const matchesSearch =
      !searchQuery ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesType && matchesSearch;
  });

  const selectedCase =
    supportCases.find((c) => c.id === selectedSupportCaseId) || supportCases[0];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Support Case Dashboard
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Live Queue
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Operational triage, SLA tracking, and queue distribution across customer touchpoints.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2.5">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs hover:border-gray-300 outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs hover:border-gray-300 outline-none"
          >
            <option value="All">All Types</option>
            <option value="Complaint">Complaint</option>
            <option value="Return">Return</option>
            <option value="Repair">Warranty / Repair</option>
            <option value="Payment">Payment</option>
            <option value="Delivery">Delivery</option>
          </select>

          <button
            onClick={() => {
              addToast('Queue Exported', 'Support queue CSV exported for regional audit', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              addToast('Queue Refreshed', 'Support cases synced from message broker', 'info');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="OPEN CASES"
          value="128"
          subtext="8 currently unassigned • South Hub"
          dotColor="emerald"
          badge="Queue Healthy"
        />
        <MetricCard
          label="SLA RISK"
          value="14"
          subtext="3 cases breached < 30m window"
          dotColor="rose"
          badge="High Alert"
          trend="↑ 2 new"
        />
        <MetricCard
          label="AWAITING WAREHOUSE"
          value="9"
          subtext="Physical item inspection pending"
          dotColor="amber"
          badge="Coimbatore DC"
        />
        <MetricCard
          label="RESOLVED TODAY"
          value="64"
          subtext="+12% above shift target"
          dotColor="emerald"
          badge="94.2% CSAT"
          trend="+8 today"
        />
      </div>

      {/* Main Operational Split: Table (Left) + Detail Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Operational Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Active Operational Queue</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredCases.length} prioritized cases
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Auto-sync active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Product / Context</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">SLA</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.map((c) => {
                  const isSelected = c.id === selectedCase?.id;
                  const priorityColors = {
                    Critical: 'bg-rose-100 text-rose-800 border-rose-200',
                    High: 'bg-amber-100 text-amber-800 border-amber-200',
                    Medium: 'bg-blue-100 text-blue-800 border-blue-200',
                    Low: 'bg-gray-100 text-gray-700 border-gray-200',
                  };

                  const slaColors = {
                    'At risk': 'text-rose-600 font-bold bg-rose-50 border-rose-200',
                    Open: 'text-amber-700 font-medium bg-amber-50 border-amber-200',
                    Escalated: 'text-purple-700 font-bold bg-purple-50 border-purple-200',
                    'On track': 'text-emerald-700 font-medium bg-emerald-50 border-emerald-200',
                    Breached: 'text-rose-700 font-black bg-rose-100 border-rose-300',
                  };

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedSupportCaseId(c.id)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            priorityColors[c.priority]
                          }`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {c.caseNumber}
                      </td>
                      <td className="py-3 px-4 max-w-[200px]">
                        <div className="font-semibold text-gray-800 truncate">{c.product}</div>
                        <div className="text-[10px] text-gray-400 truncate">Order #{c.orderNumber}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-700">{c.type}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{c.owner}</td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">{c.age}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md border inline-block ${
                            slaColors[c.sla]
                          }`}
                        >
                          {c.sla}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-emerald-700 font-bold text-[11px] hover:underline">
                          Inspect →
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Record Detail Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Selected Priority Record
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedCase.caseNumber}
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                selectedCase.priority === 'Critical'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {selectedCase.priority} Priority
            </span>
          </div>

          {/* Quick Info Grid */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Customer</span>
              <span className="font-bold text-gray-900">{selectedCase.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Order Reference</span>
              <span className="font-mono font-semibold text-emerald-800">{selectedCase.orderNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Issue Category</span>
              <span className="font-medium text-gray-800">{selectedCase.type}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Assigned Lead</span>
              <span className="font-semibold text-gray-900">{selectedCase.owner}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">SLA Clock</span>
              <span className="font-bold text-rose-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedCase.sla} (34 mins left)
              </span>
            </div>
          </div>

          {/* Issue Statement */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Customer Statement
            </div>
            <p className="text-xs text-gray-700 italic leading-relaxed">
              &quot;{selectedCase.issue}&quot;
            </p>
          </div>

          {/* Evidence Status */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <span className="font-medium">Evidence Status:</span>
            <span className="font-bold">{selectedCase.evidenceStatus}</span>
          </div>

          {/* Context Actions */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Operational Actions
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  assignSupportCase(selectedCase.id, 'Anita R. (Tier 2)');
                }}
                className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Reassign Lead</span>
              </button>

              <button
                onClick={() => {
                  openConfirmation({
                    title: 'Escalate to Tier 2 Management',
                    description: `This will escalate case ${selectedCase.caseNumber} to the South Zone Lead for immediate intervention.`,
                    confirmLabel: 'Escalate Case',
                    variant: 'warning',
                    meta: {
                      recordId: selectedCase.caseNumber,
                      policy: 'SLA At Risk Override',
                    },
                    onConfirm: () => escalateSupportCase(selectedCase.id),
                  });
                }}
                className="w-full py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Escalate SLA</span>
              </button>
            </div>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Mark Support Case Resolved',
                  description: `Confirm that resolution has been communicated to ${selectedCase.customerName} and customer sign-off has been registered.`,
                  confirmLabel: 'Resolve & Close',
                  variant: 'primary',
                  meta: {
                    recordId: selectedCase.caseNumber,
                    policy: 'Standard Resolution Sign-off',
                  },
                  onConfirm: () => resolveSupportCase(selectedCase.id),
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Resolve Case & Notify Customer</span>
            </button>

            {/* Deep Link to Detail Page */}
            <Link
              href="/portal/complaints"
              className="block text-center text-xs font-bold text-emerald-800 hover:text-emerald-950 py-1"
            >
              Open Full Complaint File →
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel 1: Cases by category */}
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
            Cases by Category
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Customer Complaints</span>
                <span className="text-gray-900">42% (54 cases)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Returns & Refunds</span>
                <span className="text-gray-900">28% (36 cases)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Warranty & Repair</span>
                <span className="text-gray-900">15% (19 cases)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-700">Payment Reconciliation</span>
                <span className="text-gray-900">10% (13 cases)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Evidence Waiting */}
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
            Evidence Waiting
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <div className="font-semibold text-gray-900">Fresh Produce Photos</div>
                <div className="text-[10px] text-gray-400">Order #HM-88412 • Rotten Mangoes</div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Pending Customer
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <div className="font-semibold text-gray-900">Technician Report</div>
                <div className="text-[10px] text-gray-400">Whirlpool 265L Refrigerator</div>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                Scheduled 4 PM
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <div>
                <div className="font-semibold text-gray-900">Warehouse Seal Verification</div>
                <div className="text-[10px] text-gray-400">Matte Lipstick • SKU-LP-991</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Photo Ready
              </span>
            </div>
          </div>
        </div>

        {/* Panel 3: Operational Quick Controls */}
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
            Triage Controls
          </h3>
          <div className="space-y-2 text-xs">
            <button
              onClick={() => {
                addToast('Bulk Assign Triggered', '6 unassigned cases distributed to available agents', 'success');
              }}
              className="w-full py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100 border border-emerald-200 flex items-center justify-between transition-colors"
            >
              <span>Auto-Balance Open Queues</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                addToast('SLA Alerts Broadcasted', 'High alert broadcast sent to shift floor', 'warning');
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-50 text-amber-900 font-semibold hover:bg-amber-100 border border-amber-200 flex items-center justify-between transition-colors"
            >
              <span>Broadcast SLA Risk Warnings</span>
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/portal/team-performance"
              className="w-full py-2 px-3 rounded-xl bg-gray-50 text-gray-800 font-semibold hover:bg-gray-100 border border-gray-200 flex items-center justify-between transition-colors"
            >
              <span>Inspect Shift Roster (14 Agents)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Motion & UX Bottom Banner */}
      <MotionBanner text="Row hover lift with smooth cubic-bezier, SLA breach warning pulse, and dynamic priority assignment." />
    </div>
  );
}
