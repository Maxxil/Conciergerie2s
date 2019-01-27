import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {COMMANDE_FORFAIT_URL} from "../../model/Url";
import {Observable} from "rxjs/Observable";
import {CommandeForfaitResult} from "../../model/Results/CommandeForfaitResult";
import {CommandeForfaitModel} from "../../model/Models/CommandeForfaitModel";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

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
  }

  getAll() : Observable<CommandeForfaitResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<CommandeForfaitResult>(COMMANDE_FORFAIT_URL + '/' + this.token);
  }

  validateCommande(commande: CommandeForfaitModel) : Observable<CommandeForfaitResult>{
    
    if(commande.prestataireChoisi) { 
      return this.http.post<CommandeForfaitResult>(COMMANDE_FORFAIT_URL,
        {idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : commande.prestataireChoisi._id})
    }
    
    return this.http.post<CommandeForfaitResult>(COMMANDE_FORFAIT_URL,{idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : null})
  }

  validateCommandeParC2S(commande: CommandeForfaitModel) : Observable<CommandeForfaitResult>{
    return this.http.post<CommandeForfaitResult>(COMMANDE_FORFAIT_URL,
      {idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : commande.prestataireChoisi._id})
  }
}
