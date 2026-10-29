// Mock data for development only.
import type { DepartmentInfo, Category, Brand, ReturnPolicy } from "@/types";

export const departments: DepartmentInfo[] = [
  { id: "food", name: "Food and Groceries", shortName: "Food", tagline: "Fresh, staples, dairy and more", colorToken: "food", icon: "Apple", deliveryNote: "Fresh items today or tomorrow", sortOrder: 1 },
  { id: "fashion", name: "Fashion", shortName: "Fashion", tagline: "Women, men and kids", colorToken: "fashion", icon: "Shirt", deliveryNote: "Delivery in 2–3 days", sortOrder: 2 },
  { id: "electronics", name: "Electronics", shortName: "Electronics", tagline: "Mobiles, TVs, appliances", colorToken: "electronics", icon: "Tv", deliveryNote: "Delivery in 2–4 days, installation available", sortOrder: 3 },
  { id: "beauty", name: "Beauty and Personal Care", shortName: "Beauty", tagline: "Skincare, haircare, makeup", colorToken: "beauty", icon: "Sparkles", deliveryNote: "Delivery in 1–2 days", sortOrder: 4 },
];

const c = (id: string, department: Category["department"], parentId: string | null, name: string, returnPolicyId: string, sortOrder: number, icon?: string): Category =>
  ({ id, department, parentId, name, slug: id, returnPolicyId, sortOrder, icon });

export const categories: Category[] = [
  // Food
  c("food-fresh", "food", null, "Fresh fruits and vegetables", "rp-fresh", 1, "Carrot"),
  c("food-fresh-vegetables", "food", "food-fresh", "Vegetables", "rp-fresh", 1),
  c("food-fresh-fruits", "food", "food-fresh", "Fruits", "rp-fresh", 2),
  c("food-dairy", "food", null, "Dairy, bread and eggs", "rp-perishable", 2, "Milk"),
  c("food-staples", "food", null, "Atta, rice, oil and dals", "rp-packaged-food", 3, "Wheat"),
  c("food-snacks", "food", null, "Snacks and regional specialities", "rp-packaged-food", 4, "Cookie"),
  // Fashion
  c("fashion-men", "fashion", null, "Men", "rp-fashion", 1, "Shirt"),
  c("fashion-men-ethnic", "fashion", "fashion-men", "Ethnic wear", "rp-fashion", 1),
  c("fashion-men-western", "fashion", "fashion-men", "Shirts and jeans", "rp-fashion", 2),
  c("fashion-women", "fashion", null, "Women", "rp-fashion", 2, "Shirt"),
  c("fashion-women-sarees", "fashion", "fashion-women", "Sarees", "rp-fashion-exchange", 1),
  c("fashion-women-ethnic", "fashion", "fashion-women", "Kurtas and sets", "rp-fashion", 2),
  c("fashion-kids", "fashion", null, "Kids", "rp-fashion", 3, "Baby"),
  c("fashion-footwear", "fashion", null, "Footwear", "rp-fashion", 4, "Footprints"),
  c("fashion-winter", "fashion", null, "Winter wear", "rp-fashion", 5, "Snowflake"),
  // Beauty
  c("beauty-makeup", "beauty", null, "Makeup", "rp-beauty-sealed", 1, "Palette"),
  c("beauty-skin", "beauty", null, "Skincare", "rp-beauty-sealed", 2, "Droplet"),
  c("beauty-hair", "beauty", null, "Haircare", "rp-beauty-sealed", 3, "Wind"),
  c("beauty-body", "beauty", null, "Bath and body", "rp-beauty-sealed", 4, "Bath"),
  c("beauty-fragrance", "beauty", null, "Fragrances", "rp-beauty-sealed", 5, "Flower"),
  // Electronics
  c("elec-tv", "electronics", null, "Televisions", "rp-large-appliance", 1, "Tv"),
  c("elec-appliances", "electronics", null, "Large appliances", "rp-large-appliance", 2, "Refrigerator"),
  c("elec-laptops", "electronics", null, "Laptops", "rp-electronics", 3, "Laptop"),
  c("elec-mobiles", "electronics", null, "Mobiles", "rp-electronics", 4, "Smartphone"),
  c("elec-refurbished", "electronics", null, "Refurbished", "rp-refurbished", 5, "RefreshCw"),
  c("elec-accessories", "electronics", null, "Accessories", "rp-electronics", 6, "Cable"),
  c("elec-audio", "electronics", null, "Audio", "rp-electronics", 7, "Headphones"),
];

