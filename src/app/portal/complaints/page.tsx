'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  User,
  CreditCard,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Package,
  Phone,
  Mail,
  Eye,
  FileCheck,
  ExternalLink,
  Clock,
  Send,
  Camera,
} from 'lucide-react';
import { MetricCard } from '@/components/portal/MetricCard';
import { MotionBanner } from '@/components/portal/MotionBanner';
import { usePortalStore } from '@/store/portalStore';

export default function ComplaintCaseDetailPage() {
  const {
    complaintDetail,
    updateComplaintResolution,
    setLightboxImage,
    openConfirmation,
    addToast,
  } = usePortalStore();

  const [contactMessage, setContactMessage] = useState('');
  const [selectedResolution, setSelectedResolution] = useState<string>('Approve Full Refund');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">
              Complaint Case Detail
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
              {complaintDetail.caseNumber}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Detailed resolution workflow, order context, evidence inspection, and policy evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              addToast('Customer Contacted', 'Automated SMS & WhatsApp update sent to customer', 'info');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-xl shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Call Customer</span>
          </button>

          <button
            onClick={() => {
              openConfirmation({
                title: 'Escalate to Regional Operations Head',
                description: `Escalating case ${complaintDetail.caseNumber} for executive sign-off due to policy override requirements.`,
                confirmLabel: 'Confirm Escalation',
                variant: 'warning',
                meta: {
                  recordId: complaintDetail.caseNumber,
                  amount: `₹${complaintDetail.orderValue}`,
                  policy: 'Beauty Policy Exception Tier-2',
                },
                onConfirm: () => {
                  addToast('Case Escalated', 'Complaint forwarded to Regional Quality Lead', 'warning');
                },
              });
            }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-gray-950 px-3.5 py-2 rounded-xl shadow-xs font-bold"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Escalate to Lead</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="PRIORITY"
          value={complaintDetail.priority}
          subtext={`Due in ${complaintDetail.dueIn} • Critical SLA`}
          dotColor="rose"
          badge="High Attention"
        />
        <MetricCard
          label="CUSTOMER"
          value={complaintDetail.customerName}
          subtext={`${complaintDetail.memberTier} • ${complaintDetail.priorCases} prior complaints`}
          dotColor="emerald"
          badge="Loyal Member"
        />
        <MetricCard
          label="ORDER VALUE"
          value={`₹${complaintDetail.orderValue.toLocaleString()}`}
          subtext={`${complaintDetail.paymentMethod} • Settled to Gateway`}
          dotColor="blue"
          badge="Order Paid"
        />
        <MetricCard
          label="ASSIGNED OWNER"
          value={complaintDetail.assignedOwner}
          subtext={complaintDetail.ownerStatus}
          dotColor="purple"
          badge="Shift Lead"
        />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product & Complaint Context (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product & Shipment Context Card */}
          <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700 font-bold flex-shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-gray-900">
                    {complaintDetail.productName}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                    <span>SKU: <strong className="text-gray-700">{complaintDetail.sku}</strong></span>
                    <span>•</span>
                    <span>Order: <strong className="text-emerald-800 font-mono">#{complaintDetail.orderNumber}</strong></span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Delivered Yesterday
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Shipment Partner</span>
                <span className="font-semibold text-gray-800">BlueDart Air Express</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Fulfillment DC</span>
                <span className="font-semibold text-gray-800">Coimbatore Hub 04</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Category Policy</span>
                <span className="font-semibold text-amber-800">{complaintDetail.policyCategory}</span>
              </div>
            </div>

            {/* Customer Message Block */}
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Original Customer Complaint
                </span>
                <span className="text-[10px] text-gray-500 font-mono">11:15 AM Today</span>
              </div>
              <p className="text-xs text-gray-800 leading-relaxed font-serif italic">
                &quot;{complaintDetail.originalMessage}&quot;
              </p>
              <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between text-[11px]">
                <span className="text-gray-600">Customer Desired Outcome:</span>
                <span className="font-bold text-rose-800">{complaintDetail.customerAsk}</span>
              </div>
            </div>
          </div>

          {/* Evidence Gallery Card */}
          <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Attached Verification Evidence
                </h3>
                <p className="text-[11px] text-gray-500">
                  {complaintDetail.evidenceSummary}
                </p>
              </div>
              <button
                onClick={() => {
                  setLightboxImage({
                    src: complaintDetail.customerPhotos[0],
                    title: 'Customer Photograph • Damaged Cosmetic Seal',
                    subtitle: `Case ${complaintDetail.caseNumber} • Uploaded via mobile app`,
                  });
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Enlarge All</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Evidence Item 1 */}
              <div
                onClick={() => {
                  setLightboxImage({
                    src: complaintDetail.customerPhotos[0],
                    title: 'Customer Upload: Broken Box Seal',
                    subtitle: 'Captured: 11:18 AM • Verified Authentic',
                  });
                }}
                className="group relative rounded-xl border border-gray-200 overflow-hidden cursor-pointer bg-gray-950 aspect-video flex items-center justify-center hover:ring-2 hover:ring-emerald-500 transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={complaintDetail.customerPhotos[0]}
                  alt="Customer evidence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-semibold">Customer Photo</span>
                </div>
              </div>

              {/* Evidence Item 2 */}
              <div
                onClick={() => {
                  setLightboxImage({
                    src: complaintDetail.customerPhotos[1],
                    title: 'Warehouse Pack Audit Photo',
                    subtitle: 'Dispatch Inspection Cam #4 • Coimbatore DC',
                  });
                }}
                className="group relative rounded-xl border border-gray-200 overflow-hidden cursor-pointer bg-gray-950 aspect-video flex items-center justify-center hover:ring-2 hover:ring-emerald-500 transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={complaintDetail.customerPhotos[1]}
                  alt="Warehouse dispatch proof"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-semibold">Dispatch Audit</span>
                </div>
              </div>

              {/* Evidence Item 3: Digital Scan */}
              <div
                onClick={() => {
                  setLightboxImage({
                    src: '',
                    title: 'Courier Handover Geo-Signature',
                    subtitle: 'BlueDart Courier ID BD-771 • GPS lat: 11.0168, lng: 76.9558',
                  });
                }}
                className="p-3 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between cursor-pointer hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-700">
                  <FileCheck className="w-4 h-4" />
                  <span className="text-[11px] font-bold">Delivery POD</span>
                </div>
                <div className="text-[10px] text-gray-500">
                  Signed at doorstep by recipient Meera K.
                </div>
                <span className="text-[10px] text-emerald-800 font-bold">View Telemetry →</span>
              </div>
            </div>
          </div>

          {/* Workflow Timeline Card */}
          <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
              Resolution Pipeline
            </h3>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
              {complaintDetail.timeline.map((step, idx) => (
                <div key={step.step} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step.done
                        ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] mt-2 font-medium max-w-[80px] text-center ${
                      step.done ? 'text-gray-900 font-bold' : 'text-gray-400'
                    }`}
                  >
                    {step.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Resolution Decision Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs space-y-5">
          <div className="pb-3 border-b border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Policy Assessment & Resolution
            </span>
            <h3 className="text-sm font-extrabold text-gray-950 mt-0.5">
              Resolution Decision Engine
            </h3>
          </div>

          {/* Policy Check Output */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Policy Evaluation Passed</span>
            </div>
            <p className="text-emerald-800 leading-snug">
              {complaintDetail.policyResult}
            </p>
          </div>

          {/* Resolution Options Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Select Authorized Action
            </label>
            <div className="space-y-1.5">
              {complaintDetail.resolutionOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedResolution(opt)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                    selectedResolution === opt
                      ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-950 ring-1 ring-emerald-600'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {selectedResolution === opt && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Decision Execution Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                openConfirmation({
                  title: `Execute Resolution: ${selectedResolution}`,
                  description: `This action will trigger an automated resolution for ${complaintDetail.customerName} on order #${complaintDetail.orderNumber}.`,
                  confirmLabel: 'Authorize & Dispatch',
                  variant: 'primary',
                  meta: {
                    recordId: complaintDetail.caseNumber,
                    amount: `₹${complaintDetail.orderValue}`,
                    policy: 'Seal Exception Auth - Tier 1',
                    destination: 'Customer Bank via UPI',
                  },
                  onConfirm: () => {
                    updateComplaintResolution(selectedResolution);
                  },
                });
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Resolution ({selectedResolution})</span>
            </button>
          </div>

          {/* Quick Customer Notification Box */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Send Direct Message to Customer
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Type resolution message to Meera K. (SMS + Email notification)..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-600 text-gray-800 resize-none"
              />
              <button
                onClick={() => {
                  if (!contactMessage) return;
                  addToast('Message Sent', 'Customer notified with case reference and resolution note', 'success');
                  setContactMessage('');
                }}
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                title="Send notification"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Status Note */}
          <div className="text-[11px] text-gray-400 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <strong>Audit Note:</strong> {complaintDetail.lastAction}
          </div>
        </div>
      </div>

      {/* 3 Bottom Operational Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Customer Profile & Trust Score
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Lifetime Orders:</span>
              <span className="font-bold text-gray-900">38 orders</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gross Spend:</span>
              <span className="font-bold text-emerald-700">₹42,500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Return Rate:</span>
              <span className="font-medium text-emerald-800">5.2% (Low Risk)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Applicable SOP Clause
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>Clause COS-09:</strong> While personal beauty items are non-returnable once opened, broken outer tamper seals at doorstep delivery qualify for instant refund or replacement without return transit.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-5 shadow-xs">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Escalation Safeguard
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Auto-routing will transfer this case to Regional Grievance Officer in <strong>34 minutes</strong> if no resolution is recorded.
          </p>
        </div>
      </div>

      <MotionBanner text="Evidence lightbox reveal with scale(1.02), policy accordion reveal, and refund confirmation drawer." />
    </div>
  );
}
