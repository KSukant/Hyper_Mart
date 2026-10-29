"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, X, Mail, Smartphone, Check, Bell, ChevronRight, HelpCircle, FileText } from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

interface NotifyMeModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  size?: string;
  colour?: string;
}

export function NotifyMeModal({
  open,
  onClose,
  product: p,
  size = "M (Medium)",
  colour = "Grey",
}: NotifyMeModalProps) {
  const [channel, setChannel] = useState<"email" | "sms">("email");
  const [contact, setContact] = useState<string>("shopper@hypermart.in");
  const [consent, setConsent] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!open) return null;

  const handleSave = () => {
    if (!consent) {
      toast("Please consent to receiving stock alerts");
      return;
    }
    setSaved(true);
    toast(`Alert saved for ${size} / ${colour}`);
  };

  const imageSrc = p.images[0]?.src ?? "/products/fashion/manyavar-mens-cotton-kurta-1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Product Media (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg border border-line">
                <Image src={imageSrc} alt={p.name} fill className="object-contain p-2" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-xl bg-bg border border-line"
                  >
                    <Image
                      src={p.images[idx]?.src ?? imageSrc}
                      alt=""
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Alert Form (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
                  Notify me when this size is available
                </h2>
                <p className="mt-1 text-xs text-muted">
                  We&apos;ll let you know as soon as the selected size is back in stock.
                </p>
              </div>

              {/* Product Mini Preview */}
              <div className="flex items-center gap-3.5 rounded-2xl bg-bg/50 p-3.5 border border-line">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white border border-line">
                  <Image src={imageSrc} alt="" fill className="object-contain p-0.5" />
                </div>
                <div className="text-xs">
                  <strong className="block font-bold text-ink">{p.name}</strong>
                  <span className="text-[11px] text-muted block">
                    {p.highlights?.[0] ?? "Soft cotton with a relaxed fit."}
                  </span>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                    <span>
                      Selected colour: <b className="text-ink">{colour}</b>
                    </span>
                    <span>
                      Selected size: <b className="text-ink">{size}</b>
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification Channel */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-ink block">Notification channel</label>

                <label
                  className={cn(
                    "flex items-start gap-3 rounded-2xl p-3.5 border cursor-pointer transition",
                    channel === "email" ? "border-black bg-bg ring-1 ring-black" : "border-line"
                  )}
                >
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "email"}
                    onChange={() => setChannel("email")}
                    className="mt-0.5 accent-black"
                  />
                  <div className="flex-1 text-xs">
                    <strong className="font-bold text-ink flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email</span>
                    </strong>
                    <span className="text-muted block text-[11px]">
                      We&apos;ll send you an email when it&apos;s available.
                    </span>
                    {channel === "email" && (
                      <input
                        type="email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="your.email@example.com"
                        className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-1.5 text-xs text-ink focus:outline-none"
                      />
                    )}
                  </div>
                </label>

                <label
                  className={cn(
                    "flex items-start gap-3 rounded-2xl p-3.5 border cursor-pointer transition",
                    channel === "sms" ? "border-black bg-bg ring-1 ring-black" : "border-line"
                  )}
                >
                  <input
                    type="radio"
                    name="channel"
                    checked={channel === "sms"}
                    onChange={() => setChannel("sms")}
                    className="mt-0.5 accent-black"
                  />
                  <div className="flex-1 text-xs">
                    <strong className="font-bold text-ink flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5" />
                      <span>SMS</span>
                    </strong>
                    <span className="text-muted block text-[11px]">
                      We&apos;ll send you a text message when it&apos;s available.
                    </span>
                    {channel === "sms" && (
                      <input
                        type="tel"
                        defaultValue="+91 9876543210"
                        placeholder="+91 Mobile number"
                        className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-1.5 text-xs text-ink focus:outline-none"
                      />
                    )}
                  </div>
                </label>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-black"
                />
                <span className="text-[11px] leading-snug">
                  I agree to receive a one-time stock notification for this product. We&apos;ll only
                  use your contact information to send this stock alert. You can unsubscribe at any
                  time.
                </span>
              </label>

              {/* Save Alert Button */}
              <button
                type="button"
                onClick={handleSave}
                className="w-full rounded-2xl bg-[#17201B] hover:bg-black py-3 text-xs font-extrabold text-white shadow-md transition"
              >
                Save alert
              </button>

              {saved && (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs text-emerald-900">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0" />
                  <div>
                    <strong className="font-bold">Alert saved</strong>
                    <p className="text-[11px]">
                      We&apos;ll notify you when {size} / {colour} is back in stock.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Alert Status & Quick Links (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-3xl border border-line bg-white p-5 shadow-xs space-y-4 text-xs">
                <div>
                  <span className="text-muted font-bold block mb-2">Alert status</span>
                  <div className="flex items-start gap-2 rounded-2xl bg-bg p-3">
                    <Bell className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-ink">Active</strong>
                      <p className="text-[11px] text-muted leading-tight mt-0.5">
                        You&apos;ll be notified when this size is available again.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-line/60 pt-3">
                  <span className="text-muted font-bold block mb-2">Manage your alerts</span>
                  <button
                    type="button"
                    onClick={() => toast("All stock alerts managed in your HyperMart account")}
                    className="flex w-full items-center justify-between rounded-2xl border border-line p-3 hover:bg-bg transition text-left"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted" />
                      <div>
                        <strong className="font-bold text-ink block">My Alerts</strong>
                        <span className="text-[10px] text-muted">
                          View or manage all your stock alerts.
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </button>
                </div>

                <div className="border-t border-line/60 pt-3">
                  <span className="text-muted font-bold block mb-2">Quick links</span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex w-full items-center justify-between rounded-2xl border border-line p-3 hover:bg-bg transition text-left"
                  >
                    <div>
                      <strong className="font-bold text-ink block">Return to product</strong>
                      <span className="text-[10px] text-muted">Continue shopping this item.</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </button>
                </div>

                <div className="border-t border-line/60 pt-3">
                  <span className="text-muted font-bold block mb-2">Need help?</span>
                  <button
                    type="button"
                    onClick={() => toast("Customer support is available 24/7")}
                    className="flex w-full items-center justify-between rounded-2xl border border-line p-3 hover:bg-bg transition text-left"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-3.5 w-3.5 text-muted" />
                      <div>
                        <strong className="font-bold text-ink block">Contact support</strong>
                        <span className="text-[10px] text-muted">We&apos;re here to help.</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
