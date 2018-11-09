import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServiceModel} from "../../model/ServiceModel";
import {Observable} from "rxjs/Observable";
import {SERVICE_PROVIDER} from "./../../model/UrlConstants";

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

  public Add() : Observable<ErrorEnum>{
    return this.http.put<ErrorEnum>(
      SERVICE_PROVIDER,
      {
      }
    );
  }

  public getPreById(id){
    //return
  }



}
