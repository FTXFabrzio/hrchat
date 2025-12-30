import { IntentResult } from './types/chat-intent';

export class IntentClassifier {
  classify(message: string): IntentResult {
    const normalized = this.normalize(message);

    if (normalized.includes('donde trabaja')) {
      const name = this.extractName(normalized);
      return {
        intent: 'EMPLOYEE_LOCATION',
        entities: { employeeName: name },
      };
    }

    return { intent: 'UNKNOWN', entities: {} };
  }

  private extractName(message: string): string | undefined {
    const match = message.match(/donde trabaja\s+([a-z\s]+)/i);
    if (!match) {
      return undefined;
    }

    return match[1].trim();
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

