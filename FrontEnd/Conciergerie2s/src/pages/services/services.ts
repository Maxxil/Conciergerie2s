import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServiceModel} from "../../model/Model/ServiceModel";
import {MaisonPage} from "../maison/maison";
import {ServiceProvider} from "../../providers/service/service";
import {PrestationsPage} from "../prestations/prestations";
import {SERVICE_IMAGE_URL} from "../../model/UrlConstants";

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
  public imageUrl : string = SERVICE_IMAGE_URL;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private serviceProvider: ServiceProvider) {
    this.getAllServices();
  }

  getAllServices(){
    this.serviceProvider.GetAll().subscribe(result =>{
      this.services = result.data;
    })
  }

  displayService(id){
    this.navCtrl.push(MaisonPage);
  }

  displayPrestations(service){
    this.navCtrl.push(PrestationsPage, {Service: service});
  }
}
