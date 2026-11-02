import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WarehouseFacility,
  WarehouseUser,
  WarehouseOrder,
  WarehouseBin,
  StockMovement,
  StockAdjustment,
  StockTakeCount,
  PickingWave,
  PackingStation,
  QualityInspection,
  WarehouseException,
  CourierPartner,
  CourierHandoverBatch,
  WarehouseAuditEvent,
  WarehouseRole,
} from "@/types/warehouse";
import {
  WAREHOUSE_FACILITIES,
  WAREHOUSE_USERS,
  INITIAL_ORDERS,
  INITIAL_BINS,
  INITIAL_MOVEMENTS,
  INITIAL_ADJUSTMENTS,
  INITIAL_STOCK_TAKE,
  INITIAL_PICKING_WAVES,
  INITIAL_PACKING_STATIONS,
  INITIAL_QC_INSPECTIONS,
  INITIAL_EXCEPTIONS,
  COURIER_PARTNERS,
  INITIAL_COURIER_BATCHES,
  INITIAL_AUDIT_LOGS,
} from "@/mocks/warehouseData";

interface WarehouseState {
  // Facility & Active Identity
  activeFacility: WarehouseFacility;
  currentFacility: WarehouseFacility;
  facilities: WarehouseFacility[];
  currentUser: WarehouseUser;
  availableUsers: WarehouseUser[];
  availableFacilities: WarehouseFacility[];
  switchFacility: (id: string) => void;
  switchUser: (id: string) => void;
  switchRole: (role: WarehouseRole) => void;

  // Master Operational Collections
  orders: WarehouseOrder[];
  bins: WarehouseBin[];
  movements: StockMovement[];
  adjustments: StockAdjustment[];
  stockAdjustments: StockAdjustment[];
  stockTakeCounts: StockTakeCount[];
  pickingWaves: PickingWave[];
  waves: PickingWave[];
  packingStations: PackingStation[];
  qcInspections: QualityInspection[];
  exceptions: WarehouseException[];
  courierPartners: CourierPartner[];
  courierBatches: CourierHandoverBatch[];
  auditLogs: WarehouseAuditEvent[];
  auditEvents: WarehouseAuditEvent[];
  pickTasks: any[];
  packTasks: any[];

  // Action Methods
  pickItem: (orderId: string, sku: string, qty?: number) => void;
  completePickTask: (orderId: string, toteId?: string) => void;
  packItem: (orderId: string, sku: string, qty?: number) => void;
  completePackTask: (orderId: string, packageIdOrBox?: string, cartonSizeOrAwb?: any, materials?: any) => void;
  recordQCInspection: (inspection: any) => void;
  createStockMovement: (movement: any) => void;
  createStockAdjustment: (adjustment: any) => void;
  recordStockTakeScan: (binLocation: string, countedQty: number) => void;
  createException: (ex: any) => void;
  resolveException: (id: string, notes: string) => void;
  createCourierBatch: (courierPartnerOrObj: any, dockNumber?: string, vehicleNumber?: string, driverName?: string, driverPhone?: string, packageIds?: string[]) => void;
  dispatchCourierBatch: (batchId: string) => void;
  addAuditEvent: (moduleOrObj: any, action?: string, refId?: string, details?: string, status?: "Success" | "Warning" | "Override") => void;
  resetAllToDefault: () => void;
}

function mapOrdersToPickTasks(orders: WarehouseOrder[]) {
  return orders.map((ord) => ({
    id: `PICK-${ord.id.replace("ord-", "")}`,
    orderId: ord.id,
    waveId: "WV-8920",
    zone: ord.items[0]?.binLocation ? `Zone ${ord.items[0].binLocation.charAt(0)}` : "Zone A",
    priority: ord.priority.toUpperCase(),
    assignedToName: ord.assignedPicker || "Kiran Patel",
    toteBarcode: ord.toteId || "TOTE-401",
    status: ord.status === "picking" ? "IN_PROGRESS" : ord.status === "picked" ? "COMPLETED" : "PENDING",
    items: ord.items.map((i) => ({
      sku: i.sku,
      barcode: i.barcode,
      productName: i.name,
      image: i.image,
      binLocation: i.binLocation,
      quantity: i.requiredQty,
      quantityPicked: i.pickedQty,
    })),
  }));
}

