import { Observable } from 'rxjs/Observable';
import {LIER_SERVICE_PRESTATION_URL, PRESTATION_URL} from './../../model/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrestationResult} from '../../model/Results/PrestationResult';
import { PrestationModel } from '../../model/Models/PrestationModel';

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

  getAll() : Observable<PrestationResult>{
    return this.http.get<PrestationResult>(PRESTATION_URL)
  }

  getByIdService(idService : number) : Observable<PrestationResult>{
    return this.http.get<PrestationResult>(LIER_SERVICE_PRESTATION_URL + "/" + idService);
  }

  add(prestation:PrestationModel, image: File) : Observable<PrestationResult>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    console.log(image);
    formData.append('file',image, 'image');
    formData.append('nom' , prestation.nom);
    formData.append('description' , prestation.description);
    formData.append('token' , token);
    console.log(formData);
    return this.http.put<PrestationResult>(PRESTATION_URL, formData);
  }

  update(prestation:PrestationModel, image: File) : Observable<PrestationResult>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('nom' , prestation.nom);
    formData.append('description' , prestation.description);
    formData.append('token' , token);
    return this.http.put<PrestationResult>(PRESTATION_URL, formData);
  }

}
