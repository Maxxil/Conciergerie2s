import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ViewController} from 'ionic-angular';
import {PaypalModel} from "../../model/Models/PaypalModel";
import {UtilisateurModel} from "../../model/Models/UtilisateurModel";
import {RoleEnum} from "../../model/Enums/RoleEnum";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UTILISATEUR_PROFILE_URL} from "../../model/Url";
import {PaypalProvider} from "../../providers/paypal/paypal";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public paypal : PaypalModel;
  public profile : UtilisateurModel;
  public confirmationMotDePasse : string = "";
  public imageProfileUrl: string = UTILISATEUR_PROFILE_URL;
  public isImageUpdated : boolean = false;
  public file : File;
  public role = RoleEnum;
  public localId : string = "";
  constructor(public navCtrl: NavController
              , public utilisateurPvd : UtilisateurProvider
              , public paypalProvider : PaypalProvider
              , public alertCtrl : AlertController
              , public viewCtrl : ViewController
              , public navParams: NavParams) {

    this.paypal = new PaypalModel();
    this.profile = new UtilisateurModel();
    this.localId = localStorage.getItem('IdUtilisateur');
    this.getByCurrentId();
    this.getPaypalInformation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getByCurrentId(){
    this.utilisateurPvd.getByCurrentId().subscribe(result =>{
      this.profile = result.data[0];
    });
  }

  uploadImage(e){
    this.isImageUpdated = true;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.profile.image = event.target.result.toString();
    };
    reader.readAsDataURL(e.target.files[0]);
    this.file = e.target.files[0];
  }

  update(){
    if(this.isImageUpdated){
      this.utilisateurPvd.updateWithImage(this.profile, this.file).subscribe(result =>{
        this.manageSuccessOrError(result);
      });
    }
    else{
      this.utilisateurPvd.updateWithoutImage(this.profile).subscribe(result =>{
        this.manageSuccessOrError(result);
      });
    }
    this.updatePaypalInformation();
  }

  updatePaypalInformation(){
    this.paypalProvider.update(this.paypal).subscribe(result =>{
      this.manageSuccessOrError(result);
    })
  }

  getPaypalInformation(){
    this.paypalProvider.get().subscribe(result =>{
      console.log(result);
      if(result.data.length > 0){
        this.paypal = result.data[0];
      }
    })
  }

  manageSuccessOrError(result){
    var alert = null;
    if(result.success){
      alert = this.alertCtrl.create({
        title : 'Succés',
        message : 'La mise à jour a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      });
      alert.present();
    }
    else{
      alert = this.alertCtrl.create({
        title : 'Echec',
        message : 'La mise à jour n"a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      });
      alert.present();
    }
  }

  hasImage(){
    console.log(this.profile.image != null);
    return this.profile.image != null;
  }

}
