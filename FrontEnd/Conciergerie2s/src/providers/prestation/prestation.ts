import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {PrestationResult} from "../../../../Conciergerie2sAdmin/src/model/Results/PrestationResult";
import {LIER_PRESTATION_PRESTATAIRE_URL} from "../../../../Conciergerie2sAdmin/src/model/Url";

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

}
