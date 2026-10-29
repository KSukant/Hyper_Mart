// Site content: navigation, footer, strips, chips, FAQs and fixed UI text.
import type { Faq } from "@/types";

export const site = {
  name: "HyperMart",
  tagline: "Fresh food, fashion, electronics and beauty — delivered to your door.",
  supportPhone: "1800 000 0000 (demo)",
  supportWhatsApp: "+91 90000 00000 (demo)",
  supportEmail: "help@hypermart.example",
  supportHours: "8 AM – 10 PM, all days",
  legalName: "HyperMart Retail Pvt. Ltd. (demo)",
};

export const topBarMessage = "Free delivery on orders above ₹499 · Members: above ₹199";

// The 5 main sections of the customer portal (PROJECT.md §9). Order matters.
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category", children: [
    { label: "Food and Groceries", href: "/category/food" },
    { label: "Fashion", href: "/category/fashion" },
    { label: "Electronics", href: "/category/electronics" },
    { label: "Beauty and Personal Care", href: "/category/beauty" },
  ] },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Offers", href: "/offers" },
];

/** Department page content (Category > department). Promise strip items and filters per department. */
export const departmentPages = {
  food: {
    title: "Food and Groceries", subtitle: "Fresh and everyday essentials, delivered from our {city} warehouse.",
    searchPlaceholder: "Search in Food and Groceries",
    deliveryStrip: [ { icon: "Leaf", text: "Fresh and chilled: today or tomorrow" }, { icon: "Package", text: "Packaged foods: next day" }, { icon: "CalendarClock", text: "Slots: today and tomorrow" } ],
    promiseStrip: [ { icon: "ShieldCheck", title: "Freshness grades", text: "Choose A, B or C" }, { icon: "Leaf", title: "Ingredients and allergens", text: "Know what's inside" }, { icon: "FileText", title: "Best-before dates", text: "Always see the date" }, { icon: "Truck", title: "Delivery slots", text: "Choose what works for you" }, { icon: "SlidersHorizontal", title: "Substitution choice", text: "We'll ask you first" } ],
    infoBar: "Loose items are billed after weighing. You see an estimated price, and any difference is refunded.",
    filters: ["Grade", "Ripeness", "Allergens", "Brand", "Availability"],
    sidePanel: { title: "Daily essentials, on your schedule", text: "Set up a milk, eggs or vegetables subscription and never run out.", cta: { label: "Start your daily subscription", href: "/account/subscriptions" } },
  },
  fashion: {
    title: "Fashion", subtitle: "Clothing and footwear for women, men and kids.",
    searchPlaceholder: "Search in Fashion",
    deliveryStrip: [ { icon: "Truck", text: "Delivery in 2–3 days" }, { icon: "RefreshCw", text: "Free size and colour exchange" }, { icon: "Ruler", text: "Size charts in cm and inches" } ],
    promiseStrip: [ { icon: "Shirt", title: "Fabric and feel", text: "Softness, stretch, drape" }, { icon: "Ruler", title: "Check your fit", text: "Size suggestion for you" }, { icon: "Palette", title: "True colour photos", text: "Natural-light images" }, { icon: "Bell", title: "Size alerts", text: "Notify me when back" }, { icon: "Sparkles", title: "Rent for occasions", text: "Selected sarees" } ],
    infoBar: "Model height and size worn are shown on every product. Colours may vary slightly with lighting and screens.",
    filters: ["Gender", "Size", "Colour", "Fabric", "Fit", "Brand"],
    sidePanel: { title: "Wedding season?", text: "Rent selected Kanchipuram silk sarees from ₹1,200 a day.", cta: { label: "See rentable outfits", href: "/category/fashion?rentable=1" } },
  },
  electronics: {
    title: "Electronics", subtitle: "Mobiles, laptops, TVs and appliances with HyperMart installation and service.",
    searchPlaceholder: "Search in Electronics",
    deliveryStrip: [ { icon: "Truck", text: "Delivery in 2–4 days" }, { icon: "Wrench", text: "Free installation on TVs and appliances" }, { icon: "RefreshCw", text: "Exchange your old device" } ],
    promiseStrip: [ { icon: "Target", title: "Right device for you", text: "What will you use it for?" }, { icon: "Plug", title: "Compatibility check", text: "For chargers and cables" }, { icon: "Ruler", title: "Will it fit?", text: "Home-fit check for appliances" }, { icon: "ShieldCheck", title: "Digital warranty", text: "Stored in your account" }, { icon: "Wrench", title: "Repair and refurbished", text: "Run by HyperMart" } ],
    infoBar: "Every serial number is recorded at packing and linked to your digital warranty.",
    filters: ["Type", "Brand", "Price", "Best for", "Warranty", "Availability"],
    sidePanel: { title: "Exchange your old phone", text: "See its value range in 1 minute. Final amount approved by you at pickup.", cta: { label: "Check exchange value", href: "/services/exchange" } },
  },
  beauty: {
    title: "Beauty and Personal Care", subtitle: "Skincare, haircare, makeup and fragrances from authorised sources.",
    searchPlaceholder: "Search in Beauty and Personal Care",
    deliveryStrip: [ { icon: "Truck", text: "Delivery in 1–2 days" }, { icon: "ShieldCheck", text: "Sealed and batch-checked" }, { icon: "Sun", text: "Heat-sensitive items in cool slots" } ],
    promiseStrip: [ { icon: "BadgeCheck", title: "Sourcing shown", text: "Brand or authorised distributor" }, { icon: "FlaskConical", title: "Ingredients and allergens", text: "Full list on every product" }, { icon: "Palette", title: "See the shade on you", text: "Preview before you buy" }, { icon: "Droplet", title: "Try a mini first", text: "Samples where available" }, { icon: "PackageCheck", title: "Returnable if sealed", text: "Clear return rules" } ],
    infoBar: "Patch test new skincare and makeup before full use. HyperMart does not certify any product as allergen-free.",
    filters: ["Skin type", "Hair type", "Shade", "Brand", "Sample available", "Price"],
    sidePanel: { title: "Build your beauty routine", text: "Save products and get warned only about conflicts the brand has documented.", cta: { label: "Start my routine", href: "/account/beauty-routine" } },
  },
} as const;

