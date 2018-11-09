import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DEVALIDER_PRESTATAIRE, PRESTATAIRE_URL, VALIDER_PRESTATAIRE} from "../../model/Url";
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

  constructor(public http: HttpClient) {
    console.log('Hello PrestataireProvider Provider');
  }

  public getAllPrestataire(): Observable<PrestataireResult>{
    return this.http.get<PrestataireResult>(PRESTATAIRE_URL);
  }

  public getPrestatairesValides(): Observable<PrestataireResult>{
    return this.http.get<PrestataireResult>(PRESTATAIRE_URL + '/valides');
  }

  valider(prestataire) : Observable<Result> {
    console.log("Valider prestataire");
    console.log(VALIDER_PRESTATAIRE);
    return this.http.post<Result>(VALIDER_PRESTATAIRE, {id: prestataire._id});
  }

  devalider(prestataire): Observable<Result>{
    return this.http.post<Result>(DEVALIDER_PRESTATAIRE, {id:prestataire._id});
  }

}
