'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Clock,
  Truck,
  Building2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Phone,
  CheckCircle2,
  Scan,
  User,
  Upload,
  Check,
  X,
  Camera,
  ShieldAlert,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import type { PackageCondition, ReturnStatus } from '@/types/delivery';
import { cn } from '@/lib/cn';

const RETURN_WORKFLOW_STEPS: { status: ReturnStatus; label: string; sub: string }[] = [
  { status: 'assigned', label: 'Assigned', sub: 'Return task assigned to you' },
  { status: 'en_route', label: 'En route', sub: 'On the way to customer' },
  { status: 'arrived', label: 'Arrived', sub: 'Reached customer location' },
  { status: 'received', label: 'Package received', sub: 'Picked up return package' },
  { status: 'proof', label: 'Proof', sub: 'Capture photo and confirm' },
  { status: 'handed_over', label: 'Warehouse handover', sub: 'Handover at HyperMart warehouse' },
];

export default function ReturnsPage() {
  const {
    returns,
    currentReturnIndex,
    setCurrentReturnIndex,
    advanceReturnStep,
    setReturnPackageCondition,
    addReturnPhoto,
    setReturnBarcode,
    setReturnReceiver,
    confirmReturnHandover,
  } = useDeliveryStore();

  const currentTask = returns[currentReturnIndex] || returns[0];

  const [selectedCondition, setSelectedCondition] = useState<PackageCondition>(
    currentTask.packageCondition || 'good'
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    currentTask.photos[0] || '/landing/card-delivery.jpg'
  );
  const [barcodeInput, setBarcodeInput] = useState(currentTask.returnLabelBarcode || 'RET-LBL-88219-01');
  const [receiverInput, setReceiverInput] = useState(currentTask.warehouseReceiver || 'Ramesh Kumar');

  // KPI Calculations
  const assignedCount = returns.length;
  const dueTodayCount = returns.filter((r) => r.pickupSlot.date.includes('Today')).length;
  const pickedUpCount = returns.filter((r) => r.status === 'received' || r.status === 'proof').length;
  const warehousePendingCount = returns.filter((r) => r.status !== 'handed_over').length;

  const currentStepIdx = RETURN_WORKFLOW_STEPS.findIndex((s) => s.status === currentTask.status);

  const handleConfirmHandoverClick = () => {
    setReturnPackageCondition(currentTask.id, selectedCondition);
    setReturnBarcode(currentTask.id, barcodeInput);
    setReturnReceiver(currentTask.id, receiverInput);
    confirmReturnHandover(currentTask.id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Returns and Warehouse Handover
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Manage returns, track handovers, and keep the reverse logistics moving smoothly.
        </p>
      </div>

      {/* ── 4 KPI Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Assigned */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Assigned</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">{assignedCount}</p>
            <p className="text-[11px] text-gray-500">Return pickups assigned</p>
          </div>
        </div>

        {/* Due Today */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Due Today</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">{dueTodayCount}</p>
            <p className="text-[11px] text-gray-500">Need to be picked up</p>
          </div>
        </div>

        {/* Picked Up */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Picked Up</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">{pickedUpCount}</p>
            <p className="text-[11px] text-gray-500">Collected from customers</p>
          </div>
        </div>

        {/* Warehouse Pending */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Warehouse Pending</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">{warehousePendingCount}</p>
            <p className="text-[11px] text-gray-500">To be handed over</p>
          </div>
        </div>
      </div>

      {/* ── 3-Column Work Area (Current Return Task, Workflow, Warehouse Handover) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr_1.3fr] gap-5">
        {/* Column 1: Current Return Task */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            {/* Header with Prev/Next */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="font-display font-black text-base text-gray-900">Current Return Task</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">
                  {currentReturnIndex + 1} of {returns.length}
                </span>
                <button
                  onClick={() => setCurrentReturnIndex(Math.max(0, currentReturnIndex - 1))}
                  disabled={currentReturnIndex === 0}
                  className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentReturnIndex(Math.min(returns.length - 1, currentReturnIndex + 1))}
                  disabled={currentReturnIndex === returns.length - 1}
                  className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Task Card Header */}
            <div className="flex items-start gap-3 mt-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display font-black text-base text-gray-900 leading-tight">
                    {currentTask.id}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    {currentTask.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Return Pickup
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">Order {currentTask.orderId}</p>
              </div>
            </div>

            {/* Field Details */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">{currentTask.customerName}</p>
                  <p className="text-[11px] text-gray-500">{currentTask.customerPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Pickup slot</p>
                  <p className="font-semibold text-gray-800">
                    {currentTask.pickupSlot.date}, {currentTask.pickupSlot.start} – {currentTask.pickupSlot.end}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Return reason / item</p>
                  <p className="font-bold text-gray-900">{currentTask.returnReason}</p>
                  <p className="text-[11px] text-gray-600">{currentTask.item}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Package className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Packages</p>
                  <p className="font-semibold text-gray-800">
                    {currentTask.packages} package • Approx. {currentTask.weightKg} kg
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Pickup address</p>
                  <p className="text-[11px] text-gray-700 leading-tight">
                    {currentTask.pickupAddress}, {currentTask.pickupCity}, {currentTask.pickupPincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={() => advanceReturnStep(currentTask.id)}
            className="w-full py-3 rounded-xl bg-[#073922] text-[#C6F04A] font-bold text-xs hover:bg-[#052818] transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Advance Return Step ({currentTask.status})</span>
          </button>
        </div>

        {/* Column 2: Return Workflow (Vertical Stepper) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="font-display font-black text-base text-gray-900 mb-4">Return Workflow</h2>

            <div className="space-y-4 pl-1 text-xs">
              {RETURN_WORKFLOW_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStepIdx || currentTask.status === 'handed_over';
                const isCurrent = idx === currentStepIdx && currentTask.status !== 'handed_over';

                return (
                  <div key={step.status} className="flex items-start gap-3 relative">
                    {/* Vertical connector line */}
                    {idx < RETURN_WORKFLOW_STEPS.length - 1 && (
                      <div
                        className={cn(
                          'absolute left-2.5 top-5 w-0.5 h-8',
                          isCompleted ? 'bg-emerald-600' : 'bg-gray-200'
                        )}
                      />
                    )}

                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 transition',
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'border-2 border-emerald-600 text-emerald-600 bg-white ring-2 ring-emerald-600/20'
                          : 'border-2 border-gray-300 text-gray-400 bg-white'
                      )}
                    >
                      {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </div>

                    <div>
                      <p className={cn('font-bold', isCurrent ? 'text-emerald-950 font-black' : isCompleted ? 'text-gray-900' : 'text-gray-400')}>
                        {step.label}
                      </p>
                      <p className="text-[10.5px] text-gray-500 mt-0.5 leading-snug">{step.sub}</p>
                      {idx === 0 && <p className="text-[10px] text-gray-400 mt-0.5">Mar 10, 2024 • 8:00 AM</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 3: Warehouse Handover */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h2 className="font-display font-black text-base text-gray-900">Warehouse Handover</h2>
            <p className="text-xs text-gray-500 mt-0.5">Verify items and complete the handover at the warehouse.</p>

            <div className="mt-4 space-y-4 text-xs">
              {/* Package Condition Selector */}
              <div>
                <label className="font-bold text-gray-900 block mb-1.5">Package condition</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'good', label: 'Good', icon: CheckCircle2 },
                    { id: 'damaged', label: 'Damaged', icon: AlertTriangle },
                    { id: 'missing', label: 'Missing item', icon: Package },
                    { id: 'tampered', label: 'Tampered', icon: ShieldAlert },
                  ].map((cond) => {
                    const isSelected = selectedCondition === cond.id;
                    const Icon = cond.icon;
                    return (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setSelectedCondition(cond.id as PackageCondition)}
                        className={cn(
                          'p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition cursor-pointer',
                          isSelected
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-500'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cond.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Evidence */}
              <div>
                <label className="font-bold text-gray-900 block mb-1">Photo evidence</label>
                <p className="text-[10px] text-gray-400 mb-2">Upload clear photos of the package and contents.</p>

                <div className="grid grid-cols-2 gap-2">
                  {photoPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 h-20 bg-gray-100">
                      <img src={photoPreview} alt="Package condition" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPhotoPreview('/landing/card-delivery.jpg')}
                      className="h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#073922] transition flex flex-col items-center justify-center text-center p-1"
                    >
                      <Camera className="w-4 h-4 text-gray-400 mb-0.5" />
                      <span className="text-[9.5px] font-bold text-gray-600">Click to upload</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPhotoPreview('/landing/card-delivery.jpg')}
                    className="h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#073922] transition flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Return Label Scan */}
              <div>
                <label className="font-bold text-gray-900 block mb-1">Return label scan</label>
                <div className="relative">
                  <Scan className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    placeholder="Scan or enter barcode"
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#073922]"
                  />
                </div>
              </div>

              {/* Receiver & Auto Handover ID */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-gray-900 block mb-1">Warehouse receiver</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={receiverInput}
                      onChange={(e) => setReceiverInput(e.target.value)}
                      placeholder="Enter receiver name"
                      className="w-full pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-900 block mb-1">Handover ID (Auto)</label>
                  <div className="p-1.5 px-2 bg-gray-100 border border-gray-200 rounded-xl font-mono text-xs font-bold text-gray-700 truncate">
                    {currentTask.handoverId || 'WH-20240310-0042'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmHandoverClick}
            disabled={currentTask.status === 'handed_over'}
            className="w-full py-3.5 rounded-xl bg-[#C6F04A] text-[#073922] font-black text-sm hover:bg-[#B5DF3A] disabled:opacity-40 disabled:pointer-events-none transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{currentTask.status === 'handed_over' ? 'Handover Completed' : 'Confirm handover'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

