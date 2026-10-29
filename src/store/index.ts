"use client";
import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import type { CartItem, Order, SavedAddress } from "@/types";
import { DEFAULT_PINCODE } from "@/mocks";
import { getPincodeArea } from "@/lib/catalog";

/** localStorage that never throws (private mode, blocked storage…) */
const safeStorage: StateStorage = {
  getItem: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  setItem: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  removeItem: (k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};
const storage = createJSONStorage(() => safeStorage);

/* ── Location ── */
interface LocationState {
  pincode: string; cityId: string; warehouseId: string; recent: string[];
  setPincode: (pin: string) => { ok: boolean };
}
const def = getPincodeArea(DEFAULT_PINCODE);
export const useLocation = create<LocationState>()(persist((set, get) => ({
  pincode: DEFAULT_PINCODE, cityId: def.cityId!, warehouseId: def.warehouseId!, recent: [DEFAULT_PINCODE],
  setPincode: (pin) => {
    const a = getPincodeArea(pin);
    if (!a.serviceable || !a.cityId || !a.warehouseId) return { ok: false };
    set({ pincode: pin, cityId: a.cityId, warehouseId: a.warehouseId, recent: [pin, ...get().recent.filter((r) => r !== pin)].slice(0, 3) });
    return { ok: true };
  },
}), { name: "hm-location", storage, skipHydration: true }));

/* ── Member ── */
interface MemberState { isMember: boolean; setMember: (v: boolean) => void }
export const useMember = create<MemberState>()(persist((set) => ({
  isMember: false, setMember: (v) => set({ isMember: v }),
}), { name: "hm-member", storage, skipHydration: true }));

/* ── Cart ── */
export const lineKey = (i: Pick<CartItem, "productId" | "variantKey" | "grade" | "ripeness">) =>
  [i.productId, i.variantKey, i.grade ?? "", i.ripeness ?? ""].join("~");
interface CartState {
  items: CartItem[]; saved: CartItem[];
  add: (item: CartItem) => void; setQty: (key: string, qty: number) => void; remove: (key: string) => void;
  update: (key: string, patch: Partial<CartItem>) => void; saveForLater: (key: string) => void; moveToCart: (key: string) => void; removeSaved: (key: string) => void; clear: () => void;
}
export const useCart = create<CartState>()(persist((set, get) => ({
  items: [], saved: [],
  add: (item) => {
    const k = lineKey(item); const ex = get().items.find((i) => lineKey(i) === k);
    if (ex) set({ items: get().items.map((i) => (lineKey(i) === k ? { ...i, qty: +(i.qty + item.qty).toFixed(2) } : i)) });
    else set({ items: [...get().items, item] });
  },
  setQty: (key, qty) => set({ items: qty <= 0 ? get().items.filter((i) => lineKey(i) !== key) : get().items.map((i) => (lineKey(i) === key ? { ...i, qty } : i)) }),
  remove: (key) => set({ items: get().items.filter((i) => lineKey(i) !== key) }),
  update: (key, patch) => {
    const updated = get().items.map((i) => (lineKey(i) === key ? { ...i, ...patch } : i));
    const merged: CartItem[] = [];
    for (const item of updated) {
      const k = lineKey(item);
      const ex = merged.find((m) => lineKey(m) === k);
      if (ex) {
        ex.qty = +(ex.qty + item.qty).toFixed(2);
      } else {
        merged.push({ ...item });
      }
    }
    set({ items: merged });
  },
  saveForLater: (key) => {
    const it = get().items.find((i) => lineKey(i) === key);
    if (it) {
      set({
        items: get().items.filter((i) => lineKey(i) !== key),
        saved: [...get().saved.filter((s) => lineKey(s) !== key), it],
      });
    }
  },
  moveToCart: (key) => {
    const it = get().saved.find((i) => lineKey(i) === key);
    if (it) {
      set({ saved: get().saved.filter((i) => lineKey(i) !== key) });
      get().add(it);
    }
  },
  removeSaved: (key) => set({ saved: get().saved.filter((i) => lineKey(i) !== key) }),
  clear: () => set({ items: [] }),
}), { name: "hm-cart", storage, skipHydration: true }));

/* ── Orders placed in this browser ── */
export interface PlacedOrder extends Order {
  shipments: { label: string; date: string; slotLabel: string; productIds: string[] }[];
  address: SavedAddress; gift?: { recipientName: string; message: string; hidePrice: boolean };
  installationSlot?: string; codConfirmation?: boolean; refund?: { amount: number; expected: string; status: string };
}
interface OrdersState { orders: PlacedOrder[]; addOrder: (o: PlacedOrder) => void; updateOrder: (id: string, patch: Partial<PlacedOrder>) => void }
export const useOrders = create<OrdersState>()(persist((set, get) => ({
  orders: [],
  addOrder: (o) => set({ orders: [o, ...get().orders] }),
  updateOrder: (id, patch) => set({ orders: get().orders.map((o) => (o.id === id ? { ...o, ...patch } : o)) }),
}), { name: "hm-orders", storage, skipHydration: true }));

/* ── Mock sign-in (PROJECT.md §11) ── */
interface AuthState { customerId: string | null; signIn: (id: string) => void; signOut: () => void }
export const useAuth = create<AuthState>()(persist((set) => ({
  customerId: null, signIn: (id) => set({ customerId: id }), signOut: () => set({ customerId: null }),
}), { name: "hm-auth", storage, skipHydration: true }));

/* ── Wishlist ── */
interface WishState { ids: string[]; toggle: (id: string) => void }
export const useWish = create<WishState>()(persist((set, get) => ({
  ids: [], toggle: (id) => set({ ids: get().ids.includes(id) ? get().ids.filter((x) => x !== id) : [...get().ids, id] }),
}), { name: "hm-wish", storage, skipHydration: true }));

export const rehydrateAll = () => Promise.all([useLocation, useMember, useCart, useOrders, useAuth, useWish].map((s) => s.persist.rehydrate()));
