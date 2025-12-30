import { ChatIntent } from '../types/chat-intent';
import { ChatHandlerResult, ChatIntentHandler } from './chat-intent.handler';
export declare class UnknownIntentHandler implements ChatIntentHandler {
    intent: ChatIntent;
    handle(_message: string, _entities: Record<string, unknown>, debug: boolean): ChatHandlerResult;
}
