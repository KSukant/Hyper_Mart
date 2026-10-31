'use client';

import React from 'react';
import { DeliveryPartnerSidebar } from './DeliveryPartnerSidebar';
import { DeliveryPartnerTopbar } from './DeliveryPartnerTopbar';
import { DeliveryToastContainer } from './DeliveryToastContainer';

interface DeliveryPartnerShellProps {
  children: React.ReactNode;
}

export function DeliveryPartnerShell({ children }: DeliveryPartnerShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB] font-sans text-gray-900 antialiased">
      {/* Sidebar — 240px, forest green */}
      <DeliveryPartnerSidebar />

      {/* Main canvas */}
      <div className="flex flex-1 flex-col h-screen min-w-0 overflow-hidden">
        <DeliveryPartnerTopbar />
        <main className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      <DeliveryToastContainer />
    </div>
  );
}

