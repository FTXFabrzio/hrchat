import { Injectable } from '@nestjs/common';
import { ChatIntent } from '../types/chat-intent';
import { ChatHandlerResult, ChatIntentHandler } from './chat-intent.handler';

@Injectable()
export class UnknownIntentHandler implements ChatIntentHandler {
  intent: ChatIntent = 'UNKNOWN';

  handle(_message: string, _entities: Record<string, unknown>, debug: boolean): ChatHandlerResult {
    return {
      answer: 'No entendi la pregunta. Puedes preguntar: "Donde trabaja Juan".',
      debug: debug ? { reason: 'unsupported_intent' } : undefined,
    };
  }
}

