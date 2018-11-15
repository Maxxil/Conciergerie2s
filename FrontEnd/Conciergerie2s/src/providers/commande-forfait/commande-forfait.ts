import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {COMMANDE_FORFAIT_URL} from "../../model/UrlConstants";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {Observable} from "rxjs/Observable";
import {CommandeForfaitResult} from "../../model/Result/CommandeForfaitResult";

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

  public add(commande : CommandeForfaitModel) : Observable<CommandeForfaitResult>{
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<CommandeForfaitResult>(COMMANDE_FORFAIT_URL, commande);
  }

}