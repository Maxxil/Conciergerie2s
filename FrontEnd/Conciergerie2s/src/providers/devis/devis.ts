import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DevisModel} from "../../model/Model/DevisModel";
import {DevisResult} from "../../model/Result/DevisResult";
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Result/Result";
import {DEVIS_PRESTATAIRE_URL, DEVIS_URL} from "../../model/Url";

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
    this.token = localStorage.getItem('Token');
  }

  public add(commande : DevisModel) : Observable<DevisResult>{
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<DevisResult>(DEVIS_URL, {commande : commande, token : this.token});
  }

  getAll() : Observable<DevisResult>{
    return this.http.get<DevisResult>(DEVIS_URL + '/' + this.token);
  }

  souscrirePrestataire(commande : DevisModel) : Observable<Result>{
    return this.http.post<Result>(DEVIS_PRESTATAIRE_URL,
      {idCommande : commande._id , idUtilisateur : localStorage.getItem('IdUtilisateur'), token : this.token});
  }
}
