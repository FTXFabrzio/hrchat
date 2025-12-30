import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';
import { SUPABASE_CLIENT } from '../../database/database.module';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../types/department';
import { IDepartmentsRepository } from './departments.repository';

@Injectable()
export class SupabaseDepartmentsRepository implements IDepartmentsRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async findAll(search?: string): Promise<Department[]> {
    let query = this.supabaseClient.from('departamentos').select('*').order('nombre');

    if (search) {
      query = query.ilike('nombre', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new BadRequestException(error.message);
    }

    return (data ?? []) as Department[];
  }

  async create(data: CreateDepartmentDto): Promise<Department> {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: created, error } = await this.supabaseClient
      .from('departamentos')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return created as Department;
  }

  async update(id: string, data: UpdateDepartmentDto): Promise<Department> {
    const payload = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: updated, error } = await this.supabaseClient
      .from('departamentos')
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!updated) {
      throw new NotFoundException('Department not found');
    }

    return updated as Department;
  }

  async remove(id: string): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('departamentos')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data) {
      throw new NotFoundException('Department not found');
    }
  }
}

