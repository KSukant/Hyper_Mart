"use client";
import { Apple, Shirt, Tv, ShoppingBag } from "lucide-react";
export const DEPT_ICON = { food: Apple, fashion: Shirt, electronics: Tv, beauty: ShoppingBag } as const;

export { SiteHeader as Header, SiteHeader } from "./SiteHeader";
export { PrimaryNavbar, LogoLink, NavLink, navigation } from "./PrimaryNavbar";
export { CategoryMegaMenu, CategoryMegaMenu as CategoryMenu } from "./CategoryMegaMenu";
export { MobileNavigationDrawer } from "./MobileNavigationDrawer";
export { LocationSelector, LocationPanel } from "./LocationPanel";
export { GlobalSearch, GlobalSearch as HeaderSearch } from "./GlobalSearch";
export { SearchSuggestions } from "./SearchSuggestions";
export { LanguageSelector } from "./LanguageSelector";
export { AccountMenu } from "./AccountMenu";
export { CartButton, MiniCartDrawer } from "./MiniCartDrawer";
export { TrustRibbon, TrustNode } from "./TrustRibbon";
export { Logo } from "./Logo";
