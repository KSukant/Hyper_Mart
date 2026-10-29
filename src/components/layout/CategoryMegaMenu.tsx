"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Apple,
  Shirt,
  ShoppingBag,
  Tv,
} from "lucide-react";
import { cn } from "@/lib/cn";

export interface MainDomainItem {
  id: "food" | "fashion" | "beauty" | "electronics";
  name: string;
  href: string;
  icon: typeof Apple;
}

export const MAIN_DOMAINS: MainDomainItem[] = [
  {
    id: "food",
    name: "Food & Groceries",
    href: "/category/food",
    icon: Apple,
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    href: "/category/fashion",
    icon: Shirt,
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    href: "/category/beauty",
    icon: ShoppingBag,
  },
  {
    id: "electronics",
    name: "Electronics & Appliances",
    href: "/category/electronics",
    icon: Tv,
  },
];

// Backwards-compatible export
export const MEGA_DOMAINS = MAIN_DOMAINS;

export function CategoryMegaMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // Keyboard navigation on trigger button
  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 30);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  };

  // Keyboard navigation on items
  const handleItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % MAIN_DOMAINS.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + MAIN_DOMAINS.length) % MAIN_DOMAINS.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[MAIN_DOMAINS.length - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={menuRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        id="categories-menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="categories-menu-dropdown"
        aria-label="Categories menu"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "relative flex items-center gap-1.5 px-3 py-1.5 text-[14px] font-bold transition rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-primary",
          pathname.startsWith("/category")
            ? "bg-primary-tint text-primary font-black ring-1 ring-primary/20"
            : "text-ink/80 hover:text-primary hover:bg-primary-tint/50"
        )}
      >
        <span>Categories</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
        {pathname.startsWith("/category") && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-primary" />
        )}
      </button>

      {/* Simplified Categories Dropdown Panel */}
      {open && (
        <div
          id="categories-menu-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="categories-menu-trigger"
          className="absolute left-0 top-full z-50 pt-1.5 w-72 animate-fade-down focus:outline-hidden"
        >
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
            <div className="space-y-0.5">
              {MAIN_DOMAINS.map((domain, index) => {
                const Icon = domain.icon;
                const isActive = pathname === domain.href;

                return (
                  <Link
                    key={domain.id}
                    href={domain.href}
                    role="menuitem"
                    tabIndex={open ? 0 : -1}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    onKeyDown={(e) => handleItemKeyDown(e, index)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary",
                      isActive
                        ? "bg-bg text-ink font-bold"
                        : "text-ink/90 hover:bg-bg hover:text-ink"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-150",
                        isActive
                          ? `bg-${domain.id} text-white shadow-xs`
                          : `bg-${domain.id}-tint text-${domain.id} group-hover:bg-${domain.id} group-hover:text-white`
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-[14px] font-bold tracking-tight">
                      {domain.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { CategoryMegaMenu as CategoryMenu };
