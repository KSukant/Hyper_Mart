// Mock data for development only.
// Offer times are relative to "now" so countdowns always show a live timer during development.
import type { Offer, HeroSlide } from "@/types";

const now = Date.now();
const hrs = (h: number) => new Date(now + h * 3600_000).toISOString();
const ALL = ["cbe", "che", "blr", "kochi"];

export const offers: Offer[] = [
  // Countdown deals
  { id: "of-001", productId: "p-elec-004", cityIds: ALL, type: "deal", label: "Deal of the day", discountPct: 10, memberExtraPct: 5, startsAt: hrs(-2), endsAt: hrs(14), stockLimit: 200, claimedCount: 138, perCustomerLimit: 2 },
  { id: "of-002", productId: "p-food-004", cityIds: ["cbe", "che"], type: "deal", label: "Weekend deal", discountPct: 8, startsAt: hrs(-5), endsAt: hrs(40), perCustomerLimit: 2 },
  { id: "of-003", productId: "p-elec-001", cityIds: ALL, type: "deal", label: "Deal of the day", discountPct: 7, memberExtraPct: 3, startsAt: hrs(-1), endsAt: hrs(20), stockLimit: 50, claimedCount: 21, perCustomerLimit: 1, conditionNote: "Free installation included" },
  { id: "of-004", productId: "p-fash-006", cityIds: ["blr", "che"], type: "deal", label: "Lightning deal", discountPct: 15, startsAt: hrs(-0.5), endsAt: hrs(0.75), stockLimit: 40, claimedCount: 33, perCustomerLimit: 1 }, // ends in < 1 h → bold "Ends in 45 min"
  // Near-expiry (food and beauty only)
  { id: "of-005", productId: "p-food-007", cityIds: ["cbe", "che"], type: "near_expiry", label: "Near-expiry", discountPct: 40, startsAt: hrs(-12), endsAt: hrs(72), conditionNote: "Best before date shown on the product page; non-returnable" },
  { id: "of-006", productId: "p-beau-004", cityIds: ["kochi"], type: "near_expiry", label: "Short-dated", discountPct: 30, startsAt: hrs(-24), endsAt: hrs(120), conditionNote: "Expires in 3 months" },
  // Clearance (fashion only)
  { id: "of-007", productId: "p-fash-008", cityIds: ALL, type: "clearance", label: "Clearance", discountPct: 50, startsAt: hrs(-48), endsAt: hrs(240), conditionNote: "Exchange only on clearance items" },
  { id: "of-008", productId: "p-fash-004", cityIds: ["cbe", "kochi"], type: "clearance", label: "Clearance", discountPct: 30, startsAt: hrs(-48), endsAt: hrs(200), conditionNote: "Limited sizes" },
  // Member-only
  { id: "of-009", productId: "p-beau-002", cityIds: ALL, type: "member", label: "Member deal", discountPct: 0, memberExtraPct: 12, startsAt: hrs(-24), endsAt: hrs(96) },
  { id: "of-010", productId: "p-food-003", cityIds: ALL, type: "member", label: "Member deal", discountPct: 0, memberExtraPct: 5, startsAt: hrs(-24), endsAt: hrs(168), conditionNote: "On subscriptions too" },
  { id: "of-011", productId: "p-elec-003", cityIds: ["blr", "che"], type: "member", label: "Member deal", discountPct: 5, memberExtraPct: 3, startsAt: hrs(-6), endsAt: hrs(60) },
  { id: "of-012", productId: "p-fash-005", cityIds: ALL, type: "member", label: "Member deal", discountPct: 10, memberExtraPct: 5, startsAt: hrs(-6), endsAt: hrs(60) },
];
// Pricing rule (lib/pricing.ts):
//   offerPrice  = round(price × (1 − discountPct/100))
//   memberPrice = min(product.memberPrice ?? ∞, round(offerPrice × (1 − (memberExtraPct ?? 0)/100)))
//   Only the single best active offer for the customer's city applies; offers never stack.
//   Expired offers (endsAt < now) are ignored. Show the countdown only for type "deal".

export const heroSlides: HeroSlide[] = [
  { id: "hs-1", eyebrow: "Deal of the day", title: "boAt Airdopes 141 at ₹1,169", subtitle: "Members pay even less. Ends tonight.", ctaLabel: "See deals", ctaHref: "/offers", image: "/hero/earbuds.jpg", background: "primary", cityIds: "all" },
  { id: "hs-2", eyebrow: "Fresh every morning", title: "Vegetables graded A, B or C — you choose", subtitle: "Pick your ripeness. Pay for the actual weight.", ctaLabel: "Shop fresh", ctaHref: "/category/food", image: "/hero/fresh-veg.jpg", background: "primary", cityIds: "all" },
  { id: "hs-3", eyebrow: "Wedding season", title: "Kanchipuram silk — buy or rent", subtitle: "Rent from ₹1,200 a day in Coimbatore, Chennai and Bengaluru.", ctaLabel: "Explore sarees", ctaHref: "/category/fashion", image: "/hero/silk-saree.jpg", background: "accent-tint", cityIds: ["cbe", "che", "blr"] },
  { id: "hs-4", eyebrow: "HyperMart Rewards", title: "Member prices on 2,000+ products", subtitle: "Free delivery above ₹199 for members.", ctaLabel: "Join Rewards", ctaHref: "/account/rewards", image: "/hero/rewards.jpg", background: "primary-tint", cityIds: "all" },
];
