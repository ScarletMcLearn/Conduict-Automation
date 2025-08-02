import { test, expect } from "@playwright/test";
import { authenticateSession } from "src/utils/playwright-utils/authenticateSession";
import { login } from "src/utils/playwright-utils/login";

import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import {
    createArticle,
    createArticleNegative,
} from "src/utils/playwright-utils/createArticle";
import {
    editArticle,
    editArticleNegative,
} from "src/utils/playwright-utils/editArticle";
import {
    deleteArticle,
    deleteArticleNegative,
} from "src/utils/playwright-utils/deleteArticle";
import { createArticleViaApi } from "src/utils/playwright-utils/createArticleViaApi";
import { generateAuthStorageState } from "src/utils/playwright-utils/generateAuthStorageState";
import { getApiToken } from "src/utils/playwright-utils/getApiToken";
import { ArticlePage } from "src/page_objects/article/article";

test("has title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test.describe("User Authentication", () => {
    test("Login test", async ({ page }) => {
        // await login(page, "test96@yopmail.com", "Test@1234");
        await login(page, env.LOGIN_EMAIL!, env.LOGIN_PASSWORD!);

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
});

// test("Create new article", async ({ browser }) => {
//     const { context, page } = await authenticateSession(
//         browser,
//         "https://conduit.bondaracademy.com",
//         "test96@yopmail.com",
//         "Test@1234",
//     );

//     // 1. Click on "New Article"
//     // const newArticleLink = page.getByRole("link", { name: "  New Article" });

//     const articlePage = new ArticlePage(page);

//     await expect(articlePage.newArticleLink).toBeVisible();
//     await articlePage.newArticleLink.click();

//     // 2. Fill in the article form
//     // await page
//     //     .getByRole("textbox", { name: "Article Title" })
//     //     .fill("Test Article 1");

//     await articlePage.getArticleTitle().fill("Test Article 1");

//     // await page
//     //     .getByRole("textbox", { name: "What's this article about?" })
//     //     .fill("Test About");

//     await articlePage.getArticleAbout().fill("Test About");

//     // await page
//     //     .getByRole("textbox", { name: "Write your article (in markdown)" })
//     //     .fill("Test Description");

//     await articlePage.getArticleDescription().fill("Test Description");

//     // await page.getByRole("textbox", { name: "Enter tags" }).fill("Test_Tags");

//     await articlePage.getArticleTags().fill("Test_Tags");

//     // 3. Publish the article
//     // await page.getByRole("button", { name: "Publish Article" }).click();

//     await articlePage.getPublishArticle().click();

//     // 4. Verify the article was created
//     // await expect(
//     //     page.getByRole("heading", { name: "Test Article" }),
//     // ).toBeVisible();

//     await expect(articlePage.getArticleHeading()).toBeVisible();
// });

import { env } from "../../../../env";

test.describe("Create Article", () => {
    test("Create new article @Positive", async ({ browser }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        const articlePage = new ArticlePage(page);

        await expect(articlePage.newArticleLink).toBeVisible();
        await articlePage.newArticleLink.click();

        // Generate dynamic article data
        const title = faker.lorem.words(5);
        const about = faker.lorem.sentence();
        const description = faker.lorem.paragraphs(2);
        const tags = faker.lorem.words(3).replace(/\s+/g, "_");

        // Fill article form with dynamic data
        await articlePage.getArticleTitle().fill(title);
        await articlePage.getArticleAbout().fill(about);
        await articlePage.getArticleDescription().fill(description);
        await articlePage.getArticleTags().fill(tags);

        // Publish the article
        await articlePage.getPublishArticle().click();

        // Validate article was created
        await expect(articlePage.getArticleHeading(title)).toHaveText(title);
    });

    test.fail("Create new article @Negative", async ({ browser }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        const articlePage = new ArticlePage(page);

        await expect(articlePage.newArticleLink).toBeVisible();
        await articlePage.newArticleLink.click();

        // Generate dynamic article data
        const title = faker.lorem.words(5);
        const about = faker.lorem.sentence();
        const description = faker.lorem.paragraphs(2);
        const tags = faker.lorem.words(3).replace(/\s+/g, "_");

        // Fill article form with dynamic data
        await articlePage.getArticleTitle().fill("Test Article");
        await articlePage.getArticleAbout().fill(about);
        await articlePage.getArticleDescription().fill(description);
        await articlePage.getArticleTags().fill(tags);

        // Publish the article
        await articlePage.getPublishArticle().click();

        // Validate article was created
        await expect(articlePage.getArticleHeading(title)).toHaveText(title);
    });

    test("Create new dynamic article @Positive", async ({ browser }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        const articleData = await createArticle(page);

        // Optional: log or assert additional things
        console.log("Article created:", articleData.title);
    });

    test("Create new dynamic article @Negative", async ({ browser }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        const articleData = await createArticleNegative(page);

        // Optional: log or assert additional things
        console.log("Article created:", articleData.title);
    });

    test("Edit an article after creating it @Positive", async ({ browser }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        const editedData = await editArticle(page);
        console.log("Edited article:", editedData.title);

        await context.close();
    });

    test.fail(
        "Edit an article after creating it @Negative",
        async ({ browser }) => {
            const { context, page } = await authenticateSession(
                browser,
                "https://conduit.bondaracademy.com",
                // "test96@yopmail.com",
                // "Test@1234",

                env.LOGIN_EMAIL!,
                env.LOGIN_PASSWORD!,
            );

            const editedData = await editArticleNegative(page);
            console.log("Edited article:", editedData.title);

            await context.close();
        },
    );
});

test.describe("Delete Article", () => {
    test("Delete article and validate backend deletion @Positive", async ({
        browser,
    }) => {
        const { context, page } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        await deleteArticle(page);
    });

    test.fail(
        "Delete article and validate backend deletion @Negative",
        async ({ browser }) => {
            const { context, page } = await authenticateSession(
                browser,
                "https://conduit.bondaracademy.com",
                // "test96@yopmail.com",
                // "Test@1234",

                env.LOGIN_EMAIL!,
                env.LOGIN_PASSWORD!,
            );

            await deleteArticleNegative(page);
        },
    );
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

test.describe("Edit Article", () => {
    test("Create article via API and edit via UI @Positive", async ({
        browser,
    }) => {
        const token = await getApiToken(browser);
        const article = await createArticleViaApi(token);
        const articleUrl = `https://conduit.bondaracademy.com/article/${article.slug}`;

        const { page, context } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        await page.goto(articleUrl);
        // await expect(
        //     page.getByRole("link", { name: " Edit Article" }).first(),
        // ).toBeVisible();

        const articlePage = new ArticlePage(page);
        await expect(articlePage.getEditArticle()).toBeVisible();

        // await page.getByRole("link", { name: " Edit Article" }).first().click();

        await articlePage.getEditArticle().click();

        const newValue = `Edited ${article.title}`;
        // await page.getByRole("textbox", { name: "Article Title" }).fill(newValue);
        await articlePage.getArticleTitle().fill(newValue);
        // await page
        //     .getByRole("textbox", { name: "What's this article about?" })
        //     .fill(newValue);

        await articlePage.getArticleAbout().fill(newValue);
        // await page
        //     .getByRole("textbox", { name: "Write your article (in markdown)" })
        //     .fill(newValue);

        await articlePage.getArticleDescription().fill(newValue);

        // await page.getByRole("textbox", { name: "Enter tags" }).fill("edited");

        await articlePage.getArticleTags().fill("edited");

        // await page.getByRole("button", { name: "Publish Article" }).click();

        await articlePage.getPublishArticle().click();

        // await expect(page.getByRole("heading", { name: newValue })).toBeVisible();

        await expect(articlePage.getArticleHeading(newValue)).toBeVisible();

        await context.close();
    });

    test.fail(
        "Create article via API and edit via UI @Negative",
        async ({ browser }) => {
            const token = await getApiToken(browser);
            const article = await createArticleViaApi(token);
            const articleUrl = `https://conduit.bondaracademy.com/article/${article.slug}`;

            const { page, context } = await authenticateSession(
                browser,
                "https://conduit.bondaracademy.com",
                // "test96@yopmail.com",
                // "Test@1234",

                env.LOGIN_EMAIL!,
                env.LOGIN_PASSWORD!,
            );

            await page.goto(articleUrl);
            // await expect(
            //     page.getByRole("link", { name: " Edit Article" }).first(),
            // ).toBeVisible();

            const articlePage = new ArticlePage(page);
            await expect(articlePage.getEditArticle()).toBeVisible();

            // await page.getByRole("link", { name: " Edit Article" }).first().click();

            await articlePage.getEditArticle().click();

            const newValue = "Test Article";
            // await page.getByRole("textbox", { name: "Article Title" }).fill(newValue);
            await articlePage.getArticleTitle().fill(newValue);
            // await page
            //     .getByRole("textbox", { name: "What's this article about?" })
            //     .fill(newValue);

            await articlePage.getArticleAbout().fill(newValue);
            // await page
            //     .getByRole("textbox", { name: "Write your article (in markdown)" })
            //     .fill(newValue);

            await articlePage.getArticleDescription().fill(newValue);

            // await page.getByRole("textbox", { name: "Enter tags" }).fill("edited");

            await articlePage.getArticleTags().fill("edited");

            // await page.getByRole("button", { name: "Publish Article" }).click();

            await articlePage.getPublishArticle().click();

            // await expect(page.getByRole("heading", { name: newValue })).toBeVisible();

            await expect(articlePage.getArticleHeading(newValue)).toBeVisible();

            await context.close();
        },
    );
});

test.describe("Delete Article", () => {
    test("Create article via API and delete via UI @Positive", async ({
        browser,
    }) => {
        const token = await getApiToken(browser);
        const article = await createArticleViaApi(token);
        const articleUrl = `https://conduit.bondaracademy.com/article/${article.slug}`;

        const { page, context } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        await page.goto(articleUrl);
        // await expect(
        //     page.getByRole("button", { name: " Delete Article" }).first(),
        // ).toBeVisible();

        const articlePage = new ArticlePage(page);

        await expect(articlePage.getDeleteArticle()).toBeVisible();

        // await page
        //     .getByRole("button", { name: " Delete Article" })
        //     .first()
        //     .click();

        await articlePage.getDeleteArticle().click();

        // await expect(page.getByText("Global Feed")).toBeVisible();

        await expect(articlePage.getGlobalFeed()).toBeVisible();

        await context.close();
    });

    test.fail(
        "Create article via API and delete via UI @Negative",
        async ({ browser }) => {
            const token = await getApiToken(browser);
            const article = await createArticleViaApi(token);
            const articleUrl = "https://conduit.bondaracademy.com/article/";

            const { page, context } = await authenticateSession(
                browser,
                "https://conduit.bondaracademy.com",
                // "test96@yopmail.com",
                // "Test@1234",

                env.LOGIN_EMAIL!,
                env.LOGIN_PASSWORD!,
            );

            await page.goto(articleUrl);
            // await expect(
            //     page.getByRole("button", { name: " Delete Article" }).first(),
            // ).toBeVisible();

            const articlePage = new ArticlePage(page);

            await expect(articlePage.getDeleteArticle()).toBeVisible();

            // await page
            //     .getByRole("button", { name: " Delete Article" })
            //     .first()
            //     .click();

            await articlePage.getDeleteArticle().click();

            // await expect(page.getByText("Global Feed")).toBeVisible();

            await expect(articlePage.getGlobalFeed()).toBeVisible();

            await context.close();
        },
    );
});

test.describe("Filter Articles by Tag", () => {
    test("Filter Articles by Tag 'Community' @Positive", async ({
        browser,
    }) => {
        const { page, context } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        await page.goto("https://conduit.bondaracademy.com");

        // Wait for tag list to appear
        // const tagLocator = page.locator("a.tag-default.tag-pill", {
        //     hasText: "Community",
        // });

        const articlePage = new ArticlePage(page);

        const tagLocator = articlePage.getTagFilter();
        await expect(tagLocator).toBeVisible();

        await tagLocator.click();

        // Expect tag to be visible on the filtered articles
        // await expect(page.getByText("Community").first()).toBeVisible();

        await expect(articlePage.getTag()).toBeVisible();

        await context.close();
    });
});

test.describe("Update User Settings", () => {
    test("Update User Settings with dynamic username @Positive", async ({
        browser,
    }) => {
        const { page, context } = await authenticateSession(
            browser,
            "https://conduit.bondaracademy.com",
            // "test96@yopmail.com",
            // "Test@1234",

            env.LOGIN_EMAIL!,
            env.LOGIN_PASSWORD!,
        );

        // Generate dynamic username
        const newUsername = faker.internet.userName();

        // Navigate to Settings
        // await page.getByRole("link", { name: "  Settings" }).click();

        const articlePage = new ArticlePage(page);
        await articlePage.getSettings().click();

        // Fill in new username
        // await page.getByRole("textbox", { name: "Username" }).click();
        await articlePage.getUsername().click();
        // await page.getByRole("textbox", { name: "Username" }).fill(newUsername);

        await articlePage.getUsername().fill(newUsername);

        // Submit update
        // await page.getByRole("button", { name: "Update Settings" }).click();
        await articlePage.getUpdateSettings().click();

        // Verify username updated
        // await expect(
        //     page.getByRole("heading", { name: newUsername }),
        // ).toBeVisible();

        await expect(articlePage.getHeading(newUsername)).toBeVisible();

        await context.close();
    });

    test.fail(
        "Update User Settings with dynamic username @Negative",
        async ({ browser }) => {
            const { page, context } = await authenticateSession(
                browser,
                "https://conduit.bondaracademy.com",
                // "test96@yopmail.com",
                // "Test@1234",

                env.LOGIN_EMAIL!,
                env.LOGIN_PASSWORD!,
            );

            // Generate dynamic username
            const newUsername = faker.internet.userName();

            // Navigate to Settings
            // await page.getByRole("link", { name: "  Settings" }).click();

            const articlePage = new ArticlePage(page);
            await articlePage.getSettings().click();

            // Fill in new username
            // await page.getByRole("textbox", { name: "Username" }).click();
            await articlePage.getUsername().click();
            // await page.getByRole("textbox", { name: "Username" }).fill(newUsername);

            // await articlePage.getUsername().fill(newUsername);

            await articlePage.getUsername().fill(faker.string.sample(5000));

            // Submit update
            // await page.getByRole("button", { name: "Update Settings" }).click();
            await articlePage.getUpdateSettings().click();

            // Verify username updated
            // await expect(
            //     page.getByRole("heading", { name: newUsername }),
            // ).toBeVisible();

            await expect(articlePage.getHeading(newUsername)).toBeVisible();

            await context.close();
        },
    );
});
