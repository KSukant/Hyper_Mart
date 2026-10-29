import type { Product, CartItem, Department, ID } from "@/types";

export type ProductDomain =
  | "grocery_fresh"
  | "packaged_food"
  | "fashion"
  | "beauty"
  | "electronics"
  | "home_heavy";

export interface DomainTheme {
  id: ProductDomain;
  name: string;
  label: string;
  badgeTone: "green" | "lime" | "purple" | "rose" | "blue" | "amber";
  primaryColor: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  tint: string;
  soft: string;
  primaryText: string;
  tintBg: string;
  accentColor: string;
  accent: string;
  cardBorder: string;
  border: string;
  accentText: string;
}

export const DOMAIN_THEMES: Record<ProductDomain, DomainTheme> = {
  grocery_fresh: {
    id: "grocery_fresh",
    name: "Grocery & Fresh Food",
    label: "Grocery & Fresh Food",
    badgeTone: "green",
    primaryColor: "#2E7032",
    primary: "#2E7032",
    primaryHover: "#245B28",
    primaryLight: "#E7F3DF",
    tint: "#E7F3DF",
    soft: "#FFF8E5",
    primaryText: "#FFFFFF",
    tintBg: "#E7F3DF",
    accentColor: "#8BC34A",
    accent: "#8BC34A",
    cardBorder: "#DFE7D8",
    border: "#DFE7D8",
    accentText: "#202820",
  },
  packaged_food: {
    id: "packaged_food",
    name: "Food & Beverage",
    label: "Food & Beverage",
    badgeTone: "green",
    primaryColor: "#2E7032",
    primary: "#2E7032",
    primaryHover: "#245B28",
    primaryLight: "#E7F3DF",
    tint: "#E7F3DF",
    soft: "#FFF8E5",
    primaryText: "#FFFFFF",
    tintBg: "#E7F3DF",
    accentColor: "#8BC34A",
    accent: "#8BC34A",
    cardBorder: "#DFE7D8",
    border: "#DFE7D8",
    accentText: "#202820",
  },
  fashion: {
    id: "fashion",
    name: "Fashion & Apparel",
    label: "Fashion & Apparel",
    badgeTone: "purple",
    primaryColor: "#0F766E",
    primary: "#0F766E",
    primaryHover: "#115E59",
    primaryLight: "#E6FFFA",
    tint: "#E6FFFA",
    soft: "#E0F2F1",
    primaryText: "#FFFFFF",
    tintBg: "#E6FFFA",
    accentColor: "#14B8A6",
    accent: "#14B8A6",
    cardBorder: "#D8E8E5",
    border: "#D8E8E5",
    accentText: "#18302F",
  },
  beauty: {
    id: "beauty",
    name: "Beauty & Personal Care",
    label: "Beauty & Personal Care",
    badgeTone: "rose",
    primaryColor: "#7C205F",
    primary: "#7C205F",
    primaryHover: "#62194B",
    primaryLight: "#FCE4EC",
    tint: "#FCE4EC",
    soft: "#FFF1F5",
    primaryText: "#FFFFFF",
    tintBg: "#FCE4EC",
    accentColor: "#EC4899",
    accent: "#EC4899",
    cardBorder: "#EADDE6",
    border: "#EADDE6",
    accentText: "#29212A",
  },
  electronics: {
    id: "electronics",
    name: "Electronics & Gadgets",
    label: "Electronics & Gadgets",
    badgeTone: "blue",
    primaryColor: "#1E3A8A",
    primary: "#1E3A8A",
    primaryHover: "#172554",
    primaryLight: "#EAF0FE",
    tint: "#EAF0FE",
    soft: "#F1F5F9",
    primaryText: "#FFFFFF",
    tintBg: "#EAF0FE",
    accentColor: "#3B82F6",
    accent: "#3B82F6",
    cardBorder: "#DCE4F0",
    border: "#DCE4F0",
    accentText: "#172033",
  },
  home_heavy: {
    id: "home_heavy",
    name: "Home, Appliances & Living",
    label: "Home, Appliances & Living",
    badgeTone: "blue",
    primaryColor: "#1E3A8A",
    primary: "#1E3A8A",
    primaryHover: "#172554",
    primaryLight: "#EAF0FE",
    tint: "#EAF0FE",
    soft: "#F1F5F9",
    primaryText: "#FFFFFF",
    tintBg: "#EAF0FE",
    accentColor: "#3B82F6",
    accent: "#3B82F6",
    cardBorder: "#DCE4F0",
    border: "#DCE4F0",
    accentText: "#172033",
  },
};

export function getProductDomain(p: Product): ProductDomain {
  if (p.department === "food") {
    if (
      p.attrs.department === "food" &&
      (p.attrs.soldByWeight || p.categoryId.includes("fresh") || p.attrs.ripenessOptions)
    ) {
      return "grocery_fresh";
    }
    return "packaged_food";
  }
  if (p.department === "fashion") return "fashion";
  if (p.department === "beauty") return "beauty";
  if (p.department === "electronics") {
    if (
      p.handling.includes("heavy") ||
      p.handling.includes("two_person") ||
      p.categoryId.includes("appliances") ||
      p.categoryId.includes("tv") ||
      (p.attrs.department === "electronics" &&
        p.attrs.productDimensionsCm &&
        p.attrs.productDimensionsCm.h > 100)
    ) {
      return "home_heavy";
    }
    return "electronics";
  }
  return "packaged_food";
}

export interface HomeFitDetails {
  door: string;
  passage: string;
  floor: string;
  lift: string;
  room: string;
  installation: string;
  team: string;
}

export interface PdpSelection {
  grade?: "A" | "B" | "C";
  ripeness?: "raw" | "ready_to_eat" | "very_ripe";
  kg?: number;
  substitution?: "ask" | "skip" | "similar";
  subscription?: CartItem["subscription"];
  colour?: string;
  size?: string;
  shade?: string;
  config?: string;
  configuration?: string;
  packSize?: string;
  useCase?: string;
  homeFit?: HomeFitDetails;
  compatibilityConfirmed?: boolean;
  deliveryDate?: string;
  timeSlot?: string;
  coldChainFee?: number;
}
