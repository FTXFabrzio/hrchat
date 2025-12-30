import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type ChatMode = 'test' | 'production';

@Injectable({
  providedIn: 'root',
})
export class ChatWebhookService {
  constructor(private readonly http: HttpClient) {}

  sendMessage(message: string, mode: ChatMode): Observable<string> {
    const config = environment.chatWebhooks[mode];
    return this.http
      .post(config.url, { message }, { responseType: 'text' })
      .pipe(
        timeout(120000),
        map((response) => this.extractText(response)),
      );
  }

  private extractText(response: string): string {
    const trimmed = response?.trim() ?? '';
    if (!trimmed) {
      return '';
    }

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed) as Record<string, unknown>;
        return this.normalizeResponse(parsed) ?? trimmed;
      } catch {
        return trimmed;
      }
    }

    return trimmed;
  }

  private normalizeResponse(response: Record<string, unknown>): string | null {
    const record = response;
    const candidates = [
      record['output'],
      record['answer'],
      record['message'],
      record['response'],
      record['data'],
    ];

    for (const candidate of candidates) {
      if (typeof candidate === 'string' && candidate.trim().length > 0) {
        return candidate;
      }
    }

    const nestedData = record['data'];
    if (typeof nestedData === 'object' && nestedData) {
      const nested = nestedData as Record<string, unknown>;
      const nestedCandidate = nested['answer'] ?? nested['message'];
      if (typeof nestedCandidate === 'string') {
        return nestedCandidate;
      }
    }

    return null;
  }
}

