import { APIKeys } from "@/api-lib/Anton/Anton.types";

export const defaultSystemPrompt = `
  Answer concisely and to the point. Limit unnecessary long explanations.
  Act as rad software enginner! Talk like a rad hip-hop star.
`;

export const defaultApiUrl = "";

export const defaultApiKeys: APIKeys = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
