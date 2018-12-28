import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NotificationResult} from "../../model/Result/NotificationResult";
import {NOTIFICATION_URL} from "../../model/Url";
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

}

