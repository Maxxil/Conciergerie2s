import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../../model/LoginModel';
import { BACK_URL } from '../../model/Url';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  urls: BACK_URL;
  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
    this.urls = new BACK_URL();
  }

  public connect(login : LoginModel) : Observable<string>
  {
    return this.http.post<string>(this.urls.LOGIN_URL, 
      login, this.urls.HTTP_OPTIONS);
  }

}
