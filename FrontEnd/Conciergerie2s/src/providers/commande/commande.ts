import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {COMMANDE_BY_ID_UTILISATEUR, COMMANDE_URL} from "../../model/UrlConstants";
import {CommandeResult} from "../../model/Result/CommandeResult";

/*
  Generated class for the CommandeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommandeProvider Provider');
  }

  countCommande(idClient : string) : Observable<Result>{
    return this.http.get<Result>(COMMANDE_URL + '/' + idClient);
  }

  getCommandesByIdUtilisateur() : Observable<CommandeResult>{
    return this.http.post<CommandeResult>(COMMANDE_BY_ID_UTILISATEUR, {idUtilisateur : localStorage.getItem('IdUtilisateur')});
  }
}
