import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat/chat-service";
import { Content } from 'ionic-angular';
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  fromUser: UserInfo;
  toUser: UserInfo;
  msgList: ChatMessage[] = [];
  profile : UtilisateurModel;
  editorMsg = '';
  @ViewChild('chat_input') messageInput: ElementRef;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
     public utilisateurPvd : UtilisateurProvider,
    private chatService: ChatService) {        
      // Get the navParams toUserId parameter
    
      this.utilisateurPvd.getByCurrentId().subscribe(result =>{
        this.profile = result.data[0];
      
      this.fromUser = {
      id: this.profile._id,
      name: 'Client',//navParams.get('toUserName')
      avatar: './assets/imgs/user.jpg'
      };
      
      this.toUser = {
        id: '5bf826ab20945653e180b496',
        name: 'C2S',
        avatar: './assets/imgs/to-user.jpg'
      };
    
    });

    //this.getMsg(); 
    
  }

  detectNetworkConnection() : void
   {
      this.chatService
      .pollServer()
      .toPromise()
      .then((data : any) =>
      {
        this.getMsg();
         
      })
      .catch((error) =>
      {
        console.log(error);
      });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.detectNetworkConnection();
  }

  ionViewDidEnter() {
   /* this.chatService.getMsgList()
      .subscribe((message) =>
      {

         // Update the messages array
         this.pushNewMsg(message);
      });
*/

  }

  
  ionViewWillLeave() {
    // unsubscribe
   // this.events.unsubscribe('chat:received');
  }

    /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {

    this.chatService.retrieveMsg()
    .subscribe((message) =>
    {     
       this.pushNewMsg(message);


    });
  }

  onFocus() {   
    this.content.resize();
    this.scrollToBottom();
  }

  
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  pushNewMsg(msg: ChatMessage) {
    
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    //const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.fromUser.id,
      userName: this.fromUser.name,
      userAvatar: this.fromUser.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: ''
    };

    this.chatService.sendMsg(newMsg);
       
    
    this.editorMsg = '';

    
    this.focus();
  
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }
 

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  



}
