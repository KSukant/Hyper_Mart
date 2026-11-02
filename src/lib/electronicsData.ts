import type { Product } from "@/types";

export type ElectronicsSubcategory =
  | "elec-tv"
  | "elec-appliances"
  | "elec-laptops"
  | "elec-mobiles"
  | "elec-audio"
  | "elec-accessories"
  | "elec-refurbished";

export interface UseCaseDef {
  id: string;
  label: string;
  iconName: string;
}

export interface VerdictDetail {
  title: string;
  status: "Suitable" | "Suitable with limits" | "Not recommended";
  desc: string;
  pros: string[];
  cons: string[];
}

export interface CompatibleAccessoryItem {
  id: string;
  category: string;
  name: string;
  model: string;
  status: "compatible" | "compatible_with_limits" | "not_compatible" | "requires_verification";
  notes: string;
  recommendedBrand?: string;
  price?: number;
}

export interface HomeFitSpec {
  itemType: "tv" | "refrigerator" | "laptop" | "mobile" | "audio" | "appliance";
  diagramLabel: string;
  widthMm: number;
  heightMm: number;
  depthMm: number;
  weightKg: number;
  wallMountable?: boolean;
  powerRequirement: string;
  recommendedClearanceMm: {
    back: number;
    sides: number;
    top: number;
  };
  minDoorwayWidthMm: number;
  requiresTwoPersonDelivery: boolean;
  requiresPlumbing?: boolean;
}

export interface HandoverStep {
  step: number;
  title: string;
  description: string;
  required: boolean;
  isIrreversible?: boolean;
}

/**
 * 1. Category-specific questionnaire use cases
 */
export const CATEGORY_USE_CASES: Record<string, UseCaseDef[]> = {
  "elec-tv": [
    { id: "movies", label: "Movies & Cinema", iconName: "Film" },
    { id: "sports", label: "Live Sports", iconName: "Activity" },
    { id: "gaming", label: "Console Gaming", iconName: "Gamepad2" },
    { id: "streaming", label: "OTT & Streaming", iconName: "Tv" },
    { id: "family", label: "Everyday Family Use", iconName: "Users" },
  ],
  "elec-laptops": [
    { id: "study", label: "Study & Academics", iconName: "GraduationCap" },
    { id: "office", label: "Office & Productivity", iconName: "Briefcase" },
    { id: "coding", label: "Programming & Dev", iconName: "Terminal" },
    { id: "gaming", label: "Gaming", iconName: "Gamepad2" },
    { id: "editing", label: "Photo & Video Editing", iconName: "Film" },
    { id: "pro", label: "Heavy Workloads", iconName: "Cpu" },
  ],
  "elec-mobiles": [
    { id: "photography", label: "Camera & Vlogging", iconName: "Camera" },
    { id: "gaming", label: "Mobile Gaming", iconName: "Gamepad2" },
    { id: "social", label: "Social Media & Video", iconName: "Share2" },
    { id: "business", label: "Work & Communication", iconName: "Briefcase" },
    { id: "everyday", label: "Everyday All-Rounder", iconName: "Smartphone" },
  ],
  "elec-appliances": [
    { id: "large_family", label: "Family (4–6 Members)", iconName: "Users" },
    { id: "small_family", label: "Couple / 2–3 Members", iconName: "User" },
    { id: "energy_saver", label: "Maximum Energy Savings", iconName: "Zap" },
    { id: "heavy_storage", label: "Heavy Freezer & Fresh Storage", iconName: "Package" },
  ],
  "elec-audio": [
    { id: "commute", label: "Daily Commute & Travel", iconName: "Headphones" },
    { id: "workout", label: "Gym & Sports (Sweatproof)", iconName: "Activity" },
    { id: "calls", label: "Calls & Meetings", iconName: "PhoneCall" },
    { id: "music", label: "Hi-Res Music Listening", iconName: "Music" },
  ],
  "elec-refurbished": [
    { id: "budget_flagship", label: "Budget Flagship Value", iconName: "Award" },
    { id: "daily_driver", label: "Reliable Daily Phone", iconName: "Smartphone" },
    { id: "secondary", label: "Secondary / Business Device", iconName: "Briefcase" },
  ],
  default: [
    { id: "general", label: "Everyday Use", iconName: "CheckCircle2" },
    { id: "performance", label: "Performance", iconName: "Zap" },
  ],
};

