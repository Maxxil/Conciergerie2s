import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NotificationResult} from "../../model/Results/NotificationResult";
import {NOTIFICATION_URL} from "../../model/Url";
import { NotificationModel } from '../../model/Models/NotificationModel';
import { Result } from '../../model/Results/Result';
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  private token;
  constructor(public http: HttpClient) {
    console.log('Hello UtilisateurProvider Provider');

  }

  public getAll() : Observable<NotificationResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<NotificationResult>(NOTIFICATION_URL+ '/' + this.token);
  }

  public readByMe(notification: NotificationModel) : Observable<NotificationResult>{
    console.log('ReadBy me ', notification);
    //this.token = localStorage.getItem('Token');    
    return this.http.post<NotificationResult>(NOTIFICATION_URL, {id: notification._id, idUtilisateur: localStorage.getItem('IdUtilisateur')});
  }

  

  public delete(notification: NotificationModel): any {
    //this.token = localStorage.getItem('Token');
    //console.log(NOTIFICATION_URL+ '/' + notification._id+ '/' + this.token);
    return this.http.delete<Result>(NOTIFICATION_URL+ '/' + notification._id);
  }

}

