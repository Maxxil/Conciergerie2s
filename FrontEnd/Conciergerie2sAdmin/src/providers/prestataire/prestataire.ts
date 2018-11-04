import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UtilisateurModel} from "../../../../Conciergerie2s/src/model/UtilisateurModel";
import {PRESTATAIRE_URL} from "../../model/Url";
import {Observable} from "rxjs/Observable";
import {LoginResult} from "../../model/Results/LoginResult";

/*
  Generated class for the PrestataireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestataireProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PrestataireProvider Provider');
  }

  public getAllPrestataire(): Observable<PrestataireResult>{
    return this.http.get<PrestataireResult>(PRESTATAIRE_URL);
  }

}
