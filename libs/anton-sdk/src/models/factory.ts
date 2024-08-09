import { AIModel } from "./base";
import { AnthropicModel } from "./anthropic";
import { OpenAIModel } from './openai';

export type ModelType = "anthropic" | "openai"; // Add other types as needed
export class ModelFactory {
  static create(type: ModelType, apiKey: string): AIModel {
    switch (type) {
      case "anthropic":
        return new AnthropicModel(apiKey);
      case "openai":
        return new OpenAIModel(apiKey);
      default:
        throw new Error(`Unsupported model type: ${type}`);
    }
  }
}