/**
 * 2. Dynamic Category-Specific Verdict Generator
 */
export function getCategoryVerdict(p: Product, useCaseId: string): VerdictDetail {
  const cat = p.categoryId;
  const name = p.name;

  if (cat === "elec-tv") {
    switch (useCaseId) {
      case "movies":
        return {
          title: "Suitable for Movies & Cinema",
          status: "Suitable",
          desc: "Vibrant contrast, wide viewing angles and built-in stereo surround sound enhance cinematic immersion.",
          pros: [
            "HD Ready / LED panel delivers crisp clarity for web series and cinema",
            "Cinema picture preset with balanced colour temperature",
            "HDMI ARC connection for external soundbars",
          ],
          cons: [
            "Dark room black levels are moderate compared to premium OLEDs",
            "Requires soundbar for true Dolby Atmos theatrical bass",
          ],
        };
      case "sports":
        return {
          title: "Suitable for Live Sports",
          status: "Suitable",
          desc: "60 Hz panel with motion interpolation handles fast cricket and football broadcasts cleanly.",
          pros: [
            "Live sports audio mode boosts stadium crowd cheers",
            "Wide viewing angles allow large group viewing across living rooms",
          ],
          cons: ["60 Hz native refresh rate rather than 120 Hz high-speed sports motion"],
        };
      case "gaming":
        return {
          title: "Suitable with limits for Gaming",
          status: "Suitable with limits",
          desc: "Great for casual Nintendo Switch and PlayStation 4 gaming; capped at 60 FPS for next-gen consoles.",
          pros: [
            "Low input lag game mode reduces controller delay",
            "2 HDMI ports support multiple gaming consoles",
          ],
          cons: [
            "No HDMI 2.1 120 Hz or Variable Refresh Rate (VRR)",
            "Resolution capped at HD Ready (1366 × 768)",
          ],
        };
      default:
        return {
          title: "Suitable for Everyday Streaming",
          status: "Suitable",
          desc: "Built-in Netflix, Prime Video, YouTube and screen mirroring provide instant entertainment.",
          pros: ["Direct Wi-Fi streaming with zero dongles needed", "Simple remote with dedicated OTT hotkeys"],
          cons: ["Requires steady 10 Mbps broadband for buffer-free playback"],
        };
    }
  }

  if (cat === "elec-appliances") {
    switch (useCaseId) {
      case "large_family":
        return {
          title: "Suitable for 3 to 5 Members",
          status: "Suitable",
          desc: "260 Litres total volume with 70 Litres deep freeze capacity effortlessly stores weekly provisions.",
          pros: [
            "Toughened glass shelves hold up to 175 kg heavy pots and vessels",
            "Moist balance crisper keeps vegetables fresh for 7+ days",
          ],
          cons: ["For joint families above 6 members, a 350 L+ model is recommended"],
        };
      case "energy_saver":
        return {
          title: "High Energy Efficiency (3 Star Inverter)",
          status: "Suitable",
          desc: "Smart Inverter Compressor automatically adjusts cooling speed, using up to 36% less power than non-inverter fridges.",
          pros: [
            "BEE 3 Star rated energy consumption",
            "10-year compressor warranty coverage included",
            "Solar smart & home inverter compatible",
          ],
          cons: ["Initial purchase cost is higher than non-inverter direct-cool models"],
        };
      default:
        return {
          title: "Suitable for Everyday Refrigeration",
          status: "Suitable",
          desc: "Frost-free double door technology prevents ice build-up and maintains uniform cooling throughout.",
          pros: ["Zero manual defrosting needed", "Stabiliser-free operation from 100 V to 310 V"],
          cons: ["Requires 10 cm rear and side clearance for optimal heat dissipation"],
        };
    }
  }

  if (cat === "elec-mobiles" || cat === "elec-refurbished") {
    switch (useCaseId) {
      case "photography":
        return {
          title: "Suitable for Daylight & Social Photography",
          status: "Suitable",
          desc: "High-resolution main camera sensor captures vibrant colors and sharp detail in well-lit conditions.",
          pros: [
            "Multi-camera setup with ultra-wide angle for landscape shots",
            "4K video recording with electronic image stabilization",
          ],
          cons: ["Low-light and night shots exhibit slight softness without a tripod"],
        };
      case "gaming":
        return {
          title: "Suitable with limits for High-End Gaming",
          status: "Suitable with limits",
          desc: "Smoothly runs popular titles like BGMI and Free Fire at medium-to-high framerates; thermal throttling occurs during extended sessions.",
          pros: [
            "120 Hz AMOLED display delivers responsive touch sampling",
            "Large capacity battery ensures extended gaming endurance",
          ],
          cons: ["Intense 3D titles require lowering graphic presets to sustain 60 FPS"],
        };
      default:
        return {
          title: "Suitable — Excellent Daily Driver",
          status: "Suitable",
          desc: "Long-lasting battery, vibrant 120 Hz screen, and modern 5G connectivity provide reliable performance all day.",
          pros: [
            "Full day battery backup with moderate to heavy usage",
            "Crisp AMOLED display with high outdoor sunlight visibility",
          ],
          cons: ["In-box fast charger may not be included depending on brand policy"],
        };
    }
  }

  // Laptops and general electronics fallback
  return {
    title: "Suitable — Office & Everyday Computing",
    status: "Suitable",
    desc: "Fast SSD storage, responsive multi-core processing, and lightweight chassis ensure all-day productivity.",
    pros: [
      "Smooth multi-app multitasking with fast boot speeds",
      "Ergonomic keyboard and responsive trackpad for typing comfort",
    ],
    cons: ["Not intended for professional 3D rendering or AAA console-grade gaming"],
  };
}

