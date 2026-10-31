'use client';

import { useDeliveryStore } from '@/store/deliveryStore';
import { cn } from '@/lib/cn';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
};

const BG = {
  success: 'border-emerald-200 bg-emerald-50',
  error: 'border-red-200 bg-red-50',
  warning: 'border-amber-200 bg-amber-50',
  info: 'border-blue-200 bg-blue-50',
};

export function DeliveryToastContainer() {
  const { toasts, removeToast } = useDeliveryStore();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-lg max-w-sm pointer-events-auto',
            BG[t.type]
          )}
        >
          <div className="mt-0.5 shrink-0">{ICONS[t.type]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900">{t.title}</p>
            <p className="text-[11px] text-gray-600 mt-0.5">{t.message}</p>
          </div>
          <button onClick={() => removeToast(t.id)} className="shrink-0 text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

