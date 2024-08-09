import { AnthropicModels } from "@/api-lib/Anton/Anton.types";

export type AvailableModels = AnthropicModels;
export type ConversationMessages = { role: string; content: string }[];

export type AIRequest = {
  messages: ConversationMessages;
  model: AvailableModels;
  anthropicOptions: {
    apiKey?: string;
    version?: string;
    systemPrompt?: string;
  };
};
