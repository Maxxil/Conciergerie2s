import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DevisResult} from "../../model/Results/DevisResult";
import {DEVIS_URL} from "../../model/Url";
import {DevisModel} from "../../model/Models/DevisModel";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

/*
  Generated class for the DevisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevisProvider {

  private token;
  constructor(public http: HttpClient) {
    console.log('Hello DevisProvider Provider');
  }

  getAll() : Observable<DevisResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<DevisResult>(DEVIS_URL + '/' + this.token);
  }

  validateCommande(commande: DevisModel) : Observable<DevisResult>{
    commande.status = CommandeStatus.VALIDEE;
    return this.http.post<DevisResult>(DEVIS_URL,
      {idCommande : commande._id, status : CommandeStatus.VALIDEE, prestataireChoisi : commande.prestataireChoisi._id})
  }

}