export const homeQuickChips = [
  { label: "Fresh", href: "/category/food?c=food-fresh", icon: "Leaf" },
  { label: "Offers", href: "/offers", icon: "BadgePercent" },
  { label: "Buy again", href: "/account/orders?tab=buy-again", icon: "RotateCcw" },
  { label: "New arrivals", href: "/search?sort=new", icon: "Sparkles" },
];

export const deliveryStrip = [
  { icon: "Truck", title: "Fresh delivery", text: "Today or tomorrow", chip: "Order before 2 PM" },
  { icon: "Package", title: "Everything else", text: "1 to 4 days", chip: "Delivered by our team" },
  { icon: "Banknote", title: "Cash on delivery", text: "Pay at your door", chip: "UPI or cash" },
  { icon: "Gift", title: "Join Rewards", text: "Member prices and free delivery above ₹199", cta: { label: "Join now", href: "/account/rewards" } },
];

export const trustStrip = [
  { icon: "ShieldCheck", title: "Secure payments" },
  { icon: "PackageSearch", title: "Track every shipment" },
  { icon: "RotateCcw", title: "Clear return rules" },
];

export const whyHyperMart = [
  { icon: "BadgeCheck", title: "Quality checked", text: "Fresh items are graded and checked before packing." },
  { icon: "Store", title: "Sold by HyperMart", text: "Every product is sold and invoiced by us. Brands you know, sourced from brands or authorised distributors." },
  { icon: "Truck", title: "Our own delivery team", text: "Delivered by HyperMart partners, not third-party couriers." },
  { icon: "RotateCcw", title: "Clear returns and refunds", text: "Every product shows its exact return rule before you buy." },
];

export const footer = {
  columns: [
    { title: "Shop", links: [ { label: "Food and Groceries", href: "/category/food" }, { label: "Fashion", href: "/category/fashion" }, { label: "Electronics", href: "/category/electronics" }, { label: "Beauty and Personal Care", href: "/category/beauty" }, { label: "Offers", href: "/offers" } ] },
    { title: "Help", links: [ { label: "Track your order", href: "/orders" }, { label: "Returns and refunds", href: "/help/returns" }, { label: "Delivery information", href: "/help/delivery" }, { label: "FAQs", href: "/help" }, { label: "Contact us", href: "/help/contact" } ] },
    { title: "Services", links: [ { label: "HyperMart Rewards", href: "/account/rewards" }, { label: "Repair and exchange", href: "/services/electronics" }, { label: "Bulk and business orders", href: "/bulk" }, { label: "Subscriptions", href: "/account/subscriptions" } ] },
    { title: "Policies", links: [ { label: "Terms of use", href: "/legal/terms" }, { label: "Privacy policy", href: "/legal/privacy" }, { label: "Return policy", href: "/legal/returns" }, { label: "Grievance officer", href: "/legal/grievance" } ] },
  ],
  newsletter: { title: "Get offers for your city", placeholder: "Your email address", button: "Subscribe" },
  paymentIcons: ["UPI", "Visa", "Mastercard", "RuPay", "Net banking", "Cash on delivery"],
  bottomLine: "© 2026 HyperMart. All prices include GST.",
};

