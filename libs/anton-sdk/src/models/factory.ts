import { AnthropicModel } from "./anthropic";
import { OpenAIModel } from './openai';
import {OpenAIFactoryConfig, OpenAIModelInterface, AnthropicFactoryConfig, AnthropicModelInterface} from "@mrck-labs/api-interface";


export class AntonSDK {
  static create(config: AnthropicFactoryConfig): AnthropicModelInterface;
  static create(config: OpenAIFactoryConfig): OpenAIModelInterface;
  static create(config: AnthropicFactoryConfig | OpenAIFactoryConfig) {
    const {type, apiKey, model} = config;

    switch (type) {
      case "anthropic":
        return new AnthropicModel(apiKey, model ? model : 'claude-3-5-sonnet-20240620') as AnthropicModelInterface;
      case "openai":
        return new OpenAIModel(apiKey, model ? model : 'gpt-4o', config?.supportedModelsApiKeys) as OpenAIModelInterface;
      default:
        throw new Error(`Unsupported model type: ${type}`);
    }
  }
}




const anton = AntonSDK.create({type: 'anthropic', apiKey: '1234'})
const antonGPT = AntonSDK.create({type: 'openai', apiKey: '1234'})
