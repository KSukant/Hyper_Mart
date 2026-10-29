// PROJECT.md §6 — only badges from the product's own department, max 3.
import type { Product } from "@/types";
import { formatDate } from "./format";

export interface Badge { label: string; tone: "food" | "fashion" | "beauty" | "electronics" }

export function getBadges(p: Product, ctx: { bestBefore?: string } = {}): Badge[] {
  const a = p.attrs; const out: string[] = [];
  switch (a.department) {
    case "food":
      if (a.grades?.length) out.push("Grade A");
      if (ctx.bestBefore) out.push(`Best before ${formatDate(ctx.bestBefore)}`);
      if (a.storage !== "ambient") out.push(a.storage === "chilled" ? "Chilled" : "Frozen");
      if (a.regional) out.push("Regional speciality");
      if (a.subscribable) out.push("Subscribe");
      out.push(a.vegMark === "veg" ? "Veg" : a.vegMark === "egg" ? "Egg" : "Non-veg");
      break;
    case "fashion":
      out.push(`${a.sizes.length > 1 ? `${a.sizes[0]}–${a.sizes[a.sizes.length - 1]}` : a.sizes[0]}`);
      out.push(a.fabric.split(",")[0]);
      if (a.rentable) out.push("Rent available");
      if (a.clearance) out.push("Clearance");
      break;
    case "beauty":
      if (a.shades?.length) out.push(`${a.shades.length} shades`);
      if (a.skinTypes?.length) out.push(`For ${a.skinTypes.slice(0, 2).join(", ")} skin`);
      if (a.sampleProductId) out.push("Mini available");
      if (a.heatSensitive) out.push("Heat-sensitive");
      break;
    case "electronics":
      if (a.refurbished) out.push(`Refurbished – ${a.refurbished.grade}`);
      out.push(a.warranty.months >= 12 ? `Warranty ${Math.round(a.warranty.months / 12)} yr` : `Warranty ${a.warranty.months} mo`);
      if (a.installation?.required) out.push(a.installation.fee === 0 ? "Installation included" : "Installation available");
      if (a.exchangeEligible) out.push("Exchange available");
      break;
  }
  return out.slice(0, 3).map((label) => ({ label, tone: p.department }));
}
