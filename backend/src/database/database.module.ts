import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CLIENT = Symbol('SUPABASE_CLIENT');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient => {
        const url = configService.get<string>('SUPABASE_URL');
        const serviceRoleKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!url || !serviceRoleKey) {
          throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
        }

        return createClient(url, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
      },
    },
  ],
  exports: [SUPABASE_CLIENT],
})
export class DatabaseModule {}

