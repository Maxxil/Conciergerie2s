import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceModel} from "../../model/ServiceModel";
import {MaisonPage} from "../maison/maison";
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  services: ServiceModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceProvider: ServiceProvider) {
    this.services = serviceProvider.GetAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  displayService(id){
    this.navCtrl.push(MaisonPage);
  }
}
