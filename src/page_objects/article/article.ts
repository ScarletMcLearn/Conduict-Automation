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

    getArticleAbout(): Locator {
        return this.page.getByRole("textbox", {
            name: "What's this article about?",
        });
    }

    getArticleDescription(): Locator {
        return this.page.getByRole("textbox", {
            name: "Write your article (in markdown)",
        });
    }

    getArticleTags(): Locator {
        return this.page.getByRole("textbox", { name: "Enter tags" });
    }

    getPublishArticle(): Locator {
        return this.page.getByRole("button", { name: "Publish Article" });
    }

    // getArticleHeading(): Locator {
    //     return this.page.getByRole("heading", { name: "Test Article" });
    // }

    getArticleHeading(title: string): Locator {
        return this.page.getByRole("heading", { name: title });
    }

    getUserProfile(): Locator {
        return this.page.locator(".nav-link").nth(3); // 0-based index
    }

    getUserImage(): Locator {
        return this.page.locator("img.user-img");
    }

    getEditArticle(): Locator {
        return this.page.getByRole("link", { name: " Edit Article" }).first();
    }

    getDeleteArticle(): Locator {
        return this.page
            .getByRole("button", { name: " Delete Article" })
            .first();
    }

    getGlobalFeed(): Locator {
        return this.page.getByText("Global Feed");
    }

    getTagFilter(): Locator {
        return this.page.locator("a.tag-default.tag-pill", {
            hasText: "Community",
        });
    }

    getTag(): Locator {
        return this.page.getByText("Community").first();
    }

    getSettings(): Locator {
        return this.page.getByRole("link", { name: "  Settings" });
    }

    getUsername(): Locator {
        return this.page.getByRole("textbox", { name: "Username" });
    }

    getUpdateSettings(): Locator {
        return this.page.getByRole("button", { name: "Update Settings" });
    }

    getHeading(newUsername: string): Locator {
        return this.page.getByRole("heading", { name: newUsername });
    }
}
