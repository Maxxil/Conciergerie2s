import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {LoginModel} from "../../model/Model/LoginModel";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {RoleEnum} from "../../model/Enums/RoleEnum";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public login: LoginModel;
  public user : UtilisateurModel;
  public confirmationMotDePasse : string;
  public roleEnum : RoleEnum;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public utilisateurPvd : UtilisateurProvider,
              public viewCtrl : ViewController,
              public alertCtrl : AlertController) {
    this.login = new LoginModel();
    this.user = new UtilisateurModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin(){
    this.utilisateurPvd.add(this.user).subscribe((result) =>{
      if(result.success){
        var alert = this.alertCtrl.create({
          title : "Succés",
          message : "Vous avez été inscrits correctement.",
          buttons : [
            {
              text : 'OK',
              handler : () =>{
                this.viewCtrl.dismiss();
              }
            }
          ]
        });
        alert.present();
      }
      else{
        this.alertCtrl.create({
          title: 'Erreur',
          message :"L'utilisateur que vous essayer d'inscrire existe déjà. Essayer avec un nouvel email et nouveau nom d'utilisateur",
          buttons: [
            {
              text: 'OK'
            }
          ]
        })
      }
    });
  }

}
