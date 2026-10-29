"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { PrimaryNavbar } from "./PrimaryNavbar";
import { TrustRibbon } from "./TrustRibbon";
import { LocationPanel } from "./LocationPanel";
import { MiniCartDrawer } from "./MiniCartDrawer";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";
import { useLocation } from "@/store";
import { getCity } from "@/lib/catalog";

export function SiteHeader({ showTrustRibbon = false }: { showTrustRibbon?: boolean }) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const stickyHeaderRef = useRef<HTMLElement>(null);
  const { pincode, cityId } = useLocation();
  const city = getCity(cityId)?.name ?? "Coimbatore";

  useEffect(() => {
    const el = stickyHeaderRef.current;
    if (!el) return;

    const updateHeight = () => {
      const h = el.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty("--header-h", `${h}px`);
        document.documentElement.style.setProperty("--section-h", `calc(100svh - ${h}px)`);
      }
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(el);
    window.addEventListener("resize", updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      {/* Main Navigation Header (topmost element) */}
      <header
        ref={stickyHeaderRef}
        className="sticky top-0 z-40 bg-white shadow-xs"
      >
        <PrimaryNavbar
          onOpenLocation={() => setLocationOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Layer 3: Optional Contextual Trust Ribbon */}
        {showTrustRibbon && (
          <TrustRibbon variant="compact" />
        )}
      </header>

      {/* Slim 40px row under header that scrolls away (not sticky) */}
      <div className="lg:hidden h-10 border-b border-line/70 bg-neutral-50 px-4 flex items-center justify-between text-xs font-semibold text-neutral-800">
        <button
          type="button"
          onClick={() => setLocationOpen(true)}
          className="flex min-h-[40px] items-center gap-1.5 text-ink hover:text-primary transition cursor-pointer"
        >
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>
            Deliver to <strong className="text-primary font-bold">{pincode} · {city}</strong> ▾
          </span>
        </button>
        <span className="text-[11px] text-muted font-medium">Fastest 2h slots</span>
      </div>

      {/* Global Drawers & Modals */}
      <LocationPanel open={locationOpen} onClose={() => setLocationOpen(false)} />
      <MiniCartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileNavigationDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLocation={() => setLocationOpen(true)}
      />
    </>
  );
}

export { SiteHeader as Header };
