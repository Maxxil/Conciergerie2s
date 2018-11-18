import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {Observable} from "rxjs/Observable";
import {CommandeHoraireResult} from "../../model/Result/CommandeHoraireResult";
import {COMMANDE_HORAIRE_PRESTATAIRE_URL, COMMANDE_HORAIRE_URL} from "../../model/UrlConstants";
import {Result} from "../../model/Result/Result";

/*
  Generated class for the CommandeHoraireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeHoraireProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommandeHoraireProvider Provider');
  }

  public add(commande : CommandeHoraireModel) : Observable<CommandeHoraireResult>{
    console.log(localStorage.getItem("IdUtilisateur"));
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<CommandeHoraireResult>(COMMANDE_HORAIRE_URL, commande);
  }

  getAll() : Observable<CommandeHoraireResult>{
    return this.http.get<CommandeHoraireResult>(COMMANDE_HORAIRE_URL);
  }

  souscrirePrestataire(commande : CommandeHoraireModel) : Observable<Result>{
    return this.http.post<Result>(COMMANDE_HORAIRE_PRESTATAIRE_URL,
      {idCommande : commande._id , idUtilisateur : localStorage.getItem('IdUtilisateur')});
  }
}
