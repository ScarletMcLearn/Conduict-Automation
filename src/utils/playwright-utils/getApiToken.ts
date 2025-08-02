import fs from "fs";
import path from "path";
import { Browser } from "@playwright/test";
import { generateAuthStorageState } from "./generateAuthStorageState";

const API_SESSION_PATH = path.resolve(
    "artifacts/sessions/authentication/api_auth.json",
);
const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

const baseURL = "https://conduit.bondaracademy.com";
const email = "test96@yopmail.com";
const password = "Test@1234";

type TokenData = {
    token: string;
    createdAt: string;
};

export async function getApiToken(browser: Browser): Promise<string> {
    let tokenData: TokenData | undefined;

    // Try reading token if exists
    if (fs.existsSync(API_SESSION_PATH)) {
        try {
            const raw = fs.readFileSync(API_SESSION_PATH, "utf-8");
            const parsed = JSON.parse(raw);
            const age = Date.now() - new Date(parsed.createdAt).getTime();

            if (parsed.token && age <= EXPIRATION_MS) {
                tokenData = parsed;
            } else {
                console.warn("🔁 Token expired or missing. Regenerating...");
            }
        } catch {
            console.warn("⚠️ Failed to parse API token. Regenerating...");
        }
    }

    // Regenerate if undefined
    if (!tokenData) {
        await generateAuthStorageState(browser, baseURL, email, password);
        const fresh = JSON.parse(fs.readFileSync(API_SESSION_PATH, "utf-8"));
        tokenData = { token: fresh.token, createdAt: fresh.createdAt };
    }

    // ✅ TypeScript is now sure tokenData is defined
    return tokenData.token;
}
