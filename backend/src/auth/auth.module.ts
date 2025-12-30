import { Module } from '@nestjs/common';
import { SupabaseAuthService } from './supabase-auth.service';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SupabaseAuthService, SupabaseAuthGuard],
  exports: [SupabaseAuthGuard, SupabaseAuthService],
})
export class AuthModule {}

