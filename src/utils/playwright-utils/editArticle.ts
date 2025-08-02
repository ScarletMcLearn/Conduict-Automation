import { Page, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { createArticle } from "./createArticle";

export type ArticleEditData = {
    title: string;
    about: string;
    body: string;
    tag: string;
    editedAt: string;
};

export async function editArticle(page: Page): Promise<ArticleEditData> {
    // 🔁 Step 1: Create a new article first
    const original = await createArticle(page);

    // 🔄 Step 2: Generate new data
    const editedData: ArticleEditData = {
        title: faker.lorem.words(2),
        about: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        tag: faker.word.noun(),
        editedAt: new Date().toISOString(),
    };

    // 💾 Save edited data
    const editPath = path.resolve("artifacts/data/article/edit.json");
    fs.mkdirSync(path.dirname(editPath), { recursive: true });
    fs.writeFileSync(editPath, JSON.stringify(editedData, null, 2));

    // ✏️ Step 3: Click on "Edit Article"
    const editButton = page
        .getByRole("link", { name: " Edit Article" })
        .nth(1);
    await expect(editButton).toBeVisible();
    await editButton.click();

    // 📝 Step 4: Edit the article form
    await page
        .getByRole("textbox", { name: "Article Title" })
        .fill(editedData.title);
    await page
        .getByRole("textbox", { name: "What's this article about?" })
        .fill(editedData.about);

    const bodyBox = page.getByRole("textbox", {
        name: "Write your article (in markdown)",
    });
    await bodyBox.dblclick();
    await bodyBox.fill(" ");
    await bodyBox.press("ControlOrMeta+z");
    await bodyBox.press("ArrowRight");
    await bodyBox.fill(editedData.body);

    await page
        .getByRole("textbox", { name: "Enter tags" })
        .fill(editedData.tag);

    // ✅ Step 5: Publish edited article
    await page.getByRole("button", { name: "Publish Article" }).click();

    // ✅ Step 6: Confirm edits applied
    await expect(
        page.getByRole("heading", { name: editedData.title }),
    ).toBeVisible();

    return editedData;
}
