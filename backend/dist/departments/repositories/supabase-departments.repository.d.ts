import { SupabaseClient } from '@supabase/supabase-js';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../types/department';
import { IDepartmentsRepository } from './departments.repository';
export declare class SupabaseDepartmentsRepository implements IDepartmentsRepository {
    private readonly supabaseClient;
    constructor(supabaseClient: SupabaseClient);
    findAll(search?: string): Promise<Department[]>;
    create(data: CreateDepartmentDto): Promise<Department>;
    update(id: string, data: UpdateDepartmentDto): Promise<Department>;
    remove(id: string): Promise<void>;
}
