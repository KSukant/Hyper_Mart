"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Sparkles, Shield, Package, Calendar, Info, CheckCircle2, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useCart } from "@/store";

interface RentalEnquiryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  size?: string;
  colour?: string;
}

function formatDateISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function RentalEnquiryModal({
  open,
  onClose,
  product: p,
  size,
  colour,
}: RentalEnquiryModalProps) {
  const a = p.attrs;
  const isFashion = a.department === "fashion";

  const rentable = isFashion ? a.rentable : undefined;
  const perDay = rentable?.perDay ?? (p.price > 10000 ? 1200 : 83);
  const deposit = rentable?.deposit ?? (p.price > 10000 ? 5000 : 1000);
  const minDays = rentable?.minDays ?? 2;

  // Default dates starting today
  const todayStr = useMemo(() => formatDateISO(new Date()), []);
  const defaultReturnStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + Math.max(minDays, 4));
    return formatDateISO(d);
  }, [minDays]);

  const [selectedSize, setSelectedSize] = useState(
    size ?? (isFashion ? a.sizes[0] ?? "Free size" : "L")
  );
  const [selectedColour, setSelectedColour] = useState(
    colour ?? (isFashion && a.colours ? a.colours[0]?.name : "Blue")
  );
  const [startDate, setStartDate] = useState(todayStr);
  const [returnDate, setReturnDate] = useState(defaultReturnStr);
  const [submitted, setSubmitted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  if (!open) return null;

  // Calculate rental duration
  const sTime = new Date(startDate).getTime();
  const rTime = new Date(returnDate).getTime();
  const diffDays = Math.max(
    minDays,
    Math.round((rTime - sTime) / (1000 * 60 * 60 * 24)) || minDays
  );

  const rentalFee = perDay * diffDays;
  const refundableDeposit = deposit;
  const total = rentalFee + refundableDeposit;

  const handleBookRental = () => {
    console.log("--> handleBookRental CALLED");
    cart.add({
      productId: p.id,
      variantKey: `${selectedSize}|${selectedColour}|rental`,
      qty: 1,
      rental: {
        startDate,
        returnDate,
        durationDays: diffDays,
        perDayPrice: perDay,
        deposit: refundableDeposit,
        totalRentalFee: rentalFee,
      },
    });
    setSubmitted(true);
    toast(`Added ${p.name} (${diffDays}-day occasion rental) to your cart!`);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast("Rental enquiry submitted! Our concierge team will contact you within 2 hours.");
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";
  const validImages = p.images.length > 0 ? p.images.slice(0, 4) : [{ src: imageSrc, alt: p.name }];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to product
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Occasion Rental Available
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-bg text-muted hover:text-ink"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Media (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 shrink-0">
                  {validImages.map((img, i) => (
                    <div
                      key={img.src || i}
                      className="relative h-12 w-10 overflow-hidden rounded-lg bg-bg border border-line"
                    >
                      <Image
                        src={img.src}
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
              <div>
                <strong className="block text-sm font-extrabold text-ink">{p.name}</strong>
                <p className="text-[11px] text-muted">
                  {p.highlights?.[0] ?? "Handcrafted authentic luxury wear for weddings and festivals."}
                </p>
                <div className="mt-2 text-xs font-bold text-primary">
                  Retail Value: {formatINR(p.price)}
                </div>
              </div>
            </div>

            {/* Middle: Rental Enquiry Form (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Rental enquiry</h2>
                <p className="mt-1 text-xs text-muted">
                  Reserve authentic wedding &amp; festival wear without paying the full retail price.
                </p>
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-muted mb-1">
                    Selected size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none focus:bg-white focus:border-primary"
                  >
                    {(isFashion ? a.sizes : ["Free size"]).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted mb-1">
                    Selected colour
                  </label>
                  <select
                    value={selectedColour}
                    onChange={(e) => setSelectedColour(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none focus:bg-white focus:border-primary"
                  >
                    {(isFashion && a.colours ? a.colours.map((c) => c.name) : ["Default"]).map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-1.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      Event start date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={todayStr}
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          if (e.target.value > returnDate) {
                            setReturnDate(e.target.value);
                          }
                        }}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none focus:bg-white focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-muted mb-1">
                      Return date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={startDate}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full rounded-xl border border-line bg-bg px-3 py-2 text-xs font-bold text-ink focus:outline-none focus:bg-white focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>Minimum rental: {minDays} days</span>
                  <span className="font-bold text-ink">{diffDays} days rental period</span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="rounded-2xl border border-line bg-bg/50 p-4 text-xs space-y-2">
                <div className="flex justify-between text-muted">
                  <span>Rental rate ({diffDays} days @ {formatINR(perDay)}/day)</span>
                  <span className="font-bold text-ink">{formatINR(rentalFee)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Refundable security deposit (100% returned)</span>
                  <span className="font-bold text-ink">{formatINR(refundableDeposit)}</span>
                </div>
                <div className="flex justify-between border-t border-line/60 pt-2 font-extrabold text-sm text-ink">
                  <span>Total (payable upon booking)</span>
                  <span className="font-display text-base text-primary">{formatINR(total)}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Complimentary Dry Cleaning</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Professional sanitization and dry cleaning included. Return as-is without washing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">100% Deposit Refund Guarantee</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Minor natural wear is normal and fully covered. Security deposit refunded to your account within 24 hours of item return.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Package className="h-4 w-4 text-muted shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Doorstep Pickup Included</strong>
                    <p className="text-[11px] text-muted leading-tight">
                      Our courier will collect the garment right at your doorstep on the scheduled return date.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              {submitted ? (
                <div className="rounded-2xl bg-[#F0F8EC] border border-[#DCEDD2] p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#085A2E] font-bold">
                    <CheckCircle2 className="h-5 w-5 text-[#085A2E] shrink-0" />
                    <span>Occasion rental reserved! Product added to your shopping cart.</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push("/cart");
                      }}
                      className="flex-1 rounded-xl bg-[#085A2E] hover:bg-[#064825] py-2.5 text-xs font-extrabold text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      View Cart &amp; Checkout
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-line bg-white hover:bg-bg px-4 py-2.5 text-xs font-bold text-ink transition cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleBookRental}
                    className="w-full rounded-2xl bg-[#085A2E] hover:bg-[#064825] py-3.5 text-xs font-extrabold text-white shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Book rental &amp; add to cart ({formatINR(total)})</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full rounded-2xl border border-line bg-white hover:bg-bg py-2.5 text-xs font-bold text-muted hover:text-ink transition cursor-pointer"
                  >
                    Request concierge quote instead
                  </button>
                </div>
              )}
            </div>

            {/* Right: How It Works Timeline (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-line bg-white p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-ink">How rental works</h3>

              <div className="relative pl-6 space-y-5 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    1
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Choose dates &amp; submit</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Select event dates. Minimum rental period is {minDays} days.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    2
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Instant confirmation</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Our fashion concierge verifies garment availability and sends confirmed booking.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    3
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Doorstep delivery</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Arrives freshly dry-cleaned in protective wardrobe garment bags.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    4
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Wear &amp; celebrate</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Enjoy your special event with premium designer craftsmanship.
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-white text-[9px] font-black">
                    5
                  </span>
                  <div>
                    <strong className="font-bold text-ink block">Doorstep pickup &amp; refund</strong>
                    <span className="text-[11px] text-muted block leading-tight">
                      Hassle-free courier pickup; {formatINR(refundableDeposit)} deposit refunded within 24 hours.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
