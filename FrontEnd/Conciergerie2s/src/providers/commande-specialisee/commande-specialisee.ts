import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandeSpecialiseeModel} from "../../model/Model/CommandeSpecialiseeModel";
import {Observable} from "rxjs/Observable";
import {CommandeSpecialiseeResult} from "../../model/Result/CommandeSpecialiseeResult";
import {Result} from "../../model/Result/Result";
import {COMMANDE_SPECIALISEE_PRESTATAIRE_URL, COMMANDE_SPECIALISEE_URL} from "../../model/Url";

/*
  Generated class for the CommandeSpecialiseeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeSpcialiseeProvider {

  private token;
  constructor(public http: HttpClient) {
    this.token = localStorage.getItem('Token');
  }

  public add(commande : CommandeSpecialiseeModel) : Observable<CommandeSpecialiseeResult>{
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<CommandeSpecialiseeResult>(COMMANDE_SPECIALISEE_URL, {commande : commande, token : this.token});
  }

  getAll() : Observable<CommandeSpecialiseeResult>{
    return this.http.get<CommandeSpecialiseeResult>(COMMANDE_SPECIALISEE_URL + '/' + this.token);
  }

  souscrirePrestataire(commande : CommandeSpecialiseeModel) : Observable<Result>{
    return this.http.post<Result>(COMMANDE_SPECIALISEE_PRESTATAIRE_URL,
      {idCommande : commande._id , idUtilisateur : localStorage.getItem('IdUtilisateur'),
            token : this.token});
  }
}
