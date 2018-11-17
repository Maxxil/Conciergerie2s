import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DevisModel} from "../../model/Model/DevisModel";
import {DevisResult} from "../../model/Result/DevisResult";
import {Observable} from "rxjs/Observable";
import {DEVIS_URL} from "../../model/UrlConstants";

/*
  Generated class for the DevisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DevisProvider {
  
  constructor(public http: HttpClient) {
    console.log('Hello DevisProvider Provider');
  }

  public add(commande : DevisModel) : Observable<DevisResult>{
    commande.idClient = localStorage.getItem("IdUtilisateur");
    return this.http.put<DevisResult>(DEVIS_URL, commande);
  }

  getAll() : Observable<DevisResult>{
    let idClient = localStorage.getItem("IdUtilisateur");
    return this.http.get<DevisResult>(DEVIS_URL);
  }


}
