import { Page, Locator } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Common method: navigate to a URL
     */
    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Common method: get page title
     */
    async getTitle(): Promise<string> {
        return this.page.title();
    }

    /**
     * Common method: wait for network to be idle
     */
    async waitForNetworkIdle(): Promise<void> {
        // eslint-disable-next-line playwright/no-networkidle
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Common method: check visibility of an element
     */
    async isVisible(locator: Locator): Promise<boolean> {
        return locator.isVisible();
    }
}
