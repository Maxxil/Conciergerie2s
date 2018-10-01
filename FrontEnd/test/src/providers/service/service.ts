import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceModel} from "../../model/ServiceModel";

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

  public GetAll(): ServiceModel[]{
    return ServiceModel.GetDataTest();
    //return this.http.get<ServiceModel>(SERVICE_PROVIDER);
  }



}
