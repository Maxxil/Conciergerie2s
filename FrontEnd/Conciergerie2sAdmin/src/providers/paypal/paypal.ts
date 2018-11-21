import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {PAYPAL_URL} from "../../model/Url";
import {Result} from "../../model/Results/Result";
import {PaypalModel} from "../../model/Models/PaypalModel";
import {PaypalResult} from "../../model/Results/PaypalResult";

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

  get() : Observable<PaypalResult>{
    return this.http.get<PaypalResult>(PAYPAL_URL);
  }

  update(paypal : PaypalModel) : Observable<Result>{
    return this.http.post<Result>(PAYPAL_URL , {paypal : paypal});
  }

  payer(prestation: string, prix : number): Observable<Result>{
    return this.http.put<Result>(PAYPAL_URL, {prestation : prestation, prix : prix});
  }

}
