import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatPanelComponent } from './components/chat-panel.component';
import { ChatPageComponent } from './components/chat-page.component';

@NgModule({
  declarations: [ChatPanelComponent, ChatPageComponent],
  imports: [SharedModule],
  exports: [ChatPanelComponent, ChatPageComponent],
})
export class ChatModule {}

