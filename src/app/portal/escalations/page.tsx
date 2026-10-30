'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  UserCheck,
  Building2,
  FileText,
  RefreshCw,
  Send,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function EscalationsPage() {
  const {
    escalationCases,
    selectedEscalationId,
    setSelectedEscalationId,
    resolveEscalation,
    reassignEscalation,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [teamFilter, setTeamFilter] = useState<string>('All');

  const filteredCases = escalationCases.map((c) => ({
    ...c,
    sourceCase: c.sourceCase || c.sourceRecord || c.orderNumber,
    slaRemaining: c.slaRemaining || c.targetDecision || 'Within 2 hours',
    currentDecision: c.currentDecision || c.targetDecision || 'Pending Lead Review',
  })).filter((c) => {
    const matchesTeam = teamFilter === 'All' || c.targetTeam === teamFilter;
    const matchesSearch =
      !searchQuery ||
      c.escalationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sourceCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const selectedCase =
    filteredCases.find((c) => c.id === selectedEscalationId) || filteredCases[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Management Escalations
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              Tier-2 Authority
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Cross-departmental incident escalation, policy override approvals, and root-cause resolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Target Teams</option>
            <option value="Quality">Quality Operations</option>
            <option value="Finance">Finance & Accounts</option>
            <option value="Support">Support Operations</option>
            <option value="Delivery">Delivery Dispatch</option>
            <option value="Manager">Executive Management</option>
          </select>

          <button
            onClick={() => {
              addToast('Escalations Synced', 'Incident triage queue re-ranked based on SLA urgency', 'info');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Escalations</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="OPEN ESCALATIONS"
          value="19"
          subtext="4 cases with < 1hr SLA remaining"
          dotColor="rose"
          badge="High Alert"
        />
        <MetricCard
          label="SUPPORT ESCALATIONS"
          value="11"
          subtext="Customer friction & damaged goods"
          dotColor="amber"
          badge="11 Cases"
        />
        <MetricCard
          label="FINANCE ESCALATIONS"
          value="8"
          subtext="Refund threshold & COD holds"
          dotColor="purple"
          badge="8 Cases"
        />
        <MetricCard
          label="RESOLVED TODAY"
          value="15"
          subtext="Above daily target of 12"
          dotColor="emerald"
          badge="Healthy"
          trend="+5 today"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Active Escalation Stream</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredCases.length} prioritized management incidents
              </p>
            </div>
            <span className="text-[11px] font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Executive SLA Guard Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Escalation ID</th>
                  <th className="py-3 px-4">Source Case</th>
                  <th className="py-3 px-4">Escalation Reason</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Target Team</th>
                  <th className="py-3 px-4">SLA Left</th>
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

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedEscalationId(c.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {c.escalationNumber}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-800">
                        {c.sourceCase}
                      </td>
                      <td className="py-3 px-4 max-w-[220px]">
                        <div className="font-semibold text-gray-800 truncate">{c.reason}</div>
                        <div className="text-[10px] text-gray-400">Trigger: Repeated incident</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            priorityColors[c.priority]
                          }`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 font-medium">{c.owner}</td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                          {c.targetTeam}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600 text-[11px]">
                        {c.slaRemaining}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-emerald-700 font-bold text-[11px] hover:underline">
                          Decide →
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
                Selected Escalation Incident
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedCase.escalationNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
              {selectedCase.priority}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-gray-900">{selectedCase.reason}</div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Source Case:</span>
              <span className="font-mono font-bold text-emerald-800">{selectedCase.sourceCase}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Target Team:</span>
              <span className="font-semibold text-gray-900">{selectedCase.targetTeam}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Decision Owner:</span>
              <span className="font-semibold text-gray-800">{selectedCase.owner}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Remaining SLA:</span>
              <span className="font-mono font-bold text-rose-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedCase.slaRemaining}
              </span>
            </div>
          </div>

          {/* Trigger Rules Box */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              Escalation Policy Rule Fired
            </div>
            <p className="text-amber-900 font-medium leading-snug">
              {selectedCase.escalationRule}
            </p>
          </div>

          {/* Current Decision State */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">Proposed Remediation</span>
            <span className="font-semibold text-gray-900">{selectedCase.currentDecision}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                reassignEscalation(selectedCase.id, 'Priya Nair (Operations Head)');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Claim & Assign to Myself</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Sign-Off & Close Escalation',
                  description: `Resolve escalation ${selectedCase.escalationNumber} with approved executive decision. Audit logs will record sign-off.`,
                  confirmLabel: 'Approve & Close',
                  variant: 'primary',
                  meta: {
                    recordId: selectedCase.escalationNumber,
                    policy: selectedCase.escalationRule,
                  },
                  onConfirm: () => {
                    resolveEscalation(selectedCase.id, 'Approved and resolved by Tier-2 Lead');
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Authorize Decision & Close</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Repeated Defect Rule
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If 3 customer complaints hit the same SKU or vendor batch in a 7-day period, automated safety block temporarily holds SKU dispatch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Cross-Functional SLAs
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Finance & Warehouse leads have mandatory <strong>2-hour SLA response times</strong> on escalations tagged Critical.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Grievance Redressal Officer
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Escalations exceeding 6 hours automatically CC the National Grievance Officer pursuant to consumer e-commerce guidelines.
          </p>
        </div>
      </div>

      <MotionBanner text="Priority transition with subtle pulse, assignment drawer animation, and decision timeline." />
    </div>
  );
}
