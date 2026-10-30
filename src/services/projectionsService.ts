import { auditService } from './auditService';
import { maskPhoneNumber } from '@/types/security';

export interface SupportOrderStatusProjection {
  orderId: string;
  customerReference: string;
  orderStatus: string;
  fulfilmentStatus: string;
  deliveryStatus: string;
  refundStatus: string;
  customerPhoneMasked: string;
  supportCaseCount: number;
}

export interface SupportRefundStatusProjection {
  orderId: string;
  refundStatus: 'approved' | 'processing' | 'completed' | 'none';
  refundAmount: number;
  expectedDate: string;
}

export interface SupportDeliveryStatusProjection {
  orderId: string;
  deliveryStatus: string;
  courierPartner: string;
  estimatedArrival: string;
}

export interface SupportQualitySummaryProjection {
  orderId: string;
  fulfilmentStatus: string;
  customerVisibleReason: string;
  replacementRequested: boolean;
  estimatedResolution: string;
}

export interface FinancePaymentSummaryProjection {
  orderId: string;
  orderAmount: number;
  currency: string;
  paymentStatus: string;
  paymentMethod: string;
  refundStatus: string;
  settlementStatus: string;
  deliveryStatus: string;
  codCollected: boolean;
}

export interface OperationsFulfilmentProjection {
  orderId: string;
  deliverySlot: string;
  packageCount: number;
  deliveryAddress: string;
  customerPhone: string;
  dispatchStatus: string;
  deliveryInstructions: string;
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    handling: string;
  }>;
}

/**
 * ProjectionsService
 * Mediates limited, field-filtered, cross-portal projections.
 * Strictly avoids exposing full domain records across portal boundaries.
 * Every read is audited.
 */
class ProjectionsService {
  // Support Projections (Consumed by Support Portal from Operations/Finance)
  getSupportOrderStatus(orderId: string, actorId = 'EMP-042'): SupportOrderStatusProjection {
    auditService.logEvent({
      event: 'cross_portal_projection_read',
      userId: actorId,
      portal: 'support',
      sourceDomain: 'operations',
      projection: 'order_status',
      recordId: orderId,
      fieldsReturned: [
        'orderId',
        'customerReference',
        'orderStatus',
        'fulfilmentStatus',
        'deliveryStatus',
        'refundStatus',
        'customerPhoneMasked',
      ],
      reason: 'Support case customer inquiry resolution',
    });

    return {
      orderId,
      customerReference: 'Meera K.',
      orderStatus: 'delivered',
      fulfilmentStatus: 'dispatched',
      deliveryStatus: 'delivered',
      refundStatus: 'approved',
      supportCaseCount: 1,
      customerPhoneMasked: maskPhoneNumber('+919876543210'),
    };
  }

  getSupportRefundStatus(orderId: string, actorId = 'EMP-042'): SupportRefundStatusProjection {
    auditService.logEvent({
      event: 'cross_portal_projection_read',
      userId: actorId,
      portal: 'support',
      sourceDomain: 'finance',
      projection: 'refund_status',
      recordId: orderId,
      fieldsReturned: ['orderId', 'refundStatus', 'refundAmount', 'expectedDate'],
      reason: 'Customer refund timeline update',
    });

    return {
      orderId,
      refundStatus: 'approved',
      refundAmount: 2480,
      expectedDate: '2026-11-02',
    };
  }

  getSupportQualitySummary(orderId: string, actorId = 'EMP-042'): SupportQualitySummaryProjection {
    auditService.logEvent({
      event: 'cross_portal_projection_read',
      userId: actorId,
      portal: 'support',
      sourceDomain: 'operations',
      projection: 'quality_summary',
      recordId: orderId,
      fieldsReturned: ['orderId', 'fulfilmentStatus', 'customerVisibleReason', 'replacementRequested', 'estimatedResolution'],
      reason: 'Customer damage dispute verification',
    });

    return {
      orderId,
      fulfilmentStatus: 'quality_check_failed',
      customerVisibleReason: 'Damaged packaging found during checking',
      replacementRequested: true,
      estimatedResolution: '24 hours',
    };
  }

  // Finance Projections (Consumed by Finance Portal from Operations)
  getFinancePaymentSummary(orderId: string, actorId = 'FIN-104'): FinancePaymentSummaryProjection {
    auditService.logEvent({
      event: 'cross_portal_projection_read',
      userId: actorId,
      portal: 'finance',
      sourceDomain: 'operations',
      projection: 'payment_summary',
      recordId: orderId,
      fieldsReturned: [
        'orderId',
        'orderAmount',
        'currency',
        'paymentStatus',
        'paymentMethod',
        'refundStatus',
        'settlementStatus',
        'deliveryStatus',
        'codCollected',
      ],
      reason: 'Gateway ledger settlement reconciliation',
    });

    return {
      orderId,
      orderAmount: 2480,
      currency: 'INR',
      paymentStatus: 'captured',
      paymentMethod: 'UPI',
      refundStatus: 'approved',
      settlementStatus: 'matched',
      deliveryStatus: 'delivered',
      codCollected: false,
    };
  }

  // Operations Projections (Consumed by Operations Portal from Customer/Finance)
  getOperationsFulfilment(orderId: string, actorId = 'OPS-202'): OperationsFulfilmentProjection {
    auditService.logEvent({
      event: 'cross_portal_projection_read',
      userId: actorId,
      portal: 'operations',
      sourceDomain: 'support',
      projection: 'fulfilment_details',
      recordId: orderId,
      fieldsReturned: ['orderId', 'deliverySlot', 'deliveryAddress', 'customerPhone', 'dispatchStatus', 'items'],
      reason: 'Packing station item verification',
    });

    return {
      orderId,
      deliverySlot: '2026-10-30 08:00-12:00',
      packageCount: 2,
      deliveryAddress: '641004, Peelamedu, Coimbatore',
      customerPhone: maskPhoneNumber('+919876543210'),
      dispatchStatus: 'ready_for_handover',
      deliveryInstructions: 'Leave at security desk',
      items: [
        { sku: 'SKU-FOD-001', name: 'Fortune Sunflower Oil 5L', quantity: 2, handling: 'ambient' },
        { sku: 'SKU-VEG-002', name: 'Fresh Farm Tomatoes 1kg', quantity: 1, handling: 'fresh' },
      ],
    };
  }
}

export const projectionsService = new ProjectionsService();

