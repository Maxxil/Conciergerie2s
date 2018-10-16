import { ServiceModel } from './../../model/ServiceModel';
import { PrestationPage } from './../prestation/prestation';
import { ServiceResult } from './../../model/ServiceResult';
import { BACK_URL } from './../../model/Url';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {AddServicePage} from "../add-service/add-service";
import { ServiceModel } from '../../model/ServiceModel';
import { ServiceModalType } from '../../model/ServiceModalTypeEnum';
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
  private serviceImageUrl : string = (new BACK_URL()).SERVICE_IMAGE_URL;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private modalCtrl : ModalController
    , private serviceProv: ServiceProvider) {
      this.services = [];
      this.serviceProv.getAll().subscribe((results) =>{
        this.services = results.data;
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
    this.navCtrl.push(PrestationPage, {Prestations : service.prestations})
  }

}
