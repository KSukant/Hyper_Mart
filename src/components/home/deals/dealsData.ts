export interface MasterDeal {
  id: string;
  productId: string;
  department: "fashion" | "food" | "beauty" | "electronics";
  categoryLabel: string;
  brandName: string;
  title: string;
  discountPct: number;
  discountText: string;
  price: number;
  mrp: number;
  saveAmount: number;
  rating: number;
  ratingCount: number;
  imageStage: string;
  href: string;
}

export const MASTER_DEALS: MasterDeal[] = [
  {
    id: "deal-fashion",
    productId: "p-fash-006",
    department: "fashion",
    categoryLabel: "Fashion",
    brandName: "PUMA",
    title: "Puma Men's Running Shoes",
    discountPct: 49,
    discountText: "-49%",
    price: 2549,
    mrp: 4999,
    saveAmount: 2450,
    rating: 4.3,
    ratingCount: 2210,
    imageStage: "/deal-stage-1.png",
    href: "/product/puma-running-shoes",
  },
  {
    id: "deal-food",
    productId: "p-food-001",
    department: "food",
    categoryLabel: "Food & Groceries",
    brandName: "HYPERMART FRESH",
    title: "Fresh Tomatoes",
    discountPct: 36,
    discountText: "-36%",
    price: 32,
    mrp: 50,
    saveAmount: 18,
    rating: 4.3,
    ratingCount: 2348,
    imageStage: "/deal-stage-2.png",
    href: "/product/fresh-tomatoes",
  },
  {
    id: "deal-beauty",
    productId: "p-beau-003",
    department: "beauty",
    categoryLabel: "Beauty & Personal Care",
    brandName: "MINIMALIST",
    title: "Minimalist 10% Niacinamide Face Serum",
    discountPct: 19,
    discountText: "-19%",
    price: 484,
    mrp: 599,
    saveAmount: 115,
    rating: 4.4,
    ratingCount: 8340,
    imageStage: "/deal-stage-3.png",
    href: "/product/minimalist-niacinamide-serum-30ml",
  },
  {
    id: "deal-electronics",
    productId: "p-elec-004",
    department: "electronics",
    categoryLabel: "Electronics",
    brandName: "BOAT",
    title: "boAt Airdopes 141 True Wireless Earbuds",
    discountPct: 74,
    discountText: "-74%",
    price: 1169,
    mrp: 4490,
    saveAmount: 3321,
    rating: 4,
    ratingCount: 24500,
    imageStage: "/deal-stage-4.png",
    href: "/product/boat-airdopes-141",
  },
];

export interface CategoryFilterItem {
  id: "all" | "food" | "fashion" | "electronics" | "beauty";
  label: string;
}

export const CATEGORY_FILTERS: CategoryFilterItem[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food & Groceries" },
  { id: "fashion", label: "Fashion" },
  { id: "electronics", label: "Electronics" },
  { id: "beauty", label: "Beauty & Personal Care" },
];

