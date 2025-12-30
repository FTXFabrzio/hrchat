import { ConfigService } from '@nestjs/config';
export declare class ChatWebhookService {
    private readonly configService;
    constructor(configService: ConfigService);
    forward(message: string, mode?: 'test' | 'production'): Promise<string>;
    private getWebhookUrl;
}
