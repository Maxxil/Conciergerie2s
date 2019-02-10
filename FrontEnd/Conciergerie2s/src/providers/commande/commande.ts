import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CommandeResult} from "../../model/Result/CommandeResult";
import {COMMANDE_BY_ID_UTILISATEUR, COMMANDE_URL} from "../../model/Url";

/*
  Generated class for the CommandeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeProvider {

  private token ;
  constructor(public http: HttpClient) {    
    this.token = localStorage.getItem('Token');
  }

  getCommandesClient() : Observable<CommandeResult>{
    return this.http.get<CommandeResult>(COMMANDE_URL + '/' + localStorage.getItem('IdUtilisateur')+ '/' + this.token);
  }

  getCommandesByIdUtilisateur() : Observable<CommandeResult>{
    return this.http.post<CommandeResult>(COMMANDE_BY_ID_UTILISATEUR,
      {
              idUtilisateur : localStorage.getItem('IdUtilisateur'),
              token : this.token
      });
  }
}
