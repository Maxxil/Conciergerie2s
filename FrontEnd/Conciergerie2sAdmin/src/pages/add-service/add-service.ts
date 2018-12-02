import { ServiceResult } from './../../model/Results/ServiceResult';
import { SERVICE_IMAGE_URL } from './../../model/Url';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { ServiceModel } from '../../model/Models/ServiceModel';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the AddServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-service',
  templateUrl: 'add-service.html',
})
export class AddServicePage {

  modalType : ServiceModalType;
  public isSaved : boolean = false;
  public service : ServiceModel;
  public file : File = null;
  private isImageUploaded : boolean = false;
  public serverImage : string = SERVICE_IMAGE_URL;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public viewCtrl : ViewController
    , public serviceProv : ServiceProvider
    , public alertCtrl : AlertController) {
    this.modalType = this.navParams.get("ModalType");
    if(this.isUpdateModal()){
      this.service = this.navParams.get("ServiceModel");
    }
    else{
      this.service = new ServiceModel();
      this.service.image = "../../assets/icon/pic.png";
    }
  }

  isCreateModal(){
    return this.modalType == ServiceModalType.CREATE;
  }

  isUpdateModal(){
    return this.modalType == ServiceModalType.UPDATE;
  }

  importImage()
  {
    document.getElementById("image").click();
  }

  uploadImage(e){
    this.isImageUploaded = true;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.service.image = event.target.result.toString();
    };
    reader.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServicePage');
  }

  save(){
    this.serviceProv.add(this.file, this.service)
      .subscribe((result) => {
        this.manageDisplaySuccessOrError(result);
      })
  }

  update(){
    if(this.isImageUploaded){
      this.serviceProv.updateWithImage(this.file, this.service)
        .subscribe((result) => {
          this.manageDisplaySuccessOrError(result);
        })
    }
    else{
      this.serviceProv.updateWithoutImage(this.service)
        .subscribe((result) => {
          console.log(result);
          this.manageDisplaySuccessOrError(result);
        })
    }

  }

  annul(){
    this.viewCtrl.dismiss();
  }

  manageDisplaySuccessOrError(result : ServiceResult){
    var alert = this.alertCtrl.create();

    if(result.success){
      if(!this.isUpdateModal()){
        alert.setTitle('Succes');
        alert.setSubTitle('Le service a été ajouté correctement.');
        alert.addButton({
          text : 'OK'
        })
      }
      else {
        alert.setTitle('Succes');
        alert.setSubTitle('Le service a été modifié correctement.');
        alert.addButton({
          text : 'OK',
          handler : data => {
            this.annul();
          }
        })
      }

    }
    else{
      alert.setTitle('Erreur');
      alert.setSubTitle("Le service n'a pas pu être inséré ou modifié correctement. Contactez le service technique pour plus d'information.");
      alert.addButton({
        text : 'OK'
      })
    }

    alert.present();

  }

}
