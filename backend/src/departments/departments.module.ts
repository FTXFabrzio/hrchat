import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DEPARTMENTS_REPOSITORY } from './repositories/departments.repository';
import { SupabaseDepartmentsRepository } from './repositories/supabase-departments.repository';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: DEPARTMENTS_REPOSITORY,
      useClass: SupabaseDepartmentsRepository,
    },
  ],
  exports: [DepartmentsService, DEPARTMENTS_REPOSITORY],
})
export class DepartmentsModule {}

