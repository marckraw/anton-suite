import { Injectable } from '@nestjs/common';
import { AntonSDK } from '@mrck-labs/anton-sdk-test';
import {createLogger} from '@mrck-labs/utils'

const logger = createLogger('anton-api:SmokeTestService');

@Injectable()
export class SmokeTestService {
  async smokeTest() {
    logger.info('logging from SmokeTestService.smokeTest()');
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const anton = new AntonSDK({ apiKey: apiKey, type: 'anthropic' });

    const response = await anton.chat([
      { role: 'user', content: 'Hello, from API!' },
    ]);

    return response;
  }
}
