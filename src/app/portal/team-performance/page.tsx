'use client';

import React, { useState } from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  UserCheck,
  Building2,
  AlertTriangle,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function TeamPerformancePage() {
  const {
    teamAgents,
    selectedAgentId,
    setSelectedAgentId,
    rebalanceAgentWorkload,
    setAgentStatus,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredAgents = teamAgents.map((a) => ({
    ...a,
    cases: a.cases ?? a.casesCount ?? 4,
    slaRisk: a.slaRisk ?? a.slaRiskCount ?? 0,
    workload: a.workload ?? a.workloadPercent ?? 75,
    queues: a.queues || [a.assignedQueues],
    shift: a.shift || a.shiftHours || '09:00 - 18:00',
    languages: a.languages || a.skills || ['English', 'Tamil'],
    coachingNote: a.coachingNote || a.coachingTopic || 'SLA triage guidance',
  })).filter((a) => {
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.queues.some((q) => q.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const selectedAgent =
    filteredAgents.find((a) => a.id === selectedAgentId) || filteredAgents[0];

  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Online: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'In call': 'bg-blue-50 text-blue-800 border-blue-200',
    Break: 'bg-amber-50 text-amber-800 border-amber-200',
    Away: 'bg-amber-50 text-amber-800 border-amber-200',
    Training: 'bg-purple-50 text-purple-800 border-purple-200',
    Offline: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Team Performance & Capacity Hub
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Coaching Focused
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Workload balancing, shift coverage monitoring, customer satisfaction quality, and proactive agent coaching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Availabilities</option>
            <option value="Online">Online on Shift</option>
            <option value="In call">In Call</option>
            <option value="Away">Away / Break</option>
            <option value="Offline">Offline</option>
          </select>

          <button
            onClick={() => {
              rebalanceAgentWorkload('ag-1', 'ag-3', 2);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Auto-Balance Queues</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="TEAM MEMBERS"
          value="14"
          subtext="12 currently active on floor"
          dotColor="emerald"
          badge="12 Active"
        />
        <MetricCard
          label="CASES RESOLVED"
          value="342"
          subtext="Daily shift total (+14% vs target)"
          dotColor="blue"
          badge="+14%"
          trend="Ahead"
        />
        <MetricCard
          label="SLA COMPLIANCE"
          value="96.8%"
          subtext="Exceeds 95% service standard"
          dotColor="emerald"
          badge="Healthy"
        />
        <MetricCard
          label="TEAM CSAT"
          value="4.8 / 5.0"
          subtext="Customer satisfaction index (892 ratings)"
          dotColor="purple"
          badge="Excellent"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Operator Workload & Capacity Roster</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredAgents.length} service agents & leads
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Capacity Equalization Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Operator</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Open Cases</th>
                  <th className="py-3 px-4">SLA Risk</th>
                  <th className="py-3 px-4">CSAT</th>
                  <th className="py-3 px-4">Current Workload</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAgents.map((a) => {
                  const isSelected = a.id === selectedAgent?.id;

                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelectedAgentId(a.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-gray-900">{a.name}</td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{a.role}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[a.status] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-950">{a.cases}</td>
                      <td className="py-3 px-4 font-mono font-bold text-rose-600">
                        {a.slaRisk} cases
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">★ {a.csat}</td>
                      <td className="py-3 px-4 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                a.workload > 80
                                  ? 'bg-rose-500'
                                  : a.workload > 60
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${a.workload}%` }}
                            />
                          </div>
                          <span className="font-mono text-[10px] font-bold text-gray-700">
                            {a.workload}%
                          </span>
                        </div>
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

        {/* Selected Record Detail (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Selected Team Member
              </span>
              <h3 className="text-base font-extrabold text-gray-950 mt-0.5">
                {selectedAgent.name}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {selectedAgent.status}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Designation:</span>
              <span className="font-semibold text-gray-900">{selectedAgent.role}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Shift Window:</span>
              <span className="font-mono text-gray-800">{selectedAgent.shift}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Spoken Languages:</span>
              <span className="font-medium text-gray-800">{(selectedAgent.languages || []).join(', ')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Assigned Queues:</span>
              <span className="font-semibold text-emerald-800">{(selectedAgent.queues || []).join(' • ')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Active Workload:</span>
              <span className="font-mono font-bold text-gray-900">
                {selectedAgent.cases} cases ({selectedAgent.workload}% capacity)
              </span>
            </div>
          </div>

          {/* Coaching & Development Alert */}
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1.5 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Proactive Coaching Guidance
            </div>
            <p className="text-purple-900 leading-snug">
              {selectedAgent.coachingNote}
            </p>
          </div>

          {/* Availability Status Buttons */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Update Agent Shift Availability
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setAgentStatus(selectedAgent.id, 'Online')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${
                  selectedAgent.status === 'Online'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setAgentStatus(selectedAgent.id, 'Away')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${
                  selectedAgent.status === 'Away'
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Break
              </button>
              <button
                onClick={() => setAgentStatus(selectedAgent.id, 'In call')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${
                  selectedAgent.status === 'In call'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                In Call
              </button>
            </div>

            <button
              onClick={() => {
                openConfirmation({
                  title: `Rebalance Cases from ${selectedAgent.name}`,
                  description: `Transfer 4 lowest-urgency cases from ${selectedAgent.name} to available secondary tier agents to optimize floor SLA compliance.`,
                  confirmLabel: 'Transfer Workload',
                  variant: 'primary',
                  meta: {
                    recordId: selectedAgent.name,
                    policy: 'Team Capacity Equalization Policy',
                  },
                  onConfirm: () => {
                    rebalanceAgentWorkload(selectedAgent.id, 'ag-2', 4);
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rebalance Cases to Floor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Queue Assignments
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Support queues dynamically auto-assign based on agent linguistic proficiencies (Tamil, English, Hindi) and category certifications.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Shift Coverage & Handover
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Shift A (09:00 - 18:00) overlaps 1 hour with Shift B (17:00 - 01:00) to ensure zero context drop during live customer triage.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Coaching over Ranking
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Metrics track capacity distribution and team health rather than punitive ranking, keeping burn-out low and CSAT above 4.8.
          </p>
        </div>
      </div>

      <MotionBanner text="Workload bar growth animation, availability status change, and rebalance confirmation drawer." />
    </div>
  );
}
