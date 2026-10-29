"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { useAdminStore } from "@/store/adminStore";
import { cn } from "@/lib/cn";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { sidebarCollapsed, toasts, removeToast } = useAdminStore();

  // Route 1 (Login) has its own independent minimalist layout
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-[#F4F6F4]">{children}</main>;
  }

  // Route 15 (Warehouse Readiness) uses the high-contrast dark control room theme
  const isDarkControlRoom = pathname === "/admin/warehouse-readiness";

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-200",
        isDarkControlRoom ? "bg-[#02140A] text-white" : "bg-[#F7F8F7] text-neutral-900"
      )}
    >
      {/* 1. Left Persistent Sidebar */}
      <AdminSidebar />

      {/* 2. Main Application Canvas */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-200",
          sidebarCollapsed ? "pl-[76px]" : "pl-[248px]"
        )}
      >
        {/* Top Navigation Bar */}
        <AdminTopBar />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 px-6 py-6 md:px-8 md:py-8 max-w-[1600px] w-full mx-auto animate-fade-up">
          {children}
        </main>
      </div>

      {/* 3. Global Toast Notifications Viewport */}
      {toasts.length > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 text-xs transition-all animate-in slide-in-from-bottom duration-200",
                toast.type === "success"
                  ? "bg-[#07563B] text-white border-[#C6F04A]/40"
                  : toast.type === "warning"
                  ? "bg-amber-900 text-amber-50 border-amber-500/50"
                  : toast.type === "error"
                  ? "bg-rose-900 text-rose-50 border-rose-500/50"
                  : "bg-[#202A25] text-white border-white/20"
              )}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-[#C6F04A] flex-shrink-0 mt-0.5" />
              ) : toast.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
              ) : toast.type === "error" ? (
                <XCircle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="font-bold">{toast.title}</div>
                {toast.description && (
                  <p className="opacity-90 mt-0.5 leading-relaxed">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
