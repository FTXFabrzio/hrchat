import { SupabaseClient } from '@supabase/supabase-js';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeesFilters, IEmployeesRepository } from './employees.repository';
import { Employee } from '../types/employee';
export declare class SupabaseEmployeesRepository implements IEmployeesRepository {
    private readonly supabaseClient;
    constructor(supabaseClient: SupabaseClient);
    findAll(filters: EmployeesFilters): Promise<Employee[]>;
    create(data: CreateEmployeeDto): Promise<Employee>;
    update(id: string, data: UpdateEmployeeDto): Promise<Employee>;
    remove(id: string): Promise<void>;
    findByName(name: string): Promise<Employee[]>;
    private normalizeEmployee;
}
