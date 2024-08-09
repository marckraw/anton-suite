import { ModelFactory, ModelType } from "./models/factory";
import { setupAxios } from "./helpers/browser";
import { createLogger } from '@mrck-labs/utils';
import type { Message, AIModel } from "./models/base";
import { ChatResponse } from '@mrck-labs/api-interface';

const logger = createLogger('AntonSDK');

// Run setup if in browser environment
if (typeof window !== "undefined") {
  setupAxios();
}
export class AntonSDK {
  private model: AIModel;
  constructor(config: { type: ModelType; apiKey: string }) {
    this.model = ModelFactory.create(config.type, config.apiKey);
    logger.info('AntonSDK created with type: ', config.type);

  }
  async chat(messages: Message[]): Promise<ChatResponse> {
    return this.model.chat(messages);
  }
}