/**
 * 3. Category-Specific Compatibility Check Catalog
 */
export function getCategoryCompatibleAccessories(p: Product): CompatibleAccessoryItem[] {
  const cat = p.categoryId;

  if (cat === "elec-tv") {
    return [
      {
        id: "acc-tv-01",
        category: "Mounting & Hardware",
        name: "Heavy-Duty Full Motion Wall Mount Bracket",
        model: "VESA 100x100 / 200x200 Universal",
        status: "compatible",
        notes: "Strictly matches TV back screw mounting pattern. Solid steel holds up to 25 kg.",
        recommendedBrand: "HyperMart ProMount",
        price: 999,
      },
      {
        id: "acc-tv-02",
        category: "Audio Equipment",
        name: "100W Cinematic Soundbar with HDMI ARC",
        model: "ARC / Optical / Bluetooth 5.3",
        status: "compatible",
        notes: "Controls volume seamlessly using your TV remote via HDMI-CEC.",
        recommendedBrand: "boAt / Samsung",
        price: 4999,
      },
      {
        id: "acc-tv-03",
        category: "Cables & Interconnects",
        name: "High-Speed 4K HDMI 2.0 Cable (2 Metres)",
        model: "Gold Plated 18 Gbps",
        status: "compatible",
        notes: "Certified for zero frame drops with set-top boxes, laptops and consoles.",
        recommendedBrand: "AmazonBasics / HyperMart",
        price: 349,
      },
      {
        id: "acc-tv-04",
        category: "Power & Protection",
        name: "Voltage Stabiliser for LED TVs up to 55\"",
        model: "Working Range 90V – 290V",
        status: "compatible",
        notes: "Protects delicate TV motherboard against sudden monsoon lightning surges.",
        recommendedBrand: "V-Guard",
        price: 1890,
      },
      {
        id: "acc-tv-05",
        category: "Laptop Docks & USB Hubs",
        name: "Thunderbolt 4 Laptop Docking Station",
        model: "TB4-100W",
        status: "not_compatible",
        notes: "Incompatible. This TV only has standard USB-A 2.0 and HDMI ports; PC docks cannot interface with TV firmware.",
      },
    ];
  }

  if (cat === "elec-appliances") {
    return [
      {
        id: "acc-app-01",
        category: "Voltage Protection",
        name: "Digital Voltage Stabiliser for Refrigerator up to 300L",
        model: "VG-50 (130V to 290V)",
        status: "compatible",
        notes: "Smart time-delay system protects compressor during power resumption.",
        recommendedBrand: "V-Guard",
        price: 2199,
      },
      {
        id: "acc-app-02",
        category: "Plumbing & Electrical",
        name: "Heavy-Duty 16A 3-Pin Extension Cord (3 Metres)",
        model: "16A Industrial Fire-Retardant",
        status: "compatible",
        notes: "Certified ISI copper wiring supports continuous compressor load.",
        recommendedBrand: "Anchor by Panasonic",
        price: 649,
      },
      {
        id: "acc-app-03",
        category: "Mobility & Trolley",
        name: "Rust-Proof Multi-Wheel Appliance Trolley",
        model: "Adjustable 50 cm – 75 cm",
        status: "compatible",
        notes: "Facilitates easy kitchen cleaning underneath without scratching tiles.",
        recommendedBrand: "HyperMart Care",
        price: 1299,
      },
      {
        id: "acc-app-04",
        category: "Audio Accessories",
        name: "Wireless ANC Bluetooth Earbuds",
        model: "BT 5.2",
        status: "not_compatible",
        notes: "Not applicable. Refrigerators have no audio Bluetooth transmitter.",
      },
    ];
  }

  if (cat === "elec-mobiles" || cat === "elec-refurbished") {
    return [
      {
        id: "acc-mob-01",
        category: "Fast Charging",
        name: "25W USB-C Super Fast Power Adapter",
        model: "Type-C PD 3.0 PPS",
        status: "compatible",
        notes: "Powers 0 to 50% in approximately 30 minutes with thermal regulation.",
        recommendedBrand: "Samsung / HyperMart",
        price: 1299,
      },
      {
        id: "acc-mob-02",
        category: "Protection",
        name: "9H Edge-to-Edge Tempered Glass Screen Protector",
        model: "Oleophobic Anti-Fingerprint",
        status: "compatible",
        notes: "Custom laser-cut for front camera punch hole and under-display sensors.",
        recommendedBrand: "HyperMart Shield",
        price: 399,
      },
      {
        id: "acc-mob-03",
        category: "Audio",
        name: "True Wireless Bluetooth Earbuds with Mic",
        model: "TWS Earbuds BT 5.3",
        status: "compatible",
        notes: "Instant one-tap Bluetooth pairing with fast battery status indicator widget.",
        recommendedBrand: "boAt / Samsung",
        price: 1499,
      },
      {
        id: "acc-mob-04",
        category: "TV Wall Mount",
        name: "VESA 400x400 TV Wall Bracket",
        model: "VESA Steel",
        status: "not_compatible",
        notes: "Incompatible. Smartphone has no TV mounting brackets.",
      },
    ];
  }

  // Laptops and Accessories default
  return [
    {
      id: "acc-lap-01",
      category: "Docks & Expansion",
      name: "7-in-1 USB-C Multiport Hub with HDMI 4K & Power Delivery",
      model: "USB-C to HDMI, 2x USB 3.0, SD Card, 100W PD",
      status: "compatible",
      notes: "Plug and play. Extends laptop screen to external monitors while pass-through charging.",
      recommendedBrand: "HyperMart Pro / Anker",
      price: 2499,
    },
    {
      id: "acc-lap-02",
      category: "Power",
      name: "65W GaN Compact USB-C Laptop Charger",
      model: "GaN Fast Charger 65W",
      status: "compatible",
      notes: "40% smaller than OEM brick with dual outputs for laptop + phone simultaneously.",
      recommendedBrand: "HyperMart Power",
      price: 1899,
    },
    {
      id: "acc-lap-03",
      category: "Peripherals",
      name: "Silent Wireless Keyboard & Ergonomic Mouse Combo",
      model: "2.4 GHz Nano Receiver + Dual Bluetooth",
      status: "compatible",
      notes: "Long 18-month battery life with whisper-quiet membrane keys.",
      recommendedBrand: "Logitech / HP",
      price: 1699,
    },
    {
      id: "acc-lap-04",
      category: "Bags & Sleeves",
      name: "Water-Resistant 14\" Padded Laptop Sleeve",
      model: "Shockproof Neoprene with Accessory Pocket",
      status: "compatible",
      notes: "Tailored interior lining prevents zipper scratches while travelling.",
      recommendedBrand: "HyperMart Everyday",
      price: 799,
    },
  ];
}

