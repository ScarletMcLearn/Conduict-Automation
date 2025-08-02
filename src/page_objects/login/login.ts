import { Page, Locator } from "@playwright/test";
import { BasePage } from "src/page_objects/base/base";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    getEmail(): Locator {
        return this.page.getByRole("textbox", { name: "Email" });
    }

    getPassword(): Locator {
        return this.page.getByRole("textbox", { name: "Password" });
    }

    getSignIn(): Locator {
        return this.page.getByRole("button", { name: "Sign in" });
    }
}
