import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatWebhookService {
  constructor(private readonly configService: ConfigService) {}

  async forward(message: string, mode: 'test' | 'production' = 'test') {
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
        throw new BadGatewayException(
          raw || `Webhook error: ${response.status} ${response.statusText}`,
        );
      }

      return raw.trim();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new BadGatewayException('Webhook timeout');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  private getWebhookUrl(mode: 'test' | 'production') {
    const key = mode === 'production' ? 'WEBHOOK_PRODUCTION_URL' : 'WEBHOOK_TEST_URL';
    const url = this.configService.get<string>(key);

    if (!url) {
      throw new BadRequestException(`Missing ${key}`);
    }

    return url;
  }
}
