import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ServiceResult} from "../../model/Result/ServiceResult";
import {LIER_SERVICE_PRESTATION_URL, SERVICE_URL} from "../../../../Conciergerie2sAdmin/src/model/Url";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {



  constructor(public http: HttpClient) {
  }

  public GetAll(): Observable<ServiceResult>{
    return this.http.get<ServiceResult>(SERVICE_URL);
  }

  public getByIdWithPrestation(id) : Observable<ServiceResult>{
    return this.http.get<ServiceResult>(LIER_SERVICE_PRESTATION_URL + '/' + id);
  }



}
