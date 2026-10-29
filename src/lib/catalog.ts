// Data access layer. Screens use these functions, never src/mocks directly.
import {
  products, brands, categories, departments, returnPolicies, stock, cities, warehouses, pincodes,
  offers, heroSlides, reviews, LOW_STOCK_THRESHOLD,
} from "@/mocks";
import type { Product, Department, Stock, PincodeArea, Category, Brand, ReturnPolicy } from "@/types";

export { departments, cities, LOW_STOCK_THRESHOLD };

export const getProduct = (slugOrId: string) => products.find((p) => p.slug === slugOrId || p.id === slugOrId);
export const getProductById = (idOrSlug: string) => products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
export const allProducts = () => products;
export const getBrand = (id: string): Brand | undefined => brands.find((b) => b.id === id);
export const brandName = (p: Product) => getBrand(p.brandId)?.name ?? "";
export const getCategory = (id: string): Category | undefined => categories.find((c) => c.id === id);
export const topCategories = (d: Department) => categories.filter((c) => c.department === d && c.parentId === null).sort((a, b) => a.sortOrder - b.sortOrder);
/** top-level category id for a product (walks up parent) */
export const topCategoryOf = (p: Product) => { let c = getCategory(p.categoryId); while (c?.parentId) c = getCategory(c.parentId); return c; };
export const getDepartment = (d: string) => departments.find((x) => x.id === d);
export const brandsInDepartment = (d: Department) => brands.filter((b) => products.some((p) => p.department === d && p.brandId === b.id));

export const getReturnPolicy = (p: Product): ReturnPolicy =>
  returnPolicies.find((r) => r.id === p.returnPolicyId) ?? returnPolicies.find((r) => r.id === getCategory(p.categoryId)?.returnPolicyId)!;

export const getPincodeArea = (pin: string): PincodeArea =>
  pincodes.find((p) => p.pincode === pin) ?? { pincode: pin, area: "", cityId: null, warehouseId: null, serviceable: false, distanceBand: "C", sameDayFresh: false };
export const getCity = (id: string | null) => cities.find((c) => c.id === id);
export const getWarehouse = (id: string | null) => warehouses.find((w) => w.id === id);
export const warehouseForCity = (cityId: string) => warehouses.find((w) => w.cityId === cityId)!;

export type StockStatus = "in_stock" | "low" | "out" | "not_stocked";
export interface StockInfo { status: StockStatus; available: number; restockDate?: string; batch?: Stock["batch"] }

export function getStock(productId: string, warehouseId: string, variantKey?: string): StockInfo {
  const rows = stock.filter((s) => s.productId === productId && s.warehouseId === warehouseId);
  if (!rows.length) return { status: "not_stocked", available: 0 };
  const pick = variantKey ? rows.filter((r) => r.variantKey === variantKey) : rows;
  if (!pick.length) return { status: "not_stocked", available: 0 };
  const available = pick.reduce((a, r) => a + r.available, 0);
  const row = pick[0];
  const restock = pick.find((r) => r.restockDate)?.restockDate;
  if (available === 0) return { status: "out", available, restockDate: restock, batch: row.batch };
  if (!variantKey && pick.length > 1) return { status: "in_stock", available, batch: row.batch };
  return { status: available <= LOW_STOCK_THRESHOLD ? "low" : "in_stock", available, batch: row.batch };
}
export const variantStock = (productId: string, warehouseId: string) => stock.filter((s) => s.productId === productId && s.warehouseId === warehouseId);
export const isStockedIn = (p: Product, warehouseId: string) => stock.some((s) => s.productId === p.id && s.warehouseId === warehouseId);
export const productsInCity = (warehouseId: string) => products.filter((p) => isStockedIn(p, warehouseId));

export const offersFor = (cityId: string, now: number) =>
  offers.filter((o) => o.cityIds.includes(cityId) && Date.parse(o.startsAt) <= now && now < Date.parse(o.endsAt));
export const heroSlidesFor = (cityId: string) => heroSlides.filter((h) => h.cityIds === "all" || h.cityIds.includes(cityId));
export const reviewsFor = (productId: string) => reviews.filter((r) => r.productId === productId);
export const citiesStocking = (p: Product) => warehouses.filter((w) => isStockedIn(p, w.id)).map((w) => getCity(w.cityId)!.name);
