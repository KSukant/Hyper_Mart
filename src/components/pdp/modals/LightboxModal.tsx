"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { ProductImage } from "@/types";

interface LightboxModalProps {
  open: boolean;
  onClose: () => void;
  images: ProductImage[];
  initialIndex: number;
  productName: string;
}

export function LightboxModal({
  open,
  onClose,
  images,
  initialIndex,
  productName,
}: LightboxModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  if (!open || images.length === 0) return null;

  const currentImage = images[index] ?? images[0];

  const handleNext = () => {
    setScale(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setScale(1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white">
        <span className="text-sm font-semibold truncate max-w-md">
          {productName} ({index + 1} of {images.length})
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, s + 0.3))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(1, s - 0.3))}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white ml-2"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden py-4">
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/50 text-white hover:bg-black/80"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          className="relative h-full w-full max-h-[70vh] transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt || productName}
            fill
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/50 text-white hover:bg-black/80"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 py-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                setScale(1);
                setIndex(i);
              }}
              className={`relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                index === i ? "border-primary ring-2 ring-primary" : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill className="object-cover bg-white" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
