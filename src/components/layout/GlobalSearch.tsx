"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Mic, ArrowUpRight, TrendingUp, History, Sparkles, AlertCircle } from "lucide-react";
import { useShopper, useNow } from "@/lib/hooks";
import { searchProducts } from "@/lib/search";
import { getPrice } from "@/lib/pricing";
import { formatINR } from "@/lib/format";
import { ProductArt } from "@/components/product/ProductArt";
import { getCategory, brandName } from "@/lib/catalog";
import { brands } from "@/mocks/catalog";
import { departments } from "@/mocks";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/primitives";

const DEFAULT_TRENDING = [
  "Fresh Farm Tomatoes",
  "Manyavar Kurta",
  "Lakme Matte Lipstick",
  "Amul Toned Milk",
  "Wireless Earbuds",
  "Double Door Refrigerator",
];

const DEFAULT_RECENT = [
  "Organic vegetables",
  "Cotton shirts",
  "Moisturiser",
];

export function GlobalSearch({
  className,
  autoFocus = false,
  onClose,
}: {
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { warehouseId, cityId, isMember } = useShopper();
  const now = useNow();

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(autoFocus);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(DEFAULT_RECENT);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      setOpen(true);
    }
  }, [autoFocus]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const searchResults = q.trim().length >= 2 ? searchProducts(q, warehouseId).results.slice(0, 5) : [];
  const matchingBrands = q.trim().length >= 2
    ? brands.filter((b) => b.name.toLowerCase().includes(q.toLowerCase().trim())).slice(0, 3)
    : [];

  const handleNavigate = (path: string, saveQuery?: string) => {
    if (saveQuery && saveQuery.trim()) {
      setRecentSearches((prev) => [saveQuery, ...prev.filter((item) => item !== saveQuery)].slice(0, 5));
    }
    setOpen(false);
    setQ("");
    if (onClose) onClose();
    router.push(path);
  };

  const handleVoiceSearch = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.start();
        setIsListening(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQ(transcript);
          setIsListening(false);
          setOpen(true);
        };
        recognition.onerror = () => {
          setIsListening(false);
          toast("Voice input unavailable. Please type your search.");
        };
        recognition.onend = () => {
          setIsListening(false);
        };
      } catch {
        setIsListening(false);
        toast("Voice search is not supported in this browser.");
      }
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const sampleQuery = "Fresh Tomatoes";
        setQ(sampleQuery);
        setOpen(true);
        toast(`Voice simulated: "${sampleQuery}"`);
      }, 1200);
    }
  };

  const totalInteractiveItems = searchResults.length + matchingBrands.length + (q.trim().length >= 2 ? 1 : 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev + 1) % (totalInteractiveItems || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev - 1 + totalInteractiveItems) % (totalInteractiveItems || 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < searchResults.length) {
        handleNavigate(`/product/${searchResults[highlightIdx].slug}`, q);
      } else if (q.trim()) {
        handleNavigate(`/search?q=${encodeURIComponent(q.trim())}`, q.trim());
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) {
            handleNavigate(`/search?q=${encodeURIComponent(q.trim())}`, q.trim());
          }
        }}
        className="relative flex items-center"
      >
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-primary/70" />

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setHighlightIdx(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products, brands and groceries…"
          aria-label="Search products and categories"
          className="h-10.5 w-full rounded-full border border-line bg-[#F8FAFC] pl-11 pr-20 text-sm font-medium text-ink outline-none transition placeholder:text-muted/80 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 shadow-inner/5"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {q.trim() && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="grid h-6 w-6 place-items-center rounded-full text-muted transition hover:bg-bg hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={handleVoiceSearch}
            aria-label="Search by voice"
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full transition",
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "text-muted hover:bg-primary-tint hover:text-primary"
            )}
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Structured Suggestion Dropdown Panel */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-line bg-white shadow-pop animate-fade-down">
          {/* State 1: When user has not typed yet -> Show Recent & Trending */}
          {q.trim().length < 2 && (
            <div className="p-4 space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted">
                    <span className="flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5 text-emerald-700" />
                      Recent searches
                    </span>
                    <button
                      type="button"
                      onClick={() => setRecentSearches([])}
                      className="text-[11px] font-semibold text-muted hover:text-red-600"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onMouseDown={() => handleNavigate(`/search?q=${encodeURIComponent(term)}`, term)}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-ink transition hover:border-primary hover:bg-primary-tint"
                      >
                        <span>{term}</span>
                        <ArrowUpRight className="h-3 w-3 text-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  Trending on HyperMart
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {DEFAULT_TRENDING.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={() => handleNavigate(`/search?q=${encodeURIComponent(item)}`, item)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-ink transition hover:bg-primary-tint hover:text-primary"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Department shortcuts */}
              <div className="border-t border-line/70 pt-3">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Browse Top Departments</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {departments.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onMouseDown={() => handleNavigate(`/category/${d.id}`)}
                      className="rounded-lg bg-bg px-2.5 py-1 text-xs font-semibold text-ink transition hover:bg-primary-tint/60"
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* State 2: When user has typed query >= 2 chars */}
          {q.trim().length >= 2 && (
            <div>
              {/* Brand Suggestions */}
              {matchingBrands.length > 0 && (
                <div className="border-b border-line bg-primary-tint/50 px-4 py-2 text-xs flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold text-muted">Matching Brands:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingBrands.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onMouseDown={() => handleNavigate(`/search?q=${encodeURIComponent(b.name)}`, b.name)}
                        className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-primary shadow-xs border border-primary/20 hover:bg-primary-tint"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Matches */}
              {searchResults.length > 0 ? (
                <div className="py-1">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                    Products
                  </div>
                  {searchResults.map((product, idx) => {
                    const priceInfo = getPrice(product, cityId, isMember, now);
                    const category = getCategory(product.categoryId);
                    const brand = brandName(product);
                    const isHighlighted = highlightIdx === idx;

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onMouseDown={() => handleNavigate(`/product/${product.slug}`, q)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition",
                          isHighlighted ? "bg-primary-tint font-medium" : "hover:bg-bg"
                        )}
                      >
                        <ProductArt product={product} className="h-11 w-11 shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-primary">{brand}</span>
                            <span className="text-[11px] text-muted">• {category?.name}</span>
                          </div>
                          <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block font-extrabold text-ink tabular">
                            {formatINR(priceInfo.finalPrice)}
                          </span>
                          {priceInfo.discountPct > 0 && (
                            <span className="block text-[11px] font-bold text-accent">
                              {priceInfo.discountPct}% OFF
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* See all results link */}
                  <button
                    type="button"
                    onMouseDown={() => handleNavigate(`/search?q=${encodeURIComponent(q)}`, q)}
                    className="flex w-full items-center justify-between border-t border-line px-4 py-3 text-xs font-bold text-primary hover:bg-primary-tint"
                  >
                    <span>View all matching results for “{q}” →</span>
                    <span className="text-muted font-normal text-[11px]">Press Enter</span>
                  </button>
                </div>
              ) : (
                /* No Results State */
                <div className="p-6 text-center space-y-3">
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-amber-50 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">No exact matches for “{q}”</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Check your spelling or explore one of our popular departments below
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {departments.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onMouseDown={() => handleNavigate(`/category/${d.id}`)}
                        className="rounded-full border border-line bg-bg px-3 py-1.5 text-xs font-bold text-ink hover:border-primary hover:bg-primary-tint hover:text-primary"
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
