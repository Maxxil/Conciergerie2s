import { ServiceResult } from '../../model/Results/ServiceResult';
import { SERVICE_URL, SERVICE_UPDATE_UPLOADED_IMAGE, LIER_SERVICE_PRESTATION_URL } from './../../model/Url';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceModel } from '../../model/Models/ServiceModel'
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {


  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }

  getAll() : Observable<ServiceResult>{
    return this.http.get<ServiceResult>(SERVICE_URL);
  }

  getServiceWithPrestation(){
    return this.http.get<ServiceResult>(LIER_SERVICE_PRESTATION_URL);
  }


  add(image: File, service: ServiceModel): Observable<ServiceResult>{
    const token = localStorage.getItem('token');
    const url = SERVICE_URL;
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('nom' , service.nom);
    formData.append('description' , service.description);
    formData.append('token' , token);
    return this.http.put<ServiceResult>(url, formData);
  }

  updateWithImage(image: File, service: ServiceModel): Observable<ServiceResult>{
    const formData = new FormData();
    formData.append('file',image, 'image');
    formData.append('service', JSON.stringify(service));
    return this.http.post<ServiceResult>(SERVICE_UPDATE_UPLOADED_IMAGE, formData);
  }

  updateWithoutImage(service: ServiceModel): Observable<ServiceResult>{
    return this.http.post<ServiceResult>(SERVICE_URL, {service: service});
  }

  getByIdWithPrestations(idService: string): Observable<ServiceResult> {
    return this.http.get<ServiceResult>(LIER_SERVICE_PRESTATION_URL + "/" + idService);
  }


  linkServiceToPrestation(idService, idPrestation){
    return this.http.post<ServiceResult>(LIER_SERVICE_PRESTATION_URL, {idService: idService, idPrestation : idPrestation});
  }
}
