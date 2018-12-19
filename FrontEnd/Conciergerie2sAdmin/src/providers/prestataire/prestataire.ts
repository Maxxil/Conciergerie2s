import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DEVALIDER_PRESTATAIRE, PRESTATAIRE_URL, UTILISATEUR_PRESTATAIRE, VALIDER_PRESTATAIRE} from "../../model/Url";
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Results/Result";
import {PrestataireResult} from "../../model/Results/PrestataireResult";

/*
  Generated class for the PrestataireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestataireProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello PrestataireProvider Provider');
  }

  getAllUtilisateurPrestataire() : Observable<PrestataireResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<PrestataireResult>(UTILISATEUR_PRESTATAIRE + '/' + this.token);
  }

  public getAllPrestataire(): Observable<PrestataireResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<PrestataireResult>(PRESTATAIRE_URL + '/' + this.token);
  }

  valider(prestataire) : Observable<Result> {
    console.log("Valider prestataire");
    console.log(VALIDER_PRESTATAIRE);
    return this.http.post<Result>(VALIDER_PRESTATAIRE, {id: prestataire._id});
  }

  devalider(prestataire): Observable<Result>{
    this.token = localStorage.getItem('Token');
    return this.http.post<Result>(DEVALIDER_PRESTATAIRE, {id:prestataire._id, token: this.token});
  }

}
