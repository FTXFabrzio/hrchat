import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [SharedModule, ChatModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}

