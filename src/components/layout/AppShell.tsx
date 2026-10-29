"use client";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { rehydrateAll } from "@/store";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { Toaster } from "@/components/ui/primitives";

/** Restores saved cart/location/member state, then renders the page. Isolates /admin from customer storefront chrome. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    rehydrateAll().finally(() => setReady(true));
  }, []);

  if (isAdmin) {
    return (
      <>
        {ready ? children : <Splash />}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      {ready ? <Header /> : <div className="h-[var(--header-h)] border-b border-line bg-white" />}
      <main id="main" className="min-w-0 max-w-full overflow-x-clip pb-16 lg:pb-0">
        {ready ? children : <Splash />}
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
