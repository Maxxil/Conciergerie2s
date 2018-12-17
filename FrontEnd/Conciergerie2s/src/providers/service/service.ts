import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ServiceResult} from "../../model/Result/ServiceResult";
import {LIER_SERVICE_PRESTATION_URL, SERVICE_PRESTATION_URL, SERVICE_URL} from "../../model/Url";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  private token;
  constructor(public http: HttpClient) {
    this.token = localStorage.getItem('Token');
  }

  public GetAll(): Observable<ServiceResult>{
    this.token = localStorage.getItem('Token');
    return this.http.get<ServiceResult>(SERVICE_URL+ '/' + this.token);
  }

  public getByIdWithPrestation(id) : Observable<ServiceResult>{
    this.token = localStorage.getItem('Token');
    console.log(this.token);
    return this.http.get<ServiceResult>(SERVICE_PRESTATION_URL + '/' + id + '/' + this.token);
  }



}
