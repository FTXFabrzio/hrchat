import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../types/employee';
export interface EmployeesFilters {
    search?: string;
    estado?: string;
    departmentId?: string;
}
export interface IEmployeesRepository {
    findAll(filters: EmployeesFilters): Promise<Employee[]>;
    create(data: CreateEmployeeDto): Promise<Employee>;
    update(id: string, data: UpdateEmployeeDto): Promise<Employee>;
    remove(id: string): Promise<void>;
    findByName(name: string): Promise<Employee[]>;
}
export declare const EMPLOYEES_REPOSITORY: unique symbol;
