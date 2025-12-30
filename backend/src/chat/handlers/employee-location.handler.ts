import { Injectable } from '@nestjs/common';
import { EmployeesService } from '../../employees/employees.service';
import { ChatIntent } from '../types/chat-intent';
import { ChatHandlerResult, ChatIntentHandler } from './chat-intent.handler';

@Injectable()
export class EmployeeLocationHandler implements ChatIntentHandler {
  intent: ChatIntent = 'EMPLOYEE_LOCATION';

  constructor(private readonly employeesService: EmployeesService) {}

  async handle(
    _message: string,
    entities: Record<string, unknown>,
    debug: boolean,
  ): Promise<ChatHandlerResult> {
    const employeeName = String(entities.employeeName ?? '').trim();

    if (!employeeName) {
      return {
        answer: 'Indica el nombre del empleado para buscar su ubicacion.',
        debug: debug ? { reason: 'missing_name' } : undefined,
      };
    }

    const matches = await this.employeesService.findByName(employeeName);
    const queryInfo = { table: 'empleados', filter: { nombre: employeeName } };

    if (matches.length === 0) {
      return {
        answer: `No encontre empleados con nombre parecido a "${employeeName}".`,
        debug: debug ? { query: queryInfo, count: 0 } : undefined,
      };
    }

    if (matches.length > 1) {
      const options = matches
        .map((employee, index) => {
          const deptName = employee.departamento?.nombre ?? 'Sin departamento';
          const location = employee.departamento?.ubicacion ?? 'Sin sede';
          return `${index + 1}) ${employee.nombre} - ${deptName} (${location})`;
        })
        .join(' ');

      return {
        answer: `Hay mas de un empleado con ese nombre. Indica cual: ${options}`,
        debug: debug
          ? { query: queryInfo, count: matches.length }
          : undefined,
      };
    }

    const [employee] = matches;
    const deptName = employee.departamento?.nombre ?? 'Sin departamento';
    const location = employee.departamento?.ubicacion ?? 'Sin sede';

    return {
      answer: `${employee.nombre} es de ${deptName} en la ${location}.`,
      debug: debug ? { query: queryInfo, count: 1 } : undefined,
    };
  }
}

