import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceModel} from "../../model/Model/ServiceModel";
import {ServiceProvider} from "../../providers/service/service";
import {PRESTATION_IMAGE_URL} from "../../../../Conciergerie2sAdmin/src/model/Url";

/**
 * Generated class for the PrestationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestations',
  templateUrl: 'prestations.html',
})
export class PrestationsPage {

  public service : ServiceModel;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public servicePvd: ServiceProvider) {
    this.service = this.navParams.get('Service');
    this.getServiceWithPrestations();
  }

  public getServiceWithPrestations(){
    this.servicePvd.getByIdWithPrestation(this.service._id).subscribe(result =>{
      this.service = result.data[0];
      console.log(result);
    })
  }

  public displayPrestataires(prestation){

  }

}
