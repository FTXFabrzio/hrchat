import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseAuthService } from '../../core/services/supabase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  form: FormGroup;
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: SupabaseAuthService,
    private readonly router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async submit() {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      await this.authService.signIn(
        this.form.value.email ?? '',
        this.form.value.password ?? '',
      );
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      this.errorMessage = message;
    } finally {
      this.isSubmitting = false;
    }
  }
}

