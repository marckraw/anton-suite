import axios from "axios";
import type { AxiosInstance } from "axios";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import {
  AnthropicChatArgs,
  AnthropicCompletionResponse, AnthropicModels,
  ChatResponse,
  ENDPOINTS, ModelType,
  ModerationResponse,
  AIModelInterface, AnthropicModelInterface
} from '@mrck-labs/api-interface';

export class AnthropicModel implements AIModelInterface {
  public type: ModelType = 'anthropic';
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.anthropic.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful.";
  private readonly defaultModel: AnthropicModels = 'claude-3-5-sonnet-20240620'

  constructor(private apiKey: string, defaultModel: AnthropicModels = 'claude-3-5-sonnet-20240620') {
    if (isBrowser) {
      throwErrorIfBrowser("AnthropicModel");
    }

    this.defaultModel = defaultModel

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
    });
  }

  public moderation(message: string): Promise<ModerationResponse> {
        throw new Error("Method not implemented.");
  }

  public setSystemMessage(message: string) {
    this.systemMessage = message;
  }

  async chat(args: AnthropicChatArgs): Promise<ChatResponse> {
    const { messages , model = this.defaultModel } = args;
    try {
      const response = await this.api.post<AnthropicCompletionResponse>(ENDPOINTS.anthropic.v1.completions, {
        system: this.systemMessage,
        model,
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
