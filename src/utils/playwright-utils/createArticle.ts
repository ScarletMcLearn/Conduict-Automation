import { Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

export type ArticleData = {
    title: string;
    about: string;
    body: string;
    tag: string;
    createdAt: string;
};

export async function createArticle(page: Page): Promise<ArticleData> {
    const articleData: ArticleData = {
        title: faker.lorem.words(3),
        about: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tag: faker.word.noun(),
        createdAt: new Date().toISOString(),
    };

    // Save to JSON
    const filePath = path.resolve("artifacts/data/article/create.json");
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(articleData, null, 2));

    // Go to "New Article"
    const newArticleLink = page.getByRole("link", { name: "  New Article" });
    await expect(newArticleLink).toBeVisible();
    await newArticleLink.click();

    // Fill the form
    await page
        .getByRole("textbox", { name: "Article Title" })
        .fill(articleData.title);
    await page
        .getByRole("textbox", { name: "What's this article about?" })
        .fill(articleData.about);
    await page
        .getByRole("textbox", { name: "Write your article (in markdown)" })
        .fill(articleData.body);
    await page
        .getByRole("textbox", { name: "Enter tags" })
        .fill(articleData.tag);

    // Publish
    await page.getByRole("button", { name: "Publish Article" }).click();

    // Verify
    await expect(
        page.getByRole("heading", { name: articleData.title }),
    ).toBeVisible();

    return articleData;
}
