'use client';

import React from 'react';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';
import { EvidenceLightbox } from './EvidenceLightbox';
import { ConfirmationModal } from './ConfirmationModal';
import { ToastContainer } from './ToastContainer';

interface PortalShellProps {
  children: React.ReactNode;
}

export const PortalShell: React.FC<PortalShellProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F8F7] font-sans text-gray-900 antialiased">
      {/* 1. Left Fixed Deep Forest Green Sidebar (310px) */}
      <PortalSidebar />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Persistent Topbar */}
        <PortalTopbar />

        {/* Scrollable Work Area */}
        <main className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <EvidenceLightbox />
      <ConfirmationModal />
      <ToastContainer />
    </div>
  );
};
