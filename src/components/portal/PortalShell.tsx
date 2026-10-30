'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PortalSidebar } from './PortalSidebar';
import { PortalTopbar } from './PortalTopbar';
import { EvidenceLightbox } from './EvidenceLightbox';
import { ConfirmationModal } from './ConfirmationModal';
import { ToastContainer } from './ToastContainer';
import { PortalAccessDenied } from './PortalAccessDenied';
import { usePortalContextStore } from '@/store/portalContextStore';
import type { EnterprisePortal } from '@/types/security';

interface PortalShellProps {
  children: React.ReactNode;
}

interface AccessState {
  allowed: boolean;
  requiredPortal?: EnterprisePortal;
  checked: boolean;
}

export const PortalShell: React.FC<PortalShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { activePortal, session, setPortalContext } = usePortalContextStore();

  // Access guard state — evaluated client-side only to avoid SSR side effects
  const [accessState, setAccessState] = useState<AccessState>({ allowed: true, checked: false });

  // Route-portal resolution & context sync (no side-effecting audit calls in render)
  useEffect(() => {
    if (pathname === '/portal/support') {
      setPortalContext('support');
    } else if (pathname === '/portal/payment-ledger') {
      setPortalContext('finance');
    } else if (pathname === '/portal') {
      setPortalContext('operations');
    }
  }, [pathname, setPortalContext]);

  // Check 4-dimension access guard in effect only (keeps render pure)
  useEffect(() => {
    // Dynamic import to avoid SSR module evaluation
    import('@/services/portalGuard').then(({ checkRouteAccess }) => {
      const result = checkRouteAccess(pathname, session);
      setAccessState({ allowed: result.allowed, requiredPortal: result.requiredPortal, checked: true });
    });
  }, [pathname, session]);

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
            {accessState.checked && !accessState.allowed && accessState.requiredPortal ? (
              <PortalAccessDenied
                requiredPortal={accessState.requiredPortal}
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
