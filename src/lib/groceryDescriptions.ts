import type { Product } from "@/types";

export interface WeightOption {
  kg: number;
  label: string;
  countDesc: string;
  fullLabel: string;
}

export interface ProducePricing {
  pricePerKg: number;
  pricePer500g: number;
  unitPrice: number;
  estimatedTotal: number;
  gradeDiscountPct: number;
}

/**
 * Returns an accurate, product-specific count or description based on weight and quantity.
 * Fixes the bug where "tomatoes" was hardcoded for Robusta bananas and other produce.
 */
export function getProducePieceCount(product: Product, kg: number = 1, qty: number = 1): string {
  const totalKg = kg * qty;
  const slug = product.slug?.toLowerCase() || "";
  const name = product.name?.toLowerCase() || "";

  // 1. Robusta Bananas
  if (slug.includes("banana") || name.includes("banana")) {
    if (totalKg <= 0.5) return `~3–4 bananas (half bunch)`;
    if (totalKg === 1) return `~6–8 bananas (1 large bunch)`;
    if (totalKg === 1.5) return `~9–12 bananas (~1.5 bunches)`;
    if (totalKg === 2) return `~12–16 bananas (2 large bunches)`;
    const low = Math.round(totalKg * 6);
    const high = Math.round(totalKg * 8);
    return `~${low}–${high} bananas (~${Math.round(totalKg)} bunches)`;
  }

  // 2. Fresh Tomatoes
  if (slug.includes("tomato") || name.includes("tomato")) {
    if (totalKg <= 0.25) return `~1–2 tomatoes`;
    if (totalKg === 0.5) return `~3–4 tomatoes`;
    if (totalKg === 1) return `~6–8 tomatoes`;
    if (totalKg === 2) return `~12–16 tomatoes`;
    const low = Math.round(totalKg * 6);
    const high = Math.round(totalKg * 8);
    return `~${low}–${high} tomatoes`;
  }

  // 3. Apples / Oranges / Onions / Potatoes (generic fruits/vegetables)
  if (slug.includes("apple") || name.includes("apple")) {
    const low = Math.round(totalKg * 5);
    const high = Math.round(totalKg * 6);
    return `~${low}–${high} apples`;
  }
  if (slug.includes("onion") || name.includes("onion")) {
    const low = Math.round(totalKg * 8);
    const high = Math.round(totalKg * 10);
    return `~${low}–${high} medium onions`;
  }
  if (slug.includes("potato") || name.includes("potato")) {
    const low = Math.round(totalKg * 6);
    const high = Math.round(totalKg * 8);
    return `~${low}–${high} medium potatoes`;
  }

  // 4. Non-weight / packaged items
  const isWeightBased = product.attrs?.department === "food" && product.attrs.soldByWeight;
  if (!isWeightBased) {
    const unit = product.unit || "pack";
    return `${qty} × ${unit}`;
  }

  // 5. Fallback for weight-based produce
  const weightStr = totalKg >= 1 ? `${totalKg} kg` : `${Math.round(totalKg * 1000)} g`;
  const low = Math.round(totalKg * 5);
  const high = Math.round(totalKg * 7);
  return `${weightStr} (~${low}–${high} items)`;
}

/**
 * Returns available weight options with product-specific piece counts.
 */
export function getWeightOptions(product: Product): WeightOption[] {
  const isWeightBased = product.attrs?.department === "food" && (product.attrs as any).soldByWeight;
  const rawOptions: number[] = (isWeightBased && (product.attrs as any).weightOptionsKg) || [0.5, 1, 2];

  return rawOptions.map((kg: number) => {
    const label = kg >= 1 ? `${kg} kg` : `${Math.round(kg * 1000)} g`;
    const countDesc = getProducePieceCount(product, kg, 1);
    return {
      kg,
      label,
      countDesc,
      fullLabel: `${label} (${countDesc})`,
    };
  });
}

/**
 * Calculates price per kg, price per 500g, unit price, and estimated total with grade considerations.
 */
