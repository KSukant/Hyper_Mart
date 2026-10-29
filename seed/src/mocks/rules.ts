// Business rules used by checkout, cart and product pages. Mock values for development —
// the business must confirm every number in this file before launch (see DATA_SPEC.md §9).
import type { DeliveryRules, CodRules, MembershipPlan, PaymentMethod } from "@/types";

export const deliveryRules: DeliveryRules = {
  freeDeliveryThreshold: 499,
  memberFreeDeliveryThreshold: 199,
  baseFeeByBand: { A: 30, B: 40, C: 60 },
  coldChainFee: 15,
  heavyItemFee: 99, // e.g. 5 L oil, atta ≥ 10 kg
  twoPersonFee: 299, // waived for large appliances (shown as "Free two-person delivery")
  smallOrderMinimum: 99,
  leadDaysByDepartment: { food: 0, beauty: 1, fashion: 2, electronics: 2 },
  maxDistanceForHeatSensitiveBand: "B",
};
// Delivery date rules:
// - food: same day if ordered before warehouse.sameDayCutoff and pincode.sameDayFresh, else next day
// - beauty: +1 day; fashion: +2 days; electronics: +2 days; large appliances (two_person): +3 days
// - an order with several departments shows one date per shipment (food ships separately)
// - Sundays: food and beauty deliver; fashion and electronics move to Monday
// Fee rules:
// - delivery fee = baseFeeByBand[band], waived when items total ≥ threshold (member threshold if member)
// - coldChainFee once per order if any item has handling "chilled" or "frozen"
// - heavyItemFee per item with handling "heavy" that is NOT "two_person"
// - two_person items: fee waived for electronics large appliances (show ₹0 and "Free")
// - all fees must appear on the product page estimate and in the cart before checkout

export const codRules: CodRules = {
  enabled: true,
  fee: 25,
  maxOrderValue: 10000,
  confirmationAbove: 2000,
  blockedProductIds: ["p-fash-002", "p-elec-002", "p-elec-003", "p-elec-007", "p-elec-008"], // also see product.codAllowed
  prepaidOnlyAbovePerItem: 15000,
  maxRefusalsBeforePrepaidOnly: 2,
};

export const membershipPlans: MembershipPlan[] = [
  { id: "rewards-yearly", name: "HyperMart Rewards — Yearly", priceYearly: 299, priceMonthly: 25, trialDays: 30,
    benefits: ["Member prices on 2,000+ products", "Free delivery on orders above ₹199", "Early access to deals", "Free gift wrap"] },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "upi", label: "UPI", description: "Google Pay, PhonePe, Paytm or any UPI app", enabled: true },
  { id: "card", label: "Credit or debit card", description: "Visa, Mastercard, RuPay", enabled: true },
  { id: "netbanking", label: "Net banking", description: "All major banks", enabled: true },
  { id: "wallet", label: "Wallets", description: "Paytm, Amazon Pay, Mobikwik", enabled: true },
  { id: "cod", label: "Cash on delivery", description: "₹25 fee. Pay by cash or UPI at the door.", enabled: true },
];

export const orderChangeRules = {
  editableStatuses: ["placed", "confirmed"] as const, // until "packed"
  substitutionReplyMinutes: 30, // no reply → item removed and refunded
  subscriptionChangeCutoff: "22:00", // previous day
  complaintWindowHours: { fresh: 24, perishable: 24, packaged: 48, transitDamageLargeAppliance: 48 },
};

export const gstin = "DEMO-GSTIN-HYPERMART"; // replace with the real GSTIN per state before launch
