import { Inject, Injectable } from '@nestjs/common';
import { IntentClassifier } from './intent-classifier';
import { CHAT_HANDLERS } from './chat.constants';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatResponse, IntentResult } from './types/chat-intent';
import type { ChatIntentHandler } from './handlers/chat-intent.handler';

@Injectable()
export class ChatService {
  constructor(
    private readonly classifier: IntentClassifier,
    @Inject(CHAT_HANDLERS)
    private readonly handlers: ChatIntentHandler[],
  ) {}

  async answer(payload: ChatRequestDto): Promise<ChatResponse> {
    const intentResult = this.classifier.classify(payload.message);
    const handler = this.selectHandler(intentResult);
    const handlerResponse = await handler.handle(
      payload.message,
      intentResult.entities,
      Boolean(payload.debug),
    );

    if (!payload.debug) {
      return { answer: handlerResponse.answer };
    }

    return {
      answer: handlerResponse.answer,
      debug: {
        intent: intentResult.intent,
        entities: intentResult.entities,
        handler: handler.intent,
        ...(handlerResponse.debug ?? {}),
      },
    };
  }

  private selectHandler(intentResult: IntentResult): ChatIntentHandler {
    const handler = this.handlers.find((item) => item.intent === intentResult.intent);
    if (handler) {
      return handler;
    }

    return this.handlers.find((item) => item.intent === 'UNKNOWN') ?? this.handlers[0];
  }
}

