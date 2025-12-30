import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    list(search?: string, estado?: string, departmentId?: string): Promise<import("./types/employee").Employee[]>;
    create(payload: CreateEmployeeDto): Promise<import("./types/employee").Employee>;
    update(id: string, payload: UpdateEmployeeDto): Promise<import("./types/employee").Employee>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
