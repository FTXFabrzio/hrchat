import { ChatService } from './chat.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatWebhookRequestDto } from './dto/chat-webhook-request.dto';
import { ChatWebhookService } from './chat-webhook.service';
export declare class ChatController {
    private readonly chatService;
    private readonly chatWebhookService;
    constructor(chatService: ChatService, chatWebhookService: ChatWebhookService);
    answer(payload: ChatRequestDto): Promise<import("./types/chat-intent").ChatResponse>;
    webhook(payload: ChatWebhookRequestDto): Promise<{
        answer: string;
    }>;
}
