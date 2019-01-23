import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {CHANGER_MOT_DE_PASSE_URL} from "../../model/Url";

/*
  Generated class for the ChangerMotDePasseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChangerMotDePasseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChangerMotDePasseProvider Provider');
  }

  public changerMotDePasse(email: string, code: string, nouveauMotDePasse: string) : Observable<Result>{
    var idUtilisateur = localStorage.getItem('IdUtilisateur');
    return this.http.post<Result>( CHANGER_MOT_DE_PASSE_URL, {
      email : email, code : code, nouveauMotDePasse : nouveauMotDePasse
    });
  }

}
