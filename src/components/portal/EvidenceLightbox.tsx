'use client';

import React from 'react';
import { X, ZoomIn, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { usePortalStore } from '@/store/portalStore';

export const EvidenceLightbox: React.FC = () => {
  const { lightboxImage, setLightboxImage, addToast } = usePortalStore();

  if (!lightboxImage) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div>
            <h3 className="font-bold text-base text-gray-900">{lightboxImage.title}</h3>
            {lightboxImage.subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{lightboxImage.subtitle}</p>
            )}
          </div>
          <button
            onClick={() => setLightboxImage(null)}
            className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative min-h-[360px]">
          {lightboxImage.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Digital Verification Document Verified</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Cryptographically Verified File • MD5 Hash Checked</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                addToast('Evidence Downloaded', 'Archived PDF bundle exported to local system', 'success');
              }}
              className="px-3.5 py-1.5 rounded-xl border border-gray-300 hover:bg-white text-gray-700 font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record</span>
            </button>
            <button
              onClick={() => {
                addToast('Evidence Approved', 'Document marked as verified for case file', 'success');
                setLightboxImage(null);
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Mark Verified</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
