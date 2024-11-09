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

export class AnthropicModel implements AnthropicModelInterface {
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.anthropic.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful.";
  private readonly defaultModel: AnthropicModels = 'claude-3-5-sonnet-20240620'


  constructor(private apiKey: string, defaultModel: AnthropicModels = 'claude-3-5-sonnet-20240620') {
    console.log("whatever")

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

  public async chat(args: AnthropicChatArgs): Promise<ChatResponse | ReadableStream> {
    const { messages, model = this.defaultModel, stream = false } = args;
    try {
      const response = await this.api.post<AnthropicCompletionResponse>(ENDPOINTS.anthropic.v1.completions, {
        system: this.systemMessage,
        model,
        max_tokens: 1024,
        messages,
        stream,
      }, {
        responseType: stream ? 'stream' : 'json'
      });


      if (stream) {
        return response.data as unknown as ReadableStream;
      }

      const role = response.data.role;
      const content = response.data.content[0].text;

      return [{ role, content }];
    } catch (error) {
      console.error("Anthropic API error:", error);
      throw error;
    }
  }

  public debug() {
    console.log("debugging")
    return {
      company: "anthropic",
      baseUrl: this.baseUrl,
      model: this.defaultModel,
      systemMessage: this.systemMessage,
      api: this.api,
    }
  }
}
