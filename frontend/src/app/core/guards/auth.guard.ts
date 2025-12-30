import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseAuthService } from '../services/supabase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: SupabaseAuthService,
    private readonly router: Router,
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const session = await this.authService.getSession();

    if (session) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}

