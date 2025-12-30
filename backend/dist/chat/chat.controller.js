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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const supabase_auth_guard_1 = require("../auth/guards/supabase-auth.guard");
const chat_service_1 = require("./chat.service");
const chat_request_dto_1 = require("./dto/chat-request.dto");
const chat_webhook_request_dto_1 = require("./dto/chat-webhook-request.dto");
const chat_webhook_service_1 = require("./chat-webhook.service");
let ChatController = class ChatController {
    chatService;
    chatWebhookService;
    constructor(chatService, chatWebhookService) {
        this.chatService = chatService;
        this.chatWebhookService = chatWebhookService;
    }
    answer(payload) {
        return this.chatService.answer(payload);
    }
    async webhook(payload) {
        const answer = await this.chatWebhookService.forward(payload.message, payload.mode);
        return { answer };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_request_dto_1.ChatRequestDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "answer", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_webhook_request_dto_1.ChatWebhookRequestDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "webhook", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        chat_webhook_service_1.ChatWebhookService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map