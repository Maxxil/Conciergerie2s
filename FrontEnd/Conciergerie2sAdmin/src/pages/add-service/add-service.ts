import { SERVICE_IMAGE_URL } from './../../model/Url';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ServiceModel } from './../../model/ServiceModel';
import { ServiceModalType } from '../../model/ServiceModalTypeEnum';
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
  public serviceImageUrl : string = SERVICE_IMAGE_URL;
  private isImageUploaded : boolean = false;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public viewCtrl : ViewController
    , public serviceProv : ServiceProvider) {
    console.log("Constructor");
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
    }
    reader.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServicePage');
  }

  save(){
    console.log(this.service);
    this.serviceProv.add(this.file, this.service)
      .subscribe((result) => {
        this.manageDisplaySuccessOrError(result);
      })
  }

  update(){
    this.serviceProv.update(this.file, this.service, this.isImageUploaded)
      .subscribe((result) => {
        this.manageDisplaySuccessOrError(result);
      })
  }

  annul(){
    this.viewCtrl.dismiss();
  }

  manageDisplaySuccessOrError(result){
    this.isSaved = true;
  }

}
