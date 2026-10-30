import {
  INITIAL_SUPPORT_CASES,
  INITIAL_COMPLAINT_DETAIL,
  INITIAL_RETURNS_REFUNDS,
  INITIAL_WARRANTY_CASES,
  INITIAL_ESCALATIONS,
} from '@/mocks/portalData';
import { maskPhoneNumber } from '@/types/security';
import { auditService } from './auditService';
import type { SupportCase, ComplaintDetail, ReturnRefundCase, WarrantyCase, EscalationCase } from '@/types/portal';

/**
 * SupportCaseRepository
 * Strictly bounds Support-owned domain records.
 * Prohibits payment gateway logs and warehouse picker productivity records.
 */
export class SupportCaseRepository {
  private cases: SupportCase[] = [...INITIAL_SUPPORT_CASES];
  private complaint: ComplaintDetail = { ...INITIAL_COMPLAINT_DETAIL };
  private returns: ReturnRefundCase[] = [...INITIAL_RETURNS_REFUNDS];
  private warranties: WarrantyCase[] = [...INITIAL_WARRANTY_CASES];
  private escalations: EscalationCase[] = [...INITIAL_ESCALATIONS];

  getCases(hubId = 'hub_coimbatore'): SupportCase[] {
    return this.cases;
  }

  getCaseById(id: string, actorId = 'EMP-042'): SupportCase | undefined {
    const c = this.cases.find((item) => item.id === id);
    if (c) {
      auditService.logEvent({
        event: 'record_view',
        userId: actorId,
        portal: 'support',
        recordId: id,
        fieldsReturned: ['caseNumber', 'customerName', 'issue', 'sla', 'priority'],
        reason: 'Support case detail review',
      });
    }
    return c;
  }

  getComplaintDetail(actorId = 'EMP-042'): ComplaintDetail {
    auditService.logEvent({
      event: 'record_view',
      userId: actorId,
      portal: 'support',
      recordId: this.complaint.id,
      fieldsReturned: ['caseNumber', 'customerName', 'issue', 'policyResult'],
      reason: 'Live complaint investigation',
    });
    return this.complaint;
  }

  getReturnRefundCases(): ReturnRefundCase[] {
    return this.returns.map((r) => ({
      ...r,
      pickupAddress: r.pickupAddress ? r.pickupAddress.replace(/\d{10}/, maskPhoneNumber()) : undefined,
    }));
  }

  getWarrantyCases(): WarrantyCase[] {
    return this.warranties;
  }

  getEscalations(): EscalationCase[] {
    return this.escalations;
  }

  getSlaMetrics() {
    return {
      activeCases: this.cases.length,
      atRisk: this.cases.filter((c) => c.sla === 'At risk').length,
      breached: this.cases.filter((c) => c.sla === 'Breached').length,
      onTrack: this.cases.filter((c) => c.sla === 'On track').length,
      avgResolutionHours: 4.2,
      csatScore: 94.6,
    };
  }
}

export const supportRepository = new SupportCaseRepository();

