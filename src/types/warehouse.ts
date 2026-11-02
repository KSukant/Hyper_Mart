export type WarehouseRole =
  | "manager"
  | "supervisor"
  | "picker"
  | "packer"
  | "quality_checker"
  | "inventory_officer"
  | "courier_operator";

export interface WarehouseFacility {
  id: string;
  name: string;
  code: string;
  city: string;
  timezone: string;
  docks: number;
  totalAisles: number;
}

export interface WarehouseUser {
  id: string;
  name: string;
  email: string;
  role: WarehouseRole;
  roleLabel: string;
  avatar: string;
  employeeBadge: string;
  shift: string;
  station: string;
  battery: number;
  wifi: "excellent" | "good" | "fair";
}

export interface WarehouseOrderItem {
  sku: string;
  barcode: string;
  name: string;
  image: string;
  requiredQty: number;
  pickedQty: number;
  packedQty: number;
  binLocation: string;
  unitPrice: number;
  status: "pending" | "picked" | "packed" | "exception";
}

export type OrderWorkflowStatus =
  | "received"
  | "picking"
  | "picked"
  | "packing"
  | "packed"
  | "qc_pending"
  | "qc_approved"
  | "qc_rejected"
  | "handover_ready"
  | "dispatched"
  | "delivered";

export interface WarehouseOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  deliveryAddress: string;
  orderDate: string;
  deliveryDeadline: string;
  priority: "Express" | "High" | "Standard";
  orderType: "B2C E-Commerce" | "HyperLocal 15-Min" | "Cold-Chain Fresh";
  status: OrderWorkflowStatus;
  items: WarehouseOrderItem[];
  totalUnits: number;
  totalValue: number;
  toteId?: string;
  packageId?: string;
  cartonSize?: "Box S" | "Box M" | "Box L" | "Insulated Cold Bag";
  packingMaterials?: string[];
  assignedPicker?: string;
  assignedPacker?: string;
  assignedQC?: string;
  courierPartner?: string;
  awbTracking?: string;
  specialInstructions?: string;
  timeline: { step: string; timestamp?: string; completed: boolean; actor?: string }[];
}

export interface WarehouseBin {
  binCode: string; // e.g. A-01-01
  aisle: string;   // Aisle A
  level: number;   // 1 to 5
  zone: "Zone A (Ambient)" | "Zone B (FMCG)" | "Zone C (Bulk)" | "Cold Room (2-8°C)";
  sku: string;
  productName: string;
  image: string;
  currentQty: number;
  maxCapacity: number;
  status: "normal" | "low_stock" | "full" | "quarantine";
}

export interface StockMovement {
  id: string;
  timestamp: string;
  operator: string;
  sourceBin: string;
  destBin: string;
  sku: string;
  productName: string;
  image: string;
  qty: number;
  reason: "Replenishment" | "Damaged Isolation" | "Zone Optimization" | "Cross-Dock";
  status: "Completed" | "In-Transit" | "Pending";
}

export interface StockAdjustment {
  id: string;
  timestamp: string;
  sku: string;
  productName: string;
  image?: string;
  binLocation?: string;
  binId?: string;
  systemQty?: number;
  physicalQty?: number;
  systemQuantity?: number;
  adjustedQuantity?: number;
  variance?: number;
  varianceValue?: number;
  delta?: number;
  reasonCode?: "Cycle Count Delta" | "Damage in Transit" | "Expired Batch" | "Packaging Burst" | "Theft / Loss" | string;
  reason?: "DAMAGED" | "CYCLE_COUNT_VARIANCE" | "FOUND_STOCK" | "EXPIRED" | "THEFT_LOSS" | string;
  adjustedBy: string;
  approvedBy?: string;
  status?: "Approved" | "Pending Approval" | "Rejected" | string;
  evidencePhoto?: string;
  notes?: string;
  createdAt?: string;
}

export interface StockTakeCount {
  id: string;
  sessionId: string;
  binLocation: string;
  sku: string;
  productName: string;
  expectedQty: number;
  countedQty: number;
  variance: number;
  status: "matched" | "variance" | "pending";
}

export interface PickingWave {
  id: string;
  waveNumber: string;
  zone: string;
  orderCount: number;
  totalLines: number;
  pickedLines: number;
  assignedPicker: string;
  priority: "Express" | "High" | "Standard";
  dueTime: string;
  status: "queued" | "in_progress" | "completed";
}

export interface PackingStation {
  id: string;
  name: string;
  packerName: string;
  isOnline: boolean;
  queuedTotes: number;
  completedToday: number;
  avgPackSeconds: number;
  currentOrderId?: string;
  boxSupplies: {
    boxS: number;
    boxM: number;
    boxL: number;
    tapeRolls: number;
    bubbleWrapMeters: number;
  };
}

export interface QualityInspection {
  id: string;
  orderId: string;
  packageId?: string;
  inspector?: string;
  inspectorName?: string;
  timestamp: string;
  cartonIntegrity?: boolean;
  barcodeReadable?: boolean;
  securitySealIntact?: boolean;
  weightExpectedGrams?: number;
  weightActualGrams?: number;
  outcome?: "passed" | "rejected" | string;
  result?: "PASSED" | "REJECTED" | string;
  defectReason?: "Broken Seal" | "Barcode Unreadable" | "Crushed Box" | "Wrong Item" | "Weight Mismatch" | string;
  remarks?: string;
  notes?: string;
  photoEvidence?: string;
}

export interface WarehouseException {
  id: string;
  caseNumber?: string;
  title?: string;
  category: "Short Pick" | "Damaged Product" | "Cold Chain Excursion" | "Missing Tote" | "Wrong Barcode" | "Address Anomaly" | string;
  severity: "Critical" | "High" | "Medium" | "Low" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | string;
  orderId?: string;
  sku?: string;
  binId?: string;
  raisedBy?: string;
  raisedByName?: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt?: string;
  slaDeadline?: string;
  status?: "open" | "in_progress" | "resolved" | "RESOLVED" | string;
  description: string;
  resolutionNotes?: string;
}

export interface CourierPartner {
  id: string;
  name: string;
  code: string;
  logo: string;
  contactPerson: string;
  contactPhone: string;
  activeShipments: number;
  onTimeRate: number;
  avgTransitHours: number;
  slaBreaches: number;
  status: "active" | "inactive";
  docksAssigned: string[];
}

export interface CourierHandoverBatch {
  id: string;
  batchNumber?: string;
  courierPartner?: string;
  carrier?: string;
  dockNumber: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone?: string;
  parcelCount: number;
  scannedCount?: number;
  status: "staged" | "loading" | "dispatched" | "STAGED" | "LOADING" | "DISPATCHED" | string;
  scheduledTime?: string;
  dispatchedTime?: string;
  dispatchedAt?: string;
  estimatedDeparture?: string;
  manifestSigned?: boolean;
  packageIds?: string[];
  trackingManifestId?: string;
  totalWeightKg?: number;
}

export type CourierBatch = CourierHandoverBatch;

export interface WarehouseAuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  module: "Picking" | "Packing" | "Quality" | "Inventory" | "Courier" | "Exceptions" | "Auth" | string;
  action: string;
  refId: string;
  targetEntity?: string;
  details: string;
  status: "Success" | "Warning" | "Override" | string;
}
