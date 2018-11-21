import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Result} from "../../model/Result/Result";
import {Observable} from "rxjs/Observable";
import {PAYPAL_URL} from "../../model/UrlConstants";

/*
  Generated class for the PaypalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaypalProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaypalProvider Provider');
  }

  payer(prestation: string, prix : number): Observable<Result>{
    return this.http.put<Result>(PAYPAL_URL, {prestation : prestation, prix : prix});
  }

}
