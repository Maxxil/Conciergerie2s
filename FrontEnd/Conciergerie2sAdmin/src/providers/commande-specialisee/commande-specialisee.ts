import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CommandeSpecialiseeResult} from "../../model/Results/CommandeSpecialiseeResult";
import {COMMANDE_HORAIRE_URL} from "../../model/Url";
import {CommandeSpecialiseeModel} from "../../model/Models/CommandeSpecialiseeModel";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

/*
  Generated class for the CommandeHoraireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommandeSpecialiseeProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello CommandeHoraireProvider Provider');
  }

  getAll() : Observable<CommandeSpecialiseeResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<CommandeSpecialiseeResult>(COMMANDE_HORAIRE_URL + '/' + this.token);
  }

  validateCommande(commande: CommandeSpecialiseeModel) : Observable<CommandeSpecialiseeResult>{

    if(commande.prestataireChoisi) {
      return this.http.post<CommandeSpecialiseeResult>(COMMANDE_HORAIRE_URL,
        {idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : commande.prestataireChoisi._id})
    }

    return this.http.post<CommandeSpecialiseeResult>(COMMANDE_HORAIRE_URL,{idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : null})

  }

}
