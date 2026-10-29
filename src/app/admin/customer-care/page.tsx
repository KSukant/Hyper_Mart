'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Search,
  Filter,
  Send,
  User,
  Phone,
  Mail,
  ShieldCheck,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Truck,
  Paperclip,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

interface Ticket {
  id: string;
  customerName: string;
  customerId: string;
  customerPhone: string;
  subject: string;
  orderNumber: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Open' | 'Pending' | 'Resolved';
  slaCountdown: string;
  channel: 'In-App Chat' | 'WhatsApp' | 'Phone';
  lastMessageTime: string;
  messages: {
    id: string;
    sender: 'customer' | 'agent' | 'system' | 'internal_note';
    senderName: string;
    text: string;
    time: string;
  }[];
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TK-8421',
    customerName: 'Priya Sharma',
    customerId: 'CUS-104832',
    customerPhone: '+91 98765 43210',
    subject: 'Milk pouch leaking in morning delivery basket',
    orderNumber: 'HM784321',
    priority: 'Urgent',
    status: 'Open',
    slaCountdown: '12m left',
    channel: 'In-App Chat',
    lastMessageTime: '10:42 AM',
    messages: [
      {
        id: 'm-1',
        sender: 'customer',
        senderName: 'Priya Sharma',
        text: 'Hi, I received my morning basket 10 mins ago. One of the Amul milk packets seems punctured and leaked onto the atta bag.',
        time: '10:35 AM',
      },
      {
        id: 'm-2',
        sender: 'agent',
        senderName: 'HyperMart Care (Anita)',
        text: 'Hello Priya, we are very sorry to hear this! Let me immediately check your order items and arrange a swift replacement or refund for the affected packets.',
        time: '10:38 AM',
      },
      {
        id: 'm-3',
        sender: 'internal_note',
        senderName: 'System Bot',
        text: 'INTERNAL NOTE: Order HM784321 was dispatched from Coimbatore DC Zone B. Driver Ramesh Kumar logged a mild handling bump.',
        time: '10:39 AM',
      },
      {
        id: 'm-4',
        sender: 'customer',
        senderName: 'Priya Sharma',
        text: 'Thank you Anita. I took a photo of the packet if you need it.',
        time: '10:42 AM',
      },
    ],
  },
  {
    id: 'TK-8422',
    customerName: 'Rahul Mehta',
    customerId: 'CUS-104833',
    customerPhone: '+91 98765 11223',
    subject: 'Wrong color received for Sony Earbuds',
    orderNumber: 'HM784122',
    priority: 'High',
    status: 'Pending',
    slaCountdown: '34m left',
    channel: 'WhatsApp',
    lastMessageTime: '10:15 AM',
    messages: [
      {
        id: 'm-21',
        sender: 'customer',
        senderName: 'Rahul Mehta',
        text: 'I ordered Black Sony WF-C500 but got White variant in the courier box.',
        time: '10:15 AM',
      },
    ],
  },
  {
    id: 'TK-8423',
    customerName: 'Arjun Nair',
    customerId: 'CUS-104834',
    customerPhone: '+91 98765 66778',
    subject: 'Delivery slot rescheduling request for evening',
    orderNumber: 'HM783501',
    priority: 'Normal',
    status: 'Open',
    slaCountdown: '1h 10m',
    channel: 'In-App Chat',
    lastMessageTime: '09:50 AM',
    messages: [
      {
        id: 'm-31',
        sender: 'customer',
        senderName: 'Arjun Nair',
        text: 'Can you please shift my delivery from 4pm to 7pm today? I will not be home earlier.',
        time: '09:50 AM',
      },
    ],
  },
];

