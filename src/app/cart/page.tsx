"use client";

import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  ShoppingBag,
  ArrowLeft,
  HelpCircle,
  ArrowRight,
  Info,
  ChevronDown,
} from "lucide-react";
import type { CartItem, Product, Department } from "@/types";
import { TaskPage } from "@/components/layout/TaskPage";
import { EmptyState, LinkButton, InfoBar, toast } from "@/components/ui/primitives";
import { DEPT_ICON } from "@/components/layout/Header";
import { departments } from "@/mocks";
import { useCart } from "@/store";
import { useCartView, SavedList } from "@/components/cart/shared";
import { FoodCartItem } from "@/components/cart/FoodCartItem";
import { FashionCartItem } from "@/components/cart/FashionCartItem";
import { BeautyCartItem } from "@/components/cart/BeautyCartItem";
import { ElectronicsCartItem } from "@/components/cart/ElectronicsCartItem";
import { CartCheckoutSidebar } from "@/components/cart/CartCheckoutSidebar";
import { cn } from "@/lib/cn";

// Domain Modals for In-Cart Editing
import { FreshnessModal } from "@/components/pdp/modals/FreshnessModal";
import { QuantityAndWeighingModal } from "@/components/pdp/modals/QuantityAndWeighingModal";
import { ShelfLifeAndDeliveryModal } from "@/components/pdp/modals/ShelfLifeAndDeliveryModal";
import { SubstitutionPreferenceModal } from "@/components/pdp/modals/SubstitutionPreferenceModal";
import { SubscribeAndRepeatModal } from "@/components/pdp/modals/SubscribeAndRepeatModal";
import { AvailabilityMatrixModal } from "@/components/pdp/modals/AvailabilityMatrixModal";
import { FitAndFabricModal } from "@/components/pdp/modals/FitAndFabricModal";
import { EditSizeModal } from "@/components/pdp/modals/EditSizeModal";
import { RentalEnquiryModal } from "@/components/pdp/modals/RentalEnquiryModal";
import { ShadeAndSuitabilityModal } from "@/components/pdp/modals/ShadeAndSuitabilityModal";
import { SampleOrFullSizeModal } from "@/components/pdp/modals/SampleOrFullSizeModal";
import { IngredientsAndSafetyModal } from "@/components/pdp/modals/IngredientsAndSafetyModal";
import { BatchAndExpiryModal } from "@/components/pdp/modals/BatchAndExpiryModal";
import { SuitabilityModal } from "@/components/pdp/modals/SuitabilityModal";
import { CompatibilityModal } from "@/components/pdp/modals/CompatibilityModal";
import { HomeFitModal } from "@/components/pdp/modals/HomeFitModal";
import { WarrantyModal } from "@/components/pdp/modals/WarrantyModal";
import type { PdpSelection } from "@/components/pdp/types";

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}>
          <div className="py-20 text-center text-muted">Loading your cart...</div>
        </TaskPage>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}

