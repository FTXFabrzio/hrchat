"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const intent_classifier_1 = require("./intent-classifier");
const chat_constants_1 = require("./chat.constants");
let ChatService = class ChatService {
    classifier;
    handlers;
    constructor(classifier, handlers) {
        this.classifier = classifier;
        this.handlers = handlers;
    }
    async answer(payload) {
        const intentResult = this.classifier.classify(payload.message);
        const handler = this.selectHandler(intentResult);
        const handlerResponse = await handler.handle(payload.message, intentResult.entities, Boolean(payload.debug));
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
    selectHandler(intentResult) {
        const handler = this.handlers.find((item) => item.intent === intentResult.intent);
        if (handler) {
            return handler;
        }
        return this.handlers.find((item) => item.intent === 'UNKNOWN') ?? this.handlers[0];
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(chat_constants_1.CHAT_HANDLERS)),
    __metadata("design:paramtypes", [intent_classifier_1.IntentClassifier, Array])
], ChatService);
//# sourceMappingURL=chat.service.js.map