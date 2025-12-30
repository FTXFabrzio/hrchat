import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EmployeesModule } from '../employees/employees.module';
import { ChatController } from './chat.controller';
import { CHAT_HANDLERS } from './chat.constants';
import { ChatService } from './chat.service';
import { IntentClassifier } from './intent-classifier';
import { EmployeeLocationHandler } from './handlers/employee-location.handler';
import { UnknownIntentHandler } from './handlers/unknown-intent.handler';
import { ChatWebhookService } from './chat-webhook.service';

@Module({
  imports: [EmployeesModule, AuthModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatWebhookService,
    IntentClassifier,
    EmployeeLocationHandler,
    UnknownIntentHandler,
    {
      provide: CHAT_HANDLERS,
      useFactory: (
        employeeLocationHandler: EmployeeLocationHandler,
        unknownIntentHandler: UnknownIntentHandler,
      ) => [employeeLocationHandler, unknownIntentHandler],
      inject: [EmployeeLocationHandler, UnknownIntentHandler],
    },
  ],
})
export class ChatModule {}
