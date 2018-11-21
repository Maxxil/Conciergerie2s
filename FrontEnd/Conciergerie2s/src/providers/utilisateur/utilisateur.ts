import { UTILISATEUR_URL } from './../../model/UrlConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurModel } from '../../model/Model/UtilisateurModel';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {UtilisateurResult} from "../../model/Result/UtilisateurResult";

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

  add(utilisateur: UtilisateurModel) : Observable<Result> {
    return this.http.put<Result>(UTILISATEUR_URL, utilisateur)
  }

  getByCurrentId(): Observable<UtilisateurResult>{
    return this.http.get<UtilisateurResult>(UTILISATEUR_URL + '/id=' + localStorage.getItem('IdUtilisateur'));
  }

  updateWithoutImage(utilisateur: UtilisateurModel): Observable<Result>{
    return this.http.post<Result>(UTILISATEUR_URL , {utilisateur : utilisateur});
  }

  updateWithImage(utilisateur: UtilisateurModel, image: File): Observable<Result>{
    const formData = new FormData();
    formData.append('file', image, 'image');
    formData.append('utilisateur', JSON.stringify(utilisateur));
    return this.http.post<Result>(UTILISATEUR_URL , {utilisateur : utilisateur});
  }

}
