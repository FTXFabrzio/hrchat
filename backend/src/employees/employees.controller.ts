import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
@UseGuards(SupabaseAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  list(
    @Query('search') search?: string,
    @Query('estado') estado?: string,
    @Query('departmentId') departmentId?: string,
  ) {
    return this.employeesService.list({ search, estado, departmentId });
  }

  @Post()
  create(@Body() payload: CreateEmployeeDto) {
    return this.employeesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() payload: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.employeesService.remove(id);
    return { ok: true };
  }
}

