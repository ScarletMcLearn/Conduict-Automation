import { test, expect } from "@playwright/test";
import { authenticateSession } from "src/utils/playwright-utils/authenticateSession";
import { login } from "src/utils/playwright-utils/login";

import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import { createArticle } from "src/utils/playwright-utils/createArticle";
import { editArticle } from "src/utils/playwright-utils/editArticle";
import { deleteArticle } from "src/utils/playwright-utils/deleteArticle";
import { createArticleViaApi } from "src/utils/playwright-utils/createArticleViaApi";
import { generateAuthStorageState } from "src/utils/playwright-utils/generateAuthStorageState";
import { getApiToken } from "src/utils/playwright-utils/getApiToken";
import { ArticlePage } from "src/page_objects/article/article";

test("has title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test("Login test", async ({ page }) => {
    await login(page, "test96@yopmail.com", "Test@1234");

    // await page.goto("https://conduit.bondaracademy.com/login");
    // await page.getByRole("textbox", { name: "Email" }).click();
    // await page.getByRole("textbox", { name: "Email" }).fill("test96@yopmail.com");
    // await page.getByRole("textbox", { name: "Email" }).press("Tab");
    // await page.getByRole("textbox", { name: "Password" }).fill("Test@1234");
    // await page.getByRole("button", { name: "Sign in" }).click();
    // await expect(
    //   page
    //     .locator("app-layout-header")
    //     .getByRole("link", { name: "Test Username" })
    // ).toBeVisible();

    // await page
    //   .locator("app-layout-header")
    //   .getByRole("link", { name: "Test Username" })
    //   .click();

    // await expect(
    //   page.getByRole("heading", { name: "Test Username" })
    // ).toBeVisible();
});

test("authenticated user flow", async ({ browser }) => {
    const { context, page } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    // Now use the logged-in page
    // await page
    //   .locator("app-layout-header")
    //   .getByRole("link", { name: "Test Username" })
    //   .click();

    const usernameLink = page
        .locator("app-layout-header")
        .getByRole("link", { name: "Test Username" });

    await expect(usernameLink).toBeVisible();
});

test("Create new article", async ({ browser }) => {
    const { context, page } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    // 1. Click on "New Article"
    // const newArticleLink = page.getByRole("link", { name: "  New Article" });

    const articlePage = new ArticlePage(page);

    await expect(articlePage.newArticleLink).toBeVisible();
    await articlePage.newArticleLink.click();

    // 2. Fill in the article form
    await page
        .getByRole("textbox", { name: "Article Title" })
        .fill("Test Article 1");
    await page
        .getByRole("textbox", { name: "What's this article about?" })
        .fill("Test About");
    await page
        .getByRole("textbox", { name: "Write your article (in markdown)" })
        .fill("Test Description");
    await page.getByRole("textbox", { name: "Enter tags" }).fill("Test_Tags");

    // 3. Publish the article
    await page.getByRole("button", { name: "Publish Article" }).click();

    // 4. Verify the article was created
    await expect(
        page.getByRole("heading", { name: "Test Article" }),
    ).toBeVisible();
});

test("Create new dynamic article", async ({ browser }) => {
    const { context, page } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    const articleData = await createArticle(page);

    // Optional: log or assert additional things
    console.log("Article created:", articleData.title);
});

test("Edit an article after creating it", async ({ browser }) => {
    const { context, page } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    const editedData = await editArticle(page);
    console.log("Edited article:", editedData.title);

    await context.close();
});

test("Delete article and validate backend deletion", async ({ browser }) => {
    const { context, page } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    await deleteArticle(page);
});

// test("Create article via API and verify response", async () => {
//   const authToken = "your_valid_jwt_token_here";

//   const article = await createArticleViaApi(authToken);

//   console.log("✅ Article created via API:", article.slug);
// });

test("Create article using fresh or cached API token", async ({ browser }) => {
    const token = await getApiToken(browser);
    const article = await createArticleViaApi(token);
    console.log("✅ Created article slug:", article.slug);
});

test("Create article via API and edit via UI", async ({ browser }) => {
    const token = await getApiToken(browser);
    const article = await createArticleViaApi(token);
    const articleUrl = `https://conduit.bondaracademy.com/article/${article.slug}`;

    const { page, context } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    await page.goto(articleUrl);
    await expect(
        page.getByRole("link", { name: " Edit Article" }).first(),
    ).toBeVisible();
    await page.getByRole("link", { name: " Edit Article" }).first().click();

    const newValue = `Edited ${article.title}`;
    await page.getByRole("textbox", { name: "Article Title" }).fill(newValue);
    await page
        .getByRole("textbox", { name: "What's this article about?" })
        .fill(newValue);
    await page
        .getByRole("textbox", { name: "Write your article (in markdown)" })
        .fill(newValue);
    await page.getByRole("textbox", { name: "Enter tags" }).fill("edited");

    await page.getByRole("button", { name: "Publish Article" }).click();
    await expect(page.getByRole("heading", { name: newValue })).toBeVisible();

    await context.close();
});

test("Create article via API and delete via UI", async ({ browser }) => {
    const token = await getApiToken(browser);
    const article = await createArticleViaApi(token);
    const articleUrl = `https://conduit.bondaracademy.com/article/${article.slug}`;

    const { page, context } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    await page.goto(articleUrl);
    await expect(
        page.getByRole("button", { name: " Delete Article" }).first(),
    ).toBeVisible();
    await page
        .getByRole("button", { name: " Delete Article" })
        .first()
        .click();

    await expect(page.getByText("Global Feed")).toBeVisible();

    await context.close();
});

test("Filter Articles by Tag 'Community'", async ({ browser }) => {
    const { page, context } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    await page.goto("https://conduit.bondaracademy.com");

    // Wait for tag list to appear
    const tagLocator = page.locator("a.tag-default.tag-pill", {
        hasText: "Community",
    });
    await expect(tagLocator).toBeVisible();

    await tagLocator.click();

    // Expect tag to be visible on the filtered articles
    await expect(page.getByText("Community").first()).toBeVisible();

    await context.close();
});

test("Update User Settings with dynamic username", async ({ browser }) => {
    const { page, context } = await authenticateSession(
        browser,
        "https://conduit.bondaracademy.com",
        "test96@yopmail.com",
        "Test@1234",
    );

    // Generate dynamic username
    const newUsername = faker.internet.userName();

    // Navigate to Settings
    await page.getByRole("link", { name: "  Settings" }).click();

    // Fill in new username
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill(newUsername);

    // Submit update
    await page.getByRole("button", { name: "Update Settings" }).click();

    // Verify username updated
    await expect(
        page.getByRole("heading", { name: newUsername }),
    ).toBeVisible();

    await context.close();
});
