import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import type { IDepartmentsRepository } from './repositories/departments.repository';
import { Department } from './types/department';
export declare class DepartmentsService {
    private readonly departmentsRepository;
    constructor(departmentsRepository: IDepartmentsRepository);
    list(search?: string): Promise<Department[]>;
    create(payload: CreateDepartmentDto): Promise<Department>;
    update(id: string, payload: UpdateDepartmentDto): Promise<Department>;
    remove(id: string): Promise<void>;
}
