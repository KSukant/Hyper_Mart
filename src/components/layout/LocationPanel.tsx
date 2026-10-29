"use client";
import { useState, useEffect } from "react";
import { MapPin, LocateFixed, Search, CheckCircle2, AlertTriangle, Building2, Home, Briefcase, Clock, X, ArrowRight } from "lucide-react";
import { useLocation, useAuth } from "@/store";
import { getPincodeArea, getCity, getWarehouse } from "@/lib/catalog";
import { pincodes } from "@/mocks/geo";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/primitives";

interface LocationPanelProps {
  open: boolean;
  onClose: () => void;
}

const SAVED_ADDRESSES = [
  { id: "addr-1", type: "home", label: "Home", address: "14/B Avinashi Road, Peelamedu", pincode: "641004", city: "Coimbatore" },
  { id: "addr-2", type: "office", label: "Office", address: "Tech Park, 4th Floor, Gandhipuram", pincode: "641012", city: "Coimbatore" },
  { id: "addr-3", type: "other", label: "Parents", address: "5th Cross, DB Road, R.S. Puram", pincode: "641002", city: "Coimbatore" },
];

export function LocationPanel({ open, onClose }: LocationPanelProps) {
  const { pincode, setPincode, recent } = useLocation();
  const signedIn = useAuth((s) => !!s.customerId);
  const [inputVal, setInputVal] = useState(pincode);
  const [detecting, setDetecting] = useState(false);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    text: string;
    details?: { area: string; city: string; warehouseName: string; sameDay: boolean };
  } | null>(() => {
    const a = getPincodeArea(pincode);
    if (!a.serviceable || !a.cityId) return null;
    const c = getCity(a.cityId);
    const w = a.warehouseId ? getWarehouse(a.warehouseId) : undefined;
    return {
      ok: true,
      text: `Serviceable in ${c?.name}`,
      details: {
        area: a.area,
        city: c?.name ?? "",
        warehouseName: w?.name ?? "HyperMart Hub",
        sameDay: a.sameDayFresh,
      },
    };
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePincodeCheck = (pinToTest: string) => {
    const clean = pinToTest.trim();
    if (!/^\d{6}$/.test(clean)) {
      setFeedback({ ok: false, text: "Please enter a valid 6-digit Indian pincode." });
      return;
    }
    const area = getPincodeArea(clean);
    if (!area.serviceable || !area.cityId) {
      setFeedback({
        ok: false,
        text: `We don't deliver to ${clean} yet. Expandable coverage coming soon.`,
      });
      return;
    }
    const c = getCity(area.cityId);
    const w = area.warehouseId ? getWarehouse(area.warehouseId) : undefined;
    setFeedback({
      ok: true,
      text: `Serviceable in ${c?.name}`,
      details: {
        area: area.area,
        city: c?.name ?? "",
        warehouseName: w?.name ?? "HyperMart Hub",
        sameDay: area.sameDayFresh,
      },
    });
    setInputVal(clean);
  };

  const handleConfirm = () => {
    if (feedback?.ok && /^\d{6}$/.test(inputVal)) {
      const res = setPincode(inputVal);
      if (res.ok) {
        toast(`Delivery location updated to ${inputVal} (${feedback.details?.area})`);
        onClose();
      }
    }
  };

  const handleUseCurrentLocation = () => {
    setDetecting(true);
    // Simulate geolocation detection
    setTimeout(() => {
      setDetecting(false);
      const detectedPin = "641004";
      setInputVal(detectedPin);
      handlePincodeCheck(detectedPin);
      toast("Location detected via browser GPS: Peelamedu, Coimbatore");
    }, 700);
  };

  // Filter area suggestions when user types text instead of digits
  const textQuery = inputVal.toLowerCase().trim();
  const matchedAreas = isNaN(Number(textQuery)) && textQuery.length >= 2
    ? pincodes.filter((p) => p.area.toLowerCase().includes(textQuery)).slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 p-0 lg:p-4 backdrop-blur-xs animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="loc-title">
      <div className="relative flex max-h-[85dvh] lg:max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl lg:rounded-3xl bg-white shadow-2xl animate-slide-up lg:animate-scale-up pb-[env(safe-area-inset-bottom,16px)] lg:pb-0">
        {/* Mobile Drag handle */}
        <div className="mx-auto mt-2.5 mb-1 h-1.5 w-12 rounded-full bg-neutral-300 lg:hidden shrink-0" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 sm:px-6 py-3.5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-tint text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 id="loc-title" className="text-base font-extrabold text-ink">Choose delivery location</h2>
              <p className="text-xs text-muted">See real-time item availability and fastest delivery slots</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-bg hover:text-ink transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink uppercase tracking-wider">
              Enter Pincode or Search Area
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePincodeCheck(inputVal);
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    if (/^\d{6}$/.test(e.target.value)) {
                      handlePincodeCheck(e.target.value);
                    }
                  }}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="e.g. 641004"
                  className="h-11 w-full rounded-xl border border-line bg-bg pl-10 pr-4 text-base lg:text-sm font-medium outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
                />
              </div>
              <button
                type="submit"
                className="min-h-[44px] px-5 rounded-xl bg-primary text-sm font-bold text-white transition hover:bg-primary-dark cursor-pointer"
              >
                Check
              </button>
            </form>

            {/* Matched text areas dropdown */}
            {matchedAreas.length > 0 && (
              <div className="rounded-xl border border-line bg-white p-1.5 shadow-sm space-y-1">
                {matchedAreas.map((m) => (
                  <button
                    key={m.pincode}
                    type="button"
                    onClick={() => {
                      setInputVal(m.pincode);
                      handlePincodeCheck(m.pincode);
                    }}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs hover:bg-primary-tint transition cursor-pointer"
                  >
                    <span className="font-semibold text-ink">{m.area}</span>
                    <span className="font-mono text-muted">{m.pincode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GPS Auto-detect Button */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={detecting}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary-tint/50 py-2.5 px-4 text-xs sm:text-sm font-bold text-primary transition hover:bg-primary-tint cursor-pointer"
          >
            <LocateFixed className={cn("h-4 w-4", detecting && "animate-spin text-primary")} />
            {detecting ? "Detecting your location..." : "Use my location"}
          </button>

          {/* Feedback & Serviceability Banner */}
          {feedback && (
            <div
              className={cn(
                "rounded-2xl p-4 transition-all text-xs",
                feedback.ok
                  ? "border border-primary/30 bg-primary-tint text-primary"
                  : "border border-red-200 bg-red-50 text-red-700"
              )}
            >
              <div className="flex items-start gap-2.5">
                {feedback.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                )}
                <div className="space-y-1 flex-1">
                  <div className="font-bold text-sm">
                    {feedback.ok ? "Serviceable Area" : "Currently Unavailable"}
                  </div>
                  <p>{feedback.text}</p>
                  {feedback.ok && feedback.details && (
                    <div className="mt-2 grid grid-cols-2 gap-2 border-t border-primary/20 pt-2 text-[11px]">
                      <div>
                        <span className="text-muted block">Area:</span>
                        <strong className="text-ink">{feedback.details.area}, {feedback.details.city}</strong>
                      </div>
                      <div>
                        <span className="text-muted block">Dispatched from:</span>
                        <strong className="text-ink truncate block">{feedback.details.warehouseName}</strong>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 text-primary font-semibold">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {feedback.details.sameDay ? "Same-Day Delivery & Chilled Cold-Chain available" : "Next-Day Scheduled Delivery available"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Saved Addresses (if signed in) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink uppercase tracking-wider">
                {signedIn ? "Saved Addresses" : "Popular Locations in Tamil Nadu & Kerala"}
              </span>
            </div>
            <div className="grid gap-2">
              {SAVED_ADDRESSES.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => {
                    setInputVal(addr.pincode);
                    handlePincodeCheck(addr.pincode);
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 text-left transition hover:border-primary hover:bg-primary-tint/40",
                    inputVal === addr.pincode ? "border-primary bg-primary-tint/60 ring-1 ring-primary" : "border-line bg-white"
                  )}
                >
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-lg bg-bg text-muted">
                    {addr.type === "home" ? <Home className="h-3.5 w-3.5" /> : addr.type === "office" ? <Briefcase className="h-3.5 w-3.5" /> : <Building2 className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-ink">{addr.label}</span>
                      <span className="font-mono text-[11px] text-muted">{addr.pincode}</span>
                    </div>
                    <p className="truncate text-xs text-muted">{addr.address}, {addr.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Pincodes */}
          {recent.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-xs text-muted">Recent searches:</span>
              <div className="flex flex-wrap gap-1.5">
                {recent.map((pin) => (
                  <button
                    key={pin}
                    type="button"
                    onClick={() => {
                      setInputVal(pin);
                      handlePincodeCheck(pin);
                    }}
                    className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs font-semibold text-ink transition hover:border-primary hover:bg-primary-tint"
                  >
                    {pin}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-line bg-bg px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-muted hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!feedback?.ok}
            onClick={handleConfirm}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Confirm Delivery Location</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function LocationSelector({ onClick, className }: { onClick: () => void; className?: string }) {
  const { pincode, cityId } = useLocation();
  const city = getCity(cityId)?.name ?? "Coimbatore";

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`Delivery location: ${pincode}, ${city}. Click to change.`}
      className={cn(
        "group flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary-tint/80 px-3 py-1.5 text-left transition hover:border-primary hover:bg-primary-tint",
        className
      )}
    >
      <div className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary shadow-xs group-hover:scale-105 transition-transform">
        <MapPin className="h-4 w-4" />
      </div>
      <div className="leading-tight">
        <span className="block text-[10px] font-medium text-muted uppercase tracking-wider">
          Deliver to
        </span>
        <span className="block text-xs font-extrabold text-ink truncate max-w-[130px]">
          {pincode} · {city}
        </span>
      </div>
      <span className="text-primary text-xs font-bold transition-transform group-hover:translate-y-0.5">
        ▾
      </span>
    </button>
  );
}
