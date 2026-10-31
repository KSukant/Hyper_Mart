'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Wallet,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  FileText,
  ChevronRight,
  ChevronLeft,
  MapPin,
  User,
  Shield,
  Scan,
  PenTool,
  Check,
  X,
  CreditCard,
} from 'lucide-react';
import { useDeliveryStore } from '@/store/deliveryStore';
import { cn } from '@/lib/cn';

export default function CodCollectionPage() {
  const { codSettlement, codActualCash, setCodActualCash, confirmCodHandover } = useDeliveryStore();

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const pageSize = 8;

  // Filter transactions
  const filtered = useMemo(() => {
    return codSettlement.transactions.filter((t) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return t.orderId.toLowerCase().includes(q) || t.customerName.toLowerCase().includes(q);
    });
  }, [codSettlement.transactions, search]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const variance = codActualCash - codSettlement.expectedCash;

  // Canvas for signature
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = '#073922';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleSaveSignature = () => {
    if (canvasRef.current) {
      setSignatureData(canvasRef.current.toDataURL('image/png'));
      setIsSignModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            COD COLLECTION
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-900 mt-0.5 tracking-tight">
            COD Collection and Handover
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            Track all cash on delivery collections and complete your handover at the end of the day.
          </p>
        </div>

        {/* Top Right Settlement Info */}
        <div className="flex items-center gap-3 p-3 px-4 rounded-2xl bg-white border border-gray-200 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700">
            <FileText className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-400">COD Settlement ID</span>
              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.2 rounded-full',
                  codSettlement.status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                )}
              >
                ● {codSettlement.status === 'open' ? 'Open (Handover pending)' : 'Closed'}
              </span>
            </div>
            <p className="font-display font-black text-sm text-gray-900">{codSettlement.id}</p>
            <p className="text-[10px] text-gray-400">{codSettlement.date} • Route {codSettlement.routeId}</p>
          </div>
        </div>
      </div>

      {/* ── 4 Summary KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* COD Expected */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">COD Expected</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">
              ₹{codSettlement.expectedCash.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-gray-500">From 14 orders</p>
          </div>
        </div>

        {/* COD Collected */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">COD Collected</p>
            <p className="font-display font-black text-2xl text-emerald-800 leading-tight">
              ₹{codSettlement.expectedCash.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">14 orders collected</p>
          </div>
        </div>

        {/* COD Pending */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">COD Pending</p>
            <p className="font-display font-black text-2xl text-gray-900 leading-tight">₹0</p>
            <p className="text-[11px] text-gray-500">0 orders</p>
          </div>
        </div>

        {/* Variance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-center gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
              variance === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
            )}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Variance</p>
            <p
              className={cn(
                'font-display font-black text-2xl leading-tight',
                variance === 0 ? 'text-gray-900' : 'text-rose-600'
              )}
            >
              ₹{Math.abs(variance)}
            </p>
            <p className="text-[11px] text-gray-500">
              {variance === 0 ? 'No difference' : variance > 0 ? '+ Higher collected' : '- Deficit'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout: Transactions & Cash Handover Panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr] gap-5">
        {/* Left Column: Collection Transactions (14) */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between overflow-hidden">
          <div>
            {/* Header & Search */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="font-display font-black text-base text-gray-900">
                Collection Transactions ({codSettlement.transactions.length})
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by order ID, customer name..."
                    className="pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl w-60 focus:outline-none focus:ring-1 focus:ring-[#073922]"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-[10.5px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3 text-right">Expected (₹)</th>
                    <th className="py-3 px-3 text-right">Collected (₹)</th>
                    <th className="py-3 px-3 text-center">Payment Type</th>
                    <th className="py-3 px-3 text-center">Receipt</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/60 transition group">
                      <td className="py-3 px-4 font-bold text-gray-900 font-display">
                        {tx.orderId}
                      </td>
                      <td className="py-3 px-3 text-gray-800 font-medium truncate max-w-[140px]">
                        {tx.customerName}
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-gray-600">
                        {tx.expected}
                      </td>
                      <td className="py-3 px-3 text-right font-black text-gray-900">
                        {tx.collected}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          💵 Cash
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setSelectedReceipt(tx.orderId)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-emerald-800 transition"
                        >
                          <FileText className="w-3 h-3 text-gray-400" />
                          <span>View</span>
                        </button>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                          <Check className="w-3 h-3 stroke-[3]" />
                          Collected
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right text-gray-300 group-hover:text-gray-500">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <p>
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of{' '}
              {filtered.length} transactions
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={cn(
                    'w-6 h-6 rounded-lg text-xs font-bold transition',
                    currentPage === p ? 'bg-[#073922] text-[#C6F04A]' : 'bg-white border text-gray-700'
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Cash Handover Panel */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <h2 className="font-display font-black text-base text-gray-900 mb-4">Cash Handover</h2>

            <div className="space-y-4 text-xs">
              {/* Handover Location */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Handover Location</p>
                  <p className="font-bold text-gray-900 text-xs mt-0.5">{codSettlement.handoverLocation}</p>
                  <p className="text-[10.5px] text-gray-500 leading-tight mt-0.5">{codSettlement.handoverAddress}</p>
                </div>
              </div>

              {/* Supervisor */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <User className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Supervisor</p>
                  <p className="font-bold text-gray-900 text-xs mt-0.5">{codSettlement.supervisorName}</p>
                  <p className="text-[10.5px] text-gray-500">{codSettlement.supervisorTitle}</p>
                </div>
              </div>

              {/* Deposit Bag Number */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Deposit Bag Number</p>
                    <p className="font-mono font-bold text-gray-900 text-xs mt-0.5">
                      {codSettlement.depositBagNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  title="Scan barcode"
                >
                  <Scan className="w-4 h-4" />
                </button>
              </div>

              {/* Cash Reconciliation Calculation */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Expected Cash (₹)</span>
                  <span className="font-bold text-gray-900 font-display text-sm">
                    {codSettlement.expectedCash.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-900 font-bold">Actual Cash (₹)</span>
                  <div className="w-32">
                    <input
                      type="number"
                      value={codActualCash}
                      onChange={(e) => setCodActualCash(Number(e.target.value))}
                      className="w-full text-right p-1.5 px-3 rounded-xl border border-gray-300 font-display font-black text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#073922]"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-100">
                  <span className="text-gray-500">Variance (₹)</span>
                  <span className={cn('font-bold', variance === 0 ? 'text-gray-900' : 'text-rose-600')}>
                    {variance}
                  </span>
                </div>
              </div>

              {/* Partner Signature */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-900">Partner Signature</span>
                  {signatureData && (
                    <button
                      onClick={() => setSignatureData(null)}
                      className="text-[10px] font-bold text-rose-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {signatureData ? (
                  <div className="h-20 rounded-xl border border-gray-200 bg-gray-50 p-1 flex items-center justify-center">
                    <img src={signatureData} alt="Signature" className="max-h-full object-contain" />
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSignModalOpen(true)}
                    className="w-full h-14 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#073922] bg-gray-50 hover:bg-gray-100 transition flex items-center justify-center gap-2 text-xs font-bold text-gray-600 cursor-pointer"
                  >
                    <PenTool className="w-4 h-4 text-gray-400" />
                    <span>Click to sign</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <button
              onClick={confirmCodHandover}
              disabled={codSettlement.status === 'closed'}
              className="w-full py-3.5 rounded-xl bg-[#073922] text-[#C6F04A] font-black text-sm hover:bg-[#052818] disabled:opacity-40 disabled:pointer-events-none transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{codSettlement.status === 'closed' ? 'Handover Completed' : 'Confirm handover'}</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              End-of-shift cash sign-off recorded into HyperMart Finance Ledger.
            </p>
          </div>
        </div>
      </div>

      {/* ── Signature Modal ── */}
      {isSignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-gray-900">Partner Cash Sign-off</h3>
              <button onClick={() => setIsSignModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500">Sign to certify that ₹{codActualCash} in cash is deposited.</p>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 h-40 overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={160}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 pointer-events-none">
                Sign in box
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                  }
                }}
                className="py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleSaveSignature}
                className="flex-1 py-2.5 rounded-xl bg-[#073922] text-[#C6F04A] text-xs font-bold hover:bg-[#052818] transition shadow-xs"
              >
                Apply Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Receipt View Modal ── */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-gray-900">Receipt • Order {selectedReceipt}</h3>
              <button onClick={() => setSelectedReceipt(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-mono text-xs space-y-2">
              <div className="text-center pb-2 border-b border-gray-200">
                <p className="font-black text-sm">HyperMart Retail Ltd</p>
                <p className="text-[10px] text-gray-500">Koramangala Hub, Bengaluru</p>
              </div>
              <div className="flex justify-between">
                <span>Order No:</span>
                <span className="font-bold">{selectedReceipt}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold">CASH</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span>10-03-2024 1:28 PM</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm">
                <span>Total Paid:</span>
                <span>₹480.00</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

