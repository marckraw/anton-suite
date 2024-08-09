import { Controller, Get } from '@nestjs/common';

import { SmokeTestService } from './smoke-test.service';

@Controller('smoke-test')
export class SmokeTestController {
  constructor(private readonly smokeTestService: SmokeTestService) {}

  @Get()
  smokeTest() {
    return this.smokeTestService.smokeTest();
  }
}
