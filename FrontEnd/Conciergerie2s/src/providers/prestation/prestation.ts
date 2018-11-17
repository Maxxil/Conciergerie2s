import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LIER_PRESTATION_PRESTATAIRE_URL, PRESTATION_URL} from "../../../../Conciergerie2sAdmin/src/model/Url";
import {} from './../../model/Result/'
import {PrestationResult} from "../../model/Result/PrestationResult";
/*
  Generated class for the PrestationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PrestationProvider Provider');
  }

  public getWithPrestataires(id) : Observable<PrestationResult>{
    return this.http.get<PrestationResult>(LIER_PRESTATION_PRESTATAIRE_URL + '/' + id);
  }

  public getByIdUtilisateur() : Observable<PrestationResult>{
    const idUtilisateur = localStorage.getItem('IdUtilisateur');
    return this.http.post<PrestationResult>(PRESTATION_URL , {idUtilisateur : idUtilisateur});
  }

}
