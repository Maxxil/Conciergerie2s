import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurModel } from '../../model/Model/UtilisateurModel';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {UtilisateurResult} from "../../model/Result/UtilisateurResult";
import {UTILISATEUR_URL} from "../../model/Url";

/*
  Generated class for the UtilisateurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilisateurProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello UtilisateurProvider Provider');
    this.token = localStorage.getItem('Token');
  }

  add(utilisateur: UtilisateurModel) : Observable<Result> {
    console.log(utilisateur);
    return this.http.put<Result>(UTILISATEUR_URL, {utilisateur : utilisateur, token : this.token})
  }

  getByCurrentId(): Observable<UtilisateurResult>{
    return this.http.get<UtilisateurResult>(UTILISATEUR_URL + '/id=' + localStorage.getItem('IdUtilisateur')
    +'/' + this.token);
  }

  updateWithoutImage(utilisateur: UtilisateurModel): Observable<Result>{
    return this.http.post<Result>(UTILISATEUR_URL , {utilisateur : utilisateur, token : this.token});
  }

  updateWithImage(utilisateur: UtilisateurModel, image: File): Observable<Result>{
    const formData = new FormData();
    formData.append('file', image, 'image');
    formData.append('utilisateur', JSON.stringify(utilisateur));
    formData.append('token', this.token);
    return this.http.post<Result>(UTILISATEUR_URL , {utilisateur : utilisateur});
  }

}
