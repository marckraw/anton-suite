import axios from "axios";
import type { AxiosInstance } from "axios";
import { isBrowser, throwErrorIfBrowser } from '@mrck-labs/utils';
import {
  ChatArgs,
  CreateImageResponse,
  ENDPOINTS, LeonardoAICreateImageParams, LeonardoAICreateImageResponse,
  ModerationResponse,
  OpenAICompletionResponse, OpenAICreateImageParams, OpenAIModelInterface, OpenAIModels
} from '@mrck-labs/api-interface';
import {ModelsListResponse} from "@mrck-labs/api-interface/src";
import {LeonardoAIModel} from "./leonardo-ai";

export class OpenAIModel implements OpenAIModelInterface {
  private api: AxiosInstance;
  private baseUrl = ENDPOINTS.openai.baseUrl;
  private systemMessage: string = "Your name is Anton. Be respectful."
  private readonly defaultModel: OpenAIModels = 'gpt-4o'
  private supportModels: {
    leonardoAI: LeonardoAIModel
  }

  constructor(private apiKey: string, defaultModel: OpenAIModels, supportModelsApiKeys?: {leonardoAI?: string}) {
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


    console.log("if support models passed in", supportModelsApiKeys)

    if(supportModelsApiKeys) {
        this.supportModels = {
            leonardoAI: new LeonardoAIModel(supportModelsApiKeys.leonardoAI)
        }
    }
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
    const {messages, model = this.defaultModel, stream = false} = args;
    try {
      const response = await this.api.post<OpenAICompletionResponse>(ENDPOINTS.openai.v1.completions, {
        model,
        messages: [{role: 'system', content: this.systemMessage}, ...messages],
        stream,
      }, {
        responseType: stream ? 'stream' : 'json'
      })


      const role = response.data.choices[0].message.role;
      const content = response.data.choices[0].message.content;

      return [{role, content}]
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }

  public async modelsList(): Promise<ModelsListResponse> {
    try {
        const response = await this.api.get<ModelsListResponse>(ENDPOINTS.openai.v1.modelsList);
        return response.data;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }

  async createImage(args: OpenAICreateImageParams): Promise<CreateImageResponse> {
    try {
      const response = await this.api.post<CreateImageResponse>(ENDPOINTS.openai.v1.imageGenerations, {
        ...args
      });
      return response.data;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  }

  async createImageWithLeonardo(args: LeonardoAICreateImageParams): Promise<LeonardoAICreateImageResponse> {
    try {
      console.log(this.supportModels.leonardoAI)
      const response = await this.supportModels.leonardoAI.createImage({...args}) as {
        sdGenerationJob: {
          generationId: string,
          apiCreditCost: number
        }
      }

      const imageUrl = await this.supportModels.leonardoAI.getGeneratedImageUrl(response.sdGenerationJob.generationId)

      return {
        imageUrl,
        apiCreditCost: response.sdGenerationJob.apiCreditCost
      };
    } catch (error) {
      console.error("OpenAI API / LeonardoAI API error:", error);
      throw error;
    }
  }

  public debug() {
    console.log("debugging")
    return {
      company: "openai",
      baseUrl: this.baseUrl,
      model: this.defaultModel,
      systemMessage: this.systemMessage,
      api: this.api,
    }
  }
}
