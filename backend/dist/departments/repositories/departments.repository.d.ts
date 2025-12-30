import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../types/department';
export interface IDepartmentsRepository {
    findAll(search?: string): Promise<Department[]>;
    create(data: CreateDepartmentDto): Promise<Department>;
    update(id: string, data: UpdateDepartmentDto): Promise<Department>;
    remove(id: string): Promise<void>;
}
export declare const DEPARTMENTS_REPOSITORY: unique symbol;
