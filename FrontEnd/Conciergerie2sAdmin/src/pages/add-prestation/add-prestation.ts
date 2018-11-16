import { PrestationResult } from './../../model/Results/PrestationResult';
import { PrestationProvider } from './../../providers/prestation/prestation';
import { ServiceModalType } from '../../model/Enums/ServiceModalTypeEnum';
import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { PRESTATION_IMAGE_URL } from '../../model/Url';
import { PrestationModel } from '../../model/Models/PrestationModel';
import {AddPrestationDetailPage} from "../add-prestation-detail/add-prestation-detail";
import {TypePrixEnum} from "../../model/Enums/TypePrixEnum";
/**
 * Generated class for the AddPrestationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  public typePrixEnum = TypePrixEnum;


  constructor(
      public viewCtrl: ViewController
      ,public navCtrl: NavController
      , public navParams: NavParams
      , private modalCtrl : ModalController
      , private prestationPvd : PrestationProvider
      , private alertCtrl : AlertController) {
    this.modalType = this.navParams.get("ModalType");
    if(this.isUpdateModal()){
      this.prestation = this.navParams.get("Prestation");
    }
    else{
      this.prestation = new PrestationModel();
      this.prestation.details = [];     
      this.prestation.image = "../../assets/icon/pic.png";
    }
  }

  isUpdateModal(){
    return this.modalType == ServiceModalType.UPDATE;
  }

  displayAddPrestationDetail()
  {
    const modal = this.modalCtrl.create(
      AddPrestationDetailPage , {ModalType: ServiceModalType.CREATE});
      modal.onDidDismiss(data => {
        console.log(data);
        this.prestation.details.push(data.contenu);
        console.log(this.prestation);
      });
    modal.present();
  }

  deletePrestationDetail(index) {
    if(index > -1)
      this.prestation.details.splice(index,1);
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
    };
    reader.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }

  add(){
    console.log(this.prestation);
    this.prestationPvd.add(this.prestation, this.file).subscribe((result) => {
      console.log(result);
      this.manageDisplaySuccessOrError(result);
      this.prestation = new PrestationModel();
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
      if(this.isUpdateModal()){
        alert.setTitle('Succes');
        alert.setSubTitle('La prestation a été modifiée correctement.');
        alert.addButton({
          text : 'OK',
          handler : data => {
            this.close();
          }
        })
      }
      else{
        alert.setTitle('Succes');
        alert.setSubTitle('La prestation a été insérée correctement.');
        alert.addButton({
          text : 'OK',
          handler : data => {
          }
        })
      }

    }
    else{
      alert.setTitle('Erreur');
      alert.setSubTitle("La prestation n'a pas pu être inséré correctement. Contactez le service technique pour plus d'information.");
      alert.addButton({
        text : 'OK'
      })
    }

    alert.present();

  }

}
