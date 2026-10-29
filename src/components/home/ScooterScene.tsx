"use client";
/* Hero animation: a HyperMart rider scoots through the city while products drop into the delivery box.
   Pure SVG + CSS keyframes (globals.css) + framer-motion for the dropping items. Respects reduced motion. */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingBasket } from "lucide-react";
import { getProductById } from "@/lib/catalog";
import { ProductArt } from "@/components/product/ProductArt";

const DROPS = ["p-food-001", "p-fash-001", "p-beau-001", "p-elec-007", "p-food-003", "p-elec-004"];

function Skyline({ fill, heights, y, width = 1200 }: { fill: string; heights: number[]; y: number; width?: number }) {
  const w = width / heights.length;
  return (
    <g>
      {heights.map((h, i) => (
        <g key={i}>
          <rect x={i * w} y={y - h} width={w - 6} height={h} rx="4" fill={fill} />
          {h > 70 && [...Array(Math.floor(h / 26))].map((_, r) => (
            <rect key={r} x={i * w + 10} y={y - h + 12 + r * 24} width={w - 26} height="8" rx="2" fill="#ffffff" opacity=".08" />
          ))}
        </g>
      ))}
    </g>
  );
}

export function ScooterScene({ caption, isPaused = false }: { caption: string; isPaused?: boolean }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (reduce || isPaused) return;
    const t = setInterval(() => { setI((x) => (x + 1) % DROPS.length); setCount((c) => (c >= 9 ? 3 : c + 1)); }, 2200);
    return () => clearInterval(t);
  }, [reduce, isPaused]);
  const product = getProductById(DROPS[i])!;
  const far = [60, 110, 80, 140, 70, 120, 95, 150, 75, 115, 90, 130];
  const near = [90, 150, 70, 120, 170, 100, 135, 85, 160, 110, 145, 95];

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#147A4E] to-[#0A4A2E] ${isPaused ? "scooter-paused" : ""}`} aria-hidden>
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        {/* sun */}
        <circle cx="470" cy="80" r="44" fill="#C5E84F" opacity=".9" />
        <circle cx="470" cy="80" r="70" fill="#C5E84F" opacity=".12" />
        {/* far skyline */}
        <g className="anim-skyline-far"><Skyline fill="#2D8A5B" heights={far} y={300} /><g transform="translate(1200 0)"><Skyline fill="#2D8A5B" heights={far} y={300} /></g></g>
        {/* near skyline */}
        <g className="anim-skyline"><Skyline fill="#0B5132" heights={near} y={312} /><g transform="translate(1200 0)"><Skyline fill="#0B5132" heights={near} y={312} /></g></g>
        {/* road */}
        <rect x="0" y="312" width="600" height="88" fill="#16232A" />
        <rect x="0" y="312" width="600" height="6" fill="#C5E84F" opacity=".85" />
        <g className="anim-road">{[...Array(9)].map((_, k) => <rect key={k} x={k * 120} y="356" width="60" height="6" rx="3" fill="#F4F7EF" opacity=".7" />)}</g>
        {/* destination pin */}
        <g transform="translate(520 228)">
          <circle cx="0" cy="62" r="12" fill="#C5E84F" className="anim-ring" />
          <path d="M0 0c-14 0-24 10-24 24 0 18 24 40 24 40s24-22 24-40c0-14-10-24-24-24z" fill="#C5E84F" />
          <circle cx="0" cy="24" r="8" fill="#0B5132" />
        </g>
        {/* speed lines */}
        {[0, 1, 2].map((k) => <rect key={k} x={150} y={250 + k * 16} width="40" height="3" rx="1.5" fill="#fff" opacity=".6" className="anim-speed" style={{ animationDelay: `${k * 0.25}s` }} />)}
        {/* scooter + rider */}
        <g transform="translate(210 196)"><g className="anim-bob">
          {/* delivery box */}
          <rect x="-6" y="18" width="70" height="58" rx="8" fill="#C5E84F" />
          <rect x="-6" y="18" width="70" height="12" rx="6" fill="#A9CC35" />
          <text x="29" y="62" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0B5132" fontFamily="Plus Jakarta Sans, sans-serif">H</text>
          {/* scooter body */}
          <path d="M40 92 h70 l26 -34 h22 l-8 14 l-14 4 l-10 30 h-96 q-6 -14 10 -14z" fill="#F4F7EF" />
          <path d="M150 58 l14 -26" stroke="#F4F7EF" strokeWidth="6" strokeLinecap="round" />
          <rect x="156" y="26" width="18" height="6" rx="3" fill="#16232A" />
          <circle cx="170" cy="46" r="5" fill="#FFD84A" />
          {/* rider */}
          <path d="M92 92 l8 -38 q4 -14 18 -10 l14 6 l-6 12 l-14 -2 l-4 32z" fill="#0B3D26" />
          <path d="M104 50 l30 4 l16 6" stroke="#0B3D26" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="114" cy="30" r="15" fill="#C5E84F" />
          <path d="M100 30 a14 14 0 0 1 28 0 v2 h-28z" fill="#0B5132" />
          <rect x="120" y="24" width="12" height="6" rx="3" fill="#16232A" opacity=".8" />
          <path d="M100 92 l-6 16" stroke="#16232A" strokeWidth="8" strokeLinecap="round" />
          {/* wheels */}
          {[[40, 116], [148, 116]].map(([cx, cy]) => (
            <g key={cx}>
              <circle cx={cx} cy={cy} r="20" fill="#16232A" />
              <g className="anim-wheel"><circle cx={cx} cy={cy} r="11" fill="#9AA1AC" /><rect x={cx - 1.5} y={cy - 11} width="3" height="22" fill="#16232A" /><rect x={cx - 11} y={cy - 1.5} width="22" height="3" fill="#16232A" /></g>
            </g>
          ))}
        </g></g>
      </svg>

      {/* product dropping into the box */}
      <div className="absolute" style={{ left: "35%", top: "18%", width: "13%" }}>
        <AnimatePresence mode="popLayout">
          <motion.div key={i} initial={reduce ? false : { y: -120, opacity: 0, scale: 0.7, rotate: -12 }} animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 70, opacity: 0, scale: 0.4 }} transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="overflow-hidden rounded-full shadow-pop ring-4 ring-white">
            <ProductArt product={product} className="aspect-square w-full" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* floating chips (desktop only) */}
      <motion.div className="hidden lg:block absolute left-[6%] top-[8%] rounded-2xl bg-white/95 px-3 py-2 text-xs font-bold text-primary shadow-pop sm:text-sm"
        initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <ShoppingBasket className="mr-1 inline h-4 w-4" /><span className="tabular">{count}</span> items packed
      </motion.div>
      <div className="hidden lg:block anim-tag absolute right-[5%] top-[40%] max-w-[46%] rounded-2xl bg-accent px-3 py-2 text-xs font-extrabold leading-tight text-accent-text shadow-pop sm:text-sm">{caption}</div>
    </div>
  );
}
