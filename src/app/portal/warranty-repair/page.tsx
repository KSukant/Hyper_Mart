'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  ShieldCheck,
  FileText,
  Truck,
  Scan,
  RefreshCw,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function WarrantyRepairPage() {
  const {
    warrantyCases,
    selectedWarrantyCaseId,
    setSelectedWarrantyCaseId,
    updateWarrantyStatus,
    rescheduleWarrantyVisit,
    openConfirmation,
    addToast,
    searchQuery,
  } = usePortalStore();

  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredCases = warrantyCases.map((c) => ({
    ...c,
    customerName: c.customerName || 'Rajesh V.',
    warrantyPeriod: c.warrantyPeriod || c.warrantyExpiry || '1 Year Comprehensive',
    repairEstimate: typeof c.repairEstimate === 'number' ? `₹${c.repairEstimate}` : c.repairEstimate,
  })).filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedCase =
    filteredCases.find((c) => c.id === selectedWarrantyCaseId) || filteredCases[0];

  const statusColors: Record<string, string> = {
    'Visit scheduled': 'bg-blue-50 text-blue-700 border-blue-200',
    Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    'Serial verification': 'bg-amber-50 text-amber-700 border-amber-200',
    'Serial review': 'bg-amber-50 text-amber-700 border-amber-200',
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Under inspection': 'bg-purple-50 text-purple-700 border-purple-200',
    'Replacement recommended': 'bg-rose-50 text-rose-700 border-rose-200',
    Replacement: 'bg-rose-50 text-rose-700 border-rose-200',
    Repaired: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Repair: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Warranty and Repair Support
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              OEM Network
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Appliance triage, OEM technician dispatch, and serial validity verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 shadow-2xs outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Visit scheduled">Visit Scheduled</option>
            <option value="Verified">Verified</option>
            <option value="Serial review">Serial Review</option>
            <option value="Replacement">Replacement Recommended</option>
            <option value="Repair">Under Repair</option>
          </select>

          <button
            onClick={() => {
              addToast('Technician Roster Refreshed', 'OEM service partner slots updated for South DC', 'info');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync OEM Slots</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="OPEN WARRANTY CASES"
          value="42"
          subtext="3 new logged this morning"
          dotColor="emerald"
          badge="Active"
        />
        <MetricCard
          label="VISITS SCHEDULED"
          value="19"
          subtext="7 visits assigned for today"
          dotColor="blue"
          badge="7 Today"
          trend="On Track"
        />
        <MetricCard
          label="SERIAL VERIFICATION"
          value="8"
          subtext="Pending physical serial tag scan"
          dotColor="amber"
          badge="Pending Scan"
        />
        <MetricCard
          label="REPLACEMENT RECOMMENDED"
          value="4"
          subtext="Estimated repair cost exceeds 70%"
          dotColor="rose"
          badge="Swap Required"
        />
      </div>

      {/* Main 2-Column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E1E8E1] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Warranty Queue & Dispatches</h2>
              <p className="text-[11px] text-gray-500">
                Displaying {filteredCases.length} service requests
              </p>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Whirlpool • LG • Samsung Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px] font-bold border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Product / Serial</th>
                  <th className="py-3 px-4">Reported Issue</th>
                  <th className="py-3 px-4">Technician</th>
                  <th className="py-3 px-4">Visit Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCases.map((c) => {
                  const isSelected = c.id === selectedCase?.id;

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedWarrantyCaseId(c.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold text-gray-900">
                        {c.caseNumber}
                      </td>
                      <td className="py-3 px-4 max-w-[200px]">
                        <div className="font-semibold text-gray-800 truncate">{c.productName}</div>
                        <div className="text-[10px] font-mono text-gray-400 truncate">{c.serialNumber}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium truncate max-w-[150px]">{c.issue}</td>
                      <td className="py-3 px-4 text-gray-700 font-semibold">{c.technician}</td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{c.visitSchedule}</td>
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
                          Triage →
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
                Selected Warranty Case
              </span>
              <h3 className="text-base font-extrabold text-gray-950 font-mono mt-0.5">
                {selectedCase.caseNumber}
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
              {selectedCase.status}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-gray-900">{selectedCase.productName}</div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold text-gray-900">{selectedCase.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Serial Tag:</span>
              <span className="font-mono font-bold text-gray-900">{selectedCase.serialNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Warranty Coverage:</span>
              <span className="font-semibold text-emerald-700">{selectedCase.warrantyPeriod}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Assigned Tech:</span>
              <span className="font-semibold text-gray-800">{selectedCase.technician}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Scheduled Visit:</span>
              <span className="font-mono font-bold text-blue-700">{selectedCase.visitSchedule}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500">Repair Estimate:</span>
              <span className="font-mono font-bold text-emerald-800">{selectedCase.repairEstimate}</span>
            </div>
          </div>

          {/* Diagnostic & Tech Notes */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Diagnostic Telemetry & Technician Notes
            </div>
            <div className="font-semibold text-gray-900">Code: {selectedCase.diagnosticCode}</div>
            <p className="text-gray-600 leading-snug">{selectedCase.technicianReport}</p>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                rescheduleWarrantyVisit(selectedCase.id, 'Tomorrow, 11:00 AM - 01:00 PM');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Reschedule Technician Slot</span>
            </button>

            <button
              onClick={() => {
                openConfirmation({
                  title: 'Approve Warranty Unit Replacement',
                  description: `Repair estimate of ${selectedCase.repairEstimate} justifies full unit replacement under OEM agreement. Order brand-new replacement unit for ${selectedCase.customerName}?`,
                  confirmLabel: 'Authorize Swap',
                  variant: 'primary',
                  meta: {
                    recordId: selectedCase.caseNumber,
                    policy: 'Appliance Replacement Policy Clause 4',
                    amount: String(selectedCase.repairEstimate),
                  },
                  onConfirm: () => {
                    updateWarrantyStatus(selectedCase.id, 'Replacement');
                  },
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Approve Unit Replacement</span>
            </button>

            <button
              onClick={() => {
                updateWarrantyStatus(selectedCase.id, 'Repair');
              }}
              className="w-full py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs transition-colors"
            >
              Mark Job Completed & Repaired
            </button>
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            OEM Partner Network
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Live integration with <strong>Whirlpool, Samsung, LG & Voltas</strong>. Instant technician appointment dispatch within 2 hours of case creation.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            48-Hour Visit Adherence
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>96.1%</strong> on-time technician doorstep arrival rate. Delayed appointments automatically trigger ₹300 convenience credit to customer.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            70% Replacement Rule
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            If OEM repair estimate exceeds 70% of current retail unit price, automated approval recommends full brand replacement without delay.
          </p>
        </div>
      </div>

      <MotionBanner text="Serial verification scan line animation, technician scheduling calendar reveal, and repair-stage progression." />
    </div>
  );
}
