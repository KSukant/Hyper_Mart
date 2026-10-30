// Type definitions for HyperMart Operations Portal: Support, Finance & Governance (12 Pages)

export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type SLAStatus = 'At risk' | 'Open' | 'Escalated' | 'On track' | 'Breached';
export type CaseType = 'Complaint' | 'Return' | 'Repair' | 'Payment' | 'Delivery';

export interface SupportCase {
  id: string;
  caseNumber: string;
  product: string;
  type: CaseType;
  owner: string;
  age: string;
  sla: SLAStatus;
  priority: Priority;
  customerName: string;
  orderNumber: string;
  issue: string;
  evidenceStatus: string;
  nextAction: string;
}

export interface ComplaintDetail {
  id: string;
  caseNumber: string;
  priority: Priority;
  dueIn: string;
  customerName: string;
  memberTier: string;
  priorCases: number;
  orderValue: number;
  paymentMethod: string;
  assignedOwner: string;
  ownerStatus: string;
  productName: string;
  sku: string;
  orderNumber: string;
  shipmentNumber: string;
  issue: string;
  evidenceSummary: string;
  policyCategory: string;
  customerAsk: string;
  managerRequired: boolean;
  originalMessage: string;
  policyResult: string;
  resolutionOptions: string[];
  timeline: { step: string; done: boolean }[];
  customerPhotos: string[];
  warehousePhotoStatus: 'Pending' | 'Received' | 'Not required';
  lastAction: string;
  actor: string;
}

export interface ReturnRefundCase {
  id: string;
  returnNumber: string;
  productName: string;
  customerName: string;
  reason: string;
  condition: 'Damaged' | 'Sealed' | 'Opened' | 'Defective';
  refundAmount: number;
  owner: string;
  status:
    | 'Pending'
    | 'Processing'
    | 'Completed'
    | 'Inspection'
    | 'Exchange'
    | 'Requested'
    | 'Pickup scheduled'
    | 'Received';
  eligibility: string;
  evidenceSummary: string;
  replacementStock: string;
  refundDestination: string;
  sealTags: string;
  quantityAffected: string;
  slaWindow: string;
  pickupRequested: string;
  pickupScheduled: string;
  nextPickupStep: string;
  lastContact: string;
  channel: string;
  nextCommunication: string;
  // Extended fields for Screen 3
  pickupAddress?: string;
  courierPartner?: string;
  pickupDate?: string;
  checklist?: string[];
}

export interface WarrantyCase {
  id: string;
  caseNumber: string;
  productName: string;
  serialNumber: string;
  issue: string;
  technician: string;
  visitSchedule: string;
  status:
    | 'Scheduled'
    | 'Verified'
    | 'Serial review'
    | 'Replacement'
    | 'Repair'
    | 'Visit scheduled'
    | 'Serial verification'
    | 'Under inspection'
    | 'Replacement recommended'
    | 'Repaired';
  priority: Priority;
  warrantyExpiry: string;
  serialMatched: boolean;
  nextStep: string;
  purchaseDate: string;
  installStatus: string;
  priorRepairs: number;
  damagePhoto: 'Received' | 'Pending';
  diagnosticCode: string;
  technicianReport: 'Pending' | 'Submitted' | string;
  repairEstimate: number | string;
  replacementRequirement: string;
  // Extended fields for Screen 4
  customerName?: string;
  warrantyPeriod?: string;
}

export interface EscalationCase {
  id: string;
  escalationNumber: string;
  source: string;
  sourceRecord: string;
  orderNumber: string;
  reason: string;
  priority: Priority;
  owner: string;
  age: string;
  targetTeam: string;
  repeatedCount: number;
  decisionOwner: string;
  targetDecision: string;
  escalationRule: string;
  sellerName: string;
  sku: string;
  createdFrom: string;
  status: 'Open' | 'Accepted' | 'Reassigned' | 'Resolved';
  // Extended fields for Screen 5
  sourceCase?: string;
  slaRemaining?: string;
  currentDecision?: string;
}

export interface PaymentLedgerEntry {
  id: string;
  time: string;
  transactionId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  method: 'UPI' | 'Card' | 'COD' | 'Wallet' | string;
  type: 'Payment' | 'Refund' | 'Collection';
  status: 'Captured' | 'Pending' | 'Unreconciled' | 'Failed' | 'Refunded';
  itemsCount: number;
  provider: string;
  reconciliationRef: string;
  isMatched: boolean;
  // Extended fields for Screen 6
  providerRef?: string;
  recStatus?: string;
}

