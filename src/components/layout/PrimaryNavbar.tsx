"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart, Search, ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import { CategoryMegaMenu } from "./CategoryMegaMenu";
import { LocationSelector } from "./LocationPanel";
import { GlobalSearch } from "./GlobalSearch";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./MiniCartDrawer";
import { useWish } from "@/store";
import { useActiveSection } from "@/lib/active-section";
import { cn } from "@/lib/cn";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Categories", type: "mega-menu" as const },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
];

export function LogoLink({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return <Logo size={size} />;
}

export function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 text-[14px] font-bold transition",
        active ? "text-primary" : "text-ink/80 hover:text-ink"
      )}
    >
      <span>{label}</span>
      {active && (
        <span className="absolute -bottom-[16px] left-0 right-0 h-[3px] rounded-full bg-primary" />
      )}
    </Link>
  );
}

interface PrimaryNavbarProps {
  onOpenLocation: () => void;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
}

export function PrimaryNavbar({
  onOpenLocation,
  onOpenCart,
  onOpenMobileMenu,
}: PrimaryNavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const wishCount = useWish((s) => s.ids.length);
  const activeId = useActiveSection((s) => s.activeId);

  const isDealsActive = (pathname === "/" && activeId === "deals") || pathname.startsWith("/deals") || pathname.startsWith("/offers");

  const handleDealsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      const el = document.getElementById("deals");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", "#deals");
      }
    }
  };

  return (
    <div className="bg-white border-b border-line/70 h-14 lg:h-auto box-border">
      {/* Desktop Navigation Row (h-[72px]) */}
      <div className="mx-auto hidden h-[72px] max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 lg:flex">
        {/* Left: Brand Logo & Delivery Location Pill */}
        <div className="flex items-center gap-3 xl:gap-4 shrink-0">
          <LogoLink size="md" />
          <LocationSelector onClick={onOpenLocation} />
        </div>

        {/* Center: Spacious, Prominent Search Bar */}
        <div className="flex-1 max-w-[540px] xl:max-w-[620px] px-2">
          <GlobalSearch className="w-full" />
        </div>

        {/* Right: Navigation, Wishlist, Account, Cart */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          <CategoryMegaMenu />

          <Link
            href="/deals"
            onClick={handleDealsClick}
            className={cn(
              "relative px-3 py-1.5 text-[14px] font-bold transition rounded-full",
              isDealsActive
                ? "bg-primary-tint text-primary font-black ring-1 ring-primary/20"
                : "text-ink/80 hover:text-primary"
            )}
          >
            <span>Deals</span>
            {isDealsActive && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-primary" />
            )}
          </Link>

          <div className="h-5 w-px bg-line/80 mx-0.5" aria-hidden="true" />

          <Link
            href="/account/wishlist"
            aria-label={`Wishlist with ${wishCount} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink/80 transition hover:bg-primary-tint hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            {wishCount > 0 && (
              <span className="absolute top-0 right-0 grid h-4 w-4 place-items-center rounded-full bg-pink-600 text-[10px] font-extrabold text-white">
                {wishCount}
              </span>
            )}
          </Link>

          <AccountMenu />

          <CartButton onClick={onOpenCart} />
        </div>
      </div>

      {/* Mobile Navigation Header: 56px sticky bar */}
      <div className="flex h-full items-center justify-between px-3 lg:hidden">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-ink hover:bg-neutral-100 transition cursor-pointer"
          >
            <Menu className="h-6 w-6" />
          </button>
          <LogoLink size="sm" />
        </div>

        {/* Right: Search icon button + Cart icon button */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search HyperMart"
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-ink hover:bg-neutral-100 transition cursor-pointer"
          >
            <Search className="h-5 w-5" />
          </button>
          <CartButton onClick={onOpenCart} />
        </div>
      </div>

      {/* Full-width Mobile Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl animate-fade-in"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <div className="flex h-14 items-center gap-2 px-3 border-b border-line/70 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-ink hover:bg-neutral-100 transition cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 pr-2">
              <GlobalSearch
                autoFocus
                onClose={() => setSearchOpen(false)}
                className="w-full"
              />
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto p-4 bg-neutral-50/50"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
