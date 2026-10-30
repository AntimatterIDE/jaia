import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { siteConfig } from "@/content/site";

export const DEFAULT_SALES_MODEL = "openai/gpt-5.6-luna-pro";

export function isSalesChatConfigured(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export function getSalesLanguageModel() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const openrouter = createOpenRouter({
    apiKey,
    compatibility: "strict",
    appName: siteConfig.name,
    appUrl: siteConfig.url,
  });

  const modelId = process.env.OPENROUTER_MODEL ?? DEFAULT_SALES_MODEL;
  return openrouter.chat(modelId);
}
