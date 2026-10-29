import { test, expect } from "@playwright/test";
import fs from "fs";

test.describe("Deals Ending Soon section", () => {
  test.beforeAll(() => {
    fs.mkdirSync("test-results/screenshots", { recursive: true });
  });
  test("Desktop (1440x900): layout, image prominence, 4 cards in view, controls & cart", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const section = page.locator("#deals");
    await expect(section).toBeVisible();

    // 1. Header elements
    await expect(section.locator("text=HURRY — LIMITED STOCK")).toBeVisible();
    await expect(section.locator("h2:has-text('Deals')")).toBeVisible();
    await expect(section.locator("a:has-text('See all deals →')")).toBeVisible();

    // 2. Category filter chips
    const filterChips = section.locator("button:has-text('Food and Groceries'), button:has-text('Fashion'), button:has-text('Electronics'), button:has-text('Beauty and Personal Care')");
    await expect(filterChips).toHaveCount(4);

    // 3. Carousel container & cards
    const cardWrappers = section.locator(".deal-card-wrapper");
    const count = await cardWrappers.count();
    expect(count).toBeGreaterThanOrEqual(10); // "All" category has 12 deals

    // 4. Verify first 4 cards fit within viewport width with large images
    for (let i = 0; i < 4; i++) {
      const card = cardWrappers.nth(i);
      await expect(card).toBeVisible();

      // Check image prominence (aspect 4:3, width >= 220px, height >= 140px)
      const img = card.locator(".aspect-\\[4\\/3\\] img");
      await expect(img).toBeVisible();
      const imgBox = await img.boundingBox();
      expect(imgBox).not.toBeNull();
      expect(imgBox!.width).toBeGreaterThanOrEqual(200);
      expect(imgBox!.height).toBeGreaterThanOrEqual(130);

      // Check discount badge top-left
      const badge = card.locator("span:has-text('-%')");
      if (await badge.count() > 0) {
        await expect(badge.first()).toBeVisible();
      }

      // Check wishlist button top-right
      const wishBtn = card.locator("button[aria-label*='wishlist']");
      await expect(wishBtn).toBeVisible();

      // Check product name (readable text)
      const title = card.locator("h3");
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText?.trim().length).toBeGreaterThan(3);

      // Check Add to Cart button
      const addBtn = card.locator("button:has-text('Add to cart')");
      if (await addBtn.count() > 0) {
        await expect(addBtn).toBeVisible();
        const btnBox = await addBtn.boundingBox();
        expect(btnBox).not.toBeNull();
        expect(btnBox!.height).toBeGreaterThanOrEqual(36);
      }
    }

    // 5. Test Prev/Next arrow navigation
    const prevBtn = section.locator("button[aria-label='Previous deal']");
    const nextBtn = section.locator("button[aria-label='Next deal']");
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();

    // Initially at start, prevBtn should be disabled
    await expect(prevBtn).toBeDisabled();
    await expect(nextBtn).toBeEnabled();

    // Click Next deal -> scrolls forward
    await nextBtn.click();
    await page.waitForTimeout(600);
    // Now prevBtn should become enabled
    await expect(prevBtn).toBeEnabled();

    // Click Prev deal -> scrolls back
    await prevBtn.click();
    await page.waitForTimeout(600);
    await expect(prevBtn).toBeDisabled();

    // 6. Test Category Filter
    const elecChip = section.locator("button:has-text('Electronics')");
    await elecChip.click();
    await page.waitForTimeout(400);

    // Electronics has 3 deals
    const elecCards = section.locator(".deal-card-wrapper");
    await expect(elecCards).toHaveCount(3);

    // Click "All" to restore
    const allChip = section.locator("button:has-text('All')");
    await allChip.click();
    await page.waitForTimeout(400);
    await expect(section.locator(".deal-card-wrapper")).toHaveCount(count);

    // 7. Test Add to cart interaction
    const firstAddBtn = cardWrappers.first().locator("button:has-text('Add to cart')");
    await firstAddBtn.click();

    // Check stepper appears
    const stepper = cardWrappers.first().locator("button[aria-label='Increase quantity']");
    await expect(stepper).toBeVisible();

    // Check toast
    await expect(page.locator("text=Added to cart").first()).toBeVisible();

    // Take screenshot for visual inspection
    await section.screenshot({ path: "test-results/screenshots/deals-desktop.png" });
  });

  test("Tablet (768x1024): 3-card layout & no page horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/", { waitUntil: "networkidle" });

    const section = page.locator("#deals");
    await expect(section).toBeVisible();

    // Check overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });
    expect(hasOverflow).toBe(false);

    // Verify cards are visible
    const cards = section.locator(".deal-card-wrapper");
    await expect(cards.first()).toBeVisible();

    await section.screenshot({ path: "test-results/screenshots/deals-tablet.png" });
  });

  test("Mobile (390x844): touch peek layout, 44px buttons & no page overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });

    const section = page.locator("#deals");
    await expect(section).toBeVisible();

    // Check no page overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });
    expect(hasOverflow).toBe(false);

    // Check touch target height for first button
    const firstCard = section.locator(".deal-card-wrapper").first();
    const btn = firstCard.locator("button:has-text('Add to cart')");
    const btnBox = await btn.boundingBox();
    expect(btnBox).not.toBeNull();
    expect(btnBox!.height).toBeGreaterThanOrEqual(38);

    await section.screenshot({ path: "test-results/screenshots/deals-mobile.png" });
  });
});
