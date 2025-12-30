import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DEPARTMENTS_REPOSITORY } from './repositories/departments.repository';
import type { IDepartmentsRepository } from './repositories/departments.repository';
import { Department } from './types/department';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject(DEPARTMENTS_REPOSITORY)
    private readonly departmentsRepository: IDepartmentsRepository,
  ) {}

  list(search?: string): Promise<Department[]> {
    return this.departmentsRepository.findAll(search);
  }

  create(payload: CreateDepartmentDto): Promise<Department> {
    return this.departmentsRepository.create(payload);
  }

  update(id: string, payload: UpdateDepartmentDto): Promise<Department> {
    return this.departmentsRepository.update(id, payload);
  }

  remove(id: string): Promise<void> {
    return this.departmentsRepository.remove(id);
  }
}

