export type EnterprisePortal = 'support' | 'finance' | 'operations';

export type PortalPermission =
  | 'portal.support.access'
  | 'portal.finance.access'
  | 'portal.operations.access';

export type ModulePermission =
  // Support Modules
  | 'support.dashboard.read'
  | 'support.case.read'
  | 'support.customer_care.read'
  | 'support.customer360.read_limited'
  | 'support.complaint.read'
  | 'support.return_refund.read'
  | 'support.warranty.read'
  | 'support.escalation.read'
  | 'support.report.read'
  | 'support.audit.read'
  // Finance Modules
  | 'finance.dashboard.read'
  | 'finance.payment.read'
  | 'finance.refund.read'
  | 'finance.cod.read'
  | 'finance.payment_exception.read'
  | 'finance.reconciliation.read'
  | 'finance.report.read'
  | 'finance.audit.read'
  // Operations Modules
  | 'operations.dashboard.read'
  | 'operations.orders.read'
  | 'operations.fulfilment.read'
  | 'operations.warehouse_status.read'
  | 'operations.inventory.read'
  | 'operations.low_stock.read'
  | 'operations.expiry_alert.read'
  | 'operations.exception.read'
  | 'operations.dispatch.read'
  | 'operations.delivery.read'
  | 'operations.return_movement.read'
  | 'operations.staff.read'
  | 'operations.report.read'
  | 'operations.audit.read';

export type ActionPermission =
  // Support Actions
  | 'support.case.create'
  | 'support.case.update'
  | 'support.case.add_note'
  | 'support.case.attach_evidence'
  | 'support.case.assign_self'
  | 'support.case.assign_team'
  | 'support.case.reassign'
  | 'support.case.priority.update'
  | 'support.case.close'
  | 'support.escalation.create'
  | 'support.escalation.assign'
  | 'support.escalation.resolve'
  | 'support.sla.manage_team'
  | 'support.report.export'
  // Finance Actions
  | 'finance.refund.prepare'
  | 'finance.refund.approve_small'
  | 'finance.refund.approve_medium'
  | 'finance.settlement.approve'
  | 'finance.reconciliation.signoff'
  | 'finance.adjustment.create'
  | 'finance.adjustment.approve_within_limit'
  | 'finance.report.export'
  // Operations Actions
  | 'operations.fulfilment.assign'
  | 'operations.exception.assign'
  | 'operations.exception.resolve'
  | 'operations.inventory_transfer.approve'
  | 'operations.stock_adjustment.approve_within_limit'
  | 'operations.dispatch.verify'
  | 'operations.handover.verify'
  | 'operations.staff_shift.manage'
  | 'operations.report.export'
  | 'operations.sla.manage';

export type FieldPermission =
  | 'customer.phone.masked.read'
  | 'customer.phone.full.read'
  | 'customer.address.delivery_only.read'
  | 'payment.amount.read'
  | 'payment.gateway_reference.read'
  | 'payment.card_masked.read'
  | 'support.internal_note.read'
  | 'operations.inspection_notes.read'
  | 'operations.staff_productivity.read';

export interface PortalSession {
  userId: string;
  employeeId: string;
  portal: EnterprisePortal;
  roles: string[];
  hubIds: string[];
  regionIds: string[];
  permissions: string[];
  sessionId: string;
}

export interface AuditEvent {
  id: string;
  event:
    | 'login'
    | 'portal_switch'
    | 'record_view'
    | 'sensitive_field_view'
    | 'cross_portal_projection_read'
    | 'export'
    | 'refund_approval'
    | 'inventory_adjustment'
    | 'exception_override'
    | 'role_change'
    | 'permission_change'
    | 'failed_access_attempt'
    | 'route_guard_rejection';
  userId: string;
  portal: EnterprisePortal;
  sourceDomain?: EnterprisePortal | 'admin';
  projection?: string;
  recordId?: string;
  fieldsReturned?: string[];
  reason?: string;
  hubId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface CrossPortalSharingRecord {
  recordType: string;
  recordId: string;
  sourceDomain: EnterprisePortal;
  targetDomain: EnterprisePortal;
  projectionType: string;
  fieldsAllowed: string[];
  expiresAt: string;
  reason: string;
}

/**
 * Data masking utilities
 */
export function maskPhoneNumber(phone?: string): string {
  if (!phone) return '+91******4321';
  if (phone.length < 8) return '+91******0000';
  const prefix = phone.slice(0, 3);
  const suffix = phone.slice(-4);
  return `${prefix}******${suffix}`;
}

export function maskPaymentIdentifier(ref?: string): string {
  if (!ref) return '•••• •••• •••• 4022';
  if (ref.length < 4) return '•••• 4022';
  return `•••• •••• •••• ${ref.slice(-4)}`;
}

