import { Injectable } from '@nestjs/common';
import {  createLogger } from '@mrck-labs/utils';
import { AntonSDK } from '@mrck-labs/anton-sdk-test';
import {anthropicModels} from '@mrck-labs/api-interface'
import { CreateCompletionDto } from './dto/CreateCompletion.dto';

const logger = createLogger('anton-api:AppService');

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getHello(): { message: string } {
    logger.info('logging from AppService.getHello()');

    return { message: 'greetings' };
  }

  async getCompletion(): Promise<any> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    console.log('This is api key ? ');
    console.log(apiKey);

    logger.info('logging from AppService.getCompletion()');

    const anton = new AntonSDK({ type: 'anthropic', apiKey: apiKey });

    const response = await anton.chat([
      {
        content: 'Hey there, how are you ? :)',
        role: 'user',
      },
    ]);

    return response;
  }

  async createCompletion(dto: CreateCompletionDto): Promise<any> {
    const model = dto.model;
    let apiKey = process.env.ANTHROPIC_API_KEY;
    let type: 'anthropic' | 'openai' = 'anthropic';

    if (anthropicModels.includes(model)) {
      type = 'anthropic';
      apiKey = process.env.ANTHROPIC_API_KEY;
    } else {
      type = 'openai';
      apiKey = process.env.OPENAI_API_KEY;
    }

    const config = {
      type,
      model,
      apiKey,
    };

    logger.info('logging from AppService.getCompletion()');

    const anton = new AntonSDK(config);

    const response = await anton.chat([
      {
        content: dto.content,
        role: 'user',
      },
    ]);

    return response;
  }
}
