import { PrestationResult } from './../../model/Results/PrestationResult';
import { PrestationProvider } from './../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { PRESTATION_IMAGE_URL } from '../../model/Url';
import { PrestationModel } from '../../model/Models/PrestationModel';

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
  public isImageUploaded : boolean = false;
  public file : File;


  constructor(
      public viewCtrl: ViewController
      ,public navCtrl: NavController
      , public navParams: NavParams
      , private prestationPvd : PrestationProvider
      , private alertCtrl : AlertController) {
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

  importImage()
  {
    document.getElementById("image").click();
  }

  uploadImage(e){
    this.isImageUploaded = true;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.prestation.image = event.target.result.toString();
    }
    reader.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }

  save(){
    this.prestationPvd.add(this.prestation, this.file).subscribe((result) => {
      this.manageDisplaySuccessOrError(result);
    })
  }

  update(){
    this.prestationPvd.update(this.prestation , this.file).subscribe((result) => {
      this.manageDisplaySuccessOrError(result);
    })
  }

  close(){
    this.viewCtrl.dismiss();
  }

  manageDisplaySuccessOrError(result : PrestationResult){
    var alert = this.alertCtrl.create();

    if(result.success){
      alert.setTitle('Succes');
      alert.setSubTitle('Le service a été ajouté correctement.');
      alert.addButton({
        text : 'OK',
        handler : data => {
          this.close();
        }
      })
    }
    else{
      alert.setTitle('Erreur');
      alert.setSubTitle("Le service n'a pas pu être inséré correctement. Contactez le service technique pour plus d'information.");
      alert.addButton({
        text : 'OK'
      })
    }

    alert.present();

  }

}
