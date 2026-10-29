import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 1440, height: 900, name: "desktop" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 390, height: 844, name: "mobile" },
];

for (const vp of VIEWPORTS) {
  test(`Shop by department section on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/", { waitUntil: "networkidle" });

    const section = page.locator("#departments");
    await expect(section).toBeVisible();

    // 1. Check section headings
    await expect(section.locator("text=FOUR DEPARTMENTS · ONE CART")).toBeVisible();
    await expect(section.locator("text=Shop by department")).toBeVisible();

    // 2. Check all 4 departments are represented
    const depts = ["Food & Groceries", "Fashion & Apparel", "Electronics & Appliances", "Beauty & Personal Care"];
    for (const d of depts) {
      await expect(section.locator(`text=${d}`).filter({ visible: true }).first()).toBeVisible();
    }

    // 3. Confirm delivery-related and repetitive rows are REMOVED from the cards
    await expect(section.locator("text=Fresh items today or tomorrow")).toHaveCount(0);
    await expect(section.locator("text=Delivery in 2-4 days")).toHaveCount(0);
    await expect(section.locator("text=Cold-chain delivery")).toHaveCount(0);
    await expect(section.locator("text=Add items from any department")).toHaveCount(0);
    await expect(section.locator("text=Track every shipment in one order")).toHaveCount(0);

    // 4. On desktop, verify image size and container prominence
    if (vp.width >= 1024) {
      const desktopCards = section.locator(".hidden.lg\\:grid [data-domain]");
      await expect(desktopCards).toHaveCount(4);

      // Verify each card has a generous image container and explore button
      for (let i = 0; i < 4; i++) {
        const card = desktopCards.nth(i);
        const img = card.locator(".aspect-\\[4\\/3\\] img");
        await expect(img).toBeVisible();

        const imgBox = await img.boundingBox();
        expect(imgBox).not.toBeNull();
        // The image must be visibly prominent (width >= 180px and height >= 120px)
        expect(imgBox!.width).toBeGreaterThanOrEqual(180);
        expect(imgBox!.height).toBeGreaterThanOrEqual(120);

        // Exploration button is visible and links to department
        const exploreBtn = card.locator("a:has-text('Explore')");
        await expect(exploreBtn).toBeVisible();
        const btnBox = await exploreBtn.boundingBox();
        expect(btnBox).not.toBeNull();
        expect(btnBox!.height).toBeGreaterThanOrEqual(40);
      }
    }

    // 5. Save screenshot of the section for visual verification
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400); // allow layout stabilization
    await section.screenshot({
      path: `test-results/screenshots/department-section-${vp.name}.png`,
    });
  });
}