/**
 * 4. Authoritative Home-Fit Measurements
 */
export function getProductHomeFitSpec(p: Product): HomeFitSpec {
  const cat = p.categoryId;
  const a = p.attrs;

  if (cat === "elec-tv") {
    const w = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.w * 10 : 730;
    const h = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.h * 10 : 440;
    const d = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.d * 10 : 80;
    return {
      itemType: "tv",
      diagramLabel: "32\" LED Smart Television",
      widthMm: w,
      heightMm: h,
      depthMm: d,
      weightKg: p.weightKg || 6.5,
      wallMountable: true,
      powerRequirement: "230V AC, 50/60 Hz (Standard 6A 2-pin / 3-pin socket within 1.2 m)",
      recommendedClearanceMm: { back: 50, sides: 100, top: 100 },
      minDoorwayWidthMm: 550,
      requiresTwoPersonDelivery: false,
    };
  }

  if (cat === "elec-appliances") {
    const w = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.w * 10 : 555;
    const h = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.h * 10 : 1590;
    const d = a.department === "electronics" && a.productDimensionsCm ? a.productDimensionsCm.d * 10 : 655;
    return {
      itemType: "refrigerator",
      diagramLabel: "260 L Frost-Free Double Door Refrigerator",
      widthMm: w,
      heightMm: h,
      depthMm: d,
      weightKg: p.weightKg || 52,
      wallMountable: false,
      powerRequirement: "230V AC (Dedicated 5A/16A socket within 1.5 m, earthing mandatory)",
      recommendedClearanceMm: { back: 100, sides: 50, top: 100 },
      minDoorwayWidthMm: 700,
      requiresTwoPersonDelivery: true,
    };
  }

  if (cat === "elec-laptops") {
    return {
      itemType: "laptop",
      diagramLabel: "14\" Ultra-Slim Laptop",
      widthMm: 323,
      heightMm: 18,
      depthMm: 215,
      weightKg: 1.4,
      wallMountable: false,
      powerRequirement: "65W USB-C Adapter (100–240V AC universal)",
      recommendedClearanceMm: { back: 30, sides: 30, top: 0 },
      minDoorwayWidthMm: 400,
      requiresTwoPersonDelivery: false,
    };
  }

  if (cat === "elec-mobiles" || cat === "elec-refurbished") {
    return {
      itemType: "mobile",
      diagramLabel: "Smartphone",
      widthMm: 77,
      heightMm: 161,
      depthMm: 9,
      weightKg: 0.2,
      wallMountable: false,
      powerRequirement: "25W USB-C Fast Charger",
      recommendedClearanceMm: { back: 0, sides: 0, top: 0 },
      minDoorwayWidthMm: 300,
      requiresTwoPersonDelivery: false,
    };
  }

  // Audio / accessories fallback
  return {
    itemType: "audio",
    diagramLabel: "Portable Audio Device",
    widthMm: 60,
    heightMm: 45,
    depthMm: 25,
    weightKg: 0.15,
    wallMountable: false,
    powerRequirement: "5W USB Type-C input",
    recommendedClearanceMm: { back: 0, sides: 0, top: 0 },
    minDoorwayWidthMm: 200,
    requiresTwoPersonDelivery: false,
  };
}

