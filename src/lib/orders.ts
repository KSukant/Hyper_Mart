"use client";
import { demoOrders, demoCustomers, deliverySlots } from "@/mocks";
import { useOrders, type PlacedOrder } from "@/store";
import { getProductById } from "./catalog";
import type { Tone } from "@/components/ui/primitives";

export const STATUS: Record<string, [string, Tone]> = {
  placed: ["Placed", "grey"], confirmed: ["Confirmed", "green"], picking: ["Being picked", "green"], packed: ["Packed", "green"],
  out_for_delivery: ["Out for delivery", "lime"], delivered: ["Delivered", "dark"], cancelled: ["Cancelled", "redSoft"], partially_delivered: ["Partly delivered", "lime"],
};


/** Demo orders shaped like placed orders, so one page renders both. */
function fromDemo(): PlacedOrder[] {
  return demoOrders.map((o) => {
    const c = demoCustomers.find((x) => x.id === o.customerId)!;
    const address = c.addresses.find((a) => a.id === o.addressId)!;
    const slot = deliverySlots.find((s) => s.id === o.slot.slotId);
    return { ...o, address, shipments: [{ label: getProductById(o.lines[0].productId)?.department === "food" ? "Fresh and chilled" : "Shipment", date: o.slot.date, slotLabel: slot?.label ?? "", productIds: o.lines.map((l) => l.productId) }] };
  });
}

export function useAllOrders() {
  const placed = useOrders((s) => s.orders);
  return [...placed, ...fromDemo()].sort((a, b) => Date.parse(b.placedAt) - Date.parse(a.placedAt));
}
export const isDemoOrder = (id: string) => demoOrders.some((o) => o.id === id);
