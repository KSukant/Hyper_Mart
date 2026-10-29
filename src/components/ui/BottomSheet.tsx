"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxHeight?: string;
  showDragHandle?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function BottomSheet({
  open,
  onClose,
  title,
  description,
  children,
  maxHeight = "max-h-[85dvh]",
  showDragHandle = true,
  showCloseButton = true,
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const currentYRef = useRef<number>(0);

  // Lock body scroll and escape listener
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Touch drag-to-dismiss gesture on header / drag handle
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null || !sheetRef.current) return;
    const deltaY = e.touches[0].clientY - startYRef.current;
    if (deltaY > 0) {
      currentYRef.current = deltaY;
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;
    if (currentYRef.current > 120) {
      onClose();
    } else {
      sheetRef.current.style.transform = "";
    }
    startYRef.current = null;
    currentYRef.current = 0;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Details"}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Content Container */}
      <div
        ref={sheetRef}
        className={cn(
          "relative flex w-full flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-200 ease-out",
          maxHeight,
          className
        )}
        style={{
          paddingBottom: "max(1rem, env(safe-area-inset-bottom, 16px))",
        }}
      >
        {/* Drag Handle & Header */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="shrink-0 px-4 pt-3 pb-2 cursor-grab active:cursor-grabbing"
        >
          {showDragHandle && (
            <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-neutral-300" aria-hidden="true" />
          )}

          {(title || showCloseButton) && (
            <div className="flex items-center justify-between gap-3 min-h-[44px]">
              <div>
                {title && (
                  <h3 className="text-base sm:text-lg font-extrabold text-ink leading-tight">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-muted mt-0.5">{description}</p>
                )}
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close bottom sheet"
                  className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-neutral-100 hover:text-ink transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
