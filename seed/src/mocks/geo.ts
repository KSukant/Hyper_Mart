// Mock data for development only.
// Pincodes and area names are real Indian pincodes; verify any you add.
// FSSAI and addresses for warehouses are DEMO values — replace with real ones from the business.
import type { City, Warehouse, PincodeArea, DeliverySlot } from "@/types";

export const cities: City[] = [
  { id: "cbe", name: "Coimbatore", state: "Tamil Nadu", stateCode: "TN", languages: ["en", "ta"], launched: true },
  { id: "che", name: "Chennai", state: "Tamil Nadu", stateCode: "TN", languages: ["en", "ta"], launched: true },
  { id: "blr", name: "Bengaluru", state: "Karnataka", stateCode: "KA", languages: ["en", "kn", "hi"], launched: true },
  { id: "kochi", name: "Kochi", state: "Kerala", stateCode: "KL", languages: ["en", "ml"], launched: true },
];

const zonesAll: Warehouse["zones"] = ["ambient", "chilled", "frozen", "fashion", "beauty_secure", "electronics", "heavy", "restricted"];

export const warehouses: Warehouse[] = [
  {
    id: "wh-cbe-01", cityId: "cbe", name: "HyperMart Coimbatore Fulfilment Centre",
    address: { line1: "Plot 12, SIDCO Industrial Estate", area: "Kurichi", city: "Coimbatore", state: "Tamil Nadu", pincode: "641021" },
    fssaiLicence: "DEMO-FSSAI-TN-0001", sameDayCutoff: "14:00", openHours: { from: "06:00", to: "22:00" }, zones: zonesAll, dailyOrderCapacity: 1500,
  },
  {
    id: "wh-che-01", cityId: "che", name: "HyperMart Chennai Fulfilment Centre",
    address: { line1: "Survey No. 45, GST Road", area: "Guindy", city: "Chennai", state: "Tamil Nadu", pincode: "600032" },
    fssaiLicence: "DEMO-FSSAI-TN-0002", sameDayCutoff: "13:00", openHours: { from: "06:00", to: "22:00" }, zones: zonesAll, dailyOrderCapacity: 3000,
  },
  {
    id: "wh-blr-01", cityId: "blr", name: "HyperMart Bengaluru Fulfilment Centre",
    address: { line1: "No. 8, Hosur Road", area: "Bommanahalli", city: "Bengaluru", state: "Karnataka", pincode: "560068" },
    fssaiLicence: "DEMO-FSSAI-KA-0001", sameDayCutoff: "13:00", openHours: { from: "06:00", to: "22:00" }, zones: zonesAll, dailyOrderCapacity: 3000,
  },
  {
    id: "wh-kochi-01", cityId: "kochi", name: "HyperMart Kochi Fulfilment Centre",
    address: { line1: "Building 3, Kalamassery Industrial Area", area: "Kalamassery", city: "Kochi", state: "Kerala", pincode: "683104" },
    fssaiLicence: "DEMO-FSSAI-KL-0001", sameDayCutoff: "14:00", openHours: { from: "06:00", to: "21:00" }, zones: zonesAll, dailyOrderCapacity: 1200,
  },
];

const p = (pincode: string, area: string, cityId: string, band: "A" | "B" | "C", sameDayFresh = band !== "C"): PincodeArea => ({
  pincode, area, cityId, warehouseId: `wh-${cityId}-01`, serviceable: true, distanceBand: band, sameDayFresh,
});

export const pincodes: PincodeArea[] = [
  // Coimbatore
  p("641001", "Coimbatore Town Hall", "cbe", "A"),
  p("641002", "R.S. Puram", "cbe", "A"),
  p("641004", "Peelamedu", "cbe", "B"),
  p("641012", "Gandhipuram", "cbe", "A"),
  p("641035", "Saravanampatti", "cbe", "C"),
  p("641062", "Neelambur", "cbe", "C"),
  // Chennai
  p("600017", "T. Nagar", "che", "A"),
  p("600020", "Adyar", "che", "A"),
  p("600040", "Anna Nagar", "che", "B"),
  p("600096", "Perungudi", "che", "B"),
  p("600119", "Sholinganallur", "che", "C"),
  // Bengaluru
  p("560001", "MG Road", "blr", "B"),
  p("560034", "Koramangala", "blr", "A"),
  p("560038", "Indiranagar", "blr", "B"),
  p("560102", "HSR Layout", "blr", "A"),
  p("560103", "Bellandur", "blr", "B"),
  // Kochi
  p("682016", "Ernakulam South", "kochi", "B"),
  p("682020", "Kadavanthra", "kochi", "B"),
  p("682024", "Edappally", "kochi", "A"),
  p("682030", "Kakkanad", "kochi", "B"),
  p("682001", "Fort Kochi", "kochi", "C"),
  // Not serviceable yet (show "We don't deliver here yet — notify me")
  { pincode: "625001", area: "Madurai", cityId: null, warehouseId: null, serviceable: false, distanceBand: "C", sameDayFresh: false },
  { pincode: "636001", area: "Salem", cityId: null, warehouseId: null, serviceable: false, distanceBand: "C", sameDayFresh: false },
  { pincode: "570001", area: "Mysuru", cityId: null, warehouseId: null, serviceable: false, distanceBand: "C", sameDayFresh: false },
];

export const DEFAULT_PINCODE = "641004";

export const deliverySlots: DeliverySlot[] = [
  { id: "s-07", label: "7 AM – 9 AM", from: "07:00", to: "09:00", sameDayAllowed: false, allowedHandling: ["standard", "chilled", "heat_sensitive"], capacityPerWarehouse: 200 },
  { id: "s-09", label: "9 AM – 11 AM", from: "09:00", to: "11:00", sameDayAllowed: false, allowedHandling: ["standard", "chilled", "heavy", "heat_sensitive"], capacityPerWarehouse: 200 },
  { id: "s-12", label: "12 PM – 2 PM", from: "12:00", to: "14:00", sameDayAllowed: false, allowedHandling: ["standard", "chilled", "heavy"], capacityPerWarehouse: 150 },
  { id: "s-15", label: "3 PM – 5 PM", from: "15:00", to: "17:00", sameDayAllowed: true, allowedHandling: ["standard", "chilled", "heavy"], capacityPerWarehouse: 150 },
  { id: "s-17", label: "5 PM – 7 PM", from: "17:00", to: "19:00", sameDayAllowed: true, allowedHandling: ["standard", "chilled", "heat_sensitive"], capacityPerWarehouse: 250 },
  { id: "s-19", label: "7 PM – 9 PM", from: "19:00", to: "21:00", sameDayAllowed: true, allowedHandling: ["standard", "chilled", "heat_sensitive"], capacityPerWarehouse: 250 },
];
// Rules: heat-sensitive items only in morning/evening slots (no 12–5 PM).
// Heavy items (fridge, oil tins >5 L, atta bags ≥10 kg) only 9 AM – 5 PM.
// Same-day slots appear only if ordered before the warehouse sameDayCutoff AND pincode.sameDayFresh is true.