export const brands: Brand[] = [
  { id: "b-hm-fresh", name: "HyperMart Fresh", departments: ["food"], authorisedSource: "own_sourcing" },
  { id: "b-amul", name: "Amul", departments: ["food"], authorisedSource: "authorised_distributor", customerCare: "1800 258 3333" },
  { id: "b-aashirvaad", name: "Aashirvaad", departments: ["food"], authorisedSource: "authorised_distributor" },
  { id: "b-fortune", name: "Fortune", departments: ["food"], authorisedSource: "authorised_distributor" },
  { id: "b-epigamia", name: "Epigamia", departments: ["food"], authorisedSource: "authorised_distributor" },
  { id: "b-kerala-snacks", name: "Malabar Home Foods", departments: ["food"], authorisedSource: "brand_direct" },
  { id: "b-manyavar", name: "Manyavar", departments: ["fashion"], authorisedSource: "brand_direct" },
  { id: "b-kanchi", name: "Kanchi Weaves", departments: ["fashion"], authorisedSource: "brand_direct" },
  { id: "b-levis", name: "Levi's", departments: ["fashion"], authorisedSource: "authorised_distributor" },
  { id: "b-allensolly", name: "Allen Solly", departments: ["fashion"], authorisedSource: "authorised_distributor" },
  { id: "b-biba", name: "Biba", departments: ["fashion"], authorisedSource: "brand_direct" },
  { id: "b-puma", name: "Puma", departments: ["fashion"], authorisedSource: "authorised_distributor" },
  { id: "b-hm-kids", name: "HyperMart Kids", departments: ["fashion"], authorisedSource: "own_sourcing" },
  { id: "b-roadster", name: "Roadster", departments: ["fashion"], authorisedSource: "authorised_distributor" },
  { id: "b-lakme", name: "Lakmé", departments: ["beauty"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-maybelline", name: "Maybelline New York", departments: ["beauty"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-06-30" },
  { id: "b-minimalist", name: "Minimalist", departments: ["beauty"], authorisedSource: "brand_direct", evidenceValidTill: "2027-01-31" },
  { id: "b-cetaphil", name: "Cetaphil", departments: ["beauty"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-02-28" },
  { id: "b-dove", name: "Dove", departments: ["beauty"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-nivea", name: "Nivea", departments: ["beauty"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-bellavita", name: "Bella Vita Organic", departments: ["beauty"], authorisedSource: "brand_direct", evidenceValidTill: "2026-12-31" },
  { id: "b-samsung", name: "Samsung", departments: ["electronics"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31", customerCare: "1800 40 7267864" },
  { id: "b-lg", name: "LG", departments: ["electronics"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-hp", name: "HP", departments: ["electronics"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-boat", name: "boAt", departments: ["electronics"], authorisedSource: "brand_direct", evidenceValidTill: "2027-03-31" },
  { id: "b-apple", name: "Apple", departments: ["electronics"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-xiaomi", name: "Xiaomi", departments: ["electronics"], authorisedSource: "authorised_distributor", evidenceValidTill: "2027-03-31" },
  { id: "b-hm-renewed", name: "HyperMart Renewed", departments: ["electronics"], authorisedSource: "own_sourcing" },
];

export const returnPolicies: ReturnPolicy[] = [
  { id: "rp-fresh", type: "quality_complaint_only", windowDays: 1, windowHours: 24, label: "Quality complaint within 24 h",
    conditions: ["Fresh produce is not returned", "Report spoiled, damaged or wrong-grade items with a photo within 24 hours", "Refund or replacement only for the affected quantity"],
    evidenceRequired: ["photo"], refundMethod: "original_payment_or_store_credit", version: 1 },
  { id: "rp-perishable", type: "quality_complaint_only", windowDays: 1, windowHours: 24, label: "Quality complaint within 24 h",
    conditions: ["Dairy, bread and eggs are not returned", "Report leaked, broken, warm-on-arrival or expired items with a photo within 24 hours"],
    evidenceRequired: ["photo"], refundMethod: "original_payment_or_store_credit", version: 1 },
  { id: "rp-packaged-food", type: "non_returnable", windowDays: 0, label: "Non-returnable",
    conditions: ["Packaged food cannot be returned once delivered", "Damaged, expired or wrong items: report within 48 hours with a photo for a refund"],
    evidenceRequired: ["photo"], refundMethod: "original_payment", version: 1 },
  { id: "rp-fashion", type: "returnable", windowDays: 7, label: "7-day return",
    conditions: ["Unworn and unwashed", "Original tags attached", "Size or colour exchange available"],
    evidenceRequired: ["none"], refundMethod: "original_payment", version: 1 },
  { id: "rp-fashion-exchange", type: "exchange_only", windowDays: 7, label: "Exchange only, 7 days",
    conditions: ["Exchange for another colour or design only", "No refund except for defects", "Unworn, blouse piece uncut, tags attached"],
    evidenceRequired: ["none"], refundMethod: "replacement", version: 1 },
  { id: "rp-beauty-sealed", type: "returnable_if_sealed", windowDays: 7, label: "Returnable if sealed",
    conditions: ["Returnable within 7 days only if the seal is unbroken", "Opened products: return only if defective, leaked or wrong item", "Defect claims need an unboxing video or photos"],
    evidenceRequired: ["unboxing_video", "photo"], refundMethod: "original_payment", version: 1 },
  { id: "rp-electronics", type: "replacement_only", windowDays: 7, label: "7-day replacement",
    conditions: ["Replacement only if defective, damaged or wrong item", "All accessories, box and invoice required", "Serial number must match the invoice"],
    evidenceRequired: ["serial_photo", "unboxing_video"], refundMethod: "replacement", version: 1 },
  { id: "rp-large-appliance", type: "replacement_only", windowDays: 10, label: "10-day replacement",
    conditions: ["Replacement only after technician inspection confirms a defect", "Report transit damage within 48 hours with photos", "Installation by HyperMart technician required for replacement claims"],
    evidenceRequired: ["serial_photo", "photo"], refundMethod: "replacement", version: 1 },
  { id: "rp-refurbished", type: "returnable", windowDays: 7, label: "7-day return",
    conditions: ["Return for refund within 7 days if the device does not match its grade", "Device must be reset and unlocked", "Covered by 6-month HyperMart Renewed warranty"],
    evidenceRequired: ["serial_photo"], refundMethod: "original_payment", version: 1 },
];
