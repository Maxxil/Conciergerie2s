import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {COMMANDE_FORFAIT_URL} from "../../model/Url";
import {Observable} from "rxjs/Observable";
import {CommandeForfaitResult} from "../../model/Results/CommandeForfaitResult";

/*
  Generated class for the CommandeForfaitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeForfaitProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommandeForfaitProvider Provider');
  }

  getAll() : Observable<CommandeForfaitResult>{
    return this.http.get<CommandeForfaitResult>(COMMANDE_FORFAIT_URL);
  }
}