/** Fixed customer-facing strings. Use these instead of writing new ones. {x} = placeholder. */
export const copy = {
  deliverTo: "Deliver to",
  notServiceable: "We don't deliver to {pincode} yet.",
  notifyArea: "Notify me when you arrive",
  tryAnotherPincode: "Try another pincode",
  inYourCity: "in {city}",
  onlyLeft: "Only {n} left in {city}",
  outOfStockCity: "Out of stock in {city}",
  notStockedCity: "Not available in {city}",
  restockOn: "Back in stock by {date}",
  notifyMe: "Notify me",
  addToCart: "Add to cart",
  buyNow: "Buy now",
  addedToCart: "Added to cart",
  viewCart: "View cart",
  deliveryToday: "Delivery today · order within {time}",
  deliveryBy: "Delivery by {date}",
  soldBy: "Sold by: HyperMart",
  brand: "Brand: {brand}",
  inclusiveTax: "Inclusive of all taxes",
  memberPrice: "Member {price}",
  joinRewards: "Join Rewards",
  endsIn: "Ends in {time}",
  offerEnded: "Offer ended",
  priceAfterWeighing: "Final amount is calculated after weighing. Any difference is refunded.",
  substitutionAsk: "Ask me first",
  substitutionSkip: "Skip and refund",
  substitutionSimilar: "Allow a similar item",
  notProvided: "Not provided by the manufacturer",
  allergenDisclaimer: "HyperMart does not certify any product as allergen-free.",
  shadePreviewDisclaimer: "Preview only. Actual colour may vary with lighting, application and screen.",
  colourDisclaimer: "Colour may vary slightly with lighting and screen settings.",
  compatibilityUnknown: "We don't have confirmed compatibility for this model yet.",
  emptyCart: "Your cart is empty.",
  emptyOffers: "No offers in {city} right now.",
  genericError: "Something went wrong. Please try again.",
};

export const faqs: Faq[] = [
  { id: "faq-1", topic: "delivery", question: "Which cities do you deliver to?", answer: "Coimbatore, Chennai, Bengaluru and Kochi. Enter your pincode at the top of the page to check." },
  { id: "faq-2", topic: "delivery", question: "When will my order arrive?", answer: "Fresh food ordered before the cut-off (usually 2 PM) arrives the same day; otherwise the next day. Beauty takes about 1 day, fashion and electronics 2–4 days. Each product shows its date before you buy." },
  { id: "faq-3", topic: "delivery", question: "How much is delivery?", answer: "₹30–₹60 depending on your area. Free above ₹499, or above ₹199 for Rewards members. Chilled items add ₹15 per order. All charges are shown in the cart before you pay." },
  { id: "faq-4", topic: "payment", question: "Can I pay cash on delivery?", answer: "Yes, for orders up to ₹10,000 with a ₹25 fee. Some high-value items are prepaid only; this is shown on the product page." },
  { id: "faq-5", topic: "payment", question: "Money was deducted but my order is not confirmed. What should I do?", answer: "Please don't pay again. We confirm payments with your bank within 30 minutes. If the order isn't confirmed, the amount is refunded automatically and you'll get a WhatsApp update." },
  { id: "faq-6", topic: "returns", question: "Can I return fresh fruits and vegetables?", answer: "Fresh produce isn't returned, but if anything is spoiled, damaged or not the grade you chose, report it with a photo within 24 hours and we refund or replace that quantity." },
  { id: "faq-7", topic: "returns", question: "Can I return an opened beauty product?", answer: "Beauty products are returnable within 7 days only if the seal is unbroken. Opened products can be returned only if they are defective, leaked or the wrong item." },
  { id: "faq-8", topic: "freshness", question: "What do Grade A, B and C mean?", answer: "Grade A has the best appearance. Grade B may have small marks or uneven shape but tastes the same, at 10% off. Grade C has visible marks and suits cooking or juices, at 25% off. You choose the grade before you buy." },
  { id: "faq-9", topic: "membership", question: "What is HyperMart Rewards?", answer: "A ₹299 yearly membership with member prices, free delivery above ₹199 and early access to deals. The first 30 days are free." },
  { id: "faq-10", topic: "electronics_services", question: "Do you install TVs and appliances?", answer: "Yes. Our technicians install TVs and large appliances for free. You can book a slot at checkout or after delivery." },
  { id: "faq-11", topic: "electronics_services", question: "How does exchange work?", answer: "Answer a few questions about your old device to see its value range. Our team checks it at pickup, and you approve the final amount in the app before handover." },
  { id: "faq-12", topic: "account", question: "How do I pause my milk subscription?", answer: "Go to My Subscriptions and tap Pause or Skip before 10 PM the day before delivery." },
];
