import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 1920, height: 1080, name: "1920x1080" },
  { width: 1440, height: 900, name: "1440x900" },
  { width: 1366, height: 768, name: "1366x768" },
  { width: 1280, height: 720, name: "1280x720" },
];

const SECTIONS = ["home", "departments", "deals", "rewards", "footer"] as const;

for (const vp of VIEWPORTS) {
  test.describe(`Viewport ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`All sections fit within one screen with no overlap or console errors at ${vp.name}`, async ({
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

      await page.goto("/", { waitUntil: "networkidle" });

      // Measure sticky header height
      const header = page.locator("header.sticky");
      await expect(header).toBeVisible();
      const headerBox = await header.boundingBox();
      expect(headerBox).not.toBeNull();
      const headerBottom = headerBox!.y + headerBox!.height;

      for (const sectionId of SECTIONS) {
        // Scroll to section by clicking section dot or using scrollIntoView
        const dot = page.locator(`button[aria-label="Go to ${sectionId === "home" ? "Home" : sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section"]`);
        if (await dot.isVisible()) {
          await dot.click();
        } else {
          await page.evaluate((id) => {
            const el = document.getElementById(id);
            el?.scrollIntoView({ behavior: "instant", block: id === "footer" ? "end" : "start" });
          }, sectionId);
        }

        // Wait for smooth scroll / snapping to settle
        await page.waitForTimeout(700);

        // Dynamically measure sticky header position at this scroll location
        const headerBox = await header.boundingBox();
        expect(headerBox).not.toBeNull();
        const headerBottom = headerBox!.y + headerBox!.height;

        const currentSection = page.locator(`#${sectionId}`);
        await expect(currentSection).toBeVisible();

        // 1. Full-screen snap section assertions (home, departments, deals, rewards):
        // Heading and last interactive element must fit inside the viewport below the sticky header.
        if (sectionId !== "footer") {
          const heading = currentSection.locator("h1, h2, h3").first();
          await expect(heading).toBeVisible();
          const headingBox = await heading.boundingBox();
          expect(headingBox).not.toBeNull();
          expect(headingBox!.y).toBeGreaterThanOrEqual(headerBottom - 4);
          expect(headingBox!.y + headingBox!.height).toBeLessThanOrEqual(vp.height + 4);

          // 2. Last button assertion: last button/interactive link is inside viewport below header
          const buttons = currentSection.locator("button, a[href]").filter({ hasNotText: "" });
          const lastBtn = buttons.last();
          if (await lastBtn.isVisible()) {
            const btnBox = await lastBtn.boundingBox();
            if (btnBox) {
              expect(btnBox.y).toBeGreaterThanOrEqual(headerBottom - 4);
              expect(btnBox.y + btnBox.height).toBeLessThanOrEqual(vp.height + 6);
            }
          }
        } else {
          // Footer is natural-height and rests at the bottom of the document
          await expect(currentSection).toBeVisible();
        }

        // 3. No other section is visible by more than 8px in the active viewport area
        // Note: Full-screen snap sections (home, departments, deals, rewards) must have 0 overlap (< 8px).
        // The footer has scroll-snap-align:end and natural height, resting at the very bottom with no empty space below.
        if (sectionId !== "footer") {
          for (const otherId of SECTIONS) {
            if (otherId === sectionId) continue;
            const otherEl = page.locator(`#${otherId}`);
            if (await otherEl.count() > 0) {
              const otherBox = await otherEl.boundingBox();
              if (otherBox) {
                const visibleTop = Math.max(headerBottom, otherBox.y);
                const visibleBottom = Math.min(vp.height, otherBox.y + otherBox.height);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                // Assert other section is visible by at most 8px
                expect(
                  visibleHeight,
                  `Section #${otherId} should not overlap active section #${sectionId} by more than 8px at ${vp.name} (found ${visibleHeight}px)`
                ).toBeLessThanOrEqual(8);
              }
            }
          }
        } else {
          // For footer, assert it touches or aligns to the bottom of the viewport with no space below
          const footerBox = await currentSection.boundingBox();
          expect(footerBox).not.toBeNull();
          expect(Math.abs(footerBox!.y + footerBox!.height - vp.height)).toBeLessThanOrEqual(4);
        }
      }

      // 4. Assert zero console errors
      expect(consoleErrors).toEqual([]);
    });
  });
}
