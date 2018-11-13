import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UtilisateurResult} from "../../model/Results/UtilisateurResult";
import {UTILISATEUR_URL} from "../../model/Url";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the UtilisateurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilisateurProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UtilisateurProvider Provider');
  }

  public getAll() : Observable<UtilisateurResult>{
    return this.http.get<UtilisateurResult>(UTILISATEUR_URL);
  }

}
