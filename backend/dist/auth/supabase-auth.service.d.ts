import { SupabaseClient } from '@supabase/supabase-js';
export declare class SupabaseAuthService {
    private readonly supabaseClient;
    constructor(supabaseClient: SupabaseClient);
    validateToken(token: string): Promise<import("@supabase/supabase-js").AuthUser>;
}
