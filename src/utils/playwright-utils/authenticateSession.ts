import fs from "fs";
import path from "path";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { login } from "./login";

const SESSION_PATH = path.resolve(
  "artifacts/sessions/authentication/auth.json"
);
const SESSION_DIR = path.dirname(SESSION_PATH);
const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

type StoredSession = {
  baseURL: string;
  storageState: any;
};

function isSessionValid(): boolean {
  if (!fs.existsSync(SESSION_PATH)) return false;
  const stats = fs.statSync(SESSION_PATH);
  const ageMs = Date.now() - stats.mtimeMs;
  return ageMs < EXPIRATION_MS;
}

export async function authenticateSession(
  browser: Browser,
  baseURL: string,
  email: string,
  password: string
): Promise<{ context: BrowserContext; page: Page }> {
  let context: BrowserContext;
  let page: Page;

  if (isSessionValid()) {
    const session: StoredSession = JSON.parse(
      fs.readFileSync(SESSION_PATH, "utf-8")
    );
    context = await browser.newContext({ storageState: session.storageState });
    page = await context.newPage();
    await page.goto(baseURL);
    return { context, page };
  }

  // No valid session → create clean context, login, save
  context = await browser.newContext();
  page = await context.newPage();

  await login(page, email, password);

  fs.mkdirSync(SESSION_DIR, { recursive: true });

  const storageState = await context.storageState();
  const sessionData: StoredSession = { baseURL, storageState };

  fs.writeFileSync(SESSION_PATH, JSON.stringify(sessionData, null, 2));

  return { context, page };
}