export default function CustomerCareDeskPage() {
  const { addToast } = useAdminStore();
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState<string>(INITIAL_TICKETS[0].id);
  const [replyText, setReplyText] = useState('');
  const [isInternalNoteMode, setIsInternalNoteMode] = useState(false);
  const [selectedStatusTab, setSelectedStatusTab] = useState<'All' | 'Open' | 'Pending' | 'Resolved'>('Open');

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: isInternalNoteMode ? ('internal_note' as const) : ('agent' as const),
      senderName: isInternalNoteMode ? 'Internal Ops Note' : 'Agent (Support Desk)',
      text: replyText.trim(),
      time: 'Just now',
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === activeTicket.id
          ? { ...t, messages: [...t.messages, newMsg], lastMessageTime: 'Just now' }
          : t
      )
    );
    setReplyText('');
    addToast({
      title: isInternalNoteMode ? 'Internal Note Saved' : 'Reply Sent to Customer',
      description: isInternalNoteMode
        ? 'Note is saved privately on the customer ticket.'
        : `Message dispatched via ${activeTicket.channel}.`,
      type: 'success',
    });
  };

  const handleApplyMacro = (macroText: string) => {
    setReplyText(macroText);
  };

  const handleResolveTicket = () => {
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? { ...t, status: 'Resolved' } : t))
    );
    addToast({
      title: 'Ticket Marked Resolved',
      description: `Ticket ${activeTicket.id} closed and resolution survey dispatched.`,
      type: 'success',
    });
  };

  const filteredTickets = tickets.filter((t) => {
    if (selectedStatusTab === 'All') return true;
    return t.status === selectedStatusTab;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Customer Delight & Resolution</span>
            <span>•</span>
            <span>Omnichannel Care Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Customer Care Operations Desk
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Resolve delivery queries, product quality issues, slot changes and initiate authorized instant compensations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/refunds"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#07563B]" />
            Refund Queue
          </Link>
          <button
            onClick={handleResolveTicket}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F04A]" />
            Mark Ticket Resolved
          </button>
        </div>
      </div>

      {/* 3-Column Support Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[680px]">
        {/* Left Column: Ticket Queue (3 cols) */}
        <div className="lg:col-span-3 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="p-3 border-b border-[#E1E8E1] flex items-center justify-between gap-1 bg-[#F7F7F0]">
            {(['Open', 'Pending', 'Resolved', 'All'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStatusTab === tab
                    ? 'bg-white text-[#07563B] shadow-xs'
                    : 'text-[#6B756F] hover:text-[#202A25]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Ticket List */}
          <div className="divide-y divide-[#E1E8E1] overflow-y-auto flex-1 text-xs">
            {filteredTickets.map((t) => {
              const isSelected = t.id === activeTicket.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTicketId(t.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#EAF5E9]' : 'hover:bg-[#F7F7F0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#07563B] font-mono">{t.id}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-800'
                          : t.priority === 'High'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>

                  <div className="font-bold text-[#202A25]">{t.customerName}</div>
                  <p className="text-[#6B756F] line-clamp-1 mt-0.5">{t.subject}</p>

                  <div className="flex items-center justify-between text-[11px] text-[#6B756F] mt-2 pt-2 border-t border-[#E1E8E1]/60">
                    <span className="font-mono text-[#07563B]">{t.orderNumber}</span>
                    <span className="flex items-center gap-1 font-semibold text-rose-600">
                      <Clock className="w-3 h-3" /> {t.slaCountdown}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Live Conversation Stream (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs flex flex-col overflow-hidden">
          {/* Conversation Header */}
          <div className="p-4 border-b border-[#E1E8E1] flex items-center justify-between bg-[#F7F7F0]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EAF5E9] border border-[#C6F04A] flex items-center justify-center font-bold text-xs text-[#07563B]">
                {activeTicket.customerName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#202A25]">{activeTicket.customerName}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#E1E8E1] text-[#6B756F]">
                    {activeTicket.channel}
                  </span>
                </div>
                <p className="text-xs text-[#6B756F] line-clamp-1">{activeTicket.subject}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#07563B]">
              Order: {activeTicket.orderNumber}
            </span>
          </div>

          {/* Messages Stream */}
          <div className="p-4 space-y-3.5 overflow-y-auto flex-1 bg-gradient-to-b from-white to-[#F7F7F0]/40 text-xs">
            {activeTicket.messages.map((m) => {
              if (m.sender === 'internal_note') {
                return (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-800">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{m.senderName} (Private to HyperMart team)</span>
                      <span className="text-amber-600 font-normal ml-auto">{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                );
              }

              const isCustomer = m.sender === 'customer';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                >
                  <div className="text-[10px] text-[#6B756F] mb-1 px-1">
                    {m.senderName} • {m.time}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      isCustomer
                        ? 'bg-[#F7F7F0] border border-[#E1E8E1] text-[#202A25] rounded-tl-xs'
                        : 'bg-[#07563B] text-white rounded-tr-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Macros & Reply Composer */}
          <div className="p-3.5 border-t border-[#E1E8E1] bg-[#F7F7F0] space-y-2">
            {/* Quick Macro Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              <span className="text-[#6B756F] font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#07563B]" /> Macros:
              </span>
              <button
                type="button"
                onClick={() =>
                  handleApplyMacro(
                    'We sincerely apologize for the inconvenience! We have processed a 100% replacement basket for your morning delivery.'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E1E8E1] text-[#202A25] hover:bg-[#EAF5E9] hover:text-[#07563B] whitespace-nowrap"
              >
                Replacement Sent
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyMacro(
                    'A direct refund credit of ₹349 has been credited back to your original UPI payment method.'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E1E8E1] text-[#202A25] hover:bg-[#EAF5E9] hover:text-[#07563B] whitespace-nowrap"
              >
                Instant Refund
              </button>
            </div>

            {/* Note Mode Toggle & Input */}
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setIsInternalNoteMode(!isInternalNoteMode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                    isInternalNoteMode
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-white border border-[#E1E8E1] text-[#6B756F] hover:text-[#202A25]'
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  {isInternalNoteMode ? 'Internal Note Mode (Private)' : 'Customer Reply Mode'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    isInternalNoteMode
                      ? 'Write a private note to warehouse or support colleagues...'
                      : `Reply directly to ${activeTicket.customerName} on ${activeTicket.channel}...`
                  }
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:outline-none focus:border-[#07563B]"
                />
                <button
                  type="submit"
                  className={`p-2.5 rounded-xl text-white font-bold transition-colors ${
                    isInternalNoteMode
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-[#07563B] hover:bg-[#06452F]'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Customer 360 & Order Context (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Customer Snapshot */}
          <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#202A25] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#07563B]" />
                Customer 360
              </h4>
              <Link
                href={`/admin/customers/${activeTicket.customerId}`}
                className="text-[#07563B] hover:underline font-semibold flex items-center gap-0.5 text-[11px]"
              >
                Full Profile <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-sm text-[#202A25]">{activeTicket.customerName}</div>
              <div className="text-[#6B756F] font-mono text-[11px]">{activeTicket.customerId}</div>
              <div className="text-[#6B756F]">{activeTicket.customerPhone}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E1E8E1]">
              <div className="p-2 rounded-lg bg-[#F7F7F0]">
                <span className="text-[10px] text-[#6B756F] block">Lifetime Value</span>
                <span className="font-bold text-xs text-[#07563B]">₹28,490</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F7F7F0]">
                <span className="text-[10px] text-[#6B756F] block">Completed Orders</span>
                <span className="font-bold text-xs text-[#202A25]">24 Orders</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#EAF5E9] border border-[#C6F04A] text-[#07563B] text-[11px] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Low-Risk Customer • 0 Fraud Flags</span>
            </div>
          </div>

          {/* Active Order Summary */}
          <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#202A25] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#07563B]" />
                Active Order Context
              </h4>
              <Link
                href="/admin/orders/ord-1003287"
                className="text-[#07563B] hover:underline font-mono font-bold text-[11px]"
              >
                {activeTicket.orderNumber}
              </Link>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[#6B756F]">
                <span>Items:</span>
                <span className="font-semibold text-[#202A25]">Tide Matic 2kg, Amul Milk</span>
              </div>
              <div className="flex justify-between text-[#6B756F]">
                <span>Order Total:</span>
                <span className="font-bold text-[#07563B]">₹349 (Paid via UPI)</span>
              </div>
              <div className="flex justify-between text-[#6B756F]">
                <span>Delivery Hub:</span>
                <span className="text-[#202A25]">Coimbatore DC</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E1E8E1]">
              <Link
                href={`/admin/refunds?order=${activeTicket.orderNumber}`}
                className="w-full py-2 rounded-xl bg-[#07563B] text-white text-xs font-bold hover:bg-[#06452F] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C6F04A]" />
                Authorize Refund For Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
