import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";
import { site } from "@/mocks";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: { default: "HyperMart — Fresh food, fashion, electronics and beauty", template: "%s | HyperMart" },
  description: site.tagline,
};
export const viewport: Viewport = { themeColor: "#0B5132", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
