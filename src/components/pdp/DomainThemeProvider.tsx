"use client";

import React, { createContext, useContext } from "react";
import { type ProductDomain, type DomainTheme, DOMAIN_THEMES } from "./types";

interface DomainThemeContextValue {
  domain: ProductDomain;
  theme: DomainTheme;
}

const DomainThemeContext = createContext<DomainThemeContextValue>({
  domain: "grocery_fresh",
  theme: DOMAIN_THEMES.grocery_fresh,
});

export function useDomainTheme() {
  return useContext(DomainThemeContext);
}

export function DomainThemeProvider({
  domain,
  children,
}: {
  domain: ProductDomain;
  children: React.ReactNode;
}) {
  const theme = DOMAIN_THEMES[domain] ?? DOMAIN_THEMES.grocery_fresh;

  return (
    <DomainThemeContext.Provider value={{ domain, theme }}>
      <div
        className="w-full transition-colors duration-200"
        style={
          {
            "--pdp-primary": theme.primaryColor,
            "--pdp-primary-hover": theme.primaryHover,
            "--pdp-primary-light": theme.primaryLight,
            "--pdp-tint": theme.tintBg,
            "--pdp-accent": theme.accentColor,
            "--pdp-border": theme.cardBorder,
            "--pdp-accent-text": theme.accentText,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </DomainThemeContext.Provider>
  );
}
