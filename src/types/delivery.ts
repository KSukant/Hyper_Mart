// ─────────────────────────────────────────────────────────────
// HyperMart Delivery Partner Portal — Type Definitions
// Derived from: HyperMart_Delivery_Partner_Portal_8_Pages.pdf
// ─────────────────────────────────────────────────────────────

export type PartnerStatus = 'online' | 'offline' | 'on_break';

export interface DeliveryPartner {
  id: string;
  name: string;
  firstName: string;
  avatarUrl: string;
  phone: string;
  status: PartnerStatus;
  rating: number;
  employeeId: string;
  hubId: string;
  hubName: string;
}

// ── Route ────────────────────────────────────────────────────

export type RouteStatus = 'planned' | 'active' | 'completed';

export interface Route {
  id: string;               // "RT-CBE-1024"
  shift: string;            // "Morning shift"
  hub: string;              // "Bengaluru Hub"
  city: string;             // "Bengaluru"
  date: string;             // "Mar 10, 2024"
  status: RouteStatus;
  totalStops: number;
  completedStops: number;
  delayedStops: number;
  totalDistanceKm: number;
  estimatedDurationMin: number;
  totalCodExpected: number;
  codCollected: number;
  estimatedCompletion: string; // "4:30 PM"
}

// ── Delivery Task ────────────────────────────────────────────

export type DeliveryStatus =
  | 'active'
  | 'en_route'
  | 'arrived'
  | 'delivered'
  | 'failed'
  | 'rescheduled';

export type DeliveryStep =
  | 'assigned'
  | 'en_route'
  | 'arrived'
  | 'verify'
  | 'handover'
  | 'payment'
  | 'proof'
  | 'delivered';

export type DeliveryTag = 'cod' | 'fragile' | 'cold_chain' | 'priority';

export interface Package {
  id: string;
  label: string;              // "Package 1"
  category: string;           // "Electronics"
  itemCount: number;
  weightKg?: number;
}

export interface DeliveryTask {
  id: string;                 // "DT-2026-44192"
  orderId: string;            // "HM-88219"
  routeId: string;
  stopNumber: number;
  customerId: string;
  customerName: string;
  customerPhone: string;      // "+91 9876543210" — display masked
  address: string;
  city: string;
  pincode: string;
  deliverySlot: { start: string; end: string };
  packages: Package[];
  codAmount: number;
  tags: DeliveryTag[];
  status: DeliveryStatus;
  stepState: DeliveryStep;
  otp: string;                // 6-digit code — never expose raw to partner in UI
  otpVerified: boolean;
  orderType: 'Standard' | 'Express' | 'Scheduled';
  assignedAt: string;
  enRouteAt?: string;
  arrivedAt?: string;
  deliveredAt?: string;
  proofOfDelivery?: ProofOfDelivery;
  exceptionId?: string;
  scheduledRescheduleSlot?: string;
}

// ── Proof of Delivery ─────────────────────────────────────────

export interface ProofOfDelivery {
  id: string;
  orderId: string;
  taskId: string;
  otpVerified: boolean;
  otpCode: string;
  customerNameConfirmed: boolean;
  gpsLat?: number;
  gpsLng?: number;
  gpsAddress?: string;
  timestamp?: string;
  signatureDataUrl?: string;
  photoUrl?: string;
  receiptUrl?: string;
  submitted: boolean;
  submittedAt?: string;
}

// ── Exception ────────────────────────────────────────────────

export type ExceptionCategory =
  | 'customer'
  | 'address'
  | 'package'
  | 'route'
  | 'payment';

export type ExceptionStatus =
  | 'reported'
  | 'pending'
  | 'awaiting'
  | 'resolved';

export type ExceptionResolution =
  | 'reschedule'
  | 'contact_support'
  | 'return';

export interface ContactAttempt {
  time: string;
  method: 'call' | 'sms' | 'whatsapp';
  result: string;
}

export interface RescheduleSlot {
  id: string;
  label: string;           // "Today, Mar 10, 2024"
  timeRange: string;       // "6:00 PM – 8:00 PM"
  tag?: string;            // "Soonest"
}

export interface DeliveryException {
  id: string;
  orderId: string;
  taskId: string;
  category: ExceptionCategory;
  title: string;           // "Customer unavailable"
  description: string;
  contactAttempts: ContactAttempt[];
  gpsLat: number;
  gpsLng: number;
  gpsAddress: string;
  evidenceTime: string;
  photos: string[];
  resolution?: ExceptionResolution;
  rescheduledSlot?: string;
  status: ExceptionStatus;
  createdAt: string;
}

// ── COD ──────────────────────────────────────────────────────

export type CodTransactionStatus = 'collected' | 'pending' | 'variance';

export interface CodTransaction {
  id: string;
  orderId: string;
  customerName: string;
  expected: number;
  collected: number;
  paymentType: 'cash' | 'upi';
  receiptUrl?: string;
  status: CodTransactionStatus;
}

export type CodSettlementStatus = 'open' | 'closed';

export interface CodSettlement {
  id: string;              // "SET-20240310-1024"
  routeId: string;
  date: string;
  status: CodSettlementStatus;
  handoverLocation: string;
  handoverAddress: string;
  supervisorName: string;
  supervisorTitle: string;
  depositBagNumber: string;
  expectedCash: number;
  actualCash: number;
  variance: number;
  signatureDataUrl?: string;
  confirmedAt?: string;
  transactions: CodTransaction[];
}

// ── Returns ──────────────────────────────────────────────────

export type PackageCondition = 'good' | 'damaged' | 'missing' | 'tampered';

export type ReturnStatus =
  | 'assigned'
  | 'en_route'
  | 'arrived'
  | 'received'
  | 'proof'
  | 'handed_over';

export interface ReturnTask {
  id: string;              // "RET-10032871"
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  pickupSlot: { date: string; start: string; end: string };
  returnReason: string;
  item: string;
  packages: number;
  weightKg: number;
  pickupAddress: string;
  pickupCity: string;
  pickupPincode: string;
  status: ReturnStatus;
  packageCondition?: PackageCondition;
  photos: string[];
  returnLabelBarcode?: string;
  warehouseReceiver?: string;
  handoverId?: string;
  completedAt?: string;
}

// ── Notification ─────────────────────────────────────────────

export interface DeliveryNotification {
  id: string;
  title: string;
  body: string;
  type: 'critical' | 'warning' | 'info';
  read: boolean;
  createdAt: string;
  href?: string;
}

// ── Urgent Item ──────────────────────────────────────────────

export interface UrgentItem {
  id: string;
  type: 'customer_waiting' | 'cod_variance' | 'damaged_package';
  title: string;
  orderId: string;
  detail: string;
  badge: string;
  badgeColor: 'red' | 'amber' | 'orange';
  href: string;
}

// ── Dashboard Summary ────────────────────────────────────────

export interface PartnerDashboard {
  partner: DeliveryPartner;
  route: Route;
  today: {
    assigned: number;
    completed: number;
    remaining: number;
    delayed: number;
    completionPct: number;
  };
  urgentItems: UrgentItem[];
  nextTask: DeliveryTask | null;
  codSummary: { collected: number; pending: number };
  returnCount: number;
  workHours: { onDutyMin: number; remainingMin: number };
  performanceFeedback: string;
}

