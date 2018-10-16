import { PrestationModel } from './../../model/PrestationModel';
import { Observable } from 'rxjs/Observable';
import { BACK_URL } from './../../model/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrestationResult} from './../../model/PrestationResult';

/*
  Generated class for the PrestationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrestationProvider {

  private URL : BACK_URL;

  constructor(public http: HttpClient) {
    console.log('Hello PrestationProvider Provider');
    this.URL = new BACK_URL();
  }

  getAll() : Observable<PrestationResult>{
    return this.http.get<PrestationResult>(this.URL.PRESTATION_URL)
  }

  add(prestation:PrestationModel, image) : Observable<PrestationResult>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('nom' , prestation.nom);
    formData.append('description' , prestation.description);
    formData.append('token' , token);
    return this.http.put<PrestationResult>(this.URL.PRESTATION_URL, {prestation : prestation});
  }

  update(prestation:PrestationModel, image) : Observable<PrestationResult>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('nom' , prestation.nom);
    formData.append('description' , prestation.description);
    formData.append('token' , token);
    return this.http.put<PrestationResult>(this.URL.PRESTATION_URL, {prestation : prestation});
  }

}
