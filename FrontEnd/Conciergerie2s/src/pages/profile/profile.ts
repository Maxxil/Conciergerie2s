import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {UTILISATEUR_PROFILE_URL} from "../../model/Url";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {RoleEnum} from "../../model/Enums/RoleEnum";
import {ChangerMotDePassePage} from "../changer-mot-de-passe/changer-mot-de-passe";

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

  public profile : UtilisateurModel;
  public confirmationMotDePasse : string = "";
  public imageProfileUrl: string = UTILISATEUR_PROFILE_URL;
  public isImageUpdated : boolean = false;
  public playerId: string = "";
  public file : File;
  public role = RoleEnum;
  constructor(public navCtrl: NavController
              , public utilisateurPvd : UtilisateurProvider
              , public alertCtrl : AlertController
              , public viewCtrl : ViewController
              , public navParams: NavParams) {

    this.profile = new UtilisateurModel();
    this.playerId = localStorage.getItem('playerID');
    this.getByCurrentId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getByCurrentId(){
    this.utilisateurPvd.getByCurrentId().subscribe(result =>{
      console.log(result.data);
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

  changerMotDePasse(){
    this.navCtrl.push(ChangerMotDePassePage);
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
  }

  manageSuccessOrError(result){
    if(result.success){
      this.alertCtrl.create({
        title : 'Succés',
        message : 'La mise à jour a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }
    else{
      this.alertCtrl.create({
        title : 'Echec',
        message : 'La mise à jour n"a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }
  }

  hasImage(){
    console.log(this.profile.image != null);
    return this.profile.image != null;
  }

}
