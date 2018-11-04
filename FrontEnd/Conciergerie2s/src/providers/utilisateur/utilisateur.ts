import { UTILISATEUR_URL } from './../../model/UrlConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurModel } from '../../model/UtilisateurModel';

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

  add(utilisateur: UtilisateurModel) {
    return this.http.put(UTILISATEUR_URL, utilisateur)
  }

}
