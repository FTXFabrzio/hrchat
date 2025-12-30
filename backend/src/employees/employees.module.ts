import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { EMPLOYEES_REPOSITORY } from './repositories/employees.repository';
import { SupabaseEmployeesRepository } from './repositories/supabase-employees.repository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: EMPLOYEES_REPOSITORY,
      useClass: SupabaseEmployeesRepository,
    },
  ],
  exports: [EmployeesService, EMPLOYEES_REPOSITORY],
})
export class EmployeesModule {}

