"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CollectionCompartmentProps {
  id: number;
  title: string;
  href: string;
  imgSrc: string;
  delayMs: number;
}

export function CollectionCompartment({
  id,
  title,
  href,
  imgSrc,
  delayMs,
}: CollectionCompartmentProps) {
  const delaySec = delayMs / 1000;

  return (
    <Link href={href} className="group relative block flex-1 h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: delaySec,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.98 }}
        className="relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(139,228,34,0.4)] flex flex-col justify-end"
      >
        {/* Soft Background Warm Glow */}
        <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/10 pointer-events-none" />

        {/* Product Art with Micro-scale Animation (0.97 -> 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delaySec + 0.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 25vw, 160px"
          />
        </motion.div>

        {/* Subtle Bottom Shelf Shadow */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>
    </Link>
  );
}

