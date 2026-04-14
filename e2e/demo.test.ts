import { expect, test } from "@playwright/test";
import { _electron as electron } from "playwright";

test("electron app renders and navigates", async () => {
  const electronApp = await electron.launch({ args: [".vite/build/main.js"] });
  const page = await electronApp.firstWindow();

  try {
    await expect(page.getByRole("heading", { name: "Welcome to SvelteKit" })).toBeVisible();

    await page.getByRole("link", { name: "Go to the second route" }).click();
    await expect(page.getByRole("heading", { name: "Second Route" })).toBeVisible();
  } finally {
    await electronApp.close();
  }
});