function mapOrdersToPackTasks(orders: WarehouseOrder[]) {
  return orders.map((ord) => ({
    id: `PACK-${ord.id.replace("ord-", "")}`,
    orderId: ord.id,
    stationId: "P-04",
    toteBarcode: ord.toteId || "TOTE-401",
    recommendedBoxType: ord.cartonSize || "Box M",
    status: ord.status === "packing" ? "IN_PROGRESS" : ord.status === "packed" ? "COMPLETED" : "PENDING",
    items: ord.items.map((i) => ({
      sku: i.sku,
      barcode: i.barcode,
      productName: i.name,
      image: i.image,
      quantity: i.requiredQty,
      quantityPacked: i.packedQty,
    })),
  }));
}

export const useWarehouseStore = create<WarehouseState>()(
  persist(
    (set, get) => ({
      activeFacility: WAREHOUSE_FACILITIES[0],
      currentFacility: WAREHOUSE_FACILITIES[0],
      facilities: WAREHOUSE_FACILITIES,
      currentUser: WAREHOUSE_USERS[0],
      availableUsers: WAREHOUSE_USERS,
      availableFacilities: WAREHOUSE_FACILITIES,

      orders: INITIAL_ORDERS,
      bins: INITIAL_BINS,
      movements: INITIAL_MOVEMENTS,
      adjustments: INITIAL_ADJUSTMENTS,
      stockAdjustments: INITIAL_ADJUSTMENTS,
      stockTakeCounts: INITIAL_STOCK_TAKE,
      pickingWaves: INITIAL_PICKING_WAVES,
      waves: INITIAL_PICKING_WAVES,
      packingStations: INITIAL_PACKING_STATIONS,
      qcInspections: INITIAL_QC_INSPECTIONS,
      exceptions: INITIAL_EXCEPTIONS,
      courierPartners: COURIER_PARTNERS,
      courierBatches: INITIAL_COURIER_BATCHES,
      auditLogs: INITIAL_AUDIT_LOGS,
      auditEvents: INITIAL_AUDIT_LOGS,
      pickTasks: mapOrdersToPickTasks(INITIAL_ORDERS),
      packTasks: mapOrdersToPackTasks(INITIAL_ORDERS),

      switchFacility: (id) => {
        const fac = get().availableFacilities.find((f) => f.id === id);
        if (fac) {
          set({ activeFacility: fac, currentFacility: fac });
          get().addAuditEvent("Auth", "SWITCH_FACILITY", fac.code, `Switched active warehouse to ${fac.name}`);
        }
      },

      switchUser: (id) => {
        const u = get().availableUsers.find((usr) => usr.id === id);
        if (u) {
          set({ currentUser: u });
          get().addAuditEvent("Auth", "SWITCH_USER", u.employeeBadge, `Switched session to ${u.name} (${u.roleLabel})`);
        }
      },

      switchRole: (role) => {
        const u = get().availableUsers.find((usr) => usr.role === role);
        if (u) {
          set({ currentUser: u });
          get().addAuditEvent("Auth", "SWITCH_ROLE", role, `Role context shifted to ${u.roleLabel}`);
        }
      },

      pickItem: (orderId, sku, qty = 1) => {
        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== orderId && ord.id !== orderId.replace("PICK-", "ord-")) return ord;
            const updatedItems = ord.items.map((it) => {
              if (it.sku !== sku) return it;
              const newPicked = Math.min(it.requiredQty, it.pickedQty + qty);
              return {
                ...it,
                pickedQty: newPicked,
                status: newPicked >= it.requiredQty ? ("picked" as const) : ("pending" as const),
              };
            });
            const allPicked = updatedItems.every((it) => it.pickedQty >= it.requiredQty);
            return {
              ...ord,
              items: updatedItems,
              status: allPicked ? ("picked" as const) : ("picking" as const),
            };
          });
          return {
            orders: updatedOrders,
            pickTasks: mapOrdersToPickTasks(updatedOrders),
            packTasks: mapOrdersToPackTasks(updatedOrders),
          };
        });
        get().addAuditEvent("Picking", "ITEM_PICKED", sku, `Picked ${qty} unit(s) for order ${orderId}`);
      },

      completePickTask: (orderId, toteId = "TOTE-401") => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== orderId && ord.id !== orderId.replace("PICK-", "ord-")) return ord;
            return {
              ...ord,
              status: "picked" as const,
              toteId,
              timeline: [
                ...ord.timeline,
                { step: `Picking Completed (Tote ${toteId})`, timestamp: now, completed: true, actor: get().currentUser.name },
              ],
            };
          });
          return {
            orders: updatedOrders,
            pickTasks: mapOrdersToPickTasks(updatedOrders),
            packTasks: mapOrdersToPackTasks(updatedOrders),
          };
        });
        get().addAuditEvent("Picking", "PICK_WAVE_COMPLETE", orderId, `Tote ${toteId} handed to packing`);
      },

      packItem: (orderId, sku, qty = 1) => {
        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== orderId && ord.id !== orderId.replace("PACK-", "ord-")) return ord;
            return {
              ...ord,
              items: ord.items.map((it) => {
                if (it.sku !== sku) return it;
                const newPacked = Math.min(it.pickedQty, it.packedQty + qty);
                return {
                  ...it,
                  packedQty: newPacked,
                  status: newPacked >= it.requiredQty ? ("packed" as const) : it.status,
                };
              }),
            };
          });
          return {
            orders: updatedOrders,
            pickTasks: mapOrdersToPickTasks(updatedOrders),
            packTasks: mapOrdersToPackTasks(updatedOrders),
          };
        });
        get().addAuditEvent("Packing", "ITEM_VERIFIED_IN_BOX", sku, `Verified in packing box for order ${orderId}`);
      },

      completePackTask: (orderId, packageIdOrBox = "PKG-88210", cartonSizeOrAwb = "Box M", materials = ["Kraft Wrap", "Tamper Tape"]) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const boxSize = typeof cartonSizeOrAwb === "string" && cartonSizeOrAwb.startsWith("BOX_")
          ? cartonSizeOrAwb.replace("BOX_", "Box ")
          : typeof cartonSizeOrAwb === "string" ? cartonSizeOrAwb : "Box M";

        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== orderId && ord.id !== orderId.replace("PACK-", "ord-")) return ord;
            return {
              ...ord,
              status: "qc_pending" as const,
              packageId: packageIdOrBox,
              cartonSize: boxSize as any,
              packingMaterials: Array.isArray(materials) ? materials : ["Kraft Paper"],
              timeline: [
                ...ord.timeline,
                { step: `Packed & Sealed (${boxSize})`, timestamp: now, completed: true, actor: get().currentUser.name },
                { step: "Queued for Quality Inspection", completed: false },
              ],
            };
          });
          return {
            orders: updatedOrders,
            pickTasks: mapOrdersToPickTasks(updatedOrders),
            packTasks: mapOrdersToPackTasks(updatedOrders),
          };
        });
        get().addAuditEvent("Packing", "PACK_SEALED", packageIdOrBox, `Carton sealed (${boxSize}) for order ${orderId}`);
      },

      recordQCInspection: (inspectionData) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const outcome = inspectionData.result === "PASSED" || inspectionData.outcome === "passed" ? "passed" : "rejected";
        const newInsp: QualityInspection = {
          ...inspectionData,
          id: `qc-insp-${Date.now()}`,
          timestamp: now,
          inspector: inspectionData.inspectorName || inspectionData.inspector || get().currentUser.name,
          outcome,
        };

        set((state) => {
          const updatedOrders = state.orders.map((ord) => {
            if (ord.id !== inspectionData.orderId) return ord;
            const newStatus = outcome === "passed" ? ("handover_ready" as const) : ("qc_rejected" as const);
            return {
              ...ord,
              status: newStatus,
              timeline: [
                ...ord.timeline,
                {
                  step: outcome === "passed" ? "QC Passed & Release Authorized" : `QC Rejected (${inspectionData.defectReason || "Defect"})`,
                  timestamp: now,
                  completed: true,
                  actor: get().currentUser.name,
                },
              ],
            };
          });
          return {
            qcInspections: [newInsp, ...state.qcInspections],
            orders: updatedOrders,
            pickTasks: mapOrdersToPickTasks(updatedOrders),
            packTasks: mapOrdersToPackTasks(updatedOrders),
          };
        });

        get().addAuditEvent(
          "Quality",
          outcome === "passed" ? "QC_APPROVED" : "QC_REJECTED",
          inspectionData.packageId || inspectionData.orderId,
          outcome === "passed" ? "Inspection passed; ready for handover" : `Rejected: ${inspectionData.defectReason || "Defect"}`,
          outcome === "passed" ? "Success" : "Warning"
        );
      },

      createStockMovement: (m) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newMov: StockMovement = {
          ...m,
          id: `MOV-${Date.now().toString().slice(-4)}`,
          timestamp: `Today, ${now}`,
          operator: get().currentUser.name,
        };

        set((state) => ({
          movements: [newMov, ...state.movements],
          bins: state.bins.map((b) => {
            if (b.binCode === m.sourceBin) {
              return { ...b, currentQty: Math.max(0, b.currentQty - m.qty) };
            }
            if (b.binCode === m.destBin) {
              return { ...b, currentQty: b.currentQty + m.qty };
            }
            return b;
          }),
        }));

        get().addAuditEvent("Inventory", "BIN_TRANSFER", m.sku, `Moved ${m.qty} from ${m.sourceBin} to ${m.destBin}`);
      },

      createStockAdjustment: (adj) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const delta = adj.delta !== undefined ? adj.delta : ((adj.adjustedQuantity || adj.physicalQty || 0) - (adj.systemQuantity || adj.systemQty || 0));
        const newAdj: StockAdjustment = {
          ...adj,
          id: `ADJ-${Date.now().toString().slice(-4)}`,
          timestamp: `Today, ${now}`,
          createdAt: `Today, ${now}`,
          adjustedBy: adj.adjustedBy || get().currentUser.name,
          binLocation: adj.binId || adj.binLocation || "A-01-01",
          binId: adj.binId || adj.binLocation || "A-01-01",
          systemQty: adj.systemQuantity || adj.systemQty || 50,
          physicalQty: adj.adjustedQuantity || adj.physicalQty || 50,
          variance: delta,
          delta,
          varianceValue: Math.abs(delta * 350),
          status: "Approved",
        };

        set((state) => {
          const updatedAdjustments = [newAdj, ...state.adjustments];
          return {
            adjustments: updatedAdjustments,
            stockAdjustments: updatedAdjustments,
            bins: state.bins.map((b) => {
              if ((b.binCode === newAdj.binLocation || b.binCode === newAdj.binId) && b.sku === adj.sku) {
                return { ...b, currentQty: newAdj.physicalQty! };
              }
              return b;
            }),
          };
        });

        get().addAuditEvent("Inventory", "STOCK_ADJUSTMENT", adj.sku, `Adjusted ${newAdj.binLocation} by ${delta} units`);
      },

      recordStockTakeScan: (binLocation, countedQty) => {
        set((state) => ({
          stockTakeCounts: state.stockTakeCounts.map((stc) => {
            if (stc.binLocation !== binLocation) return stc;
            const variance = countedQty - stc.expectedQty;
            return {
              ...stc,
              countedQty,
              variance,
              status: variance === 0 ? "matched" : "variance",
            };
          }),
        }));
        get().addAuditEvent("Inventory", "CYCLE_COUNT_LOGGED", binLocation, `Physical count recorded: ${countedQty}`);
      },

      createException: (exData) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newEx: WarehouseException = {
          ...exData,
          id: `exc-${Date.now().toString().slice(-4)}`,
          caseNumber: `EXC-2026-${Date.now().toString().slice(-4)}`,
          title: exData.description || exData.title || "Floor Exception",
          category: exData.category || "Short Pick",
          severity: exData.severity || "Medium",
          raisedBy: exData.raisedByName || exData.raisedBy || get().currentUser.name,
          raisedByName: exData.raisedByName || exData.raisedBy || get().currentUser.name,
          assignedTo: exData.assignedTo || "Priya Sharma (Supervisor)",
          assignedToName: exData.assignedTo || "Priya Sharma (Supervisor)",
          createdAt: `Today, ${now}`,
          slaDeadline: "Within 30 mins",
          status: "open",
          description: exData.description || "",
        };

        set((state) => ({
          exceptions: [newEx, ...state.exceptions],
        }));

        get().addAuditEvent("Exceptions", "EXCEPTION_RAISED", newEx.caseNumber || newEx.id, `${newEx.category}: ${newEx.description}`, "Warning");
      },

      resolveException: (id, notes) => {
        set((state) => ({
          exceptions: state.exceptions.map((ex) => {
            if (ex.id !== id) return ex;
            return {
              ...ex,
              status: "resolved",
              resolutionNotes: notes,
            };
          }),
        }));
        get().addAuditEvent("Exceptions", "EXCEPTION_RESOLVED", id, `Resolved with note: ${notes}`);
      },

      createCourierBatch: (courierPartnerOrObj, dockNumber, vehicleNumber, driverName, driverPhone, packageIds) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let newBatch: CourierHandoverBatch;

        if (typeof courierPartnerOrObj === "object" && courierPartnerOrObj !== null) {
          newBatch = {
            id: `batch-${Date.now().toString().slice(-4)}`,
            batchNumber: courierPartnerOrObj.trackingManifestId || `HB-2026-${Date.now().toString().slice(-4)}`,
            courierPartner: courierPartnerOrObj.carrier || courierPartnerOrObj.courierPartner || "BlueDart Express",
            carrier: courierPartnerOrObj.carrier || courierPartnerOrObj.courierPartner || "BlueDart Express",
            dockNumber: courierPartnerOrObj.dockNumber || "Dock 2",
            vehicleNumber: courierPartnerOrObj.vehicleNumber || "KA-01-MJ-8821",
            driverName: courierPartnerOrObj.driverName || "Driver",
            driverPhone: "+91 98765 43210",
            parcelCount: courierPartnerOrObj.parcelCount || 24,
            scannedCount: courierPartnerOrObj.parcelCount || 24,
            status: "staged",
            scheduledTime: now,
            manifestSigned: false,
            packageIds: [],
            trackingManifestId: courierPartnerOrObj.trackingManifestId || `MNF-${Date.now().toString().slice(-6)}`,
            totalWeightKg: courierPartnerOrObj.totalWeightKg || 48.5,
          };
        } else {
          newBatch = {
            id: `batch-${Date.now().toString().slice(-4)}`,
            batchNumber: `HB-2026-${Date.now().toString().slice(-4)}`,
            courierPartner: courierPartnerOrObj,
            carrier: courierPartnerOrObj,
            dockNumber: dockNumber || "Dock 1",
            vehicleNumber: vehicleNumber || "KA-01-XX-0000",
            driverName: driverName || "Driver",
            driverPhone: driverPhone || "+91 98765 43210",
            parcelCount: packageIds?.length || 1,
            scannedCount: packageIds?.length || 1,
            status: "staged",
            scheduledTime: now,
            manifestSigned: false,
            packageIds: packageIds || [],
          };
        }

        set((state) => ({
          courierBatches: [newBatch, ...state.courierBatches],
        }));

        get().addAuditEvent("Courier", "BATCH_CREATED", newBatch.batchNumber || newBatch.id, `Staged parcels for ${newBatch.carrier || newBatch.courierPartner}`);
      },

      dispatchCourierBatch: (batchId) => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const batch = get().courierBatches.find((b) => b.id === batchId);

        set((state) => ({
          courierBatches: state.courierBatches.map((b) => {
            if (b.id !== batchId) return b;
            return {
              ...b,
              status: "dispatched",
              dispatchedTime: now,
              dispatchedAt: new Date().toISOString(),
              manifestSigned: true,
            };
          }),
          orders: state.orders.map((ord) => {
            if (batch?.packageIds?.includes(ord.packageId || "")) {
              return {
                ...ord,
                status: "dispatched",
                timeline: [
                  ...ord.timeline,
                  { step: `Dispatched via ${batch.courierPartner || batch.carrier}`, timestamp: now, completed: true, actor: get().currentUser.name },
                ],
              };
            }
            return ord;
          }),
        }));

        get().addAuditEvent("Courier", "BATCH_DISPATCHED", batchId, `Confirmed handover & truck departure`);
      },

      addAuditEvent: (moduleOrObj, action, refId, details, status = "Success") => {
        const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        let newEvent: WarehouseAuditEvent;

        if (typeof moduleOrObj === "object" && moduleOrObj !== null) {
          newEvent = {
            id: `aud-${Date.now()}`,
            timestamp: `Today, ${now}`,
            userId: moduleOrObj.userId || get().currentUser.id,
            userName: moduleOrObj.userName || get().currentUser.name,
            role: moduleOrObj.role || get().currentUser.roleLabel,
            module: moduleOrObj.module || "Picking",
            action: moduleOrObj.action || "EVENT",
            refId: moduleOrObj.targetEntity || moduleOrObj.refId || "SYS",
            details: moduleOrObj.details || "",
            status: moduleOrObj.status || "Success",
          };
        } else {
          newEvent = {
            id: `aud-${Date.now()}`,
            timestamp: `Today, ${now}`,
            userId: get().currentUser.id,
            userName: get().currentUser.name,
            role: get().currentUser.roleLabel,
            module: moduleOrObj,
            action: action || "ACTION",
            refId: refId || "N/A",
            details: details || "",
            status,
          };
        }

        set((state) => {
          const updatedLogs = [newEvent, ...state.auditLogs.slice(0, 99)];
          return {
            auditLogs: updatedLogs,
            auditEvents: updatedLogs,
          };
        });
      },

      resetAllToDefault: () => {
        set({
          activeFacility: WAREHOUSE_FACILITIES[0],
          currentFacility: WAREHOUSE_FACILITIES[0],
          facilities: WAREHOUSE_FACILITIES,
          currentUser: WAREHOUSE_USERS[0],
          orders: INITIAL_ORDERS,
          bins: INITIAL_BINS,
          movements: INITIAL_MOVEMENTS,
          adjustments: INITIAL_ADJUSTMENTS,
          stockAdjustments: INITIAL_ADJUSTMENTS,
          stockTakeCounts: INITIAL_STOCK_TAKE,
          pickingWaves: INITIAL_PICKING_WAVES,
          waves: INITIAL_PICKING_WAVES,
          packingStations: INITIAL_PACKING_STATIONS,
          qcInspections: INITIAL_QC_INSPECTIONS,
          exceptions: INITIAL_EXCEPTIONS,
          courierBatches: INITIAL_COURIER_BATCHES,
          auditLogs: INITIAL_AUDIT_LOGS,
          auditEvents: INITIAL_AUDIT_LOGS,
          pickTasks: mapOrdersToPickTasks(INITIAL_ORDERS),
          packTasks: mapOrdersToPackTasks(INITIAL_ORDERS),
        });
      },
    }),
    {
      name: "hypermart-warehouse-store",
    }
  )
);
