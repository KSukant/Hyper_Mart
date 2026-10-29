"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocation, useMember } from "@/store";
import { getCity, getPincodeArea } from "./catalog";

/** Current time, refreshed every `everyMs`. Same value on server and first client render avoided by AppProvider gating. */
export function useNow(everyMs = 30_000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), everyMs); return () => clearInterval(t); }, [everyMs]);
  return now;
}

/** Everything a shopping component needs about the customer. */
export function useShopper() {
  const { pincode, cityId, warehouseId } = useLocation();
  const isMember = useMember((s) => s.isMember);
  const city = getCity(cityId)!;
  const area = getPincodeArea(pincode);
  return { pincode, cityId, warehouseId, isMember, city, area };
}

const subscribe = (cb: () => void) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); };
export function useMediaWidth() {
  return useSyncExternalStore(subscribe, () => window.innerWidth, () => 1280);
}
