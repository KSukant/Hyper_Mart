"use client";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { toast } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
] as const;

export function LanguageSelector({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Select language"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold transition",
          variant === "dark"
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-ink/80 hover:text-primary hover:bg-primary-tint"
        )}
      >
        <Globe className={cn("h-3.5 w-3.5", variant === "dark" ? "text-primary-tint" : "text-primary")} />
        <span className="uppercase">{currentLang}</span>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-44 rounded-2xl border border-line bg-white py-1.5 text-ink shadow-pop animate-fade-down">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-muted">
            Select Language
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setCurrentLang(lang.code);
                setOpen(false);
                if (lang.code !== "en") {
                  toast(`${lang.native} (${lang.label}) activated`);
                }
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition hover:bg-primary-tint",
                currentLang === lang.code ? "bg-primary-tint/80 font-bold text-primary" : "text-ink/80"
              )}
            >
              <span>{lang.native} ({lang.label})</span>
              {currentLang === lang.code && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
