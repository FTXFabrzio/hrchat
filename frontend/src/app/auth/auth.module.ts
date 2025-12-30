import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule],
  exports: [LoginComponent],
})
export class AuthModule {}