export interface CODSettlementEntry {
  id: string;
  courierName: string;
  routeCode: string;
  shift: 'Morning' | 'Evening' | 'Night' | string;
  ordersCount: number;
  expectedAmount: number;
  collectedAmount: number;
  variance: number;
  status:
    | 'Ready'
    | 'Variance'
    | 'Receipt missing'
    | 'Approved'
    | 'Hold'
    | 'Settled'
    | 'Pending handover'
    | 'Variance hold';
  handoverPhotoStatus: 'Received' | 'Pending';
  receiptImage: 'Received' | 'Pending';
  courierStatement: 'Pending' | 'Received';
  bankDeposit: 'Not uploaded' | 'Uploaded';
  approvalLevel: string;
  // Extended fields for Screen 7
  route?: string;
  depositSlipRef?: string;
  handoverEvidenceUrl?: string;
  notes?: string;
}

export interface RefundProcessingEntry {
  id: string;
  refundNumber: string;
  orderNumber: string;
  customerName: string;
  reason: string;
  originalAmount: number;
  refundAmount: number;
  method: 'UPI' | 'Card' | 'Wallet';
  status:
    | 'Awaiting approval'
    | 'Approved'
    | 'Processing'
    | 'Failed'
    | 'Manager review'
    | 'Completed';
  itemAmount: number;
  deliveryCharge: number;
  discount: number;
  tax: number;
  destinationMasked: string;
  provider: string;
  approvalLevel: string;
  dualApprovalRequired: boolean;
  customerNotified: boolean;
  duplicateCheckPassed: boolean;
  // Extended fields for Screen 8
  productName?: string;
  finalRefundAmount?: number;
  destination?: string;
  expectedProcessingTime?: string;
  policyApplied?: string;
  breakdown?: {
    deliveryCharge: number;
    couponDiscount: number;
    taxRefund: number;
    restockingFee: number;
  };
}

export interface PaymentExceptionEntry {
  id: string;
  exceptionNumber: string;
  orderNumber: string;
  customerName: string;
  type:
    | 'Failed refund'
    | 'Duplicate charge'
    | 'Payment failed'
    | 'COD variance'
    | 'Refund failure'
    | 'Payment bounce'
    | 'Bank IFSC error';
  amount: number;
  failureReason: string;
  failureCode: string;
  owner: string;
  attemptsCount: number;
  isRetryEligible: boolean;
  customerContacted: boolean;
  nextAction: string;
  status: 'Open' | 'Retrying' | 'Resolved' | 'Escalated';
  approvedTime: string;
  bankRejectedTime: string;
  exceptionOpenedTime: string;
  // Extended fields for Screen 9
  attempts?: number;
  customerContact?: string;
  originalPaymentRef?: string;
  refundRef?: string;
  lastAttempt?: string;
  resolutionStatus?: string;
}

export interface ReconciliationReport {
  id: string;
  reportName: string;
  source: string;
  date: string;
  recordsCount: number;
  matchedCount: number;
  varianceAmount: number;
  status: 'Review' | 'Complete' | 'Approved' | 'Pending sign-off';
  approvalRequirement: string;
  sourceFilesVerified: boolean;
  amountMismatchCount: number;
  missingProviderIdCount: number;
  timingDifferenceCount: number;
  duplicateCount: number;
  // Extended fields for Screen 10
  reportNumber?: string;
  title?: string;
  category?: string;
  period?: string;
  totalRecords?: number;
  matchedRecords?: number;
  varianceRecords?: number;
  totalValue?: string;
  approvalStatus?: 'Approved' | 'Pending sign-off' | 'Review' | 'Complete';
  sourceFiles?: string[];
}

export interface AuditHistoryEvent {
  id: string;
  time: string;
  actor: string;
  recordId: string;
  action: string;
  beforeValue: string;
  afterValue: string;
  reason: string;
  evidence: string;
  region: string;
  device: string;
  sessionStatus: string;
  caseRef?: string;
  orderRef?: string;
  paymentRef?: string;
  flagged?: boolean;
  // Extended fields for Screen 11
  eventNumber?: string;
  record?: string;
  before?: string;
  after?: string;
  classification?: string;
  session?: string;
  linkedRecord?: string;
}

export interface TeamAgent {
  id: string;
  name: string;
  role: 'Support Agent' | 'Finance Analyst' | 'Team Lead' | 'Support Lead' | string;
  status: 'Online' | 'In call' | 'Away' | 'Offline' | 'Active' | 'Break' | 'Training';
  casesCount: number;
  slaRiskCount: number;
  csat: number;
  workloadPercent: number;
  assignedQueues: string;
  skills: string[];
  shiftHours: string;
  coachingTopic: string;
  // Extended fields for Screen 12
  cases?: number;
  slaRisk?: number;
  workload?: number;
  queues?: string[];
  shift?: string;
  languages?: string[];
  coachingNote?: string;
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  href: string;
  read: boolean;
  // Convenience alias for UI components
  type?: 'danger' | 'warning' | 'success' | 'info';
  timestamp?: string;
}

export interface PortalToast {
  id: string;
  title: string;
  message?: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'danger' | 'error';
  timestamp?: string;
}
