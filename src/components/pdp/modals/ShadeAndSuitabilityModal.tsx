"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  Check,
  Star,
  Upload,
  User,
  Sparkles,
  Sun,
  Lamp,
  ShieldCheck,
  Camera,
  Trash2,
} from "lucide-react";
import type { Product } from "@/types";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import type { PdpSelection } from "../types";

interface ShadeAndSuitabilityModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: PdpSelection;
  onSelectShade: (shadeCode: string) => void;
}

interface ShadeItem {
  code: string;
  name: string;
  family: string;
  hex: string;
  undertone: string;
  description: string;
  skinToneMatch: string;
}

const ALL_SHADES: ShadeItem[] = [
  {
    code: "Rose 04",
    name: "Soft rose",
    family: "Pinks",
    hex: "#C25B6E",
    undertone: "Neutral",
    description: "A subtle rosy pink that brightens your look with a fresh, everyday finish.",
    skinToneMatch: "Suits fair to medium skin tones; adds a natural flush to deeper tones.",
  },
  {
    code: "Nude 01",
    name: "Everyday nude",
    family: "Nudes",
    hex: "#D4A57E",
    undertone: "Warm",
    description: "A versatile warm nude that complements everyday natural aesthetics.",
    skinToneMatch: "Flattering on light to medium warm undertones.",
  },
  {
    code: "Peach 02",
    name: "Warm peach",
    family: "Nudes",
    hex: "#E5989B",
    undertone: "Warm",
    description: "Soft peachy coral with a luminous warm touch.",
    skinToneMatch: "Ideal for fair to olive complexions.",
  },
  {
    code: "Mauve 03",
    name: "Muted mauve",
    family: "Pinks",
    hex: "#B5838D",
    undertone: "Cool",
    description: "Dusty rose-mauve designed for effortless sophistication.",
    skinToneMatch: "Universal on cool and neutral undertones.",
  },
  {
    code: "Berry 05",
    name: "Deep berry",
    family: "Reds",
    hex: "#6A2A4A",
    undertone: "Cool",
    description: "Rich crushed berry with bold dimension and velvety payoff.",
    skinToneMatch: "Striking on medium, tan, and deep skin tones.",
  },
  {
    code: "Coral 06",
    name: "Fresh coral",
    family: "Pinks",
    hex: "#E07A5F",
    undertone: "Warm",
    description: "Vibrant and uplifting coral for a sun-kissed pop.",
    skinToneMatch: "Best on golden, warm, and tan skin tones.",
  },
  {
    code: "Brick 07",
    name: "Warm terracotta",
    family: "Browns",
    hex: "#A34836",
    undertone: "Warm",
    description: "Earthy spiced brick red that anchors autumnal and evening looks.",
    skinToneMatch: "Exceptional on medium to deep warm tones.",
  },
  {
    code: "Plum 08",
    name: "Rich plum",
    family: "Reds",
    hex: "#5C1A2B",
    undertone: "Cool",
    description: "Deep opulent plum for dramatic, editorial intensity.",
    skinToneMatch: "High contrast on fair skin; rich depth on deep skin.",
  },
  {
    code: "Brown 09",
    name: "Classic brown",
    family: "Browns",
    hex: "#6B3E2E",
    undertone: "Warm",
    description: "90s-inspired cocoa brown with a plush creamy matte texture.",
    skinToneMatch: "Warm and flattering across all medium and deep complexions.",
  },
  {
    code: "Red 10",
    name: "True red",
    family: "Reds",
    hex: "#9E1B32",
    undertone: "Neutral",
    description: "Iconic blue-red that brightens teeth and commands presence.",
    skinToneMatch: "Universally flattering statement red on all complexions.",
  },
];

const SHADE_TABS = ["All shades", "Nudes", "Pinks", "Reds", "Browns", "More ▾"];

