import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  msgListCurrentUser: ChatMessage[] = [];
  profile : UtilisateurModel;
  editorMsg = '';
  currentUserId = '';
  @ViewChild('chat_input') messageInput: ElementRef;
  @ViewChild(Content) content: Content;
  allUsersOnLine = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
     public utilisateurPvd : UtilisateurProvider,
    private chatService: ChatService, public alertCtrl : AlertController) {        
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
    // Vérification si on a  été redirigé par une notification
    if(localStorage.getItem("chat-request") !== null) {

      var chatRequest = JSON.parse(localStorage.getItem('chat-request')); 
      
      this.toUser = {
        id: chatRequest['userid'],
        name: 'Client',
        avatar: './assets/imgs/to-user.jpg'
      };

      this.fromUser = {
        id: localStorage.getItem('IdUtilisateur'),
        name: 'C2S',
        avatar: './assets/imgs/user.jpg'
      };
      this.allUsersOnLine.push({id: chatRequest['userid'], name: chatRequest['username']});
      this.currentUserId = chatRequest['userid'];  
      let newMsg: ChatMessage = {
        messageId: Date.now().toString(),  
        userId: this.fromUser.id,
        userName: this.fromUser.name,
        userAvatar: this.fromUser.avatar,
        toUserId: this.toUser.id,
        time: Date.now(),
        message: 'Bonjour, quel est votre question ?',
        status: ''
      };
      this.chatService.sendMsg(newMsg);
      localStorage.removeItem('chat-request');   
      localStorage.removeItem('redirect');
    }
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

    this.chatService.retrieveDisconnect()
    .subscribe((message) =>
    {     
      console.log('user is disconnected '+message.user);
      var user_disconnected = this.allUsersOnLine.filter(item => item.id == message.user).pop();
      this.allUsersOnLine = this.allUsersOnLine.filter(item => item.id != message.user);
      this.msgList = this.msgList.filter((x) => {
        return x.userId != user_disconnected.id && x.toUserId != user_disconnected.id
      });

      this.msgListCurrentUser = this.msgListCurrentUser.filter((x) => {
        return x.userId != user_disconnected.id && x.toUserId != user_disconnected.id
      });
      this.alertCtrl.create({
        title : 'Message',
        message : "L'utilisateur ["+user_disconnected.name+"] a quitté le chat",
        buttons : [{
          text : 'OK'
        }]
      }).present();
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
    console.log('pushnewMsg after retreive msg', msg);    
    if(msg.toUserId ==  this.fromUser.id || msg.userId == this.fromUser.id) {
      console.log(this.allUsersOnLine);
      if(this.allUsersOnLine.filter(item => item.id== msg.userId).length == 0) {
        if(msg.userId !=  this.profile._id) {
          this.allUsersOnLine.push({id: msg.userId, name: msg.userName});
          this.currentUserId = msg.userId;     
        }
      }

      if(msg.userId !=  this.profile._id) {
      this.toUser.id = msg.userId;
      this.toUser.name = msg.userName;      
      this.currentUserId = msg.userId;
      }   

      this.msgList.push(msg);

      this.filter();

      console.log(this.msgList);
      this.scrollToBottom();
    }
  }

  filter() {
    this.msgListCurrentUser = this.msgList.filter((x) => {
      return x.userId == this.currentUserId || x.toUserId == this.currentUserId
    });
  }

  selectUser(user) {

    this.toUser.id = user.id;
    this.toUser.name = user.name;
    this.currentUserId = user.id;
    this.filter();

    console.log('Choix utilisateur '+this.toUser.id);
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
    this.currentUserId = this.toUser.id;

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
