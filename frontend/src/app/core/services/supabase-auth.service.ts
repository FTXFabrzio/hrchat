import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private readonly supabaseClient: SupabaseClient;
  private currentSession: Session | null = null;

  constructor() {
    if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey,
    );

    this.supabaseClient.auth.getSession().then(({ data }) => {
      this.currentSession = data.session;
    });

    this.supabaseClient.auth.onAuthStateChange((_event, session) => {
      this.currentSession = session;
    });
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    this.currentSession = data.session;
    return data;
  }

  async signOut() {
    await this.supabaseClient.auth.signOut();
    this.currentSession = null;
  }

  async getSession(): Promise<Session | null> {
    if (this.currentSession) {
      return this.currentSession;
    }

    const { data } = await this.supabaseClient.auth.getSession();
    this.currentSession = data.session;
    return data.session;
  }

  async getAccessToken(): Promise<string | null> {
    const session = await this.getSession();
    return session?.access_token ?? null;
  }
}

