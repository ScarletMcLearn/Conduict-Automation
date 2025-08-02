import { Page, expect } from "@playwright/test";
import { createArticle, ArticleData } from "./createArticle";

export async function deleteArticle(page: Page): Promise<void> {
  const articleData: ArticleData = await createArticle(page);

  // Expectation: slug should be created from title
  //   const slugPrefix = articleData.title
  //     .toLowerCase()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/\s+/g, "-");

  // Wait for DELETE response during deletion
  const deletePromise = page.waitForResponse((res) => {
    return (
      res.request().method() === "DELETE" &&
      res.url().includes("/api/articles/") &&
      res.status() === 204
    );
  });

  // Step 1: Click the delete button
  const deleteButton = page
    .getByRole("button", { name: " Delete Article" })
    .nth(1);
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  // Step 4: Validate backend deletion
  const deleteResponse = await deletePromise;
  expect(deleteResponse.status()).toBe(204);
  console.log("✅ DELETE API confirmed:", deleteResponse.url());

  // Step 5: Confirm return to Global Feed
  await expect(page.getByText("Global Feed")).toBeVisible();
}
