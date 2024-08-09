export type AntonConstructor = {
  systemPrompt?: string;
  apiUrl?: string;
  apiKeys?: APIKeys;
};

export interface APIKeys {
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
}

export type AnthropicModels = "claude-3-5-sonnet-20240620";
export type OpenAIModels = "";
