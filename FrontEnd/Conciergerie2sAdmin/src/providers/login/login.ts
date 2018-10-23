import { LOGIN_URL } from './../../../../Conciergerie2s/src/model/UrlConstants';
import { LoginResult } from './../../model/Results/LoginResult';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserModel } from '../../model/Models/UserModel';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  public connect(user : UserModel) : Observable<LoginResult>
  {
    console.log(LOGIN_URL);
    return this.http.post<LoginResult>(LOGIN_URL,user, {headers : new HttpHeaders({
      'Content-Type':  'application/json'
    })});
  }

  public tryConnect() : Observable<LoginResult>{
    var token = localStorage.getItem('Token');
    var url = LOGIN_URL;
    if(token != null){
      url += '/' + token;
    }
    return this.http.get<LoginResult>(url);

  }

}