import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SupabaseAuthService } from '../services/supabase-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: SupabaseAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(environment.apiBaseUrl)) {
      return next.handle(request);
    }

    return from(this.authService.getAccessToken()).pipe(
      switchMap((token) => {
        if (!token) {
          return next.handle(request);
        }

        const authorizedRequest = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });

        return next.handle(authorizedRequest);
      }),
    );
  }
}

