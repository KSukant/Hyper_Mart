'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { usePortalStore } from '@/store/portalStore';

export const ConfirmationModal: React.FC = () => {
  const { confirmationModal, closeConfirmation, currentRole } = usePortalStore();

  if (!confirmationModal) return null;

  const { title, description, confirmLabel = 'Confirm Action', cancelLabel = 'Cancel', variant = 'primary', meta, onConfirm } =
    confirmationModal;

  const variantStyles = {
    primary: {
      btn: 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      headerBg: 'bg-emerald-50 text-emerald-950',
    },
    warning: {
      btn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      headerBg: 'bg-amber-50 text-amber-950',
    },
    danger: {
      btn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20',
      icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
      headerBg: 'bg-rose-50 text-rose-950',
    },
  };

  const style = variantStyles[variant] || variantStyles.primary;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between ${style.headerBg}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white shadow-xs">{style.icon}</div>
            <div>
              <h3 className="font-bold text-base">{title}</h3>
              <p className="text-xs opacity-75">Operational Action Verification Required</p>
            </div>
          </div>
          <button
            onClick={closeConfirmation}
            className="w-8 h-8 rounded-full hover:bg-black/10 flex items-center justify-center text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-gray-700 leading-relaxed">{description}</p>

          {/* Audit Verification Block */}
          {meta && (
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Action Parameters & Audit Trail
              </div>

              {meta.recordId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Record ID:</span>
                  <span className="font-mono font-bold text-gray-900">{meta.recordId}</span>
                </div>
              )}

              {meta.amount && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Financial Impact:</span>
                  <span className="font-bold text-emerald-700">{meta.amount}</span>
                </div>
              )}

              {meta.policy && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Policy Basis:</span>
                  <span className="font-medium text-gray-800">{meta.policy}</span>
                </div>
              )}

              {meta.destination && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Destination:</span>
                  <span className="font-medium text-gray-800">{meta.destination}</span>
                </div>
              )}

              <div className="flex justify-between pt-1 border-t border-gray-200 text-[11px]">
                <span className="text-gray-500">Authorizing Role:</span>
                <span className="font-semibold text-gray-900">{currentRole}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>This action will be permanently recorded in the Governance Audit Ledger.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={closeConfirmation}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-200/60 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeConfirmation();
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${style.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
