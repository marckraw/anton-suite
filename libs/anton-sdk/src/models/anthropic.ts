import axios from "axios";
import type { AxiosInstance } from "axios";
import { AIModel, Message } from "./base";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import { AnthropicCompletionResponse, ChatResponse, ENDPOINTS } from '@mrck-labs/api-interface';

export class AnthropicModel implements AIModel {
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.anthropic.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful.";

  constructor(private apiKey: string) {
    if (isBrowser) {
      throwErrorIfBrowser("AnthropicModel");
    }

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
    });
  }

  setSystemMessage(message: string): void {
    this.systemMessage = message;
  }

  async chat(messages: Message[]): Promise<ChatResponse> {
    try {
      const response = await this.api.post<AnthropicCompletionResponse>(ENDPOINTS.anthropic.v1.completions, {
        system: this.systemMessage,
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages,
      });


      const role = response.data.role;
      const content = response.data.content[0].text;

      return [{ role, content }];
    } catch (error) {
      console.error("Anthropic API error:", error);
      throw error;
    }
  }
}
