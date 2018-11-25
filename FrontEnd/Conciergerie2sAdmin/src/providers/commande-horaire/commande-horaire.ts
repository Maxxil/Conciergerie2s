import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CommandeHoraireResult} from "../../model/Results/CommandeHoraireResult";
import {COMMANDE_HORAIRE_URL} from "../../model/Url";
import {CommandeHoraireModel} from "../../model/Models/CommandeHoraireModel";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

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

  getAll() : Observable<CommandeHoraireResult>{
    return this.http.get<CommandeHoraireResult>(COMMANDE_HORAIRE_URL);
  }

  validateCommande(commande: CommandeHoraireModel) : Observable<CommandeHoraireResult>{
    return this.http.post<CommandeHoraireResult>(COMMANDE_HORAIRE_URL,
      {idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : commande.prestataireChoisi._id})
  }

}
