import type { EnterprisePortal, PortalSession } from '@/types/security';
import { auditService } from './auditService';

interface RouteAccessResult {
  allowed: boolean;
  requiredPortal?: EnterprisePortal;
  requiredPermission?: string;
  reason?: string;
}

const SUPPORT_ROUTES = [
  '/portal/support',
  '/portal/customer-care',
  '/portal/customers',
  '/portal/complaints',
  '/portal/returns-refunds',
  '/portal/warranty-repair',
  '/portal/escalations',
];

const FINANCE_ROUTES = [
  '/portal/payment-ledger',
  '/portal/cod-settlement',
  '/portal/refund-processing',
  '/portal/payment-exceptions',
  '/portal/reconciliation-reports',
];

const OPERATIONS_ROUTES = [
  '/portal',
  '/portal/orders',
  '/portal/fulfilment',
  '/portal/inventory',
  '/portal/inventory/alerts',
  '/portal/inventory/ledger',
  '/portal/purchase-orders',
  '/portal/warehouse-readiness',
  '/portal/exceptions',
  '/portal/returns',
  '/portal/team-performance',
  '/portal/audit-history',
];

export function resolveRoutePortal(pathname: string): EnterprisePortal {
  if (SUPPORT_ROUTES.some((r) => pathname === r || (r !== '/portal' && pathname.startsWith(r)))) {
    return 'support';
  }
  if (FINANCE_ROUTES.some((r) => pathname === r || pathname.startsWith(r))) {
    return 'finance';
  }
  return 'operations';
}

export function checkRouteAccess(pathname: string, session: PortalSession): RouteAccessResult {
  const routePortal = resolveRoutePortal(pathname);

  // 1. Check Portal Context: user must have active portal context matching the route
  if (session.portal !== routePortal) {
    auditService.logEvent({
      event: 'route_guard_rejection',
      userId: session.userId,
      portal: session.portal,
      sourceDomain: routePortal,
      reason: `User with active context [${session.portal}] attempted cross-portal access to [${pathname}] (owned by [${routePortal}])`,
    });

    return {
      allowed: false,
      requiredPortal: routePortal,
      requiredPermission: `portal.${routePortal}.access`,
      reason: `PORTAL_CONTEXT_MISMATCH: Page belongs to ${routePortal.toUpperCase()} Portal. Active session context is ${session.portal.toUpperCase()}.`,
    };
  }

  // 2. Check Portal Access Permission
  const hasPortalAccess = session.permissions.includes(`portal.${routePortal}.access`);
  if (!hasPortalAccess) {
    auditService.logEvent({
      event: 'failed_access_attempt',
      userId: session.userId,
      portal: session.portal,
      reason: `Missing permission portal.${routePortal}.access`,
    });

    return {
      allowed: false,
      requiredPortal: routePortal,
      requiredPermission: `portal.${routePortal}.access`,
      reason: `PORTAL_ACCESS_DENIED: Missing permission portal.${routePortal}.access`,
    };
  }

  return { allowed: true };
}

