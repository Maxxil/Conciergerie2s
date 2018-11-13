import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServiceModel} from "../../model/Model/ServiceModel";

/**
 * Generated class for the ServiceAddModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-add-modal',
  templateUrl: 'service-add-modal.html',
})
export class ServiceAddModalPage {

  private service: ServiceModel;
  private urlInitialImage : string;
  private error: ErrorEnum
  private isSaved : boolean;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public alertCtrl: AlertController) {
    this.service = new ServiceModel();
    this.urlInitialImage = "./../../assets/icon/pic.png";
    this.service.image = this.urlInitialImage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceAddModalPage');
  }

  save(){
    let alert = this.alertCtrl.create();
    if(this.service.image != this.urlInitialImage)
    {
      if(this.service.name != "" )
      {

      }
      else
      {
        alert.setTitle("Erreur");
        alert.addButton('OK');
        alert.setMessage("Vous devez ajouter une image");
        alert.present();
      }
    }
    else {
      let alert = this.alertCtrl.create();
      alert.setTitle("Erreur");
      alert.addButton('OK');
      alert.setMessage("Vous devez ajouter une image");
      alert.present();
    }
  }

}
