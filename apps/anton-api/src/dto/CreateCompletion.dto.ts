import { IsOptional, IsString } from 'class-validator';
import { AntonAPIModels } from '@mrck-labs/api-interface';

export class CreateCompletionDto {
  @IsOptional()
  @IsString()
  model: AntonAPIModels;

  @IsString()
  content: string;
}
