import React from 'react';
import { PortalShell } from '@/components/portal/PortalShell';

export const metadata = {
  title: 'HyperMart Operations Portal • Support, Finance & Governance',
  description: 'Enterprise Operations Hub for HyperMart Customer Support, Financial Reconciliation, and Governance Audits.',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
