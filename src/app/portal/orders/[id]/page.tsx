'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Printer,
  Ban,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
  Package,
  Layers,
  Send,
  Lock,
} from 'lucide-react';
import { ADMIN_ORDERS, AdminOrder } from '@/mocks/adminData';
import { useAdminStore } from '@/store/adminStore';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useAdminStore();
  const orderId = (params.id as string) || 'ord-88219';

  // Find order or default to first
  const initialOrder =
    ADMIN_ORDERS.find((o) => o.id === orderId || o.orderNumber === orderId) ||
    ADMIN_ORDERS[0];

  const [order, setOrder] = useState<AdminOrder>(initialOrder);
  const [newNote, setNewNote] = useState('');
  const [isHeld, setIsHeld] = useState(order.health === 'Exception');

  // Add internal note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteItem = {
      id: `n-${Date.now()}`,
      author: 'Operations Desk',
      time: 'Just now',
      content: newNote.trim(),
    };

    setOrder((prev) => ({
      ...prev,
      notes: [noteItem, ...prev.notes],
    }));
    setNewNote('');
    addToast({
      title: 'Note Added',
      description: 'Internal operations note appended to order audit trail.',
      type: 'success',
    });
  };

  // Toggle order hold
  const handleToggleHold = () => {
    const nextState = !isHeld;
    setIsHeld(nextState);
    setOrder((prev) => ({
      ...prev,
      health: nextState ? 'Exception' : 'On track',
    }));
    addToast({
      title: nextState ? 'Order Placed on Operational Hold' : 'Order Released from Hold',
      description: nextState
        ? 'Fulfilment waves and dispatch blocked for this order.'
        : 'Order released back into dispatch pipeline.',
      type: nextState ? 'warning' : 'success',
    });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/orders"
            className="p-2 rounded-xl bg-white border border-[#E1E8E1] text-[#6B756F] hover:text-[#07563B] hover:bg-[#F7F7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#6B756F]">Order Inspection</span>
              <span className="text-xs text-[#E1E8E1]">•</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B] border border-[#C6F04A]">
                {order.stage}
              </span>
              {isHeld && (
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-[#E86B62] border border-rose-200 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> ON HOLD
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-[#202A25] tracking-tight mt-0.5 font-mono">
              {order.orderNumber}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handlePrintSlip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#6B756F]" />
            Print Packing Slip
          </button>
          <button
            onClick={handleToggleHold}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs ${
              isHeld
                ? 'bg-[#EAF5E9] border border-[#C6F04A] text-[#07563B]'
                : 'bg-white border border-[#E86B62]/30 text-[#E86B62] hover:bg-rose-50'
            }`}
          >
            <Ban className="w-3.5 h-3.5" />
            {isHeld ? 'Release from Hold' : 'Place on Hold'}
          </button>
          <Link
            href={`/portal/refund-processing?order=${order.orderNumber}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C6F04A]" />
            Start / Review Refund
          </Link>
        </div>
      </div>

      {/* Locked Price Notice Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#EAF5E9] border border-[#C6F04A] text-xs text-[#07563B]">
        <div className="flex items-center gap-2 font-medium">
          <Lock className="w-4 h-4 text-[#07563B]" />
          <span>
            <strong>Locked Price Guarantee:</strong> Order items and checkout totals are locked at transaction time and protected against subsequent catalogue price changes.
          </span>
        </div>
        <span className="font-mono font-bold text-sm">
          ₹{order.value.toLocaleString('en-IN')} Locked
        </span>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Customer, Items & Breakdown (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Delivery Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
            <h2 className="text-sm font-bold text-[#202A25] uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#07563B]" />
              Customer & Delivery Dispatch Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#6B756F] uppercase">Customer Name</span>
                  <div className="text-sm font-bold text-[#202A25] mt-0.5">{order.customerName}</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#202A25]">
                  <Phone className="w-3.5 h-3.5 text-[#07563B]" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#202A25]">
                  <Mail className="w-3.5 h-3.5 text-[#07563B]" />
                  <span>{order.customerEmail}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#6B756F] uppercase">Delivery Address</span>
                  <div className="flex items-start gap-2 text-xs text-[#202A25] mt-0.5">
                    <MapPin className="w-4 h-4 text-[#07563B] flex-shrink-0 mt-0.5" />
                    <span>{order.address}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E1E8E1]">
                  <span className="text-[11px] font-semibold text-[#6B756F] uppercase">Delivery Window</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#07563B] mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{order.deliverySlot}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Line Items Table */}
          <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#E1E8E1] flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#202A25] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#07563B]" />
                Line Items ({order.items.length})
              </h2>
              <span className="text-xs text-[#6B756F]">Fulfillment Hub: <strong>{order.warehouse}</strong></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                    <th className="py-2.5 px-4 font-semibold">Product Description</th>
                    <th className="py-2.5 px-4 font-semibold">Brand</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Unit Price</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Qty</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Total</th>
                    <th className="py-2.5 px-4 font-semibold text-center">Packed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E8E1]">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F7F0]/60">
                      <td className="py-3 px-4 font-semibold text-[#202A25]">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-[#6B756F]">{item.brand}</td>
                      <td className="py-3 px-4 text-right font-medium text-[#202A25]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#202A25]">{item.qty}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#07563B]">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <CheckCircle2 className="w-4 h-4 text-[#07563B] mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary & Locked Totals */}
            <div className="p-4 bg-[#F7F7F0] border-t border-[#E1E8E1] flex flex-col items-end gap-1.5 text-xs">
              <div className="flex justify-between w-64 text-[#6B756F]">
                <span>Items Subtotal:</span>
                <span className="font-medium text-[#202A25]">₹{order.value}</span>
              </div>
              <div className="flex justify-between w-64 text-[#6B756F]">
                <span>Delivery Charges:</span>
                <span className="text-[#07563B] font-semibold">FREE (Over ₹499)</span>
              </div>
              <div className="flex justify-between w-64 text-[#6B756F]">
                <span>Coupon Applied:</span>
                <span className="text-[#07563B] font-semibold">-₹0</span>
              </div>
              <div className="flex justify-between w-64 pt-2 border-t border-[#E1E8E1] text-sm font-bold text-[#202A25]">
                <span>Grand Total:</span>
                <span className="text-base text-[#07563B] font-mono font-black">
                  ₹{order.value.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6B756F] mt-1">
                <CreditCard className="w-3.5 h-3.5 text-[#07563B]" />
                <span>Paid via {order.paymentMethod} • UTR: {order.paymentUtr || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Internal Notes (1 Col) */}
        <div className="space-y-6">
          {/* Fulfilment Timeline Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#07563B]" />
              Fulfilment Milestone Timeline
            </h3>

            <div className="space-y-4">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative">
                  {idx !== order.timeline.length - 1 && (
                    <div className="absolute left-2.5 top-5 bottom-0 w-0.5 bg-[#E1E8E1]" />
                  )}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      step.completed ? 'bg-[#07563B] text-white' : 'bg-[#F7F7F0] border border-[#E1E8E1] text-[#6B756F]'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#202A25] block">{step.title}</span>
                    <span className="text-[11px] text-[#6B756F]">{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Operations Notes Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#07563B]" />
              Internal Operations Notes
            </h3>

            {/* Note form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal note (e.g. customer delivery request, gate instruction)..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:bg-white focus:outline-none focus:border-[#07563B]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#07563B] text-white text-xs font-bold hover:bg-[#06452F] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Add Internal Note
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-2.5 pt-2 border-t border-[#E1E8E1]">
              {order.notes.length === 0 ? (
                <p className="text-xs text-[#6B756F] italic">No internal notes logged yet.</p>
              ) : (
                order.notes.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs">
                    <div className="flex items-center justify-between text-[11px] text-[#6B756F] mb-1">
                      <strong className="text-[#202A25]">{n.author}</strong>
                      <span>{n.time}</span>
                    </div>
                    <p className="text-[#202A25]">{n.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Return & Refund History Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
            <h3 className="text-sm font-bold text-[#202A25] uppercase tracking-wider mb-2 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#07563B]" />
              Return & Refund Activity
            </h3>
            <p className="text-xs text-[#6B756F]">
              No return requests logged for order {order.orderNumber}. Return window open for 7 days post-delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
