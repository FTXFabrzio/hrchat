import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    list(search?: string): Promise<import("./types/department").Department[]>;
    create(payload: CreateDepartmentDto): Promise<import("./types/department").Department>;
    update(id: string, payload: UpdateDepartmentDto): Promise<import("./types/department").Department>;
    remove(id: string): Promise<{
        ok: boolean;
    }>;
}
