import { ServiceModel } from '../../model/Models/ServiceModel';
import { PrestationPage } from './../prestation/prestation';
import { SERVICE_IMAGE_URL } from './../../model/Url';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, AlertController} from 'ionic-angular';
import {AddServicePage} from "../add-service/add-service";
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
})
export class ServicePage {

  services : ServiceModel[];
  ServiceModalType = ServiceModalType;
  public serviceImageUrl : string = SERVICE_IMAGE_URL;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , private modalCtrl : ModalController
              , public serviceProv: ServiceProvider
              , private alertCtrl: AlertController) {
      this.services = [];
      this.serviceProv.getAll().subscribe((results) =>{
        this.services = results.data;
      })
  }

  refresh(refresher){
    this.services = [];
    this.serviceProv.getAll().subscribe((results) =>{
      this.services = results.data;
      if(refresher != null){
        refresher.complete();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicePage');
  }

  updateService(service)
  {
    const modal = this.modalCtrl.create(
      AddServicePage , {ModalType: ServiceModalType.UPDATE, ServiceModel : service});
    modal.present();
  }

  displayAddService()
  {
    const modal = this.modalCtrl.create(
      AddServicePage , {ModalType: ServiceModalType.CREATE});
    modal.present();
  }

  getPrestations(service: ServiceModel){
    this.navCtrl.push(PrestationPage, {service: service})
  }

  deleteService(service : ServiceModel){
    console.log(service);
    this.alertCtrl.create({
      title : 'Suppression',
      message : 'Etes vous sur de vouloir supprimer ce service',
      buttons: [{
        text : 'Oui',
        handler : data => {
          this.deleteServiceFromProvider(service);
        }
      }, {
        text : 'Non'
      }]
    }).present();
  }

  private deleteServiceFromProvider(service : ServiceModel){
    this.serviceProv.delete(service).subscribe((result) =>{
      if(result.success){
        this.refresh(null);
      }
    });
  }

}
