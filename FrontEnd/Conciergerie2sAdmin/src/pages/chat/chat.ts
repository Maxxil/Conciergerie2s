import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat/chat-service";
import { Content } from 'ionic-angular';
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import { UtilisateurModel } from '../../model/Models/UtilisateurModel';
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
  allUsersOnLine = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
     public utilisateurPvd : UtilisateurProvider,
    private chatService: ChatService) {        
      // Get the navParams toUserId parameter
    
      this.utilisateurPvd.getByCurrentId().subscribe(result =>{
        this.profile = result.data[0];
      
      this.fromUser = {
      id: this.profile._id,
      name: 'C2S',//navParams.get('toUserName')
      avatar: './assets/imgs/user.jpg'
      };
      
      this.toUser = {
        id: '5c015ffed2434f188bb5ff97',
        name: 'Client',
        avatar: './assets/imgs/to-user.jpg'
      };

    });

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
    console.log(this.allUsersOnLine);
    if(this.allUsersOnLine.filter(item => item.id== msg.toUserId).length == 0) {
      if(msg.toUserId ==  this.profile._id)
        this.allUsersOnLine.push({id: msg.toUserId, name: msg.userName});
    }
    this.msgList.push(msg);
    console.log(this.msgList);
    this.scrollToBottom();
  }

  selectUser(userid) {
    console.log('Choix utilisateur '+userid);
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
