import { Page, expect } from "@playwright/test";
import { ArticlePage } from "src/page_objects/article/article";
import { LoginPage } from "src/page_objects/login/login";

export async function login(page: Page, email: string, password: string) {
    await page.goto("https://conduit.bondaracademy.com/login");

    const articlePage = new ArticlePage(page);
    const loginPage = new LoginPage(page);

    // await page.getByRole("textbox", { name: "Email" }).fill(email);

    await loginPage.getEmail().fill(email);

    // await page.getByRole("textbox", { name: "Password" }).fill(password);
    await loginPage.getPassword().fill(password);
    // await page.getByRole("button", { name: "Sign in" }).click();

    await loginPage.getSignIn().click();

    // Assert login success
    await expect(articlePage.getUserProfile()).toBeVisible();

    // await page
    //     .locator("app-layout-header")
    //     .getByRole("link", { name: "Test Username" })
    //     .click();

    await articlePage.getUserProfile().click();

    // await page.pause();
    // await expect(
    //     page.getByRole("heading", { name: "Test Username" }),
    // ).toBeVisible();

    await expect(articlePage.getUserImage()).toBeVisible();
}
