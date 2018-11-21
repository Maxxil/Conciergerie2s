import { Observable } from 'rxjs/Observable';
import {
  LIER_PRESTATION_PRESTATAIRE_URL,
  PRESTATION_INFORMATION, PRESTATION_URL
} from './../../model/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrestationResult} from '../../model/Results/PrestationResult';
import { PrestationModel } from '../../model/Models/PrestationModel';
import {Result} from "../../model/Results/Result";
import {PrestationInformationResult} from "../../model/Results/PrestationInformationResult";

/*
  Generated class for the PrestationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestationProvider {


  constructor(public http: HttpClient) {
    console.log('Hello PrestationProvider Provider');
  }

  getAll(): Observable<PrestationResult> {
    return this.http.get<PrestationResult>(PRESTATION_URL)
  }


  add(prestation: PrestationModel, image: File): Observable<PrestationResult> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    console.log(image);
    formData.append('file', image, 'image');
    formData.append('nom', prestation.nom);
    formData.append('description', prestation.description);
    formData.append('prix', prestation.prix.toString());
    formData.append('forfait', prestation.forfait);
    formData.append('typeprix', prestation.typeprix.toString());
    for (var i = 0; i < prestation.details.length; i++) {
      formData.append('details[]', prestation.details[i]);
    }
    formData.append('token', token);
    console.log(formData);
    return this.http.put<PrestationResult>(PRESTATION_URL, formData);
  }

  updateWithImage(prestation: PrestationModel, image: File): Observable<PrestationResult> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', image, 'image');
    formData.append('prestation', JSON.stringify(prestation));
    console.log(formData);
    return this.http.post<PrestationResult>(PRESTATION_URL, formData);
  }

  updateWithoutImage(prestation: PrestationModel): Observable<PrestationResult> {
    return this.http.post<PrestationResult>(PRESTATION_URL, {prestation: prestation});
  }

  linkPrestationToPrestataire(idPrestation, idPrestataire) : Observable<Result>{
    return this.http.post<Result>(LIER_PRESTATION_PRESTATAIRE_URL , {idPrestation : idPrestation, idPrestataire : idPrestataire});
  }

  getOnlyWithPrestataire(): Observable<PrestationResult>{
    return this.http.get<PrestationResult>(LIER_PRESTATION_PRESTATAIRE_URL);
  }

  getPrestationByIdWithPrestataires(id) : Observable<PrestationInformationResult>{
    return this.http.get<PrestationInformationResult>(PRESTATION_INFORMATION + '/' + id);
  }

}
