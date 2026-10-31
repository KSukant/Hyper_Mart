'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  MapPin,
  Package,
  Truck,
  CreditCard,
  Phone,
  MessageSquare,
  Clock,
  Camera,
  Calendar,
  Headphones,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  X,
  Upload,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { RESCHEDULE_SLOTS } from '@/mocks/deliveryData';
import type { ExceptionCategory, ExceptionResolution } from '@/types/delivery';
import { cn } from '@/lib/cn';

const CATEGORIES: { id: ExceptionCategory; label: string; sub: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'customer', label: 'Customer', sub: 'Customer related issues', icon: User },
  { id: 'address', label: 'Address', sub: 'Address not found or inaccessible', icon: MapPin },
  { id: 'package', label: 'Package', sub: 'Damaged, missing or incorrect item', icon: Package },
  { id: 'route', label: 'Route', sub: 'Traffic, weather or other delays', icon: Truck },
  { id: 'payment', label: 'Payment', sub: 'COD or payment related issues', icon: CreditCard },
];

export default function ExceptionsPage() {
  const { exception, setExceptionCategory, setExceptionDescription, addExceptionPhoto, resolveException, tasks } = useDeliveryStore();

  const [selectedSlot, setSelectedSlot] = useState(RESCHEDULE_SLOTS[0].id);
  const [photoPreview, setPhotoPreview] = useState<string | null>('/landing/card-delivery.jpg');
  const [statusState, setStatusState] = useState<'reported' | 'pending' | 'resolved'>('reported');

  const activeTask = tasks.find((t) => t.id === exception.taskId) || tasks[0];

  const handleAction = (res: ExceptionResolution) => {
    resolveException(res, selectedSlot);
    setStatusState('resolved');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Breadcrumb & Title ── */}
      <div>
        <p className="text-xs font-semibold text-gray-400">
          Exceptions › <span className="text-gray-700">Handle exception</span>
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mt-1 tracking-tight">
          Exceptions and Rescheduling
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          Report issues, manage exceptions and keep deliveries on track.
        </p>
      </div>

      {/* ── 5 Category Selector Pills ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = exception.category === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setExceptionCategory(cat.id)}
              className={cn(
                'p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2',
                isSelected
                  ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-600/20 shadow-xs'
                  : 'bg-white border-gray-200 hover:bg-gray-50/80'
              )}
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center',
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className={cn('text-xs font-bold leading-tight', isSelected ? 'text-emerald-950' : 'text-gray-900')}>
                  {cat.label}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{cat.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Main Two-Column Work Area ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr] gap-5">
        {/* Left Column: Form, Timeline, Evidence & Suggested Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
          {/* Form Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
            <div>
              <h2 className="font-display font-black text-lg text-gray-900">
                {exception.category === 'customer'
                  ? 'Customer unavailable'
                  : exception.category === 'address'
                  ? 'Address issue'
                  : exception.category === 'package'
                  ? 'Package damaged or missing'
                  : exception.category === 'route'
                  ? 'Traffic or weather delay'
                  : 'Payment dispute'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Customer is not available to receive the delivery at the selected address.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-gray-900 bg-gray-100 px-3 py-1 rounded-xl">
                Order {activeTask.orderId}
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Standard
              </span>
            </div>
          </div>

          {/* Description & Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Description & Contact Timeline */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-900">Description *</label>
                  <span className="text-[10px] text-gray-400">86/500</span>
                </div>
                <textarea
                  rows={4}
                  value={exception.description}
                  onChange={(e) => setExceptionDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#073922]/20 focus:border-[#073922] transition"
                  placeholder="Detail the exact reason for this exception..."
                />
              </div>

              {/* Contact Attempt Timeline */}
              <div>
                <p className="text-xs font-bold text-gray-900 mb-2">Contact attempt timeline</p>
                <div className="space-y-2 border-l-2 border-emerald-600/30 pl-3 ml-1 text-xs">
                  {exception.contactAttempts.map((attempt, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        {attempt.method === 'call' ? (
                          <Phone className="w-3 h-3 text-emerald-700" />
                        ) : (
                          <MessageSquare className="w-3 h-3 text-blue-700" />
                        )}
                        <span className="font-bold text-gray-800">{attempt.time}</span>
                        <span className="text-gray-500">
                          {attempt.method === 'call' ? 'Call attempted' : 'SMS sent'}
                        </span>
                      </div>
                      <span className="text-gray-400">{attempt.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Location Evidence & Photos */}
            <div className="space-y-4">
              {/* Location & Time Box */}
              <div>
                <p className="text-xs font-bold text-gray-900 mb-1.5">Location and time evidence</p>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-gray-700 font-medium leading-tight">
                        {exception.gpsAddress}
                      </span>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-bold text-emerald-800 hover:underline shrink-0"
                    >
                      View on map
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-1 border-t border-gray-200/50">
                    <Clock className="w-3 h-3" />
                    <span>{exception.evidenceTime}</span>
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div>
                <p className="text-xs font-bold text-gray-900 mb-1">Photos (optional)</p>
                <p className="text-[10px] text-gray-500 mb-2">
                  Add photos to support this exception (door, notice, surroundings, etc.)
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {photoPreview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 h-24 bg-gray-100 flex items-center justify-center">
                      <img src={photoPreview} alt="Evidence" className="w-full h-full object-cover" />
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
                      className="h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#073922] transition flex flex-col items-center justify-center text-center p-2"
                    >
                      <Camera className="w-4 h-4 text-gray-400 mb-1" />
                      <span className="text-[10px] font-bold text-gray-600">Add photo</span>
                      <span className="text-[8.5px] text-gray-400">JPG, PNG up to 5MB</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setPhotoPreview('/landing/card-delivery.jpg')}
                    className="h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#073922] transition flex flex-col items-center justify-center text-center p-2"
                  >
                    <Upload className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-[10px] font-bold text-gray-600">Second photo</span>
                    <span className="text-[8.5px] text-gray-400">Surroundings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Actions (3 Primary Buttons) */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <p className="text-xs font-bold text-gray-900">Suggested actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Action 1: Request reschedule */}
              <button
                onClick={() => handleAction('reschedule')}
                className="p-3.5 rounded-xl bg-[#073922] text-white hover:bg-[#052818] transition flex items-center gap-3 text-left shadow-xs cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#C6F04A] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs leading-tight">Request reschedule</p>
                  <p className="text-[10px] text-emerald-200 mt-0.5">Try delivering at a later time</p>
                </div>
              </button>

              {/* Action 2: Contact support */}
              <button
                onClick={() => handleAction('contact_support')}
                className="p-3.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 transition flex items-center gap-3 text-left shadow-xs cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs leading-tight">Contact support</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Get help from the team</p>
                </div>
              </button>

              {/* Action 3: Return package */}
              <button
                onClick={() => handleAction('return')}
                className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 hover:bg-rose-100 text-rose-900 transition flex items-center gap-3 text-left shadow-xs cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs leading-tight">Return package</p>
                  <p className="text-[10px] text-rose-700 mt-0.5">Bring back to hub</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Reschedule Slots & Status Timeline */}
        <div className="space-y-5">
          {/* Available Slots for Reschedule */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
            <div>
              <h3 className="font-display font-bold text-sm text-gray-900">Available slots for reschedule</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Show these slots to the customer or choose one</p>
            </div>

            <div className="space-y-2">
              {RESCHEDULE_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <label
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition',
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 font-bold text-emerald-950 ring-1 ring-emerald-500'
                        : 'bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="reschedule-slot"
                        checked={isSelected}
                        onChange={() => setSelectedSlot(slot.id)}
                        className="text-[#073922] focus:ring-[#073922]"
                      />
                      <div>
                        <p className="leading-tight">{slot.label}</p>
                        <p className="text-[10px] text-gray-500 font-normal">{slot.timeRange}</p>
                      </div>
                    </div>
                    {slot.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {slot.tag}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Exception Status Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
            <h3 className="font-display font-bold text-sm text-gray-900">Exception status</h3>

            <div className="space-y-4 pl-1 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Exception reported</p>
                  <p className="text-[10px] text-gray-400">Mar 10, 2024 • 10:20 AM</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Customer unavailable</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    statusState === 'resolved'
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-emerald-600 text-emerald-600 bg-white ring-2 ring-emerald-600/20'
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pending action</p>
                  <p className="text-[11px] text-gray-500">
                    {statusState === 'resolved' ? 'Resolution submitted' : 'Choose a resolution option'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-700">Awaiting confirmation</p>
                  <p className="text-[11px] text-gray-400">From customer or support team</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-700">Resolved</p>
                  <p className="text-[11px] text-gray-400">Exception will be marked as resolved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

