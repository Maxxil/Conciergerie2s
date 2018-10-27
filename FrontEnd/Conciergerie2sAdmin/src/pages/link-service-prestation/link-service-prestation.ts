import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceModel} from "../../model/Models/ServiceModel";
import {PrestationModel} from "../../model/Models/PrestationModel";

/**
 * Generated class for the LinkServicePrestationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link-service-prestation',
  templateUrl: 'link-service-prestation.html',
})
export class LinkServicePrestationPage {

  public services : ServiceModel[];
  public prestations : PrestationModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }




}
