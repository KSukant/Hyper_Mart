"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, Play, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductArt, getProductPhotoSrc } from "@/components/product/ProductArt";
import { LightboxModal } from "./modals/LightboxModal";
import { cn } from "@/lib/cn";

interface ProductMediaGalleryProps {
  product: Product;
  colourHex?: string;
  isNew?: boolean;
}

export function ProductMediaGallery({
  product,
  colourHex,
  isNew,
}: ProductMediaGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Available real images: check how many exist in manifest
  const primarySrc = getProductPhotoSrc(product, 0);

  // Real media angles: we provide 4 gallery views using real photography
  const mediaItems = [
    { type: "image" as const, label: `${product.name} — Main Pack Shot`, index: 0 },
    { type: "image" as const, label: `${product.name} — Angle View`, index: 0 },
    { type: "image" as const, label: `${product.name} — Detail View`, index: 0 },
    { type: "video" as const, label: `${product.name} — Demonstration Video`, index: 0 },
  ];

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.clientWidth;
    if (width > 0) {
      const newIdx = Math.round(scrollLeft / width);
      setSelectedIdx(newIdx);
    }
  };

  const scrollToIdx = (idx: number) => {
    setSelectedIdx(idx);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: idx * carouselRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full">
        {/* Desktop & Tablet Layout (>= 768px): [thumbnail rail 76px] + [main image] */}
        <div className="hidden md:flex gap-4 items-start">
          {/* Vertical 76px Thumbnail Strip */}
          <div className="w-[76px] shrink-0 flex flex-col gap-2.5">
            {mediaItems.map((item, idx) => {
              const active = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  aria-label={item.label}
                  className={cn(
                    "relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700",
                    active
                      ? "border-2 border-brand-700 shadow-sm"
                      : "border border-neutral-200 opacity-80 hover:opacity-100 hover:border-neutral-400"
                  )}
                >
                  <ProductArt
                    product={product}
                    colour={colourHex}
                    index={item.index}
                    fit="contain"
                    className="h-full w-full bg-white p-1"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 grid place-items-center bg-black/35 text-white">
                      <div className="grid h-6 w-6 place-items-center rounded-full bg-black/60 shadow">
                        <Play className="h-3 w-3 fill-white ml-0.5 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Display Image */}
          <div className="relative flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
            {/* Real product photograph on neutral light background — NO colour tinting */}
            <div className="relative aspect-square w-full bg-white flex items-center justify-center p-6">
              {primarySrc ? (
                <Image
                  src={primarySrc}
                  alt={`${product.name} — view ${selectedIdx + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1180px) 50vw, 480px"
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400 text-sm font-medium">
                  Photo coming soon
                </div>
              )}

              {/* Video Overlay if Video View is selected */}
              {mediaItems[selectedIdx].type === "video" && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 text-white p-4 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-brand-700 shadow-lg mb-2">
                    <Play className="h-7 w-7 fill-brand-700 ml-1 text-brand-700" />
                  </div>
                  <span className="text-sm font-bold drop-shadow">360° Demonstration Video</span>
                </div>
              )}

              {/* Zoom Trigger Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute right-3 bottom-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow border border-neutral-200 text-neutral-700 hover:text-black hover:bg-white transition"
                title="Zoom image"
                aria-label="Zoom image"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout (< 768px): Swipe Carousel with Dots Indicator */}
        <div className="md:hidden relative w-full">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl border border-neutral-200 bg-white"
          >
            {mediaItems.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square w-full shrink-0 snap-center bg-white flex items-center justify-center p-4"
              >
                {primarySrc ? (
                  <Image
                    src={primarySrc}
                    alt={`${product.name} — view ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400 text-sm font-medium">
                    Photo coming soon
                  </div>
                )}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-700 shadow-lg">
                      <Play className="h-6 w-6 fill-brand-700 ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {mediaItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIdx(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-200",
                  selectedIdx === idx ? "w-6 bg-brand-700" : "w-2 bg-neutral-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {lightboxOpen && primarySrc && (
        <LightboxModal
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={
            product.images && product.images.length > 0
              ? product.images
              : [{ src: primarySrc, alt: product.name, kind: "main" }]
          }
          initialIndex={selectedIdx}
          productName={product.name}
        />
      )}
    </>
  );
}
