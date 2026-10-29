"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Check, Bell, AlertCircle } from "lucide-react";
import type { Product } from "@/types";
import type { PdpSelection } from "../types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface AvailabilityMatrixModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSave: (updated: Partial<PdpSelection>) => void;
  onOpenNotifyModal?: (size: string, colour: string) => void;
}

type StockStatus = "available" | "few" | "unavailable" | "notify";

export function AvailabilityMatrixModal({
  open,
  onClose,
  product: p,
  selection,
  onSave,
  onOpenNotifyModal,
}: AvailabilityMatrixModalProps) {
  const a = p.attrs;
  const isFashion = a.department === "fashion";

  const colours = isFashion && a.colours ? a.colours : [
    { name: "Blue", hex: "#4B6B94" },
    { name: "Black", hex: "#171717" },
    { name: "Ivory", hex: "#F5F5DC" },
    { name: "Patterned", hex: "#9E9E9E" },
  ];

  const sizes = isFashion && a.sizes ? a.sizes : ["XS", "S", "M", "L", "XL"];

  const [selectedColour, setSelectedColour] = useState<string>(
    selection.colour ?? colours[0]?.name ?? "Blue"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    selection.size ?? sizes[3] ?? "L"
  );

  if (!open) return null;

  // Mock matrix data according to Screen 4
  const getMatrixStatus = (s: string, c: string): StockStatus => {
    if (s === "XS") {
      if (c === "Blue") return "available";
      if (c === "Black") return "few";
      if (c === "Ivory") return "unavailable";
      return "notify";
    }
    if (s === "S") {
      if (c === "Blue" || c === "Black") return "available";
      if (c === "Ivory") return "few";
      return "unavailable";
    }
    if (s === "M") {
      if (c === "Blue") return "few";
      return "available";
    }
    if (s === "L") {
      if (c === "Blue") return "available";
      if (c === "Black") return "few";
      if (c === "Ivory") return "unavailable";
      return "notify";
    }
    if (s === "XL") {
      if (c === "Blue") return "unavailable";
      if (c === "Black") return "notify";
      if (c === "Ivory") return "few";
      return "available";
    }
    return "available";
  };

  const currentStatus = getMatrixStatus(selectedSize, selectedColour);

  const handleCellClick = (s: string, c: string) => {
    setSelectedSize(s);
    setSelectedColour(c);
    const status = getMatrixStatus(s, c);
    if (status === "notify" || status === "unavailable") {
      toast(`Selected ${c} / Size ${s}`);
    }
  };

  const handleSave = () => {
    onSave({
      colour: selectedColour,
      size: selectedSize,
    });
    toast(`Variant saved: ${selectedColour} / Size ${selectedSize}`);
    onClose();
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Colour and size availability
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Choose a colour and size to see availability, images and add to bag.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Images (3 cols) */}
            <div className="lg:col-span-3 flex gap-3">
              <div className="flex flex-col gap-2 shrink-0">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative h-14 w-12 overflow-hidden rounded-xl bg-bg border border-line"
                  >
                    <Image
                      src={p.images[i]?.src ?? imageSrc}
                      alt=""
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                ))}
              </div>
              <div className="relative aspect-3/4 flex-1 overflow-hidden rounded-2xl bg-bg border border-line shadow-xs">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-2" />
              </div>
            </div>

            {/* Middle: Colour Swatches & Matrix (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Colour Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink">Colour</label>
                <div className="flex flex-wrap gap-3">
                  {colours.map((col) => {
                    const isSelected = selectedColour === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColour(col.name)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-1 rounded-2xl transition",
                          isSelected ? "ring-2 ring-black" : "hover:opacity-80"
                        )}
                      >
                        <span
                          className="h-12 w-16 rounded-xl border border-line shadow-xs block"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-[11px] font-bold text-ink">{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Availability Matrix Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-ink">Size availability</h3>
                <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line bg-bg/60 text-muted font-bold">
                        <th className="py-3 px-3.5">Size</th>
                        {colours.map((col) => (
                          <th key={col.name} className="py-3 px-3.5 text-center">
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/60">
                      {sizes.map((s) => (
                        <tr key={s} className="hover:bg-bg/30 transition">
                          <td className="py-3 px-3.5 font-extrabold text-ink">{s}</td>
                          {colours.map((col) => {
                            const status = getMatrixStatus(s, col.name);
                            const isCellActive = selectedSize === s && selectedColour === col.name;

                            return (
                              <td
                                key={col.name}
                                onClick={() => handleCellClick(s, col.name)}
                                className={cn(
                                  "py-3 px-3 text-center cursor-pointer transition",
                                  isCellActive && "bg-[#FAF0F6] ring-1 ring-inset ring-black font-bold"
                                )}
                              >
                                {status === "available" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink">
                                    <span className="h-2 w-2 rounded-full bg-black shrink-0" />
                                    <span>Available</span>
                                  </span>
                                )}
                                {status === "few" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                                    <span className="h-2 w-2 rounded-full border border-black shrink-0" />
                                    <span>Only a few available</span>
                                  </span>
                                )}
                                {status === "unavailable" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                                    <X className="h-3 w-3 inline text-muted" />
                                    <span>Temporarily unavailable</span>
                                  </span>
                                )}
                                {status === "notify" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                                    <Bell className="h-3 w-3" />
                                    <span>Notify me</span>
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend matching Screen 4 */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-black" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full border border-black" />
                    <span>Only a few available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <X className="h-3 w-3 inline text-muted" />
                    <span>Temporarily unavailable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bell className="h-3 w-3 text-ink" />
                    <span>Notify me</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selected Variant Sidebar (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-xs space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                  <Image src={imageSrc} alt="" fill className="object-contain p-2" />
                </div>
                <p className="text-[11px] text-muted text-center">
                  Colour may vary slightly by lighting and screen.
                </p>

                <div className="border-t border-line/60 pt-3 space-y-2">
                  <span className="text-[11px] font-medium text-muted block">Selected variant</span>
                  <strong className="text-sm font-extrabold text-ink block">
                    {selectedColour} / Size {selectedSize}
                  </strong>

                  {currentStatus === "available" || currentStatus === "few" ? (
                    <div className="text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <span className="h-2 w-2 rounded-full bg-emerald-600" />
                        <span>In stock</span>
                      </div>
                      <span className="text-[11px] text-muted block">Ships within 24 hours</span>
                    </div>
                  ) : (
                    <div className="text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-danger">
                        <AlertCircle className="h-3.5 w-3.5 text-danger" />
                        <span>Currently unavailable</span>
                      </div>
                      <span className="text-[11px] text-muted block">Restocking soon</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={currentStatus === "unavailable" || currentStatus === "notify"}
                    className="w-full rounded-2xl bg-[#17201B] hover:bg-black disabled:opacity-40 py-3 text-xs font-extrabold text-white shadow-md transition"
                  >
                    Save variant
                  </button>

                  <p className="text-[10px] text-muted leading-tight">
                    This variant will be retained to the product page, cart, checkout and your order
                    record.
                  </p>
                </div>

                {/* Size unavailable? Notify me */}
                <div className="border-t border-line/60 pt-3 space-y-2">
                  <span className="text-xs font-bold text-ink block">Size unavailable?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenNotifyModal) onOpenNotifyModal(selectedSize, selectedColour);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-line bg-white hover:bg-bg py-2.5 text-xs font-bold text-ink transition"
                  >
                    <Bell className="h-3.5 w-3.5 text-ink" />
                    <span>Notify me when this size is available</span>
                  </button>
                  <p className="text-[10px] text-muted text-center">
                    We&apos;ll email you when it&apos;s back in stock.
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