/**
 * 5. Category-Specific Exchange Handover Preparation Checklists
 */
export function getCategoryHandoverSteps(p: Product): HandoverStep[] {
  const cat = p.categoryId;

  if (cat === "elec-mobiles" || cat === "elec-refurbished") {
    return [
      { step: 1, title: "Back Up Your Data", description: "Transfer photos, contacts, WhatsApp chats, and messages to Google Drive, iCloud or a computer.", required: true },
      { step: 2, title: "Sign Out of All Accounts", description: "Remove Google account, Apple ID, Samsung account and screen unlock passcodes/PINs.", required: true },
      { step: 3, title: "Remove SIM Card & Memory Card", description: "Use SIM ejector pin to take out physical SIM cards and microSD memory cards.", required: true },
      { step: 4, title: "Perform Factory Reset", description: "Wipe all device storage completely from Settings > System > Reset to protect your privacy.", required: true, isIrreversible: true },
      { step: 5, title: "Prepare In-Box Accessories", description: "Have original charging cable, power adapter, and retail box ready if declared during evaluation.", required: false },
      { step: 6, title: "Doorstep Physical Verification", description: "Keep phone with at least 30% battery charged so the HyperMart courier can verify screen and IMEI.", required: true },
    ];
  }

  if (cat === "elec-laptops") {
    return [
      { step: 1, title: "Back Up Personal Files", description: "Copy documents, project code, and browser bookmarks to an external drive or cloud storage.", required: true },
      { step: 2, title: "De-authorize Software & Licenses", description: "Sign out of Microsoft Office, Adobe Creative Cloud, Steam, and Windows account.", required: true },
      { step: 3, title: "Remove External Storage & Dongles", description: "Unplug USB receivers, SD cards, external mice and security keys.", required: true },
      { step: 4, title: "Reset Windows / macOS", description: "Run full 'Reset this PC' choosing 'Clean drive and wipe data' to ensure zero data traces remain.", required: true, isIrreversible: true },
      { step: 5, title: "Pack Power Adapter & Cable", description: "Keep original OEM laptop power brick and charging cable alongside the laptop for pickup.", required: true },
      { step: 6, title: "Courier Diagnostic Run", description: "Ensure battery has 20%+ charge so courier can verify display panels, hinge, and keyboard keys.", required: true },
    ];
  }

  if (cat === "elec-tv") {
    return [
      { step: 1, title: "Sign Out of Streaming Accounts", description: "Log out of Netflix, Prime Video, Disney+ Hotstar, YouTube, and Google TV accounts.", required: true },
      { step: 2, title: "Factory Reset TV Firmware", description: "Navigate to Settings > System > Reset to restore initial setup screen.", required: true, isIrreversible: true },
      { step: 3, title: "Dismount Safely", description: "If wall-mounted, unhook the TV carefully from wall bracket or have table stand feet installed.", required: true },
      { step: 4, title: "Gather Remote & Cables", description: "Provide original TV remote with battery cover intact, plus power cord and table stand.", required: true },
      { step: 5, title: "Technician Screen Verification", description: "Turn on power briefly so courier confirms screen panel has no crack lines or liquid bleed.", required: true },
    ];
  }

  // Large Appliances (Refrigerators, Washers)
  return [
    { step: 1, title: "Empty All Stored Items", description: "Completely clear out food items, beverages, ice trays, and removable door racks.", required: true },
    { step: 2, title: "Defrost & Clean 12 Hours Prior", description: "Unplug the unit 12 hours before pickup to allow defrosting; wipe dry to prevent water leakage in transit.", required: true },
    { step: 3, title: "Disconnect Safely from Power Socket", description: "Turn off 16A wall switch and coil the power cord neatly behind the unit with tape.", required: true },
    { step: 4, title: "Collect Shelves and Trays", description: "Secure all glass crisper shelves and door bins inside with painter's tape.", required: true },
    { step: 5, title: "Clear Delivery Route & Doorways", description: "Ensure doorways, staircase, and hallways are unobstructed for the 2-person courier pickup team.", required: true },
  ];
}

