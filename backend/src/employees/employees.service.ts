import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EMPLOYEES_REPOSITORY } from './repositories/employees.repository';
import type {
  EmployeesFilters,
  IEmployeesRepository,
} from './repositories/employees.repository';
import { Employee } from './types/employee';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(EMPLOYEES_REPOSITORY)
    private readonly employeesRepository: IEmployeesRepository,
  ) {}

  list(filters: EmployeesFilters): Promise<Employee[]> {
    return this.employeesRepository.findAll(filters);
  }

  create(payload: CreateEmployeeDto): Promise<Employee> {
    this.assertValidDates(payload.fecha_inicio, payload.fecha_fin);
    return this.employeesRepository.create(payload);
  }

  update(id: string, payload: UpdateEmployeeDto): Promise<Employee> {
    this.assertValidDates(payload.fecha_inicio, payload.fecha_fin);
    return this.employeesRepository.update(id, payload);
  }

  remove(id: string): Promise<void> {
    return this.employeesRepository.remove(id);
  }

  findByName(name: string): Promise<Employee[]> {
    return this.employeesRepository.findByName(name);
  }

  private assertValidDates(start?: string, end?: string | null) {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        throw new BadRequestException('Invalid date format');
      }

      if (endDate < startDate) {
        throw new BadRequestException('fecha_fin must be after fecha_inicio');
      }
    }
  }
}

