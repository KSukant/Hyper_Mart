"use client";

import Link from "next/link";
import {
  Trash2,
  Heart,
  Minus,
  Plus,
  Tv,
  Refrigerator,
  Laptop,
  Smartphone,
  Headphones,
  Settings,
  Home,
  ShieldCheck,
  Wrench,
  Truck,
  RotateCw,
} from "lucide-react";
import type { CartItem, Product } from "@/types";
import { ProductArt } from "@/components/product/ProductArt";
import { brandName } from "@/lib/catalog";
import type { getPrice } from "@/lib/pricing";
import type { getStock } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface ElectronicsCartItemProps {
  item: CartItem;
  product: Product;
  lineKey: string;
  price: ReturnType<typeof getPrice>;
  stock: ReturnType<typeof getStock>;
  onQtyChange: (newQty: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
  onEdit: (modal: "config" | "compatibility" | "homeFit" | "warranty" | "installation") => void;
}

export function ElectronicsCartItem({
  item,
  product: p,
  price,
  onQtyChange,
  onRemove,
  onSaveForLater,
  onEdit,
}: ElectronicsCartItemProps) {
  const a = p.attrs;
  const isElec = a.department === "electronics";
  const brand = brandName(p);

  // Dynamic Category Icon
  const getDeviceIcon = () => {
    if (p.categoryId === "elec-tv") return <Tv className="h-4 w-4 text-[#085A2E] shrink-0" />;
    if (p.categoryId === "elec-appliances")
      return <Refrigerator className="h-4 w-4 text-[#085A2E] shrink-0" />;
    if (p.categoryId === "elec-mobiles" || p.categoryId === "elec-refurbished")
      return <Smartphone className="h-4 w-4 text-[#085A2E] shrink-0" />;
    if (p.categoryId === "elec-audio")
      return <Headphones className="h-4 w-4 text-[#085A2E] shrink-0" />;
    return <Laptop className="h-4 w-4 text-[#085A2E] shrink-0" />;
  };

  // Variant/Config
  const configText =
    item.variantKey && item.variantKey !== "default"
      ? item.variantKey
      : isElec && a.specs && a.specs[0]
      ? `${a.specs[0].label}: ${a.specs[0].value}`
      : "Standard Configuration (Official Indian Model)";

  // Warranty
  const warrantyMonths = isElec ? a.warranty?.months ?? 12 : 12;
  const warrantyYrs = Math.round(warrantyMonths / 12);
  const warrantyText = `${warrantyYrs >= 1 ? `${warrantyYrs} Year` : `${warrantyMonths} Months`} Brand Warranty (Doorstep technician support)`;

  // Installation
  const isHeavy = p.handling.includes("heavy") || p.handling.includes("two_person");
  const installRequired = isElec && a.installation?.required;
  const installFee = isElec && a.installation ? a.installation.fee : 499;
  const installText = installRequired
    ? `Certified technician installation (Free / Included)`
    : isHeavy
    ? `Doorstep room-of-choice placement included`
    : "Plug & play setup (Self-assembly under 2 mins)";

  const isRefurb = isElec && a.refurbished;
  const refurbText = isRefurb
    ? `Refurbished ${a.refurbished?.grade} · 45-point inspection certified`
    : null;

  const lineTotal = price.finalPrice * item.qty;

  return (
    <div className="space-y-3">
      {/* Main Item Card */}
      <div className="rounded-3xl border border-[#DCEDD2] bg-white p-5 sm:p-6 shadow-2xs">
        <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
          {/* Left Product Image */}
          <div className="sm:col-span-4">
            <Link
              href={`/product/${p.slug}`}
              className="block relative aspect-square min-h-[200px] w-full overflow-hidden rounded-2xl bg-[#FAFAFA] border border-line/60 p-4 transition hover:opacity-95"
            >
              <ProductArt product={p} className="h-full w-full object-contain" />
            </Link>
          </div>

          {/* Right Product Details & Attributes */}
          <div className="sm:col-span-8 space-y-3">
            {/* Header: Title, Brand, Delete */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#085A2E]">
                  {brand} &bull; {p.categoryId || "Electronics"}
                </span>
                <Link
                  href={`/product/${p.slug}`}
                  className="block text-xl font-extrabold text-ink hover:text-[#085A2E] transition sm:text-2xl leading-tight mt-0.5"
                >
                  {p.name}
                </Link>
                <p className="text-xs text-muted mt-0.5 line-clamp-1">
                  {p.description || "Official brand electronic appliance with standard warranty."}
                </p>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-neutral-100 hover:text-danger transition shrink-0 cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Price Row */}
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="font-display text-2xl font-extrabold text-[#085A2E]">
                ₹ {price.finalPrice.toLocaleString("en-IN")}
              </span>
              {p.mrp > price.finalPrice && (
                <span className="text-xs font-semibold text-muted line-through">
                  ₹ {p.mrp.toLocaleString("en-IN")}
                </span>
              )}
              {price.discountPct > 0 && (
                <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-2 py-0.5 text-[11px] font-black text-[#085A2E]">
                  {price.discountPct}% OFF
                </span>
              )}
              {price.memberPrice && (
                <span className="rounded-md bg-[#FFD84A]/30 border border-[#FFD84A] px-2 py-0.5 text-[10px] font-bold text-ink">
                  Member ₹{price.memberPrice}
                </span>
              )}
            </div>

            {/* Electronics Attribute Rows */}
            <div className="divide-y divide-[#DCEDD2]/70 rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/35 px-3.5 py-1 text-xs sm:text-sm">
              {/* 1. Configuration */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  {getDeviceIcon()}
                  <div>
                    <span className="block text-[10px] text-muted uppercase font-bold">
                      Hardware Spec / Model
                    </span>
                    <strong className="block text-ink font-bold line-clamp-1 text-xs sm:text-sm">
                      {configText}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("config")}
                  className="text-xs font-bold text-[#085A2E] hover:underline cursor-pointer"
                >
                  Edit &rsaquo;
                </button>
              </div>

              {/* 2. Compatibility */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Settings className="h-4 w-4 text-[#085A2E] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-muted uppercase font-bold">
                      Device compatibility
                    </span>
                    <strong className="block text-ink font-bold text-xs sm:text-sm">
                      Verified hardware compatibility confirmed
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("compatibility")}
                  className="text-xs font-bold text-[#085A2E] hover:underline cursor-pointer"
                >
                  Check &rsaquo;
                </button>
              </div>

              {/* 3. Home Fit */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Home className="h-4 w-4 text-[#085A2E] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-muted uppercase font-bold">
                      Home fit &amp; space
                    </span>
                    <strong className="block text-ink font-bold text-xs sm:text-sm">
                      Authorised dimensions checked for entry clearance
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("homeFit")}
                  className="text-xs font-bold text-[#085A2E] hover:underline cursor-pointer"
                >
                  Fit details &rsaquo;
                </button>
              </div>

              {/* 4. Warranty & Support */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#085A2E] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-muted uppercase font-bold">
                      Digital warranty
                    </span>
                    <strong className="block text-ink font-bold text-xs sm:text-sm">
                      {warrantyText}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("warranty")}
                  className="text-xs font-bold text-[#085A2E] hover:underline cursor-pointer"
                >
                  Certificate &rsaquo;
                </button>
              </div>

              {/* 5. Installation */}
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <Wrench className="h-4 w-4 text-[#085A2E] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-muted uppercase font-bold">
                      Installation &amp; setup
                    </span>
                    <strong className="block text-ink font-bold line-clamp-1 text-xs sm:text-sm">
                      {installText}
                    </strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit("installation")}
                  className="text-xs font-bold text-[#085A2E] hover:underline cursor-pointer"
                >
                  Schedule &rsaquo;
                </button>
              </div>
            </div>

            {/* Heavy Delivery Notice */}
            {isHeavy && (
              <div className="flex items-center gap-2 rounded-xl bg-[#F0F8EC] border border-[#DCEDD2] p-2.5 text-xs text-[#14532D]">
                <Truck className="h-3.5 w-3.5 shrink-0 text-[#085A2E]" />
                <span>
                  Heavy / large appliance: Handled by dedicated 2-person delivery crew with room-of-choice drop.
                </span>
              </div>
            )}

            {isRefurb && (
              <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                <RotateCw className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                <span>{refurbText} · 6-month HyperMart Renewed warranty included.</span>
              </div>
            )}

            {/* Quantity Stepper & Line Total */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-ink">Quantity</span>
                <div className="flex items-center gap-1.5 rounded-xl border border-line bg-bg p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={item.qty <= 1}
                    onClick={() => onQtyChange(Math.max(1, item.qty - 1))}
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center text-xs font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold tabular text-ink">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={item.qty >= p.maxQtyPerOrder}
                    onClick={() => onQtyChange(item.qty + 1)}
                    className="flex min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center text-xs font-bold text-ink hover:bg-white rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-[#085A2E] tabular">
                  ₹ {Math.round(lineTotal).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save For Later Action Card */}
      <button
        type="button"
        onClick={onSaveForLater}
        className="flex w-full items-center justify-between rounded-2xl border border-line/80 bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-neutral-50 shadow-2xs cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-muted" />
          <span>Save for later</span>
        </span>
        <span className="text-muted text-base">&rsaquo;</span>
      </button>
    </div>
  );
}
