import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SupabaseAuthService } from '../supabase-auth.service';
export declare class SupabaseAuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: SupabaseAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
