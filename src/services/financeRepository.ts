import {
  INITIAL_PAYMENT_LEDGER,
  INITIAL_COD_SETTLEMENTS,
  INITIAL_REFUND_PROCESSING,
  INITIAL_PAYMENT_EXCEPTIONS,
  INITIAL_RECONCILIATION_REPORTS,
} from '@/mocks/portalData';
import { maskPaymentIdentifier } from '@/types/security';
import { auditService } from './auditService';
import type {
  PaymentLedgerEntry,
  CODSettlementEntry,
  RefundProcessingEntry,
  PaymentExceptionEntry,
  ReconciliationReport,
} from '@/types/portal';

/**
 * FinanceLedgerRepository
 * Strictly bounds Finance-owned domain records.
 * Prohibits customer conversations, support notes, and warehouse picking tasks.
 */
export class FinanceLedgerRepository {
  private ledger: PaymentLedgerEntry[] = [...INITIAL_PAYMENT_LEDGER];
  private codSettlements: CODSettlementEntry[] = [...INITIAL_COD_SETTLEMENTS];
  private refunds: RefundProcessingEntry[] = [...INITIAL_REFUND_PROCESSING];
  private exceptions: PaymentExceptionEntry[] = [...INITIAL_PAYMENT_EXCEPTIONS];
  private reports: ReconciliationReport[] = [...INITIAL_RECONCILIATION_REPORTS];

  getLedger(actorId = 'FIN-104'): PaymentLedgerEntry[] {
    return this.ledger.map((entry) => ({
      ...entry,
      providerRef: entry.providerRef
        ? maskPaymentIdentifier(entry.providerRef)
        : undefined,
    }));
  }

  getCodSettlements(): CODSettlementEntry[] {
    return this.codSettlements;
  }

  getRefundProcessing(): RefundProcessingEntry[] {
    return this.refunds;
  }

  getPaymentExceptions(): PaymentExceptionEntry[] {
    return this.exceptions;
  }

  getReconciliationReports(): ReconciliationReport[] {
    return this.reports;
  }

  approveRefund(refundId: string, actorId: string, role: string, amount: number) {
    if (amount > 10000 && !role.includes('Manager')) {
      auditService.logEvent({
        event: 'failed_access_attempt',
        userId: actorId,
        portal: 'finance',
        recordId: refundId,
        reason: 'Refund exceeds single-approver threshold (> ₹10,000 requires Finance Manager)',
      });
      throw new Error('HIGH_VALUE_APPROVAL_REQUIRED: Second sign-off required for refunds > ₹10,000');
    }

    const target = this.refunds.find((r) => r.id === refundId);
    if (target) {
      target.status = 'Approved';
      auditService.logEvent({
        event: 'refund_approval',
        userId: actorId,
        portal: 'finance',
        recordId: refundId,
        fieldsReturned: ['status', 'refundAmount'],
        reason: `Approved refund of ₹${amount} for ${target.customerName}`,
      });
    }
    return target;
  }

  getMetrics() {
    return {
      dailySettlementVolume: '₹14.82 L',
      reconciledRatio: 99.4,
      pendingRefunds: this.refunds.filter((r) => r.status === 'Awaiting approval').length,
      gatewayExceptions: this.exceptions.length,
      codHoldCount: this.codSettlements.filter((s) => s.status === 'Hold' || s.status === 'Variance hold').length,
    };
  }
}

export const financeRepository = new FinanceLedgerRepository();
