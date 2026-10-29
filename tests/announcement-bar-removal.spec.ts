import { test, expect } from "@playwright/test";

const ROUTES = [
  { name: "Homepage", path: "/" },
  { name: "Food & Groceries Domain", path: "/category/food" },
  { name: "Fashion Domain", path: "/category/fashion" },
  { name: "Beauty & Personal Care Domain", path: "/category/beauty" },
  { name: "Electronics Domain", path: "/category/electronics" },
  { name: "Product Detail (Fresh Tomatoes)", path: "/product/fresh-tomatoes" },
  { name: "Product Detail (Amul Milk)", path: "/product/amul-toned-milk-1l" },
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: "Desktop (1440x900)" },
  { width: 390, height: 844, name: "Mobile (390x844)" },
];

for (const vp of VIEWPORTS) {
  test.describe(`Announcement Bar Removal - ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`${route.name} (${route.path}) has no announcement bar and header is at top`, async ({
        page,
      }) => {
        const consoleErrors: string[] = [];
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            consoleErrors.push(msg.text());
          }
        });
        page.on("pageerror", (err) => {
          consoleErrors.push(err.message);
        });

        await page.goto(route.path, { waitUntil: "networkidle" });

        // 1. Confirm announcement bar elements are completely absent from the DOM
        await expect(page.locator("text=Express Delivery in")).toHaveCount(0);
        await expect(page.locator("text=Help & Support")).toHaveCount(0);
        await expect(page.locator("text=Download App")).toHaveCount(0);
        await expect(page.locator("text=Bulk Orders")).toHaveCount(0);
        await expect(page.locator(".bg-\\[\\#083D25\\]")).toHaveCount(0);

        // 2. Main navigation header is the first element at the very top of the page (y = 0)
        const header = page.locator("header.sticky");
        await expect(header).toBeVisible();
        const headerBox = await header.boundingBox();
        expect(headerBox).not.toBeNull();
        expect(Math.round(headerBox!.y)).toBe(0);

        // 3. Main navigation elements remain intact and functional
        const logo = header.locator('a[aria-label*="HyperMart" i]:visible').first();
        await expect(logo).toBeVisible();

        // Cart button remains present
        const cartBtn = header.locator('button[aria-label*="cart" i]:visible, a[href="/cart"]:visible').first();
        await expect(cartBtn).toBeVisible();

        // Zero console errors
        expect(consoleErrors).toEqual([]);
      });
    }
  });
}
