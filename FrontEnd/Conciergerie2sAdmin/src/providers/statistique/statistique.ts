import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../model/Results/Result";
import {STATISTIQUE_URL} from "../../model/Url";

/*
  Generated class for the StatistiqueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StatistiqueProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StatistiqueProvider Provider');
  }

  public dashboard() : Observable<Result>{
   
    return this.http.get<Result>( STATISTIQUE_URL+'/dashboard');
  }

}
