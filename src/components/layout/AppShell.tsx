"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { rehydrateAll } from "@/store";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Toaster } from "@/components/ui/primitives";

/** Restores saved cart/location/member state, then renders the page. Isolates /admin and /portal from customer storefront chrome. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLandingOrEnterprise =
    pathname === "/" ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/portal") ||
    pathname?.startsWith("/delivery-partner") ||
    pathname?.startsWith("/warehouse");
  const [ready, setReady] = useState(false);

  // Restore client state
  useEffect(() => {
    rehydrateAll().finally(() => setReady(true));
  }, []);

  // Immediate scroll-to-top on route changes when no hash target is present
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = "";
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (isLandingOrEnterprise) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      {ready ? <Header /> : <div className="h-[var(--header-h)] border-b border-line bg-white" />}
      <main id="main" className="min-w-0 max-w-full overflow-x-clip pb-16 lg:pb-0">
        {ready ? (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="w-full"
          >
            {children}
          </motion.div>
        ) : (
          <Splash />
        )}
      </main>
      <MobileNav />
      <Toaster />
    </>
  );
}

function Splash() {
  return (
    <div className="grid h-[calc(100svh-var(--header-h))] place-items-center">
      <div className="flex flex-col items-center gap-3 text-primary">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-tint border-t-primary" />
        <span className="text-sm font-semibold">Loading HyperMart…</span>
      </div>
    </div>
  );
}
