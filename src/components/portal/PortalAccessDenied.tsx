'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, RefreshCw, Lock } from 'lucide-react';
import { usePortalContextStore } from '@/store/portalContextStore';
import type { EnterprisePortal } from '@/types/security';

interface PortalAccessDeniedProps {
  requiredPortal: EnterprisePortal;
  currentPortal: EnterprisePortal;
  pathname: string;
}

export const PortalAccessDenied: React.FC<PortalAccessDeniedProps> = ({
  requiredPortal,
  currentPortal,
  pathname,
}) => {
  const { switchPortal } = usePortalContextStore();

  const portalNames: Record<EnterprisePortal, string> = {
    support: 'Support Portal',
    finance: 'Finance Portal',
    operations: 'Operations Manager Portal',
  };

  const portalColors: Record<EnterprisePortal, string> = {
    support: 'bg-blue-600 hover:bg-blue-700 text-white',
    finance: 'bg-rose-600 hover:bg-rose-700 text-white',
    operations: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-rose-200 shadow-xl p-8 space-y-6 text-center">
        {/* Security Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            403 • SECURITY ISOLATION BOUNDARY
          </span>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">
            Cross-Portal Access Restricted
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            The path <code className="bg-gray-100 px-1.5 py-0.5 rounded text-rose-700 font-mono text-xs">{pathname}</code> belongs strictly to the{' '}
            <strong className="text-gray-900">{portalNames[requiredPortal]}</strong> domain.
          </p>
        </div>

        {/* Isolation Policy Alert Box */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Lock className="w-4 h-4 text-amber-700" />
            <span>Active Portal Context: {portalNames[currentPortal]}</span>
          </div>
          <p className="text-amber-800 leading-snug">
            In compliance with the HyperMart Enterprise Data Separation Policy, cross-portal domain records cannot be viewed or manipulated from outside the owning portal context.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => switchPortal(requiredPortal)}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs ${portalColors[requiredPortal]}`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Switch to {portalNames[requiredPortal]}</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Landing Gateway</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

