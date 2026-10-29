'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, ShieldCheck, Download, Search } from 'lucide-react';
import { AUDIT_EVENTS } from '@/mocks/adminData';

export default function AuditLogDirectPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/users"
            className="p-2 rounded-xl bg-white border border-[#E1E8E1] text-[#6B756F] hover:text-[#07563B] hover:bg-[#F7F7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#07563B]">
              <span>Security & Governance</span>
              <span>•</span>
              <span>Cryptographic Audit Trail</span>
            </div>
            <h1 className="text-2xl font-bold text-[#202A25] tracking-tight mt-1">
              System Audit Log
            </h1>
          </div>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07563B] text-xs font-bold text-white hover:bg-[#06452F] shadow-xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#C6F04A]" />
          User & Permission Matrix
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-[#E1E8E1] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E1E8E1] flex justify-between items-center text-xs">
          <h3 className="font-bold text-[#202A25] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#07563B]" />
            Operations Audit Records
          </h3>
          <span className="text-[#6B756F]">All changes immutable and preserved</span>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E1E8E1] bg-[#F7F7F0] text-[11px] uppercase tracking-wider text-[#6B756F]">
              <th className="py-2.5 px-4 font-semibold">Timestamp</th>
              <th className="py-2.5 px-4 font-semibold">Actor / User</th>
              <th className="py-2.5 px-4 font-semibold">Action / Event</th>
              <th className="py-2.5 px-4 font-semibold">Details & Target</th>
              <th className="py-2.5 px-4 font-semibold text-right">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1E8E1]">
            {AUDIT_EVENTS.map((evt) => (
              <tr key={evt.id} className="hover:bg-[#F7F7F0]/60">
                <td className="py-3 px-4 font-mono text-[#6B756F]">{evt.time}</td>
                <td className="py-3 px-4 font-bold text-[#202A25]">{evt.user}</td>
                <td className="py-3 px-4 font-semibold text-[#07563B]">{evt.event}</td>
                <td className="py-3 px-4 text-[#202A25]">{evt.details}</td>
                <td className="py-3 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF5E9] text-[#07563B]">
                    Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
