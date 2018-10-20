import { LOGIN_URL } from './../../model/UrlConstants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../../model/LoginModel';

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

  public connect(login : LoginModel) : Observable<string>
  {
    return this.http.post<string>(LOGIN_URL, login,{
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
      })
    });
  }

}
