import { Page, Locator } from "@playwright/test";
import { BasePage } from "src/page_objects/base/base";

export class ArticlePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get newArticleLink(): Locator {
        return this.page.getByRole("link", { name: "  New Article" });
    }

    // getArticleTitle(): Locator{
    //     return this.page.
    // }

    getArticleTitle(): Locator {
        return this.page.getByRole("textbox", { name: "Article Title" });
    }
}
