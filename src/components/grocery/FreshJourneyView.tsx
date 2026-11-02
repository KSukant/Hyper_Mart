"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useShopper, useNow } from "@/lib/hooks";
import { productsInCity, brandsInDepartment, brandName, getStock } from "@/lib/catalog";
import { categories } from "@/mocks";
import { getPrice } from "@/lib/pricing";
import type { Product, Category } from "@/types";

// Stage 1 Components: Discovery
import { FreshJourneyHero } from "./discovery/FreshJourneyHero";
import { GroceryDestinationStrip } from "./discovery/GroceryDestinationStrip";
import { DailyEssentialsRow } from "./discovery/DailyEssentialsRow";
import { WeeklyHarvestBanner } from "./discovery/WeeklyHarvestBanner";

// Stage 2 Components: Category Exploration
import { CategoryExplorer } from "./categories/CategoryExplorer";

// Stage 3 Components: Product Discovery
import { GroceryFilterBar, type FilterState } from "./products/GroceryFilterBar";
import { ActiveFilterPills, type ActiveFilter } from "./products/ActiveFilterPills";
import { GroceryProductGrid } from "./products/GroceryProductGrid";

export function FreshJourneyView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { warehouseId, cityId, isMember } = useShopper();
  const now = useNow();

  // Read URL query parameters
  const initialCategory = searchParams.get("c") || null;
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "featured";
  const initialGrade = searchParams.get("grade") || undefined;
  const initialStorage = searchParams.get("storage") || undefined;
  const initialDiet = searchParams.get("diet") || undefined;
  const initialStock = searchParams.get("stock") || undefined;
  const initialRipeness = searchParams.get("ripeness") || undefined;
  const initialAllergen = searchParams.get("allergen") || undefined;
  const initialBrand = searchParams.get("brand") || undefined;

  // Component States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortOption, setSortOption] = useState<string>(initialSort);
  const [filters, setFilters] = useState<FilterState>({
    grade: initialGrade,
    storage: initialStorage,
    diet: initialDiet,
    stock: initialStock,
    ripeness: initialRipeness,
    allergen: initialAllergen,
    brand: initialBrand,
  });

  // Keep state synchronized with URL search params
  useEffect(() => {
    setSelectedCategory(searchParams.get("c") || null);
    setSearchQuery(searchParams.get("q") || "");
    setSortOption(searchParams.get("sort") || "featured");
    setFilters({
      grade: searchParams.get("grade") || undefined,
      storage: searchParams.get("storage") || undefined,
      diet: searchParams.get("diet") || undefined,
      stock: searchParams.get("stock") || undefined,
      ripeness: searchParams.get("ripeness") || undefined,
      allergen: searchParams.get("allergen") || undefined,
      brand: searchParams.get("brand") || undefined,
    });
  }, [searchParams]);

  // Sync state back to URL
  const updateUrl = (
    newCategory: string | null,
    newSearch: string,
    newSort: string,
    newFilters: FilterState
  ) => {
    const params = new URLSearchParams();
    if (newCategory) params.set("c", newCategory);
    if (newSearch) params.set("q", newSearch);
    if (newSort && newSort !== "featured") params.set("sort", newSort);
    if (newFilters.grade) params.set("grade", newFilters.grade);
    if (newFilters.storage) params.set("storage", newFilters.storage);
    if (newFilters.diet) params.set("diet", newFilters.diet);
    if (newFilters.stock) params.set("stock", newFilters.stock);
    if (newFilters.ripeness) params.set("ripeness", newFilters.ripeness);
    if (newFilters.allergen) params.set("allergen", newFilters.allergen);
    if (newFilters.brand) params.set("brand", newFilters.brand);

    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  // All food products in this city's warehouse
  const allFoodProducts = useMemo(() => {
    return productsInCity(warehouseId).filter((p) => p.department === "food");
  }, [warehouseId]);

  // Food categories list
  const foodCategories = useMemo(() => {
    return (categories as Category[])
      .filter((c: Category) => c.department === "food")
      .map((c: Category) => ({
        id: c.id,
        name: c.name,
        parentId: c.parentId,
      }));
  }, []);

  // Available brands in food department
  const availableBrands = useMemo(() => {
    return brandsInDepartment("food").map((b) => b.name);
  }, []);

  // Handler for category selection
  const handleSelectCategory = (catId: string | null) => {
    setSelectedCategory(catId);
    updateUrl(catId, searchQuery, sortOption, filters);
  };

  // Handler for search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    updateUrl(selectedCategory, query, sortOption, filters);
  };

  // Handler for filter changes
  const handleChangeFilter = (key: keyof FilterState, value: string | undefined) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);
    updateUrl(selectedCategory, searchQuery, sortOption, nextFilters);
  };

  // Handler for sort changes
  const handleChangeSort = (sort: string) => {
    setSortOption(sort);
    updateUrl(selectedCategory, searchQuery, sort, filters);
  };

  // Reset all filters
  const handleResetFilters = () => {
    const emptyFilters: FilterState = {};
    setFilters(emptyFilters);
    setSearchQuery("");
    setSelectedCategory(null);
    setSortOption("featured");
    updateUrl(null, "", "featured", emptyFilters);
  };

  // Filter and sort the products
  const filteredProducts = useMemo(() => {
    let result = [...allFoodProducts];

    // 1. Category Filter (supports parent category matching subcategories)
    if (selectedCategory) {
      if (selectedCategory === "food-fresh") {
        result = result.filter(
          (p) =>
            p.categoryId === "food-fresh" ||
            p.categoryId === "food-fresh-vegetables" ||
            p.categoryId === "food-fresh-fruits"
        );
      } else {
        result = result.filter((p) => p.categoryId === selectedCategory);
      }
    }

    // 2. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          brandName(p).toLowerCase().includes(q)
      );
    }

    // 3. Grade Filter
    if (filters.grade) {
      result = result.filter((p) => {
        if (p.attrs.department !== "food") return false;
        return p.attrs.grades?.some((g) => g.grade === filters.grade);
      });
    }

    // 4. Storage Filter
    if (filters.storage) {
      result = result.filter((p) => {
        if (p.attrs.department !== "food") return false;
        return p.attrs.storage === filters.storage;
      });
    }

    // 5. Dietary Filter
    if (filters.diet) {
      result = result.filter((p) => {
        if (p.attrs.department !== "food") return false;
        return filters.diet === "veg"
          ? p.attrs.vegMark === "veg"
          : p.attrs.vegMark === "egg";
      });
    }

    // 6. Ripeness Filter
    if (filters.ripeness) {
      result = result.filter((p) => {
        if (p.attrs.department !== "food") return false;
        return p.attrs.ripenessOptions?.includes(filters.ripeness as "raw");
      });
    }

    // 7. Allergen Filter
    if (filters.allergen) {
      result = result.filter((p) => {
        if (p.attrs.department !== "food") return false;
        return (
          !p.attrs.allergens.includes(filters.allergen!) &&
          !p.attrs.allergens.includes("Not provided")
        );
      });
    }

    // 8. Brand Filter
    if (filters.brand) {
      result = result.filter((p) => brandName(p) === filters.brand);
    }

    // 9. Stock Filter
    if (filters.stock === "in") {
      result = result.filter((p) => {
        const s = getStock(p.id, warehouseId);
        return s.status === "in_stock" || s.status === "low";
      });
    }

    // 10. Sorting
    result.sort((a, b) => {
      const priceA = getPrice(a, cityId, isMember, now).finalPrice;
      const priceB = getPrice(b, cityId, isMember, now).finalPrice;

      if (sortOption === "price_asc") return priceA - priceB;
      if (sortOption === "price_desc") return priceB - priceA;
      if (sortOption === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortOption === "discount") {
        const discA = a.mrp > priceA ? ((a.mrp - priceA) / a.mrp) * 100 : 0;
        const discB = b.mrp > priceB ? ((b.mrp - priceB) / b.mrp) * 100 : 0;
        return discB - discA;
      }
      return 0; // "featured" maintains catalog order
    });

    return result;
  }, [
    allFoodProducts,
    selectedCategory,
    searchQuery,
    filters,
    sortOption,
    cityId,
    warehouseId,
    isMember,
    now,
  ]);

  // Build active filter pills list
  const activeFilterPills: ActiveFilter[] = useMemo(() => {
    const pills: ActiveFilter[] = [];
    if (filters.grade) {
      pills.push({ key: "grade", label: `Grade ${filters.grade}`, value: filters.grade });
    }
    if (filters.storage) {
      pills.push({
        key: "storage",
        label: filters.storage === "chilled" ? "Chilled (0°C–4°C)" : filters.storage,
        value: filters.storage,
      });
    }
    if (filters.diet) {
      pills.push({
        key: "diet",
        label: filters.diet === "veg" ? "100% Vegetarian" : "Contains Egg",
        value: filters.diet,
      });
    }
    if (filters.stock) {
      pills.push({ key: "stock", label: "In Stock Only", value: filters.stock });
    }
    if (filters.ripeness) {
      pills.push({
        key: "ripeness",
        label: `Ripeness: ${filters.ripeness.replace("_", " ")}`,
        value: filters.ripeness,
      });
    }
    if (filters.allergen) {
      pills.push({ key: "allergen", label: `Free from ${filters.allergen}`, value: filters.allergen });
    }
    if (filters.brand) {
      pills.push({ key: "brand", label: `Brand: ${filters.brand}`, value: filters.brand });
    }
    return pills;
  }, [filters]);

  const handleRemovePill = (key: string) => {
    handleChangeFilter(key as keyof FilterState, undefined);
  };

  return (
    <div className="min-h-screen bg-[#FAFDF8] text-[#17251D] pb-16">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* ── STAGE 1: GROCERY DISCOVERY ── */}
        <FreshJourneyHero
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSelectCategory={handleSelectCategory}
        />

        {/* ── STAGE 1: SHOP BY GROCERY DESTINATION ── */}
        <GroceryDestinationStrip
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* ── STAGE 1: DAILY ESSENTIALS QUICK-ADD ── */}
        <DailyEssentialsRow products={allFoodProducts} />

        {/* ── STAGE 1: PROMOTIONAL HARVEST BANNER ── */}
        <WeeklyHarvestBanner
          onExploreCollection={() => handleSelectCategory("food-fresh")}
        />

        {/* ── STAGE 2: CATEGORY EXPLORATION (2-Level Hierarchy) ── */}
        <div id="aisles" className="pt-2">
          <CategoryExplorer
            categories={foodCategories}
            selectedCategoryId={selectedCategory}
            onSelectCategory={handleSelectCategory}
            totalProductsCount={allFoodProducts.length}
          />
        </div>

        {/* ── STAGE 3: PRODUCT DISCOVERY (Filter Bar, Active Pills, Grid) ── */}
        <div className="flex flex-col gap-3">
          <GroceryFilterBar
            filters={filters}
            onChangeFilter={handleChangeFilter}
            sort={sortOption}
            onChangeSort={handleChangeSort}
            totalProducts={filteredProducts.length}
            availableBrands={availableBrands}
          />

          <ActiveFilterPills
            activeFilters={activeFilterPills}
            onRemove={handleRemovePill}
            onClearAll={handleResetFilters}
          />

          <GroceryProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>
    </div>
  );
}