export function ShadeAndSuitabilityModal({
  open,
  onClose,
  product: p,
  selection,
  onSelectShade,
}: ShadeAndSuitabilityModalProps) {
  const [selectedFamily, setSelectedFamily] = useState("All shades");
  const [activeCode, setActiveCode] = useState(selection.shade || "Rose 04");
  const [previewMode, setPreviewMode] = useState<"model" | "upload">("model");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const currentShade = ALL_SHADES.find((s) => s.code === activeCode) ?? ALL_SHADES[0];
  const filteredShades =
    selectedFamily === "All shades" || selectedFamily.includes("More")
      ? ALL_SHADES
      : ALL_SHADES.filter((s) => s.family === selectedFamily);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please upload a valid JPG or PNG image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast("Image must be smaller than 5 MB");
      return;
    }
    const url = URL.createObjectURL(file);
    setUserPhoto(url);
    setPreviewMode("upload");
    toast("Photo loaded for local shade preview");
  };

  const handleSave = () => {
    onSelectShade(activeCode);
    toast(`Shade saved: ${activeCode} (${currentShade.name})`);
    onClose();
  };

  const imageSrc = p.images[0]?.src ?? "/products/beauty/lakme-9to5-matte-lipstick-1.jpg";

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
              Shade and suitability
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Find your perfect shade. Explore how it looks, who it suits, and what others say.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Product & Selected Shade Overview */}
            <div className="space-y-4 lg:col-span-3">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg border border-line/60">
                <Image
                  src={imageSrc}
                  alt={p.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Selected Shade Card */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <span className="block text-[11px] font-bold text-muted uppercase tracking-wider">
                  Selected shade
                </span>

                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-xl shadow-inner border border-line shrink-0"
                    style={{ backgroundColor: currentShade.hex }}
                  />
                  <div>
                    <strong className="block text-sm font-extrabold text-ink">
                      {currentShade.code}
                    </strong>
                    <span className="text-xs text-muted font-medium">
                      {currentShade.name} · {currentShade.undertone}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {currentShade.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-ink border border-line/60">
                    Natural finish
                  </span>
                  <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-ink border border-line/60">
                    Buildable
                  </span>
                  <span className="rounded-md bg-bg px-2 py-0.5 text-[10px] font-bold text-ink border border-line/60">
                    Everyday wear
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Column: Shade Grid, Swatches & Match Guide */}
            <div className="space-y-6 lg:col-span-6">
              {/* Choose a shade */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-ink">Choose a shade</h3>
                  <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto text-xs">
                    {SHADE_TABS.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setSelectedFamily(tab)}
                        className={cn(
                          "rounded-full px-3 py-1 font-bold text-[11px] transition",
                          selectedFamily === tab
                            ? "bg-[#17201B] text-white"
                            : "bg-bg text-muted hover:text-ink"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Swatch Grid */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {filteredShades.map((s) => {
                    const active = s.code === activeCode;
                    return (
                      <button
                        key={s.code}
                        type="button"
                        onClick={() => setActiveCode(s.code)}
                        className={cn(
                          "flex flex-col items-center rounded-xl p-2.5 text-center transition border",
                          active
                            ? "bg-[#FFF1F5] border-[#7C205F] ring-2 ring-[#7C205F]/20 shadow-xs"
                            : "border-line bg-white hover:border-line-dark"
                        )}
                      >
                        <span
                          className="h-9 w-9 rounded-full shadow-inner border border-black/10 mb-1.5 block"
                          style={{ backgroundColor: s.hex }}
                        />
                        <strong className="block text-[11px] font-bold text-ink line-clamp-1">
                          {s.code}
                        </strong>
                        <span className="text-[10px] text-muted line-clamp-1">{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Natural-light Reference */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-2.5">
                <h4 className="text-xs font-extrabold text-ink">Natural-light reference</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-bg p-3 text-center border border-line/60 space-y-1.5">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-muted">
                      <Lamp className="h-3.5 w-3.5" />
                      <span>Indoor light</span>
                    </div>
                    <div
                      className="h-8 w-full rounded-lg shadow-inner"
                      style={{ backgroundColor: currentShade.hex, opacity: 0.9 }}
                    />
                  </div>
                  <div className="rounded-xl bg-bg p-3 text-center border border-line/60 space-y-1.5">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-muted">
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      <span>Natural daylight</span>
                    </div>
                    <div
                      className="h-8 w-full rounded-lg shadow-inner"
                      style={{ backgroundColor: currentShade.hex }}
                    />
                  </div>
                </div>
              </div>

              {/* Verified Shade Reviews */}
              <div className="rounded-2xl border border-line bg-white p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-line/60 pb-2">
                  <h4 className="text-xs font-extrabold text-ink">Verified shade reviews</h4>
                  <span className="text-[10px] font-bold text-[#7C205F]">See all</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="rounded-xl bg-bg p-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted">12 Mar 2024</span>
                    </div>
                    <p className="text-ink font-semibold text-[11px]">
                      &quot;Beautiful everyday shade. Looks natural and flattering on my skin tone.&quot;
                    </p>
                    <span className="text-[10px] text-muted block">
                      Verified purchase · Shade: {currentShade.code}
                    </span>
                  </div>
                </div>
              </div>

              {/* Find your match */}
              <div className="rounded-2xl border border-[#FCE4EC] bg-[#FFF1F5] p-4 space-y-2">
                <h4 className="text-xs font-extrabold text-[#7C205F]">Find your match</h4>
                <div className="flex justify-between items-center text-[10px] font-bold text-muted border-b border-[#FCE4EC] pb-2">
                  <span>Fair</span>
                  <span>Light</span>
                  <span className="text-[#7C205F] font-bold">Medium</span>
                  <span>Tan</span>
                  <span>Deep</span>
                </div>
                <p className="text-xs text-[#7C205F] leading-relaxed pt-1">
                  {currentShade.skinToneMatch}
                </p>
              </div>
            </div>

            {/* Right Column: See the shade on you (Local Photo Upload / Model) */}
            <div className="space-y-4 lg:col-span-3">
              <div className="rounded-2xl border border-line bg-white p-4 space-y-3">
                <div>
                  <h3 className="text-xs font-extrabold text-ink">See the shade on you</h3>
                  <p className="text-[11px] text-muted mt-0.5">
                    Upload a photo or try a model to preview how this shade looks on you.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center transition text-xs font-bold",
                      previewMode === "upload"
                        ? "bg-[#17201B] text-white border-[#17201B]"
                        : "border-line bg-white hover:bg-bg text-ink"
                    )}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode("model");
                      setUserPhoto(null);
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center transition text-xs font-bold",
                      previewMode === "model"
                        ? "bg-[#17201B] text-white border-[#17201B]"
                        : "border-line bg-white hover:bg-bg text-ink"
                    )}
                  >
                    <User className="h-4 w-4" />
                    <span>Model preview</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Preview Box */}
                <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-bg border border-line flex flex-col items-center justify-center p-4 text-center">
                  {userPhoto ? (
                    <>
                      <Image
                        src={userPhoto}
                        alt="Local preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3 text-left">
                        <span className="text-[11px] text-white font-bold">
                          {currentShade.code} · Live local preview
                        </span>
                        <button
                          type="button"
                          onClick={() => setUserPhoto(null)}
                          className="mt-1 flex items-center gap-1 text-[10px] text-rose-300 hover:text-white"
                        >
                          <Trash2 className="h-3 w-3" /> Remove photo
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2 text-muted">
                      <Camera className="mx-auto h-8 w-8 text-muted/60" />
                      <p className="text-[11px] leading-tight">
                        Upload a clear front-facing photo<br />
                        <span className="text-[10px] text-muted/70">JPG or PNG, up to 5 MB</span>
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-muted leading-relaxed">
                  Preview is for reference only. Actual results may vary by lighting, skin tone, application, and screen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col gap-3 border-t border-line bg-bg px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1 text-ink font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#7C205F]" /> Suitable for everyday wear
            </span>
            <span>·</span>
            <span>Comfortable, non-drying formula</span>
            <span>·</span>
            <span>Suitable for most skin types</span>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-2xl bg-[#17201B] hover:bg-black text-white px-7 py-2.5 font-bold text-xs shadow-sm transition"
          >
            Save shade
          </button>
        </div>
      </div>
    </div>
  );
}
