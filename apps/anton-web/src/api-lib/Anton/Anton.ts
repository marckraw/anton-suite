import {
  defaultApiKeys,
  defaultApiUrl,
  defaultSystemPrompt,
} from "@/api-lib/Anton/Anton.consts";
import { AntonConstructor, APIKeys } from "@/api-lib/Anton/Anton.types";
import { ai } from "@/api-lib/ai.services";
import { createLogger } from "@/utils/consola";

const logger = createLogger("Anton");

export class Anton {
  private systemPrompt: string;
  private apiUrl: string;
  private apiKeys: APIKeys;

  constructor({
    systemPrompt = defaultSystemPrompt,
    apiKeys = {
      OPENAI_API_KEY: defaultApiKeys.OPENAI_API_KEY,
      ANTHROPIC_API_KEY: defaultApiKeys.ANTHROPIC_API_KEY,
    },
    apiUrl = defaultApiUrl,
  }: Partial<AntonConstructor> = {}) {
    this.systemPrompt = systemPrompt;
    this.apiKeys = apiKeys;
    this.apiUrl = apiUrl;
  }

  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }

  getSystemPrompt(): string {
    return this.systemPrompt;
  }

  async sendMessages({
    messages,
  }: {
    messages: { role: string; content: string }[];
  }) {
    logger.log("Data i'm sending to api");
    logger.log({
      model: "claude-3-5-sonnet-20240620",
      messages,
      anthropicOptions: {
        apiKey: this.apiKeys.ANTHROPIC_API_KEY,
      },
    });
    return await ai({
      model: "claude-3-5-sonnet-20240620",
      messages,
      anthropicOptions: {
        systemPrompt: this.systemPrompt,
        apiKey: this.apiKeys.ANTHROPIC_API_KEY,
        version: "2023-06-01",
      },
    });
  }
}
