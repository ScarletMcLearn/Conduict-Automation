import fs from "fs";
import path from "path";
import { Browser } from "@playwright/test";
import { login } from "./login";

const UI_SESSION_PATH = path.resolve(
  "artifacts/sessions/authentication/auth.json"
);
const API_SESSION_PATH = path.resolve(
  "artifacts/sessions/authentication/api_auth.json"
);
const SESSION_DIR = path.dirname(UI_SESSION_PATH);
const EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

type StoredSession = {
  baseURL: string;
  storageState: any;
};

function isSessionValid(): boolean {
  if (!fs.existsSync(UI_SESSION_PATH)) return false;
  const stats = fs.statSync(UI_SESSION_PATH);
  return Date.now() - stats.mtimeMs < EXPIRATION_MS;
}

export async function generateAuthStorageState(
  browser: Browser,
  baseURL: string,
  email: string,
  password: string
): Promise<StoredSession> {
  if (isSessionValid()) {
    return JSON.parse(fs.readFileSync(UI_SESSION_PATH, "utf-8"));
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  await login(page, email, password);

  fs.mkdirSync(SESSION_DIR, { recursive: true });

  const storageState = await context.storageState();
  const sessionData: StoredSession = { baseURL, storageState };

  // Save full UI session
  fs.writeFileSync(UI_SESSION_PATH, JSON.stringify(sessionData, null, 2));

  // Extract jwtToken for API use
  const localStorage = storageState.origins.find(
    (origin: any) => origin.origin === baseURL
  )?.localStorage;

  const tokenEntry = localStorage?.find(
    (item: any) => item.name === "jwtToken"
  );
  const jwtToken = tokenEntry?.value;

  if (jwtToken) {
    fs.writeFileSync(
      API_SESSION_PATH,
      JSON.stringify(
        { token: jwtToken, createdAt: new Date().toISOString() },
        null,
        2
      )
    );
  } else {
    console.warn("⚠️ jwtToken not found in localStorage.");
  }

  await context.close();
  return sessionData;
}
