import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Socket } from "ng-socket-io";
import { CHAT_URL} from "../../model/Url";
export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {

  private _server: string = CHAT_URL;

  constructor(private http: HttpClient,
              private socket: Socket) {
  }


  pollServer() : Observable<any>
  {
     return this.http.get(this._server);
  }

  connect() {
    this.socket.connect();
    this.socket.emit('client-connect');
  }


  isAdminOnline() : Observable<any>
  {
     return new Observable((observer) =>
     {
        this.socket.on('is-admin-online', (data) =>
        {
          console.log(data);
           observer.next(data);
        });
        this.socket.on('c2s-admin-disconnect', (data) =>
        {
          console.log(data);
           observer.next(data);
        });
       
     });
  }

  retrieveMsg() : Observable<any>
  {
     return new Observable((observer) =>
     {
        this.socket.on('message', (data) =>
        {
          console.log('restreiveMsg');
          console.log(data);
           observer.next(data);
        });
     });
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = './assets/mock/msg-list.1.json';
    return this.http.get<any>(msgListUrl)
    .pipe(map(response => response.array));
  }

  request(profile) {
    console.log('request chat');
    return new Promise(resolve =>
    this.socket.emit('chat-client-request', {profile: profile}));
  }

  sendMsg(msg: ChatMessage) {

    console.log('sendMsg');
    return new Promise(resolve =>
       this.socket.emit('new-message', { message: msg}));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: './assets/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

  logout() {
    this.socket.disconnect();
  }

}
