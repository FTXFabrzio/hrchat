import { ChatIntent } from '../types/chat-intent';

export type ChatHandlerResult = {
  answer: string;
  debug?: Record<string, unknown>;
};

export interface ChatIntentHandler {
  intent: ChatIntent;
  handle(message: string, entities: Record<string, unknown>, debug: boolean):
    | Promise<ChatHandlerResult>
    | ChatHandlerResult;
}

