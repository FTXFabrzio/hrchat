import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class ChatWebhookRequestDto {
  @IsString()
  @MinLength(1)
  message: string;

  @IsOptional()
  @IsIn(['test', 'production'])
  mode?: 'test' | 'production';
}
