import { Page, expect } from "@playwright/test";

export async function login(page: Page, email: string, password: string) {
    await page.goto("https://conduit.bondaracademy.com/login");

    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("textbox", { name: "Password" }).fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();

    // Assert login success
    await expect(
        page
            .locator("app-layout-header")
            .getByRole("link", { name: "Test Username" }),
    ).toBeVisible();

    await page
        .locator("app-layout-header")
        .getByRole("link", { name: "Test Username" })
        .click();

    await expect(
        page.getByRole("heading", { name: "Test Username" }),
    ).toBeVisible();
}
