import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServiceModel} from "../../model/Models/ServiceModel";
import {PrestationModel} from "../../model/Models/PrestationModel";
import {ServiceProvider} from "../../providers/service/service";
import {PrestationProvider} from "../../providers/prestation/prestation";
import {ServiceResult} from "../../model/Results/ServiceResult";

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
    console.log(this.selectedService);
    if(this.selectedService != null && this.selectedPrestation != null){
      this.servicePvd.linkServiceToPrestation(this.selectedService, this.selectedPrestation).subscribe((results) =>{
        console.log(results);
        this.manageDisplaySuccessOrError(results);
        this.getServiceWithPrestations();
      })
    }
    else{
      this.alertCtrl.create({
        title : 'Important',
        message : "Vous devez selectionner un service et une prestation",
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }

  }

  public deletePrestationInService(service: ServiceModel, prestation: PrestationModel){
    this.servicePvd.deletePrestationInService(service,prestation).subscribe(result =>{
      if(result.success){
        this.alertCtrl.create({
          title : 'Suppression',
          message : "La suppression s'est parfaitement executée",
          buttons : [{
            text : 'OK'
          }]
        }).present();
        this.getServiceWithPrestations();
      }else{
        this.alertCtrl.create({
          title : 'Erreur',
          message : "Une erreur s'est produit lors de la suppression",
          buttons : [{
            text : 'OK'
          }]
        }).present();
      }
    })
  }

  manageDisplaySuccessOrError(result: ServiceResult) {
    var alert = this.alertCtrl.create();

    if (result.success) {
      alert.setTitle('Succes');
      alert.setSubTitle('Le service et la prestation on été liés correctement.');
      alert.addButton({
        text: 'OK'
      });
      this.getServiceWithPrestations();
    }
    else {
      alert.setTitle('Erreur');
      alert.setSubTitle("Le service et la prestation n'ont été liés correctement.");
      alert.addButton({
        text: 'OK'
      })
    }
    alert.present();
  }


}
