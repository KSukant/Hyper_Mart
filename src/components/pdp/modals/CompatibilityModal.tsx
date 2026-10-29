"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ArrowLeft,
  Laptop,
  CheckCircle2,
  Info,
  ShoppingCart,
  CreditCard,
  FileText,
  Sliders,
  ChevronDown,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

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
  const [savedDevice, setSavedDevice] = useState("Laptop model 2024");
  const [deviceType, setDeviceType] = useState("Laptop");
  const [brand, setBrand] = useState("HP / HyperMart");
  const [modelInput, setModelInput] = useState("Laptop model 2024");
  const [accessoryType, setAccessoryType] = useState("USB-C dock");

  if (!open) return null;

  const handleSave = () => {
    onSave({ compatibilityConfirmed: true });
    toast("Compatibility saved: Compatible with your device");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Check compatibility
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Make sure this accessory works with your device. Save the result for a faster shopping experience.
            </p>
          </div>

          {/* 3 Columns Section */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Column 1: Select or Enter Device (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-4">
              <div>
                <label className="block text-xs font-bold text-ink">
                  1. Select your saved device (optional)
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={savedDevice}
                    onChange={(e) => {
                      setSavedDevice(e.target.value);
                      setModelInput(e.target.value);
                    }}
                    className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2.5 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                  >
                    <option value="Laptop model 2024">Laptop model 2024</option>
                    <option value="14 Everyday Laptop">14&quot; Everyday Laptop (TL14-512)</option>
                    <option value="MacBook Air M2 / M3">MacBook Air M2 / M3</option>
                    <option value="Galaxy Book Pro">Samsung Galaxy Book Pro</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                </div>
              </div>

              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-line/60" />
                </div>
                <span className="relative bg-white px-2 text-[10px] font-bold text-muted uppercase">
                  OR
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-extrabold text-ink">Enter device details</p>
                <div>
                  <label className="block text-[11px] font-semibold text-muted">Device type</label>
                  <div className="relative mt-1">
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                    >
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop PC</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Phone">Smartphone</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted">Brand (optional)</label>
                  <div className="relative mt-1">
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                    >
                      <option value="HP / HyperMart">HP / HyperMart</option>
                      <option value="Apple">Apple</option>
                      <option value="Dell">Dell</option>
                      <option value="Lenovo">Lenovo</option>
                      <option value="Samsung">Samsung</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-muted">Model or generation</label>
                  <input
                    type="text"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                    placeholder="Laptop model 2024"
                    className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none"
                  />
                  <p className="mt-1 text-[10px] text-muted">Examples: Model 2024, Gen 8, A1234</p>
                </div>
              </div>
            </div>

            {/* Column 2: Select Accessory (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-4">
              <div>
                <label className="block text-xs font-bold text-ink">
                  2. Select accessory
                </label>
                <div className="relative mt-1.5">
                  <select
                    value={accessoryType}
                    onChange={(e) => setAccessoryType(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-line bg-bg px-3 py-2.5 text-xs font-bold text-ink focus:border-[#1D4E89] focus:bg-white focus:outline-none pr-8"
                  >
                    <option value="USB-C dock">USB-C dock</option>
                    <option value="65W GaN Charger">65W GaN Type-C Charger</option>
                    <option value="Wireless Mouse & Keyboard">Wireless Mouse &amp; Keyboard</option>
                    <option value="External 1080p Monitor">External Display Monitor</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                </div>
              </div>

              {/* Accessory Visual Mock */}
              <div className="rounded-2xl border border-line/60 bg-[#F8FAF7] p-4 text-center">
                <div className="relative mx-auto aspect-16/9 w-full max-w-[200px] overflow-hidden rounded-xl">
                  {/* Stylized dock illustration */}
                  <div className="h-full w-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-2 shadow-inner flex flex-col justify-between">
                    <div className="flex justify-between items-center px-2 pt-2">
                      <div className="h-2 w-4 bg-gray-600 rounded-xs" />
                      <div className="h-2 w-3 bg-gray-700 rounded-xs" />
                      <div className="h-2 w-3 bg-gray-700 rounded-xs" />
                      <div className="h-2.5 w-6 bg-gray-800 rounded-xs" />
                    </div>
                    <div className="text-[10px] font-black text-gray-700 tracking-wider">
                      USB-C MULTIPORT DOCK
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-left">
                  <strong className="block text-xs font-bold text-ink">
                    Accessory: {accessoryType}
                  </strong>
                  <p className="text-[11px] text-muted mt-0.5">
                    Multiport adapter for expanded connectivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Compatibility Result (4 cols) */}
            <div className="space-y-4 lg:col-span-4 rounded-2xl border border-line/80 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-muted">3. Compatibility result</p>

              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17201B] text-white shrink-0">
                  <Check className="h-4 w-4 stroke-[3]" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-ink">Compatible</h3>
                  <p className="text-[11px] text-muted">
                    This accessory is compatible with your selected device.
                  </p>
                </div>
              </div>

              {/* Item Summary Chips */}
              <div className="rounded-xl border border-line bg-bg p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4 text-muted" />
                    <div>
                      <span className="text-[10px] text-muted block">Selected device</span>
                      <strong className="font-bold text-ink">{modelInput}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Editing device details")}
                    className="text-[11px] font-bold text-[#1D4E89] hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="border-t border-line/60 pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-muted" />
                    <div>
                      <span className="text-[10px] text-muted block">Accessory</span>
                      <strong className="font-bold text-ink">{accessoryType}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast("Editing accessory type")}
                    className="text-[11px] font-bold text-[#1D4E89] hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Compatibility Notes */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-ink">
                  <Info className="h-3.5 w-3.5 text-muted" />
                  <span>Compatibility notes</span>
                </div>
                <ul className="space-y-1 text-[11px] text-muted pl-5 list-disc leading-relaxed">
                  <li>Supports video, data, and power delivery</li>
                  <li>Requires a USB-C port with DisplayPort Alt Mode</li>
                  <li>Performance may vary by device configuration</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-[#17201B] hover:bg-black text-white py-3 text-xs font-black transition shadow-sm"
                >
                  Save compatibility
                </button>
                <p className="mt-2 text-center text-[10px] text-muted">
                  Your saved result will be available on this product page, in your cart, at checkout, and in your order record.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Journey Strip Matching Screen 3 */}
          <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
            <p className="text-xs font-extrabold text-ink">
              Your compatibility result will appear in:
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {/* Step 1: Product page */}
              <div className="rounded-xl border border-line bg-white p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Compatible
                  </span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-ink">Product page</strong>
                  <p className="text-[10px] text-muted mt-0.5 leading-snug">
                    See your saved compatibility right on the product page.
                  </p>
                </div>
              </div>

              {/* Step 2: Cart */}
              <div className="rounded-xl border border-line bg-white p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Compatible
                  </span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-ink">Cart</strong>
                  <p className="text-[10px] text-muted mt-0.5 leading-snug">
                    Your compatibility shows in the cart.
                  </p>
                </div>
              </div>

              {/* Step 3: Checkout */}
              <div className="rounded-xl border border-line bg-white p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Compatible
                  </span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-ink">Checkout</strong>
                  <p className="text-[10px] text-muted mt-0.5 leading-snug">
                    Confirmation during checkout for a worry-free purchase.
                  </p>
                </div>
              </div>

              {/* Step 4: Order record */}
              <div className="rounded-xl border border-line bg-white p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Compatible
                  </span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-ink">Order record</strong>
                  <p className="text-[10px] text-muted mt-0.5 leading-snug">
                    View your saved compatibility in your order history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