function CartPageContent() {
  const searchParams = useSearchParams();
  const domainParam = searchParams?.get("domain");

  const { lines, valid, charges, city } = useCartView();
  const { setQty, remove, update, saveForLater, saved, moveToCart } = useCart();

  // Active domain filter tab: "all" | "food" | "fashion" | "beauty" | "electronics"
  const [activeDomain, setActiveDomain] = useState<"all" | "food" | "fashion" | "beauty" | "electronics">(
    domainParam === "food" ||
      domainParam === "fashion" ||
      domainParam === "beauty" ||
      domainParam === "electronics"
      ? domainParam
      : "all"
  );
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  useEffect(() => {
    if (
      domainParam === "food" ||
      domainParam === "fashion" ||
      domainParam === "beauty" ||
      domainParam === "electronics"
    ) {
      setActiveDomain(domainParam);
    }
  }, [domainParam]);

  // Edit modals state
  const [activeItem, setActiveItem] = useState<{
    lineKey: string;
    product: Product;
    item: CartItem;
  } | null>(null);

  // Food Modals
  const [freshnessOpen, setFreshnessOpen] = useState(false);
  const [weighingOpen, setWeighingOpen] = useState(false);
  const [shelfLifeOpen, setShelfLifeOpen] = useState(false);
  const [substitutionOpen, setSubstitutionOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  // Fashion Modals
  const [fashionMatrixOpen, setFashionMatrixOpen] = useState(false);
  const [fashionFitOpen, setFashionFitOpen] = useState(false);
  const [fashionEditSizeOpen, setFashionEditSizeOpen] = useState(false);
  const [rentalOpen, setRentalOpen] = useState(false);

  // Beauty Modals
  const [shadeOpen, setShadeOpen] = useState(false);
  const [formatOpen, setFormatOpen] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  // Electronics Modals
  const [suitabilityOpen, setSuitabilityOpen] = useState(false);
  const [compatibilityOpen, setCompatibilityOpen] = useState(false);
  const [homeFitOpen, setHomeFitOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);

  // If entire cart is empty
  if (lines.length === 0) {
    return (
      <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}>
        <EmptyState
          icon={<ShoppingCart className="h-8 w-8 text-ink" />}
          title="Your cart is empty."
          action={
            <LinkButton href="/offers">
              See offers <ArrowRight className="h-4 w-4" />
            </LinkButton>
          }
        >
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {departments.map((d) => {
              const I = DEPT_ICON[d.id];
              return (
                <Link
                  key={d.id}
                  href={`/category/${d.id}`}
                  className="flex items-center gap-2 rounded-2xl border border-line/80 bg-white p-3 text-xs font-semibold text-ink transition hover:border-black/30 hover:shadow-xs"
                >
                  <I className="h-4 w-4 text-primary" />
                  <span>{d.shortName}</span>
                </Link>
              );
            })}
          </div>
        </EmptyState>
        {saved.length > 0 && <SavedList onMove={moveToCart} />}
      </TaskPage>
    );
  }

  // Domain groupings
  const foodLines = valid.filter((l) => l.p.department === "food");
  const fashionLines = valid.filter((l) => l.p.department === "fashion");
  const beautyLines = valid.filter((l) => l.p.department === "beauty");
  const electronicsLines = valid.filter((l) => l.p.department === "electronics");
  const otherLines = valid.filter(
    (l) =>
      l.p.department !== "food" &&
      l.p.department !== "fashion" &&
      l.p.department !== "beauty" &&
      l.p.department !== "electronics"
  );

  // Filtered lines to display
  const displayedLines =
    activeDomain === "all"
      ? valid
      : valid.filter((l) => l.p.department === activeDomain);

  const problems = lines.filter((l) => !l.ok);
  const totalItemCount = valid.reduce((acc, l) => acc + l.it.qty, 0);

  // Check if cart has weight-based or installation items
  const hasWeightItems = valid.some(
    (l) => l.p.attrs.department === "food" && l.p.attrs.soldByWeight
  );
  const hasInstallation = valid.some(
    (l) => l.p.attrs.department === "electronics" && l.p.attrs.installation?.required
  );

  // Determine dominant department if "all" is active
  const dominantDomain: Department | undefined =
    fashionLines.length >= Math.max(foodLines.length, beautyLines.length, electronicsLines.length)
      ? "fashion"
      : foodLines.length >= Math.max(beautyLines.length, electronicsLines.length)
      ? "food"
      : electronicsLines.length >= beautyLines.length
      ? "electronics"
      : beautyLines.length > 0
      ? "beauty"
      : undefined;

  // Domain tabs definition
  const domainTabs = [
    { id: "all" as const, label: "All Items", count: valid.length },
    { id: "food" as const, label: "Food & Groceries", count: foodLines.length },
    { id: "fashion" as const, label: "Fashion & Apparel", count: fashionLines.length },
    { id: "beauty" as const, label: "Beauty & Personal Care", count: beautyLines.length },
    { id: "electronics" as const, label: "Electronics & Appliances", count: electronicsLines.length },
  ];

  /* ───────────── Modal Opening Handlers ───────────── */
  const openFoodEdit = (
    lineKey: string,
    product: Product,
    item: CartItem,
    modal: "freshness" | "weighing" | "shelfLife" | "substitution" | "subscribe"
  ) => {
    setActiveItem({ lineKey, product, item });
    if (modal === "freshness") setFreshnessOpen(true);
    if (modal === "weighing") setWeighingOpen(true);
    if (modal === "shelfLife") setShelfLifeOpen(true);
    if (modal === "substitution") setSubstitutionOpen(true);
    if (modal === "subscribe") setSubscribeOpen(true);
  };

  const openFashionEdit = (
    lineKey: string,
    product: Product,
    item: CartItem,
    modal: "matrix" | "size" | "fit" | "rental"
  ) => {
    setActiveItem({ lineKey, product, item });
    if (modal === "matrix") setFashionMatrixOpen(true);
    if (modal === "size") setFashionEditSizeOpen(true);
    if (modal === "fit") setFashionFitOpen(true);
    if (modal === "rental") setRentalOpen(true);
  };

  const openBeautyEdit = (
    lineKey: string,
    product: Product,
    item: CartItem,
    modal: "shade" | "format" | "suitability" | "ingredients" | "batch"
  ) => {
    setActiveItem({ lineKey, product, item });
    if (modal === "shade" || modal === "suitability") setShadeOpen(true);
    if (modal === "format") setFormatOpen(true);
    if (modal === "ingredients") setIngredientsOpen(true);
    if (modal === "batch") setBatchOpen(true);
  };

  const openElectronicsEdit = (
    lineKey: string,
    product: Product,
    item: CartItem,
    modal: "config" | "compatibility" | "homeFit" | "warranty" | "installation"
  ) => {
    setActiveItem({ lineKey, product, item });
    if (modal === "config") setSuitabilityOpen(true);
    if (modal === "compatibility") setCompatibilityOpen(true);
    if (modal === "homeFit") setHomeFitOpen(true);
    if (modal === "warranty") setWarrantyOpen(true);
    if (modal === "installation") {
      toast("Installation scheduled: Certified HyperMart technician will arrive with delivery");
    }
  };

  /* ───────────── Modal Save Handlers ───────────── */
  const handleFoodSave = (patch: Partial<PdpSelection>) => {
    if (!activeItem) return;
    update(activeItem.lineKey, {
      ...(patch.grade ? { grade: patch.grade } : {}),
      ...(patch.ripeness ? { ripeness: patch.ripeness } : {}),
      ...(patch.kg !== undefined ? { qty: patch.kg } : {}),
      ...(patch.substitution ? { substitution: patch.substitution } : {}),
      ...(patch.subscription ? { subscription: patch.subscription } : {}),
    });
    toast("Updated grocery preferences");
  };

  const handleFashionSave = (newSize: string, newColour?: string) => {
    if (!activeItem) return;
    const currentVariant = activeItem.item.variantKey.split("|");
    const size = newSize || currentVariant[0] || "L";
    const colour = newColour || currentVariant[1] || "Blue";
    const newVariantKey = `${size}|${colour}`;
    update(activeItem.lineKey, {
      variantKey: newVariantKey,
    });
    toast(`Updated to Size ${size}, Colour ${colour}`);
  };

  const handleBeautyShadeSave = (shadeCode: string) => {
    if (!activeItem) return;
    update(activeItem.lineKey, {
      variantKey: `shade:${shadeCode}`,
    });
    toast("Updated shade selection");
    setShadeOpen(false);
  };

  const handleBeautyFormatSave = (format: "sample" | "full", qty: number) => {
    if (!activeItem) return;
    const newVariantKey = format === "sample" ? "sample:1.5ml" : "full:3.5g";
    update(activeItem.lineKey, {
      variantKey: newVariantKey,
      qty,
    });
    toast(`Updated to ${format === "sample" ? "Sample vial (1.5 ml)" : "Full-size lipstick"}`);
    setFormatOpen(false);
  };

  return (
    <TaskPage crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}>
      {/* ── Page Header (Exact Match to Reference Screenshot) ── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-5">
        {/* Left: Continue shopping */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink hover:text-primary transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>

        {/* Center: Title & Subtitle */}
        <div className="text-center order-last sm:order-none w-full sm:w-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">Your Cart</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted font-normal">
            One cart. Everything you love — fashion, home, beauty and more.
          </p>
        </div>

        {/* Right: Live Cart Item Badge & Need help? */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div
            className="relative flex items-center justify-center"
            title={`${valid.length} items in cart`}
            aria-label={`${valid.length} items in cart`}
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-ink" />
            <span className="absolute -top-1.5 -right-2 grid min-h-4.5 min-w-4.5 place-items-center rounded-full bg-primary px-1 text-[10px] font-black text-white">
              {valid.length}
            </span>
          </div>

          <Link
            href="/help"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted hover:text-ink transition"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Need help?</span>
          </Link>
        </div>
      </header>

      {/* ── Domain Experience Tabs ── */}
      <nav
        aria-label="Domain cart filter"
        className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
      >
        {domainTabs.map((tab) => {
          const active = activeDomain === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveDomain(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer",
                active
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white border border-line text-muted hover:border-primary/40 hover:text-ink"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px] font-black tabular",
                  active ? "bg-white/20 text-white" : "bg-bg text-muted"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ── Single Unified Cart Explanatory Banner ── */}
      <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-line bg-[#FAFAFA] px-4 py-3 text-xs text-muted">
        <Info className="h-4 w-4 shrink-0 text-muted" />
        <span>
          This is a single, unified HyperMart cart. Items from any department check out together
          in one seamless order with transparent delivery charges.
        </span>
      </div>

      {/* ── Main Two-Column Layout (Matching Reference Screenshot) ── */}
      <div className="grid gap-6 lg:grid-cols-12 pb-24 lg:pb-0">
        {/* Mobile Collapsible Order Summary (< 1024px) */}
        <div className="rounded-2xl border border-line bg-white p-3.5 lg:hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="flex w-full min-h-[44px] items-center justify-between text-left cursor-pointer"
            aria-expanded={mobileSummaryOpen}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-muted">Order Total:</span>
              <span className="font-display text-lg font-black text-ink tabular">
                ₹ {charges.total.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-muted">({valid.length} items)</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-primary shrink-0">
              <span>{mobileSummaryOpen ? "Hide" : "Details"}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  mobileSummaryOpen && "rotate-180"
                )}
              />
            </div>
          </button>

          {mobileSummaryOpen && (
            <div className="mt-3 border-t border-line/70 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>Items subtotal</span>
                <span className="tabular font-semibold text-ink">₹ {charges.itemsTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery fee</span>
                <span className="tabular font-semibold text-ink">{charges.delivery === 0 ? "FREE" : `₹ ${charges.delivery}`}</span>
              </div>
              {charges.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Total savings</span>
                  <span className="tabular font-bold">- ₹ {charges.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-muted text-[11px]">
                <span>Taxes (inclusive)</span>
                <span className="tabular">₹ {charges.taxInclusive.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Left Column: Cart Items (lg:col-span-7) ── */}
        <main className="space-y-6 lg:col-span-7">
          {/* Out of stock or delivery warnings */}
          {problems.map((l) => (
            <InfoBar
              key={l.key}
              tone="warning"
              action={
                <div className="flex gap-2">
                  <button
                    className="font-semibold underline cursor-pointer"
                    onClick={() => saveForLater(l.key)}
                  >
                    Save for later
                  </button>
                  <button
                    className="font-semibold underline cursor-pointer"
                    onClick={() => remove(l.key)}
                  >
                    Remove
                  </button>
                </div>
              }
            >
              <b>{l.p.name}</b> —{" "}
              {l.st.status === "not_stocked"
                ? `Not available in ${city.name}`
                : `Out of stock in ${city.name}`}
              . Not included in your total.
            </InfoBar>
          ))}

          {/* If the active domain tab has no items */}
          {displayedLines.length === 0 ? (
            <div className="rounded-3xl border border-line/80 bg-white p-8 text-center space-y-3">
              <p className="text-sm font-bold text-ink">
                No items from this department in your cart right now.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDomain("all")}
                  className="rounded-xl bg-[#17201B] px-4 py-2 text-xs font-bold text-white transition hover:bg-black"
                >
                  View all items ({valid.length})
                </button>
                {activeDomain !== "all" && (
                  <Link
                    href={`/category/${activeDomain}`}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-bold text-ink transition hover:bg-bg"
                  >
                    Shop {activeDomain} &rsaquo;
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Render Domain-Specific Cart Item Cards */}
              {displayedLines.map(({ it, p, st, key, price }) => {
                const dept = p.department;

                if (dept === "food") {
                  return (
                    <FoodCartItem
                      key={key}
                      item={it}
                      product={p}
                      lineKey={key}
                      price={price}
                      stock={st}
                      onQtyChange={(newQty) => setQty(key, newQty)}
                      onRemove={() => {
                        remove(key);
                        toast("Removed from cart");
                      }}
                      onSaveForLater={() => {
                        saveForLater(key);
                        toast("Saved for later");
                      }}
                      onEdit={(modal) => openFoodEdit(key, p, it, modal)}
                    />
                  );
                }

                if (dept === "fashion") {
                  return (
                    <FashionCartItem
                      key={key}
                      item={it}
                      product={p}
                      lineKey={key}
                      price={price}
                      stock={st}
                      onQtyChange={(newQty) => setQty(key, newQty)}
                      onRemove={() => {
                        remove(key);
                        toast("Removed from cart");
                      }}
                      onSaveForLater={() => {
                        saveForLater(key);
                        toast("Saved for later");
                      }}
                      onEdit={(modal) => openFashionEdit(key, p, it, modal)}
                    />
                  );
                }

                if (dept === "beauty") {
                  return (
                    <BeautyCartItem
                      key={key}
                      item={it}
                      product={p}
                      lineKey={key}
                      price={price}
                      stock={st}
                      onQtyChange={(newQty) => setQty(key, newQty)}
                      onRemove={() => {
                        remove(key);
                        toast("Removed from cart");
                      }}
                      onSaveForLater={() => {
                        saveForLater(key);
                        toast("Saved for later");
                      }}
                      onEdit={(modal) => openBeautyEdit(key, p, it, modal)}
                    />
                  );
                }

                if (dept === "electronics") {
                  return (
                    <ElectronicsCartItem
                      key={key}
                      item={it}
                      product={p}
                      lineKey={key}
                      price={price}
                      stock={st}
                      onQtyChange={(newQty) => setQty(key, newQty)}
                      onRemove={() => {
                        remove(key);
                        toast("Removed from cart");
                      }}
                      onSaveForLater={() => {
                        saveForLater(key);
                        toast("Saved for later");
                      }}
                      onEdit={(modal) => openElectronicsEdit(key, p, it, modal)}
                    />
                  );
                }

                // Fallback for general items (Home, other categories)
                return (
                  <FashionCartItem
                    key={key}
                    item={it}
                    product={p}
                    lineKey={key}
                    price={price}
                    stock={st}
                    onQtyChange={(newQty) => setQty(key, newQty)}
                    onRemove={() => {
                      remove(key);
                      toast("Removed from cart");
                    }}
                    onSaveForLater={() => {
                      saveForLater(key);
                      toast("Saved for later");
                    }}
                    onEdit={(modal) => openFashionEdit(key, p, it, modal)}
                  />
                );
              })}
            </div>
          )}

          {/* Add more items card */}
          <Link
            href="/"
            className="flex items-center justify-between rounded-3xl border border-line/80 bg-white p-5 transition hover:bg-bg/40 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-bg text-ink font-extrabold text-lg">
                +
              </span>
              <div>
                <strong className="block text-sm font-extrabold text-ink">Add more items</strong>
                <span className="text-xs text-muted">
                  Browse products across all four domains — all go into the same cart.
                </span>
              </div>
            </div>
            <span className="text-muted text-lg">&rsaquo;</span>
          </Link>

          {/* Saved for later list */}
          {saved.length > 0 && <SavedList onMove={moveToCart} />}
        </main>

        {/* ── Right Column: Checkout Sidebar (lg:col-span-5) ── */}
        <CartCheckoutSidebar
          charges={charges}
          itemCount={valid.length}
          domain={activeDomain === "all" ? (dominantDomain ?? "all") : activeDomain}
          hasWeightItems={hasWeightItems}
          hasInstallation={hasInstallation}
          installationFee={hasInstallation ? 499 : 0}
        />
      </div>

      {/* Mobile Sticky Checkout Action Bar (< 1024px) */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md lg:hidden"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 12px))",
        }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
              Total ({valid.length} items)
            </span>
            <span className="font-display text-xl font-black text-ink tabular">
              ₹ {charges.total.toLocaleString("en-IN")}
            </span>
          </div>
          <Link
            href="/checkout"
            className={cn(
              "flex min-h-[44px] flex-1 max-w-[220px] items-center justify-center gap-2 rounded-xl bg-primary text-sm font-extrabold text-white shadow-md transition hover:bg-primary-dark active:scale-[0.98] cursor-pointer",
              charges.belowMinimum > 0 && "pointer-events-none opacity-40"
            )}
          >
            <span>Proceed to checkout</span>
            <span aria-hidden="true">&rsaquo;</span>
          </Link>
        </div>
      </div>

      {/* ── Domain Modals for In-Cart Editing ── */}
      {activeItem && (
        <>
          {/* Food Modals */}
          <FreshnessModal
            open={freshnessOpen}
            onClose={() => setFreshnessOpen(false)}
            product={activeItem.product}
            selection={{
              grade: activeItem.item.grade,
              ripeness: activeItem.item.ripeness,
              kg: activeItem.item.qty,
              substitution: activeItem.item.substitution,
            }}
            onSave={(patch) => {
              handleFoodSave(patch);
              setFreshnessOpen(false);
            }}
            unitPrice={activeItem.product.price}
          />
          <QuantityAndWeighingModal
            open={weighingOpen}
            onClose={() => setWeighingOpen(false)}
            product={activeItem.product}
            selection={{
              kg: activeItem.item.qty,
            }}
            onSave={(patch) => {
              handleFoodSave(patch);
              setWeighingOpen(false);
            }}
            unitPrice={activeItem.product.price}
          />
          <ShelfLifeAndDeliveryModal
            open={shelfLifeOpen}
            onClose={() => setShelfLifeOpen(false)}
            product={activeItem.product}
            selection={{}}
            onSave={(patch) => {
              handleFoodSave(patch);
              setShelfLifeOpen(false);
            }}
          />
          <SubstitutionPreferenceModal
            open={substitutionOpen}
            onClose={() => setSubstitutionOpen(false)}
            product={activeItem.product}
            selection={{
              substitution: activeItem.item.substitution,
            }}
            onSave={(patch) => {
              handleFoodSave(patch);
              setSubstitutionOpen(false);
            }}
          />
          <SubscribeAndRepeatModal
            open={subscribeOpen}
            onClose={() => setSubscribeOpen(false)}
            product={activeItem.product}
            selection={{
              subscription: activeItem.item.subscription,
            }}
            onSave={(patch) => {
              handleFoodSave(patch);
              setSubscribeOpen(false);
            }}
            unitPrice={activeItem.product.price}
          />

          {/* Fashion Modals */}
          <AvailabilityMatrixModal
            open={fashionMatrixOpen}
            onClose={() => setFashionMatrixOpen(false)}
            product={activeItem.product}
            selection={{
              size: activeItem.item.variantKey.split("|")[0] || "L",
              colour: activeItem.item.variantKey.split("|")[1] || "Blue",
            }}
            onSave={(patch) => {
              handleFashionSave(patch.size ?? "L", patch.colour ?? "Blue");
              setFashionMatrixOpen(false);
            }}
          />
          <FitAndFabricModal
            open={fashionFitOpen}
            onClose={() => setFashionFitOpen(false)}
            product={activeItem.product}
            selection={{
              size: activeItem.item.variantKey.split("|")[0] || "L",
              colour: activeItem.item.variantKey.split("|")[1] || "Blue",
            }}
            onSave={(patch) => {
              handleFashionSave(patch.size ?? "L");
              setFashionFitOpen(false);
            }}
          />
          <EditSizeModal
            open={fashionEditSizeOpen}
            onClose={() => setFashionEditSizeOpen(false)}
            product={activeItem.product}
            currentSize={activeItem.item.variantKey.split("|")[0] || "L"}
            currentColour={activeItem.item.variantKey.split("|")[1] || "Blue"}
            onConfirm={(newSize) => {
              handleFashionSave(newSize);
              setFashionEditSizeOpen(false);
            }}
          />
          <RentalEnquiryModal
            open={rentalOpen}
            onClose={() => setRentalOpen(false)}
            product={activeItem.product}
            size={activeItem.item.variantKey.split("|")[0] || "L"}
            colour={activeItem.item.variantKey.split("|")[1] || "Blue"}
          />

          {/* Beauty Modals */}
          <ShadeAndSuitabilityModal
            open={shadeOpen}
            onClose={() => setShadeOpen(false)}
            product={activeItem.product}
            selection={{
              shade: activeItem.item.variantKey.replace("shade:", ""),
            }}
            onSelectShade={handleBeautyShadeSave}
          />
          <SampleOrFullSizeModal
            open={formatOpen}
            onClose={() => setFormatOpen(false)}
            product={activeItem.product}
            selection={{}}
            onSelectFormat={handleBeautyFormatSave}
          />
          <IngredientsAndSafetyModal
            open={ingredientsOpen}
            onClose={() => setIngredientsOpen(false)}
            product={activeItem.product}
            selection={{}}
          />
          <BatchAndExpiryModal
            open={batchOpen}
            onClose={() => setBatchOpen(false)}
            product={activeItem.product}
            selection={{}}
          />

          {/* Electronics Modals */}
          <SuitabilityModal
            open={suitabilityOpen}
            onClose={() => setSuitabilityOpen(false)}
            product={activeItem.product}
            selection={{}}
            onSave={(patch) => {
              if (patch.configuration) {
                update(activeItem.lineKey, { variantKey: patch.configuration });
                toast(`Updated to configuration: ${patch.configuration}`);
              } else {
                toast("Updated configuration preference");
              }
              setSuitabilityOpen(false);
            }}
          />
          <CompatibilityModal
            open={compatibilityOpen}
            onClose={() => setCompatibilityOpen(false)}
            product={activeItem.product}
            selection={{}}
            onSave={() => {
              toast("Compatibility confirmed");
              setCompatibilityOpen(false);
            }}
          />
          <HomeFitModal
            open={homeFitOpen}
            onClose={() => setHomeFitOpen(false)}
            product={activeItem.product}
            selection={{}}
            onSave={() => {
              toast("Home fit verified");
              setHomeFitOpen(false);
            }}
          />
          <WarrantyModal
            open={warrantyOpen}
            onClose={() => setWarrantyOpen(false)}
            product={activeItem.product}
          />
        </>
      )}
    </TaskPage>
  );
}
