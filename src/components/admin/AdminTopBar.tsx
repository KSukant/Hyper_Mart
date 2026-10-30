"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  MapPin,
  ChevronDown,
  User,
  Settings,
  Shield,
  LogOut,
  X,
  ArrowRight,
  Package,
  ShoppingBag,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAdminStore, ADMIN_USERS } from "@/store/adminStore";
import { ADMIN_PRODUCTS, ADMIN_ORDERS } from "@/mocks/adminData";
import { cn } from "@/lib/cn";

export function AdminTopBar() {
  const router = useRouter();
  const {
    currentUser,
    setCurrentUser,
    activeFacility,
    setActiveFacility,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [facilityOpen, setFacilityOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (facilityRef.current && !facilityRef.current.contains(event.target as Node)) {
        setFacilityOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered search results
  const filteredProducts = searchQuery.trim()
    ? ADMIN_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredOrders = searchQuery.trim()
    ? ADMIN_ORDERS.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200/90 bg-white/95 px-6 backdrop-blur-md">
      {/* 1. Left: Global Search Engine */}
      <div ref={searchRef} className="relative w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search orders, SKUs, customers or shipments... (⌘K)"
            className="h-10 w-full rounded-full border border-neutral-200 bg-neutral-50/80 pl-10 pr-9 text-xs font-medium text-neutral-900 placeholder-neutral-400 transition-all focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {searchFocused && searchQuery.trim() && (
          <div className="absolute left-0 top-12 z-50 w-full rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl animate-fade-up">
            <div className="space-y-3">
              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div>
                  <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Products & SKUs
                  </p>
                  <div className="space-y-1">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/admin/products/${p.id}`}
                        onClick={() => {
                          setSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between rounded-xl p-2 hover:bg-neutral-50 text-xs transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="h-4 w-4 text-emerald-700" />
                          <div>
                            <p className="font-bold text-neutral-900">{p.name}</p>
                            <p className="text-[11px] text-neutral-500">
                              SKU: {p.sku} · {p.brand}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold text-neutral-700">₹{p.price}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders Section */}
              {filteredOrders.length > 0 && (
                <div>
                  <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Orders
                  </p>
                  <div className="space-y-1">
                    {filteredOrders.map((o) => (
                      <Link
                        key={o.id}
                        href={`/admin/orders/${o.id}`}
                        onClick={() => {
                          setSearchFocused(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center justify-between rounded-xl p-2 hover:bg-neutral-50 text-xs transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShoppingBag className="h-4 w-4 text-emerald-700" />
                          <div>
                            <p className="font-bold text-neutral-900">{o.orderNumber}</p>
                            <p className="text-[11px] text-neutral-500">{o.customerName}</p>
                          </div>
                        </div>
                        <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          {o.stage}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && filteredOrders.length === 0 && (
                <div className="p-4 text-center text-xs text-neutral-500">
                  No products or orders found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Right: Operational Context & User Controls */}
      <div className="flex items-center gap-3">
        {/* Facility Selector */}
        <div ref={facilityRef} className="relative">
          <button
            type="button"
            onClick={() => setFacilityOpen(!facilityOpen)}
            className="flex items-center gap-2 rounded-xl border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 cursor-pointer"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald-700" />
            <span>{activeFacility}</span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {facilityOpen && (
            <div className="absolute right-0 top-10 z-50 w-48 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl animate-fade-up">
              {(["Coimbatore DC", "Chennai FC", "All Facilities"] as const).map((fac) => (
                <button
                  key={fac}
                  onClick={() => {
                    setActiveFacility(fac);
                    setFacilityOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition cursor-pointer",
                    activeFacility === fac
                      ? "bg-emerald-50 font-bold text-emerald-800"
                      : "text-neutral-700 hover:bg-neutral-50"
                  )}
                >
                  <span>{fac}</span>
                  {activeFacility === fac && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Panel */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-neutral-200/90 bg-white text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
            aria-label="View system alerts"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl animate-fade-up">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2">
                <span className="text-xs font-bold text-neutral-900">
                  Operational Alerts ({unreadCount})
                </span>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-1.5">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      setNotifOpen(false);
                    }}
                    className={cn(
                      "flex flex-col gap-1 rounded-xl p-2.5 text-xs transition cursor-pointer border",
                      n.read
                        ? "border-transparent bg-neutral-50/50 text-neutral-600"
                        : "border-emerald-100 bg-emerald-50/40 text-neutral-900 font-medium"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{n.title}</span>
                      <span className="text-[10px] text-neutral-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-snug">{n.message}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Persona & Role Selector */}
        <div ref={userMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-neutral-200/90 bg-white p-1.5 pl-2 transition hover:bg-neutral-50 cursor-pointer"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-800 text-xs font-bold text-white shadow-xs">
              {currentUser.avatarText}
            </span>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-none text-neutral-900">
                {currentUser.name}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-neutral-500">
                {currentUser.roleLabel}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-neutral-200 bg-white p-2 shadow-2xl animate-fade-up">
              <div className="border-b border-neutral-100 p-2">
                <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                <p className="text-[11px] text-neutral-500">{currentUser.email}</p>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <Shield className="h-3 w-3" />
                  <span>{currentUser.roleLabel}</span>
                </div>
              </div>

              {/* Persona Switcher for Testing Different Roles */}
              <div className="p-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Switch Active Persona
                </p>
                <div className="space-y-1">
                  {ADMIN_USERS.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        setUserMenuOpen(false);
                        if (u.role === "restricted_operator") {
                          router.push("/admin/access-denied");
                        }
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition cursor-pointer",
                        currentUser.id === u.id
                          ? "bg-emerald-50 font-bold text-emerald-800"
                          : "text-neutral-700 hover:bg-neutral-50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded bg-neutral-200 text-[10px] font-bold text-neutral-700">
                          {u.avatarText}
                        </span>
                        <span>{u.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{u.roleLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-1 mt-1 space-y-0.5">
                <Link
                  href="/admin/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-neutral-50 transition"
                >
                  <Settings className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Admin Settings</span>
                </Link>
                <Link
                  href="/"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-danger hover:bg-danger/10 transition"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
