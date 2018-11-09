import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServiceModel} from "../../model/Models/ServiceModel";
import {PrestationModel} from "../../model/Models/PrestationModel";
import {ServiceProvider} from "../../providers/service/service";
import {PrestationProvider} from "../../providers/prestation/prestation";

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
  public serviceWithPrestations : ServiceModel[];
  public selectedService : number;
  public selectedPrestation : number;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public  servicePvd : ServiceProvider
    , public  prestationPvd : PrestationProvider
    , public alertCtrl : AlertController) {

    this.initialize();

  }

  public initialize(){
    this.getServices();
    this.getPrestations();
    this.getServiceWithPrestations();
  }

  public  getServices(){
    this.servicePvd.getAll().subscribe((results) =>{
      this.services = results.data
    })
  }

  public  getPrestations(){
    this.prestationPvd.getAll().subscribe((results) =>{
      this.prestations = results.data;
    })
  }

  public getServiceWithPrestations(){
    this.servicePvd.getServiceWithPrestation().subscribe((results) =>{
      this.serviceWithPrestations = results.data;
    })
  }

  public linkServiceToPrestation(){
    this.servicePvd.linkServiceToPrestation(this.selectedService, this.selectedPrestation).subscribe((results) =>{
      console.log(results);
      this.getServiceWithPrestations();
    })
  }

  public manageSuccessOrError(result){
    var alert = this.alertCtrl.create();
    if(result.success){
      alert.setTitle('Enregistrement réussi');
      alert.setMessage("L'enregistrement s'est effectué sans erreur");
    }else{
      alert.setTitle('Enregistrement échoué');
      alert.setMessage("L'enregistrement ne s'est pas effectuée.");
    }
    alert.present();
  }


}
