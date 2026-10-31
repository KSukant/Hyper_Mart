'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Navigation,
  Package as PackageIcon,
  CheckCircle2,
  Lock,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  DollarSign,
  Info,
  Check,
  ShieldCheck,
  X,
  FileText,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import type { DeliveryStep } from '@/types/delivery';
import { cn } from '@/lib/cn';

interface PageProps {
  params: Promise<{ id: string }>;
}

const STEP_LABELS: { step: DeliveryStep; label: string; number: number }[] = [
  { step: 'assigned', label: 'Assigned', number: 1 },
  { step: 'en_route', label: 'En route', number: 2 },
  { step: 'arrived', label: 'Arrived', number: 3 },
  { step: 'verify', label: 'Verify', number: 4 },
  { step: 'handover', label: 'Handover', number: 5 },
  { step: 'payment', label: 'Payment', number: 6 },
  { step: 'proof', label: 'Proof', number: 7 },
  { step: 'delivered', label: 'Delivered', number: 8 },
];

export default function DeliveryTaskDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { tasks, advanceTaskStep, verifyOtp, route } = useDeliveryStore();

  const task = tasks.find((t) => t.id === id || t.orderId === id) || tasks[0];

  const [phoneMasked, setPhoneMasked] = useState(true);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);

  // Stepper state calculations
  const currentStepIndex = STEP_LABELS.findIndex((s) => s.step === task.stepState);

  // OTP Handling
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpInput];
    newOtp[index] = val;
    setOtpInput(newOtp);
    setOtpError(false);

    // Auto-advance input focus
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtpSubmit = () => {
    const fullOtp = otpInput.join('');
    const success = verifyOtp(task.id, fullOtp);
    if (success) {
      setIsOtpModalOpen(false);
      advanceTaskStep(task.id); // Moves to handover
    } else {
      setOtpError(true);
    }
  };

  // Previous & Next Task navigation
  const currentIndex = tasks.findIndex((t) => t.id === task.id);
  const prevTask = currentIndex > 0 ? tasks[currentIndex - 1] : null;
  const nextTask = currentIndex < tasks.length - 1 ? tasks[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-12">
      {/* ── Back Navigation & Top Header ── */}
      <div>
        <Link
          href="/delivery-partner/tasks"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to delivery tasks</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Order {task.orderId}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              On track
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/delivery-partner/route-planning"
              className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-2xs"
            >
              View in route
            </Link>

            <button
              onClick={() => prevTask && router.push(`/delivery-partner/tasks/${prevTask.id}`)}
              disabled={!prevTask}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition"
              title="Previous task"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nextTask && router.push(`/delivery-partner/tasks/${nextTask.id}`)}
              disabled={!nextTask}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition"
              title="Next task"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 font-medium mt-1">
          Route {task.routeId} • Stop {task.stopNumber} of {route.totalStops} • Order placed Mar 10, 2024, 9:24 AM
        </p>
      </div>

      {/* ── 8-Step Delivery Stepper ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs overflow-x-auto">
        <div className="min-w-[700px] flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute left-6 right-6 top-4 h-0.5 bg-gray-200 -z-0" />
          <div
            className="absolute left-6 top-4 h-0.5 bg-[#073922] transition-all duration-500 -z-0"
            style={{
              width: `${(Math.max(0, currentStepIndex) / (STEP_LABELS.length - 1)) * 95}%`,
            }}
          />

          {STEP_LABELS.map((s, idx) => {
            const isCompleted = idx < currentStepIndex || task.status === 'delivered';
            const isCurrent = idx === currentStepIndex && task.status !== 'delivered';

            return (
              <div key={s.step} className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-2xs',
                    isCompleted
                      ? 'bg-[#073922] text-[#C6F04A]'
                      : isCurrent
                      ? 'bg-[#073922] text-white ring-4 ring-[#073922]/20 font-black scale-110'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-bold mt-2 whitespace-nowrap',
                    isCurrent ? 'text-[#073922]' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
                <span className="text-[9.5px] text-gray-400 mt-0.5 font-medium">
                  {idx === 0
                    ? task.assignedAt
                    : idx === 1
                    ? task.enRouteAt || '-'
                    : idx === 2
                    ? task.arrivedAt || '-'
                    : idx === 7 && task.deliveredAt
                    ? task.deliveredAt
                    : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3-Column Info Cards (Customer, Package, Payment) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-sm text-gray-900">Customer Details</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                {task.orderType}
              </span>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-gray-900 text-sm">{task.customerName}</p>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {phoneMasked
                    ? task.customerPhone.replace(/(\+\d{2}\s\d{2})\d{4}(\d{4})/, '$1****$2')
                    : task.customerPhone}
                </span>
                <button
                  type="button"
                  onClick={() => setPhoneMasked(!phoneMasked)}
                  className="text-gray-400 hover:text-gray-700 ml-1"
                >
                  {phoneMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-500 pt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>{task.address}, {task.city}, {task.pincode}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(task.address + ', ' + task.city)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#073922] text-white font-bold text-xs hover:bg-[#052818] transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </a>
            <a
              href={`tel:${task.customerPhone}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#C6F04A] text-[#073922] font-bold text-xs hover:bg-[#B5DF3A] transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-sm text-gray-900">Package Details</h2>
              <span className="font-semibold text-xs text-gray-500">{task.packages.length} packages</span>
            </div>

            <p className="text-xs text-gray-500 mb-2">Total items in this order</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {task.tags.includes('fragile') && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  🏆 Fragile
                </span>
              )}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                🔒 OTP required
              </span>
            </div>

            <div className="space-y-1.5">
              {task.packages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <PackageIcon className="w-3.5 h-3.5 text-gray-400" />
                    <div>
                      <p className="font-bold text-gray-800">{pkg.label}</p>
                      <p className="text-[10px] text-gray-500">{pkg.category} • {pkg.itemCount} item</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-sm text-gray-900">Payment Details</h2>
              <span className="text-xs font-semibold text-emerald-700">Cash on Delivery</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-lg shrink-0">
                ₹
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                  Collect from customer
                </p>
                <p className="font-display font-black text-2xl text-gray-900 leading-tight">
                  ₹{task.codAmount}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 text-xs text-gray-600">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-tight">
                <strong>Collect exact amount:</strong> Return change if applicable. UPI option is available upon request.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Current Step Execution Panel ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#073922]" />
            <h2 className="font-display font-bold text-base text-gray-900">
              Current Step: {task.stepState.charAt(0).toUpperCase() + task.stepState.slice(1)}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {task.stepState === 'arrived'
              ? 'You have arrived at the customer location. Confirm and proceed with delivery.'
              : task.stepState === 'verify'
              ? 'Ask customer for the 6-digit OTP to verify delivery identity.'
              : task.stepState === 'handover'
              ? 'Hand over all packages to the customer and confirm completion.'
              : task.stepState === 'payment'
              ? `Collect ₹${task.codAmount} COD payment from customer.`
              : task.stepState === 'proof'
              ? 'Capture proof of delivery (photo, signature, GPS).'
              : 'Delivery steps in progress.'}
          </p>
        </div>

        {/* 4 Interactive Action Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tile 1: Mark arrived */}
          <div
            className={cn(
              'p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3',
              task.stepState === 'arrived'
                ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-600/20'
                : 'bg-gray-50 border-gray-200 opacity-60'
            )}
          >
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1">
                <MapPin className="w-4 h-4" />
                <span>Mark arrived</span>
              </div>
              <p className="text-[11px] text-gray-500">Confirm you have reached the customer location.</p>
            </div>
            <button
              onClick={() => advanceTaskStep(task.id)}
              disabled={task.stepState !== 'arrived'}
              className="w-full py-2 px-3 rounded-xl bg-[#073922] text-white text-xs font-bold hover:bg-[#052818] disabled:opacity-40 disabled:pointer-events-none transition"
            >
              Mark arrived
            </button>
          </div>

          {/* Tile 2: Enter OTP */}
          <div
            className={cn(
              'p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3',
              task.stepState === 'verify'
                ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-600/20'
                : task.otpVerified
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-gray-50 border-gray-200 opacity-60'
            )}
          >
            <div>
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs mb-1">
                <Lock className="w-4 h-4" />
                <span>Enter OTP</span>
              </div>
              <p className="text-[11px] text-gray-500">
                {task.otpVerified ? 'OTP verified successfully.' : 'Ask customer for 6-digit verification code.'}
              </p>
            </div>
            {task.otpVerified ? (
              <div className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            ) : (
              <button
                onClick={() => setIsOtpModalOpen(true)}
                disabled={task.stepState !== 'verify'}
                className="w-full py-2 px-3 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 text-xs font-bold disabled:opacity-40 disabled:pointer-events-none transition"
              >
                Enter OTP
              </button>
            )}
          </div>

          {/* Tile 3: Confirm package handover */}
          <div
            className={cn(
              'p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3',
              task.stepState === 'handover' || task.stepState === 'payment'
                ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-600/20'
                : 'bg-gray-50 border-gray-200 opacity-60'
            )}
          >
            <div>
              <div className="flex items-center gap-2 text-gray-800 font-bold text-xs mb-1">
                <PackageIcon className="w-4 h-4 text-emerald-700" />
                <span>Confirm package handover</span>
              </div>
              <p className="text-[11px] text-gray-500">Confirm all packages given to customer.</p>
            </div>
            <button
              onClick={() => {
                advanceTaskStep(task.id); // Moves to payment or proof
                if (task.stepState === 'payment') {
                  advanceTaskStep(task.id);
                  router.push(`/delivery-partner/proof-of-delivery/${task.id}`);
                }
              }}
              disabled={task.stepState !== 'handover' && task.stepState !== 'payment'}
              className="w-full py-2 px-3 rounded-xl bg-[#073922] text-white text-xs font-bold hover:bg-[#052818] disabled:opacity-40 disabled:pointer-events-none transition"
            >
              {task.stepState === 'payment' ? 'Confirm Payment & Proceed' : 'Confirm handover'}
            </button>
          </div>

          {/* Tile 4: Report Exception */}
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Report exception</span>
              </div>
              <p className="text-[11px] text-gray-500">Customer unavailable, address error, or damaged item?</p>
            </div>
            <Link
              href="/delivery-partner/exceptions"
              className="w-full py-2 px-3 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold text-center transition"
            >
              Report exception
            </Link>
          </div>
        </div>

        {/* Helper alert */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50/70 text-blue-900 text-xs border border-blue-200/60">
          <Info className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            Complete all required steps to mark this delivery as completed. Once handover and payment are verified, submit Proof of Delivery.
          </span>
          {task.stepState === 'proof' && (
            <Link
              href={`/delivery-partner/proof-of-delivery/${task.id}`}
              className="ml-auto font-bold text-blue-700 underline shrink-0"
            >
              Go to Proof of Delivery →
            </Link>
          )}
        </div>
      </div>

      {/* ── OTP Verification Modal ── */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-sm w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#073922]">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-base text-gray-900">Enter Delivery OTP</h3>
              </div>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 leading-snug">
              Ask customer <strong>{task.customerName}</strong> for the 6-digit delivery OTP sent via SMS.
            </p>

            <div className="flex justify-between gap-2">
              {otpInput.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-11 h-12 text-center text-lg font-bold font-display rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#073922] focus:border-[#073922]"
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-rose-600 font-semibold text-center">
                Invalid OTP. (Demo code is {task.otp})
              </p>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleVerifyOtpSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#073922] text-[#C6F04A] text-xs font-bold hover:bg-[#052818] transition shadow-xs"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

