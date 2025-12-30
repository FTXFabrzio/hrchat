import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import type { EmployeesFilters, IEmployeesRepository } from './repositories/employees.repository';
import { Employee } from './types/employee';
export declare class EmployeesService {
    private readonly employeesRepository;
    constructor(employeesRepository: IEmployeesRepository);
    list(filters: EmployeesFilters): Promise<Employee[]>;
    create(payload: CreateEmployeeDto): Promise<Employee>;
    update(id: string, payload: UpdateEmployeeDto): Promise<Employee>;
    remove(id: string): Promise<void>;
    findByName(name: string): Promise<Employee[]>;
    private assertValidDates;
}
