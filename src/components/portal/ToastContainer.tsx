'use client';

import React from 'react';
import { usePortalStore } from '@/store/portalStore';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePortalStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const type = toast.type || 'info';
        const messageText = toast.message || toast.description || '';

        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />,
          danger: <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />,
          error: <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-300 bg-white/95 text-emerald-950',
          warning: 'border-amber-300 bg-white/95 text-amber-950',
          danger: 'border-rose-300 bg-white/95 text-rose-950',
          error: 'border-rose-300 bg-white/95 text-rose-950',
          info: 'border-blue-300 bg-white/95 text-blue-950',
        };

        const icon = icons[type] || icons.info;
        const borderStyle = borders[type] || borders.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${borderStyle}`}
          >
            <div className="mt-0.5">{icon}</div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-900 leading-tight">{toast.title}</div>
              {messageText && (
                <div className="text-[11px] text-gray-600 mt-0.5 leading-snug">{messageText}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
