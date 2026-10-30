'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Package,
  Truck,
  Eye,
  Camera,
  XCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

interface ReturnCase {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  productName: string;
  brand: string;
  value: number;
  reason: 'Damaged in transit' | 'Wrong item delivered' | 'Quality issue' | 'Customer rejected';
  status: 'Pickup scheduled' | 'In transit to DC' | 'Inspected at DC' | 'Resolved / Restocked';
  owner: string;
  slaAge: string;
  evidenceProvided: boolean;
  notes: string;
}

const INITIAL_RETURNS: ReturnCase[] = [
  {
    id: 'RET-1092',
    orderNumber: 'HM784321',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    customerCity: 'Bengaluru',
    productName: 'Tide Matic Detergent Powder (2 kg)',
    brand: 'Tide',
    value: 349,
    reason: 'Damaged in transit',
    status: 'In transit to DC',
    owner: 'Priya S.',
    slaAge: '4h elapsed',
    evidenceProvided: true,
    notes: 'Pouch punctured during linehaul staging at Gate 4. Customer submitted doorstep photo.',
  },
  {
    id: 'RET-1093',
    orderNumber: 'HM784122',
    customerName: 'Rahul Mehta',
    customerPhone: '+91 98765 11223',
    customerCity: 'Mumbai',
    productName: 'Sony WF-C500 Earbuds (Black)',
    brand: 'Sony',
    value: 4990,
    reason: 'Wrong item delivered',
    status: 'Pickup scheduled',
    owner: 'Arjun M.',
    slaAge: '12h elapsed',
    evidenceProvided: true,
    notes: 'Received White variant instead of Black. Replacement wave queued.',
  },
  {
    id: 'RET-1094',
    orderNumber: 'HM783991',
    customerName: 'Ananya Iyer',
    customerPhone: '+91 98765 44556',
    customerCity: 'Chennai',
    productName: 'Lakmé 9to5 Vitamin C Serum (30 ml)',
    brand: 'Lakmé',
    value: 599,
    reason: 'Quality issue',
    status: 'Inspected at DC',
    owner: 'Dev K.',
    slaAge: '18h elapsed',
    evidenceProvided: true,
    notes: 'Tamper-evident seal arrived unglued. Approved for instant customer refund.',
  },
  {
    id: 'RET-1095',
    orderNumber: 'HM783776',
    customerName: 'Vikram Singh',
    customerPhone: '+91 98765 99887',
    customerCity: 'Delhi',
    productName: 'Aashirvaad Whole Wheat Atta (5 kg)',
    brand: 'Aashirvaad',
    value: 279,
    reason: 'Customer rejected',
    status: 'Resolved / Restocked',
    owner: 'Priya S.',
    slaAge: '28h elapsed',
    evidenceProvided: false,
    notes: 'Customer was unavailable during evening slot. Bag returned intact and restocked.',
  },
];

