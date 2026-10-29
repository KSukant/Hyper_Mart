import type { Config } from "tailwindcss";
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [{ pattern: /^(bg|text|ring|border)-(food|fashion|beauty|electronics)(-tint)?$/ }],
  theme: {
    extend: {
      // height-based variants so snap sections fit short laptop screens (1366×768, 1280×720)
      screens: { short: { raw: "(max-height: 920px)" }, tiny: { raw: "(max-height: 740px)" }, "phone-short": { raw: "(max-width: 639px) and (max-height: 760px)" } },
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          500: "var(--brand-500)",
          700: "var(--brand-700)",
          900: "var(--brand-900)",
        },
        primary: { DEFAULT: v("primary"), dark: v("primary-dark"), tint: v("primary-tint"), soft: v("primary-soft") },
        secondary: { DEFAULT: v("secondary"), tint: v("secondary-tint") },
        accent: { DEFAULT: v("accent"), tint: v("accent-tint"), text: v("accent-text") },
        danger: { DEFAULT: v("danger"), tint: v("danger-tint") },
        success: v("success"), bg: v("bg"), surface: v("surface"), ink: v("text"), muted: v("muted"), line: v("border"),
        food: { DEFAULT: v("food"), tint: v("food-tint") }, fashion: { DEFAULT: v("fashion"), tint: v("fashion-tint") },
        beauty: { DEFAULT: v("beauty"), tint: v("beauty-tint") }, electronics: { DEFAULT: v("electronics"), tint: v("electronics-tint") },
      },
      fontFamily: { sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"], display: ["'Plus Jakarta Sans'", "'Inter Variable'", "sans-serif"] },
      boxShadow: {
        card: "0 2px 12px rgba(23,32,51,0.06)", lift: "0 10px 28px rgba(23,32,51,0.12)", pop: "0 18px 50px rgba(23,32,51,0.20)",
      },
      borderRadius: { "4xl": "2rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { "fade-up": "fade-up .5s ease-out both" },
    },
  },
  plugins: [],
} satisfies Config;
