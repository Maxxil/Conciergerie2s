import { ServiceModalType } from './../../model/ServiceModalTypeEnum';
import { PrestationModel } from './../../model/PrestationModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PRESTATION_IMAGE_URL } from '../../model/Url';

/**
 * Generated class for the AddPrestationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-prestation',
  templateUrl: 'add-prestation.html',
})
export class AddPrestationPage {

  public prestation : PrestationModel;
  private modalType : ServiceModalType;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.modalType = this.navParams.get("ModalType");
    if(this.isUpdateModal()){
      this.prestation = this.navParams.get("Prestation");
    }
    else{
      this.prestation = new PrestationModel();
    }
  }

  isUpdateModal(){
    return this.modalType == ServiceModalType.UPDATE;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPrestationPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
