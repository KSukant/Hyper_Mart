"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Flame, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/store";
import { cn } from "@/lib/cn";

export function MobileNav({
  onOpenCategories,
}: {
  onOpenCategories?: () => void;
}) {
  const pathname = usePathname();
  const cartItemsCount = useCart((s) =>
    s.items.reduce((sum, item) => sum + item.qty, 0)
  );

  // Hide bottom tab bar on product, cart and checkout pages, where sticky action bar is shown instead
  const isHidden =
    pathname.startsWith("/product/") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout");

  if (isHidden) return null;

  const tabs = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Categories",
      href: "/category",
      icon: Layers,
      isActive: pathname.startsWith("/category"),
      onClick: onOpenCategories
        ? (e: React.MouseEvent) => {
            // Optional custom handler if desired
          }
        : undefined,
    },
    {
      label: "Deals",
      href: "/deals",
      icon: Flame,
      isActive: pathname.startsWith("/deals") || pathname.startsWith("/offers"),
    },
    {
      label: "Cart",
      href: "/cart",
      icon: ShoppingBag,
      isActive: pathname.startsWith("/cart"),
      badge: cartItemsCount > 0 ? cartItemsCount : undefined,
    },
    {
      label: "Account",
      href: "/account",
      icon: User,
      isActive: pathname.startsWith("/account"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-line/80 bg-white/95 backdrop-blur-md shadow-lg lg:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex h-14 items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              onClick={tab.onClick}
              aria-current={tab.isActive ? "page" : undefined}
              className={cn(
                "relative flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1 transition focus-visible:outline-2 focus-visible:outline-primary",
                tab.isActive
                  ? "text-primary font-bold"
                  : "text-neutral-500 hover:text-ink font-medium"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    tab.isActive && "scale-110 stroke-[2.2]"
                  )}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-black text-white shadow-xs">
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-none tracking-tight">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
