import { PRESTATION_IMAGE_URL } from './../../model/Url';
import { AddPrestationPage } from './../add-prestation/add-prestation';
import { PrestatairePage } from './../prestataire/prestataire';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PrestationProvider } from '../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { PrestationModel } from '../../model/Models/PrestationModel';
import { ServiceModel } from '../../model/Models/ServiceModel';

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
    , private modalCtrl : ModalController) {
    this.service = this.navParams.get("service");

    if(this.service != null)
    {


      this.prestationPrvd.getByIdService(this.service._id).subscribe((result) => {
        this.prestations = result.data;
        this.nbprestation = result.data.length;
      });


    }
    else {
      this.prestationPrvd.getAll().subscribe((results) =>
      {
        this.prestations = results.data;
        this.nbprestation = results.data.length;
      })
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

  add(file: File, prestation : PrestationModel){

  }

  update(file: File, prestation : PrestationModel, isImageUploaded : boolean){

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
