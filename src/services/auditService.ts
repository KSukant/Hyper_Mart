import type { AuditEvent, EnterprisePortal } from '@/types/security';
import { INITIAL_AUDIT_EVENTS } from '@/mocks/portalData';

// Map initial mock events to typed AuditEvents
const initialEvents: AuditEvent[] = INITIAL_AUDIT_EVENTS.map((e, index) => {
  let portal: EnterprisePortal = 'operations';
  if (e.action.toLowerCase().includes('support') || e.action.toLowerCase().includes('case') || e.caseRef) {
    portal = 'support';
  } else if (e.action.toLowerCase().includes('finance') || e.action.toLowerCase().includes('refund') || e.paymentRef) {
    portal = 'finance';
  }

  return {
    id: e.id || `aud-${1000 + index}`,
    event: 'record_view',
    userId: e.actor || 'EMP-042',
    portal,
    recordId: e.recordId || e.orderRef || e.caseRef || e.paymentRef,
    fieldsReturned: ['status', 'summary'],
    reason: e.reason || e.action,
    hubId: 'hub_coimbatore',
    timestamp: new Date().toISOString(),
    metadata: {
      action: e.action,
      beforeValue: e.beforeValue,
      afterValue: e.afterValue,
      region: e.region,
    },
  };
});

class AuditService {
  private events: AuditEvent[] = [...initialEvents];

  logEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
    const newEvent: AuditEvent = {
      ...event,
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  getAuditHistory(portal?: EnterprisePortal): AuditEvent[] {
    if (!portal) return [...this.events];
    return this.events.filter((e) => e.portal === portal || e.sourceDomain === portal);
  }

  getRecentSecurityAlerts(portal?: EnterprisePortal): AuditEvent[] {
    const filtered = this.getAuditHistory(portal);
    return filtered.filter(
      (e) =>
        e.event === 'failed_access_attempt' ||
        e.event === 'route_guard_rejection' ||
        e.event === 'cross_portal_projection_read'
    );
  }
}

export const auditService = new AuditService();
