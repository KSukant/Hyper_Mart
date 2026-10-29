import Link from "next/link";
import { PHOTOS } from "@/lib/photo-manifest";

/** Uses /public/logo/hypermart-logo.(webp|png) when present, otherwise a vector wordmark. */
export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const h = { sm: 30, md: 38, lg: 48 }[size];
  const file = ["/logo/hypermart-logo.webp", "/logo/hypermart-logo.png", "/logo/hypermart-logo.svg"].find((f) => PHOTOS.has(f));
  return (
    <Link href="/" aria-label="HyperMart home" className="inline-flex shrink-0 items-center gap-2">
      {file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={file} alt="HyperMart" style={{ height: h }} className={light ? "rounded-lg bg-white p-1" : ""} />
      ) : (
        <>
          <svg viewBox="0 0 40 40" style={{ height: h, width: h }} aria-hidden>
            <rect width="40" height="40" rx="11" fill={light ? "#C5E84F" : "#0B5132"} />
            <path d="M9 12h3l3 13h13l3-9H14" fill="none" stroke={light ? "#0B5132" : "#fff"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="17" cy="30" r="2" fill={light ? "#0B5132" : "#fff"} /><circle cx="27" cy="30" r="2" fill={light ? "#0B5132" : "#fff"} />
            <path d="M24 6c4 0 7 3 7 7-4 0-7-3-7-7z" fill="#C5E84F" stroke={light ? "#0B5132" : "none"} />
          </svg>
          <span className={`font-display text-[22px] font-extrabold leading-none tracking-tight ${light ? "text-white" : "text-primary"}`} style={{ fontSize: h * 0.6 }}>
            Hyper<span className={light ? "text-accent" : "text-[#5E9B1E]"}>Mart</span>
          </span>
        </>
      )}
    </Link>
  );
}