export function calculateProducePrice(
  product: Product,
  grade?: "A" | "B" | "C",
  kg: number = 1,
  qty: number = 1
): ProducePricing {
  const a = product.attrs;
  const isFood = a?.department === "food";
  const isWeightBased = isFood && a.soldByWeight;

  // Find standard base price (Grade A or product price)
  const gradeAObj = isFood && a.grades ? a.grades.find((g) => g.grade === "A") : null;
  const basePricePerKg = gradeAObj?.pricePerKg ?? (isFood && a.pricePerKg ? a.pricePerKg : product.price);

  let activePricePerKg = basePricePerKg;
  let gradeDiscountPct = 0;

  if (isFood && a.grades && grade) {
    const foundGrade = a.grades.find((g) => g.grade === grade);
    if (foundGrade) {
      activePricePerKg = foundGrade.pricePerKg;
      if (basePricePerKg > 0 && activePricePerKg < basePricePerKg) {
        gradeDiscountPct = Math.round(((basePricePerKg - activePricePerKg) / basePricePerKg) * 100);
      }
    }
  }

  if (isWeightBased) {
    const pricePer500g = Math.round((activePricePerKg / 2) * 100) / 100;
    const unitPrice = Math.round(activePricePerKg * kg * 100) / 100;
    const estimatedTotal = Math.round(unitPrice * qty * 100) / 100;

    return {
      pricePerKg: activePricePerKg,
      pricePer500g,
      unitPrice,
      estimatedTotal,
      gradeDiscountPct,
    };
  }

  // Non-weight items
  return {
    pricePerKg: activePricePerKg,
    pricePer500g: Math.round((activePricePerKg / 2) * 100) / 100,
    unitPrice: product.price,
    estimatedTotal: product.price * qty,
    gradeDiscountPct: 0,
  };
}

/**
 * Detailed information for Ripeness options.
 */
export function getRipenessDetails(
  product: Product,
  ripeness: "raw" | "ready_to_eat" | "very_ripe"
) {
  const slug = product.slug?.toLowerCase() || "";
  const name = product.name?.toLowerCase() || "";
  const isBanana = slug.includes("banana") || name.includes("banana");

  switch (ripeness) {
    case "raw":
      return {
        key: "raw" as const,
        title: "Raw (Firm)",
        badge: "Ripens in 2–3 days",
        appearance: isBanana
          ? "Firm, greenish-yellow skin with tight peel"
          : "Firm, crisp texture with pale red/greenish shoulders",
        usage: isBanana
          ? "Best for buying ahead for the week, raw banana cooking, or natural countertop ripening"
          : "Best for salads, firm slicing, and slow cooking over the next 3–4 days",
        shelfLife: "Guaranteed 4–5 days remaining shelf life",
      };
    case "ready_to_eat":
      return {
        key: "ready_to_eat" as const,
        title: "Ready to Eat",
        badge: "Peak sweetness",
        appearance: isBanana
          ? "Bright golden yellow with faint sugar specks"
          : "Deep ruby red, tender and juicy with full flavor",
        usage: isBanana
          ? "Peak aroma and natural sweetness. Perfect for direct eating, cereal, or fruit bowls"
          : "Ideal for curries, rasam, sandwiches, fresh gravies, and immediate enjoyment",
        shelfLife: "Guaranteed 2–3 days remaining shelf life at ambient temperature",
      };
    case "very_ripe":
      return {
        key: "very_ripe" as const,
        title: "Very Ripe (Soft)",
        badge: "Sweetest / Immediate use",
        appearance: isBanana
          ? "Soft texture, prominent sugar spots, fragrant aroma"
          : "Very soft, deep red, easily crushed pulp",
        usage: isBanana
          ? "Super sweet. Best for smoothies, milkshakes, banana bread, baking, or immediate snacking"
          : "Richest tomato flavor. Best for thick tomato purees, soups, rasam, and rich chutneys",
        shelfLife: "Consume within 1–2 days of delivery",
      };
  }
}

/**
 * Detailed information for Quality Grades.
 */
export function getGradeDetails(
  product: Product,
  grade: "A" | "B" | "C"
) {
  const a = product.attrs;
  const gradeObj = a?.department === "food" && a.grades ? a.grades.find((g) => g.grade === grade) : null;
  const price = gradeObj?.pricePerKg ?? product.price;

  switch (grade) {
    case "A":
      return {
        grade: "A" as const,
        title: "Grade A — Premium Table Quality",
        badge: "Export Standard",
        price,
        description: gradeObj?.note || "Best appearance, uniform shape and color, zero blemishes",
        standards: [
          "Uniform sizing and weight consistency across batch",
          "Zero surface marks, cuts, or skin defects",
          "Highest visual appeal, hand-selected at harvest",
        ],
      };
    case "B":
      return {
        grade: "B" as const,
        title: "Grade B — Daily Value Quality",
        badge: "10% Lower Price",
        price,
        description: gradeObj?.note || "Minor natural skin marks or slight uneven shape, identical taste and nutrition",
        standards: [
          "Same nutritional content and harvest date as Grade A",
          "Minor cosmetic skin imperfections (sun marks or natural variation)",
          "10% savings — perfect for everyday household cooking and table consumption",
        ],
      };
    case "C":
      return {
        grade: "C" as const,
        title: "Grade C — Kitchen Stew & Puree",
        badge: "25% Lower Price",
        price,
        description: gradeObj?.note || "Visible surface blemishes or uneven shape — ideal for cooking, gravies or puree",
        standards: [
          "Ideal for pureeing, boiling, rasam, gravies, and chutneys",
          "Visible natural markings, irregular size or shape",
          "Maximum economic value for high-volume cooking",
        ],
      };
  }
}

