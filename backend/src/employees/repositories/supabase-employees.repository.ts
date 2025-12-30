import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../database/database.module';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import {
  EmployeesFilters,
  IEmployeesRepository,
} from './employees.repository';
import { Employee, EmployeeDepartment } from '../types/employee';

type SupabaseEmployeeRow = Omit<Employee, 'departamento'> & {
  departamento?: EmployeeDepartment | EmployeeDepartment[] | null;
};

@Injectable()
export class SupabaseEmployeesRepository implements IEmployeesRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async findAll(filters: EmployeesFilters): Promise<Employee[]> {
    let query = this.supabaseClient
      .from('empleados')
      .select(
        'id, nombre, email, estado, id_departamento, fecha_inicio, fecha_fin, created_at, updated_at, departamento:departamentos(id, nombre, ubicacion)',
      )
      .order('nombre');

    if (filters.search) {
      query = query.or(
        `nombre.ilike.%${filters.search}%,email.ilike.%${filters.search}%`,
      );
    }

    if (filters.estado) {
      query = query.eq('estado', filters.estado);
    }

    if (filters.departmentId) {
      query = query.eq('id_departamento', filters.departmentId);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException(error.message);
    }

    const rows = (data ?? []) as SupabaseEmployeeRow[];
    return rows.map((row) => this.normalizeEmployee(row));
  }

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: created, error } = await this.supabaseClient
      .from('empleados')
      .insert(payload)
      .select(
        'id, nombre, email, estado, id_departamento, fecha_inicio, fecha_fin, created_at, updated_at, departamento:departamentos(id, nombre, ubicacion)',
      )
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return this.normalizeEmployee(created as SupabaseEmployeeRow);
  }

  async update(id: string, data: UpdateEmployeeDto): Promise<Employee> {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await this.supabaseClient
      .from('empleados')
      .update(payload)
      .eq('id', id)
      .select(
        'id, nombre, email, estado, id_departamento, fecha_inicio, fecha_fin, created_at, updated_at, departamento:departamentos(id, nombre, ubicacion)',
      )
      .maybeSingle();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!updated) {
      throw new NotFoundException('Employee not found');
    }

    return this.normalizeEmployee(updated as SupabaseEmployeeRow);
  }

  async remove(id: string): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('empleados')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data) {
      throw new NotFoundException('Employee not found');
    }
  }

  async findByName(name: string): Promise<Employee[]> {
    const { data, error } = await this.supabaseClient
      .from('empleados')
      .select(
        'id, nombre, email, estado, id_departamento, fecha_inicio, fecha_fin, created_at, updated_at, departamento:departamentos(id, nombre, ubicacion)',
      )
      .ilike('nombre', `%${name}%`)
      .order('nombre');

    if (error) {
      throw new BadRequestException(error.message);
    }

    const rows = (data ?? []) as SupabaseEmployeeRow[];
    return rows.map((row) => this.normalizeEmployee(row));
  }

  private normalizeEmployee(row: SupabaseEmployeeRow): Employee {
    const departamento = Array.isArray(row.departamento)
      ? row.departamento[0] ?? null
      : row.departamento ?? null;

    return {
      ...row,
      departamento,
    };
  }
}

