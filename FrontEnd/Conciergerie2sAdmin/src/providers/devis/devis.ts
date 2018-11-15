import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DevisResult} from "../../model/Results/DevisResult";
import {DEVIS_URL} from "../../model/Url";

/*
  Generated class for the DevisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevisProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DevisProvider Provider');
  }

  getAll() : Observable<DevisResult>{
    return this.http.get<DevisResult>(DEVIS_URL);
  }

}