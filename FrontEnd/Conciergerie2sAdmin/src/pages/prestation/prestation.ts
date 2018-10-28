import { PRESTATION_IMAGE_URL } from './../../model/Url';
import { AddPrestationPage } from './../add-prestation/add-prestation';
import { PrestatairePage } from './../prestataire/prestataire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PrestationProvider } from '../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { PrestationModel } from '../../model/Models/PrestationModel';

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
  private idService;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private prestationPrvd: PrestationProvider
    , private modalCtrl : ModalController) {
    this.idService = this.navParams.get("IdService");
    if(this.idService != null)
    {
      this.prestationPrvd.getByIdService(this.idService).subscribe((result) => {
        this.prestations = result.data;
      });
    }
    else {
      this.prestationPrvd.getAll().subscribe((results) =>
      {
        this.prestations = results.data;
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
    return this.idService != null;
  }

  displayAddPrestation()
  {
    const modal = this.modalCtrl.create(AddPrestationPage , {ModalType: ServiceModalType.CREATE});
    modal.present();
  }

}
