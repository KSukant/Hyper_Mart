'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';
import { EvidenceLightbox } from './EvidenceLightbox';
import { ConfirmationModal } from './ConfirmationModal';
import { ToastContainer } from './ToastContainer';
import { PortalAccessDenied } from './PortalAccessDenied';
import { usePortalContextStore } from '@/store/portalContextStore';
import { resolveRoutePortal, checkRouteAccess } from '@/services/portalGuard';

interface PortalShellProps {
  children: React.ReactNode;
}

export const PortalShell: React.FC<PortalShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { activePortal, session, setPortalContext } = usePortalContextStore();

  // Route-portal resolution
  const expectedPortal = resolveRoutePortal(pathname);

  // If opening the portal directly from landing page entry routes, sync active portal context
  useEffect(() => {
    if (pathname === '/portal/support') {
      setPortalContext('support');
    } else if (pathname === '/portal/payment-ledger') {
      setPortalContext('finance');
    } else if (pathname === '/portal') {
      setPortalContext('operations');
    }
  }, [pathname, setPortalContext]);

  // Check 4-dimension access guard
  const access = checkRouteAccess(pathname, session);

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
            {!access.allowed && access.requiredPortal ? (
              <PortalAccessDenied
                requiredPortal={access.requiredPortal}
                currentPortal={activePortal}
                pathname={pathname}
              />
            ) : (
              children
            )}
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
