import axios from "axios";
import type { AxiosInstance } from "axios";
import { AIModel, Message } from "./base";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import { ENDPOINTS, OpenAICompletionResponse } from '@mrck-labs/api-interface';

export class OpenAIModel implements AIModel {
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.openai.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful."

  constructor(private apiKey: string) {
    if (isBrowser) {
      throwErrorIfBrowser("OpenAIModel");
    }

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

  async chat(messages: Message[]): Promise<any> {
    try {
      const response = await this.api.post<OpenAICompletionResponse>(ENDPOINTS.openai.v1.completions, {
        model: 'gpt-4o',
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
