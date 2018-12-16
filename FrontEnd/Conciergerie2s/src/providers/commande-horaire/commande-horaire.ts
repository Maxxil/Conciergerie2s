import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {Observable} from "rxjs/Observable";
import {CommandeHoraireResult} from "../../model/Result/CommandeHoraireResult";
import {Result} from "../../model/Result/Result";
import {COMMANDE_HORAIRE_PRESTATAIRE_URL, COMMANDE_HORAIRE_URL} from "../../model/Url";

/*
  Generated class for the CommandeHoraireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeHoraireProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello CommandeHoraireProvider Provider');
    this.token = localStorage.getItem('Token');
  }

  public add(commande : CommandeHoraireModel) : Observable<CommandeHoraireResult>{
    console.log(localStorage.getItem("IdUtilisateur"));
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<CommandeHoraireResult>(COMMANDE_HORAIRE_URL, {commande : commande, token : this.token});
  }

  getAll() : Observable<CommandeHoraireResult>{
    return this.http.get<CommandeHoraireResult>(COMMANDE_HORAIRE_URL + '/' + this.token);
  }

  souscrirePrestataire(commande : CommandeHoraireModel) : Observable<Result>{
    return this.http.post<Result>(COMMANDE_HORAIRE_PRESTATAIRE_URL,
      {idCommande : commande._id , idUtilisateur : localStorage.getItem('IdUtilisateur'),
            token : this.token});
  }
}
