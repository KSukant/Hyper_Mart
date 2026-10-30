'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Flag,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Laptop,
  Layers,
  FileText,
  Key,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function AuditHistoryPage() {
  const {
    auditHistoryEvents,
    selectedAuditEventId,
    setSelectedAuditEventId,
    flagAuditEvent,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [classificationFilter, setClassificationFilter] = useState<string>('All');

  const filteredEvents = auditHistoryEvents.map((a) => ({
    ...a,
    eventNumber: a.eventNumber || a.id.toUpperCase(),
    record: a.record || a.recordId,
    before: a.before || a.beforeValue,
    after: a.after || a.afterValue,
    classification:
      a.classification ||
      (a.action.includes('Status')
        ? 'Resolution'
        : a.action.includes('Permission')
        ? 'Access'
        : a.action.includes('Approval')
        ? 'Financial'
        : 'Policy Override'),
    session: a.session || a.sessionStatus || 'Active Session',
    linkedRecord: a.linkedRecord || a.caseRef || a.orderRef || a.paymentRef || 'N/A',
  })).filter((a) => {
    const matchesClassification =
      classificationFilter === 'All' || a.classification === classificationFilter;
    const matchesSearch =
      !searchQuery ||
      a.eventNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.record.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClassification && matchesSearch;
  });

  const selectedEvent =
    filteredEvents.find((a) => a.id === selectedAuditEventId) || filteredEvents[0];

  const classColors: Record<string, string> = {
    'Policy Override': 'bg-amber-50 text-amber-900 border-amber-200',
    Financial: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    Access: 'bg-purple-50 text-purple-900 border-purple-200',
    Resolution: 'bg-blue-50 text-blue-900 border-blue-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Governance & Security Audit History
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
              Immutable Ledger
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tamper-evident cryptographically sealed event ledger, policy override tracking, and operator session audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={classificationFilter}
            onChange={(e) => setClassificationFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Classifications</option>
            <option value="Policy Override">Policy Override</option>
            <option value="Financial">Financial Action</option>
            <option value="Access">Security & Access</option>
            <option value="Resolution">Resolution & Triage</option>
          </select>

          <button
            onClick={() => {
              addToast('Audit Log Exported', 'Cryptographically verified audit trail exported as JSON-LD with signature bundle', 'success');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Signed Log</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="EVENTS TODAY"
          value="3,420"
          subtext="Live stream across South Zone DCs"
          dotColor="purple"
          badge="Live Feed"
        />
        <MetricCard
          label="FINANCIAL ACTIVITIES"
          value="482"
          subtext="100% dual-approved with hash check"
          dotColor="emerald"
          badge="Verified"
        />
        <MetricCard
          label="POLICY OVERRIDES"
          value="18"
          subtext="4 manager overrides under review"
          dotColor="amber"
          badge="Audit Attention"
        />
        <MetricCard
          label="ACCESS EVENTS"
          value="142"
          subtext="Zero security anomalies or breaches"
          dotColor="blue"
          badge="Zero Threats"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Immutable Event Sequence</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredEvents.length} signed compliance records
              </p>
            </div>
            <span className="text-[11px] font-medium text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              SHA-256 Block Chained
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Record ID</th>
                  <th className="py-3 px-4">Action Taken</th>
                  <th className="py-3 px-4">Before State</th>
                  <th className="py-3 px-4">After State</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEvents.map((a) => {
                  const isSelected = a.id === selectedEvent?.id;

                  return (
                    <tr
                      key={a.id}
                      onClick={() => setSelectedAuditEventId(a.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-purple-50/70 border-l-4 border-l-purple-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">{a.time}</td>
                      <td className="py-3 px-4 font-bold text-gray-900">{a.actor}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-800">
                        {a.record}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{a.action}</td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">{a.before}</td>
                      <td className="py-3 px-4 font-mono font-bold text-gray-900 text-[11px]">
                        {a.after}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            classColors[a.classification] || 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {a.classification}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-purple-700 font-bold text-[11px] hover:underline">
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
                Selected Security Event
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedEvent.eventNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-900">
              {selectedEvent.classification}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Executing Actor:</span>
              <span className="font-bold text-gray-900">{selectedEvent.actor}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Target Record:</span>
              <span className="font-mono font-bold text-emerald-800">{selectedEvent.record}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Operation:</span>
              <span className="font-semibold text-gray-900">{selectedEvent.action}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Terminal & Device:</span>
              <span className="font-mono text-gray-700">{selectedEvent.device}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Regional DC:</span>
              <span className="font-semibold text-gray-800">{selectedEvent.region}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Session ID:</span>
              <span className="font-mono text-[11px] text-gray-500">{selectedEvent.session}</span>
            </div>
          </div>

          {/* Justification Rationale Box */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Auditor Evidence & Policy Justification
            </div>
            <p className="text-gray-700 leading-snug">{selectedEvent.reason}</p>
            <div className="pt-2 text-[10px] text-gray-400 font-mono">
              Evidence: {selectedEvent.evidence}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: 'Flag Audit Event for Compliance Review',
                  description: `Flag event ${selectedEvent.eventNumber} performed by ${selectedEvent.actor}. This alerts the Chief Compliance Officer and initiates security review.`,
                  confirmLabel: 'Flag Event',
                  variant: 'danger',
                  meta: {
                    recordId: selectedEvent.eventNumber,
                    policy: 'Security Policy Review Request',
                  },
                  onConfirm: () => {
                    flagAuditEvent(selectedEvent.id, 'Flagged by Governance Officer');
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Flag className="w-4 h-4" />
              <span>Flag Event for Compliance Review</span>
            </button>

            <button
              onClick={() => {
                addToast('Linked Record Opened', `Context switched to linked record ${selectedEvent.linkedRecord}`, 'info');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors"
            >
              Inspect Linked Record ({selectedEvent.linkedRecord})
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Immutable Storage
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Audit logs are written to <strong>WORM (Write Once, Read Many)</strong> AWS S3 Glacier Vault with Object Lock compliant with SEC Rule 17a-4.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Cryptographic Integrity Chain
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every audit entry incorporates the SHA-256 digest of the preceding block, creating an unbreakable historical chain verified every 60 seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Regulatory Compliance
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Meets <strong>RBI Digital Payment Security Controls 2021</strong>, ISO/IEC 27001 Annex A.12.4, and Indian DPDP Act 2023 access auditing mandates.
          </p>
        </div>
      </div>

      <MotionBanner text="Event highlight animation, filter drawer, and linked-record focus." />
    </div>
  );
}
