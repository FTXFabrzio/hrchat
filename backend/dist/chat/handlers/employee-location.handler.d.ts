import { EmployeesService } from '../../employees/employees.service';
import { ChatIntent } from '../types/chat-intent';
import { ChatHandlerResult, ChatIntentHandler } from './chat-intent.handler';
export declare class EmployeeLocationHandler implements ChatIntentHandler {
    private readonly employeesService;
    intent: ChatIntent;
    constructor(employeesService: EmployeesService);
    handle(_message: string, entities: Record<string, unknown>, debug: boolean): Promise<ChatHandlerResult>;
}