export default function ReturnsAndExceptionsPage() {
  const { addToast } = useAdminStore();
  const [returnCases, setReturnCases] = useState<ReturnCase[]>(INITIAL_RETURNS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCase, setActiveCase] = useState<ReturnCase | null>(null);

  const filteredCases = returnCases.filter((c) => {
    if (selectedCategory !== 'all' && c.reason.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.orderNumber.toLowerCase().includes(q) ||
        c.customerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleResolveCase = (caseId: string, actionName: string) => {
    setReturnCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: 'Resolved / Restocked' } : c))
    );
    addToast({
      title: 'Return Case Updated',
      description: `Action "${actionName}" applied for ${caseId}. Warehouse and refund records synced.`,
      type: 'success',
    });
    setActiveCase(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Reverse Logistics</span>
            <span>•</span>
            <span>Doorstep Quality & Claims</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Returns & Delivery Exceptions
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Triage doorstep rejections, damaged goods verification, warehouse grading and reverse restocking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/portal/refund-processing"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C6F04A]" />
            Refund Approvals Queue
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Active Returns / RTO
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">{returnCases.length} Cases</div>
          <div className="text-[11px] text-[#6B756F] mt-1">₹6,217 claim value</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Doorstep Rejection Rate
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">1.4%</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">Well within 2.5% SLA</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Goods in Reverse Transit
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">2 Shipments</div>
          <div className="text-[11px] text-[#6B756F] mt-1">Routing to Coimbatore DC</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Average Grading SLA
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">14.6 hrs</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">Target: &lt;24 hrs</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E1E8E1]">
        {[
          { id: 'all', label: 'All Exceptions' },
          { id: 'damaged in transit', label: 'Damaged in Transit' },
          { id: 'wrong item delivered', label: 'Wrong Item' },
          { id: 'quality issue', label: 'Quality / Tamper' },
          { id: 'customer rejected', label: 'Customer Rejected' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'bg-[#07563B] text-white shadow-xs'
                : 'text-[#6B756F] hover:bg-white hover:text-[#202A25]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B756F]" />
          <input
            type="text"
            placeholder="Search return ID, order ID, or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:bg-white focus:outline-none focus:border-[#07563B]"
          />
        </div>
        <span className="text-xs text-[#6B756F]">{filteredCases.length} cases displayed</span>
      </div>

      {/* Master Returns Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-3 px-4 font-semibold">Case ID</th>
                <th className="py-3 px-4 font-semibold">Order / Customer</th>
                <th className="py-3 px-4 font-semibold">Product Claimed</th>
                <th className="py-3 px-4 font-semibold">Value</th>
                <th className="py-3 px-4 font-semibold">Reason Category</th>
                <th className="py-3 px-4 font-semibold">Reverse Status</th>
                <th className="py-3 px-4 font-semibold">Owner</th>
                <th className="py-3 px-4 font-semibold">SLA Age</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              {filteredCases.map((rc) => (
                <tr key={rc.id} className="hover:bg-[#EAF5E9]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#07563B] font-mono">
                    {rc.id}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#202A25]">{rc.customerName}</div>
                    <div className="text-[11px] text-[#6B756F] font-mono">{rc.orderNumber} • {rc.customerCity}</div>
                  </td>

                  <td className="py-3.5 px-4 text-[#202A25]">
                    <div className="font-medium">{rc.productName}</div>
                    <div className="text-[10px] text-[#6B756F]">{rc.brand}</div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#202A25]">
                    ₹{rc.value.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F7F7F0] border border-[#E1E8E1] text-[#202A25]">
                      {rc.reason}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        rc.status === 'Resolved / Restocked'
                          ? 'bg-[#EAF5E9] text-[#07563B]'
                          : rc.status === 'Inspected at DC'
                          ? 'bg-blue-50 text-blue-700'
                          : rc.status === 'In transit to DC'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-[#6B756F]'
                      }`}
                    >
                      {rc.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[#6B756F]">{rc.owner}</td>

                  <td className="py-3.5 px-4 font-mono text-[#6B756F]">{rc.slaAge}</td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveCase(rc)}
                      className="px-3 py-1.5 rounded-lg bg-[#EAF5E9] hover:bg-[#C6F04A] text-[#07563B] hover:text-[#06452F] font-bold text-xs transition-colors"
                    >
                      Inspect Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Case Resolution Drawer */}
      {activeCase && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setActiveCase(null)}
          />
          <div className="relative w-full max-w-lg bg-white border-l border-[#E1E8E1] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-6 border-b border-[#E1E8E1] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#07563B]">
                  Case Resolution Drawer
                </span>
                <h2 className="text-xl font-bold text-[#202A25] mt-0.5 font-mono">{activeCase.id}</h2>
                <p className="text-xs text-[#6B756F]">Linked to Order #{activeCase.orderNumber}</p>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="p-2 rounded-xl text-[#6B756F] hover:bg-[#F7F7F0] transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Customer & Product Card */}
              <div className="p-4 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Customer:</span>
                  <strong className="text-[#202A25]">{activeCase.customerName} ({activeCase.customerPhone})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Location:</span>
                  <span className="text-[#202A25]">{activeCase.customerCity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B756F]">Product:</span>
                  <strong className="text-[#202A25]">{activeCase.productName}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E1E8E1]">
                  <span className="text-[#6B756F]">Claim Value:</span>
                  <strong className="text-sm font-bold text-[#07563B]">
                    ₹{activeCase.value.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              {/* Photo Evidence Box */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#202A25] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#07563B]" />
                  Doorstep Inspection & Evidence
                </h4>
                <div className="p-4 rounded-xl border border-dashed border-[#E1E8E1] bg-[#F7F7F0] text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E1E8E1] flex items-center justify-center mx-auto text-[#07563B]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-[#202A25]">
                    Driver captured photo verified by automated OCR scan.
                  </p>
                  <p className="text-[11px] text-[#6B756F]">
                    {activeCase.notes}
                  </p>
                </div>
              </div>

              {/* Warehouse Quality Grading */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#202A25] uppercase tracking-wider text-[11px]">
                  Warehouse Quality Grading
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-lg border border-[#07563B] bg-[#EAF5E9] text-center">
                    <span className="font-bold text-[#07563B] block">Grade A</span>
                    <span className="text-[10px] text-[#6B756F]">Resaleable</span>
                  </div>
                  <div className="p-3 rounded-lg border border-[#E1E8E1] bg-white text-center">
                    <span className="font-bold text-[#202A25] block">Grade B</span>
                    <span className="text-[10px] text-[#6B756F]">Liquidation</span>
                  </div>
                  <div className="p-3 rounded-lg border border-[#E1E8E1] bg-white text-center">
                    <span className="font-bold text-[#E86B62] block">Scrap</span>
                    <span className="text-[10px] text-[#6B756F]">Write-off</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Resolution Actions */}
            <div className="p-6 border-t border-[#E1E8E1] bg-[#F7F7F0] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleResolveCase(activeCase.id, 'Approve Instant Refund')}
                  className="py-2.5 px-3 rounded-xl bg-[#07563B] text-white font-bold text-xs hover:bg-[#06452F] transition-colors"
                >
                  Approve Refund
                </button>
                <button
                  onClick={() => handleResolveCase(activeCase.id, 'Queue Item Replacement')}
                  className="py-2.5 px-3 rounded-xl bg-white border border-[#07563B] text-[#07563B] font-bold text-xs hover:bg-[#EAF5E9] transition-colors"
                >
                  Replace Item
                </button>
              </div>
              <button
                onClick={() => handleResolveCase(activeCase.id, 'Resolve & Restock')}
                className="w-full py-2 rounded-xl border border-[#E1E8E1] bg-white text-[#6B756F] hover:text-[#202A25] text-xs font-semibold"
              >
                Mark Resolved & Restocked
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
