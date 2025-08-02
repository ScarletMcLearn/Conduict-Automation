import { test, expect } from "@playwright/test";
import { authenticateSession } from "src/utils/playwright-utils/authenticateSession";
import { login } from "src/utils/playwright-utils/login";

import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";
import { createArticle } from "src/utils/playwright-utils/createArticle";

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
    "Test@1234"
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
    "Test@1234"
  );

  // 1. Click on "New Article"
  const newArticleLink = page.getByRole("link", { name: "  New Article" });
  await expect(newArticleLink).toBeVisible();
  await newArticleLink.dblclick();

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
    page.getByRole("heading", { name: "Test Article" })
  ).toBeVisible();
});

// test("Create new dynamic article", async ({ browser }) => {
//   const { context, page } = await authenticateSession(
//     browser,
//     "https://conduit.bondaracademy.com",
//     "test96@yopmail.com",
//     "Test@1234"
//   );

//   // Generate dynamic article data
//   const articleTitle = faker.lorem.words(3);
//   const articleAbout = faker.lorem.sentence();
//   const articleBody = faker.lorem.paragraphs(2);
//   const articleTag = faker.word.noun();

//   // 1. Click on "New Article"
//   const newArticleLink = page.getByRole("link", { name: "  New Article" });
//   await expect(newArticleLink).toBeVisible();
//   await newArticleLink.dblclick();

//   // 2. Fill in the article form
//   await page.getByRole("textbox", { name: "Article Title" }).fill(articleTitle);
//   await page
//     .getByRole("textbox", { name: "What's this article about?" })
//     .fill(articleAbout);
//   await page
//     .getByRole("textbox", { name: "Write your article (in markdown)" })
//     .fill(articleBody);
//   await page.getByRole("textbox", { name: "Enter tags" }).fill(articleTag);

//   // 3. Publish the article
//   await page.getByRole("button", { name: "Publish Article" }).click();

//   // 4. Verify the article was created
//   await expect(page.getByRole("heading", { name: articleTitle })).toBeVisible();

//   await context.close();
// });

// test("Create new dynamic article", async ({ browser }) => {
//   const { context, page } = await authenticateSession(
//     browser,
//     "https://conduit.bondaracademy.com",
//     "test96@yopmail.com",
//     "Test@1234"
//   );

//   // Generate dynamic article data
//   const articleTitle = faker.lorem.words(3);
//   const articleAbout = faker.lorem.sentence();
//   const articleBody = faker.lorem.paragraphs(2);
//   const articleTag = faker.word.noun();

//   // Save data to artifacts/data/article/create.json
//   const articleData = {
//     title: articleTitle,
//     about: articleAbout,
//     body: articleBody,
//     tag: articleTag,
//     createdAt: new Date().toISOString(),
//   };

//   const filePath = path.resolve("artifacts/data/article/create.json");
//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2));

//   // 1. Click on "New Article"
//   const newArticleLink = page.getByRole("link", { name: "  New Article" });
//   await expect(newArticleLink).toBeVisible();
//   await newArticleLink.click();

//   // 2. Fill in the article form
//   await page.getByRole("textbox", { name: "Article Title" }).fill(articleTitle);
//   await page
//     .getByRole("textbox", { name: "What's this article about?" })
//     .fill(articleAbout);
//   await page
//     .getByRole("textbox", { name: "Write your article (in markdown)" })
//     .fill(articleBody);
//   await page.getByRole("textbox", { name: "Enter tags" }).fill(articleTag);

//   // 3. Publish the article
//   await page.getByRole("button", { name: "Publish Article" }).click();

//   // 4. Verify the article was created
//   await expect(page.getByRole("heading", { name: articleTitle })).toBeVisible();

//   await context.close();
// });

test("Create new dynamic article", async ({ browser }) => {
  const { context, page } = await authenticateSession(
    browser,
    "https://conduit.bondaracademy.com",
    "test96@yopmail.com",
    "Test@1234"
  );

  const articleData = await createArticle(page);

  // Optional: log or assert additional things
  console.log("Article created:", articleData.title);
});
