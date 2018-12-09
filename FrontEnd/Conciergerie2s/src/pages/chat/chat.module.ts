import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { ChatService } from "../../providers/chat/chat-service";
@NgModule({
  declarations: [
    ChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
  ],
  providers: [
    ChatService   
  ]
})
export class ChatPageModule {}
