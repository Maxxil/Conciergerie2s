import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat/chat-service";
import { Events, Content } from 'ionic-angular';
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
  user: UserInfo;
  toUser: UserInfo;
  msgList: ChatMessage[] = [];
  editorMsg = '';
  @ViewChild('chat_input') messageInput: ElementRef;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService: ChatService,
    private events: Events) {
    // Get the navParams toUserId parameter
    this.toUser = {
      id: '210000198410281948',//navParams.get('toUserId'),
      name: 'Admin',//navParams.get('toUserName')
      avatar: './assets/imgs/user.jpg'
    };
    // Get the navParams toUserId parameter
    this.user = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: './assets/imgs/to-user.jpg'
    };

    this.getMsg();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();
    this.events.subscribe('chat:received', msg => {
      this.pushNewMsg(msg);
    })
  }

  
  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

    /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {

    console.log('getMsg');
    // Get mock message list
    return this.chatService
    .getMsgList()
    .subscribe(res => {
      this.msgList = res;
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
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    
    this.focus();
    

    this.chatService.sendMsg(newMsg)
    .then(() => {
      let index = this.getMsgIndexById(id);
      if (index !== -1) {
        this.msgList[index].status = 'success';
      }
    })
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
