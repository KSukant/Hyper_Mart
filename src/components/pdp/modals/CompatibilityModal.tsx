"use client";

import { useState } from "react";
import {
  X,
  Check,
  ArrowLeft,
  Tv,
  Laptop,
  Smartphone,
  Refrigerator,
  Headphones,
  AlertTriangle,
  XCircle,
  Plus,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";
import {
  getCategoryCompatibleAccessories,
  type CompatibleAccessoryItem,
} from "@/lib/electronicsData";
import { useCart } from "@/store";
import { formatINR } from "@/lib/format";

interface CompatibilityModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
}

export function CompatibilityModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
}: CompatibilityModalProps) {
  const cart = useCart();
  const accessories = getCategoryCompatibleAccessories(p);

  const [selectedAccId, setSelectedAccId] = useState<string>(
    accessories[0]?.id || "acc-default"
  );
  const [deviceModelInput, setDeviceModelInput] = useState<string>(
    p.attrs.department === "electronics" ? p.attrs.model : p.name
  );

  if (!open) return null;

  const currentAcc =
    accessories.find((a) => a.id === selectedAccId) || accessories[0];

  const handleSave = () => {
    onSave({ compatibilityConfirmed: true });
    toast(`Compatibility verified for ${currentAcc?.name || p.name}`);
    onClose();
  };

  const handleAddAccessoryToCart = (item: CompatibleAccessoryItem) => {
    if (!item.price) return;
    toast(`Added ${item.name} (${formatINR(item.price)}) to your cart`);
  };

  const getDeviceIcon = () => {
    if (p.categoryId === "elec-tv") return <Tv className="h-4 w-4 text-[#085A2E]" />;
    if (p.categoryId === "elec-appliances")
      return <Refrigerator className="h-4 w-4 text-[#085A2E]" />;
    if (p.categoryId === "elec-mobiles" || p.categoryId === "elec-refurbished")
      return <Smartphone className="h-4 w-4 text-[#085A2E]" />;
    if (p.categoryId === "elec-audio")
      return <Headphones className="h-4 w-4 text-[#085A2E]" />;
    return <Laptop className="h-4 w-4 text-[#085A2E]" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#085A2E]" /> Back to product
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex rounded-full bg-[#F0F8EC] border border-[#DCEDD2] px-2.5 py-0.5 text-xs font-bold text-[#085A2E]">
              HyperMart Certified Compatibility
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100 text-muted hover:text-ink cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#085A2E] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                Hardware Check
              </span>
              <span className="text-xs font-bold text-muted">
                {p.categoryId}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl mt-1">
              Check Compatibility with {p.name}
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Verify mounting brackets, cables, stabilisers, and accessories tailored strictly for this device before ordering.
            </p>
          </div>

          {/* 3 Columns Section */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Column 1: Current Selected Device (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/40 p-4">
              <div className="flex items-center gap-2">
                {getDeviceIcon()}
                <h3 className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                  1. Target Device Profile
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink">
                  Selected Device
                </label>
                <div className="mt-1.5 rounded-xl border border-line bg-white p-3 shadow-2xs">
                  <strong className="block text-xs font-extrabold text-ink line-clamp-2">
                    {p.name}
                  </strong>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px]">
                    <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-1.5 py-0.5 font-bold text-[#085A2E]">
                      SKU: {p.id}
                    </span>
                    {p.attrs.department === "electronics" && p.attrs.specs?.[0] && (
                      <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-semibold text-neutral-700">
                        {p.attrs.specs[0].label}: {p.attrs.specs[0].value}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink">
                  Enter existing model/version (optional)
                </label>
                <input
                  type="text"
                  value={deviceModelInput}
                  onChange={(e) => setDeviceModelInput(e.target.value)}
                  placeholder="e.g. Living room wall, Gen 2, etc."
                  className="mt-1 w-full rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-ink focus:border-[#085A2E] focus:outline-none"
                />
                <p className="mt-1 text-[10px] text-muted">
                  Used to cross-check socket types, VESA spacing, or OS version.
                </p>
              </div>

              <div className="rounded-xl border border-[#DCEDD2] bg-white p-3 text-[11px] text-neutral-700 space-y-1">
                <span className="font-bold text-[#085A2E] block">
                  Authorised Fit Guarantee:
                </span>
                <p className="leading-relaxed">
                  Accessories marked &ldquo;Compatible&rdquo; are tested by HyperMart technicians with this exact product family.
                </p>
              </div>
            </div>

            {/* Column 2: Select Category-Accurate Accessory (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#085A2E]">
                  2. Select Accessory to Test
                </label>
                <p className="text-[11px] text-muted mt-0.5">
                  Verified accessories for {p.categoryId}:
                </p>
              </div>

              {/* List of accessories */}
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {accessories.map((acc) => {
                  const isSelected = acc.id === currentAcc?.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setSelectedAccId(acc.id)}
                      className={cn(
                        "w-full text-left rounded-xl p-3 border transition cursor-pointer flex flex-col gap-1",
                        isSelected
                          ? "border-[#085A2E] bg-[#F0F8EC] shadow-2xs"
                          : "border-line bg-white hover:border-[#07834B]/40 hover:bg-neutral-50/50"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                          {acc.category}
                        </span>
                        {acc.status === "compatible" && (
                          <span className="rounded-full bg-[#085A2E] text-white px-1.5 py-0.2 text-[9px] font-black">
                            Compatible
                          </span>
                        )}
                        {acc.status === "compatible_with_limits" && (
                          <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[9px] font-black">
                            With Limits
                          </span>
                        )}
                        {acc.status === "not_compatible" && (
                          <span className="rounded-full bg-rose-600 text-white px-1.5 py-0.2 text-[9px] font-black">
                            Incompatible
                          </span>
                        )}
                      </div>
                      <strong className="text-xs font-bold text-ink">
                        {acc.name}
                      </strong>
                      <div className="flex items-center justify-between text-[11px] mt-1 text-muted">
                        <span>{acc.model}</span>
                        {acc.price && (
                          <span className="font-extrabold text-[#085A2E]">
                            {formatINR(acc.price)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Compatibility Result (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-[#085A2E]">
                3. Compatibility Verdict
              </p>

              {currentAcc?.status === "compatible" && (
                <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC] p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#085A2E] text-white shrink-0 shadow-xs">
                      <Check className="h-5 w-5 stroke-[3]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#085A2E]">
                        Fully Compatible
                      </h3>
                      <p className="text-[11px] text-[#14532D]">
                        Guaranteed 100% plug-and-play match.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#14532D] leading-relaxed pt-1">
                    {currentAcc.notes}
                  </p>
                </div>
              )}

              {currentAcc?.status === "compatible_with_limits" && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-600 text-white shrink-0 shadow-xs">
                      <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-amber-900">
                        Compatible with Limits
                      </h3>
                      <p className="text-[11px] text-amber-800">
                        Functional with specific bandwidth/power constraints.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed pt-1">
                    {currentAcc.notes}
                  </p>
                </div>
              )}

              {currentAcc?.status === "not_compatible" && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3.5 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-rose-600 text-white shrink-0 shadow-xs">
                      <XCircle className="h-4 w-4 stroke-[2.5]" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-rose-900">
                        Hardware Incompatible
                      </h3>
                      <p className="text-[11px] text-rose-800">
                        Do not purchase for this device.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed pt-1">
                    {currentAcc.notes}
                  </p>
                </div>
              )}

              {/* Accessory Purchase Shortcut */}
              {currentAcc?.price && currentAcc.status !== "not_compatible" && (
                <div className="rounded-xl border border-line bg-bg p-3 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-muted block uppercase font-bold">
                      Add to order
                    </span>
                    <strong className="text-xs font-bold text-ink">
                      {formatINR(currentAcc.price)}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddAccessoryToCart(currentAcc)}
                    className="inline-flex items-center gap-1 rounded-xl bg-[#085A2E] hover:bg-[#064825] text-white px-3 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-[#085A2E] hover:bg-[#064825] text-white py-3 text-xs font-black transition shadow-sm cursor-pointer"
                >
                  Confirm &amp; Save Compatibility
                </button>
                <p className="mt-2 text-center text-[10px] text-muted">
                  Your verified compatibility will be saved to this product card, your cart, and your order record.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Journey Strip */}
          <div className="rounded-2xl border border-[#DCEDD2] bg-[#F0F8EC]/50 p-4 space-y-3">
            <p className="text-xs font-extrabold text-[#085A2E]">
              Your verified compatibility appears throughout your journey:
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-line bg-white p-3 space-y-1">
                <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-1.5 py-0.5 text-[10px] font-extrabold text-[#085A2E] inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Step 1
                </span>
                <strong className="block text-xs font-bold text-ink mt-1">Product Page</strong>
                <p className="text-[10px] text-muted leading-snug">
                  Verified compatibility badge shown on the main product view.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-white p-3 space-y-1">
                <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-1.5 py-0.5 text-[10px] font-extrabold text-[#085A2E] inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Step 2
                </span>
                <strong className="block text-xs font-bold text-ink mt-1">Electronics Cart</strong>
                <p className="text-[10px] text-muted leading-snug">
                  Hardware match confirmed next to warranty and installation choices.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-white p-3 space-y-1">
                <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-1.5 py-0.5 text-[10px] font-extrabold text-[#085A2E] inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Step 3
                </span>
                <strong className="block text-xs font-bold text-ink mt-1">Checkout Review</strong>
                <p className="text-[10px] text-muted leading-snug">
                  Pre-installation checklist guarantees the technician brings correct mounts.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-white p-3 space-y-1">
                <span className="rounded-md bg-[#F0F8EC] border border-[#DCEDD2] px-1.5 py-0.5 text-[10px] font-extrabold text-[#085A2E] inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Step 4
                </span>
                <strong className="block text-xs font-bold text-ink mt-1">Order Tracking</strong>
                <p className="text-[10px] text-muted leading-snug">
                  Digital record saved with warranty card for easy reference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
