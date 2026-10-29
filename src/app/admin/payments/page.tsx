'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  TrendingUp,
  RotateCcw,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { PAYMENT_RECORDS, PaymentRecord } from '@/mocks/adminData';
import { useAdminStore } from '@/store/adminStore';

export default function PaymentsAndReconciliationPage() {
  const { addToast } = useAdminStore();
  const [records, setRecords] = useState<PaymentRecord[]>(PAYMENT_RECORDS);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectRecord, setInspectRecord] = useState<PaymentRecord | null>(null);

  const filteredRecords = records.filter((r) => {
    if (selectedStatus !== 'all' && r.reconciliationStatus.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.orderNumber.toLowerCase().includes(q) ||
        r.paymentUtr.toLowerCase().includes(q) ||
        r.remarks.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleManualReconcile = (recordId: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? { ...r, reconciliationStatus: 'Matched', remarks: 'Manually verified against bank statement' }
          : r
      )
    );
    addToast({
      title: 'UTR Reconciled',
      description: `Payment ${recordId} matched with bank statement. Ledger balance updated.`,
      type: 'success',
    });
    setInspectRecord(null);
  };

  const handleExportCSV = () => {
    const headers = ['DateTime,OrderNumber,PaymentUTR,Method,Amount(INR),Status,Reconciliation,Remarks'];
    const rows = filteredRecords.map((r) =>
      `"${r.dateTime}","${r.orderNumber}","${r.paymentUtr}","${r.method}",${r.amount},"${r.status}","${r.reconciliationStatus}","${r.remarks}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hypermart-reconciliation-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'Report Downloaded',
      description: 'Reconciliation spreadsheet exported to CSV.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
            <span>Financial Operations</span>
            <span>•</span>
            <span>Automated Bank Ledger Matching</span>
          </div>
          <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
            Payments & UTR Reconciliation
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Audit payment gateway settlements, driver cash collections, refund disbursements and resolve banking discrepancies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs font-semibold text-[#202A25] hover:bg-[#F7F7F0] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#6B756F]" />
            Export Finance CSV
          </button>
          <Link
            href="/admin/reports"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#C6F04A]" />
            Reports & BI Dashboard
          </Link>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Gross Settlement (Today)
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">₹33.19 Lakh</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">99.2% reconciled</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            UPI Settlements
          </span>
          <div className="text-2xl font-black text-[#07563B] mt-1">₹24.78 Lakh</div>
          <div className="text-[11px] text-[#6B756F] mt-1">Instant HDFC/ICICI feeds</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            COD Cash In Vault
          </span>
          <div className="text-2xl font-black text-[#202A25] mt-1">₹8.41 Lakh</div>
          <div className="text-[11px] text-[#07563B] font-semibold mt-1">100% van bags locked</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] shadow-xs">
          <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider block">
            Unmatched Exceptions
          </span>
          <div className="text-2xl font-black text-[#E86B62] mt-1">1 Case</div>
          <div className="text-[11px] text-[#E86B62] font-semibold mt-1">₹2,760 gateway mismatch</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#E1E8E1]">
        {[
          { id: 'all', label: 'All Transactions' },
          { id: 'matched', label: 'Matched & Settled' },
          { id: 'not matched', label: 'Not Matched' },
          { id: 'exception', label: 'Discrepancy / Exception' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedStatus === tab.id
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
            placeholder="Search order ID, bank UTR, or remarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] text-xs text-[#202A25] placeholder:text-[#6B756F] focus:bg-white focus:outline-none focus:border-[#07563B]"
          />
        </div>
        <span className="text-xs text-[#6B756F]">{filteredRecords.length} records shown</span>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
                <th className="py-3 px-4 font-semibold">Date & Time</th>
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Bank UTR / Ref</th>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Transaction</th>
                <th className="py-3 px-4 font-semibold">Reconciliation State</th>
                <th className="py-3 px-4 font-semibold">Audit Remarks</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E8E1]">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-[#EAF5E9]/50 transition-colors">
                  <td className="py-3.5 px-4 text-[#6B756F] font-mono whitespace-nowrap">
                    {r.dateTime}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#07563B] font-mono">
                    <Link href="/admin/orders" className="hover:underline">
                      {r.orderNumber}
                    </Link>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-[#202A25]">
                    {r.paymentUtr}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F7F7F0] border border-[#E1E8E1] text-[#202A25]">
                      {r.method}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-sm text-[#202A25]">
                    ₹{r.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                        r.status === 'Success' || r.status === 'Collected' || r.status === 'Processed'
                          ? 'bg-[#EAF5E9] text-[#07563B]'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        r.reconciliationStatus === 'Matched'
                          ? 'bg-[#EAF5E9] text-[#07563B] border border-[#C6F04A]'
                          : r.reconciliationStatus === 'Exception'
                          ? 'bg-rose-50 text-[#E86B62] border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {r.reconciliationStatus === 'Matched' ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {r.reconciliationStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[#6B756F] max-w-xs truncate">
                    {r.remarks}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {r.reconciliationStatus !== 'Matched' ? (
                      <button
                        onClick={() => setInspectRecord(r)}
                        className="px-3 py-1.5 rounded-lg bg-[#07563B] text-white hover:bg-[#06452F] font-bold text-xs transition-colors"
                      >
                        Investigate
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#07563B] font-semibold flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investigation Modal */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white border border-[#E1E8E1] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1E8E1]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#F2B544]" />
                <h3 className="text-base font-bold text-[#202A25]">UTR Investigation & Manual Match</h3>
              </div>
              <button onClick={() => setInspectRecord(null)} className="text-[#6B756F] hover:text-[#202A25]">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F7F7F0] border border-[#E1E8E1] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B756F]">Order Number:</span>
                <strong className="text-[#202A25] font-mono">{inspectRecord.orderNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B756F]">Bank UTR:</span>
                <strong className="text-[#202A25] font-mono">{inspectRecord.paymentUtr}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B756F]">Amount:</span>
                <strong className="text-sm font-black text-[#07563B]">
                  ₹{inspectRecord.amount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B756F]">Reported Status:</span>
                <span className="text-[#E86B62] font-semibold">{inspectRecord.remarks}</span>
              </div>
            </div>

            <p className="text-[#6B756F]">
              Confirming this reconciliation validates the transaction against the corporate clearing account and removes the audit flag.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setInspectRecord(null)}
                className="px-4 py-2 rounded-xl border border-[#E1E8E1] text-[#202A25] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleManualReconcile(inspectRecord.id)}
                className="px-4 py-2 rounded-xl bg-[#07563B] text-white font-bold hover:bg-[#06452F]"
              >
                Confirm Manual Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
