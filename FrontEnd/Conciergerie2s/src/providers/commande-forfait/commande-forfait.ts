import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {Observable} from "rxjs/Observable";
import {CommandeForfaitResult} from "../../model/Result/CommandeForfaitResult";
import {Result} from "../../model/Result/Result";
import {COMMANDE_FORFAIT_URL, COMMANDE_FORFAIT_PRESTATAIRE_URL} from "../../model/Url";

/*
  Generated class for the CommandeForfaitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeForfaitProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello CommandeForfaitProvider Provider');
    this.token = localStorage.getItem('Token');
  }

  public add(commande : CommandeForfaitModel) : Observable<CommandeForfaitResult>{
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<CommandeForfaitResult>(COMMANDE_FORFAIT_URL, {commande : commande, token : this.token});
  }

  getAll() : Observable<CommandeForfaitResult>{
    return this.http.get<CommandeForfaitResult>(COMMANDE_FORFAIT_URL + '/' + this.token);
  }

  souscrirePrestataire(commande : CommandeForfaitModel) : Observable<Result>{
    return this.http.post<Result>(COMMANDE_FORFAIT_PRESTATAIRE_URL,
      {idCommande : commande._id , idUtilisateur : localStorage.getItem('IdUtilisateur'),
            token : this.token});
  }

}
