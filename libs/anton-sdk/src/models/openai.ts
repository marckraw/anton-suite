import axios from "axios";
import type { AxiosInstance } from "axios";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import {
  AIModelInterface,
  ChatArgs,
  ENDPOINTS,
  Message, ModelType,
  ModerationResponse,
  OpenAICompletionResponse, OpenAIModels
} from '@mrck-labs/api-interface';

export class OpenAIModel implements AIModelInterface {
    public type: ModelType = 'openai';
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.openai.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful."
  private readonly defaultModel: OpenAIModels = 'gpt-4o'

  constructor(private apiKey: string, defaultModel: OpenAIModels) {
    if (isBrowser) {
      throwErrorIfBrowser("OpenAIModel");
    }

    this.defaultModel = defaultModel

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
    });
  }

  setSystemMessage(message: string): void {
    this.systemMessage = message;
  }

  async moderation(message: string): Promise<ModerationResponse> {
    try {
      const response = await this.api.post<ModerationResponse>(ENDPOINTS.openai.v1.moderations, {
        input: message
      });

      return response.data
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }


  async chat(args: ChatArgs): Promise<any> {
    const {messages, model = this.defaultModel} = args;
    try {
      const response = await this.api.post<OpenAICompletionResponse>(ENDPOINTS.openai.v1.completions, {
        model,
        messages: [{role: 'system', content: this.systemMessage}, ...messages]
      })


      const role = response.data.choices[0].message.role;
      const content = response.data.choices[0].message.content;

      return [{role, content}]
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }


}
