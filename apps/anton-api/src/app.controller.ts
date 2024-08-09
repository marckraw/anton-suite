import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateCompletionDto } from './dto/CreateCompletion.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }

  @Get('completion')
  getCompletion() {
    return this.appService.getCompletion();
  }

  @Post('completion')
  createCompletion(@Body() data: CreateCompletionDto) {
    return this.appService.createCompletion({model: data.model, content: data.content});
  }
}
