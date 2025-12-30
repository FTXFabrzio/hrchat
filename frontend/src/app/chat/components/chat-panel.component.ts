import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatWebhookService, ChatMode } from '../services/chat-webhook.service';

export type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
};

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
  standalone: false,
})
export class ChatPanelComponent implements AfterViewInit {
  @Input() compact = false;
  @ViewChild('messagesContainer') private messagesRef?: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [
    { role: 'bot', content: 'Soy tu asistente de RRHH. Pregunta lo que necesites.' },
  ];
  mode: ChatMode = 'production';
  isSending = false;

  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly chatService: ChatWebhookService,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  setMode(mode: ChatMode) {
    this.mode = mode;
  }

  sendMessage() {
    if (this.form.invalid || this.isSending) {
      this.form.markAllAsTouched();
      return;
    }

    const text = this.form.value.message ?? '';
    this.messages = [...this.messages, { role: 'user', content: text }];
    this.form.reset();
    this.isSending = true;
    this.scrollToBottom();

    this.chatService.sendMessage(text, this.mode).subscribe({
      next: (answer) => {
        this.ngZone.run(() => {
          this.messages = [
            ...this.messages,
            {
              role: 'bot',
              content: answer || 'No hubo respuesta del webhook.',
            },
          ];
          this.isSending = false;
          this.cdr.detectChanges();
          this.scrollToBottom();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.messages = [
            ...this.messages,
            {
              role: 'bot',
              content: 'No fue posible conectar con el webhook.',
            },
          ];
          this.isSending = false;
          this.cdr.detectChanges();
          this.scrollToBottom();
        });
      },
    });
  }

  private scrollToBottom() {
    const container = this.messagesRef?.nativeElement;
    if (!container) {
      return;
    }

    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }
}
