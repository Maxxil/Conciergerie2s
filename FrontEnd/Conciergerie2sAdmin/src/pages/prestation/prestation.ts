import { PRESTATION_IMAGE_URL } from './../../model/Url';
import { AddPrestationPage } from './../add-prestation/add-prestation';
import { PrestatairePage } from './../prestataire/prestataire';
import { Component } from '@angular/core';
import {NavController, NavParams, ModalController, AlertController, Refresher} from 'ionic-angular';
import { PrestationProvider } from '../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { PrestationModel } from '../../model/Models/PrestationModel';
import { ServiceModel } from '../../model/Models/ServiceModel';
import {ServiceProvider} from "../../providers/service/service";

/**
 * Generated class for the PrestationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-prestation',
  templateUrl: 'prestation.html',
})
export class PrestationPage {

  public prestations: Array<PrestationModel>;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public service : ServiceModel;
  public nbprestation = 0;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , private prestationPrvd: PrestationProvider
              , private servicePvd : ServiceProvider
              , private alertCtrl : AlertController
              , private modalCtrl : ModalController) {
    this.service = this.navParams.get("service");

    if(this.service != null)
    {
      this.servicePvd.getByIdWithPrestations(this.service._id).subscribe((result) => {
        this.service = result.data[0];
        console.log(this.service);
        this.prestations = this.service.prestations;
        this.nbprestation = this.service.prestations.length;
      });
    }
    else {
      this.prestationPrvd.getAll().subscribe((results) =>
      {
        this.prestations = results.data;
        this.nbprestation = results.data.length;
      })
    }
    console.log(this.prestations);
  }

  refresh(refresher: Refresher){
    if(this.service != null)
    {
      this.servicePvd.getByIdWithPrestations(this.service._id).subscribe((result) => {
        this.service = result.data[0];
        console.log(this.service);
        this.prestations = this.service.prestations;
        this.nbprestation = this.service.prestations.length;
      });
    }
    else {
      this.prestationPrvd.getAll().subscribe((results) =>
      {
        this.prestations = results.data;
        this.nbprestation = results.data.length;
      })
    }
    if(refresher != null){
      refresher.complete();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestationPage');
  }

  getPrestataires(prestation : PrestationModel){
    this.navCtrl.push(PrestatairePage, {IdPrestation : prestation._id});
  }

  updatePrestation(prestation : PrestationModel){
    const modal = this.modalCtrl.create(AddPrestationPage,{
      ModalType: ServiceModalType.UPDATE,
      Prestation : prestation
    });
    modal.present();
  }

  deletePrestation(prestation: PrestationModel){
    this.alertCtrl.create({
      title : 'Suppression',
      message : 'Etes vous sur de vouloir supprimer cette prestation',
      buttons: [{
        text : 'Oui',
        handler : data => {
          this.deletePrestationFromProvider(prestation);
        }
      }, {
        text : 'Non'
      }]
    }).present();
  }

  private deletePrestationFromProvider(prestation : PrestationModel){
    this.prestationPrvd.delete(prestation).subscribe((result) =>{
      if(result.success){
        this.refresh(null);
      }
    });
  }

  before(){
    this.navCtrl.pop();
  }

  isUpdateModal(){
    return this.service != null;
  }

  displayAddPrestation()
  {
    const modal = this.modalCtrl.create(AddPrestationPage , {ModalType: ServiceModalType.CREATE});
    modal.present();
  }

}
