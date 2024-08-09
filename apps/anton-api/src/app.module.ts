import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmokeTestController } from './smoke-test.controller';
import { SmokeTestService } from './smoke-test.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SmokeTestController],
  providers: [AppService, SmokeTestService],
})
export class AppModule {}
