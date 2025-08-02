import { request, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";

export type ApiArticleData = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    slug?: string;
};

export async function createArticleViaApi(
    authToken: string,
): Promise<ApiArticleData> {
    // 🔁 Generate realistic dynamic article data
    const article: ApiArticleData = {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        tagList: [faker.word.noun()],
        createdAt: new Date().toISOString(),
    };

    const payload = {
        article: {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList,
        },
    };

    const baseURL = "https://conduit-api.bondaracademy.com/api";

    // const apiContext = await request.newContext({
    //   baseURL,
    //   extraHTTPHeaders: {
    //     Authorization: `Token ${authToken}`,
    //     "Content-Type": "application/json",
    //     Accept: "application/json, text/plain, */*",
    //     Origin: "https://conduit.bondaracademy.com",
    //     Referer: "https://conduit.bondaracademy.com/",
    //   },
    // });

    const apiContext = await request.newContext({
        baseURL: "https://conduit-api.bondaracademy.com",
        extraHTTPHeaders: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // 🔍 Debug logs
    console.log("POST /articles/");
    console.log("Token:", authToken.slice(0, 12) + "...");
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await apiContext.post("/api/articles/", { data: payload });
    const responseText = await response.text();

    console.log("Status:", response.status());
    console.log("Response:", responseText);

    if (response.status() !== 201) {
        throw new Error(`Expected 201 Created but got ${response.status()}`);
    }

    const responseBody = JSON.parse(responseText);
    article.slug = responseBody.article.slug;

    // 💾 Save article to file
    const outputPath = path.resolve("artifacts/data/article/api_create.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(article, null, 2));

    return article;
}
