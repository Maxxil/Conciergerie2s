import { ServiceResult } from './../../model/ServiceResult';
import { BACK_URL } from './../../model/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from './../../model/ServiceModel'
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  url: BACK_URL;

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
    this.url = new BACK_URL();
  }

  getAll() : Observable<ServiceResult>{
    return this.http.get<ServiceResult>(this.url.SERVICE_URL);
  }

  update(image: File, service: ServiceModel, isImageUploaded: boolean): Observable<ServiceResult>{
    const token = localStorage.getItem('token');
    let url = this.url.SERVICE_URL;
    const formData = new FormData();
    if(isImageUploaded){
      url = this.url.SERVICE_UPDATE_UPLOADED_IMAGE;
      formData.append('file',image, 'image');
    }
    formData.append('nom' , service.nom);
    formData.append('description' , service.description);
    formData.append('token' , token);
    return this.http.post<ServiceResult>(url, formData);

  }

  add(image: File, service: ServiceModel): Observable<ServiceResult>{
    const token = localStorage.getItem('token');
    const url = this.url.SERVICE_URL;
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('nom' , service.nom);
    formData.append('description' , service.description);
    formData.append('token' , token);
    return this.http.put<ServiceResult>(url, formData);
  }

}
