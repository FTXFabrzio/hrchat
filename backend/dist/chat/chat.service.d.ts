import { IntentClassifier } from './intent-classifier';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatResponse } from './types/chat-intent';
import type { ChatIntentHandler } from './handlers/chat-intent.handler';
export declare class ChatService {
    private readonly classifier;
    private readonly handlers;
    constructor(classifier: IntentClassifier, handlers: ChatIntentHandler[]);
    answer(payload: ChatRequestDto): Promise<ChatResponse>;
    private selectHandler;
}
