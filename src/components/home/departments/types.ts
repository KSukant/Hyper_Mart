export interface DepartmentShowcaseItem {
  id: "food" | "fashion" | "electronics" | "beauty";
  name: string;
  line1: string;
  line2: string;
  href: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  glowColor: string;
  iconBg: string;
  iconType: "basket" | "shirt" | "monitor" | "bottle";
  panelImage: string;
  productImage: string;
  tilt: number;
  startTilt: number;
  entranceDelay: number;
  idleDuration: number;
  idleY: number;
}

export const SHOWCASE_DEPARTMENTS: DepartmentShowcaseItem[] = [
  {
    id: "food",
    name: "Food & Groceries",
    line1: "Food &",
    line2: "Groceries",
    href: "/category/food",
    bgColor: "#EBF7D9",
    borderColor: "#C9E8B1",
    accentColor: "#087A3D",
    glowColor: "rgba(112, 179, 40, 0.25)",
    iconBg: "#70B328",
    iconType: "basket",
    panelImage: "/department-panel-1-hd.png",
    productImage: "/dept-food-hd.png",
    tilt: -4,
    startTilt: -7,
    entranceDelay: 0.1,
    idleDuration: 6.0,
    idleY: -5,
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    line1: "Fashion &",
    line2: "Apparel",
    href: "/category/fashion",
    bgColor: "#FCE6EB",
    borderColor: "#F1C6D7",
    accentColor: "#A63267",
    glowColor: "rgba(186, 53, 96, 0.25)",
    iconBg: "#BA3560",
    iconType: "shirt",
    panelImage: "/department-panel-2-hd.png",
    productImage: "/dept-fashion-hd.png",
    tilt: -2,
    startTilt: -5,
    entranceDelay: 0.2,
    idleDuration: 7.0,
    idleY: -7,
  },
  {
    id: "electronics",
    name: "Electronics & Appliances",
    line1: "Electronics &",
    line2: "Appliances",
    href: "/category/electronics",
    bgColor: "#E3F0FC",
    borderColor: "#C3DDF5",
    accentColor: "#225FA7",
    glowColor: "rgba(35, 115, 197, 0.25)",
    iconBg: "#2373C5",
    iconType: "monitor",
    panelImage: "/department-panel-3-hd.png",
    productImage: "/dept-electronics-hd.png",
    tilt: 2,
    startTilt: 5,
    entranceDelay: 0.3,
    idleDuration: 6.5,
    idleY: -6,
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    line1: "Beauty &",
    line2: "Personal Care",
    href: "/category/beauty",
    bgColor: "#F1E5F7",
    borderColor: "#DDC4E9",
    accentColor: "#874BA1",
    glowColor: "rgba(142, 68, 173, 0.25)",
    iconBg: "#8E44AD",
    iconType: "bottle",
    panelImage: "/department-panel-4-hd.png",
    productImage: "/dept-beauty-hd.png",
    tilt: 4,
    startTilt: 7,
    entranceDelay: 0.4,
    idleDuration: 7.5,
    idleY: -5,
  },
];

