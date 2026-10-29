const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** ₹1,24,999 — integer rupees only, never decimals. */
export const formatINR = (rupees: number) => inr.format(Math.round(rupees));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDate = (d: string | Date) => (typeof d === "string" ? new Date(d.length === 10 ? d + "T12:00:00+05:30" : d) : d);

/** "28 Oct" */
export const formatDate = (d: string | Date) => { const x = toDate(d); return `${x.getDate()} ${MONTHS[x.getMonth()]}`; };
/** "Tue, 28 Oct" */
export const formatDay = (d: string | Date) => { const x = toDate(d); return `${DAYS[x.getDay()]}, ${x.getDate()} ${MONTHS[x.getMonth()]}`; };
/** "2:30 PM" */
export const formatTime = (d: string | Date) => toDate(d).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

/** "02:14:36" or "42 min" under one hour */
export function formatCountdown(ms: number) {
  if (ms <= 0) return "00:00:00";
  const s = Math.floor(ms / 1000);
  if (s < 3600) return `${Math.max(1, Math.ceil(s / 60))} min`;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
}

export const splitCountdown = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
};

export const isoDay = (d: Date) => {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

export const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;
