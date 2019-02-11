import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {PrestationResult} from "../../model/Result/PrestationResult";
import {LIER_PRESTATION_PRESTATAIRE_URL, PRESTATION_URL} from "../../model/Url";
/*
  Generated class for the PrestationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestationProvider {

  private token;
  constructor(public http: HttpClient) {    
    this.token = localStorage.getItem('Token');
  }

  public getWithPrestataires(id) : Observable<PrestationResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<PrestationResult>(LIER_PRESTATION_PRESTATAIRE_URL + '/' + id + '/' + this.token);
  }

  public getByIdUtilisateur() : Observable<PrestationResult>{
    const idUtilisateur = localStorage.getItem('IdUtilisateur');
    this.token = localStorage.getItem('Token');
    return this.http.post<PrestationResult>(PRESTATION_URL , {idUtilisateur : idUtilisateur, token : this.token});
  }

}
