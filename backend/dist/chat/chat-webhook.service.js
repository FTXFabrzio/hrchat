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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatWebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ChatWebhookService = class ChatWebhookService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async forward(message, mode = 'test') {
        const url = this.getWebhookUrl(mode);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
                signal: controller.signal,
            });
            const raw = await response.text();
            if (!response.ok) {
                throw new common_1.BadGatewayException(raw || `Webhook error: ${response.status} ${response.statusText}`);
            }
            return raw.trim();
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new common_1.BadGatewayException('Webhook timeout');
            }
            throw error;
        }
        finally {
            clearTimeout(timeout);
        }
    }
    getWebhookUrl(mode) {
        const key = mode === 'production' ? 'WEBHOOK_PRODUCTION_URL' : 'WEBHOOK_TEST_URL';
        const url = this.configService.get(key);
        if (!url) {
            throw new common_1.BadRequestException(`Missing ${key}`);
        }
        return url;
    }
};
exports.ChatWebhookService = ChatWebhookService;
exports.ChatWebhookService = ChatWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatWebhookService);
//# sourceMappingURL=chat-webhook.service.js.map