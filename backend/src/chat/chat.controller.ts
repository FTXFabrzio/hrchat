import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatWebhookRequestDto } from './dto/chat-webhook-request.dto';
import { ChatWebhookService } from './chat-webhook.service';

@Controller('chat')
@UseGuards(SupabaseAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatWebhookService: ChatWebhookService,
  ) {}

  @Post()
  answer(@Body() payload: ChatRequestDto) {
    return this.chatService.answer(payload);
  }

  @Post('webhook')
  async webhook(@Body() payload: ChatWebhookRequestDto) {
    const answer = await this.chatWebhookService.forward(
      payload.message,
      payload.mode,
    );
    return { answer };
  }
}
