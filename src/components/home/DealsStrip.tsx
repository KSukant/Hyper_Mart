"use client";

import React from "react";
import type { Offer } from "@/types";
import { DealsSection } from "./deals/DealsSection";

interface DealsStripProps {
  deals?: Offer[];
}

/**
 * HyperMart Customer Deals Section (Section 3 — #deals)
 * Reproduces master visual reference with arch showcases, countdown,
 * 3D shopping trolley illustration, top category filter bar, and bottom service-benefit strip.
 */
export function DealsStrip(_props: DealsStripProps) {
  return <DealsSection />;
}

export { DealsSection };
export default DealsStrip;
