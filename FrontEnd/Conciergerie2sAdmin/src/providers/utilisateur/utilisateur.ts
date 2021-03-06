import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UtilisateurResult} from "../../model/Results/UtilisateurResult";
import {UTILISATEUR_URL} from "../../model/Url";
import {Observable} from "rxjs/Observable";
import {UtilisateurModel} from "../../model/Models/UtilisateurModel";
import {Result} from "../../model/Results/Result";

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
  }

  public getAll() : Observable<UtilisateurResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<UtilisateurResult>(UTILISATEUR_URL+ '/' + this.token);
  }

  add(utilisateur: UtilisateurModel) : Observable<Result> {
    return this.http.put<Result>(UTILISATEUR_URL, utilisateur)
  }

  getByCurrentId(): Observable<UtilisateurResult>{
  console.log('Get current utilisateur '+localStorage.getItem('IdUtilisateur'));
    return this.http.get<UtilisateurResult>(UTILISATEUR_URL + '/' + localStorage.getItem('IdUtilisateur')+'/'+localStorage.getItem('Token'));
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
