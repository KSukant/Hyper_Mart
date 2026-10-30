import { maskPhoneNumber } from '@/types/security';
import { auditService } from './auditService';

export interface OperationsOrder {
  orderId: string;
  orderNumber: string;
  customerReference: string;
  customerPhoneMasked: string;
  deliverySlot: string;
  deliveryAddress: string;
  itemsCount: number;
  fulfilmentStatus: 'Awaiting picking' | 'Picking' | 'Packing' | 'Quality check' | 'Ready for dispatch' | 'Dispatched';
  dispatchStatus: 'Pending' | 'Verified' | 'Handed to courier' | 'En route';
  zone: string;
  priority: 'Standard' | 'Express' | 'Priority Cold-Chain';
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  stockOnHand: number;
  allocated: number;
  available: number;
  reorderPoint: number;
  hubId: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expiring Soon';
}

export interface WarehouseException {
  id: string;
  exceptionNumber: string;
  type: 'Quality Check Failed' | 'Stock Mismatch' | 'Damaged Barcode' | 'Cold-chain Temp Breach';
  orderId: string;
  sku: string;
  station: string;
  loggedAt: string;
  status: 'Investigating' | 'Resolved' | 'Action Required';
}

const INITIAL_OPERATIONS_ORDERS: OperationsOrder[] = [
  {
    orderId: 'HM-88219',
    orderNumber: 'ORD-88219',
    customerReference: 'Meera K.',
    customerPhoneMasked: maskPhoneNumber('+919876543210'),
    deliverySlot: '2026-10-30 08:00-12:00',
    deliveryAddress: '641004, Peelamedu, Coimbatore',
    itemsCount: 5,
    fulfilmentStatus: 'Ready for dispatch',
    dispatchStatus: 'Verified',
    zone: 'Zone A - Ambient',
    priority: 'Express',
  },
  {
    orderId: 'HM-88220',
    orderNumber: 'ORD-88220',
    customerReference: 'Rajesh S.',
    customerPhoneMasked: maskPhoneNumber('+919841234567'),
    deliverySlot: '2026-10-30 14:00-18:00',
    deliveryAddress: '641014, Hopes College, Coimbatore',
    itemsCount: 8,
    fulfilmentStatus: 'Quality check',
    dispatchStatus: 'Pending',
    zone: 'Zone B - Fresh Chill',
    priority: 'Standard',
  },
  {
    orderId: 'HM-88221',
    orderNumber: 'ORD-88221',
    customerReference: 'Kavitha M.',
    customerPhoneMasked: maskPhoneNumber('+919712349876'),
    deliverySlot: '2026-10-30 10:00-12:00',
    deliveryAddress: '641018, Gandhipuram, Coimbatore',
    itemsCount: 3,
    fulfilmentStatus: 'Picking',
    dispatchStatus: 'Pending',
    zone: 'Zone C - Dairy',
    priority: 'Priority Cold-Chain',
  },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    sku: 'SKU-FOD-001',
    name: 'Fortune Sunflower Oil 5L',
    category: 'Groceries',
    stockOnHand: 480,
    allocated: 62,
    available: 418,
    reorderPoint: 100,
    hubId: 'hub_coimbatore',
    status: 'In Stock',
  },
  {
    sku: 'SKU-VEG-002',
    name: 'Fresh Farm Tomatoes 1kg',
    category: 'Produce',
    stockOnHand: 42,
    allocated: 35,
    available: 7,
    reorderPoint: 50,
    hubId: 'hub_coimbatore',
    status: 'Low Stock',
  },
  {
    sku: 'SKU-MLK-003',
    name: 'Amul Toned Milk 1L',
    category: 'Dairy',
    stockOnHand: 18,
    allocated: 12,
    available: 6,
    reorderPoint: 40,
    hubId: 'hub_coimbatore',
    status: 'Expiring Soon',
  },
];

const INITIAL_EXCEPTIONS: WarehouseException[] = [
  {
    id: 'EX-901',
    exceptionNumber: 'EXC-2026-0901',
    type: 'Quality Check Failed',
    orderId: 'HM-88219',
    sku: 'SKU-FOD-001',
    station: 'Station 04 - Packing',
    loggedAt: '25m ago',
    status: 'Resolved',
  },
  {
    id: 'EX-902',
    exceptionNumber: 'EXC-2026-0902',
    type: 'Cold-chain Temp Breach',
    orderId: 'HM-88221',
    sku: 'SKU-MLK-003',
    station: 'Bay 02 - Dairy Cooler',
    loggedAt: '12m ago',
    status: 'Action Required',
  },
];

/**
 * OperationsFulfilmentRepository
 * Strictly bounds Operations-owned domain records.
 * Prohibits full payment transaction data and customer support conversations.
 */
export class OperationsFulfilmentRepository {
  private orders: OperationsOrder[] = [...INITIAL_OPERATIONS_ORDERS];
  private inventory: InventoryItem[] = [...INITIAL_INVENTORY];
  private exceptions: WarehouseException[] = [...INITIAL_EXCEPTIONS];

  getOrders(): OperationsOrder[] {
    return this.orders;
  }

  getInventory(): InventoryItem[] {
    return this.inventory;
  }

  getExceptions(): WarehouseException[] {
    return this.exceptions;
  }

  adjustInventory(sku: string, delta: number, actorId: string, reason: string) {
    const item = this.inventory.find((i) => i.sku === sku);
    if (item) {
      item.stockOnHand += delta;
      item.available += delta;
      auditService.logEvent({
        event: 'inventory_adjustment',
        userId: actorId,
        portal: 'operations',
        recordId: sku,
        fieldsReturned: ['stockOnHand', 'available'],
        reason: `Inventory adjusted by ${delta}: ${reason}`,
      });
    }
    return item;
  }

  getMetrics() {
    return {
      activeOrders: this.orders.length,
      pickingQueue: this.orders.filter((o) => o.fulfilmentStatus === 'Picking').length,
      packingBacklog: this.orders.filter((o) => o.fulfilmentStatus === 'Packing').length,
      readyDispatch: this.orders.filter((o) => o.fulfilmentStatus === 'Ready for dispatch').length,
      criticalExceptions: this.exceptions.filter((e) => e.status === 'Action Required').length,
      hubOnTimeRate: 98.6,
    };
  }
}

export const operationsRepository = new OperationsFulfilmentRepository();

