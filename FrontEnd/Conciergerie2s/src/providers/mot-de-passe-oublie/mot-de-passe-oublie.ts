import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {MOT_DE_PASSE_OUBLIE_URL} from "../../model/Url";

/*
  Generated class for the MotDePasseOublieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MotDePasseOublieProvider {

  constructor(public http: HttpClient) {    
  }

  demandeMotDePasseOublie(email : string): Observable<Result>{
    return this.http.post<Result>(MOT_DE_PASSE_OUBLIE_URL , {email : email});
  }
}
