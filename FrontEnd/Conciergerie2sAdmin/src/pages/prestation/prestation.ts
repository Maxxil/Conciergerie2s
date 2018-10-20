import { PRESTATION_IMAGE_URL } from './../../model/Url';
import { AddPrestationPage } from './../add-prestation/add-prestation';
import { PrestatairePage } from './../prestataire/prestataire';
import { PrestationModel } from './../../model/PrestationModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PrestationProvider } from '../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/ServiceModalTypeEnum';

/**
 * Generated class for the PrestationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestation',
  templateUrl: 'prestation.html',
})
export class PrestationPage {

  public prestations: PrestationModel[];
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private prestationPrvd: PrestationProvider
    , private modalCtrl : ModalController) {
    const idService = this.navParams.get("IdService");
    this.prestationPrvd.getByIdService(idService).subscribe((result) => {
      this.prestations = result.data;
    });
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

}
